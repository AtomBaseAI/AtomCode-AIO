/**
 * Day 11 — "Cross and Self Joins" — chess tournament domain.
 *
 * Hidden headerCode seeds a small chess club: 8 players across 4 clubs
 * (two players share the top rating for tie practice), one hall per club,
 * 5 rounds, 5 openings and 6 played games. Solutions practice CROSS JOIN,
 * SELF JOIN (a.id < b.id, same-club, rating comparisons), NATURAL JOIN and
 * multi-table join sequencing. Every output column is aliased.
 *
 * Run from /home/z/my-project:
 *   bun scripts/sql-programming/builders/build-day-11.ts
 */
import { buildDay, type SqlCodeQuestionIn, type SqlMcqQuestionIn } from "../lib.ts";

const DAY = 11;
const TOPIC = "Cross and Self Joins";
const SUBTOPICS = [
  "CROSS JOIN",
  "Self Join",
  "Natural Join",
  "Multi-table Join Sequencing",
];

/* Shared hidden setup: a chess tournament club. */
const CHESS_SCHEMA = `CREATE TABLE players (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  club TEXT NOT NULL,
  rating INTEGER NOT NULL
);
INSERT INTO players (name, club, rating) VALUES
('Vera Holt', 'Kings', 2410),
('Marcus Idowu', 'Kings', 2260),
('Sana Qadir', 'Rooks', 2410),
('Leo Brandt', 'Rooks', 2180),
('Ines Faria', 'Bishops', 2330),
('Tomas Kral', 'Bishops', 2190),
('Ada Mensah', 'Knights', 2280),
('Yuki Sato', 'Knights', 2150);

CREATE TABLE club_halls (club TEXT PRIMARY KEY, hall TEXT NOT NULL);
INSERT INTO club_halls (club, hall) VALUES
('Kings', 'Hall A'),
('Rooks', 'Hall B'),
('Bishops', 'Hall C'),
('Knights', 'Hall D');

CREATE TABLE rounds (round_no INTEGER PRIMARY KEY);
INSERT INTO rounds (round_no) VALUES (1), (2), (3), (4), (5);

CREATE TABLE openings (id INTEGER PRIMARY KEY, opening TEXT NOT NULL);
INSERT INTO openings (opening) VALUES
('Sicilian Defence'),
('French Defence'),
('Caro-Kann Defence'),
('Italian Game'),
('Slav Defence');

CREATE TABLE games (
  id INTEGER PRIMARY KEY,
  round_no INTEGER NOT NULL,
  white_id INTEGER NOT NULL,
  black_id INTEGER NOT NULL,
  white_score REAL NOT NULL
);
INSERT INTO games (round_no, white_id, black_id, white_score) VALUES
(1, 1, 3, 0.5),
(1, 5, 7, 1.0),
(2, 2, 4, 0.0),
(2, 6, 8, 0.5),
(3, 4, 1, 1.0),
(3, 5, 6, 1.0);`;

const RULES_SELECT_ONLY =
  "Rules:\n- SQLite dialect. The schema and its data are pre-seeded automatically — do not include CREATE TABLE or INSERT statements in your answer.\n- Column names and order must match exactly (alias every output column).\n- Row order must match exactly (use ORDER BY as specified).";

const SCHEMA_NOTE_CHESS =
  "Schema:\n- players(id INTEGER PRIMARY KEY, name TEXT, club TEXT, rating INTEGER)\n- club_halls(club TEXT, hall TEXT) -> players.club\n- rounds(round_no INTEGER)\n- openings(id INTEGER PRIMARY KEY, opening TEXT)\n- games(id INTEGER PRIMARY KEY, round_no INTEGER, white_id INTEGER -> players.id, black_id INTEGER -> players.id, white_score REAL)\n\nEight players across four clubs (Kings, Rooks, Bishops, Knights) are seeded; Vera Holt and Sana Qadir share the top rating 2410. Each club has exactly one hall. Five rounds and five openings are defined. Six games have been played (white_score is the white player's points: 1 win, 0.5 draw, 0 loss).";

function makeDesc(story: string, task: string): string {
  return `${story}\n\n${SCHEMA_NOTE_CHESS}\n\nTask:\n${task}\n\n${RULES_SELECT_ONLY}`;
}

const codeQuestions: SqlCodeQuestionIn[] = [
  /* ── easy · basic (6) ─────────────────────────────────────────────── */
  {
    title: "Every Player In Every Hall",
    description: makeDesc(
      `A new volunteer must learn the CROSS JOIN: pair every player with every club hall to see the full practice grid.`,
      `Return p.name AS player_name and h.hall AS hall from players CROSS JOIN club_halls, ordered by player id ascending, then hall ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CROSS JOIN",
    headerCode: CHESS_SCHEMA,
    sourcecode: "SELECT p.name AS player_name, h.hall AS hall FROM players p CROSS JOIN club_halls h ORDER BY p.id, h.hall;",
    columns: ["player_name", "hall"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Pair Every Player With Every Round",
    description: makeDesc(
      `The scheduler drafts a blank slot sheet: every player gets a line for each of the five rounds.`,
      `Return p.name AS player_name and r.round_no AS round_no from players CROSS JOIN rounds, ordered by player id ascending, then round_no ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CROSS JOIN",
    headerCode: CHESS_SCHEMA,
    sourcecode: "SELECT p.name AS player_name, r.round_no AS round_no FROM players p CROSS JOIN rounds r ORDER BY p.id, r.round_no;",
    columns: ["player_name", "round_no"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "All Unordered Player Pairs",
    description: makeDesc(
      `Before the draw, the arbiter lists every possible pairing of two different players exactly once.`,
      `Self join players with a.id < b.id and return a.name AS white_player and b.name AS black_player, ordered by a.id then b.id.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Self Join",
    headerCode: CHESS_SCHEMA,
    sourcecode: "SELECT a.name AS white_player, b.name AS black_player FROM players a JOIN players b ON a.id < b.id ORDER BY a.id, b.id;",
    columns: ["white_player", "black_player"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Rating Comparison Pairs",
    description: makeDesc(
      `The coach studies mismatches: for every unordered pair, which player is rated higher.`,
      `Self join players with a.id < b.id AND a.rating > b.rating and return a.name AS stronger_player and b.name AS weaker_player, ordered by a.id then b.id.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Self Join",
    headerCode: CHESS_SCHEMA,
    sourcecode: "SELECT a.name AS stronger_player, b.name AS weaker_player FROM players a JOIN players b ON a.id < b.id AND a.rating > b.rating ORDER BY a.id, b.id;",
    columns: ["stronger_player", "weaker_player"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Players In Their Halls",
    description: makeDesc(
      `NATURAL JOIN practice: players and club_halls share the club column, so the join needs no ON clause.`,
      `Return p.name AS player_name and h.hall AS hall from players NATURAL JOIN club_halls, ordered by player id ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Natural Join",
    headerCode: CHESS_SCHEMA,
    sourcecode: "SELECT p.name AS player_name, h.hall AS hall FROM players p NATURAL JOIN club_halls h ORDER BY p.id;",
    columns: ["player_name", "hall"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Game Sheet With Names",
    description: makeDesc(
      `The most common multi-table join: one games row joined to players twice, once for white and once for black.`,
      `Join games g to players w (w.id = g.white_id) and players b (b.id = g.black_id); return g.round_no AS round_no, w.name AS white_player, b.name AS black_player and g.white_score AS white_score, ordered by g.id ascending.`
    ),
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Multi-table Join Sequencing",
    headerCode: CHESS_SCHEMA,
    sourcecode: "SELECT g.round_no AS round_no, w.name AS white_player, b.name AS black_player, g.white_score AS white_score FROM games g JOIN players w ON w.id = g.white_id JOIN players b ON b.id = g.black_id ORDER BY g.id;",
    columns: ["round_no", "white_player", "black_player", "white_score"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── easy · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Opening Preparation Grid",
    description: makeDesc(
      `The head coach wants every player assigned to study every opening in the preparation book — a full cross product.`,
      `Return p.name AS player_name and o.opening AS opening from players CROSS JOIN openings, ordered by player id ascending, then opening id ascending.`
    ),
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "CROSS JOIN",
    headerCode: CHESS_SCHEMA,
    sourcecode: "SELECT p.name AS player_name, o.opening AS opening FROM players p CROSS JOIN openings o ORDER BY p.id, o.id;",
    columns: ["player_name", "opening"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Club Internal Fixtures",
    description: makeDesc(
      `Each club runs an internal championship, so the arbiter pairs players who share a club.`,
      `Self join players with a.id < b.id AND a.club = b.club and return a.club AS club, a.name AS white_player and b.name AS black_player, ordered by a.id then b.id.`
    ),
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Self Join",
    headerCode: CHESS_SCHEMA,
    sourcecode: "SELECT a.club AS club, a.name AS white_player, b.name AS black_player FROM players a JOIN players b ON a.id < b.id AND a.club = b.club ORDER BY a.id, b.id;",
    columns: ["club", "white_player", "black_player"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Hall Notice Boards",
    description: makeDesc(
      `Every hall needs a notice board listing the players that belong to its club, alphabetical within the hall.`,
      `Using players NATURAL JOIN club_halls, return h.hall AS hall and p.name AS player_name, ordered by hall ascending, then player name ascending.`
    ),
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Natural Join",
    headerCode: CHESS_SCHEMA,
    sourcecode: "SELECT h.hall AS hall, p.name AS player_name FROM players p NATURAL JOIN club_halls h ORDER BY h.hall, p.name;",
    columns: ["hall", "player_name"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Annotated Game Cards",
    description: makeDesc(
      `The bulletin prints one line per game in the form 'WHITE vs BLACK'.`,
      `Join games g to players w and players b as in the game sheet, and return printf('%s vs %s', w.name, b.name) AS pairing_line and g.round_no AS round_no, ordered by g.id ascending.`
    ),
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Multi-table Join Sequencing",
    headerCode: CHESS_SCHEMA,
    sourcecode: "SELECT printf('%s vs %s', w.name, b.name) AS pairing_line, g.round_no AS round_no FROM games g JOIN players w ON w.id = g.white_id JOIN players b ON b.id = g.black_id ORDER BY g.id;",
    columns: ["pairing_line", "round_no"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── medium · scenario (6) ────────────────────────────────────────── */
  {
    title: "Interclub Home Away Matrix",
    description: makeDesc(
      `For the interclub league, every player must appear as home against every player from a different club.`,
      `CROSS JOIN players a and players b, keep only rows where a.club <> b.club, and return a.name AS home_player, a.club AS home_club, b.name AS away_player and b.club AS away_club, ordered by a.id then b.id.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "CROSS JOIN",
    headerCode: CHESS_SCHEMA,
    sourcecode: "SELECT a.name AS home_player, a.club AS home_club, b.name AS away_player, b.club AS away_club FROM players a CROSS JOIN players b WHERE a.club <> b.club ORDER BY a.id, b.id;",
    columns: ["home_player", "home_club", "away_player", "away_club"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "ON", whitelist: "CROSS JOIN",
  },
  {
    title: "Cross Club Pairing Sheet",
    description: makeDesc(
      `The arbiter's pairing sheet lists unordered pairs of players from different clubs with both club names.`,
      `Self join players a and b with a.id < b.id AND a.club <> b.club and return a.name AS player_one, b.name AS player_two, a.club AS club_one and b.club AS club_two, ordered by a.id then b.id.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Self Join",
    headerCode: CHESS_SCHEMA,
    sourcecode: "SELECT a.name AS player_one, b.name AS player_two, a.club AS club_one, b.club AS club_two FROM players a JOIN players b ON a.id < b.id AND a.club <> b.club ORDER BY a.id, b.id;",
    columns: ["player_one", "player_two", "club_one", "club_two"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "CROSS JOIN", whitelist: "a.club <> b.club",
  },
  {
    title: "Rating Board By Hall",
    description: makeDesc(
      `Hall managers want their players ranked: highest rating first, alphabetical as tie-break.`,
      `Using players NATURAL JOIN club_halls, return p.name AS player_name, p.rating AS rating and h.hall AS hall, ordered by rating descending, then player name ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Natural Join",
    headerCode: CHESS_SCHEMA,
    sourcecode: "SELECT p.name AS player_name, p.rating AS rating, h.hall AS hall FROM players p NATURAL JOIN club_halls h ORDER BY p.rating DESC, p.name;",
    columns: ["player_name", "rating", "hall"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "ON", whitelist: "NATURAL JOIN",
  },
  {
    title: "Game Ledger With Rating Gap",
    description: makeDesc(
      `The analyst adds a rating-gap column to the game ledger by joining the players table twice.`,
      `Join games g to players w and players b; return w.name AS white_player, b.name AS black_player and w.rating - b.rating AS rating_gap, ordered by rating_gap descending, then g.id ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Multi-table Join Sequencing",
    headerCode: CHESS_SCHEMA,
    sourcecode: "SELECT w.name AS white_player, b.name AS black_player, w.rating - b.rating AS rating_gap FROM games g JOIN players w ON w.id = g.white_id JOIN players b ON b.id = g.black_id ORDER BY rating_gap DESC, g.id;",
    columns: ["white_player", "black_player", "rating_gap"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "SELECT *", whitelist: "JOIN",
  },
  {
    title: "White Hall For Every Game",
    description: makeDesc(
      `Posters in the corridors announce in which hall each game's white player sits.`,
      `Join games g to players w, players b and club_halls h (h.club = w.club); return g.round_no AS round_no, w.name AS white_player, h.hall AS white_hall and b.name AS black_player, ordered by g.id ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Multi-table Join Sequencing",
    headerCode: CHESS_SCHEMA,
    sourcecode: "SELECT g.round_no AS round_no, w.name AS white_player, h.hall AS white_hall, b.name AS black_player FROM games g JOIN players w ON w.id = g.white_id JOIN players b ON b.id = g.black_id JOIN club_halls h ON h.club = w.club ORDER BY g.id;",
    columns: ["round_no", "white_player", "white_hall", "black_player"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "NATURAL", whitelist: "JOIN",
  },
  {
    title: "Opponent Club Ledger",
    description: makeDesc(
      `The league office wants club affiliations right in the game ledger — four name/club columns per game.`,
      `Join games g to players w and players b; return w.name AS white_player, b.name AS black_player, w.club AS white_club and b.club AS black_club, ordered by g.id ascending.`
    ),
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Multi-table Join Sequencing",
    headerCode: CHESS_SCHEMA,
    sourcecode: "SELECT w.name AS white_player, b.name AS black_player, w.club AS white_club, b.club AS black_club FROM games g JOIN players w ON w.id = g.white_id JOIN players b ON b.id = g.black_id ORDER BY g.id;",
    columns: ["white_player", "black_player", "white_club", "black_club"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "SELECT *", whitelist: "JOIN",
  },

  /* ── hard · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Double Round Robin Gap Ledger",
    description: makeDesc(
      `A double round robin lets every player face every other player twice, once as home and once as away. The analyst wants the full 56-row fixture ledger with the rating gap of each fixture.`,
      `CROSS JOIN players a and players b keeping only a.id <> b.id; return a.name AS home_player, b.name AS away_player and a.rating - b.rating AS rating_gap, ordered by rating_gap descending, then home_player ascending, then away_player ascending.`
    ),
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "CROSS JOIN",
    headerCode: CHESS_SCHEMA,
    sourcecode: "SELECT a.name AS home_player, b.name AS away_player, a.rating - b.rating AS rating_gap FROM players a CROSS JOIN players b WHERE a.id <> b.id ORDER BY rating_gap DESC, home_player ASC, away_player ASC;",
    columns: ["home_player", "away_player", "rating_gap"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "ON", whitelist: "CROSS JOIN",
  },
  {
    title: "Big Rating Gap Pairs",
    description: makeDesc(
      `The elite training pool only mixes players whose ratings are at least 150 points apart within an unordered pair.`,
      `Self join players a and b with a.id < b.id AND a.rating - b.rating >= 150; return a.name AS stronger_player, b.name AS weaker_player and a.rating - b.rating AS rating_gap, ordered by rating_gap descending, then a.id, then b.id.`
    ),
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Self Join",
    headerCode: CHESS_SCHEMA,
    sourcecode: "SELECT a.name AS stronger_player, b.name AS weaker_player, a.rating - b.rating AS rating_gap FROM players a JOIN players b ON a.id < b.id AND a.rating - b.rating >= 150 ORDER BY rating_gap DESC, a.id, b.id;",
    columns: ["stronger_player", "weaker_player", "rating_gap"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "CROSS JOIN", whitelist: "a.id < b.id",
  },
  {
    title: "Player Workload Ledger",
    description: makeDesc(
      `How busy was everyone? Each player's games must be counted whether they played white or black, and their points totalled (black receives 1 - white_score).`,
      `Join players p to games g ON g.white_id = p.id OR g.black_id = p.id, group by player, and return p.name AS player_name, COUNT(g.id) AS games_played and ROUND(SUM(CASE WHEN g.white_id = p.id THEN g.white_score ELSE 1.0 - g.white_score END), 2) AS points, ordered by points descending, then player_name ascending.`
    ),
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Multi-table Join Sequencing",
    headerCode: CHESS_SCHEMA,
    sourcecode: "SELECT p.name AS player_name, COUNT(g.id) AS games_played, ROUND(SUM(CASE WHEN g.white_id = p.id THEN g.white_score ELSE 1.0 - g.white_score END), 2) AS points FROM players p JOIN games g ON g.white_id = p.id OR g.black_id = p.id GROUP BY p.id ORDER BY points DESC, player_name ASC;",
    columns: ["player_name", "games_played", "points"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "NATURAL", whitelist: "JOIN",
  },
  {
    title: "Interclub Fixture Ledger",
    description: makeDesc(
      `The hall office combines a full cross join of players with a hall lookup so every interclub fixture shows the home player's hall.`,
      `CROSS JOIN players a and players b keeping only rows where a.club <> b.club, and join club_halls h ON h.club = a.club; return a.name AS home_player, h.hall AS home_hall and b.name AS away_player, ordered by a.id then b.id.`
    ),
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Multi-table Join Sequencing",
    headerCode: CHESS_SCHEMA,
    sourcecode: "SELECT a.name AS home_player, h.hall AS home_hall, b.name AS away_player FROM players a CROSS JOIN players b JOIN club_halls h ON h.club = a.club WHERE a.club <> b.club ORDER BY a.id, b.id;",
    columns: ["home_player", "home_hall", "away_player"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "NATURAL", whitelist: "CROSS JOIN",
  },
];

/* ── MCQs (20: 10 easy / 6 medium / 4 hard; 6 snippets; 5/5/5/5 spread) ── */
const mcqs: SqlMcqQuestionIn[] = [
  { title: "Cross Join Definition", description: "What does a CROSS JOIN produce?", difficulty: "easy", topic: TOPIC, subtopic: "CROSS JOIN",
    Option1: "Every row of the first table paired with every row of the second table", Option2: "Only rows that satisfy a matching condition", Option3: "The union of both tables' rows", Option4: "One row per matching pair, dropping duplicates", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Cross Join Row Count Math", description: "A CROSS JOIN of an 8-row players table and a 5-row rounds table returns how many rows?", difficulty: "easy", topic: TOPIC, subtopic: "CROSS JOIN",
    Option1: "8", Option2: "40", Option3: "13", Option4: "5", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Why Self Joins Need Aliases", description: "Why must a self join give the two copies of a table different aliases?", difficulty: "easy", topic: TOPIC, subtopic: "Self Join",
    Option1: "To sort rows faster", Option2: "Because aliases are required by COUNT", Option3: "So each copy can be referenced by a distinct name", Option4: "To hide the table name from users", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Halving Pairs With Less Than", description: "With 8 players, what does COUNT(*) return for a self join using ON a.id < b.id?", difficulty: "easy", topic: TOPIC, subtopic: "Self Join",
    Option1: "64", Option2: "28", Option3: "56", Option4: "16", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Natural Join Match Rule", description: "NATURAL JOIN matches rows using which columns?", difficulty: "easy", topic: TOPIC, subtopic: "Natural Join",
    Option1: "Every column name the two tables share", Option2: "Primary keys only", Option3: "The first column of each table", Option4: "Nothing — it errors without ON", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Ambiguous Column Error", description: "SELECT name FROM players a, players b; fails in SQLite. Why?", difficulty: "easy", topic: TOPIC, subtopic: "Self Join",
    Option1: "Self joins are forbidden in SQLite", Option2: "Comma joins are deprecated", Option3: "Aliases must be declared with AS", Option4: "name is ambiguous — both copies of players provide it", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Cross Join Count Snippet", description: "Players (8 rows) and club_halls (4 rows) are seeded. What does this query return?", difficulty: "easy", topic: TOPIC, subtopic: "CROSS JOIN",
    Option1: "32", Option2: "12", Option3: "4", Option4: "8", CorrectOption: 1, iscodesnippet: true, codesnippet: "SELECT COUNT(*) FROM players CROSS JOIN club_halls;", snippetLang: "sql" },
  { title: "Deterministic Pair Order", description: "For a self-join pair listing (a.id < b.id), which ORDER BY makes the output fully deterministic?", difficulty: "easy", topic: TOPIC, subtopic: "Self Join",
    Option1: "ORDER BY a.name", Option2: "No ORDER BY is needed", Option3: "ORDER BY rating only", Option4: "ORDER BY a.id, b.id", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Same Club Pair Count Snippet", description: "Four clubs hold two players each. What does this query return?", difficulty: "easy", topic: TOPIC, subtopic: "Self Join",
    Option1: "28", Option2: "16", Option3: "32", Option4: "4", CorrectOption: 4, iscodesnippet: true, codesnippet: "SELECT COUNT(*) FROM players a JOIN players b ON a.id < b.id AND a.club = b.club;", snippetLang: "sql" },
  { title: "Three Table Join ON Count", description: "Joining games to players (white) and players (black) requires how many ON clauses?", difficulty: "easy", topic: TOPIC, subtopic: "Multi-table Join Sequencing",
    Option1: "0", Option2: "2", Option3: "1", Option4: "3", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },

  { title: "Filtered Cross Equals Conditional Join", description: "CROSS JOIN players a, players b WHERE a.club <> b.club versus JOIN players b ON a.club <> b.club — what is true?", difficulty: "medium", topic: TOPIC, subtopic: "CROSS JOIN",
    Option1: "CROSS JOIN ignores WHERE", Option2: "JOIN ON is always faster and drops duplicates", Option3: "CROSS JOIN returns fewer rows", Option4: "They return the same rows — the filtered cross join matches the conditional join", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Natural Join Without Shared Columns", description: "Two tables share NO column names. What does NATURAL JOIN between them do?", difficulty: "medium", topic: TOPIC, subtopic: "Natural Join",
    Option1: "It falls back to a cartesian product, like CROSS JOIN", Option2: "It raises a syntax error", Option3: "It returns an empty result", Option4: "It joins on rowid", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Duplicate Alias Crash Snippet", description: "What is wrong with this query?", difficulty: "medium", topic: TOPIC, subtopic: "Multi-table Join Sequencing",
    Option1: "It runs but shows black players as white", Option2: "It runs but doubles the rows", Option3: "The alias w is used twice — duplicate table alias error", Option4: "games must come last in the FROM clause", CorrectOption: 3, iscodesnippet: true, codesnippet: "SELECT w.name\nFROM games g\nJOIN players w ON w.id = g.white_id\nJOIN players w ON w.id = g.black_id;", snippetLang: "sql" },
  { title: "Rating Tie Pair Count", description: "Exactly two players share a rating and all other ratings are unique. How many rows does ON a.id < b.id AND a.rating = b.rating return?", difficulty: "medium", topic: TOPIC, subtopic: "Self Join",
    Option1: "0", Option2: "2", Option3: "1", Option4: "4", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Ordered Versus Unordered Pairs", description: "How do a.id <> b.id and a.id < b.id differ in a self join?", difficulty: "medium", topic: TOPIC, subtopic: "Self Join",
    Option1: "a.id < b.id lists each unordered pair once; a.id <> b.id lists both directions", Option2: "They are identical", Option3: "a.id <> b.id halves the count", Option4: "a.id < b.id is invalid syntax", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Join Chain Column Source Snippet", description: "In this query, which clause matches the black player?", difficulty: "medium", topic: TOPIC, subtopic: "Multi-table Join Sequencing",
    Option1: "The first ON clause", Option2: "ON b.id = g.black_id", Option3: "The WHERE clause", Option4: "USING (black_id)", CorrectOption: 2, iscodesnippet: true, codesnippet: "SELECT g.round_no, w.name, b.name\nFROM games g\nJOIN players w ON w.id = g.white_id\nJOIN players b ON b.id = g.black_id;", snippetLang: "sql" },

  { title: "Natural Self Join Surprise", description: "What does this query return for any 8-row table?", difficulty: "hard", topic: TOPIC, subtopic: "Natural Join",
    Option1: "64", Option2: "28", Option3: "0", Option4: "8", CorrectOption: 4, iscodesnippet: true, codesnippet: "SELECT COUNT(*) FROM players NATURAL JOIN players;", snippetLang: "sql" },
  { title: "Triple Cross Product Size", description: "players has 8 rows, openings 5, rounds 5. What does this return?", difficulty: "hard", topic: TOPIC, subtopic: "CROSS JOIN",
    Option1: "18", Option2: "40", Option3: "200", Option4: "125", CorrectOption: 3, iscodesnippet: true, codesnippet: "SELECT COUNT(*)\nFROM players CROSS JOIN openings CROSS JOIN rounds;", snippetLang: "sql" },
  { title: "Half Matrix Versus Full Matrix", description: "For 8 players, COUNT(*) with self join ON a.id <> b.id returns 56. What does ON a.id < b.id return, and why?", difficulty: "hard", topic: TOPIC, subtopic: "Self Join",
    Option1: "28 — identical to a.id <> b.id", Option2: "56 — both directions of every pairing", Option3: "64 — it includes self-pairs", Option4: "0 — an id cannot differ from itself", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Mixing CROSS JOIN and JOIN ON", description: "FROM players a CROSS JOIN players b JOIN club_halls h ON h.club = a.club WHERE a.club <> b.club — is this valid SQLite?", difficulty: "hard", topic: TOPIC, subtopic: "Multi-table Join Sequencing",
    Option1: "Invalid — CROSS JOIN cannot be mixed with other joins", Option2: "Invalid — WHERE must come before the joins", Option3: "Valid — the ON clause binds only to the club_halls join", Option4: "Valid — the ON applies to the entire join tree", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
];

await buildDay({ day: DAY, topic: TOPIC, subtopics: SUBTOPICS, codeQuestions, mcqs });
