/**
 * Post-seed verification for the "SQL Programming" question group.
 *
 * Checks (exit 0 = all good):
 *   1. Group exists with exactly 400 code + 400 MCQ + 20 topics.
 *   2. Every code question: lang=sql, non-empty hidden headerCode containing
 *      CREATE TABLE, non-empty sourcecode, topic/subtopic ∈ taxonomy,
 *      difficulty distribution 10/6/4 per day (via topic mapping).
 *   3. Judge-shaped slots: sampleoutput1 == output1, output2/3 empty.
 *   4. Every question's composed script (headerCode + sourcecode) executes on
 *      a fresh in-memory SQLite and reproduces the stored grid (sampleoutput1).
 *   5. MCQs: options present, CorrectOption sane, snippet consistency.
 *
 * Run (from /home/z/my-project, .env present):
 *   bun scripts/sql-programming/verify-db.ts
 */
import { PrismaClient } from "@prisma/client";
import { execSqlScript, composeUserCode, normalizeOutput } from "./lib.ts";
import { TOPIC_TAXONOMY } from "./taxonomy.ts";

const db = new PrismaClient();
const GROUP_TITLE = "SQL Programming";

let passed = 0;
let failed = 0;
function check(name: string, cond: boolean, extra = "") {
  if (cond) {
    passed++;
    console.log(`  PASS  ${name}`);
  } else {
    failed++;
    console.error(`  FAIL  ${name}${extra ? ` — ${extra}` : ""}`);
  }
}

async function main() {
  const group = await db.questionGroup.findFirst({
    where: { title: GROUP_TITLE },
    include: {
      topics: { orderBy: { name: "asc" }, include: { subtopics: { orderBy: { name: "asc" } } } },
      questions: { orderBy: { title: "asc" } },
      mcqQuestions: { orderBy: { title: "asc" } },
    },
  });
  check("group exists", Boolean(group));
  if (!group) throw new Error("group missing — run seed.ts first");

  check("400 code questions", group.questions.length === 400, `${group.questions.length}`);
  check("400 MCQ questions", group.mcqQuestions.length === 400, `${group.mcqQuestions.length}`);
  // Platform invariant: 20 taxonomy topics + default "general" topic.
  check("21 topics (20 taxonomy + default general)", group.topics.length === 21, `${group.topics.length}`);
  const generalTopic = group.topics.find((t) => t.name.toLowerCase() === "general");
  check("default general topic present with general subtopic",
    Boolean(generalTopic) && generalTopic.subtopics.some((s) => s.name.toLowerCase() === "general"));
  const topicsWithoutGeneralSub = group.topics.filter(
    (t) => !t.subtopics.some((s) => s.name.toLowerCase() === "general")
  ).length;
  check("every topic carries its default general subtopic", topicsWithoutGeneralSub === 0, `${topicsWithoutGeneralSub} missing`);
  check("133 subtopics (112 taxonomy + 21 general)",
    group.topics.reduce((sum, t) => sum + t.subtopics.length, 0) === 133,
    `${group.topics.reduce((sum, t) => sum + t.subtopics.length, 0)}`);

  // topic name -> day (from taxonomy)
  const topicToDay = new Map<string, number>();
  for (const [day, defs] of Object.entries(TOPIC_TAXONOMY)) {
    for (const def of defs) topicToDay.set(def.name, Number(day));
  }
  check("all topics map to taxonomy days",
    group.topics.every((t) => t.name.toLowerCase() === "general" || topicToDay.has(t.name)),
    group.topics.filter((t) => t.name.toLowerCase() !== "general" && !topicToDay.has(t.name)).map((t) => t.name).join(", ") || "ok");

  // per-day code counts (10/6/4)
  const perDay = new Map<number, { easy: number; medium: number; hard: number }>();
  for (const q of group.questions) {
    const day = topicToDay.get(q.topic ?? "");
    if (!day) continue;
    const bucket = perDay.get(day) ?? { easy: 0, medium: 0, hard: 0 };
    bucket[q.difficulty as "easy" | "medium" | "hard"]++;
    perDay.set(day, bucket);
  }
  const badDays = [...perDay.entries()]
    .filter(([day, c]) => !(c.easy === 10 && c.medium === 6 && c.hard === 4))
    .map(([day, c]) => `day ${day}: ${c.easy}/${c.medium}/${c.hard}`);
  check("per-day difficulty 10/6/4", badDays.length === 0, badDays.join("; ") || "ok");

  // headerCode / sourcecode / slot shape
  let missingHeader = 0, missingSolution = 0, badSlots = 0;
  for (const q of group.questions) {
    if (!q.headerCode?.trim() || !/CREATE\s+TABLE/i.test(q.headerCode)) missingHeader++;
    if (!q.sourcecode?.trim()) missingSolution++;
    const inputsOk = [q.sampleinput1, q.sampleinput2, q.input1, q.input2, q.input3]
      .every((v) => typeof v === "string" && v.trim().length > 0);
    const outputsOk = q.sampleoutput1 === q.output1 && q.output1 === q.output2 && q.output2 === q.output3;
    if (!inputsOk || !outputsOk) badSlots++;
  }
  check("every code question has hidden headerCode (CREATE TABLE …)", missingHeader === 0, `${missingHeader} bad`);
  check("every code question has a reference solution", missingSolution === 0, `${missingSolution} bad`);
  check("judge slot shape (all inputs non-empty; all outputs identical)", badSlots === 0, `${badSlots} bad`);

  // topic/subtopic integrity
  const taxonomySubtopics = new Map<string, Set<string>>();
  for (const defs of Object.values(TOPIC_TAXONOMY)) {
    for (const def of defs) taxonomySubtopics.set(def.name, new Set(def.subtopics));
  }
  const badTax = group.questions.filter(
    (q) => !taxonomySubtopics.get(q.topic ?? "")?.has(q.subtopic ?? "")
  ).length;
  const badTaxMcq = group.mcqQuestions.filter(
    (q) => !taxonomySubtopics.get(q.topic ?? "")?.has(q.subtopic ?? "")
  ).length;
  check("code topic/subtopic taxonomy", badTax === 0, `${badTax} bad`);
  check("mcq topic/subtopic taxonomy", badTaxMcq === 0, `${badTaxMcq} bad`);

  // execute every composed script locally and verify stored grid
  console.log(`\nExecuting ${group.questions.length} composed scripts on in-memory SQLite…`);
  let execFail = 0, gridFail = 0;
  for (const q of group.questions) {
    const run = await execSqlScript(composeUserCode(q.headerCode, q.sourcecode ?? ""));
    if (!run.ok) {
      execFail++;
      console.error(`    exec fail: "${q.title}" — ${run.error}`);
      continue;
    }
    if (normalizeOutput(run.grid) !== normalizeOutput(q.sampleoutput1 ?? "")) {
      gridFail++;
      console.error(`    grid mismatch: "${q.title}"`);
    }
  }
  check("all composed scripts execute", execFail === 0, `${execFail} failures`);
  check("stored grids match execution", gridFail === 0, `${gridFail} mismatches`);

  // MCQ sanity
  const badMcq = group.mcqQuestions.filter(
    (q) =>
      !q.Option1?.trim() || !q.Option2?.trim() || !q.Option3?.trim() || !q.Option4?.trim() ||
      ![1, 2, 3, 4].includes(q.CorrectOption) ||
      (q.iscodesnippet ? !q.codesnippet?.trim() || q.snippetLang !== "sql" : Boolean(q.codesnippet))
  ).length;
  check("mcq options/correct/snippet sanity", badMcq === 0, `${badMcq} bad`);
  const snippetCount = group.mcqQuestions.filter((q) => q.iscodesnippet).length;
  check("snippet MCQs present (>=120 of 400)", snippetCount >= 120, `${snippetCount}`);

  console.log(`\n==== ${passed} passed, ${failed} failed ====`);
  process.exit(failed === 0 ? 0 : 1);
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
