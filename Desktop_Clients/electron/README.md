# AtomCode Student — Desktop Client (Electron)

A student-only desktop client for the **AtomCode** learning platform, built with
Electron + vanilla HTML/CSS/JS (no build step). It talks to the Next.js backend
through a dedicated token-authenticated API at `/api/desktop/*`.

> Note: the folder is intentionally named `elcetron` (as requested).

## Features (v2.0.2)

- 🔐 **Student-only login** — staff/admin credentials are rejected with a clear message, brand-panel login screen mirroring the web app
- 📊 **Dashboard** — enrolled courses, module progress, average score, assessment readiness
- 📚 **My Courses** — progress bars per course → active modules with MCQ/code status
- 🧠 **MCQ practice** — options A–D, topic/subtopic chips, server-side grading (correct answers never sent to the client)
- 💻 **Code practice** — editor with tab support, language/difficulty/topic chips, saved testcase verdicts, *Run sample* / *Run hidden tests* executed with the **fully local bundled compilers** — every language runs on-device, nothing is sent to the server and no Lambda judge API is involved
- 📴 **Fully offline code execution** — Python, SQL, Ruby, JavaScript, TypeScript (wasm runtimes), C/C++ (real clang compiled to wasm) and Java (Doppio JVM + JDK 8 + javac) are all bundled inside the app
- 🗑️ **References** — module reference material (PPT/PDF/video links) surfaced on the practice home, same as the web module page
- ⏱ **Assessments** — access-key entry, countdown timer, MCQ + coding sections, final submit
- 🏆 **Results** — dedicated view with module + assessment score tables (`GET /student/results`), colour-coded score badges and status chips
- 👤 **User menu** — web-style topbar popover (profile / logout) plus breadcrumb-style page titles
- 🌜 **Light/dark theme** — violet shadcn theme, persisted across sessions
- ⚙️ **Settings** — profile editing, password change, server address, service status

## Run it

```bash
cd elcetron
npm install        # or: bun install
npm start          # or: bun start / npx electron .
```

The app opens a login window:

| Field | Value |
|---|---|
| Server address | asked **only on first launch** (validated, then saved in `localStorage` — the prompt never appears again; changeable later in Settings or via “Use a different server”) |
| Email | any seeded student, e.g. `student@atom.com` |
| Password | `User@Atom` |

> Useful env: `ATOMCODE_URL=http://localhost:3000 npm start` loads a live web page
> inside the shell instead of the bundled renderer (development helper).

## How auth works

1. `POST /api/desktop/auth/login` verifies the student email/password (bcrypt) and
   returns an **HMAC-SHA256 signed token** (7-day TTL, same secret family as web sessions).
2. Every subsequent call sends `Authorization: Bearer <token>`.
3. Tokens are stateless — logout simply discards them client-side.

The token, profile and server URL are persisted in `localStorage`.

## Built-in code execution engine — 100% local

The desktop client bundles a **complete local toolchain for every language**
the platform teaches. Nothing is sent to the server for grading code, and no
Lambda judge API is involved anywhere:

| Languages | Where it runs | How |
|---|---|---|
| Python (3.11–3.14), SQL (SQLite 3.54), Ruby 3.4, JavaScript, TypeScript 5.9 | **locally, in a sandboxed Web Worker** | Worker bundles + wasm runtimes packaged under `renderer/workers/` and `renderer/runtimes/`, executed from the privileged `atomcode://renderer` origin. Hidden test cases judged client-side (same trust level as the web app). |
| C, C++ | **locally, compiled by real clang** | `clang` + `wasm-ld` compiled to WebAssembly (binji/wasm-clang) + a bundled wasi sysroot (libc / libc++ / crt1.o) under `renderer/runtimes/clang/`. Student C/C++ is compiled → linked → executed inside a worker with stdin/stdout captured. |
| Java (JDK 8) | **locally, inside a bundled JVM** | Doppio JVM (a JVM in TypeScript) + the JDK 8 class library (`rt.jar`) + `javac` (`tools.jar`) under `java-runtime/`. Each run: `javac` executes **inside** Doppio to compile the student source, then the class runs inside it — all in a separate Node process managed by the Electron main process (`java:run` IPC). |

Hidden test cases for **every** language are judged client-side against the
bundled engine — expected outputs never leave the student's machine.

The renderer assets are served from the `atomcode://renderer/…` scheme
(registered in `main.js`) so Workers, dynamic imports and streaming
WebAssembly behave exactly like on the web app's origin.

Keep the bundled engine in sync with the web app after changing workers or
runtime assets — the script now *verifies* that every runtime needed to ship
a dmg/exe is present (and fails the build otherwise):

```bash
cd elcetron
npm run sync:engine   # verifies clang, doppio JVM, wasm runtimes, workers…
npm run selftest      # end-to-end engine test in Node (C, C++ and Java included)
```

`npm run build` / `npm run export` re-sync automatically (pre-hooks).

## Backend endpoints consumed

All endpoints live under `/api/desktop` on the Next.js server:

| Endpoint | Method | Purpose |
|---|---|---|
| `/auth/login` | POST | Student login → token |
| `/auth/me` | GET | Current profile |
| `/auth/logout` | POST | Logout handshake |
| `/config` | GET | Public service flags (judge/AI availability) |
| `/student/dashboard` | GET | Aggregated stats |
| `/student/courses` | GET | Enrolled courses + progress |
| `/student/courses/[cid]/modules` | GET | Active modules + per-module progress |
| `/student/modules/[mid]` | GET | Sanitized MCQs/code questions/references/progress |
| `/student/practice/module` | POST | Start/submit module tracking |
| `/student/practice/mcq` | POST | Submit MCQ attempt (graded server-side) |
| `/student/practice/code` | POST | Submit coding solution |
| `/run` | POST | Built-in server toolchains for C/C++/Java (sample + hidden tests) |
| `/student/assessments` | GET | Assessments with dynamic status |
| `/student/assessments/[aid]/start` | POST | Access-key validation → open/resume attempt |
| `/student/assessments/[aid]` | GET | Attempt detail (sanitized questions) |
| `/student/assessments/[aid]/submit` | POST | Save MCQ/code results + finalize |
| `/student/results` | GET | Module + assessment results |
| `/student/profile` | GET / PATCH | Profile read/update |
| `/student/profile/password` | POST | Change password |

## Security notes

- Renderer runs with `contextIsolation: true`, `nodeIntegration: false`; HTTP is
  proxied through the main process (no CORS exposure).
- Correct MCQ options never leave the server. Hidden test-case data is shipped
  **only** for the locally-executed languages (Python/SQL/Ruby/JS/TS — same
  trust level as the web app); for C/C++/Java the expected outputs stay
  server-side and only pass/fail verdicts return.
- The app never calls any external judge/API service — code execution is fully
  built-in (local runtimes + the platform server's own toolchains).

## Project layout

```
elcetron/
├── main.js            # Electron main process + IPC HTTP proxy + atomcode:// static server
├── preload.js         # contextBridge (window.atomcode)
├── scripts/
│   └── sync-engine-assets.mjs   # packages web app workers + runtimes into the renderer
├── renderer/
│   ├── index.html     # login + app shell
│   ├── styles.css     # violet shadcn theme (light/dark)
│   ├── app.js         # views: dashboard, courses, practice, assessments, results, settings
│   ├── engine/
│   │   └── atom-engine.js  # built-in execution engine (registry + worker pool + judge)
│   ├── workers/       # runtime worker bundles (synced from ../public/workers)
│   └── runtimes/      # pyodide / sqlite-wasm / ruby builds (synced from ../public/runtimes)
├── assets (icons) also under renderer/assets/
├── package.json
└── README.md
```

## Build & Distribute

Packaging uses **electron-builder** (config lives in the `"build"` field of
`package.json`; output goes to `dist/`).

```bash
npm install          # once (installs electron + electron-builder)

npm run build        # unpacked build for the current OS  -> dist/<os>-unpacked/
npm run export       # installers for the current OS
npm run export:linux # AppImage + .deb
npm run export:win   # NSIS installer + portable .exe (x64)
npm run export:mac   # .dmg + .zip
npm run export:all   # tries all three platforms at once
```

Build matrix (config validated with electron-builder 26.18.0):

| Host OS | Command | Produces |
|---|---|---|
| any | `npm run build` | Unpacked dir for the current OS (`dist/<os>-unpacked/`) — used to validate config + smoke-test |
| Windows | `npm run export:win` | NSIS installer + portable `.exe` (x64, icon + version resources edited natively) |
| macOS | `npm run export:mac` | `.dmg` + `.zip` for **x64 and arm64**; no signing cert required — the afterPack hook **ad-hoc re-signs the bundle** after the security-fuse flip (`resetAdHocDarwinSignature`), then verifies the fuse wire and the code signature, so the app launches cleanly on Apple Silicon |
| Linux | `npm run export:linux` | AppImage + `.deb` |

Notes:
- `npm run build` is a fast sanity check (no installer); run the produced
  binary from `dist/linux-unpacked/` etc. to smoke-test.
- **Apple Silicon Macs (arm64):** Windows exe resources (icon, version
  strings) are edited with the pure-JS `resedit`, so **no Wine** is needed.
  The bundled NSIS toolchain, however, ships an **Intel-only
  `mac/makensis`** — on a Mac without Rosetta 2 the NSIS target aborts
  mid-build with `Cannot spawn …/mac/makensis: Error: spawn Unknown system
  error -86` (-86 = EBADARCH, "Bad CPU type in executable").
  `export:win` therefore runs `scripts/fix-nsis-arch.mjs` first: it reads
  the Mach-O headers of every cached makensis, keeps x86_64 binaries when
  Rosetta 2 is present, otherwise swaps in a native arm64 makensis (the
  cache's own `mac/arm64/makensis` if present, else Homebrew's
  `brew install nsis`), and fails fast with the one-line fix when neither
  is available:
  `softwareupdate --install-rosetta --agree-to-license`.
  The original Intel binary is preserved as `makensis.x86_64.bak`.
- From **Linux**, `export:win` still needs **wine** for the NSIS
  uninstaller-extraction step (`sudo apt install wine64`); every other step
  (resedit icon/metadata editing, makensis) runs natively.
- On a CI Linux box without wine you can still validate the Windows payload:
  `npx electron-builder --win --dir`.
- Installer names follow `${productName}-${version}-${os}-${arch}.${ext}`,
  e.g. `AtomCode Student-2.0.1-mac-arm64.dmg`.
- Windows NSIS installer is user-level (not one-click), lets the user pick the
  install folder and creates desktop/start-menu shortcuts ("AtomCode Student").
- `dist/` is git-ignored.

### Bundled Java runtime (java-runtime/node_modules)

The Doppio JVM + JDK 8 jars (~150 MB) are **git-ignored** — a fresh clone
ships without them. `scripts/sync-engine-assets.mjs` (wired as a pre-hook on
`build` and every `export*` script) detects this and installs them on demand
from the committed `java-runtime/package-lock.json`
(`npm ci --ignore-scripts` inside `java-runtime/`, one-time ~100 MB download).
Manual alternative:

```bash
cd elcetron/java-runtime && npm install --ignore-scripts
```

The afterPack hook additionally verifies the critical components (app.asar,
Java runner, rt.jar, tools.jar, browserfs) landed in the packaged `resources/`
and **fails the build** if anything is missing — an incomplete installer can
never ship.

### macOS signing notes (IMPORTANT)

The security-fuse flip rewrites bytes inside the code-signed
`Electron Framework`. If the bundle is **not** re-signed afterwards, Apple
Silicon kernels kill the app at first launch with
`SIGKILL (Code Signature Invalid)` / `Invalid Page`
(crash frame: `electron::fuses::IsRunAsNodeEnabled()`). This was the
"AtomCode Student quit unexpectedly" crash reported on macOS 27 (v2.0.0
dmg built with `identity: null`, where electron-builder skips signing
completely). Since **v2.0.2** the afterPack hook
(`scripts/afterpack.cjs`) hardens the bundle in this order:

1. **sanitizes bundle symlinks** — npm-installed packages (doppiojvm) create
   *absolute* symlinks that point at the build machine; electron-builder
   copies them verbatim, so the shipped bundle contained a symlink to e.g.
   `/Users/<you>/Work/…/doppiojvm/vendor`, which makes
   `codesign --verify --deep --strict` fail with
   `invalid destination for symbolic link in bundle` (exactly the error the
   v2.0.1 gate caught during `export:mac`). The hook re-points every
   escaping symlink at the equivalent path *inside* the bundle (relative —
   doppio's `require("../vendor/java_home/jdk.json")` keeps working) and
   removes links that could never resolve,
2. *(win32 only)* **dereferences remaining symlinks into real files** —
   Windows installers have no symlink semantics, so doppio's
   `dist/release-cli/vendor` link ships as a real copy of the vendored JDK
   tree and Java works in the installed app,
3. **clears extended attributes** on the whole bundle (`xattr -cr`) —
   Finder metadata / quarantine flags would otherwise fail strict
   verification (`resource fork … not allowed`),
4. writes the integrity manifest (`Contents/Resources/integrity-manifest.json`),
5. flips the security fuses with `resetAdHocDarwinSignature: true` —
   `@electron/fuses` immediately re-signs the whole `.app` ad-hoc
   (`codesign --force --deep --sign -`),
6. reads the fuse wire back from the binary and asserts every value,
7. runs `codesign --verify --deep --strict` and **fails the build** if the
   signature does not verify (listing any offending symlinks).

The source tree is also fixed at the root: `scripts/sync-engine-assets.mjs`
(prebuild) normalizes doppio's `dist/<variant>/vendor` links to portable
relative paths, so machine-specific links never even reach packaging.

Distribution options:

- **Self / internal testing**: the ad-hoc signature is fully valid — the app
  runs on the build machine without any certificate.
- **Other Macs (no Apple Developer account)**: ad-hoc apps are not
  Gatekeeper-trusted; students must right-click → *Open* once, or run
  `xattr -cr "/Applications/AtomCode Student.app"` after copying it.
- **Clean distribution (recommended)**: set `CSC_LINK` + `CSC_KEY_PASSWORD`
  (Developer ID Application certificate) and enable notarization —
  electron-builder then re-signs with your identity *after* the fuse flip,
  so the pipeline stays correct; the app opens without warnings on any Mac.

### Windows NSIS install flow

`export:win` produces a guided installer (`oneClick: false`) that:

1. lets the user pick the install directory,
2. installs the app + all bundled WASM runtimes + the Java runtime,
3. creates the **desktop shortcut** and **Start Menu shortcut**
   (`createDesktopShortcut: "always"`, `createStartMenuShortcut: true`),
4. runs the `customInstall` verification page (`scripts/installer.nsh`)
   which checks `app.asar`, the Java runtime entry, `rt.jar`, `tools.jar`
   and the integrity manifest, and reports success/failure,
5. the app itself re-verifies the manifest (SHA-256 of every shipped file)
   on every launch and refuses to start if anything was modified — the
   installed source code and runtimes are tamper-evident.

The Electron fuses (NODE_OPTIONS off, `--inspect` off, only-load-app-from-asar)
are applied to the packaged exe by the same afterPack hook and verified by
read-back, so the shipped runtime cannot be hijacked via env vars, debug
ports, or a dropped `app` folder.

> **`scripts/installer.nsh` + `scripts/license.txt` are required** — they are
> wired into the build config (`nsis.include` / `nsis.license`) and
> `export:win` aborts with `cannot find specified resource …` when they are
> missing from the checkout. They originally lived in `elcetron/build/`,
> which the root `.gitignore`'s global `build/` rule silently excluded from
> every commit — that exact bug made `export:win` fail with
> `cannot find specified resource "build/installer.nsh"` even though the
> files existed in the working tree. Since v2.0.3 they live in the tracked
> `scripts/` directory (and `elcetron/build/` is un-ignored for future
> build resources like icons). v2.0.2+ also dereferences symlinks for
> Windows so the packaged Java runtime needs no link support at install
> time.
