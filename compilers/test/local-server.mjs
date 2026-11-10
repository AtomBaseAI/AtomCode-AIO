/**
 * Local Lambda emulator — serves the REAL handler.mjs over HTTP exactly like
 * an AWS Lambda Function URL would (same event shape, same response shape).
 *
 * Used to end-to-end test the app integration without an AWS account:
 *
 *   node test/local-server.mjs            # listens on :3030
 *   LAMBDA_JUDGE_URL=http://127.0.0.1:3030  (in the app's .env)
 *
 * The app's /api/execute/lambda route then exercises the full judge path.
 */

import { createServer } from "node:http";
import handler from "../functions/_shared/handler.mjs";

process.env.ATOM_DROP_PRIVILEGES = "off"; // local user is unprivileged

const PORT = Number(process.env.PORT ?? 3030);

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
