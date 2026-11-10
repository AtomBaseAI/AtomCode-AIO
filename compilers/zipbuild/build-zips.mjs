/**
 * AtomCode — ZIP deployment builder (no ECR, no container images).
 *
 * Assembles two self-contained Lambda ZIP layouts next to this script:
 *
 *   dist/core/   handler + node_modules(sql.js, typescript)
 *                + toolchains/python (python-build-standalone 3.12)
 *                + toolchains/ruby   (Homebrew portable-ruby 3.4.5)
 *                → serves python, ruby, javascript, typescript, sql
 *
 *   dist/gcc/    handler + toolchains/gcc (gcc/g++/binutils mirrored from
 *                amazonlinux:2023 via docker — CI only)
 *                → serves c, cpp
 *
 * Java is served by a separate java21 managed-runtime function
 * (compilers/functions/java-zip — a ~6 MB judge jar; Lambda provides the
 * JVM, so the 250 MB limit is a non-issue). See compilers/aws/README.md.
 *
 * Usage:
 *   node build-zips.mjs            # build core (and gcc when docker exists)
 *   node build-zips.mjs --zip      # also write dist/atomcode-core.zip / -gcc.zip
 *   node build-zips.mjs --core     # core only (skip gcc / docker)
 *
 * Downloads are cached in ATOM_ZIP_CACHE (default /tmp/atomzip-cache).
 * On AWS Lambda the layout mounts at /var/task — toolchain paths baked into
 * the gcc langspec use that prefix, and the handler rewrites it to its own
 * real location at load time (identity on Lambda, the dist layout when
 * verify-local.mjs runs the same handler on a CI runner or locally).
 */

import { execSync } from "node:child_process";
import {
  cpSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync,
  statSync, symlinkSync, unlinkSync, writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SHARED = path.resolve(__dirname, "../functions/_shared");
const OUT = path.join(__dirname, "dist");
const CACHE = process.env.ATOM_ZIP_CACHE || "/tmp/atomzip-cache";

const ARGS = new Set(process.argv.slice(2));
const WANT_ZIP = ARGS.has("--zip");
const CORE_ONLY = ARGS.has("--core");

/* pinned upstream toolchains (x86_64, glibc-compatible with AL2023) */
const PBS_TAG = "20241016";
const PBS_VERSION = "3.12.7";
const PBS_BASE =
  `https://github.com/astral-sh/python-build-standalone/releases/download/${PBS_TAG}/` +
  `cpython-${PBS_VERSION}+${PBS_TAG}-x86_64-unknown-linux-gnu-install_only`;
const RUBY_URL =
  "https://github.com/Homebrew/homebrew-portable-ruby/releases/download/3.4.5/" +
  "portable-ruby-3.4.5.x86_64_linux.bottle.tar.gz";

/* ───────────────────────────── helpers ────────────────────────────────── */

function sh(cmd, opts = {}) {
  return execSync(cmd, { stdio: ["ignore", "pipe", "inherit"], ...opts }).toString();
}

function have(cmd) {
  try {
    execSync(`command -v ${cmd}`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

async function download(url, dest) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const { writeFile } = await import("node:fs/promises");
  await writeFile(dest, buf);
}

/** Download-or-reuse cached file; tries urls in order until one succeeds. */
async function cached(name, urls) {
  mkdirSync(CACHE, { recursive: true });
  const dest = path.join(CACHE, name);
  if (existsSync(dest) && statSync(dest).size > 1_000_000) return dest;
  let lastErr;
  for (const url of urls) {
    try {
      process.stdout.write(`  ↓ ${url.split("/").pop()} … `);
      await download(url, dest);
      console.log(`${(statSync(dest).size / 1e6).toFixed(1)} MB`);
      return dest;
    } catch (err) {
      console.log(`failed (${err.message.split("\n")[0]})`);
      lastErr = err;
    }
  }
  throw lastErr;
}

function unpack(tarball, dest) {
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  execSync(`tar xzf ${JSON.stringify(tarball)} -C ${JSON.stringify(dest)}`);
}

/** rm -rf a list of paths relative to root, ignoring missing ones. */
function prune(root, rels) {
  for (const rel of rels) rmSync(path.join(root, rel), { recursive: true, force: true });
}

/** strip --strip-debug a file when it is big and a strip binary exists. */
function stripIfFat(file) {
  try {
    if (!existsSync(file) || statSync(file).size < 40_000_000) return;
    if (!have("strip")) {
      console.warn(`  ⚠ ${path.basename(file)} is unstripped and no 'strip' binary found`);
      return;
    }
    execSync(`strip --strip-debug ${JSON.stringify(file)}`);
  } catch (err) {
    console.warn(`  ⚠ strip failed for ${file}: ${err.message.split("\n")[0]}`);
  }
}

function relink(layout, links) {
  mkdirSync(path.join(layout, "bin"), { recursive: true });
  for (const [name, target] of Object.entries(links)) {
    symlinkSync(target, path.join(layout, "bin", name));
  }
}

function copyHandler(layout, langs) {
  cpSync(path.join(SHARED, "handler.mjs"), path.join(layout, "handler.mjs"));
  mkdirSync(path.join(layout, "langspec"), { recursive: true });
  for (const lang of langs) {
    cpSync(path.join(SHARED, "langspec", `${lang}.json`), path.join(layout, "langspec", `${lang}.json`));
  }
}

function copyNodeModules(layout) {
  const tmp = path.join(CACHE, "npm-tree");
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });
  sh(`npm install --prefix ${JSON.stringify(tmp)} --no-save --no-package-lock --silent sql.js@1.13.0 typescript@5.9.3`);
  const nm = path.join(layout, "node_modules");
  mkdirSync(path.join(nm, "sql.js"), { recursive: true });
  mkdirSync(path.join(nm, "typescript"), { recursive: true });
  cpSync(path.join(tmp, "node_modules/sql.js/package.json"), path.join(nm, "sql.js/package.json"));
  cpSync(path.join(tmp, "node_modules/sql.js/dist"), path.join(nm, "sql.js/dist"), { recursive: true });
  cpSync(path.join(tmp, "node_modules/typescript/package.json"), path.join(nm, "typescript/package.json"));
  cpSync(path.join(tmp, "node_modules/typescript/lib/typescript.js"), path.join(nm, "typescript/lib/typescript.js"));
}

function zipDir(layout, outZip) {
  rmSync(outZip, { force: true });
  execSync(`cd ${JSON.stringify(layout)} && zip -qry ${JSON.stringify(outZip)} .`);
}

function mb(p) {
  return (Number(sh(`du -sk ${JSON.stringify(p)}`).split("\t")[0]) / 1024).toFixed(1);
}

function report(label, layout, zipPath) {
  console.log(`  ${label}: ${mb(layout)} MB unpacked${zipPath ? ` → zip ${mb(zipPath)} MB` : ""}`);
  if (Number(mb(layout)) > 250) {
    throw new Error(`${label} exceeds Lambda's 250 MB unpacked limit — prune more.`);
  }
}

/* ───────────────────────────── core zip ───────────────────────────────── */

async function buildCore() {
  const layout = path.join(OUT, "core");
  rmSync(layout, { recursive: true, force: true });
  mkdirSync(path.join(layout, "toolchains"), { recursive: true });
  console.log("▸ core zip: python · ruby · javascript · typescript · sql");

  copyHandler(layout, ["python", "ruby", "javascript", "typescript", "sql"]);
  copyNodeModules(layout);

  /* python — python-build-standalone (stripped asset preferred) */
  const pbsTar = await cached(
    `pbs-${PBS_TAG}.tar.gz`,
    [
      `${PBS_BASE}_stripped.tar.gz`,
      `${PBS_BASE}.tar.gz`,
    ],
  );
  const pbsTmp = path.join(CACHE, "pbs-extract");
  unpack(pbsTar, pbsTmp);
  const py = path.join(layout, "toolchains", "python");
  cpSync(path.join(pbsTmp, "python"), py, { recursive: true });
  prune(py, [
    "lib/tcl8.6", "lib/tk8.6", "lib/Tix8.4.3", "lib/itcl4.2.2", "lib/thread2.8.7",
    "lib/tcl8", "lib/pkgconfig", "lib/libpython3.so", "include",
    "lib/python3.12/tkinter", "lib/python3.12/idlelib", "lib/python3.12/turtledemo",
    "lib/python3.12/ensurepip", "lib/python3.12/site-packages",
  ]);
  sh(`find ${JSON.stringify(py)} -name __pycache__ -type d -prune -exec rm -rf {} + 2>/dev/null || true`);
  sh(`find ${JSON.stringify(py)} -name '*.pyc' -delete 2>/dev/null || true`);
  stripIfFat(path.join(py, "lib/libpython3.12.so.1.0"));
  rmSync(pbsTmp, { recursive: true, force: true });

  /* ruby — Homebrew portable-ruby */
  const rubyTar = await cached("portable-ruby-3.4.5.tar.gz", [RUBY_URL]);
  const rubyTmp = path.join(CACHE, "ruby-extract");
  unpack(rubyTar, rubyTmp);
  cpSync(path.join(rubyTmp, "portable-ruby/3.4.5"), path.join(layout, "toolchains/ruby"), { recursive: true });
  sh(`find ${JSON.stringify(path.join(layout, "toolchains/ruby"))} -name '*.gem' -delete 2>/dev/null || true`);
  rmSync(rubyTmp, { recursive: true, force: true });

  /* entrypoints the langspec `bin` probes look for on PATH */
  relink(layout, {
    "python3.12": "../toolchains/python/bin/python3.12",
    "python3": "python3.12",
    "ruby": "../toolchains/ruby/bin/ruby",
  });

  const zipPath = WANT_ZIP ? path.join(OUT, "atomcode-core.zip") : null;
  if (zipPath) zipDir(layout, zipPath);
  report("core", layout, zipPath);
}

/* ───────────────────────────── gcc zip ────────────────────────────────── */

function buildGcc() {
  if (!have("docker")) {
    console.warn("▸ gcc zip skipped (no docker — build in CI where docker exists)");
    return;
  }
  const layout = path.join(OUT, "gcc");
  rmSync(layout, { recursive: true, force: true });
  mkdirSync(path.join(layout, "toolchains/gcc"), { recursive: true });
  console.log("▸ gcc zip: c · cpp (toolchain mirrored from amazonlinux:2023)");

  copyHandler(layout, ["c", "cpp"]);

  /* Mirror the full /usr gcc tree from an amazonlinux:2023 container —
   * same distro family as the Lambda runtime, so glibc versions match.
   * dnf writes to stderr only, keeping stdout as the tar stream.
   * NOTE: archive entries MUST carry the usr/ prefix (cd / + usr/... paths) —
   * the handler, bin/ symlinks and langspec -B flags all reference
   * toolchains/gcc/usr/...; entries extracted without that prefix land one
   * level too high and every g++ spawn fails with ENOENT on Lambda. */
  const GCC_TAR = [
    // AL2023 minimal has NO tar — must install it or `tar cf -` fails with
    // "tar: command not found" and the host-side extraction gets nothing.
    // -h (--dereference) is LOAD-BEARING: AL2023 ships /usr/bin/ld as an
    // alternatives symlink (→ /etc/alternatives/ld → ld.bfd) and
    // /usr/lib64/libgcc_s.so.1 as a symlink to a versioned file — without
    // -h the mirror carries dangling links and Lambda dies with "cannot
    // find 'ld'" (run 19) / "ld: cannot find libgcc_s.so.1" (run 20); CI
    // runners silently mask both with their own system ld. Dereferenced,
    // every mirrored entry is a real file with real content.
    "set -e; dnf install -y -q gcc gcc-c++ binutils tar 1>&2; cd /; tar cf - -h --ignore-failed-read",
    " usr/bin/gcc usr/bin/g++ usr/bin/cpp usr/bin/c99 usr/bin/cc usr/bin/as usr/bin/ld",
    // ld is an ALTERNATIVES symlink (/usr/bin/ld → /etc/alternatives/ld →
    // ld.bfd) — the tar carries the dangling link, so the REAL binary must
    // come along or collect2 dies with "cannot find 'ld'" on Lambda (run 19;
    // masked on CI runners by the system /usr/bin/ld in PATH).
    " usr/bin/ld.bfd usr/bin/ld.gold",
    " usr/bin/gcc-ar usr/bin/gcc-nm usr/bin/gcc-ranlib",
    " usr/libexec/gcc usr/lib/gcc",
    " usr/lib64/libstdc++.so usr/lib64/libstdc++.so.6 usr/lib64/libstdc++.so.6.*",
    " usr/lib64/libgcc_s.so.1 usr/lib64/libbfd*so* usr/lib64/libopcodes*so*",
    " usr/lib64/libctf*so* usr/lib64/libsframe*so* usr/lib64/libz.so.1",
    // cc1/cc1plus and binutils as/ld link these at runtime. The base image
    // ships libgmp/libmpfr/libz/libzstd but NOT libmpc (dnf installs it as
    // a gcc dep — captured by the glob), and gcc 11.5 on AL2023 ships NO
    // isl at all (no graphite). The Lambda runtime image ships none of the
    // gcc family libs — without these cc1 dies with "error while loading
    // shared libraries: libmpc.so.3" on Lambda while working on CI runners
    // that happen to have gcc installed.
    " usr/lib64/libgmp.so* usr/lib64/libmpc.so* usr/lib64/libmpfr.so*",
    " usr/lib64/libzstd.so*",
    // binutils 2.41 on AL2023 links ld.bfd against libjansson (JSON debug
    // format) and libdebuginfod — dnf installs both as binutils deps (the
    // CI log lists jansson + elfutils-debuginfod-client), the Lambda
    // runtime and the base image ship NEITHER. The loader only reports the
    // first missing library, so run 21 hit libjansson.so.4; libdebuginfod
    // would have been next. as/cc1 don't link them (as ran fine).
    " usr/lib64/libjansson.so* usr/lib64/libdebuginfod.so*",
    // link-time essentials: glibc runtime + dev linker scripts + the PIE
    // startfile. Without these ld cannot satisfy -lc/-lm/-lstdc++ from the
    // bundle — Lambda's runtime image and CI runners ship NO glibc dev files
    // (Scrt1.o is required by AL2023 gcc's default-PIE linking; plain
    // crt*.o does NOT match it).
    " usr/lib64/libc.so usr/lib64/libc.so.6 usr/lib64/libc_nonshared.a",
    " usr/lib64/ld-linux-x86-64.so.2 usr/lib64/libm.so usr/lib64/libm.so.6",
    " usr/lib64/Scrt1.o",
    " usr/lib64/libpthread* usr/lib64/libdl* usr/lib64/librt*",
    " usr/lib64/libresolv* usr/lib64/libutil*",
    " usr/lib64/crt*.o usr/lib64/Mcrt1.o usr/lib64/gcrt1.o",
    " usr/include",
  ].join("");
  sh(
    `docker run --rm amazonlinux:2023 /bin/bash -c ${JSON.stringify(GCC_TAR)}` +
    ` | tar xf - -C ${JSON.stringify(path.join(layout, "toolchains/gcc"))}`
  );

  /* Dangling-symlink guard (runs 19/20). With -h the extracted tree must
   * contain ZERO symlinks. Any symlink that still appears means something
   * was mirrored unresolved — fail the build loudly instead of shipping a
   * bundle that only works on hosts with a system toolchain to fall back
   * to. (bin/ symlinks created by relink() live OUTSIDE toolchains/gcc.) */
  const symlinkedPaths = [];
  const walkToolchain = (dir) => {
    for (const entry of readdirSync(dir)) {
      const p = path.join(dir, entry);
      let st;
      try {
        st = lstatSync(p);
      } catch {
        continue;
      }
      if (st.isSymbolicLink()) symlinkedPaths.push(path.relative(layout, p));
      else if (st.isDirectory()) walkToolchain(p);
    }
  };
  walkToolchain(path.join(layout, "toolchains/gcc"));
  if (symlinkedPaths.length > 0) {
    throw new Error(
      "gcc bundle carries symlinks (tar -h should have dereferenced them all):\n  " +
      symlinkedPaths.join("\n  ")
    );
  }

  /* Link-time normalization. The mirrored /usr/lib64 dev scripts point at
   * absolute host paths (/usr/lib64/...) that exist inside the
   * amazonlinux:2023 container but NOWHERE the zip runs — Lambda's runtime
   * image and CI runners carry no glibc dev files. Rewrite every dev
   * script/symlink we ship into RELATIVE GROUP form; ld then resolves each
   * name through the -L flag (the bundled lib64) at link time, on any
   * host. Overwrite unconditionally — the scripts only reference files we
   * bundle ourselves. */
  const LIB64 = path.join(layout, "toolchains/gcc/usr/lib64");

  const RELATIVE_SCRIPTS = {
    "libc.so":      "GROUP ( libc.so.6 libc_nonshared.a  AS_NEEDED ( ld-linux-x86-64.so.2 ) )",
    "libm.so":      "GROUP ( libm.so.6 )",
    "libstdc++.so": "GROUP ( libstdc++.so.6 )",
    // glibc 2.34 merged these into libc — the dev scripts still GROUP their
    // (now stub) runtime .so.NN files; rewrite them relative as well so
    // -lpthread/-ldl/-lrt/-lresolv/-lutil resolve through the -L dirs.
    "libpthread.so": "GROUP ( libpthread.so.0 )",
    "libdl.so":      "GROUP ( libdl.so.2 )",
    "librt.so":      "GROUP ( librt.so.1 )",
    "libresolv.so":  "GROUP ( libresolv.so.2 )",
    "libutil.so":    "GROUP ( libutil.so.1 )",
  };
  for (const [name, body] of Object.entries(RELATIVE_SCRIPTS)) {
    const p = path.join(LIB64, name);
    try {
      if (lstatSync(p).isSymbolicLink()) unlinkSync(p);
    } catch { /* absent — written below regardless */ }
    writeFileSync(p, `/* GNU ld script */\n${body}\n`);
  }
  /* gcc's own libgcc_s.so may be a symlink into an absolute host path —
   * replace it with the same relative script form. */
  const gccLibRoot = path.join(layout, "toolchains/gcc/usr/lib/gcc");
  if (existsSync(gccLibRoot)) {
    for (const target of readdirSync(gccLibRoot)) {
      for (const version of readdirSync(path.join(gccLibRoot, target))) {
        const p = path.join(gccLibRoot, target, version, "libgcc_s.so");
        try {
          if (lstatSync(p).isSymbolicLink()) unlinkSync(p);
        } catch { /* absent */ }
        writeFileSync(p, "/* GNU ld script */\nGROUP ( libgcc_s.so.1 )\n");
      }
    }
  }

  /* ── glibc-core isolation (run 17) ─────────────────────────────────────
   * The handler injects toolchains/gcc/usr/lib64 into LD_LIBRARY_PATH at
   * module load so every child process (cc1, as, ld, compiled binaries)
   * resolves the bundled NON-glibc libs. That dir must therefore NEVER
   * contain glibc itself: a foreign ld.so loading the bundle's libc.so.6
   * blows up on GLIBC_PRIVATE symbols (run 17: "gcc: symbol lookup error …
   * undefined symbol: __rtld_libc_freeres, version GLIBC_PRIVATE" — the
   * gcc driver died before compiling anything). Move every mirrored glibc
   * core runtime library into linklib/, reachable ONLY at link time via a
   * -L flag. .a/.o files and dev linker scripts are inert to ld.so and
   * stay in usr/lib64. libc/libm for RUNNING programs always come from the
   * host runtime — matching the Lambda runtime (nodejs22.x = AL2023,
   * glibc 2.34) to the mirror (amazonlinux:2023, glibc 2.34) is what makes
   * binaries linked here load on both. */
  const LINKLIB = path.join(layout, "toolchains/gcc/linklib");
  mkdirSync(LINKLIB, { recursive: true });
  const GLIBC_CORE_RUNTIME = [
    "libc.so.6", "ld-linux-x86-64.so.2", "libm.so.6", "libmvec.so.1",
    "libpthread.so.0", "libdl.so.2", "librt.so.1", "libresolv.so.2",
    "libutil.so.1", "libanl.so.1", "libBrokenLocale.so.1",
  ];
  for (const name of GLIBC_CORE_RUNTIME) {
    const src = path.join(LIB64, name);
    if (existsSync(src)) renameSync(src, path.join(LINKLIB, name));
  }

  /* langspec gains toolchain flags against the on-Lambda mirror path
   * /var/task (the handler rewrites that prefix to its real location at
   * load time — identity on Lambda, the dist layout on CI). The -isystem
   * flag is the load-bearing one: bundled AL2023 glibc headers MUST be
   * searched BEFORE any system /usr/include. -B include dirs are NOT
   * reliably ordered ahead of system dirs (run 16 compiled against the CI
   * runner's stdio.h and died on its multiarch bits); -isystem is
   * deterministic — after gcc's own dirs, before /usr/include. -B<bin>
   * finds as/ld, -L<lib64> finds the bundled non-glibc libs + startfiles,
   * -L<linklib> finds the isolated glibc core for link-time -lc/-lm
   * resolution. (LD_LIBRARY_PATH for compiled binaries is handled by the
   * handler — usr/lib64 only, never linklib.) */
  const TAIL = [
    "-B/var/task/toolchains/gcc/usr/bin/",
    "-L/var/task/toolchains/gcc/usr/lib64",
    "-L/var/task/toolchains/gcc/linklib",
  ];

  /* ── C++ header chain (run 18) ─────────────────────────────────────────
   * libstdc++'s <cstdlib> pulls the C library header in via
   * `#include_next <stdlib.h>`, which searches only directories AFTER the
   * one that held cstdlib. In C++ mode GCC places -isystem dirs BEFORE its
   * builtin C++ dirs (run 18: c compiled fine, cpp died inside
   * cstdlib:75), so a plain -isystem glibc dir is skipped by include_next
   * and the runner's /usr/include/stdlib.h leaked in instead. Fix:
   * -nostdinc++ removes GCC's builtin C++ dirs, and we re-add the bundle's
   * own in command-line order — c++/<ver>, multilib, backward, then the
   * glibc usr/include LAST — so every #include_next lands in the bundle.
   * (Validated locally against a real gcc: full std:: compile+run with the
   * glibc include dir strictly after the C++ dirs.) */
  const CXXROOT = path.join(layout, "toolchains/gcc/usr/include/c++");
  const cxxDirs = [];
  try {
    const cxxVer = readdirSync(CXXROOT).filter((d) => !d.startsWith("."))[0];
    if (cxxVer) {
      const rel = (p) => `/var/task/toolchains/gcc/usr/include/c++/${p}`;
      cxxDirs.push(rel(cxxVer));
      const verDir = path.join(CXXROOT, cxxVer);
      /* The multilib dir (x86_64-amzn-linux) is the ONLY subdir carrying
       * bits/c++config.h — readdir order is arbitrary, so identify it by
       * that marker instead of picking the first non-backward entry. */
      const multilib = readdirSync(verDir).filter((d) => {
        if (d === "backward" || d.startsWith(".")) return false;
        try { return existsSync(path.join(verDir, d, "bits/c++config.h")); } catch { return false; }
      })[0];
      if (multilib) cxxDirs.push(rel(`${cxxVer}/${multilib}`));
      if (existsSync(path.join(verDir, "backward"))) cxxDirs.push(rel(`${cxxVer}/backward`));
    }
  } catch { /* no c++ dir in the mirror — cpp falls back to C-mode flags */ }

  for (const lang of ["c", "cpp"]) {
    const file = path.join(layout, "langspec", `${lang}.json`);
    const spec = JSON.parse(readFileSync(file, "utf8"));
    if (lang === "cpp" && cxxDirs.length > 0) {
      spec.extraArgs = [
        "-nostdinc++",
        ...cxxDirs.map((d) => `-isystem${d}`),
        "-isystem/var/task/toolchains/gcc/usr/include",
        ...TAIL,
      ];
    } else {
      spec.extraArgs = [
        "-isystem/var/task/toolchains/gcc/usr/include",
        ...TAIL,
      ];
    }
    writeFileSync(file, JSON.stringify(spec, null, 2) + "\n");
  }

  relink(layout, {
    gcc: "../toolchains/gcc/usr/bin/gcc",
    "g++": "../toolchains/gcc/usr/bin/g++",
    as: "../toolchains/gcc/usr/bin/as",
    ld: "../toolchains/gcc/usr/bin/ld",
  });

  const zipPath = WANT_ZIP ? path.join(OUT, "atomcode-gcc.zip") : null;
  if (zipPath) zipDir(layout, zipPath);
  report("gcc", layout, zipPath);
}

/* ─────────────────────────────── main ─────────────────────────────────── */

console.log(`AtomCode ZIP builder → ${OUT}`);
await buildCore();
if (!CORE_ONLY) buildGcc();
console.log("done. java ships separately via mvn (see deploy-compilers-zip.yml). upload via GitHub Actions or manually to S3.");
