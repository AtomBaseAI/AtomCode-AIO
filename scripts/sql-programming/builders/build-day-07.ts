/**
 * Day 7 — "Sorting and Limiting" — question builder.
 *
 * Domain: a movie streaming catalog (movies table) — ORDER BY (multi-key),
 * ASC/DESC, NULLS FIRST/LAST (SQLite 3.30+), LIMIT, OFFSET and pagination.
 *
 * Run from /home/z/my-project:
 *   bun scripts/sql-programming/builders/build-day-07.ts
 */
import { buildDay, type SqlCodeQuestionIn, type SqlMcqQuestionIn } from "../lib.ts";

const DAY = 7;
const TOPIC = "Sorting and Limiting";
const SUBTOPICS = [
  "ORDER BY Clause",
  "ASC and DESC",
  "NULLS FIRST and NULLS LAST",
  "LIMIT Clause",
  "OFFSET Clause",
  "Pagination with LIMIT OFFSET",
];

/* Shared hidden setup: a movie streaming catalog. */
const CATALOG_SCHEMA = `CREATE TABLE movies (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  genre TEXT NOT NULL,
  rating REAL,
  runtime INTEGER NOT NULL,
  year INTEGER NOT NULL
);
INSERT INTO movies (title, genre, rating, runtime, year) VALUES
('Starlight Voyage', 'Sci-Fi', 8.7, 142, 2019),
('The Quiet Harbor', 'Drama', 7.9, 118, 2021),
('Midnight Circuit', 'Action', 8.7, 126, 2023),
('Paper Lanterns', 'Animation', 8.2, 96, 2020),
('The Last Note', 'Drama', 6.5, 104, 2018),
('Comet Chasers', 'Sci-Fi', NULL, 133, 2022),
('Laughter Lane', 'Comedy', 7.2, 101, 2021),
('Iron Meridian', 'Action', 7.9, 151, 2020),
('Glass Rain', 'Thriller', 8.2, 112, 2023),
('Snowfall Inn', 'Documentary', 7.2, 88, 2019),
('Neon Harvest', 'Sci-Fi', 9.1, 137, 2024),
('The Second Wind', 'Drama', 6.5, 109, 2022),
('Fox Trot Summer', 'Comedy', 5.8, 94, 2017),
('Deep Blue Ledger', 'Documentary', 7.2, 91, 2021);`;

const RULES_SORT =
  "Rules:\n- SQLite dialect. The schema and its data are pre-seeded automatically — do not include CREATE TABLE or INSERT statements in your answer.\n- Column names and order must match exactly (alias every output column).\n- Row order must match exactly (use ORDER BY as specified).";

const SCHEMA_NOTE_CATALOG =
  "Schema:\n- movies(id INTEGER PRIMARY KEY, title TEXT, genre TEXT, rating REAL, runtime INTEGER, year INTEGER)\n\nFourteen films are seeded across seven genres. Several films share the same rating (8.7, 8.2, 7.9, 7.2 and 6.5 all appear more than once), and exactly one film (Comet Chasers) has a NULL rating. Runtimes are unique.";

const codeQuestions: SqlCodeQuestionIn[] = [
  /* ── easy · basic (6) ─────────────────────────────────────────────── */
  {
    title: "Catalog By Premiere Year",
    description: `The archive view lists the catalog from oldest premiere to newest.\n\n${SCHEMA_NOTE_CATALOG}\n\nTask:\nReturn all columns of all movies, ordered by year ascending, tie-break by id ascending.\n\n${RULES_SORT}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "ORDER BY Clause",
    headerCode: CATALOG_SCHEMA,
    sourcecode: "SELECT * FROM movies ORDER BY year ASC, id ASC;",
    columns: ["id", "title", "genre", "rating", "runtime", "year"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Longest Runtime First",
    description: `Practice a descending sort on a numeric column.\n\n${SCHEMA_NOTE_CATALOG}\n\nTask:\nReturn title and runtime for all movies, ordered by runtime descending, tie-break by id ascending.\n\n${RULES_SORT}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "ASC and DESC",
    headerCode: CATALOG_SCHEMA,
    sourcecode: "SELECT title, runtime FROM movies ORDER BY runtime DESC, id ASC;",
    columns: ["title", "runtime"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Top Three By Rating",
    description: `The landing page shows only the three highest-rated films.\n\n${SCHEMA_NOTE_CATALOG}\n\nTask:\nReturn title and rating of the top three movies by rating descending (rating ties broken by id ascending), using LIMIT.\n\n${RULES_SORT}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "LIMIT Clause",
    headerCode: CATALOG_SCHEMA,
    sourcecode: "SELECT title, rating FROM movies ORDER BY rating DESC, id ASC LIMIT 3;",
    columns: ["title", "rating"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Second Page Of Five",
    description: `Practice page mechanics: the catalog is sliced into pages of five rows in id order.\n\n${SCHEMA_NOTE_CATALOG}\n\nTask:\nReturn id and title of the SECOND page (skip the first five rows, return the next five), ordered by id ascending, using LIMIT and OFFSET.\n\n${RULES_SORT}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Pagination with LIMIT OFFSET",
    headerCode: CATALOG_SCHEMA,
    sourcecode: "SELECT id, title FROM movies ORDER BY id LIMIT 5 OFFSET 5;",
    columns: ["id", "title"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Skip The Longest Four",
    description: `After the four epics are reserved for a marathon, the scheduler wants the next ten films by runtime.\n\n${SCHEMA_NOTE_CATALOG}\n\nTask:\nReturn title and runtime of all movies except the four with the longest runtime — order by runtime descending with id as tie-break, then skip four rows with OFFSET (return the remaining ten).\n\n${RULES_SORT}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "OFFSET Clause",
    headerCode: CATALOG_SCHEMA,
    sourcecode: "SELECT title, runtime FROM movies ORDER BY runtime DESC, id ASC LIMIT 10 OFFSET 4;",
    columns: ["title", "runtime"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Ratings High To Low",
    description: `The ratings chart runs from best to worst; the one unrated film must not sit at the top just because NULL sorts oddly.\n\n${SCHEMA_NOTE_CATALOG}\n\nTask:\nReturn title and rating of all movies ordered by rating DESC with NULLS LAST, tie-break by id ascending.\n\n${RULES_SORT}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "ASC and DESC",
    headerCode: CATALOG_SCHEMA,
    sourcecode: "SELECT title, rating FROM movies ORDER BY rating DESC NULLS LAST, id ASC;",
    columns: ["title", "rating"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── easy · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Sci-Fi Shelf By Rating",
    description: `The Sci-Fi spotlight shelf is ordered best-first, and the unrated entry sits at the bottom.\n\n${SCHEMA_NOTE_CATALOG}\n\nTask:\nReturn id, title and rating for movies with genre 'Sci-Fi', ordered by rating DESC NULLS LAST, tie-break by id ascending.\n\n${RULES_SORT}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "ORDER BY Clause",
    headerCode: CATALOG_SCHEMA,
    sourcecode: "SELECT id, title, rating FROM movies WHERE genre = 'Sci-Fi' ORDER BY rating DESC NULLS LAST, id ASC;",
    columns: ["id", "title", "rating"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Comedy Runtime Countdown",
    description: `A comedy marathon is planned back-to-back, longest film first.\n\n${SCHEMA_NOTE_CATALOG}\n\nTask:\nReturn title and runtime for movies with genre 'Comedy', ordered by runtime descending, tie-break by id ascending.\n\n${RULES_SORT}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "ASC and DESC",
    headerCode: CATALOG_SCHEMA,
    sourcecode: "SELECT title, runtime FROM movies WHERE genre = 'Comedy' ORDER BY runtime DESC, id ASC;",
    columns: ["title", "runtime"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Five Shortest First",
    description: `The lunch-break queue surfaces the five shortest films in the catalog.\n\n${SCHEMA_NOTE_CATALOG}\n\nTask:\nReturn title and runtime of the five movies with the smallest runtime (ties broken by id ascending), ordered by runtime ASC and cut with LIMIT.\n\n${RULES_SORT}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "LIMIT Clause",
    headerCode: CATALOG_SCHEMA,
    sourcecode: "SELECT title, runtime FROM movies ORDER BY runtime ASC, id ASC LIMIT 5;",
    columns: ["title", "runtime"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Unrated First Then Worst To Best",
    description: `The editorial fix-it queue wants the unrated film at the very top, followed by the lowest-rated films ascending.\n\n${SCHEMA_NOTE_CATALOG}\n\nTask:\nReturn title and rating of all movies ordered by rating ASC with NULLS FIRST, tie-break by id ascending.\n\n${RULES_SORT}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "NULLS FIRST and NULLS LAST",
    headerCode: CATALOG_SCHEMA,
    sourcecode: "SELECT title, rating FROM movies ORDER BY rating ASC NULLS FIRST, id ASC;",
    columns: ["title", "rating"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── medium · scenario (6) ────────────────────────────────────────── */
  {
    title: "Best To Worst Unrated On Top",
    description: `A curator builds a chart from best to worst rating but insists the unrated film appear FIRST so nobody forgets to score it.\n\n${SCHEMA_NOTE_CATALOG}\n\nTask:\nReturn id, title and rating of all movies ordered by rating DESC with NULLS FIRST, tie-break by id ascending.\n\n${RULES_SORT}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "NULLS FIRST and NULLS LAST",
    headerCode: CATALOG_SCHEMA,
    sourcecode: "SELECT id, title, rating FROM movies ORDER BY rating DESC NULLS FIRST, id ASC;",
    columns: ["id", "title", "rating"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "NULLS LAST", whitelist: "NULLS FIRST",
  },
  {
    title: "Genre Grouped Shelf",
    description: `The browse page groups films by genre alphabetically; inside each genre the best rating leads and the unrated film trails.\n\n${SCHEMA_NOTE_CATALOG}\n\nTask:\nReturn genre, title and rating of all movies ordered by genre ASC, then rating DESC NULLS LAST, then title ASC, then id ASC.\n\n${RULES_SORT}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "ORDER BY Clause",
    headerCode: CATALOG_SCHEMA,
    sourcecode: "SELECT genre, title, rating FROM movies ORDER BY genre ASC, rating DESC NULLS LAST, title ASC, id ASC;",
    columns: ["genre", "title", "rating"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "LIMIT", whitelist: "ORDER BY, NULLS LAST",
  },
  {
    title: "Leaderboard Top Six",
    description: `The weekly leaderboard lists the six best-rated films, rating ties broken by id.\n\n${SCHEMA_NOTE_CATALOG}\n\nTask:\nReturn title and rating of the top six movies ordered by rating DESC NULLS LAST, tie-break by id ascending, using LIMIT.\n\n${RULES_SORT}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "LIMIT Clause",
    headerCode: CATALOG_SCHEMA,
    sourcecode: "SELECT title, rating FROM movies ORDER BY rating DESC NULLS LAST, id ASC LIMIT 6;",
    columns: ["title", "rating"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "OFFSET", whitelist: "LIMIT",
  },
  {
    title: "Deep Cuts Beyond The Top",
    description: `The discovery tab hides the top six rated films and shows everything after them, unrated entry included at the end.\n\n${SCHEMA_NOTE_CATALOG}\n\nTask:\nReturn id, title and rating of all movies EXCEPT the first six when ordered by rating DESC NULLS LAST, id ASC — i.e. ORDER BY that way and use LIMIT 100 OFFSET 6.\n\n${RULES_SORT}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "OFFSET Clause",
    headerCode: CATALOG_SCHEMA,
    sourcecode: "SELECT id, title, rating FROM movies ORDER BY rating DESC NULLS LAST, id ASC LIMIT 100 OFFSET 6;",
    columns: ["id", "title", "rating"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "WHERE", whitelist: "OFFSET",
  },
  {
    title: "Catalog Page Three",
    description: `The storefront paginates the catalog four rows per page in id order. Render page three (rows 9-12).\n\n${SCHEMA_NOTE_CATALOG}\n\nTask:\nReturn id and title ordered by id ascending, using LIMIT 4 OFFSET 8.\n\n${RULES_SORT}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Pagination with LIMIT OFFSET",
    headerCode: CATALOG_SCHEMA,
    sourcecode: "SELECT id, title FROM movies ORDER BY id LIMIT 4 OFFSET 8;",
    columns: ["id", "title"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "NULLS", whitelist: "LIMIT, OFFSET",
  },
  {
    title: "Runtime Ladder Both Ways",
    description: `A runtime ladder lists films longest-first, but same-length entries would be alphabetical (runtimes are unique here, the tie-break just guarantees it).\n\n${SCHEMA_NOTE_CATALOG}\n\nTask:\nReturn title and runtime of all movies ordered by runtime DESC, then title ASC, then id ASC.\n\n${RULES_SORT}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "ASC and DESC",
    headerCode: CATALOG_SCHEMA,
    sourcecode: "SELECT title, runtime FROM movies ORDER BY runtime DESC, title ASC, id ASC;",
    columns: ["title", "runtime"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "NULLS", whitelist: "DESC",
  },

  /* ── hard · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Unrated First Newest Wins Ties",
    description: `The remastering team works through the catalog: unrated films first, then lowest ratings upward — and whenever ratings tie, the NEWEST film comes first.\n\n${SCHEMA_NOTE_CATALOG}\n\nTask:\nReturn id, title, rating and year ordered by rating ASC NULLS FIRST, then year DESC, then id ASC.\n\n${RULES_SORT}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "NULLS FIRST and NULLS LAST",
    headerCode: CATALOG_SCHEMA,
    sourcecode: "SELECT id, title, rating, year FROM movies ORDER BY rating ASC NULLS FIRST, year DESC, id ASC;",
    columns: ["id", "title", "rating", "year"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "LIMIT", whitelist: "NULLS FIRST",
  },
  {
    title: "Middle Slice Report",
    description: `A screening committee reviews neither the longest epics nor the very shortest: exactly films ranked 5 through 9 by runtime (longest first, id as tie-break).\n\n${SCHEMA_NOTE_CATALOG}\n\nTask:\nReturn id, title and runtime ordered by runtime DESC, id ASC, then slice with LIMIT 5 OFFSET 4.\n\n${RULES_SORT}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Pagination with LIMIT OFFSET",
    headerCode: CATALOG_SCHEMA,
    sourcecode: "SELECT id, title, runtime FROM movies ORDER BY runtime DESC, id ASC LIMIT 5 OFFSET 4;",
    columns: ["id", "title", "runtime"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "WHERE", whitelist: "LIMIT, OFFSET",
  },
  {
    title: "Genre Finalist Shorts",
    description: `For the documentary festival the curator takes the two highest-rated films across the Documentary AND Thriller shelves combined (rating ties broken by id), unrated pinned last.\n\n${SCHEMA_NOTE_CATALOG}\n\nTask:\nReturn title, genre and rating for movies with genre IN ('Documentary', 'Thriller'), ordered by rating DESC NULLS LAST, id ASC, cut with LIMIT 2.\n\n${RULES_SORT}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "LIMIT Clause",
    headerCode: CATALOG_SCHEMA,
    sourcecode: "SELECT title, genre, rating FROM movies WHERE genre IN ('Documentary', 'Thriller') ORDER BY rating DESC NULLS LAST, id ASC LIMIT 2;",
    columns: ["title", "genre", "rating"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "GROUP BY", whitelist: "LIMIT, IN",
  },
  {
    title: "Tail Of The Ratings Chart",
    description: `The clearance queue takes the three WORST-rated films (unrated films are protected and pinned last, not cleared).\n\n${SCHEMA_NOTE_CATALOG}\n\nTask:\nReturn id, title and rating ordered by rating ASC NULLS LAST, id ASC, cut with LIMIT 3.\n\n${RULES_SORT}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "LIMIT Clause",
    headerCode: CATALOG_SCHEMA,
    sourcecode: "SELECT id, title, rating FROM movies ORDER BY rating ASC NULLS LAST, id ASC LIMIT 3;",
    columns: ["id", "title", "rating"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "DESC", whitelist: "LIMIT, NULLS LAST",
  },
];

/* ── MCQs (20: 10 easy / 6 medium / 4 hard; 6 snippets; 5/5/5/5 spread) ── */
const mcqs: SqlMcqQuestionIn[] = [
  { title: "Default Sort Direction", description: "ORDER BY year (no direction keyword) sorts in which direction in SQLite?", difficulty: "easy", topic: TOPIC, subtopic: "ORDER BY Clause",
    Option1: "Descending", Option2: "Ascending", Option3: "Insertion order", Option4: "Random order", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "DESC Meaning", description: "What does ORDER BY runtime DESC produce?", difficulty: "easy", topic: TOPIC, subtopic: "ASC and DESC",
    Option1: "Ascending order", Option2: "Insertion order", Option3: "Alphabetical order", Option4: "Descending — largest or highest first", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Multi Key Sort", description: "ORDER BY genre, rating DESC sorts how?", difficulty: "easy", topic: TOPIC, subtopic: "ORDER BY Clause",
    Option1: "genre descending then rating ascending", Option2: "By rating descending only", Option3: "genre ascending, then rating descending inside each genre", Option4: "Invalid — one direction per query", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "LIMIT Role", description: "What does LIMIT 5 do to a SELECT result?", difficulty: "easy", topic: TOPIC, subtopic: "LIMIT Clause",
    Option1: "Returns at most five rows", Option2: "Returns exactly five columns", Option3: "Returns rows five and onward", Option4: "Returns five pages of results", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "OFFSET Role", description: "What does OFFSET 10 do in a query with LIMIT?", difficulty: "easy", topic: TOPIC, subtopic: "OFFSET Clause",
    Option1: "Returns rows ten and onward", Option2: "Skips the first ten rows before returning the rest", Option3: "Caps the output at ten rows", Option4: "Jumps ten pages ahead", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "NULL Sort Default", description: "In SQLite, where do NULL values land in a plain ascending ORDER BY?", difficulty: "easy", topic: TOPIC, subtopic: "NULLS FIRST and NULLS LAST",
    Option1: "At the end", Option2: "They are dropped from the result", Option3: "At the start — NULL sorts as the smallest value", Option4: "The query raises an error", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "NULLS LAST Syntax", description: "Which is valid SQLite syntax for pinning NULLs to the end of a descending sort?", difficulty: "easy", topic: TOPIC, subtopic: "NULLS FIRST and NULLS LAST",
    Option1: "ORDER BY rating DESC NULLS LAST", Option2: "ORDER BY rating NULLS LAST DESC", Option3: "ORDER BY rating DESC LAST NULLS", Option4: "ORDER BY NULLS LAST rating DESC", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Why Add A Tie Breaker", description: "Why add a final ORDER BY key such as id to a sort?", difficulty: "easy", topic: TOPIC, subtopic: "ORDER BY Clause",
    Option1: "It makes the query run faster", Option2: "It removes duplicate rows", Option3: "It filters out NULLs", Option4: "It makes the row order fully deterministic", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Third Page Query", description: "For page size 10, which query returns page 3 (rows 21-30)?", difficulty: "easy", topic: TOPIC, subtopic: "Pagination with LIMIT OFFSET",
    Option1: "LIMIT 20 OFFSET 10", Option2: "LIMIT 3 OFFSET 10", Option3: "LIMIT 10 OFFSET 20", Option4: "LIMIT 30 OFFSET 3", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "LIMIT Without ORDER BY", description: "SELECT title FROM movies LIMIT 5; (no ORDER BY) — which five rows come back?", difficulty: "easy", topic: TOPIC, subtopic: "LIMIT Clause",
    Option1: "An error — LIMIT requires ORDER BY", Option2: "Always the first five inserted rows", Option3: "Always the alphabetically first rows", Option4: "Undefined — any five rows may be returned", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "NULLS LAST Under DESC", description: "In this snippet, where do films with a NULL rating land?", difficulty: "medium", topic: TOPIC, subtopic: "NULLS FIRST and NULLS LAST",
    Option1: "At the start", Option2: "At the end — NULLS LAST holds even under DESC", Option3: "They are dropped", Option4: "The query errors", CorrectOption: 2, iscodesnippet: true, codesnippet: "SELECT id, title FROM movies\nORDER BY rating DESC NULLS LAST, id;", snippetLang: "sql" },
  { title: "OFFSET Beyond The End", description: "The movies table has 14 rows. How many rows does this snippet return?", difficulty: "medium", topic: TOPIC, subtopic: "OFFSET Clause",
    Option1: "Zero — the offset is past the end", Option2: "Five rows", Option3: "All rows", Option4: "An error", CorrectOption: 1, iscodesnippet: true, codesnippet: "SELECT id, title FROM movies\nORDER BY id LIMIT 5 OFFSET 100;", snippetLang: "sql" },
  { title: "LIMIT Zero Result", description: "What does this snippet produce?", difficulty: "medium", topic: TOPIC, subtopic: "LIMIT Clause",
    Option1: "Every row", Option2: "Just the header — zero rows", Option3: "An error — zero is not allowed", Option4: "Exactly one row", CorrectOption: 2, iscodesnippet: true, codesnippet: "SELECT id, title FROM movies\nORDER BY rating LIMIT 0;", snippetLang: "sql" },
  { title: "Alias In ORDER BY", description: "Is the snippet valid SQLite?", difficulty: "medium", topic: TOPIC, subtopic: "ORDER BY Clause",
    Option1: "No — ORDER BY must use the real column name", Option2: "No — aliases only work in WHERE", Option3: "Yes — SQLite resolves output aliases in ORDER BY", Option4: "Yes, but it silently sorts by insertion order", CorrectOption: 3, iscodesnippet: true, codesnippet: "SELECT title AS film FROM movies\nORDER BY film LIMIT 3;", snippetLang: "sql" },
  { title: "Negative LIMIT", description: "In SQLite, what does LIMIT -1 do?", difficulty: "medium", topic: TOPIC, subtopic: "LIMIT Clause",
    Option1: "No upper bound — every row is returned", Option2: "Zero rows", Option3: "A runtime error", Option4: "The last row only", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "OFFSET Needs LIMIT", description: "In SQLite, can OFFSET appear without a LIMIT clause?", difficulty: "medium", topic: TOPIC, subtopic: "Pagination with LIMIT OFFSET",
    Option1: "Yes — OFFSET can appear alone", Option2: "Yes — in SQLite OFFSET must follow a LIMIT clause", Option3: "Only alongside a WHERE clause", Option4: "Only inside a subquery", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Stable Pagination Recipe", description: "What makes LIMIT/OFFSET pagination return the SAME rows every time?", difficulty: "hard", topic: TOPIC, subtopic: "Pagination with LIMIT OFFSET",
    Option1: "Any column works — ties reshuffle randomly by design", Option2: "OFFSET guarantees stability by itself", Option3: "The sort keys must form a total order (e.g. a unique id last)", Option4: "LIMIT freezes the row order", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Top N Ties Behavior", description: "Two films tie for third place but the query says LIMIT 3. What does SQLite do?", difficulty: "hard", topic: TOPIC, subtopic: "LIMIT Clause",
    Option1: "It returns all tied rows", Option2: "It raises an error", Option3: "It rewrites the query to include ties", Option4: "Ties are cut arbitrarily unless the ORDER BY has a tie-breaker", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "NULLS FIRST Overrides DESC", description: "In this snippet, where do NULL ratings land?", difficulty: "hard", topic: TOPIC, subtopic: "NULLS FIRST and NULLS LAST",
    Option1: "First — NULLS FIRST overrides DESC's default", Option2: "Last", Option3: "They are dropped", Option4: "Nowhere — the query errors", CorrectOption: 1, iscodesnippet: true, codesnippet: "SELECT id, rating FROM movies\nORDER BY rating DESC NULLS FIRST;", snippetLang: "sql" },
  { title: "Ordinal ORDER BY", description: "What does ORDER BY 2, 1 do in this snippet?", difficulty: "hard", topic: TOPIC, subtopic: "ORDER BY Clause",
    Option1: "Sorts by the literal numbers 2 and 1 — same for every row", Option2: "It is a syntax error in SQLite", Option3: "It restores insertion order", Option4: "It sorts by the second output column, then the first", CorrectOption: 4, iscodesnippet: true, codesnippet: "SELECT id, title FROM movies\nORDER BY 2, 1 LIMIT 4;", snippetLang: "sql" },
];

await buildDay({ day: DAY, topic: TOPIC, subtopics: SUBTOPICS, codeQuestions, mcqs });
