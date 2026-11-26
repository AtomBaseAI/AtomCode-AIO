import { readFileSync, writeFileSync } from "node:fs";
for (const nn of ["01","02","03","04","05"]) {
  const src = JSON.parse(readFileSync(`/home/z/tmp/dsa-export/dsa-cpp/day-${nn}.mcq.json`, "utf8"));
  const out = { day: src.day, questions: src.questions.map(({ _id, ...rest }) => rest) };
  writeFileSync(`/home/z/my-project/scripts/dsa-cpp/data/day-${nn}.mcq.json`, JSON.stringify(out, null, 2));
  console.log(`day-${nn}.mcq.json: ${out.questions.length} questions (ids stripped)`);
}
