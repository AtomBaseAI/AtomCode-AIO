/**
 * Day 6 — "Filtering with WHERE" — question builder.
 *
 * Domain: a city bike-rental fleet (bikes table) — comparison operators,
 * AND/OR/NOT, IN, BETWEEN, LIKE, IS NULL, plus ANY/ALL theory adapted to
 * SQLite's scalar subquery comparisons (SQLite has no ANY/ALL keywords).
 *
 * Run from /home/z/my-project:
 *   bun scripts/sql-programming/builders/build-day-06.ts
 */
import { buildDay, type SqlCodeQuestionIn, type SqlMcqQuestionIn } from "../lib.ts";

const DAY = 6;
const TOPIC = "Filtering with WHERE";
const SUBTOPICS = [
  "Comparison Operators",
  "Logical Operators AND OR NOT",
  "IN and NOT IN",
  "BETWEEN",
  "LIKE and ILIKE Patterns",
  "IS NULL and IS NOT NULL",
  "ANY and ALL",
];

/* Shared hidden setup: a city bike-rental fleet. */
const FLEET_SCHEMA = `CREATE TABLE bikes (
  id INTEGER PRIMARY KEY,
  model TEXT NOT NULL,
  station TEXT NOT NULL,
  hourly_rate REAL NOT NULL,
  rides_today INTEGER NOT NULL,
  maintenance_due TEXT,
  electric INTEGER NOT NULL DEFAULT 0
);
INSERT INTO bikes (model, station, hourly_rate, rides_today, maintenance_due, electric) VALUES
('City Glide', 'Riverside', 3.5, 14, '2024-07-01', 0),
('City Glide', 'Riverside', 3.5, 9, NULL, 0),
('Trail Blazer', 'Central Park', 5.0, 21, '2024-06-15', 0),
('Trail Blazer', 'Central Park', 5.0, 0, '2024-07-20', 0),
('Metro Mini', 'Union Sq', 2.5, 31, NULL, 0),
('Metro Mini', 'Union Sq', 2.5, 27, '2024-08-05', 0),
('Hill Climber', 'Harbor', 4.25, 6, NULL, 0),
('Speedster', 'Harbor', 6.75, 18, '2024-06-30', 1),
('Speedster', 'Central Park', 6.75, 12, NULL, 1),
('City Glide', 'Harbor', 3.5, 25, '2024-07-10', 0),
('Trail Blazer', 'Union Sq', 5.0, 8, '2024-07-25', 0),
('Metro Mini', 'Riverside', 2.5, 3, NULL, 1);`;

const RULES_WHERE =
  "Rules:\n- SQLite dialect. The schema and its data are pre-seeded automatically — do not include CREATE TABLE or INSERT statements in your answer.\n- Column names and order must match exactly (alias every output column).\n- Row order must match exactly (use ORDER BY as specified).";

const SCHEMA_NOTE_FLEET =
  "Schema:\n- bikes(id INTEGER PRIMARY KEY, model TEXT, station TEXT, hourly_rate REAL, rides_today INTEGER, maintenance_due TEXT, electric INTEGER 1/0)\n\nTwelve bikes are seeded across four stations (Riverside, Central Park, Union Sq, Harbor). Several bikes share the same hourly_rate; five bikes have no maintenance_due value yet (NULL); electric is 1 for e-bikes and 0 for pedal bikes; one bike has zero rides today.";

const codeQuestions: SqlCodeQuestionIn[] = [
  /* ── easy · basic (6) ─────────────────────────────────────────────── */
  {
    title: "Rides Above Twenty",
    description: `The fleet monitor wants a quick look at the busiest bikes. List the bikes that have already passed twenty rides today.\n\n${SCHEMA_NOTE_FLEET}\n\nTask:\nReturn id, model and rides_today for bikes with rides_today greater than 20, ordered by id ascending.\n\n${RULES_WHERE}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Comparison Operators",
    headerCode: FLEET_SCHEMA,
    sourcecode: "SELECT id, model, rides_today FROM bikes WHERE rides_today > 20 ORDER BY id;",
    columns: ["id", "model", "rides_today"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Cheap Bikes Only",
    description: `Budget shoppers ask for the low-cost half of the fleet. Bikes renting at 3.50 or less count as cheap.\n\n${SCHEMA_NOTE_FLEET}\n\nTask:\nReturn id, model and hourly_rate for bikes with hourly_rate less than or equal to 3.5, ordered by id ascending.\n\n${RULES_WHERE}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Comparison Operators",
    headerCode: FLEET_SCHEMA,
    sourcecode: "SELECT id, model, hourly_rate FROM bikes WHERE hourly_rate <= 3.5 ORDER BY id;",
    columns: ["id", "model", "hourly_rate"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Electric And Busy",
    description: `The e-bike team tracks which electric units are pulling their weight today.\n\n${SCHEMA_NOTE_FLEET}\n\nTask:\nReturn id, model and rides_today for bikes that are electric (electric = 1) AND have at least 10 rides today, ordered by id ascending.\n\n${RULES_WHERE}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Logical Operators AND OR NOT",
    headerCode: FLEET_SCHEMA,
    sourcecode: "SELECT id, model, rides_today FROM bikes WHERE electric = 1 AND rides_today >= 10 ORDER BY id;",
    columns: ["id", "model", "rides_today"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Harbor Or Riverside Fleet",
    description: `Two docks are being repainted this weekend; their bikes need a combined list.\n\n${SCHEMA_NOTE_FLEET}\n\nTask:\nReturn id, model and station for bikes stationed at Riverside OR Harbor, ordered by id ascending.\n\n${RULES_WHERE}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Logical Operators AND OR NOT",
    headerCode: FLEET_SCHEMA,
    sourcecode: "SELECT id, model, station FROM bikes WHERE station = 'Riverside' OR station = 'Harbor' ORDER BY id;",
    columns: ["id", "model", "station"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Selected Stations List",
    description: `A tourist map only covers two docks. Build the bike list for exactly those stations.\n\n${SCHEMA_NOTE_FLEET}\n\nTask:\nReturn id, model and station for bikes at Central Park or Union Sq, written with IN, ordered by id ascending.\n\n${RULES_WHERE}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "IN and NOT IN",
    headerCode: FLEET_SCHEMA,
    sourcecode: "SELECT id, model, station FROM bikes WHERE station IN ('Central Park', 'Union Sq') ORDER BY id;",
    columns: ["id", "model", "station"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Rates In The Middle Band",
    description: `Marketing defines the mid-band as rates from 3.0 up to and including 5.5. Pull that slice of the fleet.\n\n${SCHEMA_NOTE_FLEET}\n\nTask:\nReturn id, model and hourly_rate for bikes with hourly_rate BETWEEN 3.0 AND 5.5 (endpoints included), ordered by id ascending.\n\n${RULES_WHERE}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "BETWEEN",
    headerCode: FLEET_SCHEMA,
    sourcecode: "SELECT id, model, hourly_rate FROM bikes WHERE hourly_rate BETWEEN 3.0 AND 5.5 ORDER BY id;",
    columns: ["id", "model", "hourly_rate"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── easy · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Maintenance Board Missing Dates",
    description: `The ops board must flag every bike whose next service date has not been scheduled yet.\n\n${SCHEMA_NOTE_FLEET}\n\nTask:\nReturn id, model and station for bikes where maintenance_due is NULL, ordered by id ascending.\n\n${RULES_WHERE}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "IS NULL and IS NOT NULL",
    headerCode: FLEET_SCHEMA,
    sourcecode: "SELECT id, model, station FROM bikes WHERE maintenance_due IS NULL ORDER BY id;",
    columns: ["id", "model", "station"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Glide Model Search",
    description: `A visitor asks for every bike whose model name contains the word glide — capital or lowercase, they do not care.\n\n${SCHEMA_NOTE_FLEET}\n\nTask:\nReturn id, model and station for bikes whose model matches the pattern '%glide%' (SQLite LIKE is case-insensitive for ASCII), ordered by id ascending.\n\n${RULES_WHERE}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "LIKE and ILIKE Patterns",
    headerCode: FLEET_SCHEMA,
    sourcecode: "SELECT id, model, station FROM bikes WHERE model LIKE '%glide%' ORDER BY id;",
    columns: ["id", "model", "station"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Slow Day Bikes Report",
    description: `The kiosk app prints a report of idle bikes — anything under ten rides today — so staff can reshuffle them.\n\n${SCHEMA_NOTE_FLEET}\n\nTask:\nReturn id, model and rides_today for bikes with rides_today less than 10, ordered by id ascending.\n\n${RULES_WHERE}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Comparison Operators",
    headerCode: FLEET_SCHEMA,
    sourcecode: "SELECT id, model, rides_today FROM bikes WHERE rides_today < 10 ORDER BY id;",
    columns: ["id", "model", "rides_today"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Scheduled Service Ledger",
    description: `The workshop prints its service ledger: every bike that already HAS a maintenance date, soonest first.\n\n${SCHEMA_NOTE_FLEET}\n\nTask:\nReturn id, model and maintenance_due for bikes where maintenance_due is not NULL, ordered by maintenance_due ascending, tie-break by id ascending.\n\n${RULES_WHERE}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "IS NULL and IS NOT NULL",
    headerCode: FLEET_SCHEMA,
    sourcecode: "SELECT id, model, maintenance_due FROM bikes WHERE maintenance_due IS NOT NULL ORDER BY maintenance_due ASC, id ASC;",
    columns: ["id", "model", "maintenance_due"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── medium · scenario (6) ────────────────────────────────────────── */
  {
    title: "Stations Off The Watchlist",
    description: `Two docks (Riverside and Harbor) are on a maintenance watchlist. The city report needs every bike OUTSIDE those stations, and it must be written with NOT IN.\n\n${SCHEMA_NOTE_FLEET}\n\nTask:\nReturn id, model and station for bikes whose station is not in the list ('Riverside', 'Harbor'), using NOT IN, ordered by id ascending.\n\n${RULES_WHERE}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "IN and NOT IN",
    headerCode: FLEET_SCHEMA,
    sourcecode: "SELECT id, model, station FROM bikes WHERE station NOT IN ('Riverside', 'Harbor') ORDER BY id;",
    columns: ["id", "model", "station"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "<>", whitelist: "NOT IN",
  },
  {
    title: "Mid-Range Rate Catalog",
    description: `The printed catalog covers the mid-range only: rates from 3.0 through 5.5 inclusive. Use BETWEEN so the range reads naturally.\n\n${SCHEMA_NOTE_FLEET}\n\nTask:\nReturn id, model and hourly_rate for bikes with hourly_rate BETWEEN 3.0 AND 5.5, ordered by id ascending.\n\n${RULES_WHERE}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "BETWEEN",
    headerCode: FLEET_SCHEMA,
    sourcecode: "SELECT id, model, hourly_rate FROM bikes WHERE hourly_rate BETWEEN 3.0 AND 5.5 ORDER BY id;",
    columns: ["id", "model", "hourly_rate"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "NOT BETWEEN", whitelist: "BETWEEN",
  },
  {
    title: "Model Names Ending Pattern",
    description: `The signage team collects bikes whose model name ends with the letters er (Trail Blazer, Speedster, ...). Write it as a LIKE pattern.\n\n${SCHEMA_NOTE_FLEET}\n\nTask:\nReturn id, model and station for bikes whose model matches the pattern '%er', ordered by id ascending.\n\n${RULES_WHERE}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "LIKE and ILIKE Patterns",
    headerCode: FLEET_SCHEMA,
    sourcecode: "SELECT id, model, station FROM bikes WHERE model LIKE '%er' ORDER BY id;",
    columns: ["id", "model", "station"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "instr, substr", whitelist: "LIKE",
  },
  {
    title: "Null Maintenance Sweep",
    description: `Before the audit, the workshop sweeps up every bike that still lacks a service date and shows how hard each one worked today.\n\n${SCHEMA_NOTE_FLEET}\n\nTask:\nReturn id, model and rides_today for bikes where maintenance_due IS NULL, ordered by id ascending.\n\n${RULES_WHERE}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "IS NULL and IS NOT NULL",
    headerCode: FLEET_SCHEMA,
    sourcecode: "SELECT id, model, rides_today FROM bikes WHERE maintenance_due IS NULL ORDER BY id;",
    columns: ["id", "model", "rides_today"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "= NULL", whitelist: "IS NULL",
  },
  {
    title: "Priced Above The Fleet Average",
    description: `Pricing review: which bikes rent for more than the fleet-wide average hourly rate? Compute the average inline with a scalar subquery (SQLite has no ANY/ALL syntax — a comparison against a subquery is the idiomatic form).\n\n${SCHEMA_NOTE_FLEET}\n\nTask:\nReturn id, model and hourly_rate for bikes whose hourly_rate is greater than (SELECT AVG(hourly_rate) FROM bikes), ordered by hourly_rate descending, tie-break by id ascending.\n\n${RULES_WHERE}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "ANY and ALL",
    headerCode: FLEET_SCHEMA,
    sourcecode: "SELECT id, model, hourly_rate FROM bikes WHERE hourly_rate > (SELECT AVG(hourly_rate) FROM bikes) ORDER BY hourly_rate DESC, id ASC;",
    columns: ["id", "model", "hourly_rate"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "GROUP BY", whitelist: "AVG",
  },
  {
    title: "Pedal Units Only",
    description: `The pedal-bike maintenance crew wants the non-electric fleet listed — express the filter with NOT instead of comparing electric to 0 directly.\n\n${SCHEMA_NOTE_FLEET}\n\nTask:\nReturn id, model and electric for bikes where NOT (electric = 1), ordered by id ascending.\n\n${RULES_WHERE}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Logical Operators AND OR NOT",
    headerCode: FLEET_SCHEMA,
    sourcecode: "SELECT id, model, electric FROM bikes WHERE NOT (electric = 1) ORDER BY id;",
    columns: ["id", "model", "electric"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "!=", whitelist: "NOT",
  },

  /* ── hard · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Service Window Triage",
    description: `The ops manager triages bikes for the workshop: a bike needs attention if its maintenance_due falls in the window 2024-06-15 through 2024-07-15 (inclusive) OR is missing entirely — but only if it was ridden at least 5 times today (idle bikes wait another week).\n\n${SCHEMA_NOTE_FLEET}\n\nTask:\nReturn id, model and maintenance_due for bikes matching ((maintenance_due BETWEEN '2024-06-15' AND '2024-07-15') OR maintenance_due IS NULL) AND rides_today >= 5, ordered by id ascending.\n\n${RULES_WHERE}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "BETWEEN",
    headerCode: FLEET_SCHEMA,
    sourcecode: "SELECT id, model, maintenance_due FROM bikes WHERE (maintenance_due BETWEEN '2024-06-15' AND '2024-07-15' OR maintenance_due IS NULL) AND rides_today >= 5 ORDER BY id;",
    columns: ["id", "model", "maintenance_due"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "UNION", whitelist: "IS NULL, BETWEEN",
  },
  {
    title: "Above Every Union Sq Rate",
    description: `Union Sq prices its docks aggressively. Find every bike whose hourly rate is greater than ALL Union Sq rates — expressed in SQLite as a comparison against the maximum Union Sq rate in a scalar subquery.\n\n${SCHEMA_NOTE_FLEET}\n\nTask:\nReturn id, model, station and hourly_rate for bikes whose hourly_rate is greater than (SELECT MAX(hourly_rate) FROM bikes WHERE station = 'Union Sq'), ordered by id ascending.\n\n${RULES_WHERE}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "ANY and ALL",
    headerCode: FLEET_SCHEMA,
    sourcecode: "SELECT id, model, station, hourly_rate FROM bikes WHERE hourly_rate > (SELECT MAX(hourly_rate) FROM bikes WHERE station = 'Union Sq') ORDER BY id;",
    columns: ["id", "model", "station", "hourly_rate"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "JOIN", whitelist: "MAX",
  },
  {
    title: "Riverside And Harbor Pattern Sweep",
    description: `A promo scan sweeps the Riverside and Harbor docks for every bike whose model name contains glide OR whose maintenance date is still unscheduled.\n\n${SCHEMA_NOTE_FLEET}\n\nTask:\nReturn id, model, station and maintenance_due for bikes where (station is Riverside OR Harbor) AND (model matches '%glide%' OR maintenance_due IS NULL), ordered by station ascending, tie-break by id ascending.\n\n${RULES_WHERE}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "LIKE and ILIKE Patterns",
    headerCode: FLEET_SCHEMA,
    sourcecode: "SELECT id, model, station, maintenance_due FROM bikes WHERE (station = 'Riverside' OR station = 'Harbor') AND (model LIKE '%glide%' OR maintenance_due IS NULL) ORDER BY station ASC, id ASC;",
    columns: ["id", "model", "station", "maintenance_due"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "BETWEEN", whitelist: "LIKE, IS NULL",
  },
  {
    title: "Premium Idle Watchlist",
    description: `The rebalancing crew flags two kinds of idle bikes: electric units with fewer than 10 rides today, and pedal bikes that got zero rides. Write both branches with explicit AND/OR logic.\n\n${SCHEMA_NOTE_FLEET}\n\nTask:\nReturn id, model, station, rides_today and electric for bikes where (electric = 1 AND rides_today < 10) OR (electric = 0 AND rides_today = 0), ordered by rides_today ascending, tie-break by id ascending.\n\n${RULES_WHERE}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Logical Operators AND OR NOT",
    headerCode: FLEET_SCHEMA,
    sourcecode: "SELECT id, model, station, rides_today, electric FROM bikes WHERE (electric = 1 AND rides_today < 10) OR (electric = 0 AND rides_today = 0) ORDER BY rides_today ASC, id ASC;",
    columns: ["id", "model", "station", "rides_today", "electric"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "IN", whitelist: "rides_today, electric",
  },
];

/* ── MCQs (20: 10 easy / 6 medium / 4 hard; 6 snippets; 5/5/5/5 spread) ── */
const mcqs: SqlMcqQuestionIn[] = [
  { title: "WHERE Clause Role", description: "What does the WHERE clause do in a SELECT statement?", difficulty: "easy", topic: TOPIC, subtopic: "Comparison Operators",
    Option1: "Sorts the result rows", Option2: "Filters which rows are returned", Option3: "Removes duplicate columns from the result", Option4: "Renames the table", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Not Equal Operator", description: "Which operator means not equal in SQLite?", difficulty: "easy", topic: TOPIC, subtopic: "Comparison Operators",
    Option1: "<>", Option2: "=!", Option3: "~=", Option4: "->", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "AND Requires Both", description: "WHERE electric = 1 AND rides_today > 10 — which bikes are returned?", difficulty: "easy", topic: TOPIC, subtopic: "Logical Operators AND OR NOT",
    Option1: "Bikes matching at least one condition", Option2: "Bikes matching both conditions", Option3: "Bikes matching neither condition", Option4: "All bikes that have any rides", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "OR Broadens The Net", description: "station = 'Riverside' OR station = 'Harbor' — which rows are returned?", difficulty: "easy", topic: TOPIC, subtopic: "Logical Operators AND OR NOT",
    Option1: "Rows matching both conditions", Option2: "Rows where station is NULL", Option3: "Rows matching at least one condition", Option4: "Rows combined from two tables", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "IN Is A Shorthand", description: "station IN ('Riverside', 'Harbor') is equivalent to which condition?", difficulty: "easy", topic: TOPIC, subtopic: "IN and NOT IN",
    Option1: "station = 'Riverside' AND station = 'Harbor'", Option2: "station LIKE 'Riverside%'", Option3: "station BETWEEN 'Riverside' AND 'Harbor'", Option4: "station = 'Riverside' OR station = 'Harbor'", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "BETWEEN Includes Endpoints", description: "hourly_rate BETWEEN 3.0 AND 5.0 — are bikes priced exactly 3.0 or 5.0 included?", difficulty: "easy", topic: TOPIC, subtopic: "BETWEEN",
    Option1: "Yes — both endpoints are inclusive", Option2: "No — both endpoints are excluded", Option3: "Only the lower endpoint is included", Option4: "Only the upper endpoint is included", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Percent Wildcard Meaning", description: "In a LIKE pattern, what does % match?", difficulty: "easy", topic: TOPIC, subtopic: "LIKE and ILIKE Patterns",
    Option1: "Exactly one character", Option2: "Zero or more characters", Option3: "A literal percent sign only", Option4: "Digits only", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Underscore Wildcard Meaning", description: "In a LIKE pattern, what does _ match?", difficulty: "easy", topic: TOPIC, subtopic: "LIKE and ILIKE Patterns",
    Option1: "Zero or more characters", Option2: "A literal underscore only", Option3: "Exactly one character", Option4: "Any run of whitespace", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Finding Missing Values", description: "Which condition correctly finds bikes whose maintenance_due has no value?", difficulty: "easy", topic: TOPIC, subtopic: "IS NULL and IS NOT NULL",
    Option1: "maintenance_due = NULL", Option2: "maintenance_due == 'NULL'", Option3: "maintenance_due IS NULL", Option4: "maintenance_due LIKE NULL", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Comparing Against NULL", description: "For a row where rides_today is NULL, what does the condition rides_today = 0 evaluate to?", difficulty: "easy", topic: TOPIC, subtopic: "IS NULL and IS NOT NULL",
    Option1: "TRUE", Option2: "FALSE", Option3: "NULL — unknown, so the row is filtered out", Option4: "A type error", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "AND Binds Tighter Than OR", description: "How does SQLite parenthesize the WHERE condition in this snippet?", difficulty: "medium", topic: TOPIC, subtopic: "Logical Operators AND OR NOT",
    Option1: "(electric = 0 OR electric = 1) AND rides_today > 20", Option2: "electric = 0 OR (electric = 1 AND rides_today > 20)", Option3: "SQLite rejects it — parentheses are mandatory", Option4: "(electric = 0 OR electric = 1) OR rides_today > 20", CorrectOption: 2, iscodesnippet: true, codesnippet: "SELECT id, model FROM bikes\nWHERE electric = 0 OR electric = 1 AND rides_today > 20;", snippetLang: "sql" },
  { title: "IN Meets NULL", description: "The snippet filters the bikes table. Which rows come back?", difficulty: "medium", topic: TOPIC, subtopic: "IN and NOT IN",
    Option1: "All bikes except Riverside ones", Option2: "Riverside bikes and NULL-station bikes", Option3: "No rows — the NULL poisons the whole list", Option4: "Only bikes whose station is 'Riverside'", CorrectOption: 4, iscodesnippet: true, codesnippet: "SELECT id, model FROM bikes\nWHERE station IN ('Riverside', NULL);", snippetLang: "sql" },
  { title: "LIKE Is Case-Blind For ASCII", description: "What does the snippet return?", difficulty: "medium", topic: TOPIC, subtopic: "LIKE and ILIKE Patterns",
    Option1: "Only rows where model contains lowercase glide", Option2: "Rows containing glide case-insensitively (ASCII letters), so 'City Glide' matches", Option3: "Nothing — LIKE is case-sensitive in SQLite", Option4: "Only models that start with glide", CorrectOption: 2, iscodesnippet: true, codesnippet: "SELECT id, model FROM bikes WHERE model LIKE '%glide%';", snippetLang: "sql" },
  { title: "BETWEEN On Text Dates", description: "Why does the snippet's date filter work correctly?", difficulty: "medium", topic: TOPIC, subtopic: "BETWEEN",
    Option1: "SQLite silently converts the text to real date values", Option2: "BETWEEN casts both sides to numbers before comparing", Option3: "ISO-8601 dates (YYYY-MM-DD) compare correctly as plain text", Option4: "It does not work — dates always need the date() function", CorrectOption: 3, iscodesnippet: true, codesnippet: "SELECT id, model FROM bikes\nWHERE maintenance_due BETWEEN '2024-06-01' AND '2024-06-30';", snippetLang: "sql" },
  { title: "De Morgan Reading", description: "NOT (a AND b) is logically equivalent to which condition?", difficulty: "medium", topic: TOPIC, subtopic: "Logical Operators AND OR NOT",
    Option1: "(NOT a) AND (NOT b)", Option2: "a OR b", Option3: "NOT a AND b", Option4: "(NOT a) OR (NOT b)", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Three Valued AND", description: "In SQL's three-valued logic, FALSE AND NULL evaluates to what?", difficulty: "medium", topic: TOPIC, subtopic: "IS NULL and IS NOT NULL",
    Option1: "FALSE — one FALSE is enough", Option2: "TRUE", Option3: "NULL", Option4: "It depends on the column collation", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "ALL Translates To Maximum", description: "In standard SQL, x > ALL (list of rates) holds only when x beats every item. Comparing x against which single value is equivalent?", difficulty: "hard", topic: TOPIC, subtopic: "ANY and ALL",
    Option1: "The minimum value in the list", Option2: "The average of the list", Option3: "The number of items in the list", Option4: "The maximum value in the list", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "ANY Translates To Minimum", description: "In standard SQL, x > ANY (list) holds when x beats at least one item. Which statement restates it?", difficulty: "hard", topic: TOPIC, subtopic: "ANY and ALL",
    Option1: "x is greater than at least one value in the list", Option2: "x is greater than every value in the list", Option3: "x equals the maximum of the list", Option4: "x is below the minimum of the list", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "NULL Poisons NOT IN", description: "The bikes table has some rows and the snippet runs fine. What comes back?", difficulty: "hard", topic: TOPIC, subtopic: "IN and NOT IN",
    Option1: "No rows — the comparison is never TRUE when the list contains NULL", Option2: "All bikes", Option3: "Only bikes at Riverside", Option4: "Only bikes with a NULL station", CorrectOption: 1, iscodesnippet: true, codesnippet: "SELECT id, model FROM bikes\nWHERE station NOT IN ('Riverside', NULL);", snippetLang: "sql" },
  { title: "NOT Flips The Whole Group", description: "NOT (electric = 1 OR rides_today > 20) is equivalent to which simpler condition?", difficulty: "hard", topic: TOPIC, subtopic: "Logical Operators AND OR NOT",
    Option1: "electric = 0 OR rides_today <= 20", Option2: "electric = 1 AND rides_today > 20", Option3: "electric <> 1 OR rides_today > 20", Option4: "electric = 0 AND rides_today <= 20", CorrectOption: 4, iscodesnippet: true, codesnippet: "SELECT id, model FROM bikes\nWHERE NOT (electric = 1 OR rides_today > 20);", snippetLang: "sql" },
];

await buildDay({ day: DAY, topic: TOPIC, subtopics: SUBTOPICS, codeQuestions, mcqs });
