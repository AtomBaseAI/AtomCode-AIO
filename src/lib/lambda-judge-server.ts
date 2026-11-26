/**
 * Server-side Lambda judge client — used by the admin testcase verifier
 * (POST /api/questions/test). Talks directly to the AtomCode AWS Lambda
 * compiler Function URLs resolved from LAMBDA_JUDGE_URLS / LAMBDA_JUDGE_URL.
 *
 * Uses the multi-testcase judge contract (compilers/README.md §3): one HTTP
 * call per question runs all of its test cases with the app's judge
 * semantics (CR/LF + trailing-whitespace normalization, empty-case
 * auto-pass, compile/runtime short-circuit).
 */

const LAMBDA_CALL_TIMEOUT_MS = 240_000;
/** Judge-side per-question window (Lambda clamps 1s…60s per testcase). */
const TESTCASE_TIMEOUT_MS = 60_000;

export interface LambdaTarget {
  url: string;
  token?: string;
}

/**
 * Resolve the Lambda Function URL for a language. Same resolution order as
 * /api/execute/lambda: LAMBDA_JUDGE_URLS map → LAMBDA_JUDGE_URL →
 * NEXT_PUBLIC_LAMBDA_URL.
 */
export function resolveLambdaTarget(language: string): LambdaTarget | null {
  const token = process.env.LAMBDA_JUDGE_TOKEN || undefined;

  const mapRaw = process.env.LAMBDA_JUDGE_URLS;
  if (mapRaw) {
    try {
      const map = JSON.parse(mapRaw) as Record<string, string>;
      const specific = map[language] ?? map[language.toLowerCase()];
      if (specific) return { url: specific, token };
    } catch {
      console.error("[lambda-judge-server] LAMBDA_JUDGE_URLS is not valid JSON");
    }
  }

  const single =
    process.env.LAMBDA_JUDGE_URL || process.env.NEXT_PUBLIC_LAMBDA_URL;
  if (single) return { url: single, token };

  return null;
}

export interface LambdaCaseResult {
  status: "Success" | "Failed" | "Error";
  output: string;
}

export interface LambdaJudgeOutcome {
  ok: boolean;
  /** Overall verdict: every case passed → "Success". */
  compileMessage: "Success" | "Failed" | "Error";
  results: LambdaCaseResult[];
  passedCount: number;
  total: number;
  error?: string;
}

/**
 * Run one question's source against 1..N (input, expectedOutput) pairs on
 * the Lambda compiler stack. One HTTP round-trip per question.
 */
export async function lambdaJudgeMultiRun(input: {
  language: string;
  code: string;
  testcases: { input: string; expectedOutput: string }[];
  versionProfileId?: string | null;
}): Promise<LambdaJudgeOutcome> {
  const target = resolveLambdaTarget(input.language);
  if (!target) {
    return {
      ok: false,
      compileMessage: "Error",
      results: [],
      passedCount: 0,
      total: input.testcases.length,
      error:
        "No Lambda judge endpoint is configured for this language " +
        "(set LAMBDA_JUDGE_URLS).",
    };
  }

  const controller = new AbortController();
  const killTimer = setTimeout(
    () => controller.abort(),
    LAMBDA_CALL_TIMEOUT_MS
  );

  try {
    const upstream = await fetch(target.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(target.token ? { "x-atom-token": target.token } : {}),
      },
      body: JSON.stringify({
        language: input.language,
        versionProfileId: input.versionProfileId ?? undefined,
        code: input.code,
        testcases: input.testcases,
        timeoutMs: TESTCASE_TIMEOUT_MS,
      }),
      signal: controller.signal,
    });

    if (!upstream.ok) {
      return {
        ok: false,
        compileMessage: "Error",
        results: [],
        passedCount: 0,
        total: input.testcases.length,
        error: `Lambda judge responded with HTTP ${upstream.status}.`,
      };
    }

    const data = (await upstream.json()) as {
      compileMessage?: LambdaJudgeOutcome["compileMessage"];
      results?: LambdaCaseResult[];
      passedCount?: number;
      total?: number;
      message?: string;
    };

    if (!data || !Array.isArray(data.results)) {
      return {
        ok: false,
        compileMessage: "Error",
        results: [],
        passedCount: 0,
        total: input.testcases.length,
        error: data?.message || "Malformed response from the Lambda judge.",
      };
    }

    return {
      ok: true,
      compileMessage: data.compileMessage ?? "Error",
      results: data.results,
      passedCount: data.passedCount ?? 0,
      total: data.total ?? input.testcases.length,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? controller.signal.aborted
          ? "Lambda judge call timed out."
          : error.message
        : String(error);
    return {
      ok: false,
      compileMessage: "Error",
      results: [],
      passedCount: 0,
      total: input.testcases.length,
      error: message,
    };
  } finally {
    clearTimeout(killTimer);
  }
}
