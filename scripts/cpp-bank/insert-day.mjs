/**
 * insert-day.mjs — inserts one verified day file into the database.
 *
 * Usage: bun cpp-bank/insert-day.mjs day01
 * Requires cpp-bank/dayNN.verified.json (produced by verify-day.mjs)
 * and the group/topics created by insert-group.mjs.
 *
 * Guards:
 *  - refuses to insert a title that already exists in the DB (global dedupe)
 *  - links questions to the group via questionGroupId
 *  - sets topic/subtopic strings that match the Topic/SubTopic names
 */
import { readFileSync, existsSync } from "node:fs";
import { db } from "../src/lib/db";
import { GROUP_TITLE } from "./topics.mjs";

const dayId = process.argv[2];
if (!dayId) {
  console.error("Usage: bun cpp-bank/insert-day.mjs dayNN");
  process.exit(1);
}
const file = new URL(`./${dayId}.verified.json`, import.meta.url);
if (!existsSync(file)) {
  console.error(`Missing ${file} — run verify-day.mjs first`);
  process.exit(1);
}
const { meta, code, mcqs } = JSON.parse(readFileSync(file, "utf8"));

async function main() {
  const group = await db.questionGroup.findFirst({
    where: { title: GROUP_TITLE },
  });
  if (!group) throw new Error(`Group "${GROUP_TITLE}" not found — run insert-group.mjs`);

  const topic = await db.topic.findFirst({
    where: { groupId: group.id, name: meta.topic },
    include: { subtopics: true },
  });
  if (!topic) throw new Error(`Topic "${meta.topic}" not found in group`);

  const subNames = new Set(topic.subtopics.map((s) => s.name));

  // Global title-dedupe against every existing question
  const existingCodeTitles = new Set(
    (await db.codeQuestion.findMany({ select: { title: true } })).map((q) => q.title)
  );
  const existingMcqTitles = new Set(
    (await db.mCQQuestion.findMany({ select: { title: true } })).map((q) => q.title)
  );

  let codeInserted = 0;
  for (const q of code) {
    if (existingCodeTitles.has(q.title)) {
      console.log(`  SKIP code (title exists): ${q.title}`);
      continue;
    }
    if (q.topic !== meta.topic) throw new Error(`Topic mismatch in "${q.title}"`);
    if (q.subtopic && !subNames.has(q.subtopic))
      throw new Error(`Unknown subtopic "${q.subtopic}" in "${q.title}"`);
    if (!q.sampleoutput1 || !q.output1 || !q.output2 || !q.output3)
      throw new Error(`Missing verified outputs in "${q.title}" — run verify first`);

    await db.codeQuestion.create({
      data: {
        title: q.title,
        description: q.description,
        sampleinput1: q.sampleinput1 ?? "",
        sampleinput2: q.sampleinput2 ?? "",
        sampleoutput1: q.sampleoutput1,
        sampleoutput2: q.sampleoutput2 ?? "",
        input1: q.input1 ?? "",
        input2: q.input2 ?? "",
        input3: q.input3 ?? "",
        output1: q.output1,
        output2: q.output2 ?? "",
        output3: q.output3 ?? "",
        sourcecode: q.sourcecode,
        maxscore: q.maxscore,
        difficulty: q.difficulty,
        lang: "cpp",
        topic: q.topic,
        subtopic: q.subtopic ?? null,
        inputconstrains: q.inputconstrains || null,
        blacklist: q.blacklist || "",
        whitelist: q.whitelist || "",
        questionGroupId: group.id,
      },
    });
    codeInserted++;
  }

  let mcqInserted = 0;
  for (const m of mcqs) {
    if (existingMcqTitles.has(m.title)) {
      console.log(`  SKIP mcq (title exists): ${m.title}`);
      continue;
    }
    if (m.topic !== meta.topic) throw new Error(`Topic mismatch in mcq "${m.title}"`);
    if (m.subtopic && !subNames.has(m.subtopic))
      throw new Error(`Unknown subtopic "${m.subtopic}" in mcq "${m.title}"`);

    await db.mCQQuestion.create({
      data: {
        title: m.title,
        description: m.description,
        topic: m.topic,
        subtopic: m.subtopic ?? null,
        Option1: m.Option1,
        Option2: m.Option2,
        Option3: m.Option3,
        Option4: m.Option4,
        CorrectOption: m.CorrectOption,
        codesnippet: m.codesnippet ?? null,
        snippetLang: m.codesnippet ? m.snippetLang ?? "cpp" : null,
        iscodesnippet: Boolean(m.codesnippet),
        difficulty: m.difficulty,
        questionGroupId: group.id,
      },
    });
    mcqInserted++;
  }

  console.log(
    `${dayId} (${meta.topic}): inserted ${codeInserted} code, ${mcqInserted} mcq`
  );
  await db.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
