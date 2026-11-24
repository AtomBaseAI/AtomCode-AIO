#!/usr/bin/env node
/**
 * verify-installer.mjs — end-to-end verification of the AtomCode Student
 * Windows installer payload + the self-repair guarantees.
 *
 * Stages:
 *   1. Extract the built .nsis.7z payload and diff every file against the
 *      shipped integrity manifest (the exact check verifyInstallation()
 *      performs at app launch) → 0 missing, 0 size mismatches required.
 *   2. Mirror the installer's 16 NSIS sentinel checks (existence + min
 *      sizes) against the extracted tree → all pass required.
 *   3. Simulate the observed Windows failure mode: delete the alphabetical
 *      tail of java-runtime (the exact class of files the user lost:
 *      dist/release-cli subtree, top-level vendor, pako, source-map,
 *      source-map-support — 223-ish files) → sentinel checks MUST fail.
 *   4. Run the installer's repair path equivalent: re-extract the payload
 *      over the truncated tree (7za overwrite) → sentinel checks MUST pass
 *      AND the manifest diff must be 0 missing / 0 mismatched again.
 *   5. Prove the Java runtime works from the repaired installed layout:
 *      compile + run a Hello-World through java-runtime/runner.js
 *      (the exact code path the desktop app uses).
 *
 * Run:  cd elcetron && node scripts/verify-installer.mjs
 * Exit: 0 = all stages passed, 1 = verification failed.
 */

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const distDir = path.join(root, "dist");
const workDir = path.join(root, "dist", "verify-install-sim");

const SEVEN_ZA = process.env.SEVEN_ZA || path.join(process.env.HOME || "", ".cache/electron-builder/7zip@1.0.0/7zip-linux-x64-16wjr/bin/7za");

let failures = 0;
const pass = (name) => console.log(`  [PASS] ${name}`);
const fail = (name, detail) => {
  failures++;
  console.error(`  [FAIL] ${name}${detail ? ` — ${detail}` : ""}`);
};

function findPayload() {
  if (!fs.existsSync(distDir)) throw new Error("dist/ does not exist — run the win build first");
  const candidates = fs.readdirSync(distDir).filter((f) => f.endsWith(".nsis.7z"));
  if (candidates.length === 0) throw new Error("no *.nsis.7z payload in dist/ — run the win build first");
  const newest = candidates
    .map((f) => ({ f, m: fs.statSync(path.join(distDir, f)).mtimeMs }))
    .sort((a, b) => b.m - a.m)[0].f;
  return path.join(distDir, newest);
}

/* The exact sentinel list from scripts/installer.nsh (AC_RunChecks). */
const SENTINELS = [
  ["resources/java-runtime/node_modules/source-map-support/source-map-support.js", 0],
  ["resources/java-runtime/node_modules/source-map/source-map.js", 0],
  ["resources/java-runtime/node_modules/pako/package.json", 0],
  ["resources/java-runtime/node_modules/doppiojvm/vendor/java_home/lib/tools.jar", 9216000],
  ["resources/java-runtime/node_modules/doppiojvm/vendor/java_home/lib/rt.jar", 33554432],
  ["resources/java-runtime/node_modules/doppiojvm/package.json", 0],
  ["resources/java-runtime/node_modules/doppiojvm/bin/doppio", 0],
  ["resources/java-runtime/node_modules/doppiojvm/dist/release-cli/console/runner.js", 0],
  ["resources/java-runtime/node_modules/doppiojvm/dist/release-cli/src/util.js.map", 0],
  ["resources/java-runtime/node_modules/doppiojvm/dist/release-cli/vendor/java_home/lib/rt.jar", 33554432],
  ["resources/java-runtime/node_modules/browserfs/dist/browserfs.min.js", 0],
  ["resources/java-runtime/node_modules/async/package.json", 0],
  ["resources/java-runtime/runner.js", 0],
  ["resources/java-runtime/doppio-wrapper.js", 0],
  ["resources/integrity-manifest.json", 10240],
  ["resources/app.asar", 52428800],
];

function runSentinels(simRoot) {
  const missing = [];
  for (const [rel, minSize] of SENTINELS) {
    const abs = path.join(simRoot, rel);
    if (!fs.existsSync(abs)) {
      missing.push(rel);
      continue;
    }
    if (minSize > 0 && fs.statSync(abs).size < minSize) missing.push(`${rel} (too small)`);
  }
  return missing;
}

function manifestDiff(simRoot) {
  const manifest = JSON.parse(fs.readFileSync(path.join(simRoot, "resources/integrity-manifest.json"), "utf8"));
  const missing = [];
  const mismatched = [];
  for (const [rel, meta] of Object.entries(manifest.files)) {
    const abs = path.join(simRoot, "resources", rel);
    if (!fs.existsSync(abs)) {
      missing.push(rel);
      continue;
    }
    if (fs.statSync(abs).size !== meta.size) mismatched.push(rel);
  }
  return { missing, mismatched, total: Object.keys(manifest.files).length };
}

function sha256(file) {
  return createHash("sha256").update(fs.createReadStream(file)).digest("hex");
}

console.log(`[1] payload: ${path.basename(findPayload())}`);
const payload = findPayload();
console.log("\n[STAGE 1] extract payload → verify against integrity manifest (launch check)");
fs.rmSync(workDir, { recursive: true, force: true });
fs.mkdirSync(workDir, { recursive: true });
execFileSync(SEVEN_ZA, ["x", "-y", payload], { cwd: workDir, stdio: "pipe" });
const simRoot = workDir;
{
  const { missing, mismatched, total } = manifestDiff(simRoot);
  if (missing.length === 0 && mismatched.length === 0) {
    pass(`fresh install complete — ${total} manifest files, 0 missing, 0 size mismatches`);
  } else {
    fail("fresh install incomplete", `${missing.length} missing, ${mismatched.length} mismatched (of ${total})`);
  }
}

console.log("\n[STAGE 2] mirror the installer's 16 NSIS sentinel checks");
{
  const missing = runSentinels(simRoot);
  if (missing.length === 0) pass("all 16 sentinels present with expected sizes on a fresh install");
  else fail("sentinels failed on a FRESH install", missing.join(", "));
}

console.log("\n[STAGE 3] simulate the reported Windows truncation (delete alphabetical tail)");
{
  // Everything from doppiojvm/dist onward in copy order — the user lost
  // exactly this class of files (223 of them: dist/release-cli subtree,
  // top-level vendor, pako, source-map, source-map-support).
  const victims = [
    "resources/java-runtime/node_modules/doppiojvm/dist",
    "resources/java-runtime/node_modules/doppiojvm/package.json",
    "resources/java-runtime/node_modules/doppiojvm/vendor",
    "resources/java-runtime/node_modules/pako",
    "resources/java-runtime/node_modules/source-map",
    "resources/java-runtime/node_modules/source-map-support",
    "resources/java-runtime/runner.js",
  ];
  let deleted = 0;
  for (const rel of victims) {
    const abs = path.join(simRoot, rel);
    if (fs.existsSync(abs)) {
      fs.rmSync(abs, { recursive: true, force: true });
      deleted++;
    }
  }
  const { missing, total } = manifestDiff(simRoot);
  const sentinelMissing = runSentinels(simRoot);
  console.log(`       removed ${deleted} top-level group(s) → ${missing.length}/${total} manifest files now missing`);
  if (missing.length > 100 && sentinelMissing.length > 0) {
    pass(`simulated truncation reproduced (${missing.length} files missing) — installer sentinels CAUGHT it (${sentinelMissing.length} failing)`);
  } else {
    fail("truncation simulation", `manifest missing=${missing.length}, sentinel failures=${sentinelMissing.length}`);
  }
  if (missing.length !== sentinelMissing.length) {
    console.log(`       (sentinels catch the truncation class — ${missing.length - sentinelMissing.length} non-sentinel files also gone)`);
  }
}

console.log("\n[STAGE 4] run the installer's repair path (re-extract payload over the broken tree)");
{
  execFileSync(SEVEN_ZA, ["x", "-y", payload], { cwd: workDir, stdio: "pipe" });
  const { missing, mismatched, total } = manifestDiff(simRoot);
  const sentinelMissing = runSentinels(simRoot);
  if (missing.length === 0 && mismatched.length === 0 && sentinelMissing.length === 0) {
    pass(`repair restored the full install — ${total} files, 0 missing, 0 mismatched, 0 sentinel failures`);
  } else {
    fail("repair incomplete", `${missing.length} missing, ${mismatched.length} mismatched, ${sentinelMissing.length} sentinels`);
  }
}

console.log("\n[STAGE 5] Java runtime end-to-end from the repaired installed layout");
{
  const job = JSON.stringify({
    code:
      "public class Main {\n" +
      "  public static void main(String[] args) {\n" +
      '    System.out.println("atomcode-java-ok");\n' +
      "  }\n" +
      "}\n",
    cases: [{ input: "" }],
  });
  let result = null;
  try {
    const out = execFileSync("node", [path.join(simRoot, "resources/java-runtime/runner.js")], {
      input: job,
      timeout: 180000,
      encoding: "utf8",
    });
    result = JSON.parse(out.trim().split("\n").filter(Boolean).pop());
  } catch (err) {
    fail("java runner invocation", String(err.message).slice(0, 300));
  }
  if (result) {
    const ok =
      result.compileError === false &&
      Array.isArray(result.results) &&
      result.results.length === 1 &&
      result.results[0].output.includes("atomcode-java-ok") &&
      result.results[0].exitCode === 0;
    if (ok) pass("javac (in-Doppio) compile + run produced expected stdout from the installed tree");
    else fail("java output unexpected", JSON.stringify(result).slice(0, 300));
  }
}

console.log(`\n${failures === 0 ? "ALL STAGES PASSED" : `${failures} STAGE(S) FAILED`}`);
process.exit(failures === 0 ? 0 : 1);
