import { auth } from "@/auth";
import {
  judgeQuestionTests,
  QuestionJudgeError,
} from "@/lib/question-judge";

/**
 * POST /api/execute/testcases — server-side hidden-test-case judging.
 *
 * The grading authority lives in lib/question-judge.ts (shared with the
 * assessment actions agent); this route is a thin wrapper:
 *
 *   request  : { questionId, code, language, uaid? }
 *   response : { ok: true,
 *                results: [{ pass, actual, error? }],   // never expected outputs
 *                score, maxScore }
 *   errors   : 401 unauthenticated · 403 ownership · 404 not found ·
 *              400 validation (language mismatch / size / keywords) ·
 *              429 quota (+ Retry-After)
 *
 * Score follows the client formula 1+3+3+3 (sample + three hidden cases),
 * capped at the question's maxscore. Expected outputs and the question's
 * reference source never appear in the response.
 */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Authentication required." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const questionId = String(body?.questionId ?? "");
  const code = typeof body?.code === "string" ? body.code : "";
  const language = String(body?.language ?? "");
  const uaid = body?.uaid ? String(body.uaid) : undefined;

  if (!questionId) {
    return Response.json({ error: "'questionId' is required" }, { status: 400 });
  }
  if (!language) {
    return Response.json({ error: "'language' is required" }, { status: 400 });
  }

  try {
    const outcome = await judgeQuestionTests(questionId, code, language, {
      uaid,
      userId: session.user.id,
    });
    return Response.json({
      ok: true,
      results: outcome.results,
      score: outcome.score,
      maxScore: outcome.maxScore,
    });
  } catch (error) {
    if (error instanceof QuestionJudgeError) {
      const headers: Record<string, string> = {};
      if (error.retryAfterSec !== undefined) {
        headers["Retry-After"] = String(Math.max(1, error.retryAfterSec));
      }
      return Response.json(
        { error: error.message },
        { status: error.status, headers }
      );
    }
    console.error("[execute/testcases]", error);
    return Response.json(
      { error: "Server-side judging failed unexpectedly." },
      { status: 500 }
    );
  }
}
