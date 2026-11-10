/**
 * Judge — the app's single code-execution facade.
 *
 * Judge contract (unchanged from the original judge):
 *   - compileMessage ∈ "Success" | "Failed" | "Error"
 *     Success: the program ran and its output matches the expected output.
 *     Failed : the program ran but produced different output.
 *     Error  : compile/runtime failure (or no execution path available).
 *   - output: the program's actual stdout (rendered for SQL results).
 *
 * Output comparison mirrors the judge's tolerance: trailing whitespace per
 * line, CR/LF endings and trailing blank lines are normalized away.
 *
 * Transport order (see also runtime-registry):
 *   1. Lambda compiler stack (compilers/) when configured — executes every
 *      language through POST /api/execute/lambda.
 *   2. Server toolchain fallback for C / C++ / Java ("native-server"
 *      profiles) — POST /api/execute/native drives the app's own
 *      gcc / g++ / ECJ + OpenJDK JVM toolchains.
 *
 * The browser WASM engine was removed from the web app; the Electron
 * desktop client still bundles its own engine under elcetron/renderer/.
 */

import {
  lambdaJudgeConfigured,
  runOnLambdaJudge,
  LambdaJudgeUnavailableError,
} from "./lambda-judge";
import { resolveProfile, type RuntimeProfile } from "./runtime-registry";
import type {
  RunResult,
  SqlQueryPayload,
  WorkerResponse,
} from "./execution-types";

export type JudgeStatus = "Success" | "Failed" | "Error";

export interface SingleRunOutcome {
  compileMessage: JudgeStatus;
  /** Actual program output (grid text for SQL). */
  output: string;
  stderr: string;
  timedOut: boolean;
  durationMs: number;
  executionTimeMs?: number;
  /** Structured SQL grid (SQLite profiles only). */
  sql?: SqlQueryPayload;
  /** The profile that actually executed. */
  profileId: string;
  profileLabel: string;
}

export interface TestCaseOutcome {
  status: JudgeStatus;
  output: string;
}

export function normalizeOutput(value: string): string {
  return value
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n")
    .replace(/\n+$/g, "")
    .trim();
}

function renderOutput(result: RunResult): string {
  if (result.sql) {
    if (result.sql.columns.length === 0) {
      return result.stdout || "Statement executed successfully.";
    }
    return result.stdout;
  }
  return result.stdout;
}

function unavailableOutcome(message: string): SingleRunOutcome {
  return {
    compileMessage: "Error",
    output: "",
    stderr: message,
    timedOut: false,
    durationMs: 0,
    profileId: "",
    profileLabel: "",
  };
}

const MIN_TIMEOUT_MS = 100;
const MAX_TIMEOUT_MS = 180_000;

/** Clamp a requested timeout into the accepted window. */
function clampTimeout(
  requested: number | undefined,
  fallback: number
): number {
  return Math.min(
    Math.max(requested ?? fallback, MIN_TIMEOUT_MS),
    MAX_TIMEOUT_MS
  );
}

/**
 * Built-in server toolchain path (C / C++ / Java). The endpoint answers
 * with the same RunResult protocol; the server enforces its own hard
 * compile/run timeouts, while the AbortController guards the transport.
 */
async function runOnNativeServer(
  profile: RuntimeProfile,
  input: { code: string; stdin?: string; timeoutMs?: number }
): Promise<RunResult> {
  const timeoutMs = clampTimeout(input.timeoutMs, profile.defaultTimeoutMs);
  const controller = new AbortController();
  const transportTimer = setTimeout(
    () => controller.abort(),
    timeoutMs + 2_000
  );

  try {
    const response = await fetch("/api/execute/native", {
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

    const data = (await response.json()) as WorkerResponse & {
      message?: string;
    };

    if (response.status === 401) {
      throw new Error("Your session expired — sign in again to run code.");
    }

    if (data.type === "result") {
      return data;
    }
    throw new Error(data.message || "Execution failed on the server.");
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error("Execution timed out.");
    }
    throw error instanceof Error
      ? error
      : new Error(String(error) || "Execution failed.");
  } finally {
    clearTimeout(transportTimer);
  }
}

/**
 * Execute with the given profile: Lambda first (every language), then the
 * server toolchains for C / C++ / Java. Anything else is unavailable —
 * the web app no longer ships a browser engine.
 */
async function execute(
  profile: RuntimeProfile,
  input: { code: string; stdin?: string; timeoutMs?: number }
): Promise<RunResult> {
  if (await lambdaJudgeConfigured()) {
    try {
      return await runOnLambdaJudge(profile, input);
    } catch (lambdaError) {
      if (!(lambdaError instanceof LambdaJudgeUnavailableError)) {
        throw lambdaError;
      }
      console.error(
        `[judge] Lambda judge unavailable for ${profile.id}, trying server toolchains:`,
        lambdaError.message
      );
    }
  }

  if (profile.mode === "native-server") {
    return runOnNativeServer(profile, input);
  }

  throw new Error(
    `${profile.label} has no execution backend configured. Set LAMBDA_JUDGE_URLS to enable the Lambda compiler stack.`
  );
}

/**
 * Execute a single source file against one stdin input and — optionally —
 * an expected output. When `expectedOutput` is omitted (playground mode) the
 * outcome is "Success" whenever the program runs without a compile/runtime
 * error, exactly like the original judge's sample flow.
 */
export async function judgeRunSingle(opts: {
  lang: string;
  versionProfileId?: string | null;
  code: string;
  input?: string;
  expectedOutput?: string | null;
  timeoutMs?: number;
}): Promise<SingleRunOutcome> {
  const profile = resolveProfile(opts.lang, opts.versionProfileId);

  if (!profile) {
    return unavailableOutcome(
      `No runtime is configured for "${opts.lang}".`
    );
  }
  if (!profile.verified) {
    return unavailableOutcome(
      `${profile.label} runtime is not configured in this build.`
    );
  }

  try {
    const result = await execute(profile, {
      code: opts.code,
      stdin: opts.input ?? "",
      timeoutMs: opts.timeoutMs,
    });

    const output = renderOutput(result);
    const compileMessage: JudgeStatus =
      opts.expectedOutput == null
        ? "Success"
        : normalizeOutput(output) === normalizeOutput(opts.expectedOutput)
          ? "Success"
          : "Failed";

    return {
      compileMessage,
      output,
      stderr: result.stderr ?? "",
      timedOut: false,
      durationMs: result.executionTimeMs ?? 0,
      executionTimeMs: result.executionTimeMs,
      sql: result.sql,
      profileId: profile.id,
      profileLabel: profile.label,
    };
  } catch (error) {
    const timedOut =
      error instanceof Error && error.message === "Execution timed out.";
    const message = error instanceof Error ? error.message : String(error);
    return {
      compileMessage: "Error",
      output: timedOut ? "Execution timed out." : message,
      stderr: message,
      timedOut,
      durationMs: 0,
      profileId: profile.id,
      profileLabel: profile.label,
    };
  }
}

/**
 * Execute one source file against 1..N (input, expectedOutput) pairs — the
 * multi-test-case judge contract. Each case reports Success / Failed / Error
 * independently; a runtime error is reported for every remaining case so the
 * UI's per-case badges keep their semantics.
 */
export async function judgeRunTestCases(opts: {
  lang: string;
  versionProfileId?: string | null;
  code: string;
  cases: { input: string; expectedOutput: string }[];
  timeoutMs?: number;
}): Promise<TestCaseOutcome[]> {
  const outcomes: TestCaseOutcome[] = [];

  for (const testCase of opts.cases) {
    // Skip cases the question never defined (empty input AND output).
    const emptyCase =
      (testCase.input ?? "") === "" && (testCase.expectedOutput ?? "") === "";
    if (emptyCase && opts.cases.length > 1) {
      outcomes.push({ status: "Success", output: "" });
      continue;
    }
    if (outcomes.some((o) => o.status === "Error")) {
      // Runtime already broken — report Error without re-running per case.
      outcomes.push({ status: "Error", output: "" });
      continue;
    }
    const outcome = await judgeRunSingle({
      lang: opts.lang,
      versionProfileId: opts.versionProfileId,
      code: opts.code,
      input: testCase.input ?? "",
      expectedOutput: testCase.expectedOutput ?? "",
      timeoutMs: opts.timeoutMs,
    });
    outcomes.push({ status: outcome.compileMessage, output: outcome.output });
  }

  return outcomes;
}
