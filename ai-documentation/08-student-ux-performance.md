# 08 — Student UX & Performance

**What this file is for:** the performance playbook implemented in the student area and the rules future student-UI work must follow. Read before touching `/student/**` pages.

## Implemented playbook (target state of the in-flight UX program)

| Item | Detail | Where |
|---|---|---|
| Page transitions | `/student` uses `template.tsx` with framer-motion transitions; wrapped in `MotionConfig reducedMotion="user"` so OS-level reduced-motion preferences disable animation | `src/app/student/template.tsx` |
| Loading skeletons | Per-route `loading.tsx` skeleton files so navigations never show blank frames. Observed today: `student/loading.tsx`, `student/courses/loading.tsx`, plus staff/admin equivalents (`staff/courses`, `staff/results`, `admin/courses`, `admin/results`, `admin/students`); the UX program adds skeletons per remaining student route | `src/app/**/loading.tsx` |
| Charts client-only | recharts components load via `dynamic(() => import(…), { ssr: false })` — avoids the chart lib in the server bundle and hydration mismatches | student dashboards/results |
| Router freshness | `staleTimes.dynamic: 30` (in `next.config.ts`, in flight) keeps visited pages client-side for 30s instead of refetching every navigation | `next.config.ts` |
| Settings caching | 30s TTL in-process cache on branding/platform settings reads — removes per-request DB hits on hot pages | `src/lib/platform-settings.ts`, `src/lib/branding-settings.ts` (in flight) |
| Single-request judging | Code views judge via `POST /api/execute/testcases` — one round-trip for all cases; hidden outputs never shipped, so no client-side filtering pass | student code pages + `04-api-reference.md` |
| CodeMirror hygiene | Editor extensions are memoized (referenced once per mount) — extension arrays must be stable or CodeMirror re-instantiates the editor each render | student/staff/ide editors |
| Link prefetch | `next/link` prefetch for internal student navigation (default behavior; do not opt out with `prefetch={false}` without reason) | student nav |
| Webcam probe fix | The assessment proctoring webcam probe leaked a stream/resource on failure paths — fixed (release before replace/close on error) | assessment proctoring code |

## Rules for future student-area work

| Rule | Reason |
|---|---|
| Prefer server components | Data lives server-side (`src/data/student/*`); fetch in server components and pass props down. Only interactive leaves are `"use client"`. |
| `cache()` for per-request dedupe | If one render tree needs the same query twice (page + layout), wrap the query in React `cache()` — not a module-level memo. |
| Never client-fetch role-gated data | No client-side fetching of student/admin data via API routes for initial render — the proxy would 401 plain fetches without cookies and it doubles DB load. Use server components / server actions. |
| Keep transitions on the template pattern | New animated areas copy the `template.tsx` + `MotionConfig reducedMotion="user"` pattern (template remounts on navigation, so exit animations are unnecessary and layout stays clean). |
| Keep extensions memoized | Any new CodeMirror usage: `useMemo` the extension array; never build it inline in JSX. |
| Charts stay `ssr: false` | Any new recharts import goes through `dynamic(..., { ssr: false })`. |
| Skeletons accompany new routes | Every new student route gets a `loading.tsx` skeleton (structure-first, no spinners). |
| Motion budget | Animations are transform/opacity only (GPU-safe); no layout-affecting animations on list-heavy pages. |
| Do not cache per-user data globally | `cache()` is per-request; anything cross-request must be explicitly keyed (the settings TTL cache is settings-only, never user data). |
