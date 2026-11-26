/**
 * Day 13 — "Set Operations" — tech conference registration desk domain.
 *
 * Hidden headerCode seeds two registration tables with identical column
 * shapes (attendees_2024 / attendees_2025, 10 rows each). Two attendees
 * (Ada Chen, Ben Okafor) registered both years, and 2025 contains an
 * internal duplicate Ada row — so UNION vs UNION ALL visibly differ,
 * INTERSECT returns the returnees and EXCEPT the year-exclusive crowds.
 *
 * Run from /home/z/my-project:
 *   bun scripts/sql-programming/builders/build-day-13.ts
 */
import { buildDay, type SqlCodeQuestionIn, type SqlMcqQuestionIn } from "../lib.ts";

const DAY = 13;
const TOPIC = "Set Operations";
const SUBTOPICS = [
  "UNION",
  "UNION ALL",
  "INTERSECT",
  "EXCEPT and MINUS",
  "Column Alignment in Set Operations",
];

/* Shared hidden setup: conference registration desk, two years. */
const CONF_SCHEMA = `CREATE TABLE attendees_2024 (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  track TEXT NOT NULL
);
INSERT INTO attendees_2024 (name, company, track) VALUES
('Ada Chen', 'Nimbus Labs', 'ml'),
('Ben Okafor', 'Nimbus Labs', 'web'),
('Cara Diaz', 'Quanta Systems', 'ml'),
('Dmitri Volkov', 'Quanta Systems', 'security'),
('Ewa Nowak', 'Helios Data', 'web'),
('Farid Aziz', 'Helios Data', 'ml'),
('Gita Rao', 'Vertex Cloud', 'security'),
('Hugo Lind', 'Nimbus Labs', 'web'),
('Ivy Tan', 'Vertex Cloud', 'ml'),
('Jon Park', 'Quanta Systems', 'web');

CREATE TABLE attendees_2025 (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  track TEXT NOT NULL
);
INSERT INTO attendees_2025 (name, company, track) VALUES
('Ben Okafor', 'Nimbus Labs', 'web'),
('Ada Chen', 'Nimbus Labs', 'ml'),
('Kira Mora', 'Quanta Systems', 'security'),
('Leif Holm', 'Helios Data', 'ml'),
('Mona Sharif', 'Vertex Cloud', 'web'),
('Nina Petrova', 'Quanta Systems', 'ml'),
('Omar Diallo', 'Nimbus Labs', 'security'),
('Pia Sorensen', 'Helios Data', 'web'),
('Ada Chen', 'Nimbus Labs', 'ml'),
('Ravi Iyer', 'Vertex Cloud', 'security');`;

const RULES_SET_OPS =
  "Rules:\n- SQLite dialect. The schema and its data are pre-seeded automatically — do not include CREATE TABLE or INSERT statements in your answer.\n- Column names and order must match exactly — the headers come from the FIRST select, so alias them there.\n- Row order must match exactly (use ORDER BY on the compound result as specified).";

const SCHEMA_NOTE_CONF =
  "Schema:\n- attendees_2024(id INTEGER PRIMARY KEY, name TEXT, company TEXT, track TEXT)\n- attendees_2025(id INTEGER PRIMARY KEY, name TEXT, company TEXT, track TEXT)\n\nTen registrations are seeded per year with identical column shapes. Ada Chen and Ben Okafor attended both years; Ada Chen is also entered twice inside attendees_2025 (an accidental duplicate). Companies: Nimbus Labs, Quanta Systems, Helios Data, Vertex Cloud. Tracks: ml, web, security.";

function makeDesc(story: string, task: string): string {
  return `${story}\n\n${SCHEMA_NOTE_CONF}\n\nTask:\n${task}\n\n${RULES_SET_OPS}`;
}

const codeQuestions: SqlCodeQuestionIn[] = [
  /* ── easy · basic (6) ─────────────────────────────────────────────── */
  {
    title: "Combined Roster Deduplicated",
    description: makeDesc(
      `The desk merges both years' rosters into one list; nobody should appear twice even though several people registered in both years.`,
      `Return name, company and track from attendees_2024 UNION the same three columns from attendees_2025, ordered by name ascending, then company ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "UNION",
    headerCode: CONF_SCHEMA,
    sourcecode: "SELECT name, company, track FROM attendees_2024 UNION SELECT name, company, track FROM attendees_2025 ORDER BY name, company;",
    columns: ["name", "company", "track"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Raw Attendance Log",
    description: makeDesc(
      `The auditor wants the untouched stack: every registration row from both years, duplicates included.`,
      `Return name, company and track from attendees_2024 UNION ALL the same three columns from attendees_2025, ordered by name ascending, then company ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "UNION ALL",
    headerCode: CONF_SCHEMA,
    sourcecode: "SELECT name, company, track FROM attendees_2024 UNION ALL SELECT name, company, track FROM attendees_2025 ORDER BY name, company;",
    columns: ["name", "company", "track"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Stamped Registration Log",
    description: makeDesc(
      `For the audit trail each row is stamped with its year so the raw log stays traceable.`,
      `Return name AS attendee_name, company AS company, track AS track and '2024' AS cohort from attendees_2024 UNION ALL name, company, track and '2025' from attendees_2025, ordered by cohort ascending, then attendee_name ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "UNION ALL",
    headerCode: CONF_SCHEMA,
    sourcecode: "SELECT name AS attendee_name, company AS company, track AS track, '2024' AS cohort FROM attendees_2024 UNION ALL SELECT name, company, track, '2025' FROM attendees_2025 ORDER BY cohort, attendee_name;",
    columns: ["attendee_name", "company", "track", "cohort"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Returning Attendees",
    description: makeDesc(
      `INTERSECT drill: who registered in both years? The duplicate inside 2025 must not inflate the result.`,
      `Return name, company and track from attendees_2024 INTERSECT name, company and track from attendees_2025, ordered by name ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "INTERSECT",
    headerCode: CONF_SCHEMA,
    sourcecode: "SELECT name, company, track FROM attendees_2024 INTERSECT SELECT name, company, track FROM attendees_2025 ORDER BY name;",
    columns: ["name", "company", "track"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "New Faces In 2025",
    description: makeDesc(
      `EXCEPT drill: attendees who registered in 2025 but never in 2024.`,
      `Return name, company and track from attendees_2025 EXCEPT name, company and track from attendees_2024, ordered by name ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "EXCEPT and MINUS",
    headerCode: CONF_SCHEMA,
    sourcecode: "SELECT name, company, track FROM attendees_2025 EXCEPT SELECT name, company, track FROM attendees_2024 ORDER BY name;",
    columns: ["name", "company", "track"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Swapped Column Stack",
    description: makeDesc(
      `Set operations align columns by POSITION, not by name. Stack both years with company first and name second and watch the headers follow the first select.`,
      `Return company AS company and name AS attendee_name from attendees_2024 UNION ALL company and name from attendees_2025, ordered by company ascending, then attendee_name ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Column Alignment in Set Operations",
    headerCode: CONF_SCHEMA,
    sourcecode: "SELECT company AS company, name AS attendee_name FROM attendees_2024 UNION ALL SELECT company, name FROM attendees_2025 ORDER BY company, attendee_name;",
    columns: ["company", "attendee_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── easy · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Conference Mailing List",
    description: makeDesc(
      `The desk prints a combined mailing list for both years — one line per unique attendee, deduplicated.`,
      `Return name AS attendee_name, company AS employer and track AS track from attendees_2024 UNION the same three columns from attendees_2025, ordered by employer ascending, then attendee_name ascending.`
    ),
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "UNION",
    headerCode: CONF_SCHEMA,
    sourcecode: "SELECT name AS attendee_name, company AS employer, track AS track FROM attendees_2024 UNION SELECT name, company, track FROM attendees_2025 ORDER BY employer, attendee_name;",
    columns: ["attendee_name", "employer", "track"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Loyalty Badge List",
    description: makeDesc(
      `Loyalty badges go to attendees whose (name, company, track) appears in both registration years.`,
      `Return name AS attendee_name, company AS company and track AS track from attendees_2024 INTERSECT name, company and track from attendees_2025, ordered by company ascending, then attendee_name ascending.`
    ),
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "INTERSECT",
    headerCode: CONF_SCHEMA,
    sourcecode: "SELECT name AS attendee_name, company AS company, track AS track FROM attendees_2024 INTERSECT SELECT name, company, track FROM attendees_2025 ORDER BY company, attendee_name;",
    columns: ["attendee_name", "company", "track"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Win Back Last Years Crowd",
    description: makeDesc(
      `Marketing wants to win back 2024 attendees who did not come back in 2025.`,
      `Return name AS attendee_name, company AS company and track AS track from attendees_2024 EXCEPT name, company and track from attendees_2025, ordered by attendee_name ascending.`
    ),
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "EXCEPT and MINUS",
    headerCode: CONF_SCHEMA,
    sourcecode: "SELECT name AS attendee_name, company AS company, track AS track FROM attendees_2024 EXCEPT SELECT name, company, track FROM attendees_2025 ORDER BY attendee_name;",
    columns: ["attendee_name", "company", "track"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Track Manifest By Attendee",
    description: makeDesc(
      `The badge printer needs a two-column manifest (attendee, track) stacked across both years — the column count and order must match in both selects.`,
      `Return name AS attendee and track AS track from attendees_2024 UNION ALL name and track from attendees_2025, ordered by attendee ascending.`
    ),
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Column Alignment in Set Operations",
    headerCode: CONF_SCHEMA,
    sourcecode: "SELECT name AS attendee, track AS track FROM attendees_2024 UNION ALL SELECT name, track FROM attendees_2025 ORDER BY attendee;",
    columns: ["attendee", "track"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── medium · scenario (6) ────────────────────────────────────────── */
  {
    title: "Company Track Combos",
    description: makeDesc(
      `The program committee lists every distinct (company, track) combination ever registered — duplicates across and inside years collapse.`,
      `Return company and track from attendees_2024 UNION company and track from attendees_2025, ordered by company ascending, then track ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "UNION",
    headerCode: CONF_SCHEMA,
    sourcecode: "SELECT company, track FROM attendees_2024 UNION SELECT company, track FROM attendees_2025 ORDER BY company, track;",
    columns: ["company", "track"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "UNION ALL, DISTINCT", whitelist: "UNION",
  },
  {
    title: "Track Tallies By Year",
    description: makeDesc(
      `Two per-year tallies, stacked: registrations per track for 2024 followed by 2025. DISTINCT is forbidden — the raw stacked rows must survive.`,
      `Return '2024' AS cohort, track and COUNT(*) AS registrations from attendees_2024 GROUP BY track UNION ALL '2025', track and COUNT(*) from attendees_2025 GROUP BY track, ordered by cohort ascending, then track ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "UNION ALL",
    headerCode: CONF_SCHEMA,
    sourcecode: "SELECT '2024' AS cohort, track, COUNT(*) AS registrations FROM attendees_2024 GROUP BY track UNION ALL SELECT '2025', track, COUNT(*) FROM attendees_2025 GROUP BY track ORDER BY cohort, track;",
    columns: ["cohort", "track", "registrations"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "DISTINCT", whitelist: "UNION ALL",
  },
  {
    title: "Company Track Crossover",
    description: makeDesc(
      `Which (company, track) combos drew interest in BOTH years? INTERSECT the per-year pair lists.`,
      `Return company and track from attendees_2024 INTERSECT company and track from attendees_2025, ordered by company ascending, then track ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "INTERSECT",
    headerCode: CONF_SCHEMA,
    sourcecode: "SELECT company, track FROM attendees_2024 INTERSECT SELECT company, track FROM attendees_2025 ORDER BY company, track;",
    columns: ["company", "track"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "UNION ALL, JOIN", whitelist: "INTERSECT",
  },
  {
    title: "Abandoned Track Combos",
    description: makeDesc(
      `Combos that died: (company, track) pairs registered in 2024 but never in 2025.`,
      `Return company and track from attendees_2024 EXCEPT company and track from attendees_2025, ordered by company ascending, then track ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "EXCEPT and MINUS",
    headerCode: CONF_SCHEMA,
    sourcecode: "SELECT company, track FROM attendees_2024 EXCEPT SELECT company, track FROM attendees_2025 ORDER BY company, track;",
    columns: ["company", "track"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "UNION ALL, NOT IN", whitelist: "EXCEPT",
  },
  {
    title: "Cohort Totals Comparison",
    description: makeDesc(
      `One row per year comparing raw registrations against unique attendees (COUNT DISTINCT collapses the duplicate Ada row).`,
      `Return '2024' AS cohort, COUNT(*) AS registrations and COUNT(DISTINCT name) AS unique_names from attendees_2024 UNION ALL '2025', COUNT(*) and COUNT(DISTINCT name) from attendees_2025, ordered by cohort ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Column Alignment in Set Operations",
    headerCode: CONF_SCHEMA,
    sourcecode: "SELECT '2024' AS cohort, COUNT(*) AS registrations, COUNT(DISTINCT name) AS unique_names FROM attendees_2024 UNION ALL SELECT '2025', COUNT(*), COUNT(DISTINCT name) FROM attendees_2025 ORDER BY cohort;",
    columns: ["cohort", "registrations", "unique_names"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "GROUP BY", whitelist: "UNION ALL",
  },
  {
    title: "Year Openers Ledger",
    description: makeDesc(
      `Alphabetically, who opened each year's registration list? Scalar subqueries pick each year's first name; UNION ALL stacks the two ledger rows.`,
      `Return '2024' AS cohort and (SELECT name FROM attendees_2024 ORDER BY name LIMIT 1) AS first_registration UNION ALL '2025' and (SELECT name FROM attendees_2025 ORDER BY name LIMIT 1), ordered by cohort ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Column Alignment in Set Operations",
    headerCode: CONF_SCHEMA,
    sourcecode: "SELECT '2024' AS cohort, (SELECT name FROM attendees_2024 ORDER BY name LIMIT 1) AS first_registration UNION ALL SELECT '2025', (SELECT name FROM attendees_2025 ORDER BY name LIMIT 1) ORDER BY cohort;",
    columns: ["cohort", "first_registration"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "GROUP BY", whitelist: "UNION ALL",
  },

  /* ── hard · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Cohort Tagged Master List",
    description: makeDesc(
      `The master export keeps one row per unique attendee per year — a person who attended both years appears twice, once tagged per cohort.`,
      `Return name, company, track and 2024 AS cohort_year from attendees_2024 UNION name, company, track and 2025 from attendees_2025, ordered by name ascending, then cohort_year ascending.`
    ),
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "UNION",
    headerCode: CONF_SCHEMA,
    sourcecode: "SELECT name, company, track, 2024 AS cohort_year FROM attendees_2024 UNION SELECT name, company, track, 2025 FROM attendees_2025 ORDER BY name, cohort_year;",
    columns: ["name", "company", "track", "cohort_year"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "UNION ALL", whitelist: "UNION",
  },
  {
    title: "Duplicate Attendance Audit",
    description: makeDesc(
      `The registrar hunts accidental duplicates: stack both years raw (UNION ALL) inside a derived table, then report any (name, company, track) that occurs more than once, with its occurrence count.`,
      `From (SELECT name, company, track FROM attendees_2024 UNION ALL SELECT name, company, track FROM attendees_2025) x, return name AS attendee_name, company AS company, track AS track and COUNT(*) AS times, grouped by all three, keeping only times > 1, ordered by attendee_name ascending.`
    ),
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "UNION ALL",
    headerCode: CONF_SCHEMA,
    sourcecode: "SELECT name AS attendee_name, company AS company, track AS track, COUNT(*) AS times FROM (SELECT name, company, track FROM attendees_2024 UNION ALL SELECT name, company, track FROM attendees_2025) x GROUP BY name, company, track HAVING COUNT(*) > 1 ORDER BY attendee_name;",
    columns: ["attendee_name", "company", "track", "times"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "INTERSECT", whitelist: "UNION ALL",
  },
  {
    title: "Top Companies Both Years",
    description: makeDesc(
      `Sponsor benchmarks: companies in the yearly top three by headcount in BOTH years. Branch-level ORDER BY/LIMIT is illegal in a compound select, so wrap each ranked top-3 in a FROM subquery and INTERSECT them.`,
      `Return d.company AS company FROM (SELECT company FROM attendees_2024 GROUP BY company ORDER BY COUNT(*) DESC, company LIMIT 3) d INTERSECT SELECT e.company FROM (SELECT company FROM attendees_2025 GROUP BY company ORDER BY COUNT(*) DESC, company LIMIT 3) e, ordered by company ascending.`
    ),
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "INTERSECT",
    headerCode: CONF_SCHEMA,
    sourcecode: "SELECT d.company AS company FROM (SELECT company FROM attendees_2024 GROUP BY company ORDER BY COUNT(*) DESC, company LIMIT 3) d INTERSECT SELECT e.company FROM (SELECT company FROM attendees_2025 GROUP BY company ORDER BY COUNT(*) DESC, company LIMIT 3) e ORDER BY company;",
    columns: ["company"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "JOIN", whitelist: "INTERSECT",
  },
  {
    title: "One Year Wonders",
    description: makeDesc(
      `The full churn report: everyone exclusive to exactly one year, labelled '2024 only' or '2025 only'. Two EXCEPT branches (wrapped in derived tables) are stacked with UNION ALL.`,
      `Return t.name AS attendee_name, t.company AS company, t.track AS track and '2024 only' AS found_in FROM (SELECT name, company, track FROM attendees_2024 EXCEPT SELECT name, company, track FROM attendees_2025) t UNION ALL t.name, t.company, t.track and '2025 only' FROM (SELECT name, company, track FROM attendees_2025 EXCEPT SELECT name, company, track FROM attendees_2024) t, ordered by attendee_name ascending, then found_in ascending.`
    ),
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "EXCEPT and MINUS",
    headerCode: CONF_SCHEMA,
    sourcecode: "SELECT t.name AS attendee_name, t.company AS company, t.track AS track, '2024 only' AS found_in FROM (SELECT name, company, track FROM attendees_2024 EXCEPT SELECT name, company, track FROM attendees_2025) t UNION ALL SELECT t.name, t.company, t.track, '2025 only' FROM (SELECT name, company, track FROM attendees_2025 EXCEPT SELECT name, company, track FROM attendees_2024) t ORDER BY attendee_name, found_in;",
    columns: ["attendee_name", "company", "track", "found_in"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "INTERSECT", whitelist: "EXCEPT",
  },
];

/* ── MCQs (20: 10 easy / 6 medium / 4 hard; 7 snippets; 5/5/5/5 spread) ── */
const mcqs: SqlMcqQuestionIn[] = [
  { title: "UNION Dedupes", description: "Compared to stacking two tables' rows, what does UNION do?", difficulty: "easy", topic: TOPIC, subtopic: "UNION",
    Option1: "Removes duplicate rows", Option2: "Keeps every row", Option3: "Sorts each table separately", Option4: "Only works on identical tables", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "UNION ALL Keeps Everything", description: "What does UNION ALL guarantee?", difficulty: "easy", topic: TOPIC, subtopic: "UNION ALL",
    Option1: "It removes duplicates", Option2: "It keeps every row from both selects, duplicates included", Option3: "It requires sorted inputs", Option4: "It merges columns side by side", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Column Count Rule", description: "Compound SELECTs (UNION/INTERSECT/EXCEPT) require that each branch:", difficulty: "easy", topic: TOPIC, subtopic: "Column Alignment in Set Operations",
    Option1: "Uses the same table names", Option2: "Has the same number of columns, aligned positionally", Option3: "Has identical column names", Option4: "Returns the same number of rows", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Headers Come From The First Select", description: "In A UNION B, where do the result column headers come from?", difficulty: "easy", topic: TOPIC, subtopic: "Column Alignment in Set Operations",
    Option1: "The first SELECT", Option2: "The last SELECT", Option3: "A merge of both branches", Option4: "The widest table involved", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "INTERSECT Result Snippet", description: "What does this query return?", difficulty: "easy", topic: TOPIC, subtopic: "INTERSECT",
    Option1: "Names only in 2024", Option2: "Names registered in both years", Option3: "All names from both years", Option4: "Names only in 2025", CorrectOption: 2, iscodesnippet: true, codesnippet: "SELECT name FROM attendees_2024\nINTERSECT\nSELECT name FROM attendees_2025;", snippetLang: "sql" },
  { title: "EXCEPT Result Snippet", description: "What does this query return?", difficulty: "easy", topic: TOPIC, subtopic: "EXCEPT and MINUS",
    Option1: "Rows found in both A and B", Option2: "Rows in B that are not in A", Option3: "The symmetric difference", Option4: "Rows in A that are not in B", CorrectOption: 4, iscodesnippet: true, codesnippet: "SELECT name FROM attendees_2024\nEXCEPT\nSELECT name FROM attendees_2025;", snippetLang: "sql" },
  { title: "ORDER BY Placement", description: "In 'A UNION B ORDER BY x', the ORDER BY clause:", difficulty: "easy", topic: TOPIC, subtopic: "UNION",
    Option1: "Sorts only branch B", Option2: "Is invalid after a compound select", Option3: "Sorts the combined result of the whole compound", Option4: "Sorts only branch A", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "UNION NULL Handling", description: "Two rows have NULL in the same column. How does UNION treat them when deduplicating?", difficulty: "easy", topic: TOPIC, subtopic: "UNION",
    Option1: "NULLs are treated as equal, so the rows dedupe", Option2: "NULL rows are dropped", Option3: "NULL causes an error", Option4: "Each NULL is unique and both rows are kept", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Compound Alias Sorting", description: "Which statement about ORDER BY in a compound select is TRUE?", difficulty: "easy", topic: TOPIC, subtopic: "Column Alignment in Set Operations",
    Option1: "It must use literal numbers only", Option2: "It must repeat inside every branch", Option3: "It is applied before the set operation", Option4: "It must use column names/aliases from the first SELECT's output", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Track Count Sanity", description: "attendees_2024 has 10 rows, attendees_2025 has 10 rows, with 2 shared (name, company, track) triples and 1 duplicate inside 2025. How many rows does the UNION of the three columns return?", difficulty: "easy", topic: TOPIC, subtopic: "UNION",
    Option1: "20", Option2: "17", Option3: "18", Option4: "16", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },

  { title: "UNION Cost", description: "Why can UNION ALL be faster than UNION?", difficulty: "medium", topic: TOPIC, subtopic: "UNION ALL",
    Option1: "It automatically uses indexes", Option2: "It parallelizes the branches", Option3: "It skips the deduplication step", Option4: "It caches the result", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "EXCEPT Alias", description: "Which other SQL dialect keyword is equivalent to SQLite's EXCEPT?", difficulty: "medium", topic: TOPIC, subtopic: "EXCEPT and MINUS",
    Option1: "SUBTRACT", Option2: "DIFFERENCE", Option3: "REMOVE", Option4: "MINUS", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Compound Alias Snippet", description: "Is the ORDER BY in this query valid SQLite?", difficulty: "medium", topic: TOPIC, subtopic: "Column Alignment in Set Operations",
    Option1: "No — it must say ORDER BY name", Option2: "No — compound queries cannot be sorted", Option3: "Yes — it refers to the first SELECT's output column", Option4: "Only with an explicit ASC", CorrectOption: 3, iscodesnippet: true, codesnippet: "SELECT name AS attendee FROM attendees_2024\nUNION\nSELECT name FROM attendees_2025\nORDER BY attendee;", snippetLang: "sql" },
  { title: "Mismatched Column Count Snippet", description: "What happens when this compound SELECT runs?", difficulty: "medium", topic: TOPIC, subtopic: "Column Alignment in Set Operations",
    Option1: "It errors — both branches of a set operation must return the same number of columns", Option2: "It succeeds — the missing column is filled with NULL", Option3: "It succeeds — SQLite returns only the first column of each row", Option4: "It succeeds — SQLite matches the columns by name", CorrectOption: 1, iscodesnippet: true, codesnippet: "SELECT name, company FROM attendees_2024\nUNION ALL\nSELECT name FROM attendees_2025;", snippetLang: "sql" },
  { title: "Positional Alignment Snippet", description: "What does this INTERSECT actually compare?", difficulty: "medium", topic: TOPIC, subtopic: "Column Alignment in Set Operations",
    Option1: "It matches columns positionally, so first-column values are compared with each other regardless of the names", Option2: "It matches columns by name, so it swaps automatically", Option3: "It joins the two tables on names", Option4: "It returns companies only", CorrectOption: 1, iscodesnippet: true, codesnippet: "SELECT name, company FROM attendees_2024\nINTERSECT\nSELECT company, name FROM attendees_2025;", snippetLang: "sql" },
  { title: "UNION Dedup Scope", description: "UNION removes duplicate rows based on:", difficulty: "medium", topic: TOPIC, subtopic: "UNION",
    Option1: "The primary key", Option2: "The first column only", Option3: "The table of origin", Option4: "All output columns of the row", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },

  { title: "Chained Set Op Precedence", description: "In 'A EXCEPT B UNION C', how does SQLite evaluate the operators?", difficulty: "hard", topic: TOPIC, subtopic: "EXCEPT and MINUS",
    Option1: "B UNION C first", Option2: "Right to left", Option3: "INTERSECT binds tighter; UNION and EXCEPT are then evaluated left to right", Option4: "In random order", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Per Branch Limit Trick", description: "How many rows does this query return?", difficulty: "hard", topic: TOPIC, subtopic: "UNION ALL",
    Option1: "3", Option2: "6", Option3: "12", Option4: "A syntax error — LIMIT is illegal here", CorrectOption: 2, iscodesnippet: true, codesnippet: "SELECT name FROM (SELECT name, company\n  FROM attendees_2024 LIMIT 3)\nUNION ALL\nSELECT name FROM (SELECT name, company\n  FROM attendees_2025 LIMIT 3);", snippetLang: "sql" },
  { title: "INTERSECT With NULLs", description: "Both branches return a row with company = NULL (other columns equal). What does INTERSECT do?", difficulty: "hard", topic: TOPIC, subtopic: "INTERSECT",
    Option1: "Drops the NULL rows", Option2: "Matches them — in set operations NULLs compare as equal", Option3: "Raises an error", Option4: "Returns one NULL row per branch", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Literal Header Snippet", description: "What are the column headers of this compound result?", difficulty: "hard", topic: TOPIC, subtopic: "Column Alignment in Set Operations",
    Option1: "'2024' and '2025'", Option2: "year and total", Option3: "An error — literals cannot be selected", Option4: "cohort and COUNT(*)", CorrectOption: 4, iscodesnippet: true, codesnippet: "SELECT '2024' AS cohort, COUNT(*)\nFROM attendees_2024\nUNION ALL\nSELECT '2025', COUNT(*)\nFROM attendees_2025;", snippetLang: "sql" },
];

await buildDay({ day: DAY, topic: TOPIC, subtopics: SUBTOPICS, codeQuestions, mcqs });
