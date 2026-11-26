#!/usr/bin/env node
/**
 * prepare-bundle.mjs — stage the packaged-app resources (Tauri installer).
 *
 * A packaged build (DMG / MSI / NSIS / deb / rpm / AppImage) cannot rely on
 * the repo checkout layout — the loopback server's roots must exist inside
 * the app bundle's resource directory. This script copies everything the
 * renderer needs into `src-tauri/resources/`, which tauri.conf.json ships
 * via `bundle.resources`:
 *
 *   resources/ui/            → Tauri UI copy (bridge.js + patched engine)
 *   resources/renderer/      → full Electron renderer (engine + workers +
 *                              wasm runtimes: pyodide, sqlite, ruby, clang)
 *   resources/java-runtime/  → local Java runtime (Doppio JVM) when present
 *
 * The Rust side (main.rs) resolves them through BaseDirectory::Resource:
 *   ui  → <resource>/ui            (fallback <resource>/resources/ui)
 *   …   → <resource>/renderer      (fallback <resource>/resources/renderer)
 *
 * Wired as `beforeBuildCommand` in tauri.conf.json, so every
 * `tauri build` (or the build:* npm scripts) refreshes the staging copy.
 *
 * Run manually from tauri/:  node scripts/prepare-bundle.mjs
 */

import { cpSync, existsSync, lstatSync, mkdirSync as fs_mkdirSync, readdirSync, readlinkSync, rmSync, statSync, symlinkSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const tauriRoot = path.resolve(here, "..");
const projectRoot = path.resolve(tauriRoot, "..");
const srcTauri = path.join(tauriRoot, "src-tauri");
const staging = path.join(srcTauri, "resources");

const COPIES = [
  { from: path.join(tauriRoot, "ui"), to: path.join(staging, "ui"), label: "ui (bridge.js + patched engine)" },
  { from: path.join(projectRoot, "elcetron", "renderer"), to: path.join(staging, "renderer"), label: "renderer (workers + wasm runtimes)" },
  { from: path.join(projectRoot, "elcetron", "java-runtime"), to: path.join(staging, "java-runtime"), label: "java-runtime (Doppio JVM)", optional: true },
];

/** Skipped inside the renderer copy — never useful inside the installer. */
const SKIP = { dot: true };

/**
 * Dev artifacts pruned from the java-runtime staging copy — the installed
 * app only ever invokes `node_modules/doppiojvm/bin/doppio` (→
 * `dist/release-cli/`) + `vendor/java_home`, so npm/TS/dev builds and CLI
 * shims are dead weight in the installer (~25 MB saved).
 */
const JAVA_PRUNE = [
  "node_modules/doppiojvm/docs",
  "node_modules/doppiojvm/src",
  "node_modules/doppiojvm/includes",
  "node_modules/doppiojvm/console",
  "node_modules/doppiojvm/doppio",
  "node_modules/doppiojvm/doppio-dev",
  "node_modules/doppiojvm/doppio-fast-dev",
  "node_modules/doppiojvm/doppioh",
  "node_modules/doppiojvm/prepublish.js",
  "node_modules/doppiojvm/install.js",
  "node_modules/doppiojvm/.npmignore",
  "node_modules/doppiojvm/dist/dev",
  "node_modules/doppiojvm/dist/dev-cli",
  "node_modules/doppiojvm/dist/fast-dev",
  "node_modules/doppiojvm/dist/fast-dev-cli",
  "node_modules/doppiojvm/dist/typings",
];

/**
 * cpSync resolves symlinks into ABSOLUTE links pointing at the build
 * machine's checkout (e.g. dist/release-cli/vendor → /home/me/repo/…).
 * Doppio locates the JDK through that very link (`require("../vendor/java_home/jdk.json")`),
 * so inside an installer it MUST become a relative link into the staged
 * tree — rewrite every staged symlink to its staged-relative target.
 */
function fixStagedSymlinks(from, to) {
  const walk = (dstDir) => {
    let entries;
    try {
      entries = readdirSync(dstDir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const dst = path.join(dstDir, entry.name);
      if (entry.isSymbolicLink()) {
        // Map the staged link back to its source-tree counterpart to learn
        // the intended target. Pruned dirs are never staged, so walking the
        // STAGED tree guarantees every parent directory exists.
        const src = path.join(from, path.relative(to, dst));
        let resolved;
        try {
          resolved = path.resolve(path.dirname(src), readlinkSync(src));
        } catch {
          continue;
        }
        const stagedTarget = path.join(to, path.relative(from, resolved));
        if (existsSync(stagedTarget)) {
          rmSync(dst, { force: true }); // drop the absolute link cpSync wrote
          symlinkSync(
            path.relative(path.dirname(dst), stagedTarget),
            dst,
            process.platform === "win32" ? "junction" : undefined
          );
        }
      } else if (entry.isDirectory()) {
        walk(dst);
      }
    }
  };
  walk(to);
}

function dirSize(p) {
  let total = 0;
  try {
    const stack = [p];
    while (stack.length) {
      const cur = stack.pop();
      for (const name of readdirSync(cur)) {
        if (SKIP.dot && name.startsWith(".")) continue;
        const child = path.join(cur, name);
        const st = lstatSync(child); // lstat — symlinks must not be followed (dist/*/vendor → vendor would multi-count)
        if (st.isSymbolicLink()) {
          total += st.size;
          continue;
        }
        if (st.isDirectory()) stack.push(child);
        else total += st.size;
      }
    }
  } catch {
    /* ignore */
  }
  return total;
}

const mb = (n) => `${(n / (1024 * 1024)).toFixed(1)} MB`;

let staged = 0;
for (const { from, to, label, optional } of COPIES) {
  // The staging target must ALWAYS exist (even empty) — tauri-build walks
  // every configured resource dir and skips the empty ones gracefully.
  fs_mkdirSync(to, { recursive: true });
  if (!existsSync(from)) {
    if (optional) {
      console.warn(`[prepare-bundle] absent (optional): ${label} — left empty`);
      continue;
    }
    console.error(`[prepare-bundle] MISSING required source: ${from}`);
    process.exit(1);
  }
  rmSync(to, { recursive: true, force: true });
  fs_mkdirSync(to, { recursive: true });
  cpSync(from, to, {
    recursive: true,
    filter: (src) => {
      const base = path.basename(src);
      if (SKIP.dot && base.startsWith(".") && base !== ".") return false;
      // dev-artifact pruning (java-runtime only — rel path is empty for the copy root)
      const rel = path.relative(from, src);
      if (rel && JAVA_PRUNE.includes(rel)) return false;
      return true;
    },
  });
  fixStagedSymlinks(from, to);
  const size = dirSize(to);
  staged += size;
  console.log(`[prepare-bundle] staged ${label}: ${mb(size)}`);
}

console.log(`[prepare-bundle] total staged: ${mb(staged)} → ${path.relative(tauriRoot, staging)}`);
