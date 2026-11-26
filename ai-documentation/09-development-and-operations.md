# 09 — Development & Operations

**What this file is for:** how to set up, run, seed, build, deploy and troubleshoot AtomCode. Read before environment, build, or deployment work.

## Setup

```bash
bun install            # installs deps; postinstall runs `prisma generate`
bun run db:push        # pushes prisma/schema.prisma to Neon (accepts data loss)
bun run db:seed        # demo dataset (prisma/seed.ts)
bun run seed:superadmin  # (scripts/seed-superadmin.ts; run via `bun scripts/seed-superadmin.ts`)
bun run dev            # next dev on port 3000, output teed to dev.log
bun run lint           # eslint over the repo — run before finishing any change
```

Prereqs: Bun, Node >= 20.9.0, a Neon Postgres URL. For code execution: set `LAMBDA_JUDGE_URLS` (AWS) or the dev emulator (`LAMBDA_JUDGE_URL=http://127.0.0.1:3030`, start with `cd mini-services/lambda-emulator && bun index.js`).

## package.json scripts (root)

| Script | Command | Notes |
|---|---|---|
| `dev` | sources `.env`, `next dev -p 3000`, tees to `dev.log` | dev.log contains server-action args — dev only |
| `postinstall` | `prisma generate` | runs on every install |
| `build` | `prisma generate && next build --webpack` | |
| `build:standalone` | `BUILD_STANDALONE=true next build` + copies static/public into `.next/standalone` | opt-in for Docker/bare-node |
| `start` | `next start` | production server on :3000 |
| `start:standalone` | `node .next/standalone/server.js` | |
| `lint` | `eslint .` | |
| `db:push` | `prisma db push --accept-data-loss` | schema-first workflow (no migrations dir) |
| `db:seed` | `bun prisma/seed.ts` | |
| `db:generate` | `prisma generate` | |
| `db:migrate` | `prisma migrate dev` | rarely used; default flow is `db:push` |
| `db:reset` | `prisma migrate reset` | destructive |

`engines.node` = `>=20.9.0`. Trusted deps include `@prisma/engines`, `sharp`, `@swc/core`.

## .env template (placeholders only — real values live in the git-ignored `.env`)

```bash
# ── Required ────────────────────────────────────────────────
DATABASE_URL="postgresql://<user>:<password>@<neon-pooler-host>/<db>?sslmode=require"  # <set-in-.env>
AUTH_SECRET="<openssl rand -base64 32>"                                                # <set-in-.env>

# ── Lambda judge ────────────────────────────────────────────
LAMBDA_JUDGE_URLS='{"python":"https://<fn-url>","java":"https://<fn-url>","sql":"https://<fn-url>","javascript":"https://<fn-url>","typescript":"https://<fn-url>","ruby":"https://<fn-url>"}'  # <set-in-.env>
LAMBDA_JUDGE_TOKEN="<shared-secret-sent-as-x-atom-token>"                              # <set-in-.env>
ATOM_TOKEN="<emulator/lambda token, dev>"                                              # <set-in-.env>

# ── Optional ────────────────────────────────────────────────
OPENAI_API_KEY="<sk-...>"          # AI tutor; unset => 503
ALLOWED_ORIGINS="<prod hostnames>" # production only (target state)
NEXT_PUBLIC_CLIENT_NAME="<brand>"
NEXT_PUBLIC_VENDOR_NAME="Atom Code"
NEXT_PUBLIC_VENDOR_LOGO="<url>"
NEXT_PUBLIC_APP_STATUS="true"
# NEXT_PUBLIC_LAMBDA_URL=...       # legacy single-URL fallback
BUILD_STANDALONE="true"            # docker build only
NEXT_TELEMETRY_DISABLED=1
```

Rules: `.env*` files are git-ignored (only `.env.example` is tracked); never commit real values; the current sandbox values are burned and must be rotated before launch (see `06-security-model.md`).

## Seeding

| Seeder | Command | Contents | Notes |
|---|---|---|---|
| `prisma/seed.ts` | `bun run db:seed` | Test accounts for all roles (matrix in `docs/TEST-CREDENTIALS.md`), "Full Stack Java" course, 2 modules, MCQs + code questions, "Unit Test 1" assessment (access key `123456`), feedback links | Idempotent upserts; dev/test only — passwords are public in-repo |
| `scripts/seed-superadmin.ts` | `bun scripts/seed-superadmin.ts` | SuperAdmin account, `superadmin.authcode` Setting, demo students, Batch rows, BatchBilling ledger (premium batches, past years COLLECTED) | Idempotent. **Target (in flight): env-driven — `SUPERADMIN_EMAIL`/`SUPERADMIN_PASSWORD` overrides + a production refuse-guard that aborts unless env creds are provided. Currently hardcodes the leaked dev creds; rotation required (06 §checklist #5).** |
| Curriculum banks | `scripts/<language>/seed.ts` (python, c, ruby, oops-java, cpp-bank) | Large question banks via question groups | One-off content tooling; not part of app runtime |

## Deployment checklist

| Step | Detail |
|---|---|
| Platform | Vercel (default `next build`/`next start`) or Docker via `bun run build:standalone` + `node .next/standalone/server.js`; `.dockerignore` (in flight) keeps node_modules/.next/dev.log out of image context |
| Env | Set all secrets in the platform env (never in-image): `DATABASE_URL`, `AUTH_SECRET` (fresh), `LAMBDA_JUDGE_URLS`, `LAMBDA_JUDGE_TOKEN`, `ALLOWED_ORIGINS` (exact prod hostnames), `NEXT_PUBLIC_*` branding |
| Caddy | Production Caddyfile must contain ONLY the `localhost:3000` reverse proxy — DELETE the `XTransformPort` handler (sandbox-only port relay) |
| Lambda judges | `cd compilers && ATOM_TOKEN=<secret> ./deploy.sh` (or `compilers/aws/` flow) → copy printed Function URLs into `LAMBDA_JUDGE_URLS`; verify with `/api/admin/settings/judge-ping` |
| Emulator | Confirm nothing points at `:3030` in prod |
| Smoke | Login all four roles; run one code question per language; check security headers present; confirm robots.txt disallows admin/api |
| Post-launch | Rotate superadmin password + auth code; change all seed/test account passwords; run gitleaks over history |

## Troubleshooting

| Symptom | Cause / Fix |
|---|---|
| Login redirect loop | `AUTH_SECRET` differs between processes (edge proxy vs node server) or missing → cookie fails to decode and bounces to `/login`. Fix: identical `AUTH_SECRET` everywhere; avoid the built-in fallback in prod (it console.warns). |
| Every login 500s with MissingSecret | `.env` missing/wiped in a workflow sandbox — `resolveAuthSecret()` falls back loudly; restore `.env`. |
| 429 / "Too many failed attempts" | Login lockout: 5 failures in 15 min locks the email for 15 min (in-memory; restart clears). Per-IP counter (in flight) adds a second dimension. |
| Prisma `P2002` (unique violation) | Usually `@@unique([userId, questionId])` upsert races or duplicate import rows — check `usersavequestion`/import flows use upsert semantics; `UserCourse` has no unique, so progress writes use `updateMany`. |
| Lambda judge 503 | No `LAMBDA_JUDGE_URLS`/`LAMBDA_JUDGE_URL` for that language (probe `GET /api/execute/lambda` → `{enabled:false}`); client falls back to native for c/cpp/java, other languages error out. |
| Lambda judge 401/402 from upstream | Missing/wrong `x-atom-token` vs the Lambda's `ATOM_TOKEN`. |
| Server-action origin rejected | Browser origin not in `serverActions.allowedOrigins` (dev wildcards) — prod must list real hostnames in `ALLOWED_ORIGINS`. |
| Exec endpoints refuse with quota errors | Per-user exec quotas (10/min + 150/day, in flight) exhausted — by design; in-memory, resets on restart. |
| `dev.log` growth / sensitive args | Dev-only artifact of `bun run dev` (tee). Never read into commits; it contains server-action args. |
| Desktop login fails but web works | Desktop is student-only (`User` table); staff/admin emails get the student-only response; tokens are HMAC-signed with `AUTH_SECRET` — a rotated secret invalidates them. |
