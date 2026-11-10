/**
 * AtomCode Lambda compilers — FULL verification suite (no AWS needed).
 *
 * Exercises the REAL handler.mjs (byte-identical to the one inside every
 * Lambda image) across every execution mode and every language:
 *
 *   A. Toolchain inventory
 *   B. SINGLE mode  — hello world, no input (8 languages)
 *   C. SINGLE mode  — one stdin input → one output (8 languages)
 *   D. SINGLE mode  — version profiles (java-21, c99, c++20, python-3.13)
 *   E. SINGLE mode  — SQL structured payload (columns / rows / changes / NULL)
 *   F. MULTI  mode  — several input/output pairs in ONE request (8 languages)
 *                     + intentional fail case + compile-fail + error cascade
 *   G. ERROR paths  — compile errors, runtime errors, exit codes
 *   H. TIMEOUT      — infinite loops killed hard (js + python)
 *   I. GUARDS       — keyword blacklist/whitelist, bad requests, limits,
 *                     executionId echo
 *   J. HTTP         — Function-URL contract through the local emulator
 *                     (status codes 200/400/401, ATOM_TOKEN, invalid JSON)
 *
 *   node test/full-verification.mjs     (or: bun test/full-verification.mjs)
 *
 * Exit code 0 = everything passed.
 */

import handler from "../functions/_shared/handler.mjs";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

/* ── sandbox-local environment ────────────────────────────────────────────
 * ATOM_DROP_PRIVILEGES=off : local user is unprivileged (no runuser)
 * ATOM_ULIMITS=off         : shared sandbox host — rlimits would break fork()
 * Portable JDK / Ruby are prepended to PATH (Lambda images carry their own
 * toolchains; these only exist so the local sandbox can run all 8 langs).
 */
process.env.ATOM_DROP_PRIVILEGES = "off";
process.env.ATOM_ULIMITS = "off";
process.env.PATH = `/tmp/jdk-21.0.13+9/bin:/tmp/ruby-bin:${process.env.PATH}`;
process.env.JAVA_HOME = "/tmp/jdk-21.0.13+9";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* ────────────────────────── reporting helpers ─────────────────────────── */

const counter = { pass: 0, fail: 0 };
const matrix = new Map(); // language → { single: "pass"|"fail", multi: "pass"|"fail" }

function banner(title) {
  console.log(`\n──────────────────────────────────────────────────────────────`);
  console.log(`${title}`);
  console.log(`──────────────────────────────────────────────────────────────`);
}

function show(label, ok, detail = "") {
  const icon = ok ? "✓" : "✗";
  console.log(`${icon} ${label}`);
  if (detail) console.log(`    ${detail.split("\n").join("\n    ")}`);
  counter[ok ? "pass" : "fail"]++;
  return ok;
}

function fmt(v) {
  return JSON.stringify(v ?? null);
}

/** Direct handler invoke (Function-URL events are exercised in part J). */
async function call(payload) {
  try {
    return await handler(payload);
  } catch (err) {
    return { type: "error", message: `handler threw: ${err?.message ?? err}` };
  }
}

function recordMatrix(lang, mode, ok) {
  const entry = matrix.get(lang) ?? {};
  entry[mode] = ok ? "pass" : "FAIL";
  matrix.set(lang, entry);
}

/* ════════════════════════ A. TOOLCHAIN INVENTORY ═══════════════════════ */

banner("A. TOOLCHAIN INVENTORY (local equivalents of the Lambda images)");
const probeCmds = [
  ["node", ["--version"], "javascript / typescript runtime"],
  ["python3.12", ["--version"], "python"],
  ["/tmp/ruby-bin/ruby", ["--version"], "ruby (portable 3.4.5)"],
  ["gcc", ["--version"], "c"],
  ["g++", ["--version"], "cpp"],
  ["javac", ["--version"], "java (portable JDK 21)"],
  ["java", ["--version"], "java runtime"],
];
for (const [bin, args, purpose] of probeCmds) {
  const out = await new Promise((resolve) => {
    const p = spawn(bin, args, { stdio: ["ignore", "pipe", "pipe"] });
    let s = "";
    p.stdout.on("data", (d) => (s += d));
    p.stderr.on("data", (d) => (s += d));
    p.on("error", (e) => resolve(`MISSING (${e.message})`));
    p.on("close", () => resolve(s.trim().split("\n")[0]));
  });
  show(`${bin.padEnd(12)} → ${purpose}`, !out.startsWith("MISSING"), out);
}

/* ════════════════════ B. SINGLE MODE — hello (no input) ════════════════ */

banner("B. SINGLE EXECUTION MODE — one request, no input, one output");

const HELLO = [
  ["javascript", 'console.log("Hello, Atom!");', "Hello, Atom!"],
  ["typescript", 'const msg: string = "Hello, Atom!";\nconsole.log(msg);', "Hello, Atom!"],
  ["python", 'print("Hello, Atom!")', "Hello, Atom!"],
  ["ruby", 'puts "Hello, Atom!"', "Hello, Atom!"],
  ["sql", "SELECT 'Hello, Atom!' AS greeting;", "greeting\n---\nHello, Atom!"],
  [
    "c",
    '#include <stdio.h>\nint main(){ printf("Hello, Atom!\\n"); return 0; }',
    "Hello, Atom!",
  ],
  [
    "cpp",
    '#include <iostream>\nint main(){ std::cout << "Hello, Atom!" << std::endl; }',
    "Hello, Atom!",
  ],
  [
    "java",
    'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Atom!");\n    }\n}',
    "Hello, Atom!",
  ],
];

for (const [lang, code, expected] of HELLO) {
  const t0 = Date.now();
  const r = await call({ language: lang, code, executionId: `hello-${lang}` });
  const ok =
    r.type === "result" &&
    r.stdout.replace(/\n+$/, "") === expected &&
    r.exitCode === 0 &&
    r.executionId === `hello-${lang}`;
  recordMatrix(lang, "single", ok);
  show(
    `${lang.padEnd(11)} single-run`,
    ok,
    ok
      ? `stdout=${fmt(r.stdout)}  exit=${r.exitCode}  exec=${Math.round(r.executionTimeMs)}ms  total=${Date.now() - t0}ms`
      : `response=${fmt(r).slice(0, 500)}`
  );
}

/* ═══════════════════ C. SINGLE MODE — one stdin → one output ═══════════ */

banner("C. SINGLE EXECUTION MODE — one stdin input → one output");

const WITH_INPUT = [
  [
    "javascript",
    "const n = parseInt(require('fs').readFileSync(0,'utf8').trim());\nconsole.log(`n^2 = ${n * n}`);",
    "12",
    "n^2 = 144",
  ],
  [
    "typescript",
    "const n: number = parseInt(require('fs').readFileSync(0,'utf8').trim());\nconst sq: number = n * n;\nconsole.log(`n^2 = ${sq}`);",
    "12",
    "n^2 = 144",
  ],
  ["python", "n = int(input())\nprint(f\"{n} * 2 = {n * 2}\")", "21", "21 * 2 = 42"],
  ["ruby", 'n = gets.to_i\nputs "square=#{n * n}"', "6", "square=36"],
  [
    "sql",
    "CREATE TABLE marks (v INTEGER);\nINSERT INTO marks VALUES (40), (2);\nSELECT SUM(v) AS total FROM marks;",
    "",
    "total\n---\n42",
  ],
  [
    "c",
    '#include <stdio.h>\nint main(){ int n; if (scanf("%d", &n) != 1) return 1; printf("n*10 = %d\\n", n * 10); return 0; }',
    "4",
    "n*10 = 40",
  ],
  [
    "cpp",
    '#include <iostream>\nint main(){ int n; std::cin >> n; std::cout << "half=" << n / 2 << std::endl; }',
    "9",
    "half=4",
  ],
  [
    "java",
    'import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        System.out.println("got " + (n + 1));\n    }\n}',
    "41",
    "got 42",
  ],
];

for (const [lang, code, stdin, expected] of WITH_INPUT) {
  const r = await call({ language: lang, code, stdin });
  const ok = r.type === "result" && r.stdout.replace(/\n+$/, "") === expected;
  show(
    `${lang.padEnd(11)} stdin=${fmt(stdin)} → stdout=${fmt(r.stdout)}`,
    ok,
    ok
      ? `exit=${r.exitCode}  exec=${Math.round(r.executionTimeMs)}ms${r.stderr ? `  stderr=${fmt(r.stderr)}` : ""}`
      : `response=${fmt(r).slice(0, 500)}`
  );
}

/* ═══════════════════════ D. SINGLE MODE — version profiles ═════════════ */

banner("D. SINGLE EXECUTION MODE — version profile flags");

const PROFILES = [
  ["java", "java-21", 'public class Main {\n    public static void main(String[] a) {\n        System.out.println("java 21 ok");\n    }\n}', "java 21 ok"],
  ["c", "c-c99", '#include <stdio.h>\nint main(){ for (int i = 0; i < 2; i++) printf("%d", i); printf("\\n"); return 0; }', "01"],
  ["cpp", "cpp-cpp20", '#include <iostream>\nint main(){ auto x = 20; std::cout << "cpp20 " << x << std::endl; }', "cpp20 20"],
  ["python", "python-3.13", "import sys\nprint(f\"py ok\")", "py ok"],
];
for (const [lang, profile, code, expected] of PROFILES) {
  const r = await call({ language: lang, code, versionProfileId: profile });
  const ok = r.type === "result" && r.stdout.replace(/\n+$/, "") === expected;
  show(
    `${lang.padEnd(11)} profile=${profile}`,
    ok,
    ok ? `stdout=${fmt(r.stdout)}  compile=${Math.round(r.compileTimeMs ?? 0)}ms` : `response=${fmt(r).slice(0, 400)}`
  );
}

/* ═══════════════════ E. SQL STRUCTURED PAYLOAD ═════════════════════════ */

banner("E. SINGLE EXECUTION MODE — SQL structured payload (grid + json)");

{
  const r = await call({
    language: "sql",
    code:
      "CREATE TABLE students (id INTEGER, name TEXT, score REAL);\n" +
      "INSERT INTO students VALUES (1, 'Asha', 91.5), (2, 'Rahul', 84.0), (3, 'Meera', NULL);\n" +
      "SELECT * FROM students ORDER BY id;",
  });
  const expectedGrid =
    "id | name | score\n--- | --- | ---\n1 | Asha | 91.5\n2 | Rahul | 84\n3 | Meera | NULL";
  const ok =
    r.type === "result" &&
    r.stdout === expectedGrid &&
    r.sql?.columns?.join(",") === "id,name,score" &&
    r.sql?.rows?.length === 3 &&
    r.sql?.rows?.[0]?.join("|") === "1|Asha|91.5" &&
    r.sql?.rows?.[2]?.join("|") === "3|Meera|" && // last cell null → empty on join
    r.sql?.rows?.[2]?.[2] === null &&
    r.sql?.changes === 3;
  show("sql grid + payload", ok, ok ? `sql=${fmt(r.sql)}` : `response=${fmt(r).slice(0, 600)}`);
}

/* ══════════════════ F. MULTI MODE — many I/O pairs, one request ════════ */

banner("F. MULTI EXECUTION MODE — multiple input/output pairs in ONE request");

const MULTI = [
  [
    "javascript",
    "const n = parseInt(require('fs').readFileSync(0,'utf8').trim());\nconsole.log(n * 2);",
    [
      { input: "4", expectedOutput: "8" },
      { input: "10", expectedOutput: "20" },
      { input: "", expectedOutput: "" }, // placeholder → auto-pass
    ],
    { compileMessage: "Success", passed: 3, total: 3, statuses: "Success,Success,Success" },
  ],
  [
    "typescript",
    "const n: number = parseInt(require('fs').readFileSync(0,'utf8').trim());\nconsole.log(n * 3);",
    [
      { input: "5", expectedOutput: "15" },
      { input: "7", expectedOutput: "21" },
      { input: "", expectedOutput: "" },
    ],
    { compileMessage: "Success", passed: 3, total: 3, statuses: "Success,Success,Success" },
  ],
  [
    "python",
    "n = int(input())\nprint(n * 2)",
    [
      { input: "5", expectedOutput: "10" },
      { input: "7", expectedOutput: "14" },
      { input: "", expectedOutput: "" },
    ],
    { compileMessage: "Success", passed: 3, total: 3, statuses: "Success,Success,Success" },
  ],
  [
    "ruby",
    "n = gets.to_i\nputs n * 2",
    [
      { input: "3", expectedOutput: "6" },
      { input: "9", expectedOutput: "18" },
      { input: "", expectedOutput: "" },
    ],
    { compileMessage: "Success", passed: 3, total: 3, statuses: "Success,Success,Success" },
  ],
  [
    "sql",
    "SELECT 1+1 AS two;",
    [
      { input: "", expectedOutput: "two\n---\n2" },
      { input: "", expectedOutput: "two\n---\n2" },
      { input: "", expectedOutput: "" }, // placeholder → auto-pass
    ],
    { compileMessage: "Success", passed: 3, total: 3, statuses: "Success,Success,Success" },
  ],
  [
    "c",
    '#include <stdio.h>\nint main(){ int n; if (scanf("%d", &n) != 1) return 1; printf("%d\\n", n * 3); return 0; }',
    [
      { input: "2", expectedOutput: "6" },
      { input: "5", expectedOutput: "15" },
      { input: "", expectedOutput: "" },
    ],
    { compileMessage: "Success", passed: 3, total: 3, statuses: "Success,Success,Success" },
  ],
  [
    "cpp",
    '#include <iostream>\nint main(){ int n; std::cin >> n; std::cout << n * 3 << std::endl; }',
    [
      { input: "4", expectedOutput: "12" },
      { input: "11", expectedOutput: "33" },
      { input: "", expectedOutput: "" },
    ],
    { compileMessage: "Success", passed: 3, total: 3, statuses: "Success,Success,Success" },
  ],
  [
    "java",
    'import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        System.out.println(n * 2);\n    }\n}',
    [
      { input: "6", expectedOutput: "12" },
      { input: "25", expectedOutput: "50" },
      { input: "", expectedOutput: "" },
    ],
    { compileMessage: "Success", passed: 3, total: 3, statuses: "Success,Success,Success" },
  ],
];

for (const [lang, code, testcases, expect] of MULTI) {
  const r = await call({ language: lang, code, testcases });
  const statuses = (r.results ?? []).map((x) => x.status).join(",");
  const ok =
    r.compileMessage === expect.compileMessage &&
    r.passedCount === expect.passed &&
    r.total === expect.total &&
    statuses === expect.statuses &&
    r.testcase1status === "success" &&
    typeof r.output1 === "string";
  recordMatrix(lang, "multi", ok);
  const detail = (r.results ?? [])
    .map((x, i) => `case${i + 1}: ${x.status} output=${fmt(x.output)}`)
    .join("  |  ");
  show(
    `${lang.padEnd(11)} multi-judge (${expect.passed}/${expect.total} passed)`,
    ok,
    ok ? detail : `response=${fmt(r).slice(0, 600)}`
  );
}

/* F2 — intentional wrong expected output → Failed */

banner("F2. MULTI MODE — wrong expected output must report Failed");

{
  const r = await call({
    language: "python",
    code: "n = int(input())\nprint(n * 2)",
    testcases: [
      { input: "5", expectedOutput: "10" },  // pass
      { input: "7", expectedOutput: "99" },  // wrong → Failed
      { input: "", expectedOutput: "" },     // placeholder
    ],
  });
  const statuses = (r.results ?? []).map((x) => x.status).join(",");
  const ok =
    r.compileMessage === "Failed" &&
    statuses === "Success,Failed,Success" &&
    r.passedCount === 2 &&
    r.results?.[1]?.output?.replace(/\n+$/, "") === "14"; // raw stdout, judged normalized
  show("python multi: case2 wrong expected", ok, `results=${fmt(r.results)}  passedCount=${r.passedCount}/${r.total}  compileMessage=${r.compileMessage}`);
}

/* F3 — compile failure inside a multi request */

banner("F3. MULTI MODE — compile failure cascades to every case");

{
  const r = await call({
    language: "java",
    code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("missing brace" \n    }\n}',
    testcases: [
      { input: "1", expectedOutput: "1" },
      { input: "2", expectedOutput: "2" },
    ],
  });
  const ok =
    r.compileMessage === "Error" &&
    r.results?.every((x) => x.status === "Error") &&
    /error/i.test(r.compileMessageDetail ?? "");
  show("java multi: javac failure → all Error", ok, `compileMessageDetail=${fmt((r.compileMessageDetail ?? "").split("\n")[0]).slice(0, 160)}  statuses=${(r.results ?? []).map((x) => x.status).join(",")}`);
}

/* F4 — runtime error mid-run cascades (wasm-judge semantics) */

banner("F4. MULTI MODE — runtime error on case 1 → remaining cases Error");

{
  const r = await call({
    language: "python",
    code: 'raise RuntimeError("boom-mid-run")',
    testcases: [
      { input: "1", expectedOutput: "1" },
      { input: "2", expectedOutput: "2" },
    ],
  });
  const ok =
    r.compileMessage === "Error" &&
    r.results?.length === 2 &&
    r.results?.every((x) => x.status === "Error") &&
    /boom-mid-run/.test(r.results?.[0]?.output ?? "");
  show("python multi: runtime error cascade", ok, `case1 output=${fmt((r.results?.[0]?.output ?? "").split("\n").slice(-1)[0])}  compileMessage=${r.compileMessage}`);
}

/* ═══════════════════════ G. ERROR PATHS ════════════════════════════════ */

banner("G. ERROR VERIFICATION — compile errors, runtime errors, exit codes");

const COMPILE_ERRORS = [
  ["c", 'int main( { broken', (m) => /error/i.test(m)],
  ["cpp", 'int main( { <<<<', (m) => /error/i.test(m)],
  [
    "java",
    'public class Main {\n    public static void main(String[] args) {\n        System.out.println("x" \n    }\n}',
    (m) => /error/i.test(m),
  ],
];
for (const [lang, code, msgOk] of COMPILE_ERRORS) {
  const r = await call({ language: lang, code });
  const ok = r.type === "error" && r.stage === "compile" && msgOk(r.message ?? "");
  show(`${lang.padEnd(11)} compile error → stage="compile"`, ok, `message=${fmt((r.message ?? "").split("\n").slice(0, 2).join(" | ")).slice(0, 200)}`);
}

const RUNTIME_ERRORS = [
  ["javascript", 'throw new Error("js-kaboom");', /js-kaboom/],
  ["typescript", 'throw new Error("ts-kaboom");', /ts-kaboom/],
  ["python", "x = 1 / 0", /ZeroDivisionError/],
  ["ruby", 'raise "ruby-nope"', /ruby-nope/],
  ["sql", "SELECT * FROM no_such_table;", /no such table/],
];
for (const [lang, code, re] of RUNTIME_ERRORS) {
  const r = await call({ language: lang, code });
  const ok = r.type === "error" && r.stage === "execute" && re.test(r.message ?? "");
  show(`${lang.padEnd(11)} runtime error → stage="execute"`, ok, `message=${fmt((r.message ?? "").split("\n").slice(-2).join(" | ")).slice(0, 200)}`);
}

{
  // interpreted-language syntax errors surface as execute-stage errors
  // (mirrors the WASM workers — transpile/parse happens inside the run)
  const r = await call({ language: "python", code: "def broken(:\n  pass" });
  const ok = r.type === "error" && r.stage === "execute" && /SyntaxError|invalid syntax/.test(r.message ?? "");
  show(`python      syntax error → stage="execute"`, ok, `message=${fmt((r.message ?? "").split("\n").slice(-2).join(" | ")).slice(0, 200)}`);
}

{
  // native exit codes are preserved on the result contract
  const r = await call({ language: "c", code: '#include <stdlib.h>\nint main(){ return 3; }' });
  const ok = r.type === "result" && r.exitCode === 3;
  show(`c           exit(3) → result.exitCode=3`, ok, `exitCode=${r.exitCode}  stdout=${fmt(r.stdout)}`);
  const rj = await call({
    language: "java",
    code: 'public class Main {\n    public static void main(String[] a) {\n        System.exit(2);\n    }\n}',
  });
  const okj = rj.type === "result" && rj.exitCode === 2;
  show(`java        System.exit(2) → result.exitCode=2`, okj, `exitCode=${rj.exitCode}`);
}

/* ═══════════════════════ H. TIMEOUT HANDLING ═══════════════════════════ */

banner("H. TIMEOUT — infinite loops killed hard");

{
  const r = await call({ language: "javascript", code: "while (true) {}", timeoutMs: 3000 });
  const ok = r.type === "error" && r.timedOut === true && /timed out/i.test(r.message ?? "");
  show(`javascript  while(true) 3s`, ok, `message=${fmt(r.message)}  timedOut=${r.timedOut}`);
  const rp = await call({ language: "python", code: "while True:\n    pass", timeoutMs: 3000 });
  const okp = rp.type === "error" && rp.timedOut === true;
  show(`python      while True 3s`, okp, `message=${fmt(rp.message)}  timedOut=${rp.timedOut}`);
}

/* ═══════════════════════ I. GUARDS & LIMITS ════════════════════════════ */

banner("I. GUARDS — keyword checks, bad requests, limits, executionId echo");

{
  const rb = await call({
    language: "python",
    code: 'eval("1+1")',
    checks: { blacklist: "eval,exec" },
  });
  show(
    "blacklist keyword rejected",
    rb.type === "error" && /Blacklist/.test(rb.message ?? ""),
    `message=${fmt(rb.message)}  stage=${rb.stage}`
  );

  const rw = await call({
    language: "python",
    code: 'print("hi")',
    checks: { whitelist: "for,range" },
  });
  show(
    "whitelist keyword enforced",
    rw.type === "error" && /Whitelist/.test(rw.message ?? ""),
    `message=${fmt(rw.message)}  stage=${rw.stage}`
  );

  const re = await call({ language: "python", code: "   " });
  show(
    "empty code rejected",
    re.type === "error" && re.stage === "bad-request" && /empty/i.test(re.message ?? ""),
    `message=${fmt(re.message)}`
  );

  const ru = await call({ language: "cobol", code: "DISPLAY 'HI'" });
  show(
    "unknown language rejected",
    ru.type === "error" && ru.stage === "bad-request" && /No language configuration/.test(ru.message ?? ""),
    `message=${fmt(ru.message)}`
  );

  const rt = await call({
    language: "python",
    code: "print(1)",
    testcases: Array.from({ length: 11 }, (_, i) => ({ input: String(i), expectedOutput: String(i) })),
  });
  show(
    "11 testcases rejected (limit 10)",
    rt.type === "error" && rt.stage === "bad-request" && /Too many test cases/.test(rt.message ?? ""),
    `message=${fmt(rt.message)}`
  );

  const rz = await call({ language: "python", code: "x".repeat(200_001) });
  show(
    "oversized code rejected (limit 200000)",
    rz.type === "error" && rz.stage === "bad-request" && /Source too large/.test(rz.message ?? ""),
    `message=${fmt(rz.message)}`
  );

  const rx = await call({
    language: "python",
    code: 'print("echo-ok")',
    stdin: "ignored",
    executionId: "exec-echo-777",
  });
  show(
    "executionId echoed back",
    rx.type === "result" && rx.executionId === "exec-echo-777",
    `executionId=${fmt(rx.executionId)}  stdout=${fmt(rx.stdout)}`
  );

  const rsql = await call({ language: "sql", code: "SELECT NULL AS val;" });
  show(
    "sql NULL renders as NULL",
    rsql.type === "result" && rsql.stdout === "val\n---\nNULL",
    `stdout=${fmt(rsql.stdout)}`
  );
}

/* ═══════════════════ J. HTTP CONTRACT (Function-URL emulator) ══════════ */

banner("J. HTTP CONTRACT — Lambda Function-URL semantics via local emulator");

const EMU_PORT = 3031;
const EMU_TOKEN = "test-token-42";
const emu = spawn(
  process.execPath,
  [path.join(__dirname, "local-server.mjs")],
  {
    env: { ...process.env, PORT: String(EMU_PORT), ATOM_TOKEN: EMU_TOKEN },
    stdio: ["ignore", "pipe", "pipe"],
  }
);
let emuLog = "";
emu.stdout.on("data", (d) => (emuLog += d));
emu.stderr.on("data", (d) => (emuLog += d));

const emuBase = `http://127.0.0.1:${EMU_PORT}/`;
async function post(body, headers = {}) {
  return fetch(emuBase, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

try {
  // wait for the emulator to come up
  let up = false;
  for (let i = 0; i < 50 && !up; i++) {
    await new Promise((r) => setTimeout(r, 200));
    // ATOM_TOKEN is required on every call — send it in the readiness poll
    up = await fetch(emuBase, {
      method: "POST",
      body: "{}",
      headers: { "x-atom-token": EMU_TOKEN },
    })
      .then((r) => r.status === 400)
      .catch(() => false);
  }
  if (!up) throw new Error(`emulator did not start:\n${emuLog.slice(-500)}`);
  console.log(`emulator up on :${EMU_PORT} (ATOM_TOKEN required)`);

  {
    // 1 — missing token → 401
    const res = await post({ language: "python", code: "print(1)" });
    const data = await res.json();
    show(
      "HTTP 401 when x-atom-token missing",
      res.status === 401 && /Invalid or missing/.test(data.message ?? ""),
      `status=${res.status}  body=${fmt(data)}`
    );
  }
  {
    // 2 — valid single run → 200 + RunResult
    const res = await post(
      { language: "python", code: "n = int(input())\nprint(n * 2)", stdin: "21" },
      { "x-atom-token": EMU_TOKEN }
    );
    const data = await res.json();
    show(
      "HTTP 200 single run (python)",
      res.status === 200 && data.type === "result" && data.stdout.trim() === "42",
      `status=${res.status}  stdout=${fmt(data.stdout)}  exit=${data.exitCode}`
    );
  }
  {
    // 3 — valid multi request → 200 + judge verdict
    const res = await post(
      {
        language: "python",
        code: "n = int(input())\nprint(n * 2)",
        testcases: [
          { input: "5", expectedOutput: "10" },
          { input: "7", expectedOutput: "14" },
        ],
      },
      { "x-atom-token": EMU_TOKEN }
    );
    const data = await res.json();
    show(
      "HTTP 200 multi run (python judge)",
      res.status === 200 && data.compileMessage === "Success" && data.passedCount === 2,
      `status=${res.status}  verdict=${data.compileMessage}  ${data.passedCount}/${data.total}  aliases: testcase1status=${data.testcase1status} output1=${fmt(data.output1)}`
    );
  }
  {
    // 4 — ruby over HTTP (proves PATH/env propagation through the emulator)
    const res = await post(
      { language: "ruby", code: 'puts "ruby-over-http #{RUBY_VERSION}"' },
      { "x-atom-token": EMU_TOKEN }
    );
    const data = await res.json();
    show(
      "HTTP 200 single run (ruby)",
      res.status === 200 && data.type === "result" && /^ruby-over-http 3\.4/.test(data.stdout ?? ""),
      `status=${res.status}  stdout=${fmt(data.stdout?.trim())}`
    );
  }
  {
    // 5 — invalid JSON → 400
    const res = await post("{ this is not json", { "x-atom-token": EMU_TOKEN });
    const data = await res.json();
    show(
      "HTTP 400 invalid JSON",
      res.status === 400 && /Invalid JSON/.test(data.message ?? ""),
      `status=${res.status}  body=${fmt(data)}`
    );
  }
  {
    // 6 — unknown language → 400
    const res = await post({ language: "fortran", code: "PRINT *, X" }, { "x-atom-token": EMU_TOKEN });
    const data = await res.json();
    show(
      "HTTP 400 unknown language",
      res.status === 400 && /No language configuration/.test(data.message ?? ""),
      `status=${res.status}  body=${fmt(data)}`
    );
  }
  {
    // 7 — empty code → 400
    const res = await post({ language: "python", code: "" }, { "x-atom-token": EMU_TOKEN });
    const data = await res.json();
    show(
      "HTTP 400 empty code",
      res.status === 400 && /Code is empty/.test(data.message ?? ""),
      `status=${res.status}  body=${fmt(data)}`
    );
  }
  {
    // 8 — too many testcases → 400
    const res = await post(
      {
        language: "python",
        code: "print(1)",
        testcases: Array.from({ length: 11 }, (_, i) => ({ input: String(i), expectedOutput: String(i) })),
      },
      { "x-atom-token": EMU_TOKEN }
    );
    const data = await res.json();
    show(
      "HTTP 400 too many testcases",
      res.status === 400 && /Too many test cases/.test(data.message ?? ""),
      `status=${res.status}  body=${fmt(data)}`
    );
  }
  {
    // 9 — CORS headers present (Function-UrlConfig parity)
    const res = await post({ language: "python", code: "print(1)" }, { "x-atom-token": EMU_TOKEN });
    const cors = res.headers.get("access-control-allow-origin");
    show("CORS Access-Control-Allow-Origin: *", cors === "*", `header=${fmt(cors)}`);
  }
} finally {
  try {
    emu.kill("SIGKILL");
  } catch {
    /* already gone */
  }
}

/* ═══════════════════════════ SUMMARY ═══════════════════════════════════ */

banner("SUMMARY — language × execution-mode matrix");
const LANGS = ["c", "cpp", "java", "python", "ruby", "sql", "javascript", "typescript"];
for (const lang of LANGS) {
  const m = matrix.get(lang) ?? {};
  const single = m.single ?? "n/a";
  const multi = m.multi ?? "n/a";
  console.log(
    `  ${lang.padEnd(12)} single=${single.padEnd(6)} multi=${multi}`
  );
}
console.log("──────────────────────────────────────────────────────────────");
console.log(`TOTAL: ${counter.pass} passed, ${counter.fail} failed`);
process.exit(counter.fail > 0 ? 1 : 0);
