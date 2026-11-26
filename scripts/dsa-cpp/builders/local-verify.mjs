#!/usr/bin/env node
// Local pre-verifier: compile each sourcecode with g++ -std=c++17 and run all
// non-empty testcases, comparing trimmed stdout. Usage: node local-verify.mjs <day-code-json>
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { execSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

const file = process.argv[2];
if (!file) { console.error("usage: node local-verify.mjs <day-code-json>"); process.exit(2); }
const data = JSON.parse(readFileSync(file, "utf8"));
const tmp = mkdtempSync(join(tmpdir(), "dsaverify-"));
const tcsOf = (q) => [
  { input: q.sampleinput1, expectedOutput: q.sampleoutput1 },
  { input: q.sampleinput2, expectedOutput: q.sampleoutput2 },
  { input: q.input1, expectedOutput: q.output1 },
  { input: q.input2, expectedOutput: q.output2 },
  { input: q.input3, expectedOutput: q.output3 },
].filter((t) => (t.expectedOutput ?? "").trim() !== "");

let pass = 0, fail = 0;
for (let qi = 0; qi < data.questions.length; qi++) {
  const q = data.questions[qi];
  const bin = join(tmp, `q${qi}`);
  const src = join(tmp, `q${qi}.cpp`);
  writeFileSync(src, q.sourcecode);
  let compiled = true;
  try {
    execSync(`g++ -std=c++17 -O2 -o ${bin} ${src} 2>&1`, { stdio: "pipe" });
  } catch (e) {
    compiled = false;
    fail++;
    console.log(`FAIL  ${q.title}  COMPILE`);
    console.log("      " + String(e.stderr).split("\n").slice(0, 5).join("\n      "));
    continue;
  }
  const tcs = tcsOf(q);
  let ok = true, first = null;
  for (let ti = 0; ti < tcs.length; ti++) {
    const t = tcs[ti];
    writeFileSync(join(tmp, "in.txt"), t.input ?? "");
    let out = "";
    try {
      out = execSync(`${bin} < ${join(tmp, "in.txt")}`, { timeout: 10000, stdio: "pipe" }).toString();
    } catch (e) {
      out = "RUNTIME-ERROR: " + String(e.stderr).slice(0, 120);
    }
    if (out.trim() !== (t.expectedOutput ?? "").trim()) {
      ok = false;
      first = { ti: ti + 1, exp: (t.expectedOutput ?? "").trim(), got: out.trim().slice(0, 90) };
      break;
    }
  }
  if (ok) { pass++; console.log(`PASS  ${q.title}  (${tcs.length} cases)`); }
  else { fail++; console.log(`FAIL  ${q.title}`); console.log(`      case${first.ti} expected=${JSON.stringify(first.exp.slice(0, 60))} got=${JSON.stringify(first.got)}`); }
}
console.log(`LOCAL SUMMARY: ${JSON.stringify({ file, pass, fail, total: data.questions.length })}`);
rmSync(tmp, { recursive: true, force: true });
