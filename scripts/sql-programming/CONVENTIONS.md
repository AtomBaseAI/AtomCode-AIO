# AtomCode — "SQL Programming" Question Bank Conventions

This document defines the EXACT conventions for generating day-wise question data
for the question group **"SQL Programming"**. Agents generating
`data/day-NN.code.json` / `data/day-NN.mcq.json` (via builders, see below) MUST
follow every rule here. The validator (`scripts/sql-programming/validate.ts`)
enforces them mechanically. The judge executes **SQLite (sql.js 1.13.0 =
SQLite 3.54) in-memory** — `compilers/functions/_shared/langspec/sql.json` —
and is the source of truth for execution.

CRITICAL: this is a FRESH, SQL-native question bank. Do NOT read, copy, adapt
or port questions from the "PYTHON Programming" (`scripts/python-programming/`),
"C Programming" (`scripts/c-programming/`), "Ruby Programming"
(`scripts/ruby-programming/`), "OOPS using JAVA" (`scripts/oops-java/`) or
"OOPS using CPP" (`scripts/cpp-bank/`) banks. Every scenario, story, schema,
dataset, snippet and solution must be authored from scratch, idiomatic SQLite.
Zero tolerance for repeats.

## File layout

Each day produces TWO JSON files in `scripts/sql-programming/data/`:

- `day-NN.code.json` — 20 code questions (+ the day's topic block)
- `day-NN.mcq.json`  — 20 MCQ questions

### HOW TO AUTHOR (build scripts — never hand-write raw JSON)

Each day gets a TypeScript builder `scripts/sql-programming/builders/build-day-NN.ts`
that imports the shared library and calls `buildDay()`:

```ts
import { buildDay, type SqlCodeQuestionIn, type SqlMcqQuestionIn } from "../lib.ts";

const DAY = N;
const TOPIC = "<exact topic name from taxonomy.ts>";
const SUBTOPICS = [ /* exact subtopic strings from taxonomy.ts */ ];

const codeQuestions: SqlCodeQuestionIn[] = [ /* 20 code questions */ ];
const mcqs: SqlMcqQuestionIn[] = [ /* 20 MCQ questions */ ];

await buildDay({ day: DAY, topic: TOPIC, subtopics: SUBTOPICS, codeQuestions, mcqs });
```

Run it from `/home/z/my-project` with `bun scripts/sql-programming/builders/build-day-NN.ts`.
`buildDay()` executes every reference solution on a fresh in-memory SQLite,
renders the expected output grid with the judge's exact renderer, double-runs
for determinism, enforces the difficulty matrix / taxonomy / keyword policy,
and writes both JSON files. If the builder throws, fix the content — never
edit the generated JSON by hand.

## The SQL judge model (READ THIS FIRST)

- The student's answer is ONE script. The judge composes
  `headerCode + "\n\n-- ── student query ──\n" + studentScript` and runs it on
  a **fresh empty in-memory SQLite** database for every submission and every
  judge slot.
- `headerCode` is the **hidden setup**: `CREATE TABLE …; INSERT …;` —
  it is prepended automatically and is NEVER shown to the student
  (it does not enter the RSC client payload; the practice/assessment pages
  strip it. Admins can see it in the admin forms/export).
- The composed script must produce **exactly ONE result set, from the LAST
  statement** (the header is silent: CREATE/INSERT produce no rows).
  The rendered grid of that result set is the "stdout".
- All 4 judge slots run the SAME composed script — the expected grid is stored
  in `sampleoutput1`/`sampleoutput2` (visible samples) and `output1`/`output2`/
  `output3` (hidden cases) — all identical, since one query yields one
  deterministic result. The platform schema (`AddQuestionBaseSchema`) requires
  EVERY input/output slot to be non-empty, so all input slots carry descriptive
  notes ("SQLite in-memory — no stdin …") instead of empty strings; the SQL
  engine ignores them (stdin is unused for SQL).
- Grid format (judge's `renderSqlGrid`): header row `col1 | col2`, separator
  `--- | ---`, then `value1 | value2` per row; `NULL` for null cells; numbers
  via `String(cell)`.

## Code question object (builder input)

```ts
{
  title: "Unique descriptive title (no day prefix)",
  description: "problem statement incl. the Schema: section (see below)",
  difficulty: "easy" | "medium" | "hard",
  variant: "basic" | "scenario",
  maxscore: 10 | 20 | 30,
  lang: "sql",
  topic: "<exact Topic name from taxonomy.ts>",
  subtopic: "<exact Subtopic string from that topic's list>",
  headerCode: "CREATE TABLE …; INSERT …;",   // HIDDEN setup — required, never empty
  sourcecode: "reference solution script",   // admin-only reference answer
  columns: ["exact", "output", "column", "names"],
  inputconstrains: "short note, e.g. 'SQLite dialect; schema pre-seeded'",
  blacklist: "",                              // easy: MUST be empty
  whitelist: "",                              // easy: MUST be empty
}
```

`buildDay()` computes `sampleoutput1`/`output1` by executing the solution —
you never write grids by hand. `columns` must list the exact output column
names (the validator compares them against the computed header row).

## Description format (plain text — the UI renders it verbatim)

```
<1-4 sentence problem statement. Scenario questions tell a short concrete story.>

Schema:
- table_name(col1 TYPE, col2 TYPE, ...)
- other_table(colA TYPE, colB TYPE -> table_name.col1, ...)

Task:
<exactly what the final result must contain: required columns and their
names, required ordering ("ordered by X ascending"), row filter semantics.>

Rules:
- SQLite dialect. The schema and its data are pre-seeded automatically —
  do not include CREATE TABLE or INSERT statements in your answer.
- Column names and order must match exactly (alias every output column).
- Row order must match exactly (use ORDER BY as specified).
```

- The `Schema:` section MUST list every table the header creates with its
  columns (students need the schema to write queries; the INSERTed DATA stays
  hidden).
- Multi-statement tasks (DDL/DML/trigger days) replace the "Rules" bullet
  about not including DDL with explicit step instructions, e.g.
  "1) CREATE TABLE … 2) INSERT … 3) finish with a SELECT that returns …".
  The final statement must be the SELECT that produces the graded result.
- Reference data volume: 5–12 rows per table, realistic names/values,
  deliberately varied (ties, NULLs, edge rows) so filters and ordering are
  meaningful. Data must be **deterministic** — never use RANDOM(), time()
  or date('now').

## headerCode rules (MANDATORY)

1. Non-empty for EVERY code question. CREATE TABLE statements first, then
   INSERT statements. Plain SQLite syntax (INTEGER PRIMARY KEY, TEXT, REAL,
   NUMERIC, BLOB).
2. Deterministic and idempotent on an empty database (no DROP needed — every
   run starts from a fresh empty DB; including DROP TABLE IF EXISTS is
   harmless and allowed but usually unnecessary).
3. Must NOT contain the answer query or hint at it beyond the schema itself.
4. Keep total header size modest (<= ~6 KB). Column names lowercase
   snake_case; table names lowercase plural (users, orders, enrollments).
5. Foreign keys: use plain `INTEGER` columns + a comment arrow in the
   Schema: section (`-> users.id`). Do NOT rely on `PRAGMA foreign_keys` or
   ON DELETE behaviour in graded results.

## Reference solution rules (MANDATORY)

1. Runs on SQLite 3.54 without extensions. The composed script (header +
   solution) must produce exactly ONE result set from the LAST statement.
2. **Alias every output column** (`SELECT COUNT(*) AS user_count`) so the
   header row is deterministic. `columns[]` must list them in order, lowercase.
3. Every multi-row result MUST be ordered (`ORDER BY`), with a total
   tie-breaker (usually the primary key) so ordering is fully deterministic.
   The validator rejects multi-row solutions without ORDER BY.
4. Averages/floats: wrap in `ROUND(x, 2)` so numbers render as `"72.66"`
   instead of full-precision `"72.66666666666667"`. Integer arithmetic stays
   integer.
5. Text concatenation: SQLite has `group_concat(x)` / `group_concat(x, ', ')`
   (no STRING_AGG). Use a subquery with ORDER BY when the concatenated order
   matters.
6. String functions: `upper, lower, length, substr, replace, trim, instr`,
   `printf`, `||` concatenation. Date/time: `date(...)`, `strftime(...)` with
   FIXED input dates only (no date('now')).
7. No prompts, no debug text, no PRAGMA toggles that change results.
8. Performance: everything must finish in well under 2 seconds on sql.js.
   Keep result grids <= 200 rows (buildDay rejects more).
9. The reference solution MUST satisfy its own blacklist/whitelist policy
   (see below). `buildDay` fails otherwise.

### SQLite dialect guardrails per day (buildDay/validate do not check dialect — YOU must)

- Supported and encouraged: CTEs incl. recursive (day 14), window functions
  (day 15), RIGHT/FULL JOIN (day 10), NULLS FIRST/LAST (day 7), RETURNING
  (day 4), triggers with NEW/OLD (day 20), SAVEPOINT/ROLLBACK (day 18),
  EXPLAIN QUERY PLAN + `sqlite_master`/`pragma_table_info` introspection
  (days 2 & 17), JSON1 functions (avoid unless essential).
- NOT available — do not use in reference solutions or require in tasks:
  `CREATE PROCEDURE`/`CREATE FUNCTION` (day 19 → write "procedure-style"
  MULTI-STATEMENT scripts instead: several INSERT/UPDATE statements followed
  by a final SELECT, or CREATE VIEW encapsulation), materialized views
  (day 16 → regular views only; materialized views stay MCQ theory),
  `GROUPING SETS`/`CUBE`/`ROLLUP` (day 9 → plain GROUP BY variants),
  `STRING_AGG`, `ILIKE`, `ALTER COLUMN`, `DROP COLUMN` (pre-3.35 style is
  unavailable; SQLite 3.54 supports DROP COLUMN but avoid it in graded
  results), stored-event scheduling (day 20 → triggers only).
- `EXPLAIN`-style statements produce result sets — if a task grades an
  EXPLAIN, ensure it is the ONLY result-producing statement and keep the
  expected grid stable (prefer grading a concrete SELECT instead; use EXPLAIN
  only in MCQ snippets).

## Per-day difficulty matrix (STRICT)

### Code questions (exactly 20 per day)

| Difficulty | Count | Requirements |
|-----------|-------|--------------|
| easy | 10 | 6 marked `"variant": "basic"` (drills) + 4 marked `"variant": "scenario"` (real-world scenario flavored). blacklist `""`, whitelist `""`. maxscore 10 |
| medium | 6 | ALL scenario-based. MUST have non-empty `blacklist` AND non-empty `whitelist`. maxscore 20 |
| hard | 4 | Extreme scenario-based with multi-step logic (multi-statement scripts allowed). MUST have non-empty `blacklist` AND non-empty `whitelist`. maxscore 30 |

### MCQ questions (exactly 20 per day)

| Difficulty | Count |
|-----------|-------|
| easy | 10 |
| medium | 6 |
| hard | 4 |

The `variant` field ("basic"/"scenario") is generator metadata only — NOT
stored in the database. Keep it in the JSON for auditability.

## Blacklist / whitelist design (medium + hard)

- Format: comma-separated substrings, e.g. `"JOIN, JOIN,  ="` — keep them
  plain and effective. Matching is CASE-SENSITIVE substring containment on
  the student's raw code (`code.includes(keyword)`).
- Blacklist: keywords that would trivialize the practiced construct
  (e.g. `JOIN` when practicing correlated subqueries, `WITH` when practicing
  subqueries, `group_concat` when practicing COUNT+case logic,
  `ROUND` when practicing integer math). Blacklisting the very keyword the
  task REQUIRES is forbidden.
- Whitelist: every substring the task intends to practice MUST be present
  (e.g. `HAVING`, `GROUP BY`, `EXISTS`, `OVER`, `RETURNING`).
- Keep lists SHORT (1–3 entries each) and make sure the reference solution
  passes (the validator checks).

## Topic taxonomy (EXACT strings — from scripts/sql-programming/taxonomy.ts)

One topic per day, exact names in `scripts/sql-programming/taxonomy.ts`
(`TOPIC_TAXONOMY`). Every question's `topic` must equal the day's topic name
exactly and `subtopic` must be one of that topic's exact subtopic strings.

| Day | Topic name |
|-----|------------|
| 1 | Introduction to Databases and SQL |
| 2 | Data Definition Language (DDL) |
| 3 | Data Types and Constraints |
| 4 | Data Manipulation (INSERT UPDATE DELETE) |
| 5 | SELECT Basics |
| 6 | Filtering with WHERE |
| 7 | Sorting and Limiting |
| 8 | Aggregate Functions |
| 9 | GROUP BY and HAVING |
| 10 | INNER and OUTER Joins |
| 11 | Cross and Self Joins |
| 12 | Subqueries |
| 13 | Set Operations |
| 14 | Common Table Expressions (CTEs) |
| 15 | Window Functions |
| 16 | Views |
| 17 | Indexes and Performance |
| 18 | Transactions and ACID |
| 19 | Stored Procedures and Functions |
| 20 | Triggers and Events |

Day 1 has no real tables to grade — its code questions use tiny two-column
tables (e.g. notes, products) to demonstrate SELECT/result-set mechanics
(the header still creates and seeds them).

## MCQ format

```ts
{
  title: "…",
  description: "question text (snippet questions may reference the snippet)",
  difficulty: "easy" | "medium" | "hard",
  topic: "<exact topic>",
  subtopic: "<exact subtopic>",
  Option1..Option4: "…",
  CorrectOption: 1..4,
  iscodesnippet: boolean,
  codesnippet: "SQL snippet or null",
  snippetLang: "sql" | null,
}
```

- Spread the CorrectOption across 1–4 roughly evenly (5 each per day).
- At least 6 snippet MCQs per day (`iscodesnippet: true`, `snippetLang: "sql"`,
  non-null `codesnippet`). Snippets must be valid SQLite and short (<= 12 lines).
- Option texts: no "All of the above"/"None of the above" in easy; use
  sparingly in hard only. Distractors must be plausible and distinct.
- Day-19/20 MCQs MAY cover general SQL theory (procedures, events) even
  though SQLite cannot run them — mark snippets SQLite-compatible.
