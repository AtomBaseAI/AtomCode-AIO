/**
 * Day 12 — "Subqueries" — real-estate agency domain.
 *
 * Hidden headerCode seeds a real-estate agency: 7 agents across 4 regions
 * (Colin is sold-heavy with 4 of 5 listings sold; Elif has NO properties)
 * and 14 properties. Solutions practice scalar subqueries, correlated
 * subqueries, EXISTS / NOT EXISTS, IN / NOT IN, and subqueries in
 * SELECT / WHERE / FROM (derived tables). SQLite has no ANY/ALL keywords —
 * "all/any" semantics are expressed with MAX/MIN or NOT IN.
 *
 * Run from /home/z/my-project:
 *   bun scripts/sql-programming/builders/build-day-12.ts
 */
import { buildDay, type SqlCodeQuestionIn, type SqlMcqQuestionIn } from "../lib.ts";

const DAY = 12;
const TOPIC = "Subqueries";
const SUBTOPICS = [
  "Scalar Subqueries",
  "Correlated Subqueries",
  "EXISTS and NOT EXISTS",
  "IN ANY ALL Subqueries",
  "Subqueries in SELECT WHERE FROM",
];

/* Shared hidden setup: a real-estate agency. */
const ESTATE_SCHEMA = `CREATE TABLE agents (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  rating REAL NOT NULL
);
INSERT INTO agents (name, region, rating) VALUES
('Nadia Rahman', 'North', 4.8),
('Colin Petrov', 'North', 4.2),
('Bea Lindqvist', 'South', 4.5),
('Omar Haddad', 'South', 3.9),
('Priya Nair', 'East', 4.7),
('Jonas Weber', 'East', 4.1),
('Elif Kaya', 'West', 4.0);

CREATE TABLE properties (
  id INTEGER PRIMARY KEY,
  agent_id INTEGER NOT NULL,
  city TEXT NOT NULL,
  price INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  status TEXT NOT NULL
);
INSERT INTO properties (agent_id, city, price, bedrooms, status) VALUES
(1, 'Northgate', 320000, 3, 'sold'),
(1, 'Northgate', 275000, 2, 'available'),
(2, 'Northgate', 410000, 4, 'sold'),
(2, 'Riverton', 390000, 3, 'sold'),
(2, 'Riverton', 355000, 2, 'sold'),
(2, 'Northgate', 298000, 2, 'available'),
(3, 'Southbay', 512000, 5, 'available'),
(3, 'Southbay', 468000, 4, 'sold'),
(4, 'Southbay', 289000, 2, 'available'),
(6, 'Westhill', 240000, 1, 'sold'),
(5, 'Eastmere', 365000, 3, 'available'),
(5, 'Eastmere', 610000, 5, 'sold'),
(6, 'Eastmere', 415000, 4, 'available'),
(6, 'Riverton', 330000, 3, 'sold');`;

const RULES_SELECT_ONLY =
  "Rules:\n- SQLite dialect. The schema and its data are pre-seeded automatically — do not include CREATE TABLE or INSERT statements in your answer.\n- Column names and order must match exactly (alias every output column).\n- Row order must match exactly (use ORDER BY as specified).";

const SCHEMA_NOTE_ESTATE =
  "Schema:\n- agents(id INTEGER PRIMARY KEY, name TEXT, region TEXT, rating REAL)\n- properties(id INTEGER PRIMARY KEY, agent_id INTEGER -> agents.id, city TEXT, price INTEGER, bedrooms INTEGER, status TEXT)\n\nSeven agents work the North, South, East and West regions; ratings range from 3.9 to 4.8. Fourteen properties are listed with prices in whole dollars; status is 'available' or 'sold'. Agent Elif Kaya has no properties; Colin Petrov is sold-heavy (4 of his 5 listings sold); Omar Haddad holds one available listing only. Cities: Northgate, Riverton, Southbay, Westhill, Eastmere.";

function makeDesc(story: string, task: string): string {
  return `${story}\n\n${SCHEMA_NOTE_ESTATE}\n\nTask:\n${task}\n\n${RULES_SELECT_ONLY}`;
}

const codeQuestions: SqlCodeQuestionIn[] = [
  /* ── easy · basic (6) ─────────────────────────────────────────────── */
  {
    title: "Above The Market Average",
    description: makeDesc(
      `A scalar subquery in WHERE: the analyst wants every listing priced above the overall market average.`,
      `Return p.id AS property_id, p.city AS city and p.price AS price from properties where price is greater than (SELECT AVG(price) FROM properties), ordered by price descending, then property_id ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Scalar Subqueries",
    headerCode: ESTATE_SCHEMA,
    sourcecode: "SELECT p.id AS property_id, p.city AS city, p.price AS price FROM properties p WHERE p.price > (SELECT AVG(price) FROM properties) ORDER BY p.price DESC, p.id;",
    columns: ["property_id", "city", "price"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Price Against The Market",
    description: makeDesc(
      `A scalar subquery in the SELECT list: show each listing's price gap versus the overall market average.`,
      `Return p.id AS property_id and ROUND(p.price - (SELECT AVG(price) FROM properties), 2) AS vs_market_avg, ordered by property_id ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Subqueries in SELECT WHERE FROM",
    headerCode: ESTATE_SCHEMA,
    sourcecode: "SELECT p.id AS property_id, ROUND(p.price - (SELECT AVG(price) FROM properties), 2) AS vs_market_avg FROM properties p ORDER BY p.id;",
    columns: ["property_id", "vs_market_avg"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Listings Per City Counter",
    description: makeDesc(
      `A correlated subquery in the SELECT list: count how many listings sit in each property's own city.`,
      `Return p1.id AS property_id, p1.city AS city and (SELECT COUNT(*) FROM properties p2 WHERE p2.city = p1.city) AS city_listings from properties p1, ordered by property_id ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Correlated Subqueries",
    headerCode: ESTATE_SCHEMA,
    sourcecode: "SELECT p1.id AS property_id, p1.city AS city, (SELECT COUNT(*) FROM properties p2 WHERE p2.city = p1.city) AS city_listings FROM properties p1 ORDER BY p1.id;",
    columns: ["property_id", "city", "city_listings"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Agents With Listings",
    description: makeDesc(
      `EXISTS practice: list the agents who currently hold at least one property.`,
      `Return a.name AS agent_name and a.region AS region from agents a where EXISTS (SELECT 1 FROM properties p WHERE p.agent_id = a.id), ordered by agent id ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "EXISTS and NOT EXISTS",
    headerCode: ESTATE_SCHEMA,
    sourcecode: "SELECT a.name AS agent_name, a.region AS region FROM agents a WHERE EXISTS (SELECT 1 FROM properties p WHERE p.agent_id = a.id) ORDER BY a.id;",
    columns: ["agent_name", "region"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "North Region Portfolio",
    description: makeDesc(
      `IN with a subquery: show every listing handled by agents from the North region.`,
      `Return p.id AS property_id, p.city AS city and p.price AS price from properties p where p.agent_id IN (SELECT id FROM agents WHERE region = 'North'), ordered by property_id ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "IN ANY ALL Subqueries",
    headerCode: ESTATE_SCHEMA,
    sourcecode: "SELECT p.id AS property_id, p.city AS city, p.price AS price FROM properties p WHERE p.agent_id IN (SELECT id FROM agents WHERE region = 'North') ORDER BY p.id;",
    columns: ["property_id", "city", "price"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "City Average Price Table",
    description: makeDesc(
      `A subquery in FROM (derived table): compute the average price per city in an inner query and select from it.`,
      `Return d.city AS city and ROUND(d.city_avg, 2) AS city_avg FROM (SELECT city, AVG(price) AS city_avg FROM properties GROUP BY city) d, ordered by city ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Subqueries in SELECT WHERE FROM",
    headerCode: ESTATE_SCHEMA,
    sourcecode: "SELECT d.city AS city, ROUND(d.city_avg, 2) AS city_avg FROM (SELECT city, AVG(price) AS city_avg FROM properties GROUP BY city) d ORDER BY d.city;",
    columns: ["city", "city_avg"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── easy · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Priciest Listing In Town",
    description: makeDesc(
      `A buyer asks for the single most expensive listing on the books. A scalar subquery with MAX finds its price.`,
      `Return p.id AS property_id, p.city AS city and p.price AS price from properties p where p.price equals (SELECT MAX(price) FROM properties), ordered by property_id ascending.`
    ),
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Scalar Subqueries",
    headerCode: ESTATE_SCHEMA,
    sourcecode: "SELECT p.id AS property_id, p.city AS city, p.price AS price FROM properties p WHERE p.price = (SELECT MAX(price) FROM properties) ORDER BY p.id;",
    columns: ["property_id", "city", "price"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Above The Neighbourhood Average",
    description: makeDesc(
      `Clients pay a premium in hot neighbourhoods. Find listings priced above their own city's average — a correlated comparison.`,
      `Return p.id AS property_id, p.city AS city and p.price AS price from properties p where p.price > (SELECT AVG(p2.price) FROM properties p2 WHERE p2.city = p.city), ordered by property_id ascending.`
    ),
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Correlated Subqueries",
    headerCode: ESTATE_SCHEMA,
    sourcecode: "SELECT p.id AS property_id, p.city AS city, p.price AS price FROM properties p WHERE p.price > (SELECT AVG(p2.price) FROM properties p2 WHERE p2.city = p.city) ORDER BY p.id;",
    columns: ["property_id", "city", "price"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Agents Holding Premium Listings",
    description: makeDesc(
      `The office phone list should show agents who currently hold an available listing above 300000 dollars.`,
      `Return a.name AS agent_name and a.region AS region from agents a where EXISTS (SELECT 1 FROM properties p WHERE p.agent_id = a.id AND p.status = 'available' AND p.price > 300000), ordered by agent id ascending.`
    ),
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "EXISTS and NOT EXISTS",
    headerCode: ESTATE_SCHEMA,
    sourcecode: "SELECT a.name AS agent_name, a.region AS region FROM agents a WHERE EXISTS (SELECT 1 FROM properties p WHERE p.agent_id = a.id AND p.status = 'available' AND p.price > 300000) ORDER BY a.id;",
    columns: ["agent_name", "region"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Premium Agent Listings",
    description: makeDesc(
      `Marketing targets listings handled by the agency's highest-rated staff (rating 4.5 or better).`,
      `Return p.id AS property_id, p.city AS city and p.price AS price from properties p where p.agent_id IN (SELECT id FROM agents WHERE rating >= 4.5), ordered by property_id ascending.`
    ),
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "IN ANY ALL Subqueries",
    headerCode: ESTATE_SCHEMA,
    sourcecode: "SELECT p.id AS property_id, p.city AS city, p.price AS price FROM properties p WHERE p.agent_id IN (SELECT id FROM agents WHERE rating >= 4.5) ORDER BY p.id;",
    columns: ["property_id", "city", "price"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── medium · scenario (6) ────────────────────────────────────────── */
  {
    title: "Top Tier Agents By Rating",
    description: makeDesc(
      `The manager reviews agents whose rating beats the agency-wide average rating. No joins allowed — pure subquery work.`,
      `Return a.name AS agent_name, a.region AS region and ROUND(a.rating, 2) AS rating from agents a where a.rating > (SELECT AVG(rating) FROM agents), ordered by rating descending, then agent name ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Scalar Subqueries",
    headerCode: ESTATE_SCHEMA,
    sourcecode: "SELECT a.name AS agent_name, a.region AS region, ROUND(a.rating, 2) AS rating FROM agents a WHERE a.rating > (SELECT AVG(rating) FROM agents) ORDER BY a.rating DESC, a.name;",
    columns: ["agent_name", "region", "rating"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "JOIN, GROUP BY", whitelist: "AVG(rating)",
  },
  {
    title: "Beating Your Own Agent Average",
    description: makeDesc(
      `Which of Colin's or Priya's listings outperform that same agent's own average price? The subquery must correlate on the agent, not the city.`,
      `Return p.id AS property_id, p.city AS city and p.price AS price from properties p where p.price > (SELECT AVG(p2.price) FROM properties p2 WHERE p2.agent_id = p.agent_id), ordered by property_id ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Correlated Subqueries",
    headerCode: ESTATE_SCHEMA,
    sourcecode: "SELECT p.id AS property_id, p.city AS city, p.price AS price FROM properties p WHERE p.price > (SELECT AVG(p2.price) FROM properties p2 WHERE p2.agent_id = p.agent_id) ORDER BY p.id;",
    columns: ["property_id", "city", "price"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "JOIN, GROUP BY", whitelist: "AVG(p2.price)",
  },
  {
    title: "Big Ticket Closers",
    description: makeDesc(
      `Reward the closers: agents who have SOLD any listing above 350000 dollars, found with EXISTS.`,
      `Return a.name AS agent_name and a.region AS region from agents a where EXISTS (SELECT 1 FROM properties p WHERE p.agent_id = a.id AND p.status = 'sold' AND p.price > 350000), ordered by agent id ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "EXISTS and NOT EXISTS",
    headerCode: ESTATE_SCHEMA,
    sourcecode: "SELECT a.name AS agent_name, a.region AS region FROM agents a WHERE EXISTS (SELECT 1 FROM properties p WHERE p.agent_id = a.id AND p.status = 'sold' AND p.price > 350000) ORDER BY a.id;",
    columns: ["agent_name", "region"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "JOIN, IN (", whitelist: "EXISTS",
  },
  {
    title: "Nothing Left In Riverton",
    description: makeDesc(
      `A Riverton buyer wants fresh contacts. List the agents who have NO listing in Riverton — use NOT IN with a subquery.`,
      `Return a.name AS agent_name and a.region AS region from agents a where a.id NOT IN (SELECT agent_id FROM properties WHERE city = 'Riverton'), ordered by agent id ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "IN ANY ALL Subqueries",
    headerCode: ESTATE_SCHEMA,
    sourcecode: "SELECT a.name AS agent_name, a.region AS region FROM agents a WHERE a.id NOT IN (SELECT agent_id FROM properties WHERE city = 'Riverton') ORDER BY a.id;",
    columns: ["agent_name", "region"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "EXISTS, JOIN", whitelist: "NOT IN",
  },
  {
    title: "Top Five Price Club",
    description: makeDesc(
      `The agency's club of five: agents who hold at least one of the five most expensive listings on the books.`,
      `Return a.name AS agent_name and a.region AS region from agents a where a.id IN (SELECT agent_id FROM properties ORDER BY price DESC LIMIT 5), ordered by agent id ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "IN ANY ALL Subqueries",
    headerCode: ESTATE_SCHEMA,
    sourcecode: "SELECT a.name AS agent_name, a.region AS region FROM agents a WHERE a.id IN (SELECT agent_id FROM properties ORDER BY price DESC LIMIT 5) ORDER BY a.id;",
    columns: ["agent_name", "region"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "EXISTS, JOIN", whitelist: "IN (SELECT",
  },
  {
    title: "Cities Above The Market",
    description: makeDesc(
      `Which whole neighbourhoods outprice the agency-wide market? Combine a derived table (city averages) with a scalar subquery comparison.`,
      `Return d.city AS city and ROUND(d.city_avg, 2) AS city_avg FROM (SELECT city, AVG(price) AS city_avg FROM properties GROUP BY city) d where d.city_avg > (SELECT AVG(price) FROM properties), ordered by city ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Subqueries in SELECT WHERE FROM",
    headerCode: ESTATE_SCHEMA,
    sourcecode: "SELECT d.city AS city, ROUND(d.city_avg, 2) AS city_avg FROM (SELECT city, AVG(price) AS city_avg FROM properties GROUP BY city) d WHERE d.city_avg > (SELECT AVG(price) FROM properties) ORDER BY d.city;",
    columns: ["city", "city_avg"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "JOIN, WITH", whitelist: "AVG(price)",
  },

  /* ── hard · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Second Highest By City",
    description: makeDesc(
      `The valuation team studies runner-up prices: listings whose price is exactly the second-highest price within their city. Nested scalar subqueries do the job.`,
      `Return p.id AS property_id, p.city AS city and p.price AS price from properties p where p.price = (SELECT MAX(price) FROM properties p2 WHERE p2.city = p.city AND p2.price < (SELECT MAX(price) FROM properties p3 WHERE p3.city = p.city)), ordered by property_id ascending.`
    ),
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Scalar Subqueries",
    headerCode: ESTATE_SCHEMA,
    sourcecode: "SELECT p.id AS property_id, p.city AS city, p.price AS price FROM properties p WHERE p.price = (SELECT MAX(price) FROM properties p2 WHERE p2.city = p.city AND p2.price < (SELECT MAX(price) FROM properties p3 WHERE p3.city = p.city)) ORDER BY p.id;",
    columns: ["property_id", "city", "price"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "JOIN, GROUP BY", whitelist: "MAX(price)",
  },
  {
    title: "Cheapest Sold Per City",
    description: makeDesc(
      `Appraisers benchmark entry-level sales: the cheapest SOLD listing in each city, via a correlated MIN subquery. Westhill's only listing is sold and is therefore its city's answer.`,
      `Return p.id AS property_id, p.city AS city and p.price AS price from properties p where p.status = 'sold' and p.price = (SELECT MIN(price) FROM properties p2 WHERE p2.city = p.city AND p2.status = 'sold'), ordered by property_id ascending.`
    ),
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Correlated Subqueries",
    headerCode: ESTATE_SCHEMA,
    sourcecode: "SELECT p.id AS property_id, p.city AS city, p.price AS price FROM properties p WHERE p.status = 'sold' AND p.price = (SELECT MIN(price) FROM properties p2 WHERE p2.city = p.city AND p2.status = 'sold') ORDER BY p.id;",
    columns: ["property_id", "city", "price"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "JOIN, GROUP BY", whitelist: "MIN(price)",
  },
  {
    title: "Cities With Both Statuses",
    description: makeDesc(
      `A mixed market is a healthy market. Find the cities that contain at least one available listing AND at least one sold listing — using two EXISTS checks, no GROUP BY.`,
      `Return DISTINCT p1.city AS city from properties p1 where EXISTS (SELECT 1 FROM properties p2 WHERE p2.city = p1.city AND p2.status = 'available') and EXISTS (SELECT 1 FROM properties p3 WHERE p3.city = p1.city AND p3.status = 'sold'), ordered by city ascending.`
    ),
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "EXISTS and NOT EXISTS",
    headerCode: ESTATE_SCHEMA,
    sourcecode: "SELECT DISTINCT p1.city AS city FROM properties p1 WHERE EXISTS (SELECT 1 FROM properties p2 WHERE p2.city = p1.city AND p2.status = 'available') AND EXISTS (SELECT 1 FROM properties p3 WHERE p3.city = p1.city AND p3.status = 'sold') ORDER BY p1.city;",
    columns: ["city"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "JOIN, GROUP BY", whitelist: "EXISTS",
  },
  {
    title: "Full Portfolio Valuation",
    description: makeDesc(
      `The board wants every agent's total portfolio value — agents without listings must appear with 0, so a LEFT JOIN against a derived table is required. No CTEs on this one.`,
      `Return a.name AS agent_name and COALESCE(t.total_value, 0) AS portfolio_value from agents a LEFT JOIN (SELECT agent_id, SUM(price) AS total_value FROM properties GROUP BY agent_id) t ON t.agent_id = a.id, ordered by portfolio_value descending, then agent_name ascending.`
    ),
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Subqueries in SELECT WHERE FROM",
    headerCode: ESTATE_SCHEMA,
    sourcecode: "SELECT a.name AS agent_name, COALESCE(t.total_value, 0) AS portfolio_value FROM agents a LEFT JOIN (SELECT agent_id, SUM(price) AS total_value FROM properties GROUP BY agent_id) t ON t.agent_id = a.id ORDER BY portfolio_value DESC, agent_name ASC;",
    columns: ["agent_name", "portfolio_value"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "WITH, HAVING", whitelist: "JOIN",
  },
];

/* ── MCQs (20: 10 easy / 6 medium / 4 hard; 6 snippets; 5/5/5/5 spread) ── */
const mcqs: SqlMcqQuestionIn[] = [
  { title: "Scalar Subquery Shape", description: "What does a scalar subquery return?", difficulty: "easy", topic: TOPIC, subtopic: "Scalar Subqueries",
    Option1: "A single value", Option2: "A table", Option3: "Always a boolean", Option4: "Multiple columns", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Where Scalar Fits", description: "Where can a scalar subquery legally appear?", difficulty: "easy", topic: TOPIC, subtopic: "Scalar Subqueries",
    Option1: "Only after FROM", Option2: "Nowhere in SELECT statements", Option3: "In WHERE, HAVING and SELECT comparisons", Option4: "Only in UPDATE", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "EXISTS Meaning", description: "WHERE EXISTS (subquery) is true when:", difficulty: "easy", topic: TOPIC, subtopic: "EXISTS and NOT EXISTS",
    Option1: "The subquery returns exactly one row", Option2: "All rows satisfy a condition", Option3: "The subquery returns NULL", Option4: "The subquery returns at least one row", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "IN Versus Equals", description: "Which operator tests a column against a LIST of values produced by a subquery?", difficulty: "easy", topic: TOPIC, subtopic: "IN ANY ALL Subqueries",
    Option1: "=", Option2: "EXISTS", Option3: "IN", Option4: "LIKE", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Correlated Subquery Definition", description: "What makes a subquery 'correlated'?", difficulty: "easy", topic: TOPIC, subtopic: "Correlated Subqueries",
    Option1: "It runs once for the whole query", Option2: "It references outer-query columns and is re-evaluated per outer row", Option3: "It cannot appear in WHERE", Option4: "It must return multiple rows", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Derived Table Alias", description: "A subquery in FROM (a derived table):", difficulty: "easy", topic: TOPIC, subtopic: "Subqueries in SELECT WHERE FROM",
    Option1: "Needs an alias in most dialects (SQLite makes it optional, but always give one)", Option2: "Must return zero rows", Option3: "Cannot be joined to other tables", Option4: "Must be declared with WITH", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Select One Practice Snippet", description: "Why do EXISTS subqueries conventionally use SELECT 1?", difficulty: "easy", topic: TOPIC, subtopic: "EXISTS and NOT EXISTS",
    Option1: "EXISTS requires a numeric column", Option2: "The selected value is ignored — EXISTS only checks row existence", Option3: "1 is always faster than *", Option4: "SELECT * is forbidden inside EXISTS", CorrectOption: 2, iscodesnippet: true, codesnippet: "SELECT name FROM agents a\nWHERE EXISTS (SELECT 1 FROM properties p\n  WHERE p.agent_id = a.id);", snippetLang: "sql" },
  { title: "NOT IN Empty Subquery", description: "x NOT IN (subquery that returns zero rows) evaluates to:", difficulty: "easy", topic: TOPIC, subtopic: "IN ANY ALL Subqueries",
    Option1: "No rows match", Option2: "NULL", Option3: "An error", Option4: "TRUE for every row", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "AVG Subquery Comparison", description: "price > (SELECT AVG(price) FROM properties) finds:", difficulty: "easy", topic: TOPIC, subtopic: "Scalar Subqueries",
    Option1: "The cheapest property", Option2: "The average price itself", Option3: "Properties above every price", Option4: "Properties priced above the overall average", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Subquery In SELECT List", description: "Placing (SELECT MAX(price) FROM properties) in the SELECT list of a 10-row query produces:", difficulty: "easy", topic: TOPIC, subtopic: "Subqueries in SELECT WHERE FROM",
    Option1: "The same value repeated on every row", Option2: "A different value per row", Option3: "Exactly one row total", Option4: "An error — subqueries only work in WHERE", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },

  { title: "NOT IN NULL Trap", description: "NOT IN compares against a subquery result that contains a NULL. What happens?", difficulty: "medium", topic: TOPIC, subtopic: "IN ANY ALL Subqueries",
    Option1: "NULLs are ignored", Option2: "No rows are returned at all", Option3: "The query errors", Option4: "NULL is treated as zero", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Correlated Count Snippet", description: "What does this query return?", difficulty: "medium", topic: TOPIC, subtopic: "Correlated Subqueries",
    Option1: "One row per property", Option2: "An error — COUNT cannot nest", Option3: "Only agents that have listings", Option4: "One row per agent with their listing count (zero included)", CorrectOption: 4, iscodesnippet: true, codesnippet: "SELECT a.name,\n  (SELECT COUNT(*) FROM properties p\n   WHERE p.agent_id = a.id) AS listings\nFROM agents a;", snippetLang: "sql" },
  { title: "EXISTS Versus IN", description: "For 'agents with at least one listing', why is EXISTS often preferred over IN?", difficulty: "medium", topic: TOPIC, subtopic: "EXISTS and NOT EXISTS",
    Option1: "EXISTS sorts the output automatically", Option2: "EXISTS scans the whole subquery first", Option3: "EXISTS can stop at the first matching row and dodges NULL membership pitfalls", Option4: "EXISTS converts strings to numbers", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Subquery In FROM Alias Snippet", description: "In this query, what is d?", difficulty: "medium", topic: TOPIC, subtopic: "Subqueries in SELECT WHERE FROM",
    Option1: "A view", Option2: "A correlated subquery", Option3: "The alias of the derived table (subquery) in FROM", Option4: "A window name", CorrectOption: 3, iscodesnippet: true, codesnippet: "SELECT d.city, ROUND(d.avg_price, 2) AS avg_price\nFROM (SELECT city, AVG(price) AS avg_price\n      FROM properties GROUP BY city) d;", snippetLang: "sql" },
  { title: "Rewriting ALL", description: "SQLite has no ALL keyword. How can x > ALL (subquery) be expressed?", difficulty: "medium", topic: TOPIC, subtopic: "IN ANY ALL Subqueries",
    Option1: "x > MAX(subquery)", Option2: "x > AVG(subquery)", Option3: "x IN (subquery)", Option4: "x <> EXISTS(subquery)", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Scalar In Select Header Snippet", description: "What does the market_avg column look like in the output?", difficulty: "medium", topic: TOPIC, subtopic: "Scalar Subqueries",
    Option1: "A different value per agent", Option2: "The same value on every row", Option3: "NULL on every row", Option4: "An error", CorrectOption: 2, iscodesnippet: true, codesnippet: "SELECT name,\n  (SELECT AVG(rating) FROM agents) AS market_avg\nFROM agents;", snippetLang: "sql" },

  { title: "Nested Scalar Subqueries Snippet", description: "What does this query return?", difficulty: "hard", topic: TOPIC, subtopic: "Scalar Subqueries",
    Option1: "The most expensive listing in each city", Option2: "Only the single global maximum", Option3: "Every listing", Option4: "An error — p is out of scope", CorrectOption: 1, iscodesnippet: true, codesnippet: "SELECT id FROM properties p\nWHERE price = (SELECT MAX(price) FROM properties p2\n               WHERE p2.city = p.city);", snippetLang: "sql" },
  { title: "Double NOT IN Danger", description: "Two chained NOT IN filters where the inner subquery can contain NULL. Why is this risky?", difficulty: "hard", topic: TOPIC, subtopic: "IN ANY ALL Subqueries",
    Option1: "It returns all rows", Option2: "A single NULL makes the NOT IN comparison unknown, silently returning no rows", Option3: "It returns only non-null matches", Option4: "SQLite auto-converts NULL to 0", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "EXISTS Empty Set Behaviour", description: "WHERE NOT EXISTS (SELECT 1 FROM properties WHERE 1 = 0) evaluates to:", difficulty: "hard", topic: TOPIC, subtopic: "EXISTS and NOT EXISTS",
    Option1: "False for every outer row", Option2: "NULL for every outer row", Option3: "True for every outer row — NOT EXISTS of an empty set is true", Option4: "An error", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Derived Then Filtered Snippet", description: "What does this query return?", difficulty: "hard", topic: TOPIC, subtopic: "Subqueries in SELECT WHERE FROM",
    Option1: "Every agent", Option2: "An error — WITH is required", Option3: "A correlated value per agent", Option4: "Only agents holding more than one property", CorrectOption: 4, iscodesnippet: true, codesnippet: "SELECT d.agent_id, d.listings\nFROM (SELECT agent_id, COUNT(*) AS listings\n      FROM properties GROUP BY agent_id) d\nWHERE d.listings > 1;", snippetLang: "sql" },
];

await buildDay({ day: DAY, topic: TOPIC, subtopics: SUBTOPICS, codeQuestions, mcqs });
