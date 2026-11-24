/**
 * Validator for the "SQL Programming" question bank.
 *
 * Usage:
 *   bun scripts/sql-programming/validate.ts <file1.json> [file2.json ...] [--all]
 *     [--smoke] [--report=<path>]
 *
 * - .code.json files: structure + difficulty matrix + taxonomy + headerCode
 *   presence + keyword policy + LOCAL execution of every question's composed
 *   script (headerCode + sourcecode) on a fresh in-memory SQLite, verifying
 *   exactly-one-result-set, determinism, declared columns, ORDER BY rule and
 *   that the stored sampleoutput1/output1 grids match the computed grid.
 * - .mcq.json files: structure validation + option/correctness sanity.
 * - Exit 0 when everything passes.
 */

import { execSqlScript, composeUserCode, normalizeOutput } from "./lib.ts";
import { TOPIC_TAXONOMY, GROUP_TITLE } from "./taxonomy.ts";
import { readFileSync } from "node:fs";

/* ── CLI args ── */
const args = process.argv.slice(2);
const SMOKE = args.includes("--smoke");
const REPORTraw = args.find((a) => a.startsWith("--report="));
const REPORT = REPORTraw ? REPORTraw.split("=").slice(1).join("=") : undefined;
const filePaths = args.filter((a) => !a.startsWith("--"));
if (args.includes("--all")) {
  const fs = await import("node:fs");
  const dir = new URL("./data/", import.meta.url).pathname;
  filePaths.push(
    ...fs.readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => dir + f)
  );
}
if (filePaths.length === 0) {
  console.error("No input files. Pass day-NN.code.json / day-NN.mcq.json paths or --all.");
  process.exit(2);
}

/* ── helpers ── */
let passed = 0;
let failed = 0;
const failures: string[] = [];
function check(scope: string, name: string, cond: boolean, extra = ""): void {
  if (cond) {
    passed++;
    if (!SMOKE) console.log(`  PASS  ${scope}: ${name}`);
  } else {
    failed++;
    const msg = `${scope}: ${name}${extra ? ` — ${extra}` : ""}`;
    failures.push(msg);
    console.error(`  FAIL  ${msg}`);
  }
}

function parseKeywordList(raw: unknown): string[] {
  if (typeof raw !== "string" || !raw.trim()) return [];
  return raw.split(",").map((kw) => kw.trim()).filter((kw) => kw.length > 0);
}

function keywordViolation(code: string, raw: string, which: "blacklist" | "whitelist"): string | null {
  const list = parseKeywordList(raw);
  if (which === "blacklist") {
    const hit = list.find((kw) => code.includes(kw));
    return hit ? `blacklisted substring "${hit}" present` : null;
  }
  const missing = list.find((kw) => !code.includes(kw));
  return missing ? `whitelisted substring "${missing}" missing` : null;
}

/* ── code-file validation ── */
async function validateCodeFile(file: string): Promise<void> {
  const scope = file.split("/").slice(-2).join("/");
  const json = JSON.parse(readFileSync(file, "utf8"));
  const day: number = json.day;
  const questions: any[] = json.questions ?? [];
  const topics: { name: string; subtopics: string[] }[] = json.topics ?? [];

  check(scope, "day matches file name", /day-(\d+)\.code\.json$/.test(file) && Number(file.match(/day-(\d+)\.code\.json$/)![1]) === day);
  check(scope, "topic block present", topics.length === 1 && typeof topics[0]?.name === "string");
  const taxDef = TOPIC_TAXONOMY[day];
  check(scope, "day exists in taxonomy", Array.isArray(taxDef));
  const topicName = taxDef?.[0]?.name ?? "";
  check(scope, "topic name matches taxonomy", topics[0]?.name === topicName, `got "${topics[0]?.name}", want "${topicName}"`);
  const subtopicList: string[] = taxDef?.[0]?.subtopics ?? [];
  check(
    scope,
    "subtopic list matches taxonomy",
    JSON.stringify(topics[0]?.subtopics ?? []) === JSON.stringify(subtopicList)
  );

  check(scope, "exactly 20 code questions", questions.length === 20, `got ${questions.length}`);
  const counts = {
    easy: questions.filter((q) => q.difficulty === "easy").length,
    medium: questions.filter((q) => q.difficulty === "medium").length,
    hard: questions.filter((q) => q.difficulty === "hard").length,
  };
  check(scope, "difficulty matrix 10/6/4", counts.easy === 10 && counts.medium === 6 && counts.hard === 4, JSON.stringify(counts));
  const titles = new Set(questions.map((q) => q.title));
  check(scope, "titles unique", titles.size === questions.length);

  for (const q of questions) {
    const label = `"${q.title}"`;
    check(scope, `${label} lang=sql`, q.lang === "sql");
    check(scope, `${label} topic ok`, q.topic === topicName);
    check(scope, `${label} subtopic ok`, subtopicList.includes(q.subtopic));
    check(scope, `${label} maxscore ok`,
      (q.difficulty === "easy" && q.maxscore === 10) ||
      (q.difficulty === "medium" && q.maxscore === 20) ||
      (q.difficulty === "hard" && q.maxscore === 30));
    check(scope, `${label} headerCode non-empty`, typeof q.headerCode === "string" && q.headerCode.trim().length > 0);
    check(scope, `${label} headerCode has CREATE`, /\bCREATE\s+TABLE\b/i.test(q.headerCode ?? ""));
    check(scope, `${label} sourcecode non-empty`, typeof q.sourcecode === "string" && q.sourcecode.trim().length > 0);
    check(scope, `${label} description non-empty`, typeof q.description === "string" && q.description.trim().length > 40);
    check(scope, `${label} description has Schema:`, /Schema:/i.test(q.description));
    check(scope, `${label} description has Task:`, /Task:/i.test(q.description));
    check(scope, `${label} description no answer leak`,
      !q.description.includes(q.sourcecode?.slice(0, 60) ?? "\u0000"));

    // variant + keyword policy per difficulty
    if (q.difficulty === "easy") {
      check(scope, `${label} easy variant ok`, q.variant === "basic" || q.variant === "scenario");
      check(scope, `${label} easy blacklist empty`, !q.blacklist);
      check(scope, `${label} easy whitelist empty`, !q.whitelist);
    } else {
      check(scope, `${label} scenario variant`, q.variant === "scenario");
      check(scope, `${label} blacklist set`, typeof q.blacklist === "string" && q.blacklist.trim().length > 0);
      check(scope, `${label} whitelist set`, typeof q.whitelist === "string" && q.whitelist.trim().length > 0);
      const bl = keywordViolation(q.sourcecode ?? "", q.blacklist, "blacklist");
      check(scope, `${label} reference passes blacklist`, bl === null, bl ?? "");
      const wl = keywordViolation(q.sourcecode ?? "", q.whitelist, "whitelist");
      check(scope, `${label} reference passes whitelist`, wl === null, wl ?? "");
    }

    // judge-shaped slot layout: ALL slots non-empty (platform schema contract),
    // all outputs identical (one query = one deterministic result)
    const allInputsNonEmpty =
      ["sampleinput1", "sampleinput2", "input1", "input2", "input3"].every(
        (f) => typeof q[f] === "string" && q[f].trim().length > 0
      );
    check(scope, `${label} all input slots non-empty (platform contract)`, allInputsNonEmpty);
    const gridsIdentical =
      q.sampleoutput1 === q.output1 && q.output1 === q.output2 && q.output2 === q.output3;
    check(scope, `${label} all output slots identical`, gridsIdentical);

    // LOCAL judge-shaped execution
    const composed = composeUserCode(q.headerCode, q.sourcecode);
    const run1 = await execSqlScript(composed);
    check(scope, `${label} composed executes`, run1.ok, run1.error ?? "");
    if (run1.ok) {
      check(scope, `${label} exactly 1 result set`, run1.resultSets === 1, `got ${run1.resultSets}`);
      const run2 = await execSqlScript(composed);
      check(scope, `${label} deterministic`, run2.ok && run2.grid === run1.grid);
      check(scope, `${label} grid non-empty`, run1.grid.length > 0);
      check(scope, `${label} grid rows <= 200`, run1.rows.length <= 200, `${run1.rows.length}`);
      if (run1.rows.length > 1) {
        check(scope, `${label} ORDER BY present`, /\bORDER\s+BY\b/i.test(q.sourcecode ?? ""));
      }
      check(scope, `${label} sampleoutput1 = computed grid`, normalizeOutput(q.sampleoutput1 ?? "") === normalizeOutput(run1.grid));
      check(scope, `${label} output1 = computed grid`, normalizeOutput(q.output1 ?? "") === normalizeOutput(run1.grid));
      check(scope, `${label} output2/3 = computed grid`, normalizeOutput(q.output2 ?? "") === normalizeOutput(run1.grid) && normalizeOutput(q.output3 ?? "") === normalizeOutput(run1.grid));
    }
  }
}

/* ── mcq-file validation ── */
function validateMcqFile(file: string): void {
  const scope = file.split("/").slice(-2).join("/");
  const json = JSON.parse(readFileSync(file, "utf8"));
  const day: number = json.day;
  const questions: any[] = json.questions ?? [];

  check(scope, "day matches file name", /day-(\d+)\.mcq\.json$/.test(file) && Number(file.match(/day-(\d+)\.mcq\.json$/)![1]) === day);
  const taxDef = TOPIC_TAXONOMY[day];
  const topicName = taxDef?.[0]?.name ?? "";
  const subtopicList: string[] = taxDef?.[0]?.subtopics ?? [];

  check(scope, "exactly 20 mcq questions", questions.length === 20, `got ${questions.length}`);
  const counts = {
    easy: questions.filter((q) => q.difficulty === "easy").length,
    medium: questions.filter((q) => q.difficulty === "medium").length,
    hard: questions.filter((q) => q.difficulty === "hard").length,
  };
  check(scope, "difficulty matrix 10/6/4", counts.easy === 10 && counts.medium === 6 && counts.hard === 4, JSON.stringify(counts));
  const titles = new Set(questions.map((q) => q.title));
  check(scope, "titles unique", titles.size === questions.length);
  const correctDist = [1, 2, 3, 4].map(
    (n) => questions.filter((q) => q.CorrectOption === n).length
  );
  check(scope, "correct option spread", correctDist.every((c) => c >= 2 && c <= 8), JSON.stringify(correctDist));
  const snippets = questions.filter((q) => q.iscodesnippet).length;
  check(scope, "at least 6 snippet MCQs", snippets >= 6, `got ${snippets}`);

  for (const q of questions) {
    const label = `"${q.title}"`;
    check(scope, `${label} topic ok`, q.topic === topicName);
    check(scope, `${label} subtopic ok`, subtopicList.includes(q.subtopic));
    check(scope, `${label} description non-empty`, typeof q.description === "string" && q.description.trim().length > 10);
    for (const opt of ["Option1", "Option2", "Option3", "Option4"]) {
      check(scope, `${label} ${opt} non-empty`, typeof q[opt] === "string" && q[opt].trim().length > 0);
    }
    check(scope, `${label} CorrectOption in 1..4`, [1, 2, 3, 4].includes(q.CorrectOption));
    check(scope, `${label} snippet fields consistent`,
      q.iscodesnippet ? (typeof q.codesnippet === "string" && q.codesnippet.trim().length > 0 && q.snippetLang === "sql")
                      : (q.codesnippet === null && q.snippetLang === null));
    if (q.iscodesnippet) {
      check(scope, `${label} snippet <= 14 lines`, (q.codesnippet as string).split("\n").length <= 14);
    }
  }
}

/* ── run ── */
console.log(`Validating ${filePaths.length} file(s) for "${GROUP_TITLE}"…`);
for (const file of filePaths) {
  console.log(`\n── ${file}`);
  if (file.endsWith(".code.json")) {
    await validateCodeFile(file);
  } else if (file.endsWith(".mcq.json")) {
    validateMcqFile(file);
  } else {
    console.error(`  SKIP  unsupported file type: ${file}`);
  }
}

console.log(`\n==== ${passed} passed, ${failed} failed ====`);
if (REPORT) {
  const fs = await import("node:fs");
  fs.writeFileSync(REPORT, JSON.stringify({ passed, failed, failures }, null, 2));
}
process.exit(failed === 0 ? 0 : 1);
