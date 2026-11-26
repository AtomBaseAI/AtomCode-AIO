/**
 * E2E: "SQL Programming" question group — export → validate → import round trip.
 *
 * Covers:
 *   1. Superadmin login (auth code from the settings store).
 *   2. Locate the seeded "SQL Programming" group (400 code / 400 MCQ / 20 topics).
 *   3. GET /api/question-groups/[id]/export?format=json → envelope assertions.
 *   4. POST /api/question-groups/import/validate (dry run) → importable + counts.
 *   5. POST /api/question-groups/import → new "(imported)" group created.
 *   6. Field-by-field round-trip verification of ALL 400 code + 400 MCQ rows
 *      (headerCode, sourcecode, outputs, topics/subtopics) against the source DB.
 *   7. Cleanup: delete the imported group.
 *
 * Requires the dev server on localhost:3000 and .env sourced.
 * Run: bun scripts/sql-programming/export-import-e2e.mjs
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const BASE = "http://localhost:3000";
const GROUP_TITLE = "SQL Programming";

let passed = 0;
let failed = 0;
function check(name, cond, extra = "") {
    if (cond) {
        passed++;
        console.log(`  PASS  ${name}`);
    } else {
        failed++;
        console.error(`  FAIL  ${name}${extra ? ` — ${extra}` : ""}`);
    }
}

// ── cookie-jar fetch ────────────────────────────────────────────────────────
let cookieJar = {};
function rememberCookies(res) {
    for (const c of res.headers.getSetCookie?.() ?? []) {
        const pair = c.split(";")[0];
        const idx = pair.indexOf("=");
        if (idx > 0) cookieJar[pair.slice(0, idx).trim()] = pair.slice(idx + 1).trim();
    }
}
function cookieHeader() {
    return Object.entries(cookieJar).map(([k, v]) => `${k}=${v}`).join("; ");
}
async function httpGet(url) {
    const res = await fetch(url, { headers: { cookie: cookieHeader() } });
    rememberCookies(res);
    return res;
}
async function httpPost(url, body, contentType = "application/json") {
    const res = await fetch(url, {
        method: "POST",
        headers: { cookie: cookieHeader(), "Content-Type": contentType },
        body,
    });
    rememberCookies(res);
    return res;
}

/** First-difference diagnostics for two ordered lists. */
function diffSummary(src, imp) {
    const lines = [];
    if (src.length !== imp.length) lines.push(`length ${src.length} vs ${imp.length}`);
    for (let i = 0; i < Math.min(src.length, imp.length); i++) {
        if (JSON.stringify(src[i]) !== JSON.stringify(imp[i])) {
            const s = JSON.stringify(src[i]);
            const m = JSON.stringify(imp[i]);
            const at = [...s].findLastIndex((ch, j) => ch !== m[j]);
            lines.push(`#${i} src=${s.slice(Math.max(0, (at ?? 0) - 40), (at ?? 0) + 40)} imp=${m.slice(Math.max(0, (at ?? 0) - 40), (at ?? 0) + 40)}`);
            if (lines.length >= 3) break;
        }
    }
    return lines.join(" | ") || JSON.stringify({ src: src.slice(0, 2), imp: imp.slice(0, 2) });
}

async function main() {
    let importedGroupId = null;

    try {
        console.log("== 1. Login as superadmin ==");
        const storedCode = (await db.setting.findUnique({ where: { key: "superadmin.authcode" } }))?.value ?? "0000";
        const csrfRes = await httpGet(`${BASE}/api/auth/csrf`);
        rememberCookies(csrfRes);
        const { csrfToken } = await csrfRes.json();
        const loginRes = await fetch(`${BASE}/api/auth/callback/credentials`, {
            method: "POST",
            redirect: "manual",
            headers: { cookie: cookieHeader(), "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                csrfToken,
                email: "superadmin@atomcode.dev",
                password: "Mr@1811321",
                code: storedCode,
                callbackUrl: `${BASE}/superadmin/questions-groups`,
                json: "true",
            }).toString(),
        });
        rememberCookies(loginRes);
        const session = await (await httpGet(`${BASE}/api/auth/session`)).json();
        check("session role is superadmin", session?.user?.role === "superadmin", JSON.stringify(session?.user ?? {}));

        console.log("== 2. Locate source group ==");
        const source = await db.questionGroup.findFirst({
            where: { title: GROUP_TITLE },
            include: {
                topics: { orderBy: { name: "asc" }, include: { subtopics: { orderBy: { name: "asc" } } } },
                questions: { orderBy: { title: "asc" } },
                mcqQuestions: { orderBy: { title: "asc" } },
            },
        });
        check("source group exists with 400/400/21",
            Boolean(source) && source.questions.length === 400 && source.mcqQuestions.length === 400 && source.topics.length === 21);

        console.log("== 3. Export via API ==");
        const exportRes = await httpGet(`${BASE}/api/question-groups/${source.id}/export?format=json`);
        check("export HTTP 200", exportRes.status === 200, `HTTP ${exportRes.status}`);
        const envelope = await exportRes.json();
        check("envelope is AtomCode question-group export",
            envelope.atomcodeExport === true && envelope.kind === "question-group" && envelope.version === 1);
        check("envelope group title", envelope.group?.title === GROUP_TITLE, envelope.group?.title);
        check("envelope counts", envelope.counts?.topics === 21 && envelope.counts?.codeQuestions === 400 &&
            envelope.counts?.mcqQuestions === 400 && envelope.counts?.subtopics === 133,
            JSON.stringify(envelope.counts));
        check("envelope topics array", Array.isArray(envelope.topics) && envelope.topics.length === 21);
        check("envelope questions array", Array.isArray(envelope.questions) && envelope.questions.length === 400);
        check("envelope mcqQuestions array", Array.isArray(envelope.mcqQuestions) && envelope.mcqQuestions.length === 400);
        check("export carries headerCode on SQL rows",
            envelope.questions.every((q) => typeof q.headerCode === "string" && q.headerCode.includes("CREATE TABLE")),
            "some rows missing headerCode");
        check("export carries sourcecode on every row",
            envelope.questions.every((q) => typeof q.sourcecode === "string" && q.sourcecode.trim().length > 0));
        check("export hides nothing it shouldn't (no module/assessment links)",
            envelope.questions.every((q) => !("moduleId" in q) && !("assessmentsId" in q)));

        console.log("== 4. Dry-run validate ==");
        const valRes = await httpPost(`${BASE}/api/question-groups/import/validate`, JSON.stringify(envelope));
        const val = await valRes.json();
        check("validate HTTP 200", valRes.status === 200, `HTTP ${valRes.status}`);
        check("validate importable=true", val.importable === true, JSON.stringify(val.issues?.slice(0, 3)));
        check("validate valid code=400", val.validCounts?.codeQuestions === 400, JSON.stringify(val.validCounts));
        check("validate valid mcq=400", val.validCounts?.mcqQuestions === 400);
        check("validate valid topics=21", val.validCounts?.topics === 21, JSON.stringify(val.validCounts));
        check("validate zero invalid", (val.invalidCounts?.codeQuestions ?? 0) === 0 &&
            (val.invalidCounts?.mcqQuestions ?? 0) === 0 && (val.invalidCounts?.topics ?? 0) === 0);
        check("validate title rename preview", val.titleRenamed === true && val.finalTitle?.includes("(imported)"),
            JSON.stringify({ b: val.baseTitle, f: val.finalTitle }));

        console.log("== 5. Import ==");
        const impRes = await httpPost(`${BASE}/api/question-groups/import`, JSON.stringify(envelope));
        const imp = await impRes.json();
        check("import HTTP 201", impRes.status === 201, `HTTP ${impRes.status} ${JSON.stringify(imp).slice(0, 200)}`);
        check("import created all rows",
            imp.createdQuestions === 400 && imp.createdMcqs === 400 && imp.createdTopics === 20 && imp.createdSubtopics === 112,
            JSON.stringify({ q: imp.createdQuestions, m: imp.createdMcqs, t: imp.createdTopics, s: imp.createdSubtopics }) +
            " (import counts exclude the auto-created default general topic — merged by name)");
        check("import zero failures", (imp.failed ?? 0) === 0, JSON.stringify(imp.errors?.slice(0, 3)));
        importedGroupId = imp.groupId;
        check("import returns group id", Boolean(importedGroupId));
        check("import title auto-deduped", imp.groupTitle === `${GROUP_TITLE} (imported)`, imp.groupTitle);

        console.log("== 6. Field-by-field round-trip (ALL rows) ==");
        const imported = await db.questionGroup.findUnique({
            where: { id: importedGroupId },
            include: {
                topics: { orderBy: { name: "asc" }, include: { subtopics: { orderBy: { name: "asc" } } } },
                questions: { orderBy: { title: "asc" } },
                mcqQuestions: { orderBy: { title: "asc" } },
            },
        });
        check("imported group exists", Boolean(imported));
        check("imported counts match source",
            imported.questions.length === source.questions.length &&
            imported.mcqQuestions.length === source.mcqQuestions.length &&
            imported.topics.length === source.topics.length);

        // topics + subtopics round trip
        const srcTopics = source.topics.map((t) => ({ name: t.name, subs: t.subtopics.map((s) => s.name).sort() }));
        const impTopics = imported.topics.map((t) => ({ name: t.name, subs: t.subtopics.map((s) => s.name).sort() }));
        check("topics + subtopics round-trip", JSON.stringify(srcTopics) === JSON.stringify(impTopics),
            diffSummary(srcTopics, impTopics));

        // code questions: all portable fields
        const CODE_FIELDS = ["title", "description", "lang", "difficulty", "maxscore", "questionType", "company",
            "frequency", "acceptanceRate", "headerCode", "tags", "topic", "subtopic", "inputconstrains",
            "blacklist", "whitelist", "referenceimg", "sourcecode", "sampleinput1", "sampleoutput1",
            "sampleinput2", "sampleoutput2", "input1", "output1", "input2", "output2", "input3", "output3"];
        const impByTitle = new Map(imported.questions.map((q) => [q.title, q]));
        let codeFieldMismatches = 0;
        let missingRows = 0;
        for (const src of source.questions) {
            const imp = impByTitle.get(src.title);
            if (!imp) { missingRows++; continue; }
            for (const f of CODE_FIELDS) {
                // The import normalizer maps empty strings on nullable fields to
                // null — treat "" and null as equal (semantically identical).
                const a = (src[f] ?? "");
                const b = (imp[f] ?? "");
                if (a !== b) {
                    if (codeFieldMismatches < 3) {
                        console.error(`      mismatch on "${src.title}" field ${f}: ${(String(src[f]).slice(0, 60))} → ${(String(imp[f]).slice(0, 60))}`);
                    }
                    codeFieldMismatches++;
                }
            }
        }
        check("all 400 code rows present", missingRows === 0, `${missingRows} missing`);
        check("all code fields round-trip (incl. hidden headerCode)", codeFieldMismatches === 0, `${codeFieldMismatches} mismatches`);

        // mcq questions
        const MCQ_FIELDS = ["title", "description", "difficulty", "topic", "subtopic", "Option1", "Option2",
            "Option3", "Option4", "CorrectOption", "iscodesnippet", "codesnippet", "snippetLang", "referenceimg"];
        const impMcqByTitle = new Map(imported.mcqQuestions.map((m) => [m.title, m]));
        let mcqMismatches = 0;
        let mcqMissing = 0;
        for (const src of source.mcqQuestions) {
            const imp = impMcqByTitle.get(src.title);
            if (!imp) { mcqMissing++; continue; }
            for (const f of MCQ_FIELDS) {
                if ((src[f] ?? "") !== (imp[f] ?? "")) mcqMismatches++;
            }
        }
        check("all 400 mcq rows present", mcqMissing === 0, `${mcqMissing} missing`);
        check("all mcq fields round-trip", mcqMismatches === 0, `${mcqMismatches} mismatches`);

        // headerCode semantic spot check: composed scripts of imported rows still judge
        console.log("== 7. Imported rows still executable (spot check 40 rows) ==");
        const { execSqlScript, composeUserCode, normalizeOutput } = await import("./lib.ts");
        let spotFail = 0;
        const sample = imported.questions.slice(0, 40);
        for (const q of sample) {
            const run = await execSqlScript(composeUserCode(q.headerCode, q.sourcecode));
            if (!run.ok || normalizeOutput(run.grid) !== normalizeOutput(q.sampleoutput1)) spotFail++;
        }
        check("imported rows execute + grids match (40/400)", spotFail === 0, `${spotFail} failures`);
    } finally {
        console.log("== 8. Cleanup ==");
        if (importedGroupId) {
            const del = await db.questionGroup.delete({ where: { id: importedGroupId } });
            check("imported group deleted", Boolean(del?.id));
        }
        const remaining = await db.questionGroup.findMany({ where: { title: { contains: GROUP_TITLE } } });
        check("only the source group remains", remaining.length === 1, JSON.stringify(remaining.map((g) => g.title)));
        await db.$disconnect();
    }

    console.log(`\n==== ${passed} passed, ${failed} failed ====`);
    process.exit(failed === 0 ? 0 : 1);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
