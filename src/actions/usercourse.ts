"use server"
import { db } from "@/lib/db"
import * as z from 'zod'
import { revalidatePath } from "next/cache"
import { requireAdmin, requireAdminOrCourseStaff } from "@/lib/action-guards"

/**
 * Invalidates every surface that renders this course's enrollment state —
 * in BOTH URL namespaces the UI can be browsed under (admin panel, the
 * /superadmin mirror the super admin is canonicalized to, and the staff
 * course view). Without the per-course paths the client router cache
 * (staleTimes.dynamic = 30s) keeps serving the pre-mutation page, so
 * newly assigned students "don't show" and removed ones linger.
 */
function revalidateCourseStudents(courseId: string) {
    revalidatePath("/admin/courses");
    revalidatePath(`/admin/courses/${courseId}`);
    revalidatePath(`/admin/courses/${courseId}/students`);
    revalidatePath(`/admin/courses/${courseId}/students/add`);
    revalidatePath("/superadmin/courses");
    revalidatePath(`/superadmin/courses/${courseId}`);
    revalidatePath(`/superadmin/courses/${courseId}/students`);
    revalidatePath(`/superadmin/courses/${courseId}/students/add`);
    revalidatePath(`/staff/courses/${courseId}/students`);
}

export const addcoursestudents = async (
    courseId: string,
    studentIds: string[]
) => {
    const session = await requireAdmin();
    if (!session) {
        return { error: "Only admins can manage course enrollments." };
    }

    const validIds = (studentIds ?? []).filter(
        (id) => typeof id === "string" && id.trim().length > 0
    );
    if (validIds.length === 0) return { error: "No students selected." };

    try {
        await db.userCourse.createMany({
            data: validIds.map(userId => ({
                userId,
                courseId,
                active: true,
                completionPercentage: 0
            })),
            // Re-assigning an already enrolled student is a no-op (unique
            // (userId, courseId)) — repeated Assign clicks stay idempotent.
            skipDuplicates: true,
        });
        revalidateCourseStudents(courseId);
        return { success: "Students added to Course successfully!" };
    } catch (error) {
        console.error("Error adding Students to course:", error);
        throw error;
    }
}

/**
 * Removes a student from a course and wipes their progress for that course
 * inside one transaction: module progress, practice submissions and
 * assessment attempts (which hang off the course's modules and assessments).
 * None of those relations cascade, so a bare userCourse.delete would leave
 * orphaned progress data behind.
 */
export const deletecoursestudent = async (
    uid: string,
    cid: string
) => {
    const session = await requireAdminOrCourseStaff(cid);
    if (!session) {
        return { error: "You are not allowed to manage students of this course." };
    }

    try {
        await db.$transaction(async (tx) => {
            // The student's data references the course's modules and
            // assessments — resolve their ids first, wipe the data, then
            // remove the enrollment row itself.
            const mids = (
                await tx.module.findMany({ where: { courseId: cid }, select: { id: true } })
            ).map((m) => m.id);
            const aids = (
                await tx.assessments.findMany({ where: { courseId: cid }, select: { id: true } })
            ).map((a) => a.id);

            await Promise.all([
                tx.userModuleData.deleteMany({ where: { userId: uid, courseId: cid } }),
                tx.userMCQData.deleteMany({ where: { userId: uid, moduleId: { in: mids } } }),
                tx.userCodeQuestionData.deleteMany({ where: { userId: uid, moduleId: { in: mids } } }),
                tx.userAssessmentData.deleteMany({ where: { userId: uid, courseId: cid } }),
                tx.userAssessmentMCQData.deleteMany({ where: { userId: uid, assessmentId: { in: aids } } }),
                tx.userAssessmentCodeData.deleteMany({ where: { userId: uid, assessmentId: { in: aids } } }),
            ]);

            const existingRecord = await tx.userCourse.findFirst({
                where: {
                    courseId: cid,
                    userId: uid
                }
            });

            if (!existingRecord) {
                throw new Error("Record to delete does not exist.");
            }

            await tx.userCourse.delete({
                where: {
                    id: existingRecord.id
                }
            });
        });

        revalidateCourseStudents(cid);
        return { success: "Student unassigned from course successfully!" };
    } catch (error) {
        console.error("Error deleting student from course:", error);
        throw error;
    }
}

export const getstudentsbycourseid = async (courseId: string) => {
    // Admins always pass; staff only when assigned to the course.
    // Unauthorized callers get the same `null` shape as "no data".
    const session = await requireAdminOrCourseStaff(courseId);
    if (!session) {
        return null;
    }

    try {
        // Password hashes NEVER leave the server — explicit safe-field
        // whitelist (the old include leaked bcrypt hashes to the UI). The
        // fields mirror StudentTableSchema, which the UI parses these rows
        // with.
        const courseStudents = await db.userCourse.findMany({
            where: { courseId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        image: true,
                        department: true,
                        section: true,
                        batch: true,
                        rollnumber: true,
                        github: true,
                        linkedin: true,
                        isActive: true,
                    },
                },
            },
        });

        if (!courseStudents) {
            return null;
        }

        return courseStudents.map(courseStudent => courseStudent.user);
    } catch (error) {
        console.error("Error fetching users by course ID:", error);
        return null;
    }
};

/**
 * Bulk-remove students from a course. Allowed for admins and for staff
 * assigned to the course (matches the row-level permission model).
 */
export const deletecoursestudentsbulk = async (
    uids: string[],
    cid: string
) => {
    const session = await requireAdminOrCourseStaff(cid);
    if (!session) {
        return { error: "You are not allowed to manage students of this course." };
    }

    const validIds = (uids ?? []).filter(
        (id) => typeof id === "string" && id.trim().length > 0
    );
    if (validIds.length === 0) return { error: "No students selected." };

    const result = await db.$transaction(async (tx) => {
        // Wipe each student's progress for this course first (module
        // progress, practice submissions, assessment attempts — none of
        // them cascade), then remove the enrollment rows themselves.
        const mids = (
            await tx.module.findMany({ where: { courseId: cid }, select: { id: true } })
        ).map((m) => m.id);
        const aids = (
            await tx.assessments.findMany({ where: { courseId: cid }, select: { id: true } })
        ).map((a) => a.id);

        await Promise.all([
            tx.userModuleData.deleteMany({ where: { courseId: cid, userId: { in: validIds } } }),
            tx.userMCQData.deleteMany({ where: { userId: { in: validIds }, moduleId: { in: mids } } }),
            tx.userCodeQuestionData.deleteMany({ where: { userId: { in: validIds }, moduleId: { in: mids } } }),
            tx.userAssessmentData.deleteMany({ where: { courseId: cid, userId: { in: validIds } } }),
            tx.userAssessmentMCQData.deleteMany({ where: { userId: { in: validIds }, assessmentId: { in: aids } } }),
            tx.userAssessmentCodeData.deleteMany({ where: { userId: { in: validIds }, assessmentId: { in: aids } } }),
        ]);

        return tx.userCourse.deleteMany({
            where: { courseId: cid, userId: { in: validIds } },
        });
    });

    revalidateCourseStudents(cid);
    return { success: `${result.count} student(s) unassigned from the course.` };
}
