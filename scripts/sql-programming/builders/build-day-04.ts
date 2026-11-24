/**
 * Day 4 — "Data Manipulation (INSERT UPDATE DELETE)".
 *
 * Domain: a coffee subscription service. headerCode seeds the subscription
 * tables (plans, subscribers — plus small extra tables for specific drills)
 * with fixed data; the student's script mutates rows then SELECTs the final
 * state. TRUNCATE is emulated with DELETE FROM (no WHERE). RETURNING
 * statements (SQLite 3.35+) are always the FINAL graded statement. Final
 * SELECT results are deterministic.
 *
 * Run from /home/z/my-project:
 *   bun scripts/sql-programming/builders/build-day-04.ts
 */
import { buildDay, type SqlCodeQuestionIn, type SqlMcqQuestionIn } from "../lib.ts";

const DAY = 4;
const TOPIC = "Data Manipulation (INSERT UPDATE DELETE)";
const SUBTOPICS = [
  "INSERT INTO",
  "UPDATE SET",
  "DELETE FROM",
  "TRUNCATE TABLE",
  "RETURNING Clause",
];

/* Shared hidden setup: the roastery's subscription tables. */
const SUBS_SCHEMA = `CREATE TABLE plans (
  id INTEGER PRIMARY KEY,
  code TEXT NOT NULL,
  price REAL NOT NULL
);
INSERT INTO plans (code, price) VALUES
('Starter', 9.0),
('Regular', 15.0),
('Big Cup', 22.0);

CREATE TABLE subscribers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  plan_id INTEGER,
  active INTEGER NOT NULL
);
INSERT INTO subscribers (name, plan_id, active) VALUES
('Ana Reyes', 1, 1),
('Ben Ode', 2, 1),
('Carla Vos', 3, 0),
('Dev Anand', 1, 1),
('Elif Kaya', 2, 0),
('Farid Aziz', 3, 1),
('Gwen Hall', NULL, 1),
('Hugo Marchetti', 2, 0);`;

/* Extra context: the taster trial cup table used by the TRUNCATE drill. */
const TRIALS_SCHEMA = `

CREATE TABLE trials (
  id INTEGER PRIMARY KEY,
  taster TEXT NOT NULL
);
INSERT INTO trials (taster) VALUES
('Rita'), ('Sam'), ('Tess'), ('Uma');`;

/* Extra context: sample roasters used by a DELETE drill. */
const ROASTERS_SCHEMA = `

CREATE TABLE sample_roasters (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);
INSERT INTO sample_roasters (name) VALUES
('Beans & Bricks'),
('Copper Kettle'),
('Dawn Roast'),
('First Pour');`;

/* Extra context: the cupping log used by the reset drill. */
const CUPPING_SCHEMA = `

CREATE TABLE cupping_log (
  id INTEGER PRIMARY KEY,
  batch TEXT NOT NULL,
  score INTEGER NOT NULL
);
INSERT INTO cupping_log (batch, score) VALUES
('Ethiopia Natural', 88),
('Colombia Washed', 84),
('Sumatra Dark', 79),
('Ethiopia Natural', 90),
('Kenya AA', 86),
('Sumatra Dark', 77);`;

/* Extra context: staging signups used by INSERT … SELECT drills. */
const PENDING_SCHEMA = `

CREATE TABLE pending_signups (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  plan_id INTEGER NOT NULL
);
INSERT INTO pending_signups (name, plan_id) VALUES
('Rosa Delgado', 2),
('Tomas Breen', 1),
('Ulla Nielsen', 3);`;

const SCHEMA_SUBS =
  "Schema:\n- plans(id INTEGER PRIMARY KEY, code TEXT, price REAL)\n- subscribers(id INTEGER PRIMARY KEY, name TEXT, plan_id INTEGER -> plans.id, active INTEGER)\n\nThe roastery's context tables are pre-seeded: three plans (Starter 9.0, Regular 15.0, Big Cup 22.0) and eight subscribers with ids 1..8. subscriber.plan_id is a plain INTEGER pointing at plans.id; one subscriber has no plan yet (NULL). active is 1 for running subscriptions and 0 for paused ones.";

const SCHEMA_SUBS_PLUS = (extra: string) =>
  `${SCHEMA_SUBS}\n- ${extra}\n\nThe extra table is pre-seeded too.`;

const RULES_DML =
  "Rules:\n- SQLite dialect. The context tables are pre-seeded automatically — do not recreate them.\n- Write complete statements, each ending with a semicolon; the final statement produces the graded result.\n- Column names and order must match exactly (alias every output column of the final SELECT).\n- Row order must match exactly (use ORDER BY as specified).";

const codeQuestions: SqlCodeQuestionIn[] = [
  /* ── easy · basic (6) ─────────────────────────────────────────────── */
  {
    title: "Sign Up One Subscriber",
    description: `A new member joins the Regular plan. Add her row and read the roster back — the id is auto-assigned, one higher than every current id.\n\n${SCHEMA_SUBS}\n\nTask:\n1) INSERT one subscriber row with name 'Nora Blum', plan_id 2 and active 1.\n2) Finish with a SELECT returning id, name and plan_id from subscribers, ordered by id ascending.\n\n${RULES_DML}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "INSERT INTO",
    headerCode: SUBS_SCHEMA,
    sourcecode: `INSERT INTO subscribers (name, plan_id, active) VALUES ('Nora Blum', 2, 1);
SELECT id, name, plan_id FROM subscribers ORDER BY id;`,
    columns: ["id", "name", "plan_id"],
    inputconstrains: "SQLite dialect; multi-statement DML script; subscription tables pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Enroll Three Friends",
    description: `Three friends sign up together — load them in one multi-row INSERT and read the roster back.\n\n${SCHEMA_SUBS}\n\nTask:\n1) INSERT exactly these three rows in one statement: ('Ines Choi', 1, 1), ('Jonas Weber', 3, 1), ('Katya Sorok', 2, 0).\n2) Finish with a SELECT returning name, plan_id and active from subscribers, ordered by id ascending.\n\n${RULES_DML}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "INSERT INTO",
    headerCode: SUBS_SCHEMA,
    sourcecode: `INSERT INTO subscribers (name, plan_id, active) VALUES
('Ines Choi', 1, 1),
('Jonas Weber', 3, 1),
('Katya Sorok', 2, 0);
SELECT name, plan_id, active FROM subscribers ORDER BY id;`,
    columns: ["name", "plan_id", "active"],
    inputconstrains: "SQLite dialect; multi-statement DML script; subscription tables pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Raise the Regular Price",
    description: `The Regular plan goes up to 16.5. Update only that plan and list the price sheet.\n\n${SCHEMA_SUBS}\n\nTask:\n1) UPDATE the plans table setting price to 16.5 for the row whose code is 'Regular'.\n2) Finish with a SELECT returning code and price from plans, ordered by id ascending.\n\n${RULES_DML}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "UPDATE SET",
    headerCode: SUBS_SCHEMA,
    sourcecode: `UPDATE plans SET price = 16.5 WHERE code = 'Regular';
SELECT code, price FROM plans ORDER BY id;`,
    columns: ["code", "price"],
    inputconstrains: "SQLite dialect; multi-statement DML script; subscription tables pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Pause a Subscription",
    description: `Dev Anand pauses his subscription. Flip his active flag to 0 and list everyone's flag.\n\n${SCHEMA_SUBS}\n\nTask:\n1) UPDATE the subscribers table setting active to 0 for the row whose name is 'Dev Anand'.\n2) Finish with a SELECT returning name and active, ordered by name ascending.\n\n${RULES_DML}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "UPDATE SET",
    headerCode: SUBS_SCHEMA,
    sourcecode: `UPDATE subscribers SET active = 0 WHERE name = 'Dev Anand';
SELECT name, active FROM subscribers ORDER BY name;`,
    columns: ["name", "active"],
    inputconstrains: "SQLite dialect; multi-statement DML script; subscription tables pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Remove a Canceled Account",
    description: `Carla Vos canceled for good — her row must go. Delete just that row and list who remains.\n\n${SCHEMA_SUBS}\n\nTask:\n1) DELETE the subscribers row whose name is 'Carla Vos'.\n2) Finish with a SELECT returning name and active from subscribers, ordered by name ascending.\n\n${RULES_DML}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "DELETE FROM",
    headerCode: SUBS_SCHEMA,
    sourcecode: `DELETE FROM subscribers WHERE name = 'Carla Vos';
SELECT name, active FROM subscribers ORDER BY name;`,
    columns: ["name", "active"],
    inputconstrains: "SQLite dialect; multi-statement DML script; subscription tables pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Reset the Trial Cup Table",
    description: `SQLite has no TRUNCATE TABLE — the way to empty a table entirely is DELETE FROM with no WHERE clause. Clear the taster trials, then log the first taster of the new round.\n\n${SCHEMA_SUBS_PLUS("trials(id INTEGER PRIMARY KEY, taster TEXT) — holds four taster rows")}\n\nTask:\n1) Empty the trials table entirely with DELETE FROM (no WHERE).\n2) INSERT one row with taster 'Victor Ng'.\n3) Finish with a SELECT returning id and taster from trials, ordered by id ascending.\n\n${RULES_DML}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "TRUNCATE TABLE",
    headerCode: SUBS_SCHEMA + TRIALS_SCHEMA,
    sourcecode: `DELETE FROM trials;
INSERT INTO trials (taster) VALUES ('Victor Ng');
SELECT id, taster FROM trials ORDER BY id;`,
    columns: ["id", "taster"],
    inputconstrains: "SQLite dialect; multi-statement DML script; subscription tables pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── easy · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Welcome Two New Members",
    description: `Two new members joined at the Saturday market. Add both and read the roster in id order.\n\n${SCHEMA_SUBS}\n\nTask:\n1) INSERT exactly these two rows in one statement: ('Lena Brook', 1, 1), ('Marc Dubois', 2, 1).\n2) Finish with a SELECT returning id, name and plan_id from subscribers, ordered by id ascending.\n\n${RULES_DML}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "INSERT INTO",
    headerCode: SUBS_SCHEMA,
    sourcecode: `INSERT INTO subscribers (name, plan_id, active) VALUES
('Lena Brook', 1, 1),
('Marc Dubois', 2, 1);
SELECT id, name, plan_id FROM subscribers ORDER BY id;`,
    columns: ["id", "name", "plan_id"],
    inputconstrains: "SQLite dialect; multi-statement DML script; subscription tables pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Receipt for One Signup",
    description: `The kiosk shows a receipt the moment a signup happens: make the INSERT itself report the new row with RETURNING (SQLite 3.35+). The RETURNING statement must be your final statement — no trailing SELECT.\n\n${SCHEMA_SUBS}\n\nTask:\n1) Run a single INSERT that adds a subscriber with name 'Kai Mensah', plan_id 1 and active 1, and uses RETURNING to output the new row's id (aliased new_id) and name (aliased name). Nothing may follow it.\n\n${RULES_DML}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "RETURNING Clause",
    headerCode: SUBS_SCHEMA,
    sourcecode: `INSERT INTO subscribers (name, plan_id, active) VALUES ('Kai Mensah', 1, 1)
RETURNING id AS new_id, name AS name;`,
    columns: ["new_id", "name"],
    inputconstrains: "SQLite dialect; multi-statement DML script; subscription tables pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Clear Out the Sample Roasters",
    description: `'First Pour' pulled out of the tasting program. Remove it and list the roasters that stay.\n\n${SCHEMA_SUBS_PLUS("sample_roasters(id INTEGER PRIMARY KEY, name TEXT) — holds four roaster rows: Beans & Bricks, Copper Kettle, Dawn Roast, First Pour")}\n\nTask:\n1) DELETE the sample_roasters row whose name is 'First Pour'.\n2) Finish with a SELECT returning name from sample_roasters, ordered by name ascending.\n\n${RULES_DML}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "DELETE FROM",
    headerCode: SUBS_SCHEMA + ROASTERS_SCHEMA,
    sourcecode: `DELETE FROM sample_roasters WHERE name = 'First Pour';
SELECT name FROM sample_roasters ORDER BY name;`,
    columns: ["name"],
    inputconstrains: "SQLite dialect; multi-statement DML script; subscription tables pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Switch Hugo to Big Cup",
    description: `Hugo Marchetti upgrades to the Big Cup plan (plan_id 3). Move him and list everyone's plan.\n\n${SCHEMA_SUBS}\n\nTask:\n1) UPDATE the subscribers table setting plan_id to 3 for the row whose name is 'Hugo Marchetti'.\n2) Finish with a SELECT returning name and plan_id, ordered by name ascending.\n\n${RULES_DML}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "UPDATE SET",
    headerCode: SUBS_SCHEMA,
    sourcecode: `UPDATE subscribers SET plan_id = 3 WHERE name = 'Hugo Marchetti';
SELECT name, plan_id FROM subscribers ORDER BY name;`,
    columns: ["name", "plan_id"],
    inputconstrains: "SQLite dialect; multi-statement DML script; subscription tables pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── medium · scenario (6) ────────────────────────────────────────── */
  {
    title: "Bulk Enrollment Wave",
    description: `A café partner sends a batch of three signups. Load them in one statement and read the whole roster back in id order.\n\n${SCHEMA_SUBS}\n\nTask:\n1) INSERT exactly these three rows in one statement: ('Nia Okafor', 1, 1), ('Omar Haddad', 2, 1), ('Pia Lund', 3, 0).\n2) Finish with a SELECT returning id, name, plan_id and active from subscribers, ordered by id ascending.\n\n${RULES_DML}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "INSERT INTO",
    headerCode: SUBS_SCHEMA,
    sourcecode: `INSERT INTO subscribers (name, plan_id, active) VALUES
('Nia Okafor', 1, 1),
('Omar Haddad', 2, 1),
('Pia Lund', 3, 0);
SELECT id, name, plan_id, active FROM subscribers ORDER BY id;`,
    columns: ["id", "name", "plan_id", "active"],
    inputconstrains: "SQLite dialect; multi-statement DML script; subscription tables pre-seeded", blacklist: "UPDATE", whitelist: "INSERT INTO",
  },
  {
    title: "Reactivation Sweep",
    description: `A promo brings every paused subscriber back onto the Starter plan. Two updates, one final listing.\n\n${SCHEMA_SUBS}\n\nTask:\n1) UPDATE subscribers setting plan_id to 1 for every row where active is 0.\n2) UPDATE subscribers setting active to 1 for every row where active is 0.\n3) Finish with a SELECT returning id, name, plan_id and active, ordered by id ascending.\n\n${RULES_DML}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "UPDATE SET",
    headerCode: SUBS_SCHEMA,
    sourcecode: `UPDATE subscribers SET plan_id = 1 WHERE active = 0;
UPDATE subscribers SET active = 1 WHERE active = 0;
SELECT id, name, plan_id, active FROM subscribers ORDER BY id;`,
    columns: ["id", "name", "plan_id", "active"],
    inputconstrains: "SQLite dialect; multi-statement DML script; subscription tables pre-seeded", blacklist: "DELETE FROM", whitelist: "UPDATE",
  },
  {
    title: "Drop the Paused Cohort",
    description: `Churn season: every paused subscription is removed in one sweep.\n\n${SCHEMA_SUBS}\n\nTask:\n1) DELETE every subscribers row where active is 0.\n2) Finish with a SELECT returning id, name and plan_id from subscribers, ordered by id ascending.\n\n${RULES_DML}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "DELETE FROM",
    headerCode: SUBS_SCHEMA,
    sourcecode: `DELETE FROM subscribers WHERE active = 0;
SELECT id, name, plan_id FROM subscribers ORDER BY id;`,
    columns: ["id", "name", "plan_id"],
    inputconstrains: "SQLite dialect; multi-statement DML script; subscription tables pre-seeded", blacklist: "UPDATE", whitelist: "DELETE FROM",
  },
  {
    title: "Reset the Cupping Log",
    description: `The cupping log format changed: wipe it completely (SQLite's TRUNCATE equivalent — DELETE FROM with no WHERE), then log the fresh session's two rows.\n\n${SCHEMA_SUBS_PLUS("cupping_log(id INTEGER PRIMARY KEY, batch TEXT, score INTEGER) — holds six old rows")}\n\nTask:\n1) Empty the cupping_log table entirely with DELETE FROM (no WHERE).\n2) INSERT exactly these fresh rows: ('Guji Washed', 89), ('Huila Reserve', 91).\n3) Finish with a SELECT returning batch and score, ordered by id ascending.\n\n${RULES_DML}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "TRUNCATE TABLE",
    headerCode: SUBS_SCHEMA + CUPPING_SCHEMA,
    sourcecode: `DELETE FROM cupping_log;
INSERT INTO cupping_log (batch, score) VALUES
('Guji Washed', 89),
('Huila Reserve', 91);
SELECT batch, score FROM cupping_log ORDER BY id;`,
    columns: ["batch", "score"],
    inputconstrains: "SQLite dialect; multi-statement DML script; subscription tables pre-seeded", blacklist: "UPDATE", whitelist: "DELETE FROM, INSERT INTO",
  },
  {
    title: "Signup With Receipt Columns",
    description: `The partner portal wants the signup receipt straight from the INSERT: use RETURNING and make it the final statement — no separate SELECT may follow.\n\n${SCHEMA_SUBS}\n\nTask:\n1) Run a single INSERT that adds a subscriber with name 'Quinn Harper', plan_id 3 and active 1, and uses RETURNING to output id AS new_id, name AS name and plan_id AS plan_id. Nothing may follow it.\n\n${RULES_DML}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "RETURNING Clause",
    headerCode: SUBS_SCHEMA,
    sourcecode: `INSERT INTO subscribers (name, plan_id, active) VALUES ('Quinn Harper', 3, 1)
RETURNING id AS new_id, name AS name, plan_id AS plan_id;`,
    columns: ["new_id", "name", "plan_id"],
    inputconstrains: "SQLite dialect; multi-statement DML script; subscription tables pre-seeded", blacklist: "SELECT", whitelist: "RETURNING, INSERT INTO",
  },
  {
    title: "Drop the Planless Accounts",
    description: `Members who never picked a plan (plan_id is NULL — use the IS NULL test) are being cleared out.\n\n${SCHEMA_SUBS}\n\nTask:\n1) DELETE every subscribers row where plan_id IS NULL.\n2) Finish with a SELECT returning id, name and plan_id from subscribers, ordered by id ascending.\n\n${RULES_DML}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "DELETE FROM",
    headerCode: SUBS_SCHEMA,
    sourcecode: `DELETE FROM subscribers WHERE plan_id IS NULL;
SELECT id, name, plan_id FROM subscribers ORDER BY id;`,
    columns: ["id", "name", "plan_id"],
    inputconstrains: "SQLite dialect; multi-statement DML script; subscription tables pre-seeded", blacklist: "UPDATE", whitelist: "DELETE FROM",
  },

  /* ── hard · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Win-Back Campaign",
    description: `Marketing runs a win-back: every paused subscriber gets moved to the Regular plan and reactivated, while one subscriber who unsubscribed for good is removed entirely.\n\n${SCHEMA_SUBS}\n\nTask:\n1) UPDATE subscribers setting plan_id to 2 for every row where active is 0.\n2) UPDATE subscribers setting active to 1 for every row where active is 0.\n3) DELETE the subscribers row whose name is 'Ben Ode'.\n4) Finish with a SELECT returning id, name, plan_id and active, ordered by id ascending.\n\n${RULES_DML}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "UPDATE SET",
    headerCode: SUBS_SCHEMA,
    sourcecode: `UPDATE subscribers SET plan_id = 2 WHERE active = 0;
UPDATE subscribers SET active = 1 WHERE active = 0;
DELETE FROM subscribers WHERE name = 'Ben Ode';
SELECT id, name, plan_id, active FROM subscribers ORDER BY id;`,
    columns: ["id", "name", "plan_id", "active"],
    inputconstrains: "SQLite dialect; multi-statement DML script; subscription tables pre-seeded", blacklist: "INSERT INTO", whitelist: "UPDATE, DELETE FROM",
  },
  {
    title: "Backfill From Staging With Receipt",
    description: `Three staged signups move into the roster, but Rosa changed her mind — her row is deleted again, and the DELETE must report what it removed using RETURNING as the FINAL statement.\n\n${SCHEMA_SUBS_PLUS("pending_signups(id INTEGER PRIMARY KEY, name TEXT, plan_id INTEGER) — holds three staged rows: Rosa Delgado (plan 2), Tomas Breen (plan 1), Ulla Nielsen (plan 3)")}\n\nTask:\n1) INSERT into subscribers (name, plan_id, active) selecting name and plan_id from pending_signups with active set to 1 for all of them (INSERT … SELECT).\n2) DELETE the subscribers row whose name is 'Rosa Delgado' and make the statement output the removed row's id AS removed_id, name AS removed_name and plan_id AS removed_plan via RETURNING. Nothing may follow it.\n\n${RULES_DML}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "RETURNING Clause",
    headerCode: SUBS_SCHEMA + PENDING_SCHEMA,
    sourcecode: `INSERT INTO subscribers (name, plan_id, active)
SELECT name, plan_id, 1 FROM pending_signups;
DELETE FROM subscribers WHERE name = 'Rosa Delgado'
RETURNING id AS removed_id, name AS removed_name, plan_id AS removed_plan;`,
    columns: ["removed_id", "removed_name", "removed_plan"],
    inputconstrains: "SQLite dialect; multi-statement DML script; subscription tables pre-seeded", blacklist: "UPDATE", whitelist: "RETURNING, INSERT INTO",
  },
  {
    title: "Price Overhaul With Rounding",
    description: `All plan prices rise by 10%, rounded to cents, and a new Decaf Lite plan launches right after. Show the final price sheet alphabetically.\n\n${SCHEMA_SUBS}\n\nTask:\n1) UPDATE every plans row setting price to ROUND(price * 1.1, 2) (each row's own current price).\n2) INSERT one plans row: ('Decaf Lite', 12.0).\n3) Finish with a SELECT returning code and price from plans, ordered by code ascending.\n\n${RULES_DML}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "UPDATE SET",
    headerCode: SUBS_SCHEMA,
    sourcecode: `UPDATE plans SET price = ROUND(price * 1.1, 2);
INSERT INTO plans (code, price) VALUES ('Decaf Lite', 12.0);
SELECT code, price FROM plans ORDER BY code;`,
    columns: ["code", "price"],
    inputconstrains: "SQLite dialect; multi-statement DML script; subscription tables pre-seeded", blacklist: "DELETE FROM", whitelist: "UPDATE, ROUND, INSERT INTO",
  },
  {
    title: "Rebuild the Roster From Staging",
    description: `The staging queue is flushed into the roster and the paused cohort is cleaned out — two operations, one final listing of the surviving roster.\n\n${SCHEMA_SUBS_PLUS("pending_signups(id INTEGER PRIMARY KEY, name TEXT, plan_id INTEGER) — holds three staged rows: Rosa Delgado (plan 2), Tomas Breen (plan 1), Ulla Nielsen (plan 3)")}\n\nTask:\n1) INSERT into subscribers (name, plan_id, active) selecting name and plan_id from pending_signups with active set to 1 for all of them (INSERT … SELECT).\n2) DELETE every subscribers row where active is 0.\n3) Finish with a SELECT returning id, name and plan_id, ordered by id ascending.\n\n${RULES_DML}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "INSERT INTO",
    headerCode: SUBS_SCHEMA + PENDING_SCHEMA,
    sourcecode: `INSERT INTO subscribers (name, plan_id, active)
SELECT name, plan_id, 1 FROM pending_signups;
DELETE FROM subscribers WHERE active = 0;
SELECT id, name, plan_id FROM subscribers ORDER BY id;`,
    columns: ["id", "name", "plan_id"],
    inputconstrains: "SQLite dialect; multi-statement DML script; subscription tables pre-seeded", blacklist: "UPDATE", whitelist: "INSERT INTO, DELETE FROM",
  },
];

/* ── MCQs (20: 10 easy / 6 medium / 4 hard; 7 snippets; 5/5/5/5 spread) ── */
const mcqs: SqlMcqQuestionIn[] = [
  { title: "INSERT Basic Shape", description: "INSERT INTO subscribers (name) VALUES ('Ana'); — what happens to the columns that are not listed?", difficulty: "easy", topic: TOPIC, subtopic: "INSERT INTO",
    Option1: "They replace the first row's values", Option2: "The insert fails — every column must be listed", Option3: "They take their DEFAULT, or NULL if none is declared", Option4: "They are added as new columns", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Multi-Row INSERT Syntax", description: "Which statement correctly inserts two rows in one go?", difficulty: "easy", topic: TOPIC, subtopic: "INSERT INTO",
    Option1: "INSERT INTO plans (code, price) VALUES ('A', 1.0), ('B', 2.0);", Option2: "INSERT INTO plans (code, price) VALUES ('A', 1.0) AND ('B', 2.0);", Option3: "INSERT ROWS INTO plans ('A', 1.0), ('B', 2.0);", Option4: "BULK INSERT plans ('A', 1.0), ('B', 2.0);", CorrectOption: 1, iscodesnippet: true, codesnippet: "INSERT INTO plans (code, price) VALUES\n  ('Decaf Lite', 12.0),\n  ('Single Origin', 18.5);", snippetLang: "sql" },
  { title: "UPDATE Without WHERE", description: "UPDATE subscribers SET active = 0; (no WHERE) — how many of the 8 subscriber rows change?", difficulty: "easy", topic: TOPIC, subtopic: "UPDATE SET",
    Option1: "One row", Option2: "It errors — WHERE is required", Option3: "None", Option4: "All 8 rows", CorrectOption: 4, iscodesnippet: true, codesnippet: "UPDATE subscribers SET active = 0;", snippetLang: "sql" },
  { title: "DELETE With WHERE", description: "DELETE FROM subscribers WHERE name = 'Ben Ode'; does what?", difficulty: "easy", topic: TOPIC, subtopic: "DELETE FROM",
    Option1: "Removes the table from the catalog", Option2: "Removes only the rows matching the condition", Option3: "Marks the matching rows inactive", Option4: "Errors — DELETE must not have a WHERE", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "TRUNCATE in SQLite", description: "How do you empty a whole table in SQLite (the TRUNCATE-style operation)?", difficulty: "easy", topic: TOPIC, subtopic: "TRUNCATE TABLE",
    Option1: "TRUNCATE TABLE trials;", Option2: "DELETE FROM trials; with no WHERE clause", Option3: "EMPTY TABLE trials;", Option4: "DROP TABLE trials;", CorrectOption: 2, iscodesnippet: true, codesnippet: "DELETE FROM trials;", snippetLang: "sql" },
  { title: "RETURNING Availability", description: "SQLite supports the RETURNING clause from engine version…", difficulty: "easy", topic: TOPIC, subtopic: "RETURNING Clause",
    Option1: "1.0", Option2: "2.8", Option3: "3.10", Option4: "3.35", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Count the Inserted Rows", description: "How many rows does this statement add?", difficulty: "easy", topic: TOPIC, subtopic: "INSERT INTO",
    Option1: "Two", Option2: "One", Option3: "Zero", Option4: "It errors — VALUES accepts one tuple per INSERT", CorrectOption: 1, iscodesnippet: true, codesnippet: "INSERT INTO plans (code, price) VALUES\n  ('Decaf Lite', 12.0),\n  ('Single Origin', 18.5);", snippetLang: "sql" },
  { title: "SET Two Columns At Once", description: "UPDATE subscribers SET active = 0, plan_id = 1 WHERE id = 4; — what does it change?", difficulty: "easy", topic: TOPIC, subtopic: "UPDATE SET",
    Option1: "Only the active column", Option2: "It errors — one SET assignment per statement", Option3: "Both columns on the matching row", Option4: "It creates two rows", CorrectOption: 3, iscodesnippet: true, codesnippet: "UPDATE subscribers\nSET active = 0, plan_id = 1\nWHERE id = 4;", snippetLang: "sql" },
  { title: "Bare DELETE FROM", description: "DELETE FROM trials; (no WHERE) does what?", difficulty: "easy", topic: TOPIC, subtopic: "TRUNCATE TABLE",
    Option1: "Drops the table", Option2: "Removes only the first row", Option3: "Errors — a WHERE is mandatory", Option4: "Removes every row while keeping the table", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "RETURNING Works With", description: "In SQLite 3.35+, RETURNING can be attached to which statements?", difficulty: "easy", topic: TOPIC, subtopic: "RETURNING Clause",
    Option1: "INSERT only", Option2: "INSERT, UPDATE and DELETE", Option3: "SELECT only", Option4: "TRUNCATE", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Missing Column on INSERT", description: "Inserting a row without listing plan_id, when the column has no DEFAULT, leaves plan_id as…", difficulty: "medium", topic: TOPIC, subtopic: "INSERT INTO",
    Option1: "0", Option2: "An empty string", Option3: "NULL", Option4: "Nothing — the insert fails", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "UPDATE Safe Pattern", description: "Why should UPDATE almost always be paired with WHERE?", difficulty: "medium", topic: TOPIC, subtopic: "UPDATE SET",
    Option1: "Otherwise every row in the table is changed", Option2: "WHERE only makes UPDATE faster", Option3: "SQLite forbids UPDATE without WHERE", Option4: "WHERE chooses which columns to set", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "RETURNING Receipt Output", description: "What does this statement output?", difficulty: "medium", topic: TOPIC, subtopic: "RETURNING Clause",
    Option1: "Nothing — INSERT is always silent", Option2: "All subscriber rows", Option3: "One row with the new row's id and name", Option4: "An error — RETURNING requires a SELECT", CorrectOption: 3, iscodesnippet: true, codesnippet: "INSERT INTO subscribers (name, plan_id)\nVALUES ('Zoe Cran', 2)\nRETURNING id, name;", snippetLang: "sql" },
  { title: "DELETE vs DROP", description: "After DELETE FROM plans; the plans table…", difficulty: "medium", topic: TOPIC, subtopic: "DELETE FROM",
    Option1: "Is gone from the catalog", Option2: "Still exists with its schema and zero rows", Option3: "Holds one empty row", Option4: "Becomes a view", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Why TRUNCATE Is Fast", description: "In engines that have a real TRUNCATE statement, it is faster than a row-by-row DELETE because it…", difficulty: "medium", topic: TOPIC, subtopic: "TRUNCATE TABLE",
    Option1: "Skips locking entirely", Option2: "Compresses the table first", Option3: "Drops all indexes before deleting", Option4: "Deallocates storage pages instead of scanning rows", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "RETURNING List Contents", description: "The RETURNING clause's expression list may contain…", difficulty: "medium", topic: TOPIC, subtopic: "RETURNING Clause",
    Option1: "Only the primary key column", Option2: "Columns and expressions over the affected rows", Option3: "Only aggregate functions", Option4: "Only literal constants", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Auto-Assigned Rowid", description: "When an INSERT omits an INTEGER PRIMARY KEY value, SQLite assigns…", difficulty: "hard", topic: TOPIC, subtopic: "INSERT INTO",
    Option1: "A value one higher than the largest current rowid", Option2: "A random id", Option3: "Always 1", Option4: "NULL", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Delete Then Count", description: "What does this statement pair do?", difficulty: "hard", topic: TOPIC, subtopic: "DELETE FROM",
    Option1: "It errors — two statements cannot share a table", Option2: "It drops the subscribers table", Option3: "The COUNT counts the deleted rows", Option4: "It removes the paused rows, then reports how many remain", CorrectOption: 4, iscodesnippet: true, codesnippet: "DELETE FROM subscribers WHERE active = 0;\nSELECT COUNT(*) AS remaining FROM subscribers;", snippetLang: "sql" },
  { title: "RETURNING Row Order", description: "For a multi-row DELETE … RETURNING, the order of the returned rows is…", difficulty: "hard", topic: TOPIC, subtopic: "RETURNING Clause",
    Option1: "Always rowid ascending", Option2: "Alphabetical by the first returned column", Option3: "Not guaranteed — RETURNING has no ORDER BY", Option4: "Reverse insertion order", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Self-Referential UPDATE", description: "UPDATE plans SET price = price + 1; — what does the price on the right-hand side refer to?", difficulty: "hard", topic: TOPIC, subtopic: "UPDATE SET",
    Option1: "The row's own current value, read before the update", Option2: "The column's DEFAULT", Option3: "The first row's price", Option4: "NULL", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
];

await buildDay({ day: DAY, topic: TOPIC, subtopics: SUBTOPICS, codeQuestions, mcqs });
