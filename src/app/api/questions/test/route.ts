import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { requireAdminApi } from "@/lib/api-admin-guard";
import { lambdaJudgeMultiRun } from "@/lib/lambda-judge-server";

/**
 * POST /api/questions/test — Lambda-judge verifier for code questions.
 *
 * Body: { ids: string[] } — one or many question ids. Questions run in
 * PARALLEL (each question = one Lambda multi-testcase call covering its
 * 2 sample + 3 hidden cases, in that dot order). Results are persisted on
 * the question (testStatus / testResults / testedAt) and returned so the
 * table can update immediately.
 *
 * Per-question response shape:
 *   { id, status: "passed" | "failed", results: boolean[5],
 *     testedAt: string, error?: string }
 */

const MAX_BATCH = 100;
/** Concurrent questions judged at once (each is a single Lambda call). */
const CONCURRENCY = 8;

type CaseStatus = "Success" | "Failed" | "Error";

interface QuestionResult {
  id: string;
  status: "passed" | "failed";
  results: boolean[];
  testedAt: string;
  error?: string;
}

/** Judge one question and persist the verdict. Never throws. */
async function testQuestion(qid: string): Promise<QuestionResult> {
  const question = await db.codeQuestion.findUnique({
    where: { id: qid },
    select: {
      id: true,
      lang: true,
      sourcecode: true,
      sampleinput1: true,
      sampleoutput1: true,
      sampleinput2: true,
      sampleoutput2: true,
      input1: true,
      output1: true,
      input2: true,
      output2: true,
      input3: true,
      output3: true,
    },
  });

  if (!question) {
    return {
      id: qid,
      status: "failed",
      results: [false, false, false, false, false],
      testedAt: new Date().toISOString(),
      error: "Question not found.",
    };
  }

  // Dot order: 2 sample cases first, then the 3 hidden cases.
  const testcases = [
    { input: question.sampleinput1 ?? "", expectedOutput: question.sampleoutput1 ?? "" },
    { input: question.sampleinput2 ?? "", expectedOutput: question.sampleoutput2 ?? "" },
    { input: question.input1 ?? "", expectedOutput: question.output1 ?? "" },
    { input: question.input2 ?? "", expectedOutput: question.output2 ?? "" },
    { input: question.input3 ?? "", expectedOutput: question.output3 ?? "" },
  ];

  const lang = (question.lang ?? "").toLowerCase();
  const code = question.sourcecode ?? "";

  if (!lang || !code.trim()) {
    const results = testcases.map(() => false);
    const now = new Date();
    await db.codeQuestion.update({
      where: { id: qid },
      data: {
        testStatus: "failed",
        testResults: JSON.stringify(results),
        testedAt: now,
      },
    });
    return {
      id: qid,
      status: "failed",
      results,
      testedAt: now.toISOString(),
      error: !lang ? "Question has no language set." : "Question has no source code.",
    };
  }

  const outcome = await lambdaJudgeMultiRun({ language: lang, code, testcases });

  // Map per-case Lambda verdicts → dot booleans (order preserved).
  const results: boolean[] = testcases.map((_, index) => {
    const r = outcome.results[index] as { status?: CaseStatus } | undefined;
    return r?.status === "Success";
  });

  const passed = outcome.ok && outcome.compileMessage === "Success";
  const now = new Date();
  await db.codeQuestion.update({
    where: { id: qid },
    data: {
      testStatus: passed ? "passed" : "failed",
      testResults: JSON.stringify(results),
      testedAt: now,
    },
  });

  return {
    id: qid,
    status: passed ? "passed" : "failed",
    results,
    testedAt: now.toISOString(),
    error: outcome.ok ? undefined : outcome.error,
  };
}

/** Map over ids with a bounded parallel pool. */
async function runPool(
  ids: string[],
  worker: (id: string) => Promise<QuestionResult>
) {
  const out: QuestionResult[] = new Array(ids.length);
  let cursor = 0;
  const lanes = Array.from(
    { length: Math.min(CONCURRENCY, ids.length) },
    async () => {
      while (cursor < ids.length) {
        const index = cursor++;
        out[index] = await worker(ids[index]);
      }
    }
  );
  await Promise.all(lanes);
  return out;
}

export async function POST(req: Request) {
  const guard = await requireAdminApi("question testing");
  if (!guard.ok) return guard.response;

  const body = (await req.json().catch(() => null)) as {
    ids?: unknown[];
  } | null;
  const ids: unknown[] = Array.isArray(body?.ids) ? body.ids : [];

  const validIds: string[] = ids
    .filter(
      (id: unknown): id is string => typeof id === "string" && id.trim().length > 0
    )
    .slice(0, MAX_BATCH);

  if (validIds.length === 0) {
    return NextResponse.json(
      { error: "No question ids provided." },
      { status: 400 }
    );
  }

  // De-duplicate while preserving order.
  const uniqueIds = Array.from(new Set(validIds));

  let results: QuestionResult[];
  try {
    results = await runPool(uniqueIds, testQuestion);
  } catch (error) {
    console.error("[questions/test]", error);
    return NextResponse.json(
      { error: "Test run failed — please try again." },
      { status: 500 }
    );
  }

  const passed = results.filter((r) => r.status === "passed").length;

  return NextResponse.json({
    results,
    summary: {
      total: results.length,
      passed,
      failed: results.length - passed,
      unjudged: results.some((r) => Boolean(r.error)),
    },
  });
}
