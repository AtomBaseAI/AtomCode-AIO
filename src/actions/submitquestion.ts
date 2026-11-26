"use server"
import { db } from "@/lib/db"
import { UserQuestionDataSchema } from "@/schemas/student/usersavequestion-schema"
import { revalidatePath } from "next/cache"
import { requireUser } from "@/lib/action-guards"
import { judgeQuestionTests, QuestionJudgeError } from "@/lib/question-judge"
import { recordUserActivitySafe } from "@/lib/activity"

import * as z from 'zod'

export const submitquestion = async (values: z.infer<typeof UserQuestionDataSchema>) => {
    const validatedFields = UserQuestionDataSchema.safeParse(values)
    if (!validatedFields.success) {
        return { error: "Invalid Submission" }
    }
    const session = await requireUser();
    if (!session) return { error: "Unauthorized" };

    // The submission always belongs to the signed-in student — a
    // client-supplied userId is never trusted.
    const userId = session.user.id;
    const {
        questionId,
        moduleId,
        score: clientScore,
        compiles,
        errors,
        submissiontype,
        tabswitches,
        status,
        usercode,
        duration,
    } = validatedFields.data;

    const question = await db.codeQuestion.findUnique({
        where: { id: questionId },
        select: {
            id: true,
            lang: true,
            maxscore: true,
            // Many-to-many: the question may serve modules of several
            // courses; the enrollment gate runs against the module the
            // student is practicing in (or any module holding it).
            modules: { select: { id: true, courseId: true } },
        },
    });
    if (!question) {
        return { error: "Question not found." };
    }

    // Enrollment gate: module → course → the student must hold a UserCourse
    // row for that course.
    const attachedModule = moduleId
        ? question.modules.find((m) => m.id === moduleId)
        : undefined;
    const gateModule = attachedModule ?? question.modules[0];
    const module_ = gateModule
        ? { courseId: gateModule.courseId }
        : null;
    if (module_) {
        const enrollment = await db.userCourse.findFirst({
            where: { userId, courseId: module_.courseId },
            select: { id: true },
        });
        if (!enrollment) {
            return { error: "You are not enrolled in this course." };
        }
    }

    // Server-side grading (1 + 3 + 3 + 3, capped at the question maxscore).
    // The client score is only a fallback when the judge itself is
    // unavailable — and then still clamped to the same cap.
    let score = clientScore;
    let testcase1status = validatedFields.data.testcase1status;
    let testcase2status = validatedFields.data.testcase2status;
    let testcase3status = validatedFields.data.testcase3status;

    if (usercode && usercode.trim().length > 0) {
        try {
            const judged = await judgeQuestionTests(questionId, usercode, question.lang, {
                userId,
            });
            score = judged.score;
            // Same slot mapping the client mirrors: sample → testcase1,
            // hidden 1..2 → testcase2/3.
            testcase1status = judged.results[0]?.pass ? "pass" : "fail";
            testcase2status = judged.results[1]?.pass ? "pass" : "fail";
            testcase3status = judged.results[2]?.pass ? "pass" : "fail";
        } catch (error) {
            if (error instanceof QuestionJudgeError && error.status < 500) {
                // 4xx = bad input (language mismatch / quota / keywords) —
                // reject with the helper's message instead of a fake score.
                return { error: error.message };
            }
            // Judge infrastructure failure (5xx / network) — keep the flow
            // alive with a clamped client score.
            const cap = question.maxscore > 0 ? question.maxscore : 10;
            score = Math.max(0, Math.min(clientScore, cap));
        }
    } else {
        // Nothing to judge → no credit.
        score = 0;
    }

    const existingrecord = await db.userCodeQuestionData.findUnique({
        where: {
            userId_questionId: {
                userId: userId,
                questionId: questionId
            },
        },
    })
    if (existingrecord && existingrecord.status === 'retake') {
        await db.userCodeQuestionData.updateMany({
            where: {
                id: existingrecord.id,
                userId,
            },
            data: {
                score,
                compiles,
                errors,
                tabswitches,
                status,
                usercode,
                duration,
                testcase1status,
                testcase2status,
                testcase3status,
            }
        })

        await revalidatePath('/student/practice');
        recordUserActivitySafe(userId);
        return { success: "Code Retake Submitted !" }
    } else if (existingrecord?.status === 'submitted') {
        return { error: "Code already Submitted !" }
    }
    await db.userCodeQuestionData.create({
        data: {
            userId,
            questionId,
            moduleId,
            score,
            compiles,
            errors,
            submissiontype,
            tabswitches,
            status,
            usercode,
            duration,
            testcase1status,
            testcase2status,
            testcase3status,
        }
    })

    await revalidatePath('/student/practice');
    recordUserActivitySafe(userId);
    return { success: "Code Submitted !" }
}

export const submitcode = async () => {
    const session = await requireUser();
    if (!session) return { error: "Unauthorized" };

    await revalidatePath('/student/practice');
    return { success: "Submission Completed !" }
}
