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
 */

import { createServer } from "node:http";
import { existsSync } from "node:fs";
import handler from "../../compilers/functions/_shared/handler.mjs";

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

const server = createServer(async (req, res) => {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const body = Buffer.concat(chunks).toString("utf8");

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
    res.writeHead(result.statusCode ?? 200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
    });
    res.end(result.body ?? JSON.stringify(result));
  } catch (err) {
    console.error("[lambda-emulator] handler crash:", err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ type: "error", message: "Emulator crash" }));
  }
});

server.listen(PORT, () => {
  console.log(`[lambda-emulator] AtomCode Lambda handler listening on :${PORT}`);
});
