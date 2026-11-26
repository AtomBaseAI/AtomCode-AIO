# 06 — Security Model

**What this file is for:** the implemented protections, the operational checklist that code cannot fix, and the documented accepted risks. Read before any auth, execution, or deployment task — and before claiming anything is "secure".

## Implemented protections (code-level)

| Layer | Protection | Where |
|---|---|---|
| Edge guard | `src/proxy.ts` (Next 16 proxy): `/api/auth` + `/api/desktop` passthrough, `/api/lookups` public, JSON 401s for other `/api/**`, role areas `/admin` `/staff` `/student` `/superadmin`, superadmin canonicalization via redirect + `next.config.ts` fallback rewrite | `src/proxy.ts`, `src/routes.ts` |
| Sign-in choke point | Single `authorize()` covers login action AND direct `/api/auth/callback` POSTs: zod validation → lockout gate → bcrypt → superadmin auth code → `isActive` | `src/auth.ts` |
| Login lockout | 5 failures / 15 min window → 15 min lockout, keyed by lowercased email, checked BEFORE DB/bcrypt (≈ zero-cost lockout). **Target: adds a per-IP counter alongside the email counter** | `src/lib/login-rate-limit.ts` |
| Timing-oracle fix (in flight) | Dummy-bcrypt compare for unknown emails so every failure path costs the same; uniform error copy | `src/auth.ts` |
| Session revocation (in flight) | `tokenVersion` on User/Staff/Admin/SuperAdmin; `assertSessionValid(role, id, jv)` in guards; `bumpTokenVersion(role, id)` on password reset / deactivation; desktop tokens re-checked for `isActive` + `tokenVersion`, TTL 24h | `src/lib/auth-validate.ts` (new), `src/lib/desktop-auth.ts` |
| Desktop auth | HMAC-SHA256 Bearer tokens (secret = `AUTH_SECRET`), timing-safe compare, DB re-check per request; **target: login rate-limited with uniform 401s** | `src/lib/desktop-auth.ts`, `/api/desktop/auth/login` |
| Action guards | `requireAdmin` / `requireSuperAdmin` / `requireAdminOrCourseStaff` at the top of admin actions; remediation brings guards to ALL exported actions (see `05-server-actions.md`) | `src/lib/action-guards.ts` |
| API guards | `requireAdminApi`, `requireSuperAdminApi`, `requireStaffApi`, desktop `authGuard` | `src/lib/api-admin-guard.ts`, `api-staff-guard.ts`, `desktop-auth.ts` |
| Rate limits / quotas (in flight) | `consumeQuota(bucket, id, { perMinute, perDay })` in `src/lib/rate-limit.ts`: exec 10/min + 150/day, ai 3/min + 15/day (desktop), native concurrency semaphore 6, per-IP login counter | `src/lib/rate-limit.ts` (new) |
| Execution sandbox | Lambda: fresh temp dirs, compile/run hard timeouts, ulimit rlimits (CPU/address space/file size/process count), privilege-drop attempt, blacklist/whitelist keyword checks, optional `x-atom-token`. Native: per-run temp dir, process-group SIGKILL, stream/code/stdin caps; **target: env-scrubbed spawns (PATH/HOME/TMPDIR/LANG), bash ulimit wrappers (-t/-v 2GB/-f/-u; JVM -Xmx512m)** | `compilers/functions/_shared/handler.mjs`, `src/lib/native-executor.ts` |
| Hidden-test integrity | `/api/execute/testcases` + `question-judge.ts` judge server-side; expected outputs never shipped to the web browser; MCQ correct answers never shipped | `04-api-reference.md`, `07-execution-engine.md` |
| Headers (in flight) | `next.config.ts` adds: CSP, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(self)`, `poweredByHeader: false`; `staleTimes.dynamic: 30`; NODE_ENV-gated `serverActions.allowedOrigins` (dev keeps sandbox wildcards; prod uses `ALLOWED_ORIGINS` env) | `next.config.ts` |
| URL validation | Reference/concept URLs validated to http/https schemes before render; rendered inside a sandboxed iframe | reference components |
| CSV safety (in flight) | `csvSafeCell` formula-injection guard on exports (`,`, `+`, `=`, `@` prefixed cells neutralized) | export helpers in `src/lib/*-transfer.ts` |
| Password policy | Minimum 8 chars (zod schemas); **target: import/reset flows issue random one-time passwords instead of shared defaults** | `src/schemas/*` |
| Robots (in flight) | `public/robots.txt` gains `Disallow: /admin`, `/staff`, `/superadmin`, `/api` | `public/robots.txt` |
| Misc (in flight) | `db.ts` prisma query logging gated to dev; `.dockerignore` added; `error.tsx` + `global-error.tsx` added; `ws` dependency removed; emulator binds `127.0.0.1` + requires `x-atom-token` (dev only) | repo root / `src/lib/db.ts` |

## Operational checklist (code cannot fix — humans must do these)

| # | Action | Why |
|---|---|---|
| 1 | Rotate the Neon DB password and set a fresh `AUTH_SECRET` before launch | The current values transited a sandbox environment and must be considered leaked. Update `DATABASE_URL` + `AUTH_SECRET` together (sessions/desktop tokens invalidate — acceptable at launch). |
| 2 | Set `ATOM_TOKEN` on every AWS Lambda judge and redeploy (`compilers/deploy.sh`, or the `aws/` CloudFormation flow) | Deployed Function URLs are currently open endpoints — anyone on the internet can execute code on AWS. `deploy.sh` accepts `ATOM_TOKEN=… ./deploy.sh`. |
| 3 | Production Caddyfile must DELETE the `XTransformPort` handler | The sandbox `Caddyfile` proxies any `?XTransformPort=N` query to `localhost:N` — an open internal-port relay. Ship a prod Caddyfile with only the `localhost:3000` reverse proxy. |
| 4 | Set `ALLOWED_ORIGINS` to the exact production hostnames | With the NODE_ENV gate in place, prod must not accept the sandbox wildcard origins. |
| 5 | Run `gitleaks` (or equivalent) over repo history and rotate everything found | `superadmin@atomcode.dev` seed credentials and auth code `1997` were public; `docs/TEST-CREDENTIALS.md` documents dev passwords. Rotate the superadmin password + auth code (superadmin settings page), and treat all seed passwords as dev-only. |
| 6 | Never run the lambda emulator in production | `mini-services/lambda-emulator` runs the real judge handler with ulimits disabled; it is a dev convenience only. |
| 7 | At scale, move rate limiting to Redis and add CAPTCHA on register/login | In-memory counters do not survive restarts and do not aggregate across instances. |
| 8 | Verify `robots.txt` disallow landed and production serves the new `next.config.ts` headers | These land with the config remediation; confirm on the deployed host. |

## Accepted risks (documented, deliberate)

| Risk | Detail |
|---|---|
| Desktop offline judging | The Electron client ships hidden test inputs AND expected outputs for `python, sql, ruby, javascript, typescript` so its bundled WASM runtimes (pyodide, sqlite-wasm, ruby wasm, JS/TS workers) can judge offline. A determined student can extract expected outputs from the client bundle. Compiled languages (C/C++/Java) are NOT shipped — server-judged only. Do not extend this set. |
| 4-digit auth code | The superadmin second factor is a static 4-digit code (Setting KV, default `1997`) until rotated/lengthened. Rotation lives on the ops checklist. |
| In-memory rate limits | Login lockout, quotas, and the concurrency semaphore reset on restart and are per-instance; horizontal scaling weakens them until Redis-backed. |
| Superadmin role in JWT | Role is frozen at sign-in; revocation via `tokenVersion` (in flight) is the mitigation for demotions/resets. |
| `images.remotePatterns` wildcard | Branding logos may point at any https host (prevents `next/image` crashes) — broad but intentional. |
| Desktop CORS `*` | Desktop routes send permissive CORS headers; they are Bearer-token protected and cookieless, so CSRF does not apply, but responses are readable from any origin — keep payloads secret-free. |
| `dev.log` | `bun run dev` tees server output (including server-action args) to `dev.log`; dev artifact, git-ignored, never ship. |
| `typeScript.ignoreBuildErrors` | `next.config.ts` ignores TS build errors — do not treat a green build as type-safety; run `bunx tsc --noEmit` when touching types. |
