/**
 * Merge part files into final day files.
 *
 * Usage:
 *   bun scripts/oops-java/merge-parts.ts <day> code p1 p2 [...]
 *   bun scripts/oops-java/merge-parts.ts <day> mcq p1 p2 [...]
 *
 * Part files live in scripts/oops-java/data/parts/ and are named e.g.
 *   day-03.code.p1.json  → { "questions": [ ... ] }
 * Each part is a JSON object with a "questions" array (and for code parts the
 * FIRST part may also carry { day, topics }).
 *
 * Output: scripts/oops-java/data/day-NN.code.json or day-NN.mcq.json
 */

import fs from "node:fs";
import path from "node:path";

const [dayArg, kind, ...parts] = process.argv.slice(2);
if (!dayArg || !["code", "mcq"].includes(kind) || parts.length === 0) {
  console.error("Usage: bun merge-parts.ts <day> <code|mcq> <p1> <p2> [...]");
  process.exit(2);
}
const day = parseInt(dayArg, 10);
const dataDir = new URL("./data/", import.meta.url).pathname;
const partsDir = path.join(dataDir, "parts");

const all = [];
for (const p of parts) {
  const fp = path.join(partsDir, p.endsWith(".json") ? p : `day-${String(day).padStart(2, "0")}.${kind}.${p}.json`);
  const obj = JSON.parse(fs.readFileSync(fp, "utf8"));
  if (!Array.isArray(obj.questions)) throw new Error(`${fp}: missing questions array`);
  all.push(...obj.questions);
  console.log(`read ${fp}: ${obj.questions.length} questions`);
}

const out = kind === "code" ? { day, topics: [], questions: all } : { day, questions: all };

// topics: take from first part if present, else from existing final file, else empty (validator will error)
if (kind === "code") {
  const firstFp = path.join(partsDir, parts[0].endsWith(".json") ? parts[0] : `day-${String(day).padStart(2, "0")}.code.${parts[0]}.json`);
  const first = JSON.parse(fs.readFileSync(firstFp, "utf8"));
  if (first.topics) out.topics = first.topics;
}

const nn = String(day).padStart(2, "0");
const outFile = path.join(dataDir, `day-${nn}.${kind}.json`);
fs.writeFileSync(outFile, JSON.stringify(out, null, 2) + "\n");
console.log(`wrote ${outFile}: ${out.questions.length} questions`);
