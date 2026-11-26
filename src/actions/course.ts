"use server"
import { db } from "@/lib/db"
import { type Prisma } from "@prisma/client"
import * as z from 'zod'
import { revalidatePath } from "next/cache"
import { AddCourseSchema, CourseUpdateSchema, DeleteCourseSchema } from "@/schemas/course-schema"
import { requireAdmin } from "@/lib/action-guards";

/**
 * Shared-aware question cleanup for course deletion (many-to-many era):
 * a question attached to modules of a DIFFERENT course must survive; only
 * questions whose ENTIRE module assignment falls inside the deleting
 * courses' modules are removed from the bank. Detaching the rest happens
 * via cascade when the module rows go.
 */
async function deleteCourseOwnedQuestions(
    tx: Prisma.TransactionClient,
    moduleIds: string[]
): Promise<number> {
    if (moduleIds.length === 0) return 0;
    const [code, mcq] = await Promise.all([
        tx.codeQuestion.findMany({
            where: {
                modules: { some: { id: { in: moduleIds } } },
                AND: [{ modules: { none: { id: { notIn: moduleIds } } } }],
            },
            select: { id: true },
        }),
        tx.mCQQuestion.findMany({
            where: {
                modules: { some: { id: { in: moduleIds } } },
                AND: [{ modules: { none: { id: { notIn: moduleIds } } } }],
            },
            select: { id: true },
        }),
    ]);
    const codeIds = code.map((q) => q.id);
    const mcqIds = mcq.map((q) => q.id);
    const [a, b] = await Promise.all([
        codeIds.length
            ? tx.codeQuestion.deleteMany({ where: { id: { in: codeIds } } })
            : Promise.resolve({ count: 0 }),
        mcqIds.length
            ? tx.mCQQuestion.deleteMany({ where: { id: { in: mcqIds } } })
            : Promise.resolve({ count: 0 }),
    ]);
    return a.count + b.count;
}

export const addcourse = async (values: z.infer<typeof AddCourseSchema>) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can add courses." };

    await db.course.create({
        data: {
            ...values,
        }
    })

    revalidatePath("/admin/courses")
    return { success: "Course Added !" }
}
/**
 * Intelligent course delete — mirrors the cleanup API's full course wipe
 * (removeCourseSection with every section at once, then the course row).
 * Cascade order inside one transaction:
 *   1. student data — module progress, MCQ/code submissions and assessment
 *      records (they reference questions, modules, assessments & the course)
 *   2. course feedbacks
 *   3. module content — code/MCQ questions and references of the modules
 *   4. assessments, then the modules
 *   5. enrollments (userCourse) and staff assignments (staffCourse)
 *   6. the course row itself
 * None of the relations cascade in the schema, so a bare course.delete
 * would hit FK constraints whenever any of these rows exist.
 */
export const deletecourse = async (
    values: z.infer<typeof DeleteCourseSchema>
) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can delete courses." };

    const cid = values.id;
    const course = await db.course.findUnique({ where: { id: cid }, select: { id: true } });
    if (!course) return { error: "Course not found." };

    await db.$transaction(async (tx) => {
        const modules = await tx.module.findMany({ where: { courseId: cid }, select: { id: true } })
        const mids = modules.map((m) => m.id)
        const assessments = await tx.assessments.findMany({ where: { courseId: cid }, select: { id: true } })
        const aids = assessments.map((a) => a.id)

        // 1. Student data always goes first — it references questions,
        //    modules, assessments and the course itself.
        await Promise.all([
            tx.userModuleData.deleteMany({ where: { courseId: cid } }),
            tx.userMCQData.deleteMany({ where: { moduleId: { in: mids } } }),
            tx.userCodeQuestionData.deleteMany({ where: { moduleId: { in: mids } } }),
            tx.userAssessmentData.deleteMany({ where: { courseId: cid } }),
            tx.userAssessmentMCQData.deleteMany({ where: { assessmentId: { in: aids } } }),
            tx.userAssessmentCodeData.deleteMany({ where: { assessmentId: { in: aids } } }),
        ])
        // 2. Course feedbacks.
        await tx.feedbacks.deleteMany({ where: { courseId: cid } })
        // 3. Module content — questions only used by this course go with it
        //    (shared ones are detached by the module cascade); references.
        await deleteCourseOwnedQuestions(tx, mids)
        await tx.moduleReferences.deleteMany({ where: { moduleId: { in: mids } } })
        // 4. Assessments, then the modules.
        await tx.assessments.deleteMany({ where: { courseId: cid } })
        await tx.module.deleteMany({ where: { courseId: cid } })
        // 5. Enrollments and staff assignments.
        await tx.userCourse.deleteMany({ where: { courseId: cid } })
        await tx.staffCourse.deleteMany({ where: { courseId: cid } })
        // 6. The course row itself.
        await tx.course.delete({ where: { id: cid } })
    })
    revalidatePath("/admin/courses")
    revalidatePath("/staff/courses")
    return { success: "Course Deleted !" }
}

export const updatecourse = async (
    values: z.infer<typeof CourseUpdateSchema>
) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can update courses." };

    // Strip the id from the written data — it is only the where-key.
    const { id: cid, ...data } = values;
    await db.course.update({
        where: {
            id: cid
        },
        data,
    })
    revalidatePath("/admin/courses")
    return { success: "Course Updated !" }
}

/**
 * Bulk intelligent course delete — runs the same full cascade as
 * `deletecourse` for every selected course inside ONE transaction, so FK
 * constraints can no longer fail. Courses that don't exist are ignored.
 */
export const deletecoursesbulk = async (ids: string[]) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can delete courses." };

    const validIds = (ids ?? []).filter(
        (id) => typeof id === "string" && id.trim().length > 0
    );
    if (validIds.length === 0) return { error: "No courses selected." };

    // Only delete courses that actually exist so counts stay honest.
    const existing = await db.course.findMany({
        where: { id: { in: validIds } },
        select: { id: true },
    });
    if (existing.length === 0) return { error: "No courses selected." };
    const existingIds = existing.map((c) => c.id);

    await db.$transaction(async (tx) => {
        const [modules, assessments] = await Promise.all([
            tx.module.findMany({ where: { courseId: { in: existingIds } }, select: { id: true } }),
            tx.assessments.findMany({ where: { courseId: { in: existingIds } }, select: { id: true } }),
        ]);
        const mids = modules.map((m) => m.id);
        const aids = assessments.map((a) => a.id);

        // 1. Student data always goes first — it references questions,
        //    modules, assessments and the courses themselves.
        await Promise.all([
            tx.userModuleData.deleteMany({ where: { courseId: { in: existingIds } } }),
            tx.userMCQData.deleteMany({ where: { moduleId: { in: mids } } }),
            tx.userCodeQuestionData.deleteMany({ where: { moduleId: { in: mids } } }),
            tx.userAssessmentData.deleteMany({ where: { courseId: { in: existingIds } } }),
            tx.userAssessmentMCQData.deleteMany({ where: { assessmentId: { in: aids } } }),
            tx.userAssessmentCodeData.deleteMany({ where: { assessmentId: { in: aids } } }),
        ]);
        // 2. Course feedbacks.
        await tx.feedbacks.deleteMany({ where: { courseId: { in: existingIds } } });
        // 3. Module content — questions only used by these courses go with
        //    them (shared ones are detached by the module cascade); refs.
        await deleteCourseOwnedQuestions(tx, mids);
        await tx.moduleReferences.deleteMany({ where: { moduleId: { in: mids } } });
        // 4. Assessments, then the modules.
        await tx.assessments.deleteMany({ where: { courseId: { in: existingIds } } });
        await tx.module.deleteMany({ where: { courseId: { in: existingIds } } });
        // 5. Enrollments and staff assignments.
        await tx.userCourse.deleteMany({ where: { courseId: { in: existingIds } } });
        await tx.staffCourse.deleteMany({ where: { courseId: { in: existingIds } } });
        // 6. The course rows themselves.
        await tx.course.deleteMany({ where: { id: { in: existingIds } } });
    });

    revalidatePath("/admin/courses");
    revalidatePath("/staff/courses");
    return { success: `${existingIds.length} course(s) deleted.` };
}

