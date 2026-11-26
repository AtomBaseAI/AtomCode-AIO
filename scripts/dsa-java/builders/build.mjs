/**
 * Build script — assembles the repaired day-NN.code.json (complete standalone
 * Java programs in `sourcecode`, everything else preserved verbatim) and the
 * day-NN.mcq.json copy ({day, questions without _id}).
 *
 * Usage: node build.mjs <NN>
 *   NN = 01..05 — solution arrays live in ./solutions/day-NN.solutions.mjs
 *
 * Inputs (read-only): /home/z/tmp/dsa-export/dsa-java/day-NN.{code,mcq}.json
 * Outputs:            /home/z/my-project/scripts/dsa-java/data/day-NN.{code,mcq}.json
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const EXPORT = "/home/z/tmp/dsa-export/dsa-java";
const OUT = path.join(HERE, "data");

const nn = process.argv[2];
if (!/^\d{2}$/.test(nn)) {
  console.error("usage: node build.mjs <NN>  (e.g. 01)");
  process.exit(2);
}

const solPath = path.join(HERE, "solutions", `day-${nn}.solutions.mjs`);
const { solutions } = await import(solPath);

const codeDoc = JSON.parse(fs.readFileSync(path.join(EXPORT, `day-${nn}.code.json`), "utf8"));
if (codeDoc.questions.length !== solutions.length) {
  throw new Error(`day ${nn}: ${codeDoc.questions.length} questions but ${solutions.length} solutions`);
}
codeDoc.questions.forEach((q, i) => {
  const sol = solutions[i];
  if (typeof sol !== "string" || sol.length < 40) {
    throw new Error(`day ${nn} Q${i + 1} (${q.title}): solution missing`);
  }
  q.sourcecode = sol;
});
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, `day-${nn}.code.json`), JSON.stringify(codeDoc, null, 2) + "\n");

const mcqDoc = JSON.parse(fs.readFileSync(path.join(EXPORT, `day-${nn}.mcq.json`), "utf8"));
const mcqOut = {
  day: mcqDoc.day,
  questions: mcqDoc.questions.map(({ _id, ...rest }) => rest),
};
fs.writeFileSync(path.join(OUT, `day-${nn}.mcq.json`), JSON.stringify(mcqOut, null, 2) + "\n");

console.log(`day-${nn}: code.json (${codeDoc.questions.length} questions) + mcq.json (${mcqOut.questions.length}) written`);
