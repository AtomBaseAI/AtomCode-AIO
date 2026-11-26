#!/usr/bin/env node
/**
 * preview-server.mjs — static server for the Tauri frontend (tauri/ui).
 *
 * Serves the exact same asset tree the Tauri webview loads (index.html,
 * bridge.js, engine/, workers/, runtimes/ with correct WASM MIME types),
 * so the full student client can be exercised in a plain browser:
 *
 *     bun run preview        # or: node scripts/preview-server.mjs
 *     # → http://localhost:3020
 *
 * `tauri dev` uses this server as the devUrl (beforeDevCommand in
 * tauri.conf.json) — the Tauri CLI polls the URL, then launches the
 * Rust shell against it.
 *
 * API traffic is NOT proxied: the renderer's browser-mode bridge
 * (ui/bridge.js) fetches `${serverUrl}/api/desktop/*` directly and the
 * desktop API routes answer with permissive CORS headers — the same
 * server-address flow the desktop login screen uses.
 */

import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const PORT = Number(process.env.PREVIEW_PORT || 3020);
const HOST = process.env.PREVIEW_HOST || "0.0.0.0";
const UI_ROOT = resolve(fileURLToPath(new URL(".", import.meta.url)), "..", "ui");
// Fallback root — mirrors the Rust loopback server resolution: the Tauri
// ui/ directory (bridge.js + patched engine) shadows the Electron
// originals; the heavy language runtimes stay canonical in elcetron/.
const FALLBACK_ROOT = resolve(
  fileURLToPath(new URL(".", import.meta.url)),
  "..",
  "..",
  "elcetron",
  "renderer"
);

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
  ".zip": "application/zip",
  ".tar": "application/x-tar",
  ".jar": "application/java-archive",
};

function sendText(res, status, text) {
  res.writeHead(status, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(text);
}

const server = createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    return sendText(res, 400, "Bad request");
  }

  // Directory-style path (or root) → the app shell. All asset references
  // in index.html are relative, so sub-path mounts keep working too.
  if (pathname === "/" || pathname.endsWith("/")) pathname += "index.html";

  // Same resolution as the Rust loopback server: ui/ first (bridge.js +
  // patched engine shadow the Electron originals), then the full
  // renderer root with the heavy language runtimes.
  const rel = normalize(pathname).replace(/^([/\\])+/, "");
  const candidates = [join(UI_ROOT, rel), join(FALLBACK_ROOT, rel)];
  const filePath = candidates.find(
    (p) =>
      (p.startsWith(UI_ROOT) || p.startsWith(FALLBACK_ROOT)) &&
      existsSync(p) &&
      statSync(p).isFile()
  );

  if (!filePath) {
    return sendText(res, 404, "Not found");
  }

  const size = statSync(filePath).size;
  const type =
    MIME_TYPES[extname(filePath).toLowerCase()] || "application/octet-stream";

  if (req.method === "HEAD") {
    res.writeHead(200, { "Content-Type": type, "Content-Length": size, "Cache-Control": "no-store" });
    return res.end();
  }

  res.writeHead(200, { "Content-Type": type, "Content-Length": size, "Cache-Control": "no-store" });
  const stream = createReadStream(filePath);
  stream.pipe(res);
  stream.on("error", () => res.destroy());
});

server.listen(PORT, HOST, () => {
  console.log(`[preview] AtomCode Student UI → http://localhost:${PORT}`);
  console.log(`[preview] serving ${UI_ROOT}`);
});
