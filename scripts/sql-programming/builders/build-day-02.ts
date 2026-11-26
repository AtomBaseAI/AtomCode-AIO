/**
 * Day 2 — "Data Definition Language (DDL)".
 *
 * Domain: a neighborhood bakery. Pattern: headerCode seeds a CONTEXT table
 * (breads, 5 rows) that tasks may reference; the STUDENT script creates the
 * graded table per the task's exact column spec, INSERTs the rows given in
 * the task description, and finishes with a deterministic SELECT. Several
 * questions are graded via introspection (sqlite_master name/type — never the
 * sql column — or pragma_table_info). ALTER/DROP/RENAME questions mutate the
 * context table or a student-created table. The header always contains at
 * least one CREATE TABLE (the context table).
 *
 * Run from /home/z/my-project:
 *   bun scripts/sql-programming/builders/build-day-02.ts
 */
import { buildDay, type SqlCodeQuestionIn, type SqlMcqQuestionIn } from "../lib.ts";

const DAY = 2;
const TOPIC = "Data Definition Language (DDL)";
const SUBTOPICS = [
  "CREATE TABLE",
  "ALTER TABLE",
  "DROP TABLE",
  "Schema Management",
  "Naming Conventions",
];

/* Shared hidden setup: the bakery's context table. */
const BREADS_SCHEMA = `CREATE TABLE breads (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  kind TEXT NOT NULL
);
INSERT INTO breads (name, price, kind) VALUES
('Baguette', 3.2, 'wheat'),
('Sourdough Loaf', 5.5, 'sourdough'),
('Rye Boule', 4.8, 'rye'),
('Ciabatta', 4.2, 'wheat'),
('Focaccia', 3.9, 'flatbread');`;

/* Extra context: an obsolete menu board used by the DROP drill. */
const OLD_MENU_SCHEMA = `

CREATE TABLE old_menu (
  id INTEGER PRIMARY KEY,
  item TEXT NOT NULL,
  price REAL NOT NULL
);
INSERT INTO old_menu (item, price) VALUES
('Honey Cruller', 2.8),
('Plain Bagel', 1.9);`;

/* Extra context: a clearance bin used by the second DROP drill. */
const CLEARANCE_SCHEMA = `

CREATE TABLE clearance_items (
  id INTEGER PRIMARY KEY,
  item TEXT NOT NULL,
  price REAL NOT NULL
);
INSERT INTO clearance_items (item, price) VALUES
('Day-Old Baguette', 1.5),
('Day-Old Focaccia', 2.0),
('Stale Croutons', 0.9);`;

/* Extra context: the cakes table with rows, used by the ALTER drill. */
const CAKES_SCHEMA = `

CREATE TABLE cakes (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL
);
INSERT INTO cakes (name, price) VALUES
('Lemon Drizzle', 12.5),
('Red Velvet', 16.0),
('Carrot Cake', 11.0);`;

const SCHEMA_BREADS =
  "Schema:\n- breads(id INTEGER PRIMARY KEY, name TEXT, price REAL, kind TEXT)\n\nThe bakery's context table breads is pre-seeded with five loaves. It already exists when your script runs — do not drop or recreate it unless a task says so.";

const RULES_DDL =
  "Rules:\n- SQLite dialect. The context tables are pre-seeded automatically — do not recreate them.\n- Write complete statements, each ending with a semicolon; the final SELECT produces the graded result.\n- Column names and order must match exactly (alias every output column of the final SELECT).\n- Row order must match exactly (use ORDER BY as specified).";

const codeQuestions: SqlCodeQuestionIn[] = [
  /* ── easy · basic (6) ─────────────────────────────────────────────── */
  {
    title: "Bake the Cakes Table",
    description: `The bakery wants a proper cakes table alongside its breads ledger. Create it, load it, and read it back.\n\n${SCHEMA_BREADS}\n\nTask:\n1) Create a table named cakes with exactly these columns: id INTEGER PRIMARY KEY, name TEXT NOT NULL, price REAL NOT NULL.\n2) Insert exactly these rows: (1, 'Lemon Drizzle', 12.5), (2, 'Red Velvet', 16.0), (3, 'Carrot Cake', 11.0).\n3) Finish with a SELECT over cakes returning name and price, one row per cake, ordered by name ascending.\n\n${RULES_DDL}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CREATE TABLE",
    headerCode: BREADS_SCHEMA,
    sourcecode: `CREATE TABLE cakes (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL
);
INSERT INTO cakes (id, name, price) VALUES
(1, 'Lemon Drizzle', 12.5),
(2, 'Red Velvet', 16.0),
(3, 'Carrot Cake', 11.0);
SELECT name, price FROM cakes ORDER BY name;`,
    columns: ["name", "price"],
    inputconstrains: "SQLite dialect; multi-statement DDL script; breads context table pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Start the Pastry Ledger",
    description: `Create the pastry ledger exactly to spec and list it back in insertion order.\n\n${SCHEMA_BREADS}\n\nTask:\n1) Create a table named pastries with exactly these columns: id INTEGER PRIMARY KEY, name TEXT NOT NULL, price REAL NOT NULL.\n2) Insert exactly these rows: (1, 'Almond Croissant', 3.8), (2, 'Pain au Chocolat', 4.1), (3, 'Cinnamon Roll', 3.5), (4, 'Butter Scone', 2.9).\n3) Finish with a SELECT over pastries returning id, name and price, ordered by id ascending.\n\n${RULES_DDL}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CREATE TABLE",
    headerCode: BREADS_SCHEMA,
    sourcecode: `CREATE TABLE pastries (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL
);
INSERT INTO pastries (id, name, price) VALUES
(1, 'Almond Croissant', 3.8),
(2, 'Pain au Chocolat', 4.1),
(3, 'Cinnamon Roll', 3.5),
(4, 'Butter Scone', 2.9);
SELECT id, name, price FROM pastries ORDER BY id;`,
    columns: ["id", "name", "price"],
    inputconstrains: "SQLite dialect; multi-statement DDL script; breads context table pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Add a Slice Count Column",
    description: `The cakes table already exists with three rows. Extend its schema without touching the data.\n\nSchema:\n- breads(id INTEGER PRIMARY KEY, name TEXT, price REAL, kind TEXT)\n- cakes(id INTEGER PRIMARY KEY, name TEXT, price REAL)\n\nBoth context tables are pre-seeded (cakes holds three rows).\n\nTask:\n1) ALTER the cakes table to add a new column slices INTEGER NOT NULL DEFAULT 8 (existing rows take the default).\n2) Finish with a SELECT over cakes returning name and slices, ordered by name ascending.\n\n${RULES_DDL}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "ALTER TABLE",
    headerCode: BREADS_SCHEMA + CAKES_SCHEMA,
    sourcecode: `ALTER TABLE cakes ADD COLUMN slices INTEGER NOT NULL DEFAULT 8;
SELECT name, slices FROM cakes ORDER BY name;`,
    columns: ["name", "slices"],
    inputconstrains: "SQLite dialect; multi-statement DDL script; context tables pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Retire the Old Menu Board",
    description: `The old_menu board is obsolete. Remove the table itself — not just its rows — then prove via the catalog what remains.\n\nSchema:\n- breads(id INTEGER PRIMARY KEY, name TEXT, price REAL, kind TEXT)\n- old_menu(id INTEGER PRIMARY KEY, item TEXT, price REAL)\n\nBoth context tables are pre-seeded.\n\nTask:\n1) Drop the old_menu table entirely.\n2) Finish with a SELECT over sqlite_master that lists one column, name, for every remaining row where type is 'table', ordered by name ascending. After the drop only breads should remain.\n\n${RULES_DDL}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "DROP TABLE",
    headerCode: BREADS_SCHEMA + OLD_MENU_SCHEMA,
    sourcecode: `DROP TABLE old_menu;
SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name;`,
    columns: ["name"],
    inputconstrains: "SQLite dialect; multi-statement DDL script; context tables pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Name It Like a Baker",
    description: `House style demands lowercase snake_case names for tables and columns. Create a table following the exact identifiers given.\n\n${SCHEMA_BREADS}\n\nTask:\n1) Create a table named daily_specials with exactly these columns: special_id INTEGER PRIMARY KEY, special_name TEXT NOT NULL, special_price REAL NOT NULL.\n2) Insert exactly these rows: (1, 'Maple Twist', 3.4), (2, 'Blueberry Muffin', 2.7), (3, 'Oat Cookie', 1.8).\n3) Finish with a SELECT returning special_name and special_price, ordered by special_id ascending.\n\n${RULES_DDL}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Naming Conventions",
    headerCode: BREADS_SCHEMA,
    sourcecode: `CREATE TABLE daily_specials (
  special_id INTEGER PRIMARY KEY,
  special_name TEXT NOT NULL,
  special_price REAL NOT NULL
);
INSERT INTO daily_specials (special_id, special_name, special_price) VALUES
(1, 'Maple Twist', 3.4),
(2, 'Blueberry Muffin', 2.7),
(3, 'Oat Cookie', 1.8);
SELECT special_name, special_price FROM daily_specials ORDER BY special_id;`,
    columns: ["special_name", "special_price"],
    inputconstrains: "SQLite dialect; multi-statement DDL script; breads context table pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Peek at the Bakery Catalog",
    description: `After adding a new table, verify it shows up in the database catalog.\n\n${SCHEMA_BREADS}\n\nTask:\n1) Create a table named muffins with exactly these columns: id INTEGER PRIMARY KEY, kind TEXT NOT NULL.\n2) Insert exactly these rows: (1, 'Blueberry'), (2, 'Chocolate Chip').\n3) Finish with a SELECT over sqlite_master that lists one column, name, for every row where type is 'table', ordered by name ascending — both the context table and your new table should appear.\n\n${RULES_DDL}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Schema Management",
    headerCode: BREADS_SCHEMA,
    sourcecode: `CREATE TABLE muffins (
  id INTEGER PRIMARY KEY,
  kind TEXT NOT NULL
);
INSERT INTO muffins (id, kind) VALUES
(1, 'Blueberry'),
(2, 'Chocolate Chip');
SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name;`,
    columns: ["name"],
    inputconstrains: "SQLite dialect; multi-statement DDL script; breads context table pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── easy · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Wedding Cake Order Sheet",
    description: `A wedding fair is coming and the decorator needs a dedicated order sheet for tiered cakes.\n\n${SCHEMA_BREADS}\n\nTask:\n1) Create a table named wedding_cakes with exactly these columns: id INTEGER PRIMARY KEY, couple TEXT NOT NULL, tiers INTEGER NOT NULL, price REAL NOT NULL.\n2) Insert exactly these rows: (1, 'Ana & Ben', 2, 180.0), (2, 'Chao & Divya', 3, 260.5), (3, 'Eli & Farah', 1, 95.0).\n3) Finish with a SELECT returning couple, tiers and price, ordered by couple ascending.\n\n${RULES_DDL}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CREATE TABLE",
    headerCode: BREADS_SCHEMA,
    sourcecode: `CREATE TABLE wedding_cakes (
  id INTEGER PRIMARY KEY,
  couple TEXT NOT NULL,
  tiers INTEGER NOT NULL,
  price REAL NOT NULL
);
INSERT INTO wedding_cakes (id, couple, tiers, price) VALUES
(1, 'Ana & Ben', 2, 180.0),
(2, 'Chao & Divya', 3, 260.5),
(3, 'Eli & Farah', 1, 95.0);
SELECT couple, tiers, price FROM wedding_cakes ORDER BY couple;`,
    columns: ["couple", "tiers", "price"],
    inputconstrains: "SQLite dialect; multi-statement DDL script; breads context table pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Friday Cookie Tray Log",
    description: `Every Friday the bakers log how many trays of each cookie kind left the kitchen. Give the log a proper table.\n\n${SCHEMA_BREADS}\n\nTask:\n1) Create a table named cookie_trays with exactly these columns: tray_id INTEGER PRIMARY KEY, kind TEXT NOT NULL, tray_count INTEGER NOT NULL.\n2) Insert exactly these rows: (1, 'Chocolate Chip', 6), (2, 'Oat Raisin', 4), (3, 'Peanut Butter', 5), (4, 'Double Choc', 2).\n3) Finish with a SELECT returning kind and tray_count, ordered by tray_id ascending.\n\n${RULES_DDL}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CREATE TABLE",
    headerCode: BREADS_SCHEMA,
    sourcecode: `CREATE TABLE cookie_trays (
  tray_id INTEGER PRIMARY KEY,
  kind TEXT NOT NULL,
  tray_count INTEGER NOT NULL
);
INSERT INTO cookie_trays (tray_id, kind, tray_count) VALUES
(1, 'Chocolate Chip', 6),
(2, 'Oat Raisin', 4),
(3, 'Peanut Butter', 5),
(4, 'Double Choc', 2);
SELECT kind, tray_count FROM cookie_trays ORDER BY tray_id;`,
    columns: ["kind", "tray_count"],
    inputconstrains: "SQLite dialect; multi-statement DDL script; breads context table pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Tag the Gluten-Free Loaves",
    description: `The counter display needs a gluten-free flag on every bread. Extend the context table's schema; every existing row takes the default.\n\n${SCHEMA_BREADS}\n\nTask:\n1) ALTER the breads table to add a new column gluten_free INTEGER NOT NULL DEFAULT 0.\n2) Finish with a SELECT returning name and gluten_free, ordered by name ascending.\n\n${RULES_DDL}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "ALTER TABLE",
    headerCode: BREADS_SCHEMA,
    sourcecode: `ALTER TABLE breads ADD COLUMN gluten_free INTEGER NOT NULL DEFAULT 0;
SELECT name, gluten_free FROM breads ORDER BY name;`,
    columns: ["name", "gluten_free"],
    inputconstrains: "SQLite dialect; multi-statement DDL script; breads context table pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Clear the Clearance Bin",
    description: `The clearance bin experiment is over. Drop its table and confirm the catalog is clean.\n\nSchema:\n- breads(id INTEGER PRIMARY KEY, name TEXT, price REAL, kind TEXT)\n- clearance_items(id INTEGER PRIMARY KEY, item TEXT, price REAL)\n\nBoth context tables are pre-seeded.\n\nTask:\n1) Drop the clearance_items table entirely.\n2) Finish with a SELECT over sqlite_master returning name and type for every row where type is 'table', ordered by name ascending — only the context table should survive.\n\n${RULES_DDL}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "DROP TABLE",
    headerCode: BREADS_SCHEMA + CLEARANCE_SCHEMA,
    sourcecode: `DROP TABLE clearance_items;
SELECT name, type FROM sqlite_master WHERE type = 'table' ORDER BY name;`,
    columns: ["name", "type"],
    inputconstrains: "SQLite dialect; multi-statement DDL script; context tables pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── medium · scenario (6) ────────────────────────────────────────── */
  {
    title: "Extend the Cupcake Case",
    description: `Launch the cupcake case with a batch-note column added before any rows are loaded.\n\n${SCHEMA_BREADS}\n\nTask:\n1) Create a table named cupcakes with exactly these columns: id INTEGER PRIMARY KEY, flavor TEXT NOT NULL, price REAL NOT NULL.\n2) ALTER cupcakes to add a new column batch_note TEXT (nullable).\n3) Insert exactly these rows, including the notes: (1, 'Vanilla Bean', 3.5, 'morning batch'), (2, 'Salted Caramel', 4.0, 'sold fast'), (3, 'Lemon Zest', 3.8, NULL), (4, 'Espresso Swirl', 4.2, 'new recipe').\n4) Finish with a SELECT returning flavor, price and batch_note, ordered by flavor ascending.\n\n${RULES_DDL}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "ALTER TABLE",
    headerCode: BREADS_SCHEMA,
    sourcecode: `CREATE TABLE cupcakes (
  id INTEGER PRIMARY KEY,
  flavor TEXT NOT NULL,
  price REAL NOT NULL
);
ALTER TABLE cupcakes ADD COLUMN batch_note TEXT;
INSERT INTO cupcakes (id, flavor, price, batch_note) VALUES
(1, 'Vanilla Bean', 3.5, 'morning batch'),
(2, 'Salted Caramel', 4.0, 'sold fast'),
(3, 'Lemon Zest', 3.8, NULL),
(4, 'Espresso Swirl', 4.2, 'new recipe');
SELECT flavor, price, batch_note FROM cupcakes ORDER BY flavor;`,
    columns: ["flavor", "price", "batch_note"],
    inputconstrains: "SQLite dialect; multi-statement DDL script; breads context table pre-seeded", blacklist: "DROP TABLE", whitelist: "CREATE TABLE, ALTER TABLE, INSERT INTO",
  },
  {
    title: "Index the Tart Fillings",
    description: `Fillings are looked up constantly, so the baker wants an index named exactly idx_tarts_filling, then proof in the catalog that it exists.\n\n${SCHEMA_BREADS}\n\nTask:\n1) Create a table named tarts with exactly these columns: id INTEGER PRIMARY KEY, filling TEXT NOT NULL, price REAL NOT NULL.\n2) Insert exactly these rows: ('Lemon Curd', 3.6), ('Raspberry', 3.9), ('Chocolate Hazelnut', 4.1).\n3) Create an index named idx_tarts_filling on the tarts column filling.\n4) Finish with a SELECT over sqlite_master listing one column, name, for rows where type is 'index' and the name starts with 'idx', ordered by name ascending.\n\n${RULES_DDL}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Schema Management",
    headerCode: BREADS_SCHEMA,
    sourcecode: `CREATE TABLE tarts (
  id INTEGER PRIMARY KEY,
  filling TEXT NOT NULL,
  price REAL NOT NULL
);
INSERT INTO tarts (filling, price) VALUES
('Lemon Curd', 3.6),
('Raspberry', 3.9),
('Chocolate Hazelnut', 4.1);
CREATE INDEX idx_tarts_filling ON tarts(filling);
SELECT name FROM sqlite_master WHERE type = 'index' AND name LIKE 'idx%' ORDER BY name;`,
    columns: ["name"],
    inputconstrains: "SQLite dialect; multi-statement DDL script; breads context table pre-seeded", blacklist: "DROP INDEX", whitelist: "CREATE INDEX, sqlite_master",
  },
  {
    title: "Archive the Bread Ledger",
    description: `Before a price review, snapshot the ledger's identity columns into an archive table in a single CREATE TABLE … AS SELECT statement.\n\n${SCHEMA_BREADS}\n\nTask:\n1) In ONE statement, create a table named breads_archive as a copy of the breads context table keeping only the columns id, name and price (use CREATE TABLE … AS SELECT).\n2) Finish with a SELECT over breads_archive returning name and price, ordered by name ascending.\n\n${RULES_DDL}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "CREATE TABLE",
    headerCode: BREADS_SCHEMA,
    sourcecode: `CREATE TABLE breads_archive AS SELECT id, name, price FROM breads;
SELECT name, price FROM breads_archive ORDER BY name;`,
    columns: ["name", "price"],
    inputconstrains: "SQLite dialect; multi-statement DDL script; breads context table pre-seeded", blacklist: "INSERT INTO", whitelist: "breads_archive, CREATE TABLE",
  },
  {
    title: "Two Pie Tables, One Survives",
    description: `The pie baker drafts a second table by mistake. Build both, then remove the draft so only the real one remains, and prove it through the catalog.\n\n${SCHEMA_BREADS}\n\nTask:\n1) Create a table named pies with exactly these columns: id INTEGER PRIMARY KEY, filling TEXT NOT NULL, price REAL NOT NULL.\n2) Insert exactly these rows: ('Apple Cinnamon', 5.2), ('Cherry', 5.6), ('Peach Ginger', 5.4).\n3) Create a second table named pies_draft with exactly these columns: id INTEGER, filling TEXT.\n4) Drop the pies_draft table entirely.\n5) Finish with a SELECT over sqlite_master listing one column, name, for rows where type is 'table', ordered by name ascending.\n\n${RULES_DDL}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "DROP TABLE",
    headerCode: BREADS_SCHEMA,
    sourcecode: `CREATE TABLE pies (
  id INTEGER PRIMARY KEY,
  filling TEXT NOT NULL,
  price REAL NOT NULL
);
INSERT INTO pies (filling, price) VALUES
('Apple Cinnamon', 5.2),
('Cherry', 5.6),
('Peach Ginger', 5.4);
CREATE TABLE pies_draft (id INTEGER, filling TEXT);
DROP TABLE pies_draft;
SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name;`,
    columns: ["name"],
    inputconstrains: "SQLite dialect; multi-statement DDL script; breads context table pre-seeded", blacklist: "ALTER TABLE", whitelist: "CREATE TABLE, DROP TABLE, sqlite_master",
  },
  {
    title: "Check the Quiche Schema",
    description: `Before wiring the display cases, inspect the new table's column definitions through SQLite's pragma function.\n\n${SCHEMA_BREADS}\n\nTask:\n1) Create a table named quiches with exactly these columns: id INTEGER PRIMARY KEY, filling TEXT NOT NULL, price REAL NOT NULL.\n2) Insert exactly these rows: ('Leek & Gruyere', 6.5), ('Mushroom Thyme', 6.2).\n3) Finish with a SELECT over pragma_table_info('quiches') returning name and type for every column, ordered by cid ascending.\n\n${RULES_DDL}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Schema Management",
    headerCode: BREADS_SCHEMA,
    sourcecode: `CREATE TABLE quiches (
  id INTEGER PRIMARY KEY,
  filling TEXT NOT NULL,
  price REAL NOT NULL
);
INSERT INTO quiches (filling, price) VALUES
('Leek & Gruyere', 6.5),
('Mushroom Thyme', 6.2);
SELECT name, type FROM pragma_table_info('quiches') ORDER BY cid;`,
    columns: ["name", "type"],
    inputconstrains: "SQLite dialect; multi-statement DDL script; breads context table pre-seeded", blacklist: "sqlite_master", whitelist: "pragma_table_info",
  },
  {
    title: "Index the Scone Shelf",
    description: `Give the scone shelf the same treatment as the tarts: a conventionally named index, then a data listing to confirm the shelf reads well.\n\n${SCHEMA_BREADS}\n\nTask:\n1) Create a table named scones with exactly these columns: id INTEGER PRIMARY KEY, kind TEXT NOT NULL, price REAL NOT NULL.\n2) Insert exactly these rows: ('Currant', 2.6), ('Cheddar Chive', 3.1), ('Lavender Honey', 3.3).\n3) Create an index named idx_scones_kind on the scones column kind.\n4) Finish with a SELECT returning kind and price, ordered by price descending, tie-break by kind ascending.\n\n${RULES_DDL}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Naming Conventions",
    headerCode: BREADS_SCHEMA,
    sourcecode: `CREATE TABLE scones (
  id INTEGER PRIMARY KEY,
  kind TEXT NOT NULL,
  price REAL NOT NULL
);
INSERT INTO scones (kind, price) VALUES
('Currant', 2.6),
('Cheddar Chive', 3.1),
('Lavender Honey', 3.3);
CREATE INDEX idx_scones_kind ON scones(kind);
SELECT kind, price FROM scones ORDER BY price DESC, kind ASC;`,
    columns: ["kind", "price"],
    inputconstrains: "SQLite dialect; multi-statement DDL script; breads context table pre-seeded", blacklist: "DROP INDEX", whitelist: "CREATE INDEX, ORDER BY",
  },

  /* ── hard · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Rebuild and Swap the Bread Ledger",
    description: `SQLite cannot change a column definition in place, so schema reworks use the rebuild-and-rename recipe. Add a whole_grain flag to the breads ledger this way.\n\n${SCHEMA_BREADS}\n\nTask:\n1) Create a table named breads_v2 with exactly these columns: id INTEGER PRIMARY KEY, name TEXT NOT NULL, price REAL NOT NULL, whole_grain INTEGER NOT NULL DEFAULT 1.\n2) Copy every breads row into breads_v2, filling id, name and price from the context table (INSERT … SELECT).\n3) Drop the old breads table.\n4) Rename breads_v2 to breads.\n5) Finish with a SELECT over breads returning name, price and whole_grain, ordered by id ascending (whole_grain comes from the default).\n\n${RULES_DDL}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "ALTER TABLE",
    headerCode: BREADS_SCHEMA,
    sourcecode: `CREATE TABLE breads_v2 (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  whole_grain INTEGER NOT NULL DEFAULT 1
);
INSERT INTO breads_v2 (id, name, price) SELECT id, name, price FROM breads;
DROP TABLE breads;
ALTER TABLE breads_v2 RENAME TO breads;
SELECT name, price, whole_grain FROM breads ORDER BY id;`,
    columns: ["name", "price", "whole_grain"],
    inputconstrains: "SQLite dialect; multi-statement DDL script; breads context table pre-seeded", blacklist: "UPDATE, DELETE FROM", whitelist: "ALTER TABLE, DROP TABLE, INSERT INTO",
  },
  {
    title: "Full Cookie Line Rollout",
    description: `Roll out the cookie line end to end: table, conventionally named index, a batch-number column added afterwards (existing rows take the default), then a clean listing.\n\n${SCHEMA_BREADS}\n\nTask:\n1) Create a table named cookies with exactly these columns: id INTEGER PRIMARY KEY, kind TEXT NOT NULL, price REAL NOT NULL.\n2) Insert exactly these rows: ('Macadamia Crunch', 4.5), ('Double Chocolate', 4.0), ('Lemon Shortbread', 3.4), ('Ginger Snap', 2.9).\n3) Create an index named idx_cookies_kind on the cookies column kind.\n4) ALTER cookies to add a new column batch_no INTEGER NOT NULL DEFAULT 1.\n5) Finish with a SELECT returning kind, price and batch_no, ordered by kind ascending.\n\n${RULES_DDL}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Naming Conventions",
    headerCode: BREADS_SCHEMA,
    sourcecode: `CREATE TABLE cookies (
  id INTEGER PRIMARY KEY,
  kind TEXT NOT NULL,
  price REAL NOT NULL
);
INSERT INTO cookies (kind, price) VALUES
('Macadamia Crunch', 4.5),
('Double Chocolate', 4.0),
('Lemon Shortbread', 3.4),
('Ginger Snap', 2.9);
CREATE INDEX idx_cookies_kind ON cookies(kind);
ALTER TABLE cookies ADD COLUMN batch_no INTEGER NOT NULL DEFAULT 1;
SELECT kind, price, batch_no FROM cookies ORDER BY kind;`,
    columns: ["kind", "price", "batch_no"],
    inputconstrains: "SQLite dialect; multi-statement DDL script; breads context table pre-seeded", blacklist: "DROP TABLE", whitelist: "CREATE TABLE, CREATE INDEX, ALTER TABLE",
  },
  {
    title: "Brownies With an Audit Trail",
    description: `Launch the brownie line and open its audit trail: two tables, two loads, one final reading of the audit rows.\n\n${SCHEMA_BREADS}\n\nTask:\n1) Create a table named brownies with exactly these columns: id INTEGER PRIMARY KEY, kind TEXT NOT NULL, price REAL NOT NULL.\n2) Insert exactly these rows: ('Classic Fudge', 3.8), ('Walnut Swirl', 4.1), ('Espresso Glaze', 4.3).\n3) Create a second table named brownies_audit with exactly these columns: audit_id INTEGER PRIMARY KEY, note TEXT NOT NULL.\n4) Insert exactly these audit rows: ('ledger opened'), ('first batch checked in').\n5) Finish with a SELECT returning note from brownies_audit, ordered by audit_id ascending.\n\n${RULES_DDL}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "CREATE TABLE",
    headerCode: BREADS_SCHEMA,
    sourcecode: `CREATE TABLE brownies (
  id INTEGER PRIMARY KEY,
  kind TEXT NOT NULL,
  price REAL NOT NULL
);
INSERT INTO brownies (kind, price) VALUES
('Classic Fudge', 3.8),
('Walnut Swirl', 4.1),
('Espresso Glaze', 4.3);
CREATE TABLE brownies_audit (
  audit_id INTEGER PRIMARY KEY,
  note TEXT NOT NULL
);
INSERT INTO brownies_audit (note) VALUES
('ledger opened'),
('first batch checked in');
SELECT note FROM brownies_audit ORDER BY audit_id;`,
    columns: ["note"],
    inputconstrains: "SQLite dialect; multi-statement DDL script; breads context table pre-seeded", blacklist: "ALTER TABLE, DROP TABLE", whitelist: "CREATE TABLE, INSERT INTO",
  },
  {
    title: "Rename to the Celebration Line",
    description: `The gateau experiment is being rebranded as the celebration line. Build it, rename it, and verify through the catalog.\n\n${SCHEMA_BREADS}\n\nTask:\n1) Create a table named gateaux with exactly these columns: id INTEGER PRIMARY KEY, style TEXT NOT NULL, price REAL NOT NULL.\n2) Insert exactly these rows: ('Opera', 28.0), ('Black Forest', 24.5).\n3) ALTER the table gateaux so it is renamed to celebration_cakes.\n4) Finish with a SELECT over sqlite_master listing one column, name, for rows where type is 'table', ordered by name ascending — the renamed table and the context table should appear.\n\n${RULES_DDL}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Schema Management",
    headerCode: BREADS_SCHEMA,
    sourcecode: `CREATE TABLE gateaux (
  id INTEGER PRIMARY KEY,
  style TEXT NOT NULL,
  price REAL NOT NULL
);
INSERT INTO gateaux (style, price) VALUES
('Opera', 28.0),
('Black Forest', 24.5);
ALTER TABLE gateaux RENAME TO celebration_cakes;
SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name;`,
    columns: ["name"],
    inputconstrains: "SQLite dialect; multi-statement DDL script; breads context table pre-seeded", blacklist: "DROP TABLE", whitelist: "ALTER TABLE, sqlite_master",
  },
];

/* ── MCQs (20: 10 easy / 6 medium / 4 hard; 6 snippets; 5/5/5/5 spread) ── */
const mcqs: SqlMcqQuestionIn[] = [
  { title: "DDL Purpose", description: "DDL statements define or change…", difficulty: "easy", topic: TOPIC, subtopic: "CREATE TABLE",
    Option1: "The data rows only", Option2: "User permissions", Option3: "The structure of database objects", Option4: "The query cache", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Column Separator", description: "In CREATE TABLE cakes (col_a TEXT, col_b INTEGER), the columns are separated by…", difficulty: "easy", topic: TOPIC, subtopic: "CREATE TABLE",
    Option1: "commas", Option2: "semicolons", Option3: "the word AND", Option4: "pipes", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Add a Column Correctly", description: "Which statement correctly adds a column allergens TEXT to the cakes table?", difficulty: "easy", topic: TOPIC, subtopic: "ALTER TABLE",
    Option1: "UPDATE TABLE cakes ADD allergens TEXT;", Option2: "ALTER cakes ADD COLUMN allergens TEXT;", Option3: "MODIFY TABLE cakes ADD allergens TEXT;", Option4: "ALTER TABLE cakes ADD COLUMN allergens TEXT;", CorrectOption: 4, iscodesnippet: true, codesnippet: "-- which one works in SQLite?\nALTER TABLE cakes ADD COLUMN allergens TEXT;", snippetLang: "sql" },
  { title: "DROP TABLE Effect", description: "DROP TABLE old_menu; does what?", difficulty: "easy", topic: TOPIC, subtopic: "DROP TABLE",
    Option1: "Deletes the rows but keeps the table definition", Option2: "Removes the table definition and all its rows", Option3: "Renames the table", Option4: "Only works on empty tables", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Snake Case Column Name", description: "Which column name follows the lowercase snake_case convention?", difficulty: "easy", topic: TOPIC, subtopic: "Naming Conventions",
    Option1: "UnitPrice", Option2: "unit_price", Option3: "unit price", Option4: "UNITPRICE", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Catalog Type Filter", description: "In SELECT name FROM sqlite_master WHERE type='table', the filter keeps…", difficulty: "easy", topic: TOPIC, subtopic: "Schema Management",
    Option1: "Every object of any kind", Option2: "Only views", Option3: "Only indexes", Option4: "Only table entries, skipping indexes", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Read Back the Created Table", description: "Which column list matches the table created by this snippet?", difficulty: "easy", topic: TOPIC, subtopic: "CREATE TABLE",
    Option1: "id INTEGER PRIMARY KEY, flavor TEXT NOT NULL", Option2: "id TEXT, flavor TEXT", Option3: "flavor first, id second", Option4: "Only flavor — the key column is implicit", CorrectOption: 1, iscodesnippet: true, codesnippet: "CREATE TABLE jams (\n  id INTEGER PRIMARY KEY,\n  flavor TEXT NOT NULL\n);", snippetLang: "sql" },
  { title: "RENAME TO Effect", description: "ALTER TABLE tarts RENAME TO sweet_tarts; does what?", difficulty: "easy", topic: TOPIC, subtopic: "ALTER TABLE",
    Option1: "Copies the rows into a new table", Option2: "Deletes the table", Option3: "Renames the table, keeping its rows and indexes", Option4: "Renames one column of the table", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Statement Terminator", description: "In a multi-statement script, statements are separated by…", difficulty: "easy", topic: TOPIC, subtopic: "Schema Management",
    Option1: "commas", Option2: "the word GO", Option3: "line breaks only", Option4: "semicolons", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "DROP vs DELETE", description: "Which statement empties a table's rows but keeps the table itself?", difficulty: "easy", topic: TOPIC, subtopic: "DROP TABLE",
    Option1: "DROP TABLE t; — it removes rows only", Option2: "DELETE FROM t; — the table definition stays", Option3: "DELETE FROM t; — it removes the table too", Option4: "Neither statement can empty a table", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "CTAS Semantics", description: "What does CREATE TABLE archive AS SELECT id, name FROM breads; produce?", difficulty: "medium", topic: TOPIC, subtopic: "Schema Management",
    Option1: "An error — AS requires a column list", Option2: "A copy of breads' full original schema", Option3: "A new table archive with exactly the columns the SELECT returns", Option4: "An empty table with no columns", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "ADD COLUMN NOT NULL Rule", description: "In SQLite, ALTER TABLE … ADD COLUMN x INTEGER NOT NULL is only allowed when…", difficulty: "medium", topic: TOPIC, subtopic: "ALTER TABLE",
    Option1: "The table is empty", Option2: "x is also UNIQUE", Option3: "Never — NOT NULL columns cannot be added", Option4: "A non-NULL DEFAULT is provided", CorrectOption: 4, iscodesnippet: true, codesnippet: "ALTER TABLE cakes\n  ADD COLUMN slices INTEGER NOT NULL DEFAULT 8;", snippetLang: "sql" },
  { title: "Verify the Rename", description: "After running this pair of statements, what does the SELECT show for the renamed table?", difficulty: "medium", topic: TOPIC, subtopic: "ALTER TABLE",
    Option1: "One row: rolls", Option2: "One row: buns", Option3: "Two rows: buns and rolls", Option4: "An error — renamed tables leave the catalog", CorrectOption: 1, iscodesnippet: true, codesnippet: "ALTER TABLE buns RENAME TO rolls;\nSELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name;", snippetLang: "sql" },
  { title: "Index in the Catalog", description: "A created index appears in sqlite_master as…", difficulty: "medium", topic: TOPIC, subtopic: "Schema Management",
    Option1: "A row with type 'table'", Option2: "A row with type 'view'", Option3: "A row with type 'index'", Option4: "It never appears there", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Why Lowercase Snake Case", description: "Lowercase snake_case identifiers help because…", difficulty: "medium", topic: TOPIC, subtopic: "Naming Conventions",
    Option1: "They avoid case-sensitivity and quoting headaches and stay readable", Option2: "They make queries run faster", Option3: "SQLite rejects mixed-case identifiers", Option4: "They encrypt identifier names", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Default Backfill After ALTER", description: "After running this pair of statements, what value does washed hold for rows created after the ALTER?", difficulty: "medium", topic: TOPIC, subtopic: "ALTER TABLE",
    Option1: "NULL", Option2: "0", Option3: "1", Option4: "The column does not exist for new rows", CorrectOption: 2, iscodesnippet: true, codesnippet: "CREATE TABLE trays (id INTEGER PRIMARY KEY, kind TEXT);\nALTER TABLE trays ADD COLUMN washed INTEGER NOT NULL DEFAULT 0;", snippetLang: "sql" },
  { title: "Rebuild Recipe", description: "SQLite has no ALTER COLUMN for changing a column type. The standard rebuild recipe is…", difficulty: "hard", topic: TOPIC, subtopic: "Schema Management",
    Option1: "Edit sqlite_master directly", Option2: "Create a new table, INSERT … SELECT the data, drop the old table, rename the new one", Option3: "DELETE FROM the table, then re-run CREATE TABLE", Option4: "Nothing needed — SQLite changes column types automatically", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Prove the Drop", description: "Two tables, leftovers and breads, existed before this script. What does the SELECT return?", difficulty: "hard", topic: TOPIC, subtopic: "DROP TABLE",
    Option1: "One row: breads", Option2: "Two rows: breads and leftovers", Option3: "Zero rows", Option4: "An error — DROP inside a script is illegal", CorrectOption: 1, iscodesnippet: true, codesnippet: "DROP TABLE leftovers;\nSELECT name FROM sqlite_master\nWHERE type = 'table' ORDER BY name;", snippetLang: "sql" },
  { title: "Auto-Index Names", description: "Indexes that SQLite creates automatically for UNIQUE constraints are named…", difficulty: "hard", topic: TOPIC, subtopic: "Schema Management",
    Option1: "idx_auto_1", Option2: "primary_index", Option3: "sqlite_unique", Option4: "sqlite_autoindex_…", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "List Created Indexes", description: "After CREATE INDEX idx_breads_kind ON breads(kind);, which query lists that index by name?", difficulty: "hard", topic: TOPIC, subtopic: "Naming Conventions",
    Option1: "SELECT sql FROM indexes;", Option2: "SHOW INDEXES;", Option3: "SELECT name FROM sqlite_master WHERE type='index';", Option4: "SELECT * FROM breads INDEXES;", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
];

await buildDay({ day: DAY, topic: TOPIC, subtopics: SUBTOPICS, codeQuestions, mcqs });
