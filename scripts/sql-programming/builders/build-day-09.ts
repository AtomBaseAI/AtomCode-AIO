/**
 * Day 9 — "GROUP BY and HAVING" — question builder.
 *
 * Domain: a university club membership ledger (memberships table) —
 * GROUP BY single/multiple columns, HAVING vs WHERE, COUNT/SUM/AVG per
 * group, GROUP BY with ORDER BY. SQLite has no GROUPING SETS/CUBE/ROLLUP,
 * so those appear in MCQ theory only.
 *
 * Run from /home/z/my-project:
 *   bun scripts/sql-programming/builders/build-day-09.ts
 */
import { buildDay, type SqlCodeQuestionIn, type SqlMcqQuestionIn } from "../lib.ts";

const DAY = 9;
const TOPIC = "GROUP BY and HAVING";
const SUBTOPICS = [
  "GROUP BY Columns",
  "HAVING Clause",
  "WHERE vs HAVING",
  "Multiple Column Grouping",
  "GROUPING SETS",
];

/* Shared hidden setup: a university club membership ledger. */
const CLUB_SCHEMA = `CREATE TABLE memberships (
  id INTEGER PRIMARY KEY,
  club TEXT NOT NULL,
  faculty TEXT NOT NULL,
  member_name TEXT NOT NULL,
  joined_year INTEGER NOT NULL,
  active INTEGER NOT NULL DEFAULT 1
);
INSERT INTO memberships (club, faculty, member_name, joined_year, active) VALUES
('Robotics', 'Engineering', 'Ada Lin', 2021, 1),
('Robotics', 'Science', 'Raj Patel', 2022, 1),
('Robotics', 'Engineering', 'Mia Chen', 2022, 0),
('Chess', 'Arts', 'Zoe Adler', 2021, 1),
('Chess', 'Science', 'Omar Kaz', 2023, 1),
('Chess', 'Arts', 'Lena Brandt', 2023, 0),
('Debate', 'Arts', 'Tom Reyes', 2020, 1),
('Debate', 'Law', 'Ines Duarte', 2021, 1),
('Debate', 'Law', 'Kai Novak', 2022, 1),
('Photography', 'Arts', 'Sao Ruiz', 2022, 0),
('Photography', 'Engineering', 'Eli Moreau', 2023, 1),
('Photography', 'Arts', 'Nia Okafor', 2023, 1),
('Hiking', 'Science', 'Ana Silva', 2020, 1),
('Hiking', 'Science', 'Leo Marsh', 2021, 1),
('Drama', 'Arts', 'Ivy Chen', 2021, 1),
('Drama', 'Law', 'Sam Ortiz', 2020, 0);`;

const RULES_GROUP =
  "Rules:\n- SQLite dialect. The schema and its data are pre-seeded automatically — do not include CREATE TABLE or INSERT statements in your answer.\n- Column names and order must match exactly (alias every output column).\n- Row order must match exactly (use ORDER BY as specified).";

const SCHEMA_NOTE_CLUB =
  "Schema:\n- memberships(id INTEGER PRIMARY KEY, club TEXT, faculty TEXT, member_name TEXT, joined_year INTEGER, active INTEGER 1/0)\n\nSixteen memberships are seeded across six clubs (Robotics, Chess, Debate, Photography, Hiking, Drama). Joining years repeat heavily (2020-2023), club sizes tie (four clubs have three members), and four members are inactive (active = 0).";

const codeQuestions: SqlCodeQuestionIn[] = [
  /* ── easy · basic (6) ─────────────────────────────────────────────── */
  {
    title: "Count Members Per Club",
    description: `The student-affairs office wants the membership headcount for every club.\n\n${SCHEMA_NOTE_CLUB}\n\nTask:\nReturn club and COUNT(*) as member_count, grouped by club, ordered by club ascending.\n\n${RULES_GROUP}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "GROUP BY Columns",
    headerCode: CLUB_SCHEMA,
    sourcecode: "SELECT club AS club, COUNT(*) AS member_count FROM memberships GROUP BY club ORDER BY club;",
    columns: ["club", "member_count"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Members Per Join Year",
    description: `Practice grouping by a numeric column: how many members joined in each year?\n\n${SCHEMA_NOTE_CLUB}\n\nTask:\nReturn joined_year as join_year and COUNT(*) as signups, grouped by joined_year, ordered by joined_year ascending.\n\n${RULES_GROUP}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "GROUP BY Columns",
    headerCode: CLUB_SCHEMA,
    sourcecode: "SELECT joined_year AS join_year, COUNT(*) AS signups FROM memberships GROUP BY joined_year ORDER BY joined_year;",
    columns: ["join_year", "signups"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Active Members Per Club",
    description: `Count only currently active members (active = 1) per club — the row filter belongs in WHERE, before grouping.\n\n${SCHEMA_NOTE_CLUB}\n\nTask:\nReturn club and COUNT(*) as active_members for rows with active = 1, grouped by club, ordered by club ascending.\n\n${RULES_GROUP}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "WHERE vs HAVING",
    headerCode: CLUB_SCHEMA,
    sourcecode: "SELECT club AS club, COUNT(*) AS active_members FROM memberships WHERE active = 1 GROUP BY club ORDER BY club;",
    columns: ["club", "active_members"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Clubs With More Than Two Members",
    description: `Practice HAVING: keep only the groups whose aggregate passes a threshold.\n\n${SCHEMA_NOTE_CLUB}\n\nTask:\nReturn club and COUNT(*) as member_count grouped by club, keeping only groups with COUNT(*) > 2, ordered by club ascending.\n\n${RULES_GROUP}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "HAVING Clause",
    headerCode: CLUB_SCHEMA,
    sourcecode: "SELECT club AS club, COUNT(*) AS member_count FROM memberships GROUP BY club HAVING COUNT(*) > 2 ORDER BY club;",
    columns: ["club", "member_count"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Average Join Year Per Club",
    description: `How fresh is each club? Average the joining years per club.\n\n${SCHEMA_NOTE_CLUB}\n\nTask:\nReturn club and ROUND(AVG(joined_year), 2) as avg_join_year, grouped by club, ordered by club ascending.\n\n${RULES_GROUP}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "GROUP BY Columns",
    headerCode: CLUB_SCHEMA,
    sourcecode: "SELECT club AS club, ROUND(AVG(joined_year), 2) AS avg_join_year FROM memberships GROUP BY club ORDER BY club;",
    columns: ["club", "avg_join_year"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Faculty Headcount Ledger",
    description: `The dean's office counts members per faculty instead of per club.\n\n${SCHEMA_NOTE_CLUB}\n\nTask:\nReturn faculty and COUNT(*) as member_count, grouped by faculty, ordered by faculty ascending.\n\n${RULES_GROUP}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "GROUP BY Columns",
    headerCode: CLUB_SCHEMA,
    sourcecode: "SELECT faculty AS faculty, COUNT(*) AS member_count FROM memberships GROUP BY faculty ORDER BY faculty;",
    columns: ["faculty", "member_count"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── easy · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Club Faculty Breakdown",
    description: `The provost's report breaks every club down by faculty: one line per club-and-faculty combination with its size.\n\n${SCHEMA_NOTE_CLUB}\n\nTask:\nReturn club, faculty and COUNT(*) as pair_size, grouped by club and faculty, ordered by club ascending then faculty ascending.\n\n${RULES_GROUP}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Multiple Column Grouping",
    headerCode: CLUB_SCHEMA,
    sourcecode: "SELECT club AS club, faculty AS faculty, COUNT(*) AS pair_size FROM memberships GROUP BY club, faculty ORDER BY club, faculty;",
    columns: ["club", "faculty", "pair_size"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Inactive Roll By Club",
    description: `Club presidents receive the count of lapsed (active = 0) memberships per club.\n\n${SCHEMA_NOTE_CLUB}\n\nTask:\nReturn club and COUNT(*) as inactive_members for rows with active = 0, grouped by club, ordered by club ascending.\n\n${RULES_GROUP}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "WHERE vs HAVING",
    headerCode: CLUB_SCHEMA,
    sourcecode: "SELECT club AS club, COUNT(*) AS inactive_members FROM memberships WHERE active = 0 GROUP BY club ORDER BY club;",
    columns: ["club", "inactive_members"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Average Year By Faculty",
    description: `The recruitment team compares how recent each faculty's joiners are.\n\n${SCHEMA_NOTE_CLUB}\n\nTask:\nReturn faculty and ROUND(AVG(joined_year), 2) as avg_join_year, grouped by faculty, ordered by faculty ascending.\n\n${RULES_GROUP}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "GROUP BY Columns",
    headerCode: CLUB_SCHEMA,
    sourcecode: "SELECT faculty AS faculty, ROUND(AVG(joined_year), 2) AS avg_join_year FROM memberships GROUP BY faculty ORDER BY faculty;",
    columns: ["faculty", "avg_join_year"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Sign-Ups By Club And Year",
    description: `The timeline view counts sign-ups per club per joining year.\n\n${SCHEMA_NOTE_CLUB}\n\nTask:\nReturn club, joined_year as join_year and COUNT(*) as signups, grouped by club and joined_year, ordered by club ascending then join_year ascending.\n\n${RULES_GROUP}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Multiple Column Grouping",
    headerCode: CLUB_SCHEMA,
    sourcecode: "SELECT club AS club, joined_year AS join_year, COUNT(*) AS signups FROM memberships GROUP BY club, joined_year ORDER BY club, join_year;",
    columns: ["club", "join_year", "signups"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── medium · scenario (6) ────────────────────────────────────────── */
  {
    title: "Years That Overdelivered",
    description: `The recruitment retro highlights joining years that brought MORE than three sign-ups across all clubs — an aggregate-only condition, so it belongs in HAVING.\n\n${SCHEMA_NOTE_CLUB}\n\nTask:\nReturn joined_year as join_year and COUNT(*) as signups, grouped by joined_year, keeping groups with COUNT(*) > 3, ordered by join_year ascending.\n\n${RULES_GROUP}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "HAVING Clause",
    headerCode: CLUB_SCHEMA,
    sourcecode: "SELECT joined_year AS join_year, COUNT(*) AS signups FROM memberships GROUP BY joined_year HAVING COUNT(*) > 3 ORDER BY join_year;",
    columns: ["join_year", "signups"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "WHERE", whitelist: "HAVING",
  },
  {
    title: "Engineering Clubs With Pairs",
    description: `Which clubs enrolled at least TWO Engineering members? Filter the rows to Engineering in WHERE, then test the group size in HAVING.\n\n${SCHEMA_NOTE_CLUB}\n\nTask:\nReturn club and COUNT(*) as engineering_members for rows with faculty = 'Engineering', grouped by club, keeping groups with COUNT(*) >= 2, ordered by club ascending.\n\n${RULES_GROUP}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "WHERE vs HAVING",
    headerCode: CLUB_SCHEMA,
    sourcecode: "SELECT club AS club, COUNT(*) AS engineering_members FROM memberships WHERE faculty = 'Engineering' GROUP BY club HAVING COUNT(*) >= 2 ORDER BY club;",
    columns: ["club", "engineering_members"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "LIMIT", whitelist: "HAVING",
  },
  {
    title: "Club Faculty Pairs Counted",
    description: `Only club-and-faculty pairs with two or more members make the consolidation report.\n\n${SCHEMA_NOTE_CLUB}\n\nTask:\nReturn club, faculty and COUNT(*) as pair_size, grouped by club and faculty, keeping groups with COUNT(*) >= 2, ordered by club ascending then faculty ascending.\n\n${RULES_GROUP}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Multiple Column Grouping",
    headerCode: CLUB_SCHEMA,
    sourcecode: "SELECT club AS club, faculty AS faculty, COUNT(*) AS pair_size FROM memberships GROUP BY club, faculty HAVING COUNT(*) >= 2 ORDER BY club, faculty;",
    columns: ["club", "faculty", "pair_size"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "DISTINCT", whitelist: "HAVING, GROUP BY",
  },
  {
    title: "Clubs Averaging Recent Sign-Ups",
    description: `Clubs whose members joined on average in 2022 or later are flagged for a growth award — test the per-group average in HAVING.\n\n${SCHEMA_NOTE_CLUB}\n\nTask:\nReturn club and ROUND(AVG(joined_year), 2) as avg_join_year, grouped by club, keeping groups with AVG(joined_year) >= 2022, ordered by club ascending.\n\n${RULES_GROUP}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "HAVING Clause",
    headerCode: CLUB_SCHEMA,
    sourcecode: "SELECT club AS club, ROUND(AVG(joined_year), 2) AS avg_join_year FROM memberships GROUP BY club HAVING AVG(joined_year) >= 2022 ORDER BY club;",
    columns: ["club", "avg_join_year"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "WHERE", whitelist: "HAVING, AVG",
  },
  {
    title: "Engineering Footprint By Club",
    description: `A plain grouped report: how many Engineering members does each club have? The faculty filter is row-level, so WHERE does the work — no HAVING needed here.\n\n${SCHEMA_NOTE_CLUB}\n\nTask:\nReturn club and COUNT(*) as engineering_members for rows with faculty = 'Engineering', grouped by club, ordered by club ascending.\n\n${RULES_GROUP}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "WHERE vs HAVING",
    headerCode: CLUB_SCHEMA,
    sourcecode: "SELECT club AS club, COUNT(*) AS engineering_members FROM memberships WHERE faculty = 'Engineering' GROUP BY club ORDER BY club;",
    columns: ["club", "engineering_members"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "HAVING", whitelist: "GROUP BY",
  },
  {
    title: "Club Size Leaderboard",
    description: `The activities fair banner lists clubs largest-first; equal sizes are alphabetical.\n\n${SCHEMA_NOTE_CLUB}\n\nTask:\nReturn club and COUNT(*) as member_count, grouped by club, ordered by member_count descending then club ascending.\n\n${RULES_GROUP}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "GROUP BY Columns",
    headerCode: CLUB_SCHEMA,
    sourcecode: "SELECT club AS club, COUNT(*) AS member_count FROM memberships GROUP BY club ORDER BY COUNT(*) DESC, club ASC;",
    columns: ["club", "member_count"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "LIMIT", whitelist: "GROUP BY",
  },

  /* ── hard · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Clubs Spanning Faculties",
    description: `The diversity award goes to every club that draws members from TWO OR MORE distinct faculties. Compute the spread per group with COUNT(DISTINCT faculty) inside HAVING.\n\n${SCHEMA_NOTE_CLUB}\n\nTask:\nReturn club and COUNT(DISTINCT faculty) as faculty_spread, grouped by club, keeping groups with COUNT(DISTINCT faculty) >= 2, ordered by club ascending.\n\n${RULES_GROUP}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "HAVING Clause",
    headerCode: CLUB_SCHEMA,
    sourcecode: "SELECT club AS club, COUNT(DISTINCT faculty) AS faculty_spread FROM memberships GROUP BY club HAVING COUNT(DISTINCT faculty) >= 2 ORDER BY club;",
    columns: ["club", "faculty_spread"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "WHERE", whitelist: "HAVING, COUNT(DISTINCT",
  },
  {
    title: "Selective Recruitment Report",
    description: `The recruitment report counts members who joined in 2021 or later AND are still active, per club — and only clubs that kept at least two such members. Row filter in WHERE, group filter in HAVING.\n\n${SCHEMA_NOTE_CLUB}\n\nTask:\nReturn club and COUNT(*) as retained_members for rows with joined_year >= 2021 AND active = 1, grouped by club, keeping groups with COUNT(*) >= 2, ordered by club ascending.\n\n${RULES_GROUP}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "WHERE vs HAVING",
    headerCode: CLUB_SCHEMA,
    sourcecode: "SELECT club AS club, COUNT(*) AS retained_members FROM memberships WHERE joined_year >= 2021 AND active = 1 GROUP BY club HAVING COUNT(*) >= 2 ORDER BY club;",
    columns: ["club", "retained_members"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "LIMIT", whitelist: "HAVING, WHERE",
  },
  {
    title: "Faculty Pairs Running Strong",
    description: `Which club-and-faculty pairs still have two or more ACTIVE members? Filter rows to active = 1, group by both columns, then apply the aggregate condition.\n\n${SCHEMA_NOTE_CLUB}\n\nTask:\nReturn club, faculty and COUNT(*) as active_members for rows with active = 1, grouped by club and faculty, keeping groups with COUNT(*) >= 2, ordered by club ascending then faculty ascending.\n\n${RULES_GROUP}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Multiple Column Grouping",
    headerCode: CLUB_SCHEMA,
    sourcecode: "SELECT club AS club, faculty AS faculty, COUNT(*) AS active_members FROM memberships WHERE active = 1 GROUP BY club, faculty HAVING COUNT(*) >= 2 ORDER BY club, faculty;",
    columns: ["club", "faculty", "active_members"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "DISTINCT", whitelist: "HAVING",
  },
  {
    title: "Recency Leaders",
    description: `The growth board lists clubs that are both sizable (at least 2 members) AND young on average (average join year after 2021.5) — two aggregate conditions combined in HAVING.\n\n${SCHEMA_NOTE_CLUB}\n\nTask:\nReturn club, ROUND(AVG(joined_year), 2) as avg_join_year and COUNT(*) as member_count, grouped by club, keeping groups with AVG(joined_year) > 2021.5 AND COUNT(*) >= 2, ordered by club ascending.\n\n${RULES_GROUP}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "HAVING Clause",
    headerCode: CLUB_SCHEMA,
    sourcecode: "SELECT club AS club, ROUND(AVG(joined_year), 2) AS avg_join_year, COUNT(*) AS member_count FROM memberships GROUP BY club HAVING AVG(joined_year) > 2021.5 AND COUNT(*) >= 2 ORDER BY club;",
    columns: ["club", "avg_join_year", "member_count"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "WHERE", whitelist: "HAVING, AVG",
  },
];

/* ── MCQs (20: 10 easy / 6 medium / 4 hard; 6 snippets; 5/5/5/5 spread) ── */
const mcqs: SqlMcqQuestionIn[] = [
  { title: "GROUP BY Effect", description: "What does adding GROUP BY club to a query with COUNT(*) do?", difficulty: "easy", topic: TOPIC, subtopic: "GROUP BY Columns",
    Option1: "Sorts the rows by club", Option2: "Deletes duplicate rows from the table", Option3: "Collapses rows into groups so the count computes per group", Option4: "Joins the memberships table to itself", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "COUNT Inside Groups", description: "With GROUP BY club, what does COUNT(*) mean on each output row?", difficulty: "easy", topic: TOPIC, subtopic: "GROUP BY Columns",
    Option1: "The number of rows in that club's group", Option2: "The sum of ids in the group", Option3: "The total row count of the table repeated on every row", Option4: "The number of clubs in the table", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "HAVING Filters Groups", description: "In this snippet, what does the HAVING clause filter?", difficulty: "easy", topic: TOPIC, subtopic: "HAVING Clause",
    Option1: "Individual rows before grouping", Option2: "Groups after the counts are computed", Option3: "Columns of the result", Option4: "The join condition", CorrectOption: 2, iscodesnippet: true, codesnippet: "SELECT club, COUNT(*) FROM memberships\nGROUP BY club\nHAVING COUNT(*) > 2;", snippetLang: "sql" },
  { title: "WHERE Filters Rows", description: "What does WHERE do in a grouped query?", difficulty: "easy", topic: TOPIC, subtopic: "WHERE vs HAVING",
    Option1: "Filters groups after aggregation", Option2: "Filters the SELECT list", Option3: "Nothing — WHERE is illegal here", Option4: "Filters individual rows before any grouping happens", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Ungrouped Columns Rule", description: "In a grouped query, non-aggregated columns in the SELECT list should…", difficulty: "easy", topic: TOPIC, subtopic: "GROUP BY Columns",
    Option1: "Appear freely without restriction", Option2: "Appear in the GROUP BY list or be wrapped in an aggregate", Option3: "Be numeric", Option4: "Be aliased", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Two Group Keys", description: "GROUP BY club, faculty creates which granularity?", difficulty: "easy", topic: TOPIC, subtopic: "Multiple Column Grouping",
    Option1: "One row per club", Option2: "One row per faculty", Option3: "One row per unique (club, faculty) pair", Option4: "One row for the whole table", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "GROUPING SETS In SQLite", description: "What is SQLite's support for GROUPING SETS?", difficulty: "easy", topic: TOPIC, subtopic: "GROUPING SETS",
    Option1: "SQLite does not support GROUPING SETS", Option2: "Supported with an extension", Option3: "Supported only with window functions", Option4: "It is an alias for GROUP BY", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Group Row Order", description: "Without ORDER BY, in what order do GROUP BY rows come back in SQLite?", difficulty: "easy", topic: TOPIC, subtopic: "GROUP BY Columns",
    Option1: "Insertion order", Option2: "Sorted by the group key", Option3: "Largest group first", Option4: "Undefined — add ORDER BY for a stable order", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "HAVING Without GROUP BY", description: "What does HAVING mean in an aggregate query with no GROUP BY?", difficulty: "easy", topic: TOPIC, subtopic: "HAVING Clause",
    Option1: "It is a syntax error", Option2: "The whole table is treated as a single group", Option3: "It behaves exactly like WHERE", Option4: "It returns one row per column", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Aggregate In WHERE", description: "WHERE COUNT(*) > 2 (no GROUP BY trickery) — what happens in SQLite?", difficulty: "easy", topic: TOPIC, subtopic: "WHERE vs HAVING",
    Option1: "It filters rows normally", Option2: "It is allowed but slow", Option3: "It is an error — aggregates are not allowed in WHERE", Option4: "It silently becomes HAVING", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Clause Pipeline Order", description: "Which pipeline does a grouped query follow?", difficulty: "medium", topic: TOPIC, subtopic: "WHERE vs HAVING",
    Option1: "FROM then WHERE then GROUP BY then HAVING then SELECT then ORDER BY", Option2: "FROM then HAVING then WHERE then GROUP BY then SELECT then ORDER BY", Option3: "SELECT then WHERE then GROUP BY then HAVING then ORDER BY", Option4: "FROM then GROUP BY then WHERE then HAVING then ORDER BY then SELECT", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "HAVING AVG Meaning", description: "In the snippet, what does the HAVING line do?", difficulty: "medium", topic: TOPIC, subtopic: "HAVING Clause",
    Option1: "Keeps rows whose joined_year is above 2021", Option2: "Keeps only clubs whose average join year exceeds 2021", Option3: "Sorts clubs by their average join year", Option4: "Errors — AVG cannot appear in HAVING", CorrectOption: 2, iscodesnippet: true, codesnippet: "SELECT club, AVG(joined_year) FROM memberships\nGROUP BY club\nHAVING AVG(joined_year) > 2021;", snippetLang: "sql" },
  { title: "Two Key Group Shape", description: "What shape does the snippet's result have?", difficulty: "medium", topic: TOPIC, subtopic: "Multiple Column Grouping",
    Option1: "One row per club", Option2: "One row per faculty", Option3: "One row total", Option4: "One row per unique club-and-faculty combination", CorrectOption: 4, iscodesnippet: true, codesnippet: "SELECT club, faculty, COUNT(*) FROM memberships\nGROUP BY club, faculty;", snippetLang: "sql" },
  { title: "Why HAVING For Counts", description: "Why must COUNT(*) > 2 live in HAVING rather than WHERE?", difficulty: "medium", topic: TOPIC, subtopic: "HAVING Clause",
    Option1: "COUNT(*) works fine in WHERE too", Option2: "HAVING runs before rows are grouped", Option3: "Aggregate conditions are only legal after grouping — in HAVING", Option4: "HAVING is simply faster", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Where To Put The Row Filter", description: "active = 1 must be checked in a grouped query. Where does it belong?", difficulty: "medium", topic: TOPIC, subtopic: "WHERE vs HAVING",
    Option1: "In HAVING — it is the newer keyword", Option2: "In WHERE — it filters rows before grouping (cheaper and clearer)", Option3: "In ORDER BY", Option4: "Either place, with identical semantics and cost", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "GROUP BY Expression", description: "What does the snippet produce?", difficulty: "medium", topic: TOPIC, subtopic: "GROUP BY Columns",
    Option1: "One row per decade with its sign-up count", Option2: "One row per year", Option3: "An error — expressions cannot be grouped", Option4: "One row per member", CorrectOption: 1, iscodesnippet: true, codesnippet: "SELECT joined_year / 10 AS decade, COUNT(*)\nFROM memberships\nGROUP BY joined_year / 10;", snippetLang: "sql" },
  { title: "GROUPING SETS Theory", description: "In engines that support it, GROUP BY GROUPING SETS ((club), (faculty)) produces what?", difficulty: "hard", topic: TOPIC, subtopic: "GROUPING SETS",
    Option1: "One combined grouping of club and faculty together", Option2: "Only grand totals", Option3: "A syntax error in every engine", Option4: "Two row sets: totals by club alone and totals by faculty alone", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "ROLLUP Theory", description: "In engines that support it, GROUP BY ROLLUP (a, b) aggregates at which levels?", difficulty: "hard", topic: TOPIC, subtopic: "GROUPING SETS",
    Option1: "Only the (a, b) level", Option2: "Only the grand total", Option3: "Three levels: (a, b), (a), and the grand total", Option4: "Four levels including sub-subtotals", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Compound HAVING", description: "In the snippet, which clubs are listed?", difficulty: "hard", topic: TOPIC, subtopic: "HAVING Clause",
    Option1: "Clubs with two or more members, except Drama", Option2: "Clubs named Drama with two members", Option3: "All clubs", Option4: "An error — AND cannot combine conditions in HAVING", CorrectOption: 1, iscodesnippet: true, codesnippet: "SELECT club, COUNT(*) FROM memberships\nGROUP BY club\nHAVING COUNT(*) >= 2 AND club <> 'Drama';", snippetLang: "sql" },
  { title: "WHERE And HAVING Together", description: "In the snippet, when does each filter run?", difficulty: "hard", topic: TOPIC, subtopic: "WHERE vs HAVING",
    Option1: "HAVING filters rows and WHERE filters groups", Option2: "Both run before grouping", Option3: "Both run after grouping", Option4: "WHERE filters rows first; HAVING then filters the grouped counts", CorrectOption: 4, iscodesnippet: true, codesnippet: "SELECT club, COUNT(*) FROM memberships\nWHERE joined_year >= 2020\nGROUP BY club\nHAVING COUNT(*) >= 3;", snippetLang: "sql" },
];

await buildDay({ day: DAY, topic: TOPIC, subtopics: SUBTOPICS, codeQuestions, mcqs });
