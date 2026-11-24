/**
 * selftest-node.mjs — Node-based end-to-end test of the desktop engine.
 *
 * Chromium/Electron cannot start in some CI sandboxes, so this harness
 * exercises the SAME pieces with Node worker_threads:
 *   - renderer/engine/atom-engine.js  (the exact engine the desktop runs)
 *   - renderer/workers/*.worker.js    (the exact worker bundles)
 *   - renderer/runtimes/**            (the exact runtime assets)
 *
 * A local HTTP server plays the role of the atomcode:// origin, and a
 * module-loader hook maps that origin to the renderer directory so the
 * workers' dynamic imports resolve exactly like in Electron.
 *
 * Run:  cd elcetron && node scripts/selftest-node.mjs
 */

import http from "node:http";
import path from "node:path";
import fs from "node:fs/promises";
import { Worker } from "node:worker_threads";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const RENDERER_ROOT = path.resolve(here, "..", "renderer");

/* ---------- static server standing in for atomcode://renderer ---------- */

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".wasm": "application/wasm",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".map": "application/json; charset=utf-8",
};

const server = http.createServer(async (req, res) => {
  try {
    const rel = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const filePath = path.normalize(path.join(RENDERER_ROOT, rel));
    if (!filePath.startsWith(RENDERER_ROOT + path.sep)) {
      res.writeHead(403).end("Forbidden");
      return;
    }
    const buf = await fs.readFile(filePath);
    res.writeHead(200, {
      "content-type":
        MIME_TYPES[path.extname(filePath).toLowerCase()] ||
        "application/octet-stream",
    });
    res.end(buf);
  } catch (err) {
    res.writeHead(err.code === "ENOENT" ? 404 : 500).end("err");
  }
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const ORIGIN = `http://127.0.0.1:${server.address().port}`;
console.log("[harness] asset origin:", ORIGIN);

/* ---------- DOM Worker shim backed by worker_threads ---------- */

globalThis.window = globalThis;

class DOMWorkerShim {
  constructor(url) {
    const target = String(url).replace("atomcode://renderer", "");
    this.onmessage = null;
    this.onerror = null;
    this.onmessageerror = null;
    this._wt = new Worker(path.join(here, "worker-shim.mjs"), {
      workerData: { target, origin: ORIGIN },
      stdout: true,
    });
    this._wt.on("message", (data) => {
      if (this.onmessage) this.onmessage({ data });
    });
    this._wt.on("error", (err) => {
      if (this.onerror) this.onerror({ message: err.message });
    });
  }
  postMessage(data) {
    this._wt.postMessage(data);
  }
  terminate() {
    return this._wt.terminate();
  }
}

globalThis.Worker = DOMWorkerShim;

/* ---------- load the real engine ---------- */

await import(path.join(RENDERER_ROOT, "engine", "atom-engine.js"));
const E = globalThis.window.AtomEngine;

/* ---------- Java bridge stub (preload IPC in the real app) ---------- */

import { spawn as nodeSpawn } from "node:child_process";
const JAVA_RUNNER = path.join(here, "..", "java-runtime", "runner.js");

globalThis.window.atomcode = {
  javaRun: (req) =>
    new Promise((resolve, reject) => {
      const child = nodeSpawn(process.execPath, [JAVA_RUNNER], {
        stdio: ["pipe", "pipe", "pipe"],
      });
      let out = "";
      let err = "";
      child.stdout.on("data", (d) => (out += d));
      child.stderr.on("data", (d) => (err += d));
      child.stdin.write(
        JSON.stringify({
          code: req.code,
          cases: req.cases && req.cases.length ? req.cases : [{ input: req.input || "" }],
          timeoutMs: req.timeoutMs,
        })
      );
      child.stdin.end();
      child.on("error", (e) => reject(e));
      child.on("close", () => {
        try {
          resolve(JSON.parse(out));
        } catch {
          reject(new Error(err || "java runner produced no result"));
        }
      });
    }),
};

/* ---------- assertions ---------- */

let failures = 0;
const expect = (cond, label) => {
  const ok = Boolean(cond);
  if (!ok) failures += 1;
  console.log((ok ? "PASS" : "FAIL") + "  " + label);
  return ok;
};

const results = {};

try {
  // 1 — Python: plain run
  results.python = await E.judgeRunSingle({
    lang: "python",
    code: 'print("Hello from Python!")',
  });
  expect(
    results.python.output?.trim() === "Hello from Python!" &&
      results.python.compileMessage === "Success",
    `Python executes locally (→ ${JSON.stringify(results.python.output)})`
  );

  // 2 — Python: expected output pass + fail
  results.pythonPass = (
    await E.judgeRunSingle({ lang: "python", code: 'print("hi")', expectedOutput: "hi" })
  ).compileMessage;
  results.pythonFail = (
    await E.judgeRunSingle({ lang: "python", code: 'print("hi")', expectedOutput: "bye" })
  ).compileMessage;
  expect(results.pythonPass === "Success", "Python expected-output pass");
  expect(results.pythonFail === "Failed", "Python expected-output fail");

  // 3 — Python: stdin
  results.pythonStdin = await E.judgeRunSingle({
    lang: "python",
    code: "import sys; print(sys.stdin.read().strip().upper())",
    input: "atom",
  });
  expect(
    results.pythonStdin.output?.trim() === "ATOM",
    `Python stdin (→ ${JSON.stringify(results.pythonStdin.output)})`
  );

  // 4 — SQL grid
  results.sql = await E.judgeRunSingle({
    lang: "sql",
    code: "CREATE TABLE t(a INTEGER); INSERT INTO t VALUES (41),(1); SELECT SUM(a) AS total FROM t;",
  });
  expect(
    results.sql.output?.includes("42"),
    `SQL grid output (→ ${JSON.stringify(results.sql.output)})`
  );

  // 5 — JavaScript
  results.javascript = await E.judgeRunSingle({
    lang: "javascript",
    code: 'console.log("JS OK");',
  });
  expect(
    results.javascript.output?.trim() === "JS OK",
    "JavaScript executes"
  );

  // 6 — TypeScript (transpile + run)
  results.typescript = await E.judgeRunSingle({
    lang: "typescript",
    code: 'const n: number = 21; console.log("TS", n * 2);',
  });
  expect(
    results.typescript.output?.trim() === "TS 42",
    `TypeScript transpile+run (→ ${JSON.stringify(results.typescript.output)})`
  );

  // 7 — Ruby
  results.ruby = await E.judgeRunSingle({ lang: "ruby", code: 'puts "Ruby OK"' });
  expect(
    results.ruby.output?.trim() === "Ruby OK",
    `Ruby executes (→ ${JSON.stringify(results.ruby.output)})`
  );

  // 8 — multi test-case contract (placeholder auto-pass rule)
  const cases = await E.judgeRunTestCases({
    lang: "python",
    code: "x = int(input()); print(x * 2)",
    cases: [
      { input: "3", expected: "6" },
      { input: "", expected: "" }, // placeholder → auto-pass
      { input: "10", expected: "21" }, // wrong expected → fail
    ],
  });
  results.cases = cases.map((c) => c.status);
  expect(
    results.cases.join(",") === "Success,Success,Failed",
    `test-case statuses (→ ${results.cases.join(",")})`
  );

  // 9 — default profile registry
  results.defaults = ["python", "sql", "ruby", "javascript", "typescript", "c", "cpp", "java"].map(
    (l) => E.getDefaultEngineProfile(l)?.id
  );
  expect(
    results.defaults.join(",") ===
      "python-3.11,sqlite-3.54,ruby-3.4,javascript-browser,typescript-5.9,c-clang,cpp-clang,java-8",
    `default profiles (→ ${results.defaults.join(",")})`
  );

  // 10 — infinite loop → timeout + worker eviction
  const t0 = Date.now();
  const to = await E.judgeRunSingle({
    lang: "javascript",
    code: "while(true){}",
    timeoutMs: 1500,
  });
  results.timeout = { message: to.output, elapsed: Date.now() - t0 };
  expect(
    results.timeout.message === "Execution timed out." &&
      results.timeout.elapsed < 8000,
    `infinite loop terminates (→ ${results.timeout.message}, ${results.timeout.elapsed}ms)`
  );

  // 11 — runtime survives a rejected execution (worker pool still usable)
  results.afterTimeout = (
    await E.judgeRunSingle({ lang: "javascript", code: 'console.log("still alive")' })
  ).output;
  expect(
    results.afterTimeout === "still alive",
    "worker pool recovers after timeout"
  );

  // 12 — C: compile, link, run with stdin (bundled clang)
  results.c = await E.judgeRunSingle({
    lang: "c",
    code: '#include <stdio.h>\n#include <stdlib.h>\nint main(){ char b[64]; if(!fgets(b,64,stdin)) return 1; printf("n*2=%d\\n", atoi(b)*2); return 0; }',
    input: "21",
    expectedOutput: "n*2=42",
  });
  expect(
    results.c.compileMessage === "Success" && results.c.output.trim() === "n*2=42",
    `C compiles & runs locally via clang (→ ${JSON.stringify(results.c.output)})`
  );

  // 13 — C++: libc++ (vector/sort/string)
  results.cpp = await E.judgeRunSingle({
    lang: "cpp",
    code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nint main(){ std::vector<int> v{3,1,2}; std::sort(v.begin(), v.end()); for (int x : v) std::cout << x; std::cout << std::endl; return 0; }',
    expectedOutput: "123",
  });
  expect(
    results.cpp.compileMessage === "Success",
    `C++ compiles & runs locally via clang (→ ${JSON.stringify(results.cpp.output)})`
  );

  // 14 — C compile error surfaces clang diagnostics as Error
  results.cErr = await E.judgeRunSingle({
    lang: "c",
    code: "int main(){ this is not c }",
    expectedOutput: "",
  });
  expect(
    results.cErr.compileMessage === "Error" && results.cErr.output.includes("error"),
    "C compile errors surface clang diagnostics"
  );

  // 15 — Java: compile (javac inside Doppio) + run with stdin
  results.java = await E.judgeRunSingle({
    lang: "java",
    code: 'public class Main { public static void main(String[] args) throws Exception { java.io.BufferedReader br = new java.io.BufferedReader(new java.io.InputStreamReader(System.in)); int n = Integer.parseInt(br.readLine().trim()); System.out.println("n*2=" + (n*2)); } }',
    input: "8",
    expectedOutput: "n*2=16",
  });
  expect(
    results.java.compileMessage === "Success" && results.java.output.trim() === "n*2=16",
    `Java compiles & runs locally via Doppio JVM (→ ${JSON.stringify(results.java.output)})`
  );

  // 16 — Java multi-test-case contract (placeholder auto-pass preserved)
  const jcases = await E.judgeRunTestCases({
    lang: "java",
    code: 'public class Main { public static void main(String[] args) { System.out.println("v=" + 2); } }',
    cases: [
      { input: "", expected: "v=2" },
      { input: "", expected: "" }, // placeholder → auto-pass
      { input: "", expected: "v=3" }, // wrong expected → fail
    ],
  });
  results.jcases = jcases.map((c) => c.status);
  expect(
    results.jcases.join(",") === "Success,Success,Failed",
    `Java test-case statuses (→ ${results.jcases.join(",")})`
  );
} catch (err) {
  failures += 1;
  console.error("SELFTEST ERROR:", err);
} finally {
  E.disposeAll();
  server.close();
}

console.log(JSON.stringify(results, null, 2));
console.log(failures === 0 ? "\nALL TESTS PASSED" : `\n${failures} TEST(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
