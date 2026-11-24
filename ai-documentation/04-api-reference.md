# 04 — API Reference

**What this file is for:** every HTTP route under `src/app/api` (enumerated from the actual `route.ts` files) with method, auth requirement, purpose and notes. Read before adding or calling any API route.

## Auth legend

| Tag | Meaning |
|---|---|
| Public | No session required |
| Session | next-auth JWT cookie required (proxy returns 401 JSON for unauthenticated `/api/**`); role enforced in-route by guard helpers |
| Admin | `requireAdminApi` (`src/lib/api-admin-guard.ts`) — admin or superadmin; 401/403 JSON otherwise |
| Superadmin | `requireSuperAdminApi` — superadmin only (imports/exports) |
| Staff | `requireStaffApi` (`src/lib/api-staff-guard.ts`) — staff only; queries scoped to `session.user.id` |
| Bearer | `/api/desktop/**` — `Authorization: Bearer <token>`; HMAC-SHA256 token from `/api/desktop/auth/login` (secret = `AUTH_SECRET`), timing-safe verify, DB re-check that the student exists and `isActive` (target: also `tokenVersion`; TTL 7 days today → 24h in flight). CORS `*` for Electron |

## Root, lookups, auth plumbing

| Method | Path | Auth | Purpose / Notes |
|---|---|---|---|
| GET | `/api` | Public | Hello-world health stub |
| GET | `/api/lookups` | Public (whitelisted in `src/routes.ts`) | Batch/department lists for the pre-login register page |
| ANY | `/api/auth/[...nextauth]` | Public | Auth.js handlers; proxy never touches this prefix |
| GET/POST/DELETE | `/api/admin/lookups` | Admin (in-route role check) | Manage Batch/Department lookup entries; invalidates the client lookup cache |
| GET | `/api/admin/settings/judge-ping` | Admin | Reachability probe of Lambda judge endpoints, grouped by language from `LAMBDA_JUDGE_URLS` |

## Execution

| Method | Path | Auth | Purpose / Notes |
|---|---|---|---|
| GET | `/api/execute/lambda` | Session | Capability probe → `{ enabled: boolean }` |
| POST | `/api/execute/lambda` | Session | Proxy to Lambda judge. Body `{ type:"run", language, versionProfileId, code, stdin?, timeoutMs? }` (RunRequest protocol). Forwards unchanged to the language's Function URL with `x-atom-token` from `LAMBDA_JUDGE_TOKEN`. Body cap 1.5M chars, upstream timeout 240s, 503 when unconfigured (client falls back to native for c/cpp/java), 401 JSON shape `type:"error"` |
| POST | `/api/execute/native` | Session | Server-side C/C++/Java execution (`src/lib/native-executor.ts`), same RunRequest/RunResult contract. Compile 30s, run 1–60s, code ≤ 200k chars, stdin ≤ 1M, streams ≤ 200k, per-run temp dir removed, process-group SIGKILL. **Target (in flight): env-scrubbed spawns (PATH/HOME/TMPDIR/LANG), bash ulimit wrappers (-t/-v 2GB/-f/-u; JVM -Xmx512m), global concurrency semaphore (6), per-user quotas 10/min + 150/day via `src/lib/rate-limit.ts`** |
| POST | `/api/execute/testcases` | Session | **NEW (in flight).** Request `{ questionId, code, language, uaid? }` → response `{ ok, results: [{ pass, actual, error? }], score, maxScore }`. Judges server-side via `src/lib/question-judge.ts` (`judgeQuestionTests(questionId, code, language, opts)`); never returns expected outputs; `uaid` scopes assessment runs to an active attempt; exec quotas 10/min + 150/day. Web code views must use this endpoint instead of fetching hidden test data |

## Questions (admin authoring)

| Method | Path | Auth | Purpose / Notes |
|---|---|---|---|
| GET | `/api/questions/[qid]` | Admin | One code question in `QuestionUpdateSchema` shape (edit popup) |
| POST | `/api/questions/test` | Admin | Lambda-judge verifier. Body `{ ids: string[] }` (≤ 100, concurrency 8); runs 2 sample + 3 hidden cases via `lambdaJudgeMultiRun` (`src/lib/lambda-judge-server.ts`); persists `testStatus/testResults/testedAt`; returns `{ id, status: "passed"\|"failed", results: boolean[5], testedAt, error? }`; per-question failures are returned, never thrown |

## Imports / exports / admin data

| Method | Path | Auth | Purpose / Notes |
|---|---|---|---|
| GET | `/api/courses/[id]/export` | Superadmin | Re-importable JSON envelope v2 (course + modules + questions + references) |
| POST | `/api/courses/import` | Superadmin | Course import; caps: 200 modules, 100 refs/module, 500 questions/module |
| POST | `/api/question-groups/import`, `/api/question-groups/import/validate` | Superadmin | Question-group import / dry-run validate |
| GET/POST | `/api/question-groups` | Admin | List/create question groups (duplicate-title check) |
| GET/PUT/DELETE | `/api/question-groups/[id]` | Admin | Read/update/delete a group |
| GET | `/api/question-groups/[id]/export` (+ `/questions/export`, `/mcq-questions/export`, `/topics/export`) | Superadmin | Bank export (JSON/CSV) |
| POST | `/api/question-groups/[id]/questions/import`, `/mcq-questions/import`, `/topics/import` | Superadmin | Bank import |
| POST | `/api/question-groups/[id]/mcq-questions/create`, `/topics/create` | Admin | Bank authoring |
| POST | `/api/question-groups/[id]/topics/[topicId]/subtopics` | Admin | Add subtopic |
| GET | `/api/students/export`, `/api/staffs/export` | Admin | CSV rosters (`src/lib/student-transfer.ts` / `staff-transfer.ts`; target: `csvSafeCell` formula guard) |
| POST | `/api/students/import`, `/api/staffs/import` | Admin | CSV roster import, cap 500 rows, per-row issue report; **target: random one-time passwords on import** |
| GET | `/api/staff/dashboard` | Staff | Dashboard aggregates scoped to the staff member's courses |
| GET/POST | `/api/cleanup/[entity]/[id]` | Admin | Two-phase "intelligent delete": returns related-data counts per section, removes them up-front |

## Desktop API (`/api/desktop/**` — Bearer)

| Method | Path | Purpose / Notes |
|---|---|---|
| POST | `/api/desktop/auth/login` | Student-only login → `{ token, user }` (403 + explanation for staff/admin emails). **Target: rate-limited with uniform 401 bodies; token TTL 24h (7d today)** |
| GET | `/api/desktop/auth/me` | Current profile via `safeProfile` (password never included) |
| POST | `/api/desktop/auth/logout` | Stateless — client discards the HMAC token locally |
| GET | `/api/desktop/config` | **Public.** Branding + service-availability booleans (no URLs/secrets) |
| POST | `/api/desktop/run` | Server-judged runs for compiled languages: `{ questionId, code, mode: "sample"\|"tests", moduleId?/assessmentId?, versionProfileId? }`; enrollment/attempt checked; hidden outputs never returned; native timeout 15s |
| POST | `/api/desktop/student/ai` | AI tutor proxy — server loads the question itself; 503 without `OPENAI_API_KEY`. **Target: ai quota 3/min + 15/day per user** |
| GET | `/api/desktop/student/dashboard` | Aggregated student overview |
| GET | `/api/desktop/student/courses` | Enrolled courses with progress |
| GET | `/api/desktop/student/courses/[cid]/modules` | Active modules of an enrolled course + per-module progress |
| GET | `/api/desktop/student/modules/id]` (sic) | Module detail for practice. **Known defect: the folder is literally `id]` (missing `[`) — the dynamic segment is broken and only matches the literal path; rename to `[id]`** |
| POST | `/api/desktop/student/practice/module` | Module lifecycle tracking (start/end/submit) |
| POST | `/api/desktop/student/practice/mcq` | Server-graded MCQ submission (`{ moduleId, answers:[{ mcqId, selected }] }`); correct answers never reach the client |
| POST | `/api/desktop/student/practice/code` | Saves a code submission (mirrors web `submitquestion`) |
| GET | `/api/desktop/student/assessments` | Assessments across active courses with dynamic status (start/resume/retake/upcoming/expired) |
| GET | `/api/desktop/student/assessments/[aid]` | Attempt detail; `sanitizeMcq`/`sanitizeCodeQuestion` + `DESKTOP_ENGINE_LANGUAGES` rules apply |
| POST | `/api/desktop/student/assessments/[aid]/start` | Validates access key, opens/resumes attempt |
| POST | `/api/desktop/student/assessments/[aid]/submit` | Records results, finalizes attempt |
| GET | `/api/desktop/student/results` | Module + assessment results |
| GET/PATCH | `/api/desktop/student/profile` | Full profile read/update |
| POST | `/api/desktop/student/profile/password` | `{ currentPassword, newPassword }` — desktop allows ≥ 6 chars (web policy target is ≥ 8; align if touched) |

**Desktop hidden-test exception:** for `DESKTOP_ENGINE_LANGUAGES` (`python, sql, ruby, javascript, typescript` in `src/lib/desktop-helpers.ts`) module/assessment payloads include hidden test cases so the bundled WASM runtimes judge offline. C/C++/Java stay server-judged and their hidden data never leaves the server. Documented accepted risk — do not extend it (see `06-security-model.md`).

## Quotas (target state, in flight — `src/lib/rate-limit.ts` `consumeQuota(bucket, id, {perMinute, perDay})`)

| Bucket | Limit | Applies to |
|---|---|---|
| exec | 10/min + 150/day per user | `/api/execute/testcases`, `/api/execute/native` |
| ai | 3/min + 15/day per user | `/api/desktop/student/ai` (and web AI action) |
| Concurrency | Global execution semaphore cap 6 | native executor |

In-memory: resets on restart, per-instance — accepted risk in `06-security-model.md`.

## Behavioral notes

- Unauthenticated `/api/**` (except whitelisted) returns JSON 401 — never an HTML redirect; fetch clients read status codes.
- `/api/execute/lambda` errors keep the RunResult shape (`type:"error"`) so the client execution manager treats them like worker errors.
- `/api/desktop/config` must stay secret-free (booleans only).
- Route params are `Promise`-typed in Next 16 handlers (`context.params` must be awaited).
