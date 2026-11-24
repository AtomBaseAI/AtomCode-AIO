# 02 — Architecture

**What this file is for:** how a request flows through the app, how NextAuth v5 is split between edge and node, what the four roles can reach, why server actions need in-action guards, and the data-layer conventions. Read before touching routing, auth, or guards.

## Request lifecycle

```
Browser / Desktop client
  │
  ▼
Caddy gateway :81                     ← sandbox Caddyfile ALSO proxies ?XTransformPort=N to
  │                                     localhost:N — this handler MUST NOT exist in production
  ▼
Next.js server :3000
  │
  ▼
src/proxy.ts  (edge guard, NextAuth(authConfig).auth wraps every request)
  │   1. /api/auth/**            → untouched (Auth.js handlers)
  │   2. /api/desktop/**         → untouched (routes self-authenticate via Bearer token)
  │   3. /api/lookups            → public (register-page lookups)
  │   4. other /api/**           → 401 JSON when unauthenticated (never a redirect);
  │                                authenticated callers pass through — each route still
  │                                enforces role/ownership itself ("defense in depth")
  │   5. /login /register /forgot-password, / → signed-in visitors bounce to role home
  │   6. /admin + superadmin session → redirect to mirrored /superadmin/* URL
  │   7. role areas: /admin→admin, /staff→staff, /student→user, /superadmin→superadmin
  │      unauthenticated → /login; wrong role → own dashboard
  │   8. everything else         → requires a session
  ▼
Page / server component  ── or ──  Route handler  ── or ──  Server action
  │                                     │                        │
  └── src/data/* queries  ──────────────┴── guards + src/data/*  ── guards + src/data/*
                                             (Prisma singleton via src/lib/db.ts)
```

The proxy matcher is `["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]` — static assets and `_next` are skipped. `src/routes.ts` is the single registry the proxy, login and logout actions all import.

**Superadmin URL canonicalization:** a superadmin session hitting `/admin/*` is redirected (proxy step 6) to the mirrored `/superadmin/*` path; the browser URL stays in superadmin space while `next.config.ts`'s `fallback` rewrite `[{ source: "/superadmin/:path*", destination: "/admin/:path*" }]` renders the admin page in place. Native superadmin pages (dashboard, admins, revenue, settings) are real files and always win over the fallback.

## Page areas (server components)

| Area | Pages (under `src/app/...`) |
|---|---|
| `(auth)` | `login`, `register`, `forgot-password` (stub) |
| `admin` | `dashboard`, `courses` (+ `[cid]`: modules, `[mid]` mcq/code/references/edit, staffs, students, assessments (+ `[aid]` mcq/code/edit), feedbacks, edit), `questions-groups` (+ `[gid]` mcq/code/topics), `results` (+ `[cid]` analysis/completion/leaderboard), `students` (+ edit), `staffs` (+ edit), `ide`, `settings`; per-area `loading.tsx` on courses/results/students |
| `staff` | `dashboard`, `courses` (+ `[cid]`: modules `[mid]` mcq/code/references, students, feedbacks), `results` (+ `[cid]` analysis (+ `[mid]` insights), completion, leaderboard), `atom/[cid]/[mid]`, `workspace`, `ide`, `settings` |
| `student` | `dashboard`, `courses` (+ `[course]` module), `practice/[cid]/[mid]/[umid]` (mcq/code), `assessments`, `assessment/[cid]/[aid]/[uaid]`, `lab`, `settings`; root `loading.tsx` + per-route skeletons |
| `superadmin` | `dashboard`, `admins`, `revenue`, `settings` (native files; all other paths are mirrored `/admin/*` pages via the fallback rewrite) |
| `api` | See `04-api-reference.md` |

Layouts: each role area has `layout.tsx` providing its own shell; the root `src/app/layout.tsx` mounts providers. `not-found.tsx` at the app root.

## NextAuth v5 architecture

| Piece | File | Runtime | Contents |
|---|---|---|---|
| Shared core | `src/auth.config.ts` | Edge-safe (no Prisma, no bcrypt) | `secret` via `resolveAuthSecret()`, `trustHost`, JWT session strategy (30 days), `pages.signIn = "/login"`, `jwt` callback (stamps `role` + `picture` at sign-in; merges name/email on `update` trigger), `session` callback (exposes `session.user.id` from `token.sub` and `session.user.role`) |
| Node instance | `src/auth.ts` | Node only | Credentials provider (email/password/code) — `authorize()` is the single choke point for every sign-in path: zod validation → lockout gate (`gateAttempt`) → one parallel lookup across Admin/SuperAdmin/Staff/User → bcrypt compare → superadmin 4-digit auth-code check → `isActive` check → `clearFailures`. Exports `{ handlers, auth, signIn, signOut, unstable_update }` and typed `CredentialsSignin` errors mapped by `LOGIN_ERRORS` |
| Route handler | `src/app/api/auth/[...nextauth]/route.ts` | Node | Standard Auth.js endpoints (proxy never touches them) |
| Edge guard | `src/proxy.ts` | Edge | `NextAuth(authConfig).auth(...)` — session cookie verified by the same core that issues it |

**JWT strategy consequences:** the cookie IS the session — no DB round-trip per request. The role is frozen into the JWT at sign-in; DB role changes take effect only at next sign-in unless revocation is used.

**Session revocation (target state, in flight):** `User`, `Staff`, `Admin` and `SuperAdmin` gain a `tokenVersion Int @default(0)` column; a new `src/lib/auth-validate.ts` exposes `assertSessionValid(role, id, jv)` and `bumpTokenVersion(role, id)`. Guards compare the JWT-embedded `jv` against the DB value and reject stale sessions; password resets / deactivations call `bumpTokenVersion` to invalidate outstanding tokens. Until this lands, password reset and deactivation do not kill existing sessions.

## The four roles and route prefixes

| Role (JWT `role`) | Account table | Home | Area prefix | Guard helpers |
|---|---|---|---|---|
| `admin` | `Admin` | `/admin/dashboard` | `/admin` | `requireAdmin` (superadmin passes too), `requireAdminApi` |
| `staff` | `Staff` | `/staff/dashboard` | `/staff` | `requireAdminOrCourseStaff(courseId)`, `requireStaffApi` |
| `user` (student) | `User` | `/student/dashboard` | `/student` | session-derived `userId` in actions; `authGuard` (desktop Bearer) |
| `superadmin` | `SuperAdmin` | `/superadmin/dashboard` | `/superadmin` | `requireSuperAdmin`, `requireSuperAdminApi` |

Login precedence when an email exists in more than one table: admin → superadmin → staff → student. Superadmin additionally requires the static 4-digit auth code (Setting KV key `superadmin.authcode`, checked inside `authorize()` so direct `/api/auth/callback` POSTs cannot bypass it).

## Server actions model

All mutations live in `src/actions/*.ts` files marked `"use server"`. Next.js dispatches them by action ID over POST with the session cookie attached. **The proxy cannot protect them**: an action's only authorization is the code inside the action itself. Therefore:

- Every exported action MUST begin with a guard (`requireAdmin()`, `requireSuperAdmin()`, `requireAdminOrCourseStaff(cid)`, or `auth()` + explicit role/ownership check) and return `{ error: "Unauthorized" }`-style failures otherwise. See `05-server-actions.md`.
- `userId`/`staffId` etc. MUST come from `session.user.id`, never from client-supplied fields.
- Guard helpers live in `src/lib/action-guards.ts` (`requireAdmin`, `requireSuperAdmin`, `requireAdminOrCourseStaff`) and API-side equivalents in `src/lib/api-admin-guard.ts` (`requireAdminApi`, `requireSuperAdminApi`) and `src/lib/api-staff-guard.ts` (`requireStaffApi`).

## Data layer conventions

| Convention | Detail |
|---|---|
| Prisma singleton | `src/lib/db.ts` exports `db` cached on `globalThis` in non-production (hot-reload safe). Target state: query logging only when `NODE_ENV !== "production"` (in flight — currently logs queries unconditionally). |
| Query modules | All reads/writes go through `src/data/*` modules grouped per entity (`courses.ts`, `modules.ts`, `questions.ts`, `mcq.ts`, `staffs.ts`, `students.ts`, `results.ts`, `analysis.ts`, `revenue.ts`, `question-groups.ts`, `references.ts`, `feedbacks.ts`, `dashboard.ts`, plus `student/` for the student area). Pages/actions import these instead of calling `db` ad hoc in client components. |
| Roster privacy (target) | Student/staff roster reads omit `password` fields (in-flight change). |
| Validation | Client input is validated with zod schemas from `src/schemas/` before any Prisma call; never spread raw objects into `data`. |
| No raw SQL | No `$queryRaw`/`$executeRaw` anywhere — Prisma query API only (see `03-database.md`). |
| Progress persistence | `src/lib/course-progress.ts` recalcs `UserCourse.completionPercentage`; `src/lib/module-access.ts` enforces daywise/queue/openflow unlocking server-side (`startModule` re-checks locks). |
| Settings KV | `platform-settings.ts`, `branding-settings.ts`, `superadmin-settings.ts` read/write the `Setting` table; missing rows fall back to defaults (target: 30s TTL cache on branding/platform reads). |
| Timezone | Module/assessment locking uses Asia/Kolkata IST helpers in `src/lib/utils.ts`. |
