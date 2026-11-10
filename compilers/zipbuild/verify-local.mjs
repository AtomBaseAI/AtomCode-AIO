/**
 * AtomCode — local verification of the ZIP deployment layouts.
 *
 * Imports the REAL handler from the dist layout so the module-load PATH
 * prepend resolves the bundled toolchains exactly like on Lambda (/var/task).
 * runuser privilege-drop is attempted and expected to fall back gracefully
 * (Lambda has no runuser). Only ulimits are disabled — this sandbox is a
 * shared host.
 *
 *   node verify-local.mjs           # verify dist/core (python·ruby·sql·js·ts)
 *   node verify-local.mjs dist/gcc  # verify the gcc layout (c·cpp)
 *
 * The suite AUTO-DETECTS which languages a layout bundles (langspec/*.json)
 * and only tests those — the same script gates the core AND gcc zips in CI
 * without either run tripping over languages the other image doesn't ship.
 * (Run 15 failed exactly because the gcc layout was force-fed the core
 * suite: every request died at "No language configuration found" — a
 * harness bug, not a broken zip.)
 *
 * Exit code 0 = all checks passed.
 */

import path from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

process.env.ATOM_ULIMITS = "off"; // shared sandbox host only — Lambda keeps them

/* Error/stdout slices in the failure details below — generous on purpose:
 * compiler diagnostics (like a libstdc++ #include_next chain failure) are
 * long, and a 200-char cut hides the actual root cause (run 18). */
const DETAIL_CHARS = 2000;

const here = path.dirname(fileURLToPath(import.meta.url));
const layoutArg = process.argv[2];
const layout = layoutArg
  ? path.resolve(process.cwd(), layoutArg)
  : path.join(here, "dist", "core");

if (!existsSync(path.join(layout, "handler.mjs"))) {
  console.error(`No handler at ${layout} — run: node build-zips.mjs`);
  process.exit(1);
}

const { default: handler } = await import(`file://${path.join(layout, "handler.mjs")}`);

let pass = 0, fail = 0;
function check(label, ok, detail = "") {
  console.log(`${ok ? "✓" : "✗"} ${label}${detail && !ok ? `\n    ${detail.split("\n").join("\n    ")}` : ""}`);
  ok ? pass++ : fail++;
}

async function call(payload) {
  try {
    return await handler(payload);
  } catch (err) {
    return { type: "error", message: `handler threw: ${err?.message ?? err}` };
  }
}

/* ── detect the languages THIS layout bundles ─────────────────────────────
 * ZIP dists ship langspec/<lang>.json per bundled language (core: 5 files,
 * gcc: c + cpp). Intersect with the suites known to this script. */
const SPEC_DIR = path.join(layout, "langspec");
const ALL_LANGS = ["python", "ruby", "sql", "javascript", "typescript", "c", "cpp"];
const langs = existsSync(SPEC_DIR)
  ? ALL_LANGS.filter((l) => existsSync(path.join(SPEC_DIR, `${l}.json`)))
  : [];

if (langs.length === 0) {
  console.error(`No bundled languages found under ${SPEC_DIR} — nothing to verify.`);
  process.exit(1);
}
console.log(`\nlayout: ${layout}`);
console.log(`bundled languages: ${langs.join(", ")}`);

/* ── 1. single-run per language ─────────────────────────────────────────── */
const HELLO = {
  python:   { code: 'name = input()\nprint(f"Hello, {name}!")', stdin: "Atom", expected: "Hello, Atom!" },
  ruby:     { code: 'puts "Hello, Atom!"', expected: "Hello, Atom!" },
  sql:      { code: "CREATE TABLE t (id INTEGER, name TEXT);\nINSERT INTO t VALUES (1, 'Asha'), (2, 'Rahul');\nSELECT * FROM t;",
              expected: "id | name\n--- | ---\n1 | Asha\n2 | Rahul" },
  javascript: { code: 'console.log("Hello, Atom!");', expected: "Hello, Atom!" },
  typescript: { code: 'const msg: string = "Hello, Atom!";\nconsole.log(msg);', expected: "Hello, Atom!" },
  c:        { code: '#include <stdio.h>\nint main(){ printf("Hello, Atom!\\n"); return 0; }', expected: "Hello, Atom!" },
  cpp:      { code: '#include <iostream>\nint main(){ std::cout << "Hello, Atom!" << std::endl; }', expected: "Hello, Atom!" },
};

console.log(`\nA. SINGLE RUN (${layout})`);
for (const lang of langs) {
  const t = HELLO[lang];
  const res = await call({ language: lang, code: t.code, stdin: t.stdin ?? "", timeoutMs: 15000 });
  check(
    `${lang} single`,
    res.type === "result" && res.exitCode === 0 &&
      String(res.stdout ?? "").replace(/\n+$/, "") === t.expected,
    `type=${res.type} exit=${res.exitCode} stdout=${JSON.stringify(res.stdout?.slice(0, 400))} err=${JSON.stringify(res.stderr?.slice(0, DETAIL_CHARS))} msg=${JSON.stringify(res.message?.slice(0, DETAIL_CHARS))}`
  );
}

/* ── 2. multi-testcase judge per language ───────────────────────────────── */
const MULTI = {
  python: { code: "n = int(input())\nprint(n * 2)", cases: [["5", "10"], ["7", "14"], ["9", "999"]] },
  ruby:   { code: "n = gets.to_i\nputs n * 2",     cases: [["5", "10"], ["7", "14"], ["9", "999"]] },
  // sql: fixed code per case-set — case 2 is a placeholder (no input + no
  // expected output at index > 0) → auto-passes by judge semantics.
  sql:    { code: "CREATE TABLE n (v INT);\nINSERT INTO n VALUES (5);\nSELECT v FROM n;",
            cases: [["", "v\n---\n5"], ["", ""]], expect2of3: false },
  javascript: { code: "n = parseInt(require('fs').readFileSync(0,'utf8').trim(), 10)\nconsole.log(n * 2)",
            cases: [["5", "10"], ["7", "14"], ["9", "999"]] },
  typescript: { code: "const n: number = parseInt(require('fs').readFileSync(0,'utf8').trim(), 10);\nconsole.log(n * 2);",
            cases: [["5", "10"], ["7", "14"], ["9", "999"]] },
  c:      { code: '#include <stdio.h>\nint main(){ int n; if(scanf("%d",&n)!=1) return 1; printf("%d\\n", n*2); return 0; }',
            cases: [["5", "10"], ["7", "14"], ["9", "999"]] },
  cpp:    { code: '#include <iostream>\nint main(){ int n; std::cin >> n; std::cout << n*2 << std::endl; }',
            cases: [["5", "10"], ["7", "14"], ["9", "999"]] },
};

console.log("\nB. MULTI-TESTCASE JUDGE");
for (const lang of langs) {
  const t = MULTI[lang];
  const cases = t.cases.map(([input, expected]) => ({ input, expectedOutput: expected }));
  const res = await call({ language: lang, code: t.code, testcases: cases, timeoutMs: 15000 });
  const expectedTotal = t.cases.length;
  const statuses = res.results?.map((r) => r.status) ?? [];
  const ok = t.expect2of3 === false
    ? res.compileMessage === "Success" && res.passedCount === 2 && res.total === expectedTotal &&
      statuses[0] === "Success" && statuses[1] === "Success"
    : res.compileMessage === "Failed" && res.passedCount === 2 && res.total === expectedTotal && // failing case ⇒ aggregate Failed
      statuses[0] === "Success" && statuses[2] === "Failed" &&
      res.testcase1status === "success" && res.testcase3status === "failed";
  check(
    `${lang} multi judge semantics`,
    ok,
    `compile=${res.compileMessage} passed=${res.passedCount}/${res.total} statuses=${JSON.stringify(statuses)} msg=${JSON.stringify(res.compileMessageDetail?.slice(0, DETAIL_CHARS))}`
  );
}

/* ── 3. error paths (language-aware — must exercise a BUNDLED language) ─── */
console.log("\nC. ERROR PATHS");

const primary = langs[0];

/* java is unbundled in BOTH zip dists (core + gcc) — valid probe for all. */
const unknown = await call({ language: "java", code: "class A {}", timeoutMs: 5000 });
check(
  "unbundled language rejected (java → bad-request)",
  unknown.type === "error" && unknown.stage === "bad-request",
  JSON.stringify(unknown).slice(0, DETAIL_CHARS)
);

/* A snippet that fails to compile (or blow up) in its own language. */
const COMPILE_ERR_CODE = {
  python:     "def f(:\n  pass",
  ruby:       "def f(:",
  sql:        "SELEC 1 FROM t;",
  javascript: "function f({",
  typescript: "const x: number = ;",
  c:          "int main(){ return = 1; }",
  cpp:        "int main(){ return = 1; }",
};
const compileErr = await call({ language: primary, code: COMPILE_ERR_CODE[primary], timeoutMs: 15000 });
check(
  `compile/runtime error surfaces with stage (${primary})`,
  compileErr.type === "error" && (compileErr.stage === "compile" || compileErr.stage === "execute"),
  JSON.stringify(compileErr).slice(0, DETAIL_CHARS)
);

/* A keyword that really appears in the probe code, in the bundled language.
 * (Handler order: langspec resolve FIRST, then blacklist — so probing an
 * unbundled language would hit bad-request before the blacklist ever runs,
 * which is exactly the false positive run 15 recorded.) */
const BLACKLIST_HIT = {
  python:     { code: 'import os\nprint("nope")', keyword: "import" },
  ruby:       { code: 'require "set"\nputs "nope"', keyword: "require" },
  sql:        { code: "DROP TABLE t;", keyword: "DROP" },
  javascript: { code: 'require("fs"); console.log("nope");', keyword: "require" },
  typescript: { code: 'import * as fs from "fs";\nconsole.log("nope");', keyword: "import" },
  c:          { code: '#include <stdio.h>\nint main(){ return 0; }', keyword: "include" },
  cpp:        { code: '#include <iostream>\nint main(){ return 0; }', keyword: "include" },
};
const bl = BLACKLIST_HIT[primary];
const blacklisted = await call({
  language: primary,
  code: bl.code,
  checks: { blacklist: bl.keyword },
  timeoutMs: 5000,
});
check(
  `keyword blacklist enforced server-side (${primary})`,
  blacklisted.type === "error" && String(blacklisted.message ?? "").includes("Blacklist"),
  JSON.stringify(blacklisted).slice(0, DETAIL_CHARS)
);

const hello = HELLO[primary];
const echo = await call({ language: primary, code: hello.code, stdin: hello.stdin ?? "",
  executionId: "exec-verify-123", timeoutMs: 15000 });
check(
  "executionId echoed back",
  echo.executionId === "exec-verify-123",
  JSON.stringify(echo.executionId)
);

/* ── summary ────────────────────────────────────────────────────────────── */
console.log(`\n${layout}`);
console.log(`TOTAL: ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
