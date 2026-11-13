# AtomCode — "C Programming" Question Bank Conventions

This document defines the EXACT conventions for generating day-wise question data
for the question group **"C Programming"**. Agents generating
`data/day-NN.code.json` / `data/day-NN.mcq.json` files MUST follow every rule
here. The validator (`scripts/c-programming/validate.ts`) enforces them
mechanically; the AWS Lambda GCC compiler (the same image that serves `cpp`)
is the source of truth for execution and accepts `language: "c"`.

CRITICAL: this is a FRESH, C-native question bank. Do NOT read, copy, adapt
or port questions from the "OOPS using JAVA" bank (`scripts/oops-java/`) or
the "PYTHON Programming" bank (`scripts/python-programming/`). Every scenario,
story, dataset, snippet and solution must be authored from scratch, idiomatic C.
Zero tolerance for repeats.

## File layout

Each day produces TWO JSON files in `/home/z/my-project/scripts/c-programming/data/`:

- `day-NN.code.json` — 20 code questions
- `day-NN.mcq.json`  — 20 MCQ questions

`day-NN.code.json` shape:

```json
{
  "day": 3,
  "topics": [
    { "name": "Control Flow (if-else, switch)", "subtopics": ["if and if-else Statements", "..."] }
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

Because C source contains double quotes, format specifiers (`%d`, `%s`, `\n`)
and preprocessor directives, NEVER hand-write the JSON directly. For each day
write a small TypeScript builder `scripts/c-programming/builders/build-day-NN.ts`
that defines the question objects as TS literals (C code inside template
literals) and writes the JSON files:

```ts
import { writeFileSync } from "node:fs";
const DAY = NN;
const TOPIC = "<exact topic name from taxonomy.ts>";
const SUBTOPICS = [ /* exact subtopic strings from taxonomy.ts */ ];
const questions = [ /* 20 code question objects */ ];
const mcqs = [ /* 20 MCQ question objects */ ];
const d = String(NN).padStart(2, "0");
writeFileSync(`scripts/c-programming/data/day-${d}.code.json`,
  JSON.stringify({ day: NN, topics: [{ name: TOPIC, subtopics: SUBTOPICS }], questions }, null, 2));
writeFileSync(`scripts/c-programming/data/day-${d}.mcq.json`,
  JSON.stringify({ day: NN, questions: mcqs }, null, 2));
console.log("wrote day", NN);
```

Run it with `bun scripts/c-programming/builders/build-day-NN.ts` (from
`/home/z/my-project`). Template literals handle C code verbatim; the only
characters to escape inside them are backticks and `${`. C format specifiers
(`%d`, `%s`) and escape sequences (`\n`, `\t`, `\\`, `\"`) are SAFE inside
template literals. Avoid putting backticks or `${` in C code entirely.

## Topic taxonomy (EXACT strings — imported from taxonomy.ts)

One topic per day (Day 1 consolidates the PDF's intro/syntax/types rows into
a single "Introduction to C Programming" topic). Exact names live in
`scripts/c-programming/taxonomy.ts` — the single source of truth. Summary:

| Day | Topic name |
|-----|------------|
| 1 | Introduction to C Programming |
| 2 | Operators |
| 3 | Control Flow (if-else, switch) |
| 4 | Looping Statements |
| 5 | Functions and Modular Programming |
| 6 | Recursion and Inline Functions |
| 7 | 1D Arrays |
| 8 | 2D Arrays |
| 9 | Strings |
| 10 | Array Patterns |
| 11 | String Manipulation |
| 12 | Pointers and Memory Management |
| 13 | Structures and Unions |
| 14 | Preprocessor Directives |
| 15 | Dynamic Memory Allocation |
| 16 | Bitwise Operations |
| 17 | Command-Line Arguments |
| 18 | Error Handling |
| 19 | Advanced Topics (Enumerations, Typedef) |
| 20 | File Handling in C |

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
  "lang": "c",
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
  "sourcecode": "COMPLETE working C solution"
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

### C solution rules (MANDATORY)

1. Single-file C99/C11 program. MUST include the headers it uses
   (`#include <stdio.h>`, `<stdlib.h>`, `<string.h>`, `<math.h>`, `<ctype.h>`,
   `<time.h>`, `<errno.h>`, `<stdint.h>` as needed). Use `int main(void)` or
   `int main(int argc, char *argv[])` (Day 17 only). ALWAYS `return 0;` from
   main on success.
2. Read stdin with `scanf` (tokens), `fgets` (lines), or `getchar` (chars).
   NEVER use `gets` — it is removed from C11 and the compiler rejects it;
   use `fgets(buf, sizeof(buf), stdin)` and strip the trailing `\n` manually
   when needed. Print only the required output via `printf` / `putchar` /
   `fputs(..., stdout)`.
3. Backslashes ARE allowed in C source (unlike the Java bank) — `\n`, `\t`,
   `\\`, `\"` are normal in C string literals and the builder emits them
   verbatim. Use them deliberately (e.g. `printf("Sum = %d\n", s);`).
4. Deterministic output ONLY:
   - NO current time (`time(NULL)`, `clock()`) — construct fixed timestamps
     explicitly when needed (Day 20 file dates use fixed constants).
   - NO randomness unless seeded (`srand(fixed_seed)`); prefer no randomness.
   - NO reliance on uninitialized memory, NO reliance on pointer addresses
     in output (never print `%p` for a stack pointer — output is non-deterministic).
   - Iteration over hash-like structures is N/A in C (no built-in).
5. Performance: every test case must finish in well under 2 seconds. Prefer
   O(n)/O(n log n); n <= 10^5 for loops, matrix sizes <= 100x100, string
   buffers <= 10^5 chars. Avoid `qsort` for tiny inputs where a hand-written
   loop is the practice target.
6. The reference solution MUST satisfy its own blacklist/whitelist checks
   (blacklisted substrings absent, every whitelisted substring present).
   The Lambda enforces this server-side; the validator fails otherwise.
7. Numeric output rules:
   - Integers: `printf("%d\n", n)` (int) or `printf("%lld\n", n)` (long long).
     Choose the type that fits the constraint range — for n <= 10^9 use
     `long long` to be safe; for n <= 2*10^9 use `long long` for products.
   - Doubles: always `printf("%.2f\n", x)` (2 decimal places) unless the
     problem says otherwise; expected outputs use the same 2-decimal form.
     Avoid printing bare doubles (e.g. `printf("%f", x)` prints 6 trailing
     zeros which mismatches expected `%.2f`).
   - Characters: `printf("%c\n", c)` or `putchar(c); putchar('\n');`.
   - Strings: `printf("%s\n", s)` or `puts(s)`.
8. No prompts ("Enter a number"), no debug text — print ONLY required output.
9. Day-specific integration notes (verified working on the judge):
   - `argc`/`argv` ARE available (Day 17) — the test harness injects the
     argv tokens by sending them as the FIRST input line space-separated;
     the question description must spell out how argv is supplied.
   - `malloc`/`calloc`/`realloc`/`free` work (Day 15) — always `free` before
     `return 0;` to avoid memory leaks (the Lambda does NOT report leaks,
     but the curriculum requires it).
   - File writes to `/tmp` are allowed (Day 20): `fopen("/tmp/atom_*.txt", ...)`,
     write then read back, always check the return of `fopen` for NULL,
     always `fclose`. Use `tmpfile()` or fixed `/tmp/` paths — both work.
   - `perror` and `errno` work (Day 18).
   - Bitwise operators and shifts work on `unsigned` and `int` (Day 16).
   - `inline` functions compile fine (Day 6).
10. C-idiomatic style: solutions should read like good C99 (clear variable
    names, helper functions for non-trivial logic, `const` where applicable,
    `size_t` for sizes, `int` for small counts, `long long` for big products).
    Medium/hard solutions should still stay readable — avoid clever macro
    hacks that obscure intent.

### Input rules

- Every question READS stdin (all inputs non-empty). Even "print a pattern"
  questions parameterize via stdin (e.g. size n).
- Prefer single-line space-separated values read via `scanf("%d %d", &a, &b)`.
- Strings with spaces: one line via `fgets(buf, sizeof(buf), stdin)` then
  strip the trailing newline manually: `buf[strcspn(buf, "\n")] = 0;`.
- Matrices: first line `r c`, then r rows of c space-separated integers
  (`scanf("%d", &mat[i][j])` per cell handles this cleanly).
- Input values must respect `inputconstrains` in ALL samples and test cases.

### Output comparison semantics

The judge normalizes output before comparing: CRLF→LF, per-line trailing
whitespace stripped, trailing blank lines stripped, overall trim. Expected
outputs in JSON must match the program's stdout under this normalization.
Interior blank lines and leading spaces per line MATTER (only trailing
per-line spaces are stripped).

### Blacklist / whitelist design (medium + hard)

- Format: comma-separated substrings, e.g. `"qsort, bsearch"`.
- Blacklist: keywords that would trivialize the required algorithm or bypass
  the practiced construct (e.g. `qsort` for a sort task, `strlen` for a
  length task, `strcpy`/`strcat` for a copy/concat task, `strcmp` for a
  compare task, `strrev` for reversal, `pow`/`sqrt` for math tasks,
  `atoi`/`atof` for conversion tasks, `memcpy`/`memset` for fill/copy tasks,
  `sizeof` when practicing pointer arithmetic, `scanf` when practicing
  `getchar` parsing). 1-6 items, short precise tokens. MUST NOT appear in
  the reference solution.
- Whitelist: constructs the solution is expected to use, e.g. `for (`, `while (`,
  `do {`, `if (`, `switch (`, `int *`, `char *`, `void *`, `struct `,
  `union `, `enum `, `typedef`, `#define`, `#ifdef`, `#include`, `malloc(`,
  `calloc(`, `realloc(`, `free(`, `argc`, `argv`, `fopen(`, `fclose(`,
  `fread(`, `fwrite(`, `printf(`, `scanf(`, `getchar(`, `putchar(`, `fgets(`,
  `fputs(`, `*ptr`, `>>`, `<<`, `&=`, `|=`, `^=`, `~`, `errno`, `perror(`,
  `exit(`, `return 0`, `static `, `inline `, `void *`, `int main`.
  1-4 items. Every item MUST appear in the reference solution. Because
  matching is SUBSTRING-based and case-sensitive, choose distinctive tokens —
  never single characters or ultra-common tokens that appear everywhere
  (`f` alone, `i` alone); prefer construct tokens (`for (`, `while (`,
  `do {`) or type/method names (`int *`, `char *`, `malloc(`, `struct `)
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
  (`iscodesnippet: true`, `codesnippet` = C snippet, `snippetLang`: "c");
  concentrate snippets in medium/hard.
- Output-prediction snippets must be verified mentally with EXTREME care
  (integer division, pointer arithmetic, signed vs unsigned shifts, operator
  precedence, short-circuit evaluation, struct padding N/A for member
  access, `printf` format specifier behaviour, `sizeof` results, post/pre
  increment, dangling else, array-to-pointer decay, `strncpy` not
  null-terminating on overflow, `malloc` returning uninitialized memory).
  MCQs are NOT compiled — accuracy is on the author. Doubly-check any
  snippet answer you are not 100% sure of and simplify the snippet until
  you are.
- Snippet output lines: `printf()` adds a newline per call — a snippet
  printing two values via two `printf` calls produces two output lines;
  describe/option that accordingly.

## Validation workflow (every agent MUST run, per day, until exit 0)

```
cd /home/z/my-project
bun scripts/c-programming/validate.ts scripts/c-programming/data/day-NN.code.json scripts/c-programming/data/day-NN.mcq.json
```

- The validator parses JSON, enforces structure/counts/difficulty matrix/
  taxonomy/global-title-uniqueness, then RUNS every code question's
  `sourcecode` against 5 cases (2 samples + 3 test cases) on the C
  Lambda compiler with its checks. Every case must report Success.
- Fix any failures (wrong expected output vs wrong solution logic — reason
  carefully; the solution defines truth ONLY if the logic is demonstrably
  correct for the stated problem) and re-run until the validator exits 0.
- Do not weaken test cases to make them pass; fix the data.
