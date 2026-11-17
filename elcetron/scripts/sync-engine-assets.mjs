#!/usr/bin/env node
/**
 * sync-engine-assets.mjs — bundled runtime verifier (runs on prebuild).
 *
 * The desktop app is fully self-contained: every language executes
 * locally, nothing hits the server or a Lambda judge API.
 *
 *   renderer/workers/*.worker.js           python/js/ts/ruby/sqlite/clang
 *   renderer/engine/atom-engine.js         engine + profiles
 *   renderer/runtimes/pyodide/<ver>/       CPython 3.11–3.14 (wasm)
 *   renderer/runtimes/sqlite-wasm/         SQLite (wasm)
 *   renderer/runtimes/ruby/3.4/            CRuby 3.4 (wasm)
 *   renderer/runtimes/clang/               clang + lld + memfs + C/C++ sysroot
 *   java-runtime/                          Doppio JVM + JDK8 class library + javac
 *
 * The renderer assets are canonical inside the repo — this script simply
 * verifies that everything needed to ship a dmg/exe is present (and fails
 * the build with a clear message if something is missing).
 *
 * Run from elcetron/:  node scripts/sync-engine-assets.mjs
 */

import { existsSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const electronRoot = path.resolve(here, "..");
const renderer = path.join(electronRoot, "renderer");

/** [relative path, minimum size in bytes (0 = just check existence)] */
const REQUIRED = [
  // engine + workers
  ["renderer/engine/atom-engine.js", 10000],
  ["renderer/workers/python.worker.js", 1000],
  ["renderer/workers/javascript.worker.js", 500],
  ["renderer/workers/typescript.worker.js", 500],
  ["renderer/workers/ruby.worker.js", 500],
  ["renderer/workers/sqlite.worker.js", 500],
  ["renderer/workers/clang.worker.js", 10000],

  // python runtimes (4 bundled versions)
  ["renderer/runtimes/pyodide/0.25.1/pyodide.asm.wasm", 1],
  ["renderer/runtimes/pyodide/0.26.4/pyodide.asm.wasm", 1],
  ["renderer/runtimes/pyodide/0.28.3/pyodide.asm.wasm", 1],
  ["renderer/runtimes/pyodide/314.0.7/pyodide.asm.wasm", 1],

  // sqlite + ruby
  ["renderer/runtimes/sqlite-wasm/sqlite3.wasm", 1],
  ["renderer/runtimes/ruby/3.4/ruby+stdlib.wasm", 1],

  // C/C++ toolchain (real clang compiled to wasm)
  ["renderer/runtimes/clang/clang", 30000000],
  ["renderer/runtimes/clang/lld", 18000000],
  ["renderer/runtimes/clang/memfs", 100000],
  ["renderer/runtimes/clang/sysroot.tar", 8000000],
  ["renderer/runtimes/clang/LICENSE", 100],
  ["renderer/runtimes/clang/LICENSE.llvm", 100],

  // Java — Doppio JVM + JDK 8 class library + javac (tools.jar)
  ["java-runtime/runner.js", 3000],
  ["java-runtime/doppio-wrapper.js", 2000],
  ["java-runtime/node_modules/doppiojvm/dist/release-cli/console/runner.js", 1000],
  ["java-runtime/node_modules/doppiojvm/bin/doppio", 50],
  ["java-runtime/node_modules/doppiojvm/vendor/java_home/lib/rt.jar", 50000000],
  ["java-runtime/node_modules/doppiojvm/vendor/java_home/lib/tools.jar", 15000000],
  ["java-runtime/node_modules/doppiojvm/vendor/java_home/lib/doppio.jar", 100],
  ["java-runtime/node_modules/doppiojvm/vendor/java_home/lib/meta-index", 100],
  ["java-runtime/node_modules/browserfs/dist/browserfs.min.js", 200000],
  ["java-runtime/node_modules/source-map/package.json", 50],
  ["java-runtime/node_modules/source-map/dist/source-map.js", 5000],
  ["java-runtime/node_modules/source-map-support/source-map-support.js", 5000],

  // renderer chrome
  ["renderer/index.html", 1000],
  ["renderer/app.js", 40000],
  ["renderer/styles.css", 10000],
  ["preload.js", 300],
  ["main.js", 8000],
];

let missing = 0;
for (const [rel, minSize] of REQUIRED) {
  const abs = path.join(electronRoot, rel);
  if (!existsSync(abs)) {
    console.error(`[sync] MISSING: ${rel}`);
    missing += 1;
    continue;
  }
  const size = statSync(abs).size;
  if (size < minSize) {
    console.error(`[sync] TOO SMALL (${size} < ${minSize} bytes): ${rel}`);
    missing += 1;
  }
}

/* ------------------------------------------------------------------
 * java-runtime/node_modules is git-ignored (150 MB of jars), so a
 * fresh clone does not have it. Install it on demand from the committed
 * java-runtime/package-lock.json, then re-verify. Everything needed
 * (rt.jar, tools.jar, doppio.jar, browserfs…) ships inside the npm
 * tarballs, so install scripts are intentionally skipped.
 * ------------------------------------------------------------------ */
if (REQUIRED.some(([rel]) => rel.startsWith("java-runtime/")) && missing > 0) {
  installJavaRuntime();
  // re-check only the java-runtime entries
  missing = 0;
  for (const [rel, minSize] of REQUIRED) {
    const abs = path.join(electronRoot, rel);
    if (!existsSync(abs) || statSync(abs).size < minSize) {
      console.error(`[sync] STILL MISSING after install: ${rel}`);
      missing += 1;
    }
  }
}

if (missing > 0) {
  console.error(`\n[sync] ${missing} required runtime asset(s) missing — the desktop build would ship broken.`);
  process.exit(1);
}

console.log("[sync] all bundled runtimes verified: python x4, sqlite, ruby, js/ts, clang (C/C++), doppio JVM (java)");
console.log("[done] desktop engine assets are complete — fully local execution, no Lambda APIs.");

function installJavaRuntime() {
  const jrDir = path.join(electronRoot, "java-runtime");
  const nm = path.join(jrDir, "node_modules");
  console.log(
    "[sync] java-runtime assets missing — installing bundled JVM dependencies " +
      "(one-time, ~100 MB from the npm registry + GitHub releases)…"
  );

  /* 1. JS dependencies (doppiojvm, browserfs, …) — deterministic from the
   *    committed package-lock.json; install scripts skipped (npm's
   *    allowScripts gate must not block the build). */
  if (!existsSync(path.join(nm, "doppiojvm", "package.json"))) {
    const attempts = [];
    if (existsSync(path.join(jrDir, "package-lock.json"))) {
      attempts.push(["npm", ["ci", "--ignore-scripts", "--no-audit", "--no-fund"]]);
    }
    attempts.push(["npm", ["install", "--ignore-scripts", "--no-audit", "--no-fund"]]);
    attempts.push(["bun", ["install", "--ignore-scripts"]]);
    let installed = false;
    for (const [cmd, args] of attempts) {
      try {
        console.log(`[sync] running: ${cmd} ${args.join(" ")} (cwd=java-runtime)`);
        execFileSync(cmd, args, { cwd: jrDir, stdio: "inherit" });
        installed = true;
        break;
      } catch (err) {
        console.warn(`[sync] ${cmd} failed: ${String(err.message).split("\n")[0]} — trying next installer…`);
      }
    }
    if (!installed) {
      throw new Error(
        "[sync] could not install java-runtime dependencies (npm/bun unavailable or network blocked). " +
          "Run `npm install` inside elcetron/java-runtime manually, then rebuild."
      );
    }
  }

  /* 2. JDK 8 vendor tree (rt.jar / tools.jar / doppio.jar) — shipped by
   *    doppiojvm's own install.js (downloads java_home.tar.gz from the
   *    official plasma-umass/doppio_jcl GitHub release, one-time ~85 MB).
   *    Runs explicitly because npm's install-script gating skips it. */
  if (!existsSync(path.join(nm, "doppiojvm", "vendor", "java_home", "lib", "rt.jar"))) {
    console.log("[sync] fetching JDK 8 vendor tree via doppiojvm/install.js…");
    execFileSync(process.execPath, [path.join(nm, "doppiojvm", "install.js")], {
      cwd: jrDir,
      stdio: "inherit",
    });
  }
}
