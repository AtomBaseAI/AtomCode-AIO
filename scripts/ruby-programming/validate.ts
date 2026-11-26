/**
 * Validator for the "Ruby Programming" question bank.
 *
 * Usage:
 *   bun scripts/ruby-programming/validate.ts <file1.json> [file2.json ...] [--all]
 *     [--no-compile] [--concurrency=4] [--report=<path>]
 *
 * - .code.json files: structure + difficulty matrix + taxonomy + Lambda compile/run
 *   of every question's sourcecode against 2 samples + 3 test cases (with checks).
 * - .mcq.json files: structure-only validation.
 * - Exit 0 when everything passes.
 */

import { TOPIC_TAXONOMY, RUBY_JUDGE_URL } from "./taxonomy.ts";

/* ── output normalization — IDENTICAL to src/lib/judge.ts ── */
function normalizeOutput(value) {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n")
    .replace(/\n+$/g, "")
    .trim();
}

/* ── CLI args ── */
const args = process.argv.slice(2);
const NO_COMPILE = args.includes("--no-compile");
const SMOKE = args.includes("--smoke");
const REPORTraw = args.find((a) => a.startsWith("--report="));
const REPORT = REPORTraw ? REPORTraw.split("=").slice(1).join("=") : undefined;
const concArg = args.find((a) => a.startsWith("--concurrency="));
const CONCURRENCY = concArg ? Math.max(1, parseInt(concArg.split("=")[1], 10) || 4) : 4;
const filePaths = args.filter((a) => !a.startsWith("--"));
if (args.includes("--all")) {
  const fs = await import("node:fs");
  const dir = new URL("./data/", import.meta.url).pathname;
  filePaths.push(
    ...fs.readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => dir + f)
  );
}
if (filePaths.length === 0) {
  console.error("No input files. Pass day-NN.code.json / day-NN.mcq.json paths or --all.");
  process.exit(2);
}

/* ── Lambda multi-testcase call with retries ── */
async function judgeMulti(code, testcases, checks, attempt = 0) {
  const body = { code, language: "ruby", testcases, timeoutMs: 25000 };
  if (checks && (checks.blacklist || checks.whitelist)) body.checks = checks;
  try {
    const res = await fetch(RUBY_JUDGE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(90_000),
    });
    if (res.status >= 500 || res.status === 429) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`Non-JSON response: ${text.slice(0, 200)}`);
    }
    if (res.status === 400 && data?.type === "error") {
      return { rejected: true, message: data.message || "rejected" };
    }
    return { data };
  } catch (err) {
    if (attempt < 2) {
      await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
      return judgeMulti(code, testcases, checks, attempt + 1);
    }
    return { networkError: String(err?.message || err) };
  }
}

/* ── structural validation ── */
const problems = [];

function validateStructure(kind, day, questions, topics) {
  const label = kind === "code" ? "code" : "mcq";
  const expectedTotal = 20;
  const difficultyCounts = { easy: 0, medium: 0, hard: 0 };
  const titles = new Set();

  const taxonomy = TOPIC_TAXONOMY[day] || [];
  const topicNames = taxonomy.map((t) => t.name);
  const subtopicsByTopic = Object.fromEntries(taxonomy.map((t) => [t.name, t.subtopics]));
  if (kind === "code") {
    const declared = (topics || []).map((t) => t.name).sort().join("|");
    const expected = [...topicNames].sort().join("|");
    if (declared !== expected) {
      problems.push(`[day ${day}] topics mismatch: declared "${declared}" expected "${expected}"`);
    }
    for (const t of topics || []) {
      const exp = (subtopicsByTopic[t.name] || []).sort().join("|");
      const got = [...(t.subtopics || [])].sort().join("|");
      if (got !== exp) {
        problems.push(`[day ${day}] subtopics mismatch for topic "${t.name}": declared "${got}" expected "${exp}"`);
      }
    }
  }

  if (!SMOKE && questions.length !== expectedTotal) {
    problems.push(`[day ${day}] ${label}: expected exactly ${expectedTotal} questions, got ${questions.length}`);
  }

  questions.forEach((q, i) => {
    const id = `day ${day} ${label} #${i + 1} "${q.title ?? "?"}"`;
    difficultyCounts[q.difficulty] = (difficultyCounts[q.difficulty] || 0) + 1;
    if (titles.has(q.title)) problems.push(`${id}: duplicate title`);
    titles.add(q.title);

    if (!topicNames.includes(q.topic)) {
      problems.push(`${id}: topic "${q.topic}" not in taxonomy for day ${day} (${topicNames.join(", ")})`);
    } else if (!(subtopicsByTopic[q.topic] || []).includes(q.subtopic)) {
      problems.push(`${id}: subtopic "${q.subtopic}" not valid for topic "${q.topic}"`);
    }

    if (kind === "code") {
      const req = ["title", "description", "difficulty", "variant", "maxscore", "lang", "topic", "subtopic",
        "sampleinput1", "sampleoutput1", "sampleinput2", "sampleoutput2",
        "input1", "output1", "input2", "output2", "input3", "output3",
        "inputconstrains", "blacklist", "whitelist", "sourcecode"];
      for (const f of req) {
        if (q[f] === undefined || q[f] === null) problems.push(`${id}: missing field ${f}`);
      }
      if (q.lang !== "ruby") problems.push(`${id}: lang must be "ruby"`);
      if (q.difficulty === "easy") {
        if (q.maxscore !== 10) problems.push(`${id}: easy maxscore must be 10`);
        if (q.blacklist || q.whitelist) problems.push(`${id}: easy questions must have empty blacklist/whitelist`);
        if (!["basic", "scenario"].includes(q.variant)) problems.push(`${id}: easy variant must be basic|scenario`);
      } else if (q.difficulty === "medium") {
        if (q.maxscore !== 20) problems.push(`${id}: medium maxscore must be 20`);
        if (!q.blacklist || !q.whitelist) problems.push(`${id}: medium must define blacklist AND whitelist`);
        if (q.variant !== "scenario") problems.push(`${id}: medium variant must be scenario`);
      } else if (q.difficulty === "hard") {
        if (q.maxscore !== 30) problems.push(`${id}: hard maxscore must be 30`);
        if (!q.blacklist || !q.whitelist) problems.push(`${id}: hard must define blacklist AND whitelist`);
        if (q.variant !== "scenario") problems.push(`${id}: hard variant must be scenario`);
      } else {
        problems.push(`${id}: invalid difficulty "${q.difficulty}"`);
      }
      for (const f of ["sampleinput1", "sampleoutput1", "sampleinput2", "sampleoutput2", "input1", "output1", "input2", "output2", "input3", "output3"]) {
        if (typeof q[f] === "string" && q[f].length === 0) problems.push(`${id}: field ${f} must be non-empty`);
      }
      if (typeof q.sourcecode === "string") {
        if (q.sourcecode.length < 20) problems.push(`${id}: sourcecode suspiciously short`);
        for (const [field, want] of [["blacklist", false], ["whitelist", true]]) {
          const items = String(q[field] ?? "").split(",").map((s) => s.trim()).filter(Boolean);
          for (const kw of items) {
            const present = q.sourcecode.includes(kw);
            if (want === false && present) problems.push(`${id}: blacklisted keyword "${kw}" appears in reference solution`);
            if (want === true && !present) problems.push(`${id}: whitelisted keyword "${kw}" missing from reference solution`);
          }
        }
      }
    } else {
      for (const f of ["title", "description", "difficulty", "topic", "subtopic", "Option1", "Option2", "Option3", "Option4", "CorrectOption", "iscodesnippet"]) {
        if (q[f] === undefined || q[f] === null) problems.push(`${id}: missing field ${f}`);
      }
      const opts = [q.Option1, q.Option2, q.Option3, q.Option4].map((o) => String(o ?? "").trim());
      if (opts.some((o) => o.length === 0)) problems.push(`${id}: empty option`);
      if (new Set(opts).size !== 4) problems.push(`${id}: options are not distinct`);
      if (![1, 2, 3, 4].includes(q.CorrectOption)) problems.push(`${id}: CorrectOption must be 1..4`);
      const lower = opts.map((o) => o.toLowerCase());
      if (lower.some((o) => o.includes("all of the above") || o.includes("none of the above"))) {
        problems.push(`${id}: options must not use "all/none of the above"`);
      }
      if (q.iscodesnippet) {
        if (!q.codesnippet) problems.push(`${id}: iscodesnippet true but codesnippet empty`);
        if (q.snippetLang !== "ruby") problems.push(`${id}: snippetLang must be "ruby"`);
      } else if (q.codesnippet) {
        problems.push(`${id}: codesnippet set but iscodesnippet is false`);
      }
    }
  });

  if (!SMOKE) {
    const exp = { easy: 10, medium: 6, hard: 4 };
    for (const d of ["easy", "medium", "hard"]) {
      if (difficultyCounts[d] !== exp[d]) {
        problems.push(`[day ${day}] ${label}: difficulty "${d}" count ${difficultyCounts[d]} != ${exp[d]}`);
      }
    }
    if (kind === "code") {
      const basic = questions.filter((q) => q.difficulty === "easy" && q.variant === "basic").length;
      const scenarioEasy = questions.filter((q) => q.difficulty === "easy" && q.variant === "scenario").length;
      if (basic !== 6 || scenarioEasy !== 4) {
        problems.push(`[day ${day}] code easy split must be 6 basic + 4 scenario, got basic=${basic} scenario=${scenarioEasy}`);
      }
    } else {
      const snippets = questions.filter((q) => q.iscodesnippet).length;
      if (snippets < 6) problems.push(`[day ${day}] mcq: need at least 6 code-snippet MCQs, got ${snippets}`);
    }
  }

  return { questions, titles: [...titles] };
}

/* ── compile/run validation ── */
async function validateOnCompiler(day, q) {
  const testcases = [
    { input: q.sampleinput1, expectedOutput: q.sampleoutput1 },
    { input: q.sampleinput2, expectedOutput: q.sampleoutput2 },
    { input: q.input1, expectedOutput: q.output1 },
    { input: q.input2, expectedOutput: q.output2 },
    { input: q.input3, expectedOutput: q.output3 },
  ];
  const checks = {};
  if (q.blacklist) checks.blacklist = q.blacklist;
  if (q.whitelist) checks.whitelist = q.whitelist;

  const r = await judgeMulti(q.sourcecode, testcases, Object.keys(checks).length ? checks : null);
  if (r.networkError) return { ok: false, error: `network: ${r.networkError}` };
  if (r.rejected) return { ok: false, error: `checks rejected: ${r.message}` };

  const d = r.data;
  if (d.compileMessage !== "Success") {
    return { ok: false, error: `compile ${d.compileMessage}: ${String(d.compileMessageDetail || "").slice(0, 300)}` };
  }
  const results = d.results || [];
  const caseNames = ["sample1", "sample2", "tc1", "tc2", "tc3"];
  const diffs = [];
  let allPass = true;
  results.forEach((res, i) => {
    const exp = normalizeOutput(testcases[i]?.expectedOutput ?? "");
    const act = normalizeOutput(res.output ?? "");
    if (res.status !== "Success" || act !== exp) {
      allPass = false;
      diffs.push(`${caseNames[i]}: expected ${JSON.stringify(exp.slice(0, 160))} got ${JSON.stringify(act.slice(0, 160))} [${res.status}]`);
    }
  });
  if (!allPass) return { ok: false, error: diffs.join(" | ") };
  return { ok: true };
}

/* ── main ── */
const allTitles = { code: new Map(), mcq: new Map() };
const filesSummary = [];
let fatal = false;

for (const fp of filePaths) {
  const fs = await import("node:fs");
  const raw = fs.readFileSync(fp, "utf8");
  let json;
  try {
    json = JSON.parse(raw);
  } catch (e) {
    console.error(`✗ ${fp}: INVALID JSON — ${e.message}`);
    fatal = true;
    continue;
  }
  const kind = fp.endsWith(".mcq.json") ? "mcq" : "code";
  const day = json.day;
  if (!TOPIC_TAXONOMY[day]) {
    console.error(`✗ ${fp}: unknown day ${day}`);
    fatal = true;
    continue;
  }

  const before = problems.length;
  const { questions } = validateStructure(kind, day, json.questions || [], json.topics);
  const structFail = problems.length > before;

  let passCount = 0;
  let failCount = 0;
  const failures = [];

  if (kind === "code" && !NO_COMPILE && !structFail) {
    const queue = [...questions];
    const workers = Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
      while (queue.length) {
        const q = queue.shift();
        const res = await validateOnCompiler(day, q);
        if (res.ok) {
          passCount++;
          process.stdout.write(`✓ [day ${day}] ${q.title}\n`);
        } else {
          failCount++;
          failures.push({ title: q.title, error: res.error });
          process.stdout.write(`✗ [day ${day}] ${q.title} — ${String(res.error).slice(0, 400)}\n`);
        }
      }
    });
    await Promise.all(workers);
  }

  const tmap = kind === "code" ? allTitles.code : allTitles.mcq;
  for (const t of questions.map((q) => q.title)) {
    if (tmap.has(t)) problems.push(`duplicate ${kind} title across days: "${t}" (also in ${tmap.get(t)})`);
    else tmap.set(t, fp);
  }

  const newProblems = problems.slice(before);
  filesSummary.push({ file: fp, day, kind, questions: questions.length, passCount, failCount, structureProblems: newProblems, failures });
}

console.log("\n════════════ SUMMARY ════════════");
for (const s of filesSummary) {
  const compiled = s.kind === "code" && !NO_COMPILE ? ` · compiler pass ${s.passCount}/${s.questions}` : "";
  console.log(`${s.file} · day ${s.day} · ${s.kind} · ${s.questions} questions${compiled} · structure problems: ${s.structureProblems.length}`);
}
if (problems.length) {
  console.log(`\n${problems.length} structural problem(s):`);
  for (const p of problems) console.log("  - " + p);
}
if (REPORT) {
  const fs = await import("node:fs");
  fs.writeFileSync(REPORT, JSON.stringify({ problems, filesSummary }, null, 2));
}
if (fatal || problems.length || filesSummary.some((s) => s.failCount > 0)) {
  console.log("\nRESULT: FAIL");
  process.exit(1);
}
console.log("\nRESULT: PASS");
