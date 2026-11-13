# AtomCode — "OOPS using JAVA" Question Bank Conventions

This document defines the EXACT conventions for generating day-wise question data
for the question group **"OOPS using JAVA"**. Agents generating `data/day-NN.*.json`
files MUST follow every rule here. The validator (`scripts/oops-java/validate.ts`)
enforces these mechanically; the Java Lambda compiler is the source of truth for
execution.

## File layout

Each day produces TWO JSON files in `/home/z/my-project/scripts/oops-java/data/`:

- `day-NN.code.json` — 20 code questions
- `day-NN.mcq.json`  — 20 MCQ questions

`day-NN.code.json` shape:

```json
{
  "day": 2,
  "topics": [
    {
      "name": "Operators",
      "subtopics": ["Arithmetic Operators", "..."]
    }
  ],
  "questions": [ ...exactly 20 code question objects... ]
}
```

`day-NN.mcq.json` shape:

```json
{
  "day": 2,
  "questions": [ ...exactly 20 MCQ question objects... ]
}
```

## Topic taxonomy (EXACT strings — do not rename or invent)

| Day | Topic name | Subtopics (exact list) |
|----|------------|------------------------|
| 1 | Introduction to Java | History and Features, JVM JDK and JRE, Running Java Programs, Uses of Java |
| 1 | Data Types and Variables | Class Structure and main Method, Packages, Primitive Data Types, Variables and Identifiers, Type Conversion |
| 2 | Operators | Arithmetic Operators, Relational Operators, Logical Operators, Bitwise Operators, Assignment Operators, Increment and Decrement, Ternary Operator, Type Casting, Operator Precedence, Special Operators |
| 3 | Control Statements | if and if-else, else-if Ladder, Nested if, switch Statement, break and continue |
| 4 | Looping Statements | for Loop, while Loop, do-while Loop, Enhanced For Loop, Nested Loops |
| 5 | Functions and Modular Programming | Method Declaration and Definition, Parameter Passing, Call by Value Semantics, Return Values, Static Methods, Modular Design |
| 6 | Recursion | Recursion Basics, Base and Recursive Case, Mathematical Recursion, Recursion on Strings, Recursion on Arrays, Recursion vs Iteration |
| 7 | 1D Arrays | Array Declaration and Initialization, Array Traversal, Array Input and Output, Aggregation Sum Min Max, Searching in Arrays, Array Reversal and Rotation |
| 8 | 2D Arrays | 2D Array Declaration, Matrix Input and Output, Matrix Addition and Subtraction, Matrix Multiplication, Transpose and Diagonals, Patterns Using Arrays |
| 9 | Strings | String Class Methods, String Comparison, Character Extraction, StringBuilder, String Reversal, Palindrome and Anagrams |
| 10 | Introduction to OOP | Encapsulation, Abstraction, Inheritance Overview, Polymorphism Overview, Classes vs Objects |
| 11 | Classes and Objects | Creating Classes, Access Modifiers, Object Instantiation, Fields and Methods, Getters and Setters |
| 12 | Constructors and Overloading | Default Constructor, Parameterized Constructor, Constructor Overloading, Copy Constructors, this Keyword |
| 13 | Inheritance and Interfaces | Single and Multilevel Inheritance, Hierarchical Inheritance, Abstract Classes, Interfaces, Multiple Inheritance via Interfaces, super Keyword |
| 14 | Polymorphism | Method Overloading, Method Overriding, Dynamic Method Dispatch, Overriding with super, Covariant Returns |
| 15 | Exception Handling | try-catch Basics, Multiple Catch Blocks, finally Block, throw and throws, Custom Exceptions, Checked vs Unchecked |
| 16 | Collections Framework 1 | ArrayList Basics, ArrayList Operations, HashSet, Set Operations, Iterators |
| 17 | Collections Framework 2 | PriorityQueue Basics, PriorityQueue Operations, HashMap Basics, HashMap Operations, Frequency Counting with Maps |
| 18 | Multithreading and Concurrency | Creating Threads, Runnable Interface, Thread Lifecycle, Synchronization, Thread Methods |
| 19 | Generics and Lambda Expressions | Generic Classes, Generic Methods, Bounded Type Parameters, Functional Interfaces, Lambda Expressions, Built-in Functional Interfaces |
| 20 | File Handling in Java | File Reading, File Writing, Serialization, Deserialization |

Day 1 has TWO topics: 10 code + 10 MCQ per topic. All other days have ONE topic
with 20 code + 20 MCQ.

## Per-day difficulty matrix (STRICT)

### Code questions (20 per day, one topic days)

| Difficulty | Count | Requirements |
|-----------|-------|--------------|
| easy | 10 | 6 marked `"variant": "basic"` + 4 marked `"variant": "scenario"` (real-world scenario flavored). blacklist `""`, whitelist `""`. maxscore 10 |
| medium | 6 | ALL scenario-based. MUST have non-empty `blacklist` AND non-empty `whitelist`. maxscore 20 |
| hard | 4 | Extreme scenario-based with multi-step logic. MUST have non-empty `blacklist` AND non-empty `whitelist`. maxscore 30 |

### Day 1 (two topics): per topic — 10 code questions: 5 easy (3 basic + 2 scenario), 3 medium (blacklist+whitelist), 2 hard (blacklist+whitelist). Same for MCQs: 5 easy, 3 medium, 2 hard.

### MCQ questions (20 per day)

| Difficulty | Count |
|-----------|-------|
| easy | 10 |
| medium | 6 |
| hard | 4 |

The `variant` field ("basic"/"scenario") is generator metadata only — it is NOT
stored in the database. Keep it in the JSON for auditability.

## Code question object schema

```json
{
  "title": "Unique descriptive title (no day prefix)",
  "description": "plain text problem statement",
  "difficulty": "easy|medium|hard",
  "variant": "basic|scenario",
  "maxscore": 10,
  "lang": "java",
  "topic": "<exact Topic name from taxonomy>",
  "subtopic": "<exact Subtopic string from that topic's list>",
  "sampleinput1": "non-empty input line(s)",
  "sampleoutput1": "exact expected stdout",
  "sampleinput2": "non-empty input line(s)",
  "sampleoutput2": "exact expected stdout",
  "input1": "non-empty", "output1": "exact expected stdout",
  "input2": "non-empty", "output2": "exact expected stdout",
  "input3": "non-empty", "output3": "exact expected stdout",
  "inputconstrains": "short constraint string, e.g. 1 <= n <= 1000",
  "blacklist": "comma separated substrings or empty string",
  "whitelist": "comma separated substrings or empty string",
  "sourcecode": "COMPLETE working Java solution (public class Main)"
}
```

### Description format (plain text — the UI renders it verbatim)

```
<1-4 sentence problem statement. Scenario questions tell a short concrete story.>

Input Format:
<exactly how stdin is structured>

Output Format:
<exactly what to print>

Constraints:
<repeat inputconstrains in words>
```

Use `\n` newlines inside the JSON string for the sections. Keep descriptions
self-contained (students start from an empty editor).

### Java solution rules (MANDATORY)

1. Single file, `public class Main` with `public static void main(String[] args)`.
2. Read stdin with `java.util.Scanner` (token methods `nextInt/nextLong/nextDouble/next`),
   or line-based `Integer.parseInt(sc.nextLine().trim())` / `sc.nextLine().trim()`.
   NEVER mix `nextInt()` followed by `nextLine()` — parse ints from `sc.nextLine()`
   instead when line-follows-number input is needed.
3. **NEVER use a backslash character anywhere in Java source code** (no `\n`, `\t`,
   `\\`, `\"`, regex escapes, unicode escapes). Print each line with its own
   `System.out.println`. If a literal double quote is unavoidable use
   `char q = '"';` concatenation. Regex (String.split with regex metachars,
   replaceAll patterns) is FORBIDDEN — use String.split with plain literals,
   charAt, or manual parsing. The validator rejects any source containing a backslash.
4. Java-8-compatible syntax only: NO `var`, NO switch expressions, NO records,
   NO text blocks, NO pattern matching. Enhanced-for, generics, lambdas,
   `String.format`, `StringBuilder`, collections are fine.
5. Deterministic output ONLY. No randomness (no `Random` without a fixed seed —
   better: no randomness at all), no current time (`System.currentTimeMillis`,
   `new Date()`), no unordered iteration over HashMap/HashSet in OUTPUT paths.
   Threads (day 18) must be fully ordered with `join()` before printing.
6. Performance: every test case must finish in well under 2 seconds. Prefer O(n)
   / O(n log n) designs; n <= 10^5 for loops, matrix sizes <= 100x100.
7. The reference solution MUST satisfy its own blacklist/whitelist checks
   (blacklisted substrings absent, every whitelisted substring present). The
   Lambda enforces this server-side and the validator will fail otherwise.
8. Numeric output: integers printed with `System.out.println(longOrInt)`.
   Doubles: always `System.out.printf("%.2f%n", value)` (Lambda prints dot
   decimal — verified) unless the problem says otherwise; expected outputs use
   the same 2-decimal form.
9. Boolean output: lowercase `true`/`false` via println(boolean).
10. No prompts, no debug text, no "Enter a number" — print ONLY the required output.

### Input rules

- Every question READS stdin (all inputs non-empty). Even "print a pattern"
  questions parameterize via stdin (e.g. size n).
- Prefer single-line space-separated values read as tokens.
- Strings with spaces: one line via `sc.nextLine().trim()`.
- Matrices: first line `r c`, then r rows of c space-separated integers (token
  reading handles this cleanly).
- Input values must respect `inputconstrains` in ALL samples and test cases.

### Output comparison semantics

The judge normalizes output before comparing: CRLF→LF, per-line trailing
whitespace stripped, trailing blank lines stripped, overall trim. Expected
outputs in JSON must match the program's stdout under this normalization.
Interior blank lines and leading spaces per line MATTER (only trailing per-line
spaces are stripped).

### Blacklist / whitelist design (medium + hard)

- Format: comma-separated substrings, e.g. `"Arrays.sort, Collections.sort"`.
- Blacklist: keywords that would trivialize the required algorithm or bypass the
  practiced construct (e.g. `Arrays.sort` for a sorting task, `StringBuilder.reverse`
  for a reversal task, `Math.pow` for a power task, `HashMap` when practicing arrays).
  1-6 items, short precise tokens. MUST NOT appear in the reference solution.
- Whitelist: constructs the solution is expected to use (e.g. `while`, `for`,
  `char[`, `switch`, `synchronized`, `implements`). 1-4 items. Every item MUST
  appear in the reference solution. Because matching is SUBSTRING-based, choose
  distinctive tokens — never single characters like `/` or ultra-common tokens
  that appear everywhere (e.g. `if` appears inside `verify`); prefer loop/construct
  tokens (`while(`, `for(`, `switch`) or type names (`char[`, `Scanner`, `int[`)
  that actually constrain the solution.
- Both fields are plain comma-separated strings (UI renders them as chips).

## MCQ question object schema

```json
{
  "title": "short question label",
  "description": "the full question text (if iscodesnippet, describes what the snippet does/prints)",
  "difficulty": "easy|medium|hard",
  "topic": "<exact Topic name>",
  "subtopic": "<exact Subtopic string>",
  "Option1": "...", "Option2": "...", "Option3": "...", "Option4": "...",
  "CorrectOption": 1,
  "iscodesnippet": false,
  "codesnippet": null,
  "snippetLang": null
}
```

- `CorrectOption` is the 1-based index of the correct option (1..4).
- All 4 options non-empty, distinct, plausible; no "All of the above".
- At least 6 of the 20 MCQs per day must be code-snippet MCQs
  (`iscodesnippet: true`, `codesnippet` = Java snippet, `snippetLang`: "java");
  concentrate snippets in medium/hard. Snippets follow the same no-backslash rule.
- Output-prediction snippets must be verified mentally with extreme care
  (integer division, string immutability, autoboxing, precedence, loop bounds).
  MCQs are NOT compiled — accuracy is on the author.

## Validation workflow (every agent MUST run)

```
cd /home/z/my-project
bun scripts/oops-java/validate.ts scripts/oops-java/data/day-NN.code.json scripts/oops-java/data/day-NN.mcq.json
```

- The validator parses JSON, enforces the structure/counts/difficulty matrix,
  then RUNS every code question's `sourcecode` against 5 cases (2 samples +
  3 test cases) on the Java Lambda compiler with its checks. Every case must
  report `Success`.
- Fix any failures (wrong expected output vs wrong solution logic — reason
  carefully; the solution defines truth ONLY if the logic is demonstrably
  correct for the stated problem) and re-run until the validator exits 0.
- Do not weaken test cases to make them pass; fix the data.
