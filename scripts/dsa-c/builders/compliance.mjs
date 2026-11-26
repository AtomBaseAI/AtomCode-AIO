import { readFileSync } from "node:fs";
let bad = 0;
for (const day of ["06","07","08","09","10"]) {
  const inp = JSON.parse(readFileSync(`/home/z/tmp/dsa-export/dsa-c/day-${day}.code.json`,"utf8"));
  const out = JSON.parse(readFileSync(`/home/z/my-project/scripts/dsa-c/data/day-${day}.code.json`,"utf8"));
  // shape check
  if (inp.day !== out.day || inp.questions.length !== out.questions.length) { console.log(`${day}: DAY/LEN MISMATCH`); bad++; }
  const inpKeys = Object.keys(inp.questions[0]).sort().join(",");
  inp.questions.forEach((q, i) => {
    const o = out.questions[i];
    if (Object.keys(o).sort().join(",") !== inpKeys) { console.log(`${day} q${i}: KEY MISMATCH`); bad++; }
    if (q._id !== o._id) { console.log(`${day} q${i}: _id CHANGED`); bad++; }
    for (const k of Object.keys(q)) {
      if (k !== "sourcecode" && JSON.stringify(q[k]) !== JSON.stringify(o[k])) { console.log(`${day} q${i}: field ${k} changed`); bad++; }
    }
    // blacklist/whitelist scan
    const bl = String(q.blacklist || "").toLowerCase().split(",").map(s=>s.trim()).filter(Boolean);
    const code = o.sourcecode;
    for (const b of bl) {
      if (code.includes(b)) { console.log(`${day} q${i} "${q.title}": BLACKLISTED TOKEN "${b}" PRESENT`); bad++; }
    }
    // non-function checks
    if (!/^#include/.test(code)) { console.log(`${day} q${i}: missing include`); bad++; }
    if (!/int main\(void\)/.test(code)) { console.log(`${day} q${i}: missing main`); bad++; }
  });
  // mcq check
  const mi = JSON.parse(readFileSync(`/home/z/tmp/dsa-export/dsa-c/day-${day}.mcq.json`,"utf8"));
  const mo = JSON.parse(readFileSync(`/home/z/my-project/scripts/dsa-c/data/day-${day}.mcq.json`,"utf8"));
  if (mo.day !== mi.day || mo.questions.length !== mi.questions.length) { console.log(`${day} mcq: shape mismatch`); bad++; }
  mo.questions.forEach((q,i) => {
    if ("_id" in q) { console.log(`${day} mcq q${i}: _id present`); bad++; }
    const rest = (({_id, ...r}) => r)(mi.questions[i]);
    if (JSON.stringify(q) !== JSON.stringify(rest)) { console.log(`${day} mcq q${i}: content mismatch`); bad++; }
  });
  console.log(`day-${day}: shape OK, mcq OK`);
}
console.log(bad === 0 ? "COMPLIANCE: ALL CLEAN" : `COMPLIANCE: ${bad} issues`);
