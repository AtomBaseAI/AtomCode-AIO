# AtomCode — "Ruby Programming" Question Bank Conventions

This document defines the EXACT conventions for generating day-wise question data
for the question group **"Ruby Programming"**. Agents generating
`data/day-NN.code.json` / `data/day-NN.mcq.json` files MUST follow every rule
here. The validator (`scripts/ruby-programming/validate.ts`) enforces them
mechanically; the AWS Lambda Ruby compiler (the same image that handles
python/javascript/typescript/sql) is the source of truth for execution and
accepts `language: "ruby"`.

CRITICAL: this is a FRESH, Ruby-native question bank. Do NOT read, copy, adapt
or port questions from the "OOPS using JAVA" bank (`scripts/oops-java/`),
the "PYTHON Programming" bank (`scripts/python-programming/`),
the "C Programming" bank (`scripts/c-programming/`), or the OOPS using CPP
bank (`scripts/cpp-bank/`). Every scenario, story, dataset, snippet and
solution must be authored from scratch, idiomatic Ruby. Zero tolerance for
repeats.

## File layout

Each day produces TWO JSON files in `/home/z/my-project/scripts/ruby-programming/data/`:

- `day-NN.code.json` — 20 code questions
- `day-NN.mcq.json`  — 20 MCQ questions

### HOW TO AUTHOR (build scripts — never hand-write raw JSON)

Because Ruby source contains quotes, newlines, `#{}` interpolations and regex
literals, NEVER hand-write the JSON directly. For each day write a small
TypeScript builder `scripts/ruby-programming/builders/build-day-NN.ts` that
defines the question objects as TS literals (Ruby code inside template literals)
and writes the JSON files:

```ts
import { writeFileSync } from "node:fs";
const DAY = N;
const TOPIC = "<exact topic name from taxonomy.ts>";
const SUBTOPICS = [ /* exact subtopic strings from taxonomy.ts */ ];
const questions = [ /* 20 code question objects */ ];
const mcqs = [ /* 20 MCQ question objects */ ];
const d = String(DAY).padStart(2, "0");
writeFileSync(`scripts/ruby-programming/data/day-${d}.code.json`,
  JSON.stringify({ day: DAY, topics: [{ name: TOPIC, subtopics: SUBTOPICS }], questions }, null, 2));
writeFileSync(`scripts/ruby-programming/data/day-${d}.mcq.json`,
  JSON.stringify({ day: DAY, questions: mcqs }, null, 2));
console.log("wrote day", DAY);
```

Run it with `bun scripts/ruby-programming/builders/build-day-NN.ts` (from
`/home/z/my-project`). Template literals handle Ruby code verbatim; the only
characters to escape inside them are backticks and `${`. Ruby `#{...}` string
interpolation uses `{}` only — safe in TS template literals.

## Topic taxonomy (EXACT strings — imported from taxonomy.ts)

One topic per day. Exact names live in `scripts/ruby-programming/taxonomy.ts`.

| Day | Topic name |
|-----|------------|
| 1 | Introduction to Ruby |
| 2 | Ruby Syntax and Data Types |
| 3 | Operators |
| 4 | Control Flow |
| 5 | Loops and Iterators |
| 6 | Methods |
| 7 | Arrays |
| 8 | Hashes |
| 9 | Strings |
| 10 | Symbols and Ranges |
| 11 | Blocks Procs and Lambdas |
| 12 | Exception Handling |
| 13 | Modules and Mixins |
| 14 | Object-Oriented Programming Basics |
| 15 | Inheritance and Class Design |
| 16 | Metaprogramming Basics |
| 17 | File Handling |
| 18 | Regular Expressions |
| 19 | Threads and Concurrency |
| 20 | Gems and Standard Library |

Every question's `topic` must equal the day's topic name exactly and `subtopic`
must be one of that topic's exact subtopic strings (see taxonomy.ts).

## Per-day difficulty matrix (STRICT)

### Code questions (exactly 20 per day)

| Difficulty | Count | Requirements |
|-----------|-------|--------------|
| easy | 10 | 6 marked `"variant": "basic"` (drills) + 4 marked `"variant": "scenario"` (real-world scenario flavored). blacklist `""`, whitelist `""`. maxscore 10 |
| medium | 6 | ALL scenario-based. MUST have non-empty `blacklist` AND non-empty `whitelist`. maxscore 20 |
| hard | 4 | Extreme scenario-based with multi-step logic. MUST have non-empty `blacklist` AND non-empty `whitelist`. maxscore 30 |

### MCQ questions (exactly 20 per day)

| Difficulty | Count |
|-----------|-------|
| easy | 10 |
| medium | 6 |
| hard | 4 |

The `variant` field ("basic"/"scenario") is generator metadata only — NOT
stored in the database. Keep it in the JSON for auditability.

## Code question object schema

```json
{
  "title": "Unique descriptive title (no day prefix)",
  "description": "plain text problem statement",
  "difficulty": "easy|medium|hard",
  "variant": "basic|scenario",
  "maxscore": 10,
  "lang": "ruby",
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
  "sourcecode": "COMPLETE working Ruby solution"
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

Use `\n` newlines inside the JSON string for the sections.

### Ruby solution rules (MANDATORY)

1. Single-file Ruby program. Plain script style (top-level) or
   `def main; ... ; end; main` — both fine. MUST read stdin and print only the
   required output.
2. Read stdin with `gets` (one line, trailing newline stripped by `chomp` or
   `.to_i` / `.split`). For multiple tokens: `a, b = gets.split.map(&:to_i)`.
   For n-then-values: `n = gets.to_i` then loop `gets`. NEVER mix `gets` with
   `$stdin` or `STDIN` reads in the same program.
3. Backslashes ARE allowed in Ruby source — needed for `"\n"`, regex patterns
   `/\d+/`, `%r{}` literals. Use them deliberately.
4. Deterministic output ONLY:
   - NO current time (`Time.now`, `Date.today`) — construct fixed times
     explicitly when needed (Day 20 uses explicit `Time.new(2024, 5, 15)`).
   - NO randomness unless seeded (`srand(fixed)`) — prefer no randomness.
   - Hashes preserve insertion order in Ruby 1.9+ (safe to iterate directly),
     but **`Set` is unordered** — always `.sort` it before printing.
   - Threads (Day 19): always `.join` all threads before printing shared
     state; protect shared counters with `Mutex`.
5. Performance: every test case must finish in well under 2 seconds. Prefer
   O(n)/O(n log n); n <= 10^5 for loops, matrix sizes <= 100x100.
6. The reference solution MUST satisfy its own blacklist/whitelist checks
   (blacklisted substrings absent, every whitelisted substring present).
   The Lambda enforces this server-side; the validator fails otherwise.
7. Numeric output rules:
   - Integers: `puts n` or `p n` (use `puts` — `p` adds inspect-style quotes
     to strings).
   - Booleans: Ruby prints `true` / `false` — problems that ask for a
     boolean verdict print exactly that.
   - Any output that can be fractional (true division, averages, ratios,
     float money): print formatted to exactly 2 decimal places, e.g.
     `puts format("%.2f", avg)` or `puts "%.2f" % avg`. Expected outputs
     use the same 2-decimal form.
   - Arrays: `puts arr.join(" ")` for space-separated on one line; or
     `arr.each { |x| puts x }` for one-per-line.
8. No prompts ("Enter a number"), no debug text — print ONLY required output.
9. Day-specific integration notes (verified working on the judge):
   - File writes to `/tmp` are allowed (Day 17): write then read back a file
     like `/tmp/atom_ruby_scores.txt` inside the program; always close with
     `File.close` or use the block form `File.open(path, "w") { |f| ... }`.
   - `Thread.new` works (Day 19); always `thread.join`.
   - `require` works for standard library (`require "json"`, `require "csv"`,
     `require "date"`, `require "time"`, `require "set"`, `require "socket"`
     NOT for custom files — single-file execution only).
   - `eval`, `send`, `define_method`, `method_missing` all work (Day 16
     metaprogramming).
10. Ruby-idiomatic style: solutions should read like good Ruby 3.x (use
    `each`, `map`, `select`, `reduce`, blocks, hash literals, symbol keys).
    Medium/hard solutions should still stay readable — avoid clever one-liners
    that obscure intent.

### Input rules

- Every question READS stdin (all inputs non-empty). Even "print a pattern"
  questions parameterize via stdin (e.g. size n).
- Prefer single-line space-separated values read via `gets.split.map(&:to_i)`.
- Strings with spaces: one line via `gets.chomp`.
- Matrices: first line `r c`, then r rows of c space-separated integers.
- Input values must respect `inputconstrains` in ALL samples and test cases.

### Output comparison semantics

The judge normalizes output before comparing: CRLF→LF, per-line trailing
whitespace stripped, trailing blank lines stripped, overall trim. Expected
outputs in JSON must match the program's stdout under this normalization.

### Blacklist / whitelist design (medium + hard)

- Format: comma-separated substrings, e.g. `"sort, sort_by"`.
- Blacklist: keywords that would trivialize the required algorithm or bypass
  the practiced construct (e.g. `sort` or `.sort` for a sorting task,
  `.reverse` for a reversal task, `max`, `min` when practicing aggregation
  loops, `sum` when practicing loops, `each_with_index` when practicing
  manual indexing, `inject`/`reduce` when practicing accumulator loops,
  `group_by` when practicing hash counting, `chunk` for grouping tasks).
  1-6 items, short precise tokens. MUST NOT appear in the reference solution.
- Whitelist: constructs the solution is expected to use, e.g. `while `,
  `until `, `for `, `each`, `map`, `def `, `class `, `module `, `begin`,
  `rescue`, `yield`, `lambda`, `proc`, `->`, `File.open`, `File.read`,
  `Thread.new`, `Mutex.new`, `require `, `attr_accessor`, `initialize`,
  `send`, `define_method`, `match`, `scan`, `gsub`.
  1-4 items. Every item MUST appear in the reference solution. Because
  matching is SUBSTRING-based and case-sensitive, choose distinctive tokens —
  never single characters or ultra-common tokens; prefer construct tokens
  (`while `, `each do`, `each {`, `def `, `class `, `module `) or method
  names (`.sort`, `File.open`, `Thread.new`) that actually constrain the
  solution. VERIFY each whitelisted token occurs in the reference solution
  literally.
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
  (`iscodesnippet: true`, `codesnippet` = Ruby snippet, `snippetLang`: "ruby");
  concentrate snippets in medium/hard.
- Output-prediction snippets must be verified mentally with EXTREME care
  (integer division, `to_i` truncation, string interpolation, symbol vs
  string semantics, `nil` truthiness, `||=` semantics, blocks returning the
  last expression, `each` returning the receiver, `map` vs `each`, hash
  default values, `freeze`, `dup` vs `clone`, `respond_to?`, `include?` vs
  `include` in modules, exception hierarchies, `super` with/without
  parentheses, lambda vs proc arity strictness, `&block`, `*splat`,
  `**kwargs`, `self` in methods vs classes).
  MCQs are NOT compiled — accuracy is on the author. Doubly-check any
  snippet answer you are not 100% sure of and simplify the snippet until
  you are.

## Validation workflow (every agent MUST run, per day, until exit 0)

```
cd /home/z/my-project
set -a && . ./.env && set +a
bun scripts/ruby-programming/validate.ts scripts/ruby-programming/data/day-NN.code.json scripts/ruby-programming/data/day-NN.mcq.json
```

- The validator parses JSON, enforces structure/counts/difficulty matrix/
  taxonomy/global-title-uniqueness, then RUNS every code question's
  `sourcecode` against 5 cases (2 samples + 3 test cases) on the Ruby
  Lambda compiler with its checks. Every case must report Success.
- Fix any failures (wrong expected output vs wrong solution logic — reason
  carefully; the solution defines truth ONLY if the logic is demonstrably
  correct for the stated problem) and re-run until the validator exits 0.
- Do not weaken test cases to make them pass; fix the data.
