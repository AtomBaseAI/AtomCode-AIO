/**
 * Day 16 — "Views" — boutique hotel (Auberge Verdant) domain.
 *
 * Code questions practice CREATE VIEW + querying the view; the composed script
 * is: hidden headerCode (rooms + bookings seed) → student CREATE VIEW (silent)
 * → final SELECT (the only graded result set). Updatable views and materialized
 * views stay MCQ theory (SQLite has regular views only).
 *
 * Run from /home/z/my-project:
 *   bun scripts/sql-programming/builders/build-day-16.ts
 */
import { buildDay, type SqlCodeQuestionIn, type SqlMcqQuestionIn } from "../lib.ts";

const DAY = 16;
const TOPIC = "Views";
const SUBTOPICS = [
  "CREATE VIEW",
  "Querying Views",
  "Updatable Views",
  "Materialized Views",
  "Refreshing Materialized Views",
];

/* Shared hidden setup: a boutique hotel's room inventory and booking ledger. */
const HOTEL_SCHEMA = `CREATE TABLE rooms (
  id INTEGER PRIMARY KEY,
  number TEXT NOT NULL,
  floor INTEGER NOT NULL,
  kind TEXT NOT NULL,
  nightly_rate REAL NOT NULL
);
CREATE TABLE bookings (
  id INTEGER PRIMARY KEY,
  room_id INTEGER NOT NULL,
  guest TEXT NOT NULL,
  check_in TEXT NOT NULL,
  nights INTEGER NOT NULL
);
INSERT INTO rooms (number, floor, kind, nightly_rate) VALUES
('101', 1, 'standard', 120.0),
('102', 1, 'standard', 115.5),
('103', 1, 'standard', 130.0),
('201', 2, 'deluxe', 180.0),
('202', 2, 'deluxe', 175.0),
('301', 3, 'suite', 260.0),
('302', 3, 'suite', 240.0),
('401', 4, 'penthouse', 420.0);
INSERT INTO bookings (room_id, guest, check_in, nights) VALUES
(1, 'Alice Grant', '2026-02-01', 3),
(4, 'Brian Osei', '2026-02-02', 2),
(6, 'Carla Mendes', '2026-02-03', 4),
(2, 'Daniel Roy', '2026-02-05', 1),
(8, 'Elena Petrova', '2026-02-06', 5),
(1, 'Alice Grant', '2026-02-10', 2),
(5, 'Gina Caruso', '2026-02-11', 3),
(7, 'Hassan Aziz', '2026-02-12', 2),
(4, 'Brian Osei', '2026-02-15', 6),
(8, 'Elena Petrova', '2026-02-20', 1);`;

const SCHEMA_NOTE_HOTEL =
  "Schema:\n" +
  "- rooms(id INTEGER PRIMARY KEY, number TEXT, floor INTEGER, kind TEXT, nightly_rate REAL)\n" +
  "- bookings(id INTEGER PRIMARY KEY, room_id INTEGER -> rooms.id, guest TEXT, check_in TEXT, nights INTEGER)\n\n" +
  "Eight rooms across four floors are seeded (kinds: standard, deluxe, suite, penthouse) plus ten bookings; Alice Grant, Brian Osei and Elena Petrova each book more than once, and room 103 has no bookings. Rates are USD per night.";

const RULES_VIEWS =
  "Rules:\n" +
  "- SQLite dialect. The rooms and bookings tables are pre-seeded automatically — do not include CREATE TABLE or INSERT statements in your answer.\n" +
  "- Multi-statement task: create the required view(s) first, then finish with ONE final SELECT — only that last result set is graded.\n" +
  "- Every statement before the final SELECT must produce no rows (CREATE VIEW is silent).\n" +
  "- Column names and order must match exactly (alias every output column).\n" +
  "- Row order must match exactly (use ORDER BY as specified).";

const codeQuestions: SqlCodeQuestionIn[] = [
  /* ── easy · basic (6) ─────────────────────────────────────────────── */
  {
    title: "Ledger Behind a Named View",
    description: `The Auberge Verdant night manager wants the booking ledger served through a named view so desk staff never touch the base table directly.\n\n${SCHEMA_NOTE_HOTEL}\n\nTask:\n1) Create a view named v_booking_log that projects id, guest, check_in and nights from bookings.\n2) Finish with a SELECT that returns all columns of v_booking_log, ordered by id ascending.\n\n${RULES_VIEWS}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CREATE VIEW",
    headerCode: HOTEL_SCHEMA,
    sourcecode: `CREATE VIEW v_booking_log AS SELECT id, guest, check_in, nights FROM bookings;
SELECT * FROM v_booking_log ORDER BY id;`,
    columns: ["id", "guest", "check_in", "nights"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Rate Sheet Through a Filter",
    description: `A front-desk terminal only shows rooms costing at most 200 per night. The lookup is defined once as a view, then filtered at query time.\n\n${SCHEMA_NOTE_HOTEL}\n\nTask:\n1) Create a view named v_room_rates that projects number, kind and nightly_rate for every room.\n2) Finish with a SELECT from v_room_rates returning number and nightly_rate, but only for rows with nightly_rate <= 200, ordered by nightly_rate descending, tie-break by number ascending.\n\n${RULES_VIEWS}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Querying Views",
    headerCode: HOTEL_SCHEMA,
    sourcecode: `CREATE VIEW v_room_rates AS SELECT number, kind, nightly_rate FROM rooms;
SELECT number, nightly_rate FROM v_room_rates WHERE nightly_rate <= 200 ORDER BY nightly_rate DESC, number ASC;`,
    columns: ["number", "nightly_rate"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "City Tax Rate View",
    description: `The city adds a 10% lodging tax. Finance wants the taxed rate computed inside a reusable view, not in every ad-hoc query.\n\n${SCHEMA_NOTE_HOTEL}\n\nTask:\n1) Create a view named v_rate_with_tax that projects number, nightly_rate and ROUND(nightly_rate * 1.1, 2) aliased as rate_with_tax, for every room.\n2) Finish with a SELECT returning number and rate_with_tax from the view, ordered by number ascending.\n\n${RULES_VIEWS}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CREATE VIEW",
    headerCode: HOTEL_SCHEMA,
    sourcecode: `CREATE VIEW v_rate_with_tax AS SELECT number, nightly_rate, ROUND(nightly_rate * 1.1, 2) AS rate_with_tax FROM rooms;
SELECT number, rate_with_tax FROM v_rate_with_tax ORDER BY number;`,
    columns: ["number", "rate_with_tax"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Floors Through an Aggregate View",
    description: `Housekeeping asks how many rooms sit on each floor. The answer becomes a small aggregate view the team can re-run anytime.\n\n${SCHEMA_NOTE_HOTEL}\n\nTask:\n1) Create a view named v_floor_mix that returns each floor with COUNT(*) aliased as room_count, grouped by floor.\n2) Finish with a SELECT returning all columns of v_floor_mix, ordered by floor ascending.\n\n${RULES_VIEWS}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Querying Views",
    headerCode: HOTEL_SCHEMA,
    sourcecode: `CREATE VIEW v_floor_mix AS SELECT floor, COUNT(*) AS room_count FROM rooms GROUP BY floor;
SELECT * FROM v_floor_mix ORDER BY floor;`,
    columns: ["floor", "room_count"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Front Desk Privacy View",
    description: `Desk staff should see room locations but never nightly rates. A single-table view with no aggregates stays simple (and would remain an updatable-style view), which is exactly what the desk needs.\n\n${SCHEMA_NOTE_HOTEL}\n\nTask:\n1) Create a view named v_front_desk that projects id, number, floor and kind from rooms — nightly_rate must not appear.\n2) Finish with a SELECT returning all columns of v_front_desk, ordered by floor ascending, tie-break by number ascending.\n\n${RULES_VIEWS}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Updatable Views",
    headerCode: HOTEL_SCHEMA,
    sourcecode: `CREATE VIEW v_front_desk AS SELECT id, number, floor, kind FROM rooms;
SELECT * FROM v_front_desk ORDER BY floor, number;`,
    columns: ["id", "number", "floor", "kind"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Label View With Concatenation",
    description: `Door placards are printed from a view that turns each room into a readable label.\n\n${SCHEMA_NOTE_HOTEL}\n\nTask:\n1) Create a view named v_room_labels that projects number and the concatenation kind || ' on floor ' || floor aliased as label.\n2) Finish with a SELECT returning label from the view, ordered by number ascending.\n\n${RULES_VIEWS}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CREATE VIEW",
    headerCode: HOTEL_SCHEMA,
    sourcecode: `CREATE VIEW v_room_labels AS SELECT number, kind || ' on floor ' || floor AS label FROM rooms;
SELECT label FROM v_room_labels ORDER BY number;`,
    columns: ["label"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── easy · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Concierge Rate Card View",
    description: `The concierge keeps one rate card view and prints it priciest-first so upgrade offers are at the top.\n\n${SCHEMA_NOTE_HOTEL}\n\nTask:\n1) Create a view named v_rate_card that projects number aliased as room_number and nightly_rate, for every room.\n2) Finish with a SELECT from v_rate_card returning room_number and nightly_rate, ordered by nightly_rate descending, tie-break by room_number ascending.\n\n${RULES_VIEWS}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Querying Views",
    headerCode: HOTEL_SCHEMA,
    sourcecode: `CREATE VIEW v_rate_card AS SELECT number AS room_number, nightly_rate FROM rooms;
SELECT room_number, nightly_rate FROM v_rate_card ORDER BY nightly_rate DESC, room_number ASC;`,
    columns: ["room_number", "nightly_rate"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "February Arrival Board",
    description: `The lobby board lists guests arriving in the first week of February. Staff define the cut-off once inside a view.\n\n${SCHEMA_NOTE_HOTEL}\n\nTask:\n1) Create a view named v_feb_arrivals that projects guest, check_in and nights from bookings, but only for check_in earlier than '2026-02-10'.\n2) Finish with a SELECT returning all columns of v_feb_arrivals, ordered by check_in ascending, tie-break by guest ascending.\n\n${RULES_VIEWS}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CREATE VIEW",
    headerCode: HOTEL_SCHEMA,
    sourcecode: `CREATE VIEW v_feb_arrivals AS SELECT guest, check_in, nights FROM bookings WHERE check_in < '2026-02-10';
SELECT * FROM v_feb_arrivals ORDER BY check_in, guest;`,
    columns: ["guest", "check_in", "nights"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Housekeeping Floor Summary",
    description: `Housekeeping wants a per-floor, per-room-kind census served from one view so the numbers are always consistent.\n\n${SCHEMA_NOTE_HOTEL}\n\nTask:\n1) Create a view named v_floor_summary that returns floor, kind and COUNT(*) aliased as rooms, grouped by floor and kind.\n2) Finish with a SELECT returning all columns of v_floor_summary, ordered by floor ascending, tie-break by kind ascending.\n\n${RULES_VIEWS}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Querying Views",
    headerCode: HOTEL_SCHEMA,
    sourcecode: `CREATE VIEW v_floor_summary AS SELECT floor, kind, COUNT(*) AS rooms FROM rooms GROUP BY floor, kind;
SELECT * FROM v_floor_summary ORDER BY floor, kind;`,
    columns: ["floor", "kind", "rooms"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Long Stay Watchlist",
    description: `The duty manager watches bookings of four nights or more. The watchlist is a simple single-table view (no aggregates, no joins) so it stays a clean, updatable-style view candidate.\n\n${SCHEMA_NOTE_HOTEL}\n\nTask:\n1) Create a view named v_long_stays that projects id, guest and nights from bookings, but only for nights >= 4.\n2) Finish with a SELECT returning all columns of v_long_stays, ordered by nights descending, tie-break by id ascending.\n\n${RULES_VIEWS}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Updatable Views",
    headerCode: HOTEL_SCHEMA,
    sourcecode: `CREATE VIEW v_long_stays AS SELECT id, guest, nights FROM bookings WHERE nights >= 4;
SELECT * FROM v_long_stays ORDER BY nights DESC, id ASC;`,
    columns: ["id", "guest", "nights"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── medium · scenario (6) ────────────────────────────────────────── */
  {
    title: "Register the Night Audit Views",
    description: `The night-audit team registers two reusable views — one for the penthouse, one for the standard floors — and then verifies both were registered by listing the view catalog.\n\n${SCHEMA_NOTE_HOTEL}\n\nTask:\n1) Create a view named v_penthouse_view projecting number and nightly_rate for rooms where kind = 'penthouse'.\n2) Create a view named v_standard_view projecting number and floor for rooms where kind = 'standard'.\n3) Finish with a SELECT that lists name aliased as view_name from sqlite_master where type='view', ordered by view_name ascending.\n\n${RULES_VIEWS}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "CREATE VIEW",
    headerCode: HOTEL_SCHEMA,
    sourcecode: `CREATE VIEW v_penthouse_view AS SELECT number, nightly_rate FROM rooms WHERE kind = 'penthouse';
CREATE VIEW v_standard_view AS SELECT number, floor FROM rooms WHERE kind = 'standard';
SELECT name AS view_name FROM sqlite_master WHERE type='view' ORDER BY name;`,
    columns: ["view_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "DROP", whitelist: "CREATE VIEW",
  },
  {
    title: "Stay Costs Behind One View",
    description: `Revenue desk analysts want each booking's stay cost (nightly_rate times nights, rounded to cents) exposed through a single view that joins rooms and bookings.\n\n${SCHEMA_NOTE_HOTEL}\n\nTask:\n1) Create a view named v_stay_costs that joins bookings (alias b) to rooms (alias r) on r.id = b.room_id, projecting r.number aliased as number, b.guest aliased as guest, and ROUND(r.nightly_rate * b.nights, 2) aliased as stay_cost.\n2) Finish with a SELECT returning all columns of v_stay_costs, ordered by stay_cost descending, tie-break by guest ascending.\n\n${RULES_VIEWS}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Querying Views",
    headerCode: HOTEL_SCHEMA,
    sourcecode: `CREATE VIEW v_stay_costs AS SELECT r.number AS number, b.guest AS guest, ROUND(r.nightly_rate * b.nights, 2) AS stay_cost FROM bookings b JOIN rooms r ON r.id = b.room_id;
SELECT * FROM v_stay_costs ORDER BY stay_cost DESC, guest ASC;`,
    columns: ["number", "guest", "stay_cost"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "USING", whitelist: "CREATE VIEW, JOIN",
  },
  {
    title: "Guest Spend Behind a View",
    description: `Marketing wants a total-spend-per-guest number served from a view, so the aggregate logic lives in exactly one place.\n\n${SCHEMA_NOTE_HOTEL}\n\nTask:\n1) Create a view named v_guest_spend that joins bookings (alias b) to rooms (alias r) on r.id = b.room_id and returns b.guest aliased as guest with ROUND(SUM(r.nightly_rate * b.nights), 2) aliased as total_spend, grouped by b.guest.\n2) Finish with a SELECT returning guest and total_spend from the view, ordered by total_spend descending, tie-break by guest ascending.\n\n${RULES_VIEWS}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "CREATE VIEW",
    headerCode: HOTEL_SCHEMA,
    sourcecode: `CREATE VIEW v_guest_spend AS SELECT b.guest AS guest, ROUND(SUM(r.nightly_rate * b.nights), 2) AS total_spend FROM bookings b JOIN rooms r ON r.id = b.room_id GROUP BY b.guest;
SELECT guest, total_spend FROM v_guest_spend ORDER BY total_spend DESC, guest ASC;`,
    columns: ["guest", "total_spend"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "INSERT, DELETE", whitelist: "CREATE VIEW, SUM",
  },
  {
    title: "Rates the Desk May Not See",
    description: `Privacy audit: the public kiosk view must be a plain single-table view over rooms that never exposes pricing. A filter on the view then powers the kiosk's kind census.\n\n${SCHEMA_NOTE_HOTEL}\n\nTask:\n1) Create a view named v_public_rooms projecting id, number, floor and kind from rooms — the nightly_rate column must not appear anywhere in your script.\n2) Finish with a SELECT from v_public_rooms returning kind and COUNT(*) aliased as kind_count, grouped by kind, ordered by kind ascending.\n\n${RULES_VIEWS}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Updatable Views",
    headerCode: HOTEL_SCHEMA,
    sourcecode: `CREATE VIEW v_public_rooms AS SELECT id, number, floor, kind FROM rooms;
SELECT kind, COUNT(*) AS kind_count FROM v_public_rooms GROUP BY kind ORDER BY kind;`,
    columns: ["kind", "kind_count"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "nightly_rate", whitelist: "CREATE VIEW",
  },
  {
    title: "View on Top of a View",
    description: `The budget desk builds a two-layer stack: a base view of all rates, then a budget view derived from the base view. Chained views are legal in SQLite.\n\n${SCHEMA_NOTE_HOTEL}\n\nTask:\n1) Create a view named v_all_rates projecting number and nightly_rate for every room.\n2) Create a view named v_budget_rates that selects number and nightly_rate FROM v_all_rates, but only for nightly_rate < 160.\n3) Finish with a SELECT returning all columns of v_budget_rates, ordered by nightly_rate descending, tie-break by number ascending.\n\n${RULES_VIEWS}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Querying Views",
    headerCode: HOTEL_SCHEMA,
    sourcecode: `CREATE VIEW v_all_rates AS SELECT number, nightly_rate FROM rooms;
CREATE VIEW v_budget_rates AS SELECT number, nightly_rate FROM v_all_rates WHERE nightly_rate < 160;
SELECT * FROM v_budget_rates ORDER BY nightly_rate DESC, number ASC;`,
    columns: ["number", "nightly_rate"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "DROP", whitelist: "CREATE VIEW",
  },
  {
    title: "Top Floors Through the View Wall",
    description: `The GM's dashboard shows premium rooms (240 per night and up) served through a view, then trims to floors three and above at query time.\n\n${SCHEMA_NOTE_HOTEL}\n\nTask:\n1) Create a view named v_top_rooms projecting number, floor and nightly_rate for rooms where nightly_rate >= 240.\n2) Finish with a SELECT from v_top_rooms returning number and nightly_rate, but only for floor >= 3, ordered by nightly_rate descending, tie-break by number ascending.\n\n${RULES_VIEWS}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Querying Views",
    headerCode: HOTEL_SCHEMA,
    sourcecode: `CREATE VIEW v_top_rooms AS SELECT number, floor, nightly_rate FROM rooms WHERE nightly_rate >= 240;
SELECT number, nightly_rate FROM v_top_rooms WHERE floor >= 3 ORDER BY nightly_rate DESC, number ASC;`,
    columns: ["number", "nightly_rate"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "GROUP BY", whitelist: "CREATE VIEW, WHERE",
  },

  /* ── hard · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Three Views, One Catalog",
    description: `The hotel's reporting portal registers three differently-shaped views at once — an aggregate, a join, and a concatenation — then verifies all three landed in the view catalog.\n\n${SCHEMA_NOTE_HOTEL}\n\nTask:\n1) Create a view named v_avalon_occupancy returning each floor with COUNT(*) aliased as room_count, grouped by floor.\n2) Create a view named v_bayview_costs joining bookings (alias b) to rooms (alias r) on r.id = b.room_id, projecting b.guest aliased as guest and ROUND(r.nightly_rate * b.nights, 2) aliased as stay_cost.\n3) Create a view named v_crestline_labels projecting number and kind || ' on floor ' || floor aliased as label.\n4) Finish with a SELECT listing name aliased as view_name from sqlite_master where type='view', ordered by view_name ascending.\n\n${RULES_VIEWS}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "CREATE VIEW",
    headerCode: HOTEL_SCHEMA,
    sourcecode: `CREATE VIEW v_avalon_occupancy AS SELECT floor, COUNT(*) AS room_count FROM rooms GROUP BY floor;
CREATE VIEW v_bayview_costs AS SELECT b.guest AS guest, ROUND(r.nightly_rate * b.nights, 2) AS stay_cost FROM bookings b JOIN rooms r ON r.id = b.room_id;
CREATE VIEW v_crestline_labels AS SELECT number, kind || ' on floor ' || floor AS label FROM rooms;
SELECT name AS view_name FROM sqlite_master WHERE type='view' ORDER BY name;`,
    columns: ["view_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "DROP, CREATE TABLE", whitelist: "CREATE VIEW",
  },
  {
    title: "Revenue View Triage",
    description: `Finance builds a per-room revenue view (rooms LEFT JOIN bookings so unbooked rooms still appear with zero revenue) and then triages: only rooms whose total revenue exceeds 500 make the escalation list.\n\n${SCHEMA_NOTE_HOTEL}\n\nTask:\n1) Create a view named v_room_revenue that joins rooms (alias r) LEFT JOIN bookings (alias b) ON b.room_id = r.id and returns r.number aliased as number plus ROUND(IFNULL(SUM(r.nightly_rate * b.nights), 0), 2) aliased as total_revenue, grouped by r.id and r.number.\n2) Finish with a SELECT from v_room_revenue returning number and total_revenue, but only where total_revenue > 500, ordered by total_revenue descending, tie-break by number ascending.\n\n${RULES_VIEWS}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Querying Views",
    headerCode: HOTEL_SCHEMA,
    sourcecode: `CREATE VIEW v_room_revenue AS SELECT r.number AS number, ROUND(IFNULL(SUM(r.nightly_rate * b.nights), 0), 2) AS total_revenue FROM rooms r LEFT JOIN bookings b ON b.room_id = r.id GROUP BY r.id, r.number;
SELECT number, total_revenue FROM v_room_revenue WHERE total_revenue > 500 ORDER BY total_revenue DESC, number ASC;`,
    columns: ["number", "total_revenue"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "USING", whitelist: "CREATE VIEW, LEFT JOIN, IFNULL",
  },
  {
    title: "Two-Layer Floor Revenue",
    description: `Analytics stacks two views: a raw per-stay ledger view (bookings joined to rooms), then an aggregate floor-revenue view built FROM the first view. No write statements are involved — pure read-side layering.\n\n${SCHEMA_NOTE_HOTEL}\n\nTask:\n1) Create a view named v_night_ledger joining bookings (alias b) to rooms (alias r) on r.id = b.room_id, projecting r.number aliased as number, r.floor aliased as floor, and the product r.nightly_rate * b.nights aliased as stay_value.\n2) Create a view named v_floor_revenue selecting floor and ROUND(SUM(stay_value), 2) aliased as floor_revenue FROM v_night_ledger, grouped by floor.\n3) Finish with a SELECT returning all columns of v_floor_revenue, ordered by floor ascending.\n\n${RULES_VIEWS}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Querying Views",
    headerCode: HOTEL_SCHEMA,
    sourcecode: `CREATE VIEW v_night_ledger AS SELECT r.number AS number, r.floor AS floor, r.nightly_rate * b.nights AS stay_value FROM bookings b JOIN rooms r ON r.id = b.room_id;
CREATE VIEW v_floor_revenue AS SELECT floor, ROUND(SUM(stay_value), 2) AS floor_revenue FROM v_night_ledger GROUP BY floor;
SELECT * FROM v_floor_revenue ORDER BY floor;`,
    columns: ["floor", "floor_revenue"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "UPDATE", whitelist: "CREATE VIEW, SUM",
  },
  {
    title: "Premium Quote View",
    description: `Group-sales quotes suites at a flat 150 per night. The quote engine wraps a simple single-table view over bookings (kept aggregate-free so it remains an updatable-style view), sorted most expensive first.\n\n${SCHEMA_NOTE_HOTEL}\n\nTask:\n1) Create a view named v_premium_quotes projecting id, guest, nights and nights * 150 aliased as premium_total from bookings, but only for nights >= 3.\n2) Finish with a SELECT returning guest and premium_total from the view, ordered by premium_total descending, tie-break by guest ascending.\n\n${RULES_VIEWS}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Updatable Views",
    headerCode: HOTEL_SCHEMA,
    sourcecode: `CREATE VIEW v_premium_quotes AS SELECT id, guest, nights, nights * 150 AS premium_total FROM bookings WHERE nights >= 3;
SELECT guest, premium_total FROM v_premium_quotes ORDER BY premium_total DESC, guest ASC;`,
    columns: ["guest", "premium_total"],
    inputconstrains: "SQLite dialect; schema pre-seeded",
    blacklist: "JOIN", whitelist: "CREATE VIEW",
  },
];

/* ── MCQs (20: 10 easy / 6 medium / 4 hard; 6 snippets; 5/5/5/5 spread) ── */
const mcqs: SqlMcqQuestionIn[] = [
  { title: "What a View Stores", description: "A regular (non-materialized) SQL view stores…", difficulty: "easy", topic: TOPIC, subtopic: "Materialized Views",
    Option1: "A full copy of the rows taken at creation time", Option2: "The SELECT query itself — rows are computed when the view is queried", Option3: "Only the primary keys of the underlying rows", Option4: "An index over the base table", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Create a View Statement", description: "Which statement correctly creates a view named v_active over all columns of bookings?", difficulty: "easy", topic: TOPIC, subtopic: "CREATE VIEW",
    Option1: "CREATE TABLE v_active FROM bookings;", Option2: "MAKE VIEW v_active AS SELECT * FROM bookings;", Option3: "CREATE VIEW v_active INSERT SELECT * FROM bookings;", Option4: "CREATE VIEW v_active AS SELECT * FROM bookings;", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Reading From a View", description: "A view v_deluxe already exists. How do you fetch its rows?", difficulty: "easy", topic: TOPIC, subtopic: "Querying Views",
    Option1: "SELECT * FROM v_deluxe;", Option2: "OPEN v_deluxe;", Option3: "EXEC v_deluxe;", Option4: "FETCH v_deluxe;", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Where View Definitions Live", description: "In SQLite, which catalog table records the SQL text of every view?", difficulty: "easy", topic: TOPIC, subtopic: "Querying Views",
    Option1: "pragma_stats", Option2: "sqlite_views", Option3: "sqlite_master", Option4: "information_schema.views", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Views Track Base Data", description: "v_room_rates was created over rooms (8 rows). What does the snippet print?", difficulty: "easy", topic: TOPIC, subtopic: "Querying Views",
    Option1: "8 — views snapshot their rows at creation time", Option2: "9 — the view sees the newly inserted row", Option3: "0 — INSERT locks the view", Option4: "An error — INSERT against a viewed table is illegal", CorrectOption: 2, iscodesnippet: true,
    codesnippet: "INSERT INTO rooms (number, floor, kind, nightly_rate)\nVALUES ('104', 1, 'standard', 118.0);\nSELECT COUNT(*) AS n FROM v_room_rates;", snippetLang: "sql" },
  { title: "Dropping a View", description: "Which statement removes the view v_tmp?", difficulty: "easy", topic: TOPIC, subtopic: "CREATE VIEW",
    Option1: "REMOVE VIEW v_tmp;", Option2: "DELETE VIEW v_tmp;", Option3: "DROP TABLE v_tmp;", Option4: "DROP VIEW v_tmp;", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Simple Updatable View", description: "Which kind of view is updatable in SQLite (INSERT/UPDATE/DELETE allowed through it)?", difficulty: "easy", topic: TOPIC, subtopic: "Updatable Views",
    Option1: "A view with GROUP BY", Option2: "A view joining three tables", Option3: "A simple single-table view with no aggregates or DISTINCT", Option4: "A view with DISTINCT", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Count Through a Suite View", description: "The hotel has two suite rooms (floor 3). What does the snippet return?", difficulty: "easy", topic: TOPIC, subtopic: "Querying Views",
    Option1: "2", Option2: "1", Option3: "8", Option4: "3", CorrectOption: 1, iscodesnippet: true,
    codesnippet: "CREATE VIEW v_suites AS\nSELECT number, nightly_rate FROM rooms\nWHERE kind = 'suite';\nSELECT COUNT(*) AS n FROM v_suites;", snippetLang: "sql" },
  { title: "Materialized Views in SQLite", description: "Does SQLite support materialized views?", difficulty: "easy", topic: TOPIC, subtopic: "Materialized Views",
    Option1: "Yes, via CREATE MATERIALIZED VIEW", Option2: "Yes, with REFRESH MATERIALIZED VIEW", Option3: "Only for in-memory databases", Option4: "No — SQLite provides regular views only", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "View vs Table", description: "Pick the accurate contrast between a table and a regular view.", difficulty: "easy", topic: TOPIC, subtopic: "Querying Views",
    Option1: "Views hold data; tables hold queries", Option2: "Tables hold data; views are saved queries computed over tables", Option3: "Views are always faster than tables", Option4: "Tables cannot be indexed once views exist", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },

  { title: "Filter Through the View", description: "rooms holds two deluxe rooms: 201 at 180.0 and 202 at 175.0. What does the snippet return?", difficulty: "medium", topic: TOPIC, subtopic: "Querying Views",
    Option1: "2 — the outer WHERE is ignored for views", Option2: "0 — WHERE cannot be combined with a view", Option3: "1 — the outer WHERE filters the rows the view yields", Option4: "An error — views cannot be filtered", CorrectOption: 3, iscodesnippet: true,
    codesnippet: "CREATE VIEW v_deluxe AS\nSELECT number, nightly_rate FROM rooms\nWHERE kind = 'deluxe';\nSELECT COUNT(*) AS n FROM v_deluxe\nWHERE nightly_rate > 176;", snippetLang: "sql" },
  { title: "Aggregates Inside Views", description: "Can a view definition contain GROUP BY and aggregate functions in SQLite?", difficulty: "medium", topic: TOPIC, subtopic: "CREATE VIEW",
    Option1: "Yes — a view may aggregate its base tables", Option2: "No — views may only project plain columns", Option3: "Only with materialized views", Option4: "Only one aggregate per view is allowed", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Nested Views", description: "May a view be defined on top of another view?", difficulty: "medium", topic: TOPIC, subtopic: "CREATE VIEW",
    Option1: "Not allowed in SQLite", Option2: "Allowed exactly one level deep", Option3: "Allowed only when the base is materialized", Option4: "Allowed — views can reference other views", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "List the Views", description: "What does the final SELECT in this snippet return?", difficulty: "medium", topic: TOPIC, subtopic: "Querying Views",
    Option1: "Both views plus every table", Option2: "v_a and v_b — one row per view", Option3: "Only v_a — the first one created", Option4: "Nothing — sqlite_master excludes views", CorrectOption: 2, iscodesnippet: true,
    codesnippet: "CREATE VIEW v_a AS SELECT 1 AS x;\nCREATE VIEW v_b AS SELECT 2 AS y;\nSELECT name FROM sqlite_master\nWHERE type = 'view';", snippetLang: "sql" },
  { title: "Updatability Breakers", description: "Adding which element to a single-table view definition typically makes the view non-updatable?", difficulty: "medium", topic: TOPIC, subtopic: "Updatable Views",
    Option1: "A WHERE clause", Option2: "Column aliases", Option3: "GROUP BY / aggregates", Option4: "An ORDER BY clause", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Refreshing Materialized Views", description: "For databases that support materialized views, what does refreshing one mean?", difficulty: "medium", topic: TOPIC, subtopic: "Refreshing Materialized Views",
    Option1: "Recomputing the stored rows from the base tables", Option2: "Deleting and recreating the view definition text", Option3: "Rebuilding the indexes on the view", Option4: "Re-running CREATE VIEW with a new name", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },

  { title: "Duplicate View Name", description: "What happens when this script runs?", difficulty: "hard", topic: TOPIC, subtopic: "CREATE VIEW",
    Option1: "The second definition silently replaces the first", Option2: "An error — a view named v_x already exists", Option3: "Both are kept, the second renamed v_x_1", Option4: "The second becomes a real table", CorrectOption: 2, iscodesnippet: true,
    codesnippet: "CREATE VIEW v_x AS SELECT 1 AS a;\nCREATE VIEW v_x AS SELECT 2 AS b;", snippetLang: "sql" },
  { title: "IF NOT EXISTS Views", description: "v_x already exists. What does CREATE VIEW IF NOT EXISTS v_x AS SELECT 1; do in SQLite?", difficulty: "hard", topic: TOPIC, subtopic: "CREATE VIEW",
    Option1: "Replaces the old view with the new definition", Option2: "Raises an error immediately", Option3: "Creates a second, coexisting view", Option4: "Skips creation and keeps the existing view", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Why Serve Views", description: "Best reason an operations team exposes views instead of base tables to applications?", difficulty: "hard", topic: TOPIC, subtopic: "CREATE VIEW",
    Option1: "Restrict visible columns and rows and shield schema changes behind a stable interface", Option2: "Views are always faster than base tables", Option3: "Views store an extra copy that serves as backup", Option4: "Views disable locking on the base tables", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "View on a View", description: "rooms rates are 120, 115.5, 130, 180, 175, 260, 240 and 420. What does the snippet print?", difficulty: "hard", topic: TOPIC, subtopic: "Querying Views",
    Option1: "5 — the chained filters collapse into one", Option2: "0 — chained views return nothing", Option3: "2", Option4: "An error — chained views are invalid", CorrectOption: 3, iscodesnippet: true,
    codesnippet: "CREATE VIEW v_base AS\nSELECT number, nightly_rate FROM rooms\nWHERE nightly_rate < 200;\nCREATE VIEW v_cheap AS\nSELECT number FROM v_base WHERE nightly_rate < 130;\nSELECT COUNT(*) AS n FROM v_cheap;", snippetLang: "sql" },
];

await buildDay({ day: DAY, topic: TOPIC, subtopics: SUBTOPICS, codeQuestions, mcqs });
