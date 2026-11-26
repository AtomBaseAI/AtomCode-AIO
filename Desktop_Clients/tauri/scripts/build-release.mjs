#!/usr/bin/env node
/**
 * build-release.mjs — host-aware release builds for the Tauri student client.
 *
 * Tauri's bundler can only produce the bundle types its HOST supports
 * (`tauri build --bundles` rejects anything else — e.g. on macOS the CLI
 * answers: possible values: ios, app, dmg). Cross-compiling the app binary
 * itself is likewise toolchain-bound:
 *
 *   macOS host   → .app + .dmg        (arm64 / x86_64 / universal)
 *   Windows host → .msi + NSIS .exe   (MSVC toolchain required)
 *   Linux host   → .deb / .rpm / AppImage
 *
 * The requested platform is honored wherever it appears on the command
 * line — `bun run build windows:msi` expands to
 * `node scripts/build-release.mjs auto windows:msi` (bun appends the extra
 * word AFTER the "auto" default), and an earlier version of this script
 * read only argv[2] = "auto", silently building a macOS installer instead.
 * It now scans every positional, prefers an explicit platform over "auto",
 * and REFUSES impossible host/platform combinations with clear fix-up
 * instructions instead of silently substituting the host platform.
 *
 * Usage:  node scripts/build-release.mjs [auto] [<platform>] [--dry-run]
 *   auto | mac | mac:arm64 | mac:intel | mac:universal
 *       | windows | windows:nsis | windows:msi
 *       | linux | linux:deb | linux:rpm | linux:appimage
 *
 * DRY_RUN=1 (or --dry-run) prints the resolved target/bundles and exits
 * without compiling — handy for verifying what a command would do.
 */

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const tauriRoot = path.resolve(here, "..");

const HOST = {
  platform: process.platform, // darwin | win32 | linux
  arch: process.arch, // arm64 | x64 | …
};
const HOST_LABEL = { darwin: "macOS", win32: "Windows", linux: "Linux" };
const PLATFORM_TITLE = { darwin: "macOS", win32: "Windows", linux: "Linux" };

/** mode → { target, bundles, host } */
const MODES = {
  mac: { target: HOST.arch === "arm64" ? "aarch64-apple-darwin" : "x86_64-apple-darwin", bundles: "app,dmg", host: "darwin" },
  "mac:arm64": { target: "aarch64-apple-darwin", bundles: "app,dmg", host: "darwin" },
  "mac:intel": { target: "x86_64-apple-darwin", bundles: "app,dmg", host: "darwin" },
  "mac:universal": { target: "universal-apple-darwin", bundles: "app,dmg", host: "darwin" },
  windows: { target: "x86_64-pc-windows-msvc", bundles: "nsis,msi", host: "win32" },
  "windows:nsis": { target: "x86_64-pc-windows-msvc", bundles: "nsis", host: "win32" },
  "windows:msi": { target: "x86_64-pc-windows-msvc", bundles: "msi", host: "win32" },
  linux: { target: "x86_64-unknown-linux-gnu", bundles: "deb,rpm,appimage", host: "linux" },
  "linux:deb": { target: "x86_64-unknown-linux-gnu", bundles: "deb", host: "linux" },
  "linux:rpm": { target: "x86_64-unknown-linux-gnu", bundles: "rpm", host: "linux" },
  "linux:appimage": { target: "x86_64-unknown-linux-gnu", bundles: "appimage", host: "linux" },
};
const ALL_MODES = Object.keys(MODES).join(" | ");

/** Human names for the artifacts each bundle type produces. */
const ARTIFACT = {
  app: "AtomCode Student.app",
  dmg: "*.dmg",
  nsis: "*-setup.exe",
  msi: "*.msi",
  deb: "*.deb",
  rpm: "*.rpm",
  appimage: "*.AppImage",
};

let appVersion = "2.0.4";
try {
  appVersion = JSON.parse(readFileSync(path.join(tauriRoot, "package.json"), "utf8")).version ?? appVersion;
} catch {
  /* keep fallback */
}

/** rustup targets available (for the friendly missing-target message). */
function installedRustTargets() {
  try {
    const out = execFileSync("rustup", ["target", "list", "--installed"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return out.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  } catch {
    return [];
  }
}

function fail(messages) {
  console.error("");
  for (const m of messages) console.error(m);
  console.error("");
  process.exit(1);
}

// ---- 0. argument parsing (positionals honored at ANY position) -----------

const argv = process.argv.slice(2);
const dryRun = argv.includes("--dry-run") || process.env.DRY_RUN === "1";

let mode = null;
const unknown = [];
let sawAuto = false;
for (const word of argv) {
  if (word.startsWith("--")) continue; // flags handled separately
  if (word === "auto") {
    sawAuto = true; // package.json default: "build": "build-release.mjs auto"
    continue;
  }
  if (MODES[word]) {
    mode = word; // explicit platform WINS over the auto default
    break;
  }
  unknown.push(word);
}
if (mode === null) mode = "auto";

if (unknown.length) {
  fail([
    `✗ Unknown build target(s): ${unknown.join(", ")}`,
    "",
    `Valid modes: auto | ${ALL_MODES}`,
    "",
    "Examples:",
    "  bun run build                    best installer(s) for the CURRENT OS",
    "  bun run build windows:msi        .msi  (must run on Windows)",
    "  bun run build windows            NSIS setup.exe + .msi (must run on Windows)",
    "  bun run build mac:universal      universal .app + .dmg (must run on macOS)",
    "  bun run build linux:deb          .deb  (must run on Linux)",
    "",
    "Tip: 'bun run build <platform>' is honored — the platform may follow",
    "'build' directly (bun appends it after the 'auto' default). Use",
    "'bun run build:help' for the full overview.",
  ]);
}

if (sawAuto && mode !== "auto") {
  console.log(`[build-release] note: explicit mode "${mode}" requested — ignoring the "auto" default`);
}

const spec = MODES[mode] ?? null;

// ---- 1. host capability check -------------------------------------------
// A requested platform that this host CANNOT produce now FAILS LOUDLY —
// it never silently falls back to building the host platform's installer.

if (spec && spec.host !== HOST.platform) {
  const lines = [
    `✗ You asked for a ${PLATFORM_TITLE[spec.host]} build on a ${HOST_LABEL[HOST.platform]} host.`,
    "",
    `This wrapper no longer substitutes the requested platform with a ${HOST_LABEL[HOST.platform]} installer.`,
    "",
  ];
  if (spec.host === "win32") {
    lines.push(
      "Windows installers (.msi / NSIS setup.exe) can only be PRODUCED on Windows —",
      "the MSVC linker and the WiX/NSIS toolchain do not exist on macOS or Linux,",
      "and the Tauri CLI restricts --bundles per host (on macOS it only offers:",
      "app, dmg — that is the exact \"invalid value 'msi'\" error).",
      "",
      "Options:",
      "  1. GitHub Actions (recommended — builds ALL installers from your Mac):",
      `       git tag tauri-v${appVersion} && git push origin tauri-v${appVersion}`,
      "     or open the repo's Actions tab → \"Tauri Release\" → Run workflow.",
      "     Produces: universal .dmg + .msi + NSIS setup.exe + .deb + .rpm + .AppImage",
      "",
      "  2. Any Windows machine:",
      "       bun run build:windows",
      "",
      "  3. Experimental NSIS-only cross-compile from macOS (no .msi — WiX is Windows-only):",
      "       cargo install cargo-xwin",
      `       rustup target add x86_64-pc-windows-msvc`,
      "       brew install nsis",
      "       npx tauri build --runner cargo-xwin --target x86_64-pc-windows-msvc --bundles nsis"
    );
  } else if (spec.host === "linux") {
    lines.push(
      "Linux packages (.deb / .rpm / AppImage) can only be PRODUCED on Linux —",
      "the Tauri CLI restricts --bundles per host (on macOS it only offers:",
      "app, dmg).",
      "",
      "Options:",
      "  1. GitHub Actions (recommended — the ubuntu job builds .deb/.rpm/.AppImage",
      "     and attaches them to a draft release):",
      `       git tag tauri-v${appVersion} && git push origin tauri-v${appVersion}`,
      "     or open the repo's Actions tab → \"Tauri Release\" → Run workflow.",
      "",
      "  2. Any Linux machine / WSL2 / Docker:",
      "       bun run build:linux"
    );
  } else {
    lines.push(
      "macOS bundles (.app / .dmg) can only be produced on macOS — Apple's",
      "toolchain (codesign, hdiutil) does not run on Windows or Linux.",
      "",
      "Options:",
      "  1. GitHub Actions (recommended — the macOS job builds a universal .dmg):",
      `       git tag tauri-v${appVersion} && git push origin tauri-v${appVersion}`,
      "     or open the repo's Actions tab → \"Tauri Release\" → Run workflow.",
      "",
      "  2. Any Mac:",
      "       bun run build:mac"
    );
  }
  fail(lines);
}

// ---- 2. resolve target/bundles for this host ----------------------------

let target;
let bundles;

if (mode === "auto") {
  if (HOST.platform === "darwin") {
    target = HOST.arch === "arm64" ? "aarch64-apple-darwin" : "x86_64-apple-darwin";
    bundles = "app,dmg";
  } else if (HOST.platform === "win32") {
    target = "x86_64-pc-windows-msvc";
    bundles = "nsis,msi";
  } else {
    target = HOST.arch === "arm64" ? "aarch64-unknown-linux-gnu" : "x86_64-unknown-linux-gnu";
    bundles = "deb,rpm,appimage";
  }
  console.log(`[build-release] auto mode on ${HOST_LABEL[HOST.platform]} (${HOST.arch})`);
} else {
  ({ target, bundles } = spec);
}

// ---- dry run: print the resolved plan and exit ---------------------------

if (dryRun) {
  console.log(`[build-release] dry run — host ${HOST_LABEL[HOST.platform]} (${HOST.arch}), mode "${mode}"`);
  console.log(`[build-release] target:  ${target}`);
  console.log(`[build-release] bundles: ${bundles}`);
  console.log(`[build-release] would run: tauri build --target ${target} --bundles ${bundles}`);
  process.exit(0);
}

// ---- 3. rust target availability check (nice errors, not clap walls) ----

if (HOST.platform !== "win32") {
  const installed = installedRustTargets();
  const need = target === "universal-apple-darwin"
    ? ["aarch64-apple-darwin", "x86_64-apple-darwin"]
    : [target];
  const missing = need.filter((t) => !installed.includes(t));
  if (installed.length && missing.length) {
    fail([
      `✗ Rust build target(s) not installed: ${missing.join(", ")}`,
      "",
      "Fix:",
      `  rustup target add ${missing.join(" ")}`,
      "",
      `Installed targets: ${installed.join(", ") || "(none)"}`,
    ]);
  }
}

// ---- 4. run the build ----------------------------------------------------

const tauriBin = path.join(tauriRoot, "node_modules", ".bin", "tauri");
if (!existsSync(tauriBin)) {
  fail([
    "✗ Tauri CLI not found (node_modules/.bin/tauri is missing).",
    "",
    "Fix (from the tauri/ directory):",
    "  bun install",
  ]);
}

const args = ["build", "--target", target, "--bundles", bundles];

console.log(`[build-release] tauri ${args.join(" ")}`);
console.log("");

try {
  execFileSync(tauriBin, args, { cwd: tauriRoot, stdio: "inherit" });
} catch (err) {
  process.exit(err.status ?? 1);
}

const artifacts = bundles
  .split(",")
  .map((b) => ARTIFACT[b.trim()] ?? b.trim())
  .join(", ");

console.log("");
console.log(`[build-release] done — artifacts in src-tauri/target/${target}/release/bundle/`);
console.log(`[build-release] expected bundles: ${artifacts}`);
