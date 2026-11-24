#!/usr/bin/env node
/**
 * fix-nsis-arch.mjs — Apple Silicon NSIS guard (wired as part of preexport:win).
 *
 * Problem this prevents
 * ---------------------
 * electron-builder's bundled NSIS toolchain (cache:
 *   ~/Library/Caches/electron-builder/nsis-<ver>/nsis-<ver>-<hash>/mac/makensis)
 * ships an **Intel-only (x86_64)** makensis binary. On an Apple Silicon Mac
 * without Rosetta 2 the NSIS target dies mid-build with:
 *
 *   ⨯ Cannot spawn …/mac/makensis: Error: spawn Unknown system error -86
 *
 * (-86 = EBADARCH, "Bad CPU type in executable"). Note that even WITH
 * Rosetta 2 installed, an i386-only makensis still fails (-86) — Rosetta 2
 * does not translate 32-bit binaries. The only bulletproof fix is a native
 * arm64-capable makensis.
 *
 * What this script does (darwin + arm64 only; a no-op everywhere else)
 * --------------------------------------------------------------------
 *  1. Scans electron-builder's NSIS cache for every `makensis` binary and
 *     reads its Mach-O header (pure byte parsing — no external `file` dep)
 *     to classify it as arm64 / x86_64 / i386 / universal (fat).
 *  2. If every makensis is arm64-capable → nothing to do.
 *  3. If Rosetta 2 is installed and the binaries are x86_64 → fine, they
 *     will run translated; log a note and continue.
 *  4. Otherwise it swaps each incompatible makensis for a native one:
 *       a. the cache's own arm64 build (`mac/arm64/makensis`) when present
 *          — same NSIS version, zero compatibility risk; else
 *       b. Homebrew's native arm64 makensis (`brew install nsis`).
 *     The original binary is kept as `makensis.x86_64.bak` next to it.
 *  5. If nothing native is available it FAILS FAST with the exact one-line
 *     fixes — before electron-builder wastes a full packaging run and then
 *     crashes with the cryptic -86 error.
 *
 * Run from elcetron/:  node scripts/fix-nsis-arch.mjs
 */

import {
  chmodSync,
  closeSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  openSync,
  readdirSync,
  readSync,
  renameSync,
  writeFileSync,
} from "node:fs";
import { execFileSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const log = (...m) => console.log("[nsis-arch]", ...m);

/* ------------------------------------------------------------------ *
 * Mach-O architecture detection (MAGIC_64 + fat/universal headers).
 * Returns a Set of: "arm64" | "x86_64" | "i386" (empty on failure).
 * ------------------------------------------------------------------ */
const CPUTYPE = new Map([
  [0x0100000c, "arm64"],
  [0x01000007, "x86_64"],
  [0x00000007, "i386"],
  [0x0000000c, "arm" /* ancient; still "not x86_64" */],
]);

export function readMachoArches(file) {
  const arches = new Set();
  let header;
  try {
    const fd = openSync(file, "r");
    const buf = Buffer.alloc(256);
    const n = readSync(fd, buf, 0, 256, 0);
    closeSync(fd);
    header = buf.subarray(0, n);
  } catch {
    return arches;
  }
  if (header.length < 8) return arches;

  const le32 = (o) => header.readUInt32LE(o);
  const be32 = (o) => header.readUInt32BE(o);
  const magic = [header[0], header[1], header[2], header[3]];

  if (magic[0] === 0xcf && magic[1] === 0xfa && magic[2] === 0xed && magic[3] === 0xfe) {
    // MH_MAGIC_64 (little-endian)
    arches.add(CPUTYPE.get(le32(4)) ?? `cputype-0x${le32(4).toString(16)}`);
  } else if (
    (magic[0] === 0xca && magic[1] === 0xfe && magic[2] === 0xba && magic[3] === 0xbe) ||
    (magic[0] === 0xca && magic[1] === 0xfe && magic[2] === 0xba && magic[3] === 0xbf)
  ) {
    // FAT_MAGIC / FAT_MAGIC_64 (big-endian), 20-byte arch entries
    const nArch = be32(4);
    for (let i = 0; i < Math.min(nArch, 8); i++) {
      const entry = 8 + i * 20;
      if (entry + 4 > header.length) break;
      arches.add(CPUTYPE.get(be32(entry)) ?? `cputype-0x${be32(entry).toString(16)}`);
    }
  }
  return arches;
}

/* ------------------------------------------------------------------ *
 * Rosetta 2 detection.
 * ------------------------------------------------------------------ */
export function rosettaInstalled() {
  if (existsSync("/Library/Apple/usr/share/rosetta")) return true;
  try {
    execFileSync("pgrep", ["-x", "oahd"], { stdio: "ignore" }); // Rosetta daemon
    return true;
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ *
 * Locate electron-builder's NSIS cache installs + all makensis files.
 * ------------------------------------------------------------------ */
export function findNsisInstalls(cacheRoot) {
  cacheRoot =
    cacheRoot ||
    process.env.ELECTRON_BUILDER_CACHE ||
    path.join(os.homedir(), "Library", "Caches", "electron-builder");
  const installs = [];
  if (!existsSync(cacheRoot)) return installs;

  for (const top of readdirSync(cacheRoot)) {
    if (!top.startsWith("nsis-")) continue;
    const topDir = path.join(cacheRoot, top);
    const candidates = [topDir];
    try {
      for (const inner of readdirSync(topDir)) candidates.push(path.join(topDir, inner));
    } catch {
      /* unreadable — ignore */
    }
    for (const dir of candidates) {
      const macDir = path.join(dir, "mac");
      if (existsSync(path.join(macDir, "makensis"))) {
        installs.push({ dir, macDir }); // collect ALL installs (a stale
        // checksum variant can leave 2+ hash-suffixed dirs side by side)
      }
    }
  }
  return installs;
}

export function collectMakensis(macDir) {
  const out = [];
  const scan = (dir, depth) => {
    if (depth > 3) return;
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) scan(p, depth + 1);
      else if (e.isFile() && e.name === "makensis") out.push(p);
    }
  };
  scan(macDir, 0);
  return out;
}

/* ------------------------------------------------------------------ *
 * Homebrew's native arm64 makensis.
 * ------------------------------------------------------------------ */
export function homebrewMakensis() {
  const candidates = ["/opt/homebrew/bin/makensis", "/usr/local/bin/makensis"];
  try {
    candidates.push(
      execFileSync("sh", ["-c", "command -v makensis"], { encoding: "utf8" }).trim(),
    );
  } catch {
    /* not on PATH */
  }
  for (const c of candidates) {
    if (c && existsSync(c)) return c;
  }
  return null;
}

const HELP = `
[nsis-arch] ✖ Apple Silicon (arm64) Mac + no Rosetta 2 + Intel-only NSIS makensis.
[nsis-arch]   The NSIS target would abort with: "spawn Unknown system error -86".
[nsis-arch]   Fix (pick ONE, then re-run the build):
[nsis-arch]     1) softwareupdate --install-rosetta --agree-to-license
[nsis-arch]        (installs Rosetta 2 so the bundled Intel makensis can run)
[nsis-arch]     2) brew install nsis
[nsis-arch]        (native arm64 makensis; this guard auto-wires it into
[nsis-arch]         electron-builder's cache on the next run)
[nsis-arch]   On macOS versions that no longer provide Rosetta, use option 2.`;

/* ------------------------------------------------------------------ *
 * Main logic. Returns a process exit code (0 ok / 1 blocked).
 * opts allow tests to inject platform, cache root, Rosetta state and
 * a Homebrew-makensis path without touching the real machine.
 * ------------------------------------------------------------------ */
export function run(opts = {}) {
  const platform = opts.platform ?? process.platform;
  const arch = opts.arch ?? process.arch;
  if (platform !== "darwin" || arch !== "arm64") return 0; // unaffected hosts

  const rosetta = opts.rosetta ?? rosettaInstalled();
  const brew =
    opts.brewMakensis !== undefined ? opts.brewMakensis : homebrewMakensis();
  const installs = findNsisInstalls(opts.cacheRoot);

  if (installs.length === 0) {
    // Cache not downloaded yet — pre-flight advisory only.
    if (!rosetta && !brew) {
      console.error(HELP);
      return 1; // fail fast instead of the cryptic -86 crash later
    }
    if (!rosetta) {
      log("NSIS cache not downloaded yet; if the first build still aborts with");
      log('"spawn Unknown system error -86", re-run the SAME command — this');
      log("guard will then swap a native arm64 makensis into the cache.");
    }
    return 0;
  }

  let swapped = 0;
  let blocked = false;

  for (const { macDir } of installs) {
    const classified = collectMakensis(macDir).map((f) => ({
      file: f,
      arches: readMachoArches(f),
    }));
    // Prefer a native makensis that already lives inside this NSIS install
    // (same NSIS version → zero compatibility risk) before falling back to
    // Homebrew. Only consider files OUTSIDE mac/ (i.e. mac/arm64/makensis),
    // never the Intel binary we may be about to replace.
    const nativeInCache = classified.filter(
      (c) => c.arches.has("arm64") && path.dirname(c.file) !== macDir,
    );
    const nativeFallback = nativeInCache[0]?.file ?? null;

    for (const { file, arches } of classified) {
      if (arches.has("arm64")) continue; // already native
      const isX64 = arches.has("x86_64");
      if (rosetta && isX64) {
        // i386-only binaries would STILL crash (-86) under Rosetta 2 — only
        // plain x86_64 can be translated.
        log(
          `${file.replace(os.homedir(), "~")} is x86_64-only — will run under Rosetta 2`,
        );
        continue;
      }

      const source = nativeFallback ?? brew;
      if (!source) {
        blocked = true;
        continue;
      }

      const backup = `${file}.x86_64.bak`;
      try {
        if (!existsSync(backup)) renameSync(file, backup);
        copyFileSync(source, file);
        chmodSync(file, 0o755);
        swapped++;
        log(
          `swapped non-arm64 makensis → native arm64 (${source === nativeFallback ? "bundled mac/arm64 build" : "Homebrew"})`,
        );
        log(`  original kept as ${path.basename(backup)}`);
      } catch (err) {
        console.error(`[nsis-arch] swap failed for ${file}: ${err.message}`);
        blocked = true;
      }
    }
  }

  if (blocked && swapped === 0) {
    console.error(HELP);
    return 1;
  }
  if (swapped > 0) log(`ready — ${swapped} makensis binary(ies) patched for Apple Silicon`);
  return 0;
}

/* ------------------------------------------------------------------ *
 * CLI entry — only when executed directly (so tests can import run()).
 * ------------------------------------------------------------------ */
const isMain =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  process.exit(run());
}
