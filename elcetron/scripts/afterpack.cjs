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
 *
 *  3. macOS signature restoration (CRITICAL — fixes SIGKILL at launch)
 *     Flipping fuses rewrites bytes inside the code-signed "Electron
 *     Framework". If nothing re-signs the bundle afterwards, Apple
 *     Silicon kernels kill the app on first launch with
 *     "SIGKILL (Code Signature Invalid)" / "Invalid Page" (crash frame:
 *     electron::fuses::IsRunAsNodeEnabled()) because the page hash no
 *     longer matches the signature. electron-builder with
 *     mac.identity: null SKIPS code signing entirely (no ad-hoc
 *     fallback), so the flip would ship an app that crashes instantly.
 *
 *     Fix: resetAdHocDarwinSignature: true → @electron/fuses re-signs
 *     the whole .app ad-hoc right after writing the fuse wire
 *     (codesign --force --deep --sign - --preserve-metadata=…).
 *     The hook then verifies BOTH the fuse wire and the code signature
 *     and FAILS THE BUILD loudly if either is wrong.
 *
 *  4. Bundled symlink sanitization (all platforms)
 *     npm-installed packages can contain ABSOLUTE symlinks (doppiojvm
 *     links dist/<variant>/vendor → <project>/…/doppiojvm/vendor with a
 *     machine-specific absolute path). electron-builder copies those
 *     links verbatim, so the shipped bundle would contain a symlink
 *     pointing back at the BUILD MACHINE. On macOS this makes
 *     `codesign --verify --deep --strict` fail with "invalid destination
 *     for symbolic link in bundle" and Gatekeeper treats the bundle as
 *     damaged on Apple Silicon; on Windows the link can never resolve
 *     after installation. The hook re-points every escaping symlink at
 *     the equivalent path INSIDE the bundle (relative link) and removes
 *     links that could never resolve.
 *
 *  5. Windows symlink dereferencing (win32 only)
 *     Windows installers have no symbolic-link semantics — 7z/NSIS
 *     either errors on symlink entries or extracts them into broken
 *     files. For win32 builds every remaining symlink under resources/
 *     is replaced with a real copy of its in-bundle target, so the
 *     installed tree never depends on link support.
 * ================================================================ */

"use strict";

const { execFileSync } = require("node:child_process");
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

/* ================================================================
 * Bundle hygiene helpers
 * ================================================================ */

/** True if p is inside root (or IS root). */
function isInside(root, p) {
  const rel = path.relative(root, p);
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}

/** Recursively collect symlinks under dir; does not follow links. */
function collectSymlinks(dir, root) {
  const out = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isSymbolicLink()) {
      let target = "";
      try {
        target = fs.readlinkSync(abs);
      } catch {
        continue;
      }
      out.push({ abs, rel: path.relative(root, abs), target });
    } else if (entry.isDirectory()) {
      out.push(...collectSymlinks(abs, root));
    }
  }
  return out;
}

/**
 * Find the longest suffix of an absolute link target that exists inside
 * the bundle. npm installs create links into the project root, e.g.
 *   /build-host/…/elcetron/java-runtime/node_modules/doppiojvm/vendor
 *     → <resourcesDir>/java-runtime/node_modules/doppiojvm/vendor
 * Returns the in-bundle path or null. Requires ≥2 path segments so a
 * generic name like "vendor" alone can never produce a false match.
 */
function findInBundleSuffix(bases, absTarget) {
  const parts = absTarget.split(path.sep).filter(Boolean);
  for (let i = 0; i <= parts.length - 2; i++) {
    const suffix = parts.slice(i).join(path.sep);
    for (const base of bases) {
      const candidate = path.join(base, suffix);
      if (fs.existsSync(candidate)) return candidate;
    }
  }
  return null;
}

/**
 * Replace the symlink at linkAbs with a portable relative link.
 * Falls back from symlink → junction (Windows build hosts) → a real
 * copy of the in-bundle target, so this never leaves the link missing.
 */
function createPortableLink(linkAbs, relativeTarget, inBundlePath) {
  const tmp = linkAbs + ".atomcode-fix";
  try {
    fs.unlinkSync(tmp);
  } catch {
    /* not present */
  }
  // Windows symlink flavour derived from the destination; the type
  // argument is ignored on POSIX where a plain symlink is created.
  let winType = "file";
  try {
    if (fs.statSync(path.resolve(path.dirname(linkAbs), relativeTarget)).isDirectory()) {
      winType = "dir";
    }
  } catch {
    /* keep "file" */
  }
  for (const type of [winType, "junction"]) {
    try {
      fs.symlinkSync(relativeTarget, tmp, type);
      fs.unlinkSync(linkAbs);
      fs.renameSync(tmp, linkAbs);
      return "symlink";
    } catch {
      /* try the next strategy */
    }
  }
  if (inBundlePath) {
    try {
      const stat = fs.statSync(inBundlePath);
      fs.rmSync(linkAbs, { recursive: true, force: true });
      if (stat.isDirectory()) fs.cpSync(inBundlePath, linkAbs, { recursive: true });
      else fs.cpSync(inBundlePath, linkAbs);
      return "copy";
    } catch {
      /* fall through */
    }
  }
  return null;
}

/**
 * Re-point or drop every symlink under resources/ that would escape the
 * packaged app. An escaping link can never resolve after installation
 * and makes macOS `codesign --verify --deep --strict` fail with
 * "invalid destination for symbolic link in bundle".
 */
function sanitizePackagedSymlinks(context, resourcesDir) {
  const { appOutDir, electronPlatformName, packager } = context;
  const productName =
    packager.appInfo.productFilename || packager.appInfo.productName;
  const bundleRoot =
    electronPlatformName === "darwin"
      ? path.join(appOutDir, `${productName}.app`)
      : appOutDir;
  if (!fs.existsSync(resourcesDir)) return;

  const links = collectSymlinks(resourcesDir, resourcesDir);
  const fixed = [];
  const dropped = [];

  for (const { abs, rel, target } of links) {
    const dest = path.resolve(path.dirname(abs), target);
    if (!path.isAbsolute(target) && isInside(bundleRoot, dest)) continue; // healthy

    // Absolute or escaping link — it cannot resolve in the shipped app.
    // Re-point it at the equivalent in-bundle path when one exists,
    // otherwise the link is useless in a portable bundle and is removed.
    const inBundle = path.isAbsolute(target)
      ? findInBundleSuffix([resourcesDir, bundleRoot], target)
      : null;
    if (inBundle) {
      const relativeTarget = path.relative(path.dirname(abs), inBundle);
      const how = createPortableLink(abs, relativeTarget, inBundle);
      if (how) {
        fixed.push(`${rel}  ->  ${relativeTarget} (${how}; was ${target})`);
        continue;
      }
    }
    try {
      fs.unlinkSync(abs);
      dropped.push(`${rel}  ->  ${target}`);
    } catch {
      console.warn(`[afterpack] WARNING: could not remove escaping symlink ${rel}`);
    }
  }

  if (fixed.length) {
    console.log(`[afterpack] re-pointed ${fixed.length} bundle symlink(s) to portable in-bundle paths:`);
    fixed.forEach((line) => console.log(`  [fixed]   ${line}`));
  }
  if (dropped.length) {
    console.warn(`[afterpack] removed ${dropped.length} bundle symlink(s) that pointed outside the app:`);
    dropped.forEach((line) => console.warn(`  [removed] ${line}`));
  }
  if (fixed.length || dropped.length) {
    console.log(
      "[afterpack] bundle symlinks sanitized — no symlink inside the packaged app points at the build machine"
    );
  }
}

/**
 * Windows installers have no symbolic-link semantics — 7z/NSIS either
 * errors on symlink entries or extracts them into broken files. Replace
 * every remaining symlink under resources/ with a real copy of its
 * in-bundle target (e.g. doppio's dist/release-cli/vendor link → the
 * vendored JDK tree). win32 builds only; runs before the manifest so
 * the integrity file covers the real files that ship.
 */
function dereferenceWinSymlinks(resourcesDir) {
  if (!fs.existsSync(resourcesDir)) return;
  const links = collectSymlinks(resourcesDir, resourcesDir);
  for (const { abs, rel, target } of links) {
    const dest = path.resolve(path.dirname(abs), target);
    if (!fs.existsSync(dest)) {
      console.warn(`[afterpack] WARNING: dropping broken symlink ${rel} -> ${target}`);
      try {
        fs.unlinkSync(abs);
      } catch {
        /* ignore */
      }
      continue;
    }
    const stat = fs.statSync(dest);
    fs.rmSync(abs, { recursive: true, force: true });
    if (stat.isDirectory()) fs.cpSync(dest, abs, { recursive: true });
    else fs.cpSync(dest, abs);
    console.log(
      `[afterpack] dereferenced symlink for Windows: ${rel} -> real ` +
        `${path.relative(resourcesDir, dest)} (${stat.isDirectory() ? "directory" : "file"})`
    );
  }
}

/**
 * Clear macOS extended attributes (Finder metadata, quarantine flags,
 * resource forks) from the whole bundle — `codesign --verify --strict`
 * fails with "resource fork, Finder information, or similar detritus not
 * allowed" when files carry them. Best effort: the strict verification
 * below still guards the build if this warns.
 */
function stripDarwinExtendedAttributes(context) {
  const productName =
    context.packager.appInfo.productFilename || context.packager.appInfo.productName;
  const appBundle = path.join(context.appOutDir, `${productName}.app`);
  const xattr = "/usr/bin/xattr";
  if (!fs.existsSync(appBundle) || !fs.existsSync(xattr)) return;
  try {
    execFileSync(xattr, ["-cr", appBundle], { stdio: "pipe" });
    console.log(`[afterpack] cleared extended attributes on ${path.basename(appBundle)}`);
  } catch (err) {
    console.warn(`[afterpack] WARNING: xattr cleanup failed: ${err.message || err}`);
  }
}

exports.default = async function afterPack(context) {
  const { electronPlatformName } = context;
  const resourcesDir = findResourcesDir(context);
  const manifestPath = path.join(resourcesDir, "integrity-manifest.json");

  /* ---- 0. bundle hygiene (before manifest/signing) -------------- */
  sanitizePackagedSymlinks(context, resourcesDir);
  if (electronPlatformName === "win32") {
    dereferenceWinSymlinks(resourcesDir);
  }
  if (electronPlatformName === "darwin") {
    stripDarwinExtendedAttributes(context);
  }

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

  /* ---- 1b. fail the build if critical components did not land ---- */
  // Guards against e.g. extraResources copy failures (a packaged app
  // without the Java runtime or a 3-file manifest must never ship).
  for (const rel of [
    "app.asar",
    "integrity-manifest.json",
    "java-runtime/runner.js",
    "java-runtime/doppio-wrapper.js",
    "java-runtime/node_modules/doppiojvm/dist/release-cli/console/runner.js",
    "java-runtime/node_modules/doppiojvm/vendor/java_home/lib/rt.jar",
    "java-runtime/node_modules/doppiojvm/vendor/java_home/lib/tools.jar",
    "java-runtime/node_modules/browserfs/dist/browserfs.min.js",
  ]) {
    if (!fs.existsSync(path.join(resourcesDir, rel))) {
      throw new Error(
        `[afterpack] required bundled component missing from resources/: ${rel} — ` +
          "run `node scripts/sync-engine-assets.mjs` (auto-installs java-runtime) and rebuild"
      );
    }
  }
  console.log("[afterpack] critical bundled components verified (app.asar, Java runtime, JVM jars)");

  /* ---- 2. security fuses (+ darwin ad-hoc re-sign) -------------- */
  const { flipFuses, getCurrentFuseWire, FuseVersion, FuseV1Options, FuseState } =
    require("@electron/fuses");
  const exe = findElectronBinary(context);
  await flipFuses(exe, {
    version: FuseVersion.V1,
    // Rewrites bytes inside the signed Electron Framework → the stock
    // signature becomes invalid. Without re-signing, Apple Silicon kills
    // the app at first launch (SIGKILL "Code Signature Invalid" /
    // "Invalid Page" at electron::fuses::IsRunAsNodeEnabled()).
    // electron-builder (mac.identity: null) skips signing entirely, so
    // this option ad-hoc re-signs the whole .app bundle immediately
    // after the fuse wire is written. macOS-only — ignored elsewhere.
    resetAdHocDarwinSignature: true,
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

  /* ---- 3. verify fuses stuck (read back from the binary) -------- */
  const wire = await getCurrentFuseWire(exe);
  for (const [fuse, expected] of [
    [FuseV1Options.RunAsNode, FuseState.ENABLE],
    [FuseV1Options.EnableNodeOptionsEnvironmentVariable, FuseState.DISABLE],
    [FuseV1Options.EnableNodeCliInspectArguments, FuseState.DISABLE],
    [FuseV1Options.OnlyLoadAppFromAsar, FuseState.ENABLE],
  ]) {
    if (wire[fuse] !== expected) {
      throw new Error(
        `[afterpack] fuse verification FAILED: ${FuseV1Options[fuse]} expected ` +
          `${expected === FuseState.ENABLE ? "ENABLE" : "DISABLE"}, read back ${wire[fuse]}`
      );
    }
  }
  const state = (fuse) =>
    wire[fuse] === FuseState.ENABLE ? "on" : wire[fuse] === FuseState.DISABLE ? "off" : `raw:${wire[fuse]}`;
  console.log(
    `[afterpack] fuses verified (read back from binary): RunAsNode=${state(FuseV1Options.RunAsNode)} ` +
      `(kept for local Java runtime), NODE_OPTIONS=${state(FuseV1Options.EnableNodeOptionsEnvironmentVariable)}, ` +
      `node --inspect=${state(FuseV1Options.EnableNodeCliInspectArguments)}, ` +
      `OnlyLoadAppFromAsar=${state(FuseV1Options.OnlyLoadAppFromAsar)}`
  );

  /* ---- 4. darwin: fail the build if the signature does not verify  */
  if (electronPlatformName === "darwin") {
    verifyDarwinSignature(context);
  }
};

/**
 * Verify the macOS bundle signature after the fuse flip + ad-hoc re-sign.
 * A failed verification means the shipped app would be killed by the
 * kernel on Apple Silicon — always fail the build loudly instead.
 */
function verifyDarwinSignature(context) {
  const productName =
    context.packager.appInfo.productFilename || context.packager.appInfo.productName;
  const appBundle = path.join(context.appOutDir, `${productName}.app`);
  const codesign = "/usr/bin/codesign";
  if (!fs.existsSync(appBundle) || !fs.existsSync(codesign)) {
    console.warn(
      "[afterpack] WARNING: could not run codesign verification " +
        `(bundle: ${fs.existsSync(appBundle)}, codesign: ${fs.existsSync(codesign)}) — ` +
        "re-sign the .app on macOS (codesign --force --deep --sign -) before distributing"
    );
    return;
  }
  try {
    execFileSync(codesign, ["--verify", "--deep", "--strict", appBundle], { stdio: "pipe" });
    console.log(
      `[afterpack] codesign verification passed for ${path.basename(appBundle)} — ` +
        "signature now covers the flipped fuses (Apple Silicon safe)"
    );
  } catch (err) {
    // codesign names only the bundle, not the offending entry — list any
    // symlinks that still escape the bundle so the failure is actionable.
    const resources = path.join(appBundle, "Contents", "Resources");
    const offenders = collectSymlinks(resources, resources)
      .filter(({ abs, target }) => {
        const dest = path.resolve(path.dirname(abs), target);
        return path.isAbsolute(target) || !isInside(appBundle, dest);
      })
      .map(({ rel, target }) => `${rel}  ->  ${target}`);
    throw new Error(
      "[afterpack] macOS signature verification FAILED after fuse flip — the shipped " +
        "app would be killed by the kernel on Apple Silicon (SIGKILL Code Signature Invalid). " +
        `codesign output: ${err.stdout ? err.stdout.toString() : ""}${err.message}` +
        (offenders.length
          ? "\n[afterpack] escaping bundle symlinks still present:\n  " + offenders.join("\n  ")
          : "")
    );
  }
}

// Exposed for offline verification scripts (not part of the public API).
exports.__testables = { isInside, collectSymlinks, sanitizePackagedSymlinks };
