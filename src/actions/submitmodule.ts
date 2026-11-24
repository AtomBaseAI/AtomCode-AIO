"use server"
import { db } from "@/lib/db";
import { startUserModelDataSchema, upateUserModelSchemaCode, upateUserModelSchemaMCQ } from "@/schemas/student/usersavemodule-schema";
import { revalidatePath } from "next/cache";
import { getStudentModuleLock } from "@/lib/module-access";
import { recalcCourseCompletion } from "@/lib/course-progress";
import { requireUser } from "@/lib/action-guards";
import { recordUserActivitySafe } from "@/lib/activity";

import * as z from 'zod';


export const startModule = async (data: z.infer<typeof startUserModelDataSchema>) => {
  const session = await requireUser();
  if (!session) return { error: "Unauthorized" };

  // The attempt always belongs to the signed-in student — a client-supplied
  // userId is never trusted.
  const userId = session.user.id;

  // Load the module — the course link and the section totals are
  // SERVER-authoritative (same arithmetic the client mirrors: 1 point per
  // MCQ, 10 per code question, module maxscore as the ceiling).
  const module_ = await db.module.findUnique({
    where: { id: data.moduleId },
    select: {
      id: true,
      courseId: true,
      maxscore: true,
      _count: { select: { mcqQuestions: true, codeQuestions: true } },
    },
  });
  if (!module_) return { error: "Invalid Submission" };

  // Server-side enforcement of the course completion order — the lock
  // badges in the UI are cosmetic; this is the real gate.
  const lock = await getStudentModuleLock(userId, module_.id);
  if (lock.found && lock.locked) {
    if (lock.reason === "date") {
      return { error: "Module is locked — it unlocks on its scheduled module date." };
    }
    return {
      error: lock.prerequisiteTitle
        ? `Module is locked — complete "${lock.prerequisiteTitle}" first.`
        : "Module is locked — complete the previous module first.",
    };
  }

  await db.userModuleData.create({
    data: {
      userId,
      courseId: module_.courseId,
      moduleId: module_.id,
      modulemaxscore: module_.maxscore,
      modulestatus: data.modulestatus,
      totalmcqscore: module_._count.mcqQuestions,
      totalquestionscore: module_._count.codeQuestions * 10
    }
  });

  revalidatePath('/student/courses');
  return { success: "Starting Module" };
};


export const mcqdataUpdateModule = async (data: z.infer<typeof upateUserModelSchemaMCQ>) => {
  const session = await requireUser();
  if (!session) return { error: "Unauthorized" };
  const userId = session.user.id;

  const row = await db.userModuleData.findUnique({
    where: {
      id: data.id
    }
  })
  if (!row || row.userId !== userId) {
    return { error: "Invalid Submission" };
  }

  // The MCQ section score is 1 point per question — clamp to the stored
  // section total and never below zero, whatever the client claims.
  const usermcqscore =
    row.totalmcqscore && row.totalmcqscore > 0
      ? Math.max(0, Math.min(data.usermcqscore, row.totalmcqscore))
      : Math.max(0, data.usermcqscore);

  await db.userModuleData.updateMany({
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
  revalidatePath('/student/practice');
  return { success: "MCQ's Submitted" };
}


export const codedataUpdateModule = async (data: z.infer<typeof upateUserModelSchemaCode>) => {
  const session = await requireUser();
  if (!session) return { error: "Unauthorized" };
  const userId = session.user.id;

  const row = await db.userModuleData.findUnique({
    where: {
      id: data.id
    }
  })
  if (!row || row.userId !== userId) {
    return { error: "Invalid Submission" };
  }

  // Aggregate the caller's OWN submissions for this module — the client's
  // userId/moduleId fields are never trusted.
  const existingrecords = await db.userCodeQuestionData.findMany({
    where: {
      userId,
      moduleId: row.moduleId
    },

  })

  const totalquestionscore = existingrecords.reduce((total, record) => total + record.score, 0);
  const totalcompiles = existingrecords.reduce((total, record) => total + record.compiles, 0);
  const totalerrors = existingrecords.reduce((total, record) => total + record.errors, 0);
  const totalquestiontime = existingrecords.reduce((total, record) => total + parseInt(record?.duration || '0'), 0);

  // Clamp against the stored section total when one exists.
  const clampedquestionscore =
    row.totalquestionscore && row.totalquestionscore > 0
      ? Math.max(0, Math.min(totalquestionscore, row.totalquestionscore))
      : Math.max(0, totalquestionscore);

  await db.userModuleData.updateMany({
    where: {
      id: row.id,
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
  revalidatePath('/student/practice');
  return { success: "Code Submitted" };
}


//end module
export const endModule = async (umid: string) => {
  const session = await requireUser();
  if (!session) return { error: "Unauthorized" };

  const checkdata = await db.userModuleData.findUnique({
    where: {
      id: umid
    }
  })
  if (!checkdata || checkdata.userId !== session.user.id) {
    return { error: "Invalid Submission" };
  }

  await db.userModuleData.updateMany({
    where: {
      id: umid,
      userId: session.user.id,
    },
    data: {
      modulestatus: 'submitted'
    }
  });

  // Persist the course-level completion percentage so the admin & staff
  // dashboards (which aggregate the stored UserCourse field) stay accurate.
  if (checkdata.userId && checkdata.courseId) {
    await recalcCourseCompletion(checkdata.userId, checkdata.courseId);
  }

  recordUserActivitySafe(session.user.id);
  revalidatePath('/student/courses');
  return { success: "Module Submitted" };
}
