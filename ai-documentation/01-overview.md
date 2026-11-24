# 01 — Overview

**What this file is for:** a factual summary of what AtomCode is, which stack versions it runs on, where every major directory lives, and which environment variables the app consumes (with secret flags). Read this before any task to orient yourself.

## Product summary

AtomCode is a campus teaching platform for programming courses. Institutions (admin) author courses, modules, MCQs and code questions; staff teach and grade assigned courses; students practice coding, take assessments and use an AI tutor. Four roles share one Next.js app under separate URL prefixes:

| Role | URL prefix | Capabilities |
|---|---|---|
| Admin | `/admin` | Author courses, modules, MCQ/code questions, assessments; manage staff and students; import/export rosters and courses; view results/analytics |
| Staff | `/staff` | Teach courses assigned via `StaffCourse`; view module content, feedback, results, leaderboard, per-student insights; workspace + IDE |
| User (student) | `/student` | Enrolled courses, daywise/queue/openflow module unlocking, practice MCQ + code judging, assessments (access-key gated), AI tutor, lab, settings |
| SuperAdmin | `/superadmin` | Everything an admin can do (browses mirrored URLs) + manage admin accounts, batch billing/revenue ledger, platform auth code |

An Electron desktop client (`Desktop_Clients/electron`, student-only) talks to `/api/desktop/**` with HMAC Bearer tokens; bundled WASM runtimes (pyodide, sqlite-wasm, ruby wasm, clang) allow offline practice.

## Tech stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router, `proxy.ts` edge guard convention) | ^16.1.1 |
| UI | React + Tailwind CSS + shadcn/ui (Radix) | React ^19, Tailwind 4 |
| Language | TypeScript (strict) | ^5 |
| Auth | next-auth v5 beta (JWT credentials strategy) | ^5.0.0-beta.32 |
| ORM / DB | Prisma + PostgreSQL (Neon, pooler URL) | ^6.11.1 |
| Validation | zod (schemas in `src/schemas/`) | ^4 |
| Editor | CodeMirror 6 via `@uiw/react-codemirror` | ^4.25.12 |
| Charts | recharts (target: `dynamic(ssr:false)`) | ^2.15.4 |
| Motion | framer-motion (student template transitions) | ^12.23.2 |
| AI | OpenAI SDK (optional `OPENAI_API_KEY`) | ^7.43.0 |
| Password hashing | bcrypt-ts | ^9.0.2 |
| CSV | papaparse (formula-guard `csvSafeCell` in flight) | ^5.7.0 |
| Runtime | Bun (package manager), Node >= 20.9.0 (server) | — |
| Execution | AWS Lambda compiler stack (`compilers/`, Node 20 handler) + native gcc/g++/ECJ+OpenJDK 21 | — |
| Desktop | Electron (main `Desktop_Clients/electron`), Tauri client present | electron pkg 2.0.3 |

## Top-level directory map

| Path | Purpose |
|---|---|
| `src/app/(auth)/` | `/login`, `/register`, `/forgot-password` |
| `src/app/admin/` | Admin area: courses, modules, mcq/code questions, assessments, staffs, students, questions-groups, results, ide, settings |
| `src/app/staff/` | Staff area: courses, modules, feedbacks, results (+analysis/leaderboard/completion), atom, workspace, ide, settings |
| `src/app/student/` | Student area: dashboard, courses, practice, assessment(s), lab, settings |
| `src/app/superadmin/` | Super-admin area: dashboard, admins, revenue, settings (native pages; other paths render mirrored `/admin/*` pages via fallback rewrite) |
| `src/app/api/` | Route handlers (see `04-api-reference.md`) |
| `src/actions/` | Server actions ("use server") — all mutations (see `05-server-actions.md`) |
| `src/data/` | Server-only query modules per entity (`courses.ts`, `questions.ts`, `student/*`, `results.ts`, `revenue.ts`, …) |
| `src/lib/` | Framework-facing helpers: `db.ts`, `auth-secret.ts`, `action-guards.ts`, `api-admin-guard.ts`, `api-staff-guard.ts`, `desktop-auth.ts`, `judge.ts`, `lambda-judge*.ts`, `native-executor.ts`, `runtime-registry.ts`, `login-rate-limit.ts`, `platform-settings.ts`, `branding-settings.ts`, `superadmin-settings.ts`, `module-access.ts`, `course-progress.ts` |
| `src/schemas/` | zod schemas per domain (`auth-schema.ts`, `question-schema.ts`, `student/*`, …) |
| `src/routes.ts` | Central route registry consumed by the proxy and login/logout |
| `src/proxy.ts` | Edge guard (Next 16 proxy convention, replaces middleware) |
| `src/auth.ts` / `src/auth.config.ts` | NextAuth node instance / edge-safe shared config |
| `src/components/` | UI organized by feature: `ui/` (shadcn primitives), `data-tables/`, per-domain folders (`course`, `module`, `mcq`, `question`, `assessment`, `module-questions`, `question-group`, `results`, `revenue`, `ide`, `workspace`, `openide`, `dashboard`, `settings`, `feedbacks`, `auth`, `admin-manage`, `course-staff`, `course-student`, `student-role` — the student practice/assessment suites incl. the code editor + AI tutor), `shared/`, `magicui/`, plus shell pieces (`sidebar.tsx`, `topbar.tsx`) |
| `src/hooks/` | Client hooks: `NetworkDector.tsx`, `fullscreen.ts`, `MouseEnter.tsx`, `use-lookups.ts` |
| `src/config/branding.ts` | White-label branding constants from `NEXT_PUBLIC_*` vars |
| `src/export/` | Client export buttons + CSV/JSON builders (leaderboard/completion/module exports) |
| `prisma/` | `schema.prisma`, `seed.ts` (demo dataset) |
| `scripts/` | One-off seeds and curriculum banks (`seed-superadmin.ts`, `python-programming/`, `oops-java/`, `c-programming/`, `ruby-programming/`, `cpp-bank/`, import/export e2e) |
| `compilers/` | AWS Lambda judge: `_shared/handler.mjs` + per-language Dockerfiles, SAM `template.yaml`, `deploy.sh`, ZIP build |
| `mini-services/lambda-emulator/` | Dev-only local Lambda emulator on port 3030 |
| `Desktop_Clients/` | `electron/` (student desktop app + bundled WASM runtimes), `tauri/` |
| `public/runtimes/ecj/` | Self-hosted ECJ jars for native Java compilation |
| `public/robots.txt` | Target state: `Disallow: /admin, /staff, /superadmin, /api` (in flight — currently permissive) |
| `docs/TEST-CREDENTIALS.md` | Dev-only seed account matrix |
| `Caddyfile` | Sandbox gateway config (port 81) — see README warning |

## Environment variables

`.env` at repo root holds real values and is git-ignored. Current `.env` keys: `DATABASE_URL`, `AUTH_SECRET`, `LAMBDA_JUDGE_URLS`, `LAMBDA_JUDGE_TOKEN`, `ATOM_TOKEN`, `NEXT_TELEMETRY_DISABLED`.

| Variable | Secret | Required | Purpose |
|---|---|---|---|
| `DATABASE_URL` | Yes | Yes | Neon PostgreSQL pooler connection string (`sslmode=require`) |
| `AUTH_SECRET` | Yes | Yes | Signs web JWT sessions AND desktop HMAC tokens (fallback exists but is a burned sandbox value — always set) |
| `LAMBDA_JUDGE_URLS` | No (URLs) | For lambda langs | JSON map `{ "python": "https://…", "java": "https://…" }` of Lambda Function URLs |
| `LAMBDA_JUDGE_URL` | No | Alt | Single all-in-one Lambda URL (fallback for the map) |
| `LAMBDA_JUDGE_TOKEN` | Yes | Recommended | Sent as `x-atom-token` header to Lambda judges |
| `ATOM_TOKEN` | Yes | Dev emulator | Token the lambda emulator requires (target state; also used by `compilers/deploy.sh`) |
| `OPENAI_API_KEY` | Yes | Optional | AI tutor (`src/actions/ai.ts`, `/api/desktop/student/ai`); unset → 503 |
| `ALLOWED_ORIGINS` | No | Prod | Exact production hostnames for server-action origin checks (target state) |
| `NEXT_PUBLIC_CLIENT_NAME` | No | Optional | Branding (client display name) |
| `NEXT_PUBLIC_CLIENT_BANNER` | No | Optional | Branding banner |
| `NEXT_PUBLIC_VENDOR_NAME` | No | Optional | Vendor name (default "Atom Code") |
| `NEXT_PUBLIC_VENDOR_LOGO` | No | Optional | Vendor logo URL |
| `NEXT_PUBLIC_POWEREDBY_STATUS` / `_NAME` / `_URL` | No | Optional | "Powered by" badge config |
| `NEXT_PUBLIC_APP_STATUS` | No | Optional | Status flag consumed by `src/config/branding.ts` |
| `NEXT_PUBLIC_LAMBDA_URL` | No | Legacy | Single Lambda URL fallback (older name) |
| `SUPERADMIN_EMAIL` / `SUPERADMIN_PASSWORD` | Yes | Target | Env-driven superadmin seed overrides (in flight) |
| `BUILD_STANDALONE` | No | Optional | `"true"` → standalone Docker build output |
| `NEXT_TELEMETRY_DISABLED` | No | Optional | Disables Next telemetry |

Precedence for Lambda endpoint resolution (server-side, repeated in `lambda-judge.ts` and `/api/execute/lambda`): `LAMBDA_JUDGE_URLS` map → `LAMBDA_JUDGE_URL` → `NEXT_PUBLIC_LAMBDA_URL`.
