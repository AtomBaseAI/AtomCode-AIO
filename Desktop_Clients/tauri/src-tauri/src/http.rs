//! Pure HTTP proxy for the renderer — no Tauri dependencies.
//!
//! 1:1 port of Electron `main.js` → `ipcMain.handle("api:fetch")`:
//!   - validates the server URL (http/https only)
//!   - prefixes the desktop API namespace (`/api/desktop`)
//!   - attaches the Bearer token + JSON headers
//!   - applies a per-request timeout (default 45s)
//!   - answers with the exact `{ ok, status, data }` contract the
//!     renderer (`app.js → api()`) expects, where network failures are
//!     reported as `{ ok: false, status: 0, data: { error } }`.
//!
//! Keeping this logic free of Tauri types makes it unit-checkable and
//! testable on its own (`lib.rs` wraps it in a thin `#[tauri::command]`).

use std::sync::OnceLock;
use std::time::Duration;

use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

/// Renderer request — camelCase keys, identical to the Electron preload
/// contract (`window.atomcode.api({ serverUrl, path, method?, token?, body?, timeout? })`).
#[derive(Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct ApiFetchRequest {
    #[serde(default)]
    pub server_url: Option<String>,
    #[serde(default)]
    pub path: Option<String>,
    #[serde(default)]
    pub method: Option<String>,
    #[serde(default)]
    pub token: Option<String>,
    #[serde(default)]
    pub body: Option<Value>,
    #[serde(default)]
    pub timeout: Option<u64>,
}

/// Renderer response — `{ ok, status, data }` exactly like the Electron
/// main process returned to the renderer.
#[derive(Serialize, Debug)]
pub struct ApiFetchResponse {
    pub ok: bool,
    pub status: u16,
    pub data: Value,
}

const DEFAULT_TIMEOUT_MS: u64 = 45_000;
const MIN_TIMEOUT_MS: u64 = 1_000;
const MAX_TIMEOUT_MS: u64 = 300_000;
/// Client-level ceiling — individual requests still override it lower.
const CLIENT_TIMEOUT_MS: u64 = 310_000;

fn client() -> &'static reqwest::Client {
    static CLIENT: OnceLock<reqwest::Client> = OnceLock::new();
    CLIENT.get_or_init(|| {
        reqwest::Client::builder()
            .user_agent(concat!("AtomCodeStudent-Tauri/", env!("CARGO_PKG_VERSION")))
            .connect_timeout(Duration::from_secs(15))
            .timeout(Duration::from_millis(CLIENT_TIMEOUT_MS))
            .build()
            .expect("AtomCode: failed to build the HTTP client")
    })
}

fn fail_response(error: impl Into<String>) -> ApiFetchResponse {
    ApiFetchResponse {
        ok: false,
        status: 0,
        data: json!({ "error": error.into() }),
    }
}

fn network_failure(base: &str, err: &reqwest::Error) -> ApiFetchResponse {
    if err.is_timeout() {
        fail_response("Request timed out — is the AtomCode server running?")
    } else {
        fail_response(format!("Cannot reach server at {base}"))
    }
}

pub async fn api_fetch_impl(request: ApiFetchRequest) -> ApiFetchResponse {
    let base = request
        .server_url
        .unwrap_or_default()
        .trim()
        .trim_end_matches('/')
        .to_string();

    if !(base.starts_with("http://") || base.starts_with("https://")) {
        return fail_response("Server URL must start with http:// or https://");
    }

    let path = request.path.unwrap_or_default();
    // The desktop API is a plain path namespace — reject anything that
    // tries to escape it (queries/fragments), matching the Electron build.
    if !path.starts_with('/') || path.contains('?') || path.contains('#') {
        return fail_response("Invalid API path");
    }
    let url = format!("{base}/api/desktop{path}");

    let raw_method = request
        .method
        .unwrap_or_else(|| "GET".to_string())
        .to_uppercase();
    let method = match reqwest::Method::from_bytes(raw_method.as_bytes()) {
        Ok(m) => m,
        Err(_) => return fail_response("Invalid HTTP method"),
    };

    let timeout_ms = request
        .timeout
        .unwrap_or(DEFAULT_TIMEOUT_MS)
        .clamp(MIN_TIMEOUT_MS, MAX_TIMEOUT_MS);

    let mut request_builder = client()
        .request(method.clone(), &url)
        .timeout(Duration::from_millis(timeout_ms))
        .header(reqwest::header::CONTENT_TYPE, "application/json");

    if let Some(token) = request
        .token
        .as_deref()
        .map(str::trim)
        .filter(|t| !t.is_empty())
    {
        request_builder = request_builder.bearer_auth(token);
    }
    if let Some(body) = &request.body {
        request_builder = request_builder.json(body);
    }

    match request_builder.send().await {
        Ok(res) => {
            let status = res.status().as_u16();
            let text = res.text().await.unwrap_or_default();
            let data = if text.trim().is_empty() {
                Value::Null
            } else {
                serde_json::from_str::<Value>(&text).unwrap_or_else(|_| {
                    json!({
                        "error": text.chars().take(300).collect::<String>()
                    })
                })
            };
            ApiFetchResponse {
                ok: (200..300).contains(&status),
                status,
                data,
            }
        }
        Err(err) => network_failure(&base, &err),
    }
}
