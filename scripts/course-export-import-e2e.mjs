/**
 * E2E test: superadmin course export/import WITH module question references.
 *
 * Flow:
 *   1. Login as superadmin via the credentials callback (2FA code included).
 *   2. Seed: question group + 2 code + 2 MCQ questions, a course with 2
 *      modules, questions attached to the modules.
 *   3. Export the course via GET /api/courses/:id/export — assert the v2
 *      envelope carries courseType/anyLanguage and per-module question
 *      references (groupTitle/title/lang).
 *   4. Import #1 while the source questions are still assigned → expect
 *      0 attached, 4 issues ("already assigned").
 *   5. Delete the source course (module delete nulls question moduleIds)
 *      → simulates a fresh target system where the group questions are
 *      unassigned.
 *   6. Import #2 after tampering: rename one groupTitle (tests global
 *      fallback) and add one bogus MCQ ref (tests the missing path)
 *      → expect 2 code + 2 MCQ attached, exactly 1 missing.
 *   7. Verify DB state: imported modules really hold the questions.
 *   8. v1 backward-compat: import a version-1 style envelope (no
 *      courseType/anyLanguage/questions) → success with defaults.
 *   9. Cleanup: delete every course/module/reference created + the group
 *      (cascades its questions).
 *
 * Run with bun (Prisma client + fetch + cookie handling).
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const BASE = "http://localhost:3000";

let passed = 0;
let failed = 0;
function check(name, cond, extra = "") {
    if (cond) {
        passed++;
        console.log(`  PASS  ${name}`);
    } else {
        failed++;
        console.log(`  FAIL  ${name}${extra ? ` — ${extra}` : ""}`);
    }
}

// ── Cookie-jar fetch helpers ────────────────────────────────────────────────
let cookieJar = {};
function rememberCookies(res) {
    const cookies = res.headers.getSetCookie?.() ?? [];
    for (const c of cookies) {
        const pair = c.split(";")[0];
        const idx = pair.indexOf("=");
        if (idx > 0) cookieJar[pair.slice(0, idx).trim()] = pair.slice(idx + 1).trim();
    }
}
async function httpGet(url) {
    const res = await fetch(url, { headers: { cookie: cookieHeader() } });
    rememberCookies(res);
    return res;
}
async function httpPost(url, body, contentType = "application/json", redirectMode = "follow") {
    const res = await fetch(url, {
        method: "POST",
        headers: { cookie: cookieHeader(), "Content-Type": contentType },
        body,
        redirect: redirectMode,
    });
    rememberCookies(res);
    return res;
}
function cookieHeader() {
    return Object.entries(cookieJar)
        .map(([k, v]) => `${k}=${v}`)
        .join("; ");
}

// ── Cleanup tracking ────────────────────────────────────────────────────────
const createdCourseIds = [];
let testGroupId = null;

async function deleteCourseCascade(courseId) {
    const modules = await db.module.findMany({
        where: { courseId },
        select: { id: true },
    });
    const moduleIds = modules.map((m) => m.id);
    await db.moduleReferences.deleteMany({ where: { moduleId: { in: moduleIds } } });
    await db.module.deleteMany({ where: { id: { in: moduleIds } } });
    await db.course.delete({ where: { id: courseId } });
}

async function main() {
    console.log("== 1. Login as superadmin ==");
    const csrfRes = await httpGet(`${BASE}/api/auth/csrf`);
    const { csrfToken } = await csrfRes.json();
    const loginRes = await httpPost(
        `${BASE}/api/auth/callback/credentials`,
        new URLSearchParams({
            csrfToken,
            email: "superadmin@atomcode.dev",
            password: "Mr@1811321",
            code: "1997",
            callbackUrl: `${BASE}/superadmin/courses`,
            json: "true",
        }).toString(),
        "application/x-www-form-urlencoded",
        "manual"
    );
    check("login callback 200/302", loginRes.status === 200 || loginRes.status === 302, `HTTP ${loginRes.status}`);
    const session = await (await httpGet(`${BASE}/api/auth/session`)).json();
    check("session role is superadmin", session?.user?.role === "superadmin", JSON.stringify(session?.user ?? {}));
    if (session?.user?.role !== "superadmin") {
        console.log("  login body:", (await loginRes.text()).slice(0, 300));
        console.log("  cookies:", Object.keys(cookieJar).join(","));
    }

    console.log("== 2. Seed test data ==");
    const ts = Date.now();
    const group = await db.questionGroup.create({
        data: { title: `Export Test Group ${ts}` },
    });
    testGroupId = group.id;

    const baseCode = {
        description: "Seed question for export/import test",
        sampleinput1: "1 2",
        sampleinput2: "",
        sampleoutput1: "3",
        sampleoutput2: "",
        input1: "4 5",
        input2: "",
        input3: "",
        output1: "9",
        output2: "",
        output3: "",
        maxscore: 10,
        difficulty: "easy",
    };
    const codeQ1 = await db.codeQuestion.create({
        data: {
            ...baseCode,
            title: `Two Sum Seed ${ts}`,
            lang: "python",
            questionGroupId: group.id,
            tags: "arrays,seed",
        },
    });
    const codeQ2 = await db.codeQuestion.create({
        data: {
            ...baseCode,
            title: `Reverse String Seed ${ts}`,
            lang: "c",
            questionGroupId: group.id,
            difficulty: "medium",
        },
    });
    const mcqQ1 = await db.mCQQuestion.create({
        data: {
            title: `Pointer MCQ Seed ${ts}`,
            description: "What does a pointer store?",
            Option1: "Address",
            Option2: "Value",
            Option3: "Type",
            Option4: "Size",
            CorrectOption: 1,
            iscodesnippet: false,
            difficulty: "easy",
            questionGroupId: group.id,
        },
    });
    const mcqQ2 = await db.mCQQuestion.create({
        data: {
            title: `Big-O MCQ Seed ${ts}`,
            description: "Complexity of binary search?",
            Option1: "O(n)",
            Option2: "O(log n)",
            Option3: "O(n^2)",
            Option4: "O(1)",
            CorrectOption: 2,
            iscodesnippet: false,
            difficulty: "easy",
            questionGroupId: group.id,
        },
    });

    const course = await db.course.create({
        data: {
            title: `Export Test Course ${ts}`,
            startdate: new Date(),
            enddate: new Date(Date.now() + 30 * 864e5),
            language: "python",
            courseType: "mcq-only",
            anyLanguage: true,
            completionOrder: "queue",
        },
    });
    createdCourseIds.push(course.id);
    const m1 = await db.module.create({
        data: {
            title: `Module One ${ts}`,
            courseId: course.id,
            moduledate: new Date(),
            modulestatus: "active",
            language: "python",
            maxscore: 10,
            reference: {
                create: [{ title: "Ref A", link: "https://a.example.com", type: "doc" }],
            },
        },
    });
    const m2 = await db.module.create({
        data: {
            title: `Module Two ${ts}`,
            courseId: course.id,
            moduledate: new Date(),
            modulestatus: "active",
            language: "c",
            maxscore: 10,
        },
    });
    await db.codeQuestion.update({ where: { id: codeQ1.id }, data: { moduleId: m1.id } });
    await db.mCQQuestion.update({ where: { id: mcqQ1.id }, data: { moduleId: m1.id } });
    await db.codeQuestion.update({ where: { id: codeQ2.id }, data: { moduleId: m2.id } });
    await db.mCQQuestion.update({ where: { id: mcqQ2.id }, data: { moduleId: m2.id } });
    console.log(`  seeded group=${group.title} course=${course.title}`);

    console.log("== 3. Export ==");
    const exportRes = await httpGet(`${BASE}/api/courses/${course.id}/export?format=json`);
    check("export HTTP 200", exportRes.status === 200, `HTTP ${exportRes.status}`);
    const envelope = await exportRes.json();
    check("envelope version 2", envelope.version === 2, `version=${envelope.version}`);
    check("kind=course", envelope.kind === "course");
    check("course.courseType exported", envelope.course?.courseType === "mcq-only", `got ${envelope.course?.courseType}`);
    check("course.anyLanguage exported", envelope.course?.anyLanguage === true);
    check("course.completionOrder exported", envelope.course?.completionOrder === "queue");
    check("counts.codeQuestions=2", envelope.counts?.codeQuestions === 2, JSON.stringify(envelope.counts));
    check("counts.mcqQuestions=2", envelope.counts?.mcqQuestions === 2);
    const m1Export = envelope.modules?.[0];
    const m2Export = envelope.modules?.[1];
    check("module1 has 1 code ref", m1Export?.questions?.code?.length === 1, JSON.stringify(m1Export?.questions));
    check("module1 has 1 mcq ref", m1Export?.questions?.mcq?.length === 1);
    check("code ref carries groupTitle", m1Export?.questions?.code?.[0]?.groupTitle === group.title);
    check("code ref carries lang", m1Export?.questions?.code?.[0]?.lang === "python");
    check("code ref carries title", m1Export?.questions?.code?.[0]?.title === codeQ1.title);
    check("module2 code ref lang=c", m2Export?.questions?.code?.[0]?.lang === "c");
    check("mcq ref has no lang field", !("lang" in (m2Export?.questions?.mcq?.[0] ?? {})));

    console.log("== 4. Import #1 (questions still assigned) → all skipped as already-assigned ==");
    const imp1Res = await httpPost(`${BASE}/api/courses/import`, JSON.stringify(envelope));
    const imp1 = await imp1Res.json();
    check("import#1 HTTP 201", imp1Res.status === 201, `HTTP ${imp1Res.status} ${JSON.stringify(imp1)}`);
    if (imp1Res.status === 201) createdCourseIds.push(imp1.courseId);
    check("import#1 attachedCode=0", imp1.attachedCodeQuestions === 0, `got ${imp1.attachedCodeQuestions}`);
    check("import#1 attachedMcq=0", imp1.attachedMcqQuestions === 0);
    check("import#1 missing=4", imp1.missingQuestions === 4, `got ${imp1.missingQuestions}`);
    check(
        "import#1 reasons are already-assigned",
        (imp1.questionIssues ?? []).every((i) => i.reason.includes("already assigned")),
        JSON.stringify(imp1.questionIssues)
    );
    check("import#1 modules created=2", imp1.createdModules === 2);

    console.log("== 5. Delete source course → questions become unassigned ==");
    await deleteCourseCascade(course.id);
    createdCourseIds.splice(createdCourseIds.indexOf(course.id), 1);
    const detached = await db.codeQuestion.findMany({
        where: { id: { in: [codeQ1.id, codeQ2.id] } },
        select: { id: true, moduleId: true },
    });
    check("source questions detached", detached.every((q) => q.moduleId === null), JSON.stringify(detached));

    console.log("== 6. Import #2 (unassigned + fallback + bogus ref) ==");
    // Tamper: rename group on module1's code ref (tests global fallback) and
    // add one bogus MCQ ref (tests the missing path).
    envelope.modules[0].questions.code[0].groupTitle = `Renamed Group ${ts}`;
    envelope.modules[0].questions.mcq.push({ title: "Nonexistent Bogus Question XYZ", groupTitle: group.title });
    const imp2Res = await httpPost(`${BASE}/api/courses/import`, JSON.stringify(envelope));
    const imp2 = await imp2Res.json();
    check("import#2 HTTP 201", imp2Res.status === 201, `HTTP ${imp2Res.status} ${JSON.stringify(imp2)}`);
    if (imp2Res.status === 201) createdCourseIds.push(imp2.courseId);
    check("import#2 attachedCode=2", imp2.attachedCodeQuestions === 2, `got ${imp2.attachedCodeQuestions}`);
    check("import#2 attachedMcq=2", imp2.attachedMcqQuestions === 2, `got ${imp2.attachedMcqQuestions}`);
    check("import#2 missing=1", imp2.missingQuestions === 1, `got ${imp2.missingQuestions}`);
    check(
        "import#2 issue is the bogus ref (not found)",
        imp2.questionIssues?.[0]?.title === "Nonexistent Bogus Question XYZ" &&
            imp2.questionIssues?.[0]?.reason.includes("Not found"),
        JSON.stringify(imp2.questionIssues)
    );
    check("import#2 success mentions attached", (imp2.success ?? "").includes("attached"), imp2.success);

    console.log("== 7. Verify DB state of the imported course ==");
    const importedModules = await db.module.findMany({
        where: { courseId: imp2.courseId },
        orderBy: { createdAt: "asc" },
        include: { codeQuestions: true, mcqQuestions: true },
    });
    check("imported course has 2 modules", importedModules.length === 2, `got ${importedModules.length}`);
    const im1 = importedModules[0];
    const im2 = importedModules[1];
    check("module1 holds codeQ1", im1.codeQuestions.some((q) => q.id === codeQ1.id));
    check("module1 holds mcqQ1", im1.mcqQuestions.some((q) => q.id === mcqQ1.id));
    check("module2 holds codeQ2", im2.codeQuestions.some((q) => q.id === codeQ2.id));
    check("module2 holds mcqQ2", im2.mcqQuestions.some((q) => q.id === mcqQ2.id));
    check("codeQ1.moduleId → imported module1", (await db.codeQuestion.findUnique({ where: { id: codeQ1.id } })).moduleId === im1.id);
    check("imported course type preserved (mcq-only)", (await db.course.findUnique({ where: { id: imp2.courseId } })).courseType === "mcq-only");
    check("imported course anyLanguage preserved", (await db.course.findUnique({ where: { id: imp2.courseId } })).anyLanguage === true);

    console.log("== 8. v1 backward-compat import (no questions/courseType) ==");
    const v1Envelope = {
        atomcodeExport: true,
        version: 1,
        exportedAt: new Date().toISOString(),
        kind: "course",
        course: {
            title: `V1 Legacy Course ${ts}`,
            startdate: new Date().toISOString(),
            enddate: new Date(Date.now() + 30 * 864e5).toISOString(),
            language: "java",
            completionOrder: "openflow",
        },
        counts: { modules: 1, references: 0 },
        modules: [
            {
                title: `Legacy Module ${ts}`,
                moduledate: new Date().toISOString(),
                modulestatus: "active",
                language: "java",
                maxscore: 5,
                concepturl: null,
                references: [],
            },
        ],
    };
    const v1Res = await httpPost(`${BASE}/api/courses/import`, JSON.stringify(v1Envelope));
    const v1 = await v1Res.json();
    check("v1 import HTTP 201", v1Res.status === 201, `HTTP ${v1Res.status} ${JSON.stringify(v1)}`);
    if (v1Res.status === 201) createdCourseIds.push(v1.courseId);
    check("v1 createdModules=1", v1.createdModules === 1);
    check("v1 no question issues", v1.missingQuestions === 0 && v1.attachedCodeQuestions === 0);
    check("v1 course falls back to code-mcq", (await db.course.findUnique({ where: { id: v1.courseId } })).courseType === "code-mcq");

    console.log(`== Done: ${passed} passed, ${failed} failed ==`);
}

async function cleanup() {
    console.log("== Cleanup ==");
    for (const id of createdCourseIds) {
        try {
            await deleteCourseCascade(id);
            console.log(`  deleted course ${id}`);
        } catch (e) {
            console.log(`  cleanup warning course ${id}: ${e.message}`);
        }
    }
    if (testGroupId) {
        // Cascades its code + MCQ questions.
        await db.questionGroup.delete({ where: { id: testGroupId } }).catch(() => {});
        console.log(`  deleted group ${testGroupId} (cascade)`);
    }
    // Dangling references whose module was hard-deleted elsewhere.
    await db.moduleReferences.deleteMany({ where: { moduleId: null, title: { in: ["Ref A"] } } }).catch(() => {});
}

main()
    .catch((e) => {
        console.error("FATAL:", e);
        failed++;
    })
    .finally(async () => {
        await cleanup();
        await db.$disconnect();
        process.exit(failed > 0 ? 1 : 0);
    });
