/**
 * Day 20 — "Triggers and Events" — warehouse audit system domain.
 *
 * The graded grids are trigger-PRODUCED rows: audit_log starts empty and fills
 * when the student's CREATE TRIGGER + DML statements run. SQLite trigger bodies
 * use DELAYED semicolons (BEGIN … END;). changed_at is always a FIXED literal
 * date — never date('now'). Scheduled Events stay MCQ theory (SQLite has none).
 *
 * Run from /home/z/my-project:
 *   bun scripts/sql-programming/builders/build-day-20.ts
 */
import { buildDay, type SqlCodeQuestionIn, type SqlMcqQuestionIn } from "../lib.ts";

const DAY = 20;
const TOPIC = "Triggers and Events";
const SUBTOPICS = [
  "CREATE TRIGGER",
  "BEFORE and AFTER Triggers",
  "INSERT UPDATE DELETE Triggers",
  "NEW and OLD Records",
  "Scheduled Events",
];

/* Shared hidden setup: warehouse stock + an EMPTY audit log (triggers fill it). */
const WAREHOUSE_SCHEMA = `CREATE TABLE items (
  id INTEGER PRIMARY KEY,
  sku TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price REAL NOT NULL
);
CREATE TABLE audit_log (
  id INTEGER PRIMARY KEY,
  action TEXT NOT NULL,
  item_sku TEXT NOT NULL,
  old_qty INTEGER,
  new_qty INTEGER,
  changed_at TEXT NOT NULL
);
INSERT INTO items (sku, quantity, price) VALUES
('WH-1001', 40, 12.5),
('WH-1002', 25, 8.75),
('WH-1003', 60, 3.2),
('WH-2001', 15, 45.0),
('WH-2002', 80, 6.4),
('WH-3001', 5, 99.0),
('WH-3002', 33, 22.25),
('WH-4001', 12, 60.0);`;

const SCHEMA_NOTE_WAREHOUSE =
  "Schema:\n" +
  "- items(id INTEGER PRIMARY KEY, sku TEXT, quantity INTEGER, price REAL)\n" +
  "- audit_log(id INTEGER PRIMARY KEY, action TEXT, item_sku TEXT, old_qty INTEGER, new_qty INTEGER, changed_at TEXT)\n\n" +
  "Eight items are seeded; audit_log starts EMPTY — every row you will see in it is produced by the trigger(s) you create. Never use date('now'): write fixed literal dates such as '2026-01-15' for changed_at.";

const RULES_TRIGGER =
  "Rules:\n" +
  "- SQLite dialect. The schema and its data are pre-seeded automatically — do not include CREATE TABLE or INSERT INTO items statements in your answer.\n" +
  "- Multi-statement task: create the trigger(s) first, then run the listed DML statements, then finish with ONE final SELECT — only that last result set is graded.\n" +
  "- Every statement before the final SELECT must produce no rows (CREATE TRIGGER and DML are silent; the trigger's inserts happen inside the engine).\n" +
  "- Trigger bodies wrap their INSERT statements in BEGIN … END with a semicolon after END.\n" +
  "- Column names and order must match exactly (alias every output column); row order must match exactly (use ORDER BY as specified).";

const codeQuestions: SqlCodeQuestionIn[] = [
  /* ── easy · basic (6) ─────────────────────────────────────────────── */
  {
    title: "First Audit Trigger",
    description: `The warehouse's first audit trigger: every UPDATE on items must leave one trail row. Build it, move one item's stock, and read the trail.\n\n${SCHEMA_NOTE_WAREHOUSE}\n\nTask:\n1) Create a trigger named t_audit_update: AFTER UPDATE ON items, whose body INSERTs one audit_log row with action 'update', item_sku = NEW.sku, old_qty = OLD.quantity, new_qty = NEW.quantity and changed_at = '2026-01-15'.\n2) UPDATE the item with id 1 to quantity = 36.\n3) Finish with a SELECT returning action, item_sku, old_qty, new_qty and changed_at from audit_log, ordered by id ascending.\n\n${RULES_TRIGGER}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CREATE TRIGGER",
    headerCode: WAREHOUSE_SCHEMA,
    sourcecode: `CREATE TRIGGER t_audit_update AFTER UPDATE ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('update', NEW.sku, OLD.quantity, NEW.quantity, '2026-01-15');
END;
UPDATE items SET quantity = 36 WHERE id = 1;
SELECT action, item_sku, old_qty, new_qty, changed_at FROM audit_log ORDER BY id;`,
    columns: ["action", "item_sku", "old_qty", "new_qty", "changed_at"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Log Every Restock Arrival",
    description: `Receiving wants an audit row whenever a brand-new item lands. Build an AFTER INSERT trigger — NEW carries the inserted row, OLD does not exist for inserts.\n\n${SCHEMA_NOTE_WAREHOUSE}\n\nTask:\n1) Create a trigger named t_audit_insert: AFTER INSERT ON items, whose body INSERTs one audit_log row with action 'insert', item_sku = NEW.sku, old_qty = NULL, new_qty = NEW.quantity and changed_at = '2026-01-16'.\n2) INSERT a new item: sku 'WH-5001', quantity 20, price 18.0.\n3) Finish with a SELECT returning action, item_sku, old_qty and new_qty from audit_log, ordered by id ascending.\n\n${RULES_TRIGGER}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "INSERT UPDATE DELETE Triggers",
    headerCode: WAREHOUSE_SCHEMA,
    sourcecode: `CREATE TRIGGER t_audit_insert AFTER INSERT ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('insert', NEW.sku, NULL, NEW.quantity, '2026-01-16');
END;
INSERT INTO items (sku, quantity, price) VALUES ('WH-5001', 20, 18.0);
SELECT action, item_sku, old_qty, new_qty FROM audit_log ORDER BY id;`,
    columns: ["action", "item_sku", "old_qty", "new_qty"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Removal Watch",
    description: `Deleted items must never vanish silently. An AFTER DELETE trigger records the vanished row — only OLD exists for deletes.\n\n${SCHEMA_NOTE_WAREHOUSE}\n\nTask:\n1) Create a trigger named t_audit_delete: AFTER DELETE ON items, whose body INSERTs one audit_log row with action 'delete', item_sku = OLD.sku, old_qty = OLD.quantity, new_qty = NULL and changed_at = '2026-01-17'.\n2) DELETE the item with id 4.\n3) Finish with a SELECT returning action, item_sku, old_qty and new_qty from audit_log, ordered by id ascending.\n\n${RULES_TRIGGER}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "INSERT UPDATE DELETE Triggers",
    headerCode: WAREHOUSE_SCHEMA,
    sourcecode: `CREATE TRIGGER t_audit_delete AFTER DELETE ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('delete', OLD.sku, OLD.quantity, NULL, '2026-01-17');
END;
DELETE FROM items WHERE id = 4;
SELECT action, item_sku, old_qty, new_qty FROM audit_log ORDER BY id;`,
    columns: ["action", "item_sku", "old_qty", "new_qty"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Trigger Fires Once Per Row",
    description: `A row-level trigger fires separately for each row a statement touches. Prove it: two different items, two updates, two trail rows.\n\n${SCHEMA_NOTE_WAREHOUSE}\n\nTask:\n1) Create a trigger named t_qty_watch: AFTER UPDATE ON items, whose body INSERTs one audit_log row with action 'update', item_sku = NEW.sku, old_qty = OLD.quantity, new_qty = NEW.quantity and changed_at = '2026-01-18'.\n2) UPDATE the item with id 2 to quantity = 30.\n3) UPDATE the item with id 3 to quantity = 55.\n4) Finish with a SELECT returning item_sku, old_qty and new_qty from audit_log, ordered by id ascending.\n\n${RULES_TRIGGER}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "NEW and OLD Records",
    headerCode: WAREHOUSE_SCHEMA,
    sourcecode: `CREATE TRIGGER t_qty_watch AFTER UPDATE ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('update', NEW.sku, OLD.quantity, NEW.quantity, '2026-01-18');
END;
UPDATE items SET quantity = 30 WHERE id = 2;
UPDATE items SET quantity = 55 WHERE id = 3;
SELECT item_sku, old_qty, new_qty FROM audit_log ORDER BY id;`,
    columns: ["item_sku", "old_qty", "new_qty"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Before Versus After Timing",
    description: `A BEFORE trigger runs before the row change lands — yet OLD and NEW are both visible inside it. Log the pre-change snapshot.\n\n${SCHEMA_NOTE_WAREHOUSE}\n\nTask:\n1) Create a trigger named t_before_audit: BEFORE UPDATE ON items, whose body INSERTs one audit_log row with action 'before-update', item_sku = OLD.sku, old_qty = OLD.quantity, new_qty = NEW.quantity and changed_at = '2026-01-19'.\n2) UPDATE the item with id 5 to quantity = 90.\n3) Finish with a SELECT returning action, old_qty and new_qty from audit_log, ordered by id ascending.\n\n${RULES_TRIGGER}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "BEFORE and AFTER Triggers",
    headerCode: WAREHOUSE_SCHEMA,
    sourcecode: `CREATE TRIGGER t_before_audit BEFORE UPDATE ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('before-update', OLD.sku, OLD.quantity, NEW.quantity, '2026-01-19');
END;
UPDATE items SET quantity = 90 WHERE id = 5;
SELECT action, old_qty, new_qty FROM audit_log ORDER BY id;`,
    columns: ["action", "old_qty", "new_qty"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Multi-Statement Trigger Body",
    description: `Trigger bodies may hold several statements between BEGIN and END. This one writes a two-phase pair of audit rows for a single update.\n\n${SCHEMA_NOTE_WAREHOUSE}\n\nTask:\n1) Create a trigger named t_two_phase: AFTER UPDATE ON items, whose body INSERTs TWO audit_log rows — first with action 'update-start' (item_sku = OLD.sku, old_qty = OLD.quantity, new_qty = NEW.quantity, changed_at = '2026-01-20'), then with action 'update-end' (item_sku = NEW.sku, same quantities and date).\n2) UPDATE the item with id 7 to quantity = 45.\n3) Finish with a SELECT returning action and item_sku from audit_log, ordered by id ascending.\n\n${RULES_TRIGGER}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CREATE TRIGGER",
    headerCode: WAREHOUSE_SCHEMA,
    sourcecode: `CREATE TRIGGER t_two_phase AFTER UPDATE ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('update-start', OLD.sku, OLD.quantity, NEW.quantity, '2026-01-20');
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('update-end', NEW.sku, OLD.quantity, NEW.quantity, '2026-01-20');
END;
UPDATE items SET quantity = 45 WHERE id = 7;
SELECT action, item_sku FROM audit_log ORDER BY id;`,
    columns: ["action", "item_sku"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── easy · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Restock Audit Story",
    description: `The manager of the warehouse wants every manual quantity adjustment logged forever. One restock arrives: item id 6 gains 10 units.\n\n${SCHEMA_NOTE_WAREHOUSE}\n\nTask:\n1) Create a trigger named t_restock_audit: AFTER UPDATE ON items, whose body INSERTs one audit_log row with action 'update', item_sku = NEW.sku, old_qty = OLD.quantity, new_qty = NEW.quantity and changed_at = '2026-01-21'.\n2) UPDATE the item with id 6: quantity = quantity + 10.\n3) Finish with a SELECT returning action, item_sku, old_qty and new_qty from audit_log, ordered by id ascending.\n\n${RULES_TRIGGER}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CREATE TRIGGER",
    headerCode: WAREHOUSE_SCHEMA,
    sourcecode: `CREATE TRIGGER t_restock_audit AFTER UPDATE ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('update', NEW.sku, OLD.quantity, NEW.quantity, '2026-01-21');
END;
UPDATE items SET quantity = quantity + 10 WHERE id = 6;
SELECT action, item_sku, old_qty, new_qty FROM audit_log ORDER BY id;`,
    columns: ["action", "item_sku", "old_qty", "new_qty"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Receive Shipment Pair",
    description: `A shipment drops off two new SKUs. The receiving trigger must log both arrivals — one audit row each, in insert order.\n\n${SCHEMA_NOTE_WAREHOUSE}\n\nTask:\n1) Create a trigger named t_receive_audit: AFTER INSERT ON items, whose body INSERTs one audit_log row with action 'insert', item_sku = NEW.sku, old_qty = NULL, new_qty = NEW.quantity and changed_at = '2026-01-22'.\n2) INSERT two items in one statement: ('WH-5002', 14, 9.5) and ('WH-5003', 7, 4.25).\n3) Finish with a SELECT returning item_sku and new_qty from audit_log, ordered by id ascending.\n\n${RULES_TRIGGER}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "NEW and OLD Records",
    headerCode: WAREHOUSE_SCHEMA,
    sourcecode: `CREATE TRIGGER t_receive_audit AFTER INSERT ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('insert', NEW.sku, NULL, NEW.quantity, '2026-01-22');
END;
INSERT INTO items (sku, quantity, price) VALUES ('WH-5002', 14, 9.5), ('WH-5003', 7, 4.25);
SELECT item_sku, new_qty FROM audit_log ORDER BY id;`,
    columns: ["item_sku", "new_qty"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Discontinued Items",
    description: `Two discontinued SKUs are purged from stock. The discontinue trigger must capture what left — even for a multi-row DELETE.\n\n${SCHEMA_NOTE_WAREHOUSE}\n\nTask:\n1) Create a trigger named t_discontinue_audit: AFTER DELETE ON items, whose body INSERTs one audit_log row with action 'delete', item_sku = OLD.sku, old_qty = OLD.quantity, new_qty = NULL and changed_at = '2026-01-23'.\n2) DELETE the items whose id is 2 or 7 (one DELETE statement).\n3) Finish with a SELECT returning item_sku and old_qty from audit_log, ordered by id ascending.\n\n${RULES_TRIGGER}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "INSERT UPDATE DELETE Triggers",
    headerCode: WAREHOUSE_SCHEMA,
    sourcecode: `CREATE TRIGGER t_discontinue_audit AFTER DELETE ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('delete', OLD.sku, OLD.quantity, NULL, '2026-01-23');
END;
DELETE FROM items WHERE id IN (2, 7);
SELECT item_sku, old_qty FROM audit_log ORDER BY id;`,
    columns: ["item_sku", "old_qty"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Quantity-Only Watch",
    description: `Price tweaks should NOT hit the audit trail — only quantity changes. SQLite supports column-scoped triggers: AFTER UPDATE OF quantity ON items fires only when quantity appears in the statement's SET list.\n\n${SCHEMA_NOTE_WAREHOUSE}\n\nTask:\n1) Create a trigger named t_qty_only: AFTER UPDATE OF quantity ON items, whose body INSERTs one audit_log row with action 'update', item_sku = NEW.sku, old_qty = OLD.quantity, new_qty = NEW.quantity and changed_at = '2026-01-24'.\n2) UPDATE the item with id 8: set price = 100.0 only (this must NOT fire the trigger).\n3) UPDATE the item with id 8: set quantity = 20 and price = 60.0 (this must fire exactly once).\n4) Finish with a SELECT returning action, item_sku, old_qty and new_qty from audit_log, ordered by id ascending.\n\n${RULES_TRIGGER}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CREATE TRIGGER",
    headerCode: WAREHOUSE_SCHEMA,
    sourcecode: `CREATE TRIGGER t_qty_only AFTER UPDATE OF quantity ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('update', NEW.sku, OLD.quantity, NEW.quantity, '2026-01-24');
END;
UPDATE items SET price = 100.0 WHERE id = 8;
UPDATE items SET quantity = 20, price = 60.0 WHERE id = 8;
SELECT action, item_sku, old_qty, new_qty FROM audit_log ORDER BY id;`,
    columns: ["action", "item_sku", "old_qty", "new_qty"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── medium · scenario (6) ────────────────────────────────────────── */
  {
    title: "Pre and Post Snapshots",
    description: `Compliance wants BOTH a before-image and an after-image per change. Two triggers share one UPDATE: the BEFORE trigger logs the pre-change snapshot, the AFTER trigger logs the post-change confirmation.\n\n${SCHEMA_NOTE_WAREHOUSE}\n\nTask:\n1) Create a trigger named t_pre_snapshot: BEFORE UPDATE ON items, INSERTing an audit row with action 'before-update', item_sku = OLD.sku, old_qty = OLD.quantity, new_qty = NEW.quantity, changed_at = '2026-01-25'.\n2) Create a trigger named t_post_snapshot: AFTER UPDATE ON items, INSERTing an audit row with action 'after-update' and the same NEW/OLD values and date.\n3) UPDATE the item with id 3 to quantity = 70.\n4) Finish with a SELECT returning action, old_qty and new_qty from audit_log, ordered by id ascending — exactly two rows.\n\n${RULES_TRIGGER}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "BEFORE and AFTER Triggers",
    headerCode: WAREHOUSE_SCHEMA,
    sourcecode: `CREATE TRIGGER t_pre_snapshot BEFORE UPDATE ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('before-update', OLD.sku, OLD.quantity, NEW.quantity, '2026-01-25');
END;
CREATE TRIGGER t_post_snapshot AFTER UPDATE ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('after-update', OLD.sku, OLD.quantity, NEW.quantity, '2026-01-25');
END;
UPDATE items SET quantity = 70 WHERE id = 3;
SELECT action, old_qty, new_qty FROM audit_log ORDER BY id;`,
    columns: ["action", "old_qty", "new_qty"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "DELETE", whitelist: "CREATE TRIGGER, BEFORE",
  },
  {
    title: "Delete Then Insert Cycle",
    description: `A replacement cycle: the discontinued WH-1001 is purged and a successor SKU arrives. Two triggers — one AFTER DELETE, one AFTER INSERT — narrate the cycle into audit_log.\n\n${SCHEMA_NOTE_WAREHOUSE}\n\nTask:\n1) Create a trigger named t_removed: AFTER DELETE ON items, INSERTing an audit row with action 'delete', item_sku = OLD.sku, old_qty = OLD.quantity, new_qty = NULL, changed_at = '2026-01-26'.\n2) Create a trigger named t_received: AFTER INSERT ON items, INSERTing an audit row with action 'insert', item_sku = NEW.sku, old_qty = NULL, new_qty = NEW.quantity, changed_at = '2026-01-26'.\n3) DELETE the item with id 1.\n4) INSERT a new item: sku 'WH-6001', quantity 28, price 12.0.\n5) Finish with a SELECT returning action, item_sku, old_qty and new_qty from audit_log, ordered by id ascending.\n\n${RULES_TRIGGER}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "INSERT UPDATE DELETE Triggers",
    headerCode: WAREHOUSE_SCHEMA,
    sourcecode: `CREATE TRIGGER t_removed AFTER DELETE ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('delete', OLD.sku, OLD.quantity, NULL, '2026-01-26');
END;
CREATE TRIGGER t_received AFTER INSERT ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('insert', NEW.sku, NULL, NEW.quantity, '2026-01-26');
END;
DELETE FROM items WHERE id = 1;
INSERT INTO items (sku, quantity, price) VALUES ('WH-6001', 28, 12.0);
SELECT action, item_sku, old_qty, new_qty FROM audit_log ORDER BY id;`,
    columns: ["action", "item_sku", "old_qty", "new_qty"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "UPDATE", whitelist: "CREATE TRIGGER, INSERT INTO",
  },
  {
    title: "Sequential Moves, Cumulative Log",
    description: `The same SKU moves twice in one session — the audit log must show every hop with its own old/new pair, plus the unrelated third move.\n\n${SCHEMA_NOTE_WAREHOUSE}\n\nTask:\n1) Create a trigger named t_move_audit: AFTER UPDATE ON items, INSERTing an audit row with action 'update', item_sku = NEW.sku, old_qty = OLD.quantity, new_qty = NEW.quantity, changed_at = '2026-01-27'.\n2) UPDATE the item with id 2 to quantity = 30.\n3) UPDATE the item with id 2 to quantity = 22 (the second hop starts from 30).\n4) UPDATE the item with id 4 to quantity = 18.\n5) Finish with a SELECT returning item_sku, old_qty and new_qty from audit_log, ordered by id ascending.\n\n${RULES_TRIGGER}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "NEW and OLD Records",
    headerCode: WAREHOUSE_SCHEMA,
    sourcecode: `CREATE TRIGGER t_move_audit AFTER UPDATE ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('update', NEW.sku, OLD.quantity, NEW.quantity, '2026-01-27');
END;
UPDATE items SET quantity = 30 WHERE id = 2;
UPDATE items SET quantity = 22 WHERE id = 2;
UPDATE items SET quantity = 18 WHERE id = 4;
SELECT item_sku, old_qty, new_qty FROM audit_log ORDER BY id;`,
    columns: ["item_sku", "old_qty", "new_qty"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "DELETE", whitelist: "CREATE TRIGGER, UPDATE",
  },
  {
    title: "Reorder Alert Levels",
    description: `The audit trigger grades each update: if NEW.quantity drops under 10 the action reads 'critical', otherwise 'routine'. A CASE expression inside the trigger body computes it.\n\n${SCHEMA_NOTE_WAREHOUSE}\n\nTask:\n1) Create a trigger named t_severity: AFTER UPDATE ON items, INSERTing an audit row where action is CASE WHEN NEW.quantity < 10 THEN 'critical' ELSE 'routine' END, with item_sku = NEW.sku, old_qty = OLD.quantity, new_qty = NEW.quantity, changed_at = '2026-01-28'.\n2) UPDATE the item with id 6 to quantity = 9 (critical).\n3) UPDATE the item with id 5 to quantity = 70 (routine).\n4) Finish with a SELECT returning action, item_sku and new_qty from audit_log, ordered by id ascending.\n\n${RULES_TRIGGER}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "CREATE TRIGGER",
    headerCode: WAREHOUSE_SCHEMA,
    sourcecode: `CREATE TRIGGER t_severity AFTER UPDATE ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES(CASE WHEN NEW.quantity < 10 THEN 'critical' ELSE 'routine' END, NEW.sku, OLD.quantity, NEW.quantity, '2026-01-28');
END;
UPDATE items SET quantity = 9 WHERE id = 6;
UPDATE items SET quantity = 70 WHERE id = 5;
SELECT action, item_sku, new_qty FROM audit_log ORDER BY id;`,
    columns: ["action", "item_sku", "new_qty"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "DELETE", whitelist: "CREATE TRIGGER, CASE",
  },
  {
    title: "Bulk Restock Day",
    description: `Restock day doubles the stock of the first three SKUs in one statement. The trigger must log one row per affected item — three hops in id order.\n\n${SCHEMA_NOTE_WAREHOUSE}\n\nTask:\n1) Create a trigger named t_bulk_audit: AFTER UPDATE ON items, INSERTing an audit row with action 'update', item_sku = NEW.sku, old_qty = OLD.quantity, new_qty = NEW.quantity, changed_at = '2026-01-29'.\n2) UPDATE the items whose id <= 3: quantity = quantity * 2 (one statement).\n3) Finish with a SELECT returning item_sku, old_qty and new_qty from audit_log, ordered by id ascending.\n\n${RULES_TRIGGER}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "INSERT UPDATE DELETE Triggers",
    headerCode: WAREHOUSE_SCHEMA,
    sourcecode: `CREATE TRIGGER t_bulk_audit AFTER UPDATE ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('update', NEW.sku, OLD.quantity, NEW.quantity, '2026-01-29');
END;
UPDATE items SET quantity = quantity * 2 WHERE id <= 3;
SELECT item_sku, old_qty, new_qty FROM audit_log ORDER BY id;`,
    columns: ["item_sku", "old_qty", "new_qty"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "DELETE, DROP", whitelist: "CREATE TRIGGER, UPDATE",
  },
  {
    title: "Trace the Full Journey",
    description: `One brand-new SKU, WH-6002, is received and then immediately corrected. An insert trigger and an update trace its whole journey — note the update's OLD values come from the row the trigger's insert created.\n\n${SCHEMA_NOTE_WAREHOUSE}\n\nTask:\n1) Create a trigger named t_ins_trace: AFTER INSERT ON items, INSERTing an audit row with action 'insert', item_sku = NEW.sku, old_qty = NULL, new_qty = NEW.quantity, changed_at = '2026-01-30'.\n2) Create a trigger named t_upd_trace: AFTER UPDATE ON items, INSERTing an audit row with action 'update', item_sku = NEW.sku, old_qty = OLD.quantity, new_qty = NEW.quantity, changed_at = '2026-01-30'.\n3) INSERT a new item: sku 'WH-6002', quantity 14, price 5.0.\n4) UPDATE the item whose sku = 'WH-6002' to quantity = 20.\n5) Finish with a SELECT returning action, item_sku, old_qty and new_qty from audit_log, ordered by id ascending.\n\n${RULES_TRIGGER}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "BEFORE and AFTER Triggers",
    headerCode: WAREHOUSE_SCHEMA,
    sourcecode: `CREATE TRIGGER t_ins_trace AFTER INSERT ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('insert', NEW.sku, NULL, NEW.quantity, '2026-01-30');
END;
CREATE TRIGGER t_upd_trace AFTER UPDATE ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('update', NEW.sku, OLD.quantity, NEW.quantity, '2026-01-30');
END;
INSERT INTO items (sku, quantity, price) VALUES ('WH-6002', 14, 5.0);
UPDATE items SET quantity = 20 WHERE sku = 'WH-6002';
SELECT action, item_sku, old_qty, new_qty FROM audit_log ORDER BY id;`,
    columns: ["action", "item_sku", "old_qty", "new_qty"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "DELETE", whitelist: "CREATE TRIGGER, INSERT INTO",
  },

  /* ── hard · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Three Trigger Types Together",
    description: `The full audit suite: one trigger per DML event on items, all sharing the same log. Then one mixed shift exercises all three — update, delete, insert — and the trail must show the exact order they ran.\n\n${SCHEMA_NOTE_WAREHOUSE}\n\nTask:\n1) Create t_h_insert: AFTER INSERT ON items — action 'insert', item_sku = NEW.sku, old_qty = NULL, new_qty = NEW.quantity, changed_at = '2026-02-01'.\n2) Create t_h_update: AFTER UPDATE ON items — action 'update', item_sku = NEW.sku, old_qty = OLD.quantity, new_qty = NEW.quantity, changed_at = '2026-02-01'.\n3) Create t_h_delete: AFTER DELETE ON items — action 'delete', item_sku = OLD.sku, old_qty = OLD.quantity, new_qty = NULL, changed_at = '2026-02-01'.\n4) UPDATE the item with id 1 to quantity = 44.\n5) DELETE the item with id 8.\n6) INSERT a new item: sku 'WH-9001', quantity 10, price 15.0.\n7) Finish with a SELECT returning action, item_sku, old_qty and new_qty from audit_log, ordered by id ascending.\n\n${RULES_TRIGGER}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "CREATE TRIGGER",
    headerCode: WAREHOUSE_SCHEMA,
    sourcecode: `CREATE TRIGGER t_h_insert AFTER INSERT ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('insert', NEW.sku, NULL, NEW.quantity, '2026-02-01');
END;
CREATE TRIGGER t_h_update AFTER UPDATE ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('update', NEW.sku, OLD.quantity, NEW.quantity, '2026-02-01');
END;
CREATE TRIGGER t_h_delete AFTER DELETE ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('delete', OLD.sku, OLD.quantity, NULL, '2026-02-01');
END;
UPDATE items SET quantity = 44 WHERE id = 1;
DELETE FROM items WHERE id = 8;
INSERT INTO items (sku, quantity, price) VALUES ('WH-9001', 10, 15.0);
SELECT action, item_sku, old_qty, new_qty FROM audit_log ORDER BY id;`,
    columns: ["action", "item_sku", "old_qty", "new_qty"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "DROP", whitelist: "CREATE TRIGGER, INSERT INTO, DELETE FROM",
  },
  {
    title: "Low-Stock Guard With WHEN",
    description: `Alert noise is the enemy: the guard trigger fires ONLY for rows whose old quantity is under 10, via the trigger's WHEN clause. One update qualifies; the other must pass silently.\n\n${SCHEMA_NOTE_WAREHOUSE}\n\nTask:\n1) Create a trigger named t_guard: BEFORE UPDATE OF quantity ON items WHEN OLD.quantity < 10, whose body INSERTs one audit_log row with action 'guarded', item_sku = OLD.sku, old_qty = OLD.quantity, new_qty = NEW.quantity and changed_at = '2026-01-22'.\n2) UPDATE the item with id 4 to quantity = 18 — its old quantity is 15, NOT under 10, so this must NOT fire.\n3) UPDATE the item with id 6 to quantity = 9 — its old quantity is 5, so this MUST fire.\n4) Finish with a SELECT returning action, item_sku, old_qty and new_qty from audit_log, ordered by id ascending — exactly one row, for id 6.\n\n${RULES_TRIGGER}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "BEFORE and AFTER Triggers",
    headerCode: WAREHOUSE_SCHEMA,
    sourcecode: `CREATE TRIGGER t_guard BEFORE UPDATE OF quantity ON items
WHEN OLD.quantity < 10
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('guarded', OLD.sku, OLD.quantity, NEW.quantity, '2026-01-22');
END;
UPDATE items SET quantity = 18 WHERE id = 4;
UPDATE items SET quantity = 9 WHERE id = 6;
SELECT action, item_sku, old_qty, new_qty FROM audit_log ORDER BY id;`,
    columns: ["action", "item_sku", "old_qty", "new_qty"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "DELETE, DROP", whitelist: "CREATE TRIGGER, WHEN",
  },
  {
    title: "Multi-Statement Audit Replay",
    description: `A full shift replay hits items four ways in sequence: two quantity moves, one discontinuation, one brand-new arrival. One AFTER UPDATE trigger, one AFTER DELETE trigger and one AFTER INSERT trigger must weave the four trail rows together.\n\n${SCHEMA_NOTE_WAREHOUSE}\n\nTask:\n1) Create t_flow_update: AFTER UPDATE ON items — action 'update', item_sku = NEW.sku, old_qty = OLD.quantity, new_qty = NEW.quantity, changed_at = '2026-02-02'.\n2) Create t_flow_delete: AFTER DELETE ON items — action 'delete', item_sku = OLD.sku, old_qty = OLD.quantity, new_qty = NULL, changed_at = '2026-02-02'.\n3) Create t_flow_insert: AFTER INSERT ON items — action 'insert', item_sku = NEW.sku, old_qty = NULL, new_qty = NEW.quantity, changed_at = '2026-02-02'.\n4) UPDATE the item with id 2 to quantity = 19.\n5) UPDATE the item with id 3 to quantity = 66.\n6) DELETE the item with id 7.\n7) INSERT a new item: sku 'WH-8001', quantity 30, price 11.0.\n8) Finish with a SELECT returning action, item_sku, old_qty and new_qty from audit_log, ordered by id ascending.\n\n${RULES_TRIGGER}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "INSERT UPDATE DELETE Triggers",
    headerCode: WAREHOUSE_SCHEMA,
    sourcecode: `CREATE TRIGGER t_flow_update AFTER UPDATE ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('update', NEW.sku, OLD.quantity, NEW.quantity, '2026-02-02');
END;
CREATE TRIGGER t_flow_delete AFTER DELETE ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('delete', OLD.sku, OLD.quantity, NULL, '2026-02-02');
END;
CREATE TRIGGER t_flow_insert AFTER INSERT ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('insert', NEW.sku, NULL, NEW.quantity, '2026-02-02');
END;
UPDATE items SET quantity = 19 WHERE id = 2;
UPDATE items SET quantity = 66 WHERE id = 3;
DELETE FROM items WHERE id = 7;
INSERT INTO items (sku, quantity, price) VALUES ('WH-8001', 30, 11.0);
SELECT action, item_sku, old_qty, new_qty FROM audit_log ORDER BY id;`,
    columns: ["action", "item_sku", "old_qty", "new_qty"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "DROP", whitelist: "CREATE TRIGGER, UPDATE, INSERT INTO",
  },
  {
    title: "Before-After Pair Ledger",
    description: `The strictest compliance mode writes a matched pair — 'before' then 'after' — for every quantity move, via a BEFORE UPDATE and an AFTER UPDATE trigger firing for the same row. Two moves, four trail rows, perfectly interleaved.\n\n${SCHEMA_NOTE_WAREHOUSE}\n\nTask:\n1) Create t_before_move: BEFORE UPDATE ON items — action 'before', item_sku = OLD.sku, old_qty = OLD.quantity, new_qty = NEW.quantity, changed_at = '2026-02-03'.\n2) Create t_after_move: AFTER UPDATE ON items — action 'after', item_sku = NEW.sku, old_qty = OLD.quantity, new_qty = NEW.quantity, changed_at = '2026-02-03'.\n3) UPDATE the item with id 4: quantity = quantity + 5.\n4) UPDATE the item with id 6: quantity = quantity + 5.\n5) Finish with a SELECT returning action, item_sku, old_qty and new_qty from audit_log, ordered by id ascending.\n\n${RULES_TRIGGER}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "NEW and OLD Records",
    headerCode: WAREHOUSE_SCHEMA,
    sourcecode: `CREATE TRIGGER t_before_move BEFORE UPDATE ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('before', OLD.sku, OLD.quantity, NEW.quantity, '2026-02-03');
END;
CREATE TRIGGER t_after_move AFTER UPDATE ON items
BEGIN
  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)
  VALUES('after', NEW.sku, OLD.quantity, NEW.quantity, '2026-02-03');
END;
UPDATE items SET quantity = quantity + 5 WHERE id = 4;
UPDATE items SET quantity = quantity + 5 WHERE id = 6;
SELECT action, item_sku, old_qty, new_qty FROM audit_log ORDER BY id;`,
    columns: ["action", "item_sku", "old_qty", "new_qty"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "DELETE", whitelist: "CREATE TRIGGER, BEFORE, AFTER",
  },
];

/* ── MCQs (20: 10 easy / 6 medium / 4 hard; 6 snippets; 5/5/5/5 spread) ── */
const mcqs: SqlMcqQuestionIn[] = [
  { title: "Trigger Definition", description: "What is a database trigger?", difficulty: "easy", topic: TOPIC, subtopic: "CREATE TRIGGER",
    Option1: "A scheduled background job", Option2: "A named set of actions that runs automatically when a specified event happens on a table", Option3: "A special kind of index", Option4: "A view with built-in logic", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Trigger Timing Options", description: "Which timing options can a trigger on a SQLite TABLE use?", difficulty: "easy", topic: TOPIC, subtopic: "BEFORE and AFTER Triggers",
    Option1: "Only AFTER", Option2: "Only BEFORE", Option3: "Only INSTEAD OF", Option4: "BEFORE or AFTER (INSTEAD OF exists for views)", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Trigger Events", description: "Which events can fire a trigger in SQLite?", difficulty: "easy", topic: TOPIC, subtopic: "INSERT UPDATE DELETE Triggers",
    Option1: "SELECT only", Option2: "COMMIT only", Option3: "INSERT, UPDATE and DELETE", Option4: "VACUUM and ANALYZE", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "NEW on Insert", description: "In the snippet's trigger body, what does NEW.quantity refer to?", difficulty: "easy", topic: TOPIC, subtopic: "NEW and OLD Records",
    Option1: "The quantity of the row just inserted", Option2: "The quantity before a delete", Option3: "Always 0", Option4: "The table's maximum quantity", CorrectOption: 1, iscodesnippet: true,
    codesnippet: "CREATE TRIGGER t_ins AFTER INSERT ON items\nBEGIN\n  INSERT INTO audit_log(action, item_sku, new_qty, changed_at)\n  VALUES('insert', NEW.sku, NEW.quantity, '2026-01-16');\nEND;", snippetLang: "sql" },
  { title: "OLD on Delete", description: "When the snippet's DELETE runs, which values land in audit_log?", difficulty: "easy", topic: TOPIC, subtopic: "INSERT UPDATE DELETE Triggers",
    Option1: "NEW.sku and NEW.quantity", Option2: "Only NULLs", Option3: "Nothing — DELETE cannot fire triggers", Option4: "The deleted row's sku and quantity, via OLD", CorrectOption: 4, iscodesnippet: true,
    codesnippet: "CREATE TRIGGER t_del AFTER DELETE ON items\nBEGIN\n  INSERT INTO audit_log(action, item_sku, old_qty)\n  VALUES('delete', OLD.sku, OLD.quantity);\nEND;\nDELETE FROM items WHERE id = 3;", snippetLang: "sql" },
  { title: "Trigger Body Delimiters", description: "How are the statements of a SQLite trigger body wrapped?", difficulty: "easy", topic: TOPIC, subtopic: "CREATE TRIGGER",
    Option1: "Curly braces", Option2: "BEGIN … END (semicolon after END)", Option3: "Plain parentheses", Option4: "Square brackets", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Simple Audit Trigger", description: "No other triggers exist and audit_log is empty. How many audit_log rows does the snippet's UPDATE produce?", difficulty: "easy", topic: TOPIC, subtopic: "NEW and OLD Records",
    Option1: "1 — one audit row for the one updated row", Option2: "0 — triggers never write during UPDATE", Option3: "2", Option4: "8 — one per table row", CorrectOption: 1, iscodesnippet: true,
    codesnippet: "CREATE TRIGGER t_log AFTER UPDATE ON items\nBEGIN\n  INSERT INTO audit_log(action, item_sku, old_qty, new_qty, changed_at)\n  VALUES('update', NEW.sku, OLD.quantity, NEW.quantity, '2026-01-15');\nEND;\nUPDATE items SET quantity = 50 WHERE id = 1;", snippetLang: "sql" },
  { title: "Dropping Triggers", description: "Which statement removes the trigger t_log?", difficulty: "easy", topic: TOPIC, subtopic: "CREATE TRIGGER",
    Option1: "REMOVE TRIGGER t_log;", Option2: "DELETE TRIGGER t_log;", Option3: "DROP TRIGGER t_log;", Option4: "ALTER TABLE items DROP TRIGGER t_log;", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Scheduled Events in SQLite", description: "Does SQLite support scheduled events (like MySQL's CREATE EVENT)?", difficulty: "easy", topic: TOPIC, subtopic: "Scheduled Events",
    Option1: "Yes — CREATE EVENT is built in", Option2: "Yes, with cron-style syntax", Option3: "Yes, but only inside triggers", Option4: "No — scheduling belongs to the application or OS", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Event Scheduling Workaround", description: "A team needs a nightly stock roll-up to run inside the database at 02:00. What does SQLite offer?", difficulty: "easy", topic: TOPIC, subtopic: "Scheduled Events",
    Option1: "CREATE EVENT rollup SCHEDULE '0 2 * * *' — built in", Option2: "Nothing built in — SQLite has no scheduler, so the application or OS (e.g. cron) triggers the job", Option3: "A special TIMER trigger declared on items", Option4: "Enabling WAL mode activates scheduled jobs", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },

  { title: "WHEN Clause Purpose", description: "What does the WHEN clause on a trigger do?", difficulty: "medium", topic: TOPIC, subtopic: "BEFORE and AFTER Triggers",
    Option1: "Replaces the trigger body", Option2: "Schedules when the trigger runs", Option3: "Limits firing to rows that satisfy the condition", Option4: "Names the trigger dynamically", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "UPDATE OF Column Scope", description: "items holds id 1 with quantity 40. How many audit rows does the snippet's UPDATE produce?", difficulty: "medium", topic: TOPIC, subtopic: "INSERT UPDATE DELETE Triggers",
    Option1: "0 — the SET list has no quantity, so an UPDATE OF quantity trigger does not fire", Option2: "1", Option3: "8", Option4: "An error — UPDATE OF cannot be combined with triggers", CorrectOption: 1, iscodesnippet: true,
    codesnippet: "CREATE TRIGGER t_qty AFTER UPDATE OF quantity ON items\nBEGIN\n  INSERT INTO audit_log(action) VALUES('qty');\nEND;\nUPDATE items SET price = 60.0 WHERE id = 1;", snippetLang: "sql" },
  { title: "BEFORE Use Case", description: "A BEFORE trigger is the natural place to…", difficulty: "medium", topic: TOPIC, subtopic: "BEFORE and AFTER Triggers",
    Option1: "Log the outcome after the fact only", Option2: "Validate or adjust the row before the change lands", Option3: "Refresh materialized views", Option4: "Replace SELECT statements", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Multiple Triggers Ordering", description: "Two row-level triggers are created for the same event on the same table. In what order do they fire in SQLite?", difficulty: "medium", topic: TOPIC, subtopic: "CREATE TRIGGER",
    Option1: "In a deliberately random order", Option2: "In reverse creation order", Option3: "Alphabetically by trigger name", Option4: "In the order they were created, as each affected row is processed", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Guarded Trigger Count", description: "items holds id 6 (WH-3001, quantity 5) and id 5 (WH-2002, quantity 80). How many audit_log rows appear after both updates?", difficulty: "medium", topic: TOPIC, subtopic: "NEW and OLD Records",
    Option1: "1 — only the low-stock row passes the WHEN clause", Option2: "2 — every update fires the trigger", Option3: "0 — WHEN disables triggers", Option4: "8 — the trigger sweeps the table", CorrectOption: 1, iscodesnippet: true,
    codesnippet: "CREATE TRIGGER t_guard BEFORE UPDATE OF quantity ON items\nWHEN OLD.quantity < 10\nBEGIN\n  INSERT INTO audit_log(action) VALUES('guarded');\nEND;\nUPDATE items SET quantity = 12 WHERE id = 6;\nUPDATE items SET quantity = 70 WHERE id = 5;", snippetLang: "sql" },
  { title: "RAISE in Triggers", description: "Inside a trigger body, what does RAISE(ABORT, 'msg') do?", difficulty: "medium", topic: TOPIC, subtopic: "INSERT UPDATE DELETE Triggers",
    Option1: "It is ignored by SQLite", Option2: "It only logs the message", Option3: "It aborts the triggering statement with the given error message", Option4: "It commits the current transaction", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },

  { title: "NEW and OLD on DELETE", description: "In an AFTER DELETE trigger, which row references are valid?", difficulty: "hard", topic: TOPIC, subtopic: "NEW and OLD Records",
    Option1: "NEW only", Option2: "OLD only — the row is gone, so no NEW version exists", Option3: "Both NEW and OLD", Option4: "Neither — DELETE triggers cannot reference rows", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Trigger on a View", description: "What does SQLite allow when you try to attach a trigger to a view?", difficulty: "hard", topic: TOPIC, subtopic: "CREATE TRIGGER",
    Option1: "Regular BEFORE/AFTER triggers work like on tables", Option2: "All event types are supported", Option3: "Only AFTER triggers are allowed", Option4: "Only INSTEAD OF triggers may be defined on views", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Cascade Timing", description: "What does the snippet's final SELECT print?", difficulty: "hard", topic: TOPIC, subtopic: "BEFORE and AFTER Triggers",
    Option1: "after, before", Option2: "after only", Option3: "before, after — the BEFORE trigger fires first for the row", Option4: "before only", CorrectOption: 3, iscodesnippet: true,
    codesnippet: "CREATE TRIGGER t_before BEFORE UPDATE ON items\nBEGIN\n  INSERT INTO audit_log(action) VALUES('before');\nEND;\nCREATE TRIGGER t_after AFTER UPDATE ON items\nBEGIN\n  INSERT INTO audit_log(action) VALUES('after');\nEND;\nUPDATE items SET quantity = 9 WHERE id = 2;\nSELECT action FROM audit_log ORDER BY id;", snippetLang: "sql" },
  { title: "Why Audit Via Triggers", description: "Why put audit logging in triggers instead of application code?", difficulty: "hard", topic: TOPIC, subtopic: "CREATE TRIGGER",
    Option1: "Every write path is captured consistently — even writes that bypass the application", Option2: "Triggers are always faster than application code", Option3: "Triggers replace the need for backups", Option4: "Application code cannot run INSERTs", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
];

await buildDay({ day: DAY, topic: TOPIC, subtopics: SUBTOPICS, codeQuestions, mcqs });
