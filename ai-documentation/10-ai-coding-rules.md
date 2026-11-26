# 10 — AI Coding Rules

**What this file is for:** the hard do/don't contract for any AI tool (Claude, Cursor, agents) editing this repository. These rules are enforceable expectations, not suggestions — verify each one before declaring a task done.

## File role boundaries (respect them)

| Directory | Allowed contents |
|---|---|
| `src/actions/` | `"use server"` mutations only. One domain per file. No React. |
| `src/data/` | Server-only Prisma query modules. No re-exports of actions; no client-importable code. |
| `src/lib/` | Framework-facing helpers (guards, judge, executors, settings). Must be importable from both node and (where noted) edge — `auth.config.ts` chain must stay Prisma/bcrypt-free. |
| `src/schemas/` | zod schemas only, shared client/server. |
| `src/app/api/` | Route handlers; auth via the shared guard helpers, not ad-hoc checks. |
| `src/app/**/page.tsx` | Server components by default; `"use client"` only for interactive leaves. |
| `prisma/` | Schema + seed only; runtime code never edits the schema. |

## DO

| # | Rule |
|---|---|
| 1 | Start every new server action with a guard from `src/lib/action-guards.ts` (`requireAdmin`, `requireSuperAdmin`, `requireAdminOrCourseStaff`) or `auth()` + explicit ownership for self-service — then derive `userId` from `session.user.id`. |
| 2 | Start every new API route with the matching helper: `requireAdminApi`/`requireSuperAdminApi` (`src/lib/api-admin-guard.ts`), `requireStaffApi` (`src/lib/api-staff-guard.ts`), `authGuard` (`src/lib/desktop-auth.ts`); public routes must be added deliberately (only `/api/lookups` and `/api/desktop/config` are public today). |
| 3 | Validate every mutation input with a zod schema from `src/schemas/` (create one if missing) and map validated fields explicitly into Prisma `data`. |
| 4 | Query through `src/data/*` modules; reuse the `db` singleton from `src/lib/db.ts`. |
| 5 | Judge code server-side via `src/lib/question-judge.ts` / `/api/execute/testcases`; clamp any client-supplied score to `[0, maxScore]`. |
| 6 | Keep CSP-compatible output: no inline `<script>`, no `eval`, no `dangerouslySetInnerHTML` with unsanitized data; load external JS via files/next. |
| 7 | Use the student `template.tsx` framer-motion pattern for any new animated area (with `MotionConfig reducedMotion="user"`), keep `loading.tsx` skeletons on new routes, `dynamic(ssr:false)` for charts, memoized CodeMirror extensions. |
| 8 | Route all code execution through the two transports (`/api/execute/lambda`, `/api/execute/native`) and the runtime registry — never spawn processes ad hoc. |
| 9 | Put secrets in `.env` and read via `process.env`; new vars get documented in `01-overview.md` and `09-development-and-operations.md`. |
| 10 | Run `bun run lint` (and, when touching types, `bunx tsc --noEmit`) before finishing; keep changes minimal and focused. |
| 11 | When fixing one of the known legacy vulnerabilities (unguarded action, client-trusted score, roster password select), fix forward to the target patterns in these docs. |

## DON'T

| # | Rule |
|---|---|
| 1 | Never trust client-supplied `userId`/identity fields — always derive from the session; reject mismatches. |
| 2 | Never put secrets, tokens, or connection strings in code, logs, comments, or tests; never log request bodies that may contain passwords. |
| 3 | Never reintroduce hidden-test leakage: `output1..3`, `sourcecode`, `input1..3`, and MCQ `CorrectOption` must not reach a student browser in web flows (desktop offline-judging exception is fixed and must not grow). |
| 4 | Never spread raw client objects into Prisma `data` (`db.x.create({ data: values })` is forbidden — map fields). |
| 5 | Never use raw SQL (`$queryRaw`, `$executeRaw`) — Prisma query builder only. |
| 6 | Never weaken the edge proxy: no new public `/api/**` without a guard + entry in `src/routes.ts` discussion; no redirect for unauthenticated API calls (JSON 401 only). |
| 7 | Never remove or bypass `login-rate-limit`, `action-guards`, `desktop-auth` checks, or the `authorize()` choke point; don't add parallel sign-in paths. |
| 8 | Never add OAuth/session-table auth — the schema intentionally has no Account/Session models. |
| 9 | Never enable the lambda emulator, the sandbox `Caddyfile` `XTransformPort` handler, or sandbox origin wildcards in production configs/docs. |
| 10 | Never write real credentials into seed scripts — use env-driven values (`SUPERADMIN_EMAIL`/`SUPERADMIN_PASSWORD`) and random one-time passwords for import/reset flows. |
| 11 | Never add client-side fetching for role-gated data; no `ws`-style heavyweight deps without discussion; no inline styles that fight the Tailwind system. |
| 12 | Never claim a deployment is production-ready while the operational checklist in `06-security-model.md` (secret rotation, ATOM_TOKEN, Caddyfile, ALLOWED_ORIGINS, gitleaks) is unchecked. |

## Quick pre-flight checklist for any task

1. Guards added/verified on every new action + route.
2. Identity from session; zod validation on input; explicit Prisma field mapping.
3. No hidden-test/secret leakage in payloads, logs, or client bundles.
4. CSP-safe markup; framer-motion only via the template pattern.
5. `bun run lint` green.
