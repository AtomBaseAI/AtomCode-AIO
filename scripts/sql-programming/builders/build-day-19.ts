/**
 * Day 19 — "Stored Procedures and Functions" — payroll processing run domain.
 *
 * SQLite has NO CREATE PROCEDURE / CREATE FUNCTION. Code questions emulate
 * procedure-style logic with MULTI-STATEMENT scripts (several UPDATE/INSERT
 * statements implementing a business rule, then ONE final SELECT proving the
 * resulting state), plus one CREATE VIEW-as-reusable-logic question. MCQs cover
 * cross-dialect procedure/function theory; snippets stay SQLite-compatible
 * (the one dialect snippet is explicitly a "which dialect?" question).
 *
 * Run from /home/z/my-project:
 *   bun scripts/sql-programming/builders/build-day-19.ts
 */
import { buildDay, type SqlCodeQuestionIn, type SqlMcqQuestionIn } from "../lib.ts";

const DAY = 19;
const TOPIC = "Stored Procedures and Functions";
const SUBTOPICS = [
  "CREATE PROCEDURE",
  "CREATE FUNCTION",
  "Parameters IN OUT INOUT",
  "RETURN in Functions",
  "CALL Statement",
  "Variables and Control Flow in Procedures",
];

/* Shared hidden setup: a payroll engine mid-run — 8 employees, 1 run row. */
const PAYROLL_SCHEMA = `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  dept TEXT NOT NULL,
  base_salary INTEGER NOT NULL,
  bonus INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE payroll_runs (
  id INTEGER PRIMARY KEY,
  run_month TEXT NOT NULL,
  processed INTEGER NOT NULL DEFAULT 0
);
INSERT INTO employees (name, dept, base_salary, bonus) VALUES
('Aiko Tanaka', 'Engineering', 95000, 0),
('Marcus Bell', 'Engineering', 88000, 0),
('Priya Sharma', 'Engineering', 102000, 0),
('Lena Fischer', 'Sales', 71000, 0),
('Omar Haddad', 'Sales', 69000, 0),
('Grace Kim', 'HR', 64000, 0),
('Tomas Rivera', 'HR', 61500, 0),
('Nadia Osei', 'Operations', 58000, 0);
INSERT INTO payroll_runs (run_month, processed) VALUES
('2026-01', 0);`;

const SCHEMA_NOTE_PAYROLL =
  "Schema:\n" +
  "- employees(id INTEGER PRIMARY KEY, name TEXT, dept TEXT, base_salary INTEGER, bonus INTEGER)\n" +
  "- payroll_runs(id INTEGER PRIMARY KEY, run_month TEXT, processed INTEGER)\n\n" +
  "Eight employees are seeded across four departments (Engineering, Sales, HR, Operations) with every bonus starting at 0, plus one payroll run row ('2026-01', processed 0). Money is whole dollars; SQLite has no CREATE PROCEDURE, so each 'procedure' below is a multi-statement script executed in order.";

const RULES_PROC =
  "Rules:\n" +
  "- SQLite dialect. The schema and its data are pre-seeded automatically — do not include CREATE TABLE statements in your answer.\n" +
  "- Multi-statement task: run the statements in the numbered order, then finish with ONE final SELECT — only that last result set is graded.\n" +
  "- Every statement before the final SELECT must produce no rows (UPDATE and INSERT without RETURNING are silent).\n" +
  "- Column names and order must match exactly (alias every output column).\n" +
  "- Row order must match exactly (use ORDER BY as specified).";

const codeQuestions: SqlCodeQuestionIn[] = [
  /* ── easy · basic (6) ─────────────────────────────────────────────── */
  {
    title: "Engineering Bonus Sweep",
    description: `The month's first "procedure" is a flat sweep: run_grant_engineering_bonus(4000). In SQLite you execute its body as plain statements, in order.\n\n${SCHEMA_NOTE_PAYROLL}\n\nTask:\n1) Set bonus = 4000 for every employee whose dept = 'Engineering'.\n2) Mark the run as fully processed: set processed = 3 in payroll_runs (three Engineering employees).\n3) Finish with a SELECT returning name and bonus for employees where dept = 'Engineering', ordered by name ascending.\n\n${RULES_PROC}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CREATE PROCEDURE",
    headerCode: PAYROLL_SCHEMA,
    sourcecode: `UPDATE employees SET bonus = 4000 WHERE dept = 'Engineering';
UPDATE payroll_runs SET processed = 3;
SELECT name, bonus FROM employees WHERE dept = 'Engineering' ORDER BY name;`,
    columns: ["name", "bonus"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Mark the Run Processed",
    description: `The procedure run_mark_processed(8) stamps the payroll run and posts a small onboarding bonus. Execute its two statements, then read back the run row.\n\n${SCHEMA_NOTE_PAYROLL}\n\nTask:\n1) Set processed = 8 in payroll_runs.\n2) Set bonus = 500 for every employee whose dept = 'Operations'.\n3) Finish with a SELECT returning run_month and processed from payroll_runs, ordered by id ascending.\n\n${RULES_PROC}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CALL Statement",
    headerCode: PAYROLL_SCHEMA,
    sourcecode: `UPDATE payroll_runs SET processed = 8;
UPDATE employees SET bonus = 500 WHERE dept = 'Operations';
SELECT run_month, processed FROM payroll_runs ORDER BY id;`,
    columns: ["run_month", "processed"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Five Percent for Sales",
    description: `The parameterized procedure run_pct_bonus('Sales', 5) grants a 5% bonus. With the arguments fixed at ('Sales', 5), the body becomes plain statements using integer math.\n\n${SCHEMA_NOTE_PAYROLL}\n\nTask:\n1) For every employee whose dept = 'Sales', set bonus = (base_salary / 100) * 5 (integer division keeps it exact).\n2) Finish with a SELECT returning name and bonus for employees where dept = 'Sales', ordered by name ascending.\n\n${RULES_PROC}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Parameters IN OUT INOUT",
    headerCode: PAYROLL_SCHEMA,
    sourcecode: `UPDATE employees SET bonus = (base_salary / 100) * 5 WHERE dept = 'Sales';
SELECT name, bonus FROM employees WHERE dept = 'Sales' ORDER BY name;`,
    columns: ["name", "bonus"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Reset Bonuses to Zero",
    description: `The maintenance procedure run_reset_bonuses clears every bonus before a fresh run. Execute its body, then verify the grand total.\n\n${SCHEMA_NOTE_PAYROLL}\n\nTask:\n1) Set bonus = 0 for every employee.\n2) Finish with a SELECT returning SUM(bonus) aliased as total_bonus from employees.\n\n${RULES_PROC}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CREATE PROCEDURE",
    headerCode: PAYROLL_SCHEMA,
    sourcecode: `UPDATE employees SET bonus = 0;
SELECT SUM(bonus) AS total_bonus FROM employees;`,
    columns: ["total_bonus"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Cap the Bonus at 4500",
    description: `The conditional "procedure" cap_engineering(4500) runs in two steps: first a 5% bonus, then a clamp on anything above the cap. The two statements together emulate IF/THEN control flow.\n\n${SCHEMA_NOTE_PAYROLL}\n\nTask:\n1) For every employee whose dept = 'Engineering', set bonus = (base_salary / 100) * 5.\n2) For every employee whose dept = 'Engineering', set bonus = 4500 where bonus > 4500 (the clamp).\n3) Finish with a SELECT returning name and bonus for employees where dept = 'Engineering', ordered by name ascending.\n\n${RULES_PROC}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Variables and Control Flow in Procedures",
    headerCode: PAYROLL_SCHEMA,
    sourcecode: `UPDATE employees SET bonus = (base_salary / 100) * 5 WHERE dept = 'Engineering';
UPDATE employees SET bonus = 4500 WHERE dept = 'Engineering' AND bonus > 4500;
SELECT name, bonus FROM employees WHERE dept = 'Engineering' ORDER BY name;`,
    columns: ["name", "bonus"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Bonus by Department Table",
    description: `The department rate card drives a four-step "procedure": each department gets its own flat bonus, then finance reads the roll-up.\n\n${SCHEMA_NOTE_PAYROLL}\n\nTask:\n1) Set bonus = 6000 where dept = 'Engineering'.\n2) Set bonus = 3000 where dept = 'Sales'.\n3) Set bonus = 1500 where dept = 'HR'.\n4) Set bonus = 1000 where dept = 'Operations'.\n5) Finish with a SELECT returning dept and SUM(bonus) aliased as dept_bonus for all employees, grouped by dept, ordered by dept ascending.\n\n${RULES_PROC}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CREATE PROCEDURE",
    headerCode: PAYROLL_SCHEMA,
    sourcecode: `UPDATE employees SET bonus = 6000 WHERE dept = 'Engineering';
UPDATE employees SET bonus = 3000 WHERE dept = 'Sales';
UPDATE employees SET bonus = 1500 WHERE dept = 'HR';
UPDATE employees SET bonus = 1000 WHERE dept = 'Operations';
SELECT dept, SUM(bonus) AS dept_bonus FROM employees GROUP BY dept ORDER BY dept;`,
    columns: ["dept", "dept_bonus"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── easy · scenario (4) ──────────────────────────────────────────── */
  {
    title: "January Payroll Run",
    description: `The operator executes the January procedure: a flat 20.00 bonus for everyone earning under 70,000, then the run is stamped as fully processed.\n\n${SCHEMA_NOTE_PAYROLL}\n\nTask:\n1) Set bonus = 2000 for every employee whose base_salary < 70000.\n2) Set processed = 8 in payroll_runs.\n3) Finish with a SELECT returning name and bonus for employees whose bonus is greater than 0, ordered by name ascending.\n\n${RULES_PROC}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CALL Statement",
    headerCode: PAYROLL_SCHEMA,
    sourcecode: `UPDATE employees SET bonus = 2000 WHERE base_salary < 70000;
UPDATE payroll_runs SET processed = 8;
SELECT name, bonus FROM employees WHERE bonus > 0 ORDER BY name;`,
    columns: ["name", "bonus"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Operations Onboarding Bonus",
    description: `The onboarding procedure targets Operations staff and reports their total first pay (salary plus bonus).\n\n${SCHEMA_NOTE_PAYROLL}\n\nTask:\n1) Set bonus = 1200 for every employee whose dept = 'Operations'.\n2) Set processed = 8 in payroll_runs.\n3) Finish with a SELECT returning name, bonus and base_salary + bonus aliased as total_pay for employees where dept = 'Operations', ordered by name ascending.\n\n${RULES_PROC}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CREATE PROCEDURE",
    headerCode: PAYROLL_SCHEMA,
    sourcecode: `UPDATE employees SET bonus = 1200 WHERE dept = 'Operations';
UPDATE payroll_runs SET processed = 8;
SELECT name, bonus, base_salary + bonus AS total_pay FROM employees WHERE dept = 'Operations' ORDER BY name;`,
    columns: ["name", "bonus", "total_pay"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Sales and HR Award Counts",
    description: `The award procedure was called twice with different parameters: 2500.00 for Sales, then 800.00 for HR. Execute both calls' bodies, then report how many employees each call touched.\n\n${SCHEMA_NOTE_PAYROLL}\n\nTask:\n1) Set bonus = 2500 for every employee whose dept = 'Sales'.\n2) Set bonus = 800 for every employee whose dept = 'HR'.\n3) Finish with a SELECT returning dept and COUNT(*) aliased as awarded for employees whose bonus is greater than 0, grouped by dept, ordered by dept ascending.\n\n${RULES_PROC}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Parameters IN OUT INOUT",
    headerCode: PAYROLL_SCHEMA,
    sourcecode: `UPDATE employees SET bonus = 2500 WHERE dept = 'Sales';
UPDATE employees SET bonus = 800 WHERE dept = 'HR';
SELECT dept, COUNT(*) AS awarded FROM employees WHERE bonus > 0 GROUP BY dept ORDER BY dept;`,
    columns: ["dept", "awarded"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Rerun With the Fixed Constant",
    description: `A draft procedure wrote a 999 bonus to HR by mistake. Procedures are re-executed with corrected constants: the corrected run overwrites the bad values, demonstrating re-run safety.\n\n${SCHEMA_NOTE_PAYROLL}\n\nTask:\n1) Set bonus = 999 for every employee whose dept = 'HR' (the draft mistake).\n2) Re-execute the corrected body: set bonus = 1500 for every employee whose dept = 'HR'.\n3) Finish with a SELECT returning name and bonus for employees where dept = 'HR', ordered by name ascending.\n\n${RULES_PROC}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CREATE PROCEDURE",
    headerCode: PAYROLL_SCHEMA,
    sourcecode: `UPDATE employees SET bonus = 999 WHERE dept = 'HR';
UPDATE employees SET bonus = 1500 WHERE dept = 'HR';
SELECT name, bonus FROM employees WHERE dept = 'HR' ORDER BY name;`,
    columns: ["name", "bonus"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── medium · scenario (6) ────────────────────────────────────────── */
  {
    title: "Capped Engineering Bonus Run",
    description: `The flagship run_pct_bonus procedure executes with arguments ('Engineering', 3) and a 3000.00 cap: three statements compute the percentage, clamp it, and stamp the run. Only employees whose computed bonus exceeds the cap get clamped.\n\n${SCHEMA_NOTE_PAYROLL}\n\nTask:\n1) For every employee whose dept = 'Engineering', set bonus = (base_salary / 100) * 3.\n2) For every employee whose dept = 'Engineering', set bonus = 3000 where bonus > 3000.\n3) Set processed = 3 in payroll_runs.\n4) Finish with a SELECT returning name and bonus for employees where dept = 'Engineering', ordered by name ascending.\n\n${RULES_PROC}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "CREATE PROCEDURE",
    headerCode: PAYROLL_SCHEMA,
    sourcecode: `UPDATE employees SET bonus = (base_salary / 100) * 3 WHERE dept = 'Engineering';
UPDATE employees SET bonus = 3000 WHERE dept = 'Engineering' AND bonus > 3000;
UPDATE payroll_runs SET processed = 3;
SELECT name, bonus FROM employees WHERE dept = 'Engineering' ORDER BY name;`,
    columns: ["name", "bonus"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "INSERT, DELETE", whitelist: "UPDATE, payroll_runs",
  },
  {
    title: "Reusable Logic as a View",
    description: `SQLite's closest analog to a stored function is a named, reusable query — a view. Build v_dept_stats once; every future caller just SELECTs from it, and the logic lives in exactly one place.\n\n${SCHEMA_NOTE_PAYROLL}\n\nTask:\n1) Create a view named v_dept_stats returning dept, COUNT(*) aliased as headcount and SUM(base_salary) aliased as payroll_cost, grouped by dept.\n2) Finish with a SELECT returning dept, headcount and payroll_cost FROM v_dept_stats, ordered by dept ascending.\n\n${RULES_PROC}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "CREATE FUNCTION",
    headerCode: PAYROLL_SCHEMA,
    sourcecode: `CREATE VIEW v_dept_stats AS SELECT dept, COUNT(*) AS headcount, SUM(base_salary) AS payroll_cost FROM employees GROUP BY dept;
SELECT dept, headcount, payroll_cost FROM v_dept_stats ORDER BY dept;`,
    columns: ["dept", "headcount", "payroll_cost"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "UPDATE", whitelist: "CREATE VIEW, GROUP BY",
  },
  {
    title: "Parameterized Raise",
    description: `The procedure apply_raise(dept_param, pct_param) runs with arguments ('Sales', 4). Substitute the parameters and execute the body, then stamp the run as fully processed.\n\n${SCHEMA_NOTE_PAYROLL}\n\nTask:\n1) For every employee whose dept = 'Sales', set base_salary = base_salary + (base_salary / 100) * 4 (integer division).\n2) Set processed = 8 in payroll_runs.\n3) Finish with a SELECT returning name and base_salary for employees where dept = 'Sales', ordered by name ascending.\n\n${RULES_PROC}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Parameters IN OUT INOUT",
    headerCode: PAYROLL_SCHEMA,
    sourcecode: `UPDATE employees SET base_salary = base_salary + (base_salary / 100) * 4 WHERE dept = 'Sales';
UPDATE payroll_runs SET processed = 8;
SELECT name, base_salary FROM employees WHERE dept = 'Sales' ORDER BY name;`,
    columns: ["name", "base_salary"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "DELETE, DROP", whitelist: "UPDATE, base_salary",
  },
  {
    title: "Branching by Salary Band",
    description: `The band procedure emulates IF/ELSE control flow with two separate UPDATE statements — one for each branch of the condition. High earners (90,000 and above) get 5000.00; everyone below gets 2000.00.\n\n${SCHEMA_NOTE_PAYROLL}\n\nTask:\n1) Set bonus = 5000 for every employee whose base_salary >= 90000.\n2) Set bonus = 2000 for every employee whose base_salary < 90000.\n3) Finish with a SELECT returning name and bonus for ALL employees, ordered by bonus descending, tie-break by name ascending.\n\n${RULES_PROC}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Variables and Control Flow in Procedures",
    headerCode: PAYROLL_SCHEMA,
    sourcecode: `UPDATE employees SET bonus = 5000 WHERE base_salary >= 90000;
UPDATE employees SET bonus = 2000 WHERE base_salary < 90000;
SELECT name, bonus FROM employees ORDER BY bonus DESC, name ASC;`,
    columns: ["name", "bonus"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "CASE", whitelist: "UPDATE, WHERE",
  },
  {
    title: "Monthly Roll-Up Procedure",
    description: `The procedure run_monthly('2026-02') opens the new run and stamps it as fully processed — the append is part of the procedure body.\n\n${SCHEMA_NOTE_PAYROLL}\n\nTask:\n1) INSERT a new payroll_runs row with run_month = '2026-02' and processed = 8 (let the id auto-assign).\n2) Finish with a SELECT returning run_month and processed from payroll_runs, ordered by id ascending.\n\n${RULES_PROC}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "CALL Statement",
    headerCode: PAYROLL_SCHEMA,
    sourcecode: `INSERT INTO payroll_runs (run_month, processed) VALUES ('2026-02', 8);
SELECT run_month, processed FROM payroll_runs ORDER BY id;`,
    columns: ["run_month", "processed"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "DELETE, DROP", whitelist: "INSERT INTO, payroll_runs",
  },
  {
    title: "Return the Grand Total",
    description: `A scalar "function" get_total_payroll() would compute one value and RETURN it. The SQLite emulation: the body's UPDATE applies the 3% bonus, then the final SELECT hands back the single number — exactly what RETURN would deliver.\n\n${SCHEMA_NOTE_PAYROLL}\n\nTask:\n1) For every employee, set bonus = (base_salary / 100) * 3.\n2) Finish with a SELECT returning SUM(base_salary + bonus) aliased as grand_total from employees — one row, one column, no grouping.\n\n${RULES_PROC}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "RETURN in Functions",
    headerCode: PAYROLL_SCHEMA,
    sourcecode: `UPDATE employees SET bonus = (base_salary / 100) * 3;
SELECT SUM(base_salary + bonus) AS grand_total FROM employees;`,
    columns: ["grand_total"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "GROUP BY", whitelist: "SUM, UPDATE",
  },

  /* ── hard · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Tiered Bonus Ladder",
    description: `The ladder procedure emulates a three-way CASE with three sequential UPDATE statements, each owning one tier. After the ladder, the run is stamped as fully processed.\n\n${SCHEMA_NOTE_PAYROLL}\n\nTask:\n1) Set bonus = 6000 for every employee whose base_salary >= 95000.\n2) Set bonus = 3500 for every employee whose base_salary >= 70000 AND base_salary < 95000.\n3) Set bonus = 1500 for every employee whose base_salary < 70000.\n4) Set processed = 8 in payroll_runs.\n5) Finish with a SELECT returning name and bonus for ALL employees, ordered by bonus descending, tie-break by name ascending.\n\n${RULES_PROC}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Variables and Control Flow in Procedures",
    headerCode: PAYROLL_SCHEMA,
    sourcecode: `UPDATE employees SET bonus = 6000 WHERE base_salary >= 95000;
UPDATE employees SET bonus = 3500 WHERE base_salary >= 70000 AND base_salary < 95000;
UPDATE employees SET bonus = 1500 WHERE base_salary < 70000;
UPDATE payroll_runs SET processed = 8;
SELECT name, bonus FROM employees ORDER BY bonus DESC, name ASC;`,
    columns: ["name", "bonus"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "CASE, DELETE", whitelist: "UPDATE, payroll_runs",
  },
  {
    title: "Department Recharge Procedure",
    description: `The recharge procedure grant_floor(2500) guarantees a minimum bonus for everyone, then tops Engineering up by an extra 500.00, then stamps the run. Finance reads the per-department totals afterward.\n\n${SCHEMA_NOTE_PAYROLL}\n\nTask:\n1) Set bonus = 2500 for every employee whose bonus < 2500 (the floor).\n2) Add 500 to the bonus of every employee whose dept = 'Engineering'.\n3) Set processed = 8 in payroll_runs.\n4) Finish with a SELECT returning dept, SUM(bonus) aliased as total_bonus and MAX(bonus) aliased as top_bonus for all employees, grouped by dept, ordered by dept ascending.\n\n${RULES_PROC}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "CREATE PROCEDURE",
    headerCode: PAYROLL_SCHEMA,
    sourcecode: `UPDATE employees SET bonus = 2500 WHERE bonus < 2500;
UPDATE employees SET bonus = bonus + 500 WHERE dept = 'Engineering';
UPDATE payroll_runs SET processed = 8;
SELECT dept, SUM(bonus) AS total_bonus, MAX(bonus) AS top_bonus FROM employees GROUP BY dept ORDER BY dept;`,
    columns: ["dept", "total_bonus", "top_bonus"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "CASE, DELETE", whitelist: "UPDATE, GROUP BY",
  },
  {
    title: "Idempotent Sales Re-Run",
    description: `A production-grade procedure is idempotent: running it twice must not double the bonus. The pct body carries its own guard — it only writes when the current bonus is BELOW the target — and the script executes the identical statement twice, then stamps the run with the number of Sales employees processed.\n\n${SCHEMA_NOTE_PAYROLL}\n\nTask:\n1) Execute: for every employee whose dept = 'Sales' AND bonus < (base_salary / 100) * 5, set bonus = (base_salary / 100) * 5.\n2) Execute that exact same statement a second time (it must be a no-op now).\n3) Set processed = 2 in payroll_runs.\n4) Finish with a SELECT returning name and bonus for employees where dept = 'Sales', ordered by name ascending — the bonuses must match a single execution.\n\n${RULES_PROC}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "CREATE PROCEDURE",
    headerCode: PAYROLL_SCHEMA,
    sourcecode: `UPDATE employees SET bonus = (base_salary / 100) * 5 WHERE dept = 'Sales' AND bonus < (base_salary / 100) * 5;
UPDATE employees SET bonus = (base_salary / 100) * 5 WHERE dept = 'Sales' AND bonus < (base_salary / 100) * 5;
UPDATE payroll_runs SET processed = 2;
SELECT name, bonus FROM employees WHERE dept = 'Sales' ORDER BY name;`,
    columns: ["name", "bonus"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "CASE, DELETE", whitelist: "UPDATE, WHERE",
  },
  {
    title: "Payroll Reconciliation View",
    description: `The closing procedure grants Engineering a flat 4000.00 bonus, then builds a reusable reconciliation view summarizing each department's fully-loaded cost, and finally reads the view sorted by total cost.\n\n${SCHEMA_NOTE_PAYROLL}\n\nTask:\n1) Set bonus = 4000 for every employee whose dept = 'Engineering'.\n2) Create a view named v_reconciliation returning dept, SUM(base_salary + bonus) aliased as total_cost and COUNT(*) aliased as staff, grouped by dept.\n3) Finish with a SELECT returning dept, total_cost and staff FROM v_reconciliation, ordered by total_cost descending, tie-break by dept ascending.\n\n${RULES_PROC}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "CREATE FUNCTION",
    headerCode: PAYROLL_SCHEMA,
    sourcecode: `UPDATE employees SET bonus = 4000 WHERE dept = 'Engineering';
CREATE VIEW v_reconciliation AS SELECT dept, SUM(base_salary + bonus) AS total_cost, COUNT(*) AS staff FROM employees GROUP BY dept;
SELECT dept, total_cost, staff FROM v_reconciliation ORDER BY total_cost DESC, dept ASC;`,
    columns: ["dept", "total_cost", "staff"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "DELETE, DROP", whitelist: "CREATE VIEW, UPDATE, GROUP BY",
  },
];

/* ── MCQs (20: 10 easy / 6 medium / 4 hard; 6 snippets; spread 6/5/4/5) ── */
const mcqs: SqlMcqQuestionIn[] = [
  { title: "SQLite Procedures", description: "Does SQLite support CREATE PROCEDURE?", difficulty: "easy", topic: TOPIC, subtopic: "CREATE PROCEDURE",
    Option1: "Yes, since version 3.30", Option2: "Yes, but only in WAL mode", Option3: "Yes, invoked with CALL", Option4: "No — SQLite has no stored procedures or stored functions", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Procedure Definition", description: "The snippet defines department totals through SQLite's reusable-logic analog. How many rows does the final SELECT return?", difficulty: "easy", topic: TOPIC, subtopic: "CREATE PROCEDURE",
    Option1: "8 — one per employee", Option2: "4 — one per department", Option3: "1 — a single grand total", Option4: "0 — views cannot aggregate", CorrectOption: 2, iscodesnippet: true,
    codesnippet: "CREATE VIEW v_totals AS\nSELECT dept, SUM(base_salary) AS cost\nFROM employees GROUP BY dept;\nSELECT * FROM v_totals ORDER BY dept;", snippetLang: "sql" },
  { title: "IN Parameter", description: "An IN parameter of a stored procedure…", difficulty: "easy", topic: TOPIC, subtopic: "Parameters IN OUT INOUT",
    Option1: "Passes a value from the caller into the procedure", Option2: "Returns a value back to the caller", Option3: "Travels in both directions", Option4: "Must always be NULL", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "OUT Parameter", description: "An OUT parameter of a stored procedure…", difficulty: "easy", topic: TOPIC, subtopic: "Parameters IN OUT INOUT",
    Option1: "Only feeds data into the procedure", Option2: "Is strictly read-only", Option3: "Returns a value from the procedure back to the caller", Option4: "Cannot coexist with IN parameters", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "RETURN in Functions", description: "Lena Fischer's base_salary is 71000. What does the snippet's pct_bonus column show for her?", difficulty: "easy", topic: TOPIC, subtopic: "RETURN in Functions",
    Option1: "355", Option2: "3550", Option3: "71000", Option4: "NULL", CorrectOption: 2, iscodesnippet: true,
    codesnippet: "SELECT name, (base_salary / 100) * 5 AS pct_bonus\nFROM employees WHERE dept = 'Sales';", snippetLang: "sql" },
  { title: "CALL Statement", description: "In dialects that support stored procedures, what does CALL do?", difficulty: "easy", topic: TOPIC, subtopic: "CALL Statement",
    Option1: "Renders a view", Option2: "Fires a trigger", Option3: "Creates a table", Option4: "Executes a stored procedure by name with its arguments", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "SQLite Analog of a Procedure", description: "What is the closest SQLite analog to a reusable, named procedure body?", difficulty: "easy", topic: TOPIC, subtopic: "CREATE PROCEDURE",
    Option1: "A materialized view", Option2: "An index", Option3: "A saved multi-statement script (or a trigger/view encapsulation)", Option4: "A PRAGMA setting", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "SQLite Analog of a Function", description: "What plays the role of a scalar stored function in SQLite?", difficulty: "easy", topic: TOPIC, subtopic: "CREATE FUNCTION",
    Option1: "Expressions and built-in functions inside SELECT (optionally wrapped in a view column)", Option2: "BEGIN…END blocks", Option3: "SAVEPOINTs", Option4: "Foreign key constraints", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "View as Named Query", description: "employees holds 8 rows; two earn above 90000 (95000 and 102000). What does the snippet print?", difficulty: "easy", topic: TOPIC, subtopic: "CREATE FUNCTION",
    Option1: "8", Option2: "2 — the view behaves like a filtered table", Option3: "0", Option4: "An error — views cannot filter", CorrectOption: 2, iscodesnippet: true,
    codesnippet: "CREATE VIEW v_high_paid AS\nSELECT name, base_salary FROM employees\nWHERE base_salary > 90000;\nSELECT COUNT(*) AS n FROM v_high_paid;", snippetLang: "sql" },
  { title: "Variables in Procedures", description: "In procedural SQL dialects (PL/pgSQL, T-SQL), local variables are declared with…", difficulty: "easy", topic: TOPIC, subtopic: "Variables and Control Flow in Procedures",
    Option1: "VAR", Option2: "SET VARIABLE", Option3: "LET", Option4: "DECLARE (e.g. DECLARE total INTEGER;)", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },

  { title: "INOUT Parameter", description: "What does an INOUT parameter do?", difficulty: "medium", topic: TOPIC, subtopic: "Parameters IN OUT INOUT",
    Option1: "Carries a value in and returns an updated value out", Option2: "Accepts input only", Option3: "Produces output only", Option4: "Is invalid in every SQL dialect", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Procedure vs Function", description: "A stored FUNCTION differs from a stored PROCEDURE mainly because a function…", difficulty: "medium", topic: TOPIC, subtopic: "CREATE FUNCTION",
    Option1: "Always runs faster", Option2: "Needs no parameters", Option3: "Returns a value usable inside expressions", Option4: "Is never stored in the database", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Control Flow Statement", description: "Which construct is a procedure-body control-flow element in PL/pgSQL-style dialects?", difficulty: "medium", topic: TOPIC, subtopic: "Variables and Control Flow in Procedures",
    Option1: "GROUP BY", Option2: "HAVING", Option3: "LIMIT", Option4: "IF / WHILE", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Emulating Branching in SQLite", description: "Exactly two employees earn 90000 or more; the other six earn less. How many DISTINCT bonus values does the snippet produce?", difficulty: "medium", topic: TOPIC, subtopic: "Variables and Control Flow in Procedures",
    Option1: "1", Option2: "2 — one per branch of the emulated IF/ELSE", Option3: "8", Option4: "0", CorrectOption: 2, iscodesnippet: true,
    codesnippet: "UPDATE employees SET bonus = 5000 WHERE base_salary >= 90000;\nUPDATE employees SET bonus = 2000 WHERE base_salary < 90000;\nSELECT DISTINCT bonus FROM employees;", snippetLang: "sql" },
  { title: "Deterministic Functions", description: "A deterministic function is one that…", difficulty: "medium", topic: TOPIC, subtopic: "RETURN in Functions",
    Option1: "Uses random values internally", Option2: "Reads other tables on every call", Option3: "Returns the same output for the same input, every time", Option4: "Changes its result on each call", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Trigger vs Procedure", description: "The key difference between a trigger and a stored procedure:", difficulty: "medium", topic: TOPIC, subtopic: "CREATE PROCEDURE",
    Option1: "Triggers fire automatically on table events; procedures are called explicitly", Option2: "Triggers accept IN parameters", Option3: "Procedures fire automatically on INSERT", Option4: "They are interchangeable", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },

  { title: "Which Dialect Runs This?", description: "Which database engine can execute this snippet as-is (syntax display only — check the dialect)?", difficulty: "hard", topic: TOPIC, subtopic: "CREATE PROCEDURE",
    Option1: "SQLite 3.54", Option2: "SQLite in WAL mode", Option3: "None — the syntax is invalid everywhere", Option4: "A MySQL-style dialect — SQLite has no CREATE PROCEDURE", CorrectOption: 4, iscodesnippet: true,
    codesnippet: "CREATE PROCEDURE add_bonus (IN emp_id INT, IN amt INT)\nBEGIN\n  UPDATE employees SET bonus = bonus + amt\n  WHERE id = emp_id;\nEND;", snippetLang: "sql" },
  { title: "Parameter Modes Set", description: "Which parameter-mode trio do stored procedures commonly support across SQL dialects?", difficulty: "hard", topic: TOPIC, subtopic: "Parameters IN OUT INOUT",
    Option1: "IN only", Option2: "IN, OUT, INOUT", Option3: "UP and DOWN", Option4: "READ and WRITE", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Read the Emulated Procedure", description: "The script runs top to bottom on SQLite. What business rule does it implement?", difficulty: "hard", topic: TOPIC, subtopic: "CREATE PROCEDURE",
    Option1: "A 5% bonus for Engineering, capped at 4000", Option2: "A flat 4000 bonus with no percentage step", Option3: "A 5% bonus with no cap", Option4: "It deletes Engineering rows", CorrectOption: 1, iscodesnippet: true,
    codesnippet: "UPDATE employees SET bonus = (base_salary / 100) * 5\nWHERE dept = 'Engineering';\nUPDATE employees SET bonus = 4000\nWHERE dept = 'Engineering' AND bonus > 4000;\nSELECT name, bonus FROM employees\nWHERE dept = 'Engineering';", snippetLang: "sql" },
  { title: "Side Effects Before the Return", description: "In a multi-statement script emulating a procedure, why must the UPDATEs run before the final SELECT?", difficulty: "hard", topic: TOPIC, subtopic: "CALL Statement",
    Option1: "SQLite reverses statement order otherwise", Option2: "A SELECT cancels pending updates", Option3: "The graded result is the last statement's — it must observe the finished state", Option4: "Updates are asynchronous in SQLite", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
];

await buildDay({ day: DAY, topic: TOPIC, subtopics: SUBTOPICS, codeQuestions, mcqs });
