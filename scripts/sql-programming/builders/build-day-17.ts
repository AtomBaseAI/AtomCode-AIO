/**
 * Day 17 — "Indexes and Performance" — wholesale parts catalog domain.
 *
 * Code questions create/drop indexes and grade them via sqlite_master
 * introspection (or by querying the data through a covering index). An
 * INTEGER PRIMARY KEY rowid table shows NO autoindex row, so only explicitly
 * created indexes appear. EXPLAIN stays MCQ theory (unstable output grids).
 *
 * Run from /home/z/my-project:
 *   bun scripts/sql-programming/builders/build-day-17.ts
 */
import { buildDay, type SqlCodeQuestionIn, type SqlMcqQuestionIn } from "../lib.ts";

const DAY = 17;
const TOPIC = "Indexes and Performance";
const SUBTOPICS = [
  "CREATE INDEX",
  "B-tree Index",
  "Hash Index",
  "EXPLAIN and Query Plans",
  "Covering Indexes",
  "When NOT to Index",
];

/* Shared hidden setup: a wholesale parts catalog with 20 catalog rows. */
const PARTS_SCHEMA = `CREATE TABLE parts (
  id INTEGER PRIMARY KEY,
  part_no TEXT NOT NULL,
  supplier TEXT NOT NULL,
  category TEXT NOT NULL,
  price REAL NOT NULL,
  stock INTEGER NOT NULL
);
INSERT INTO parts (part_no, supplier, category, price, stock) VALUES
('PN-1001', 'Acme Bolts', 'Fasteners', 4.5, 400),
('PN-1002', 'Acme Bolts', 'Fasteners', 6.25, 250),
('PN-1003', 'Acme Bolts', 'Fasteners', 3.8, 1200),
('PN-2001', 'NordFab', 'Valves', 42.0, 60),
('PN-2002', 'NordFab', 'Valves', 38.5, 75),
('PN-2003', 'NordFab', 'Valves', 51.25, 40),
('PN-3001', 'Rollway', 'Bearings', 12.4, 300),
('PN-3002', 'Rollway', 'Bearings', 15.75, 180),
('PN-3003', 'Rollway', 'Bearings', 9.95, 520),
('PN-3004', 'Rollway', 'Bearings', 22.3, 90),
('PN-4001', 'Hydrolux', 'Pumps', 89.99, 25),
('PN-4002', 'Hydrolux', 'Pumps', 120.5, 15),
('PN-4003', 'Hydrolux', 'Pumps', 74.25, 30),
('PN-5001', 'SealPro', 'Gaskets', 2.15, 2000),
('PN-5002', 'SealPro', 'Gaskets', 1.8, 3500),
('PN-5003', 'SealPro', 'Gaskets', 3.45, 900),
('PN-6001', 'PureFlow', 'Filters', 17.6, 210),
('PN-6002', 'PureFlow', 'Filters', 19.95, 160),
('PN-6003', 'PureFlow', 'Filters', 13.7, 340),
('PN-6004', 'PureFlow', 'Filters', 24.8, 95);`;

const SCHEMA_NOTE_PARTS =
  "Schema:\n" +
  "- parts(id INTEGER PRIMARY KEY, part_no TEXT, supplier TEXT, category TEXT, price REAL, stock INTEGER)\n\n" +
  "Twenty catalog rows are seeded across six categories (Fasteners, Valves, Bearings, Pumps, Gaskets, Filters) and six suppliers. The id column is a plain rowid alias, so no system index rows exist unless the task itself creates indexes.";

const RULES_INDEX =
  "Rules:\n" +
  "- SQLite dialect. The parts table is pre-seeded automatically — do not include CREATE TABLE or INSERT statements in your answer.\n" +
  "- Multi-statement task: run the required CREATE INDEX / DROP INDEX statement(s) first, then finish with ONE final SELECT — only that last result set is graded.\n" +
  "- Every statement before the final SELECT must produce no rows (CREATE INDEX and DROP INDEX are silent).\n" +
  "- Column names and order must match exactly (alias every output column).\n" +
  "- Row order must match exactly (use ORDER BY as specified).";

const codeQuestions: SqlCodeQuestionIn[] = [
  /* ── easy · basic (6) ─────────────────────────────────────────────── */
  {
    title: "First Catalog Index",
    description: `The catalog team creates its first explicit index — a supplier lookup — and immediately checks the index catalog to confirm it registered.\n\n${SCHEMA_NOTE_PARTS}\n\nTask:\n1) Create an index named idx_parts_supplier ON parts(supplier).\n2) Finish with a SELECT that lists name aliased as index_name from sqlite_master where type='index', ordered by index_name ascending.\n\n${RULES_INDEX}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CREATE INDEX",
    headerCode: PARTS_SCHEMA,
    sourcecode: `CREATE INDEX idx_parts_supplier ON parts(supplier);
SELECT name AS index_name FROM sqlite_master WHERE type='index' ORDER BY name;`,
    columns: ["index_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Index Two Lookup Columns",
    description: `Two hot filters at the wholesale counter: category and price. Build one index per column, then audit the catalog.\n\n${SCHEMA_NOTE_PARTS}\n\nTask:\n1) Create an index named idx_parts_category ON parts(category).\n2) Create an index named idx_parts_price ON parts(price).\n3) Finish with a SELECT listing name aliased as index_name from sqlite_master where type='index', ordered by index_name ascending.\n\n${RULES_INDEX}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CREATE INDEX",
    headerCode: PARTS_SCHEMA,
    sourcecode: `CREATE INDEX idx_parts_category ON parts(category);
CREATE INDEX idx_parts_price ON parts(price);
SELECT name AS index_name FROM sqlite_master WHERE type='index' ORDER BY name;`,
    columns: ["index_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Index the Part Numbers",
    description: `Staff look parts up by part number all day — the classic single-column index case.\n\n${SCHEMA_NOTE_PARTS}\n\nTask:\n1) Create an index named idx_catalog_part_no ON parts(part_no).\n2) Finish with a SELECT listing name aliased as index_name from sqlite_master where type='index', ordered by index_name ascending.\n\n${RULES_INDEX}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CREATE INDEX",
    headerCode: PARTS_SCHEMA,
    sourcecode: `CREATE INDEX idx_catalog_part_no ON parts(part_no);
SELECT name AS index_name FROM sqlite_master WHERE type='index' ORDER BY name;`,
    columns: ["index_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "B-tree Range Drill",
    description: `A price index turns a BETWEEN range into a B-tree range scan. Create the index, then run the range query itself — the data rows are the graded result.\n\n${SCHEMA_NOTE_PARTS}\n\nTask:\n1) Create an index named idx_price_btree ON parts(price).\n2) Finish with a SELECT returning part_no and price for parts with price BETWEEN 10 AND 25, ordered by price ascending, tie-break by part_no ascending.\n\n${RULES_INDEX}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "B-tree Index",
    headerCode: PARTS_SCHEMA,
    sourcecode: `CREATE INDEX idx_price_btree ON parts(price);
SELECT part_no, price FROM parts WHERE price BETWEEN 10 AND 25 ORDER BY price ASC, part_no ASC;`,
    columns: ["part_no", "price"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Cover the Category Picker",
    description: `The picker app always asks "which part numbers live in category X". A two-column index on (category, part_no) covers that question — the table never needs a second lookup.\n\n${SCHEMA_NOTE_PARTS}\n\nTask:\n1) Create an index named idx_cover_category ON parts(category, part_no).\n2) Finish with a SELECT returning category and part_no for parts where category = 'Bearings', ordered by part_no ascending.\n\n${RULES_INDEX}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Covering Indexes",
    headerCode: PARTS_SCHEMA,
    sourcecode: `CREATE INDEX idx_cover_category ON parts(category, part_no);
SELECT category, part_no FROM parts WHERE category = 'Bearings' ORDER BY part_no;`,
    columns: ["category", "part_no"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Reversed Index Shelf",
    description: `Two more counter indexes go up, and the audit report wants the catalog read newest-naming-first — a descending listing.\n\n${SCHEMA_NOTE_PARTS}\n\nTask:\n1) Create an index named idx_supplier_lookup ON parts(supplier).\n2) Create an index named idx_stock_lookup ON parts(stock).\n3) Finish with a SELECT listing name aliased as index_name from sqlite_master where type='index', ordered by index_name DESCENDING.\n\n${RULES_INDEX}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CREATE INDEX",
    headerCode: PARTS_SCHEMA,
    sourcecode: `CREATE INDEX idx_supplier_lookup ON parts(supplier);
CREATE INDEX idx_stock_lookup ON parts(stock);
SELECT name AS index_name FROM sqlite_master WHERE type='index' ORDER BY name DESC;`,
    columns: ["index_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── easy · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Counter Sheet, Cheapest First",
    description: `The walk-in counter prints a "five dollars and under" sheet. An index on price keeps the sheet snappy even as the catalog grows.\n\n${SCHEMA_NOTE_PARTS}\n\nTask:\n1) Create an index named idx_price_sort ON parts(price).\n2) Finish with a SELECT returning part_no, price and stock for parts where price <= 5, ordered by price ascending, tie-break by part_no ascending.\n\n${RULES_INDEX}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "B-tree Index",
    headerCode: PARTS_SCHEMA,
    sourcecode: `CREATE INDEX idx_price_sort ON parts(price);
SELECT part_no, price, stock FROM parts WHERE price <= 5 ORDER BY price ASC, part_no ASC;`,
    columns: ["part_no", "price", "stock"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Gasket Shelf Report",
    description: `Gasket shelves are picked all day. A covering index holding category, part_no and stock answers the shelf report entirely from the index.\n\n${SCHEMA_NOTE_PARTS}\n\nTask:\n1) Create an index named idx_gasket_cover ON parts(category, part_no, stock).\n2) Finish with a SELECT returning part_no and stock for parts where category = 'Gaskets', ordered by stock descending, tie-break by part_no ascending.\n\n${RULES_INDEX}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Covering Indexes",
    headerCode: PARTS_SCHEMA,
    sourcecode: `CREATE INDEX idx_gasket_cover ON parts(category, part_no, stock);
SELECT part_no, stock FROM parts WHERE category = 'Gaskets' ORDER BY stock DESC, part_no ASC;`,
    columns: ["part_no", "stock"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Unique Part Number Guard",
    description: `Duplicate part numbers once shipped to two branches — disaster. A unique index turns the catalog's part_no into an enforced contract.\n\n${SCHEMA_NOTE_PARTS}\n\nTask:\n1) Create a UNIQUE index named uniq_part_no ON parts(part_no).\n2) Finish with a SELECT listing name aliased as index_name from sqlite_master where type='index', ordered by index_name ascending.\n\n${RULES_INDEX}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CREATE INDEX",
    headerCode: PARTS_SCHEMA,
    sourcecode: `CREATE UNIQUE INDEX uniq_part_no ON parts(part_no);
SELECT name AS index_name FROM sqlite_master WHERE type='index' ORDER BY name;`,
    columns: ["index_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Index Regret, Reversed",
    description: `The team indexed stock for a reorder report that runs twice a year — but stock updates arrive every minute, so the write cost wins. The right move: build it, measure, drop it, and prove the catalog holds zero indexes again.\n\n${SCHEMA_NOTE_PARTS}\n\nTask:\n1) Create an index named idx_stock_reorder ON parts(stock).\n2) Drop that index with DROP INDEX.\n3) Finish with a SELECT returning COUNT(*) aliased as index_count from sqlite_master where type='index' — the count must be 0.\n\n${RULES_INDEX}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "When NOT to Index",
    headerCode: PARTS_SCHEMA,
    sourcecode: `CREATE INDEX idx_stock_reorder ON parts(stock);
DROP INDEX idx_stock_reorder;
SELECT COUNT(*) AS index_count FROM sqlite_master WHERE type='index';`,
    columns: ["index_count"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── medium · scenario (6) ────────────────────────────────────────── */
  {
    title: "Covering Index for the Picker",
    description: `Warehouse pickers query supplier, category and part_no together. A covering composite index answers every picker query without touching the table — so the final query must list its columns explicitly.\n\n${SCHEMA_NOTE_PARTS}\n\nTask:\n1) Create an index named idx_pick_cover ON parts(supplier, category, part_no).\n2) Finish with a SELECT returning supplier, category and part_no for parts where supplier = 'NordFab', ordered by part_no ascending. Do not use SELECT * — name every output column.\n\n${RULES_INDEX}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Covering Indexes",
    headerCode: PARTS_SCHEMA,
    sourcecode: `CREATE INDEX idx_pick_cover ON parts(supplier, category, part_no);
SELECT supplier, category, part_no FROM parts WHERE supplier = 'NordFab' ORDER BY part_no;`,
    columns: ["supplier", "category", "part_no"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "SELECT *", whitelist: "CREATE INDEX",
  },
  {
    title: "Retire the Legacy Index",
    description: `The catalog was seeded with a legacy index named idx_legacy_stock ON parts(stock). Profiling showed it only slows writes (the stock report runs twice a year). Retire it and stand up the price-band index the counter actually needs.\n\n${SCHEMA_NOTE_PARTS}\n\nTask:\n1) Drop the existing index idx_legacy_stock.\n2) Create an index named idx_price_band ON parts(price).\n3) Finish with a SELECT listing name aliased as index_name from sqlite_master where type='index', ordered by index_name ascending — the legacy index must be gone.\n\n${RULES_INDEX}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "When NOT to Index",
    headerCode: PARTS_SCHEMA + `\nCREATE INDEX idx_legacy_stock ON parts(stock);`,
    sourcecode: `DROP INDEX idx_legacy_stock;
CREATE INDEX idx_price_band ON parts(price);
SELECT name AS index_name FROM sqlite_master WHERE type='index' ORDER BY name;`,
    columns: ["index_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "DELETE", whitelist: "DROP INDEX, CREATE INDEX",
  },
  {
    title: "Unique Supplier-Part Pair",
    description: `Procurement enforces that a supplier never lists the same part_no twice. A composite UNIQUE index over (supplier, part_no) is the contract.\n\n${SCHEMA_NOTE_PARTS}\n\nTask:\n1) Create a UNIQUE index named uniq_supplier_part ON parts(supplier, part_no).\n2) Finish with a SELECT listing name aliased as index_name from sqlite_master where type='index', ordered by index_name ascending.\n\n${RULES_INDEX}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "CREATE INDEX",
    headerCode: PARTS_SCHEMA,
    sourcecode: `CREATE UNIQUE INDEX uniq_supplier_part ON parts(supplier, part_no);
SELECT name AS index_name FROM sqlite_master WHERE type='index' ORDER BY name;`,
    columns: ["index_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "INSERT", whitelist: "CREATE UNIQUE INDEX",
  },
  {
    title: "Stock Range Report",
    description: `Reorder analysts pull every part holding 300 units or more. The stock index supports the range; the report itself is the graded output.\n\n${SCHEMA_NOTE_PARTS}\n\nTask:\n1) Create an index named idx_stock_range ON parts(stock).\n2) Finish with a SELECT returning part_no and stock for parts where stock >= 300, ordered by stock descending, tie-break by part_no ascending. Every matching row must appear — no LIMIT.\n\n${RULES_INDEX}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "B-tree Index",
    headerCode: PARTS_SCHEMA,
    sourcecode: `CREATE INDEX idx_stock_range ON parts(stock);
SELECT part_no, stock FROM parts WHERE stock >= 300 ORDER BY stock DESC, part_no ASC;`,
    columns: ["part_no", "stock"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "LIMIT", whitelist: "CREATE INDEX, ORDER BY",
  },
  {
    title: "Composite Before Single",
    description: `The tuning guide says: build the composite (category, stock) index first, then the plain single-column stock index, and compare registrations side by side.\n\n${SCHEMA_NOTE_PARTS}\n\nTask:\n1) Create an index named idx_category_stock ON parts(category, stock).\n2) Create an index named idx_stock_only ON parts(stock).\n3) Finish with a SELECT listing name aliased as index_name from sqlite_master where type='index', ordered by index_name ascending.\n\n${RULES_INDEX}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "CREATE INDEX",
    headerCode: PARTS_SCHEMA,
    sourcecode: `CREATE INDEX idx_category_stock ON parts(category, stock);
CREATE INDEX idx_stock_only ON parts(stock);
SELECT name AS index_name FROM sqlite_master WHERE type='index' ORDER BY name;`,
    columns: ["index_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "UNIQUE", whitelist: "CREATE INDEX",
  },
  {
    title: "Prove the Index Registration",
    description: `Before trusting any EXPLAIN plan, the DBA verifies the index is actually registered against its table — a two-column catalog check.\n\n${SCHEMA_NOTE_PARTS}\n\nTask:\n1) Create an index named idx_filter_price ON parts(price).\n2) Finish with a SELECT returning name aliased as index_name and tbl_name aliased as table_name from sqlite_master where type='index', ordered by index_name ascending.\n\n${RULES_INDEX}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "EXPLAIN and Query Plans",
    headerCode: PARTS_SCHEMA,
    sourcecode: `CREATE INDEX idx_filter_price ON parts(price);
SELECT name AS index_name, tbl_name AS table_name FROM sqlite_master WHERE type='index' ORDER BY name;`,
    columns: ["index_name", "table_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "EXPLAIN", whitelist: "CREATE INDEX, sqlite_master",
  },

  /* ── hard · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Category Averages from a Covered Index",
    description: `A (category, price) index covers the entire category-average dashboard: every column the aggregate needs lives in the index, and the report must sweep all categories with no WHERE clause at all.\n\n${SCHEMA_NOTE_PARTS}\n\nTask:\n1) Create an index named idx_cat_price ON parts(category, price).\n2) Finish with a SELECT returning category, COUNT(*) aliased as part_count and ROUND(AVG(price), 2) aliased as avg_price for ALL parts (no WHERE clause), grouped by category, ordered by category ascending.\n\n${RULES_INDEX}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Covering Indexes",
    headerCode: PARTS_SCHEMA,
    sourcecode: `CREATE INDEX idx_cat_price ON parts(category, price);
SELECT category, COUNT(*) AS part_count, ROUND(AVG(price), 2) AS avg_price FROM parts GROUP BY category ORDER BY category;`,
    columns: ["category", "part_count", "avg_price"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "WHERE", whitelist: "CREATE INDEX, GROUP BY",
  },
  {
    title: "Index Lifecycle Swap",
    description: `Quarterly tuning: the two legacy indexes idx_old_price ON parts(price) and idx_old_stock ON parts(stock) both get retired, replaced by the actively-used pair. The final catalog listing proves the swap.\n\n${SCHEMA_NOTE_PARTS}\n\nTask:\n1) Drop the existing index idx_old_price.\n2) Drop the existing index idx_old_stock.\n3) Create an index named idx_active_price ON parts(price).\n4) Create an index named idx_active_stock ON parts(stock).\n5) Finish with a SELECT listing name aliased as index_name from sqlite_master where type='index', ordered by index_name ascending — only the new pair may appear.\n\n${RULES_INDEX}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "When NOT to Index",
    headerCode: PARTS_SCHEMA + `\nCREATE INDEX idx_old_price ON parts(price);\nCREATE INDEX idx_old_stock ON parts(stock);`,
    sourcecode: `DROP INDEX idx_old_price;
DROP INDEX idx_old_stock;
CREATE INDEX idx_active_price ON parts(price);
CREATE INDEX idx_active_stock ON parts(stock);
SELECT name AS index_name FROM sqlite_master WHERE type='index' ORDER BY name;`,
    columns: ["index_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "DELETE, UPDATE", whitelist: "DROP INDEX, CREATE INDEX",
  },
  {
    title: "Rowid Verdict, No Hidden Indexes",
    description: `A vendor claims every SQLite table hides system indexes. Prove the record straight: build two plainly-named B-tree indexes and show the catalog records only them — a plain rowid table (INTEGER PRIMARY KEY, no UNIQUE constraints) contributes zero index rows.\n\n${SCHEMA_NOTE_PARTS}\n\nTask:\n1) Create an index named idx_btree_part_no ON parts(part_no).\n2) Create an index named idx_btree_supplier ON parts(supplier).\n3) Finish with a SELECT returning name aliased as index_name and the expression CASE WHEN name LIKE 'sqlite_%' THEN 1 ELSE 0 END aliased as system_built, from sqlite_master where type='index', ordered by index_name ascending. Every system_built value must be 0.\n\n${RULES_INDEX}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Hash Index",
    headerCode: PARTS_SCHEMA,
    sourcecode: `CREATE INDEX idx_btree_part_no ON parts(part_no);
CREATE INDEX idx_btree_supplier ON parts(supplier);
SELECT name AS index_name, CASE WHEN name LIKE 'sqlite_%' THEN 1 ELSE 0 END AS system_built FROM sqlite_master WHERE type='index' ORDER BY name;`,
    columns: ["index_name", "system_built"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "UNIQUE, AUTOINCREMENT", whitelist: "CREATE INDEX, sqlite_master",
  },
  {
    title: "Supplier Price Bands",
    description: `Key accounts price-check two suppliers at once, above a floor of 5. A composite (supplier, price) index serves both the equality and the range.\n\n${SCHEMA_NOTE_PARTS}\n\nTask:\n1) Create an index named idx_supplier_price ON parts(supplier, price).\n2) Finish with a SELECT returning supplier, part_no and price for parts where supplier IN ('Acme Bolts','Rollway') AND price >= 5, ordered by supplier ascending, then price ascending, tie-break by part_no ascending.\n\n${RULES_INDEX}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "B-tree Index",
    headerCode: PARTS_SCHEMA,
    sourcecode: `CREATE INDEX idx_supplier_price ON parts(supplier, price);
SELECT supplier, part_no, price FROM parts WHERE supplier IN ('Acme Bolts','Rollway') AND price >= 5 ORDER BY supplier ASC, price ASC, part_no ASC;`,
    columns: ["supplier", "part_no", "price"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "GROUP BY, LIMIT", whitelist: "CREATE INDEX, ORDER BY",
  },
];

/* ── MCQs (20: 10 easy / 6 medium / 4 hard; 7 snippets; 5/5/5/5 spread) ── */
const mcqs: SqlMcqQuestionIn[] = [
  { title: "Purpose of an Index", description: "What does a database index fundamentally buy you?", difficulty: "easy", topic: TOPIC, subtopic: "CREATE INDEX",
    Option1: "It stores rows in insertion order", Option2: "It compresses the table on disk", Option3: "Faster lookups on the indexed columns, at the cost of extra storage and slower writes", Option4: "It prevents duplicate rows", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Create Index Syntax", description: "Which statement creates an index named idx_parts_price on parts(price)?", difficulty: "easy", topic: TOPIC, subtopic: "CREATE INDEX",
    Option1: "CREATE INDEX idx_parts_price ON parts(price);", Option2: "INDEX parts(price) AS idx_parts_price;", Option3: "ADD INDEX idx_parts_price TO parts;", Option4: "CREATE KEY idx_parts_price ON parts;", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "B-tree Meaning", description: "How are SQLite indexes structured internally?", difficulty: "easy", topic: TOPIC, subtopic: "B-tree Index",
    Option1: "Hash maps", Option2: "Linked lists", Option3: "Binary heaps", Option4: "B-trees", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Index Name Lookup", description: "Which query lists the explicitly created indexes in an SQLite database?", difficulty: "easy", topic: TOPIC, subtopic: "EXPLAIN and Query Plans",
    Option1: "SHOW INDEXES FROM parts;", Option2: "SELECT name FROM sqlite_master WHERE type = 'index';", Option3: "SELECT * FROM indexes;", Option4: "PRAGMA index_count;", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Rowid Table Autoindex", description: "The table was created with INTEGER PRIMARY KEY (a rowid alias) and no UNIQUE constraints. How many type='index' rows does the snippet return?", difficulty: "easy", topic: TOPIC, subtopic: "B-tree Index",
    Option1: "1 — the rowid index is listed", Option2: "0 — a plain rowid table contributes no autoindex row", Option3: "2 — one per column", Option4: "1 — but only after the first INSERT", CorrectOption: 2, iscodesnippet: true,
    codesnippet: "CREATE TABLE demo (\n  id INTEGER PRIMARY KEY,\n  label TEXT\n);\nSELECT name FROM sqlite_master\nWHERE type = 'index';", snippetLang: "sql" },
  { title: "Cost of Indexes", description: "Indexes speed up reads but slow down which operations the most?", difficulty: "easy", topic: TOPIC, subtopic: "When NOT to Index",
    Option1: "SELECT by primary key", Option2: "Range reads on the indexed column", Option3: "ORDER BY on the indexed column", Option4: "INSERT, UPDATE and DELETE on the table", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Index Then Introspect", description: "No other indexes exist. What does the snippet's SELECT return?", difficulty: "easy", topic: TOPIC, subtopic: "CREATE INDEX",
    Option1: "One row: idx_cat", Option2: "No rows — indexes are hidden from sqlite_master", Option3: "One row per parts row", Option4: "Two rows: idx_cat and parts", CorrectOption: 1, iscodesnippet: true,
    codesnippet: "CREATE INDEX idx_cat ON parts(category);\nSELECT name FROM sqlite_master\nWHERE type = 'index';", snippetLang: "sql" },
  { title: "Unique Index Effect", description: "After CREATE UNIQUE INDEX on parts(part_no), inserting a second row with an existing part_no will…", difficulty: "easy", topic: TOPIC, subtopic: "CREATE INDEX",
    Option1: "Silently skip the insert", Option2: "Overwrite the old row", Option3: "Fail with a uniqueness constraint error", Option4: "Automatically create a second index", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Hash Indexes in SQLite", description: "What is the truth about hash indexes in SQLite?", difficulty: "easy", topic: TOPIC, subtopic: "Hash Index",
    Option1: "Available via CREATE HASH INDEX", Option2: "They are the default for TEXT columns", Option3: "Used automatically for equality lookups", Option4: "Not supported — SQLite provides B-tree indexes only", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Many Indexes Tradeoff", description: "Should you put an index on every column 'just in case'?", difficulty: "easy", topic: TOPIC, subtopic: "When NOT to Index",
    Option1: "Yes — more indexes always means faster queries", Option2: "No — every index adds storage and slows every write", Option3: "Yes, but only for small tables", Option4: "Yes, but only for nullable columns", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },

  { title: "Composite Column Order", description: "Queries filter parts by an exact category and a stock range. Which single composite index fits best?", difficulty: "medium", topic: TOPIC, subtopic: "CREATE INDEX",
    Option1: "CREATE INDEX i ON parts(category, stock);", Option2: "CREATE INDEX i ON parts(stock, category);", Option3: "Two separate single-column indexes", Option4: "CREATE INDEX i ON parts(price);", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Covering Index Definition", description: "What makes an index a covering index?", difficulty: "medium", topic: TOPIC, subtopic: "Covering Indexes",
    Option1: "It indexes every table in the schema", Option2: "It is created with a COVERING keyword", Option3: "It contains all columns a query needs, so the base table is never read", Option4: "It automatically indexes the primary key", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Covering Query", description: "Why is this query fully served by the index alone?", difficulty: "medium", topic: TOPIC, subtopic: "Covering Indexes",
    Option1: "Because part_no is the primary key", Option2: "Because both needed columns — category and part_no — live in the index", Option3: "Because SQLite caches the result", Option4: "It is not — the table is read anyway", CorrectOption: 2, iscodesnippet: true,
    codesnippet: "CREATE INDEX idx_cover ON parts(category, part_no);\nSELECT part_no FROM parts\nWHERE category = 'Bearings';", snippetLang: "sql" },
  { title: "EXPLAIN Purpose", description: "What does EXPLAIN QUERY PLAN tell you?", difficulty: "medium", topic: TOPIC, subtopic: "EXPLAIN and Query Plans",
    Option1: "The exact runtime in milliseconds", Option2: "The number of rows the query returns", Option3: "Whether the database needs VACUUM", Option4: "How SQLite plans to execute the query — scan and search choices", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "When NOT to Index", description: "Which is the WORST candidate for a new index?", difficulty: "medium", topic: TOPIC, subtopic: "When NOT to Index",
    Option1: "A column filtered in most queries", Option2: "A unique identifier looked up constantly", Option3: "A 5-row lookup table that is rewritten every minute", Option4: "A column used in a frequent ORDER BY", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "DROP INDEX Lifecycle", description: "No other indexes exist beforehand. What does the final SELECT return?", difficulty: "medium", topic: TOPIC, subtopic: "CREATE INDEX",
    Option1: "No rows — the index was created and then dropped", Option2: "idx_tmp — DROP only removes its data", Option3: "An error — DROP INDEX needs a restart", Option4: "One row: parts", CorrectOption: 1, iscodesnippet: true,
    codesnippet: "CREATE INDEX idx_tmp ON parts(price);\nDROP INDEX idx_tmp;\nSELECT name FROM sqlite_master\nWHERE type = 'index';", snippetLang: "sql" },

  { title: "Unique Guard Outcome", description: "part_no 'PN-1001' already exists in parts. What is the outcome of the script?", difficulty: "hard", topic: TOPIC, subtopic: "CREATE INDEX",
    Option1: "The insert succeeds with a fresh id", Option2: "The insert succeeds with a warning", Option3: "The row is inserted with a NULL part_no", Option4: "The insert fails — uniqueness violation", CorrectOption: 4, iscodesnippet: true,
    codesnippet: "CREATE UNIQUE INDEX uniq_part ON parts(part_no);\nINSERT INTO parts (part_no, supplier, category, price, stock)\nVALUES ('PN-1001', 'X', 'Y', 1.0, 5);", snippetLang: "sql" },
  { title: "Scan Versus Search", description: "parts holds 20 rows and 19 of them have stock > 0. For the snippet's query, which plan is cheapest?", difficulty: "hard", topic: TOPIC, subtopic: "EXPLAIN and Query Plans",
    Option1: "Hop through an index on stock row by row", Option2: "A full table scan — when most rows match, scanning beats index hops", Option3: "The query fails without an index", Option4: "A scan of sqlite_master", CorrectOption: 2, iscodesnippet: true,
    codesnippet: "-- parts: 20 rows, 19 with stock > 0\nSELECT * FROM parts WHERE stock > 0;", snippetLang: "sql" },
  { title: "Rowid as Clustered Key", description: "In SQLite, lookups by an INTEGER PRIMARY KEY (rowid alias) are…", difficulty: "hard", topic: TOPIC, subtopic: "B-tree Index",
    Option1: "Slower than any secondary index", Option2: "Hash-based", Option3: "Direct B-tree searches of the table itself — the table is the index", Option4: "Impossible without CREATE INDEX", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Covering Sort Choice", description: "The query SELECT part_no, price FROM parts WHERE category = 'Filters' ORDER BY part_no; runs constantly. Which single index serves it best?", difficulty: "hard", topic: TOPIC, subtopic: "Covering Indexes",
    Option1: "(category, part_no, price)", Option2: "(price)", Option3: "(part_no)", Option4: "(category, stock)", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
];

await buildDay({ day: DAY, topic: TOPIC, subtopics: SUBTOPICS, codeQuestions, mcqs });
