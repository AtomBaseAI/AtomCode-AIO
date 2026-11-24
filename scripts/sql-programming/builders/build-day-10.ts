/**
 * Day 10 — "INNER and OUTER Joins" — question builder.
 *
 * Domain: a pet clinic (owners, pets, visits) — INNER/LEFT/RIGHT/FULL
 * OUTER JOIN (SQLite 3.39+), ON vs USING (a small clinic_branches lookup
 * table shares the `city` column so USING(city) works naturally), and
 * three-table joins. All joined output columns are explicitly aliased so
 * result headers are deterministic. SQLite has no
 * RIGHT/FULL OUTER JOIN before 3.39 — sql.js 1.13.0 is SQLite 3.54.
 *
 * Run from /home/z/my-project:
 *   bun scripts/sql-programming/builders/build-day-10.ts
 */
import { buildDay, type SqlCodeQuestionIn, type SqlMcqQuestionIn } from "../lib.ts";

const DAY = 10;
const TOPIC = "INNER and OUTER Joins";
const SUBTOPICS = [
  "INNER JOIN",
  "LEFT OUTER JOIN",
  "RIGHT OUTER JOIN",
  "FULL OUTER JOIN",
  "ON vs USING Clause",
  "Three Table Joins",
];

/* Shared hidden setup: a pet clinic. */
const CLINIC_SCHEMA = `CREATE TABLE owners (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL
);
CREATE TABLE pets (
  id INTEGER PRIMARY KEY,
  owner_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  age INTEGER NOT NULL
);
CREATE TABLE visits (
  id INTEGER PRIMARY KEY,
  pet_id INTEGER NOT NULL,
  visit_date TEXT NOT NULL,
  reason TEXT NOT NULL,
  cost REAL NOT NULL
);
INSERT INTO owners (name, phone, city) VALUES
('Alice Gresham', '555-0101', 'Riverside'),
('Bram Vanterpool', '555-0102', 'Central'),
('Corina Estevez', '555-0103', 'Harbor'),
('Dmitri Lang', '555-0104', 'Riverside'),
('Esi Ofori', '555-0105', 'Central'),
('Faruk Demir', '555-0106', 'Harbor'),
('Gwen Halloran', '555-0107', 'Riverside'),
('Hugo Lindqvist', '555-0108', 'Central');
INSERT INTO pets (owner_id, name, species, age) VALUES
(1, 'Mochi', 'dog', 3),
(1, 'Biscuit', 'cat', 5),
(2, 'Rocket', 'dog', 2),
(3, 'Willow', 'rabbit', 1),
(3, 'Pepper', 'cat', 4),
(4, 'Atlas', 'dog', 6),
(5, 'Nimbus', 'parakeet', 2),
(6, 'Sage', 'turtle', 12),
(7, 'Tulip', 'cat', 3),
(7, 'Juniper', 'dog', 4);
INSERT INTO visits (pet_id, visit_date, reason, cost) VALUES
(1, '2024-05-03', 'vaccination', 45.0),
(2, '2024-05-10', 'dental cleaning', 85.5),
(3, '2024-05-14', 'vaccination', 45.0),
(1, '2024-06-01', 'ear infection', 60.0),
(4, '2024-06-05', 'nail trim', 0.0),
(5, '2024-06-09', 'vaccination', 45.0),
(6, '2024-06-15', 'x-ray', 120.0),
(7, '2024-06-20', 'wing trim', 25.0),
(8, '2024-06-25', 'shell check', 35.0),
(9, '2024-07-01', 'vaccination', 45.0),
(2, '2024-07-08', 'skin rash', 55.0),
(3, '2024-07-12', 'follow-up', 0.0);`;

/* Extension used only by the ON-vs-USING questions: one branch per city. */
const BRANCH_SCHEMA = `

CREATE TABLE clinic_branches (
  branch_name TEXT NOT NULL,
  city TEXT NOT NULL,
  open_hours TEXT NOT NULL
);
INSERT INTO clinic_branches (branch_name, city, open_hours) VALUES
('Main Street Clinic', 'Riverside', '09:00-18:00'),
('Midtown Clinic', 'Central', '08:30-17:30'),
('Harborview Clinic', 'Harbor', '10:00-19:00');`;

const RULES_JOIN =
  "Rules:\n- SQLite dialect. The schema and its data are pre-seeded automatically — do not include CREATE TABLE or INSERT statements in your answer.\n- Column names and order must match exactly (alias every output column).\n- Row order must match exactly (use ORDER BY as specified).";

const SCHEMA_NOTE_CLINIC =
  "Schema:\n- owners(id INTEGER PRIMARY KEY, name TEXT, phone TEXT, city TEXT)\n- pets(id INTEGER PRIMARY KEY, owner_id INTEGER -> owners.id, name TEXT, species TEXT, age INTEGER)\n- visits(id INTEGER PRIMARY KEY, pet_id INTEGER -> pets.id, visit_date TEXT, reason TEXT, cost REAL)\n\nThe clinic seeded 8 owners, 10 pets and 12 visits. Every owner except Hugo Lindqvist (id 8) owns at least one pet; every pet except Juniper (pet id 10) has at least one visit; one visit cost 0.0.";

const SCHEMA_NOTE_CLINIC_BRANCHES =
  "Schema:\n- owners(id INTEGER PRIMARY KEY, name TEXT, phone TEXT, city TEXT)\n- pets(id INTEGER PRIMARY KEY, owner_id INTEGER -> owners.id, name TEXT, species TEXT, age INTEGER)\n- visits(id INTEGER PRIMARY KEY, pet_id INTEGER -> pets.id, visit_date TEXT, reason TEXT, cost REAL)\n- clinic_branches(branch_name TEXT, city TEXT, open_hours TEXT)\n\nThe clinic seeded 8 owners, 10 pets, 12 visits and 3 branches (one per city: Riverside, Central, Harbor). Every owner except Hugo Lindqvist (id 8) owns at least one pet; every pet except Juniper (pet id 10) has at least one visit.";

const codeQuestions: SqlCodeQuestionIn[] = [
  /* ── easy · basic (6) ─────────────────────────────────────────────── */
  {
    title: "Owners With Their Pets",
    description: `The reception board pairs each pet with its owner. Only matched pairs are needed.\n\n${SCHEMA_NOTE_CLINIC}\n\nTask:\nReturn o.name as owner_name and p.name as pet_name from an INNER JOIN of owners (o) and pets (p) on p.owner_id = o.id, ordered by p.id ascending.\n\n${RULES_JOIN}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "INNER JOIN",
    headerCode: CLINIC_SCHEMA,
    sourcecode: "SELECT o.name AS owner_name, p.name AS pet_name FROM owners o JOIN pets p ON p.owner_id = o.id ORDER BY p.id;",
    columns: ["owner_name", "pet_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Every Owner Pets Or Not",
    description: `The outreach list keeps EVERY owner, even the one without pets (their pet column stays NULL).\n\n${SCHEMA_NOTE_CLINIC}\n\nTask:\nReturn o.name as owner_name and p.name as pet_name from a LEFT JOIN of owners (o) and pets (p) on p.owner_id = o.id, ordered by o.id ascending, then p.id ascending.\n\n${RULES_JOIN}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "LEFT OUTER JOIN",
    headerCode: CLINIC_SCHEMA,
    sourcecode: "SELECT o.name AS owner_name, p.name AS pet_name FROM owners o LEFT JOIN pets p ON p.owner_id = o.id ORDER BY o.id, p.id;",
    columns: ["owner_name", "pet_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Pets Right Joined To Owners",
    description: `Practice the mirror image: keep every owner by joining FROM pets RIGHT JOIN owners.\n\n${SCHEMA_NOTE_CLINIC}\n\nTask:\nReturn p.name as pet_name and o.name as owner_name from pets (p) RIGHT JOIN owners (o) on p.owner_id = o.id, ordered by o.id ascending, then p.id ascending.\n\n${RULES_JOIN}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "RIGHT OUTER JOIN",
    headerCode: CLINIC_SCHEMA,
    sourcecode: "SELECT p.name AS pet_name, o.name AS owner_name FROM pets p RIGHT JOIN owners o ON p.owner_id = o.id ORDER BY o.id, p.id;",
    columns: ["pet_name", "owner_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Full Clinic Roster",
    description: `The audit wants every owner AND every pet in one result — unmatched rows from either side survive with NULLs.\n\n${SCHEMA_NOTE_CLINIC}\n\nTask:\nReturn o.name as owner_name and p.name as pet_name from a FULL OUTER JOIN of owners (o) and pets (p) on p.owner_id = o.id, ordered by o.id ascending, then p.id ascending.\n\n${RULES_JOIN}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "FULL OUTER JOIN",
    headerCode: CLINIC_SCHEMA,
    sourcecode: "SELECT o.name AS owner_name, p.name AS pet_name FROM owners o FULL OUTER JOIN pets p ON p.owner_id = o.id ORDER BY o.id, p.id;",
    columns: ["owner_name", "pet_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Match On The City Column",
    description: `Each owner is served by the clinic branch in their city. Practice the classic ON form of the join.\n\n${SCHEMA_NOTE_CLINIC_BRANCHES}\n\nTask:\nReturn o.name as owner_name and b.branch_name as branch_name from owners (o) JOIN clinic_branches (b) ON o.city = b.city, ordered by o.id ascending.\n\n${RULES_JOIN}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "ON vs USING Clause",
    headerCode: CLINIC_SCHEMA + BRANCH_SCHEMA,
    sourcecode: "SELECT o.name AS owner_name, b.branch_name AS branch_name FROM owners o JOIN clinic_branches b ON o.city = b.city ORDER BY o.id;",
    columns: ["owner_name", "branch_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Join With USING",
    description: `The same city match, written with the USING shorthand — both tables have a column named city.\n\n${SCHEMA_NOTE_CLINIC_BRANCHES}\n\nTask:\nReturn o.name as owner_name and b.branch_name as branch_name from owners (o) JOIN clinic_branches (b) USING (city), ordered by o.id ascending.\n\n${RULES_JOIN}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "ON vs USING Clause",
    headerCode: CLINIC_SCHEMA + BRANCH_SCHEMA,
    sourcecode: "SELECT o.name AS owner_name, b.branch_name AS branch_name FROM owners o JOIN clinic_branches b USING (city) ORDER BY o.id;",
    columns: ["owner_name", "branch_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── easy · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Vaccination Visit Log",
    description: `The front desk prints the vaccination log with pet names instead of raw pet ids.\n\n${SCHEMA_NOTE_CLINIC}\n\nTask:\nReturn p.name as pet_name and v.visit_date as visit_date from visits (v) INNER JOIN pets (p) on v.pet_id = p.id, keeping only v.reason = 'vaccination', ordered by visit_date ascending, tie-break by v.id ascending.\n\n${RULES_JOIN}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "INNER JOIN",
    headerCode: CLINIC_SCHEMA,
    sourcecode: "SELECT p.name AS pet_name, v.visit_date AS visit_date FROM visits v JOIN pets p ON v.pet_id = p.id WHERE v.reason = 'vaccination' ORDER BY visit_date ASC, v.id ASC;",
    columns: ["pet_name", "visit_date"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Boarding Pick Up Sheet",
    description: `The boarding kennel needs each pet next to its owner's name and phone for pick-up day.\n\n${SCHEMA_NOTE_CLINIC}\n\nTask:\nReturn p.name as pet_name, o.name as owner_name and o.phone as owner_phone from pets (p) JOIN owners (o) on p.owner_id = o.id, ordered by p.id ascending.\n\n${RULES_JOIN}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "INNER JOIN",
    headerCode: CLINIC_SCHEMA,
    sourcecode: "SELECT p.name AS pet_name, o.name AS owner_name, o.phone AS owner_phone FROM pets p JOIN owners o ON p.owner_id = o.id ORDER BY p.id;",
    columns: ["pet_name", "owner_name", "owner_phone"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Unvisited Pets Alert",
    description: `The reminder system flags pets that have NEVER had a visit — find them with a LEFT JOIN plus an IS NULL check.\n\n${SCHEMA_NOTE_CLINIC}\n\nTask:\nReturn p.name as pet_name from pets (p) LEFT JOIN visits (v) on v.pet_id = p.id, keeping only rows where v.id IS NULL, ordered by pet_name ascending.\n\n${RULES_JOIN}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "LEFT OUTER JOIN",
    headerCode: CLINIC_SCHEMA,
    sourcecode: "SELECT p.name AS pet_name FROM pets p LEFT JOIN visits v ON v.pet_id = p.id WHERE v.id IS NULL ORDER BY pet_name ASC;",
    columns: ["pet_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Clinic Directory With Species",
    description: `The printed directory lists every owner with phone and — when present — each pet and its species; the petless owner still gets a line.\n\n${SCHEMA_NOTE_CLINIC}\n\nTask:\nReturn o.name as owner_name, o.phone as owner_phone, p.name as pet_name and p.species as species from a FULL OUTER JOIN of owners (o) and pets (p) on p.owner_id = o.id, ordered by o.id ascending, then p.id ascending.\n\n${RULES_JOIN}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "FULL OUTER JOIN",
    headerCode: CLINIC_SCHEMA,
    sourcecode: "SELECT o.name AS owner_name, o.phone AS owner_phone, p.name AS pet_name, p.species AS species FROM owners o FULL OUTER JOIN pets p ON p.owner_id = o.id ORDER BY o.id, p.id;",
    columns: ["owner_name", "owner_phone", "pet_name", "species"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── medium · scenario (6) ────────────────────────────────────────── */
  {
    title: "Visit Bill With Owner Names",
    description: `The billing export joins all three tables: every visit with the pet and the paying owner's name.\n\n${SCHEMA_NOTE_CLINIC}\n\nTask:\nReturn v.visit_date as visit_date, p.name as pet_name, o.name as owner_name and v.cost as cost from visits (v) JOIN pets (p) ON v.pet_id = p.id JOIN owners (o) ON p.owner_id = o.id, ordered by visit_date ascending, tie-break by v.id ascending.\n\n${RULES_JOIN}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Three Table Joins",
    headerCode: CLINIC_SCHEMA,
    sourcecode: "SELECT v.visit_date AS visit_date, p.name AS pet_name, o.name AS owner_name, v.cost AS cost FROM visits v JOIN pets p ON v.pet_id = p.id JOIN owners o ON p.owner_id = o.id ORDER BY visit_date ASC, v.id ASC;",
    columns: ["visit_date", "pet_name", "owner_name", "cost"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "LEFT JOIN", whitelist: "JOIN, ON",
  },
  {
    title: "Every Pet From The Right Side",
    description: `Rewrite the visit log so every pet appears even without visits — approach it from the right: visits RIGHT JOIN pets.\n\n${SCHEMA_NOTE_CLINIC}\n\nTask:\nReturn p.name as pet_name, v.visit_date as visit_date and v.cost as cost from visits (v) RIGHT JOIN pets (p) on v.pet_id = p.id, ordered by p.id ascending, then v.id ascending (the visitless pet keeps NULL visit columns).\n\n${RULES_JOIN}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "RIGHT OUTER JOIN",
    headerCode: CLINIC_SCHEMA,
    sourcecode: "SELECT p.name AS pet_name, v.visit_date AS visit_date, v.cost AS cost FROM visits v RIGHT JOIN pets p ON v.pet_id = p.id ORDER BY p.id, v.id;",
    columns: ["pet_name", "visit_date", "cost"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "LEFT JOIN", whitelist: "RIGHT JOIN",
  },
  {
    title: "Owners Without Pets Register",
    description: `The marketing team needs owners with no pets on file — the classic LEFT JOIN ... IS NULL anti-join.\n\n${SCHEMA_NOTE_CLINIC}\n\nTask:\nReturn o.name as owner_name from owners (o) LEFT JOIN pets (p) on p.owner_id = o.id, keeping only rows where p.id IS NULL, ordered by owner_name ascending.\n\n${RULES_JOIN}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "LEFT OUTER JOIN",
    headerCode: CLINIC_SCHEMA,
    sourcecode: "SELECT o.name AS owner_name FROM owners o LEFT JOIN pets p ON p.owner_id = o.id WHERE p.id IS NULL ORDER BY owner_name ASC;",
    columns: ["owner_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "NOT IN", whitelist: "LEFT JOIN",
  },
  {
    title: "Branch Directory With Hours",
    description: `The ON form joins owners to their city branch; the directory also shows opening hours.\n\n${SCHEMA_NOTE_CLINIC_BRANCHES}\n\nTask:\nReturn o.name as owner_name, b.branch_name as branch_name and b.open_hours as open_hours from owners (o) JOIN clinic_branches (b) ON o.city = b.city, ordered by o.id ascending.\n\n${RULES_JOIN}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "ON vs USING Clause",
    headerCode: CLINIC_SCHEMA + BRANCH_SCHEMA,
    sourcecode: "SELECT o.name AS owner_name, b.branch_name AS branch_name, b.open_hours AS open_hours FROM owners o JOIN clinic_branches b ON o.city = b.city ORDER BY o.id;",
    columns: ["owner_name", "branch_name", "open_hours"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "USING", whitelist: "ON",
  },
  {
    title: "Complete Visit Ledger",
    description: `The year-end ledger wants every visit and every pet together — even pets that never visited. Use FULL OUTER JOIN between visits and pets.\n\n${SCHEMA_NOTE_CLINIC}\n\nTask:\nReturn p.name as pet_name, v.reason as reason and v.cost as cost from visits (v) FULL OUTER JOIN pets (p) on v.pet_id = p.id, ordered by p.id ascending, then v.id ascending.\n\n${RULES_JOIN}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "FULL OUTER JOIN",
    headerCode: CLINIC_SCHEMA,
    sourcecode: "SELECT p.name AS pet_name, v.reason AS reason, v.cost AS cost FROM visits v FULL OUTER JOIN pets p ON v.pet_id = p.id ORDER BY p.id, v.id;",
    columns: ["pet_name", "reason", "cost"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "UNION", whitelist: "FULL OUTER JOIN",
  },
  {
    title: "Three Way Billing Sheet",
    description: `A compact billing sheet chains the three tables and rounds the money column to cents.\n\n${SCHEMA_NOTE_CLINIC}\n\nTask:\nReturn o.name as owner_name, p.name as pet_name and ROUND(v.cost, 2) as cost from visits (v) JOIN pets (p) ON v.pet_id = p.id JOIN owners (o) ON p.owner_id = o.id, ordered by v.id ascending.\n\n${RULES_JOIN}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Three Table Joins",
    headerCode: CLINIC_SCHEMA,
    sourcecode: "SELECT o.name AS owner_name, p.name AS pet_name, ROUND(v.cost, 2) AS cost FROM visits v JOIN pets p ON v.pet_id = p.id JOIN owners o ON p.owner_id = o.id ORDER BY v.id;",
    columns: ["owner_name", "pet_name", "cost"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "WHERE", whitelist: "JOIN",
  },

  /* ── hard · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Every Owner's Full Visit Trail",
    description: `The audit trail keeps ALL owners (even petless) and ALL pets (even visitless), padding missing sides with NULLs: chain two LEFT JOINs starting from owners.\n\n${SCHEMA_NOTE_CLINIC}\n\nTask:\nReturn o.name as owner_name, p.name as pet_name, v.reason as reason and v.cost as cost from owners (o) LEFT JOIN pets (p) ON p.owner_id = o.id LEFT JOIN visits (v) ON v.pet_id = p.id, ordered by o.id ascending, then p.id ascending, then v.id ascending.\n\n${RULES_JOIN}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Three Table Joins",
    headerCode: CLINIC_SCHEMA,
    sourcecode: "SELECT o.name AS owner_name, p.name AS pet_name, v.reason AS reason, v.cost AS cost FROM owners o LEFT JOIN pets p ON p.owner_id = o.id LEFT JOIN visits v ON v.pet_id = p.id ORDER BY o.id, p.id, v.id;",
    columns: ["owner_name", "pet_name", "reason", "cost"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "INNER JOIN", whitelist: "LEFT JOIN",
  },
  {
    title: "Visits From The Pet Side Back",
    description: `Reverse-engineer the trail with chained RIGHT JOINs: start at visits, keep every pet, then keep every owner — unmatched sides pad with NULLs.\n\n${SCHEMA_NOTE_CLINIC}\n\nTask:\nReturn o.name as owner_name, p.name as pet_name and v.visit_date as visit_date from visits (v) RIGHT JOIN pets (p) ON v.pet_id = p.id RIGHT JOIN owners (o) ON p.owner_id = o.id, ordered by o.id ascending, then p.id ascending, then v.id ascending.\n\n${RULES_JOIN}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "RIGHT OUTER JOIN",
    headerCode: CLINIC_SCHEMA,
    sourcecode: "SELECT o.name AS owner_name, p.name AS pet_name, v.visit_date AS visit_date FROM visits v RIGHT JOIN pets p ON v.pet_id = p.id RIGHT JOIN owners o ON p.owner_id = o.id ORDER BY o.id, p.id, v.id;",
    columns: ["owner_name", "pet_name", "visit_date"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "WHERE", whitelist: "RIGHT JOIN",
  },
  {
    title: "Branch Serving Roster",
    description: `Combine the USING city match with the pet ownership chain: each pet, its owner and the owner's city branch (pets of petless owners would not appear). Reference the shared city column through USING only.\n\n${SCHEMA_NOTE_CLINIC_BRANCHES}\n\nTask:\nReturn o.name as owner_name, b.branch_name as branch_name and p.name as pet_name from owners (o) JOIN clinic_branches (b) USING (city) JOIN pets (p) ON p.owner_id = o.id, ordered by o.id ascending, then p.id ascending.\n\n${RULES_JOIN}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "ON vs USING Clause",
    headerCode: CLINIC_SCHEMA + BRANCH_SCHEMA,
    sourcecode: "SELECT o.name AS owner_name, b.branch_name AS branch_name, p.name AS pet_name FROM owners o JOIN clinic_branches b USING (city) JOIN pets p ON p.owner_id = o.id ORDER BY o.id, p.id;",
    columns: ["owner_name", "branch_name", "pet_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "LEFT JOIN", whitelist: "USING, JOIN",
  },
  {
    title: "Clinic Gaps Report",
    description: `The integrity audit chains FULL OUTER JOINs across all three tables and reports ONLY the gap rows: owners with no pet, or pets with no visit (the padded NULL sides).\n\n${SCHEMA_NOTE_CLINIC}\n\nTask:\nReturn o.name as owner_name, p.name as pet_name and v.reason as reason from owners (o) FULL OUTER JOIN pets (p) ON p.owner_id = o.id FULL OUTER JOIN visits (v) ON v.pet_id = p.id, keeping only rows where p.id IS NULL OR v.id IS NULL, ordered by o.id ascending, then p.id ascending.\n\n${RULES_JOIN}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "FULL OUTER JOIN",
    headerCode: CLINIC_SCHEMA,
    sourcecode: "SELECT o.name AS owner_name, p.name AS pet_name, v.reason AS reason FROM owners o FULL OUTER JOIN pets p ON p.owner_id = o.id FULL OUTER JOIN visits v ON v.pet_id = p.id WHERE p.id IS NULL OR v.id IS NULL ORDER BY o.id, p.id;",
    columns: ["owner_name", "pet_name", "reason"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "LEFT JOIN", whitelist: "FULL OUTER JOIN",
  },
];

/* ── MCQs (20: 10 easy / 6 medium / 4 hard; 6 snippets; 5/5/5/5 spread) ── */
const mcqs: SqlMcqQuestionIn[] = [
  { title: "INNER JOIN Keeps Matches", description: "What does the snippet return?", difficulty: "easy", topic: TOPIC, subtopic: "INNER JOIN",
    Option1: "Every owner, even without pets", Option2: "Only owner-pet pairs that actually match", Option3: "Every pet, even without an owner", Option4: "Every possible owner-pet combination", CorrectOption: 2, iscodesnippet: true, codesnippet: "SELECT o.name, p.name\nFROM owners o JOIN pets p ON p.owner_id = o.id;", snippetLang: "sql" },
  { title: "LEFT JOIN Padding", description: "In a LEFT JOIN, what happens to left-side rows with no right-side match?", difficulty: "easy", topic: TOPIC, subtopic: "LEFT OUTER JOIN",
    Option1: "They are dropped", Option2: "They raise an error", Option3: "They survive with NULLs in the right-side columns", Option4: "Both sides get padded", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "RIGHT JOIN Keeps", description: "A RIGHT JOIN guarantees which rows survive?", difficulty: "easy", topic: TOPIC, subtopic: "RIGHT OUTER JOIN",
    Option1: "All rows of the right-side table", Option2: "All rows of the left-side table", Option3: "Only the matched rows", Option4: "Rows from neither side", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "FULL OUTER JOIN Keeps", description: "What does a FULL OUTER JOIN return?", difficulty: "easy", topic: TOPIC, subtopic: "FULL OUTER JOIN",
    Option1: "Only matched rows", Option2: "Only left-side rows", Option3: "Only right-side rows", Option4: "All rows from both sides, matched where possible", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "ON Clause Role", description: "What does the ON clause do in a join?", difficulty: "easy", topic: TOPIC, subtopic: "ON vs USING Clause",
    Option1: "Filters rows after the join completes", Option2: "Defines the match condition between the two tables", Option3: "Renames the output columns", Option4: "Sorts the join output", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "USING Requirement", description: "What does JOIN ... USING(city) require of the two tables?", difficulty: "easy", topic: TOPIC, subtopic: "ON vs USING Clause",
    Option1: "Columns with different names", Option2: "No special requirement", Option3: "A column with the same name in both tables", Option4: "It only works on primary keys", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Rows Per Pet", description: "Each pet has exactly one owner. owners JOIN pets ON p.owner_id = o.id produces how many rows per pet?", difficulty: "easy", topic: TOPIC, subtopic: "INNER JOIN",
    Option1: "One row per pet", Option2: "One row per owner", Option3: "Ten rows per pet", Option4: "One row for the whole clinic", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Where JOIN Lives", description: "Which clause does JOIN immediately follow in a SELECT?", difficulty: "easy", topic: TOPIC, subtopic: "INNER JOIN",
    Option1: "WHERE", Option2: "FROM", Option3: "GROUP BY", Option4: "HAVING", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Anti Join Pattern", description: "Which query finds owners with no pets?", difficulty: "easy", topic: TOPIC, subtopic: "LEFT OUTER JOIN",
    Option1: "INNER JOIN pets ON true", Option2: "A RIGHT JOIN without ON", Option3: "LEFT JOIN pets, then WHERE p.id IS NULL", Option4: "SELECT * FROM owners GROUP BY id", CorrectOption: 3, iscodesnippet: true, codesnippet: "SELECT o.name FROM owners o\nLEFT JOIN pets p ON p.owner_id = o.id\nWHERE p.id IS NULL;", snippetLang: "sql" },
  { title: "Three Table Chain", description: "How do you join owners, pets and visits correctly?", difficulty: "easy", topic: TOPIC, subtopic: "Three Table Joins",
    Option1: "All three tables in a single ON clause", Option2: "A comma-separated FROM list is the only way", Option3: "Nested SELECTs are mandatory", Option4: "Chain the JOINs, giving each its own ON condition", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "USING Output Shape", description: "What does SELECT * after USING(city) show for the city column?", difficulty: "medium", topic: TOPIC, subtopic: "ON vs USING Clause",
    Option1: "city appears once in the output", Option2: "city appears twice", Option3: "USING also needs an ON clause", Option4: "The query errors", CorrectOption: 1, iscodesnippet: true, codesnippet: "SELECT o.name, b.branch_name\nFROM owners o JOIN clinic_branches b USING(city);", snippetLang: "sql" },
  { title: "WHERE Collapses LEFT JOIN", description: "A LEFT JOIN is followed by WHERE p.age > 0 on the right table. What is the effect?", difficulty: "medium", topic: TOPIC, subtopic: "LEFT OUTER JOIN",
    Option1: "It behaves like a FULL OUTER JOIN", Option2: "It behaves like an INNER JOIN — non-matching left rows are removed by the WHERE", Option3: "It returns all owners regardless", Option4: "It doubles the row count", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "ON Vs WHERE In Outer Joins", description: "Owners with no pet older than 3 — do they survive the snippet's LEFT JOIN?", difficulty: "medium", topic: TOPIC, subtopic: "LEFT OUTER JOIN",
    Option1: "No — the ON filter removes them", Option2: "Only if they own a puppy", Option3: "Yes — with NULL pet columns, because the extra condition lives in ON", Option4: "Yes, but duplicated", CorrectOption: 3, iscodesnippet: true, codesnippet: "SELECT o.name FROM owners o\nLEFT JOIN pets p ON p.owner_id = o.id AND p.age > 3;", snippetLang: "sql" },
  { title: "RIGHT JOIN Rewrite", description: "owners o RIGHT JOIN pets p ON p.owner_id = o.id equals which left join?", difficulty: "medium", topic: TOPIC, subtopic: "RIGHT OUTER JOIN",
    Option1: "pets p LEFT JOIN owners o on the same condition — the same query with the tables swapped", Option2: "A FULL OUTER JOIN", Option3: "A CROSS JOIN", Option4: "An INNER JOIN", CorrectOption: 1, iscodesnippet: true, codesnippet: "SELECT p.name, o.name\nFROM pets p LEFT JOIN owners o ON o.id = p.owner_id;", snippetLang: "sql" },
  { title: "Join Chain Evaluation", description: "How does SQLite evaluate chained joins like A JOIN B ON ... JOIN C ON ...?", difficulty: "medium", topic: TOPIC, subtopic: "Three Table Joins",
    Option1: "All ON clauses merge into one condition", Option2: "Left to right — each ON applies to the result built so far", Option3: "Right to left", Option4: "The order is completely irrelevant", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "INNER JOIN With True ON", description: "What is INNER JOIN x ON 1 = 1 equivalent to?", difficulty: "medium", topic: TOPIC, subtopic: "INNER JOIN",
    Option1: "A syntax error", Option2: "A LEFT JOIN", Option3: "An empty result", Option4: "A CROSS JOIN", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "FULL JOIN NULL Sides", description: "In a FULL OUTER JOIN result, which sides of an output row can be NULL-padded?", difficulty: "hard", topic: TOPIC, subtopic: "FULL OUTER JOIN",
    Option1: "Only the left", Option2: "Only the right", Option3: "The left, the right, or both", Option4: "Never — FULL joins drop NULL rows", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Gap Rows Test", description: "In the chained FULL OUTER JOIN audit, which WHERE clause isolates BOTH gap kinds (ownerless pets and visitless pets)?", difficulty: "hard", topic: TOPIC, subtopic: "FULL OUTER JOIN",
    Option1: "p.id IS NULL OR v.id IS NULL", Option2: "p.id = v.id", Option3: "p.id IS NOT NULL", Option4: "v.cost IS NULL", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "RIGHT FULL JOIN Version", description: "Since which SQLite version are RIGHT and FULL OUTER JOIN available?", difficulty: "hard", topic: TOPIC, subtopic: "RIGHT OUTER JOIN",
    Option1: "All SQLite versions", Option2: "Only SQLite 2.x", Option3: "Only with the join extension loaded", Option4: "SQLite 3.39 or newer", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Chained LEFT JOIN Shape", description: "One pet has no visits and one owner has no pets; all pets have owners. How many rows does the snippet return, and which are NULL-padded?", difficulty: "hard", topic: TOPIC, subtopic: "Three Table Joins",
    Option1: "12 rows — NULL rows are dropped", Option2: "13 rows — only the petless owner row survives", Option3: "An error — two LEFT JOINs cannot chain", Option4: "14 rows — the petless owner and the visitless pet appear with NULLs", CorrectOption: 4, iscodesnippet: true, codesnippet: "SELECT o.name, p.name, v.reason\nFROM owners o\nLEFT JOIN pets p ON p.owner_id = o.id\nLEFT JOIN visits v ON v.pet_id = p.id;", snippetLang: "sql" },
];

await buildDay({ day: DAY, topic: TOPIC, subtopics: SUBTOPICS, codeQuestions, mcqs });
