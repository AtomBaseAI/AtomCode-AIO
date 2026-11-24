# 07 — Execution Engine

**What this file is for:** where each language actually executes, the runtime-registry concept, the test-case judging flows, the cheat-integrity rules around hidden tests, and the dev-only emulator. Read before touching any code execution path.

## Language routing (source of truth: `src/lib/runtime-registry.ts`)

| Language | Mode | Backend | Route | Profiles |
|---|---|---|---|---|
| Python | lambda | Lambda CPython image | `/api/execute/lambda` | `python-3.11` … `python-3.14` |
| SQL (SQLite) | lambda | sql.js in-memory inside the Lambda handler | `/api/execute/lambda` | `sqlite-3.54` |
| JavaScript | lambda | Node 20 image | `/api/execute/lambda` | `javascript-browser` |
| TypeScript | lambda | tsc transpile → Node 20 | `/api/execute/lambda` | `typescript-5.9` |
| Ruby | lambda | CRuby image | `/api/execute/lambda` | `ruby-3.4` |
| C | native-server | App-server gcc | `/api/execute/native` | `c-c99`, `c-c11`, `c-c17` |
| C++ | native-server | App-server g++ | `/api/execute/native` | `cpp-cpp11` … `cpp-cpp20` |
| Java | native-server | ECJ jar (self-hosted, `public/runtimes/ecj/`) + OpenJDK 21 JVM | `/api/execute/native` | `java-8`, `java-11`, `java-17` |

Key facts:

- `LanguageId = c | cpp | java | python | sql | javascript | typescript | ruby`; each `RuntimeProfile` carries `mode: "lambda" | "native-server"`, `verified`, feature flags, `defaultTimeoutMs`, and UI ordering.
- The browser WASM engine was removed from the web app; the Electron desktop client still bundles its own engine (pyodide 0.25–0.28/314, sqlite-wasm, ruby wasm, clang worker) under `Desktop_Clients/electron/renderer/`.
- Per-language version choice is persisted in `localStorage` under `atomcode:runtime-version:<lang>` (`resolveProfile` falls back to default).

## End-to-end flows

### 1. Playground / single run (client facade `src/lib/judge.ts`)

```
UI → judgeRunSingle()
   → lambdaJudgeConfigured()  (GET /api/execute/lambda probe, cached per session)
   → POST /api/execute/lambda (session) → Lambda Function URL (+ x-atom-token)
   → fallback: POST /api/execute/native (session) for c/cpp/java
   → normalizeOutput() compare (trailing whitespace, CRLF, trailing blank lines)
```

- Verdicts: `compileMessage ∈ "Success" | "Failed" | "Error"` (Success = ran and matched; Failed = ran, output differs; Error = compile/runtime failure).
- SQL `headerCode` is prepended to the student query by `composeUserCode()` (setup SQL first, student query next).
- Timeout clamps: judge transport 100ms–180s; native run 1s–60s; native compile 30s.

### 2. Hidden test-case judging for students (TARGET — in flight)

```
Student code view → POST /api/execute/testcases (session)
  body   : { questionId, code, language, uaid? }
  server : src/lib/question-judge.ts → judgeQuestionTests(questionId, code, language, opts)
           loads the question server-side (samples for display, input1..3/output1..3 hidden),
           runs via Lambda (one multi-testcase call) or native executor,
           applies quotas (exec 10/min + 150/day) + concurrency semaphore (6)
  reply  : { ok, results: [{ pass, actual, error? }], score, maxScore }
```

Rules: the endpoint judges server-side, NEVER returns `output1..3` or `sourcecode`, and returns `score`/`maxScore` computed from per-case passes. `uaid` scopes assessment runs to an active attempt. Web code views must call this endpoint — they must not fetch hidden test data.

### 3. Admin question verifier

`POST /api/questions/test` (`requireAdminApi`) runs each question's 2 sample + 3 hidden cases through `lambdaJudgeMultiRun` (`src/lib/lambda-judge-server.ts`, one Lambda multi-testcase call per question, batch ≤ 100, concurrency 8) and persists `testStatus` / `testResults` (`[s1,s2,h1,h2,h3]` booleans) / `testedAt` on the question row.

### 4. Desktop runs

- Compiled languages: `POST /api/desktop/run` → `executeNative` server-side; enrollment/attempt checked; only pass/fail + actual program output returned.
- Engine languages (python/sql/ruby/js/ts): module payload includes hidden test data; bundled WASM runtime judges locally in the Electron renderer (accepted risk — see `06-security-model.md`).

## Lambda judge stack (`compilers/`)

| Piece | Detail |
|---|---|
| Handler | `compilers/functions/_shared/handler.mjs` — ONE Node 20 ESM handler drives all 8 languages; per-image `langspec.json` describes the toolchain; all-in-one image ships every langspec |
| Protocols | (1) single-run RunRequest/RunResult (`{ type:"result", stdout, stderr, exitCode, compileTimeMs, executionTimeMs, sql? }`); (2) multi-testcase judge (`{ compileMessage, results:[{status,output}], passedCount, total, testcase1..3, output1..3 }`) |
| Limits | code 200k chars, stdin 1M, streams 200k, ≤ 10 testcases, compile 30s, run 1–60s, function runtime < 110s |
| Sandboxing | fresh mkdtemp per run, `timeout -s KILL` + process-group kill, ulimit rlimits (CPU, address space, file size, procs), privilege drop to `nobody` when available, blacklist/whitelist keyword enforcement, optional `x-atom-token` shared secret |
| Deployment | `deploy.sh` (SAM, container images via ECR) or `compilers/aws/` CloudFormation (ZIP or container); prints Function URLs to wire into `LAMBDA_JUDGE_URLS` |

## Runtime registry concept (why it matters)

`runtime-registry.ts` is the single source of truth for what the UI offers: dropdown labels/order, defaults, remembered selections, and — critically — `mode`, which decides the transport. When adding a language or version:

1. Add a `RuntimeProfile` (and `NATIVE_TARGETS` entry if native-server).
2. Lambda path: add a `langspec/<lang>.json` + Dockerfile under `compilers/functions/`.
3. Never execute a language outside these two transports.

## Cheat-integrity rules

| Rule | Detail |
|---|---|
| Never ship to students (web) | `output1..3`, `sourcecode`, `blacklist/whitelist` internals, `CorrectOption`. New code must judge via `/api/execute/testcases`. |
| `sampleinput1..2 / sampleoutput1..2` | Visible to students by design (they define the samples shown in the UI). |
| SQL `headerCode` | Prepended server-side at judge time; not secret but never needed client-side. |
| Desktop exception | Only for `DESKTOP_ENGINE_LANGUAGES` (python/sql/ruby/js/ts) and only in the Electron flow. |
| Server-side grading | MCQ grading server-side; code scores server-computed and clamped (`05-server-actions.md`). |
| Quotas | exec 10/min + 150/day per user; global native semaphore 6 — prevents the execution endpoints from becoming a compute oracle. |

## Emulator (dev only)

`mini-services/lambda-emulator/index.js` serves the REAL Lambda handler over HTTP on port `3030` with exact Function-URL event shapes; wire via `LAMBDA_JUDGE_URL=http://127.0.0.1:3030`. Target state: binds `127.0.0.1` only and requires `x-atom-token` matching `ATOM_TOKEN` from the root `.env`; `ATOM_DROP_PRIVILEGES=off` and `ATOM_ULIMITS=off` are set because the shared sandbox host cannot fork under rlimits. Never expose it in production.
