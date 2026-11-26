/**
 * Day 1 — "Introduction to Databases and SQL".
 *
 * Domain: a city library reading list. Tiny table books(id, title, author,
 * pages, available) seeded with 10 fixed rows. All code questions are
 * read-only SELECTs demonstrating result-set mechanics: full projection,
 * column projection, expressions, DISTINCT, ordering, and a peek at the
 * sqlite_master catalog.
 *
 * Run from /home/z/my-project:
 *   bun scripts/sql-programming/builders/build-day-01.ts
 */
import { buildDay, type SqlCodeQuestionIn, type SqlMcqQuestionIn } from "../lib.ts";

const DAY = 1;
const TOPIC = "Introduction to Databases and SQL";
const SUBTOPICS = [
  "RDBMS Concepts",
  "SQL Categories DDL DML DQL DCL TCL",
  "Schemas and Catalogs",
  "SQL Clients and Tools",
  "Executing Queries and Result Sets",
];

/* Shared hidden setup: a city library reading list (10 books). */
const BOOKS_SCHEMA = `CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  pages INTEGER NOT NULL,
  available INTEGER NOT NULL
);
INSERT INTO books (title, author, pages, available) VALUES
('The Lighthouse Keeper', 'Mara Ellison', 312, 1),
('Salt and Cedar', 'Mara Ellison', 268, 0),
('A Field Guide to Urban Birds', 'Tomas Kral', 96, 1),
('The Cartographer''s Daughter', 'Irene Voss', 402, 1),
('Midnight at the Archive', 'Irene Voss', 288, 0),
('Paper Boats', 'Sana Iqbal', 176, 1),
('The Last Tram Home', 'Sana Iqbal', 176, 0),
('Winter Orchard', 'Tomas Kral', 340, 1),
('Notes from a Small Library', 'Dev Anand', 220, 1),
('The Glass Beekeeper', 'Irene Voss', 254, 1);`;

const RULES_READ_ONLY =
  "Rules:\n- SQLite dialect. The schema and its data are pre-seeded automatically — do not include CREATE TABLE or INSERT statements in your answer.\n- Column names and order must match exactly (alias every output column).\n- Row order must match exactly (use ORDER BY as specified).";

const SCHEMA_BOOKS =
  "Schema:\n- books(id INTEGER PRIMARY KEY, title TEXT, author TEXT, pages INTEGER, available INTEGER)\n\nTen books from the city library's reading list are seeded. available is 1 when the book can be borrowed and 0 when it is checked out; several authors appear more than once; the shortest book is a 96-page field guide and two books tie at 176 pages.";

const codeQuestions: SqlCodeQuestionIn[] = [
  /* ── easy · basic (6) ─────────────────────────────────────────────── */
  {
    title: "Whole Relation on Display",
    description: `A relational table is a set of rows and columns — before writing anything clever, display the whole relation exactly as stored.\n\n${SCHEMA_BOOKS}\n\nTask:\nReturn all columns of all books, ordered by id ascending.\n\n${RULES_READ_ONLY}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "RDBMS Concepts",
    headerCode: BOOKS_SCHEMA,
    sourcecode: "SELECT * FROM books ORDER BY id;",
    columns: ["id", "title", "author", "pages", "available"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Titles and Authors Only",
    description: `Executing a query returns a result set shaped by what you ask for. Practice projecting exactly two columns.\n\n${SCHEMA_BOOKS}\n\nTask:\nReturn title and author (in that order), one row per book, ordered by id ascending.\n\n${RULES_READ_ONLY}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Executing Queries and Result Sets",
    headerCode: BOOKS_SCHEMA,
    sourcecode: "SELECT title, author FROM books ORDER BY id;",
    columns: ["title", "author"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "The Read-Only Statement",
    description: `SELECT is the data-query (DQL) statement — it never changes stored data, it only produces a result set. Run one pure read query against a single column.\n\n${SCHEMA_BOOKS}\n\nTask:\nReturn one column, book_title (alias of title), for every book, ordered alphabetically by book_title.\n\n${RULES_READ_ONLY}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "SQL Categories DDL DML DQL DCL TCL",
    headerCode: BOOKS_SCHEMA,
    sourcecode: "SELECT title AS book_title FROM books ORDER BY book_title;",
    columns: ["book_title"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Pages Through an Expression",
    description: `A result set column can be an expression, not just a raw column. Use the simplest expression: pages plus zero.\n\n${SCHEMA_BOOKS}\n\nTask:\nReturn title AS title and (pages + 0) AS page_count, ordered by id ascending.\n\n${RULES_READ_ONLY}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Executing Queries and Result Sets",
    headerCode: BOOKS_SCHEMA,
    sourcecode: "SELECT title AS title, pages + 0 AS page_count FROM books ORDER BY id;",
    columns: ["title", "page_count"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "The Catalog Behind the Database",
    description: `Every SQLite database keeps a catalog of its objects in a special table named sqlite_master, and you can query it like any other table.\n\n${SCHEMA_BOOKS}\n\nTask:\nReturn name and type of every object recorded in sqlite_master, ordered by name ascending.\n\n${RULES_READ_ONLY}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Schemas and Catalogs",
    headerCode: BOOKS_SCHEMA,
    sourcecode: "SELECT name, type FROM sqlite_master ORDER BY name;",
    columns: ["name", "type"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Impose an Order on Rows",
    description: `Rows in a relational table have no inherent order — without a sort clause the database may return them in any order. Prove you can impose one.\n\n${SCHEMA_BOOKS}\n\nTask:\nReturn title AS title and pages AS pages, ordered by pages descending; break ties by title ascending.\n\n${RULES_READ_ONLY}`,
    difficulty: "easy", variant: "basic", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "RDBMS Concepts",
    headerCode: BOOKS_SCHEMA,
    sourcecode: "SELECT title AS title, pages AS pages FROM books ORDER BY pages DESC, title ASC;",
    columns: ["title", "pages"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── easy · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Library Orientation Handout",
    description: `The front desk prints an orientation handout for new members straight from the library's query client: title, author and availability, in shelf order.\n\n${SCHEMA_BOOKS}\n\nTask:\nReturn title AS title, author AS author and available AS available, ordered by id ascending.\n\n${RULES_READ_ONLY}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "SQL Clients and Tools",
    headerCode: BOOKS_SCHEMA,
    sourcecode: "SELECT title AS title, author AS author, available AS available FROM books ORDER BY id;",
    columns: ["title", "author", "available"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Story Hour Poster List",
    description: `For story hour, the librarian explains that the data-query language lets her collapse repeated rows: the poster must list each author once.\n\n${SCHEMA_BOOKS}\n\nTask:\nReturn author AS author with duplicates removed, ordered alphabetically by author.\n\n${RULES_READ_ONLY}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "SQL Categories DDL DML DQL DCL TCL",
    headerCode: BOOKS_SCHEMA,
    sourcecode: "SELECT DISTINCT author AS author FROM books ORDER BY author;",
    columns: ["author"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Weekend Reading Planner",
    description: `A volunteer building the weekend planner at the client console wants the shortest reads first so members can finish a book in two days.\n\n${SCHEMA_BOOKS}\n\nTask:\nReturn title AS title and pages AS pages, ordered by pages ascending; break ties by title ascending.\n\n${RULES_READ_ONLY}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "SQL Clients and Tools",
    headerCode: BOOKS_SCHEMA,
    sourcecode: "SELECT title AS title, pages AS pages FROM books ORDER BY pages ASC, title ASC;",
    columns: ["title", "pages"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },
  {
    title: "Catalog Export Headers",
    description: `The library's export service expects very specific column headers in the result set it receives. Rename the output columns with aliases.\n\n${SCHEMA_BOOKS}\n\nTask:\nReturn title AS item and available AS in_stock, ordered by id ascending.\n\n${RULES_READ_ONLY}`,
    difficulty: "easy", variant: "scenario", maxscore: 10, lang: "sql",
    topic: TOPIC, subtopic: "Schemas and Catalogs",
    headerCode: BOOKS_SCHEMA,
    sourcecode: "SELECT title AS item, available AS in_stock FROM books ORDER BY id;",
    columns: ["item", "in_stock"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "", whitelist: "",
  },

  /* ── medium · scenario (6) ────────────────────────────────────────── */
  {
    title: "Print-Ready Catalog Card",
    description: `The print shop renders one card line per book in this exact shape: "TITLE (NNN pages)". Build the string with printf so the number is formatted as an integer.\n\n${SCHEMA_BOOKS}\n\nTask:\nReturn one column, card_line, built with printf in the format '%s (%d pages)' from title and pages, ordered by id ascending.\n\n${RULES_READ_ONLY}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "SQL Clients and Tools",
    headerCode: BOOKS_SCHEMA,
    sourcecode: "SELECT printf('%s (%d pages)', title, pages) AS card_line FROM books ORDER BY id;",
    columns: ["card_line"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "||", whitelist: "printf",
  },
  {
    title: "Author Name Badges",
    description: `Event staff wear badges with authors in capitals. Produce the badge text next to one of their book titles.\n\n${SCHEMA_BOOKS}\n\nTask:\nReturn upper(author) AS author_caps and title AS title, ordered by author_caps ascending, tie-break by title ascending.\n\n${RULES_READ_ONLY}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Executing Queries and Result Sets",
    headerCode: BOOKS_SCHEMA,
    sourcecode: "SELECT upper(author) AS author_caps, title AS title FROM books ORDER BY author_caps ASC, title ASC;",
    columns: ["author_caps", "title"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "lower", whitelist: "upper, ORDER BY",
  },
  {
    title: "Extended Edition Planning",
    description: `The publisher adds a 20-page foreword to every title. Estimate the extended page count and rank the longest extended editions first.\n\n${SCHEMA_BOOKS}\n\nTask:\nReturn title AS title and (pages + 20) AS extended_pages, ordered by extended_pages descending, tie-break by title ascending.\n\n${RULES_READ_ONLY}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "RDBMS Concepts",
    headerCode: BOOKS_SCHEMA,
    sourcecode: "SELECT title AS title, pages + 20 AS extended_pages FROM books ORDER BY extended_pages DESC, title ASC;",
    columns: ["title", "extended_pages"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "GROUP BY", whitelist: "ORDER BY",
  },
  {
    title: "Reading Log Sheet",
    description: `The circulation desk keeps a reading log sheet: available books first, then the checked-out ones, shortest within each group first.\n\n${SCHEMA_BOOKS}\n\nTask:\nReturn id AS entry_no, title AS title, pages AS pages and available AS available, ordered by available descending, then pages ascending, then title ascending.\n\n${RULES_READ_ONLY}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "SQL Clients and Tools",
    headerCode: BOOKS_SCHEMA,
    sourcecode: "SELECT id AS entry_no, title AS title, pages AS pages, available AS available FROM books ORDER BY available DESC, pages ASC, title ASC;",
    columns: ["entry_no", "title", "pages", "available"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "LIMIT", whitelist: "ORDER BY",
  },
  {
    title: "Client Smoke Test",
    description: `Before wiring the client to the real database, the support engineer runs a smoke test: a SELECT that needs no FROM clause and returns a fixed one-row result set.\n\n${SCHEMA_BOOKS}\n\nTask:\nReturn exactly one row with two columns: the number 42 AS probe_number and the text 'reading-room' AS branch_label. Do not query any table.\n\n${RULES_READ_ONLY}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Executing Queries and Result Sets",
    headerCode: BOOKS_SCHEMA,
    sourcecode: "SELECT 42 AS probe_number, 'reading-room' AS branch_label;",
    columns: ["probe_number", "branch_label"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "FROM", whitelist: "SELECT",
  },
  {
    title: "Result Set Schema Control",
    description: `A downstream service parses the result set by header name. Rename every output column to the service's contract while keeping the data readable.\n\n${SCHEMA_BOOKS}\n\nTask:\nReturn author AS writer, title AS work and pages AS length_pages, ordered by writer ascending, tie-break by work ascending.\n\n${RULES_READ_ONLY}`,
    difficulty: "medium", variant: "scenario", maxscore: 20, lang: "sql",
    topic: TOPIC, subtopic: "Schemas and Catalogs",
    headerCode: BOOKS_SCHEMA,
    sourcecode: "SELECT author AS writer, title AS work, pages AS length_pages FROM books ORDER BY writer ASC, work ASC;",
    columns: ["writer", "work", "length_pages"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "SELECT *", whitelist: "AS, ORDER BY",
  },

  /* ── hard · scenario (4) ──────────────────────────────────────────── */
  {
    title: "Full Bibliography Board",
    description: `The reading-room board shows every book with its raw fields plus a formatted size label like "312 pp." — one row per book, grouped by author, longest book first.\n\n${SCHEMA_BOOKS}\n\nTask:\nReturn id AS id, title AS title, author AS author, pages AS pages, available AS available and printf('%d pp.', pages) AS size_label, ordered by author ascending, then pages descending, then title ascending. Every book must appear — no filtering.\n\n${RULES_READ_ONLY}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "RDBMS Concepts",
    headerCode: BOOKS_SCHEMA,
    sourcecode: "SELECT id AS id, title AS title, author AS author, pages AS pages, available AS available, printf('%d pp.', pages) AS size_label FROM books ORDER BY author ASC, pages DESC, title ASC;",
    columns: ["id", "title", "author", "pages", "available", "size_label"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "WHERE", whitelist: "printf, ORDER BY",
  },
  {
    title: "Caps and Lengths Audit",
    description: `A data-quality audit produces a pure read-only report: each title in capitals, its character length, and its author — longest titles first.\n\n${SCHEMA_BOOKS}\n\nTask:\nReturn upper(title) AS title_caps, length(title) AS title_length and author AS author, ordered by title_length descending, tie-break by title_caps ascending.\n\n${RULES_READ_ONLY}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "SQL Categories DDL DML DQL DCL TCL",
    headerCode: BOOKS_SCHEMA,
    sourcecode: "SELECT upper(title) AS title_caps, length(title) AS title_length, author AS author FROM books ORDER BY title_length DESC, title_caps ASC;",
    columns: ["title_caps", "title_length", "author"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "printf", whitelist: "upper, length, ORDER BY",
  },
  {
    title: "Reading Marathon Matrix",
    description: `For a charity read-a-thon the team builds one grid per book: the raw page count, a double-length reprint estimate, and an extended edition estimate (plus 50 pages) — longest originals first.\n\n${SCHEMA_BOOKS}\n\nTask:\nReturn title AS title, pages AS pages, (pages * 2) AS double_pages and (pages + 50) AS extended_pages, ordered by pages descending, tie-break by title ascending. Include every book — no filtering.\n\n${RULES_READ_ONLY}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "SQL Categories DDL DML DQL DCL TCL",
    headerCode: BOOKS_SCHEMA,
    sourcecode: "SELECT title AS title, pages AS pages, pages * 2 AS double_pages, pages + 50 AS extended_pages FROM books ORDER BY pages DESC, title ASC;",
    columns: ["title", "pages", "double_pages", "extended_pages"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "WHERE", whitelist: "ORDER BY",
  },
  {
    title: "Catalog Cross-Check Sheet",
    description: `Before a shelf audit, the cataloger wants one fully renamed sheet: work, writer, length and borrowability — borrowable books last so the checked-out ones are seen first.\n\n${SCHEMA_BOOKS}\n\nTask:\nReturn title AS work, author AS writer, pages AS length_pages and available AS borrowable, ordered by borrowable ascending, then length_pages ascending, then work ascending.\n\n${RULES_READ_ONLY}`,
    difficulty: "hard", variant: "scenario", maxscore: 30, lang: "sql",
    topic: TOPIC, subtopic: "Schemas and Catalogs",
    headerCode: BOOKS_SCHEMA,
    sourcecode: "SELECT title AS work, author AS writer, pages AS length_pages, available AS borrowable FROM books ORDER BY borrowable ASC, length_pages ASC, work ASC;",
    columns: ["work", "writer", "length_pages", "borrowable"],
    inputconstrains: "SQLite dialect; schema pre-seeded", blacklist: "SELECT *, DISTINCT", whitelist: "ORDER BY",
  },
];

/* ── MCQs (20: 10 easy / 6 medium / 4 hard; 6 snippets; 5/5/5/5 spread) ── */
const mcqs: SqlMcqQuestionIn[] = [
  { title: "Definition of a Table", description: "In a relational database, a table stores data as…", difficulty: "easy", topic: TOPIC, subtopic: "RDBMS Concepts",
    Option1: "A tree of nested nodes", Option2: "A stream of key-value pairs", Option3: "Rows and columns", Option4: "A single text file", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "SELECT Belongs To", description: "Which SQL category does the SELECT statement belong to?", difficulty: "easy", topic: TOPIC, subtopic: "SQL Categories DDL DML DQL DCL TCL",
    Option1: "DQL (data query language)", Option2: "DDL (data definition language)", Option3: "DCL (data control language)", Option4: "TCL (transaction control language)", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "CREATE TABLE Category", description: "CREATE TABLE, ALTER TABLE and DROP TABLE belong to which SQL category?", difficulty: "easy", topic: TOPIC, subtopic: "SQL Categories DDL DML DQL DCL TCL",
    Option1: "DQL", Option2: "DML", Option3: "TCL", Option4: "DDL", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Result Set Meaning", description: "A query's result set is…", difficulty: "easy", topic: TOPIC, subtopic: "Executing Queries and Result Sets",
    Option1: "The list of tables in the database", Option2: "The rows and columns the database returns for a query", Option3: "The SQL text sent to the server", Option4: "The query execution plan", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Projection Meaning", description: "Choosing only title and author in the SELECT list is called…", difficulty: "easy", topic: TOPIC, subtopic: "Executing Queries and Result Sets",
    Option1: "Row filtering", Option2: "Column projection", Option3: "Sorting", Option4: "Joining", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "sqlite_master Role", description: "In SQLite, the sqlite_master table holds…", difficulty: "easy", topic: TOPIC, subtopic: "Schemas and Catalogs",
    Option1: "The data rows of user tables", Option2: "Cached query results", Option3: "Client connection settings", Option4: "The catalog of database objects such as tables and indexes", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "DISTINCT Author Output", description: "Ten book rows reference six distinct authors. What does this query return?", difficulty: "easy", topic: TOPIC, subtopic: "Executing Queries and Result Sets",
    Option1: "Six rows — each author at most once", Option2: "Authors sorted by how many books they wrote", Option3: "Only authors who wrote exactly one book", Option4: "Ten rows — one per book", CorrectOption: 1, iscodesnippet: true, codesnippet: "SELECT DISTINCT author FROM books ORDER BY author;", snippetLang: "sql" },
  { title: "Rows Without ORDER BY", description: "A SELECT runs without an ORDER BY clause. In what order do the rows come back?", difficulty: "easy", topic: TOPIC, subtopic: "RDBMS Concepts",
    Option1: "Always primary-key order", Option2: "Always insertion order", Option3: "No guaranteed order — only ORDER BY gives a guaranteed one", Option4: "Always reverse insertion order", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "sqlite3 CLI Table List", description: "In the sqlite3 command-line client, which dot-command lists the database's tables?", difficulty: "easy", topic: TOPIC, subtopic: "SQL Clients and Tools",
    Option1: ".show tables", Option2: "LIST TABLES;", Option3: ".columns", Option4: ".tables", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Client Renders Alias Header", description: "What header does the client render for the second column of this result set?", difficulty: "easy", topic: TOPIC, subtopic: "SQL Clients and Tools",
    Option1: "pages + 0", Option2: "page_count", Option3: "pages", Option4: "count", CorrectOption: 2, iscodesnippet: true, codesnippet: "SELECT title, pages + 0 AS page_count FROM books;", snippetLang: "sql" },
  { title: "DML Statement Set", description: "Which group of statements is data manipulation language (DML)?", difficulty: "medium", topic: TOPIC, subtopic: "SQL Categories DDL DML DQL DCL TCL",
    Option1: "CREATE, ALTER, DROP", Option2: "GRANT, REVOKE", Option3: "INSERT, UPDATE, DELETE", Option4: "BEGIN, COMMIT, ROLLBACK", CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Schema Definition", description: "A database schema describes…", difficulty: "medium", topic: TOPIC, subtopic: "Schemas and Catalogs",
    Option1: "The structure of tables, their columns and types", Option2: "The current data rows only", Option3: "The list of connected clients", Option4: "Query performance statistics", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Catalog Query Result", description: "What does this query return?", difficulty: "medium", topic: TOPIC, subtopic: "Schemas and Catalogs",
    Option1: "The data of every user table", Option2: "Only table names, without types", Option3: "One row per database object with its name and kind", Option4: "An error — sqlite_master cannot be read", CorrectOption: 3, iscodesnippet: true, codesnippet: "SELECT name, type FROM sqlite_master ORDER BY name;", snippetLang: "sql" },
  { title: "Grid Cell for NULL", description: "A selected column is NULL for some row. What does the result grid show for that cell?", difficulty: "medium", topic: TOPIC, subtopic: "RDBMS Concepts",
    Option1: "NULL", Option2: "It errors — NULL cannot be displayed", Option3: "0", Option4: "An empty string", CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "DISTINCT Two Columns", description: "What does this query deduplicate over?", difficulty: "medium", topic: TOPIC, subtopic: "Executing Queries and Result Sets",
    Option1: "The author column only", Option2: "The combination of author and pages", Option3: "The pages column only", Option4: "Nothing — DISTINCT is ignored with two columns", CorrectOption: 2, iscodesnippet: true, codesnippet: "SELECT DISTINCT author, pages FROM books ORDER BY author;", snippetLang: "sql" },
  { title: "Why Alias Output Columns", description: "Well-behaved clients alias every output column because…", difficulty: "medium", topic: TOPIC, subtopic: "Schemas and Catalogs",
    Option1: "Aliases make the query run faster", Option2: "SQLite rejects unaliased columns", Option3: "Aliases encrypt the data in transit", Option4: "Aliased names make the result schema explicit and stable", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Bag Semantics of Results", description: "Without DISTINCT, a relational query result is best described as…", difficulty: "hard", topic: TOPIC, subtopic: "RDBMS Concepts",
    Option1: "An ordered list with unique rows", Option2: "A bag (multiset) of rows — duplicates possible, order not guaranteed", Option3: "A sorted set", Option4: "A JSON document", CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Tie-Break Ordering", description: "Two books both have 176 pages. How does this query order them relative to each other?", difficulty: "hard", topic: TOPIC, subtopic: "Executing Queries and Result Sets",
    Option1: "By title ascending — the second key breaks the tie", Option2: "By insertion order", Option3: "Arbitrarily, changing between runs", Option4: "It errors — ORDER BY cannot handle ties", CorrectOption: 1, iscodesnippet: true, codesnippet: "SELECT title, pages FROM books ORDER BY pages DESC, title ASC;", snippetLang: "sql" },
  { title: "DCL Statement Pair", description: "Which pair of statements belongs to data control language (DCL)?", difficulty: "hard", topic: TOPIC, subtopic: "SQL Categories DDL DML DQL DCL TCL",
    Option1: "SELECT and FROM", Option2: "UPDATE and DELETE", Option3: "COMMIT and ROLLBACK", Option4: "GRANT and REVOKE", CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null },
  { title: "Expression Without a Table", description: "What does this statement return?", difficulty: "hard", topic: TOPIC, subtopic: "SQL Clients and Tools",
    Option1: "An error — FROM is required", Option2: "Four rows, one per column", Option3: "One row: four = 4 and marker = 'row', no table involved", Option4: "An empty result set", CorrectOption: 3, iscodesnippet: true, codesnippet: "SELECT 2 + 2 AS four, 'row' AS marker;", snippetLang: "sql" },
];

await buildDay({ day: DAY, topic: TOPIC, subtopics: SUBTOPICS, codeQuestions, mcqs });
