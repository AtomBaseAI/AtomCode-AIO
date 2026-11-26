import fs from "node:fs";

let allOk = true;
const CORRUPTION = [/new [A-Za-z0-9_]+\]/, /storeead\]/];
for (const d of ["11", "12", "13", "14", "15"]) {
  const out = JSON.parse(fs.readFileSync(`/home/z/my-project/scripts/dsa-java/data/day-${d}.code.json`, "utf8"));
  const bad = [];
  out.questions.forEach((q, i) => {
    for (const re of CORRUPTION) {
      if (re.test(q.sourcecode)) bad.push(`${i} ${q.title} /${re.source}/`);
    }
  });
  console.log(`day ${d}: corrupted=${bad.length}${bad.length ? " -> " + bad.join("; ") : ""}`);
  if (bad.length) allOk = false;
}
console.log("corruption-scan-ok:", allOk);
