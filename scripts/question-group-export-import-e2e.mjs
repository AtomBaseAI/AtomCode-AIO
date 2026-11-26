/**
 * Stress test: question-group export/import end-to-end with ALL parameters.
 *
 * Covers:
 *   A. Kitchen-sink seed (every portable field, edge values) → export →
 *      field-by-field round-trip assertions (incl. questionType, company,
 *      frequency, acceptanceRate, headerCode, tags, MCQ tags).
 *   B. Dry-run validate endpoint → report assertions.
 *   C. JSON-mode import (backward compatible shape) → counts + DB verify.
 *   D. Title dedupe (second import).
 *   E. NDJSON stream import → event sequence + progress + counts.
 *   F. Orphan-group fix: all-invalid file creates NOTHING.
 *   G. Empty envelope + non-AtomCode file → 400.
 *   H. Stress scale: 300 code + 300 MCQ generated file via stream →
 *      timing, progress chunks, DB count.
 *   I. Hand-edited robustness: numeric strings, casing, missing keys,
 *      inferred iscodesnippet, null optionals.
 *   J. Per-part import routes (shared normalizers) smoke.
 *   K. Full cleanup.
 *
 * Run with bun, env sourced.
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
    for (const c of res.headers.getSetCookie?.() ?? []) {
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

const createdGroupIds = new Set();

const CODE_BASE = {
    description: "Stress test question",
    sampleinput1: "1 2",
    sampleinput2: "3 4",
    sampleoutput1: "3",
    sampleoutput2: "7",
    input1: "5 6",
    input2: "7 8",
    input3: "9 10",
    output1: "11",
    output2: "15",
    output3: "19",
    maxscore: 10,
    difficulty: "easy",
};

async function main() {
    console.log("== 1. Login as superadmin ==");
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
            code: "1997",
            callbackUrl: `${BASE}/superadmin/questions-groups`,
            json: "true",
        }).toString(),
    });
    rememberCookies(loginRes);
    const session = await (await httpGet(`${BASE}/api/auth/session`)).json();
    check("session role is superadmin", session?.user?.role === "superadmin", JSON.stringify(session?.user ?? {}));

    console.log("== 2. Seed kitchen-sink group ==");
    const ts = Date.now();
    const group = await db.questionGroup.create({ data: { title: `Stress Sink Group ${ts}` } });
    createdGroupIds.add(group.id);

    const qFull = await db.codeQuestion.create({
        data: {
            ...CODE_BASE,
            title: `Full Fields ${ts}`,
            lang: "python",
            questionGroupId: group.id,
            questionType: "practice",
            tags: "arrays,loops",
            topic: "Algorithms",
            subtopic: "Sorting",
            inputconstrains: "1 <= n <= 10^5",
            blacklist: "os,sys",
            whitelist: "sorted,list",
            referenceimg: "https://img.example.com/full.png",
            sourcecode: "def solve(): pass",
        },
    });
    const qSql = await db.codeQuestion.create({
        data: {
            ...CODE_BASE,
            title: `Sql Header ${ts}`,
            lang: "sql",
            questionGroupId: group.id,
            headerCode: "CREATE TABLE users (id INT, name TEXT);\nINSERT INTO users VALUES (1,'a');",
            sampleinput1: "SELECT * FROM users;",
            sampleoutput1: "1|a",
        },
    });
    const qLab = await db.codeQuestion.create({
        data: {
            ...CODE_BASE,
            title: `Lab Metadata ${ts}`,
            lang: "java",
            questionGroupId: group.id,
            questionType: "lab",
            company: "Google",
            frequency: "High",
            acceptanceRate: 32.5,
            difficulty: "hard",
        },
    });
    const qMinimal = await db.codeQuestion.create({
        data: {
            title: `Minimal ${ts}`,
            description: "Bare minimum question",
            ...CODE_BASE,
            lang: "c",
            questionGroupId: group.id,
        },
    });
    const qNoSrc = await db.codeQuestion.create({
        data: {
            ...CODE_BASE,
            title: `No Sourcecode ${ts}`,
            lang: "cpp",
            questionGroupId: group.id,
            sourcecode: null,
        },
    });
    const qUnicode = await db.codeQuestion.create({
        data: {
            ...CODE_BASE,
            title: `Ünïcödé "quotes" & <tags> ${ts}`,
            lang: "javascript",
            questionGroupId: group.id,
            description: "Line1\nLine2\r\nLine3\tTab — em-dash → arrow 🚀",
            sampleinput1: 'say "hello"',
        },
    });
    const qTs = await db.codeQuestion.create({
        data: {
            ...CODE_BASE,
            title: `Typescript Rate ${ts}`,
            lang: "typescript",
            questionGroupId: group.id,
            acceptanceRate: 40,
            tags: "generics, utility types",
        },
    });
    const qRubyEmpty = await db.codeQuestion.create({
        data: {
            ...CODE_BASE,
            title: `Ruby Empty Optionals ${ts}`,
            lang: "ruby",
            questionGroupId: group.id,
            topic: "",
            subtopic: "",
            tags: "",
            inputconstrains: "",
        },
    });
    // Invalid seeds (expect export → import skip)
    await db.codeQuestion.create({
        data: { ...CODE_BASE, title: `Bad Lang ${ts}`, lang: "cobol", questionGroupId: group.id },
    });

    const mFull = await db.mCQQuestion.create({
        data: {
            title: `MCQ Full ${ts}`,
            description: "Which is a valid tag list?",
            difficulty: "medium",
            tags: "basics, syntax",
            topic: "Algorithms",
            subtopic: "Searching",
            Option1: "a, b",
            Option2: "c",
            Option3: "d",
            Option4: "e",
            CorrectOption: 1,
            iscodesnippet: true,
            codesnippet: "print('hi')",
            snippetLang: "python",
            questionGroupId: group.id,
        },
    });
    const mNone = await db.mCQQuestion.create({
        data: {
            title: `MCQ No Snippet ${ts}`,
            description: "Plain MCQ without snippet",
            Option1: "1",
            Option2: "2",
            Option3: "3",
            Option4: "4",
            CorrectOption: 2,
            iscodesnippet: false,
            codesnippet: null,
            snippetLang: null,
            referenceimg: null,
            topic: null,
            subtopic: null,
            tags: null,
            questionGroupId: group.id,
        },
    });
    const mUnicode = await db.mCQQuestion.create({
        data: {
            title: `MCQ Ünïcödé ${ts}`,
            description: "选择正确的答案 — réponse 🎯",
            Option1: "选项 A",
            Option2: "опция B",
            Option3: "opción C",
            Option4: "خيار D",
            CorrectOption: 3,
            iscodesnippet: false,
            questionGroupId: group.id,
        },
    });
    const mMedium = await db.mCQQuestion.create({
        data: {
            title: `MCQ Medium ${ts}`,
            description: "Medium difficulty MCQ",
            difficulty: "medium",
            Option1: "x",
            Option2: "y",
            Option3: "z",
            Option4: "w",
            CorrectOption: 4,
            iscodesnippet: false,
            questionGroupId: group.id,
        },
    });
    // Invalid MCQ seeds
    await db.mCQQuestion.create({
        data: {
            title: `MCQ Bad Correct ${ts}`,
            description: "Invalid correct option",
            Option1: "a",
            Option2: "b",
            Option3: "c",
            Option4: "d",
            CorrectOption: 9,
            iscodesnippet: false,
            questionGroupId: group.id,
        },
    });

    console.log("== 3. Export → structure + field-by-field assertions ==");
    const exportRes = await httpGet(`${BASE}/api/question-groups/${group.id}/export?format=json`);
    check("export HTTP 200", exportRes.status === 200, `HTTP ${exportRes.status}`);
    const env = await exportRes.json();
    check("version 1 + kind question-group", env.version === 1 && env.kind === "question-group");
    check("counts code=9 (incl. invalid seed)", env.counts?.codeQuestions === 9, JSON.stringify(env.counts));
    check("counts mcq=5", env.counts?.mcqQuestions === 5);
    check("counts topics=0 (seed has no topics)", env.counts?.topics === 0);

    const EXPORT_CODE_KEYS = 28;
    const exportQ = (title) => env.questions.find((q) => q.title === title);
    const allHave28Keys = env.questions.every((q) => Object.keys(q).length === EXPORT_CODE_KEYS);
    check("every exported code row has exactly 28 portable keys", allHave28Keys, JSON.stringify(env.questions[0] && Object.keys(env.questions[0]).length));
    check(
        "no internal fields leak (testStatus/id/moduleId)",
        env.questions.every((q) => !("testStatus" in q) && !("id" in q) && !("moduleId" in q))
    );

    const fq = exportQ(`Full Fields ${ts}`);
    check("full: tags exported", fq?.tags === "arrays,loops");
    check("full: questionType exported", fq?.questionType === "practice");
    check("full: blacklist/whitelist exported", fq?.blacklist === "os,sys" && fq?.whitelist === "sorted,list");
    const sq = exportQ(`Sql Header ${ts}`);
    check("sql: headerCode exported with newlines", sq?.headerCode?.includes("CREATE TABLE users") && sq?.headerCode?.includes("\n"));
    const lq = exportQ(`Lab Metadata ${ts}`);
    check("lab: questionType+company+frequency exported", lq?.questionType === "lab" && lq?.company === "Google" && lq?.frequency === "High");
    check("lab: acceptanceRate exported (32.5)", lq?.acceptanceRate === 32.5);
    const mq0 = exportQ(`Minimal ${ts}`);
    check("minimal: null optionals exported as null", mq0?.company === null && mq0?.tags === null && mq0?.topic === null);
    check("minimal: questionType default exported", mq0?.questionType === "practice");
    const nq = exportQ(`No Sourcecode ${ts}`);
    check("null sourcecode exported as null", nq?.sourcecode === null);
    const uq = exportQ(`Ünïcödé "quotes" & <tags> ${ts}`);
    check("unicode/quotes/newlines survive export", uq?.description?.includes("Line1\nLine2") && uq?.description?.includes("🚀"));
    const rq = exportQ(`Ruby Empty Optionals ${ts}`);
    check("ruby: empty-string optionals exported", rq?.topic === "" && rq?.tags === "");

    const em = (title) => env.mcqQuestions.find((m) => m.title === title);
    check("mcq full: tags exported", em(`MCQ Full ${ts}`)?.tags === "basics, syntax");
    check("mcq full: codesnippet+lang exported", em(`MCQ Full ${ts}`)?.codesnippet === "print('hi')" && em(`MCQ Full ${ts}`)?.snippetLang === "python");
    check("mcq unicode options exported", em(`MCQ Ünïcödé ${ts}`)?.Option1 === "选项 A");
    check("mcq no-snippet nulls exported", em(`MCQ No Snippet ${ts}`)?.codesnippet === null && em(`MCQ No Snippet ${ts}`)?.tags === null);

    console.log("== 4. Validate endpoint (dry run) ==");
    const valRes = await httpPost(`${BASE}/api/question-groups/import/validate`, JSON.stringify(env));
    const val = await valRes.json();
    check("validate HTTP 200", valRes.status === 200, `HTTP ${valRes.status}`);
    check("validate importable=true", val.importable === true);
    check("validate valid code=8", val.validCounts?.codeQuestions === 8, JSON.stringify(val.validCounts));
    check("validate valid mcq=4", val.validCounts?.mcqQuestions === 4);
    check("validate valid topics=0", val.validCounts?.topics === 0);
    check("validate invalid code=1 (bad lang)", val.invalidCounts?.codeQuestions === 1, JSON.stringify(val.invalidCounts));
    check("validate invalid mcq=1", val.invalidCounts?.mcqQuestions === 1);
    check("validate totalIssues=2", val.totalIssues === 2, JSON.stringify(val.issues));
    check("validate title dedupe preview", val.titleRenamed === true && val.finalTitle.includes("(imported)"), JSON.stringify({ b: val.baseTitle, f: val.finalTitle }));

    console.log("== 5. JSON-mode import (backward compatible) ==");
    const imp1Res = await httpPost(`${BASE}/api/question-groups/import`, JSON.stringify(env));
    const imp1 = await imp1Res.json();
    check("import#1 HTTP 201", imp1Res.status === 201, `HTTP ${imp1Res.status} ${JSON.stringify(imp1)}`);
    if (imp1Res.status === 201) createdGroupIds.add(imp1.groupId);
    check("import#1 createdQuestions=8", imp1.createdQuestions === 8, `got ${imp1.createdQuestions}`);
    check("import#1 createdMcqs=4", imp1.createdMcqs === 4, `got ${imp1.createdMcqs}`);
    check("import#1 createdTopics=0 (no topics in file)", imp1.createdTopics === 0, `got ${imp1.createdTopics}`);
    check("import#1 createdSubtopics=0", imp1.createdSubtopics === 0, `got ${imp1.createdSubtopics}`);
    check("import#1 failed=2", imp1.failed === 2, `got ${imp1.failed}`);
    check("import#1 general topic auto-ensured", imp1.createdTopics === 0 && typeof imp1.groupId === "string");
    check("import#1 response has historical shape", typeof imp1.success === "string" && typeof imp1.groupId === "string");

    console.log("== 6. DB field-by-field round-trip verification ==");
    const imp1Db = await db.questionGroup.findUnique({
        where: { id: imp1.groupId },
        include: { questions: true, mcqQuestions: true, topics: { include: { subtopics: true } } },
    });
    const PORTABLE = [
        "title", "description", "lang", "difficulty", "maxscore", "questionType", "company",
        "frequency", "acceptanceRate", "headerCode", "tags", "topic", "subtopic",
        "inputconstrains", "blacklist", "whitelist", "referenceimg", "sourcecode",
        "sampleinput1", "sampleoutput1", "sampleinput2", "sampleoutput2",
        "input1", "output1", "input2", "output2", "input3", "output3",
    ];
    let roundTripFailures = [];
    for (const srcTitle of [
        `Full Fields ${ts}`, `Sql Header ${ts}`, `Lab Metadata ${ts}`, `Minimal ${ts}`,
        `No Sourcecode ${ts}`, `Ünïcödé "quotes" & <tags> ${ts}`, `Typescript Rate ${ts}`, `Ruby Empty Optionals ${ts}`,
    ]) {
        const src = await db.codeQuestion.findFirst({ where: { title: srcTitle, questionGroupId: group.id } });
        const dst = imp1Db.questions.find((q) => q.title === srcTitle);
        if (!src || !dst) {
            roundTripFailures.push(`${srcTitle}: missing (${!!src}/${!!dst})`);
            continue;
        }
        for (const f of PORTABLE) {
            // "" → null is the documented empty-string normalization (semantically equal)
            const a = src[f] === "" ? null : src[f];
            const b = dst[f] === "" ? null : dst[f];
            if (a !== b) roundTripFailures.push(`${srcTitle}.${f}: ${JSON.stringify(a)} → ${JSON.stringify(b)}`);
        }
        if (dst.testStatus !== null) roundTripFailures.push(`${srcTitle}.testStatus leaked: ${dst.testStatus}`);
    }
    check("all 8 code questions round-trip ALL 28 portable fields", roundTripFailures.length === 0, roundTripFailures.slice(0, 5).join(" | "));

    let mcqFailures = [];
    for (const srcTitle of [`MCQ Full ${ts}`, `MCQ No Snippet ${ts}`, `MCQ Ünïcödé ${ts}`, `MCQ Medium ${ts}`]) {
        const src = await db.mCQQuestion.findFirst({ where: { title: srcTitle, questionGroupId: group.id } });
        const dst = imp1Db.mcqQuestions.find((m) => m.title === srcTitle);
        if (!src || !dst) {
            mcqFailures.push(`${srcTitle}: missing`);
            continue;
        }
        for (const f of ["title", "description", "difficulty", "tags", "topic", "subtopic", "Option1", "Option2", "Option3", "Option4", "CorrectOption", "referenceimg", "codesnippet", "snippetLang", "iscodesnippet"]) {
            const a = src[f] === "" ? null : src[f];
            const b = dst[f] === "" ? null : dst[f];
            if (a !== b) mcqFailures.push(`${srcTitle}.${f}: ${JSON.stringify(a)} → ${JSON.stringify(b)}`);
        }
    }
    check("all 4 MCQs round-trip ALL 15 portable fields", mcqFailures.length === 0, mcqFailures.slice(0, 5).join(" | "));

    const topicNames = imp1Db.topics.map((t) => t.name.toLowerCase()).sort();
    check("topics: only general (auto-ensured)", topicNames.join(",") === "general", topicNames.join(","));

    console.log("== 7. Title dedupe (import same file again) ==");
    const imp2Res = await httpPost(`${BASE}/api/question-groups/import`, JSON.stringify(env));
    const imp2 = await imp2Res.json();
    check("import#2 HTTP 201 + deduped title", imp2Res.status === 201 && /\(imported/.test(imp2.groupTitle ?? ""), imp2.groupTitle);
    if (imp2Res.status === 201) createdGroupIds.add(imp2.groupId);

    console.log("== 8. Stream import (?stream=1) → NDJSON events ==");
    const streamRes = await httpPost(`${BASE}/api/question-groups/import?stream=1`, JSON.stringify(env));
    check("stream HTTP 200 + ndjson", streamRes.status === 200 && (streamRes.headers.get("content-type") ?? "").includes("ndjson"), streamRes.headers.get("content-type"));
    const streamText = await streamRes.text();
    const events = streamText.split("\n").filter((l) => l.trim()).map((l) => JSON.parse(l));
    const types = events.map((e) => e.t);
    check("stream: starts with start/title/group", types[0] === "start" && types[1] === "title" && types[2] === "group", types.slice(0, 4).join(","));
    check("stream: phase order topics→code→mcq", events.filter((e) => e.t === "phase").map((e) => e.phase).join(",") === "topics,code,mcq");
    const codeProgress = events.filter((e) => e.t === "progress" && e.phase === "code");
    check("stream: code progress monotonic to 8", codeProgress.length === 1 && codeProgress[0].done === 8 && codeProgress[0].inserted === 8, JSON.stringify(codeProgress));
    const mcqProgress = events.filter((e) => e.t === "progress" && e.phase === "mcq");
    const doneEv = events[events.length - 1];
    check(
        "stream: mcq phase inserts all 4 valid (no DB failures)",
        mcqProgress.length === 1 && mcqProgress[0].inserted === 4 && mcqProgress[0].failed === 0,
        JSON.stringify(mcqProgress)
    );
    check("stream: done result failed=2 (validation skips counted)", doneEv.result?.failed === 2, `got ${doneEv.result?.failed}`);
    const topicsPhase = events.find((e) => e.t === "phase" && e.phase === "topics");
    check("stream: topics phase emitted with total 0", topicsPhase?.total === 0, JSON.stringify(topicsPhase));
    check("stream: done event 201 with success", doneEv.t === "done" && doneEv.status === 201 && typeof doneEv.result.success === "string", JSON.stringify(doneEv.result).slice(0, 120));
    if (doneEv.result.groupId) createdGroupIds.add(doneEv.result.groupId);

    console.log("== 9. Orphan-group fix: all-invalid file creates NOTHING ==");
    const badFile = {
        atomcodeExport: true,
        version: 1,
        kind: "question-group",
        group: { title: `Orphan Check ${ts}` },
        questions: [
            { title: "bad lang", description: "x", lang: "cobol", maxscore: 10, difficulty: "easy", sampleinput1: "1", sampleinput2: "1", sampleoutput1: "1", sampleoutput2: "1", input1: "1", input2: "1", input3: "1", output1: "1", output2: "1", output3: "1", sourcecode: "x" },
            { title: "missing required", description: "x", lang: "c" },
        ],
        mcqQuestions: [
            { title: "bad correct", description: "x", Option1: "a", Option2: "b", Option3: "c", Option4: "d", CorrectOption: 99, iscodesnippet: false },
        ],
    };
    const badValRes = await httpPost(`${BASE}/api/question-groups/import/validate`, JSON.stringify(badFile));
    const badVal = await badValRes.json();
    check("orphan: validate importable=false", badValRes.status === 200 && badVal.importable === false, JSON.stringify(badVal));
    const badRes = await httpPost(`${BASE}/api/question-groups/import`, JSON.stringify(badFile));
    const badJson = await badRes.json();
    check("orphan: import 400", badRes.status === 400, `HTTP ${badRes.status}`);
    check("orphan: error explains nothing created", (badJson.error ?? "").includes("Nothing was created") || (badJson.error ?? "").includes("Nothing to import"), badJson.error);
    const orphanCount = await db.questionGroup.count({ where: { title: { contains: `Orphan Check ${ts}` } } });
    check("orphan: ZERO groups created in DB", orphanCount === 0, `found ${orphanCount}`);

    console.log("== 10. Empty envelope + non-AtomCode file ==");
    const emptyRes = await httpPost(`${BASE}/api/question-groups/import`, JSON.stringify({ atomcodeExport: true, group: { title: `Empty ${ts}` }, topics: [], questions: [], mcqQuestions: [] }));
    check("empty envelope 400", emptyRes.status === 400);
    const notAtom = await httpPost(`${BASE}/api/question-groups/import`, JSON.stringify({ hello: "world" }));
    check("non-atomcode 400", notAtom.status === 400);
    const wrongKind = await httpPost(`${BASE}/api/question-groups/import`, JSON.stringify({ atomcodeExport: true, kind: "question-group", group: { title: `Empty2 ${ts}` }, topics: [], questions: [], mcqQuestions: [] }));
    check("all-empty arrays 400", wrongKind.status === 400);

    console.log("== 11. Stress scale: 300 code + 300 MCQ via stream ==");
    const LANGS = ["c", "cpp", "java", "python", "sql", "javascript", "typescript", "ruby"];
    const bigQuestions = [];
    for (let i = 0; i < 300; i++) {
        bigQuestions.push({
            ...CODE_BASE,
            title: `Scale Q${String(i).padStart(4, "0")} ${ts}`,
            description: `Scale question ${i} — stress`,
            lang: LANGS[i % LANGS.length],
            maxscore: (i % 20) + 5,
            difficulty: ["easy", "medium", "hard"][i % 3],
            questionType: i % 10 === 0 ? "lab" : "practice",
            ...(i % 10 === 0 ? { company: `Company ${i % 5}`, frequency: "Medium", acceptanceRate: 20 + (i % 50) } : {}),
            tags: `scale,tag${i % 7}`,
            topic: `Scale Topic ${i % 9}`,
            subtopic: `Scale Sub ${i % 4}`,
        });
    }
    const bigMcqs = [];
    for (let i = 0; i < 300; i++) {
        bigMcqs.push({
            title: `Scale M${String(i).padStart(4, "0")} ${ts}`,
            description: `Scale MCQ ${i}`,
            difficulty: ["easy", "medium", "hard"][i % 3],
            tags: `mcq,tag${i % 5}`,
            topic: `Scale Topic ${i % 9}`,
            subtopic: `Scale Sub ${i % 4}`,
            Option1: `opt1-${i}`, Option2: `opt2-${i}`, Option3: `opt3-${i}`, Option4: `opt4-${i}`,
            CorrectOption: (i % 4) + 1,
            iscodesnippet: i % 15 === 0,
            ...(i % 15 === 0 ? { codesnippet: `print(${i})`, snippetLang: "python" } : {}),
        });
    }
    const bigFile = {
        atomcodeExport: true,
        version: 1,
        kind: "question-group",
        group: { title: `Scale Group ${ts}` },
        counts: { codeQuestions: 300, mcqQuestions: 300 },
        questions: bigQuestions,
        mcqQuestions: bigMcqs,
    };
    const bigValRes = await httpPost(`${BASE}/api/question-groups/import/validate`, JSON.stringify(bigFile));
    const bigVal = await bigValRes.json();
    check("scale: validate 600/600 valid", bigVal.validCounts?.codeQuestions === 300 && bigVal.validCounts?.mcqQuestions === 300 && bigVal.invalidCounts?.codeQuestions === 0 && bigVal.invalidCounts?.mcqQuestions === 0, JSON.stringify(bigVal.validCounts));

    const t0 = Date.now();
    const bigRes = await httpPost(`${BASE}/api/question-groups/import?stream=1`, JSON.stringify(bigFile));
    const bigText = await bigRes.text();
    const elapsed = Date.now() - t0;
    const bigEvents = bigText.split("\n").filter((l) => l.trim()).map((l) => JSON.parse(l));
    const bigDone = bigEvents[bigEvents.length - 1];
    const bigCodeProgress = bigEvents.filter((e) => e.t === "progress" && e.phase === "code");
    const bigMcqProgress = bigEvents.filter((e) => e.t === "progress" && e.phase === "mcq");
    check("scale: done 201", bigDone?.t === "done" && bigDone.status === 201, JSON.stringify(bigDone?.result ?? {}).slice(0, 150));
    check("scale: createdQuestions=300", bigDone?.result?.createdQuestions === 300, `got ${bigDone?.result?.createdQuestions}`);
    check("scale: createdMcqs=300", bigDone?.result?.createdMcqs === 300, `got ${bigDone?.result?.createdMcqs}`);
    check("scale: 15 code progress events (chunks of 20)", bigCodeProgress.length === 15, `got ${bigCodeProgress.length}`);
    check("scale: 15 mcq progress events", bigMcqProgress.length === 15, `got ${bigMcqProgress.length}`);
    check("scale: live counts advance", bigCodeProgress[bigCodeProgress.length - 1]?.done === 300 && bigCodeProgress[0]?.done === 20, JSON.stringify(bigCodeProgress.map((p) => p.done)));
    check("scale: zero failures", bigDone?.result?.failed === 0, `got ${bigDone?.result?.failed}`);
    console.log(`  INFO  scale import elapsed: ${(elapsed / 1000).toFixed(1)}s`);
    check("scale: finished under 120s", elapsed < 120000, `${elapsed}ms`);
    if (bigDone?.result?.groupId) createdGroupIds.add(bigDone.result.groupId);
    const scaleCount = await db.codeQuestion.count({ where: { questionGroupId: bigDone.result.groupId } });
    check("scale: DB row count = 300", scaleCount === 300, `got ${scaleCount}`);
    const scaleLab = await db.codeQuestion.count({ where: { questionGroupId: bigDone.result.groupId, questionType: "lab" } });
    check("scale: lab classification preserved (30 rows)", scaleLab === 30, `got ${scaleLab}`);

    console.log("== 12. Hand-edited robustness file ==");
    const handFile = {
        atomcodeExport: true,
        version: 1,
        kind: "question-group",
        group: { title: `Hand Edited ${ts}` },
        topics: [
            { name: "HandTopic", subtopics: [{ name: "Sub A" }, { name: "sub a" }] },
            { name: "handtopic", subtopics: [] },
        ],
        questions: [
            {
                title: "Hand Edited Question",
                description: "Hand edited with numeric strings",
                lang: "PYTHON",
                difficulty: "EASY",
                maxscore: "15",
                acceptanceRate: "40.5",
                questionType: "LAB",
                company: "Amazon",
                frequency: "Medium",
                topic: null,
                subtopic: "",
                tags: null,
                headerCode: null,
                sampleinput1: "1", sampleinput2: "2", sampleoutput1: "3", sampleoutput2: "4",
                input1: "5", input2: "6", input3: "7", output1: "8", output2: "9", output3: "10",
                sourcecode: null,
            },
        ],
        mcqQuestions: [
            {
                title: "Hand Edited MCQ",
                description: "No iscodesnippet flag but has snippet",
                Option1: "a", Option2: "b", Option3: "c", Option4: "d",
                CorrectOption: "3",
                difficulty: "HARD",
                codesnippet: "let x = 1;",
                tags: "",
            },
        ],
    };
    const handValRes = await httpPost(`${BASE}/api/question-groups/import/validate`, JSON.stringify(handFile));
    const handVal = await handValRes.json();
    check("hand-edited: validate all valid", handVal.importable === true && handVal.invalidCounts.codeQuestions === 0 && handVal.invalidCounts.mcqQuestions === 0, JSON.stringify({ v: handVal.validCounts, i: handVal.invalidCounts }));
    const handRes = await httpPost(`${BASE}/api/question-groups/import`, JSON.stringify(handFile));
    const handImp = await handRes.json();
    check("hand-edited: import 201 (1+1)", handRes.status === 201 && handImp.createdQuestions === 1 && handImp.createdMcqs === 1, JSON.stringify(handImp).slice(0, 150));
    if (handRes.status === 201) createdGroupIds.add(handImp.groupId);
    const handQ = await db.codeQuestion.findFirst({ where: { title: "Hand Edited Question" } });
    check("hand-edited: maxscore coerced 15", handQ?.maxscore === 15, `got ${handQ?.maxscore}`);
    check("hand-edited: lang lowercased python", handQ?.lang === "python", `got ${handQ?.lang}`);
    check("hand-edited: difficulty lowercased easy", handQ?.difficulty === "easy", `got ${handQ?.difficulty}`);
    check("hand-edited: questionType lowercased lab", handQ?.questionType === "lab", `got ${handQ?.questionType}`);
    check("hand-edited: acceptanceRate coerced 40.5", handQ?.acceptanceRate === 40.5, `got ${handQ?.acceptanceRate}`);
    check("hand-edited: nulls/empties → null in DB", handQ?.topic === null && handQ?.tags === null && handQ?.sourcecode === null, JSON.stringify({ t: handQ?.topic, g: handQ?.tags, s: handQ?.sourcecode }));
    const handM = await db.mCQQuestion.findFirst({ where: { title: "Hand Edited MCQ" } });
    check("hand-edited: CorrectOption coerced 3", handM?.CorrectOption === 3, `got ${handM?.CorrectOption}`);
    check("hand-edited: iscodesnippet inferred true + snippetLang text", handM?.iscodesnippet === true && handM?.snippetLang === "text", JSON.stringify({ i: handM?.iscodesnippet, l: handM?.snippetLang }));
    check("hand-edited: difficulty lowercased hard", handM?.difficulty === "hard", `got ${handM?.difficulty}`);
    check("hand-edited: empty tags → null", handM?.tags === null, `got ${handM?.tags}`);
    const handTopics = await db.topic.findMany({
        where: { groupId: handImp.groupId },
        include: { subtopics: true },
    });
    const handTopicNames = handTopics.map((t) => t.name.toLowerCase()).sort().join(",");
    check("hand-edited: topics merged case-insensitively (general,handtopic)", handTopicNames === "general,handtopic", handTopicNames);
    const handTopic = handTopics.find((t) => t.name.toLowerCase() === "handtopic");
    check("hand-edited: subtopic dup merged (general,sub a)", handTopic?.subtopics.length === 2, JSON.stringify(handTopic?.subtopics.map((s) => s.name)));

    console.log("== 13. Per-part import routes (shared normalizers) ==");
    const partQRow = { ...env.questions.find((q) => q.title === `Full Fields ${ts}`), title: `Per Part Q ${ts}` };
    const partQRes = await httpPost(`${BASE}/api/question-groups/${group.id}/questions/import`, JSON.stringify({ questions: [partQRow] }));
    const partQ = await partQRes.json();
    check("per-part questions import 1 created (new fields + nulls accepted)", partQRes.status === 200 && partQ.created === 1, JSON.stringify(partQ).slice(0, 150));
    const partQDb = await db.codeQuestion.findFirst({ where: { title: `Per Part Q ${ts}` } });
    check("per-part: tags + blacklist round-trip", partQDb?.tags === "arrays,loops" && partQDb?.blacklist === "os,sys", JSON.stringify({ t: partQDb?.tags, b: partQDb?.blacklist }));
    const partMRow = { ...env.mcqQuestions.find((m) => m.title === `MCQ Full ${ts}`), title: `Per Part M ${ts}` };
    const partMRes = await httpPost(`${BASE}/api/question-groups/${group.id}/mcq-questions/import`, JSON.stringify({ questions: [partMRow] }));
    const partM = await partMRes.json();
    check("per-part mcq import 1 created (tags accepted)", partMRes.status === 200 && partM.created === 1, JSON.stringify(partM).slice(0, 150));
    const partMDb = await db.mCQQuestion.findFirst({ where: { title: `Per Part M ${ts}` } });
    check("per-part mcq: tags + snippet round-trip", partMDb?.tags === "basics, syntax" && partMDb?.codesnippet === "print('hi')", JSON.stringify({ t: partMDb?.tags, c: partMDb?.codesnippet }));

    console.log(`== Done: ${passed} passed, ${failed} failed ==`);
}

async function cleanup() {
    console.log("== Cleanup ==");
    for (const id of createdGroupIds) {
        try {
            // Cascade: topics (FK cascade) + questions/MCQs (FK cascade).
            await db.topic.deleteMany({ where: { groupId: id } });
            await db.codeQuestion.deleteMany({ where: { questionGroupId: id } });
            await db.mCQQuestion.deleteMany({ where: { questionGroupId: id } });
            await db.questionGroup.delete({ where: { id } });
            console.log(`  deleted group ${id}`);
        } catch (e) {
            console.log(`  cleanup warning group ${id}: ${e.message}`);
        }
    }
    // Per-part smoke rows live in the seeded group (deleted above) — also
    // sweep any strays by title.
    await db.codeQuestion.deleteMany({ where: { title: { contains: "Per Part Q " } } }).catch(() => {});
    await db.mCQQuestion.deleteMany({ where: { title: { contains: "Per Part M " } } }).catch(() => {});
}

main()
    .catch((e) => {
        console.error("FATAL:", e?.message ?? e);
        failed++;
    })
    .finally(async () => {
        await cleanup();
        await db.$disconnect();
        process.exit(failed > 0 ? 1 : 0);
    });
