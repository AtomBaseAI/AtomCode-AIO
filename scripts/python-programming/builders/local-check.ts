/**
 * Local pre-flight checker (authoring aid, NOT part of the official pipeline).
 * Runs every code question's sourcecode against all 5 cases with the local
 * python3 interpreter and compares outputs using the SAME normalization as
 * the judge (CRLF->LF, per-line trailing whitespace stripped, trailing blank
 * lines stripped, overall trim).
 *
 * Usage: bun scripts/python-programming/builders/local-check.ts <day-NN.code.json>
 */

import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, unlinkSync, mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

function normalizeOutput(value: string): string {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n")
    .replace(/\n+$/g, "")
    .trim();
}

const filePath = process.argv[2];
if (!filePath) {
  console.error("usage: bun local-check.ts <day-NN.code.json>");
  process.exit(2);
}
const json = JSON.parse(readFileSync(filePath, "utf8"));
const dir = mkdtempSync(join(tmpdir(), "pyq-"));
const script = join(dir, "solution.py");

let pass = 0;
let fail = 0;

for (const q of json.questions as any[]) {
  writeFileSync(script, q.sourcecode);
  const cases: Array<[string, string, string]> = [
    ["sample1", q.sampleinput1, q.sampleoutput1],
    ["sample2", q.sampleinput2, q.sampleoutput2],
    ["tc1", q.input1, q.output1],
    ["tc2", q.input2, q.output2],
    ["tc3", q.input3, q.output3],
  ];
  const bad: string[] = [];
  for (const [name, input, expected] of cases) {
    const r = spawnSync("python3", [script], { input: String(input), encoding: "utf8", timeout: 15000 });
    if (r.error) {
      bad.push(`${name}: SPAWN ERROR ${String(r.error)}`);
      continue;
    }
    if (r.status !== 0) {
      bad.push(`${name}: EXIT ${r.status} stderr=${String(r.stderr || "").slice(0, 200)}`);
      continue;
    }
    const act = normalizeOutput(r.stdout);
    const exp = normalizeOutput(expected);
    if (act !== exp) {
      bad.push(`${name}: expected ${JSON.stringify(exp.slice(0, 160))} got ${JSON.stringify(act.slice(0, 160))}`);
    }
  }
  if (bad.length === 0) {
    pass++;
    console.log(`OK  [day ${json.day}] ${q.title}`);
  } else {
    fail++;
    console.log(`BAD [day ${json.day}] ${q.title}`);
    for (const b of bad) console.log(`      ${b}`);
  }
}

try { unlinkSync(script); } catch {}
console.log(`\nlocal check: ${pass} pass, ${fail} fail (of ${json.questions.length})`);
process.exit(fail > 0 ? 1 : 0);
