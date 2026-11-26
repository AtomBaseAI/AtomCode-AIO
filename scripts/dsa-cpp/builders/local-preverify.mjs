/**
 * Local pre-verify for DSA C++ day files: g++ compile + run all non-empty testcases,
 * compare trimmed output, and byte-check blacklist/whitelist substrings.
 * Usage: node local-preverify.mjs <day-code-json-path>
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

const file = process.argv[2];
if (!file) { console.error("usage: node local-preverify.mjs <day-code-json>"); process.exit(2); }
const data = JSON.parse(readFileSync(file, "utf8"));
const work = "/home/z/tmp/dsa-cpp-preverify";
rmSync(work, { recursive: true, force: true });
mkdirSync(work, { recursive: true });

const tcsOf = (q) => [
  { input: q.sampleinput1, expectedOutput: q.sampleoutput1 },
  { input: q.sampleinput2, expectedOutput: q.sampleoutput2 },
  { input: q.input1, expectedOutput: q.output1 },
  { input: q.input2, expectedOutput: q.output2 },
  { input: q.input3, expectedOutput: q.output3 },
].filter((t) => (t.expectedOutput ?? "").trim() !== "");

let pass = 0, fail = 0;
data.questions.forEach((q, qi) => {
  const src = path.join(work, `q${qi}.cpp`);
  const bin = path.join(work, `q${qi}`);
  writeFileSync(src, q.sourcecode);
  // blacklist/whitelist byte-level checks
  const code = q.sourcecode;
  const bl = (q.blacklist || "").trim();
  const wl = (q.whitelist || "").trim();
  const blHit = bl && code.includes(bl);
  const wlMiss = wl && !code.includes(wl);
  // compile
  let compileErr = "";
  try {
    execFileSync("g++", ["-std=c++17", "-o", bin, src], { timeout: 30000, stdio: "pipe" });
  } catch (e) {
    compileErr = (e.stderr || e.message || "").toString().slice(0, 300);
  }
  if (compileErr) {
    fail++;
    console.log(`FAIL  [q${qi}] ${q.title} — COMPILE: ${compileErr.replace(/\n/g, " | ")}`);
    return;
  }
  if (blHit) {
    fail++;
    console.log(`FAIL  [q${qi}] ${q.title} — BLACKLIST substring ${JSON.stringify(bl)} present`);
    return;
  }
  if (wlMiss) {
    fail++;
    console.log(`FAIL  [q${qi}] ${q.title} — WHITELIST substring ${JSON.stringify(wl)} missing`);
    return;
  }
  let ok = true;
  for (const t of tcsOf(q)) {
    let actual = "", err = "";
    try {
      actual = execFileSync(bin, { input: t.input, timeout: 10000, stdio: "pipe" }).toString();
    } catch (e) {
      err = ((e.stderr || "") + " " + (e.message || "")).toString().slice(0, 200);
    }
    const exp = (t.expectedOutput ?? "").trim();
    const act = actual.trim();
    if (act !== exp) {
      ok = false;
      console.log(`FAIL  [q${qi}] ${q.title} — expected=${JSON.stringify(exp.slice(0, 60))} actual=${JSON.stringify(act.slice(0, 60))} ${err ? "err=" + err : ""}`);
      break;
    }
  }
  if (ok) { pass++; console.log(`PASS  [q${qi}] ${q.title} (${tcsOf(q).length} tcs)`); }
  else fail++;
});
console.log(`LOCAL SUMMARY: ${JSON.stringify({ file: path.basename(file), pass, fail, total: data.questions.length })}`);
