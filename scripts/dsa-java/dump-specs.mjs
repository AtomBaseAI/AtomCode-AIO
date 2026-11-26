import fs from "node:fs";
const nn = process.argv[2];
const doc = JSON.parse(fs.readFileSync(`/home/z/tmp/dsa-export/dsa-java/day-${nn}.code.json`, "utf8"));
let out = `DAY ${doc.day} — ${doc.questions.length} questions\n`;
doc.questions.forEach((q, i) => {
  out += `\n===== Q${i + 1}: ${q.title} [${q.difficulty}/${q.maxscore}] topic=${q.topic} sub=${q.subtopic} type=${q.questionType ?? ""}\n`;
  out += `DESC: ${q.description}\n`;
  out += `BL: ${q.blacklist ?? ""} | WL: ${q.whitelist ?? ""}\n`;
  const tc = [
    ["sampleinput1", "sampleoutput1"], ["sampleinput2", "sampleoutput2"],
    ["input1", "output1"], ["input2", "output2"], ["input3", "output3"],
  ];
  tc.forEach(([a, b]) => {
    const inp = q[a] ?? "", exp = q[b] ?? "";
    out += `  ${a}=${JSON.stringify(inp)}\n  => ${b}=${JSON.stringify(exp)}\n`;
  });
});
fs.writeFileSync(`/home/z/my-project/scripts/dsa-java/specs/day-${nn}.spec.txt`, out);
console.log(`wrote day-${nn}.spec.txt (${out.length} chars)`);
