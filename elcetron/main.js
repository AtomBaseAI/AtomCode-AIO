const { app, BrowserWindow, ipcMain, shell, Menu, protocol } = require("electron");
const path = require("path");
const fs = require("fs/promises");

/**
 * AtomCode Student — Electron main process.
 *
 * The renderer is a plain HTML/JS app. All HTTP calls go through the main
 * process (IPC "api:fetch") which avoids CORS entirely and keeps the
 * auth token handling in one place.
 *
 * The renderer (and its bundled code-execution engine — the same built-in
 * runtimes the web app uses) is served from a privileged custom scheme
 * (atomcode://renderer/…) instead of file:// so that Web Workers,
 * importScripts/ dynamic import and WebAssembly streaming all behave
 * exactly like on the web app's origin.
 */

const RENDERER_ROOT = path.join(__dirname, "renderer");

/* ------------------------------------------------------------------ */
/* Custom scheme: static serving of the bundled renderer + runtimes    */
/* ------------------------------------------------------------------ */

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".wasm": "application/wasm",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
};

// Must run before app ready — makes atomcode:// a standard, secure,
// fetch-capable origin (required for Workers + fetch inside them).
protocol.registerSchemesAsPrivileged([
  {
    scheme: "atomcode",
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      stream: true,
      codeCache: true,
    },
  },
]);

/** Maps atomcode://renderer/<path> to files under elcetron/renderer/. */
function serveRenderer(request) {
  let parsed;
  try {
    parsed = new URL(request.url);
  } catch {
    return Promise.resolve(new Response("Bad request", { status: 400 }));
  }
  if ((parsed.hostname || "renderer") !== "renderer") {
    return Promise.resolve(new Response("Not found", { status: 404 }));
  }

  let pathname;
  try {
    pathname = decodeURIComponent(parsed.pathname);
  } catch {
    return Promise.resolve(new Response("Bad request", { status: 400 }));
  }
  if (pathname === "/" || pathname === "") pathname = "/index.html";

  const filePath = path.normalize(path.join(RENDERER_ROOT, pathname));
  if (filePath !== RENDERER_ROOT && !filePath.startsWith(RENDERER_ROOT + path.sep)) {
    return Promise.resolve(new Response("Forbidden", { status: 403 }));
  }

  return fs
    .readFile(filePath)
    .then((buf) => {
      const type =
        MIME_TYPES[path.extname(filePath).toLowerCase()] ||
        "application/octet-stream";
      return new Response(buf, {
        status: 200,
        headers: { "content-type": type },
      });
    })
    .catch((err) => {
      if (err && err.code === "ENOENT") {
        return new Response("Not found", { status: 404 });
      }
      console.error("[atomcode://] failed to serve", filePath, err);
      return new Response("Internal error", { status: 500 });
    });
}

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1080,
    minHeight: 700,
    show: false,
    backgroundColor: "#0b0f14",
    title: "AtomCode Student",
    icon: path.join(__dirname, "renderer", "assets", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false,
      devTools: false, // hard-disable DevTools (no F12 / shortcuts / inspect)
    },
  });

  mainWindow.once("ready-to-show", () => mainWindow.show());

  // Disable pinch/visual zoom — no browser-like zooming.
  mainWindow.webContents.setVisualZoomLevelLimits(1, 1);

  // Optional: ATOMCODE_URL=http://localhost:3000/desktop-preview loads a live
  // page instead of the bundled renderer (handy while developing).
  if (process.env.ATOMCODE_URL) {
    mainWindow.loadURL(process.env.ATOMCODE_URL);
  } else {
    mainWindow.loadURL("atomcode://renderer/index.html");
  }

  // Keep the window anchored to the app — never navigate like a browser.
  const appOrigin = process.env.ATOMCODE_URL || "atomcode://renderer";
  mainWindow.webContents.on("will-navigate", (e, url) => {
    if (!String(url).startsWith(appOrigin)) e.preventDefault();
  });

  // Open target=_blank / window.open links in the system browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) shell.openExternal(url);
    return { action: "deny" };
  });

  /*
   * Lockdown: no DevTools, no browser shortcuts.
   *
   * Blocked at the earliest possible point (before the page sees the key):
   *   - DevTools: F12, Ctrl/Cmd+Shift+I/J/C, Cmd+Opt+I/J/C
   *   - Reload / hard reload: F5, Ctrl/Cmd+R, Ctrl/Cmd+Shift+R
   *   - Zoom: Ctrl/Cmd +/ -/ 0, pinch (setVisualZoomLevelLimits above)
   *   - Fullscreen: F11, and every other function key
   *   - New window/tab: Ctrl/Cmd+N/T/Shift+N/Shift+T
   *   - Print, save page, view source, history, downloads, bookmarks,
   *     find bar, address bar — everything Ctrl/Cmd based that is not
   *     plain text editing.
   *   - Alt+arrow history navigation.
   *
   * Kept working (text editing, required by the code editor & forms):
   *   - Ctrl/Cmd+C/X/V/A/Z/Y (incl. Ctrl+Shift+V paste-plain)
   *   - AltGr character input (Ctrl+Alt+<char> on international keyboards)
   */
  mainWindow.webContents.on("before-input-event", (event, input) => {
    if (input.type !== "keyDown" || !input.key) return;
    const key = input.key.toLowerCase();
    const ctrl = input.control || input.meta; // Cmd counts as Ctrl on macOS

    // DevTools — every known combination, always blocked.
    if (
      key === "f12" ||
      (ctrl && input.shift && (key === "i" || key === "j" || key === "c")) ||
      (input.meta && input.alt && (key === "i" || key === "j" || key === "c"))
    ) {
      event.preventDefault();
      return;
    }

    // AltGr character production (Ctrl+Alt+<char>) is typing, not a shortcut.
    if (input.control && input.alt && !input.meta && key.length === 1) return;

    // Clipboard / undo / redo / select-all stay functional.
    if (ctrl && !input.alt && ["c", "v", "x", "a", "z", "y"].includes(key)) return;

    // Every other Ctrl/Cmd accelerator is a browser shortcut — block it.
    if (ctrl) {
      event.preventDefault();
      return;
    }

    // Function keys: F5 reload, F11 fullscreen, F12 devtools, etc.
    if (/^f([1-9]|1[0-2])$/.test(key)) {
      event.preventDefault();
      return;
    }

    // Alt+arrow history navigation (Alt+Left/Right).
    if (
      input.alt &&
      ["arrowleft", "arrowright", "arrowup", "arrowdown", "home"].includes(key)
    ) {
      event.preventDefault();
    }
  });

  mainWindow.on("closed", () => (mainWindow = null));
}

/* ------------------------------------------------------------------ */
/* IPC: proxied HTTP for the renderer                                  */
/* ------------------------------------------------------------------ */

ipcMain.handle("api:fetch", async (_event, req) => {
  const {
    serverUrl,
    path: apiPath,
    method = "GET",
    token,
    body,
    timeout = 45000,
  } = req || {};

  let base = String(serverUrl || "").replace(/\/+$/, "");
  if (!/^https?:\/\//i.test(base)) {
    return { ok: false, status: 0, data: { error: "Server URL must start with http:// or https://" } };
  }

  const url = `${base}/api/desktop${apiPath}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    let data = null;
    const text = await res.text();
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { error: text?.slice(0, 300) || `HTTP ${res.status}` };
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
          : `Cannot reach server at ${base}`,
      },
    };
  } finally {
    clearTimeout(timer);
  }
});

ipcMain.handle("app:openExternal", async (_event, url) => {
  if (/^https?:\/\//i.test(String(url))) await shell.openExternal(String(url));
  return true;
});

ipcMain.handle("app:info", () => ({
  electron: process.versions.electron,
  node: process.versions.node,
  chrome: process.versions.chrome,
  appVersion: app.getVersion(),
  platform: process.platform,
}));

/* ------------------------------------------------------------------ */
/* App lifecycle                                                       */
/* ------------------------------------------------------------------ */

app.whenReady().then(() => {
  if (process.platform === "darwin") {
    // macOS routes clipboard/undo through the application menu — without
    // Edit roles Cmd+C/V/X/Z/A stop working. Keep ONLY these OS-standard
    // text-editing items; no browser items (reload, devtools, window mgmt).
    Menu.setApplicationMenu(
      Menu.buildFromTemplate([
        {
          label: app.name,
          submenu: [{ role: "about" }, { type: "separator" }, { role: "quit" }],
        },
        {
          label: "Edit",
          submenu: [
            { role: "undo" },
            { role: "redo" },
            { type: "separator" },
            { role: "cut" },
            { role: "copy" },
            { role: "paste" },
            { role: "selectAll" },
          ],
        },
      ])
    );
  } else {
    Menu.setApplicationMenu(null); // Windows/Linux: no menu at all
  }
  protocol.handle("atomcode", serveRenderer);
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
