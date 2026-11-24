/**
 * Demo data seeder for the NEW student dashboard (streaks / charts / stats).
 * Run: bun scripts/seed-activity.ts
 *
 * DEV-ONLY — refuses to run against NODE_ENV=production (same guard as
 * prisma/seed.ts). Idempotent: safe to re-run.
 *
 * What it creates (only when missing):
 *  - UserActivityDay rows for the last ~80 days for student@atom.com and
 *    student2@atom.com — plausible practice rhythm with a live current
 *    streak (today + the previous 6 days are always active).
 *  - A few practice submissions (code + MCQ) and one submitted module for
 *    student@atom.com so the solved counters, difficulty donut and course
 *    progress are non-empty.
 *  - One submitted attempt for the seeded "Unit Test 1" assessment.
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

if (process.env.NODE_ENV === "production" && !process.env.ALLOW_SEED) {
  console.error("REFUSING to seed demo data in production.");
  process.exit(1);
}

const dayKeyOf = (d: Date) => d.toISOString().slice(0, 10);
const shift = (key: string, days: number) => {
  const d = new Date(`${key}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return dayKeyOf(d);
};

/** Deterministic pseudo-random in [0,1) from a string seed. */
function rand(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 1000) / 1000;
}

async function seedActivity(userId: string, handle: string) {
  const today = dayKeyOf(new Date());
  const rows: { userId: string; dayKey: string; count: number }[] = [];

  for (let i = 79; i >= 0; i--) {
    const dayKey = shift(today, -i);
    const r = rand(`${handle}:${dayKey}`);
    const weekday = new Date(`${dayKey}T00:00:00Z`).getUTCDay();

    // Base probability of practising on a day: higher on weekdays,
    // recent weeks busier (learning ramp-up). Always quiet on some days
    // so the heatmap/streak history looks organic.
    const base = weekday === 0 ? 0.35 : 0.62;
    const recency = i < 30 ? 0.12 : 0;
    const active = r < base + recency;

    if (!active) continue;

    // 1–6 events per active day.
    const count = 1 + Math.floor(rand(`${handle}:c:${dayKey}`) * 6);
    rows.push({ userId, dayKey, count });
  }

  // Guarantee a live streak: today + previous 6 days.
  for (let i = 0; i < 7; i++) {
    const dayKey = shift(today, -i);
    if (!rows.some((row) => row.dayKey === dayKey)) {
      rows.push({ userId, dayKey, count: 1 + Math.floor(rand(`${handle}:s:${dayKey}`) * 4) });
    }
  }

  for (const row of rows) {
    await db.userActivityDay.upsert({
      where: { userId_dayKey: { userId: row.userId, dayKey: row.dayKey } },
      update: {},
      create: row,
    });
  }
  console.log(`  activity: ${rows.length} days for ${handle}`);
}

async function main() {
  const student = await db.user.findUnique({ where: { email: "student@atom.com" } });
  const student2 = await db.user.findUnique({ where: { email: "student2@atom.com" } });
  if (!student) throw new Error("student@atom.com not found — run prisma/seed.ts first");

  await seedActivity(student.id, "student");

  /* --- practice submissions for student@atom.com -------------------- */
  const modules = await db.module.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, courseId: true, title: true, maxscore: true },
  });
  const mod1 = modules[0];
  const mod2 = modules[1];

  const codeQuestions = await db.codeQuestion.findMany({
    where: { moduleId: mod1?.id },
    select: { id: true, difficulty: true, maxscore: true, moduleId: true },
  });

  if (mod1 && codeQuestions.length > 0) {
    const existing = await db.userCodeQuestionData.count({ where: { userId: student.id } });
    if (existing === 0) {
      // Solve the first question fully, attempt the second partially.
      await db.userCodeQuestionData.create({
        data: {
          userId: student.id,
          questionId: codeQuestions[0].id,
          moduleId: mod1.id,
          score: codeQuestions[0].maxscore,
          compiles: 3,
          errors: 1,
          submissiontype: "web",
          tabswitches: 0,
          status: "submitted",
          usercode: "// demo submission",
          duration: "420",
          testcase1status: "pass",
          testcase2status: "pass",
          testcase3status: "pass",
        },
      });
      if (codeQuestions[1]) {
        await db.userCodeQuestionData.create({
          data: {
            userId: student.id,
            questionId: codeQuestions[1].id,
            moduleId: mod1.id,
            score: 0,
            compiles: 2,
            errors: 3,
            submissiontype: "web",
            tabswitches: 1,
            status: "submitted",
            usercode: "// demo partial attempt",
            duration: "260",
            testcase1status: "pass",
            testcase2status: "fail",
            testcase3status: "fail",
          },
        });
      }
      console.log("  code submissions: 2 created");
    }
  }

  const mcqExisting = await db.userMCQData.count({ where: { userId: student.id } });
  if (mcqExisting === 0 && mod1) {
    await db.userMCQData.create({
      data: {
        userId: student.id,
        moduleId: mod1.id,
        score: 2, // both seeded MCQs correct
        errors: 0,
        submissiontype: "web",
        tabswitches: 0,
        status: "submitted",
        duration: "180",
      },
    });
    console.log("  mcq submission: 1 created");
  }

  // One submitted module → course progress 50% (2 modules total).
  // Idempotent: either create the row or flip an existing non-submitted row.
  if (mod1) {
    const existing = await db.userModuleData.findFirst({
      where: { userId: student.id, moduleId: mod1.id },
    });
    if (!existing) {
      await db.userModuleData.create({
        data: {
          userId: student.id,
          courseId: mod1.courseId,
          moduleId: mod1.id,
          mcqstatus: "submitted",
          usermcqscore: 2,
          totalmcqscore: 2,
          questionstatus: "submitted",
          userquestionscore: 10,
          totalquestionscore: 20,
          errors: 4,
          compiles: 5,
          modulemaxscore: mod1.maxscore,
          modulestatus: "submitted",
        },
      });
      console.log("  module data: 1 submitted (course progress 50%)");
    } else if (existing.modulestatus !== "submitted") {
      await db.userModuleData.update({
        where: { id: existing.id },
        data: { modulestatus: "submitted" },
      });
      console.log("  module data: existing row flipped to submitted (progress 50%)");
    }
  }

  /* --- one submitted assessment attempt ----------------------------- */
  const assessment = await db.assessments.findFirst({
    where: { title: "Unit Test 1" },
    include: { codeQuestions: { take: 1 } },
  });
  if (assessment) {
    const attempt = await db.userAssessmentData.findFirst({
      where: { userId: student.id, assessmentId: assessment.id },
    });
    if (!attempt) {
      await db.userAssessmentData.create({
        data: {
          userId: student.id,
          courseId: assessment.courseId,
          assessmentId: assessment.id,
          mcqstatus: "submitted",
          usermcqscore: 0,
          totalmcqscore: 0,
          questionstatus: "submitted",
          userquestionscore: assessment.codeQuestions[0]?.maxscore ?? 10,
          totalquestionscore: assessment.maxscore,
          errors: 1,
          compiles: 2,
          assessmentmaxscore: assessment.maxscore,
          assessmentstarttime: "10:00",
          userassessmentstarttime: "10:02",
          usertabswitches: 1,
          maxtabswitches: assessment.tabswitches,
          submissiontype: "web",
          status: "submitted",
          maxtime: assessment.maxtime,
          userduration: "1800",
        },
      });
      console.log("  assessment attempt: 1 submitted");
    }
  }

  if (student2) await seedActivity(student2.id, "student2");

  console.log("Demo dashboard data seeded.");
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
