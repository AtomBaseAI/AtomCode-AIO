"use server"
import { db } from "@/lib/db";
import { startUserAssessmentDataSchema, upateUserAllAssessmentSchemaCode, upateUserAssessmentSchemaMCQ, UserQuestionAssessmentDataSchema } from "@/schemas/student/assessment-schema";
import {
  AddAssessmentSchema,
  DeleteAssessmentSchema,
  UpdateAssessmentSchema,
} from "@/schemas/assessment-schema";
import { revalidatePath } from "next/cache";
import { requireAdmin, requireUser } from "@/lib/action-guards";
import { judgeQuestionTests, QuestionJudgeError } from "@/lib/question-judge";
import { recordUserActivitySafe } from "@/lib/activity";

import * as z from 'zod';


export const startAssessment = async (data: z.infer<typeof startUserAssessmentDataSchema>) => {
  const session = await requireUser();
  if (!session) return { error: "Unauthorized" };

  // The attempt always belongs to the signed-in student — a client-supplied
  // userId is never trusted.
  const userId = session.user.id;

  // Load the assessment — maxtime / maxtabswitches / assessmentmaxscore and
  // the section totals are SERVER-authoritative; client values are ignored
  // (they are trivially forgeable and feed the anti-cheat + score ceilings).
  const assessment = await db.assessments.findUnique({
    where: { id: data.assessmentId },
    select: {
      id: true,
      courseId: true,
      maxtime: true,
      maxscore: true,
      tabswitches: true,
      _count: { select: { mcqQuestions: true, codeQuestions: true } },
    },
  });
  if (!assessment) return { error: "Invalid Submission" };

  const newrecord = await db.userAssessmentData.create({
    data: {
      userId,
      courseId: assessment.courseId,
      assessmentId: assessment.id,
      // Same arithmetic the client mirrors: 1 point per MCQ, 10 per code
      // question, capped by the assessment's own maxscore.
      totalmcqscore: assessment._count.mcqQuestions,
      totalquestionscore: assessment._count.codeQuestions * 10,
      assessmentmaxscore: assessment.maxscore,
      assessmentstarttime: data.assessmentstarttime,
      userassessmentstarttime: data.userassessmentstarttime,
      usertabswitches: data.usertabswitches,
      maxtabswitches: assessment.tabswitches,
      maxtime: assessment.maxtime,
      status: data.status
    }
  });

  revalidatePath('/student/assessments');
  return { success: true, uaid: newrecord.id };
};

export const mcqdataUpdateAssessment = async (data: z.infer<typeof upateUserAssessmentSchemaMCQ>) => {
  const session = await requireUser();
  if (!session) return { error: "Unauthorized" };
  const userId = session.user.id;

  const attempt = await db.userAssessmentData.findUnique({
    where: { id: data.id },
  });
  if (!attempt || attempt.userId !== userId) {
    return { error: "Invalid Submission" };
  }

  // The MCQ section score is 1 point per question — clamp to the stored
  // section total and never below zero, whatever the client claims.
  const usermcqscore =
    attempt.totalmcqscore && attempt.totalmcqscore > 0
      ? Math.max(0, Math.min(data.usermcqscore, attempt.totalmcqscore))
      : Math.max(0, data.usermcqscore);

  await db.userAssessmentData.updateMany({
    where: {
      id: data.id,
      userId,
    },
    data: {
      mcqtime: data.mcqtime,
      mcqstatus: data.mcqstatus,
      usermcqscore,
    }
  });
  revalidatePath('/student/assessment');
  return { success: "MCQ's Submitted" };
}


//code submit userassessmentcode
export const submitassessmentquestion = async (values: z.infer<typeof UserQuestionAssessmentDataSchema>) => {
  const validatedFields = UserQuestionAssessmentDataSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: "Invalid Submission" }
  }
  const session = await requireUser();
  if (!session) return { error: "Unauthorized" };

  // Ownership: the row is always created/updated for the signed-in student.
  const userId = session.user.id;
  const {
    questionId,
    assessmentId,
    score: clientScore,
    compiles,
    errors,
    submissiontype,
    status,
    usercode,
    duration,
  } = validatedFields.data;

  const question = await db.codeQuestion.findUnique({
    where: { id: questionId },
    select: { id: true, lang: true, maxscore: true },
  });
  if (!question) return { error: "Question not found." };

  // The assessment attempt this submission belongs to — the judge
  // re-verifies ownership (uaid → session user) with this id.
  const attempt = await db.userAssessmentData.findFirst({
    where: { userId, assessmentId },
    select: { id: true },
  });

  // Server-side grading (1 + 3 + 3 + 3, capped at the question maxscore).
  // The client score is only used as a fallback when the judge itself is
  // unavailable — and then still clamped to the same cap.
  let score = clientScore;
  let testcase1status = validatedFields.data.testcase1status;
  let testcase2status = validatedFields.data.testcase2status;
  let testcase3status = validatedFields.data.testcase3status;

  if (usercode && usercode.trim().length > 0) {
    try {
      const judged = await judgeQuestionTests(questionId, usercode, question.lang, {
        uaid: attempt?.id,
        userId,
      });
      score = judged.score;
      // Derive the per-case statuses from the server results (same slots
      // the client mirrors: sample → testcase1, hidden 1..2 → testcase2/3).
      testcase1status = judged.results[0]?.pass ? "pass" : "fail";
      testcase2status = judged.results[1]?.pass ? "pass" : "fail";
      testcase3status = judged.results[2]?.pass ? "pass" : "fail";
    } catch (error) {
      if (error instanceof QuestionJudgeError && error.status < 500) {
        // 4xx = bad input (bad language / quota / keywords / ownership) —
        // reject with the helper's message instead of storing a fake score.
        return { error: error.message };
      }
      // Judge infrastructure failure (5xx / network) — keep the flow alive
      // with a clamped client score (1+3+3+3 cap, or the question maxscore).
      const cap = question.maxscore > 0 ? question.maxscore : 10;
      score = Math.max(0, Math.min(clientScore, cap));
    }
  } else {
    // Nothing to judge → no credit.
    score = 0;
  }

  const existingrecord = await db.userAssessmentCodeData.findUnique({
    where: {
      userId_questionId: {
        userId: userId,
        questionId: questionId
      },
    },
  })
  if (existingrecord && existingrecord.status === 'retake') {
    await db.userAssessmentCodeData.updateMany({
      where: {
        id: existingrecord.id,
        userId,
      },
      data: {
        score,
        compiles,
        errors,
        status,
        usercode,
        duration,
        testcase1status,
        testcase2status,
        testcase3status,
      }
    })

    await revalidatePath('/student/assessment');
    return { success: "Code Retake Submitted !" }
  } else if (existingrecord?.status === 'submitted') {
    return { error: "Code already Submitted !" }
  }
  await db.userAssessmentCodeData.create({
    data: {
      userId,
      questionId,
      assessmentId,
      score,
      compiles,
      errors,
      submissiontype,
      status,
      usercode,
      duration,
      testcase1status,
      testcase2status,
      testcase3status,
    }
  })

  await revalidatePath('/student/assessment');
  return { success: "Code Submitted !" }
}

//submit all questions



/**
 * Finalizes an assessment attempt: aggregates the submitted MCQ + code rows
 * and marks the attempt "submitted". This is what the student's overall
 * "Submit Test" button (and the auto-submit on tab-limit / time-up) calls —
 * the per-section submissions (MCQ / per-question code) only record their
 * own parts and leave the attempt "started".
 */
export const finalizeassessment = async (data: z.infer<typeof upateUserAllAssessmentSchemaCode>) => {
  const session = await requireUser();
  if (!session) return { error: "Unauthorized" };

  // Ownership is verified against the SESSION — the client's userId /
  // assessmentId fields are advisory only and never trusted (audit fix:
  // the old check compared two client-supplied inputs).
  const userId = session.user.id;
  const attempt = await db.userAssessmentData.findUnique({
    where: { id: data.id },
  });
  if (!attempt) return { error: "Invalid Submission" };
  if (attempt.userId !== userId) return { error: "Invalid Submission" };
  if (attempt.status === "submitted") return { success: "Assessment already submitted" };

  const assessmentId = attempt.assessmentId;

  const mcqRow = await db.userAssessmentMCQData.findFirst({
    where: { userId, assessmentId },
  });
  const codeRows = await db.userAssessmentCodeData.findMany({
    where: { userId, assessmentId },
  });

  const usermcqscore = mcqRow?.score ?? attempt.usermcqscore ?? 0;
  const userquestionscore = codeRows.reduce((t, r) => t + r.score, 0);
  const questiontime = codeRows.reduce((t, r) => t + parseInt(r?.duration || '0'), 0);

  await db.userAssessmentData.updateMany({
    where: { id: attempt.id, userId },
    data: {
      mcqstatus: mcqRow ? "submitted" : attempt.mcqstatus,
      questionstatus: codeRows.length > 0 ? "submitted" : attempt.questionstatus,
      usermcqscore,
      userquestionscore,
      questiontime,
      errors: (mcqRow?.errors ?? 0) + codeRows.reduce((t, r) => t + r.errors, 0),
      compiles: codeRows.reduce((t, r) => t + r.compiles, 0),
      status: "submitted",
    },
  });

  recordUserActivitySafe(userId);
  revalidatePath('/student/assessments');
  revalidatePath('/student/assessment');
  return { success: "Assessment Submitted!" };
}


export const submitassessmentallquestions = async (data: z.infer<typeof upateUserAllAssessmentSchemaCode>) => {
  const session = await requireUser();
  if (!session) return { error: "Unauthorized" };

  // The attempt must belong to the signed-in student; the aggregation runs
  // against the attempt's own assessmentId — never the client's values.
  const userId = session.user.id;
  const attempt = await db.userAssessmentData.findUnique({
    where: { id: data.id },
  });
  if (!attempt || attempt.userId !== userId) {
    return { error: "Invalid Submission" };
  }
  const assessmentId = attempt.assessmentId;

  const existingrecords = await db.userAssessmentCodeData.findMany({
    where: {
      userId,
      assessmentId
    },

  })

  const totalquestionscore = existingrecords.reduce((total, record) => total + record.score, 0);
  const totalcompiles = existingrecords.reduce((total, record) => total + record.compiles, 0);
  const totalerrors = existingrecords.reduce((total, record) => total + record.errors, 0);
  const totalquestiontime = existingrecords.reduce((total, record) => total + parseInt(record?.duration || '0'), 0);

  // Clamp against the stored section total when one exists.
  const clampedquestionscore =
    attempt.totalquestionscore && attempt.totalquestionscore > 0
      ? Math.max(0, Math.min(totalquestionscore, attempt.totalquestionscore))
      : Math.max(0, totalquestionscore);

  await db.userAssessmentData.updateMany({
    where: {
      id: attempt.id,
      userId,
    },
    data: {
      questiontime: totalquestiontime,
      questionstatus: 'submitted',
      userquestionscore: clampedquestionscore,
      errors: totalerrors,
      compiles: totalcompiles,
    }
  });
  revalidatePath('/student/assessment');
  return { success: "Code Submitted" };
}


// Add Assessment
export const addassessment = async (values: z.infer<typeof AddAssessmentSchema>) => {
  const session = await requireAdmin();
  if (!session) return { error: "Only admins can add assessments." };

  await db.assessments.create({
    data: {
      ...values,
    },
  })

  revalidatePath("/admin/courses")
  return { success: "Assessment Added!" }
}

/**
 * Deletes an assessment along with every student attempt on it
 * (UserAssessmentData / MCQ / Code answers) in one transaction —
 * none of those relations cascade in the schema, so a bare
 * assessments.delete would hit FK constraints once any student has
 * attempted it. Question attachments are nullable FKs / implicit joins
 * and auto-detach, so they are left untouched.
 */
export const deleteassessment = async (values: z.infer<typeof DeleteAssessmentSchema>) => {
  const session = await requireAdmin();
  if (!session) return { error: "Only admins can delete assessments." };

  const aid = values.id
  const assessment = await db.assessments.findUnique({ where: { id: aid }, select: { id: true } });
  if (!assessment) return { error: "Assessment not found." };

  await db.$transaction(async (tx) => {
    // Remove student attempts first, then the assessment itself.
    await tx.userAssessmentData.deleteMany({ where: { assessmentId: aid } });
    await tx.userAssessmentMCQData.deleteMany({ where: { assessmentId: aid } });
    await tx.userAssessmentCodeData.deleteMany({ where: { assessmentId: aid } });
    await tx.assessments.delete({
      where: {
        id: aid,
      },
    })
  })

  revalidatePath("/admin/courses")
  return { success: "Assessment Deleted!" }
}

// Update Assessment
export const updateassessment = async (values: z.infer<typeof UpdateAssessmentSchema>) => {
  const session = await requireAdmin();
  if (!session) return { error: "Only admins can update assessments." };

  // Strip the id from the written data — it is only the where-key.
  const { id: aid, ...data } = values;
  await db.assessments.update({
    where: {
      id: aid,
    },
    data,
  })

  revalidatePath("/admin/courses")
  return { success: "Assessment Updated!" }
}

// Optional: Add Questions to Assessment
export const addassessmentquestions = async (assessmentId: string, questionIds: string[]) => {
  const session = await requireAdmin();
  if (!session) return { error: "Only admins can manage assessment questions." };

  const validIds = (questionIds ?? []).filter(
    (id) => typeof id === "string" && id.trim().length > 0
  );
  if (validIds.length === 0) return { error: "No questions selected." };

  await db.assessments.update({
    where: {
      id: assessmentId,
    },
    data: {
      codeQuestions: {
        connect: validIds.map((id) => ({ id })),
      },
    },
  })

  revalidatePath("/admin/courses")
  return { success: "Questions added to assessment successfully!" }
}

// Optional: Remove Question from Assessment
export const deleteassessmentquestion = async (questionId: string, assessmentId: string) => {
  const session = await requireAdmin();
  if (!session) return { error: "Only admins can manage assessment questions." };

  await db.assessments.update({
    where: {
      id: assessmentId,
    },
    data: {
      codeQuestions: {
        disconnect: { id: questionId },
      },
    },
  })

  revalidatePath("/admin/courses")
  return { success: "Question removed from assessment successfully!" }
}

export const deleteassessmentsbulk = async (ids: string[]) => {
  const session = await requireAdmin();
  if (!session) return { error: "Only admins can delete assessments." };

  const validIds = (ids ?? []).filter(
    (id) => typeof id === "string" && id.trim().length > 0
  );
  if (validIds.length === 0) return { error: "No assessments selected." };

  // Wipe every student attempt on the selected assessments first (the
  // attempts do not cascade), then remove the assessments themselves.
  const result = await db.$transaction(async (tx) => {
    await tx.userAssessmentData.deleteMany({ where: { assessmentId: { in: validIds } } });
    await tx.userAssessmentMCQData.deleteMany({ where: { assessmentId: { in: validIds } } });
    await tx.userAssessmentCodeData.deleteMany({ where: { assessmentId: { in: validIds } } });
    return tx.assessments.deleteMany({ where: { id: { in: validIds } } });
  });
  const deleted = result.count;
  const skipped = validIds.length - deleted;

  revalidatePath("/admin/courses");
  revalidatePath("/student/assessments");

  if (deleted === 0) {
    return {
      error:
        "None of the selected assessments could be deleted — they still contain questions or student attempts.",
    };
  }
  return { success: `${deleted} assessment(s) deleted.`, skipped: skipped > 0 ? skipped : undefined };
}

/**
 * Bulk-remove code questions from an assessment (the questions themselves
 * stay in the question bank — mirrors the row-level disconnect behaviour).
 */
export const deleteassessmentquestionsbulk = async (
  assessmentId: string,
  questionIds: string[]
) => {
  const session = await requireAdmin();
  if (!session) return { error: "Only admins can manage assessment questions." };

  const validIds = (questionIds ?? []).filter(
    (id) => typeof id === "string" && id.trim().length > 0
  );
  if (validIds.length === 0) return { error: "No questions selected." };

  const assessment = await db.assessments.findUnique({
    where: { id: assessmentId },
    select: { codeQuestions: { select: { id: true } } },
  });
  if (!assessment) return { error: "Assessment not found." };

  const connectedIds = assessment.codeQuestions
    .map((q) => q.id)
    .filter((id) => validIds.includes(id));
  if (connectedIds.length === 0) {
    return { error: "Selected questions are not part of this assessment." };
  }

  await db.assessments.update({
    where: { id: assessmentId },
    data: {
      codeQuestions: {
        disconnect: connectedIds.map((id) => ({ id })),
      },
    },
  });

  revalidatePath("/admin/courses");
  return { success: `${connectedIds.length} question(s) removed from the assessment.` };
}
