# 05 — Server Actions

**What this file is for:** the inventory of `src/actions/*.ts` (all mutations), which role each action group requires, the guard helpers, and the score-integrity policy. Read before adding or modifying any server action.

## Guard helpers (`src/lib/action-guards.ts`)

| Helper | Returns | Allows |
|---|---|---|
| `requireAdmin()` | `Session \| null` | `admin` OR `superadmin` (superadmin inherits all admin capabilities) |
| `requireSuperAdmin()` | `Session \| null` | `superadmin` only (admin management, revenue/billing, auth-code settings) |
| `requireAdminOrCourseStaff(courseId)` | `Session \| null` | admin, or staff with a `StaffCourse` row for that course |

API-route equivalents live in `src/lib/api-admin-guard.ts` / `api-staff-guard.ts`; desktop routes use `authGuard(req)` from `src/lib/desktop-auth.ts`.

## Non-negotiable rules

1. **Every exported action MUST start with a guard** (or `auth()` + explicit role/ownership logic for self-service actions). The edge proxy cannot protect server actions — they are dispatched by action ID with the session cookie attached; in-action guards are the only authorization.
2. **Never trust client IDs.** `userId`/`staffId`/ownership always derive from `session.user.id`. Client-supplied ids may only select *which admin-owned row* is being edited, after the role check passes.
3. **Validate with zod** from `src/schemas/*`; never spread raw client objects into Prisma `data`.
4. **Score integrity:** code-question scores are computed server-side by judging against hidden tests (`src/lib/question-judge.ts` via `/api/execute/testcases` — in flight). Client-reported scores are a fallback only and are clamped to `[0, maxScore]`; MCQ grading happens server-side (correct answers never shipped). Progress recomputation (`recalcCourseCompletion`, module status) runs from server-derived data.

## Action inventory (current state → target state)

Legend: **Role** = guard required at target. "Guarded now" reflects code actually present at documentation time; the remediation program brings every row to "guarded".

### Admin authoring — guard: `requireAdmin`

| File | Actions | Mutates |
|---|---|---|
| `course.ts` | `addcourse`, `deletecourse`, `updatecourse`, `deletecoursesbulk` | Course rows (guarded now) |
| `module.ts` | `addmodule`, `deletemodule`, `updatemodule`, `addmodulequestions`, `removemodulequestion`, `deletemodulesbulk`, `addmodulemcqs`, `removemodulemcq`, `removemodulemcqsbulk`, `deletemodulequestionsbulk` | Modules + question attachments (guarded now) |
| `mcq.ts` | `addMCQ`, `deleteMCQ`, `updateMCQ`, `importmcqs`, `deletemcqbulk` | MCQ banks (guarded now; `importmcqs` also validates CSV/formulas) |
| `question.ts` | `addquestion`, `deletequestion`, `updatequestion`, `deletequestionsbulk` | Code questions incl. hidden tests (guarded now) |
| `assessment.ts` | admin half: `addassessment`, `updateassessment`, `addassessmentquestions`, `deleteassessmentquestion` (currently UNGUARDED — target `requireAdmin`), plus already-guarded `deleteassessment`, `deleteassessmentsbulk`, `deleteassessmentquestionsbulk` | Assessment CRUD; delete paths already use `requireAdmin` and clean up attempts transactionally |
| `assessment.ts` (student half) | `startAssessment`, `mcqdataUpdateAssessment`, `submitassessmentquestion`, `finalizeassessment`, `submitassessmentallquestions` | Assessment attempts — **currently unguarded and trust client ids/scores: target session-derived `userId`, accesskey + timing + tabswitch re-validation server-side, scores clamped** |
| `staffcourse.ts` | `addcoursestaffs`, `deletecoursestaff`, `getstaffsbycourseid`, `deletecoursestaffsbulk` | Staff↔course assignments (guarded now; `getstaffsbycourseid` is a read) |
| `usercourse.ts` | `addcoursestudents`, `deletecoursestudent`, `getstudentsbycourseid`, `deletecoursestudentsbulk` | Student enrollments (guarded now) |
| `references.ts` | `addmodulereference`, `updatemodulereference`, `deletemodulereference`, `deletereferencesbulk` | Module references — **currently only `auth()` (any session): target `requireAdmin` + URL-scheme validation (http/https only) for reference/concept URLs** |
| `feedbacks.ts` | `addfeedback`, `updatefeedback`, `deletefeedback`, `deletefeedbacksbulk` | Feedback links — **currently only `auth()`: target `requireAdminOrCourseStaff`** |
| `staff.ts` | `addstaff`, `deletestaff`, `updatestaff`, `resetpasswordstaff`, `resetOwnPasswordStaff`, `deletestaffsbulk` | Staff rows (guarded now except `resetOwnPasswordStaff`, which is staff self-service: `auth()` + own id). **Target: resets bump `tokenVersion`; self/import resets use random one-time passwords** |
| `student.ts` | `addstudent`, `deletestudent`, `updatestudent`, `resetpasswordstudent`, `deletestudentsbulk` | Student rows (guarded now). **Target: resets bump `tokenVersion`; imported/reset passwords are random one-time** |

### Super-admin only — guard: `requireSuperAdmin`

| File | Actions | Mutates |
|---|---|---|
| `admin-manage.ts` | `addadmin`, `updateadmin`, `deleteadmin`, `resetpasswordadminmanage`, `updateAuthCode`, `updateSuperAdminProfile`, `updateSuperAdminPassword`, `saveBatchBilling`, `disableBatchBilling`, `markBatchCollected`, `markBatchPending` | Admin accounts, auth code, superadmin profile, billing ledger (guarded now; all 10 call sites) |
| `admin.ts` | `resetpasswordadmin` | Admin password — **currently bare `auth()`: target `requireSuperAdmin` + `bumpTokenVersion` + random one-time password** |

### Settings / profile — guard: `requireAdmin` (self-service uses own session id)

| File | Actions | Mutates |
|---|---|---|
| `settings.ts` | `updateAdminProfile` (self), `updatePlatformSetting`, `generateRegistrationCode`, `updateBrandingSettings`, `resetBrandingSettings` | Platform/branding Setting rows (guarded now) |

### Student-side — guard: session-derived user (`auth()` + role check `user`)

| File | Actions | Notes |
|---|---|---|
| `submitmodule.ts` | `startModule`, `mcqdataUpdateModule`, `codedataUpdateModule`, `endModule`, `submitModule` | Module progress; `startModule` re-checks daywise/queue locks server-side. **Target: bind every write to `session.user.id` (reject client `userId` mismatch), clamp scores, recompute module totals server-side** |
| `submitmcq.ts` | `submitmcq` | MCQ-set result — **currently trusts client `userId`/`score`: target server-side grade + session binding** |
| `submitquestion.ts` | `submitquestion`, `submitcode` | Code submissions — **currently trusts client `userId`/`score`/testcase statuses: target judge via `/api/execute/testcases`, clamp scores, bind user** |
| `analysis.ts` | `resetModuleForStudent` | Staff/admin retake reset — **currently unguarded: target `requireAdminOrCourseStaff(cid)`** |
| `ai.ts` | `AIAnalyze` (default export; OpenAI tutor) | **Currently unguarded: target session user + ai quota (3/min, 15/day); the server loads the question itself — never accept prompt/test data from the client** |

### Public-by-design (validate carefully, no session)

| File | Actions | Notes |
|---|---|---|
| `login.ts` | `login`, `currentUser` | Thin wrapper over `signIn`/`authorize()` (which owns lockout + validation); superadmin two-step flow; relative-URL redirects only |
| `logout.ts` | `logout` | `signOut` + redirect home |
| `register.ts` | `verifyRegisterCode`, `registerStudent`, `registerStaff` | Gated by platform settings (`allowStudentRegister`/`allowStaffRegister` + registration codes) and maintenance mode; rate-limit-friendly; **target: imported/self-registered students still get their chosen password, but admin IMPORT flows switch to random one-time passwords** |
| `user.ts` | `updatestudent`, `resetpasswordstudent` | Student self-service (name/github/linkedin, own password) — **currently bare `auth()`: target `auth()` + verify the id equals `session.user.id`; password change bumps `tokenVersion`** |

## Guard implementation pattern

```ts
"use server";
import * as z from "zod";
import { requireAdmin } from "@/lib/action-guards";

export const addcourse = async (values: z.infer<typeof CourseSchema>) => {
  const session = await requireAdmin();
  if (!session) return { error: "Unauthorized" };          // 1. guard first
  const parsed = CourseSchema.safeParse(values);            // 2. validate
  if (!parsed.success) return { error: "Invalid fields" };
  // 3. derive actors from session — never from values
  // 4. mutate via src/data/* or db; 5. revalidatePath
};
```

## Score integrity policy (summary)

| Rule | Detail |
|---|---|
| Server-side judging | Hidden tests run server-side (`question-judge.ts` → Lambda or native executor). Expected outputs never reach the browser. |
| Client scores | Accepted only as offline/desktop fallback, clamped to `[0, maxScore]` and recomputed statuses from server verdicts when available. |
| MCQ grading | `CorrectOption` never leaves the server for web flows; desktop MCQ grading is server-side too (`/api/desktop/student/practice/mcq`). |
| Anti-tamper | `submissiontype`, `tabswitches`, and status transitions are recorded but assessment timing/tabswitch limits are re-validated server-side at finalize. |
