/**
 * AtomCode — universal AWS Lambda code-execution handler (Node.js 20, ESM).
 *
 * ONE handler drives every language function in the `compilers/` stack:
 * each Lambda image ships this file plus a per-language `langspec.json`
 * (see _shared/langspec/) describing its toolchain. The all-in-one image
 * ships every langspec and dispatches on the request's `language` field.
 *
 * ── Supported languages ──────────────────────────────────────────────────
 *   c (gcc) · cpp (g++) · java (javac+JVM) · python (CPython) ·
 *   ruby (CRuby) · sql (SQLite in-memory) · javascript (Node) ·
 *   typescript (tsc transpile → Node)
 *
 * ── Protocols (both supported on the same endpoint) ──────────────────────
 *
 * 1) Single-run — mirrors the app's RunRequest/RunResult worker protocol
 *    (src/lib/execution-types.ts), so an execution manager can treat this
 *    endpoint exactly like a worker:
 *
 *      request : { executionId?, language?, versionProfileId?, code,
 *                  stdin?, timeoutMs?, checks? { blacklist?, whitelist? } }
 *      response: { type:"result", executionId, stdout, stderr, exitCode,
 *                  compileTimeMs, executionTimeMs, sql? }          (sql adds
 *                  a structured { columns, rows, changes } grid payload)
 *              | { type:"error",  executionId, message, stage }
 *
 * 2) Multi-testcase judge — mirrors the original external judge contract
 *    (NEXT_PUBLIC_LAMBDA_MULTI_URL). Compile once, run every case:
 *
 *      request : { code, language?, versionProfileId?,
 *                  testcases: [{ input, expectedOutput }], timeoutMs?,
 *                  checks? { blacklist?, whitelist? } }
 *      response: { compileMessage:"Success|Failed|Error",
 *                  results: [{ status, output }], passedCount, total,
 *                  testcase1status..3, output1..3 }   ← desktop-route shape
 *
 *    Status semantics mirror src/lib/wasm-judge.ts exactly:
 *    - a case with no input AND no expected output (index > 0) is a
 *      placeholder → auto-"Success";
 *    - after a runtime "Error", all remaining cases report "Error";
 *    - output comparison normalizes trailing whitespace per line, CR/LF
 *      and trailing blank lines (identical to normalizeOutput).
 *
 * ── Sandboxing ───────────────────────────────────────────────────────────
 *   - every run executes in a fresh mkdtemp dir under /tmp, always removed
 *   - compile / run hard timeouts (`timeout -s KILL`, process-group kill)
 *   - ulimit rlimits: CPU seconds, address space, file size, process count
 *   - (attempted) privilege drop to `nobody` via runuser, with graceful
 *     fallback when the runtime lacks it
 *   - optional shared-secret: set ATOM_TOKEN env → requests must send the
 *     `x-atom-token` header
 *   - blacklist/whitelist keyword enforcement server-side (same semantics
 *     as the app's client-side checks: comma-separated substring rules)
 *
 * The handler is plain Node — it also runs locally under `node`/`bun` for
 * the smoke harness in test/local-test.mjs.
 */

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, rm, writeFile, chmod, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

/* ───────────────────────────── limits ─────────────────────────────────── */

const MAX_CODE_CHARS = 200_000;
const MAX_STDIN_CHARS = 1_000_000;
const MAX_STREAM_CHARS = 200_000;
const MAX_TESTCASES = 10;
const COMPILE_TIMEOUT_MS = 30_000;
const MIN_RUN_TIMEOUT_MS = 1_000;
const MAX_RUN_TIMEOUT_MS = 60_000;
const MAX_LAMBDA_RUNTIME_MS = 110_000; // stays under the 120 s function timeout

/* ─────────────────────────── langspec loading ─────────────────────────── */

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* ───────────────────── ZIP-deploy toolchain discovery ───────────────────
 * Container images carry every toolchain on the OS PATH already. The ZIP
 * deployment (compilers/zipbuild) instead ships toolchain entrypoints in a
 * `bin/` directory next to this handler (plus bundled shared libs under
 * toolchains/gcc/usr/lib64). Prepend them once at module load — when the
 * dirs are absent (container images, plain-local runs) this is a no-op.
 */
{
  const zipBinDir = path.join(__dirname, "bin");
  try {
    if (existsSync(zipBinDir)) {
      process.env.PATH = `${zipBinDir}:${process.env.PATH}`;
      const gccLibDir = path.join(__dirname, "toolchains", "gcc", "usr", "lib64");
      if (existsSync(gccLibDir)) {
        process.env.LD_LIBRARY_PATH = `${gccLibDir}:${process.env.LD_LIBRARY_PATH ?? ""}`.replace(/:$/, "");
      }
    }
  } catch {
    /* container mode — OS PATH already carries the toolchains */
  }
}

const SPEC_CACHE = new Map();

/**
 * Per-function images ship exactly one langspec at /var/task/langspec.json;
 * the all-in-one image ships langspec/<lang>.json for every language.
 */
async function loadSpec(language) {
  const cacheKey = language ?? "__single__";
  if (SPEC_CACHE.has(cacheKey)) return SPEC_CACHE.get(cacheKey);

  const candidates = language
    ? [path.join(__dirname, "langspec", `${language}.json`)]
    : [path.join(__dirname, "langspec.json")];

  for (const file of candidates) {
    try {
      const spec = JSON.parse(await readFile(file, "utf8"));
      /* The ZIP build bakes toolchain flags against Lambda's task root
       * (/var/task). On any other filesystem — CI verify, local runs — the
       * task root is wherever THIS handler actually lives, so rewrite the
       * prefix at load time: identity on Lambda (this file IS at
       * /var/task/handler.mjs), correct everywhere else. This is what lets
       * verify-local.mjs drive the bundled gcc straight out of dist/gcc
       * with zero emulation. Spawn cwd is a temp dir, so relative paths
       * would NOT work here — absolute-at-load-time is the only correct
       * form. */
      if (Array.isArray(spec.extraArgs)) {
        spec.extraArgs = spec.extraArgs.map((a) => String(a).replaceAll("/var/task", __dirname));
      }
      SPEC_CACHE.set(cacheKey, spec);
      return spec;
    } catch {
      /* try next candidate */
    }
  }
  return null;
}

const LANGUAGE_ALIASES = {
  c: "c",
  cpp: "cpp",
  "c++": "cpp",
  java: "java",
  python: "python",
  python3: "python",
  ruby: "ruby",
  sql: "sql",
  sqlite: "sql",
  javascript: "javascript",
  js: "javascript",
  typescript: "typescript",
  ts: "typescript",
};

/* ──────────────────────── outcome normalization ───────────────────────── */

function normalizeOutput(value) {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n")
    .replace(/\n+$/g, "")
    .trim();
}

/* ───────────────────────── process-group runner ───────────────────────── */

function runProcess(command, args, opts) {
  const { cwd, input = "", timeoutMs = 10_000, env = {}, dropPrivileges = false } = opts;
  return new Promise((resolve) => {
    let stdout = "";
    let stderr = "";
    let settled = false;
    let killedByTimeout = false;

    const finalCommand = dropPrivileges ? "runuser" : command;
    const finalArgs = dropPrivileges
      ? ["-u", "nobody", "--", command, ...args]
      : args;

    let child;
    try {
      // detached → own process group, so a timeout kill wipes the whole tree
      child = spawn(finalCommand, finalArgs, {
        cwd,
        stdio: ["pipe", "pipe", "pipe"],
        detached: true,
        env: { ...process.env, HOME: cwd, ...env },
      });
    } catch (err) {
      resolve({
        stdout: "",
        stderr: "",
        exitCode: null,
        timedOut: false,
        spawnError: `Failed to launch ${command}: ${err?.message ?? err}`,
      });
      return;
    }

    const killTree = () => {
      try {
        if (child.pid) process.kill(-child.pid, "SIGKILL");
      } catch {
        try {
          child.kill("SIGKILL");
        } catch {
          /* already gone */
        }
      }
    };

    const timer = setTimeout(() => {
      killedByTimeout = true;
      killTree();
    }, timeoutMs);

    const append = (target, chunk) => {
      const text = typeof chunk === "string" ? chunk : chunk.toString("utf8");
      if (target === "out" && stdout.length < MAX_STREAM_CHARS) stdout += text;
      if (target === "err" && stderr.length < MAX_STREAM_CHARS) stderr += text;
    };

    child.stdout?.on("data", (chunk) => append("out", chunk));
    child.stderr?.on("data", (chunk) => append("err", chunk));
    child.on("error", (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve({
        stdout,
        stderr,
        exitCode: null,
        timedOut: false,
        spawnError:
          err.code === "ENOENT"
            ? `${command} is not available on this Lambda image.`
            : `Failed to run ${command}: ${err.message}`,
      });
    });
    child.on("close", (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve({ stdout, stderr, exitCode: code, timedOut: killedByTimeout });
    });

    try {
      child.stdin?.on("error", () => {});
      child.stdin?.write(input);
      child.stdin?.end();
    } catch {
      /* stdin unavailable */
    }
  });
}

/**
 * Spawn under a `bash -c` umbrella that applies rlimits and `timeout`,
 * optionally dropping to `nobody`. Falls back to a direct spawn (no
 * privilege drop, no rlimits) if `runuser` is unavailable.
 */
async function runSandboxed(spec, command, args, opts) {
  const limits = spec.limits ?? {};
  const cpuSec = Math.max(1, Math.ceil((opts.timeoutMs ?? 10_000) / 1000) + 1);
  const vaKB = limits.addressSpaceKB;
  const nproc = limits.nproc ?? 128;
  const fileSizeKB = limits.fileSizeKB ?? 32768;

  const inner =
    `timeout -s KILL ${Math.ceil((opts.timeoutMs ?? 10_000) / 1000)}s ` +
    `${JSON.stringify(command)} ${args.map((a) => JSON.stringify(a)).join(" ")}`;
  const limitScript = [
    // ATOM_ULIMITS=off → skip rlimits (local emulator on a shared host;
    // on AWS Lambda the container is single-purpose and limits are safe)
    ...(process.env.ATOM_ULIMITS === "off"
      ? []
      : [
          `ulimit -t ${cpuSec}`,
          `ulimit -f ${fileSizeKB}`,
          `ulimit -u ${nproc}`,
          vaKB ? `ulimit -v ${vaKB}` : null,
        ]),
    "exec " + inner,
  ]
    .filter(Boolean)
    .join("; ");

  if (opts.dropPrivileges !== false) {
    const dropped = await runProcess("runuser", ["-u", "nobody", "--", "bash", "-c", limitScript], {
      ...opts,
    });
    // ENOENT on runuser (or bash) → retry without the privilege drop
    if (!dropped.spawnError) return dropped;
    if (!/not available/.test(dropped.spawnError)) return dropped;
  }

  return runProcess("bash", ["-c", limitScript], { ...opts, dropPrivileges: false });
}

/* ─────────────────────────── java code helpers ────────────────────────── */

function detectMainClass(code) {
  const pkgMatch = code.match(/(^|\n)\s*package\s+([\w.]+)\s*;/);
  const pkg = pkgMatch ? pkgMatch[2] + "." : "";
  const classRe =
    /(?:public\s+)?(?:final\s+|abstract\s+)*class\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*(?:extends\s+[\w.]+|implements\s+[\w.,\s]+)?\s*\{/g;
  let match;
  let fallback = null;
  while ((match = classRe.exec(code)) !== null) {
    const rest = code.slice(classRe.lastIndex, classRe.lastIndex + 800);
    if (/static[\s\S]{0,200}?void[\s\S]{0,40}?main\s*\(/.test(rest)) {
      return pkg + match[1];
    }
    if (fallback === null) fallback = match[1];
  }
  return pkg + (fallback || "Main");
}

function detectPublicTypeName(code) {
  const m = code.match(
    /(^|\n)\s*public\s+(?:final\s+|abstract\s+|sealed\s+|non\s+sealed\s+|static\s+)*(?:class|enum|interface|record)\s+([A-Za-z_$][A-Za-z0-9_$]*)/
  );
  return m ? m[2] : null;
}

/* ──────────────────────────── sql (sql.js) ────────────────────────────── */

/** Exact mirror of src/workers/sqlite.worker.ts renderGrid(). */
function renderSqlGrid(payload) {
  if (payload.columns.length === 0) return "";
  const lines = [];
  lines.push(payload.columns.join(" | "));
  lines.push(payload.columns.map(() => "---").join(" | "));
  for (const row of payload.rows) {
    lines.push(row.map((cell) => (cell === null ? "NULL" : String(cell))).join(" | "));
  }
  return lines.join("\n");
}

let sqlJsPromise = null;
async function getSqlJs() {
  // sql.js is CJS: the init function may sit on .default, .default.initSqlJs
  // or .initSqlJs depending on the Node/ESM interop mode.
  sqlJsPromise ??= import("sql.js").then((mod) => {
    const init = mod.default?.initSqlJs ?? mod.initSqlJs ?? mod.default;
    return init();
  });
  return sqlJsPromise;
}

async function runSql(spec, params) {
  const started = performance.now();
  const SQL = await getSqlJs();
  const db = new SQL.Database();

  try {
    const results = db.exec(params.code); // [{ columns, values }]
    const rows = [];
    let columns = [];
    for (const r of results) {
      columns = r.columns;
      for (const row of r.values) rows.push(row);
    }
    const hasResultSet = columns.length > 0;
    const payload = {
      columns: hasResultSet ? columns : [],
      rows: hasResultSet
        ? rows.map((row) =>
            row.map((cell) => {
              if (cell === null || cell === undefined) return null;
              if (cell instanceof Uint8Array) return "<blob>";
              return String(cell);
            })
          )
        : [],
      changes: db.getRowsModified(),
    };

    return {
      type: "result",
      executionId: params.executionId,
      stdout: renderSqlGrid(payload),
      stderr: "",
      exitCode: 0,
      compileTimeMs: 0,
      executionTimeMs: performance.now() - started,
      sql: payload,
    };
  } catch (error) {
    return {
      type: "error",
      executionId: params.executionId,
      message: error instanceof Error ? error.message : String(error) || "SQL error.",
      stage: "execute",
    };
  } finally {
    try {
      db.close();
    } catch {
      /* ignore close races */
    }
  }
}

/* ─────────────────────────── compile + execute ────────────────────────── */

function toolBin(spec) {
  const bin = spec.bin ?? [];
  const list = Array.isArray(bin) ? bin : [bin];
  return list;
}

/**
 * Privilege drop is applied only when it can actually work: runuser needs
 * root. Container images on Lambda run as root → drop applies. ZIP
 * deployments and local runs execute as a non-root sandbox user → skipped
 * up front (runuser would fail with "may not be used by non-root users").
 */
function privDrop(spec) {
  if (process.env.ATOM_DROP_PRIVILEGES === "off") return false;
  if (spec.dropPrivileges === false) return false;
  try {
    if (typeof process.getuid === "function" && process.getuid() !== 0) return false;
  } catch {
    return false;
  }
  return true;
}

async function firstAvailableBin(spec) {
  const candidates = toolBin(spec);
  for (const bin of candidates) {
    const probe = await runProcess("bash", ["-c", `command -v ${JSON.stringify(bin)} >/dev/null 2>&1`], {
      cwd: tmpdir(),
      timeoutMs: 3_000,
      dropPrivileges: false,
    });
    if (probe.exitCode === 0) return bin;
  }
  return candidates[0];
}

/**
 * Compile the program inside `dir`. Returns { ok, compileTimeMs, artifact }.
 * `artifact` carries what the run step needs (bin path + args template).
 */
async function compile(spec, dir, code, profileId) {
  const started = performance.now();
  const lang = spec.language;
  const version = profileId ?? spec.defaultProfile ?? "";

  // Resolve the per-profile flags table: spec.profiles["java-17"] etc.
  const profile = spec.profiles?.[version] ?? spec.profiles?.[spec.defaultProfile] ?? {};

  if (lang === "python" || lang === "javascript" || lang === "ruby" || lang === "sql") {
    const file = spec.entryFile;
    await writeFile(path.join(dir, file), code, "utf8");
    return { ok: true, compileTimeMs: 0, profile, artifact: { file } };
  }

  if (lang === "typescript") {
    // Mirror the app worker: typescript.transpileModule → ES2022, no type-check.
    let js;
    try {
      const tsMod = await import("typescript");
      const ts = tsMod.default ?? tsMod;
      js = ts.transpileModule(code, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2022,
          module: ts.ModuleKind.CommonJS,
        },
        reportDiagnostics: true,
      }).outputText;
    } catch (err) {
      return {
        ok: false,
        message: `TypeScript transpile failed: ${err?.message ?? err}`,
        stage: "compile",
      };
    }
    await writeFile(path.join(dir, "program.js"), js, "utf8");
    return { ok: true, compileTimeMs: performance.now() - started, profile, artifact: { file: "program.js" } };
  }

  if (lang === "c" || lang === "cpp") {
    const isC = lang === "c";
    const source = isC ? "main.c" : "main.cpp";
    await writeFile(path.join(dir, source), code, "utf8");
    const compilerBin = isC ? "gcc" : "g++";
    const std = profile.std ?? (isC ? "c17" : "c++17");
    const compile = await runProcess(compilerBin, [
      // ZIP deployment: langspec may carry -B/-L flags pointing at the
      // bundled gcc tree (container langspecs don't set extraArgs).
      ...(Array.isArray(spec.extraArgs) ? spec.extraArgs : []),
      `-std=${std}`,
      "-O0",
      "-pipe",
      "-o",
      "./program",
      source,
      ...(isC ? ["-lm"] : []),
    ], { cwd: dir, timeoutMs: COMPILE_TIMEOUT_MS, dropPrivileges: privDrop(spec) });

    if (compile.spawnError) {
      return { ok: false, message: `Toolchain unavailable: ${compile.spawnError}`, stage: "toolchain" };
    }
    if (compile.exitCode !== 0) {
      return {
        ok: false,
        message: compile.stderr.trim() || `Compilation failed (exit code ${compile.exitCode ?? "unknown"}).`,
        stage: "compile",
      };
    }
    return {
      ok: true,
      compileTimeMs: performance.now() - started,
      profile,
      artifact: { file: "./program", direct: true },
    };
  }

  if (lang === "java") {
    const level = profile.release ?? "17";
    const mainClass = detectMainClass(code);
    const publicType = detectPublicTypeName(code) ?? mainClass.split(".").pop() ?? "Main";
    await writeFile(path.join(dir, `${publicType}.java`), code, "utf8");

    const javac = await firstAvailableBin({ bin: ["javac"] });
    const compile = await runProcess(
      javac,
      ["--release", level, "-nowarn", "-d", "out", `${publicType}.java`],
      { cwd: dir, timeoutMs: COMPILE_TIMEOUT_MS, dropPrivileges: privDrop(spec) }
    );

    if (compile.spawnError) {
      return { ok: false, message: `Toolchain unavailable: ${compile.spawnError}`, stage: "toolchain" };
    }
    if (compile.exitCode !== 0) {
      return {
        ok: false,
        message: compile.stderr.trim() || `Compilation failed (exit code ${compile.exitCode ?? "unknown"}).`,
        stage: "compile",
      };
    }
    return {
      ok: true,
      compileTimeMs: performance.now() - started,
      profile,
      artifact: { mainClass, classPath: "out" },
    };
  }

  return { ok: false, message: `Language "${lang}" is not configured on this image.`, stage: "toolchain" };
}

/** Run a compiled/interpreted artifact once with the given stdin. */
async function execute(spec, dir, artifact, stdin, timeoutMs) {
  const started = performance.now();
  const lang = spec.language;
  const profile = artifact.profile ?? {};
  const runBin = await firstAvailableBin(spec);
  const drop = privDrop(spec);

  let command;
  let args;

  if (lang === "python") {
    command = runBin;
    args = [artifact.file];
  } else if (lang === "javascript") {
    command = runBin;
    args = [artifact.file, ...(profile.nodeFlags ?? [])];
  } else if (lang === "typescript") {
    command = runBin;
    args = [artifact.file];
  } else if (lang === "ruby") {
    command = runBin;
    args = [artifact.file];
  } else if (lang === "c" || lang === "cpp") {
    command = artifact.direct ? path.join(dir, "program") : artifact.file;
    args = [];
  } else if (lang === "java") {
    command = runBin;
    args = [
      ...(profile.jvmFlags ?? ["-Xmx512m", "-XX:-UsePerfData"]),
      "-Dfile.encoding=UTF-8",
      "-cp",
      artifact.classPath,
      artifact.mainClass,
    ];
  } else {
    return {
      type: "error",
      executionId: "",
      message: `Language "${lang}" cannot be executed on this image.`,
      stage: "toolchain",
    };
  }

  const run = await runSandboxed(spec, command, args, {
    cwd: dir,
    input: stdin ?? "",
    timeoutMs,
    dropPrivileges: drop,
  });

  if (run.spawnError) {
    return { type: "error", executionId: "", message: run.spawnError, stage: "toolchain" };
  }
  if (run.timedOut) {
    return {
      type: "error",
      executionId: "",
      message: "Execution timed out.",
      stage: "execute",
      timedOut: true,
    };
  }

  // Interpreted languages: an uncaught exception/traceback is a runtime
  // error (mirrors the WASM workers). Compiled languages keep the native
  // executor contract: stdout is judged, the exit code is informational.
  const interpreted = ["python", "javascript", "typescript", "ruby", "sql"];
  if (interpreted.includes(lang) && (run.exitCode ?? 0) !== 0) {
    return {
      type: "error",
      executionId: "",
      message:
        run.stderr.trim() ||
        `Program exited with code ${run.exitCode}.`,
      stage: "execute",
    };
  }

  return {
    type: "result",
    executionId: "",
    stdout: run.stdout,
    stderr: run.stderr,
    exitCode: run.exitCode ?? 0,
    executionTimeMs: performance.now() - started,
  };
}

/* ─────────────────────────── keyword checks ───────────────────────────── */

/**
 * Same semantics as the app's client checks (code-view.tsx):
 * - blacklist: comma-separated — any substring present → reject
 * - whitelist: comma-separated — every keyword must be present → else reject
 */
function checkKeywords(code, checks) {
  if (!checks) return null;
  const parse = (raw) =>
    String(raw ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

  const blacklist = parse(checks.blacklist);
  const whitelist = parse(checks.whitelist);

  if (blacklist.some((keyword) => code.includes(keyword))) {
    return "Blacklist keyword(s) found in the code!";
  }
  if (whitelist.some((keyword) => !code.includes(keyword))) {
    return "Whitelist keyword(s) missing from the code!";
  }
  return null;
}

/* ───────────────────────────── orchestrator ───────────────────────────── */

function clampRunTimeout(timeoutMs, spec) {
  const def = spec?.limits?.runTimeoutMs ?? 10_000;
  return Math.min(Math.max(timeoutMs ?? def, MIN_RUN_TIMEOUT_MS), MAX_RUN_TIMEOUT_MS);
}

async function runSingle(spec, params) {
  const executionId = params.executionId ?? "";
  const timeoutMs = clampRunTimeout(params.timeoutMs, spec);

  // SQL never touches the filesystem toolchain — special path.
  if (spec.language === "sql") {
    return runSql(spec, params);
  }

  const dir = await mkdtemp(path.join(tmpdir(), "atomlambda-"));
  try {
    await chmod(dir, 0o777).catch(() => {});
    const compiled = await compile(spec, dir, params.code, params.versionProfileId);
    if (!compiled.ok) {
      return { type: "error", executionId, message: compiled.message, stage: compiled.stage };
    }
    const outcome = await execute(
      spec,
      dir,
      { ...compiled.artifact, profile: compiled.profile },
      params.stdin,
      timeoutMs
    );
    outcome.executionId = executionId;
    if (spec.language === "sql") outcome.sql = outcome.sql;
    return outcome;
  } finally {
    rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}

function errorOutcome(executionId, message, stage) {
  return { type: "error", executionId: executionId ?? "", message, stage: stage ?? "execute" };
}

/** Multi-testcase judge — compile once, run each case (wasm-judge semantics). */
async function runMulti(spec, params) {
  const testcases = (params.testcases ?? []).map((tc) => ({
    input: String(tc?.input ?? tc?.input1 ?? ""),
    expectedOutput: String(tc?.expectedOutput ?? tc?.output ?? ""),
  }));
  if (testcases.length === 0) {
    return { compileMessage: "Error", results: [], passedCount: 0, total: 0 };
  }

  const results = [];
  let runtimeBroken = false;
  let compileFailed = false;
  let compileMessage = "";

  for (let index = 0; index < testcases.length; index++) {
    const testCase = testcases[index];

    // Mirror wasm-judge: undefined placeholder cases auto-pass.
    if (index > 0 && testCase.input === "" && testCase.expectedOutput === "") {
      results.push({ status: "Success", output: "" });
      continue;
    }
    if (runtimeBroken || compileFailed) {
      results.push({ status: "Error", output: "" });
      continue;
    }

    const outcome = await runSingle(spec, {
      executionId: params.executionId ?? "",
      code: params.code,
      stdin: testCase.input,
      versionProfileId: params.versionProfileId,
      timeoutMs: params.timeoutMs,
    });

    if (outcome.type === "error") {
      if (outcome.stage === "compile" || outcome.stage === "toolchain") compileFailed = true;
      else runtimeBroken = true;
      compileMessage = compileMessage || outcome.message;
      results.push({ status: "Error", output: outcome.timedOut ? "Execution timed out." : outcome.message });
      continue;
    }

    const passed =
      normalizeOutput(outcome.stdout) === normalizeOutput(testCase.expectedOutput);
    results.push({
      status: passed ? "Success" : "Failed",
      output: outcome.stdout,
    });
  }

  const anyError = results.some((r) => r.status === "Error");
  const allPass = results.every((r) => r.status === "Success");
  const passedCount = results.filter((r) => r.status === "Success").length;

  const response = {
    compileMessage: anyError ? "Error" : allPass ? "Success" : "Failed",
    compileMessageDetail: compileMessage, // compiler stderr when a compile failed
    results,
    passedCount,
    total: testcases.length,
    // desktop-route compatible aliases (testcase1status … output3 …)
    testcase1status: results[0]?.status?.toLowerCase() ?? "",
    testcase2status: results[1]?.status?.toLowerCase() ?? "",
    testcase3status: results[2]?.status?.toLowerCase() ?? "",
    output1: results[0]?.output ?? "",
    output2: results[1]?.output ?? "",
    output3: results[2]?.output ?? "",
  };
  return response;
}

/* ───────────────────────────── entry point ────────────────────────────── */

function readBody(event) {
  if (event && typeof event === "object" && "body" in event) {
    // Function URL / API Gateway HTTP payload
    if (event.isBase64Encoded) {
      return Buffer.from(event.body ?? "", "base64").toString("utf8");
    }
    return event.body ?? "";
  }
  return event; // direct invoke
}

function httpReply(statusCode, payload, event) {
  if (event && typeof event === "object" && "body" in event) {
    return {
      statusCode,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
  }
  return payload; // direct invoke → return the object itself
}

export const handler = async (event) => {
  const isHttp = event && typeof event === "object" && "body" in event;

  // Optional shared secret (header on HTTP calls)
  const token = process.env.ATOM_TOKEN;
  if (token && isHttp) {
    const headers = Object.fromEntries(
      Object.entries(event.headers ?? {}).map(([k, v]) => [k.toLowerCase(), v])
    );
    if (headers["x-atom-token"] !== token) {
      return httpReply(401, { message: "Invalid or missing x-atom-token." }, event);
    }
  }

  let req;
  try {
    const raw = readBody(event);
    req = typeof raw === "string" ? JSON.parse(raw || "{}") : raw ?? {};
  } catch {
    return httpReply(400, { type: "error", message: "Invalid JSON body.", stage: "bad-request" }, event);
  }

  // Resolve language spec: per-language image → its single spec; all-in-one →
  // dispatch on req.language.
  let spec = await loadSpec(null);
  let language = null;
  if (!spec && req.language) {
    language = LANGUAGE_ALIASES[String(req.language).toLowerCase()] ?? null;
    spec = language ? await loadSpec(language) : null;
  }
  if (!spec) {
    return httpReply(
      400,
      { type: "error", executionId: req.executionId ?? "", message: "No language configuration found for this image and request.", stage: "bad-request" },
      event
    );
  }

  const code = typeof req.code === "string" ? req.code : "";
  if (!code.trim()) {
    return httpReply(400, errorOutcome(req.executionId, "Code is empty.", "bad-request"), event);
  }
  if (code.length > MAX_CODE_CHARS) {
    return httpReply(400, errorOutcome(req.executionId, `Source too large (limit ${MAX_CODE_CHARS} characters).`, "bad-request"), event);
  }
  const stdin = typeof req.stdin === "string" ? req.stdin : "";
  if (stdin.length > MAX_STDIN_CHARS) {
    return httpReply(400, errorOutcome(req.executionId, `stdin too large (limit ${MAX_STDIN_CHARS} characters).`, "bad-request"), event);
  }

  const keywordViolation = checkKeywords(code, req.checks);
  if (keywordViolation) {
    return httpReply(400, errorOutcome(req.executionId, keywordViolation, "compile"), event);
  }

  const multi = Array.isArray(req.testcases) && req.testcases.length > 0;
  if (multi && req.testcases.length > MAX_TESTCASES) {
    return httpReply(400, errorOutcome(req.executionId, `Too many test cases (limit ${MAX_TESTCASES}).`, "bad-request"), event);
  }

  try {
    const response = multi
      ? await runMulti(spec, req)
      : await runSingle(spec, req);
    return httpReply(200, response, event);
  } catch (err) {
    console.error("[atomcode-lambda]", err);
    return httpReply(
      500,
      errorOutcome(req.executionId, "Unexpected execution failure on the Lambda runtime.", "toolchain"),
      event
    );
  }
};

export default handler;
