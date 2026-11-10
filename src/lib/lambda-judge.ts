/**
 * Lambda judge — routes code execution to the AtomCode AWS Lambda compiler
 * functions (compilers/README.md) instead of the browser WASM engine.
 *
 * Opt-in: active when any Lambda endpoint is configured server-side
 * (LAMBDA_JUDGE_URL / LAMBDA_JUDGE_URLS / NEXT_PUBLIC_LAMBDA_URL — probed
 * once via GET /api/execute/lambda). When active, the execution manager
 * sends every language (python, sql, javascript, typescript, ruby AND the
 * compiled c/cpp/java) through the app's server proxy route
 * /api/execute/lambda, which forwards to the deployed Lambda Function URLs.
 *
 * The Lambda endpoint speaks the exact same RunRequest/RunResult protocol
 * as the WASM workers (see compilers/README.md §3), so no UI changes are
 * needed anywhere — only this transport.
 */

import type {
  RunResult,
  WorkerResponse,
} from "./execution-types";
import type { RuntimeProfile } from "./runtime-registry";

const MIN_TIMEOUT_MS = 100;
const MAX_TIMEOUT_MS = 180_000;

/**
 * Thrown when the Lambda runtime itself cannot be reached / is not
 * configured — the execution manager falls back to the built-in engines.
 * Protocol-level errors (compile/runtime failures returned BY the Lambda)
 * are thrown as plain Errors and are authoritative — no fallback re-run.
 */
export class LambdaJudgeUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LambdaJudgeUnavailableError";
  }
}

/** True when a Lambda judge endpoint has been configured (cached probe). */
let capabilityProbe: Promise<boolean> | null = null;

export function lambdaJudgeConfigured(): Promise<boolean> {
  capabilityProbe ??= fetch("/api/execute/lambda", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((r) => r.json())
    .then((d: { enabled?: boolean }) => Boolean(d?.enabled))
    .catch(() => false);
  return capabilityProbe;
}

/**
 * Execute with the Lambda compiler stack. Resolves with a RunResult or
 * rejects with an Error — the same contract as executionManager.run().
 */
export async function runOnLambdaJudge(
  profile: RuntimeProfile,
  input: { code: string; stdin?: string; timeoutMs?: number }
): Promise<RunResult> {
  const timeoutMs = Math.min(
    Math.max(input.timeoutMs ?? profile.defaultTimeoutMs, MIN_TIMEOUT_MS),
    MAX_TIMEOUT_MS
  );

  const controller = new AbortController();
  // Lambda timeout 300s > worker max 180s — cap the transport window above
  // the requested timeout so the server-side kill always wins the race.
  const transportTimer = setTimeout(
    () => controller.abort(),
    Math.min(timeoutMs * 2 + 5_000, 240_000)
  );

  try {
    const response = await fetch("/api/execute/lambda", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "run",
        language: profile.language,
        versionProfileId: profile.id,
        code: input.code,
        stdin: input.stdin ?? "",
        timeoutMs,
      }),
      signal: controller.signal,
    });

    if (response.status === 401) {
      throw new Error("Your session expired — sign in again to run code.");
    }
    if (response.status === 503 || response.status === 502) {
      // Misconfigured or unreachable Lambda — let the caller fall back.
      throw new LambdaJudgeUnavailableError("Lambda execution is not available.");
    }

    const data = (await response.json()) as WorkerResponse & { message?: string };

    if (data.type === "result") {
      return data;
    }
    // The Lambda's own verdict (compile/runtime/toolchain error) is final.
    throw new Error(data.message || "Execution failed on the Lambda runtime.");
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error("Execution timed out.");
    }
    if (error instanceof LambdaJudgeUnavailableError) {
      throw error;
    }
    if (error instanceof TypeError || !(error instanceof Error)) {
      // fetch network failure / non-Error throw → runtime unavailable
      throw new LambdaJudgeUnavailableError(
        error instanceof Error ? error.message : String(error) || "Execution failed."
      );
    }
    throw error;
  } finally {
    clearTimeout(transportTimer);
  }
}
