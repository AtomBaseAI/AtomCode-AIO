/**
 * verify-day.mjs — validates one day file of the OOPS using CPP bank.
 *
 * Usage: bun cpp-bank/verify-day.mjs day01
 *
 * For every code question:
 *   - runs the solution on the C++ Lambda against 5 inputs
 *     (sample1, sample2, hidden1, hidden2, hidden3)
 *   - asserts ok (stage execute, exit 0) and non-empty stdout
 *   - auto-fills sampleoutput1/2 + output1/2/3 from the real stdout
 * For every MCQ carrying `verify: { code, stdin, expected }`:
 *   - runs the code and asserts normalized stdout === expected
 * Writes dayNN.verified.json ready for insert-day.mjs.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execCpp, pool } from "./lambda.mjs";

const dayId = process.argv[2];
if (!dayId) {
  console.error("Usage: bun cpp-bank/verify-day.mjs dayNN");
  process.exit(1);
}
const file = new URL(`./${dayId}.mjs`, import.meta.url);
if (!existsSync(file)) {
  console.error(`Missing ${file}`);
  process.exit(1);
}

const mod = await import(file.href);
const { meta, code, mcqs } = mod;

const fails = [];
const warnings = [];

// ---- 1. Code questions --------------------------------------------------
const runs = [];
code.forEach((q, qi) => {
  const inputs = [
    ["sampleinput1", q.sampleinput1],
    ["sampleinput2", q.sampleinput2],
    ["input1", q.input1],
    ["input2", q.input2],
    ["input3", q.input3],
  ];
  inputs.forEach(([field, input]) => {
    runs.push({ qi, q, field, input: input ?? "" });
  });
});

console.log(`Verifying ${code.length} code questions (${runs.length} runs)...`);
const results = await pool(
  runs.map((r) => async () => ({
    ...r,
    res: await execCpp(r.q.sourcecode, r.input),
  })),
  4
);

const outFor = new Map(); // qi -> { field: normalizedStdout }
for (const r of results) {
  if (r.__error) {
    fails.push(`[code ${r.qi ?? "?"}] transport error: ${r.__error.message}`);
    continue;
  }
  const { qi, q, field, res } = r;
  if (!res.ok) {
    fails.push(
      `[code ${qi}] "${q.title}" ${field}: not ok (stage=${res.stage} exit=${res.exitCode}) ${res.stderr.slice(0, 200)}`
    );
    continue;
  }
  if (!res.stdout) {
    fails.push(`[code ${qi}] "${q.title}" ${field}: empty stdout`);
    continue;
  }
  if (res.stderr && res.stderr.length > 0) {
    warnings.push(`[code ${qi}] "${q.title}" ${field}: stderr present: ${res.stderr.slice(0, 120)}`);
  }
  if (!outFor.has(qi)) outFor.set(qi, {});
  outFor.get(qi)[field] = res.stdout;
}

// ---- 2. MCQ snippet verification -----------------------------------------
const mcqVerifies = [];
mcqs.forEach((m, mi) => {
  if (m.verify && m.verify.code) {
    mcqVerifies.push({ mi, m });
  }
});
console.log(`Verifying ${mcqVerifies.length} MCQ snippet programs...`);
const mcqResults = await pool(
  mcqVerifies.map((v) => async () => ({
    ...v,
    res: await execCpp(v.m.verify.code, v.m.verify.stdin ?? ""),
  })),
  4
);
for (const r of mcqResults) {
  if (r.__error) {
    fails.push(`[mcq ${r.mi}] transport error: ${r.__error.message}`);
    continue;
  }
  const { mi, m, res } = r;
  if (!res.ok) {
    fails.push(
      `[mcq ${mi}] "${m.title}" verify program not ok (stage=${res.stage}) ${res.stderr.slice(0, 200)}`
    );
    continue;
  }
  const expected = String(m.verify.expected ?? "").trim();
  if (res.stdout !== expected) {
    fails.push(
      `[mcq ${mi}] "${m.title}" output mismatch:\n  expected: ${JSON.stringify(expected)}\n  actual:   ${JSON.stringify(res.stdout)}`
    );
  }
}

// ---- 3. Build verified payload -------------------------------------------
const verified = {
  meta,
  code: code.map((q, qi) => {
    const outs = outFor.get(qi) || {};
    return {
      ...q,
      sampleoutput1: outs.sampleinput1 ?? "",
      sampleoutput2: outs.sampleinput2 ?? "",
      output1: outs.input1 ?? "",
      output2: outs.input2 ?? "",
      output3: outs.input3 ?? "",
    };
  }),
  mcqs: mcqs.map(({ verify, ...m }) => m),
};

const outFile = new URL(`./${dayId}.verified.json`, import.meta.url);
writeFileSync(outFile, JSON.stringify(verified, null, 2));

// ---- 4. Report ------------------------------------------------------------
const totalQ = verified.code.length;
const totalM = verified.mcqs.length;
const dist = {};
verified.code.forEach((q) => (dist[q.difficulty] = (dist[q.difficulty] || 0) + 1));
const mdist = {};
verified.mcqs.forEach((q) => (mdist[q.difficulty] = (mdist[q.difficulty] || 0) + 1));

console.log(`\n=== ${dayId}: ${meta.topic} ===`);
console.log(`code=${totalQ} (${JSON.stringify(dist)})  mcq=${totalM} (${JSON.stringify(mdist)})`);
if (warnings.length) {
  console.log(`\nWARNINGS (${warnings.length}):`);
  warnings.slice(0, 10).forEach((w) => console.log("  " + w));
}
if (fails.length) {
  console.log(`\nFAILURES (${fails.length}):`);
  fails.slice(0, 40).forEach((f) => console.log("  " + f));
  process.exit(2);
}
console.log("ALL PASS ->", outFile.pathname);
