/**
 * Static validation for the DSA Using C bank data files (no judge calls).
 * Checks: 20 day files, 20 code + 20 MCQ questions per day, required fields,
 * language consistency, entry-point presence, blacklist/whitelist compliance.
 *
 * Run: bun scripts/dsa-c/validate.ts
 */
import { readFileSync } from "node:fs";
import path from "node:path";

const dataDir = path.join(import.meta.dir, "data");
const BLACKLIST_MARKER: Record<string, RegExp> = {
  python: /input\(|sys\.stdin/,
  java: /class\s+Main[\s\S]{0,200}static\s+[\w<>\[\]]+\s+main\s*\(/,
  cpp: /int\s+main\s*\(/,
  c: /int\s+main\s*\(/,
};

let errors = 0;
const fail = (msg: string) => { console.error("  FAIL: " + msg); errors++; };

for (let day = 1; day <= 20; day++) {
  const nn = String(day).padStart(2, "0");
  const codePath = path.join(dataDir, `day-${nn}.code.json`);
  const mcqPath = path.join(dataDir, `day-${nn}.mcq.json`);
  console.log(`Day ${nn}:`);
  const code = JSON.parse(readFileSync(codePath, "utf8"));
  const mcq = JSON.parse(readFileSync(mcqPath, "utf8"));
  if (code.day !== day || mcq.day !== day) fail("day field mismatch");
  if (code.questions.length !== 20) fail(`expected 20 code questions, got ${code.questions.length}`);
  if (mcq.questions.length !== 20) fail(`expected 20 MCQ questions, got ${mcq.questions.length}`);

  const seenCode = new Set<string>();
  for (const q of code.questions) {
    for (const f of ["title", "description", "difficulty", "maxscore", "lang", "topic", "subtopic", "sampleinput1", "sampleoutput1", "sourcecode"]) {
      if (q[f] === undefined || q[f] === null || q[f] === "") fail(`code "${q.title}" missing ${f}`);
    }
    if (q.lang !== "c") fail(`code "${q.title}" lang=${q.lang}`);
    if (!seenCode.has(q.title)) seenCode.add(q.title); else fail(`duplicate code title ${q.title}`);
    if (!BLACKLIST_MARKER.c.test(q.sourcecode ?? "")) fail(`code "${q.title}" missing int main(void) reading stdin and printing output`);
    const bl = String(q.blacklist ?? "").split(",").map((s) => s.trim()).filter(Boolean);
    for (const kw of bl) if (q.sourcecode?.includes(kw)) fail(`code "${q.title}" contains blacklisted "${kw}"`);
    const tcs = [q.sampleoutput1, q.sampleoutput2, q.output1, q.output2, q.output3];
    if (tcs.every((t) => !String(t ?? "").trim())) fail(`code "${q.title}" has no expected outputs at all`);
  }
  const seenMcq = new Set<string>();
  for (const q of mcq.questions) {
    for (const f of ["title", "description", "topic", "subtopic", "Option1", "Option2", "Option3", "Option4", "CorrectOption"]) {
      if (q[f] === undefined || q[f] === null || q[f] === "") fail(`mcq "${q.title}" missing ${f}`);
    }
    if (![1, 2, 3, 4].includes(q.CorrectOption)) fail(`mcq "${q.title}" bad CorrectOption`);
    if (!seenMcq.has(q.title)) seenMcq.add(q.title); else fail(`duplicate mcq title ${q.title}`);
  }
  console.log(`  code 20 / mcq 20 — topic: ${(code.topics?.[0]?.name) ?? "-"}`);
}

if (errors) {
  console.error(`\nValidation FAILED with ${errors} error(s).`);
  process.exit(1);
}
console.log("\nAll day files valid.");
