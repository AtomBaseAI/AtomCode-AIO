/**
 * Seed the "PYTHON Programming" question group into the AtomCode database.
 *
 * Sources: scripts/python-programming/data/day-NN.code.json + day-NN.mcq.json (days 1-20).
 *
 * Idempotent: if the group already exists, its questions / MCQs / topics
 * (and cascaded subtopics) are removed and recreated from the data files.
 *
 * Guards:
 *  - Within-group duplicate titles are auto-suffixed (rare; validator catches).
 *  - Titles that EXACTLY match a code/MCQ title in ANY OTHER group (e.g.
 *    "OOPS using JAVA") abort the seed — the "no repeats" policy means the
 *    content must be fixed, not renamed.
 *
 * Run: bun scripts/python-programming/seed.ts
 */
import { PrismaClient } from "@prisma/client";
import { config as dotenvConfig } from "dotenv";
import fs from "node:fs";
import path from "node:path";

// A stale system-level DATABASE_URL may exist in this sandbox; force the
// project's .env to win.
dotenvConfig({ override: true });

const db = new PrismaClient();
const GROUP_TITLE = "PYTHON Programming";
const dataDir = path.join(import.meta.dir, "data");

interface CodeQuestionJson {
  title: string;
  description: string;
  difficulty: string;
  maxscore: number;
  lang: string;
  topic: string;
  subtopic: string;
  sampleinput1: string;
  sampleoutput1: string;
  sampleinput2: string;
  sampleoutput2: string;
  input1: string;
  output1: string;
  input2: string;
  output2: string;
  input3: string;
  output3: string;
  inputconstrains: string;
  blacklist: string;
  whitelist: string;
  sourcecode: string;
}

interface McqQuestionJson {
  title: string;
  description: string;
  difficulty: string;
  topic: string;
  subtopic: string;
  Option1: string;
  Option2: string;
  Option3: string;
  Option4: string;
  CorrectOption: number;
  iscodesnippet: boolean;
  codesnippet: string | null;
  snippetLang: string | null;
}

interface TopicJson {
  name: string;
  subtopics: string[];
}

async function main() {
  // 1. Load all day files first (fail fast if anything is missing)
  const codeByDay = new Map<number, CodeQuestionJson[]>();
  const mcqByDay = new Map<number, McqQuestionJson[]>();
  const topicsByDay = new Map<number, TopicJson[]>();

  for (let day = 1; day <= 20; day++) {
    const nn = String(day).padStart(2, "0");
    const codeFile = path.join(dataDir, `day-${nn}.code.json`);
    const mcqFile = path.join(dataDir, `day-${nn}.mcq.json`);
    if (!fs.existsSync(codeFile) || !fs.existsSync(mcqFile)) {
      throw new Error(`Missing data files for day ${day}: ${codeFile}, ${mcqFile}`);
    }
    const codeJson = JSON.parse(fs.readFileSync(codeFile, "utf8"));
    const mcqJson = JSON.parse(fs.readFileSync(mcqFile, "utf8"));
    if (codeJson.day !== day || mcqJson.day !== day) {
      throw new Error(`Day mismatch in files for day ${day}`);
    }
    codeByDay.set(day, codeJson.questions as CodeQuestionJson[]);
    mcqByDay.set(day, mcqJson.questions as McqQuestionJson[]);
    topicsByDay.set(day, (codeJson.topics ?? []) as TopicJson[]);
  }

  const totalCode = [...codeByDay.values()].reduce((a, b) => a + b.length, 0);
  const totalMcq = [...mcqByDay.values()].reduce((a, b) => a + b.length, 0);
  console.log(`Loaded ${totalCode} code questions and ${totalMcq} MCQs from 20 day files.`);

  // 2. Cross-group duplicate-title guard (no-repeats policy)
  const newCodeTitles = [...codeByDay.values()].flat().map((q) => q.title);
  const newMcqTitles = [...mcqByDay.values()].flat().map((q) => q.title);
  const otherGroups = await db.questionGroup.findMany({
    where: { title: { not: GROUP_TITLE } },
    select: { id: true, title: true },
  });
  const collisions: string[] = [];
  for (const g of otherGroups) {
    const [gCode, gMcq] = await Promise.all([
      db.codeQuestion.findMany({ where: { questionGroupId: g.id }, select: { title: true } }),
      db.mCQQuestion.findMany({ where: { questionGroupId: g.id }, select: { title: true } }),
    ]);
    const gCodeSet = new Set(gCode.map((r) => r.title));
    const gMcqSet = new Set(gMcq.map((r) => r.title));
    for (const t of newCodeTitles) if (gCodeSet.has(t)) collisions.push(`code title "${t}" already in group "${g.title}"`);
    for (const t of newMcqTitles) if (gMcqSet.has(t)) collisions.push(`mcq title "${t}" already in group "${g.title}"`);
  }
  if (collisions.length) {
    console.error(`\n${collisions.length} cross-group duplicate title(s) — fix the data (no repeats policy):`);
    for (const c of collisions.slice(0, 50)) console.error("  - " + c);
    throw new Error("Cross-group duplicate titles detected. Seed aborted.");
  }
  console.log("Cross-group duplicate title check: clean.");

  // 3. Upsert the question group (title is not unique in schema — findFirst)
  let group = await db.questionGroup.findFirst({ where: { title: GROUP_TITLE } });
  if (group) {
    console.log(`Group "${GROUP_TITLE}" exists (${group.id}) — resetting its content.`);
    await db.$transaction([
      db.codeQuestion.deleteMany({ where: { questionGroupId: group.id } }),
      db.mCQQuestion.deleteMany({ where: { questionGroupId: group.id } }),
      db.topic.deleteMany({ where: { groupId: group.id } }), // cascades subtopics
    ]);
  } else {
    group = await db.questionGroup.create({ data: { title: GROUP_TITLE } });
    console.log(`Created group "${GROUP_TITLE}" (${group.id}).`);
  }
  const groupId = group.id;

  // 4. Recreate topics + subtopics (20 topics, one per day)
  const topicCount = await db.topic.createMany({
    data: [...topicsByDay.values()].flat().map((t) => ({ name: t.name, groupId })),
  });
  const topics = await db.topic.findMany({ where: { groupId } });
  console.log(`Created ${topicCount.count} topics.`);

  const subtopicRows = topics.flatMap((topic) => {
    const def = [...topicsByDay.values()].flat().find((t) => t.name === topic.name);
    return (def?.subtopics ?? []).map((s) => ({ name: s, topicId: topic.id }));
  });
  const subtopicCount = await db.subTopic.createMany({ data: subtopicRows });
  console.log(`Created ${subtopicCount.count} subtopics.`);

  // 5. Bulk-insert code questions (group-scoped; moduleId/assessmentId stay null)
  const usedCodeTitles = new Set<string>();
  const dedupeCode = (title: string, day: number): string => {
    if (!usedCodeTitles.has(title)) {
      usedCodeTitles.add(title);
      return title;
    }
    const suffixed = `${title} (Day ${String(day).padStart(2, "0")})`;
    let candidate = suffixed;
    let n = 2;
    while (usedCodeTitles.has(candidate)) candidate = `${suffixed} #${n++}`;
    usedCodeTitles.add(candidate);
    return candidate;
  };

  const codeRows = [...codeByDay.entries()].flatMap(([day, qs]) =>
    qs.map((q) => ({
      title: dedupeCode(q.title, day),
      description: q.description,
      moduleId: null,
      sampleinput1: q.sampleinput1,
      sampleinput2: q.sampleinput2,
      sampleoutput1: q.sampleoutput1,
      sampleoutput2: q.sampleoutput2,
      input1: q.input1,
      input2: q.input2,
      input3: q.input3,
      output1: q.output1,
      output2: q.output2,
      output3: q.output3,
      sourcecode: q.sourcecode,
      referenceimg: null,
      maxscore: q.maxscore,
      difficulty: q.difficulty,
      lang: q.lang,
      topic: q.topic,
      subtopic: q.subtopic,
      inputconstrains: q.inputconstrains,
      blacklist: q.blacklist,
      whitelist: q.whitelist,
      assessmentsId: null,
      questionGroupId: groupId,
    }))
  );
  const codeInserted = await db.codeQuestion.createMany({ data: codeRows });
  console.log(`Inserted ${codeInserted.count} code questions.`);

  // 6. Bulk-insert MCQ questions
  const usedMcqTitles = new Set<string>();
  const dedupeMcq = (title: string, day: number): string => {
    if (!usedMcqTitles.has(title)) {
      usedMcqTitles.add(title);
      return title;
    }
    const suffixed = `${title} (Day ${String(day).padStart(2, "0")})`;
    let candidate = suffixed;
    let n = 2;
    while (usedMcqTitles.has(candidate)) candidate = `${suffixed} #${n++}`;
    usedMcqTitles.add(candidate);
    return candidate;
  };

  const mcqRows = [...mcqByDay.entries()].flatMap(([day, qs]) =>
    qs.map((q) => ({
      title: dedupeMcq(q.title, day),
      description: q.description,
      topic: q.topic,
      subtopic: q.subtopic,
      Option1: q.Option1,
      Option2: q.Option2,
      Option3: q.Option3,
      Option4: q.Option4,
      CorrectOption: q.CorrectOption,
      moduleId: null,
      referenceimg: null,
      codesnippet: q.codesnippet ?? null,
      snippetLang: q.snippetLang ?? null,
      iscodesnippet: q.iscodesnippet,
      difficulty: q.difficulty,
      assessmentsId: null,
      questionGroupId: groupId,
    }))
  );
  const mcqInserted = await db.mCQQuestion.createMany({ data: mcqRows });
  console.log(`Inserted ${mcqInserted.count} MCQ questions.`);

  // 7. Verify
  const verify = await db.$transaction([
    db.codeQuestion.count({ where: { questionGroupId: groupId } }),
    db.mCQQuestion.count({ where: { questionGroupId: groupId } }),
    db.topic.count({ where: { groupId } }),
    db.subTopic.count({ where: { topic: { groupId } } }),
  ]);
  console.log("Verification (code / mcq / topics / subtopics):", verify.join(" / "));

  const diffRows = await db.codeQuestion.groupBy({
    by: ["difficulty"],
    where: { questionGroupId: groupId },
    _count: true,
  });
  console.log(
    "Code difficulty distribution:",
    diffRows.map((d) => `${d.difficulty}=${d._count}`).join(", ")
  );
  const mcqDiffRows = await db.mCQQuestion.groupBy({
    by: ["difficulty"],
    where: { questionGroupId: groupId },
    _count: true,
  });
  console.log(
    "MCQ difficulty distribution:",
    mcqDiffRows.map((d) => `${d.difficulty}=${d._count}`).join(", ")
  );
  console.log("Seed complete.");
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
