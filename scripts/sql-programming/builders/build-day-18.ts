/**
 * Day 18 — "Transactions and ACID" — small bank ledger domain.
 *
 * Balances are INTEGER cents (no float issues). Practice multi-statement
 * transaction scripts: BEGIN/COMMIT/ROLLBACK, SAVEPOINT/ROLLBACK TO/RELEASE,
 * BEGIN IMMEDIATE/EXCLUSIVE, deadlock-ordering discipline. Every statement is
 * silent except the FINAL SELECT (committed state), which is graded.
 *
 * Run from /home/z/my-project:
 *   bun scripts/sql-programming/builders/build-day-18.ts
 */
import { buildDay, type SqlCodeQuestionIn, type SqlMcqQuestionIn } from "../lib.ts";

const DAY = 18;
const TOPIC = "Transactions and ACID";
const SUBTOPICS = [
  "BEGIN COMMIT ROLLBACK",
  "SAVEPOINT",
  "Isolation Levels",
  "Locks and Locking",
  "Deadlocks",
];

/* Shared hidden setup: a small bank ledger — balances in integer cents. */
const ACCOUNTS_SCHEMA = `CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  holder TEXT NOT NULL,
  balance INTEGER NOT NULL,
  kind TEXT NOT NULL
);
INSERT INTO accounts (holder, balance, kind) VALUES
('Amara Diallo', 250000, 'checking'),
('Bo Chen', 100000, 'savings'),
('Cyrus Vance', 75000, 'checking'),
('Dana Whitfield', 500000, 'savings'),
('Emil Novak', 32000, 'checking'),
('Farah Aziz', 415000, 'checking');`;

const LEDGER_SCHEMA = `
CREATE TABLE ledger (
  id INTEGER PRIMARY KEY,
  account_id INTEGER NOT NULL,
  delta INTEGER NOT NULL,
  note TEXT NOT NULL
);`;

const SCHEMA_NOTE_ACCOUNTS =
  "Schema:\n" +
  "- accounts(id INTEGER PRIMARY KEY, holder TEXT, balance INTEGER, kind TEXT)\n\n" +
  "Six accounts are seeded; balance is stored in integer cents (250000 means 2,500.00) and kind is 'checking' or 'savings'. All amounts in your script are integer cents too.";

const SCHEMA_NOTE_ACCOUNTS_LEDGER =
  "Schema:\n" +
  "- accounts(id INTEGER PRIMARY KEY, holder TEXT, balance INTEGER, kind TEXT)\n" +
  "- ledger(id INTEGER PRIMARY KEY, account_id INTEGER -> accounts.id, delta INTEGER, note TEXT)\n\n" +
  "Six accounts are seeded (balances in integer cents; kind is 'checking' or 'savings'). The ledger table exists but starts EMPTY — rows land in it only when your script inserts them.";

const RULES_TXN =
  "Rules:\n" +
  "- SQLite dialect. The schema and its data are pre-seeded automatically — do not include CREATE TABLE statements in your answer.\n" +
  "- Multi-statement task: run the transaction statements in the listed order, then finish with ONE final SELECT — only that last result set is graded.\n" +
  "- Every statement before the final SELECT must produce no rows (BEGIN, COMMIT, ROLLBACK, SAVEPOINT and UPDATE are all silent).\n" +
  "- Column names and order must match exactly (alias every output column).\n" +
  "- Row order must match exactly (use ORDER BY as specified).";

const codeQuestions: SqlCodeQuestionIn[] = [
  /* ── easy · basic (6) ─────────────────────────────────────────────── */
  {
    title: "Commit a Deposit",
    description: `A 150.00 deposit lands in Emil Novak's account. Wrap it in an explicit transaction and commit, then read back the committed ledger.\n\n${SCHEMA_NOTE_ACCOUNTS}\n\nTask:\n1) Start a transaction with BEGIN.\n2) Add 15000 cents to the balance of the account with id 5.\n3) Commit with COMMIT.\n4) Finish with a SELECT returning id, holder and balance for ALL accounts, ordered by id ascending.\n\n${RULES_TXN}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "BEGIN COMMIT ROLLBACK",
    headerCode: ACCOUNTS_SCHEMA,
    sourcecode: `BEGIN;
UPDATE accounts SET balance = balance + 15000 WHERE id = 5;
COMMIT;
SELECT id, holder, balance FROM accounts ORDER BY id;`,
    columns: ["id", "holder", "balance"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Rollback a Bad Debit",
    description: `A teller enters a 1000.00 debit against Cyrus Vance's 750.00 account — far over the balance. The whole transaction is rolled back, so the ledger must come back untouched.\n\n${SCHEMA_NOTE_ACCOUNTS}\n\nTask:\n1) Start a transaction with BEGIN.\n2) Subtract 100000 cents from the balance of the account with id 3.\n3) Undo everything with ROLLBACK.\n4) Finish with a SELECT returning id, holder and balance for ALL accounts, ordered by id ascending — every balance must be unchanged.\n\n${RULES_TXN}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "BEGIN COMMIT ROLLBACK",
    headerCode: ACCOUNTS_SCHEMA,
    sourcecode: `BEGIN;
UPDATE accounts SET balance = balance - 100000 WHERE id = 3;
ROLLBACK;
SELECT id, holder, balance FROM accounts ORDER BY id;`,
    columns: ["id", "holder", "balance"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Transfer Between Accounts",
    description: `A classic atomic transfer: move 500.00 from Amara Diallo (id 1) to Bo Chen (id 2) inside one transaction — both legs or neither.\n\n${SCHEMA_NOTE_ACCOUNTS}\n\nTask:\n1) Start a transaction with BEGIN.\n2) Subtract 50000 cents from the account with id 1.\n3) Add 50000 cents to the account with id 2.\n4) Commit with COMMIT.\n5) Finish with a SELECT returning id, holder and balance for ALL accounts, ordered by id ascending.\n\n${RULES_TXN}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "BEGIN COMMIT ROLLBACK",
    headerCode: ACCOUNTS_SCHEMA,
    sourcecode: `BEGIN;
UPDATE accounts SET balance = balance - 50000 WHERE id = 1;
UPDATE accounts SET balance = balance + 50000 WHERE id = 2;
COMMIT;
SELECT id, holder, balance FROM accounts ORDER BY id;`,
    columns: ["id", "holder", "balance"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Savepoint Revert One Step",
    description: `A draft adjustment is wrapped in a savepoint, inspected, and reverted — the savepoint lets the batch cancel its own step without aborting anything else.\n\n${SCHEMA_NOTE_ACCOUNTS}\n\nTask:\n1) Create a savepoint named s1 with SAVEPOINT.\n2) Add 5000 cents to the balance of the account with id 5.\n3) Undo back to the savepoint with ROLLBACK TO s1.\n4) Commit with COMMIT.\n5) Finish with a SELECT returning id, holder and balance for ALL accounts, ordered by id ascending — every balance must be unchanged.\n\n${RULES_TXN}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "SAVEPOINT",
    headerCode: ACCOUNTS_SCHEMA,
    sourcecode: `SAVEPOINT s1;
UPDATE accounts SET balance = balance + 5000 WHERE id = 5;
ROLLBACK TO s1;
COMMIT;
SELECT id, holder, balance FROM accounts ORDER BY id;`,
    columns: ["id", "holder", "balance"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Release Keeps Changes",
    description: `Dana Whitfield's account receives a 100.00 service credit. The adjustment is fenced with a savepoint and then released — RELEASE folds the savepoint's work into the surrounding transaction, ready to commit.\n\n${SCHEMA_NOTE_ACCOUNTS}\n\nTask:\n1) Start a transaction with BEGIN.\n2) Create a savepoint named s1.\n3) Add 10000 cents to the balance of the account with id 4.\n4) Fold the savepoint away with RELEASE s1.\n5) Commit with COMMIT.\n6) Finish with a SELECT returning id, holder and balance for ALL accounts, ordered by id ascending.\n\n${RULES_TXN}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "SAVEPOINT",
    headerCode: ACCOUNTS_SCHEMA,
    sourcecode: `BEGIN;
SAVEPOINT s1;
UPDATE accounts SET balance = balance + 10000 WHERE id = 4;
RELEASE s1;
COMMIT;
SELECT id, holder, balance FROM accounts ORDER BY id;`,
    columns: ["id", "holder", "balance"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Ordered Transfer Chain",
    description: `The nightly processor moves 300.00 from Bo Chen (id 2) to Farah Aziz (id 6). Runbook rule: always touch the lower account id first — that fixed ordering is how the batch avoids deadlocks with the other processors.\n\n${SCHEMA_NOTE_ACCOUNTS}\n\nTask:\n1) Start a transaction with BEGIN.\n2) Subtract 30000 cents from the account with id 2 (the lower id first).\n3) Add 30000 cents to the account with id 6.\n4) Commit with COMMIT.\n5) Finish with a SELECT returning id, holder and balance for the checking accounts only (kind = 'checking'), ordered by id ascending.\n\n${RULES_TXN}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Deadlocks",
    headerCode: ACCOUNTS_SCHEMA,
    sourcecode: `BEGIN;
UPDATE accounts SET balance = balance - 30000 WHERE id = 2;
UPDATE accounts SET balance = balance + 30000 WHERE id = 6;
COMMIT;
SELECT id, holder, balance FROM accounts WHERE kind = 'checking' ORDER BY id;`,
    columns: ["id", "holder", "balance"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── easy · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Fee Day Batch",
    description: `Month-end: every checking account pays a 5.00 maintenance fee in one committed batch.\n\n${SCHEMA_NOTE_ACCOUNTS}\n\nTask:\n1) Start a transaction with BEGIN.\n2) Subtract 500 cents from the balance of every account where kind = 'checking'.\n3) Commit with COMMIT.\n4) Finish with a SELECT returning id, holder and balance for ALL accounts, ordered by id ascending.\n\n${RULES_TXN}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "BEGIN COMMIT ROLLBACK",
    headerCode: ACCOUNTS_SCHEMA,
    sourcecode: `BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE kind = 'checking';
COMMIT;
SELECT id, holder, balance FROM accounts ORDER BY id;`,
    columns: ["id", "holder", "balance"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Voided Wire",
    description: `A 300.00 wire out of Farah Aziz's account (id 6) was keyed against the wrong beneficiary. Before anything reaches the outside world, the operations desk voids the whole transaction.\n\n${SCHEMA_NOTE_ACCOUNTS}\n\nTask:\n1) Start a transaction with BEGIN.\n2) Subtract 30000 cents from the balance of the account with id 6.\n3) Void it with ROLLBACK.\n4) Finish with a SELECT returning id, holder and balance for ALL accounts, ordered by id ascending — every balance must be unchanged.\n\n${RULES_TXN}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "BEGIN COMMIT ROLLBACK",
    headerCode: ACCOUNTS_SCHEMA,
    sourcecode: `BEGIN;
UPDATE accounts SET balance = balance - 30000 WHERE id = 6;
ROLLBACK;
SELECT id, holder, balance FROM accounts ORDER BY id;`,
    columns: ["id", "holder", "balance"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Interest Posting With a Savepoint",
    description: `Savings accounts earn 2% interest. The posting is fenced by a savepoint that is released, then committed — a small-scale atomic batch.\n\n${SCHEMA_NOTE_ACCOUNTS}\n\nTask:\n1) Start a transaction with BEGIN.\n2) Create a savepoint named s1.\n3) Update every account where kind = 'savings': set balance = balance + (balance / 100) * 2 (integer cents arithmetic).\n4) Fold the savepoint away with RELEASE s1.\n5) Commit with COMMIT.\n6) Finish with a SELECT returning id, holder and balance for the savings accounts only (kind = 'savings'), ordered by id ascending.\n\n${RULES_TXN}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "SAVEPOINT",
    headerCode: ACCOUNTS_SCHEMA,
    sourcecode: `BEGIN;
SAVEPOINT s1;
UPDATE accounts SET balance = balance + (balance / 100) * 2 WHERE kind = 'savings';
RELEASE s1;
COMMIT;
SELECT id, holder, balance FROM accounts WHERE kind = 'savings' ORDER BY id;`,
    columns: ["id", "holder", "balance"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Closure Withdrawal Undone",
    description: `A closing teller nearly zeroes Emil Novak's account (id 5) — wrong branch closing form. The savepoint fence catches it in time; the transaction commits with the dangerous update rolled back.\n\n${SCHEMA_NOTE_ACCOUNTS}\n\nTask:\n1) Create a savepoint named s1.\n2) Set the balance of the account with id 5 to 0.\n3) Undo back to the savepoint with ROLLBACK TO s1.\n4) Commit with COMMIT.\n5) Finish with a SELECT returning id, holder and balance for ALL accounts, ordered by id ascending — every balance must be unchanged.\n\n${RULES_TXN}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "SAVEPOINT",
    headerCode: ACCOUNTS_SCHEMA,
    sourcecode: `SAVEPOINT s1;
UPDATE accounts SET balance = 0 WHERE id = 5;
ROLLBACK TO s1;
COMMIT;
SELECT id, holder, balance FROM accounts ORDER BY id;`,
    columns: ["id", "holder", "balance"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── medium · scenario (6) ────────────────────────────────────────── */
  {
    title: "Two-Stage Migration Batch",
    description: `The migration desk runs a two-stage batch under one transaction. Stage one (a 20.00 goodwill credit to every savings account) is approved and released. Stage two (an 80.00 draft debit to every checking account) is still under review and must be rolled back before the final commit.\n\n${SCHEMA_NOTE_ACCOUNTS}\n\nTask:\n1) Start a transaction with BEGIN.\n2) Create a savepoint named stage1.\n3) Add 2000 cents to the balance of every account where kind = 'savings'.\n4) Fold stage one away with RELEASE stage1.\n5) Create a savepoint named stage2.\n6) Subtract 8000 cents from the balance of every account where kind = 'checking'.\n7) Undo back to stage2 with ROLLBACK TO stage2.\n8) Commit with COMMIT.\n9) Finish with a SELECT returning id, holder and balance for ALL accounts, ordered by id ascending — savings grew by 2000, checking must be unchanged.\n\n${RULES_TXN}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "SAVEPOINT",
    headerCode: ACCOUNTS_SCHEMA,
    sourcecode: `BEGIN;
SAVEPOINT stage1;
UPDATE accounts SET balance = balance + 2000 WHERE kind = 'savings';
RELEASE stage1;
SAVEPOINT stage2;
UPDATE accounts SET balance = balance - 8000 WHERE kind = 'checking';
ROLLBACK TO stage2;
COMMIT;
SELECT id, holder, balance FROM accounts ORDER BY id;`,
    columns: ["id", "holder", "balance"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "DELETE, INSERT INTO", whitelist: "SAVEPOINT, ROLLBACK TO",
  },
  {
    title: "Serialized Statement Pair",
    description: `The teller system guarantees serializable behavior: both legs of a transfer commit as one indivisible unit — outside readers never see the money "in flight". Move 100.00 from Amara Diallo (id 1) to Cyrus Vance (id 3) atomically.\n\n${SCHEMA_NOTE_ACCOUNTS}\n\nTask:\n1) Start a transaction with BEGIN.\n2) Subtract 10000 cents from the account with id 1.\n3) Add 10000 cents to the account with id 3.\n4) Commit with COMMIT.\n5) Finish with a SELECT returning id, holder and balance for ALL accounts, ordered by id ascending.\n\n${RULES_TXN}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Isolation Levels",
    headerCode: ACCOUNTS_SCHEMA,
    sourcecode: `BEGIN;
UPDATE accounts SET balance = balance - 10000 WHERE id = 1;
UPDATE accounts SET balance = balance + 10000 WHERE id = 3;
COMMIT;
SELECT id, holder, balance FROM accounts ORDER BY id;`,
    columns: ["id", "holder", "balance"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "ROLLBACK, SAVEPOINT", whitelist: "BEGIN, COMMIT",
  },
  {
    title: "Escalate to Immediate",
    description: `High-value wires use BEGIN IMMEDIATE so the write lock is taken the instant the transaction starts — no surprises mid-batch. Post a 70.00 rebate to Farah Aziz (id 6) under that mode.\n\n${SCHEMA_NOTE_ACCOUNTS}\n\nTask:\n1) Start the transaction with BEGIN IMMEDIATE.\n2) Add 7000 cents to the balance of the account with id 6.\n3) Commit with COMMIT.\n4) Finish with a SELECT returning holder and balance for the checking accounts only (kind = 'checking'), ordered by balance descending, tie-break by holder ascending.\n\n${RULES_TXN}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Locks and Locking",
    headerCode: ACCOUNTS_SCHEMA,
    sourcecode: `BEGIN IMMEDIATE;
UPDATE accounts SET balance = balance + 7000 WHERE id = 6;
COMMIT;
SELECT holder, balance FROM accounts WHERE kind = 'checking' ORDER BY balance DESC, holder ASC;`,
    columns: ["holder", "balance"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "ROLLBACK, SAVEPOINT", whitelist: "BEGIN IMMEDIATE, COMMIT",
  },
  {
    title: "Lock Discipline Drill",
    description: `The month-end auditor needs exclusive access. The drill: run the fee sweep under BEGIN EXCLUSIVE so no other connection can slip in, then commit.\n\n${SCHEMA_NOTE_ACCOUNTS}\n\nTask:\n1) Start the transaction with BEGIN EXCLUSIVE.\n2) Subtract 1200 cents from the balance of every account where kind = 'checking'.\n3) Commit with COMMIT.\n4) Finish with a SELECT returning id, holder and balance for ALL accounts, ordered by id ascending.\n\n${RULES_TXN}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Locks and Locking",
    headerCode: ACCOUNTS_SCHEMA,
    sourcecode: `BEGIN EXCLUSIVE;
UPDATE accounts SET balance = balance - 1200 WHERE kind = 'checking';
COMMIT;
SELECT id, holder, balance FROM accounts ORDER BY id;`,
    columns: ["id", "holder", "balance"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "SAVEPOINT, ROLLBACK", whitelist: "BEGIN EXCLUSIVE, COMMIT",
  },
  {
    title: "Ordered Updates Beat Deadlock",
    description: `Two night processors swap money between Bo Chen (id 2) and Dana Whitfield (id 4) in opposite directions. Deadlocks happen when they update in opposite orders — the runbook's fix is a global rule: every processor updates the LOWER account id first. Execute this processor's 400.00 transfer accordingly.\n\n${SCHEMA_NOTE_ACCOUNTS}\n\nTask:\n1) Start a transaction with BEGIN.\n2) Subtract 40000 cents from the account with id 2 (lower id first).\n3) Add 40000 cents to the account with id 4.\n4) Commit with COMMIT.\n5) Finish with a SELECT returning id, holder and balance for ALL accounts, ordered by id ascending.\n\n${RULES_TXN}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Deadlocks",
    headerCode: ACCOUNTS_SCHEMA,
    sourcecode: `BEGIN;
UPDATE accounts SET balance = balance - 40000 WHERE id = 2;
UPDATE accounts SET balance = balance + 40000 WHERE id = 4;
COMMIT;
SELECT id, holder, balance FROM accounts ORDER BY id;`,
    columns: ["id", "holder", "balance"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "SAVEPOINT, ROLLBACK", whitelist: "BEGIN, COMMIT, UPDATE",
  },
  {
    title: "Nested Savepoint Ladder",
    description: `A batch drill walks a savepoint ladder: s1 credits Amara Diallo (id 1), s2 credits Bo Chen (id 2), s3 credits Emil Novak (id 5). The drill then unwinds back to s2 — work inside s2 and s3 is undone, work released through s1 survives, and the transaction commits.\n\n${SCHEMA_NOTE_ACCOUNTS}\n\nTask:\n1) Create savepoint s1 and add 5000 cents to the account with id 1.\n2) Create savepoint s2 and add 7000 cents to the account with id 2.\n3) Create savepoint s3 and add 9000 cents to the account with id 5.\n4) Roll back to s2 with ROLLBACK TO s2.\n5) Commit with COMMIT.\n6) Finish with a SELECT returning id, holder and balance for ALL accounts, ordered by id ascending — only id 1 keeps its credit.\n\n${RULES_TXN}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "SAVEPOINT",
    headerCode: ACCOUNTS_SCHEMA,
    sourcecode: `SAVEPOINT s1;
UPDATE accounts SET balance = balance + 5000 WHERE id = 1;
SAVEPOINT s2;
UPDATE accounts SET balance = balance + 7000 WHERE id = 2;
SAVEPOINT s3;
UPDATE accounts SET balance = balance + 9000 WHERE id = 5;
ROLLBACK TO s2;
COMMIT;
SELECT id, holder, balance FROM accounts ORDER BY id;`,
    columns: ["id", "holder", "balance"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "DELETE, DROP", whitelist: "SAVEPOINT, ROLLBACK TO",
  },

  /* ── hard · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Mixed Batch With Partial Salvage",
    description: `The nightly batch has two legs under one transaction: an approved 15.00 fee on every checking account (kept), and a draft 200.00 bonus for Emil Novak (id 5) that fails review and is rolled back via its own savepoint. One commit seals the mixed outcome.\n\n${SCHEMA_NOTE_ACCOUNTS}\n\nTask:\n1) Start a transaction with BEGIN.\n2) Create a savepoint named s_fee and subtract 1500 cents from the balance of every account where kind = 'checking'; then fold it away with RELEASE s_fee.\n3) Create a savepoint named s_bonus and add 20000 cents to the account with id 5; then undo it with ROLLBACK TO s_bonus.\n4) Commit with COMMIT.\n5) Finish with a SELECT returning id, holder and balance for ALL accounts, ordered by id ascending — checking accounts carry the fee; Emil's bonus must be reverted.\n\n${RULES_TXN}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "SAVEPOINT",
    headerCode: ACCOUNTS_SCHEMA,
    sourcecode: `BEGIN;
SAVEPOINT s_fee;
UPDATE accounts SET balance = balance - 1500 WHERE kind = 'checking';
RELEASE s_fee;
SAVEPOINT s_bonus;
UPDATE accounts SET balance = balance + 20000 WHERE id = 5;
ROLLBACK TO s_bonus;
COMMIT;
SELECT id, holder, balance FROM accounts ORDER BY id;`,
    columns: ["id", "holder", "balance"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "DELETE, DROP", whitelist: "SAVEPOINT, ROLLBACK TO, COMMIT",
  },
  {
    title: "Wire With Its Ledger Trail",
    description: `A compliant wire writes the balance legs AND the ledger trail in one transaction — either both land or neither does. Move 250.00 from Bo Chen (id 2) to Amara Diallo (id 1), then finish by reading the joined ledger trail.\n\n${SCHEMA_NOTE_ACCOUNTS_LEDGER}\n\nTask:\n1) Start a transaction with BEGIN.\n2) Subtract 25000 cents from the account with id 2.\n3) Add 25000 cents to the account with id 1.\n4) Insert two ledger rows in ONE INSERT statement: (account_id 2, delta -25000, note 'wire out to Amara Diallo') and (account_id 1, delta 25000, note 'wire in from Bo Chen').\n5) Commit with COMMIT.\n6) Finish with a SELECT joining accounts (alias a) to ledger (alias l) ON l.account_id = a.id, returning a.holder aliased as holder, a.balance aliased as balance, l.note aliased as note and l.delta aliased as delta, ordered by l.id ascending.\n\n${RULES_TXN}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "BEGIN COMMIT ROLLBACK",
    headerCode: ACCOUNTS_SCHEMA + LEDGER_SCHEMA,
    sourcecode: `BEGIN;
UPDATE accounts SET balance = balance - 25000 WHERE id = 2;
UPDATE accounts SET balance = balance + 25000 WHERE id = 1;
INSERT INTO ledger (account_id, delta, note) VALUES (2, -25000, 'wire out to Amara Diallo'), (1, 25000, 'wire in from Bo Chen');
COMMIT;
SELECT a.holder AS holder, a.balance AS balance, l.note AS note, l.delta AS delta FROM accounts a JOIN ledger l ON l.account_id = a.id ORDER BY l.id;`,
    columns: ["holder", "balance", "note", "delta"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "DELETE, SAVEPOINT", whitelist: "BEGIN, COMMIT, INSERT INTO",
  },
  {
    title: "Rollback Only the Failed Leg",
    description: `The nightly batch posts two changes: a 120.00 referral credit to every savings account (approved), and a draft 9999.99 "loyalty correction" on every checking account (rejected). The correction is fenced in its own savepoint, rolled back, replaced by the approved 25.00 adjustment, and the batch commits once.\n\n${SCHEMA_NOTE_ACCOUNTS}\n\nTask:\n1) Start a transaction with BEGIN.\n2) Create a savepoint named s_ref and add 12000 cents to every account where kind = 'savings'; then fold it away with RELEASE s_ref.\n3) Create a savepoint named s_loyal and subtract 999999 cents from every account where kind = 'checking'; then undo it with ROLLBACK TO s_loyal.\n4) Subtract 2500 cents from every account where kind = 'checking' (the approved adjustment).\n5) Commit with COMMIT.\n6) Finish with a SELECT returning id, holder and balance for ALL accounts, ordered by id ascending.\n\n${RULES_TXN}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "SAVEPOINT",
    headerCode: ACCOUNTS_SCHEMA,
    sourcecode: `BEGIN;
SAVEPOINT s_ref;
UPDATE accounts SET balance = balance + 12000 WHERE kind = 'savings';
RELEASE s_ref;
SAVEPOINT s_loyal;
UPDATE accounts SET balance = balance - 999999 WHERE kind = 'checking';
ROLLBACK TO s_loyal;
UPDATE accounts SET balance = balance - 2500 WHERE kind = 'checking';
COMMIT;
SELECT id, holder, balance FROM accounts ORDER BY id;`,
    columns: ["id", "holder", "balance"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "DELETE, DROP", whitelist: "SAVEPOINT, ROLLBACK TO, COMMIT",
  },
  {
    title: "Deadlock-Free Reconciliation",
    description: `The reconciler swaps balances across two pairs: 180.00 between Amara Diallo (id 1) and Farah Aziz (id 6), and 70.00 between Cyrus Vance (id 3) and Emil Novak (id 5). Global runbook rule to avoid deadlocks: process ALL account updates in strictly ascending id order inside one transaction.\n\n${SCHEMA_NOTE_ACCOUNTS}\n\nTask:\n1) Start a transaction with BEGIN.\n2) Update in ascending id order: id 1 gets -18000 cents; id 3 gets +7000 cents; id 5 gets -7000 cents; id 6 gets +18000 cents.\n3) Commit with COMMIT.\n4) Finish with a SELECT returning id, holder and balance for ALL accounts, ordered by id ascending.\n\n${RULES_TXN}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Deadlocks",
    headerCode: ACCOUNTS_SCHEMA,
    sourcecode: `BEGIN;
UPDATE accounts SET balance = balance - 18000 WHERE id = 1;
UPDATE accounts SET balance = balance + 7000 WHERE id = 3;
UPDATE accounts SET balance = balance - 7000 WHERE id = 5;
UPDATE accounts SET balance = balance + 18000 WHERE id = 6;
COMMIT;
SELECT id, holder, balance FROM accounts ORDER BY id;`,
    columns: ["id", "holder", "balance"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "SAVEPOINT, ROLLBACK", whitelist: "BEGIN, COMMIT, UPDATE",
  },
];

/* ── MCQs (20: 10 easy / 6 medium / 4 hard; 7 snippets; 5/5/5/5 spread) ── */
const mcqs: SqlMcqQuestionIn[] = [
  { title: "ACID Letters", description: "In the ACID guarantees, the D stands for…", difficulty: "easy", topic: TOPIC, subtopic: "BEGIN COMMIT ROLLBACK",
    Option1: "Durability", Option2: "Dependency", Option3: "Distribution", Option4: "Determinism", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Commit Meaning", description: "What does COMMIT do to the work performed since BEGIN?", difficulty: "easy", topic: TOPIC, subtopic: "BEGIN COMMIT ROLLBACK",
    Option1: "Undoes it all", Option2: "Locks the database file forever", Option3: "Makes it permanent, visible to later readers", Option4: "Starts a nested transaction", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Rollback Effect", description: "After BEGIN, one UPDATE ran, then ROLLBACK. What does the data look like?", difficulty: "easy", topic: TOPIC, subtopic: "BEGIN COMMIT ROLLBACK",
    Option1: "Half-updated — the UPDATE stays", Option2: "Exactly as it was before BEGIN", Option3: "Deleted rows everywhere", Option4: "Committed anyway", CorrectOption: 2, iscodesnippet: true,
    codesnippet: "BEGIN;\nUPDATE accounts SET balance = 0 WHERE id = 2;\nROLLBACK;\nSELECT balance FROM accounts WHERE id = 2;", snippetLang: "sql" },
  { title: "Default Autocommit", description: "Outside an explicit transaction in SQLite, each standalone statement is…", difficulty: "easy", topic: TOPIC, subtopic: "BEGIN COMMIT ROLLBACK",
    Option1: "Rolled back automatically", Option2: "Queued until the next COMMIT", Option3: "Ignored by the engine", Option4: "Its own implicit transaction, committed immediately", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "SAVEPOINT Purpose", description: "Why does a transaction create a SAVEPOINT?", difficulty: "easy", topic: TOPIC, subtopic: "SAVEPOINT",
    Option1: "To copy the database file", Option2: "To pause other users", Option3: "To undo part of the transaction without discarding all of it", Option4: "To speed up bulk INSERTs", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Transfer With Rollback", description: "Account id 1 starts at 250000. What does the snippet's SELECT print?", difficulty: "easy", topic: TOPIC, subtopic: "BEGIN COMMIT ROLLBACK",
    Option1: "250000 — the debit was rolled back", Option2: "249500", Option3: "0", Option4: "NULL", CorrectOption: 1, iscodesnippet: true,
    codesnippet: "BEGIN;\nUPDATE accounts SET balance = balance - 500 WHERE id = 1;\nROLLBACK;\nSELECT balance FROM accounts WHERE id = 1;", snippetLang: "sql" },
  { title: "RELEASE Savepoint", description: "What does RELEASE s1 do to the work done after SAVEPOINT s1?", difficulty: "easy", topic: TOPIC, subtopic: "SAVEPOINT",
    Option1: "Undoes it back to the savepoint", Option2: "Deletes the underlying table", Option3: "Commits the whole transaction immediately", Option4: "Merges it upward and removes the savepoint (committing only if s1 was the outermost savepoint)", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Visibility of Uncommitted Work", description: "Connection A runs the snippet (no COMMIT yet). When can connection B first read the +1 change?", difficulty: "easy", topic: TOPIC, subtopic: "Isolation Levels",
    Option1: "While the transaction is still open", Option2: "Only after A executes COMMIT", Option3: "Never — SQLite hides it forever", Option4: "Immediately after ROLLBACK", CorrectOption: 2, iscodesnippet: true,
    codesnippet: "BEGIN;\nUPDATE accounts SET balance = balance + 1 WHERE id = 3;", snippetLang: "sql" },
  { title: "Atomicity Meaning", description: "The A in ACID promises that…", difficulty: "easy", topic: TOPIC, subtopic: "BEGIN COMMIT ROLLBACK",
    Option1: "Uncommitted changes stay readable", Option2: "All statements in the transaction apply, or none do", Option3: "Data is duplicated for safety", Option4: "Rows are locked until reboot", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Ending a Transaction", description: "Which pair of statements both END a transaction?", difficulty: "easy", topic: TOPIC, subtopic: "BEGIN COMMIT ROLLBACK",
    Option1: "BEGIN and SAVEPOINT", Option2: "SAVEPOINT and RELEASE", Option3: "SELECT and INSERT", Option4: "COMMIT and ROLLBACK", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },

  { title: "SQLite Isolation Default", description: "With its default journaling, SQLite gives concurrent connections…", difficulty: "medium", topic: TOPIC, subtopic: "Isolation Levels",
    Option1: "Dirty reads of uncommitted data by default", Option2: "No isolation at all", Option3: "Serializable behavior — writers and readers never see partial transactions", Option4: "Full multi-version snapshot isolation with MVCC", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "ROLLBACK TO Semantics", description: "Account id 4 starts at 500000. What does the snippet's SELECT print, and why?", difficulty: "medium", topic: TOPIC, subtopic: "SAVEPOINT",
    Option1: "500000 — undone, and the transaction is still open", Option2: "500 — the UPDATE survives", Option3: "0 — the transaction was aborted", Option4: "An error — ROLLBACK TO requires an explicit BEGIN first", CorrectOption: 1, iscodesnippet: true,
    codesnippet: "SAVEPOINT s1;\nUPDATE accounts SET balance = 500 WHERE id = 4;\nROLLBACK TO s1;\nSELECT balance FROM accounts WHERE id = 4;", snippetLang: "sql" },
  { title: "BEGIN IMMEDIATE", description: "How does BEGIN IMMEDIATE differ from a plain BEGIN in SQLite?", difficulty: "medium", topic: TOPIC, subtopic: "Locks and Locking",
    Option1: "It commits instantly after each statement", Option2: "It is invalid without WAL mode", Option3: "It allows only read statements", Option4: "It acquires the write (RESERVED) lock at BEGIN, not at the first write", CorrectOption: 4, iscodesnippet: true,
    codesnippet: "BEGIN IMMEDIATE;\nUPDATE accounts SET balance = balance - 100 WHERE id = 5;\nCOMMIT;", snippetLang: "sql" },
  { title: "Deadlock Recipe", description: "A classic deadlock between two sessions needs…", difficulty: "medium", topic: TOPIC, subtopic: "Deadlocks",
    Option1: "One transaction and one idle reader", Option2: "Two sessions each holding a lock the other needs, acquired in opposite order", Option3: "A missing index on the join column", Option4: "Too many savepoints in one transaction", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Deadlock Prevention", description: "The most effective habit for preventing deadlocks is…", difficulty: "medium", topic: TOPIC, subtopic: "Deadlocks",
    Option1: "Touching rows and tables in a consistent order and keeping transactions short", Option2: "Adding more indexes", Option3: "Making transactions longer to hold locks safely", Option4: "Never calling COMMIT", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Savepoint Ladder Outcome", description: "Account id 1 starts at 100000. What does the snippet's final SELECT print?", difficulty: "medium", topic: TOPIC, subtopic: "SAVEPOINT",
    Option1: "222 — the last update wins", Option2: "111 — the first update survives", Option3: "100000 — both updates happened after s1 and were rolled back", Option4: "NULL — the column is cleared", CorrectOption: 3, iscodesnippet: true,
    codesnippet: "BEGIN;\nSAVEPOINT s1;\nUPDATE accounts SET balance = 111 WHERE id = 1;\nSAVEPOINT s2;\nUPDATE accounts SET balance = 222 WHERE id = 1;\nROLLBACK TO s1;\nCOMMIT;\nSELECT balance FROM accounts WHERE id = 1;", snippetLang: "sql" },

  { title: "Lock Ladder", description: "Which is the correct escalation of SQLite's classic (rollback-journal) lock states?", difficulty: "hard", topic: TOPIC, subtopic: "Locks and Locking",
    Option1: "EXCLUSIVE -> RESERVED -> SHARED", Option2: "SHARED -> RESERVED -> PENDING -> EXCLUSIVE", Option3: "PENDING -> SHARED -> EXCLUSIVE", Option4: "SQLite takes no locks at all", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Durability Mechanism", description: "What makes a committed SQLite transaction survive a crash (the D in ACID)?", difficulty: "hard", topic: TOPIC, subtopic: "BEGIN COMMIT ROLLBACK",
    Option1: "An in-memory copy of the database", Option2: "The operating system file cache alone", Option3: "Duplicated columns in every row", Option4: "The rollback journal or WAL, synced to disk before COMMIT returns", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Nested Savepoint Chain", description: "The table t starts with v = 0. What does v hold after the snippet completes?", difficulty: "hard", topic: TOPIC, subtopic: "SAVEPOINT",
    Option1: "2 — both updates survive RELEASE", Option2: "0 — RELEASE clears the value", Option3: "1 — only the b-savepoint work was undone (RELEASE a then ends the transaction)", Option4: "NULL — the column becomes empty", CorrectOption: 3, iscodesnippet: true,
    codesnippet: "SAVEPOINT a;\nUPDATE t SET v = 1;\nSAVEPOINT b;\nUPDATE t SET v = 2;\nROLLBACK TO b;\nRELEASE a;", snippetLang: "sql" },
  { title: "Isolation Levels Order", description: "Ordered weakest to strongest, the standard SQL isolation levels are…", difficulty: "hard", topic: TOPIC, subtopic: "Isolation Levels",
    Option1: "READ UNCOMMITTED -> READ COMMITTED -> REPEATABLE READ -> SERIALIZABLE", Option2: "SERIALIZABLE -> REPEATABLE READ -> READ COMMITTED -> READ UNCOMMITTED", Option3: "They are unordered — any one may be chosen freely", Option4: "SQLite implements all four simultaneously with MVCC", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
];

await buildDay({ day: DAY, topic: TOPIC, subtopics: SUBTOPICS, codeQuestions, mcqs });
