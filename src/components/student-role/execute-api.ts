// AtomCode — student code-practice judge client.
//
// Thin client for the server-judged test-case endpoint:
//
//   POST /api/execute/testcases   (cookie auth, same-origin)
//   body: { questionId, code, language, uaid? }   (uaid ONLY on assessment pages)
//   200 → { ok: true, results: [{ pass, actual, error? }], score, maxScore }
//   errors → { error } with 401/403/404/429 (429 = rate limited)
//
// The response NEVER contains expected outputs — results only expose the
// pass verdict and the program's actual output, and score/maxScore are
// computed server-side. Client code must trust them instead of re-deriving
// scores from hidden test data.

export interface TestCaseResult {
  /** Whether this test case passed (server-side verdict). */
  pass: boolean;
  /** The program's actual output for this case (never the expected one). */
  actual: string;
  /** Present when the case errored at compile/run time. */
  error?: string;
}

export interface RunTestcasesSuccess {
  ok: true;
  results: TestCaseResult[];
  score: number;
  maxScore: number;
}

export interface RunTestcasesFailure {
  ok: false;
  status: number;
  error: string;
}

export type RunTestcasesOutcome = RunTestcasesSuccess | RunTestcasesFailure;

/** 429 toast copy — surfaced verbatim per the endpoint contract. */
export const RATE_LIMIT_MESSAGE = "Too many runs — try again in a few seconds";

export async function runQuestionTestcases(payload: {
  questionId: string;
  code: string;
  language: string;
  /** Assessment attempt id — pass ONLY on assessment pages. */
  uaid?: string;
}): Promise<RunTestcasesOutcome> {
  try {
    const res = await fetch("/api/execute/testcases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => null)) as
      | { ok?: boolean; results?: TestCaseResult[]; score?: number; maxScore?: number; error?: string }
      | null;

    if (!res.ok || !data?.ok || !Array.isArray(data.results)) {
      return {
        ok: false,
        status: res.status,
        error: data?.error ?? "Judge service unavailable — try again.",
      };
    }

    return {
      ok: true,
      results: data.results,
      score: typeof data.score === "number" ? data.score : 0,
      maxScore: typeof data.maxScore === "number" ? data.maxScore : 0,
    };
  } catch {
    return { ok: false, status: 0, error: "Network error while judging — try again." };
  }
}

/** Map an endpoint failure to the right toast message (429 has its own copy). */
export function runErrorMessage(outcome: RunTestcasesFailure): string {
  if (outcome.status === 429) return RATE_LIMIT_MESSAGE;
  return outcome.error;
}
