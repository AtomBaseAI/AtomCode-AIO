/**
 * Server-side question test-case judge — the single grading authority.
 *
 * Shared by:
 *   - POST /api/execute/testcases (web session cookie auth) — thin wrapper
 *   - the assessment/practice actions agent (calls judgeQuestionTests directly)
 *
 * Guarantees:
 *   - the student's code is judged against the question's hidden test cases
 *     (input1..input3/output1..output3, plus the sample pair as the
 *     weight-1 slot) with the app's judge semantics (CR/LF + trailing
 *     whitespace normalization, placeholder auto-pass, error short-circuit);
 *   - expected outputs NEVER leave this module — callers only receive
 *     per-case pass/fail + the program's own output;
 *   - ownership (uaid → session user), quota and blacklist/whitelist checks
 *     are enforced server-side;
 *   - transports mirror the app exactly: Lambda compiler stack
 *     (lambdaJudgeMultiRun) for the interpreted languages per
 *     runtime-registry.ts, the built-in native toolchains (executeNative)
 *     for C / C++ / Java.
 *
 * Score formula mirrors the client (code-view.tsx): 1 + 3 + 3 + 3 — the
 * sample run weighs 1, each hidden test case weighs 3 — capped at the
 * question's maxscore (10 when absent).
 */

import { db } from "@/lib/db";
import { consumeQuota } from "@/lib/rate-limit";
import {
  executeNative,
  NATIVE_LANGUAGES,
  normalizeOutput,
} from "@/lib/native-executor";
import { lambdaJudgeMultiRun } from "@/lib/lambda-judge-server";

export interface TestCaseResult {
  pass: boolean;
  /** The program's actual output for this case (never the expected one). */
  actual: string;
  /** Compile/runtime/transport failure message for this case. */
  error?: string;
}

export interface JudgeQuestionResult {
  results: TestCaseResult[];
  /** Weighted score (1 + 3·3 formula), capped at maxScore. */
  score: number;
  maxScore: number;
}

/** Thrown for auth/ownership/not-found/quota problems; `.status` → HTTP. */
export class QuestionJudgeError extends Error {
  status: number;
  retryAfterSec?: number;

  constructor(status: number, message: string, retryAfterSec?: number) {
    super(message);
    this.name = "QuestionJudgeError";
    this.status = status;
    if (retryAfterSec !== undefined) this.retryAfterSec = retryAfterSec;
  }
}

/* ────────────────────────────── limits ──────────────────────────────── */

const MAX_CODE_CHARS = 200_000;
/** Per-testcase wall-clock budget for the native (C/C++/Java) path. */
const NATIVE_RUN_TIMEOUT_MS = 30_000;
/** Client score formula: sample 1 + three hidden cases 3 each = 10. */
const TEST_WEIGHTS = [1, 3, 3, 3] as const;
const DEFAULT_MAX_SCORE = 10;

/* ─────────────────────── keyword checks (server-side) ───────────────── */

/**
 * Same comma-separated substring semantics as the client (code-view.tsx)
 * and the Lambda handler: blacklist → any hit rejects; whitelist → every
 * keyword must be present.
 */
function checkKeywords(
  code: string,
  raw: { blacklist?: string | null; whitelist?: string | null }
): string | null {
  const parse = (value?: string | null) =>
    String(value ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

  if (parse(raw.blacklist).some((keyword) => code.includes(keyword))) {
    return "Blacklist keyword(s) found in the code!";
  }
  if (parse(raw.whitelist).some((keyword) => !code.includes(keyword))) {
    return "Whitelist keyword(s) missing from the code!";
  }
  return null;
}

/**
 * SQL questions may carry headerCode (CREATE TABLE …) that must run before
 * the student's query — identical composition to judge.ts composeUserCode.
 */
function composeUserCode(
  lang: string,
  headerCode: string | null | undefined,
  code: string
): string {
  if (lang !== "sql" || !headerCode || !headerCode.trim()) return code;
  return `${headerCode.trim().replace(/\s*$/, "")}\n\n-- ── student query ──\n${code}`;
}

/* ─────────────────────────── judge entry point ──────────────────────── */

export async function judgeQuestionTests(
  questionId: string,
  code: string,
  language: string,
  opts?: { uaid?: string; userId?: string }
): Promise<JudgeQuestionResult> {
  const userId = opts?.userId;

  // 0. Quota — same budget as every other execution endpoint.
  if (userId) {
    const quota = consumeQuota("exec", userId, { perMinute: 10, perDay: 150 });
    if (!quota.allowed) {
      throw new QuestionJudgeError(
        429,
        "Execution quota exceeded — try again later.",
        quota.retryAfterSec
      );
    }
  }

  if (!questionId) {
    throw new QuestionJudgeError(400, "'questionId' is required");
  }
  if (typeof code !== "string" || !code.trim()) {
    throw new QuestionJudgeError(400, "Code is empty");
  }
  if (code.length > MAX_CODE_CHARS) {
    throw new QuestionJudgeError(
      400,
      `Source too large (limit ${MAX_CODE_CHARS} characters).`
    );
  }

  // 1. Load the question — expected outputs stay server-side.
  const question = await db.codeQuestion.findUnique({
    where: { id: questionId },
    select: {
      id: true,
      lang: true,
      maxscore: true,
      assessmentsId: true,
      sampleinput1: true,
      sampleoutput1: true,
      input1: true,
      input2: true,
      input3: true,
      output1: true,
      output2: true,
      output3: true,
      headerCode: true,
      blacklist: true,
      whitelist: true,
    },
  });
  if (!question) {
    throw new QuestionJudgeError(404, "Code question not found");
  }

  // 2. Ownership — uaid must belong to the caller (mandatory) and the
  //    question must live in that assessment's question set (best-effort;
  //    the relation is direct here, so enforced when set).
  if (opts?.uaid) {
    if (!userId) {
      throw new QuestionJudgeError(401, "Authentication required");
    }
    const attempt = await db.userAssessmentData.findUnique({
      where: { id: opts.uaid },
      select: { userId: true, assessmentId: true },
    });
    if (!attempt) {
      throw new QuestionJudgeError(404, "Assessment attempt not found");
    }
    if (attempt.userId !== userId) {
      throw new QuestionJudgeError(
        403,
        "This assessment attempt belongs to another student"
      );
    }
    if (
      question.assessmentsId &&
      question.assessmentsId !== attempt.assessmentId
    ) {
      throw new QuestionJudgeError(
        403,
        "This question does not belong to the given assessment"
      );
    }
  }

  // 3. Language must match the question.
  if (language !== question.lang) {
    throw new QuestionJudgeError(
      400,
      `Language mismatch — this question expects "${question.lang}".`
    );
  }

  // 4. Server-side keyword policy.
  const violation = checkKeywords(code, {
    blacklist: question.blacklist,
    whitelist: question.whitelist,
  });
  if (violation) {
    throw new QuestionJudgeError(400, violation);
  }

  // 5. Judge — sample slot first (weight 1), then the hidden cases (3 each).
  const slots = [
    { input: question.sampleinput1 ?? "", expected: question.sampleoutput1 ?? "" },
    { input: question.input1 ?? "", expected: question.output1 ?? "" },
    { input: question.input2 ?? "", expected: question.output2 ?? "" },
    { input: question.input3 ?? "", expected: question.output3 ?? "" },
  ];

  const results = await judgeSlots(language, code, question.headerCode, slots);

  // 6. Weighted score, capped at the question's max score.
  const rawScore = results.reduce(
    (total, result, index) => total + (result.pass ? TEST_WEIGHTS[index] ?? 0 : 0),
    0
  );
  const maxScore = question.maxscore > 0 ? question.maxscore : DEFAULT_MAX_SCORE;

  return {
    results,
    score: Math.min(rawScore, maxScore),
    maxScore,
  };
}

/* ─────────────────────────── judge transports ───────────────────────── */

async function judgeSlots(
  language: string,
  code: string,
  headerCode: string | null | undefined,
  slots: { input: string; expected: string }[]
): Promise<TestCaseResult[]> {
  if (NATIVE_LANGUAGES.includes(language as (typeof NATIVE_LANGUAGES)[number])) {
    return judgeSlotsNative(language, code, headerCode, slots);
  }
  // Interpreted languages ride the Lambda compiler stack (same transport
  // the app's judge uses; one HTTP call runs every case).
  return judgeSlotsLambda(language, code, headerCode, slots);
}

/** C / C++ / Java — built-in server toolchains (native-executor.ts). */
async function judgeSlotsNative(
  language: string,
  code: string,
  headerCode: string | null | undefined,
  slots: { input: string; expected: string }[]
): Promise<TestCaseResult[]> {
  const results: TestCaseResult[] = [];
  // Compile/runtime failures short-circuit every later case (judge semantics).
  let carryError: string | null = null;

  for (let index = 0; index < slots.length; index++) {
    const slot = slots[index];

    // Placeholder case (no input AND no expected output) — auto-pass,
    // mirrors the web judge / desktop judge semantics.
    if (index > 0 && slot.input === "" && slot.expected === "") {
      results.push({ pass: true, actual: "" });
      continue;
    }
    if (carryError) {
      results.push({ pass: false, actual: "", error: carryError });
      continue;
    }

    const outcome = await executeNative({
      language,
      code: composeUserCode(language, headerCode, code),
      stdin: slot.input,
      timeoutMs: NATIVE_RUN_TIMEOUT_MS,
    });

    if (!outcome.ok) {
      carryError = outcome.message;
      results.push({ pass: false, actual: "", error: outcome.message });
      continue;
    }

    const pass =
      normalizeOutput(outcome.stdout) === normalizeOutput(slot.expected);
    results.push({ pass, actual: outcome.stdout });
  }

  return results;
}

/** Python / SQL / JavaScript / TypeScript / Ruby — Lambda compiler stack. */
async function judgeSlotsLambda(
  language: string,
  code: string,
  headerCode: string | null | undefined,
  slots: { input: string; expected: string }[]
): Promise<TestCaseResult[]> {
  const judge = await lambdaJudgeMultiRun({
    language,
    code: composeUserCode(language, headerCode, code),
    testcases: slots.map((slot) => ({
      input: slot.input,
      expectedOutput: slot.expected,
    })),
  });

  if (!judge.ok) {
    // Transport-level failure (endpoint missing / unreachable / malformed):
    // every slot errors with the transport message.
    const message = judge.error || "The code judge is unavailable right now.";
    return slots.map(() => ({ pass: false, actual: "", error: message }));
  }

  return slots.map((_, index) => {
    const caseResult = judge.results[index];
    if (!caseResult) {
      return { pass: false, actual: "", error: "Missing judge result." };
    }
    if (caseResult.status === "Success") {
      return { pass: true, actual: caseResult.output ?? "" };
    }
    if (caseResult.status === "Error") {
      return {
        pass: false,
        actual: caseResult.output ?? "",
        error: caseResult.output || "Execution error.",
      };
    }
    return { pass: false, actual: caseResult.output ?? "" };
  });
}
