import { readFileSync } from "node:fs";
const file = process.argv[2];
const data = JSON.parse(readFileSync(file, "utf8"));
const out = [];
out.push(`DAY ${data.day} topics=${JSON.stringify(data.topics)} questions=${data.questions.length}`);
data.questions.forEach((q, i) => {
  out.push(`=== q${String(i).padStart(2,"0")} [${q.questionType}] lang=${q.lang} diff=${q.difficulty} score=${q.maxscore} topic=${q.topic}/${q.subtopic}`);
  out.push(`title: ${q.title}`);
  out.push(`desc: ${q.description}`);
  out.push(`constraints: ${q.inputconstrains}`);
  if (q.blacklist) out.push(`BLACKLIST: ${q.blacklist}`);
  if (q.whitelist) out.push(`WHITELIST: ${q.whitelist}`);
  const tc = [["s1",q.sampleinput1,q.sampleoutput1],["s2",q.sampleinput2,q.sampleoutput2],["t1",q.input1,q.output1],["t2",q.input2,q.output2],["t3",q.input3,q.output3]];
  for (const [nm, inp, outp] of tc) {
    if ((outp ?? "").trim() !== "") out.push(`${nm}: IN=${JSON.stringify(inp)} OUT=${JSON.stringify(outp)}`);
    else out.push(`${nm}: EMPTY`);
  }
  out.push(`srccode_len=${(q.sourcecode||"").length}`);
});
process.stdout.write(out.join("\n") + "\n");
