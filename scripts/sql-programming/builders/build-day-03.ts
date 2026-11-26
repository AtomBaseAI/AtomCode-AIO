/**
 * Day 3 — "Data Types and Constraints".
 *
 * Domain: a camping gear shop. Questions: CREATE TABLE with PRIMARY KEY /
 * NOT NULL / UNIQUE / CHECK / DEFAULT / FOREIGN KEY (plain INTEGER column +
 * comment in the Schema section — never rely on enforcement), type affinity
 * (INTEGER/TEXT/REAL/NUMERIC), then INSERT the rows GIVEN IN THE TASK
 * (always valid rows — constraint violations never appear in graded scripts),
 * finishing with a deterministic SELECT proving the schema/data, or a
 * pragma_table_info introspection. Header always contains at least one
 * CREATE TABLE (the categories context table).
 *
 * Run from /home/z/my-project:
 *   bun scripts/sql-programming/builders/build-day-03.ts
 */
import { buildDay, type SqlCodeQuestionIn, type SqlMcqQuestionIn } from "../lib.ts";

const DAY = 3;
const TOPIC = "Data Types and Constraints";
const SUBTOPICS = [
  "Numeric Data Types",
  "Text and Character Data Types",
  "Date and Time Data Types",
  "Boolean Data Type",
  "PRIMARY KEY Constraint",
  "FOREIGN KEY Constraint",
  "UNIQUE Constraint",
  "CHECK Constraint",
  "NOT NULL and DEFAULT Constraints",
];

/* Shared hidden setup: the shop's category context table (5 rows, ids 1..5). */
const CATS_SCHEMA = `CREATE TABLE categories (
  id INTEGER PRIMARY KEY,
  label TEXT NOT NULL
);
INSERT INTO categories (label) VALUES
('Shelter'),
('Sleep'),
('Cookware'),
('Lighting'),
('Safety');`;

const SCHEMA_CATS =
  "Schema:\n- categories(id INTEGER PRIMARY KEY, label TEXT)\n\nThe shop's context table categories is pre-seeded with five rows and fixed ids 1..5: Shelter, Sleep, Cookware, Lighting, Safety. It already exists when your script runs — do not recreate it.";

const SCHEMA_CATS_FK =
  "Schema:\n- categories(id INTEGER PRIMARY KEY, label TEXT)\n- (the table you build below uses category_id INTEGER -> categories.id, a plain INTEGER column holding a matching categories id; SQLite does not enforce the link unless foreign keys are switched on, so just store matching ids)\n\nThe categories context table is pre-seeded with five rows and fixed ids 1..5: Shelter, Sleep, Cookware, Lighting, Safety.";

const RULES_DDL_INSERT =
  "Rules:\n- SQLite dialect. The context tables are pre-seeded automatically — do not recreate them.\n- Write complete statements, each ending with a semicolon; the final SELECT produces the graded result.\n- Every INSERT in your script must succeed — never try to break your own constraints in the graded script.\n- Column names and order must match exactly (alias every output column of the final SELECT).\n- Row order must match exactly (use ORDER BY as specified).";

const codeQuestions: SqlCodeQuestionIn[] = [
  /* ── easy · basic (6) ─────────────────────────────────────────────── */
  {
    title: "Open the Gear Table",
    description: `Start the shop's centerpiece table. The id column is the identity: INTEGER PRIMARY KEY makes each row uniquely identified and auto-assigned.\n\n${SCHEMA_CATS}\n\nTask:\n1) Create a table named gear with exactly these columns: id INTEGER PRIMARY KEY, name TEXT NOT NULL, price REAL NOT NULL.\n2) Insert exactly these rows: ('Dome Tent 2P', 129.0), ('Trail Sleeping Bag', 89.5), ('Titanium Pot', 42.0).\n3) Finish with a SELECT returning id, name and price from gear, ordered by id ascending.\n\n${RULES_DDL_INSERT}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "PRIMARY KEY Constraint",
    headerCode: CATS_SCHEMA,
    sourcecode: `CREATE TABLE gear (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL
);
INSERT INTO gear (name, price) VALUES
('Dome Tent 2P', 129.0),
('Trail Sleeping Bag', 89.5),
('Titanium Pot', 42.0);
SELECT id, name, price FROM gear ORDER BY id;`,
    columns: ["id", "name", "price"],
    inputconstrains: "SQLite dialect; multi-statement script; categories context table pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Shelf Codes for the Wall",
    description: `Aisle signs come from a tiny lookup table of short text codes. Note how TEXT keeps the codes exactly as typed.\n\n${SCHEMA_CATS}\n\nTask:\n1) Create a table named shelf_codes with exactly these columns: id INTEGER PRIMARY KEY, code TEXT NOT NULL, label TEXT NOT NULL.\n2) Insert exactly these rows: ('A-01', 'Tents'), ('A-02', 'Tarps'), ('B-01', 'Sleeping Bags'), ('B-02', 'Sleeping Pads').\n3) Finish with a SELECT returning code and label, ordered by code ascending.\n\n${RULES_DDL_INSERT}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Text and Character Data Types",
    headerCode: CATS_SCHEMA,
    sourcecode: `CREATE TABLE shelf_codes (
  id INTEGER PRIMARY KEY,
  code TEXT NOT NULL,
  label TEXT NOT NULL
);
INSERT INTO shelf_codes (code, label) VALUES
('A-01', 'Tents'),
('A-02', 'Tarps'),
('B-01', 'Sleeping Bags'),
('B-02', 'Sleeping Pads');
SELECT code, label FROM shelf_codes ORDER BY code;`,
    columns: ["code", "label"],
    inputconstrains: "SQLite dialect; multi-statement script; categories context table pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "One-Of-A-Kind Handmade Pieces",
    description: `Handmade pieces are one of a kind, so no two rows may share a piece name. Add the right uniqueness rule and load three pieces.\n\n${SCHEMA_CATS}\n\nTask:\n1) Create a table named handcrafts with exactly these columns: id INTEGER PRIMARY KEY, piece_name TEXT NOT NULL UNIQUE, price REAL NOT NULL.\n2) Insert exactly these rows: ('Carved Compass', 38.0), ('Leather Pouch', 24.5), ('Waxed Canvas Roll', 31.0).\n3) Finish with a SELECT returning piece_name and price, ordered by piece_name ascending.\n\n${RULES_DDL_INSERT}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "UNIQUE Constraint",
    headerCode: CATS_SCHEMA,
    sourcecode: `CREATE TABLE handcrafts (
  id INTEGER PRIMARY KEY,
  piece_name TEXT NOT NULL UNIQUE,
  price REAL NOT NULL
);
INSERT INTO handcrafts (piece_name, price) VALUES
('Carved Compass', 38.0),
('Leather Pouch', 24.5),
('Waxed Canvas Roll', 31.0);
SELECT piece_name, price FROM handcrafts ORDER BY piece_name;`,
    columns: ["piece_name", "price"],
    inputconstrains: "SQLite dialect; multi-statement script; categories context table pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Care Notes as Text",
    description: `Some items have a care note, some do not — an honest NULL says "no note yet" better than an empty string.\n\n${SCHEMA_CATS}\n\nTask:\n1) Create a table named care_notes with exactly these columns: id INTEGER PRIMARY KEY, item TEXT NOT NULL, note TEXT.\n2) Insert exactly these rows: ('Rain Fly', 'Re-waterproof every spring'), ('Camp Stove', 'Check O-ring monthly'), ('Headlamp', NULL).\n3) Finish with a SELECT returning item and note, ordered by id ascending.\n\n${RULES_DDL_INSERT}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Text and Character Data Types",
    headerCode: CATS_SCHEMA,
    sourcecode: `CREATE TABLE care_notes (
  id INTEGER PRIMARY KEY,
  item TEXT NOT NULL,
  note TEXT
);
INSERT INTO care_notes (item, note) VALUES
('Rain Fly', 'Re-waterproof every spring'),
('Camp Stove', 'Check O-ring monthly'),
('Headlamp', NULL);
SELECT item, note FROM care_notes ORDER BY id;`,
    columns: ["item", "note"],
    inputconstrains: "SQLite dialect; multi-statement script; categories context table pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "In-Stock Flags",
    description: `SQLite has no separate boolean type — the shop stores availability flags as the integers 1 (in stock) and 0 (out).\n\n${SCHEMA_CATS}\n\nTask:\n1) Create a table named stock_flags with exactly these columns: id INTEGER PRIMARY KEY, item TEXT NOT NULL, in_stock INTEGER NOT NULL.\n2) Insert exactly these rows: ('Lantern', 1), ('Fire Starter', 0), ('Water Filter', 1), ('Bear Canister', 0).\n3) Finish with a SELECT returning item and in_stock, ordered by id ascending.\n\n${RULES_DDL_INSERT}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Boolean Data Type",
    headerCode: CATS_SCHEMA,
    sourcecode: `CREATE TABLE stock_flags (
  id INTEGER PRIMARY KEY,
  item TEXT NOT NULL,
  in_stock INTEGER NOT NULL
);
INSERT INTO stock_flags (item, in_stock) VALUES
('Lantern', 1),
('Fire Starter', 0),
('Water Filter', 1),
('Bear Canister', 0);
SELECT item, in_stock FROM stock_flags ORDER BY id;`,
    columns: ["item", "in_stock"],
    inputconstrains: "SQLite dialect; multi-statement script; categories context table pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Arrival Dates as ISO Text",
    description: `The shop records expected deliveries as ISO-8601 text like 2025-06-18 — TEXT storage sorts dates correctly, so no special date type is needed.\n\n${SCHEMA_CATS}\n\nTask:\n1) Create a table named arrivals with exactly these columns: id INTEGER PRIMARY KEY, item TEXT NOT NULL, arrival_date TEXT NOT NULL.\n2) Insert exactly these rows: ('Dome Tent 4P', '2025-07-01'), ('Down Quilt', '2025-06-18'), ('Trail Chair', '2025-06-25').\n3) Finish with a SELECT returning item and arrival_date, ordered by arrival_date ascending.\n\n${RULES_DDL_INSERT}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Date and Time Data Types",
    headerCode: CATS_SCHEMA,
    sourcecode: `CREATE TABLE arrivals (
  id INTEGER PRIMARY KEY,
  item TEXT NOT NULL,
  arrival_date TEXT NOT NULL
);
INSERT INTO arrivals (item, arrival_date) VALUES
('Dome Tent 4P', '2025-07-01'),
('Down Quilt', '2025-06-18'),
('Trail Chair', '2025-06-25');
SELECT item, arrival_date FROM arrivals ORDER BY arrival_date;`,
    columns: ["item", "arrival_date"],
    inputconstrains: "SQLite dialect; multi-statement script; categories context table pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── easy · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Tent Catalog Starter",
    description: `The tent wall gets its own catalog table. The id is the identity key so restocks can reference exact rows.\n\n${SCHEMA_CATS}\n\nTask:\n1) Create a table named tents with exactly these columns: id INTEGER PRIMARY KEY, model TEXT NOT NULL, capacity INTEGER NOT NULL, price REAL NOT NULL.\n2) Insert exactly these rows: ('Pine Ridge 2P', 2, 149.0), ('Pine Ridge 4P', 4, 219.0), ('Alpine Solo', 1, 179.0), ('Family Dome 6P', 6, 329.0).\n3) Finish with a SELECT returning model, capacity and price, ordered by id ascending.\n\n${RULES_DDL_INSERT}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "PRIMARY KEY Constraint",
    headerCode: CATS_SCHEMA,
    sourcecode: `CREATE TABLE tents (
  id INTEGER PRIMARY KEY,
  model TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  price REAL NOT NULL
);
INSERT INTO tents (model, capacity, price) VALUES
('Pine Ridge 2P', 2, 149.0),
('Pine Ridge 4P', 4, 219.0),
('Alpine Solo', 1, 179.0),
('Family Dome 6P', 6, 329.0);
SELECT model, capacity, price FROM tents ORDER BY id;`,
    columns: ["model", "capacity", "price"],
    inputconstrains: "SQLite dialect; multi-statement script; categories context table pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Insulated Sleep Tags",
    description: `Sleep-system products get a boolean-style tag: 1 when insulated, 0 when not, stored as an INTEGER flag.\n\n${SCHEMA_CATS}\n\nTask:\n1) Create a table named sleep_gear with exactly these columns: id INTEGER PRIMARY KEY, item TEXT NOT NULL, insulated INTEGER NOT NULL.\n2) Insert exactly these rows: ('Synthetic Bag', 1), ('Cotton Liner', 0), ('Foam Pad', 0), ('Down Quilt', 1).\n3) Finish with a SELECT returning item and insulated, ordered by id ascending.\n\n${RULES_DDL_INSERT}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Boolean Data Type",
    headerCode: CATS_SCHEMA,
    sourcecode: `CREATE TABLE sleep_gear (
  id INTEGER PRIMARY KEY,
  item TEXT NOT NULL,
  insulated INTEGER NOT NULL
);
INSERT INTO sleep_gear (item, insulated) VALUES
('Synthetic Bag', 1),
('Cotton Liner', 0),
('Foam Pad', 0),
('Down Quilt', 1);
SELECT item, insulated FROM sleep_gear ORDER BY id;`,
    columns: ["item", "insulated"],
    inputconstrains: "SQLite dialect; multi-statement script; categories context table pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Cook Kit Prices",
    description: `Prices carry cents, so the money column is REAL. Load the cook kit and list it priciest first.\n\n${SCHEMA_CATS}\n\nTask:\n1) Create a table named cook_kit with exactly these columns: id INTEGER PRIMARY KEY, item TEXT NOT NULL, price REAL NOT NULL.\n2) Insert exactly these rows: ('Espresso Pot', 54.25), ('Griddle', 39.99), ('Utensil Set', 18.5).\n3) Finish with a SELECT returning item and price, ordered by price descending.\n\n${RULES_DDL_INSERT}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Numeric Data Types",
    headerCode: CATS_SCHEMA,
    sourcecode: `CREATE TABLE cook_kit (
  id INTEGER PRIMARY KEY,
  item TEXT NOT NULL,
  price REAL NOT NULL
);
INSERT INTO cook_kit (item, price) VALUES
('Espresso Pot', 54.25),
('Griddle', 39.99),
('Utensil Set', 18.5);
SELECT item, price FROM cook_kit ORDER BY price DESC;`,
    columns: ["item", "price"],
    inputconstrains: "SQLite dialect; multi-statement script; categories context table pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Reservation Dates Sheet",
    description: `Campsite reservations pair an ISO text date with a whole number of nights — a TEXT date and an INTEGER duration living side by side.\n\n${SCHEMA_CATS}\n\nTask:\n1) Create a table named reservations with exactly these columns: id INTEGER PRIMARY KEY, camper TEXT NOT NULL, start_date TEXT NOT NULL, nights INTEGER NOT NULL.\n2) Insert exactly these rows: ('Nora Blum', '2025-08-03', 4), ('Kai Mensah', '2025-07-27', 2), ('Ana Reyes', '2025-08-03', 6).\n3) Finish with a SELECT returning camper, start_date and nights, ordered by start_date ascending, tie-break by camper ascending.\n\n${RULES_DDL_INSERT}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Date and Time Data Types",
    headerCode: CATS_SCHEMA,
    sourcecode: `CREATE TABLE reservations (
  id INTEGER PRIMARY KEY,
  camper TEXT NOT NULL,
  start_date TEXT NOT NULL,
  nights INTEGER NOT NULL
);
INSERT INTO reservations (camper, start_date, nights) VALUES
('Nora Blum', '2025-08-03', 4),
('Kai Mensah', '2025-07-27', 2),
('Ana Reyes', '2025-08-03', 6);
SELECT camper, start_date, nights FROM reservations ORDER BY start_date ASC, camper ASC;`,
    columns: ["camper", "start_date", "nights"],
    inputconstrains: "SQLite dialect; multi-statement script; categories context table pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── medium · scenario (6) ────────────────────────────────────────── */
  {
    title: "Gear With a Price Floor",
    description: `Bad stock imports once sold a tent for 0 dollars. Guard the new table with CHECK rules and load four valid rows.\n\n${SCHEMA_CATS}\n\nTask:\n1) Create a table named gear with exactly these columns: id INTEGER PRIMARY KEY, name TEXT NOT NULL, price REAL NOT NULL CHECK (price > 0), qty INTEGER NOT NULL DEFAULT 0 CHECK (qty >= 0).\n2) Insert exactly these rows: ('Trekking Poles', 64.0, 12), ('Camp Chair', 45.5, 7), ('Dry Bag', 22.0, 0), ('Trail Noodles', 4.5, 40).\n3) Finish with a SELECT returning name, price and qty, ordered by name ascending.\n\n${RULES_DDL_INSERT}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "CHECK Constraint",
    headerCode: CATS_SCHEMA,
    sourcecode: `CREATE TABLE gear (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL CHECK (price > 0),
  qty INTEGER NOT NULL DEFAULT 0 CHECK (qty >= 0)
);
INSERT INTO gear (name, price, qty) VALUES
('Trekking Poles', 64.0, 12),
('Camp Chair', 45.5, 7),
('Dry Bag', 22.0, 0),
('Trail Noodles', 4.5, 40);
SELECT name, price, qty FROM gear ORDER BY name;`,
    columns: ["name", "price", "qty"],
    inputconstrains: "SQLite dialect; multi-statement script; categories context table pre-seeded", blacklist: "DROP TABLE", whitelist: "CHECK, CREATE TABLE, INSERT INTO",
  },
  {
    title: "Model Names Stay Unique",
    description: `Two tents must never share a model name on the wall — put a UNIQUE rule on the model column and load four models.\n\n${SCHEMA_CATS}\n\nTask:\n1) Create a table named tents with exactly these columns: id INTEGER PRIMARY KEY, model TEXT NOT NULL UNIQUE, capacity INTEGER NOT NULL.\n2) Insert exactly these rows: ('Pine Ridge 2P', 2), ('Alpine Solo', 1), ('Family Dome 6P', 6), ('Cloudrest 3P', 3).\n3) Finish with a SELECT returning model and capacity, ordered by model ascending.\n\n${RULES_DDL_INSERT}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "UNIQUE Constraint",
    headerCode: CATS_SCHEMA,
    sourcecode: `CREATE TABLE tents (
  id INTEGER PRIMARY KEY,
  model TEXT NOT NULL UNIQUE,
  capacity INTEGER NOT NULL
);
INSERT INTO tents (model, capacity) VALUES
('Pine Ridge 2P', 2),
('Alpine Solo', 1),
('Family Dome 6P', 6),
('Cloudrest 3P', 3);
SELECT model, capacity FROM tents ORDER BY model;`,
    columns: ["model", "capacity"],
    inputconstrains: "SQLite dialect; multi-statement script; categories context table pre-seeded", blacklist: "CHECK", whitelist: "UNIQUE, CREATE TABLE",
  },
  {
    title: "Packing List Defaults",
    description: `Most packing list rows are single items, so qty should default to 1 and only be typed when it differs. Note which INSERTs rely on the default.\n\n${SCHEMA_CATS}\n\nTask:\n1) Create a table named packing with exactly these columns: id INTEGER PRIMARY KEY, item TEXT NOT NULL, qty INTEGER NOT NULL DEFAULT 1.\n2) Insert exactly these rows: ('Headlamp') and ('Water Bottle') supplying only the item (qty comes from the default), then ('Camp Stove', 2) supplying item and qty.\n3) Finish with a SELECT returning item and qty, ordered by id ascending.\n\n${RULES_DDL_INSERT}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "NOT NULL and DEFAULT Constraints",
    headerCode: CATS_SCHEMA,
    sourcecode: `CREATE TABLE packing (
  id INTEGER PRIMARY KEY,
  item TEXT NOT NULL,
  qty INTEGER NOT NULL DEFAULT 1
);
INSERT INTO packing (item) VALUES
('Headlamp'),
('Water Bottle');
INSERT INTO packing (item, qty) VALUES ('Camp Stove', 2);
SELECT item, qty FROM packing ORDER BY id;`,
    columns: ["item", "qty"],
    inputconstrains: "SQLite dialect; multi-statement script; categories context table pre-seeded", blacklist: "DROP TABLE", whitelist: "DEFAULT, INSERT INTO",
  },
  {
    title: "Link Gear to Categories",
    description: `Every gear row belongs to a shop category. The link is stored as a plain INTEGER column referencing categories.id.\n\n${SCHEMA_CATS_FK}\n\nTask:\n1) Create a table named gear with exactly these columns: id INTEGER PRIMARY KEY, name TEXT NOT NULL, category_id INTEGER NOT NULL.\n2) Insert exactly these rows: ('Dome Tent', 1), ('Sleeping Bag', 2), ('Espresso Pot', 3), ('Lantern', 4), ('Whistle', 5).\n3) Finish with a SELECT returning name and category_id, ordered by category_id ascending.\n\n${RULES_DDL_INSERT}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "FOREIGN KEY Constraint",
    headerCode: CATS_SCHEMA,
    sourcecode: `CREATE TABLE gear (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category_id INTEGER NOT NULL
);
INSERT INTO gear (name, category_id) VALUES
('Dome Tent', 1),
('Sleeping Bag', 2),
('Espresso Pot', 3),
('Lantern', 4),
('Whistle', 5);
SELECT name, category_id FROM gear ORDER BY category_id;`,
    columns: ["name", "category_id"],
    inputconstrains: "SQLite dialect; multi-statement script; categories context table pre-seeded", blacklist: "ALTER TABLE", whitelist: "CREATE TABLE, INSERT INTO",
  },
  {
    title: "Numeric Affinity Probe",
    description: `The sensor bench logs probe readings into a NUMERIC column. NUMERIC affinity converts an integral real like 3.0 to the integer 3 — watch the probe output confirm it.\n\n${SCHEMA_CATS}\n\nTask:\n1) Create a table named probes with exactly these columns: id INTEGER PRIMARY KEY, label TEXT NOT NULL, reading NUMERIC NOT NULL.\n2) Insert exactly these rows: ('sensor-a', 3.0), ('sensor-b', 2.5), ('sensor-c', 7), ('sensor-d', -0.5).\n3) Finish with a SELECT returning label and reading, ordered by id ascending.\n\n${RULES_DDL_INSERT}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Numeric Data Types",
    headerCode: CATS_SCHEMA,
    sourcecode: `CREATE TABLE probes (
  id INTEGER PRIMARY KEY,
  label TEXT NOT NULL,
  reading NUMERIC NOT NULL
);
INSERT INTO probes (label, reading) VALUES
('sensor-a', 3.0),
('sensor-b', 2.5),
('sensor-c', 7),
('sensor-d', -0.5);
SELECT label, reading FROM probes ORDER BY id;`,
    columns: ["label", "reading"],
    inputconstrains: "SQLite dialect; multi-statement script; categories context table pre-seeded", blacklist: "CAST, REAL", whitelist: "NUMERIC, CREATE TABLE",
  },
  {
    title: "Trip Windows as Text Dates",
    description: `Planned trips are stored with ISO text dates. Load three trips and list them in calendar order — plain TEXT ordering does the right thing.\n\n${SCHEMA_CATS}\n\nTask:\n1) Create a table named trips with exactly these columns: id INTEGER PRIMARY KEY, trip_name TEXT NOT NULL, start_date TEXT NOT NULL, end_date TEXT NOT NULL.\n2) Insert exactly these rows: ('Ridge Loop', '2025-09-02', '2025-09-05'), ('Lake Meander', '2025-09-01', '2025-09-03'), ('Summit Push', '2025-09-04', '2025-09-09').\n3) Finish with a SELECT returning trip_name, start_date and end_date, ordered by start_date ascending.\n\n${RULES_DDL_INSERT}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Date and Time Data Types",
    headerCode: CATS_SCHEMA,
    sourcecode: `CREATE TABLE trips (
  id INTEGER PRIMARY KEY,
  trip_name TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL
);
INSERT INTO trips (trip_name, start_date, end_date) VALUES
('Ridge Loop', '2025-09-02', '2025-09-05'),
('Lake Meander', '2025-09-01', '2025-09-03'),
('Summit Push', '2025-09-04', '2025-09-09');
SELECT trip_name, start_date, end_date FROM trips ORDER BY start_date;`,
    columns: ["trip_name", "start_date", "end_date"],
    inputconstrains: "SQLite dialect; multi-statement script; categories context table pre-seeded", blacklist: "date(", whitelist: "TEXT, ORDER BY",
  },

  /* ── hard · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Strict Gear Schema Rollout",
    description: `After a bad import, the shop rolls out a strict gear table: unique names, positive prices below the 5000-dollar POS limit, and a non-negative quantity defaulting to zero.\n\n${SCHEMA_CATS}\n\nTask:\n1) Create a table named gear with exactly these columns: id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, price REAL NOT NULL CHECK (price > 0 AND price < 5000), qty INTEGER NOT NULL DEFAULT 0 CHECK (qty >= 0).\n2) Insert exactly these rows: ('Jetboil Stove', 109.99, 4), ('Bear Canister', 84.5, 0), ('Trail Tent 2P', 189.0, 6), ('Micro Towel', 12.25, 15), ('Solar Lantern', 49.9, 2).\n3) Finish with a SELECT returning name, price and qty, ordered by name ascending.\n\n${RULES_DDL_INSERT}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "CHECK Constraint",
    headerCode: CATS_SCHEMA,
    sourcecode: `CREATE TABLE gear (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  price REAL NOT NULL CHECK (price > 0 AND price < 5000),
  qty INTEGER NOT NULL DEFAULT 0 CHECK (qty >= 0)
);
INSERT INTO gear (name, price, qty) VALUES
('Jetboil Stove', 109.99, 4),
('Bear Canister', 84.5, 0),
('Trail Tent 2P', 189.0, 6),
('Micro Towel', 12.25, 15),
('Solar Lantern', 49.9, 2);
SELECT name, price, qty FROM gear ORDER BY name;`,
    columns: ["name", "price", "qty"],
    inputconstrains: "SQLite dialect; multi-statement script; categories context table pre-seeded", blacklist: "ALTER TABLE, DROP TABLE", whitelist: "CHECK, UNIQUE",
  },
  {
    title: "Keyed Gear Across Categories",
    description: `The full catalog links each item to its category id, keeps prices non-negative via a CHECK, and defaults missing prices to zero.\n\n${SCHEMA_CATS_FK}\n\nTask:\n1) Create a table named gear with exactly these columns: id INTEGER PRIMARY KEY, name TEXT NOT NULL, category_id INTEGER NOT NULL, price REAL NOT NULL DEFAULT 0 CHECK (price >= 0).\n2) Insert exactly these rows: ('Dome Tent', 1, 129.0), ('Tarp', 1, 39.0), ('Sleeping Bag', 2, 89.5), ('Foam Pad', 2, 29.0), ('Lantern', 4, 24.5), ('First Aid Kit', 5, 18.0).\n3) Finish with a SELECT returning name, category_id and price, ordered by category_id ascending, then price descending, then name ascending.\n\n${RULES_DDL_INSERT}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "FOREIGN KEY Constraint",
    headerCode: CATS_SCHEMA,
    sourcecode: `CREATE TABLE gear (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category_id INTEGER NOT NULL,
  price REAL NOT NULL DEFAULT 0 CHECK (price >= 0)
);
INSERT INTO gear (name, category_id, price) VALUES
('Dome Tent', 1, 129.0),
('Tarp', 1, 39.0),
('Sleeping Bag', 2, 89.5),
('Foam Pad', 2, 29.0),
('Lantern', 4, 24.5),
('First Aid Kit', 5, 18.0);
SELECT name, category_id, price FROM gear ORDER BY category_id ASC, price DESC, name ASC;`,
    columns: ["name", "category_id", "price"],
    inputconstrains: "SQLite dialect; multi-statement script; categories context table pre-seeded", blacklist: "DROP TABLE", whitelist: "CREATE TABLE, CHECK",
  },
  {
    title: "Affinity Matrix Probe",
    description: `A training exercise builds one table with all four main affinities and loads values that reveal how each column stores its data: TEXT keeps leading zeros, NUMERIC collapses integral reals to integers.\n\n${SCHEMA_CATS}\n\nTask:\n1) Create a table named affinity_probe with exactly these columns: id INTEGER PRIMARY KEY, int_col INTEGER NOT NULL, text_col TEXT NOT NULL, real_col REAL NOT NULL, num_col NUMERIC NOT NULL.\n2) Insert exactly these rows: (1, 42, '0042', 0.5, 3.0), (2, -7, '-007', 2.5, 7.0), (3, 100, '100km', 1.25, 10.5).\n3) Finish with a SELECT returning id, int_col, text_col, real_col and num_col, ordered by id ascending.\n\n${RULES_DDL_INSERT}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Numeric Data Types",
    headerCode: CATS_SCHEMA,
    sourcecode: `CREATE TABLE affinity_probe (
  id INTEGER PRIMARY KEY,
  int_col INTEGER NOT NULL,
  text_col TEXT NOT NULL,
  real_col REAL NOT NULL,
  num_col NUMERIC NOT NULL
);
INSERT INTO affinity_probe (int_col, text_col, real_col, num_col) VALUES
(42, '0042', 0.5, 3.0),
(-7, '-007', 2.5, 7.0),
(100, '100km', 1.25, 10.5);
SELECT id, int_col, text_col, real_col, num_col FROM affinity_probe ORDER BY id;`,
    columns: ["id", "int_col", "text_col", "real_col", "num_col"],
    inputconstrains: "SQLite dialect; multi-statement script; categories context table pre-seeded", blacklist: "CAST", whitelist: "NUMERIC, TEXT, REAL",
  },
  {
    title: "Reservation Rules Stack",
    description: `Campsite bookings get the full constraint stack: identity key, required camper and site, one booking per site, sane night counts, and a default gear kit.\n\n${SCHEMA_CATS}\n\nTask:\n1) Create a table named bookings with exactly these columns: id INTEGER PRIMARY KEY, camper TEXT NOT NULL, site TEXT NOT NULL UNIQUE, nights INTEGER NOT NULL CHECK (nights BETWEEN 1 AND 30), gear_kit TEXT NOT NULL DEFAULT 'standard'.\n2) Insert exactly these rows: ('Nora Blum', 'A12', 4, 'deluxe'), ('Kai Mensah', 'B03', 2, 'standard'), ('Ana Reyes', 'C07', 6, 'standard'), and one more row supplying only camper, site and nights: ('Sam Okafor', 'D01', 3) — its gear_kit comes from the default.\n3) Finish with a SELECT returning camper, site, nights and gear_kit, ordered by site ascending.\n\n${RULES_DDL_INSERT}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "NOT NULL and DEFAULT Constraints",
    headerCode: CATS_SCHEMA,
    sourcecode: `CREATE TABLE bookings (
  id INTEGER PRIMARY KEY,
  camper TEXT NOT NULL,
  site TEXT NOT NULL UNIQUE,
  nights INTEGER NOT NULL CHECK (nights BETWEEN 1 AND 30),
  gear_kit TEXT NOT NULL DEFAULT 'standard'
);
INSERT INTO bookings (camper, site, nights, gear_kit) VALUES
('Nora Blum', 'A12', 4, 'deluxe'),
('Kai Mensah', 'B03', 2, 'standard'),
('Ana Reyes', 'C07', 6, 'standard');
INSERT INTO bookings (camper, site, nights) VALUES ('Sam Okafor', 'D01', 3);
SELECT camper, site, nights, gear_kit FROM bookings ORDER BY site;`,
    columns: ["camper", "site", "nights", "gear_kit"],
    inputconstrains: "SQLite dialect; multi-statement script; categories context table pre-seeded", blacklist: "DROP TABLE", whitelist: "CHECK, DEFAULT, UNIQUE",
  },
];

/* ── MCQs (20: 10 easy / 6 medium / 4 hard; 6 snippets; 5/5/5/5 spread) ── */
const mcqs: SqlMcqQuestionIn[] = [
  { title: "INTEGER Column Stores", description: "A column declared INTEGER stores…", difficulty: "easy", topic: TOPIC, subtopic: "Numeric Data Types",
    Option1: "Only positive numbers", Option2: "Any value as untouched text", Option3: "Whole numbers (integers)", Option4: "Only values under two billion", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "TEXT Affinity Behavior", description: "Inserting the number 25 into a column declared TEXT stores…", difficulty: "easy", topic: TOPIC, subtopic: "Text and Character Data Types",
    Option1: "The text '25', because TEXT affinity converts values to text", Option2: "The integer 25", Option3: "A BLOB", Option4: "NULL — numbers are rejected", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Where CHECK May Sit", description: "In a CREATE TABLE statement, where can a CHECK constraint appear?", difficulty: "easy", topic: TOPIC, subtopic: "CHECK Constraint",
    Option1: "Only next to a single column", Option2: "Only at the end of the table definition", Option3: "Inside INSERT statements", Option4: "Either on a column definition or at table level", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Boolean Convention", description: "SQLite has no separate BOOLEAN type; boolean values are conventionally stored as…", difficulty: "easy", topic: TOPIC, subtopic: "Boolean Data Type",
    Option1: "The letters T and F", Option2: "Integers 0 and 1", Option3: "The strings 'yes' and 'no' only", Option4: "A special TRUE/FALSE storage class", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "PRIMARY KEY Effect", description: "A column declared INTEGER PRIMARY KEY…", difficulty: "easy", topic: TOPIC, subtopic: "PRIMARY KEY Constraint",
    Option1: "Allows duplicate values", Option2: "Must be declared TEXT", Option3: "Automatically sorts rows in every SELECT", Option4: "Uniquely identifies each row and aliases the rowid", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "NOT NULL Effect", description: "A NOT NULL column…", difficulty: "easy", topic: TOPIC, subtopic: "NOT NULL and DEFAULT Constraints",
    Option1: "Must be the table's first column", Option2: "Rejects inserts that leave it NULL", Option3: "Gets a default value automatically", Option4: "Cannot hold text", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Spot the Failing INSERT", description: "Given this table definition, which INSERT fails?", difficulty: "easy", topic: TOPIC, subtopic: "CHECK Constraint",
    Option1: "INSERT INTO kits (id, price) VALUES (1, -5.0);", Option2: "INSERT INTO kits (id, price) VALUES (2, 12.5);", Option3: "INSERT INTO kits (id, price) VALUES (3, 0.5);", Option4: "INSERT INTO kits (id, price) VALUES (4, 100);", CorrectOption: 1, iscodesnippet: true, codesnippet: "CREATE TABLE kits (\n  id INTEGER PRIMARY KEY,\n  price REAL CHECK (price > 0)\n);", snippetLang: "sql" },
  { title: "DEFAULT Trigger Point", description: "A DEFAULT value on a column is applied when…", difficulty: "easy", topic: TOPIC, subtopic: "NOT NULL and DEFAULT Constraints",
    Option1: "Every insert, always", Option2: "Only UPDATE statements run", Option3: "An INSERT omits that column", Option4: "The column is also NOT NULL", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "UNIQUE vs PRIMARY KEY", description: "Which statement about UNIQUE and PRIMARY KEY is true?", difficulty: "easy", topic: TOPIC, subtopic: "UNIQUE Constraint",
    Option1: "UNIQUE columns may contain duplicates", Option2: "A table can declare many primary keys", Option3: "UNIQUE columns cannot be TEXT", Option4: "A table may have several UNIQUE columns but one primary key", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "ISO Date Storage", description: "Given this table, what storage class does the start_date value '2025-07-01' end up as?", difficulty: "easy", topic: TOPIC, subtopic: "Date and Time Data Types",
    Option1: "INTEGER seconds since 2000", Option2: "TEXT — ISO-8601 dates are stored as text and sort naturally", Option3: "BOOLEAN", Option4: "BLOB", CorrectOption: 2, iscodesnippet: true, codesnippet: "CREATE TABLE trips (\n  id INTEGER PRIMARY KEY,\n  start_date TEXT NOT NULL\n);\nINSERT INTO trips (start_date) VALUES ('2025-07-01');", snippetLang: "sql" },
  { title: "NUMERIC Affinity", description: "Inserting the real 3.0 into a NUMERIC column stores…", difficulty: "medium", topic: TOPIC, subtopic: "Numeric Data Types",
    Option1: "The text '3.0'", Option2: "The REAL 3.0", Option3: "The integer 3 — a lossless real-to-integer conversion", Option4: "NULL", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "When CHECK Fires", description: "CHECK constraints are evaluated…", difficulty: "medium", topic: TOPIC, subtopic: "CHECK Constraint",
    Option1: "Only during SELECT queries", Option2: "Once, when the table is created", Option3: "Only by triggers", Option4: "When a row is inserted or updated", CorrectOption: 4, iscodesnippet: true, codesnippet: "CREATE TABLE pots (\n  id INTEGER PRIMARY KEY,\n  price REAL CHECK (price >= 0)\n);\nINSERT INTO pots (price) VALUES (-3);", snippetLang: "sql" },
  { title: "DEFAULT in Action", description: "What qty does the Headlamp row get?", difficulty: "medium", topic: TOPIC, subtopic: "NOT NULL and DEFAULT Constraints",
    Option1: "1 — the DEFAULT fills the omitted column", Option2: "NULL", Option3: "0", Option4: "The insert fails — qty is missing", CorrectOption: 1, iscodesnippet: true, codesnippet: "CREATE TABLE packs (\n  id INTEGER PRIMARY KEY,\n  item TEXT NOT NULL,\n  qty INTEGER NOT NULL DEFAULT 1\n);\nINSERT INTO packs (item) VALUES ('Headlamp');", snippetLang: "sql" },
  { title: "FOREIGN KEY Enforcement", description: "In SQLite, a FOREIGN KEY clause is enforced only when…", difficulty: "medium", topic: TOPIC, subtopic: "FOREIGN KEY Constraint",
    Option1: "Always, by default", Option2: "Never, under any setting", Option3: "PRAGMA foreign_keys is switched ON", Option4: "The referenced column is TEXT", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "TEXT Keeps Leading Zeros", description: "Inserting the string '0042' into a TEXT column stores…", difficulty: "medium", topic: TOPIC, subtopic: "Text and Character Data Types",
    Option1: "The text '0042' with the zeros kept", Option2: "The integer 42", Option3: "The real 42.0", Option4: "NULL — leading zeros are dropped", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Auto-Assigned First Id", description: "Given this snippet, what id does the Lantern row get?", difficulty: "medium", topic: TOPIC, subtopic: "PRIMARY KEY Constraint",
    Option1: "1 — the first row's auto-assigned key", Option2: "NULL", Option3: "0", Option4: "A random value", CorrectOption: 1, iscodesnippet: true, codesnippet: "CREATE TABLE gear (\n  id INTEGER PRIMARY KEY,\n  name TEXT\n);\nINSERT INTO gear (name) VALUES ('Lantern');", snippetLang: "sql" },
  { title: "0/1 Flag Guarded by CHECK", description: "Adding CHECK (flag = 0 OR flag = 1) to an INTEGER flag column…", difficulty: "hard", topic: TOPIC, subtopic: "Boolean Data Type",
    Option1: "Makes the column a real BOOLEAN type", Option2: "Restricts the column to true/false-style values only", Option3: "Converts text flags to integers", Option4: "Only works on TEXT columns", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Unenforced Reference", description: "With SQLite's default setting (foreign keys OFF), inserting gear_id 99 when no gear row 99 exists…", difficulty: "hard", topic: TOPIC, subtopic: "FOREIGN KEY Constraint",
    Option1: "Succeeds — the plain INTEGER column is not checked", Option2: "Fails with a foreign-key violation", Option3: "Inserts the row with gear_id NULL", Option4: "Creates the missing gear row automatically", CorrectOption: 1, iscodesnippet: true, codesnippet: "CREATE TABLE orders (\n  id INTEGER PRIMARY KEY,\n  gear_id INTEGER  -- plain INTEGER, no enforcement\n);\nINSERT INTO orders (gear_id) VALUES (99);", snippetLang: "sql" },
  { title: "Multi-Column UNIQUE", description: "Declaring UNIQUE (a, b) on a table means…", difficulty: "hard", topic: TOPIC, subtopic: "UNIQUE Constraint",
    Option1: "a and b may each never repeat anywhere", Option2: "Only a must be unique", Option3: "The pair must both be NOT NULL", Option4: "The combination of a and b must be unique across rows", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Why ISO Dates Sort Right", description: "Why do ISO-8601 TEXT dates like 2025-07-01 order correctly under ORDER BY?", difficulty: "hard", topic: TOPIC, subtopic: "Date and Time Data Types",
    Option1: "SQLite parses TEXT dates into a special date type", Option2: "ORDER BY silently converts TEXT to dates", Option3: "Lexicographic order matches chronological order for fixed-width ISO dates", Option4: "They do not — TEXT dates sort randomly", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
];

await buildDay({ day: DAY, topic: TOPIC, subtopics: SUBTOPICS, codeQuestions, mcqs });
