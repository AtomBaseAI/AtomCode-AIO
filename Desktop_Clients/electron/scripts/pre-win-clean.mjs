#!/usr/bin/env node
/**
 * pre-win-clean.mjs — stale NSIS payload guard (runs before export:win).
 *
 * electron-builder's archive step SKIPS re-packing when the existing
 * `<name>-<version>-<arch>.nsis.7z` in dist/ is NEWER than the mtime of
 * the win-unpacked directory itself ("Archive file is up to date —
 * skipped archiving"). The directory mtime does NOT change when the
 * afterpack hook rewrites nested files (symlink dereferencing, integrity
 * manifest regeneration), so a rebuild can silently reuse the PREVIOUS
 * build's payload archive — shipping a stale, potentially inconsistent
 * app package with a fresh integrity manifest.
 *
 * Removing the cached payload archives before the build forces the
 * archive step to always re-pack from the current win-unpacked state.
 * Cost: one extra compression pass per build (~1 min). Safety > speed.
 *
 * Run from elcetron/:  node scripts/pre-win-clean.mjs
 */

import { existsSync, readdirSync, rmSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(here, "..", "dist");

const STALE_PATTERNS = [
  /^.+\.nsis\.7z$/, // NSIS 7z payload (incl. -2/-3 multi-target variants)
  /^.+\.nsis\.zip$/, // NSIS zip payload (useZip builds)
  /^.+\.blockmap$/, // differential update blockmaps derived from the payload
];

let removed = 0;
if (existsSync(distDir)) {
  for (const name of readdirSync(distDir)) {
    if (!STALE_PATTERNS.some((re) => re.test(name))) continue;
    const abs = path.join(distDir, name);
    try {
      const size = statSync(abs).size;
      rmSync(abs, { force: true });
      removed++;
      console.log(`[pre-win-clean] removed stale payload archive: dist/${name} (${(size / 1048576).toFixed(1)} MB)`);
    } catch (err) {
      console.warn(`[pre-win-clean] WARNING: could not remove dist/${name}: ${err.message}`);
    }
  }
}

console.log(
  removed > 0
    ? `[pre-win-clean] ${removed} stale payload archive(s) removed — electron-builder will re-pack from the current win-unpacked state.`
    : "[pre-win-clean] no stale payload archives found."
);
