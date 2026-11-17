#!/usr/bin/env node
/* ================================================================
 * afterpack.cjs — electron-builder afterPack hook
 *
 * Runs for every packaged build (dmg / exe / AppImage / unpacked)
 * and hardens the shipped app in two steps:
 *
 *  1. Integrity manifest
 *     Hashes EVERY file that ships inside resources/ (app.asar with
 *     the renderer + WASM engine, the bundled Doppio JVM, etc.) with
 *     SHA-256 and writes resources/integrity-manifest.json.
 *     The app verifies this manifest on every launch and refuses to
 *     start when an installed file is missing or modified, so the
 *     shipped source code and runtimes cannot be silently tampered
 *     with after installation.
 *
 *  2. Electron security fuses (via @electron/fuses)
 *     - NODE_OPTIONS env support  → disabled
 *       (the bundled Java runner chain is unaffected; it does not use
 *        NODE_OPTIONS, and attackers can no longer inject flags)
 *     - --inspect / remote debug CLI args → disabled
 *     - OnlyLoadAppFromAsar       → enabled
 *       (the app can only be booted from the signed-in-place asar
 *        archive, never from a dropped folder)
 *
 *     NOTE: RunAsNode stays ENABLED on purpose — the local Java
 *     runtime spawns the Electron binary in node mode
 *     (ELECTRON_RUN_AS_NODE=1) twice: main → runner.js →
 *     doppio-wrapper.js. Disabling it would break Java.
 * ================================================================ */

"use strict";

const { createHash } = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

/** SHA-256 of a file, streamed (handles 50MB jars comfortably). */
function hashFile(file) {
  return new Promise((resolve, reject) => {
    const hash = createHash("sha256");
    const stream = fs.createReadStream(file);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(hash.digest("hex")));
  });
}

/** Recursively collect all file paths under dir. */
function walkFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkFiles(abs));
    else if (entry.isFile()) out.push(abs);
  }
  return out;
}

/** Locate the packaged Electron binary inside appOutDir. */
function findElectronBinary(context) {
  const { appOutDir, electronPlatformName, packager } = context;
  const info = packager.appInfo;
  const exeName = info.executableName || info.name;
  const productName = info.productFilename || info.productName;

  const candidates = [];
  if (electronPlatformName === "darwin") {
    const contents = path.join(appOutDir, `${productName}.app`, "Contents");
    candidates.push(path.join(contents, "MacOS", productName));
    candidates.push(path.join(contents, "MacOS", exeName));
  } else if (electronPlatformName === "win32") {
    candidates.push(path.join(appOutDir, `${exeName}.exe`));
    candidates.push(path.join(appOutDir, `${productName}.exe`));
  } else {
    candidates.push(path.join(appOutDir, exeName));
    candidates.push(path.join(appOutDir, productName));
  }

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  // Last resort for macOS: scan every .app bundle.
  if (electronPlatformName === "darwin") {
    for (const entry of fs.readdirSync(appOutDir, { withFileTypes: true })) {
      if (!entry.name.endsWith(".app")) continue;
      const macosDir = path.join(appOutDir, entry.name, "Contents", "MacOS");
      if (fs.existsSync(macosDir)) {
        for (const f of fs.readdirSync(macosDir)) {
          const abs = path.join(macosDir, f);
          if (fs.statSync(abs).isFile()) return abs;
        }
      }
    }
  }

  throw new Error(
    `[afterpack] could not locate the Electron binary in ${appOutDir} ` +
      `(tried: ${candidates.map((c) => path.basename(c)).join(", ")})`
  );
}

/** Locate the resources directory for the current platform layout. */
function findResourcesDir(context) {
  const { appOutDir, electronPlatformName, packager } = context;
  const productName = packager.appInfo.productFilename || packager.appInfo.productName;
  if (electronPlatformName === "darwin") {
    return path.join(appOutDir, `${productName}.app`, "Contents", "Resources");
  }
  return path.join(appOutDir, "resources");
}

exports.default = async function afterPack(context) {
  const { electronPlatformName } = context;
  const resourcesDir = findResourcesDir(context);
  const manifestPath = path.join(resourcesDir, "integrity-manifest.json");

  /* ---- 1. integrity manifest ----------------------------------- */
  const files = {};
  let totalBytes = 0;
  for (const abs of walkFiles(resourcesDir)) {
    if (abs === manifestPath) continue; // the manifest cannot hash itself
    const rel = path.relative(resourcesDir, abs).split(path.sep).join("/");
    const stat = fs.statSync(abs);
    totalBytes += stat.size;
    files[rel] = { size: stat.size, sha256: await hashFile(abs) };
  }

  const manifest = {
    product: context.packager.appInfo.productName,
    version: context.packager.appInfo.version,
    platform: electronPlatformName,
    generatedAt: new Date().toISOString(),
    fileCount: Object.keys(files).length,
    files,
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log(
    `[afterpack] integrity manifest: ${manifest.fileCount} file(s), ` +
      `${(totalBytes / 1048576).toFixed(1)} MB hashed → ${path.basename(manifestPath)}`
  );

  /* ---- 2. security fuses --------------------------------------- */
  const { flipFuses, FuseVersion, FuseV1Options } = require("@electron/fuses");
  const exe = findElectronBinary(context);
  await flipFuses(exe, {
    version: FuseVersion.V1,
    // NODE_OPTIONS env var no longer affects the runtime (anti-injection).
    [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
    // --inspect / --inspect-brk CLI debugging disabled.
    [FuseV1Options.EnableNodeCliInspectArguments]: false,
    // The application can ONLY be loaded from app.asar — dropping an
    // "app" folder next to the binary will not run.
    [FuseV1Options.OnlyLoadAppFromAsar]: true,
    // RunAsNode intentionally left enabled: required by the bundled
    // local Java runtime (main → runner.js → doppio-wrapper.js chain).
  });
  console.log(
    `[afterpack] security fuses applied to ${path.basename(exe)}: ` +
      "NODE_OPTIONS=off, node --inspect=off, only-load-app-from-asar=on (RunAsNode kept for local Java runtime)"
  );
};
