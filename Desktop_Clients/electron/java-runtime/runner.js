#!/usr/bin/env node
/* ================================================================
 * AtomCode Student Desktop — local Java runner (Node bridge)
 *
 * Runs the student's Java 100% locally with the bundled Doppio JVM
 * (a JVM in TypeScript) + JDK 8 class library + javac (tools.jar):
 *   1. compile  → javac executed INSIDE Doppio (com.sun.tools.javac.Main)
 *   2. run      → the produced class executed INSIDE Doppio
 *
 * Invoked by the Electron main process (java:run IPC) as:
 *   node runner.js   (job JSON on stdin, result JSON on stdout)
 *
 * Each Doppio invocation goes through doppio-wrapper.js which passes
 * its result back over a dedicated file descriptor (see that file).
 *
 * Job:   { code, cases?: [{ input }], timeoutMs? }
 * Result:
 *   { compileError, compileStderr,
 *     results: [{ output, stderr, exitCode, durationMs, timedOut? }] }
 *   | { fatal }
 * ================================================================ */

"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");

const JAVA_RUNTIME_ROOT = __dirname;
const WRAPPER = path.join(JAVA_RUNTIME_ROOT, "doppio-wrapper.js");

const DEFAULT_COMPILE_TIMEOUT_MS = 120000;
const DEFAULT_CASE_TIMEOUT_MS = 45000;

function fail(message) {
  process.stdout.write(JSON.stringify({ fatal: String(message || "Java runner failed.") }) + "\n");
  process.exit(1);
}

function readJob() {
  return new Promise((resolve, reject) => {
    let raw = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (d) => (raw += d));
    process.stdin.on("end", () => {
      try {
        resolve(JSON.parse(raw || "{}"));
      } catch (e) {
        reject(new Error("Invalid job JSON: " + e.message));
      }
    });
    process.stdin.on("error", reject);
  });
}

/**
 * Run one Doppio invocation through doppio-wrapper.js.
 * The wrapper writes { code, stdout, stderr } to a result file over fd 3
 * synchronously before exiting, so output is never lost to process.exit().
 */
function runDoppio(args, { cwd, input, timeoutMs }) {
  return new Promise((resolve) => {
    const started = Date.now();
    const resultPath = path.join(cwd, "doppio-result-" + Math.random().toString(36).slice(2) + ".json");
    fs.closeSync(fs.openSync(resultPath, "w")); // ensure the fd target exists
    const resultFd = fs.openSync(resultPath, "r+");
    let timedOut = false;
    let killed = false;

    const child = spawn(process.execPath, [WRAPPER, ...args], {
      cwd,
      env: { ...process.env, ELECTRON_RUN_AS_NODE: "1", DOPPIO_RESULT_PATH: resultPath },
      stdio: ["pipe", "ignore", "pipe"],
    });

    let childErr = "";
    child.stderr.on("data", (d) => (childErr += d.toString()));

    const timer = setTimeout(() => {
      timedOut = true;
      killed = true;
      try { child.kill("SIGKILL"); } catch { /* already dead */ }
    }, Math.max(1000, timeoutMs || 30000));

    if (input !== undefined && input !== null) child.stdin.write(input);
    child.stdin.end();

    child.on("error", (err) => {
      clearTimeout(timer);
      fs.closeSync(resultFd);
      resolve({
        code: 1,
        stdout: "",
        stderr: "Could not start the Java runtime: " + err.message,
        timedOut,
        durationMs: Date.now() - started,
      });
    });

    child.on("close", () => {
      clearTimeout(timer);
      let payload = null;
      try {
        payload = JSON.parse(fs.readFileSync(resultPath, "utf8"));
      } catch {
        payload = null;
      }
      try { fs.closeSync(resultFd); } catch { /* already closed */ }
      try { fs.unlinkSync(resultPath); } catch { /* best effort */ }

      if (killed && !payload) {
        resolve({
          code: 1,
          stdout: "",
          stderr: "Execution timed out.",
          timedOut: true,
          durationMs: Date.now() - started,
        });
        return;
      }
      resolve({
        code: payload ? payload.code : 1,
        stdout: payload ? payload.stdout : "",
        stderr: payload
          ? payload.stderr
          : (childErr || "Java runtime exited without a result.").trim(),
        timedOut,
        durationMs: Date.now() - started,
      });
    });
  });
}

/** Find the class file that declares `public static void main(String[])`. */
function findMainClass(classesDir, source) {
  const classFiles = fs
    .readdirSync(classesDir)
    .filter((f) => f.endsWith(".class") && !f.includes("$"));

  // Prefer classes declared in the source (public first), in order.
  const names = [];
  const publicRe = /\bpublic\s+(?:final\s+|abstract\s+)*class\s+([A-Za-z_$][A-Za-z0-9_$]*)/g;
  const classRe = /\b(?:class|interface|enum)\s+([A-Za-z_$][A-Za-z0-9_$]*)/g;
  let m;
  while ((m = publicRe.exec(source)) !== null) names.push(m[1]);
  while ((m = classRe.exec(source)) !== null) {
    if (!names.includes(m[1])) names.push(m[1]);
  }

  const hasMainSignature = (buf) =>
    buf.includes("([Ljava/lang/String;)V") && buf.includes("main");

  for (const name of names) {
    const file = path.join(classesDir, name + ".class");
    if (classFiles.includes(name + ".class")) {
      const buf = fs.readFileSync(file);
      if (hasMainSignature(buf)) return name;
    }
  }
  // Fallback: any top-level class file carrying a main method.
  for (const f of classFiles) {
    if (hasMainSignature(fs.readFileSync(path.join(classesDir, f)))) {
      return f.slice(0, -6);
    }
  }
  return null;
}

(async () => {
  let job;
  try {
    job = await readJob();
  } catch (e) {
    return fail(e.message);
  }

  const code = String(job.code || "");
  const cases = Array.isArray(job.cases) && job.cases.length > 0
    ? job.cases.map((c) => String((c && c.input) || ""))
    : [""];
  const compileTimeout = Number(job.timeoutMs) > 0 ? Number(job.timeoutMs) : DEFAULT_COMPILE_TIMEOUT_MS;
  const caseTimeout = Number(job.caseTimeoutMs) > 0 ? Number(job.caseTimeoutMs) : DEFAULT_CASE_TIMEOUT_MS;

  if (!code.trim()) return fail("Code is empty.");

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "atomcode-java-"));
  try {
    const classesDir = path.join(tmp, "classes");
    fs.mkdirSync(classesDir);
    fs.writeFileSync(path.join(tmp, "Main.java"), code, "utf8");

    // Phase 1 — compile with javac running inside Doppio.
    const compile = await runDoppio(
      ["com.sun.tools.javac.Main", "-Xlint:none", "-d", classesDir, "Main.java"],
      { cwd: tmp, input: "", timeoutMs: compileTimeout }
    );

    if (compile.timedOut) {
      process.stdout.write(JSON.stringify({
        compileError: true,
        compileStderr: "Compilation timed out.",
        results: [],
      }) + "\n");
      return;
    }

    if (compile.code !== 0) {
      process.stdout.write(JSON.stringify({
        compileError: true,
        compileStderr: (compile.stderr || compile.stdout || "Compilation failed.").trim(),
        results: [],
      }) + "\n");
      return;
    }

    const mainClass = findMainClass(classesDir, code);
    if (!mainClass) {
      process.stdout.write(JSON.stringify({
        compileError: true,
        compileStderr: "No main method found — the program must define a `public static void main(String[] args)` method.",
        results: [],
      }) + "\n");
      return;
    }

    // Phase 2 — run the program once per test case.
    const results = [];
    for (const input of cases) {
      const run = await runDoppio(["-cp", classesDir, mainClass], {
        cwd: tmp,
        input: input == null ? "" : input,
        timeoutMs: caseTimeout,
      });
      results.push({
        output: run.stdout,
        stderr: run.stderr,
        exitCode: run.code,
        durationMs: run.durationMs,
        ...(run.timedOut ? { timedOut: true } : {}),
      });
    }

    process.stdout.write(JSON.stringify({
      compileError: false,
      compileStderr: "",
      results,
    }) + "\n");
  } catch (e) {
    fail(e && e.message ? e.message : e);
  } finally {
    try { fs.rmSync(tmp, { recursive: true, force: true }); } catch { /* best effort */ }
  }
})().catch((e) => fail(e && e.message ? e.message : e));
