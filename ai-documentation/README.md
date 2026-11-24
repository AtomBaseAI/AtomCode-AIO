# AtomCode — AI Documentation Set

**What this file is for:** the index and usage contract for AI coding tools (Claude, Cursor, agents) working in this repository. Read this file first; it tells you which doc to open for which task and the non-negotiable rules every edit must follow.

## Document index

| File | Contents | Read when… |
|---|---|---|
| `01-overview.md` | Product summary, stack versions, directory map, env vars | Any task; start here |
| `02-architecture.md` | Request lifecycle, proxy guard, NextAuth v5, roles, server-action model | Routing, auth, guards, new pages |
| `03-database.md` | Every Prisma model, relations, indexes, invariants | Any schema or query change |
| `04-api-reference.md` | All `/api/*` routes, auth per route, judge endpoint contracts | New/existing API routes, client fetches |
| `05-server-actions.md` | `src/actions/*` inventory, guard helpers, score-integrity policy | New/existing server actions |
| `06-security-model.md` | Implemented protections + operational checklist + accepted risks | Anything touching auth, secrets, execution |
| `07-execution-engine.md` | Where each language runs, runtime registry, judge flows, cheat integrity | Code execution, judge, testcases |
| `08-student-ux-performance.md` | Perf playbook, motion transitions, caching rules | Student UI work |
| `09-development-and-operations.md` | Setup, scripts, .env template, seeding, deploy, troubleshooting | Environment, builds, deployment |
| `10-ai-coding-rules.md` | Hard do/don't list for AI edits | ALWAYS — before finishing any task |

## Recommended read order

1. This file (`README.md`).
2. `01-overview.md` + `10-ai-coding-rules.md` (rules apply to every edit).
3. The one topical file matching your task (`02`…`09`).
4. The actual source files before editing — docs are a map, not a substitute.

## Rules every AI agent must follow

| Rule | Detail |
|---|---|
| No secrets in code | Secrets live only in `.env` (git-ignored). Never hardcode, log, or echo credentials, tokens, or connection strings. Use `<set-in-.env>` placeholders in docs/examples. |
| Respect role guards | New server actions MUST start with a guard from `src/lib/action-guards.ts`; new API routes with the guards in `src/lib/api-admin-guard.ts` / `api-staff-guard.ts` / `desktop-auth.ts`. Never trust client-sent `userId` — derive it from the session. |
| Never leak hidden tests | `CodeQuestion.output1..3` and `sourcecode` must never reach a student browser in new code. Judge server-side (`/api/execute/testcases`). Desktop offline-client exception is documented in `07-execution-engine.md`. |
| Prisma only | No raw SQL anywhere. No `db.$queryRaw`. Validate input with zod schemas from `src/schemas/` and never spread client objects into Prisma `data`. |
| Repo is in refactor | Parallel agents are remediating security issues. Base changes on the guarded/target patterns in these docs; if a file you touch still shows an old vulnerable pattern, fix it forward, do not copy it. |
| Secrets are already exposed | The sandbox's DB password and `AUTH_SECRET` transited an insecure channel and seed creds were public — treat all current secrets as burned; rotation is on the ops checklist (`06-security-model.md`, `09-development-and-operations.md`). |
| Lint before finishing | Run `bun run lint` and keep the tree green. |

## Repo quick facts

| Fact | Value |
|---|---|
| Framework | Next.js 16 App Router (proxy.ts edge guard convention), React 19, TypeScript 5 |
| Package manager / runtime | Bun (bun.lock); Node >= 20.9.0 for the server |
| App port | `3000` (`next dev`/`next start`; `bun run dev`) |
| Lambda emulator (dev only) | port `3030`, `mini-services/lambda-emulator` — must never run in production |
| Gateway | Caddy on `:81` (`Caddyfile`) — contains an `XTransformPort` query-param proxy handler that is SANDBOX-ONLY and must be deleted from any production Caddyfile |
| Database | PostgreSQL on Neon (pooler URL), Prisma 6, schema at `prisma/schema.prisma` |
| Auth | next-auth v5 beta, JWT credentials strategy, 4 roles (`admin`, `staff`, `user`, `superadmin`) |
| Execution | AWS Lambda compiler stack (`compilers/`) for python/sql/js/ts/ruby + built-in gcc/g++/ECJ-JVM for c/cpp/java |
| Desktop | Electron client at `Desktop_Clients/electron` (Tauri client present at `Desktop_Clients/tauri`), student-only, Bearer-token API under `/api/desktop/**` |
| Secrets on disk | `.env` in repo root holds real values and is git-ignored (`.gitignore` blocks `.env*` except `.env.example`) |
| Dev log | `bun run dev` tees to `dev.log` — contains server-action arguments; dev artifact only, never commit |
