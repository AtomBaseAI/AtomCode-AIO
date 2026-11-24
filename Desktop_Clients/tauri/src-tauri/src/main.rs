#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

/* AtomCode Student — Tauri edition (port of the ElectronJS main process).
 *
 * Lives in `tauri/` and recreates `elcetron/` (the ElectronJS desktop
 * student client). Architecture mirrors elcetron/main.js 1:1:
 *
 *   Electron                          Tauri (this crate)
 *   ───────────────────────────────  ─────────────────────────────────────
 *   atomcode://renderer/<path> custom • embedded loopback HTTP server
 *   protocol (privileged)             • PLUS the same atomcode:// scheme
 *                                       registered via Tauri's URI-scheme
 *                                       handler (ATOMCODE_UI=atomcode)
 *   ipcMain "api:fetch"               #[tauri::command] api_fetch (http.rs)
 *   ipcMain "java:run"                #[tauri::command] java_run (Doppio)
 *   ipcMain "app:setFullscreen"       #[tauri::command] set_fullscreen
 *   ipcMain "app:openExternal"        #[tauri::command] open_external
 *   ipcMain "app:info"                #[tauri::command] app_info
 *   webContents.send "app:fullscreen" "app:fullscreen" event (watcher)
 *   webContents.send "app:preflight"  "app:preflight" event (preflight)
 *
 * The renderer (engine + workers + language runtimes) is served from one
 * directory resolved as:
 *   1. $ATOMCODE_RENDERER_ROOT        (dev override)
 *   2. <resources>/renderer           (packaged build)
 *   3. ../../elcetron/renderer        (repo checkout — zero-copy dev)
 *   4. ../ui                          (bundled UI copy)
 *
 * The `ui/` directory (bridge.js + patched engine) always shadows the
 * Electron originals where both exist.
 *
 * Why a loopback HTTP server (default UI surface)? WebKitGTK treats
 * custom URI schemes inconsistently for ES-module Workers; serving the
 * renderer from http://127.0.0.1:<ephemeral> gives web-parity behavior
 * for Workers, dynamic import() and streaming WASM — the same reasoning
 * behind the Electron build's own dev mode. The atomcode:// scheme
 * handler is still registered (ATOMCODE_UI=atomcode) for parity work.
 */

use std::borrow::Cow;
use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};
use std::path::{Path, PathBuf};
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;

use serde_json::{json, Value};
use tauri::http::{Request, Response};
use tauri::path::BaseDirectory;
use tauri::{AppHandle, Emitter, Manager, WebviewUrl, WebviewWindowBuilder};

mod http;
use http::{api_fetch_impl, ApiFetchRequest, ApiFetchResponse};

/* ==================================================================== */
/* MIME table — identical to elcetron/main.js                            */
/* ==================================================================== */

fn mime_for(ext: &str) -> &'static str {
    match ext {
        ".html" => "text/html; charset=utf-8",
        ".js" => "text/javascript; charset=utf-8",
        ".mjs" => "text/javascript; charset=utf-8",
        ".css" => "text/css; charset=utf-8",
        ".json" => "application/json; charset=utf-8",
        ".map" => "application/json; charset=utf-8",
        ".wasm" => "application/wasm",
        ".svg" => "image/svg+xml",
        ".png" => "image/png",
        ".jpg" => "image/jpeg",
        ".jpeg" => "image/jpeg",
        ".gif" => "image/gif",
        ".ico" => "image/x-icon",
        ".ttf" => "font/ttf",
        ".otf" => "font/otf",
        ".woff" => "font/woff",
        ".woff2" => "font/woff2",
        ".txt" => "text/plain; charset=utf-8",
        ".md" => "text/plain; charset=utf-8",
        ".tar" => "application/x-tar",
        ".zip" => "application/zip",
        _ => "application/octet-stream",
    }
}

/* ==================================================================== */
/* Path safety + file serving (shared by HTTP server and atomcode://)    */
/* ==================================================================== */

/// Percent-decode a URL path component.
fn percent_decode(input: &str) -> String {
    let bytes = input.as_bytes();
    let mut out = Vec::with_capacity(bytes.len());
    let mut i = 0;
    while i < bytes.len() {
        if bytes[i] == b'%' && i + 2 < bytes.len() {
            let hex = &input[i + 1..i + 3];
            if let Ok(v) = u8::from_str_radix(hex, 16) {
                out.push(v);
                i += 3;
                continue;
            }
        }
        out.push(bytes[i]);
        i += 1;
    }
    String::from_utf8_lossy(&out).into_owned()
}

/// Normalize a URL path relative to the renderer root. Rejects anything
/// escaping the root (`..` segments, absolute escapes) — the same
/// containment rule the Electron protocol handler applies.
fn normalize_url_path(raw: &str) -> Option<String> {
    let decoded = percent_decode(raw);
    let mut segments: Vec<&str> = Vec::new();
    for seg in decoded.split('/') {
        match seg {
            "" | "." => {}
            ".." => {
                segments.pop()?; // escaping the root → forbidden
            }
            other => segments.push(other),
        }
    }
    let mut rel = segments.join("/");
    if rel.is_empty() {
        rel = "index.html".to_string();
    }
    Some(rel)
}

/// Read `<primary>/<rel>` falling back to `<fallback>/<rel>` and return
/// (status, content-type, body). The primary root is the Tauri `ui/` dir
/// (bridge.js + patched engine); the fallback is the full renderer root
/// with the heavy language runtimes.
fn serve_file(
    root: &Path,
    fallback: Option<&Path>,
    raw_path: &str,
) -> (u16, &'static str, Vec<u8>) {
    let rel = match normalize_url_path(raw_path) {
        Some(r) => r,
        None => return (403, "text/plain; charset=utf-8", b"Forbidden".to_vec()),
    };

    let mut candidates: Vec<PathBuf> = Vec::new();
    // Primary (Tauri ui/) first — it shadows the Electron originals.
    candidates.push(root.join(&rel));
    if let Some(fb) = fallback {
        candidates.push(fb.join(&rel));
    }

    for file_path in &candidates {
        // Belt & braces: the resolved file must live inside one of the roots.
        let inside_root = file_path.starts_with(root);
        let inside_fallback = fallback.map_or(false, |fb| file_path.starts_with(fb));
        if !inside_root && !inside_fallback {
            continue;
        }
        if let Ok(buf) = std::fs::read(file_path) {
            let ext = file_path
                .extension()
                .map(|e| format!(".{}", e.to_string_lossy().to_lowercase()))
                .unwrap_or_default();
            let mime = mime_for(&ext);
            return (200, mime, buf);
        }
    }

    if candidates.iter().any(|p| p.exists()) {
        return (500, "text/plain; charset=utf-8", b"Internal error".to_vec());
    }
    (404, "text/plain; charset=utf-8", b"Not found".to_vec())
}

/* ==================================================================== */
/* Embedded loopback HTTP server — web-parity origin for the renderer    */
/* ==================================================================== */

fn start_static_server_on(listener: TcpListener, primary: PathBuf, fallback: PathBuf) {
    thread::spawn(move || {
        for stream in listener.incoming() {
            match stream {
                Ok(stream) => {
                    let primary = primary.clone();
                    let fallback = fallback.clone();
                    thread::spawn(move || handle_http_conn(stream, &primary, &fallback));
                }
                Err(_) => continue,
            }
        }
    });
}

fn handle_http_conn(mut stream: TcpStream, primary: &Path, fallback: &Path) {
    let mut buf = Vec::with_capacity(4096);
    let mut chunk = [0u8; 4096];
    // Read until end of request headers.
    loop {
        match stream.read(&mut chunk) {
            Ok(0) => break,
            Ok(n) => {
                buf.extend_from_slice(&chunk[..n]);
                if buf.windows(4).any(|w| w == b"\r\n\r\n") || buf.len() > 64 * 1024 {
                    break;
                }
            }
            Err(_) => break,
        }
    }
    let text = String::from_utf8_lossy(&buf);
    let mut lines = text.lines();
    let request_line = lines.next().unwrap_or_default();
    let mut parts = request_line.split_whitespace();
    let method = parts.next().unwrap_or("GET").to_uppercase();
    let target = parts.next().unwrap_or("/").to_string();
    let raw_path = target.split('?').next().unwrap_or("/");

    let head_only = method == "HEAD";
    let (status, mime, body) = serve_file(primary, Some(fallback), raw_path);
    println!(
        "[http] {} {} -> {} ({}, {} bytes)",
        method,
        raw_path,
        status,
        mime,
        body.len()
    );
    let status_text = match status {
        200 => "OK",
        403 => "Forbidden",
        404 => "Not Found",
        _ => "Internal Server Error",
    };
    let mut resp = format!(
        "HTTP/1.1 {} {}\r\nContent-Type: {}\r\nContent-Length: {}\r\nCache-Control: no-cache\r\nAccess-Control-Allow-Origin: *\r\nConnection: close\r\n\r\n",
        status, status_text, mime, body.len()
    )
    .into_bytes();
    if !head_only {
        resp.extend_from_slice(&body);
    }
    let _ = stream.write_all(&resp);
    let _ = stream.flush();
}

/* ==================================================================== */
/* Managed state                                                         */
/* ==================================================================== */

struct AppState {
    /// Tauri-specific renderer files (bridge.js, patched engine). Served
    /// first so they shadow the Electron originals where both exist.
    ui_root: PathBuf,
    /// Full renderer root (engine + workers + language runtimes).
    renderer_root: PathBuf,
    java_runner: Option<PathBuf>,
}

/* ==================================================================== */
/* IPC: ui_log — renderer-side diagnostics surfaced on stdout            */
/* ==================================================================== */

#[tauri::command]
fn ui_log(level: String, message: String) -> bool {
    println!("[ui:{}] {}", level, message);
    true
}

/* ==================================================================== */
/* IPC: api_fetch — proxied HTTP for the renderer (CORS-free, native)    */
/* ==================================================================== */

/// Thin command wrapper around the pure `http.rs` implementation —
/// same `{ ok, status, data }` contract as the Electron main process.
#[tauri::command]
async fn api_fetch(request: ApiFetchRequest) -> ApiFetchResponse {
    let outcome = api_fetch_impl(request).await;
    println!("[api_fetch] status={} ok={}", outcome.status, outcome.ok);
    outcome
}

/* ==================================================================== */
/* IPC: java_run — bundled Doppio JVM driven through node (as Electron)  */
/* ==================================================================== */

#[tauri::command]
fn java_run(state: tauri::State<AppState>, req: Value) -> Value {
    let Some(runner) = state.java_runner.clone() else {
        return json!({"fatal": "The local Java runtime is not available in this build."});
    };
    if !runner.exists() {
        return json!({"fatal": "The local Java runtime is not available in this build."});
    }

    let node = std::env::var("ATOMCODE_NODE").unwrap_or_else(|_| "node".to_string());
    let code = req
        .get("code")
        .and_then(Value::as_str)
        .unwrap_or_default()
        .to_string();
    let timeout_ms = req
        .get("timeoutMs")
        .and_then(Value::as_u64)
        .unwrap_or(120_000);
    // compile (up to timeoutMs) + one run per case — generous overall cap.
    let overall = Duration::from_millis(timeout_ms.clamp(5_000, 300_000) + 60_000);

    let cases: Vec<Value> = match req.get("cases").and_then(Value::as_array) {
        Some(list) if !list.is_empty() => list
            .iter()
            .map(|c| json!({"input": c.get("input").and_then(Value::as_str).unwrap_or("")}))
            .collect(),
        _ => vec![json!({"input": req.get("input").and_then(Value::as_str).unwrap_or("")})],
    };

    let job = json!({"code": code, "cases": cases, "timeoutMs": timeout_ms});

    let child = std::process::Command::new(&node)
        .arg(&runner)
        .stdin(std::process::Stdio::piped())
        .stdout(std::process::Stdio::piped())
        .stderr(std::process::Stdio::piped())
        .spawn();
    let mut child = match child {
        Ok(c) => c,
        Err(err) => return json!({"fatal": format!("Could not start the Java runtime: {}", err)}),
    };

    // Feed stdin from a dedicated thread (pipe would otherwise deadlock).
    let job_str = job.to_string();
    if let Some(mut stdin) = child.stdin.take() {
        thread::spawn(move || {
            let _ = stdin.write_all(job_str.as_bytes());
            let _ = stdin.flush();
        });
    }

    let stdout = child
        .stdout
        .take()
        .map(|s| thread::spawn(move || read_to_end(s)));
    let stderr = child
        .stderr
        .take()
        .map(|s| thread::spawn(move || read_to_end(s)));

    let shared = Arc::new(Mutex::new(child));
    let watchdog = shared.clone();
    thread::spawn(move || {
        thread::sleep(overall);
        if let Ok(mut c) = watchdog.lock() {
            let _ = c.kill();
        }
    });

    let wait_result = shared.lock().map(|mut c| c.wait());
    drop(wait_result);

    let out = stdout
        .and_then(|h| h.join().unwrap_or_default())
        .unwrap_or_default();
    let errbuf = stderr
        .and_then(|h| h.join().unwrap_or_default())
        .unwrap_or_default();

    match serde_json::from_str::<Value>(out.trim()) {
        Ok(value) => value,
        Err(_) => json!({"fatal": errbuf.chars().take(500).collect::<String>()}),
    }
}

fn read_to_end<R: Read + Send + 'static>(mut reader: R) -> Option<String> {
    let mut buf = String::new();
    match reader.read_to_string(&mut buf) {
        Ok(_) => Some(buf),
        Err(_) => None,
    }
}

/* ==================================================================== */
/* IPC: fullscreen proctoring                                            */
/* ==================================================================== */

#[tauri::command]
fn set_fullscreen(window: tauri::WebviewWindow, flag: bool) -> bool {
    window.set_fullscreen(flag).is_ok()
}

/// Poll fullscreen state and push `app:fullscreen` events to the renderer —
/// the assessment view counts a fullscreen exit as a tab switch
/// (web-parity proctoring, mirrors the Electron enter/leave handlers).
fn watch_fullscreen(app: AppHandle) {
    thread::spawn(move || {
        let last = Arc::new(AtomicBool::new(false));
        let mut primed = false;
        loop {
            thread::sleep(Duration::from_millis(250));
            let Some(window) = app.get_webview_window("main") else {
                continue;
            };
            let current = window.is_fullscreen().unwrap_or(false);
            if !primed {
                primed = true;
                last.store(current, Ordering::SeqCst);
                continue;
            }
            if last.swap(current, Ordering::SeqCst) != current {
                let _ = app.emit("app:fullscreen", current);
            }
        }
    });
}

/* ==================================================================== */
/* IPC: open_external                                                    */
/* ==================================================================== */

#[tauri::command]
fn open_external(url: String) -> bool {
    if !url.starts_with("http://") && !url.starts_with("https://") {
        return false;
    }
    #[cfg(target_os = "linux")]
    let result = std::process::Command::new("xdg-open").arg(&url).spawn();
    #[cfg(target_os = "macos")]
    let result = std::process::Command::new("open").arg(&url).spawn();
    #[cfg(target_os = "windows")]
    let result = std::process::Command::new("cmd")
        .args(["/c", "start", "", &url])
        .spawn();
    result.is_ok()
}

/* ==================================================================== */
/* IPC: app_info                                                         */
/* ==================================================================== */

#[tauri::command]
fn app_info(app: AppHandle) -> Value {
    let pkg = app.package_info();
    json!({
        "appVersion": pkg.version.to_string(),
        "tauri": tauri::VERSION,
        "webview": wk_version(),
        "electron": Value::Null,
        "chrome": Value::Null,
        "node": Value::Null,
        "os": std::env::consts::OS,
        "arch": std::env::consts::ARCH,
        "platform": format!("{} ({})", std::env::consts::OS, std::env::consts::ARCH),
    })
}

fn wk_version() -> String {
    // Best-effort WebKitGTK version reporting (Linux).
    if let Ok(out) = std::process::Command::new("pkg-config")
        .args(["--modversion", "webkit2gtk-4.1"])
        .env(
            "PKG_CONFIG_PATH",
            std::env::var("PKG_CONFIG_PATH").unwrap_or_default(),
        )
        .output()
    {
        if out.status.success() {
            return format!("WebKitGTK {}", String::from_utf8_lossy(&out.stdout).trim());
        }
    }
    String::from("WebKitGTK")
}

/* ==================================================================== */
/* Runtime root resolution                                               */
/* ==================================================================== */

/// Walk up from the executable location (max 8 levels) looking for the
/// project layout: `tauri/ui/index.html` (the Tauri UI copy) and
/// `elcetron/renderer` (the Electron renderer with the heavy runtimes).
/// Returns (ui_root, renderer_root) for whichever were found.
fn find_project_roots() -> (Option<PathBuf>, Option<PathBuf>) {
    let mut ui_root: Option<PathBuf> = None;
    let mut renderer_root: Option<PathBuf> = None;

    let start = std::env::current_exe()
        .ok()
        .and_then(|exe| exe.parent().map(|p| p.to_path_buf()));
    let Some(mut dir) = start else {
        return (None, None);
    };

    for _ in 0..8 {
        if ui_root.is_none() && dir.join("ui").join("index.html").is_file() {
            ui_root = Some(dir.join("ui"));
        }
        if renderer_root.is_none() && dir.join("elcetron").join("renderer").is_dir() {
            renderer_root = Some(dir.join("elcetron").join("renderer"));
        }
        if ui_root.is_some() && renderer_root.is_some() {
            break;
        }
        if !dir.pop() {
            break;
        }
    }
    (ui_root, renderer_root)
}

fn resolve_renderer_root(app: &AppHandle) -> PathBuf {
    // 1. explicit dev override
    if let Ok(p) = std::env::var("ATOMCODE_RENDERER_ROOT") {
        let p = PathBuf::from(p);
        if p.is_dir() {
            return p;
        }
    }
    // 2. packaged resource (bundle.resources ships the renderer dir).
    //    Resources staged by scripts/prepare-bundle.mjs land either at
    //    <resource>/renderer (glob base) or <resource>/resources/renderer
    //    (src-tauri-relative path) depending on the bundler mapping —
    //    accept both.
    for candidate in ["renderer", "resources/renderer"] {
        if let Ok(res) = app.path().resolve(candidate, BaseDirectory::Resource) {
            if res.join("runtimes").is_dir() {
                return res;
            }
        }
    }
    // 3. sibling Electron checkout relative to the cargo manifest (dev)
    if let Ok(manifest) = std::env::var("CARGO_MANIFEST_DIR") {
        let candidate = PathBuf::from(&manifest).join("../../elcetron/renderer");
        if candidate.is_dir() {
            return candidate.canonicalize().unwrap_or(candidate);
        }
    }
    // 4. walk up from the executable (works for a directly-run binary)
    if let (_, Some(renderer)) = find_project_roots() {
        return renderer.canonicalize().unwrap_or(renderer);
    }
    // 5. the bundled UI copy next to the manifest
    if let Ok(manifest) = std::env::var("CARGO_MANIFEST_DIR") {
        let candidate = PathBuf::from(&manifest).join("../ui");
        if candidate.is_dir() {
            return candidate.canonicalize().unwrap_or(candidate);
        }
    }
    PathBuf::from(".")
}

/// Resolve the Tauri-specific UI directory (bridge.js + patched engine).
/// Order: $ATOMCODE_UI_ROOT → packaged resource → cargo manifest ../ui →
/// executable walk-up.
fn resolve_ui_root(app: &AppHandle) -> PathBuf {
    if let Ok(p) = std::env::var("ATOMCODE_UI_ROOT") {
        let p = PathBuf::from(p);
        if p.is_dir() {
            return p;
        }
    }
    // Packaged resource — staged by scripts/prepare-bundle.mjs (accept both
    // bundler mappings: <resource>/ui and <resource>/resources/ui).
    for candidate in ["ui", "resources/ui"] {
        if let Ok(res) = app.path().resolve(candidate, BaseDirectory::Resource) {
            if res.join("index.html").is_file() {
                return res;
            }
        }
    }
    if let Ok(manifest) = std::env::var("CARGO_MANIFEST_DIR") {
        let candidate = PathBuf::from(&manifest).join("../ui");
        if candidate.is_dir() {
            return candidate.canonicalize().unwrap_or(candidate);
        }
    }
    if let (Some(ui), _) = find_project_roots() {
        return ui.canonicalize().unwrap_or(ui);
    }
    PathBuf::from(".")
}

fn resolve_java_runner(app: &AppHandle) -> Option<PathBuf> {
    if let Ok(p) = std::env::var("ATOMCODE_JAVA_RUNTIME") {
        let runner = PathBuf::from(p).join("runner.js");
        if runner.exists() {
            return Some(runner);
        }
    }
    // Packaged resource (accept both bundler mappings).
    for candidate in ["java-runtime/runner.js", "resources/java-runtime/runner.js"] {
        if let Ok(res) = app.path().resolve(candidate, BaseDirectory::Resource) {
            if res.is_file() {
                return Some(res);
            }
        }
    }
    if let Ok(manifest) = std::env::var("CARGO_MANIFEST_DIR") {
        let candidate = PathBuf::from(&manifest).join("../../elcetron/java-runtime/runner.js");
        if candidate.exists() {
            return Some(candidate.canonicalize().unwrap_or(candidate));
        }
        let candidate = PathBuf::from(&manifest).join("resources/java-runtime/runner.js");
        if candidate.exists() {
            return Some(candidate);
        }
    }
    // Walk up from the executable (works for a directly-run binary).
    if let Ok(mut dir) = std::env::current_exe() {
        if dir.pop() {
            for _ in 0..8 {
                let candidate = dir.join("elcetron/java-runtime/runner.js");
                if candidate.is_file() {
                    return Some(candidate.canonicalize().unwrap_or(candidate));
                }
                let candidate = dir.join("java-runtime/runner.js");
                if candidate.is_file() {
                    return Some(candidate.canonicalize().unwrap_or(candidate));
                }
                if !dir.pop() {
                    break;
                }
            }
        }
    }
    None
}

/* ==================================================================== */
/* Startup preflight — verify bundled runtimes (mirrors main.js)         */
/* ==================================================================== */

const RENDERER_REQUIRED: &[&str] = &[
    "engine/atom-engine.js",
    "workers/python.worker.js",
    "workers/sqlite.worker.js",
    "workers/javascript.worker.js",
    "workers/typescript.worker.js",
    "workers/ruby.worker.js",
    "workers/clang.worker.js",
    "runtimes/pyodide/0.26.4/pyodide.js",
    "runtimes/sqlite-wasm/sqlite3.wasm",
    "runtimes/ruby/3.4/ruby+stdlib.wasm",
];

fn run_preflight(app: AppHandle, root: PathBuf, java_runner: Option<PathBuf>) {
    // Give the webview a moment to attach its event listeners — the
    // preflight is informational, so losing the first events to the
    // page-load race would leave the banner stuck on screen.
    thread::sleep(Duration::from_millis(1500));
    let send = move |payload: Value| {
        let _ = app.emit("app:preflight", payload);
    };

    send(json!({"stage": "start", "message": "Checking local runtimes…"}));

    let missing: Vec<&str> = RENDERER_REQUIRED
        .iter()
        .copied()
        .filter(|rel| !root.join(rel).exists())
        .collect();

    if !missing.is_empty() {
        send(json!({
            "stage": "renderer",
            "level": "error",
            "message": format!("Bundled runtime files are missing: {}", missing.join(", "))
        }));
        return;
    }
    send(json!({"stage": "renderer", "message": "Bundled runtimes verified"}));

    let java_ok = java_runner.map(|runner| runner.exists()).unwrap_or(false);
    if java_ok {
        send(json!({"stage": "java", "message": "Local Java runtime ready"}));
    } else {
        send(json!({
            "stage": "java",
            "message": "Local Java runtime not installed — Java questions will be judged by the server instead."
        }));
    }

    send(json!({"stage": "done", "installed": false, "message": "All runtimes ready"}));
}

/* ==================================================================== */
/* App bootstrap                                                         */
/* ==================================================================== */

fn main() {
    let ui_mode = std::env::var("ATOMCODE_UI").unwrap_or_default(); // "" | "atomcode"

    tauri::Builder::default()
        .register_uri_scheme_protocol("atomcode", |ctx, request: Request<Vec<u8>>| {
            // atomcode://renderer/<path> → file under ui/ with fallback
            // to the full renderer root (runtimes).
            let state = ctx.app_handle().state::<AppState>();
            let path = request.uri().path().to_string();
            let (status, mime, body) =
                serve_file(&state.ui_root, Some(&state.renderer_root), &path);
            Response::builder()
                .status(status)
                .header("Content-Type", mime)
                .header("Access-Control-Allow-Origin", "*")
                .body(Cow::Owned(body))
                .expect("static response")
        })
        .invoke_handler(tauri::generate_handler![
            api_fetch,
            java_run,
            set_fullscreen,
            open_external,
            app_info,
            ui_log
        ])
        .setup(move |app| {
            let renderer_root = resolve_renderer_root(app.handle());
            let ui_root = resolve_ui_root(app.handle());
            let java_runner = resolve_java_runner(app.handle());
            println!(
                "[atomcode] ui root (bridge + patched engine): {}",
                ui_root.display()
            );
            println!("[atomcode] renderer root: {}", renderer_root.display());
            println!(
                "[atomcode] java runner: {}",
                java_runner
                    .as_ref()
                    .map(|p| p.display().to_string())
                    .unwrap_or_else(|| "not installed (Java degrades gracefully)".into())
            );

            app.manage(AppState {
                ui_root: ui_root.clone(),
                renderer_root: renderer_root.clone(),
                java_runner,
            });

            // Loopback origin for the renderer (worker/wasm parity).
            // $ATOMCODE_PORT pins the port (stable origin → localStorage
            // persists across runs); default is an ephemeral port.
            let bind_port: Option<u16> = std::env::var("ATOMCODE_PORT")
                .ok()
                .map(|p| p.trim().to_string())
                .filter(|p| !p.is_empty())
                .and_then(|p| p.parse().ok());
            let listener = TcpListener::bind(("127.0.0.1", bind_port.unwrap_or(0)))
                .map_err(|e| format!("cannot bind the loopback server: {e}"))?;
            let port = listener.local_addr().map_err(|e| e.to_string())?.port();
            start_static_server_on(listener, ui_root.clone(), renderer_root.clone());
            println!("[atomcode] loopback origin: http://127.0.0.1:{}", port);

            let url: tauri::Url = if ui_mode == "atomcode" {
                "atomcode://renderer/index.html".parse()?
            } else {
                format!("http://127.0.0.1:{}/index.html", port).parse()?
            };

            WebviewWindowBuilder::new(app, "main", WebviewUrl::External(url))
                .title("AtomCode Student")
                .inner_size(1400.0, 900.0)
                .min_inner_size(1080.0, 700.0)
                .resizable(true)
                .visible(true)
                .build()?;

            // Fullscreen proctoring watcher (never blocks startup).
            watch_fullscreen(app.handle().clone());

            // Background pre-flight: verify bundled runtimes & report.
            let handle = app.handle().clone();
            let preflight_root = renderer_root.clone();
            let preflight_java = resolve_java_runner(app.handle());
            thread::spawn(move || run_preflight(handle, preflight_root, preflight_java));

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running AtomCode Student");
}
