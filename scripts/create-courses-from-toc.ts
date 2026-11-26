/**
 * AtomCode — create one course per question group (except "Seed Questions"),
 * structured from the curriculum TOCs (uploaded PDFs + scripts taxonomy files).
 *
 * Day→topic order sources:
 *   - scripts/{c-programming,python-programming,ruby-programming,sql-programming}/taxonomy.ts
 *     → TOPIC_TAXONOMY: Record<number, TopicDef[]> (day → topics)
 *   - scripts/{dsa-cpp,dsa-java,dsa-python}/taxonomy.ts
 *     → DAY_TOPICS: TopicDef[] (Day N = index N-1)
 *   - OOPS using JAVA → scripts/oops-java/data/day-XX.code.json (topics field)
 *   - OOPS using CPP  → scripts/cpp-bank/dayXX.mjs meta.topic
 *
 * Per group:
 *   - 1 course (title = group title, language = bank language, daywise unlock)
 *   - 20 modules "Day N: Topic" (moduledate = start + N-1 days)
 *   - every code/MCQ question of that group's day-topic(s) attaches to the
 *     module (moduleId) — full 20+20 bank per day.
 *
 * Run: set -a; . ./.env; set +a; bun scripts/create-courses-from-toc.ts
 */
import { PrismaClient } from "@prisma/client";
import { TOPIC_TAXONOMY as C_TAX } from "./c-programming/taxonomy";
import { TOPIC_TAXONOMY as PY_TAX } from "./python-programming/taxonomy";
import { TOPIC_TAXONOMY as RB_TAX } from "./ruby-programming/taxonomy";
import { TOPIC_TAXONOMY as SQL_TAX } from "./sql-programming/taxonomy";
import { DAY_TOPICS as DSA_CPP } from "./dsa-cpp/taxonomy";
import { DAY_TOPICS as DSA_JAVA } from "./dsa-java/taxonomy";
import { DAY_TOPICS as DSA_PY } from "./dsa-python/taxonomy";

const db = new PrismaClient();

type DayMap = string[][]; // index 0 → Day 1 topics

function fromRecordTax(rec: Record<number, { name: string }[]>): DayMap {
  const days: string[][] = [];
  for (let d = 1; d <= 20; d++) {
    const defs = rec[d] ?? [];
    days.push(defs.map((t) => t.name));
  }
  return days;
}

function fromArrayTax(arr: { name: string }[]): DayMap {
  return arr.map((t) => [t.name]);
}

/** OOPS using JAVA — Day 1 spans "Introduction to Java" + "Data Types and Variables". */
const OOPS_JAVA_DAYS: DayMap = [
  ["Introduction to Java", "Data Types and Variables"],
  ["Operators"],
  ["Control Statements"],
  ["Looping Statements"],
  ["Functions and Modular Programming"],
  ["Recursion"],
  ["1D Arrays"],
  ["2D Arrays"],
  ["Strings"],
  ["Introduction to OOP"],
  ["Classes and Objects"],
  ["Constructors and Overloading"],
  ["Inheritance and Interfaces"],
  ["Polymorphism"],
  ["Exception Handling"],
  ["Collections Framework 1"],
  ["Collections Framework 2"],
  ["Multithreading and Concurrency"],
  ["Generics and Lambda Expressions"],
  ["File Handling in Java"],
];

/** OOPS using CPP — from scripts/cpp-bank/dayXX.mjs meta.topic. */
const OOPS_CPP_DAYS: DayMap = [
  ["Introduction to C++"],
  ["Operators"],
  ["Control Statements"],
  ["Looping Statements"],
  ["Functions and Modular Programming"],
  ["Recursion"],
  ["1D Arrays"],
  ["2D Arrays"],
  ["Strings"],
  ["Pattern Manipulation"],
  ["Pointers and Dynamic Memory"],
  ["Introduction to Object-Oriented Programming (OOP)"],
  ["Constructors and Destructors"],
  ["Inheritance"],
  ["Polymorphism"],
  ["Templates and STL"],
  ["Exception Handling, Multithreading"],
  ["Advanced OOP (Abstract Classes, Virtual Functions)"],
  ["Operator Overloading"],
  ["File Handling"],
];

interface GroupPlan {
  groupTitle: string;
  language: string;
  days: DayMap;
}

const PLANS: GroupPlan[] = [
  { groupTitle: "C Programming", language: "c", days: fromRecordTax(C_TAX) },
  { groupTitle: "OOPS using JAVA", language: "java", days: OOPS_JAVA_DAYS },
  { groupTitle: "OOPS using CPP", language: "cpp", days: OOPS_CPP_DAYS },
  { groupTitle: "PYTHON Programming", language: "python", days: fromRecordTax(PY_TAX) },
  { groupTitle: "DSA Using Java", language: "java", days: fromArrayTax(DSA_JAVA) },
  { groupTitle: "DSA Using Python", language: "python", days: fromArrayTax(DSA_PY) },
  { groupTitle: "DSA Using C++", language: "cpp", days: fromArrayTax(DSA_CPP) },
  { groupTitle: "SQL Programming", language: "sql", days: fromRecordTax(SQL_TAX) },
  { groupTitle: "Ruby Programming", language: "ruby", days: fromRecordTax(RB_TAX) },
];

async function createCourseForGroup(plan: GroupPlan) {
  const group = await db.questionGroup.findFirst({
    where: { title: plan.groupTitle },
    select: { id: true, title: true },
  });
  if (!group) {
    console.error(`SKIP ${plan.groupTitle}: question group not found in DB`);
    return null;
  }

  const existing = await db.course.findFirst({ where: { title: plan.groupTitle } });
  if (existing) {
    console.log(`SKIP ${plan.groupTitle}: course already exists (${existing.id})`);
    return null;
  }

  // Validate all day topics exist in the group's topic list.
  const dbTopics = new Set(
    (await db.topic.findMany({ where: { groupId: group.id }, select: { name: true } })).map(
      (t) => t.name
    )
  );
  const missing: string[] = [];
  for (const day of plan.days) {
    for (const t of day) {
      if (!dbTopics.has(t)) missing.push(t);
    }
  }
  if (missing.length > 0) {
    throw new Error(
      `${plan.groupTitle}: topics not found in DB group: ${missing.join(", ")}`
    );
  }

  const now = new Date();
  const course = await db.course.create({
    data: {
      title: plan.groupTitle,
      startdate: now,
      enddate: new Date(now.getTime() + 35 * 864e5),
      language: plan.language,
      courseType: "code-mcq",
      anyLanguage: false,
      completionOrder: "daywise",
    },
  });

  let totalCode = 0;
  let totalMcq = 0;
  const dayCount = plan.days.length;

  for (let i = 0; i < dayCount; i++) {
    const dayNum = i + 1;
    const topics = plan.days[i];
    const moduleTitle = `Day ${dayNum}: ${topics[0]}`;
    const moduledate = new Date(now.getTime() + i * 864e5);

    // Count still-unassigned questions for this day's topics.
    const mcqCountBefore = await db.mCQQuestion.count({
      where: { questionGroupId: group.id, moduleId: null, topic: { in: topics } },
    });
    const codeCountBefore = await db.codeQuestion.count({
      where: { questionGroupId: group.id, moduleId: null, topic: { in: topics } },
    });

    const module = await db.module.create({
      data: {
        title: moduleTitle,
        courseId: course.id,
        moduledate,
        createdAt: new Date(now.getTime() + i * 1000),
        modulestatus: "active",
        language: plan.language,
        maxscore: codeCountBefore * 10 + mcqCountBefore * 10,
      },
    });

    const codeRes = await db.codeQuestion.updateMany({
      where: { questionGroupId: group.id, moduleId: null, topic: { in: topics } },
      data: { moduleId: module.id },
    });
    const mcqRes = await db.mCQQuestion.updateMany({
      where: { questionGroupId: group.id, moduleId: null, topic: { in: topics } },
      data: { moduleId: module.id },
    });

    totalCode += codeRes.count;
    totalMcq += mcqRes.count;
    console.log(
      `  ${plan.groupTitle} | ${moduleTitle} → +${codeRes.count} code, +${mcqRes.count} mcq`
    );
  }

  console.log(
    `COURSE ${plan.groupTitle} (${course.id}) — ${dayCount} modules, ${totalCode} code + ${totalMcq} mcq attached`
  );
  return course.id;
}

async function main() {
  const created: Record<string, string> = {};
  for (const plan of PLANS) {
    const id = await createCourseForGroup(plan);
    if (id) created[plan.groupTitle] = id;
  }

  console.log("\n=== SUMMARY ===");
  const courses = await db.course.findMany({
    select: {
      title: true,
      language: true,
      completionOrder: true,
      _count: { select: { modules: true } },
    },
  });
  for (const c of courses) {
    console.log(
      `${c.title} | lang=${c.language} | order=${c.completionOrder} | modules=${c._count.modules}`
    );
  }

  // Leftover check: any group question still unassigned (excluding 'general')?
  const groups = await db.questionGroup.findMany({
    where: { title: { not: "Seed Questions" } },
    select: { id: true, title: true },
  });
  for (const g of groups) {
    const left = await db.codeQuestion.count({
      where: { questionGroupId: g.id, moduleId: null },
    });
    const leftMcq = await db.mCQQuestion.count({
      where: { questionGroupId: g.id, moduleId: null },
    });
    if (left > 0 || leftMcq > 0) {
      console.log(`LEFTOVER ${g.title}: ${left} code, ${leftMcq} mcq unassigned`);
    }
  }
  console.log("done ✓");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
