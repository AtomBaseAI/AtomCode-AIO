/* ================================================================
 * AtomCode Student (Tauri) — IPC bridge
 *
 * Tauri equivalent of the Electron preload.js contextBridge +
 * main-process IPC handlers (api:fetch, java:run, app:setFullscreen,
 * app:fullscreen, app:openExternal, app:info, app:preflight).
 *
 * Two runtime modes:
 *  - Tauri webview : window.__TAURI__ exists (withGlobalTauri) — every
 *    privileged call is a Rust command invoked over Tauri IPC, exactly
 *    like the Electron app routed everything through ipcMain.handle.
 *  - Browser preview (bun run preview): the same UI runs on a plain
 *    web server — HTTP goes out with fetch directly (the desktop API
 *    routes send permissive CORS headers), fullscreen uses the DOM
 *    Fullscreen API so proctoring behaves the same.
 *
 * window.atomcode is the exact same contract the renderer (app.js /
 * atom-engine.js) expects from the Electron build.
 * ================================================================ */

(function () {
  "use strict";

  const TAURI =
    typeof window !== "undefined" ? window.__TAURI__ : null;
  const isTauri = Boolean(
    TAURI && TAURI.core && typeof TAURI.core.invoke === "function"
  );

  /* ============ keyboard lockdown (Electron parity, both modes) ========
   *
   * Ported from the Electron main process before-input-event handler:
   *   - DevTools: F12, Ctrl/Cmd+Shift+I/J/C
   *   - Reload / navigation / zoom / fullscreen: every other Ctrl/Cmd
   *     accelerator, F1–F12, Alt+arrows
   *   - Kept working: Ctrl+C/X/V/A/Z/Y (+ AltGr typing)
   */
  document.addEventListener(
    "keydown",
    function (event) {
      const key = (event.key || "").toLowerCase();
      const ctrl = event.ctrlKey || event.metaKey;

      // DevTools — every known combination, always blocked.
      if (
        key === "f12" ||
        (ctrl && event.shiftKey && (key === "i" || key === "j" || key === "c"))
      ) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      // AltGr character production (Ctrl+Alt+<char>) is typing, not a shortcut.
      if (event.ctrlKey && event.altKey && !event.metaKey && key.length === 1) return;

      // Clipboard / undo / redo / select-all stay functional.
      if (ctrl && !event.altKey && ["c", "v", "x", "a", "z", "y"].includes(key)) return;

      // Every other Ctrl/Cmd accelerator is a browser shortcut — block it.
      if (ctrl) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      // Function keys: F5 reload, F11 fullscreen, F12 devtools, etc.
      if (/^f([1-9]|1[0-2])$/.test(key)) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      // Alt+arrow history navigation.
      if (
        event.altKey &&
        ["arrowleft", "arrowright", "arrowup", "arrowdown", "home"].includes(key)
      ) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    true
  );

  /* ==================== app:fetch HTTP proxy ==================== */

  /**
   * Tauri mode → Rust command api_fetch (http.rs — mirrors Electron
   * ipcMain "api:fetch": URL validation, JSON body, Bearer token,
   * timeout, { ok, status, data } response contract).
   * Browser mode → direct fetch with the identical contract.
   */
  async function fetchApiBrowser(req) {
    const base = String(req.serverUrl || "").trim().replace(/\/+$/, "");
    if (base && !/^https?:\/\//i.test(base)) {
      return {
        ok: false,
        status: 0,
        data: { error: "Server URL must start with http:// or https://" },
      };
    }
    const url = `${base}/api/desktop${req.path || ""}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), req.timeout || 45000);
    try {
      const res = await fetch(url, {
        method: req.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...(req.token ? { Authorization: `Bearer ${req.token}` } : {}),
        },
        body: req.body !== undefined ? JSON.stringify(req.body) : undefined,
        signal: controller.signal,
      });
      const text = await res.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = { error: (text || `HTTP ${res.status}`).slice(0, 300) };
      }
      return { ok: res.ok, status: res.status, data };
    } catch (err) {
      const aborted = err && err.name === "AbortError";
      return {
        ok: false,
        status: 0,
        data: {
          error: aborted
            ? "Request timed out — is the AtomCode server running?"
            : `Cannot reach server at ${base || "this origin"}`,
        },
      };
    } finally {
      clearTimeout(timer);
    }
  }

  async function api(req) {
    if (isTauri) {
      try {
        return await TAURI.core.invoke("api_fetch", { request: req });
      } catch (err) {
        // IPC denied for this surface (e.g. capability scoping of remote
        // loopback pages) → fall through to the fetch path; the desktop
        // API answers with permissive CORS headers, so the same contract
        // works from the http origin. Command-level results (including
        // server errors) do NOT fall through — only IPC failures do.
      }
    }
    return fetchApiBrowser(req);
  }

  /* ==================== local Java (Doppio JVM) ==================== */

  /**
   * Electron parity: the main process runs elcetron/java-runtime
   * (Doppio JVM + JDK 8) in a Node child. In Tauri mode the Rust
   * java_run command drives the same runner.js; in browser-preview
   * mode there is no bundled JVM and Java degrades to the server
   * toolchains (/api/desktop/run), exactly as in the Electron app.
   */
  async function javaRun(req) {
    if (isTauri) {
      try {
        return await TAURI.core.invoke("java_run", { req });
      } catch {
        /* IPC denied → degrade exactly like a missing runtime */
        return { fatal: "The local Java runtime is not available in this build." };
      }
    }
    return { fatal: "The local Java runtime is not available in this build." };
  }

  /* ==================== fullscreen proctoring ==================== */

  async function setFullscreen(flag) {
    if (isTauri) {
      try {
        if (
          (await TAURI.core.invoke("set_fullscreen", { flag: Boolean(flag) })) ===
          true
        ) {
          return true;
        }
      } catch {
        /* IPC denied → DOM fullscreen below */
      }
    }
    // DOM Fullscreen API — fires `fullscreenchange` so onFullscreenChange
    // subscribers see the same transitions the Rust watcher emits for the
    // native window. Used by the browser preview and as the Tauri fallback.
    try {
      if (flag) {
        await document.documentElement.requestFullscreen?.();
      } else if (document.fullscreenElement) {
        await document.exitFullscreen?.();
      }
    } catch {
      /* denial / unsupported — proctoring keeps working via blur */
    }
    return true;
  }

  function onFullscreenChange(cb) {
    if (isTauri) {
      // The Rust watcher emits "app:fullscreen" whenever the native
      // window enters/leaves fullscreen (Electron parity). The DOM
      // fullscreenchange handler covers the fallback path as well.
      TAURI.event
        .listen("app:fullscreen", (event) => cb(Boolean(event.payload)))
        .catch(() => {});
    }
    const handler = () => cb(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }

  /* ==================== open externally ==================== */

  function openExternal(url) {
    if (/^https?:\/\//i.test(String(url || ""))) {
      if (isTauri) {
        TAURI.core
          .invoke("open_external", { url: String(url) })
          .catch(() => {
            // IPC denied → open in a new webview window instead
            window.open(String(url), "_blank", "noopener,noreferrer");
          });
        return Promise.resolve(true);
      }
      window.open(String(url), "_blank", "noopener,noreferrer");
    }
    return Promise.resolve(true);
  }

  /* ==================== diagnostics (Tauri) ==================== */

  function logToHost(level, message) {
    if (!isTauri) return;
    try {
      TAURI.core.invoke("ui_log", { level, message }).catch(() => {});
    } catch {
      /* diagnostics must never break the app */
    }
  }

  window.addEventListener("error", function (event) {
    logToHost("error", (event && event.message) || "unknown error");
  });

  /* ==================== app info ==================== */

  async function info() {
    if (isTauri) {
      try {
        return await TAURI.core.invoke("app_info");
      } catch {
        /* fall through to the web fallback */
      }
    }
    const ua = navigator.userAgent || "";
    return {
      appVersion: "2.0.3",
      tauri: null,
      webview: /Firefox\//.test(ua)
        ? "Gecko"
        : /Edg\//.test(ua)
          ? "Blink (Edge)"
          : /Chrome\//.test(ua)
            ? "Blink"
            : "WebView",
      electron: null,
      chrome: null,
      node: null,
      platform: navigator.platform || "web",
    };
  }

  /* ==================== startup preflight ==================== */

  /**
   * Tauri mode → the Rust preflight thread emits "app:preflight" after
   * verifying the bundled runtimes on disk (mirrors Electron main.js).
   * Browser preview → the same checks run here as asset HEAD/GET probes.
   */
  const PRECHECKS = [
    "engine/atom-engine.js",
    "workers/python.worker.js",
    "workers/sqlite.worker.js",
    "workers/javascript.worker.js",
    "workers/ruby.worker.js",
    "runtimes/sqlite-wasm/sqlite3.wasm",
    "runtimes/pyodide/0.26.4/pyodide.js",
    "runtimes/ruby/3.4/ruby+stdlib.wasm",
  ];

  const listeners = [];
  let preflightStarted = false;

  function emitPreflight(payload) {
    listeners.forEach((cb) => {
      try {
        cb(payload);
      } catch {
        /* listener error must not break the preflight */
      }
    });
  }

  async function checkAsset(rel) {
    const url = new URL(rel, document.baseURI).href;
    const res = await fetch(url, { method: "GET", cache: "no-store" });
    const ok = res.ok;
    try {
      // Stop the body download immediately — we only needed the status.
      if (res.body && typeof res.body.cancel === "function") {
        await res.body.cancel();
      }
    } catch {
      /* already fully read or not cancellable */
    }
    return ok;
  }

  async function runBrowserPreflight() {
    emitPreflight({ stage: "start", message: "Checking local runtimes…" });
    const missing = [];
    for (const rel of PRECHECKS) {
      try {
        if (!(await checkAsset(rel))) missing.push(rel);
      } catch {
        missing.push(rel);
      }
    }
    if (missing.length > 0) {
      emitPreflight({
        stage: "renderer",
        level: "error",
        message: `Bundled runtime files are missing: ${missing.join(", ")}`,
      });
    } else {
      emitPreflight({
        stage: "renderer",
        message: "Bundled runtimes verified",
      });
    }
    emitPreflight({
      stage: "done",
      installed: false,
      message: "All runtimes ready",
    });
  }

  function onPreflight(cb) {
    listeners.push(cb);
    if (isTauri) {
      // Rust-side preflight (already running) → app:preflight events.
      TAURI.event
        .listen("app:preflight", (event) => emitPreflight(event.payload))
        .catch(() => {});
      return () => {
        const i = listeners.indexOf(cb);
        if (i >= 0) listeners.splice(i, 1);
      };
    }
    if (!preflightStarted) {
      preflightStarted = true;
      runBrowserPreflight().catch(() =>
        emitPreflight({
          stage: "done",
          installed: false,
          message: "Preflight check failed",
        })
      );
    }
    return () => {
      const i = listeners.indexOf(cb);
      if (i >= 0) listeners.splice(i, 1);
    };
  }

  /* ==================== export the same contract ==================== */

  logToHost(
    "info",
    "bridge ready — mode " +
      (isTauri ? "tauri" : "browser-preview") +
      ", origin " +
      self.location.origin
  );

  window.atomcode = {
    mode: isTauri ? "tauri" : "browser",
    api,
    javaRun,
    openExternal,
    setFullscreen,
    onFullscreenChange,
    onPreflight,
    info,
  };
})();
