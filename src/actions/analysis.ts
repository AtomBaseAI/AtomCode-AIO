"use server"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAdminOrCourseStaff } from "@/lib/action-guards";

export const resetModuleForStudent = async (
    uid: string,
    qid: string,
    mid: string,
    cid: string
) => {
    // Admins always pass; staff only when assigned to the course (cid).
    const session = await requireAdminOrCourseStaff(cid);
    if (!session) {
        return { error: "You are not allowed to reset results for this course." };
    }

    // The module must actually belong to the course — otherwise a forged
    // (mid, cid) pair could reset rows of a different course.
    const module_ = await db.module.findUnique({
        where: { id: mid },
        select: { courseId: true },
    });
    if (!module_ || module_.courseId !== cid) {
        return { error: "Module does not belong to this course." };
    }

    // Staff (non-admin) may only reset students enrolled in THEIR course.
    const role = (session.user as { role?: string } | undefined)?.role;
    if (role === "staff") {
        const enrollment = await db.userCourse.findFirst({
            where: { userId: uid, courseId: cid },
            select: { id: true },
        });
        if (!enrollment) {
            return { error: "Student is not enrolled in this course." };
        }
    }

    const userCodeQuestionData = await db.userCodeQuestionData.findFirst({
        where: {
            userId: uid,
            questionId: qid,
            moduleId: mid,
        },
    });

    const userModuleData = await db.userModuleData.findFirst({
        where: {
            userId: uid,
            courseId: cid,
            moduleId: mid,
        },
    });

    if (!userCodeQuestionData && !userModuleData) {
        return { error: "Not yet submitted" };
    }

    if (userCodeQuestionData) {
        await db.userCodeQuestionData.update({
            where: {
                id: userCodeQuestionData.id,
            },
            data: {
                status: "retake",
            },
        });
    }

    if (userModuleData) {
        await db.userModuleData.update({
            where: {
                id: userModuleData.id,
            },
            data: {
                modulestatus: "retake",
                questionstatus: "retake",
            },
        });
    }

    revalidatePath("/admin/results");
    revalidatePath("/staff/results");

    return { success: "Module reset successfully" };
};
