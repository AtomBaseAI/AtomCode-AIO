/**
 * Day 14 — "Common Table Expressions (CTEs)" — company org chart domain.
 *
 * Hidden headerCode seeds an org chart: 12 employees, 3 departments
 * (Executive / Engineering / Sales), 4 levels deep (CEO -> dept head ->
 * lead -> IC). Dana Whitfield is the CEO with NULL manager_id. Solutions
 * practice WITH (single + multiple CTEs), CTE joined back to the base
 * table and WITH RECURSIVE sequences / org walks. SQLite requires the
 * WITH RECURSIVE keyword for recursion.
 *
 * Run from /home/z/my-project:
 *   bun scripts/sql-programming/builders/build-day-14.ts
 */
import { buildDay, type SqlCodeQuestionIn, type SqlMcqQuestionIn } from "../lib.ts";

const DAY = 14;
const TOPIC = "Common Table Expressions (CTEs)";
const SUBTOPICS = [
  "WITH Clause",
  "Single CTE",
  "Multiple CTEs",
  "Recursive CTEs",
  "CTE Materialization",
];

/* Shared hidden setup: a company org chart. */
const ORG_SCHEMA = `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  manager_id INTEGER,
  department TEXT NOT NULL,
  salary INTEGER NOT NULL
);
INSERT INTO employees (name, manager_id, department, salary) VALUES
('Dana Whitfield', NULL, 'Executive', 210000),
('Alex Kim', 1, 'Engineering', 165000),
('Maria Gomez', 1, 'Sales', 158000),
('Sam Patel', 1, 'Engineering', 160000),
('Rosa Alvarez', 2, 'Engineering', 132000),
('Tomas Nguyen', 2, 'Engineering', 128000),
('Lena Fischer', 5, 'Engineering', 105000),
('Omar Farouk', 5, 'Engineering', 101000),
('Jill Monroe', 3, 'Sales', 120000),
('Chris Adams', 3, 'Sales', 116000),
('Tess Lane', 9, 'Sales', 92000),
('Ravi Shah', 9, 'Sales', 94000);`;

const RULES_SELECT_ONLY =
  "Rules:\n- SQLite dialect. The schema and its data are pre-seeded automatically — do not include CREATE TABLE or INSERT statements in your answer.\n- Column names and order must match exactly (alias every output column).\n- Row order must match exactly (use ORDER BY as specified).";

const SCHEMA_NOTE_ORG =
  "Schema:\n- employees(id INTEGER PRIMARY KEY, name TEXT, manager_id INTEGER -> employees.id, department TEXT, salary INTEGER)\n\nTwelve employees are seeded in three departments (Executive, Engineering, Sales). Dana Whitfield is the CEO with manager_id NULL. Reporting chains run four levels deep, e.g. Dana -> Alex Kim -> Rosa Alvarez -> Lena Fischer. Salaries are whole dollars; the company average salary is 131750.";

function makeDesc(story: string, task: string): string {
  return `${story}\n\n${SCHEMA_NOTE_ORG}\n\nTask:\n${task}\n\n${RULES_SELECT_ONLY}`;
}

const codeQuestions: SqlCodeQuestionIn[] = [
  /* ── easy · basic (6) ─────────────────────────────────────────────── */
  {
    title: "First CTE Drill",
    description: makeDesc(
      `Warm-up with WITH: define a CTE holding well-paid employees, then select from it.`,
      `Start with a WITH clause that captures the well-paid employees — everyone earning more than 130000 — then select name AS name and salary AS salary from that CTE, ordered by salary descending, then name ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "WITH Clause",
    headerCode: ORG_SCHEMA,
    sourcecode: "WITH high_paid AS (SELECT * FROM employees WHERE salary > 130000) SELECT name AS name, salary AS salary FROM high_paid ORDER BY salary DESC, name;",
    columns: ["name", "salary"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Department Headcount CTE",
    description: makeDesc(
      `A single CTE that aggregates: headcount per department, read back from the CTE.`,
      `Define a CTE that computes one row per department with its employee headcount, then select department AS department and headcount AS headcount from that CTE, ordered by department ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Single CTE",
    headerCode: ORG_SCHEMA,
    sourcecode: "WITH counts AS (SELECT department, COUNT(*) AS headcount FROM employees GROUP BY department) SELECT department AS department, headcount AS headcount FROM counts ORDER BY department;",
    columns: ["department", "headcount"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Salary Floor Club",
    description: makeDesc(
      `Another single-CTE drill: employees earning under 110000, captured once in a CTE and read back.`,
      `Define a CTE that captures every employee earning less than 110000, then select name AS name and salary AS salary from it, ordered by salary ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Single CTE",
    headerCode: ORG_SCHEMA,
    sourcecode: "WITH low AS (SELECT name, salary FROM employees WHERE salary < 110000) SELECT name AS name, salary AS salary FROM low ORDER BY salary;",
    columns: ["name", "salary"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Two CTE Salary Stack",
    description: makeDesc(
      `Multiple CTEs: one for Engineering, one for Sales, stacked into a single payroll stream with UNION ALL.`,
      `Define two CTEs in one WITH clause — one holding the Engineering employees' names and salaries, the other the Sales employees' names and salaries — stack the two CTEs into a single payroll stream with UNION ALL, and return name AS name and salary AS salary, ordered by salary descending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Multiple CTEs",
    headerCode: ORG_SCHEMA,
    sourcecode: "WITH eng AS (SELECT name, salary FROM employees WHERE department = 'Engineering'), sales AS (SELECT name, salary FROM employees WHERE department = 'Sales') SELECT name AS name, salary AS salary FROM eng UNION ALL SELECT name, salary FROM sales ORDER BY salary DESC;",
    columns: ["name", "salary"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Count From One To Ten",
    description: makeDesc(
      `The classic recursive sequence: WITH RECURSIVE generates the numbers 1 through 10 with an anchor and an n+1 step. SQLite requires the WITH RECURSIVE keyword.`,
      `Use a recursive CTE (SQLite requires the WITH RECURSIVE keywords) whose anchor starts the sequence at 1 and whose recursive step keeps producing the next integer up through 10, then return n AS n, ordered by n ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Recursive CTEs",
    headerCode: ORG_SCHEMA,
    sourcecode: "WITH RECURSIVE seq(n) AS (SELECT 1 UNION ALL SELECT n + 1 FROM seq WHERE n < 10) SELECT n AS n FROM seq ORDER BY n;",
    columns: ["n"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Threes Up To Thirty",
    description: makeDesc(
      `Recursive sequences can step by any amount: 3, 6, 9, ... up to and including 30.`,
      `Use a recursive CTE whose anchor starts the sequence at 3 and whose recursive step adds 3 on every round, stopping once 30 has been produced, then return n AS n, ordered by n ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Recursive CTEs",
    headerCode: ORG_SCHEMA,
    sourcecode: "WITH RECURSIVE seq(n) AS (SELECT 3 UNION ALL SELECT n + 3 FROM seq WHERE n < 30) SELECT n AS n FROM seq ORDER BY n;",
    columns: ["n"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── easy · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Payroll Review List",
    description: makeDesc(
      `HR reviews the Engineering payroll below 130000. Capture the department slice in a CTE first.`,
      `Capture the Engineering department in a WITH clause first, then select name AS employee_name and salary AS salary from that CTE, keeping only the rows earning below 130000, ordered by salary descending.`
    ),
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "WITH Clause",
    headerCode: ORG_SCHEMA,
    sourcecode: "WITH eng AS (SELECT * FROM employees WHERE department = 'Engineering') SELECT name AS employee_name, salary AS salary FROM eng WHERE salary < 130000 ORDER BY salary DESC;",
    columns: ["employee_name", "salary"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Sales Team Contact Sheet",
    description: makeDesc(
      `The Sales department prints a contact sheet with each member's manager reference.`,
      `Put the Sales department into a CTE first, then select name AS employee_name and manager_id AS manager_id from it, ordered by name ascending.`
    ),
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Single CTE",
    headerCode: ORG_SCHEMA,
    sourcecode: "WITH sales AS (SELECT * FROM employees WHERE department = 'Sales') SELECT name AS employee_name, manager_id AS manager_id FROM sales ORDER BY name;",
    columns: ["employee_name", "manager_id"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Biggest Payroll Department",
    description: makeDesc(
      `Finance asks which department carries the biggest payroll. Chain two CTEs: dept costs first, then pick the top one.`,
      `Chain two CTEs: the first computes each department's total salary, the second keeps only the department with the largest total; the final SELECT returns department AS department and total_salary AS total_salary from the second CTE — exactly one row.`
    ),
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Multiple CTEs",
    headerCode: ORG_SCHEMA,
    sourcecode: "WITH dept_cost AS (SELECT department, SUM(salary) AS total_salary FROM employees GROUP BY department), top_dept AS (SELECT department, total_salary FROM dept_cost ORDER BY total_salary DESC LIMIT 1) SELECT department AS department, total_salary AS total_salary FROM top_dept;",
    columns: ["department", "total_salary"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Launch Countdown",
    description: makeDesc(
      `The ops team rehearses the product launch with a recursive countdown: 5, 4, 3, 2, 1.`,
      `Use a recursive CTE that starts the countdown at 5 and steps down one number at a time until it reaches 1, then return n AS n from it, ordered by n descending.`
    ),
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Recursive CTEs",
    headerCode: ORG_SCHEMA,
    sourcecode: "WITH RECURSIVE countdown(n) AS (SELECT 5 UNION ALL SELECT n - 1 FROM countdown WHERE n > 1) SELECT n AS n FROM countdown ORDER BY n DESC;",
    columns: ["n"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── medium · scenario (6) ────────────────────────────────────────── */
  {
    title: "Above Department Average",
    description: makeDesc(
      `The CTO wants employees who out-earn their own department's average. Build the per-department averages in a CTE, then join it back to the base table.`,
      `Build a CTE holding each department's average salary, then join it back to employees on department and keep only the employees who out-earn their own department's average. Return e.name AS employee_name, e.salary AS salary and the department average rounded to two decimals AS dept_avg, ordered by salary descending, then employee_name ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "WITH Clause",
    headerCode: ORG_SCHEMA,
    sourcecode: "WITH dept_avg AS (SELECT department, AVG(salary) AS avg_salary FROM employees GROUP BY department) SELECT e.name AS employee_name, e.salary AS salary, ROUND(d.avg_salary, 2) AS dept_avg FROM employees e JOIN dept_avg d ON d.department = e.department WHERE e.salary > d.avg_salary ORDER BY e.salary DESC, e.name;",
    columns: ["employee_name", "salary", "dept_avg"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "HAVING", whitelist: "WITH",
  },
  {
    title: "Above The Company Average",
    description: makeDesc(
      `Who beats the company-wide average salary of 131750? Put the single average in a CTE and cross it against the employees table (comma join, no JOIN keyword).`,
      `Put the company-wide average salary into a single-row CTE and pair it against the employees table with a comma cross join (the JOIN keyword is blacklisted). Return e.name AS employee_name and e.salary AS salary for everyone earning above that average, ordered by salary descending, then employee_name ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Single CTE",
    headerCode: ORG_SCHEMA,
    sourcecode: "WITH avg_all AS (SELECT AVG(salary) AS avg_salary FROM employees) SELECT e.name AS employee_name, e.salary AS salary FROM employees e, avg_all a WHERE e.salary > a.avg_salary ORDER BY e.salary DESC, e.name;",
    columns: ["employee_name", "salary"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "JOIN, HAVING", whitelist: "WITH",
  },
  {
    title: "Managers Versus Staff Count",
    description: makeDesc(
      `Two counting CTEs in one statement: how many distinct managers (non-null manager_id) versus total employees? No JOIN keyword allowed.`,
      `Chain three CTEs: the distinct non-null manager_id values, then the count of those managers, then the count of all employees. Return one row with manager_count AS manager_count and employee_count AS employee_count, pairing the two single-row counting CTEs with commas — the JOIN keyword is blacklisted.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Multiple CTEs",
    headerCode: ORG_SCHEMA,
    sourcecode: "WITH managers AS (SELECT DISTINCT manager_id FROM employees WHERE manager_id IS NOT NULL), ic AS (SELECT COUNT(*) AS manager_count FROM managers), ec AS (SELECT COUNT(*) AS employee_count FROM employees) SELECT ic.manager_count AS manager_count, ec.employee_count AS employee_count FROM ic, ec;",
    columns: ["manager_count", "employee_count"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "JOIN", whitelist: "WITH",
  },
  {
    title: "Salary Bracket Endpoints",
    description: makeDesc(
      `Comp committee shorthand: the cheapest and the most expensive employee, discovered with two single-row CTEs and no JOIN keyword.`,
      `Use two single-row CTEs — one holding the company's minimum salary, the other its maximum — then return e.name AS employee_name, e.department AS department and e.salary AS salary for every employee sitting on either salary endpoint, ordered by salary descending. Pair employees with both CTEs using commas; the JOIN keyword is blacklisted.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Multiple CTEs",
    headerCode: ORG_SCHEMA,
    sourcecode: "WITH lo AS (SELECT MIN(salary) AS min_salary FROM employees), hi AS (SELECT MAX(salary) AS max_salary FROM employees) SELECT e.name AS employee_name, e.department AS department, e.salary AS salary FROM employees e, lo, hi WHERE e.salary = lo.min_salary OR e.salary = hi.max_salary ORDER BY e.salary DESC;",
    columns: ["employee_name", "department", "salary"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "JOIN", whitelist: "WITH, MIN",
  },
  {
    title: "Depth Chart By Employee",
    description: makeDesc(
      `Walk the org tree with WITH RECURSIVE: the CEO (NULL manager_id) sits at depth 1, direct reports at depth 2, and so on.`,
      `Walk the org chart with a recursive CTE: the anchor seeds the CEO — the employee with NULL manager_id — at depth 1, and every recursive step pulls in the direct reports of the rows found at the previous depth, one level deeper. Return id AS employee_id and depth AS depth, ordered by depth ascending, then employee_id ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Recursive CTEs",
    headerCode: ORG_SCHEMA,
    sourcecode: "WITH RECURSIVE chain(id, depth) AS (SELECT id, 1 FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.id, c.depth + 1 FROM employees e JOIN chain c ON e.manager_id = c.id) SELECT id AS employee_id, depth AS depth FROM chain ORDER BY depth, employee_id;",
    columns: ["employee_id", "depth"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "GROUP BY, OVER", whitelist: "WITH RECURSIVE",
  },
  {
    title: "Depth Chart By Name",
    description: makeDesc(
      `The same org walk, but the output carries names so the depth chart is human-readable.`,
      `Run the same recursive org walk, but have the CTE carry each employee's name as well as their depth so the chart is human-readable: the anchor seeds the CEO (NULL manager_id) at depth 1 and every step descends to that person's direct reports. Return name AS employee_name and depth AS depth, ordered by depth ascending, then employee_name ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Recursive CTEs",
    headerCode: ORG_SCHEMA,
    sourcecode: "WITH RECURSIVE chain(id, name, depth) AS (SELECT id, name, 1 FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.id, e.name, c.depth + 1 FROM employees e JOIN chain c ON e.manager_id = c.id) SELECT name AS employee_name, depth AS depth FROM chain ORDER BY depth, employee_name;",
    columns: ["employee_name", "depth"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "GROUP BY, OVER", whitelist: "WITH RECURSIVE",
  },

  /* ── hard · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Manager Report Cards",
    description: makeDesc(
      `For every manager, count direct reports and their average salary. One CTE aggregates by manager_id, then joins back to employees for the manager's name.`,
      `Aggregate one CTE by manager_id: each manager's number of direct reports and their average salary, skipping the CEO's NULL manager_id. Join that CTE back to employees to resolve each manager's name, and return e.name AS manager_name, m.reports AS reports and the average report salary rounded to two decimals AS avg_report_salary, ordered by reports descending, then manager_name ascending.`
    ),
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "WITH Clause",
    headerCode: ORG_SCHEMA,
    sourcecode: "WITH manager_stats AS (SELECT manager_id, COUNT(*) AS reports, AVG(salary) AS avg_salary FROM employees WHERE manager_id IS NOT NULL GROUP BY manager_id) SELECT e.name AS manager_name, m.reports AS reports, ROUND(m.avg_salary, 2) AS avg_report_salary FROM employees e JOIN manager_stats m ON m.manager_id = e.id ORDER BY m.reports DESC, e.name;",
    columns: ["manager_name", "reports", "avg_report_salary"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "HAVING", whitelist: "WITH, JOIN",
  },
  {
    title: "Top Earner Per Department",
    description: makeDesc(
      `Find each department's top earner: one CTE computes the MAX salary per department, then join back to employees on both department and salary. No window functions allowed.`,
      `Compute each department's highest salary in a CTE (window functions are blacklisted, so no OVER), then join it back to employees on both department and salary to return e.name AS employee_name, e.department AS department and e.salary AS salary for each department's top earner, ordered by salary descending.`
    ),
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Single CTE",
    headerCode: ORG_SCHEMA,
    sourcecode: "WITH dept_top AS (SELECT department, MAX(salary) AS top_salary FROM employees GROUP BY department) SELECT e.name AS employee_name, e.department AS department, e.salary AS salary FROM employees e JOIN dept_top d ON d.department = e.department AND e.salary = d.top_salary ORDER BY e.salary DESC;",
    columns: ["employee_name", "department", "salary"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "OVER, HAVING", whitelist: "WITH, MAX",
  },
  {
    title: "Chain Salary Roll Up",
    description: makeDesc(
      `The recursion accumulates: starting from the CEO's salary, each step adds the employee's own salary, so every chain from the top carries a running total down to that person.`,
      `Walk the org chart with a recursive CTE that accumulates salary: the anchor seeds the CEO (NULL manager_id) with their own salary at depth 1, and every recursive step adds the next employee's salary to the running total carried down the chain. Return name AS employee_name, depth AS depth and total AS chain_salary_total, ordered by total descending, then employee_name ascending.`
    ),
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Recursive CTEs",
    headerCode: ORG_SCHEMA,
    sourcecode: "WITH RECURSIVE chain(id, name, depth, total) AS (SELECT id, name, 1, salary FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.id, e.name, c.depth + 1, c.total + e.salary FROM employees e JOIN chain c ON e.manager_id = c.id) SELECT name AS employee_name, depth AS depth, total AS chain_salary_total FROM chain ORDER BY total DESC, employee_name;",
    columns: ["employee_name", "depth", "chain_salary_total"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "GROUP BY", whitelist: "WITH RECURSIVE",
  },
  {
    title: "The Deepest Bench",
    description: makeDesc(
      `Who sits at the bottom of the org chart? Recursively compute each depth, take the MAX depth in a second CTE, then join both back to name the deepest employees.`,
      `Use a recursive CTE to compute each employee's org depth, a second CTE to find the maximum depth, then join both back to employees to name everyone sitting at that deepest level. Return e.name AS employee_name and c.depth AS depth, ordered by employee_name ascending.`
    ),
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Recursive CTEs",
    headerCode: ORG_SCHEMA,
    sourcecode: "WITH RECURSIVE chain(id, depth) AS (SELECT id, 1 FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.id, c.depth + 1 FROM employees e JOIN chain c ON e.manager_id = c.id), deepest AS (SELECT MAX(depth) AS max_depth FROM chain) SELECT e.name AS employee_name, c.depth AS depth FROM chain c JOIN deepest d ON c.depth = d.max_depth JOIN employees e ON e.id = c.id ORDER BY e.name;",
    columns: ["employee_name", "depth"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "GROUP BY", whitelist: "WITH RECURSIVE",
  },
];

/* ── MCQs (20: 10 easy / 6 medium / 4 hard; 7 snippets; 5/5/5/5 spread) ── */
const mcqs: SqlMcqQuestionIn[] = [
  { title: "WITH Clause Purpose", description: "WITH dept AS (...) SELECT ... FROM dept — what does the WITH part do?", difficulty: "easy", topic: TOPIC, subtopic: "WITH Clause",
    Option1: "Creates a permanent table", Option2: "Defines a named temporary result usable by the statement that follows", Option3: "Creates an index", Option4: "Runs the query twice", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "CTE Lifetime", description: "A CTE exists:", difficulty: "easy", topic: TOPIC, subtopic: "CTE Materialization",
    Option1: "Only for the duration of the single statement using it", Option2: "Until DROP is issued", Option3: "Forever, like a table", Option4: "For the whole session", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Multiple CTEs Syntax", description: "How are two CTEs separated in one WITH clause?", difficulty: "easy", topic: TOPIC, subtopic: "Multiple CTEs",
    Option1: "Semicolons", Option2: "AND", Option3: "Commas", Option4: "UNION", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "CTE Referenced Twice", description: "Can a CTE be referenced more than once inside its statement?", difficulty: "easy", topic: TOPIC, subtopic: "Single CTE",
    Option1: "No — one reference only", Option2: "Yes — the name may be referenced multiple times", Option3: "Only if UNION ALL is used", Option4: "Yes, but rows duplicate automatically", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Recursive Keyword", description: "Which keyword does SQLite require for a recursive CTE?", difficulty: "easy", topic: TOPIC, subtopic: "Recursive CTEs",
    Option1: "WITH REPEAT", Option2: "WITH LOOP", Option3: "WITH AGAIN", Option4: "WITH RECURSIVE", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Recursive CTE Shape", description: "A recursive CTE needs:", difficulty: "easy", topic: TOPIC, subtopic: "Recursive CTEs",
    Option1: "An anchor SELECT plus a recursive SELECT combined with UNION ALL (or UNION)", Option2: "Only the recursive part", Option3: "A stored procedure", Option4: "A cursor", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Recursion Stop Condition", description: "When does a recursive CTE stop producing rows?", difficulty: "easy", topic: TOPIC, subtopic: "Recursive CTEs",
    Option1: "After 10 iterations", Option2: "When a LIMIT 10 appears anywhere", Option3: "When the recursive SELECT produces no new rows", Option4: "When the base table is empty", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Sequence Generator Snippet", description: "What does this query return?", difficulty: "easy", topic: TOPIC, subtopic: "Recursive CTEs",
    Option1: "4", Option2: "6", Option3: "5", Option4: "An infinite loop", CorrectOption: 3, iscodesnippet: true, codesnippet: "WITH RECURSIVE seq(n) AS (\n  SELECT 1 UNION ALL\n  SELECT n+1 FROM seq WHERE n < 5)\nSELECT COUNT(*) FROM seq;", snippetLang: "sql" },
  { title: "UNION Versus UNION ALL In Recursion", description: "Inside a recursive CTE, using UNION instead of UNION ALL:", difficulty: "easy", topic: TOPIC, subtopic: "Recursive CTEs",
    Option1: "Is invalid syntax", Option2: "Duplicates rows", Option3: "Runs forever", Option4: "Deduplicates intermediate rows, which can stop runaway chains", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Reading From The CTE", description: "After WITH x AS (SELECT ...), the main statement can:", difficulty: "easy", topic: TOPIC, subtopic: "Single CTE",
    Option1: "SELECT from x like a table", Option2: "Only UPDATE x", Option3: "Not reference x at all", Option4: "Use x only in INSERT statements", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },

  { title: "CTE Chaining Direction", description: "In WITH a AS (...), b AS (...), what may b reference?", difficulty: "medium", topic: TOPIC, subtopic: "Multiple CTEs",
    Option1: "Itself", Option2: "a (any earlier CTE) but not itself or later CTEs", Option3: "Later CTEs", Option4: "Nothing", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "CTE Versus Subquery Readability", description: "The main benefit of a CTE over a subquery in FROM is:", difficulty: "medium", topic: TOPIC, subtopic: "WITH Clause",
    Option1: "It is always faster", Option2: "It avoids indexes", Option3: "Named, reusable steps that make complex logic readable", Option4: "It locks the tables", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Two Single Row CTEs Snippet", description: "Is this statement valid SQLite?", difficulty: "medium", topic: TOPIC, subtopic: "Multiple CTEs",
    Option1: "Yes — lo and hi are both defined and cross-joined in the main select", Option2: "No — two CTEs cannot coexist", Option3: "No — MIN and MAX cannot appear in one WITH", Option4: "Only if UNION ALL is used", CorrectOption: 1, iscodesnippet: true, codesnippet: "WITH lo AS (SELECT MIN(salary) AS m FROM employees),\n     hi AS (SELECT MAX(salary) AS m FROM employees)\nSELECT lo.m, hi.m FROM lo, hi;", snippetLang: "sql" },
  { title: "Recursive Org Walk Snippet", description: "In this recursive CTE, what does the anchor SELECT pick?", difficulty: "medium", topic: TOPIC, subtopic: "Recursive CTEs",
    Option1: "Every employee", Option2: "The deepest rows", Option3: "Managers only", Option4: "The CEO row (NULL manager_id)", CorrectOption: 4, iscodesnippet: true, codesnippet: "WITH RECURSIVE chain(id, depth) AS (\n  SELECT id, 1 FROM employees\n    WHERE manager_id IS NULL\n  UNION ALL\n  SELECT e.id, c.depth+1\n  FROM employees e JOIN chain c\n    ON e.manager_id = c.id)\nSELECT * FROM chain;", snippetLang: "sql" },
  { title: "Materialization Hint", description: "Since SQLite 3.35, how can you force a CTE to be materialized?", difficulty: "medium", topic: TOPIC, subtopic: "CTE Materialization",
    Option1: "WITH x AS MATERIALIZED (...)", Option2: "WITH x INTO (...)", Option3: "PERSIST x AS (...)", Option4: "CACHE x AS (...)", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "CTE Column List Snippet", description: "In this statement, what are the CTE's column names?", difficulty: "medium", topic: TOPIC, subtopic: "WITH Clause",
    Option1: "COUNT(*) and SUM(salary) — CTE columns keep the source expression names", Option2: "col1 and col2 — SQLite auto-generates default names", Option3: "The statement fails — a WITH clause cannot rename columns", Option4: "cnt and total — the WITH column list names the columns positionally", CorrectOption: 4, iscodesnippet: true, codesnippet: "WITH stats(cnt, total) AS (\n  SELECT COUNT(*), SUM(salary) FROM employees)\nSELECT cnt, total FROM stats;", snippetLang: "sql" },

  { title: "Recursive Accumulator Snippet", description: "How many rows does this statement return?", difficulty: "hard", topic: TOPIC, subtopic: "Recursive CTEs",
    Option1: "2", Option2: "30", Option3: "4", Option4: "3", CorrectOption: 4, iscodesnippet: true, codesnippet: "WITH RECURSIVE t(n, total) AS (\n  SELECT 1, 10 UNION ALL\n  SELECT n+1, total+10 FROM t\n  WHERE n < 3)\nSELECT total FROM t ORDER BY n;", snippetLang: "sql" },
  { title: "Depth Guard Placement Snippet", description: "In this statement, why must the WHERE guard live inside the recursive member?", difficulty: "hard", topic: TOPIC, subtopic: "Recursive CTEs",
    Option1: "Outer WHERE cannot see CTE columns", Option2: "It bounds how many rows the member produces — without it the sequence never ends", Option3: "SQLite requires WHERE in every SELECT", Option4: "It filters the anchor instead", CorrectOption: 2, iscodesnippet: true, codesnippet: "WITH RECURSIVE seq(n) AS (\n  SELECT 1 UNION ALL\n  SELECT n+1 FROM seq WHERE n < 4)\nSELECT n FROM seq;", snippetLang: "sql" },
  { title: "CTE Join Back Snippet", description: "What does this statement return?", difficulty: "hard", topic: TOPIC, subtopic: "WITH Clause",
    Option1: "All employees", Option2: "Department averages only", Option3: "Employees earning above their department's average", Option4: "Only the CEO", CorrectOption: 3, iscodesnippet: true, codesnippet: "WITH dept_avg AS (\n  SELECT department, AVG(salary) AS a\n  FROM employees GROUP BY department)\nSELECT e.name\nFROM employees e JOIN dept_avg d\n  ON d.department = e.department\nWHERE e.salary > d.a;", snippetLang: "sql" },
  { title: "Runaway Recursion", description: "Removing WHERE n < 10 from a seq(n) = n + 1 recursive CTE causes:", difficulty: "hard", topic: TOPIC, subtopic: "Recursive CTEs",
    Option1: "SQLite caps the result at 100 rows", Option2: "Runaway recursion — the member keeps producing rows forever", Option3: "NULL output", Option4: "A compile-time error", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
];

await buildDay({ day: DAY, topic: TOPIC, subtopics: SUBTOPICS, codeQuestions, mcqs });
