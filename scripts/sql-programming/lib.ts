/**
 * AtomCode — "SQL Programming" shared build/test library.
 *
 * The single source of truth for how every SQL question's expected output is
 * computed and verified. Mirrors the deployed judge EXACTLY:
 *
 *   - compilers/functions/_shared/handler.mjs → runSql() + renderSqlGrid()
 *   - handler.mjs → normalizeOutput() (used before comparing)
 *   - src/lib/question-judge.ts → composeUserCode() (headerCode + student query)
 *
 * Every code question is judged by running ONE composed script
 * (hidden headerCode + student query) on a FRESH in-memory SQLite
 * (sql.js 1.13.0 = SQLite 3.54) and comparing the rendered result grid
 * against the stored expected text. All 4 judge slots run the same script;
 * empty slots after index 0 auto-pass.
 *
 * buildDay() therefore:
 *   1. executes headerCode + sourcecode on a fresh database,
 *   2. renders the grid (the expected output text),
 *   3. double-runs to prove determinism,
 *   4. checks the reference solution against its own blacklist/whitelist,
 *   5. checks declared column names against the computed header row,
 *   6. writes day-NN.code.json + day-NN.mcq.json.
 */

import { writeFileSync } from "node:fs";
import path from "node:path";

/* ── exact port: handler.mjs renderSqlGrid ─────────────────────────────── */

export interface SqlPayload {
  columns: string[];
  rows: (string | null)[][];
}

export function renderSqlGrid(payload: SqlPayload): string {
  if (payload.columns.length === 0) return "";
  const lines: string[] = [];
  lines.push(payload.columns.join(" | "));
  lines.push(payload.columns.map(() => "---").join(" | "));
  for (const row of payload.rows) {
    lines.push(row.map((cell) => (cell === null ? "NULL" : String(cell))).join(" | "));
  }
  return lines.join("\n");
}

/* ── exact port: handler.mjs normalizeOutput ───────────────────────────── */

export function normalizeOutput(value: string): string {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n")
    .replace(/\n+$/g, "")
    .trim();
}

/* ── exact port: src/lib/question-judge.ts composeUserCode ─────────────── */

export function composeUserCode(
  headerCode: string | null | undefined,
  code: string
): string {
  if (!headerCode || !headerCode.trim()) return code;
  return `${headerCode.trim().replace(/\s*$/, "")}\n\n-- ── student query ──\n${code}`;
}

/* ── sql.js engine loader (mirrors the handler's resolution order) ─────── */

let sqlJsPromise: Promise<any> | null = null;

async function getSqlJs(): Promise<any> {
  if (!sqlJsPromise) {
    sqlJsPromise = (async () => {
      const candidates = [
        path.join(
          import.meta.dir,
          "../../mini-services/lambda-emulator/node_modules/sql.js"
        ),
        "sql.js",
      ];
      let lastError: unknown = null;
      for (const spec of candidates) {
        try {
          const mod = await import(spec);
          const init = mod.default?.initSqlJs ?? mod.initSqlJs ?? mod.default;
          if (typeof init === "function") return await init();
        } catch (err) {
          lastError = err;
        }
      }
      throw lastError ?? new Error("sql.js could not be resolved");
    })();
  }
  return sqlJsPromise;
}

/* ── execution — mirrors handler.mjs runSql (fresh DB per call) ────────── */

export interface SqlOutcome {
  ok: boolean;
  /** Number of result sets the script produced (judge: must be exactly 1). */
  resultSets: number;
  columns: string[];
  /** Cells stringified + NULL-normalized exactly like the judge payload. */
  rows: (string | null)[][];
  changes: number;
  grid: string;
  error?: string;
}

export async function execSqlScript(script: string): Promise<SqlOutcome> {
  const SQL = await getSqlJs();
  const db = new SQL.Database();
  try {
    let results: { columns: string[]; values: unknown[][] }[] = [];
    try {
      results = db.exec(script); // [{ columns, values }]
    } catch (error) {
      return {
        ok: false,
        resultSets: 0,
        columns: [],
        rows: [],
        changes: 0,
        grid: "",
        error: error instanceof Error ? error.message : String(error) || "SQL error.",
      };
    }

    const rows: (string | null)[][] = [];
    let columns: string[] = [];
    for (const r of results) {
      columns = r.columns;
      for (const row of r.values) {
        rows.push(
          row.map((cell) => {
            if (cell === null || cell === undefined) return null;
            if (cell instanceof Uint8Array) return "<blob>";
            return String(cell);
          })
        );
      }
    }
    const hasResultSet = columns.length > 0;
    const payload: SqlPayload = {
      columns: hasResultSet ? columns : [],
      rows: hasResultSet ? rows : [],
    };
    return {
      ok: true,
      resultSets: results.length,
      columns: payload.columns,
      rows: payload.rows,
      changes: db.getRowsModified(),
      grid: renderSqlGrid(payload),
    };
  } finally {
    try {
      db.close();
    } catch {
      /* ignore close races */
    }
  }
}

/* ── authoring types ───────────────────────────────────────────────────── */

export interface SqlCodeQuestionIn {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  variant: "basic" | "scenario";
  maxscore: number;
  lang: "sql";
  topic: string;
  subtopic: string;
  /** Hidden setup script (CREATE TABLE + INSERT) — never shown to students. */
  headerCode: string;
  /** Reference solution (admin-only). The student's query replaces this. */
  sourcecode: string;
  /** Declared output column names — must match the computed header row. */
  columns: string[];
  inputconstrains: string;
  blacklist: string;
  whitelist: string;
}

export interface SqlMcqQuestionIn {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
  subtopic: string;
  Option1: string;
  Option2: string;
  Option3: string;
  Option4: string;
  CorrectOption: 1 | 2 | 3 | 4;
  iscodesnippet: boolean;
  codesnippet: string | null;
  snippetLang: "sql" | null;
}

interface BuildDayOptions {
  day: number;
  topic: string;
  subtopics: string[];
  codeQuestions: SqlCodeQuestionIn[];
  mcqs: SqlMcqQuestionIn[];
}

/* ── keyword policy self-check (mirrors judge semantics) ───────────────── */

function parseKeywordList(raw: string | undefined | null): string[] {
  if (!raw || !raw.trim()) return [];
  return raw
    .split(",")
    .map((kw) => kw.trim())
    .filter((kw) => kw.length > 0);
}

export function checkKeywords(code: string, blacklist: string, whitelist: string): string | null {
  const bl = parseKeywordList(blacklist);
  const wl = parseKeywordList(whitelist);
  if (bl.some((keyword) => code.includes(keyword))) {
    return `Blacklist keyword(s) found in the code!`;
  }
  if (wl.some((keyword) => !code.includes(keyword))) {
    return `Whitelist keyword(s) missing from the code!`;
  }
  return null;
}

/* ── per-question verification + grid baking ───────────────────────────── */

export interface BakeResult {
  title: string;
  grid: string;
  columns: string[];
  rowCount: number;
}

async function bakeQuestion(
  q: SqlCodeQuestionIn,
  day: number
): Promise<BakeResult> {
  const label = `day ${day} · "${q.title}"`;

  // 1. Keyword policy must be satisfied by the reference solution itself.
  const violation = checkKeywords(q.sourcecode, q.blacklist, q.whitelist);
  if (violation) {
    throw new Error(`${label}: reference solution violates keyword policy — ${violation}`);
  }

  // 2. Execute header + reference on a fresh in-memory database.
  const composed = composeUserCode(q.headerCode, q.sourcecode);
  const run1 = await execSqlScript(composed);
  if (!run1.ok) {
    throw new Error(`${label}: reference solution failed to execute — ${run1.error}`);
  }

  // 3. The composed script must produce EXACTLY one result set.
  if (run1.resultSets !== 1) {
    throw new Error(
      `${label}: composed script produced ${run1.resultSets} result sets — exactly 1 required ` +
        `(header must be silent; the final statement is the only one that may return rows)`
    );
  }

  // 4. Determinism — run again on a fresh database, grids must be identical.
  const run2 = await execSqlScript(composed);
  if (!run2.ok || run2.grid !== run1.grid) {
    throw new Error(`${label}: output is NOT deterministic between runs`);
  }

  // 5. Declared columns must match the computed header row exactly.
  const computedColumns = run1.columns.map((c) => String(c).toLowerCase());
  const declaredColumns = q.columns.map((c) => c.toLowerCase());
  if (JSON.stringify(computedColumns) !== JSON.stringify(declaredColumns)) {
    throw new Error(
      `${label}: column mismatch\n  declared:  [${declaredColumns.join(", ")}]\n  computed:  [${computedColumns.join(", ")}]` +
        `\n  (alias every output column explicitly: SELECT x AS col_name)`
    );
  }

  // 6. Multi-row results must be explicitly ordered.
  if (run1.rows.length > 1 && !/\bORDER\s+BY\b/i.test(q.sourcecode)) {
    throw new Error(
      `${label}: ${run1.rows.length} rows returned but the reference has no ORDER BY — ` +
        `every multi-row result must be ordered deterministically`
    );
  }

  // 7. Row-count sanity: the rendered grid must fit the judge's caps.
  if (run1.rows.length > 200) {
    throw new Error(`${label}: ${run1.rows.length} result rows — keep grids <= 200 rows`);
  }

  return { title: q.title, grid: run1.grid, columns: run1.columns, rowCount: run1.rows.length };
}

/* ── buildDay — verify everything, then write the two day files ────────── */

const dataDir = path.join(import.meta.dir, "data");

export async function buildDay(opts: BuildDayOptions): Promise<void> {
  const d = String(opts.day).padStart(2, "0");

  // Difficulty matrix (STRICT — mirrors the other banks).
  const easy = opts.codeQuestions.filter((q) => q.difficulty === "easy");
  const medium = opts.codeQuestions.filter((q) => q.difficulty === "medium");
  const hard = opts.codeQuestions.filter((q) => q.difficulty === "hard");
  if (opts.codeQuestions.length !== 20) {
    throw new Error(`day ${d}: expected exactly 20 code questions, got ${opts.codeQuestions.length}`);
  }
  if (easy.length !== 10 || medium.length !== 6 || hard.length !== 4) {
    throw new Error(`day ${d}: difficulty matrix must be 10 easy / 6 medium / 4 hard, got ${easy.length}/${medium.length}/${hard.length}`);
  }
  const easyBasic = easy.filter((q) => q.variant === "basic");
  const easyScenario = easy.filter((q) => q.variant === "scenario");
  if (easyBasic.length !== 6 || easyScenario.length !== 4) {
    throw new Error(`day ${d}: easy split must be 6 basic / 4 scenario, got ${easyBasic.length}/${easyScenario.length}`);
  }
  for (const q of [...medium, ...hard]) {
    if (q.variant !== "scenario") {
      throw new Error(`day ${d}: "${q.title}" (${q.difficulty}) must be variant "scenario"`);
    }
    if (!q.blacklist.trim() || !q.whitelist.trim()) {
      throw new Error(`day ${d}: "${q.title}" (${q.difficulty}) must set non-empty blacklist AND whitelist`);
    }
  }
  for (const q of easy) {
    if (q.blacklist.trim() || q.whitelist.trim()) {
      throw new Error(`day ${d}: easy "${q.title}" must keep blacklist/whitelist empty`);
    }
  }
  // maxscore by difficulty.
  for (const q of opts.codeQuestions) {
    const expected = q.difficulty === "easy" ? 10 : q.difficulty === "medium" ? 20 : 30;
    if (q.maxscore !== expected) {
      throw new Error(`day ${d}: "${q.title}" maxscore must be ${expected} for ${q.difficulty}`);
    }
  }
  // Titles unique across the day.
  const titles = new Set(opts.codeQuestions.map((q) => q.title));
  if (titles.size !== opts.codeQuestions.length) {
    throw new Error(`day ${d}: duplicate code question titles`);
  }
  // Taxonomy strings must match the day's topic exactly.
  for (const q of opts.codeQuestions) {
    if (q.topic !== opts.topic) {
      throw new Error(`day ${d}: code "${q.title}" topic "${q.topic}" != "${opts.topic}"`);
    }
    if (!opts.subtopics.includes(q.subtopic)) {
      throw new Error(`day ${d}: code "${q.title}" subtopic "${q.subtopic}" not in taxonomy`);
    }
  }
  for (const m of opts.mcqs) {
    if (m.topic !== opts.topic) {
      throw new Error(`day ${d}: mcq "${m.title}" topic "${m.topic}" != "${opts.topic}"`);
    }
    if (!opts.subtopics.includes(m.subtopic)) {
      throw new Error(`day ${d}: mcq "${m.title}" subtopic "${m.subtopic}" not in taxonomy`);
    }
    if (m.iscodesnippet && !m.codesnippet?.trim()) {
      throw new Error(`day ${d}: mcq "${m.title}" flags a snippet without codesnippet`);
    }
    if (!m.iscodesnippet && m.codesnippet) {
      throw new Error(`day ${d}: mcq "${m.title}" has codesnippet but iscodesnippet=false`);
    }
    if (m.snippetLang !== null && m.snippetLang !== "sql") {
      throw new Error(`day ${d}: mcq "${m.title}" snippetLang must be "sql" or null`);
    }
  }
  const mcqDiff = {
    easy: opts.mcqs.filter((m) => m.difficulty === "easy").length,
    medium: opts.mcqs.filter((m) => m.difficulty === "medium").length,
    hard: opts.mcqs.filter((m) => m.difficulty === "hard").length,
  };
  if (opts.mcqs.length !== 20 || mcqDiff.easy !== 10 || mcqDiff.medium !== 6 || mcqDiff.hard !== 4) {
    throw new Error(
      `day ${d}: MCQ matrix must be 20 questions (10 easy / 6 medium / 4 hard), got ` +
        `${opts.mcqs.length} (${mcqDiff.easy}/${mcqDiff.medium}/${mcqDiff.hard})`
    );
  }

  // Bake: execute every solution, compute the expected grids.
  console.log(`[day ${d}] baking ${opts.codeQuestions.length} code questions…`);
  const baked: BakeResult[] = [];
  for (const q of opts.codeQuestions) {
    const result = await bakeQuestion(q, opts.day);
    baked.push(result);
    console.log(
      `  ok ${q.difficulty.padEnd(6)} ${q.title} — ${result.columns.length} cols, ` +
        `${result.rowCount} rows`
    );
  }

  // Judge-shaped expected outputs — the platform schema (AddQuestionBaseSchema)
  // requires EVERY input/output slot to be non-empty, and the judge runs the
  // SAME composed script for all 4 slots:
  //   all inputs  → descriptive notes (SQLite ignores stdin)
  //   all outputs → the same computed grid (one query = one deterministic result)
  const stdinNote = "SQLite in-memory — no stdin (the schema is pre-seeded automatically)";
  const hiddenNote =
    "SQLite in-memory — the same composed script (hidden setup + student query) runs on a fresh copy of the seeded schema; stdin is ignored";
  const codeRows = opts.codeQuestions.map((q, i) => {
    const grid = baked[i].grid;
    return {
      title: q.title,
      description: q.description,
      difficulty: q.difficulty,
      variant: q.variant,
      maxscore: q.maxscore,
      lang: "sql",
      topic: q.topic,
      subtopic: q.subtopic,
      sampleinput1: stdinNote,
      sampleoutput1: grid,
      sampleinput2: stdinNote,
      sampleoutput2: grid,
      input1: hiddenNote,
      output1: grid,
      input2: hiddenNote,
      output2: grid,
      input3: hiddenNote,
      output3: grid,
      inputconstrains: q.inputconstrains,
      blacklist: q.blacklist,
      whitelist: q.whitelist,
      headerCode: q.headerCode,
      sourcecode: q.sourcecode,
    };
  });

  const codePath = path.join(dataDir, `day-${d}.code.json`);
  const mcqPath = path.join(dataDir, `day-${d}.mcq.json`);
  writeFileSync(
    codePath,
    JSON.stringify(
      {
        day: opts.day,
        topics: [{ name: opts.topic, subtopics: opts.subtopics }],
        questions: codeRows,
      },
      null,
      2
    )
  );
  writeFileSync(
    mcqPath,
    JSON.stringify({ day: opts.day, questions: opts.mcqs }, null, 2)
  );
  console.log(
    `[day ${d}] wrote ${codePath} (${codeRows.length} code) and ${mcqPath} (${opts.mcqs.length} mcq)`
  );
}
