import { db } from "@/lib/db";
import { getISTParts } from "@/lib/utils";
import { getAllUserCourses } from "@/data/student/courses";
import { getAssessmentsByUserId } from "@/data/student/assessments";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface DashboardStat {
  enrolled: number;
  active: number;
  completed: number;
  solvedCode: number;
  solvedMcq: number;
  assessmentsCompleted: number;
}

export interface StreakInfo {
  /** Consecutive active days ending today (or yesterday if today is quiet). */
  current: number;
  longest: number;
  totalActiveDays: number;
  /** true when the student already practised today. */
  activeToday: boolean;
}

/** 30-day series for the practice activity chart. */
export interface ActivityPoint {
  dayKey: string;
  /** Short axis label, e.g. "12 Nov". */
  label: string;
  count: number;
}

export type DifficultyRow = { name: string; count: number };

export interface UpcomingAssessment {
  assessmentid: string;
  courseid: string;
  title: string;
  coursetitle: string;
  assessmentdate: string;
  starttime: string;
  maxtime: string;
  status: string;
}

export interface StudentDashboardData {
  stats: DashboardStat;
  streak: StreakInfo;
  /** Last 30 days, oldest → newest (today last). */
  activity30: ActivityPoint[];
  /** dayKey → event count for every day in the heatmap window. */
  activityMap: Record<string, number>;
  difficulty: DifficultyRow[];
  upcoming: UpcomingAssessment[];
  courses: Awaited<ReturnType<typeof getAllUserCourses>>;
}

/* ------------------------------------------------------------------ */
/* Streak math (all keys are app-timezone "YYYY-MM-DD" dayKeys)        */
/* ------------------------------------------------------------------ */

/** UTC-midnight anchor for a dayKey — its own dayKey in any +XX:30 zone. */
const keyToUtc = (dayKey: string): Date => new Date(`${dayKey}T00:00:00Z`);

/** dayKey of `date` shifted by `days`. */
const shiftKey = (dayKey: string, days: number): string => {
  const d = keyToUtc(dayKey);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

export function computeStreak(dayKeys: string[]): StreakInfo {
  const set = new Set(dayKeys);
  const today = getISTParts(new Date())?.dayKey;
  if (!today) {
    return { current: 0, longest: 0, totalActiveDays: 0, activeToday: false };
  }

  const activeToday = set.has(today);
  // Current streak: walk back from today (or yesterday when today is quiet
  // — the streak is still alive, it just needs practice before midnight).
  let current = 0;
  let cursor = activeToday ? today : shiftKey(today, -1);
  while (set.has(cursor)) {
    current += 1;
    cursor = shiftKey(cursor, -1);
  }

  // Longest streak across history.
  const sorted = [...set].sort();
  let longest = 0;
  let run = 0;
  let prev: string | null = null;
  for (const key of sorted) {
    run = prev && shiftKey(prev, 1) === key ? run + 1 : 1;
    longest = Math.max(longest, run);
    prev = key;
  }

  return {
    current,
    longest,
    totalActiveDays: set.size,
    activeToday,
  };
}

/* ------------------------------------------------------------------ */
/* Main aggregation                                                    */
/* ------------------------------------------------------------------ */

export async function getStudentDashboardData(
  userId: string,
): Promise<StudentDashboardData> {
  const todayKey = getISTParts(new Date())?.dayKey ?? "";

  const [courses, codeRows, mcqRows, assessmentRows, activityRows, allAssessments] =
    await Promise.all([
      getAllUserCourses(userId),
      db.userCodeQuestionData.findMany({
        where: { userId },
        select: {
          status: true,
          score: true,
          codeQuestion: { select: { difficulty: true } },
        },
      }),
      db.userMCQData.findMany({
        where: { userId },
        select: { score: true },
      }),
      db.userAssessmentData.count({
        where: { userId, status: "submitted" },
      }),
      db.userActivityDay.findMany({
        where: { userId },
        select: { dayKey: true, count: true },
      }),
      getAssessmentsByUserId(userId),
    ]);

  /* --- stats ------------------------------------------------------- */
  const enrolled = courses.length;
  const active = courses.filter((c) => c.courseStatus).length;
  const completed = courses.filter((c) => c.courseProgres >= 100).length;

  // Solved code = submitted rows with a positive score, grouped by difficulty.
  const solvedByDifficulty: Record<string, number> = {};
  let solvedCode = 0;
  for (const row of codeRows) {
    if (row.status === "submitted" && row.score > 0) {
      solvedCode += 1;
      const difficulty = (row.codeQuestion?.difficulty ?? "easy").toLowerCase();
      solvedByDifficulty[difficulty] = (solvedByDifficulty[difficulty] ?? 0) + 1;
    }
  }
  const difficulty: DifficultyRow[] = ["easy", "medium", "hard"]
    .filter((d) => solvedByDifficulty[d] !== undefined)
    .map((d) => ({ name: d, count: solvedByDifficulty[d] }));

  // MCQ practice: each row's score is the number of correct answers.
  const solvedMcq = mcqRows.reduce((sum, row) => sum + (row.score ?? 0), 0);

  const stats: DashboardStat = {
    enrolled,
    active,
    completed,
    solvedCode,
    solvedMcq,
    assessmentsCompleted: assessmentRows,
  };

  /* --- streak / activity ------------------------------------------- */
  const activityMap: Record<string, number> = {};
  for (const row of activityRows) {
    activityMap[row.dayKey] = row.count;
  }
  const streak = computeStreak(Object.keys(activityMap));

  // 30-day chart series, oldest → newest, zero-filled for quiet days.
  const activity30: ActivityPoint[] = [];
  for (let i = 29; i >= 0; i--) {
    const dayKey = shiftKey(todayKey, -i);
    const date = keyToUtc(dayKey);
    const label = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      timeZone: "UTC",
    });
    activity30.push({ dayKey, label, count: activityMap[dayKey] ?? 0 });
  }

  /* --- upcoming / live assessments ---------------------------------- */
  const upcoming: UpcomingAssessment[] = allAssessments
    .filter((a) => ["start", "resume", "retake", "upcoming"].includes(a.status))
    .sort((a, b) => {
      // "DD/MM/YYYY" → sortable numeric key.
      const toKey = (s: string) => {
        const [d, m, y] = s.split("/").map(Number);
        return y * 10000 + m * 100 + d;
      };
      return toKey(a.assessmentdate) - toKey(b.assessmentdate);
    })
    .slice(0, 4)
    .map((a) => ({
      assessmentid: a.assessmentid,
      courseid: a.courseid,
      title: a.title,
      coursetitle: a.coursetitle,
      assessmentdate: a.assessmentdate,
      starttime: a.starttime,
      maxtime: a.maxtime,
      status: a.status,
    }));

  return {
    stats,
    streak,
    activity30,
    activityMap,
    difficulty,
    upcoming,
    courses,
  };
}
