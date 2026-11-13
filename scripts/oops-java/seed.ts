/**
 * Seed the "OOPS using JAVA" question group into the AtomCode database.
 *
 * Sources: scripts/oops-java/data/day-NN.code.json + day-NN.mcq.json (days 1-20).
 *
 * Idempotent: if the group already exists, its questions / MCQs / topics
 * (and cascaded subtopics) are removed and recreated from the data files.
 *
 * Run: bun scripts/oops-java/seed.ts
 */
import { PrismaClient } from "@prisma/client";
import fs from "node:fs";
import path from "node:path";

const db = new PrismaClient();
const GROUP_TITLE = "OOPS using JAVA";
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

  // 2. Upsert the question group (title is not unique in schema — findFirst)
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

  // 3. Recreate topics + subtopics (21 topics: day 1 has two)
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

  // 4. Bulk-insert code questions (group-scoped; moduleId/assessmentId stay null)
  const codeRows = [...codeByDay.values()].flat().map((q) => ({
    title: q.title,
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
  }));
  const codeInserted = await db.codeQuestion.createMany({ data: codeRows });
  console.log(`Inserted ${codeInserted.count} code questions.`);

  // 5. Bulk-insert MCQ questions
  const mcqRows = [...mcqByDay.values()].flat().map((q) => ({
    title: q.title,
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
  }));
  const mcqInserted = await db.mCQQuestion.createMany({ data: mcqRows });
  console.log(`Inserted ${mcqInserted.count} MCQ questions.`);

  // 6. Verify
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
