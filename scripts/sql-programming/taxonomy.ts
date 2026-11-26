/**
 * AtomCode — "SQL Programming" question group topic taxonomy.
 *
 * Authored from scratch following a standard beginner-to-advanced SQL
 * curriculum (20 days, ONE topic per day). Day 1 consolidates RDBMS concepts,
 * SQL categories, schema, clients, and query execution into a single
 * "Introduction to Databases and SQL" topic.
 *
 * Because SQL has no main/stdin/stdout program model, every code question is
 * expressed as: "Given the following seed DDL + INSERT data (described in the
 * problem statement), write a SELECT/DML/DDL query that produces EXACTLY the
 * specified result table (column order + row order)." The Lambda SQL judge
 * seeds the schema, runs the candidate query, runs the reference query, and
 * compares result sets cell-by-cell.
 *
 * Subtopic lists are the EXACT strings that every question's `subtopic` field
 * must use — do not rename or invent.
 *
 * Day | Topic                                | Curriculum coverage
 * ----+--------------------------------------+---------------------------------------
 *  1  | Introduction to Databases and SQL    | RDBMS Concepts, SQL Categories, Schema, Clients, Executing Queries
 *  2  | Data Definition Language (DDL)      | CREATE ALTER DROP TABLE, Schemas, Naming Conventions
 *  3  | Data Types and Constraints           | Numeric Text Date Bool Types, PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK, NOT NULL, DEFAULT
 *  4  | Data Manipulation (INSERT UPDATE DELETE) | INSERT INTO, UPDATE SET, DELETE FROM, TRUNCATE, RETURNING
 *  5  | SELECT Basics                        | SELECT, FROM, Column Selection, Aliases, DISTINCT, Expressions
 *  6  | Filtering with WHERE                 | Comparison, Logical AND OR NOT, IN, BETWEEN, LIKE, IS NULL, ANY ALL
 *  7  | Sorting and Limiting                 | ORDER BY ASC DESC, LIMIT, OFFSET, NULLS FIRST LAST, Pagination
 *  8  | Aggregate Functions                  | COUNT, SUM, AVG, MIN, MAX, GROUP_CONCAT, DISTINCT with Aggregates
 *  9  | GROUP BY and HAVING                  | GROUP BY Columns, HAVING vs WHERE, Multiple Groups, GROUPING SETS
 * 10  | INNER and OUTER Joins               | INNER JOIN, LEFT RIGHT FULL OUTER JOIN, ON vs USING
 * 11  | Cross and Self Joins                 | CROSS JOIN, Self Join, Natural Join, Multi-table Joins
 * 12  | Subqueries                           | Scalar, Correlated, EXISTS, IN ANY ALL, Nested in SELECT WHERE FROM
 * 13  | Set Operations                       | UNION, UNION ALL, INTERSECT, EXCEPT, Column Alignment
 * 14  | Common Table Expressions (CTEs)      | WITH, Single and Multiple CTEs, Recursive CTEs, Materialization
 * 15  | Window Functions                     | OVER, PARTITION BY, ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, NTILE, Running Totals
 * 16  | Views                                | CREATE VIEW, Query Views, Updatable Views, Materialized Views, Refresh
 * 17  | Indexes and Performance              | CREATE INDEX, B-tree Hash, EXPLAIN, Covering Indexes, When NOT to Index
 * 18  | Transactions and ACID                | BEGIN COMMIT ROLLBACK, SAVEPOINT, Isolation Levels, Locks, Deadlocks
 * 19  | Stored Procedures and Functions      | CREATE PROCEDURE, CREATE FUNCTION, Parameters, RETURN, CALL, Variables, Control Flow
 * 20  | Triggers and Events                 | CREATE TRIGGER, BEFORE AFTER, INSERT UPDATE DELETE, NEW OLD, Scheduled Events
 */

export interface TopicDef {
  name: string;
  subtopics: string[];
}

export const TOPIC_TAXONOMY: Record<number, TopicDef[]> = {
  1: [
    {
      name: "Introduction to Databases and SQL",
      subtopics: [
        "RDBMS Concepts",
        "SQL Categories DDL DML DQL DCL TCL",
        "Schemas and Catalogs",
        "SQL Clients and Tools",
        "Executing Queries and Result Sets",
      ],
    },
  ],
  2: [
    {
      name: "Data Definition Language (DDL)",
      subtopics: [
        "CREATE TABLE",
        "ALTER TABLE",
        "DROP TABLE",
        "Schema Management",
        "Naming Conventions",
      ],
    },
  ],
  3: [
    {
      name: "Data Types and Constraints",
      subtopics: [
        "Numeric Data Types",
        "Text and Character Data Types",
        "Date and Time Data Types",
        "Boolean Data Type",
        "PRIMARY KEY Constraint",
        "FOREIGN KEY Constraint",
        "UNIQUE Constraint",
        "CHECK Constraint",
        "NOT NULL and DEFAULT Constraints",
      ],
    },
  ],
  4: [
    {
      name: "Data Manipulation (INSERT UPDATE DELETE)",
      subtopics: [
        "INSERT INTO",
        "UPDATE SET",
        "DELETE FROM",
        "TRUNCATE TABLE",
        "RETURNING Clause",
      ],
    },
  ],
  5: [
    {
      name: "SELECT Basics",
      subtopics: [
        "SELECT and FROM Clauses",
        "Column Selection",
        "Column and Table Aliases",
        "DISTINCT Keyword",
        "SELECT Expressions",
      ],
    },
  ],
  6: [
    {
      name: "Filtering with WHERE",
      subtopics: [
        "Comparison Operators",
        "Logical Operators AND OR NOT",
        "IN and NOT IN",
        "BETWEEN",
        "LIKE and ILIKE Patterns",
        "IS NULL and IS NOT NULL",
        "ANY and ALL",
      ],
    },
  ],
  7: [
    {
      name: "Sorting and Limiting",
      subtopics: [
        "ORDER BY Clause",
        "ASC and DESC",
        "NULLS FIRST and NULLS LAST",
        "LIMIT Clause",
        "OFFSET Clause",
        "Pagination with LIMIT OFFSET",
      ],
    },
  ],
  8: [
    {
      name: "Aggregate Functions",
      subtopics: [
        "COUNT Function",
        "SUM Function",
        "AVG Function",
        "MIN and MAX Functions",
        "GROUP_CONCAT and STRING_AGG",
        "DISTINCT with Aggregates",
      ],
    },
  ],
  9: [
    {
      name: "GROUP BY and HAVING",
      subtopics: [
        "GROUP BY Columns",
        "HAVING Clause",
        "WHERE vs HAVING",
        "Multiple Column Grouping",
        "GROUPING SETS",
      ],
    },
  ],
  10: [
    {
      name: "INNER and OUTER Joins",
      subtopics: [
        "INNER JOIN",
        "LEFT OUTER JOIN",
        "RIGHT OUTER JOIN",
        "FULL OUTER JOIN",
        "ON vs USING Clause",
        "Three Table Joins",
      ],
    },
  ],
  11: [
    {
      name: "Cross and Self Joins",
      subtopics: [
        "CROSS JOIN",
        "Self Join",
        "Natural Join",
        "Multi-table Join Sequencing",
      ],
    },
  ],
  12: [
    {
      name: "Subqueries",
      subtopics: [
        "Scalar Subqueries",
        "Correlated Subqueries",
        "EXISTS and NOT EXISTS",
        "IN ANY ALL Subqueries",
        "Subqueries in SELECT WHERE FROM",
      ],
    },
  ],
  13: [
    {
      name: "Set Operations",
      subtopics: [
        "UNION",
        "UNION ALL",
        "INTERSECT",
        "EXCEPT and MINUS",
        "Column Alignment in Set Operations",
      ],
    },
  ],
  14: [
    {
      name: "Common Table Expressions (CTEs)",
      subtopics: [
        "WITH Clause",
        "Single CTE",
        "Multiple CTEs",
        "Recursive CTEs",
        "CTE Materialization",
      ],
    },
  ],
  15: [
    {
      name: "Window Functions",
      subtopics: [
        "OVER Clause",
        "PARTITION BY",
        "ROW_NUMBER",
        "RANK and DENSE_RANK",
        "LAG and LEAD",
        "NTILE",
        "Running Totals and Sums",
      ],
    },
  ],
  16: [
    {
      name: "Views",
      subtopics: [
        "CREATE VIEW",
        "Querying Views",
        "Updatable Views",
        "Materialized Views",
        "Refreshing Materialized Views",
      ],
    },
  ],
  17: [
    {
      name: "Indexes and Performance",
      subtopics: [
        "CREATE INDEX",
        "B-tree Index",
        "Hash Index",
        "EXPLAIN and Query Plans",
        "Covering Indexes",
        "When NOT to Index",
      ],
    },
  ],
  18: [
    {
      name: "Transactions and ACID",
      subtopics: [
        "BEGIN COMMIT ROLLBACK",
        "SAVEPOINT",
        "Isolation Levels",
        "Locks and Locking",
        "Deadlocks",
      ],
    },
  ],
  19: [
    {
      name: "Stored Procedures and Functions",
      subtopics: [
        "CREATE PROCEDURE",
        "CREATE FUNCTION",
        "Parameters IN OUT INOUT",
        "RETURN in Functions",
        "CALL Statement",
        "Variables and Control Flow in Procedures",
      ],
    },
  ],
  20: [
    {
      name: "Triggers and Events",
      subtopics: [
        "CREATE TRIGGER",
        "BEFORE and AFTER Triggers",
        "INSERT UPDATE DELETE Triggers",
        "NEW and OLD Records",
        "Scheduled Events",
      ],
    },
  ],
};

export const GROUP_TITLE = "SQL Programming";

/**
 * SQL-language judge URL — the core AtomCode Lambda (shared with Python, Ruby,
 * JS, TS). Falls back to env vars if set.
 */
export const SQL_JUDGE_URL =
  process.env.SQL_LAMBDA_URL ||
  (process.env.LAMBDA_JUDGE_URLS
    ? JSON.parse(process.env.LAMBDA_JUDGE_URLS)["sql"]
    : undefined) ||
  "https://yqcl2o7hrmikctiifbd2pzplky0cxglk.lambda-url.ap-south-1.on.aws/";
