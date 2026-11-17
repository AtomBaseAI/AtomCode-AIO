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

  info: () => ipcRenderer.invoke("app:info"),
});
