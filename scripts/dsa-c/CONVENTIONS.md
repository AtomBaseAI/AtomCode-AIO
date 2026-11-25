# DSA Using C — Bank Conventions

## Layout
- `data/day-NN.code.json` — 20 code questions per day (canonical seed source).
- `data/day-NN.mcq.json` — 20 MCQ questions per day (`{ day, questions }`, no `_id`).
- `builders/` — per-day generator scripts that emit the data files.
- `seed.ts` — idempotent DB seeder (`bun scripts/dsa-c/seed.ts`).
- `taxonomy.ts` — the 20-day topic map (Day N topic = index N-1).
- `validate.ts` — static checks (`bun scripts/dsa-c/validate.ts`).
- Repo-wide judge sweep: `node scripts/preflight-dsa.mjs dsa-c`.

## Code question contract
- `sourcecode` MUST be a COMPLETE standalone c program: int main(void) reading stdin and printing output.
- The judge (AWS Lambda for c) runs the code verbatim per testcase:
  stdin per the documented Input Format, stdout compared to expectedOutput
  (trailing whitespace per line and trailing blank lines ignored).
- Never rely on a "harness is set up" promise — none exists at judge time.
- Testcase slots (sample1/2 + hidden 1-3) are ground truth; slots with empty
  expected output are placeholders and are skipped by the judge.
- `blacklist`/`whitelist` are comma-separated keyword lists enforced on the
  student submission AND honored by every reference solution here.
- Java: class `Main`, `main()` as FIRST member (judge detectMainClass scans
  800 chars after the first `class X {`).
- Tree serializations use level-order with `-1` = missing child; the declared
  `n` may be understated — consume the whole token line.

## Seed title policy (documented deviation)
The four DSA banks intentionally share ~200 curriculum titles across languages
(`DSA-vs-DSA` duplicates are allowed). Titles colliding with non-DSA groups are
reported as warnings by seed.ts (they already coexist in the database).

## History
The original per-day builders were lost in a workspace reset. The data files
were reconstructed by repairing the database content: every reference solution
was regenerated as a complete stdin→stdout program and verified against the
real judge (all 5 testcase slots per question). The builders in `builders/`
are the audit trail of that repair.
