/**
 * Day 15 — "Window Functions" — marathon race results board domain.
 *
 * Hidden headerCode seeds a marathon: 10 runners and 16 results across the
 * 'full' and 'half' categories, with deliberate tie finish_seconds inside
 * each category (full: 7620x2, 7935x2, 8100x2; half: 4380x2). Every window
 * ORDER BY carries runner_id as a total tie-break so results stay
 * deterministic; ranking questions intentionally rank on finish_seconds
 * alone so the ties are visible in RANK/DENSE_RANK.
 *
 * Run from /home/z/my-project:
 *   bun scripts/sql-programming/builders/build-day-15.ts
 */
import { buildDay, type SqlCodeQuestionIn, type SqlMcqQuestionIn } from "../lib.ts";

const DAY = 15;
const TOPIC = "Window Functions";
const SUBTOPICS = [
  "OVER Clause",
  "PARTITION BY",
  "ROW_NUMBER",
  "RANK and DENSE_RANK",
  "LAG and LEAD",
  "NTILE",
  "Running Totals and Sums",
];

/* Shared hidden setup: a marathon race results board. */
const MARATHON_SCHEMA = `CREATE TABLE runners (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL
);
INSERT INTO runners (name, country) VALUES
('Elias Berg', 'Norway'),
('Sonia Reyes', 'Spain'),
('Marek Novak', 'Czechia'),
('Ayla Demir', 'Turkey'),
('Jonas Vik', 'Norway'),
('Camille Roux', 'France'),
('Peter Lang', 'Austria'),
('Ingrid Dahl', 'Norway'),
('Marco Bianchi', 'Italy'),
('Hana Suzuki', 'Japan');

CREATE TABLE results (
  id INTEGER PRIMARY KEY,
  runner_id INTEGER NOT NULL,
  category TEXT NOT NULL,
  finish_seconds INTEGER NOT NULL
);
INSERT INTO results (runner_id, category, finish_seconds) VALUES
(1, 'full', 7620),
(2, 'full', 7935),
(3, 'full', 7620),
(4, 'full', 8100),
(5, 'full', 8245),
(6, 'full', 7935),
(7, 'full', 8370),
(8, 'full', 8550),
(9, 'full', 8100),
(10, 'half', 4380),
(1, 'half', 4500),
(2, 'half', 4310),
(5, 'half', 4380),
(6, 'half', 4560),
(9, 'half', 4435),
(3, 'half', 4640);`;

const RULES_SELECT_ONLY =
  "Rules:\n- SQLite dialect. The schema and its data are pre-seeded automatically — do not include CREATE TABLE or INSERT statements in your answer.\n- Column names and order must match exactly (alias every window column).\n- Row order must match exactly (use ORDER BY as specified).";

const SCHEMA_NOTE_MARATHON =
  "Schema:\n- runners(id INTEGER PRIMARY KEY, name TEXT, country TEXT)\n- results(id INTEGER PRIMARY KEY, runner_id INTEGER -> runners.id, category TEXT, finish_seconds INTEGER)\n\nTen runners are seeded; nine ran the full marathon and seven the half (five runners ran both). finish_seconds are whole seconds; category is 'full' or 'half'. Deliberate ties exist inside each category: full has three pairs (7620, 7935, 8100) and half has one pair (4380).";

function makeDesc(story: string, task: string): string {
  return `${story}\n\n${SCHEMA_NOTE_MARATHON}\n\nTask:\n${task}\n\n${RULES_SELECT_ONLY}`;
}

const codeQuestions: SqlCodeQuestionIn[] = [
  /* ── easy · basic (6) ─────────────────────────────────────────────── */
  {
    title: "Field Size On Every Row",
    description: makeDesc(
      `The results board shows the finisher list of the full marathon with the total number of finishers repeated on every row — a job for COUNT(*) OVER ().`,
      `Join results res to runners r on runner id, keep category 'full', and return r.name AS runner_name, res.finish_seconds AS finish_seconds and COUNT(*) OVER () AS field_size, ordered by finish_seconds ascending, then runner id ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "OVER Clause",
    headerCode: MARATHON_SCHEMA,
    sourcecode: "SELECT r.name AS runner_name, res.finish_seconds AS finish_seconds, COUNT(*) OVER () AS field_size FROM results res JOIN runners r ON r.id = res.runner_id WHERE res.category = 'full' ORDER BY res.finish_seconds, res.runner_id;",
    columns: ["runner_name", "finish_seconds", "field_size"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Whole Board Average",
    description: makeDesc(
      `Every row of the combined results board should also show the average finish time of all 16 results — an aggregate over the whole window.`,
      `Join results res to runners r on runner id, and return r.name AS runner_name, res.category AS category, res.finish_seconds AS finish_seconds and ROUND(AVG(res.finish_seconds) OVER (), 2) AS board_average, ordered by finish_seconds ascending, then runner id ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "OVER Clause",
    headerCode: MARATHON_SCHEMA,
    sourcecode: "SELECT r.name AS runner_name, res.category AS category, res.finish_seconds AS finish_seconds, ROUND(AVG(res.finish_seconds) OVER (), 2) AS board_average FROM results res JOIN runners r ON r.id = res.runner_id ORDER BY res.finish_seconds, res.runner_id;",
    columns: ["runner_name", "category", "finish_seconds", "board_average"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Category Sizes",
    description: makeDesc(
      `PARTITION BY practice: show how many finishers each race category had, repeated on every row of that category.`,
      `Join results res to runners r on runner id, and return r.name AS runner_name, res.category AS category and COUNT(*) OVER (PARTITION BY res.category) AS category_size, ordered by category ascending, then finish_seconds ascending, then runner id ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "PARTITION BY",
    headerCode: MARATHON_SCHEMA,
    sourcecode: "SELECT r.name AS runner_name, res.category AS category, COUNT(*) OVER (PARTITION BY res.category) AS category_size FROM results res JOIN runners r ON r.id = res.runner_id ORDER BY res.category, res.finish_seconds, res.runner_id;",
    columns: ["runner_name", "category", "category_size"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Full Marathon Finish Numbers",
    description: makeDesc(
      `ROW_NUMBER drill: give every full-marathon finisher a distinct finish number from 1 to 9, fastest first.`,
      `Join results res to runners r on runner id, keep category 'full', and return r.name AS runner_name, res.finish_seconds AS finish_seconds and ROW_NUMBER() OVER (ORDER BY res.finish_seconds, res.runner_id) AS finish_number, ordered by finish_seconds ascending, then runner id ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "ROW_NUMBER",
    headerCode: MARATHON_SCHEMA,
    sourcecode: "SELECT r.name AS runner_name, res.finish_seconds AS finish_seconds, ROW_NUMBER() OVER (ORDER BY res.finish_seconds, res.runner_id) AS finish_number FROM results res JOIN runners r ON r.id = res.runner_id WHERE res.category = 'full' ORDER BY res.finish_seconds, res.runner_id;",
    columns: ["runner_name", "finish_seconds", "finish_number"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Tied Times Share The Crown",
    description: makeDesc(
      `RANK drill: rank the full marathon on finish_seconds alone so tied times share a rank and the next rank leaves a gap.`,
      `Join results res to runners r on runner id, keep category 'full', and return r.name AS runner_name, res.finish_seconds AS finish_seconds and RANK() OVER (ORDER BY res.finish_seconds) AS finish_rank, ordered by finish_seconds ascending, then runner id ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "RANK and DENSE_RANK",
    headerCode: MARATHON_SCHEMA,
    sourcecode: "SELECT r.name AS runner_name, res.finish_seconds AS finish_seconds, RANK() OVER (ORDER BY res.finish_seconds) AS finish_rank FROM results res JOIN runners r ON r.id = res.runner_id WHERE res.category = 'full' ORDER BY res.finish_seconds, res.runner_id;",
    columns: ["runner_name", "finish_seconds", "finish_rank"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Quarters Of The Full Field",
    description: makeDesc(
      `NTILE drill: split the nine full-marathon finishers into four buckets labelled 1 to 4, fastest first (earlier buckets may hold one extra row).`,
      `Join results res to runners r on runner id, keep category 'full', and return r.name AS runner_name, res.finish_seconds AS finish_seconds and NTILE(4) OVER (ORDER BY res.finish_seconds, res.runner_id) AS quartile, ordered by quartile ascending, then finish_seconds ascending, then runner id ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "NTILE",
    headerCode: MARATHON_SCHEMA,
    sourcecode: "SELECT r.name AS runner_name, res.finish_seconds AS finish_seconds, NTILE(4) OVER (ORDER BY res.finish_seconds, res.runner_id) AS quartile FROM results res JOIN runners r ON r.id = res.runner_id WHERE res.category = 'full' ORDER BY quartile, res.finish_seconds, res.runner_id;",
    columns: ["runner_name", "finish_seconds", "quartile"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── easy · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Half Field Snapshot",
    description: makeDesc(
      `The half-marathon big screen shows each finisher together with the size of the half field.`,
      `Join results res to runners r on runner id, keep category 'half', and return r.name AS runner_name, res.finish_seconds AS finish_seconds and COUNT(*) OVER () AS field_size, ordered by finish_seconds ascending, then runner id ascending.`
    ),
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "OVER Clause",
    headerCode: MARATHON_SCHEMA,
    sourcecode: "SELECT r.name AS runner_name, res.finish_seconds AS finish_seconds, COUNT(*) OVER () AS field_size FROM results res JOIN runners r ON r.id = res.runner_id WHERE res.category = 'half' ORDER BY res.finish_seconds, res.runner_id;",
    columns: ["runner_name", "finish_seconds", "field_size"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "No Gaps On The Medal Board",
    description: makeDesc(
      `The medal board must not skip numbers after ties: DENSE_RANK keeps consecutive ranks even when times tie.`,
      `Join results res to runners r on runner id, keep category 'full', and return r.name AS runner_name, res.finish_seconds AS finish_seconds and DENSE_RANK() OVER (ORDER BY res.finish_seconds) AS packed_rank, ordered by finish_seconds ascending, then runner id ascending.`
    ),
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "RANK and DENSE_RANK",
    headerCode: MARATHON_SCHEMA,
    sourcecode: "SELECT r.name AS runner_name, res.finish_seconds AS finish_seconds, DENSE_RANK() OVER (ORDER BY res.finish_seconds) AS packed_rank FROM results res JOIN runners r ON r.id = res.runner_id WHERE res.category = 'full' ORDER BY res.finish_seconds, res.runner_id;",
    columns: ["runner_name", "finish_seconds", "packed_rank"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Half Field Gap To Previous",
    description: makeDesc(
      `The commentary team studies pacing: the gap to the previous finisher in the half marathon. The first finisher has no predecessor, so the gap is NULL.`,
      `Join results res to runners r on runner id, keep category 'half', and return r.name AS runner_name, res.finish_seconds AS finish_seconds and res.finish_seconds - LAG(res.finish_seconds) OVER (ORDER BY res.finish_seconds, res.runner_id) AS gap_to_previous, ordered by finish_seconds ascending, then runner id ascending.`
    ),
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "LAG and LEAD",
    headerCode: MARATHON_SCHEMA,
    sourcecode: "SELECT r.name AS runner_name, res.finish_seconds AS finish_seconds, res.finish_seconds - LAG(res.finish_seconds) OVER (ORDER BY res.finish_seconds, res.runner_id) AS gap_to_previous FROM results res JOIN runners r ON r.id = res.runner_id WHERE res.category = 'half' ORDER BY res.finish_seconds, res.runner_id;",
    columns: ["runner_name", "finish_seconds", "gap_to_previous"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Half Field Running Total",
    description: makeDesc(
      `The broadcast pacing table accumulates finish seconds down the half-marathon order so producers can see how much racing time has elapsed.`,
      `Join results res to runners r on runner id, keep category 'half', and return r.name AS runner_name, res.finish_seconds AS finish_seconds and SUM(res.finish_seconds) OVER (ORDER BY res.finish_seconds, res.runner_id) AS running_total, ordered by finish_seconds ascending, then runner id ascending.`
    ),
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Running Totals and Sums",
    headerCode: MARATHON_SCHEMA,
    sourcecode: "SELECT r.name AS runner_name, res.finish_seconds AS finish_seconds, SUM(res.finish_seconds) OVER (ORDER BY res.finish_seconds, res.runner_id) AS running_total FROM results res JOIN runners r ON r.id = res.runner_id WHERE res.category = 'half' ORDER BY res.finish_seconds, res.runner_id;",
    columns: ["runner_name", "finish_seconds", "running_total"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── medium · scenario (6) ────────────────────────────────────────── */
  {
    title: "Seconds Behind The Leader",
    description: makeDesc(
      `Per category, how far behind the category's fastest time is every finisher? Use MIN() OVER (PARTITION BY ...). No GROUP BY allowed.`,
      `Join results res to runners r on runner id, and return r.name AS runner_name, res.category AS category, res.finish_seconds AS finish_seconds and res.finish_seconds - MIN(res.finish_seconds) OVER (PARTITION BY res.category) AS behind_leader, ordered by category ascending, then finish_seconds ascending, then runner id ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "PARTITION BY",
    headerCode: MARATHON_SCHEMA,
    sourcecode: "SELECT r.name AS runner_name, res.category AS category, res.finish_seconds AS finish_seconds, res.finish_seconds - MIN(res.finish_seconds) OVER (PARTITION BY res.category) AS behind_leader FROM results res JOIN runners r ON r.id = res.runner_id ORDER BY res.category, res.finish_seconds, res.runner_id;",
    columns: ["runner_name", "category", "finish_seconds", "behind_leader"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "GROUP BY", whitelist: "OVER, PARTITION BY",
  },
  {
    title: "Both Fields Numbered",
    description: makeDesc(
      `One board, two races: ROW_NUMBER restarts at 1 inside each category partition.`,
      `Join results res to runners r on runner id, and return res.category AS category, ROW_NUMBER() OVER (PARTITION BY res.category ORDER BY res.finish_seconds, res.runner_id) AS position and r.name AS runner_name, ordered by category ascending, then position ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "ROW_NUMBER",
    headerCode: MARATHON_SCHEMA,
    sourcecode: "SELECT res.category AS category, ROW_NUMBER() OVER (PARTITION BY res.category ORDER BY res.finish_seconds, res.runner_id) AS position, r.name AS runner_name FROM results res JOIN runners r ON r.id = res.runner_id ORDER BY res.category, position;",
    columns: ["category", "position", "runner_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "RANK", whitelist: "OVER, ROW_NUMBER",
  },
  {
    title: "Gapped Versus Packed Ranks",
    description: makeDesc(
      `The stats desk shows both rank styles side by side on the full marathon: RANK leaves gaps after ties, DENSE_RANK does not.`,
      `Join results res to runners r on runner id, keep category 'full', and return r.name AS runner_name, res.finish_seconds AS finish_seconds, RANK() OVER (ORDER BY res.finish_seconds) AS tied_rank and DENSE_RANK() OVER (ORDER BY res.finish_seconds) AS packed_rank, ordered by finish_seconds ascending, then runner id ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "RANK and DENSE_RANK",
    headerCode: MARATHON_SCHEMA,
    sourcecode: "SELECT r.name AS runner_name, res.finish_seconds AS finish_seconds, RANK() OVER (ORDER BY res.finish_seconds) AS tied_rank, DENSE_RANK() OVER (ORDER BY res.finish_seconds) AS packed_rank FROM results res JOIN runners r ON r.id = res.runner_id WHERE res.category = 'full' ORDER BY res.finish_seconds, res.runner_id;",
    columns: ["runner_name", "finish_seconds", "tied_rank", "packed_rank"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "ROW_NUMBER", whitelist: "OVER, RANK",
  },
  {
    title: "Neighbours On The Full Board",
    description: makeDesc(
      `For the full marathon, show each finisher flanked by the previous and the next finish time on the board (LAG and LEAD).`,
      `Join results res to runners r on runner id, keep category 'full', and return r.name AS runner_name, res.finish_seconds AS finish_seconds, LAG(res.finish_seconds) OVER (ORDER BY res.finish_seconds, res.runner_id) AS prev_seconds and LEAD(res.finish_seconds) OVER (ORDER BY res.finish_seconds, res.runner_id) AS next_seconds, ordered by finish_seconds ascending, then runner id ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "LAG and LEAD",
    headerCode: MARATHON_SCHEMA,
    sourcecode: "SELECT r.name AS runner_name, res.finish_seconds AS finish_seconds, LAG(res.finish_seconds) OVER (ORDER BY res.finish_seconds, res.runner_id) AS prev_seconds, LEAD(res.finish_seconds) OVER (ORDER BY res.finish_seconds, res.runner_id) AS next_seconds FROM results res JOIN runners r ON r.id = res.runner_id WHERE res.category = 'full' ORDER BY res.finish_seconds, res.runner_id;",
    columns: ["runner_name", "finish_seconds", "prev_seconds", "next_seconds"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "PARTITION BY, GROUP BY", whitelist: "OVER, LAG, LEAD",
  },
  {
    title: "Previous Time Per Race",
    description: makeDesc(
      `The split analysis needs each finisher's previous finish time within their own race — LAG over a partitioned window.`,
      `Join results res to runners r on runner id, and return res.category AS category, r.name AS runner_name and LAG(res.finish_seconds) OVER (PARTITION BY res.category ORDER BY res.finish_seconds, res.runner_id) AS prev_seconds, ordered by category ascending, then finish_seconds ascending, then runner id ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "LAG and LEAD",
    headerCode: MARATHON_SCHEMA,
    sourcecode: "SELECT res.category AS category, r.name AS runner_name, LAG(res.finish_seconds) OVER (PARTITION BY res.category ORDER BY res.finish_seconds, res.runner_id) AS prev_seconds FROM results res JOIN runners r ON r.id = res.runner_id ORDER BY res.category, res.finish_seconds, res.runner_id;",
    columns: ["category", "runner_name", "prev_seconds"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "GROUP BY", whitelist: "LAG, PARTITION BY",
  },
  {
    title: "Halves Of The Half Field",
    description: makeDesc(
      `Split the seven half-marathon finishers into the leading half and the trailing half with NTILE(2).`,
      `Join results res to runners r on runner id, keep category 'half', and return r.name AS runner_name, res.finish_seconds AS finish_seconds and NTILE(2) OVER (ORDER BY res.finish_seconds, res.runner_id) AS half_of_field, ordered by half_of_field ascending, then finish_seconds ascending, then runner id ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "NTILE",
    headerCode: MARATHON_SCHEMA,
    sourcecode: "SELECT r.name AS runner_name, res.finish_seconds AS finish_seconds, NTILE(2) OVER (ORDER BY res.finish_seconds, res.runner_id) AS half_of_field FROM results res JOIN runners r ON r.id = res.runner_id WHERE res.category = 'half' ORDER BY half_of_field, res.finish_seconds, res.runner_id;",
    columns: ["runner_name", "finish_seconds", "half_of_field"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "RANK", whitelist: "OVER, NTILE",
  },

  /* ── hard · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Category Versus Board Averages",
    description: makeDesc(
      `One compact report row per category: its own average finish time and the whole-board average, both computed with window aggregates over a DISTINCT category set. No GROUP BY allowed.`,
      `Join results res to runners r on runner id, and return DISTINCT res.category AS category, ROUND(AVG(res.finish_seconds) OVER (PARTITION BY res.category), 2) AS category_average and ROUND(AVG(res.finish_seconds) OVER (), 2) AS board_average, ordered by category ascending.`
    ),
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "PARTITION BY",
    headerCode: MARATHON_SCHEMA,
    sourcecode: "SELECT DISTINCT res.category AS category, ROUND(AVG(res.finish_seconds) OVER (PARTITION BY res.category), 2) AS category_average, ROUND(AVG(res.finish_seconds) OVER (), 2) AS board_average FROM results res JOIN runners r ON r.id = res.runner_id ORDER BY res.category;",
    columns: ["category", "category_average", "board_average"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "GROUP BY", whitelist: "OVER, PARTITION BY",
  },
  {
    title: "Podium Shortlists",
    description: makeDesc(
      `Each race publishes a podium shortlist of its three fastest finishers. Row-number inside a CTE, then filter — window functions cannot be filtered directly in WHERE.`,
      `WITH ranked AS (join results res to runners r; select r.name AS runner_name, res.category AS category and ROW_NUMBER() OVER (PARTITION BY res.category ORDER BY res.finish_seconds, res.runner_id) AS position) — return category AS category, position AS position and runner_name AS runner_name FROM ranked WHERE position <= 3, ordered by category ascending, then position ascending.`
    ),
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "ROW_NUMBER",
    headerCode: MARATHON_SCHEMA,
    sourcecode: "WITH ranked AS (SELECT r.name AS runner_name, res.category AS category, ROW_NUMBER() OVER (PARTITION BY res.category ORDER BY res.finish_seconds, res.runner_id) AS position FROM results res JOIN runners r ON r.id = res.runner_id) SELECT category AS category, position AS position, runner_name AS runner_name FROM ranked WHERE position <= 3 ORDER BY category, position;",
    columns: ["category", "position", "runner_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "RANK", whitelist: "ROW_NUMBER",
  },
  {
    title: "Ranks Inside Each Race",
    description: makeDesc(
      `The official board computes both rank styles inside each category partition, on finish_seconds alone so ties stay visible.`,
      `Join results res to runners r on runner id, and return res.category AS category, r.name AS runner_name, res.finish_seconds AS finish_seconds, RANK() OVER (PARTITION BY res.category ORDER BY res.finish_seconds) AS tied_rank and DENSE_RANK() OVER (PARTITION BY res.category ORDER BY res.finish_seconds) AS packed_rank, ordered by category ascending, then finish_seconds ascending, then runner id ascending.`
    ),
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "RANK and DENSE_RANK",
    headerCode: MARATHON_SCHEMA,
    sourcecode: "SELECT res.category AS category, r.name AS runner_name, res.finish_seconds AS finish_seconds, RANK() OVER (PARTITION BY res.category ORDER BY res.finish_seconds) AS tied_rank, DENSE_RANK() OVER (PARTITION BY res.category ORDER BY res.finish_seconds) AS packed_rank FROM results res JOIN runners r ON r.id = res.runner_id ORDER BY res.category, res.finish_seconds, res.runner_id;",
    columns: ["category", "runner_name", "finish_seconds", "tied_rank", "packed_rank"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "ROW_NUMBER", whitelist: "OVER, PARTITION BY",
  },
  {
    title: "Race By Race Running Total",
    description: makeDesc(
      `The timing desk accumulates finish seconds separately within each race: a running SUM partitioned by category.`,
      `Join results res to runners r on runner id, and return res.category AS category, r.name AS runner_name, res.finish_seconds AS finish_seconds and SUM(res.finish_seconds) OVER (PARTITION BY res.category ORDER BY res.finish_seconds, res.runner_id) AS category_running_total, ordered by category ascending, then finish_seconds ascending, then runner id ascending.`
    ),
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Running Totals and Sums",
    headerCode: MARATHON_SCHEMA,
    sourcecode: "SELECT res.category AS category, r.name AS runner_name, res.finish_seconds AS finish_seconds, SUM(res.finish_seconds) OVER (PARTITION BY res.category ORDER BY res.finish_seconds, res.runner_id) AS category_running_total FROM results res JOIN runners r ON r.id = res.runner_id ORDER BY res.category, res.finish_seconds, res.runner_id;",
    columns: ["category", "runner_name", "finish_seconds", "category_running_total"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "GROUP BY", whitelist: "OVER, PARTITION BY",
  },
];

/* ── MCQs (20: 10 easy / 6 medium / 4 hard; 6 snippets; 5/5/5/5 spread) ── */
const mcqs: SqlMcqQuestionIn[] = [
  { title: "OVER Clause Basics", description: "In ROW_NUMBER() OVER (ORDER BY finish_seconds), what does the OVER clause do?", difficulty: "easy", topic: TOPIC, subtopic: "OVER Clause",
    Option1: "Filters out slow rows", Option2: "Joins the results table", Option3: "Defines the window (ordering/partitioning) the function computes over", Option4: "Removes duplicate rows", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Window Versus GROUP BY", description: "Unlike GROUP BY, window functions:", difficulty: "easy", topic: TOPIC, subtopic: "OVER Clause",
    Option1: "Collapse rows into one per group", Option2: "Keep every row while adding per-window values", Option3: "Cannot use ORDER BY", Option4: "Only work on text columns", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "ROW_NUMBER Guarantee", description: "What does ROW_NUMBER() guarantee?", difficulty: "easy", topic: TOPIC, subtopic: "ROW_NUMBER",
    Option1: "Tied rows share a number", Option2: "Distinct consecutive numbers 1,2,3,... regardless of ties", Option3: "Numbers restart for every tie", Option4: "It requires GROUP BY", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "RANK Tie Behavior", description: "Two rows tie for first place. What does RANK() give them, and what does the third row get?", difficulty: "easy", topic: TOPIC, subtopic: "RANK and DENSE_RANK",
    Option1: "1 and 2; third gets 2", Option2: "2 and 2; third gets 3", Option3: "1.5 and 1.5", Option4: "1 and 1; third gets 3 (a gap)", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "DENSE_RANK Tie Behavior", description: "Two rows tie for rank 1. What rank does the next row get under DENSE_RANK()?", difficulty: "easy", topic: TOPIC, subtopic: "RANK and DENSE_RANK",
    Option1: "2 (no gap)", Option2: "3", Option3: "1", Option4: "4", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "PARTITION BY Effect", description: "PARTITION BY category in a window:", difficulty: "easy", topic: TOPIC, subtopic: "PARTITION BY",
    Option1: "Merges all categories into one", Option2: "Deletes other categories", Option3: "Splits the computation per category, restarting values like row numbers in each partition", Option4: "Sorts the whole table once", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "LAG Meaning", description: "LAG(finish_seconds) OVER (ORDER BY finish_seconds) returns:", difficulty: "easy", topic: TOPIC, subtopic: "LAG and LEAD",
    Option1: "The next row's value", Option2: "The previous row's value in the window order", Option3: "The average of the window", Option4: "The first row's value", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "LEAD Boundary Snippet", description: "What does next_sec show for the LAST row of this result?", difficulty: "easy", topic: TOPIC, subtopic: "LAG and LEAD",
    Option1: "0", Option2: "The first row's value", Option3: "A runtime error", Option4: "NULL", CorrectOption: 4, iscodesnippet: true, codesnippet: "SELECT name, LEAD(finish_seconds)\n  OVER (ORDER BY finish_seconds) AS next_sec\nFROM results;", snippetLang: "sql" },
  { title: "NTILE(4) Meaning", description: "NTILE(4) OVER (...):", difficulty: "easy", topic: TOPIC, subtopic: "NTILE",
    Option1: "Divides rows into 4 roughly equal buckets labelled 1..4", Option2: "Ranks 1..4 skipping ties", Option3: "Returns exactly 4 rows", Option4: "Multiplies values by 4", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Running Total Snippet", description: "What does the running_total column compute?", difficulty: "easy", topic: TOPIC, subtopic: "Running Totals and Sums",
    Option1: "The whole table's sum on every row", Option2: "Only the current row's seconds", Option3: "The accumulating sum from the window start through the current row", Option4: "The next three rows' sum", CorrectOption: 3, iscodesnippet: true, codesnippet: "SELECT name, SUM(finish_seconds)\n  OVER (ORDER BY finish_seconds) AS running_total\nFROM results;", snippetLang: "sql" },

  { title: "Default Frame And Peers", description: "With SUM(x) OVER (ORDER BY sec) and two rows tied on sec, what does the default RANGE frame include for each tied row?", difficulty: "medium", topic: TOPIC, subtopic: "Running Totals and Sums",
    Option1: "Only the rows strictly before the tie", Option2: "All peers of the current row — tied rows share the same running total", Option3: "Only the current row", Option4: "The whole partition", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Window In WHERE", description: "WHERE ROW_NUMBER() OVER (...) = 1 — why does this fail?", difficulty: "medium", topic: TOPIC, subtopic: "ROW_NUMBER",
    Option1: "It works fine", Option2: "Window functions cannot be evaluated in WHERE — use a CTE or subquery to filter on the number", Option3: "It runs but returns all rows", Option4: "It sorts instead of filtering", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Partition Row Number Snippet", description: "What does the pos column do in this query?", difficulty: "medium", topic: TOPIC, subtopic: "PARTITION BY",
    Option1: "Restarts at 1 within each category", Option2: "Runs 1..N across the whole table", Option3: "Is NULL on every row", Option4: "Errors — OVER needs a name", CorrectOption: 1, iscodesnippet: true, codesnippet: "SELECT category, ROW_NUMBER() OVER (\n  PARTITION BY category\n  ORDER BY finish_seconds) AS pos\nFROM results;", snippetLang: "sql" },
  { title: "COUNT OVER Empty Spec", description: "COUNT(*) OVER () computes:", difficulty: "medium", topic: TOPIC, subtopic: "OVER Clause",
    Option1: "The count of the whole result set, repeated on every row", Option2: "The count of the current row only", Option3: "An error — OVER needs ORDER BY", Option4: "The count of distinct values", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "RANK Versus ROW_NUMBER Snippet", description: "Two rows tie for the fastest time. What do the two columns show for them?", difficulty: "medium", topic: TOPIC, subtopic: "RANK and DENSE_RANK",
    Option1: "r and rn both show 1,1", Option2: "r shows 1,2 and rn shows 1,1", Option3: "r shows 1,1 and rn shows 1,2", Option4: "Both error", CorrectOption: 3, iscodesnippet: true, codesnippet: "SELECT RANK() OVER (ORDER BY sec) AS r,\n       ROW_NUMBER() OVER (ORDER BY sec) AS rn\nFROM results;", snippetLang: "sql" },
  { title: "LEAD Versus LAG", description: "LEAD(finish_seconds) OVER (ORDER BY finish_seconds) returns:", difficulty: "medium", topic: TOPIC, subtopic: "LAG and LEAD",
    Option1: "The previous row's value", Option2: "The following row's value in the window order", Option3: "The minimum of the window", Option4: "The row count", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },

  { title: "NTILE Distribution Snippet", description: "Nine rows are fed to NTILE(4). How are the bucket sizes distributed?", difficulty: "hard", topic: TOPIC, subtopic: "NTILE",
    Option1: "4,4,1,0", Option2: "2,2,2,3", Option3: "Exactly 2.25 rows per bucket", Option4: "3,2,2,2 — earlier buckets get the extra rows", CorrectOption: 4, iscodesnippet: true, codesnippet: "SELECT NTILE(4) OVER (\n  ORDER BY finish_seconds) AS q\nFROM results;", snippetLang: "sql" },
  { title: "Window Function In CTE Snippet", description: "What does this statement return?", difficulty: "hard", topic: TOPIC, subtopic: "ROW_NUMBER",
    Option1: "All rows", Option2: "An error — WHERE cannot see rn", Option3: "The three fastest rows", Option4: "The three slowest rows", CorrectOption: 3, iscodesnippet: true, codesnippet: "WITH ranked AS (\n  SELECT name, ROW_NUMBER() OVER (\n    ORDER BY finish_seconds) AS rn\n  FROM results)\nSELECT name FROM ranked WHERE rn <= 3;", snippetLang: "sql" },
  { title: "RANK After Three Way Tie", description: "Three rows tie for rank 1. What rank does the fourth row get under RANK()?", difficulty: "hard", topic: TOPIC, subtopic: "RANK and DENSE_RANK",
    Option1: "2", Option2: "1", Option3: "3", Option4: "4", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Why Alias Window Columns", description: "Why should every window expression get an explicit alias (AS pos)?", difficulty: "hard", topic: TOPIC, subtopic: "OVER Clause",
    Option1: "SQLite renames them automatically", Option2: "Aliases are forbidden on window functions", Option3: "Aliases make window functions faster", Option4: "Unnamed window expressions get ugly expression-text headers, and downstream clauses need clean column names", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
];

await buildDay({ day: DAY, topic: TOPIC, subtopics: SUBTOPICS, codeQuestions, mcqs });
