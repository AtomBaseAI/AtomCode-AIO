/**
 * AtomCode — TOC course export/import verification.
 *
 * 1. Login as superadmin (credentials callback + 2FA code).
 * 2. Export every non-Seed course → validate v2 envelope structure and save
 *    the JSON to /tmp/course-exports/<Course>.json.
 * 3. Duplicate-import each envelope → expect course+modules created, every
 *    question ref resolved but SKIPPED as "already assigned" → delete the
 *    imported duplicate.
 * 4. FULL round-trip on "C Programming": delete the original course (module
 *    delete nulls question moduleIds) → import the saved envelope → expect
 *    400 code + 400 mcq re-attached, 0 missing → verify module contents.
 *
 * Run: set -a; . ./.env; set +a; bun scripts/toc-course-export-import-test.ts
 */
import { PrismaClient } from "@prisma/client";
import { mkdirSync, writeFileSync, readFileSync } from "fs";

const db = new PrismaClient();
const BASE = "http://localhost:3000";
const EXPORT_DIR = "/tmp/course-exports";
mkdirSync(EXPORT_DIR, { recursive: true });

let passed = 0;
let failed = 0;
function check(name: string, cond: boolean, extra = "") {
  if (cond) {
    passed++;
    console.log(`  PASS  ${name}`);
  } else {
    failed++;
    console.log(`  FAIL  ${name}${extra ? ` — ${extra}` : ""}`);
  }
}

// ── cookie-jar fetch ──
let cookieJar: Record<string, string> = {};
function rememberCookies(res: Response) {
  const cookies = res.headers.getSetCookie?.() ?? [];
  for (const c of cookies) {
    const pair = c.split(";")[0];
    const idx = pair.indexOf("=");
    if (idx > 0) cookieJar[pair.slice(0, idx).trim()] = pair.slice(idx + 1).trim();
  }
}
function cookieHeader() {
  return Object.entries(cookieJar)
    .map(([k, v]) => `${k}=${v}`)
    .join("; ");
}
async function httpGet(url: string) {
  const res = await fetch(url, { headers: { cookie: cookieHeader() } });
  rememberCookies(res);
  return res;
}
async function httpPost(url: string, body: string) {
  const res = await fetch(url, {
    method: "POST",
    headers: { cookie: cookieHeader(), "Content-Type": "application/json" },
    body,
  });
  rememberCookies(res);
  return res;
}

async function login() {
  const csrfRes = await httpGet(`${BASE}/api/auth/csrf`);
  const { csrfToken } = await csrfRes.json();
  const loginRes = await fetch(`${BASE}/api/auth/callback/credentials`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", cookie: cookieHeader() },
    body: new URLSearchParams({
      csrfToken,
      email: "superadmin@atomcode.dev",
      password: "Mr@1811321",
      code: "1997",
      callbackUrl: `${BASE}/superadmin/courses`,
      json: "true",
    }).toString(),
    redirect: "manual",
  });
  rememberCookies(loginRes);
  const session = await (await httpGet(`${BASE}/api/auth/session`)).json();
  return session?.user?.role;
}

interface ImportResult {
  courseId: string;
  createdModules?: number;
  attachedCodeQuestions?: number;
  attachedMcqQuestions?: number;
  missingQuestions?: number;
  questionIssues?: { title: string; reason: string }[];
}

async function main() {
  console.log("== 1. Login as superadmin ==");
  const role = await login();
  check("superadmin session", role === "superadmin", `role=${role}`);

  const COURSES = [
    "C Programming",
    "OOPS using JAVA",
    "OOPS using CPP",
    "PYTHON Programming",
    "DSA Using Java",
    "DSA Using Python",
    "DSA Using C++",
    "SQL Programming",
    "Ruby Programming",
  ];

  // ── 2. Export all ──
  console.log("== 2. Export all 9 TOC courses ==");
  const envelopes: Record<string, any> = {};
  for (const title of COURSES) {
    const course = await db.course.findFirst({ where: { title } });
    if (!course) {
      check(`${title}: exists`, false);
      continue;
    }
    const res = await httpGet(`${BASE}/api/courses/${course.id}/export?format=json`);
    check(`${title}: export 200`, res.status === 200, `HTTP ${res.status}`);
    const env = await res.json();
    envelopes[title] = env;
    writeFileSync(`${EXPORT_DIR}/${title.replace(/[^\w-]+/g, "_")}.json`, JSON.stringify(env, null, 2));

    check(`${title}: version=2 kind=course`, env.version === 2 && env.kind === "course", JSON.stringify(env).slice(0, 120));
    check(`${title}: title matches`, env.course?.title === title, env.course?.title);
    check(`${title}: 20 modules`, env.modules?.length === 20, `got ${env.modules?.length}`);
    const codeRefs = env.modules?.reduce((a: number, m: any) => a + (m.questions?.code?.length ?? 0), 0) ?? 0;
    const mcqRefs = env.modules?.reduce((a: number, m: any) => a + (m.questions?.mcq?.length ?? 0), 0) ?? 0;
    check(`${title}: code refs >= 396`, codeRefs >= 396, `got ${codeRefs}`);
    check(`${title}: mcq refs >= 396`, mcqRefs >= 396, `got ${mcqRefs}`);
    const refHasGroup = env.modules?.[0]?.questions?.code?.[0]?.groupTitle != null;
    check(`${title}: refs carry groupTitle`, refHasGroup);
    console.log(`  → ${title}: ${codeRefs} code refs, ${mcqRefs} mcq refs, ${env.counts ? "counts ok" : "no counts"}`);
  }

  // ── 3. Duplicate-import every envelope (questions already assigned) ──
  console.log("== 3. Duplicate-import all envelopes → expect 0 attached, all already-assigned ==");
  const duplicates: string[] = [];
  for (const title of COURSES) {
    const env = envelopes[title];
    if (!env) continue;
    const res = await httpPost(`${BASE}/api/courses/import`, JSON.stringify(env));
    const imp = (await res.json()) as ImportResult;
    check(`${title}: import 201`, res.status === 201, `HTTP ${res.status} ${JSON.stringify(imp).slice(0, 200)}`);
    if (imp.courseId) duplicates.push(imp.courseId);
    check(`${title}: dup modules=20`, imp.createdModules === 20, `got ${imp.createdModules}`);
    check(`${title}: dup attached=0`, imp.attachedCodeQuestions === 0 && imp.attachedMcqQuestions === 0, `code=${imp.attachedCodeQuestions} mcq=${imp.attachedMcqQuestions}`);
    const issues = imp.questionIssues ?? [];
    const expectedIssues = (env.counts?.codeQuestions ?? 0) + (env.counts?.mcqQuestions ?? 0);
    // API caps questionIssues at 10 entries; missingQuestions carries the true count.
    check(`${title}: dup missing = ref count`, imp.missingQuestions === expectedIssues, `${imp.missingQuestions} vs ${expectedIssues}`);
    check(`${title}: dup issues capped at 10`, issues.length === 10, `${issues.length}`);
    check(
      `${title}: dup issues already-assigned`,
      issues.every((i) => i.reason.includes("already assigned")),
      JSON.stringify(issues[0] ?? {})
    );
  }

  // cleanup duplicates
  for (const dupId of duplicates) {
    const mods = await db.module.findMany({ where: { courseId: dupId }, select: { id: true } });
    await db.moduleReferences.deleteMany({ where: { moduleId: { in: mods.map((m) => m.id) } } });
    await db.module.deleteMany({ where: { id: { in: mods.map((m) => m.id) } } });
    await db.course.delete({ where: { id: dupId } });
  }
  console.log(`  cleaned up ${duplicates.length} duplicate imports`);

  // ── 4. FULL round-trip: C Programming ──
  console.log("== 4. FULL round-trip on 'C Programming' ==");
  const cpEnvRaw = readFileSync(`${EXPORT_DIR}/C_Programming.json`, "utf8");
  const cpEnv = JSON.parse(cpEnvRaw);
  const orig = await db.course.findFirst({ where: { title: "C Programming" } });
  if (!orig) throw new Error("C Programming course missing");

  // sanity: questions currently attached
  const attachedBefore = await db.codeQuestion.count({
    where: { questionGroup: { title: "C Programming" }, moduleId: { not: null } },
  });
  check("C Programming: 400 code attached before", attachedBefore === 400, `got ${attachedBefore}`);

  // delete original (modules cascade-null question moduleIds)
  const origMods = await db.module.findMany({ where: { courseId: orig.id }, select: { id: true } });
  await db.moduleReferences.deleteMany({ where: { moduleId: { in: origMods.map((m) => m.id) } } });
  await db.module.deleteMany({ where: { id: { in: origMods.map((m) => m.id) } } });
  await db.course.delete({ where: { id: orig.id } });
  const unassignedAfterDelete = await db.codeQuestion.count({
    where: { questionGroup: { title: "C Programming" }, moduleId: null },
  });
  check("C Programming: 400 code unassigned after delete", unassignedAfterDelete === 400, `got ${unassignedAfterDelete}`);

  // import the saved envelope
  const impRes = await httpPost(`${BASE}/api/courses/import`, JSON.stringify(cpEnv));
  const imp = (await impRes.json()) as ImportResult;
  check("round-trip: import 201", impRes.status === 201, `HTTP ${impRes.status} ${JSON.stringify(imp).slice(0, 200)}`);
  check("round-trip: 20 modules created", imp.createdModules === 20, `got ${imp.createdModules}`);
  check("round-trip: 400 code attached", imp.attachedCodeQuestions === 400, `got ${imp.attachedCodeQuestions}`);
  check("round-trip: 400 mcq attached", imp.attachedMcqQuestions === 400, `got ${imp.attachedMcqQuestions}`);
  check("round-trip: 0 missing", imp.missingQuestions === 0, `got ${imp.missingQuestions}`);

  // verify DB: imported modules hold the questions
  const newCourse = await db.course.findUnique({ where: { id: imp.courseId } });
  check("round-trip: course exists", !!newCourse);
  check("round-trip: course title", newCourse?.title === "C Programming", newCourse?.title);
  check("round-trip: language c", newCourse?.language === "c", newCourse?.language);
  const newMods = await db.module.findMany({
    where: { courseId: imp.courseId },
    orderBy: { createdAt: "asc" },
  });
  check("round-trip: 20 modules in DB", newMods.length === 20, `got ${newMods.length}`);
  check("round-trip: module order Day 1..20", newMods[0].title.startsWith("Day 1:") && newMods[19].title.startsWith("Day 20:"), `${newMods[0].title} … ${newMods[19].title}`);
  const modQ = await Promise.all(
    newMods.map(async (m) => ({
      code: await db.codeQuestion.count({ where: { moduleId: m.id } }),
      mcq: await db.mCQQuestion.count({ where: { moduleId: m.id } }),
    }))
  );
  const allFull = modQ.every((q) => q.code === 20 && q.mcq === 20);
  check("round-trip: every module has 20 code + 20 mcq", allFull, JSON.stringify(modQ.filter((q) => q.code !== 20 || q.mcq !== 20)));

  const stillUnassigned = await db.codeQuestion.count({
    where: { questionGroup: { title: "C Programming" }, moduleId: null },
  });
  check("round-trip: 0 code unassigned at end", stillUnassigned === 0, `got ${stillUnassigned}`);

  console.log(`\n===== RESULT: ${passed} passed, ${failed} failed =====`);
  if (failed > 0) process.exit(1);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
