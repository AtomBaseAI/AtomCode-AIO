# 03 — Database

**What this file is for:** the complete Prisma model inventory (`prisma/schema.prisma`, PostgreSQL/Neon), key relations and indexes, the in-flight `tokenVersion` columns, and the schema invariants. Read before any schema or query change.

## Platform facts

| Fact | Value |
|---|---|
| Provider | `postgresql`, url = `env("DATABASE_URL")` (Neon pooler, `sslmode=require`) |
| Client generator | `prisma-client-js` |
| Long text | All judge I/O, descriptions, source code, user submissions are explicit `@db.Text` |
| Controlled-value columns | Intentionally `String` (not enums): `status`, `difficulty`, `lang`, `plan`, `courseType`, `completionOrder` — retake/CSV flows must not hard-fail on new values |
| IDs | `cuid()` for identity tables (Admin/SuperAdmin/Staff/User/Batch/Department/Setting/BatchBilling), `uuid()` for content tables (Course/Module/questions/assessments) |
| Auth tables | Credentials + JWT only — no Account/Session tables (no OAuth) |

## Models

| Model | Purpose | Key relations / uniques / indexes |
|---|---|---|
| `Admin` | Admin account | `email @unique`; password (bcrypt) |
| `SuperAdmin` | Platform owner, one level above admin; signs in with email+password + 4-digit auth code | `email @unique` |
| `Setting` | Global KV store (platform toggles, branding, `superadmin.authcode`) | PK on `key` |
| `Batch` | Registration lookup list; batch billing config | `value @unique`; `billingEnabled`, `plan FREE\|PREMIUM`, `annualAmount` |
| `Department` | Registration lookup list | `value @unique`, `label` |
| `BatchBilling` | Billing ledger — one record per batch per year | `@@unique([batchValue, year])`, `@@index([year])`, `@@index([status])`; FK Batch.value; `status PENDING\|COLLECTED` |
| `Staff` | Teacher account | `email @unique`; `department` (Department.value token); `StaffCourse[]` |
| `User` | Student account | `email @unique`; `isActive`; batch/department/section/rollnumber; relations to all 6 progress tables |
| `Course` | Course container | `Module[]`, `Assessments[]`, `UserCourse[]`, `StaffCourse[]`, `Feedbacks[]`; `courseType code-mcq\|mcq-only`, `anyLanguage`, `completionOrder daywise\|queue\|openflow` |
| `Module` | Course unit (day) | FK `courseId` (`@@index([courseId])`); `moduledate`, `createdAt` (queue sequence), `maxscore`, `concepturl`; `MCQQuestion[]`, `CodeQuestion[]`, `ModuleReferences[]`, `UserModuleData[]` |
| `ModuleReferences` | Reference links per module | FK `moduleId` (nullable), `@@index([moduleId])`; `type` field; URL scheme validated + iframe-sandboxed on render |
| `Feedbacks` | Feedback form links per course | FK `courseId` nullable, `@@index([courseId])` |
| `MCQQuestion` | Multiple-choice question | FK `moduleId` (nullable) / `assessmentsId` (nullable), both indexed; `Option1..4`, `CorrectOption Int`, `codesnippet`+`snippetLang`+`iscodesnippet`, `difficulty` (default easy), `tags`; **required FK `questionGroupId` → QuestionGroup (cascade)**, `@@index([questionGroupId])` |
| `CodeQuestion` | Coding question | FK module/assessment (nullable, indexed); `sampleinput1..2/sampleoutput1..2` (visible), **`input1..3`/`output1..3` = hidden tests** (all `@db.Text`), `sourcecode` (reference solution, `@db.Text`), `headerCode` (SQL setup prepended at judge time), `maxscore`, `difficulty`, `lang`, `topic/subtopic`, `inputconstrains`, `blacklist/whitelist` (comma-separated keyword rules), `questionType practice\|lab` (+ `company/frequency/acceptanceRate` for lab), `tags`; `testStatus`/`testResults` (JSON `[s1,s2,h1,h2,h3]` booleans)/`testedAt` — admin verifier verdicts; **required FK `questionGroupId` (cascade)**, `@@index([questionGroupId])` |
| `QuestionGroup` | Shared question bank for import/export | `@@index([title])`; cascade-deletes its questions |
| `Topic` | Topic within a question group | `@@unique([groupId, name])`, `@@index([groupId])`; cascade on group delete |
| `SubTopic` | Subtopic within a topic | `@@unique([topicId, name])`, `@@index([topicId])`; cascade |
| `UserCourse` | Student enrollment | FK user/course, `@@index([userId])`, `@@index([courseId])`; `active`, `completionPercentage Float` (persisted by `course-progress.ts`; no unique constraint — updates use `updateMany`) |
| `StaffCourse` | Staff assignment to a course | FK staff/course, indexed both; `active`. Basis of `requireAdminOrCourseStaff` |
| `UserModuleData` | Per-student module progress | FK user/course/module; `@@index([userId, courseId, moduleId])`, `@@index([courseId])`, `@@index([moduleId])`; mcq/question times, scores, statuses, `modulestatus` |
| `UserMCQData` | Per-student MCQ-set result for a module | `@@index([userId, moduleId])`, `@@index([moduleId])`; score/errors/submissiontype/tabswitches/status/duration |
| `UserCodeQuestionData` | Per-student code-question submission (practice) | `@@unique([userId, questionId])` (doubles as the retake/upsert lookup index); `@@index([moduleId])`, `@@index([userId, moduleId])`, `@@index([questionId])` (FK index added manually — Postgres does not auto-create it); `usercode @db.Text`, `testcase1status..3`, score/compiles/errors |
| `Assessments` | Timed, access-key-gated exam per course | FK `courseId` (`@@index([courseId])`); `accesskey Int`, `maxtime`, `maxscore`, `tabswitches`, `active`; questions attach via MCQQuestion/CodeQuestion FKs |
| `UserAssessmentData` | Per-student assessment attempt state | `@@index([userId])`, `@@index([assessmentId])`, `@@index([userId, assessmentId])`, `@@index([courseId])`; start times, tabswitch counters, status |
| `userAssessmentMCQData` | Per-student MCQ result in an assessment | `@@index([userId, assessmentId])`, `@@index([assessmentId])` |
| `userAssessmentCodeData` | Per-student code result in an assessment | `@@unique([userId, questionId])`; `@@index([assessmentId])`, `@@index([userId, assessmentId])`, `@@index([questionId])` (manual FK index) |

## Query module map (`src/data/`)

Pages and actions read through these modules rather than ad-hoc `db` calls:

| Module | Covers |
|---|---|
| `courses.ts`, `modules.ts`, `mcq.ts`, `questions.ts`, `assessments.ts` | Authoring-time reads for the admin/staff areas |
| `question-groups.ts`, `references.ts`, `feedbacks.ts` | Banks, module references, feedback links |
| `staffs.ts`, `students.ts`, `staff/`, `admins.ts` | Rosters (target: password omitted from list reads) |
| `results.ts`, `analysis.ts`, `dashboard.ts`, `revenue.ts` | Results tables, per-course analytics, dashboard aggregates, billing ledger |
| `student/user.ts`, `student/courses.ts`, `student/modules.ts`, `student/module-result.ts`, `student/mcq.ts`, `student/assessments.ts` | Student-area reads (enrollments, module content, progress, assessments) |

## In-flight schema changes (target state)

| Change | Detail |
|---|---|
| `tokenVersion` | `Int @default(0)` added to `User`, `Staff`, `Admin`, `SuperAdmin`. JWT carries a `jv` claim; `assertSessionValid(role, id, jv)` (new `src/lib/auth-validate.ts`) compares against the DB row and `bumpTokenVersion(role, id)` invalidates all outstanding sessions for that account (called on password reset / deactivation). |
| Roster reads | `src/data` student/staff list queries stop selecting `password`. |

## Indexing notes

- Composite uniques (`@@unique([userId, questionId])`) double as the userId-prefix lookup index for retake/upsert paths — do not add a duplicate plain index on the same prefix.
- `UserCodeQuestionData.questionId` and `userAssessmentCodeData.questionId` have explicit `@@index` because Postgres does not auto-index FK sides; these are hot paths for cascading deletes and per-question result joins.
- `Module.@@index([courseId])`, `Assessments.@@index([courseId])`, and the progress-table course/module indexes back every dashboard aggregate.

## Invariants

| Invariant | Detail |
|---|---|
| No raw SQL | Never use `db.$queryRaw` / `$executeRaw` — Prisma query builder only. |
| QuestionGroup required | Every `CodeQuestion`/`MCQQuestion` must belong to a `questionGroupId`; group deletion cascades so bank dashboards can never show orphans. |
| Status strings | Never migrate status/difficulty/lang columns to native enums — import/retake flows rely on lenient strings. |
| Deletes | Destructive flows go through `/api/cleanup/[entity]/[id]` (two-phase "intelligent delete": related data removed first, counts shown). |
| Hidden tests | `input1..3`, `output1..3`, `sourcecode` are server-only fields — see `07-execution-engine.md` before writing any read that touches them. |
