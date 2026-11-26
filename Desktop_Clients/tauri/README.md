# AtomCode Student — Desktop Client (Tauri)

A **Tauri recreation** of the ElectronJS student desktop client that lives in
[`elcetron/`](../elcetron/). Same renderer, same built-in code-execution
engine, same `/api/desktop/*` backend contract — the Electron shell
(Node main process + Chromium) is replaced by a small **Rust core** and the
system **WebKitGTK** webview.

> The folder is intentionally named `tauri` (as requested): *"recreate it in
> tauriapp instead of electronjs — create and test it properly inside the
> tauri (create and use) folder"*.

## Feature parity with elcetron/

| Electron (`elcetron/`)                 | Tauri (`tauri/`) |
|----------------------------------------|------------------|
| `main.js` BrowserWindow 1400×900 (min 1080×700) | window built in Rust (`WebviewWindowBuilder`), same sizes |
| `atomcode://renderer` privileged scheme | **both** surfaces: the same `atomcode://` scheme handler **and** an embedded loopback HTTP server (default — web-parity for ES-module Workers / streaming WASM) |
| `ipcMain.handle("api:fetch")`          | `#[tauri::command] api_fetch` → `src/http.rs` (reqwest + rustls, CORS-free, Bearer token, timeouts, identical `{ ok, status, data }` contract) |
| `ipcMain.handle("java:run")` (Doppio JVM in a Node child) | `#[tauri::command] java_run` — spawns `node elcetron/java-runtime/runner.js` with a watchdog kill; degrades gracefully when the runtime is absent |
| `ipcMain.handle("app:setFullscreen")`  | `#[tauri::command] set_fullscreen` (native window fullscreen for assessment/practice proctoring) |
| `enter/leave-full-screen` → `app:fullscreen` | fullscreen watcher thread → `app:fullscreen` event (exit counts as a tab switch — web parity) |
| `ipcMain.handle("app:openExternal")`   | `#[tauri::command] open_external` (xdg-open / open / cmd start) |
| `ipcMain.handle("app:info")`           | `#[tauri::command] app_info` (reports Tauri/WebKitGTK instead of Electron/Chromium/Node) |
| `before-input-event` keyboard lockdown | capture-phase `keydown` listener in `ui/bridge.js` (F12, reload/zoom/nav shortcuts blocked; clipboard editing kept) |
| `runPreflight` (verify runtimes, auto-install Java) | Rust preflight thread → `app:preflight` events; JS-side asset probe in browser mode |
| `preload.js` `contextBridge` (`window.atomcode`) | `ui/bridge.js` — same API over Tauri IPC, with automatic fetch/DOM fallbacks so every surface works |
| renderer assets served from `atomcode://renderer/…` | same relative layout (`ui/` first, `elcetron/renderer/` fallback for the heavy runtimes) |

The renderer (`index.html`, `app.js`, `styles.css`, `engine/`, `workers/`) is
reused from `elcetron/renderer/` with exactly three diffs:

- `ui/engine/atom-engine.js` — worker URLs are `document.baseURI`-relative
  instead of the hard-coded `atomcode://renderer/…`, so the engine runs
  unchanged on the loopback origin, the custom scheme and a plain web server;
- `ui/index.html` — loads `bridge.js` before the engine/app scripts and adds
  `'wasm-unsafe-eval'` to the CSP (required by the bundled wasm runtimes);
- `ui/bridge.js` — new (the Tauri bridge, with browser-preview fallbacks).

## Built-in code execution (same engine as the web app)

| Languages | Where it runs |
|---|---|
| Python 3.11–3.14 (pyodide), SQL (SQLite wasm), Ruby 3.4, JavaScript, TypeScript 5.9 | **100% locally** in bundled ES-module workers + wasm runtimes (served from `elcetron/renderer/runtimes/`) |
| C, C++ | bundled clang worker + runtimes (local), and/or the platform server's toolchains via `/api/desktop/run` — hidden test cases for compiled languages never leave the server |
| Java 8 | bundled Doppio JVM via the Rust `java_run` command (uses `elcetron/java-runtime/`) |

## Layout

```
tauri/
├── package.json              # scripts + @tauri-apps/cli
├── scripts/
│   ├── sync-engine-assets.mjs   # verifies UI + fallback runtimes + Java runtime
│   ├── prepare-bundle.mjs       # stages ui/ + renderer/ + java-runtime into src-tauri/resources (installer contents)
│   ├── build-release.mjs        # host-aware build wrapper (valid --bundles per OS)
│   ├── preview-server.mjs       # static server (bun/node) for browser testing
│   ├── run-desktop.sh           # launches the binary with sysroot runtime env
│   └── build-sysroot.sh         # rootless GTK/WebKit sysroot bootstrap (sandbox)
├── ui/                       # renderer port: bridge.js + adapted engine/app/index
│   ├── index.html  styles.css  app.js  bridge.js
│   ├── engine/atom-engine.js    # (one patch: relative worker URLs)
│   ├── workers/                 # python/sqlite/js/ts/ruby/clang worker bundles
│   └── assets/                  # icons + language SVGs
└── src-tauri/
    ├── Cargo.toml  build.rs
    ├── tauri.conf.json          # frontendDist ../ui, no dev server needed
    ├── capabilities/default.json
    ├── icons/                   # generated from elcetron icon.png
    └── src/
        ├── main.rs              # the whole shell (loopback server, scheme, commands)
        └── http.rs              # pure api_fetch implementation (unit-testable)
```

## Run it (desktop)

Requires the Tauri v2 Linux prerequisites on a normal machine
(`libwebkit2gtk-4.1-dev`, `build-essential`, `curl`, `wget`, `file`,
`libxdo-dev`, `libssl-dev`, `libayatana-appindicator3-dev`, ` librsvg2-dev`).
In a rootless sandbox, bootstrap the local sysroot first:

```bash
bash tauri/scripts/build-sysroot.sh        # one-time, ~2 GB in ~/tauri-sysroot

cd tauri/src-tauri
export SYSROOT=$HOME/tauri-sysroot
export PKG_CONFIG_PATH="$SYSROOT/usr/lib/x86_64-linux-gnu/pkgconfig:$SYSROOT/usr/lib/pkgconfig:$SYSROOT/usr/share/pkgconfig"
export PKG_CONFIG_SYSROOT_DIR=$SYSROOT
cargo build

# headless sandbox (Xvfb) or any display:
cd ..
DISPLAY=:99 SYSROOT=$HOME/tauri-sysroot ./scripts/run-desktop.sh
```

Runtime env (only needed when the system WebKit/GTK is absent — applied by
`run-desktop.sh`): `LD_LIBRARY_PATH`, `GSETTINGS_SCHEMA_DIR`,
`GDK_PIXBUF_MODULE_FILE`, `WEBKIT_DISABLE_DMABUF_RENDERER=1`,
`LIBGL_ALWAYS_SOFTWARE=1`. On Debian trixie containers also add
`WEBKIT_DISABLE_COMPOSITING_MODE=1` (accelerated compositing can crash
Xvfb) — set by default in the documented run command.

Environment knobs: `ATOMCODE_PORT` (pin the loopback port → stable origin →
persistent localStorage), `ATOMCODE_UI=atomcode` (use the custom scheme
surface instead of the loopback HTTP server), `ATOMCODE_RENDERER_ROOT`,
`ATOMCODE_UI_ROOT`, `ATOMCODE_JAVA_RUNTIME`, `ATOMCODE_NODE`.

In sysroot mode `scripts/run-desktop.sh` additionally exports
`GIO_MODULE_DIR` (the sysroot's glib-networking TLS backend — hosts without
`glib-networking` have no TLS in GLib and every https:// load fails with
`g-tls-error-quark`), `WEBKIT_DISABLE_SANDBOX_THIS_IS_DANGEROUS=1`
(WebKit's bubblewrap namespace hides `/etc/ssl`, breaking TLS trust) and
`WEBKIT_DISABLE_COMPOSITING_MODE=1` (accelerated compositing crashes Xvfb).

Then log in — the client defaults to the production platform
**`https://atomcode.atomapps.space`** (any other AtomCode server can be set
via "Use a different server" on the login screen; student account, e.g.
`student@atom.com` / `User@Atom`).

## Build platform executables / installers

**Bundles are host-specific** — the Tauri CLI only offers `app,dmg` on
macOS, `msi,nsis` on Windows and `deb,rpm,appimage` on Linux (that is the
exact `error: invalid value 'msi' for '--bundles'` you get when running a
Windows/Linux bundle command on a Mac). Every `build:*` script routes
through `scripts/build-release.mjs`, which picks the right
target + `--bundles`, checks the rust targets and prints a CLEAR error
(with the fix) when a platform is requested on a host that cannot build it.

The wrapper **honors the platform anywhere on the command line** and never
silently substitutes a host installer: `bun run build windows:msi` on a Mac
expands to `build-release.mjs auto windows:msi` and now REFUSES with the
fix-up options below (an earlier version read only the first argument and
treated the platform as noise — that is why it used to "build a Mac
installer with the Windows build command"). Preview any command without
compiling with `DRY_RUN=1`.

```bash
bun run build                # best installer(s) for the CURRENT OS

# INLINE FORM — the requested platform is honored, never swapped:
bun run build windows:msi    # .msi — refuses on macOS/Linux with clear fix-up steps
bun run build windows        # NSIS setup.exe + .msi — Windows only
bun run build mac:universal  # universal dmg — macOS only

DRY_RUN=1 bun run build windows:msi   # print what WOULD run, no compile

# macOS (Apple Silicon or Intel — auto-detected):
bun run build:mac            # .app + .dmg for the host arch
bun run build:mac:universal  # 2-in-1 dmg (needs: rustup target add x86_64-apple-darwin)
bun run build:mac:arm64      # Apple Silicon only
bun run build:mac:intel      # Intel only

# Windows (run ON Windows — MSVC toolchain bound):
bun run build:windows        # NSIS setup.exe + .msi
bun run build:windows:nsis   # NSIS setup.exe only
bun run build:windows:msi    # .msi only

# Linux (run ON Linux):
bun run build:linux          # .deb + .rpm + AppImage
bun run build:linux:deb      # .deb only
bun run build:linux:rpm      # .rpm only
bun run build:linux:appimage # AppImage only

bun run build:help           # print the command overview
```

### What ships inside every installer

`beforeBuildCommand` (`scripts/prepare-bundle.mjs`) stages the full runtime
into the bundle's resources, so the installed app is fully self-contained —
**the wasm runtimes ship in the DMG/MSI/deb, no network download after
install**:

| Resource | Contents |
|---|---|
| `ui/` | Tauri renderer (bridge.js + patched engine) |
| `renderer/` | engine + workers + **wasm runtimes**: pyodide (4 versions), sqlite-wasm, ruby 3.4, clang/lld wasm modules + sysroot for C/C++ (~143 MB → compressed in the installer) |
| `java-runtime/` | Doppio JVM + JDK 8 when present (~113 MB staged → compressed in the installer) — install once with `cd elcetron/java-runtime && npm install --ignore-scripts && node node_modules/doppiojvm/install.js` (the second step downloads the 62 MB JDK 8 class library — `--ignore-scripts` alone is incomplete), then rebuild (CI does both automatically; absent → Java is judged by the server, gracefully) |

The Rust shell resolves them through `BaseDirectory::Resource`
(`main.rs`): macOS `Contents/Resources/ui`, Linux
`/usr/lib/<productName>/ui`, Windows `%APPDATA%\…\resources\ui` — with
`resources/ui` fallbacks. This is what fixed the DMG opening to a bare
"**Not found**" window: the packaged app previously could not locate
`index.html` at all.

Artifacts land in `src-tauri/target/<triple>/release/bundle/…`.

### Build ALL installers from your Mac — GitHub Actions

Windows MSI/NSIS and Linux packages cannot be produced on macOS (MSVC, WiX
and the bundlers are host-bound). The repo ships a ready workflow —
[`.github/workflows/tauri-release.yml`](../.github/workflows/tauri-release.yml)
— that builds every installer on the right OS and attaches them to a DRAFT
GitHub release:

```bash
# from your Mac (or trigger via the repo's Actions tab → "Tauri Release" → Run workflow):
git tag tauri-v2.0.4 && git push origin tauri-v2.0.4
```

| CI job | Runner | Artifacts |
|---|---|---|
| macOS | `macos-14` (Apple Silicon) | universal 2-in-1 `.app` + `.dmg` (Apple Silicon + Intel) |
| Windows | `windows-latest` | NSIS `setup.exe` + `.msi` |
| Linux | `ubuntu-22.04` | `.deb` + `.rpm` + `.AppImage` |

Each job installs the pinned `@tauri-apps/cli` (frozen `bun.lock`), installs
the Doppio JVM into `elcetron/java-runtime` so Java ships inside every
installer, runs `scripts/sync-engine-assets.mjs` as a fail-fast asset check,
and only then builds. Prerequisites when building locally instead: standard
[Tauri v2 prerequisites](https://tauri.app/start/prerequisites/) per
platform (Linux: `libwebkit2gtk-4.1-dev`, `build-essential`, and
`libxdo-dev`/`libssl-dev`/`libayatana-appindicator3-dev`/`librsvg2-dev`;
Windows: MSVC Build Tools + WebView2; macOS: Xcode CLT). In a rootless Linux
sandbox, bootstrap the local sysroot first (see below) — `scripts/run-desktop.sh`
then supplies the runtime env (TLS GIO module dir, CA bundle, software
rendering, WebKit sandbox off) automatically.

## Test it in a plain browser (no Tauri window needed)

```bash
cd tauri
bun run preview          # or: node scripts/preview-server.mjs  → :3020
```

The same UI runs in "browser" bridge mode: HTTP goes out with `fetch`
(the desktop API routes send permissive CORS headers) and fullscreen
proctoring uses the DOM Fullscreen API.

## Verification results (this sandbox, WebKitGTK 2.54 + Tauri 2.12.7)

| # | Test | Result |
|---|------|--------|
| 1 | `cargo build` of the full Tauri stack against the local sysroot | PASS |
| 2 | `http.rs` live harness: invalid URL guard, `GET /config`, `POST /auth/login` → token, bearer `GET /student/courses`, bad-token 401, unreachable host → `{status:0}` | ALL PASS |
| 3 | App boots under Xvfb; gate screen renders (brand panel + server gate) | PASS |
| 4 | Server gate → client branding ("Atom Code Campus") applied | PASS |
| 5 | Student login (`student@atom.com`) → token → dashboard with live data (4 courses, calendar events) | PASS |
| 6 | Navigation: Dashboard / My Courses / Modules (accordion + tabs) / Practice home | PASS |
| 7 | MCQ practice fullscreen overlay: answer both questions → submit → **server-side grading 2/2 (0 wrong)** toast + submitted band | PASS |
| 8 | Code practice: JAVA editor with gutter, typed `Hello Atom` solution → **Run → Passed ("Hello, Atom!")** → Submit → scored (1/20 recorded) | PASS |
| 9 | Results view: module + assessment tables with the freshly recorded scores | PASS |
| 10 | Settings: profile fields + About line ("Tauri 2.12.7 · WebKitGTK · Mode: tauri") | PASS |
| 11 | Browser preview (`bun run preview`): gate → branding → login → dashboard | PASS |
| 12 | Local engines in the browser preview: Python 3.11 (pyodide), SQL (SQLite wasm table render), JavaScript, TypeScript, Ruby 3.4 — all `Success` | PASS |

### Production server (https://atomcode.atomapps.space) — 2026-11-22

| # | Test | Result |
|---|------|--------|
| 13 | Default server URL baked in (`DEFAULT_SERVER_URL` in `ui/app.js`); first launch lands on the login card with remote branding ("Atom Code Campus" + banner) | PASS |
| 14 | Desktop app (debug + **release** binary) against the production server: login `student@atom.com` → token → dashboard with live remote data (4 courses, calendar events) | PASS |
| 15 | My Courses with remote progress (Full Stack Java 0%, SQL Lab 100%, MCQ Demo 100%, Desktop Test Course 0%) → module pages (Practice/Result tabs) | PASS |
| 16 | Practice fullscreen: question loading, JAVA code editor with gutter, session persistence (auto-login via saved token on relaunch) | PASS |
| 17 | `Run` on a JAVA question: server without a JVM answers "Built-in Java toolchain is unavailable: java is not available on this server." — surfaced cleanly as an error dialog (Vercel deployment has no server toolchains; local engines unaffected) | PASS (correct UX) |
| 18 | `Submit Question` → remote server → hidden test cases judged → "**Code Submitted**" band recorded; `Submit Module` → module finalized ("Module 1 ✓ Completed") | PASS |
| 19 | Results page renders live remote scores (MCQ 2/2, Code 0/10, Overall 17%, per-module table + assessment section); result analysis locked until module submission (server rule) | PASS |
| 20 | `bun run build:linux:deb` → release binary + `AtomCode Student_2.0.4_amd64.deb` (57.4 MiB: usr/bin + .desktop + icons + **ui/ + renderer/ wasm runtimes + java-runtime** resources) | PASS |
| 21 | Packaged-resource resolution (the DMG "Not found" fix): extracted the .deb to a fake root, ran `usr/bin/atomcode-student` → `[atomcode] ui root: …/usr/lib/AtomCode Student/ui`, `renderer root: …/renderer`, `java runner: …/java-runtime/runner.js`, loopback `GET /index.html -> 200` (no more bare "Not found") | PASS |
| 22 | Installer ships the wasm libs: deb data.tar contains `renderer/runtimes/{pyodide,sqlite-wasm,ruby,clang}` incl. `ruby+stdlib.wasm`, `sqlite3.wasm`, `pyodide.js`, wasm `clang`/`lld` binaries + sysroot.tar | PASS |
| 23 | Host-aware build wrapper: `bun run build:windows` on Linux exits early with a clear explanation (MSVC/toolchain bound, host-restricted `--bundles`) instead of the cryptic clap error; `build:mac*` uses valid `app,dmg` on macOS | PASS |
| 24 | Build wrapper honors the platform ANYWHERE on the command line: `build-release.mjs auto windows:msi` (what `bun run build windows:msi` expands to) now refuses on a foreign host with fix-up options instead of silently building the host installer; unknown words fail; `DRY_RUN=1` prints the resolved target/bundles (exit codes 1/0 verified) | PASS |
| 25 | GitHub Actions release workflow (`.github/workflows/tauri-release.yml`, YAML-validated): macOS universal dmg + Windows NSIS/MSI + Linux deb/rpm/AppImage → draft release; installs pinned CLI from frozen bun.lock, completes the Doppio JDK and fail-fasts on missing assets before building | PASS |
| 26 | Packaged Java fixed end-to-end: doppiojvm's npm tarball ships no JDK — `install.js` fetched rt.jar (61.7 MB); `prepare-bundle` now rewrites the staged `dist/*/vendor` symlinks to RELATIVE targets (cpSync previously wrote absolute links to the build machine — the installed app's JVM could not find the JDK) and prunes dev artifacts (148 → 113.3 MB); the staged copy itself was smoke-tested standalone: `node runner.js` (from `src-tauri/resources/java-runtime`) compiled + ran a Java class → `Staged copy OK` | PASS |

Desktop tests 13–16 were driven end-to-end under Xvfb (real keyboard/mouse via
pynput + X11 focus control, ffmpeg x11grab screenshots); tests 14–19 in the
browser bridge against the same production API.

Known limitation: on WebKitGTK, Tauri 2.12 does not inject the IPC API into
remote `http://127.0.0.1` pages regardless of the `remote.urls` capability
patterns, so the loopback surface runs through the bridge's fetch fallback
(functionally identical — verified end-to-end); the `atomcode://` surface
uses the native Rust IPC commands. Every command in `ui/bridge.js` degrades
gracefully between the two.
