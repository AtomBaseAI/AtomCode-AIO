#!/usr/bin/env node
/**
 * verify-local.mjs — exact local replica of the AtomCode C judge.
 *
 * Production path for lang=c (src/lib/question-judge.ts → native-executor.ts):
 *   gcc -std=c17 -O0 -pipe -o ./program main.c -lm   (hard 30s compile budget)
 *   run per testcase with stdin, compare normalizeOutput(actual) vs normalizeOutput(expected)
 *   normalizeOutput: strip \r, per-line trailing spaces/tabs, trailing blank lines, then trim
 *   keyword checks: comma-separated substrings — blacklist any-hit rejects, whitelist any-miss rejects
 *
 * Slot set mirrors judge-verify.mjs (sample1, sample2, case1..3); slots with an
 * EMPTY expected are skipped; index>0 slots with empty input+expected are placeholders.
 *
 * Usage: node verify-local.mjs <day-NN.code.json> [--conc=N] [--timeout=MS]
 * Exit 0 iff all questions pass.
 */
import { spawn, spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const file = process.argv.slice(2).find((a) => !a.startsWith("--"));
if (!file) {
  console.error("usage: node verify-local.mjs <day-NN.code.json> [--conc=N] [--timeout=MS]");
  process.exit(2);
}
const opt = (n, d) => {
  const h = process.argv.find((a) => a.startsWith(`--${n}=`));
  return h ? h.split("=").slice(1).join("=") : d;
};
const CONC = Math.max(1, parseInt(opt("conc", "8"), 10));
const TIMEOUT = Math.max(1000, parseInt(opt("timeout", "10000"), 10));

function normalizeOutput(value) {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.replace(/[ \t]+$/g, ""))
    .join("\n")
    .replace(/\n+$/g, "")
    .trim();
}
function parseKeywords(raw) {
  return String(raw ?? "").split(",").map((s) => s.trim()).filter((s) => s !== "");
}
function keywordViolation(code, blacklist, whitelist) {
  for (const k of parseKeywords(blacklist)) if (code.includes(k)) return `blacklist: ${k}`;
  for (const k of parseKeywords(whitelist)) if (!code.includes(k)) return `whitelist miss: ${k}`;
  return null;
}

const doc = JSON.parse(readFileSync(file, "utf8"));

function slotsOf(q) {
  const pairs = [
    ["sampleinput1", "sampleoutput1"],
    ["sampleinput2", "sampleoutput2"],
    ["input1", "output1"],
    ["input2", "output2"],
    ["input3", "output3"],
  ];
  const out = [];
  pairs.forEach(([iF, oF], idx) => {
    const input = String(q[iF] ?? "");
    const expected = String(q[oF] ?? "");
    if (expected === "") return; // skip empty-expected slots
    if (idx > 0 && input === "") return; // placeholder case
    out.push({ input, expected, slot: oF });
  });
  return out;
}

function runOnce(dir, stdinData) {
  return new Promise((resolve) => {
    const child = spawn("./program", { cwd: dir });
    let stdout = "", stderr = "", timedOut = false;
    const t = setTimeout(() => { timedOut = true; try { child.kill("SIGKILL"); } catch {} }, TIMEOUT);
    child.stdout.on("data", (d) => (stdout += d));
    child.stderr.on("data", (d) => (stderr += d));
    child.on("error", (e) => { clearTimeout(t); resolve({ error: String(e) }); });
    child.on("close", () => { clearTimeout(t); resolve({ stdout, stderr, timedOut }); });
    child.stdin.write(stdinData);
    child.stdin.end();
  });
}

async function verifyQuestion(q, index) {
  const slots = slotsOf(q);
  const kw = keywordViolation(q.sourcecode, q.blacklist, q.whitelist);
  if (kw) return { index, title: q.title, verdict: "KEYWORD_REJECT", reason: kw, slots: [] };
  if (slots.length === 0) return { index, title: q.title, verdict: "SKIP", reason: "no non-empty expected slots", slots: [] };

  const dir = mkdtempSync(path.join(tmpdir(), "cjudge-"));
  writeFileSync(path.join(dir, "main.c"), q.sourcecode, "utf8");
  const cc = spawnSync("gcc", ["-std=c17", "-O0", "-pipe", "-o", "./program", "main.c", "-lm"], {
    cwd: dir, encoding: "utf8", timeout: 30000,
  });
  try {
    if (cc.error) return { index, title: q.title, verdict: "TOOLCHAIN_ERROR", reason: String(cc.error), slots: [] };
    if (cc.status !== 0) {
      return { index, title: q.title, verdict: "COMPILE_ERROR", reason: (cc.stderr || "").split("\n").slice(0, 4).join(" | "), slots: [] };
    }
    const results = [];
    for (const s of slots) {
      const r = await runOnce(dir, s.input);
      if (r.error) { results.push({ ...s, status: "Error", reason: r.error }); continue; }
      if (r.timedOut) { results.push({ ...s, status: "Timeout", reason: "timeout" }); continue; }
      const ok = normalizeOutput(r.stdout) === normalizeOutput(s.expected);
      results.push({
        ...s,
        status: ok ? "Success" : "Failed",
        actual: ok ? undefined : r.stdout.slice(0, 400),
      });
    }
    const bad = results.filter((r) => r.status !== "Success");
    return {
      index, title: q.title,
      verdict: bad.length === 0 ? "PASS" : "FAIL",
      reason: bad.map((b) => `${b.slot}: got ${JSON.stringify(b.actual ?? b.reason)} want ${JSON.stringify(b.expected.slice(0, 200))}`).join(" | "),
      slots: results,
    };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const outcomes = new Array(doc.questions.length);
let cursor = 0;
async function worker() {
  while (cursor < doc.questions.length) {
    const i = cursor++;
    const o = await verifyQuestion(doc.questions[i], i + 1);
    outcomes[i] = o;
    console.log(
      `  Q${String(i + 1).padStart(2, "0")} ${o.verdict.padEnd(14)} ${o.title}` +
      (o.verdict === "PASS" || o.verdict === "SKIP" ? "" : `  << ${o.reason.slice(0, 260)}`)
    );
  }
}
console.log(`local-gcc verify ${file} — ${doc.questions.length} questions, conc=${CONC}`);
await Promise.all(Array.from({ length: CONC }, worker));
const fails = outcomes.filter((o) => o.verdict !== "PASS" && o.verdict !== "SKIP");
console.log(`\nRESULT: ${doc.questions.length - fails.length}/${doc.questions.length} pass, ${fails.length} fail`);
for (const f of fails) console.log(`  FAIL Q${f.index} ${f.title}: ${f.reason.slice(0, 400)}`);
process.exit(fails.length === 0 ? 0 : 1);
