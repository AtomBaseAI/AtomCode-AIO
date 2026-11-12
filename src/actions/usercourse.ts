"use server"
import { db } from "@/lib/db"
import * as z from 'zod'
import { revalidatePath } from "next/cache"
import { requireAdminOrCourseStaff } from "@/lib/action-guards"
export const addcoursestudents = async (
    courseId: string,
    studentIds: string[]
) => {
    try {
        await db.userCourse.createMany({
            data: studentIds.map(userId => ({
                userId,
                courseId,
                active: true,
                completionPercentage: 0
            }))
        });
        revalidatePath(`/admin/courses/`);
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

        revalidatePath(`/admin/courses`);
        return { success: "Student deleted from course successfully!" };
    } catch (error) {
        console.error("Error deleting student from course:", error);
        throw error;
    }
}

export const getstudentsbycourseid = async (courseId: string) => {
    try {
        const courseStudents = await db.userCourse.findMany({
            where: { courseId },
            include: { user: true }
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

    revalidatePath("/admin/courses");
    revalidatePath(`/staff/courses/${cid}/students`);
    return { success: `${result.count} student(s) removed from the course.` };
}
