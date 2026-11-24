const { contextBridge, ipcRenderer } = require("electron");

/**
 * Secure bridge between the renderer and the main process.
 * The renderer never touches Node/Electron APIs directly.
 */
contextBridge.exposeInMainWorld("atomcode", {
  /**
   * Proxied fetch to the AtomCode backend.
   * req: { serverUrl, path, method?, token?, body?, timeout? }
   * res: { ok, status, data }
   */
  api: (req) => ipcRenderer.invoke("api:fetch", req),

  /**
   * Local Java execution via the bundled Doppio JVM (main process).
   * req: { code, input?, cases?: [{ input }], timeoutMs? }
   * res: { compileError, compileStderr, results: [{ output, stderr, exitCode, durationMs, timedOut? }] } | { fatal }
   */
  javaRun: (req) => ipcRenderer.invoke("java:run", req),

  openExternal: (url) => ipcRenderer.invoke("app:openExternal", url),

  /**
   * Fullscreen proctoring (assessment lockdown).
   * setFullscreen(true/false) — lock the window into fullscreen for the
   * duration of an assessment attempt and restore it afterwards.
   * onFullscreenChange(cb) — cb(true|false) fires whenever the window
   * enters/leaves fullscreen; leaving fullscreen mid-attempt counts as a
   * tab switch (mirrors the web app's fullscreen-enforced layout).
   */
  setFullscreen: (flag) => ipcRenderer.invoke("app:setFullscreen", flag),
  onFullscreenChange: (cb) => {
    const handler = (_event, fs) => cb(Boolean(fs));
    ipcRenderer.on("app:fullscreen", handler);
    return () => ipcRenderer.removeListener("app:fullscreen", handler);
  },

  /**
   * Startup pre-flight progress — cb({ stage, message, level?, installed? }).
   * The main process verifies bundled runtimes and auto-installs anything
   * missing (e.g. the local Java runtime) in the background.
   */
  onPreflight: (cb) => {
    const handler = (_event, payload) => cb(payload);
    ipcRenderer.on("app:preflight", handler);
    return () => ipcRenderer.removeListener("app:preflight", handler);
  },

  info: () => ipcRenderer.invoke("app:info"),
});
