"use server"
import { db } from "@/lib/db"
import { UserMCQDataSchema } from "@/schemas/student/usersavemcq-schema"
import { revalidatePath } from "next/cache"
import { requireUser } from "@/lib/action-guards"
import { recordUserActivitySafe } from "@/lib/activity"


import * as z from 'zod'

export const submitmcq = async (values: z.infer<typeof UserMCQDataSchema>) => {
    const validatedFields = UserMCQDataSchema.safeParse(values)
    if (!validatedFields.success) {
        return { error: "Invalid Submission" }
    }
    const session = await requireUser();
    if (!session) return { error: "Unauthorized" };

    // The submission always belongs to the signed-in student — a
    // client-supplied userId is never trusted.
    const userId = session.user.id;
    const {
        moduleId,
        score: clientScore,
        errors,
        submissiontype,
        tabswitches,
        status,
        duration
    } = validatedFields.data;

    // Enrollment gate: module → course → the student must hold a UserCourse
    // row for that course.
    const module_ = await db.module.findUnique({
        where: { id: moduleId },
        select: {
            id: true,
            courseId: true,
            _count: { select: { mcqQuestions: true } },
        },
    });
    if (!module_) {
        return { error: "Module not found." };
    }
    const enrollment = await db.userCourse.findFirst({
        where: { userId, courseId: module_.courseId },
        select: { id: true },
    });
    if (!enrollment) {
        return { error: "You are not enrolled in this course." };
    }

    const existingRecord = await db.userMCQData.findFirst({
        where: {
            userId,
            moduleId
        }
    })

    if (existingRecord) {
        return { warning: "Test Already Submitted !" }
    }

    // The client grade is not trusted: the UI formula is 1 point per MCQ, so
    // the score can never exceed the module's MCQ total (or drop below 0).
    const mcqTotal = module_._count.mcqQuestions;
    const score = Math.max(0, Math.min(clientScore, mcqTotal));

    await db.userMCQData.create({
        data: {
            userId,
            moduleId,
            score,
            errors,
            submissiontype,
            tabswitches,
            status,
            duration
        }
    })

    revalidatePath('/student/practice')
    recordUserActivitySafe(userId)
    return { success: "Submission Completed!" }
}
