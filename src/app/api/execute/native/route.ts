import { auth } from "@/auth";
import { executeNative } from "@/lib/native-executor";
import { consumeQuota } from "@/lib/rate-limit";

/**
 * POST /api/execute/native — built-in server-side execution for the
 * compiled languages (C, C++, Java).
 *
 * Contract mirrors the WebWorker RunRequest/RunResult protocol so the
 * client execution manager can treat this endpoint exactly like a worker:
 *
 *   request  : { type:"run", executionId, language, versionProfileId, code, stdin?, timeoutMs? }
 *   response : { type:"result", executionId, stdout, stderr, exitCode, compileTimeMs, executionTimeMs }
 *           or { type:"error",  executionId, message, stage }
 *
 * Only authenticated app users may execute code (any role). Two server-side
 * throttles protect the toolchains:
 *   - per-user quota  → consumeQuota("exec", …)  → HTTP 429 + Retry-After
 *   - global executor concurrency → RATE_LIMITED outcome → HTTP 429
 *
 * Every run gets a private temp directory, a scrubbed environment and hard
 * compile/run timeouts (see native-executor.ts).
 */

const EXEC_QUOTA = { perMinute: 10, perDay: 150 };

function tooManyRequests(retryAfterSec: number, message: string, executionId = "") {
  return Response.json(
    {
      // Worker-protocol shape (client execution manager) …
      type: "error",
      executionId,
      message,
      stage: "quota",
      // …plus the plain `{ error }` quota shape required by the API contract.
      error: message,
    },
    {
      status: 429,
      headers: { "Retry-After": String(Math.max(1, retryAfterSec)) },
    }
  );
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json(
      {
        type: "error",
        executionId: "",
        message: "Authentication required.",
        stage: "loading",
      },
      { status: 401 }
    );
  }

  // Per-user execution budget (any authenticated role may run code).
  const quota = consumeQuota("exec", session.user.id, EXEC_QUOTA);
  if (!quota.allowed) {
    return tooManyRequests(
      quota.retryAfterSec,
      "Execution quota exceeded — try again later."
    );
  }

  const body = await req.json().catch(() => null);
  const executionId = String(body?.executionId ?? "");
  const language = String(body?.language ?? "");
  const code = typeof body?.code === "string" ? body.code : "";
  const stdin = typeof body?.stdin === "string" ? body.stdin : "";
  const timeoutMs =
    typeof body?.timeoutMs === "number" && Number.isFinite(body.timeoutMs)
      ? body.timeoutMs
      : undefined;
  const versionProfileId = body?.versionProfileId
    ? String(body.versionProfileId)
    : undefined;

  if (!code.trim()) {
    return Response.json({
      type: "error",
      executionId,
      message: "Code is empty.",
      stage: "compile",
    });
  }

  const outcome = await executeNative({
    profileId: versionProfileId,
    language,
    code,
    stdin,
    timeoutMs,
  });

  if (!outcome.ok && outcome.code === "RATE_LIMITED") {
    return tooManyRequests(
      outcome.retryAfterSec ?? 5,
      outcome.message,
      executionId
    );
  }

  if (outcome.ok) {
    return Response.json({
      type: "result",
      executionId,
      stdout: outcome.stdout,
      stderr: outcome.stderr,
      exitCode: outcome.exitCode,
      compileTimeMs: outcome.compileTimeMs,
      executionTimeMs: outcome.executionTimeMs,
    });
  }

  return Response.json({
    type: "error",
    executionId,
    message: outcome.message,
    stage: outcome.stage,
  });
}
