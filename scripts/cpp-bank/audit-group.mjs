/**
 * audit-group.mjs — compares day-file titles against DB for the OOPS using CPP group.
 */
import { db } from "../src/lib/db";

const group = await db.questionGroup.findFirst({ where: { title: "OOPS using CPP" } });
const dbCode = new Map(
  (await db.codeQuestion.findMany({ where: { questionGroupId: group.id }, select: { title: true, topic: true } })).map((q) => [q.title, q])
);
const dbMcq = new Map(
  (await db.mCQQuestion.findMany({ where: { questionGroupId: group.id }, select: { title: true, topic: true } })).map((q) => [q.title, q])
);

// Also collect ALL titles in DB (any group) to detect cross-group collisions
const allCode = new Set((await db.codeQuestion.findMany({ select: { title: true } })).map((q) => q.title));
const allMcq = new Set((await db.mCQQuestion.findMany({ select: { title: true } })).map((q) => q.title));

const days = Array.from({ length: 20 }, (_, i) => String(i + 1).padStart(2, "0"));
let missingCode = 0, missingMcq = 0;
for (const d of days) {
  const mod = await import(`./day${d}.mjs`);
  for (const q of mod.code) {
    if (!dbCode.has(q.title)) {
      missingCode++;
      console.log(`MISSING code day${d}: "${q.title}" (inDB-anywhere-code=${allCode.has(q.title)}, inDB-anywhere-mcq=${allMcq.has(q.title)})`);
    }
  }
  for (const m of mod.mcqs) {
    if (!dbMcq.has(m.title)) {
      missingMcq++;
      console.log(`MISSING mcq day${d}: "${m.title}" (inDB-anywhere-code=${allCode.has(m.title)}, inDB-anywhere-mcq=${allMcq.has(m.title)})`);
    }
  }
}
const perTopic = {};
for (const [, q] of dbCode) perTopic[q.topic] = (perTopic[q.topic] || { code: 0, mcq: 0 });
for (const [, q] of dbMcq) perTopic[q.topic] = perTopic[q.topic] || { code: 0, mcq: 0 };
for (const [, q] of dbCode) perTopic[q.topic].code++;
for (const [, q] of dbMcq) perTopic[q.topic].mcq++;
console.log("\nPer-topic counts (CPP group):");
for (const [t, c] of Object.entries(perTopic)) console.log(`  ${t}: code=${c.code} mcq=${c.mcq}`);
console.log(`\nGroup totals: code=${dbCode.size} mcq=${dbMcq.size} | missing: code=${missingCode} mcq=${missingMcq}`);
await db.$disconnect();
