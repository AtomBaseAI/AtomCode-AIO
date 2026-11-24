/**
 * AtomCode — local Lambda compiler emulator (mini-service, port 3030).
 *
 * Serves the REAL Lambda handler (compilers/functions/_shared/handler.mjs)
 * over HTTP with the exact AWS Lambda Function URL event/response shapes —
 * so the app's /api/execute/lambda route can be tested end-to-end without
 * an AWS account.
 *
 * Wire the app to it via .env:
 *   LAMBDA_JUDGE_URL=http://127.0.0.1:3030
 *
 * NOTE: the same handler file runs inside every deployed Lambda image —
 * whatever passes here behaves identically on AWS.
 *
 * ── SECURITY ─────────────────────────────────────────────────────────────
 * This service executes arbitrary code — it is DEV-ONLY and must never be
 * exposed. Hardening:
 *   - shared-secret auth on EVERY request except GET /health:
 *       header `x-atom-token: <token>` compared in constant time;
 *       token comes from ATOM_TOKEN (root .env — the package.json dev
 *       script loads it via `bun --env-file=../../.env`). When missing, a
 *       random token is generated at boot and persisted to ./.token — keep
 *       that file out of git (gitignore owner: add `*.token`).
 *   - binds 127.0.0.1 ONLY — never 0.0.0.0;
 *   - no CORS headers at all (the app calls this server-to-server); any
 *     request carrying a cross-host Origin header is rejected 403;
 *   - request bodies are capped (memory guard).
 */

import { createServer } from "node:http";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import handler from "../../compilers/functions/_shared/handler.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.ATOM_DROP_PRIVILEGES = "off"; // local user is unprivileged
process.env.ATOM_ULIMITS = "off"; // shared sandbox host — rlimits would break fork()

// Local toolchain augmentation (sandbox only — the real Lambda images carry
// their own toolchains). Prepend portable JDK / Ruby when present so every
// language can be exercised locally; missing dirs are silently skipped.
const LOCAL_TOOLCHAIN_DIRS = ["/tmp/jdk-21.0.13+9/bin", "/tmp/ruby-bin"];
for (const dir of LOCAL_TOOLCHAIN_DIRS) {
  if (existsSync(dir)) process.env.PATH = `${dir}:${process.env.PATH}`;
}

const PORT = 3030;
const MAX_BODY_BYTES = 2_000_000; // mirrors the app proxy's ~1.5M-char cap

/* ───────────────────────────── auth token ─────────────────────────────── */

let AUTH_TOKEN = process.env.ATOM_TOKEN || "";
if (!AUTH_TOKEN) {
  // No ATOM_TOKEN in the environment — fail SAFE with a boot-generated
  // random secret persisted next to this file so the operator can retrieve
  // it. (Write it into .gitignore / never commit it.)
  const tokenFile = path.join(__dirname, ".token");
  try {
    AUTH_TOKEN = readFileSync(tokenFile, "utf8").trim();
  } catch {
    AUTH_TOKEN = "";
  }
  if (!AUTH_TOKEN) {
    AUTH_TOKEN = randomBytes(32).toString("hex");
    try {
      mkdirSync(__dirname, { recursive: true });
      writeFileSync(tokenFile, `${AUTH_TOKEN}\n`, { mode: 0o600 });
      console.warn(
        "┌─ WARNING ───────────────────────────────────────────────────────┐\n" +
          "│ ATOM_TOKEN not set — generated a random boot token and stored   │\n" +
          "│ it at mini-services/lambda-emulator/.token (mode 0600).         │\n" +
          "│ Keep that file OUT of git and share it only with the app .env.  │\n" +
          "└─────────────────────────────────────────────────────────────────┘"
      );
    } catch (err) {
      console.error(
        "[lambda-emulator] FATAL: no ATOM_TOKEN and cannot persist a generated token:",
        err
      );
      process.exit(1);
    }
  }
}
// The shared handler ALSO enforces x-atom-token on HTTP events when
// ATOM_TOKEN is set — keep both layers consistent.
process.env.ATOM_TOKEN = AUTH_TOKEN;

/** Constant-time token comparison (length-safe). */
function tokenOk(provided) {
  if (typeof provided !== "string" || provided.length === 0) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(AUTH_TOKEN);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/* ────────────────────────────── server ────────────────────────────────── */

const server = createServer(async (req, res) => {
  // GET /health — the ONLY unauthenticated endpoint (liveness probe).
  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true, service: "lambda-emulator" }));
    return;
  }

  // Read (and cap) the body before auth — bounded memory for junk traffic.
  const chunks = [];
  let totalBytes = 0;
  let tooLarge = false;
  for await (const chunk of req) {
    totalBytes += chunk.length;
    if (totalBytes <= MAX_BODY_BYTES) chunks.push(chunk);
    else tooLarge = true;
  }
  const body = Buffer.concat(chunks).toString("utf8");

  // No CORS by design — the app calls this server-to-server. A browser
  // Origin from a different host is rejected outright.
  const origin = req.headers.origin;
  if (origin) {
    let mismatch = false;
    try {
      mismatch = new URL(origin).host !== req.headers.host;
    } catch {
      mismatch = true; // malformed Origin — reject
    }
    if (mismatch) {
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          type: "error",
          message: "Cross-origin requests to the judge emulator are not allowed.",
        })
      );
      return;
    }
  }

  // Shared-secret auth — every request except GET /health.
  if (!tokenOk(req.headers["x-atom-token"])) {
    console.warn(
      `[lambda-emulator] 401 unauthorized ${req.method} ${req.url} (origin: ${origin ?? "none"})`
    );
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        type: "error",
        message: "Invalid or missing x-atom-token.",
      })
    );
    return;
  }

  if (tooLarge) {
    res.writeHead(413, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        type: "error",
        message: `Request body too large (limit ${MAX_BODY_BYTES} bytes).`,
      })
    );
    return;
  }

  console.log(`[lambda-emulator] ${req.method} ${req.url} (${body.length} bytes)`);

  const event = {
    version: "2.0",
    rawPath: req.url,
    method: req.method,
    isBase64Encoded: false,
    body,
    headers: req.headers,
  };

  try {
    const result = await handler(event);
    // Deliberately NO CORS headers here.
    res.writeHead(result.statusCode ?? 200, {
      "Content-Type": "application/json",
    });
    res.end(result.body ?? JSON.stringify(result));
  } catch (err) {
    console.error("[lambda-emulator] handler crash:", err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ type: "error", message: "Emulator crash" }));
  }
});

// Bind the loopback interface ONLY — the gateway/Caddy front-end decides
// whether the outside world may reach this at all.
server.listen(PORT, "127.0.0.1", () => {
  console.log(
    "┌─────────────────────────────────────────────────────────────────┐\n" +
      "│   DEV-ONLY judge emulator — never expose in production          │\n" +
      "│   Auth: x-atom-token header required (GET /health exempt)       │\n" +
      "└─────────────────────────────────────────────────────────────────┘"
  );
  console.log(
    `[lambda-emulator] AtomCode Lambda handler listening on http://127.0.0.1:${PORT} (loopback only)`
  );
});
