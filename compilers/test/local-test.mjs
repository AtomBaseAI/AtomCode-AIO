/**
 * AtomCode Lambda compilers — LOCAL test harness (no AWS needed).
 *
 * Runs the exact handler.mjs that ships inside every Lambda image against
 * whatever toolchains exist on this machine. Great for validating changes
 * before `sam build` / `sam deploy`.
 *
 *   cd compilers
 *   npm install            # one-time: typescript + sql.js for TS/SQL runs
 *   node test/local-test.mjs
 *     or:  bun test/local-test.mjs
 *
 * Missing toolchains are reported as "unavailable" and skipped gracefully.
 */

import handler from "../functions/_shared/handler.mjs";

process.env.ATOM_DROP_PRIVILEGES = "off"; // local user is unprivileged

const CASES = [
  {
    lang: "javascript",
    code: 'console.log("Hello, Atom!");',
    stdin: "",
    expect: (r) => r.type === "result" && r.stdout.trim() === "Hello, Atom!",
  },
  {
    lang: "javascript",
    code: "const n = parseInt(require('fs').readFileSync(0,'utf8').trim()); console.log(n*2);",
    stdin: "21",
    expect: (r) => r.type === "result" && r.stdout.trim() === "42",
  },
  {
    lang: "typescript",
    code: 'const msg: string = "Hello, Atom!";\nconsole.log(msg);',
    stdin: "",
    expect: (r) => r.type === "result" && r.stdout.trim() === "Hello, Atom!",
  },
  {
    lang: "python",
    code: 'name = input()\nprint(f"Hello, {name}!")',
    stdin: "Atom",
    expect: (r) => r.type === "result" && r.stdout.trim() === "Hello, Atom!",
  },
  {
    lang: "python",
    code: 'n = int(input())\nprint(n * 2)',
    stdin: "7",
    expect: (r) => r.type === "result" && r.stdout.trim() === "14",
  },
  {
    lang: "sql",
    code: "CREATE TABLE t (id INTEGER, name TEXT);\nINSERT INTO t VALUES (1, 'Asha'), (2, 'Rahul');\nSELECT * FROM t;",
    stdin: "",
    expect: (r) =>
      r.type === "result" &&
      r.stdout === "id | name\n--- | ---\n1 | Asha\n2 | Rahul" &&
      r.sql?.columns?.length === 2,
  },
  {
    lang: "c",
    code: '#include <stdio.h>\nint main(){ printf("Hello, Atom!\\n"); return 0; }',
    stdin: "",
    expect: (r) => r.type === "result" && r.stdout.trim() === "Hello, Atom!",
  },
  {
    lang: "cpp",
    code: '#include <iostream>\nint main(){ int n; std::cin >> n; std::cout << n*n << std::endl; }',
    stdin: "9",
    expect: (r) => r.type === "result" && r.stdout.trim() === "81",
  },
  {
    lang: "java",
    code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Atom!");\n    }\n}',
    stdin: "",
    versionProfileId: "java-17",
    expect: (r) => r.type === "result" && r.stdout.trim() === "Hello, Atom!",
  },
  {
    lang: "ruby",
    code: 'name = gets&.chomp\nputs "Hello, #{name}!"',
    stdin: "Atom",
    expect: (r) => r.type === "result" && r.stdout.trim() === "Hello, Atom!",
  },
  // judge-flow: multi testcases, one failure + one placeholder auto-pass
  {
    lang: "javascript",
    code: "const n = parseInt(require('fs').readFileSync(0,'utf8').trim() || '0'); console.log(n*2);",
    multi: [
      { input: "5", expectedOutput: "10" },        // pass
      { input: "7", expectedOutput: "99" },        // fail
      { input: "", expectedOutput: "" },           // placeholder → auto-pass
    ],
    expect: (r) =>
      r.compileMessage === "Failed" &&
      r.results.map((x) => x.status).join(",") === "Success,Failed,Success" &&
      r.passedCount === 2,
  },
  // compile/runtime error flow — garbage TS transpiles (worker-like) but the
  // produced JS throws at runtime → execute-stage error, never a result
  {
    lang: "typescript",
    code: 'this is not ((( valid typescript @@@',
    stdin: "",
    expect: (r) => r.type === "error" && r.stage === "execute",
  },
  {
    lang: "python",
    code: "def broken(:\n  pass",
    stdin: "",
    expect: (r) => r.type === "error" && r.stage === "execute",
  },
  // blacklist / whitelist checks
  {
    lang: "javascript",
    code: "const fs = require('fs'); console.log('pwned');",
    checks: { blacklist: "require" },
    expect: (r) => r.type === "error" && /Blacklist/.test(r.message),
  },
  {
    lang: "javascript",
    code: "console.log('hi');",
    checks: { whitelist: "atomToken123" },
    expect: (r) => r.type === "error" && /Whitelist/.test(r.message),
  },
  // infinite loop → hard timeout
  {
    lang: "javascript",
    code: "while(true){}",
    stdin: "",
    timeoutMs: 3000,
    expect: (r) => r.type === "error" && r.timedOut === true,
  },
];

let pass = 0;
let skipped = 0;
let fail = 0;

console.log("AtomCode Lambda compilers — local handler tests");
console.log("─────────────────────────────────────────────────");

for (const test of CASES) {
  const label = test.multi ? `${test.lang} (multi-judge)` : test.lang;
  const event = {
    language: test.lang,
    code: test.code,
    stdin: test.stdin ?? "",
    timeoutMs: test.timeoutMs,
    versionProfileId: test.versionProfileId,
    checks: test.checks,
  };
  if (test.multi) event.testcases = test.multi;

  let response;
  try {
    response = await handler(event);
  } catch (err) {
    response = { type: "error", message: String(err) };
  }

  // Toolchain missing locally → skip instead of fail
  if (
    response.type === "error" &&
    /not available|Toolchain unavailable|ENOENT|failed to run command|command not found/i.test(response.message ?? "")
  ) {
    console.log(`  ⊘ ${label.padEnd(22)} skipped (toolchain not installed)`);
    skipped++;
    continue;
  }

  if (test.expect(response)) {
    console.log(`  ✓ ${label.padEnd(22)} pass`);
    pass++;
  } else {
    console.log(`  ✗ ${label.padEnd(22)} FAIL`);
    console.log("    response:", JSON.stringify(response).slice(0, 400));
    fail++;
  }
}

console.log("─────────────────────────────────────────────────");
console.log(`Passed: ${pass}   Failed: ${fail}   Skipped: ${skipped}`);
process.exit(fail > 0 ? 1 : 0);
