import { auth } from "@/auth";

/**
 * POST /api/execute/lambda — server-side proxy to the AtomCode AWS Lambda
 * compiler functions (see compilers/README.md).
 *
 * Active when a Lambda endpoint is configured; answers 503 otherwise so the
 * client judge can fall back to the server toolchains (C / C++ / Java).
 *
 * Endpoint resolution order (server-side env):
 *   1. LAMBDA_JUDGE_URLS  — JSON map { "java": "https://…", "python": "…" }
 *   2. LAMBDA_JUDGE_URL   — single all-in-one Function URL
 *   3. NEXT_PUBLIC_LAMBDA_URL — same as above (public convenience var)
 *
 * Auth: next-auth session required (same as /api/execute/native). The
 * optional LAMBDA_JUDGE_TOKEN is attached as the x-atom-token header.
 *
 * Contract passthrough — the Lambda speaks the app's RunRequest/RunResult
 * protocol natively, so the response body is forwarded unchanged.
 */

const MAX_BODY_CHARS = 1_500_000; // code 200k + stdin 1M + envelope
const LAMBDA_CALL_TIMEOUT_MS = 240_000;

interface TargetConfig {
  url: string;
  token?: string;
}

function resolveTarget(language: string): TargetConfig | null {
  const token = process.env.LAMBDA_JUDGE_TOKEN || undefined;

  const mapRaw = process.env.LAMBDA_JUDGE_URLS;
  if (mapRaw) {
    try {
      const map = JSON.parse(mapRaw) as Record<string, string>;
      const specific = map[language] ?? map[language.toLowerCase()];
      if (specific) return { url: specific, token };
    } catch {
      console.error("[execute/lambda] LAMBDA_JUDGE_URLS is not valid JSON");
    }
  }

  const single =
    process.env.LAMBDA_JUDGE_URL || process.env.NEXT_PUBLIC_LAMBDA_URL;
  if (single) return { url: single, token };

  return null;
}

/**
 * GET /api/execute/lambda — capability probe for the client execution
 * manager: { enabled: true } when any Lambda target is configured.
 * Cached once per browser session by src/lib/lambda-judge.ts.
 */
export async function GET() {
  let enabled = Boolean(
    process.env.LAMBDA_JUDGE_URL || process.env.NEXT_PUBLIC_LAMBDA_URL
  );
  if (!enabled && process.env.LAMBDA_JUDGE_URLS) {
    try {
      const map = JSON.parse(process.env.LAMBDA_JUDGE_URLS) as Record<string, string>;
      enabled = Object.values(map).some(Boolean);
    } catch {
      /* invalid JSON — stay disabled */
    }
  }
  return Response.json({ enabled });
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

  const body = await req.json().catch(() => null);
  const language = String(body?.language ?? "");
  const code = typeof body?.code === "string" ? body.code : "";

  if (!language || !code.trim()) {
    return Response.json({
      type: "error",
      executionId: String(body?.executionId ?? ""),
      message: "'language' and 'code' are required.",
      stage: "bad-request",
    });
  }
  if (JSON.stringify(body).length > MAX_BODY_CHARS) {
    return Response.json({
      type: "error",
      executionId: String(body?.executionId ?? ""),
      message: "Payload too large.",
      stage: "bad-request",
    });
  }

  const target = resolveTarget(language);
  if (!target) {
    return Response.json(
      {
        type: "error",
        executionId: String(body?.executionId ?? ""),
        message:
          "Lambda execution is not configured (set NEXT_PUBLIC_LAMBDA_URL after deploying compilers/).",
        stage: "toolchain",
      },
      { status: 503 }
    );
  }

  const controller = new AbortController();
  const killTimer = setTimeout(() => controller.abort(), LAMBDA_CALL_TIMEOUT_MS);

  try {
    const upstream = await fetch(target.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(target.token ? { "x-atom-token": target.token } : {}),
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    const text = await upstream.text();
    // The Lambda returns the app's protocol JSON on 200; pass it through
    // unchanged so the client execution manager can treat it like a worker.
    return new Response(text, {
      status: upstream.ok ? 200 : 502,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[execute/lambda]", error);
    return Response.json(
      {
        type: "error",
        executionId: String(body?.executionId ?? ""),
        message: "Could not reach the Lambda compiler runtime.",
        stage: "toolchain",
      },
      { status: 502 }
    );
  } finally {
    clearTimeout(killTimer);
  }
}
