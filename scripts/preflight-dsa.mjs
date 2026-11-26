/**
 * Repo-wide DSA judge preflight: verify every code question of a bank (or all
 * four banks) against the REAL Lambda judge, all non-empty testcase slots.
 *
 * Usage:
 *   node scripts/preflight-dsa.mjs                 # all 4 banks
 *   node scripts/preflight-dsa.mjs dsa-python      # one bank
 *   node scripts/preflight-dsa.mjs dsa-cpp 7       # one bank, one day
 *
 * Exit code 0 only when every judged slot passes.
 */
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(path.join(scriptDir, "..", ".env"), "utf8");
const urlMap = JSON.parse(
  raw.match(/LAMBDA_JUDGE_URLS=(.*)/)[1].trim().replace(/^'/, "").replace(/'$/, "")
);

const BANKS = ["dsa-python", "dsa-java", "dsa-cpp", "dsa-c"];
const args = process.argv.slice(2);
const banks = BANKS.filter((b) => args.includes(b));
const selected = banks.length ? banks : BANKS;
const onlyDay = args.find((a) => /^\d{1,2}$/.test(a));
const days = onlyDay ? [Number(onlyDay)] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

function testcasesOf(q) {
  return [
    { input: q.sampleinput1, expectedOutput: q.sampleoutput1 },
    { input: q.sampleinput2, expectedOutput: q.sampleoutput2 },
    { input: q.input1, expectedOutput: q.output1 },
    { input: q.input2, expectedOutput: q.output2 },
    { input: q.input3, expectedOutput: q.output3 },
  ].filter((t) => (t.expectedOutput ?? "").trim() !== "");
}

async function judgeRun(lang, code, tcs) {
  const res = await fetch(urlMap[lang], {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ language: lang, code, testcases: tcs, timeoutMs: 20000 }),
  });
  if (!res.ok) throw new Error(`judge HTTP ${res.status}`);
  const data = await res.json();
  const results = data.results ?? [];
  const ok = results.length === tcs.length && results.every((r) => r.status === "Success");
  const firstFail = results.find((r) => r.status !== "Success");
  return {
    ok,
    detail: ok
      ? ""
      : `status=${firstFail?.status ?? "missing"} actual=${JSON.stringify((firstFail?.actual ?? "").slice(0, 60))} err=${(firstFail?.error ?? "").slice(0, 60)}`,
  };
}

let totalQ = 0, totalPass = 0;
let anyFail = false;
for (const bank of selected) {
  console.log(`\n======== ${bank} ========`);
  for (const day of days) {
    const nn = String(day).padStart(2, "0");
    const file = path.join(scriptDir, bank, "data", `day-${nn}.code.json`);
    if (!existsSync(file)) {
      console.log(`day-${nn}: MISSING FILE ${file}`);
      anyFail = true;
      continue;
    }
    const data = JSON.parse(readFileSync(file, "utf8"));
    let pass = 0;
    const fails = [];
    for (const q of data.questions) {
      totalQ++;
      const tcs = testcasesOf(q);
      try {
        const r = await judgeRun(q.lang, q.sourcecode, tcs);
        if (r.ok) pass++;
        else { fails.push(`${q.title}: ${r.detail}`); anyFail = true; }
      } catch (e) {
        fails.push(`${q.title}: ${e.message}`);
        anyFail = true;
      }
      totalPass += 1;
    }
    totalPass = totalPass - data.questions.length + pass;
    console.log(
      `day-${nn}: ${pass}/${data.questions.length} pass` +
        (fails.length ? `\n   ${fails.slice(0, 3).join("\n   ")}` : "")
    );
  }
}
console.log(`\n======== TOTAL: ${totalPass}/${totalQ} questions pass ========`);
process.exit(anyFail ? 1 : 0);
