#!/usr/bin/env node
/**
 * sync-engine-assets.mjs — bundled runtime verifier (Tauri build).
 *
 * The Tauri app executes the SAME self-hosted code-execution assets as
 * the Electron client (elcetron/). The heavy language runtimes stay
 * canonical in `elcetron/renderer/runtimes/` — at runtime the embedded
 * loopback HTTP server (and scripts/preview-server.mjs) resolve ui/ first
 * and fall back to elcetron/renderer for anything missing (zero-copy
 * dev, single copy in the repo).
 *
 * Local (on-device) execution in the Tauri build:
 *   python (pyodide x4) · sql (sqlite-wasm) · ruby 3.4 · javascript ·
 *   typescript 5.9   — bundled wasm runtimes, judged client-side (same
 *                      trust level as the web app)
 *   c / cpp / java   — C/C++ via the bundled clang worker + runtimes and
 *                      Java via the Doppio JVM in elcetron/java-runtime
 *                      (spawned by the Rust java_run command, exactly
 *                      like the Electron main process did)
 *
 * Run from tauri/:  node scripts/sync-engine-assets.mjs
 */

import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const tauriRoot = path.resolve(here, "..");
const uiRoot = path.join(tauriRoot, "ui");
const projectRoot = path.resolve(tauriRoot, "..");
const electronRenderer = path.join(projectRoot, "elcetron", "renderer");
const electronJava = path.join(projectRoot, "elcetron", "java-runtime");

/* ---------- 1. verify the Tauri ui/ (adapted renderer + bridge) ---------- */

/** [relative path, minimum size in bytes (0 = just check existence)] */
const REQUIRED_UI = [
  ["ui/index.html", 1000],
  ["ui/bridge.js", 4000],
  ["ui/app.js", 40000],
  ["ui/styles.css", 10000],

  // engine (adapted: document.baseURI-relative worker URLs)
  ["ui/engine/atom-engine.js", 10000],

  // worker bundles
  ["ui/workers/python.worker.js", 1000],
  ["ui/workers/javascript.worker.js", 500],
  ["ui/workers/typescript.worker.js", 500000],
  ["ui/workers/ruby.worker.js", 500],
  ["ui/workers/sqlite.worker.js", 500],

  // branding
  ["ui/assets/icon.png", 100],
  ["ui/assets/Lang/python.svg", 100],

  // Rust shell
  ["src-tauri/Cargo.toml", 200],
  ["src-tauri/src/main.rs", 5000],
  ["src-tauri/src/http.rs", 2000],
  ["src-tauri/build.rs", 20],
  ["src-tauri/tauri.conf.json", 400],
  ["src-tauri/capabilities/default.json", 100],
  ["src-tauri/icons/icon.png", 100],

  // scripts
  ["scripts/preview-server.mjs", 1500],
];

let missing = 0;
for (const [rel, minSize] of REQUIRED_UI) {
  const abs = path.join(tauriRoot, rel);
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

/* ---------- 2. engine must be the adapted Tauri version ---------- */
{
  const enginePath = path.join(uiRoot, "engine", "atom-engine.js");
  if (existsSync(enginePath)) {
    const body = await import("node:fs").then((fs) =>
      fs.readFileSync(enginePath, "utf8")
    );
    if (!body.includes("document.baseURI")) {
      console.error(
        "[sync] ui/engine/atom-engine.js is not the adapted Tauri version (missing document.baseURI worker URLs)."
      );
      missing += 1;
    }
    if (!body.includes("window.atomcode.javaRun")) {
      console.error("[sync] ui/engine/atom-engine.js lost its javaBridge guard.");
      missing += 1;
    }
  }
}

/* ---------- 3. verify the fallback renderer root (runtimes) ---------- */

const REQUIRED_RENDERER = [
  ["engine/atom-engine.js", 10000],
  ["workers/clang.worker.js", 10000],
  ["runtimes/pyodide/0.25.1/pyodide.asm.wasm", 1],
  ["runtimes/pyodide/0.26.4/pyodide.asm.wasm", 1],
  ["runtimes/pyodide/0.28.3/pyodide.asm.wasm", 1],
  ["runtimes/pyodide/314.0.7/pyodide.asm.wasm", 1],
  ["runtimes/sqlite-wasm/sqlite3.wasm", 1],
  ["runtimes/ruby/3.4/ruby+stdlib.wasm", 1],
  ["runtimes/clang/clang", 30000000],
  ["runtimes/clang/lld", 18000000],
  ["runtimes/clang/memfs", 100000],
  ["runtimes/clang/sysroot.tar", 8000000],
];

for (const [rel, minSize] of REQUIRED_RENDERER) {
  const abs = path.join(electronRenderer, rel);
  if (!existsSync(abs) || statSync(abs).size < minSize) {
    console.error(`[sync] MISSING IN FALLBACK ROOT (elcetron/renderer): ${rel}`);
    missing += 1;
  }
}

/* ---------- 4. verify the local Java runtime (Doppio JVM) ---------- */

const JAVA_RUNTIME_REQUIRED = [
  "runner.js",
  "doppio-wrapper.js",
  "node_modules/doppiojvm/bin/doppio",
  "node_modules/doppiojvm/vendor/java_home/lib/rt.jar",
];
let javaMissing = 0;
for (const rel of JAVA_RUNTIME_REQUIRED) {
  if (!existsSync(path.join(electronJava, rel))) javaMissing += 1;
}
if (javaMissing === JAVA_RUNTIME_REQUIRED.length) {
  console.warn(
    "[sync] elcetron/java-runtime not installed — Java questions will be judged by the server instead (install with: cd elcetron/java-runtime && npm install --ignore-scripts && node node_modules/doppiojvm/install.js)."
  );
}

if (missing > 0) {
  console.error(
    `\n[sync] ${missing} required asset(s) missing — the desktop build would ship broken.`
  );
  process.exit(1);
}

console.log("[sync] Tauri ui/ verified: bridge.js + patched engine + worker bundles");
console.log("[sync] fallback renderer root verified: pyodide x4, sqlite, ruby, clang (C/C++)");
console.log(
  javaMissing === 0
    ? "[sync] local Java runtime verified (Doppio JVM + JDK 8)"
    : "[sync] local Java runtime absent — server-side judging for Java (graceful)"
);
console.log("[done] Tauri engine assets are complete.");
