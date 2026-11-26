/**
 * W1-PY private judge verifier for dsa-python day files (do NOT use the
 * shared /home/z/tmp/judge-verify.mjs — other bank agents overwrite it).
 *
 * Mirrors the real grading authority:
 *   - src/lib/question-judge.ts slots = [sample1, input1, input2, input3]
 *     (weight 1 + 3+3+3); we ALSO check sample2 (displayed sample) as an
 *     extra slot, reported separately, since the task lists it as truth.
 *   - transport: Lambda compiler stack MULTI mode via the REAL handler
 *     (compilers/functions/_shared/handler.mjs) — python branch.
 *   - keyword policy: comma-separated blacklist/whitelist substrings.
 *   - placeholder slot (no input AND no expected, index>0) → auto-pass.
 *   - normalizeOutput identical to handler/question-judge.
 *
 * Usage: node judge-verify.mjs <day-NN.code.json> [title-filter]
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import handler from "/home/z/my-project/compilers/functions/_shared/handler.mjs";

process.env.ATOM_DROP_PRIVILEGES = "off";
process.env.ATOM_ULIMITS = "off";
process.env.PATH = `/tmp/jdk-21.0.13+9/bin:/tmp/ruby-bin:${process.env.PATH}`;
process.env.JAVA_HOME = "/tmp/jdk-21.0.13+9";

const file = process.argv[2];
if (!file) {
  console.error("usage: node judge-verify.mjs <day-NN.code.json> [filter]");
  process.exit(2);
}
const filter = process.argv[3];
const data = JSON.parse(await readFile(file, "utf8"));
const questions = data.questions.filter((q) =>
  filter ? q.title.toLowerCase().includes(filter.toLowerCase()) : true
);

function normalize(value) {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n")
    .replace(/\n+$/g, "")
    .trim();
}

function checkKeywords(code, raw, kind) {
  const list = String(raw ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s !== "");
  if (kind === "blacklist" && list.some((k) => code.includes(k)))
    return "Blacklist keyword(s) found in the code!";
  if (kind === "whitelist" && list.some((k) => !code.includes(k)))
    return "Whitelist keyword(s) missing from the code!";
  return null;
}

let passQ = 0, failQ = 0;
const failTitles = [];

for (const q of questions) {
  // Judge slots (sample2 appended, flagged display-only).
  const slots = [
    { inp: q.sampleinput1, out: q.sampleoutput1, name: "sample1" },
    { inp: q.input1, out: q.output1, name: "input1" },
    { inp: q.input2, out: q.output2, name: "input2" },
    { inp: q.input3, out: q.output3, name: "input3" },
    { inp: q.sampleinput2, out: q.sampleoutput2, name: "sample2(display)" },
  ];
  const judged = slots.filter((s) => s.name !== "sample2(display)");
  const testcases = judged.map((s) => ({
    input: String(s.inp ?? ""),
    expectedOutput: String(s.out ?? ""),
  }));
  const emptyExp = judged.filter((s) => String(s.out ?? "") === "");
  const placeholders = judged
    .slice(1)
    .filter((s) => String(s.inp ?? "") === "" && String(s.out ?? "") === "");

  const problems = [];
  const notes = [];
  if (emptyExp.length)
    notes.push(`${emptyExp.map((s) => s.name).join(",")} skipped (empty expected)`);

  const bl = checkKeywords(q.sourcecode, q.blacklist, "blacklist");
  const wl = checkKeywords(q.sourcecode, q.whitelist, "whitelist");
  if (bl) problems.push("KEYWORD: " + bl);
  if (wl) problems.push("KEYWORD: " + wl);

  let res = null;
  if (problems.length === 0 && placeholders.length !== judged.length - 1) {
    try {
      res = await handler({
        language: "python",
        code: q.sourcecode,
        testcases,
        checks: { blacklist: q.blacklist ?? "", whitelist: q.whitelist ?? "" },
      });
    } catch (e) {
      problems.push("handler threw: " + (e?.message ?? e));
    }
  }

  if (res) {
    for (let t = 0; t < testcases.length; t++) {
      const r = res.results?.[t];
      const s = judged[t];
      if (!r) { problems.push(`${s.name}: NO-RESULT`); continue; }
      if (t > 0 && testcases[t].input === "" && testcases[t].expectedOutput === "") continue; // placeholder
      if (r.status !== "Success") {
        if (r.status === "Error") {
          problems.push(
            `${s.name} ERROR: ${String(r.output ?? "").split("\n").slice(0, 10).join(" | ").slice(0, 600)}`
          );
        } else {
          problems.push(
            `${s.name} MISMATCH\n      input:    ${JSON.stringify(testcases[t].input).slice(0, 240)}\n      expected: ${JSON.stringify(testcases[t].expectedOutput).slice(0, 400)}\n      actual:   ${JSON.stringify(String(r.output ?? "").slice(0, 400))}`
          );
        }
      }
    }
  }

  // Display-only sample2 check (informational, same normalize rules).
  if (String(q.sampleoutput2 ?? "") !== "" && !bl && !wl) {
    try {
      const r2 = await handler({
        language: "python",
        code: q.sourcecode,
        testcases: [{ input: String(q.sampleinput2 ?? ""), expectedOutput: String(q.sampleoutput2 ?? "") }],
      });
      const ok2 = r2.results?.[0]?.status === "Success";
      if (!ok2) {
        problems.push(
          `sample2(display) MISMATCH\n      input:    ${JSON.stringify(String(q.sampleinput2 ?? "")).slice(0, 240)}\n      expected: ${JSON.stringify(String(q.sampleoutput2 ?? "")).slice(0, 400)}\n      actual:   ${JSON.stringify(String(r2?.results?.[0]?.output ?? "").slice(0, 400))}`
        );
      }
    } catch (e) {
      problems.push("sample2 handler threw: " + (e?.message ?? e));
    }
  }

  if (problems.length === 0) {
    passQ++;
    console.log(`PASS  ${q.title}${notes.length ? "   [" + notes.join("; ") + "]" : ""}`);
  } else {
    failQ++;
    failTitles.push(q.title);
    console.log(`FAIL  ${q.title}${notes.length ? "   [" + notes.join("; ") + "]" : ""}`);
    for (const p of problems) console.log("    " + p);
  }
}

console.log(
  `SUMMARY: ${path.basename(file)} pass=${passQ} fail=${failQ} total=${passQ + failQ}`
);
if (failQ) console.log("Failed titles: " + failTitles.join(" ;; "));
