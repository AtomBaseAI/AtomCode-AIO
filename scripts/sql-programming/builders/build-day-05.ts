/**
 * Day 5 — "SELECT Basics" — REFERENCE BUILDER (pipeline pilot).
 *
 * Proves the full pipeline: hidden headerCode + reference solutions →
 * judge-shaped grids computed by buildDay() → day-05.code.json / day-05.mcq.json.
 *
 * Run from /home/z/my-project:
 *   bun scripts/sql-programming/builders/build-day-05.ts
 */
import { buildDay, type SqlCodeQuestionIn, type SqlMcqQuestionIn } from "../lib.ts";

const DAY = 5;
const TOPIC = "SELECT Basics";
const SUBTOPICS = [
  "SELECT and FROM Clauses",
  "Column Selection",
  "Column and Table Aliases",
  "DISTINCT Keyword",
  "SELECT Expressions",
];

/* Shared hidden setup: a small vinyl record shop inventory. */
const RECORDS_SCHEMA = `CREATE TABLE records (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  price REAL NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  released_year INTEGER NOT NULL
);
INSERT INTO records (title, artist, price, stock, released_year) VALUES
('Blue Train', 'John Coltrane', 24.5, 8, 1958),
('Kind of Blue', 'Miles Davis', 28.0, 12, 1959),
('A Love Supreme', 'John Coltrane', 26.0, 5, 1965),
('Bitches Brew', 'Miles Davis', 31.0, 0, 1970),
('Head Hunters', 'Herbie Hancock', 22.5, 9, 1973),
('Thriller', 'Michael Jackson', 18.0, 15, 1982),
('Like a Prayer', 'Madonna', 16.5, 7, 1989),
('Nevermind', 'Nirvana', 20.0, 11, 1991),
('OK Computer', 'Radiohead', 23.0, 4, 1997),
('Random Access Memories', 'Daft Punk', 27.5, 6, 2013);`;

const RULES_SELECT_ONLY =
  "Rules:\n- SQLite dialect. The schema and its data are pre-seeded automatically — do not include CREATE TABLE or INSERT statements in your answer.\n- Column names and order must match exactly (alias every output column).\n- Row order must match exactly (use ORDER BY as specified).";

const SCHEMA_NOTE_RECORDS =
  "Schema:\n- records(id INTEGER PRIMARY KEY, title TEXT, artist TEXT, price REAL, stock INTEGER, released_year INTEGER)\n\nTen vinyl records are seeded. Every record has an artist; some artists appear on more than one record; price is in USD; stock can be zero.";

const codeQuestions: SqlCodeQuestionIn[] = [
  /* ── easy · basic (6) ─────────────────────────────────────────────── */
  {
    title: "Show the Whole Shelf",
    description: `A new hire needs to see the complete inventory table to learn what the store stocks. Return every column of every record.\n\n${SCHEMA_NOTE_RECORDS}\n\nTask:\nReturn all columns of all records, ordered by id ascending.\n\n${RULES_SELECT_ONLY}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "SELECT and FROM Clauses",
    headerCode: RECORDS_SCHEMA,
    sourcecode: "SELECT * FROM records ORDER BY id;",
    columns: ["id", "title", "artist", "price", "stock", "released_year"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Titles With Their Artists",
    description: `For a wall poster, the manager wants just the album titles and artist names — nothing else.\n\n${SCHEMA_NOTE_RECORDS}\n\nTask:\nReturn exactly two columns: title and artist (in that order), one row per record, ordered by id ascending.\n\n${RULES_SELECT_ONLY}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Column Selection",
    headerCode: RECORDS_SCHEMA,
    sourcecode: "SELECT title, artist FROM records ORDER BY id;",
    columns: ["title", "artist"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Rename the Price Column",
    description: `The finance team dislikes the raw column names. Show the catalog with friendlier headers.\n\n${SCHEMA_NOTE_RECORDS}\n\nTask:\nReturn title AS album_title and price AS usd_price, ordered by id ascending.\n\n${RULES_SELECT_ONLY}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Column and Table Aliases",
    headerCode: RECORDS_SCHEMA,
    sourcecode: "SELECT title AS album_title, price AS usd_price FROM records ORDER BY id;",
    columns: ["album_title", "usd_price"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "List Every Artist Once",
    description: `Building a browsing index: the same artist should not appear twice even if they released several records in the shop.\n\n${SCHEMA_NOTE_RECORDS}\n\nTask:\nReturn one column, artist, with each distinct artist exactly once, ordered alphabetically by artist.\n\n${RULES_SELECT_ONLY}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "DISTINCT Keyword",
    headerCode: RECORDS_SCHEMA,
    sourcecode: "SELECT DISTINCT artist AS artist FROM records ORDER BY artist;",
    columns: ["artist"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Price With Sales Tax",
    description: `Local sales tax is 8%. The counter display should show the taxed price next to each album.\n\n${SCHEMA_NOTE_RECORDS}\n\nTask:\nReturn title AS title and the price multiplied by 1.08 AS price_with_tax, ordered by id ascending. Do not round — return the exact product.\n\n${RULES_SELECT_ONLY}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "SELECT Expressions",
    headerCode: RECORDS_SCHEMA,
    sourcecode: "SELECT title AS title, price * 1.08 AS price_with_tax FROM records ORDER BY id;",
    columns: ["title", "price_with_tax"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Query Through a Short Name",
    description: `Practice writing queries against a table alias instead of the full table name.\n\n${SCHEMA_NOTE_RECORDS}\n\nTask:\nUsing the table alias r, return r.title AS title and r.stock AS stock, ordered by id ascending.\n\n${RULES_SELECT_ONLY}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Column and Table Aliases",
    headerCode: RECORDS_SCHEMA,
    sourcecode: "SELECT r.title AS title, r.stock AS stock FROM records AS r ORDER BY r.id;",
    columns: ["title", "stock"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── easy · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Front Desk Catalog Sheet",
    description: `The front desk prints a one-page catalog for walk-in customers: album and artist only, alphabetical by album so it is easy to scan.\n\n${SCHEMA_NOTE_RECORDS}\n\nTask:\nReturn title AS album, artist AS artist, ordered by album title ascending.\n\n${RULES_SELECT_ONLY}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Column Selection",
    headerCode: RECORDS_SCHEMA,
    sourcecode: "SELECT title AS album, artist AS artist FROM records ORDER BY title;",
    columns: ["album", "artist"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Poster of Performing Artists",
    description: `A poster by the entrance lists every artist whose music the shop carries — each name appears once, alphabetical.\n\n${SCHEMA_NOTE_RECORDS}\n\nTask:\nReturn artist AS artist with duplicates collapsed, ordered by artist ascending.\n\n${RULES_SELECT_ONLY}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "DISTINCT Keyword",
    headerCode: RECORDS_SCHEMA,
    sourcecode: "SELECT DISTINCT artist AS artist FROM records ORDER BY artist;",
    columns: ["artist"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Taxed Price Tag Sheet",
    description: `Price tags must include 8% tax, rounded to cents so the tags look clean.\n\n${SCHEMA_NOTE_RECORDS}\n\nTask:\nReturn title AS title and ROUND(price * 1.08, 2) AS price_with_tax, ordered by id ascending.\n\n${RULES_SELECT_ONLY}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "SELECT Expressions",
    headerCode: RECORDS_SCHEMA,
    sourcecode: "SELECT title AS title, ROUND(price * 1.08, 2) AS price_with_tax FROM records ORDER BY id;",
    columns: ["title", "price_with_tax"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Inventory Audit Snapshot",
    description: `The auditor wants the complete raw table exactly as stored, in storage order, for a spot check.\n\n${SCHEMA_NOTE_RECORDS}\n\nTask:\nReturn all columns of all rows, ordered by id ascending.\n\n${RULES_SELECT_ONLY}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "SELECT and FROM Clauses",
    headerCode: RECORDS_SCHEMA,
    sourcecode: "SELECT * FROM records ORDER BY id;",
    columns: ["id", "title", "artist", "price", "stock", "released_year"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── medium · scenario (6) ────────────────────────────────────────── */
  {
    title: "Printable Catalog Lines",
    description: `The print shop needs one formatted line per record in this exact shape: "TITLE by ARTIST ($PRICE)" where PRICE has exactly two decimals.\n\n${SCHEMA_NOTE_RECORDS}\n\nTask:\nReturn one column, catalog_line, built with printf in the format '%s by %s ($%.2f)' from title, artist and price, ordered by id ascending.\n\n${RULES_SELECT_ONLY}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "SELECT Expressions",
    headerCode: RECORDS_SCHEMA,
    sourcecode: "SELECT printf('%s by %s ($%.2f)', title, artist, price) AS catalog_line FROM records ORDER BY id;",
    columns: ["catalog_line"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "||", whitelist: "printf",
  },
  {
    title: "Release Year Wall Timeline",
    description: `For the store timeline wall, each release year must appear exactly once, even when several albums share a year — sorted oldest to newest.\n\n${SCHEMA_NOTE_RECORDS}\n\nTask:\nReturn released_year AS release_year with duplicates collapsed, ordered ascending.\n\n${RULES_SELECT_ONLY}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "DISTINCT Keyword",
    headerCode: RECORDS_SCHEMA,
    sourcecode: "SELECT DISTINCT released_year AS release_year FROM records ORDER BY release_year;",
    columns: ["release_year"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "GROUP BY", whitelist: "DISTINCT",
  },
  {
    title: "Reseller Stock Report",
    description: `A reseller receives a report built through a table alias inv, with an explicit computed shelf value per record.\n\n${SCHEMA_NOTE_RECORDS}\n\nTask:\nUsing the table alias inv for records, return inv.title AS album and ROUND(inv.price * inv.stock, 2) AS shelf_value, ordered by shelf_value descending, tie-break by album ascending. Every column must be explicitly named — no SELECT *.\n\n${RULES_SELECT_ONLY}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Column and Table Aliases",
    headerCode: RECORDS_SCHEMA,
    sourcecode: "SELECT inv.title AS album, ROUND(inv.price * inv.stock, 2) AS shelf_value FROM records AS inv ORDER BY shelf_value DESC, album ASC;",
    columns: ["album", "shelf_value"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "SELECT *", whitelist: "inv",
  },
  {
    title: "Clearance Price List",
    description: `Clearance week marks everything down 10%. Finance wants the discounted price as its own named column, rounded to cents.\n\n${SCHEMA_NOTE_RECORDS}\n\nTask:\nReturn title AS title and ROUND(price * 0.9, 2) AS sale_price, ordered by sale_price ascending, tie-break by title ascending. List every output column explicitly — no star.\n\n${RULES_SELECT_ONLY}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "SELECT Expressions",
    headerCode: RECORDS_SCHEMA,
    sourcecode: "SELECT title AS title, ROUND(price * 0.9, 2) AS sale_price FROM records ORDER BY sale_price ASC, title ASC;",
    columns: ["title", "sale_price"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "SELECT *", whitelist: "ROUND",
  },
  {
    title: "Artist and Era Pairs",
    description: `The curator maps which artist released in which era: each (artist, year) combination once. Several artists appear twice because they released in different years.\n\n${SCHEMA_NOTE_RECORDS}\n\nTask:\nReturn DISTINCT pairs of artist AS artist and released_year AS year, ordered by artist ascending then year ascending.\n\n${RULES_SELECT_ONLY}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "DISTINCT Keyword",
    headerCode: RECORDS_SCHEMA,
    sourcecode: "SELECT DISTINCT artist AS artist, released_year AS year FROM records ORDER BY artist ASC, year ASC;",
    columns: ["artist", "year"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "GROUP BY", whitelist: "DISTINCT",
  },
  {
    title: "Alphabet Shelf Labels",
    description: `Shelf labels show the album title and how many copies sit on the shelf, queried through a table alias named shelf.\n\n${SCHEMA_NOTE_RECORDS}\n\nTask:\nUsing the table alias shelf, return shelf.title AS album and shelf.stock AS copies, ordered by copies descending, tie-break by album ascending.\n\n${RULES_SELECT_ONLY}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Column and Table Aliases",
    headerCode: RECORDS_SCHEMA,
    sourcecode: "SELECT shelf.title AS album, shelf.stock AS copies FROM records AS shelf ORDER BY copies DESC, album ASC;",
    columns: ["album", "copies"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "GROUP BY", whitelist: "shelf",
  },

  /* ── hard · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Shelf Value Ranking Board",
    description: `The manager pins a ranking board: for every record, how much money currently sits on the shelf in that title, ranked most valuable first. Records with zero stock rank last.\n\n${SCHEMA_NOTE_RECORDS}\n\nTask:\nReturn title AS title, artist AS artist, stock AS stock and ROUND(price * stock, 2) AS shelf_value, ordered by shelf_value descending, tie-break by title ascending. No WHERE clause is needed — include every record.\n\n${RULES_SELECT_ONLY}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "SELECT Expressions",
    headerCode: RECORDS_SCHEMA,
    sourcecode: "SELECT title AS title, artist AS artist, stock AS stock, ROUND(price * stock, 2) AS shelf_value FROM records ORDER BY shelf_value DESC, title ASC;",
    columns: ["title", "artist", "stock", "shelf_value"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "WHERE", whitelist: "ROUND, ORDER BY",
  },
  {
    title: "Pressing Plant Fact Sheet",
    description: `A fact sheet for the pressing plant combines several computed fields in one row per record: the album name in capitals, the decade it was released, and a formatted price string with exactly two decimals.\n\n${SCHEMA_NOTE_RECORDS}\n\nTask:\nReturn upper(title) AS album_caps, (released_year / 10) * 10 AS decade, and printf('%.2f USD', price) AS price_label, ordered by decade ascending, tie-break by album_caps ascending. Integer division applies (no float decade).\n\n${RULES_SELECT_ONLY}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Column and Table Aliases",
    headerCode: RECORDS_SCHEMA,
    sourcecode: "SELECT upper(title) AS album_caps, (released_year / 10) * 10 AS decade, printf('%.2f USD', price) AS price_label FROM records ORDER BY decade ASC, album_caps ASC;",
    columns: ["album_caps", "decade", "price_label"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "lower", whitelist: "upper, printf",
  },
  {
    title: "Prolific Artists Cross-Reference",
    description: `Quality control lists every (artist, title) pair for artists who have more than one distinct album in the catalog — their whole discography in the shop, nothing from one-album artists.\n\n${SCHEMA_NOTE_RECORDS}\n\nTask:\nReturn DISTINCT pairs artist AS artist and title AS title, but ONLY for artists that appear with more than one distinct title, ordered by artist ascending, then title ascending.\n\n${RULES_SELECT_ONLY}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "DISTINCT Keyword",
    headerCode: RECORDS_SCHEMA,
    sourcecode: `SELECT DISTINCT artist AS artist, title AS title FROM records
WHERE artist IN (
  SELECT artist FROM records GROUP BY artist HAVING COUNT(DISTINCT title) > 1
)
ORDER BY artist ASC, title ASC;`,
    columns: ["artist", "title"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "JOIN", whitelist: "DISTINCT, HAVING",
  },
  {
    title: "Priced Variants Matrix",
    description: `For the supplier portal, every record must be listed with its base price, a 5% bulk-buy price and a 12% retail margin price, all rounded to cents, sorted so the most expensive base price leads.\n\n${SCHEMA_NOTE_RECORDS}\n\nTask:\nReturn title AS title, price AS base_price, ROUND(price * 0.95, 2) AS bulk_price and ROUND(price * 1.12, 2) AS retail_price, ordered by base_price descending, tie-break by title ascending.\n\n${RULES_SELECT_ONLY}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Column Selection",
    headerCode: RECORDS_SCHEMA,
    sourcecode: "SELECT title AS title, price AS base_price, ROUND(price * 0.95, 2) AS bulk_price, ROUND(price * 1.12, 2) AS retail_price FROM records ORDER BY base_price DESC, title ASC;",
    columns: ["title", "base_price", "bulk_price", "retail_price"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "UPDATE", whitelist: "ROUND, ORDER BY",
  },
];

/* ── MCQs (20: 10 easy / 6 medium / 4 hard; >= 6 snippets; options spread) ── */
const mcqs: SqlMcqQuestionIn[] = [
  { title: "SELECT Star Meaning", description: "What does SELECT * FROM records; return?", difficulty: "easy", topic: TOPIC, subtopic: "SELECT and FROM Clauses",
    Option1: "Only the first column", Option2: "All rows but only text columns", Option3: "The table schema only", Option4: "All columns of all rows", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Clause Order Basics", description: "Which clause must come immediately after SELECT in a basic read query?", difficulty: "easy", topic: TOPIC, subtopic: "SELECT and FROM Clauses",
    Option1: "WHERE", Option2: "ORDER BY", Option3: "FROM", Option4: "GROUP BY", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Selecting Two Columns", description: "Which query returns only the columns title and artist from records?", difficulty: "easy", topic: TOPIC, subtopic: "Column Selection",
    Option1: "SELECT records FROM title, artist;", Option2: "SELECT * FROM records WHERE title, artist;", Option3: "GET title artist FROM records;", Option4: "SELECT title, artist FROM records;", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Purpose of AS", description: "In SELECT price AS usd_price, what does AS do?", difficulty: "easy", topic: TOPIC, subtopic: "Column and Table Aliases",
    Option1: "Filters rows by price", Option2: "Casts price to a string", Option3: "Renames the output column to usd_price", Option4: "Sorts by price", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "DISTINCT Effect", description: "What does SELECT DISTINCT artist FROM records; guarantee?", difficulty: "easy", topic: TOPIC, subtopic: "DISTINCT Keyword",
    Option1: "Rows sorted alphabetically", Option2: "Only artists with one album", Option3: "Artists without NULL names", Option4: "Each artist appears at most once", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Expression Header Names", description: "SELECT price * 1.08 FROM records; — what header does the result column get in SQLite?", difficulty: "easy", topic: TOPIC, subtopic: "SELECT Expressions",
    Option1: "price_with_tax", Option2: "price * 1.08 (the expression text)", Option3: "1.08", Option4: "value", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Alias Rule Check", description: "Which snippet correctly uses a table alias?", difficulty: "easy", topic: TOPIC, subtopic: "Column and Table Aliases",
    Option1: "SELECT records.title FROM r;", Option2: "SELECT title FROM records WHERE r;", Option3: "SELECT r.title FROM records AS r;", Option4: "SELECT r FROM records.title;", CorrectOption: 3, iscodesnippet: true, codesnippet: "SELECT r.title FROM records AS r;", snippetLang: "sql" },
  { title: "Expression Alias Output", description: "What is the header of the second column in the result of this snippet?", difficulty: "easy", topic: TOPIC, subtopic: "SELECT Expressions",
    Option1: "stock", Option2: "stock * 2", Option3: "doubled", Option4: "2", CorrectOption: 3, iscodesnippet: true, codesnippet: "SELECT title, stock * 2 AS doubled FROM records;", snippetLang: "sql" },
  { title: "DISTINCT Multi Column", description: "SELECT DISTINCT artist, released_year FROM records; removes duplicates based on what?", difficulty: "easy", topic: TOPIC, subtopic: "DISTINCT Keyword",
    Option1: "artist only", Option2: "released_year only", Option3: "The combination of both columns", Option4: "Neither — DISTINCT needs one column", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Semicolon Necessity", description: "In SQLite, is the trailing semicolon required after a single SELECT statement?", difficulty: "easy", topic: TOPIC, subtopic: "SELECT and FROM Clauses",
    Option1: "Yes, queries fail without it", Option2: "Only when using aliases", Option3: "No — it is optional for a single statement", Option4: "Only in INSERT statements", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Projection Best Practice", description: "Why prefer listing explicit columns over SELECT * in application code?", difficulty: "medium", topic: TOPIC, subtopic: "Column Selection",
    Option1: "SELECT * is slower to type", Option2: "Explicit columns survive schema changes and reduce data transfer", Option3: "SELECT * is not valid SQL", Option4: "Explicit columns automatically sort rows", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Alias Visibility Scope", description: "In SQLite, where can a column alias defined in the SELECT list be referenced?", difficulty: "medium", topic: TOPIC, subtopic: "Column and Table Aliases",
    Option1: "In the WHERE clause of the same query", Option2: "In the ORDER BY clause of the same query", Option3: "In any other table", Option4: "Only in INSERT statements", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "DISTINCT + ORDER BY Combo", description: "What does this query output?", difficulty: "medium", topic: TOPIC, subtopic: "DISTINCT Keyword",
    Option1: "Every artist once, by album count", Option2: "Artists repeated per album", Option3: "An error — DISTINCT and ORDER BY cannot combine", Option4: "Every artist once, alphabetical", CorrectOption: 4, iscodesnippet: true, codesnippet: "SELECT DISTINCT artist AS artist FROM records ORDER BY artist;", snippetLang: "sql" },
  { title: "Expression Header Fix", description: "The query below shows an ugly expression header. Which change gives the computed column the clean name price_with_tax?", difficulty: "medium", topic: TOPIC, subtopic: "SELECT Expressions",
    Option1: "Wrap the expression in quotes", Option2: "Add AS price_with_tax after the expression", Option3: "Rename the table column", Option4: "Use WHERE price_with_tax", CorrectOption: 2, iscodesnippet: true, codesnippet: "SELECT price * 1.08 FROM records;", snippetLang: "sql" },
  { title: "Two Table Aliases", description: "A query joins records AS a and records AS b. Which SELECT list is well-formed?", difficulty: "medium", topic: TOPIC, subtopic: "Column and Table Aliases",
    Option1: "SELECT a.title, b.title;", Option2: "SELECT records.title, records.title;", Option3: "SELECT a b.title;", Option4: "SELECT title, title;", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Star With Extras", description: "Is SELECT *, price FROM records; valid in SQLite?", difficulty: "medium", topic: TOPIC, subtopic: "SELECT and FROM Clauses",
    Option1: "Yes — star expands to all columns, then price is appended (duplicated)", Option2: "No — star must stand alone", Option3: "Yes but it sorts differently", Option4: "No — price must come first", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Duplicate Alias Headers", description: "SELECT price AS price, stock AS price FROM records; — what does SQLite render as the two column headers?", difficulty: "hard", topic: TOPIC, subtopic: "Column and Table Aliases",
    Option1: "Both render as price — SQLite allows duplicate output names", Option2: "An error — duplicate alias names are rejected", Option3: "The second column silently disappears", Option4: "The second alias is auto-renamed to price:1", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "DISTINCT With Original Column Sort", description: "SELECT DISTINCT released_year AS y FROM records ORDER BY released_year DESC; — why does this work despite aliasing to y?", difficulty: "hard", topic: TOPIC, subtopic: "DISTINCT Keyword",
    Option1: "ORDER BY resolves the underlying column name when it exists", Option2: "DISTINCT disables ORDER BY resolution", Option3: "SQLite rewrites aliases into WHERE clauses", Option4: "It fails — must use ORDER BY y", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Chained Multiplication", description: "For a record priced at exactly 20.0, what does this snippet return in the p column?", difficulty: "hard", topic: TOPIC, subtopic: "SELECT Expressions",
    Option1: "21.6", Option2: "21.08", Option3: "20.108", Option4: "22.0", CorrectOption: 1, iscodesnippet: true, codesnippet: "SELECT price * 1.08 * 1.0 AS p FROM records WHERE price = 20.0;", snippetLang: "sql" },
  { title: "Function Expression Header", description: "Without an alias, which header does SQLite show for this snippet's only column?", difficulty: "hard", topic: TOPIC, subtopic: "SELECT Expressions",
    Option1: "upper(title)", Option2: "title", Option3: "UPPER", Option4: "expr_1", CorrectOption: 1, iscodesnippet: true, codesnippet: "SELECT upper(title) FROM records;", snippetLang: "sql" },
];

await buildDay({ day: DAY, topic: TOPIC, subtopics: SUBTOPICS, codeQuestions, mcqs });
