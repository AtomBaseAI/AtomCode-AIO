# AtomCode — "PYTHON Programming" Question Bank Conventions

This document defines the EXACT conventions for generating day-wise question data
for the question group **"PYTHON Programming"**. Agents generating
`data/day-NN.code.json` / `data/day-NN.mcq.json` files MUST follow every rule
here. The validator (`scripts/python-programming/validate.ts`) enforces them
mechanically; the Python AWS Lambda compiler is the source of truth for
execution.

CRITICAL: this is a FRESH, Python-native question bank. Do NOT read, copy,
adapt or port questions from the "OOPS using JAVA" bank
(`scripts/oops-java/`). Every scenario, story, dataset, snippet and solution
must be authored from scratch, idiomatic Python. Zero tolerance for repeats.

## File layout

Each day produces TWO JSON files in `/home/z/my-project/scripts/python-programming/data/`:

- `day-NN.code.json` — 20 code questions
- `day-NN.mcq.json`  — 20 MCQ questions

`day-NN.code.json` shape:

```json
{
  "day": 3,
  "topics": [
    { "name": "Operators", "subtopics": ["Arithmetic Operators", "..."] }
  ],
  "questions": [ ...exactly 20 code question objects... ]
}
```

`day-NN.mcq.json` shape:

```json
{
  "day": 3,
  "questions": [ ...exactly 20 MCQ question objects... ]
}
```

### HOW TO AUTHOR (build scripts — never hand-write raw JSON)

Because Python source contains quotes, newlines and (on regex day) backslashes,
NEVER hand-write the JSON directly. For each day write a small TypeScript
builder `scripts/python-programming/builders/build-day-NN.ts` that defines the
question objects as TS literals (Python code inside template literals) and
writes the JSON files:

```ts
import { writeFileSync } from "node:fs";
const topics = [{ name: "...", subtopics: ["..."] }];
const questions = [ /* 20 code question objects */ ];
const mcqs = [ /* 20 MCQ question objects */ ];
const d = String(NN).padStart(2, "0");
writeFileSync(`scripts/python-programming/data/day-${d}.code.json`,
  JSON.stringify({ day: NN, topics, questions }, null, 2));
writeFileSync(`scripts/python-programming/data/day-${d}.mcq.json`,
  JSON.stringify({ day: NN, questions: mcqs }, null, 2));
console.log("wrote day", NN);
```

Run it with `bun scripts/python-programming/builders/build-day-NN.ts` (from
`/home/z/my-project`). Template literals handle Python code verbatim; the only
characters to escape inside them are backticks and `${`. Python f-strings use
`{}` (safe). Avoid putting backticks or `${` in Python code entirely.

## Topic taxonomy (EXACT strings — imported from taxonomy.ts)

One topic per day (the PDF already separates intro/syntax into days 1 and 2).
Exact names live in `scripts/python-programming/taxonomy.ts` — the single
source of truth. Summary:

| Day | Topic name |
|-----|------------|
| 1 | Introduction to Python |
| 2 | Python Syntax and Data Types |
| 3 | Operators |
| 4 | Control Flow (if-else) |
| 5 | Loops |
| 6 | Functions and Lambda |
| 7 | Lists and Tuples |
| 8 | Dictionaries and Sets |
| 9 | String Manipulation |
| 10 | Error Handling and Exceptions |
| 11 | Modules and Packages |
| 12 | Comprehensions |
| 13 | Object-Oriented Programming (OOP) |
| 14 | Inheritance |
| 15 | Polymorphism |
| 16 | Decorators and Generators |
| 17 | Working with Dates and Times |
| 18 | Regular Expressions |
| 19 | Multithreading and Concurrency |
| 20 | File Handling |

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
  "lang": "python",
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
  "sourcecode": "COMPLETE working Python 3 solution"
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

### Python solution rules (MANDATORY)

1. Single-file Python 3 program. Plain script style or `def main():` +
   call — both fine. MUST read stdin and print only the required output.
2. Read stdin with `input()` (one line, trailing newline stripped, spaces kept)
   or tokens via `list(map(int, input().split()))` / `a, b = input().split()`.
   For n-then-values: `n = int(input())` then loop `input()`. NEVER mix
   `input()` with `sys.stdin` reads in the same program. Multi-line input is
   fine with a loop of `input()`.
3. Deterministic output ONLY:
   - NO current time (`datetime.now()`, `date.today()`, `time.time()`) — construct
     fixed datetimes instead (Day 17 uses explicit `datetime(2024, 5, 15)` style).
   - NO randomness unless seeded (`random.seed(fixed)`); prefer no randomness.
   - Sets are unordered — NEVER print a set directly; always `sorted(...)` it
     for output. Dict iteration is insertion-ordered (safe).
   - Threads (Day 19) and coroutines: `join()`/gather everything BEFORE printing;
     shared-state counters must be lock-protected AND given disjoint work so the
     final output is fully deterministic.
4. Performance: every test case must finish in well under 2 seconds. Prefer
   O(n)/O(n log n); n <= 10^5 for loops, matrix sizes <= 100x100.
5. The reference solution MUST satisfy its own blacklist/whitelist checks
   (blacklisted substrings absent, every whitelisted substring present).
   The Lambda enforces this server-side; the validator fails otherwise.
6. Numeric output rules:
   - Integers: `print(n)`.
   - Python prints booleans as `True` / `False` — problems that ask for a
     boolean verdict print exactly that capitalization.
   - Any output that can be fractional (true division, averages, ratios,
     float money): print formatted to exactly 2 decimal places with an
     f-string, e.g. `print(f"{avg:.2f}")`. Expected outputs use the same
     2-decimal form. Avoid printing bare floats (repr noise like 0.30000000000000004).
   - Negative zero / rounding: prefer f-string `:.2f` which rounds half-to-even
     — make expected outputs match by computing them from the same rule.
7. No prompts ("Enter a number"), no debug text — print ONLY required output.
8. Backslashes ARE allowed in Python source (unlike the Java bank) — needed
   for `"\n".join(...)`, regex patterns (Day 18 uses raw strings `r"..."`).
   Use them deliberately and sparingly; the builder emits them verbatim.
9. Day-specific integration notes (verified working on the judge):
   - File writes to `/tmp` are allowed (Day 20): write then read back a file
     like `/tmp/atom_scores.txt` inside the program; use `try/except` around
     operations, always close or use `with`.
   - `asyncio.run(...)` works (Day 19).
   - `import threading` works (Day 19).
   - Custom module imports are IMPOSSIBLE (single-file execution) — Day 11
     questions must use standard-library modules and the `__name__` idiom only.
10. Python-idiomatic style: solutions should read like good Python 3
    (f-strings, comprehensions where natural on Day 12, `with` on Day 20,
    unpacking on Day 7). Medium/hard solutions should still stay readable.

### Input rules

- Every question READS stdin (all inputs non-empty). Even "print a pattern"
  questions parameterize via stdin (e.g. size n).
- Prefer single-line space-separated values read as tokens.
- Strings with spaces: one line via `input()`.
- Matrices: first line `r c`, then r rows of c space-separated integers
  (token reading handles this cleanly).
- Input values must respect `inputconstrains` in ALL samples and test cases.

### Output comparison semantics

The judge normalizes output before comparing: CRLF→LF, per-line trailing
whitespace stripped, trailing blank lines stripped, overall trim. Expected
outputs in JSON must match the program's stdout under this normalization.
Interior blank lines and leading spaces per line MATTER (only trailing
per-line spaces are stripped).

### Blacklist / whitelist design (medium + hard)

- Format: comma-separated substrings, e.g. `"sorted(, .sort("`.
- Blacklist: keywords that would trivialize the required algorithm or bypass
  the practiced construct (e.g. `sorted(` or `.sort(` for sorting tasks,
  `[::-1]` / `reversed(` for reversal tasks, `max(` / `min(` when practicing
  aggregation loops, `pow(` / `**` for exponentiation-by-loop tasks,
  `Counter(` when practicing dict counting, `sum(` when practicing loops).
  1-6 items, short precise tokens. MUST NOT appear in the reference solution.
- Whitelist: constructs the solution is expected to use, e.g. `while`,
  `for `, `def `, `range(`, `.append(`, `try:`, `except`, `with open(`,
  `yield`, `async def`, `class `, `__init__`, `re.findall`, `lambda`.
  1-4 items. Every item MUST appear in the reference solution. Because
  matching is SUBSTRING-based and case-sensitive, choose distinctive tokens —
  never single characters or ultra-common tokens that appear everywhere
  (`f` alone, `in` alone); prefer construct tokens (`while`, `for i in`,
  `def `, `try:`) or method/type names (`.append(`, `dict(`, `class `)
  that actually constrain the solution. VERIFY each whitelisted token occurs
  in the reference solution literally.
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
  (`iscodesnippet: true`, `codesnippet` = Python snippet, `snippetLang`:
  "python"); concentrate snippets in medium/hard.
- Output-prediction snippets must be verified mentally with EXTREME care
  (true vs floor division `/` vs `//`, `print` of floats and booleans, string
  immutability, list aliasing, set/dict semantics, operator precedence,
  `range` bounds, f-string formatting). MCQs are NOT compiled — accuracy is
  on the author. Doubly-check any snippet answer you are not 100% sure of and
  simplify the snippet until you are.
- Snippet output lines: `print()` adds a newline — a snippet printing two
  values via two `print` calls produces two output lines; describe/option that
  accordingly.

## Validation workflow (every agent MUST run, per day, until exit 0)

```
cd /home/z/my-project
bun scripts/python-programming/validate.ts scripts/python-programming/data/day-NN.code.json scripts/python-programming/data/day-NN.mcq.json
```

- The validator parses JSON, enforces structure/counts/difficulty matrix/
  taxonomy/global-title-uniqueness, then RUNS every code question's
  `sourcecode` against 5 cases (2 samples + 3 test cases) on the Python
  Lambda compiler with its checks. Every case must report Success.
- Fix any failures (wrong expected output vs wrong solution logic — reason
  carefully; the solution defines truth ONLY if the logic is demonstrably
  correct for the stated problem) and re-run until the validator exits 0.
- Do not weaken test cases to make them pass; fix the data.
