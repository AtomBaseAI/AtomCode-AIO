// AtomCode — Admin dashboard data layer.
// Every function is fault-tolerant (returns null/[] on DB failure) so the
// dashboard always renders with zeros / empty-state charts instead of
// crashing — consistent with the rest of src/data/*.

import { db } from "@/lib/db";

/** Generic label + count pair consumed by the chart components. */
export type NameCount = { name: string; count: number };

export type CourseEnrollment = {
  name: string;
  students: number;
  /** Average UserCourse.completionPercentage (0–100). */
  completion: number;
};

export type DashboardCounts = {
  students: number;
  staffs: number;
  courses: number;
  modules: number;
  codeQuestions: number;
  mcqQuestions: number;
  assessments: number;
  enrollments: number;
  practiceSubmissions: number;
  mcqSubmissions: number;
  assessmentAttempts: number;
  feedbacks: number;
};

const EMPTY_COUNTS: DashboardCounts = {
  students: 0,
  staffs: 0,
  courses: 0,
  modules: 0,
  codeQuestions: 0,
  mcqQuestions: 0,
  assessments: 0,
  enrollments: 0,
  practiceSubmissions: 0,
  mcqSubmissions: 0,
  assessmentAttempts: 0,
  feedbacks: 0,
};

const toNameCounts = (
  rows: { _count: number; [k: string]: unknown }[],
  key: string,
): NameCount[] =>
  rows
    .map((r) => ({ name: String(r[key] ?? "Unknown"), count: r._count }))
    .sort((a, b) => b.count - a.count);

/** All headline numbers for the stat cards, in one round-trip batch. */
export const getDashboardCounts = async (): Promise<DashboardCounts> => {
  try {
    const [
      students,
      staffs,
      courses,
      modules,
      codeQuestions,
      mcqQuestions,
      assessments,
      enrollments,
      practiceSubmissions,
      mcqSubmissions,
      assessmentAttempts,
      feedbacks,
    ] = await Promise.all([
      db.user.count(),
      db.staff.count(),
      db.course.count(),
      db.module.count(),
      db.codeQuestion.count(),
      db.mCQQuestion.count(),
      db.assessments.count(),
      db.userCourse.count(),
      db.userCodeQuestionData.count(),
      db.userMCQData.count(),
      db.userAssessmentData.count(),
      db.feedbacks.count(),
    ]);
    return {
      students,
      staffs,
      courses,
      modules,
      codeQuestions,
      mcqQuestions,
      assessments,
      enrollments,
      practiceSubmissions,
      mcqSubmissions,
      assessmentAttempts,
      feedbacks,
    };
  } catch {
    return EMPTY_COUNTS;
  }
};

/** Code-question count per language (sorted high → low). */
export const getQuestionsByLanguage = async (): Promise<NameCount[]> => {
  try {
    const rows = await db.codeQuestion.groupBy({
      by: ["lang"],
      _count: true,
    });
    return toNameCounts(rows, "lang");
  } catch {
    return [];
  }
};

/** Code-question count per difficulty bucket (easy / medium / hard). */
export const getQuestionsByDifficulty = async (): Promise<NameCount[]> => {
  try {
    const rows = await db.codeQuestion.groupBy({
      by: ["difficulty"],
      _count: true,
    });
    return toNameCounts(rows, "difficulty");
  } catch {
    return [];
  }
};

/** Student count per department; NULL departments grouped as "Unassigned". */
export const getStudentsByDepartment = async (): Promise<NameCount[]> => {
  try {
    const rows = await db.user.groupBy({ by: ["department"], _count: true });
    return rows
      .map((r) => ({
        name: r.department && r.department.trim() !== "" ? r.department : "Unassigned",
        count: r._count,
      }))
      .sort((a, b) => b.count - a.count);
  } catch {
    return [];
  }
};

/** Per-course enrollment with average completion %, strongest courses first. */
export const getCourseEnrollments = async (limit = 8): Promise<CourseEnrollment[]> => {
  try {
    const [grouped, courses] = await Promise.all([
      db.userCourse.groupBy({
        by: ["courseId"],
        _count: true,
        _avg: { completionPercentage: true },
      }),
      db.course.findMany({ select: { id: true, title: true } }),
    ]);
    return grouped
      .map((g) => ({
        name: courses.find((c) => c.id === g.courseId)?.title ?? "Unknown course",
        students: g._count,
        completion: Math.round((g._avg.completionPercentage ?? 0) * 10) / 10,
      }))
      .sort((a, b) => b.students - a.students)
      .slice(0, limit);
  } catch {
    return [];
  }
};

/** Practice code-submission outcome split (status values as stored). */
export const getPracticeSubmissionStatus = async (): Promise<NameCount[]> => {
  try {
    const rows = await db.userCodeQuestionData.groupBy({
      by: ["status"],
      _count: true,
    });
    return toNameCounts(rows, "status");
  } catch {
    return [];
  }
};

/** Attempts per assessment (most attempted first), titles joined in JS. */
export const getAssessmentParticipation = async (limit = 8): Promise<NameCount[]> => {
  try {
    const [grouped, assessments] = await Promise.all([
      db.userAssessmentData.groupBy({
        by: ["assessmentId"],
        _count: true,
      }),
      db.assessments.findMany({ select: { id: true, title: true } }),
    ]);
    return grouped
      .map((g) => ({
        name: assessments.find((a) => a.id === g.assessmentId)?.title ?? "Unknown",
        count: g._count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  } catch {
    return [];
  }
};
