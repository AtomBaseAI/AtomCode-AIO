import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  console.log("=== Question Groups ===");
  const groups = await db.questionGroup.findMany();
  for (const g of groups) {
    const code = await db.codeQuestion.count({ where: { questionGroupId: g.id } });
    const mcq = await db.mCQQuestion.count({ where: { questionGroupId: g.id } });
    const topics = await db.topic.count({ where: { groupId: g.id } });
    const subtopics = await db.subTopic.count({ where: { topic: { groupId: g.id } } });
    console.log(`- ${g.title}`);
    console.log(`    code: ${code} / mcq: ${mcq} / topics: ${topics} / subtopics: ${subtopics}`);
  }
  console.log("\n=== Cross-group duplicate code titles ===");
  const codeTitles = await db.codeQuestion.findMany({ select: { title: true, questionGroupId: true } });
  const codeTitleMap = new Map<string, string[]>();
  for (const r of codeTitles) {
    if (!codeTitleMap.has(r.title)) codeTitleMap.set(r.title, []);
    codeTitleMap.get(r.title)!.push(r.questionGroupId ?? "");
  }
  const codeDupes = [...codeTitleMap.entries()].filter(([_, gs]) => new Set(gs).size > 1);
  console.log(`Total code titles: ${codeTitleMap.size} / duplicates: ${codeDupes.length}`);
  for (const [t, gs] of codeDupes.slice(0, 10)) {
    const gnames = await Promise.all([...new Set(gs)].map(gid => db.questionGroup.findFirst({ where: { id: gid } }).then(g => g?.title ?? "?")));
    console.log(`  "${t}" → ${gnames.join(", ")}`);
  }
  console.log("\n=== Cross-group duplicate MCQ titles ===");
  const mcqTitles = await db.mCQQuestion.findMany({ select: { title: true, questionGroupId: true } });
  const mcqTitleMap = new Map<string, string[]>();
  for (const r of mcqTitles) {
    if (!mcqTitleMap.has(r.title)) mcqTitleMap.set(r.title, []);
    mcqTitleMap.get(r.title)!.push(r.questionGroupId ?? "");
  }
  const mcqDupes = [...mcqTitleMap.entries()].filter(([_, gs]) => new Set(gs).size > 1);
  console.log(`Total MCQ titles: ${mcqTitleMap.size} / duplicates: ${mcqDupes.length}`);
  for (const [t, gs] of mcqDupes.slice(0, 10)) {
    const gnames = await Promise.all([...new Set(gs)].map(gid => db.questionGroup.findFirst({ where: { id: gid } }).then(g => g?.title ?? "?")));
    console.log(`  "${t}" → ${gnames.join(", ")}`);
  }
  console.log("\n=== Grand totals ===");
  const [code, mcq, topics, subtopics, gc] = await db.$transaction([
    db.codeQuestion.count(), db.mCQQuestion.count(), db.topic.count(), db.subTopic.count(), db.questionGroup.count(),
  ]);
  console.log(`Groups: ${gc} / Code: ${code} / MCQ: ${mcq} / Topics: ${topics} / Subtopics: ${subtopics}`);
}
main().then(() => db.$disconnect()).catch(async e => { console.error(e); await db.$disconnect(); process.exit(1); });
