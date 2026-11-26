/**
 * Day 8 — "Aggregate Functions" — question builder.
 *
 * Domain: a charity fundraiser donations log (donations table) — COUNT
 * variants, SUM, AVG with ROUND, MIN/MAX, group_concat (SQLite's
 * STRING_AGG substitute) and DISTINCT inside aggregates. Single-table
 * whole-set aggregates only; GROUP BY starts on day 9.
 *
 * Run from /home/z/my-project:
 *   bun scripts/sql-programming/builders/build-day-08.ts
 */
import { buildDay, type SqlCodeQuestionIn, type SqlMcqQuestionIn } from "../lib.ts";

const DAY = 8;
const TOPIC = "Aggregate Functions";
const SUBTOPICS = [
  "COUNT Function",
  "SUM Function",
  "AVG Function",
  "MIN and MAX Functions",
  "GROUP_CONCAT and STRING_AGG",
  "DISTINCT with Aggregates",
];

/* Shared hidden setup: a charity fundraiser donations log. */
const LEDGER_SCHEMA = `CREATE TABLE donations (
  id INTEGER PRIMARY KEY,
  donor TEXT NOT NULL,
  region TEXT,
  amount REAL NOT NULL,
  campaign TEXT NOT NULL,
  donated_at TEXT NOT NULL
);
INSERT INTO donations (donor, region, amount, campaign, donated_at) VALUES
('Amara Diallo', 'North', 25.0, 'Spring Drive', '2024-03-02'),
('Ben Okafor', 'North', 40.0, 'Spring Drive', '2024-03-05'),
('Carla Ruiz', 'South', 40.0, 'Spring Drive', '2024-03-07'),
('Dmitri Volkov', NULL, 100.0, 'Spring Drive', '2024-03-09'),
('Elena Petrova', 'East', 15.5, 'Spring Drive', '2024-03-11'),
('Farah Aziz', 'East', 60.0, 'Gala Night', '2024-04-01'),
('Greg Mills', 'West', 25.0, 'Gala Night', '2024-04-03'),
('Hana Suzuki', NULL, 75.0, 'Gala Night', '2024-04-05'),
('Ivan Ivanov', 'South', 30.0, 'Spring Drive', '2024-04-07'),
('Julia Tran', 'West', 45.0, 'Gala Night', '2024-04-09'),
('Ben Okafor', 'East', 40.0, 'Spring Drive', '2024-04-12'),
('Lena Fischer', 'North', 90.0, 'Gala Night', '2024-04-15'),
('Omar Haddad', NULL, 20.0, 'Spring Drive', '2024-04-18'),
('Priya Nair', 'South', 55.0, 'Gala Night', '2024-04-20');`;

const RULES_AGG =
  "Rules:\n- SQLite dialect. The schema and its data are pre-seeded automatically — do not include CREATE TABLE or INSERT statements in your answer.\n- Column names and order must match exactly (alias every output column).\n- Row order must match exactly (use ORDER BY as specified).";

const SCHEMA_NOTE_LEDGER =
  "Schema:\n- donations(id INTEGER PRIMARY KEY, donor TEXT, region TEXT, amount REAL, campaign TEXT, donated_at TEXT)\n\nFourteen gifts are logged across two campaigns (Spring Drive, Gala Night). Three gifts have a NULL region (the donor skipped the box), amounts repeat on purpose (40.0 appears three times, 25.0 twice), and Ben Okafor donated twice, so the donor column holds a repeat.";

const codeQuestions: SqlCodeQuestionIn[] = [
  /* ── easy · basic (6) ─────────────────────────────────────────────── */
  {
    title: "Count Every Gift",
    description: `The treasurer needs the total number of gift entries on the ledger.\n\n${SCHEMA_NOTE_LEDGER}\n\nTask:\nReturn one row with the number of gifts as total_gifts (use COUNT(*)); alias the column exactly.\n\n${RULES_AGG}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "COUNT Function",
    headerCode: LEDGER_SCHEMA,
    sourcecode: "SELECT COUNT(*) AS total_gifts FROM donations;",
    columns: ["total_gifts"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Sum Of All Donations",
    description: `Practice a whole-table SUM with money-safe rounding.\n\n${SCHEMA_NOTE_LEDGER}\n\nTask:\nReturn one row with ROUND(SUM(amount), 2) as total_amount.\n\n${RULES_AGG}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "SUM Function",
    headerCode: LEDGER_SCHEMA,
    sourcecode: "SELECT ROUND(SUM(amount), 2) AS total_amount FROM donations;",
    columns: ["total_amount"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Average Gift Size",
    description: `Practice AVG with rounding to cents.\n\n${SCHEMA_NOTE_LEDGER}\n\nTask:\nReturn one row with ROUND(AVG(amount), 2) as average_gift.\n\n${RULES_AGG}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "AVG Function",
    headerCode: LEDGER_SCHEMA,
    sourcecode: "SELECT ROUND(AVG(amount), 2) AS average_gift FROM donations;",
    columns: ["average_gift"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Smallest And Largest Gift",
    description: `Practice MIN and MAX side by side in one result row.\n\n${SCHEMA_NOTE_LEDGER}\n\nTask:\nReturn one row with ROUND(MIN(amount), 2) as smallest_gift and ROUND(MAX(amount), 2) as largest_gift (in that order).\n\n${RULES_AGG}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "MIN and MAX Functions",
    headerCode: LEDGER_SCHEMA,
    sourcecode: "SELECT ROUND(MIN(amount), 2) AS smallest_gift, ROUND(MAX(amount), 2) AS largest_gift FROM donations;",
    columns: ["smallest_gift", "largest_gift"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Regions That Donated",
    description: `Count the distinct regions represented on the ledger — NULL regions must not invent a region of their own.\n\n${SCHEMA_NOTE_LEDGER}\n\nTask:\nReturn one row with COUNT(DISTINCT region) as regions_covered.\n\n${RULES_AGG}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "DISTINCT with Aggregates",
    headerCode: LEDGER_SCHEMA,
    sourcecode: "SELECT COUNT(DISTINCT region) AS regions_covered FROM donations;",
    columns: ["regions_covered"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Unique Donor Count",
    description: `One donor gave twice; the report counts people, not gifts.\n\n${SCHEMA_NOTE_LEDGER}\n\nTask:\nReturn one row with COUNT(DISTINCT donor) as unique_donors.\n\n${RULES_AGG}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "DISTINCT with Aggregates",
    headerCode: LEDGER_SCHEMA,
    sourcecode: "SELECT COUNT(DISTINCT donor) AS unique_donors FROM donations;",
    columns: ["unique_donors"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── easy · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Spring Drive Gift Count",
    description: `The Spring Drive coordinator reports how many gifts her campaign collected.\n\n${SCHEMA_NOTE_LEDGER}\n\nTask:\nReturn one row with COUNT(*) as spring_gifts counting only rows where campaign is 'Spring Drive'.\n\n${RULES_AGG}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "COUNT Function",
    headerCode: LEDGER_SCHEMA,
    sourcecode: "SELECT COUNT(*) AS spring_gifts FROM donations WHERE campaign = 'Spring Drive';",
    columns: ["spring_gifts"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Spring Drive Total Raised",
    description: `The Spring Drive poster needs the campaign's running total in dollars.\n\n${SCHEMA_NOTE_LEDGER}\n\nTask:\nReturn one row with ROUND(SUM(amount), 2) as spring_total over rows where campaign is 'Spring Drive'.\n\n${RULES_AGG}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "SUM Function",
    headerCode: LEDGER_SCHEMA,
    sourcecode: "SELECT ROUND(SUM(amount), 2) AS spring_total FROM donations WHERE campaign = 'Spring Drive';",
    columns: ["spring_total"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Average Gala Gift",
    description: `The Gala Night chair wants the average gift size for her campaign, rounded to cents.\n\n${SCHEMA_NOTE_LEDGER}\n\nTask:\nReturn one row with ROUND(AVG(amount), 2) as gala_average over rows where campaign is 'Gala Night'.\n\n${RULES_AGG}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "AVG Function",
    headerCode: LEDGER_SCHEMA,
    sourcecode: "SELECT ROUND(AVG(amount), 2) AS gala_average FROM donations WHERE campaign = 'Gala Night';",
    columns: ["gala_average"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Biggest Single Gift Log",
    description: `The annual report names the single largest donation and its donor.\n\n${SCHEMA_NOTE_LEDGER}\n\nTask:\nReturn donor as top_donor and ROUND(amount, 2) as top_amount for the one gift whose amount equals the ledger maximum (compare against a scalar subquery with MAX).\n\n${RULES_AGG}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "MIN and MAX Functions",
    headerCode: LEDGER_SCHEMA,
    sourcecode: "SELECT donor AS top_donor, ROUND(amount, 2) AS top_amount FROM donations WHERE amount = (SELECT MAX(amount) FROM donations);",
    columns: ["top_donor", "top_amount"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── medium · scenario (6) ────────────────────────────────────────── */
  {
    title: "Gifts With A Known Region",
    description: `The data-quality report contrasts the total gift count with the count of gifts that actually carry a region value.\n\n${SCHEMA_NOTE_LEDGER}\n\nTask:\nReturn one row with COUNT(*) as all_gifts and COUNT(region) as regions_filled — the difference comes from the NULL regions.\n\n${RULES_AGG}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "COUNT Function",
    headerCode: LEDGER_SCHEMA,
    sourcecode: "SELECT COUNT(*) AS all_gifts, COUNT(region) AS regions_filled FROM donations;",
    columns: ["all_gifts", "regions_filled"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "DISTINCT", whitelist: "COUNT",
  },
  {
    title: "Matched Funds Total",
    description: `A matching donor covers every gift of 40.00 or more. The board needs that matchable sum.\n\n${SCHEMA_NOTE_LEDGER}\n\nTask:\nReturn one row with ROUND(SUM(amount), 2) as matched_total over gifts with amount >= 40.\n\n${RULES_AGG}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "SUM Function",
    headerCode: LEDGER_SCHEMA,
    sourcecode: "SELECT ROUND(SUM(amount), 2) AS matched_total FROM donations WHERE amount >= 40;",
    columns: ["matched_total"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "AVG", whitelist: "SUM",
  },
  {
    title: "Average Gift Over Twenty",
    description: `Small change clutters the average — the finance pack reports the mean gift size counting only gifts above 20.00.\n\n${SCHEMA_NOTE_LEDGER}\n\nTask:\nReturn one row with ROUND(AVG(amount), 2) as big_gift_average over gifts with amount > 20.\n\n${RULES_AGG}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "AVG Function",
    headerCode: LEDGER_SCHEMA,
    sourcecode: "SELECT ROUND(AVG(amount), 2) AS big_gift_average FROM donations WHERE amount > 20;",
    columns: ["big_gift_average"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "SUM", whitelist: "AVG",
  },
  {
    title: "Gift Range For The Gala",
    description: `The Gala Night debrief shows the smallest and largest gift of that campaign only.\n\n${SCHEMA_NOTE_LEDGER}\n\nTask:\nReturn one row with ROUND(MIN(amount), 2) as gala_min and ROUND(MAX(amount), 2) as gala_max over rows where campaign is 'Gala Night'.\n\n${RULES_AGG}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "MIN and MAX Functions",
    headerCode: LEDGER_SCHEMA,
    sourcecode: "SELECT ROUND(MIN(amount), 2) AS gala_min, ROUND(MAX(amount), 2) AS gala_max FROM donations WHERE campaign = 'Gala Night';",
    columns: ["gala_min", "gala_max"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "AVG", whitelist: "MIN, MAX",
  },
  {
    title: "Spring Drive Donor Roll Call",
    description: `The Spring Drive thank-you card lists every donating name on one comma-separated line, in ledger (id) order. Build it with group_concat over an ordered subquery — SQLite has no STRING_AGG and group_concat alone does not guarantee order.\n\n${SCHEMA_NOTE_LEDGER}\n\nTask:\nReturn one row: group_concat(donor, ', ') as donor_roll over (SELECT donor FROM donations WHERE campaign = 'Spring Drive' ORDER BY id).\n\n${RULES_AGG}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "GROUP_CONCAT and STRING_AGG",
    headerCode: LEDGER_SCHEMA,
    sourcecode: "SELECT group_concat(donor, ', ') AS donor_roll FROM (SELECT donor FROM donations WHERE campaign = 'Spring Drive' ORDER BY id) AS spring;",
    columns: ["donor_roll"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "STRING_AGG", whitelist: "group_concat",
  },
  {
    title: "Unique Gift Amounts Tally",
    description: `Amounts repeat across gifts; the treasurer counts how many DIFFERENT amounts were pledged.\n\n${SCHEMA_NOTE_LEDGER}\n\nTask:\nReturn one row with COUNT(DISTINCT amount) as distinct_amounts.\n\n${RULES_AGG}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "DISTINCT with Aggregates",
    headerCode: LEDGER_SCHEMA,
    sourcecode: "SELECT COUNT(DISTINCT amount) AS distinct_amounts FROM donations;",
    columns: ["distinct_amounts"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "group_concat", whitelist: "COUNT(DISTINCT",
  },

  /* ── hard · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Alphabet Donor Roll Call",
    description: `The annual report prints every unique donor name on one line, alphabetical, joined with commas. Distinct first, then order the subquery alphabetically.\n\n${SCHEMA_NOTE_LEDGER}\n\nTask:\nReturn one row: group_concat(donor, ', ') as unique_donor_roll over (SELECT DISTINCT donor FROM donations ORDER BY donor).\n\n${RULES_AGG}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "GROUP_CONCAT and STRING_AGG",
    headerCode: LEDGER_SCHEMA,
    sourcecode: "SELECT group_concat(donor, ', ') AS unique_donor_roll FROM (SELECT DISTINCT donor FROM donations ORDER BY donor) AS donors;",
    columns: ["unique_donor_roll"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "JOIN", whitelist: "group_concat, DISTINCT",
  },
  {
    title: "Gifts At The Extremes",
    description: `The auditor inspects the two boundary gifts: the smallest and the largest donation on the ledger, with their donors.\n\n${SCHEMA_NOTE_LEDGER}\n\nTask:\nReturn donor as donor and ROUND(amount, 2) as amount for gifts whose amount equals (SELECT MIN(amount) FROM donations) OR equals (SELECT MAX(amount) FROM donations), ordered by amount ascending, tie-break by id ascending.\n\n${RULES_AGG}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "MIN and MAX Functions",
    headerCode: LEDGER_SCHEMA,
    sourcecode: "SELECT donor AS donor, ROUND(amount, 2) AS amount FROM donations WHERE amount = (SELECT MIN(amount) FROM donations) OR amount = (SELECT MAX(amount) FROM donations) ORDER BY amount ASC, id ASC;",
    columns: ["donor", "amount"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "GROUP BY", whitelist: "MIN, MAX",
  },
  {
    title: "Fundraising Health Check",
    description: `The director's dashboard shows three numbers for the whole ledger at once: total raised, average gift and biggest gift. One query, one row — and it must scan the whole table (no WHERE allowed).\n\n${SCHEMA_NOTE_LEDGER}\n\nTask:\nReturn one row with ROUND(SUM(amount), 2) as total_raised, ROUND(AVG(amount), 2) as average_gift and ROUND(MAX(amount), 2) as biggest_gift.\n\n${RULES_AGG}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "SUM Function",
    headerCode: LEDGER_SCHEMA,
    sourcecode: "SELECT ROUND(SUM(amount), 2) AS total_raised, ROUND(AVG(amount), 2) AS average_gift, ROUND(MAX(amount), 2) AS biggest_gift FROM donations;",
    columns: ["total_raised", "average_gift", "biggest_gift"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "WHERE", whitelist: "SUM, AVG",
  },
  {
    title: "Ledger Completeness Audit",
    description: `The audit committee measures the ledger in one sweep: total rows, filled regions, campaigns run and unique donors.\n\n${SCHEMA_NOTE_LEDGER}\n\nTask:\nReturn one row with COUNT(*) as total_rows, COUNT(region) as regions_filled, COUNT(DISTINCT campaign) as campaigns_run and COUNT(DISTINCT donor) as unique_donors, in that order.\n\n${RULES_AGG}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "COUNT Function",
    headerCode: LEDGER_SCHEMA,
    sourcecode: "SELECT COUNT(*) AS total_rows, COUNT(region) AS regions_filled, COUNT(DISTINCT campaign) AS campaigns_run, COUNT(DISTINCT donor) AS unique_donors FROM donations;",
    columns: ["total_rows", "regions_filled", "campaigns_run", "unique_donors"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "SUM", whitelist: "COUNT",
  },
];

/* ── MCQs (20: 10 easy / 6 medium / 4 hard; 6 snippets; 5/5/5/5 spread) ── */
const mcqs: SqlMcqQuestionIn[] = [
  { title: "COUNT Star Meaning", description: "What does COUNT(*) count?", difficulty: "easy", topic: TOPIC, subtopic: "COUNT Function",
    Option1: "Only non-NULL values of one column", Option2: "Every row of the group or table", Option3: "Only distinct rows", Option4: "The tables in the database", CorrectOption: 2, iscodesnippet: true, codesnippet: "SELECT COUNT(*) FROM donations;", snippetLang: "sql" },
  { title: "COUNT Column Meaning", description: "region has NULLs. What does COUNT(region) return?", difficulty: "easy", topic: TOPIC, subtopic: "COUNT Function",
    Option1: "All rows including NULL regions", Option2: "Only distinct regions", Option3: "Rows where region is not NULL", Option4: "Zero — COUNT ignores nullable columns", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "SUM Of Nothing", description: "What does SUM(amount) return when zero rows match the WHERE clause?", difficulty: "easy", topic: TOPIC, subtopic: "SUM Function",
    Option1: "NULL", Option2: "0", Option3: "An error", Option4: "The first row", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "AVG And NULLs", description: "How does AVG(amount) treat rows where amount is NULL?", difficulty: "easy", topic: TOPIC, subtopic: "AVG Function",
    Option1: "Counts them as zero", Option2: "Makes the whole result NULL", Option3: "Includes them as 1 each", Option4: "Ignores them — it averages only non-NULL values", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "MIN MAX And NULLs", description: "How do MIN and MAX treat NULL values in the column?", difficulty: "easy", topic: TOPIC, subtopic: "MIN and MAX Functions",
    Option1: "They return NULL if any NULL exists", Option2: "They ignore NULLs", Option3: "They treat NULL as 0", Option4: "They raise an error", CorrectOption: 2, iscodesnippet: true, codesnippet: "SELECT MIN(amount), MAX(amount) FROM donations;", snippetLang: "sql" },
  { title: "Rounding Averages", description: "What does ROUND(AVG(amount), 2) do?", difficulty: "easy", topic: TOPIC, subtopic: "AVG Function",
    Option1: "Truncates to a whole number", Option2: "Rounds to 2 significant digits", Option3: "Rounds to 2 decimal places", Option4: "Formats the number as currency text", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "DISTINCT Inside COUNT", description: "What does COUNT(DISTINCT donor) return?", difficulty: "easy", topic: TOPIC, subtopic: "DISTINCT with Aggregates",
    Option1: "Each distinct non-NULL donor counted once", Option2: "Every donor row counted twice", Option3: "The same as COUNT(donor)", Option4: "Invalid syntax in SQLite", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "group_concat Default Separator", description: "With no second argument, what separator does group_concat use?", difficulty: "easy", topic: TOPIC, subtopic: "GROUP_CONCAT and STRING_AGG",
    Option1: "A comma and a space", Option2: "A bare comma", Option3: "A space", Option4: "A semicolon", CorrectOption: 2, iscodesnippet: true, codesnippet: "SELECT group_concat(donor) FROM donations;", snippetLang: "sql" },
  { title: "Aggregate Without GROUP BY", description: "SELECT COUNT(*) FROM donations; (no GROUP BY) returns how many rows?", difficulty: "easy", topic: TOPIC, subtopic: "COUNT Function",
    Option1: "One row per donor", Option2: "One row per campaign", Option3: "Zero rows", Option4: "Exactly one row over the whole table", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "MAX On Text", description: "What does MAX(donor) return on a TEXT column?", difficulty: "easy", topic: TOPIC, subtopic: "MIN and MAX Functions",
    Option1: "The largest donor id", Option2: "NULL — MAX is numeric only", Option3: "The alphabetically last donor name", Option4: "The alphabetically first donor name", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "SUM Of All NULLs", description: "If every value in a column is NULL, what does SUM(col) return?", difficulty: "medium", topic: TOPIC, subtopic: "SUM Function",
    Option1: "0", Option2: "An error", Option3: "The column default", Option4: "NULL — no non-NULL values to sum", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "AVG Equals Sum Over Count", description: "The snippet returns two columns. How do they compare?", difficulty: "medium", topic: TOPIC, subtopic: "AVG Function",
    Option1: "They are equal — AVG is the sum over the non-NULL count", Option2: "The first is always larger", Option3: "The second is always larger", Option4: "One of them raises an error", CorrectOption: 1, iscodesnippet: true, codesnippet: "SELECT SUM(amount) / COUNT(amount), AVG(amount)\nFROM donations;", snippetLang: "sql" },
  { title: "COUNT Vs COUNT DISTINCT", description: "donor has repeated names but no NULLs. How do the two columns compare?", difficulty: "medium", topic: TOPIC, subtopic: "DISTINCT with Aggregates",
    Option1: "They are equal", Option2: "COUNT(DISTINCT donor) is smaller when names repeat", Option3: "COUNT(DISTINCT donor) is larger", Option4: "COUNT(DISTINCT donor) is NULL", CorrectOption: 2, iscodesnippet: true, codesnippet: "SELECT COUNT(donor), COUNT(DISTINCT donor)\nFROM donations;", snippetLang: "sql" },
  { title: "group_concat Order Caveat", description: "What is guaranteed about the order of values inside group_concat output?", difficulty: "medium", topic: TOPIC, subtopic: "GROUP_CONCAT and STRING_AGG",
    Option1: "Always alphabetical", Option2: "Always insertion order", Option3: "Not guaranteed — feed it an ORDER BY-ed subquery when order matters", Option4: "Always reverse insertion order", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Why ROUND Money", description: "Why wrap money aggregates in ROUND(x, 2)?", difficulty: "medium", topic: TOPIC, subtopic: "AVG Function",
    Option1: "SQLite requires money as integers", Option2: "Averages produce long float tails; ROUND(..., 2) renders clean cents", Option3: "ROUND changes the stored data", Option4: "It converts REAL to TEXT", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "MAX With A Bare Column", description: "In SQLite, what does SELECT donor, MAX(amount) FROM donations; return for donor?", difficulty: "medium", topic: TOPIC, subtopic: "MIN and MAX Functions",
    Option1: "The donor from the row holding the maximum (SQLite's bare-column rule)", Option2: "A random donor", Option3: "The alphabetically first donor", Option4: "NULL", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "COUNT Star Vs COUNT Column", description: "Which statement about COUNT(*) and COUNT(x) is exact?", difficulty: "hard", topic: TOPIC, subtopic: "COUNT Function",
    Option1: "COUNT(*) excludes rows where x is NULL", Option2: "They are always identical", Option3: "COUNT(*) counts all rows; COUNT(x) skips rows where x is NULL", Option4: "COUNT(x) counts NULLs as empty strings", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Distinct group_concat Form", description: "Which call is valid SQLite for concatenating distinct values?", difficulty: "hard", topic: TOPIC, subtopic: "GROUP_CONCAT and STRING_AGG",
    Option1: "group_concat(DISTINCT donor, ', ')", Option2: "STRING_AGG(DISTINCT donor)", Option3: "group_concat(donor ORDER BY donor)", Option4: "group_concat(DISTINCT donor)", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "NULL Drops Out Of SUM", description: "If some amount values were NULL, what does the snippet return?", difficulty: "hard", topic: TOPIC, subtopic: "SUM Function",
    Option1: "The sum skipping those rows — NULL expressions drop out of SUM", Option2: "The sum treating them as 0 plus a warning", Option3: "NULL", Option4: "An error", CorrectOption: 1, iscodesnippet: true, codesnippet: "SELECT SUM(amount + 5) FROM donations;", snippetLang: "sql" },
  { title: "Nested Aggregates", description: "What does SELECT MAX(AVG(amount)) FROM donations; do?", difficulty: "hard", topic: TOPIC, subtopic: "AVG Function",
    Option1: "Returns the overall average gift", Option2: "Returns the average of per-row averages", Option3: "Returns zero — the inner aggregate resets", Option4: "Errors — one aggregate cannot wrap another", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
];

await buildDay({ day: DAY, topic: TOPIC, subtopics: SUBTOPICS, codeQuestions, mcqs });
