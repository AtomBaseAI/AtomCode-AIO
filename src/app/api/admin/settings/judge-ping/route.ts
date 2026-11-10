import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/api-admin-guard";

/**
 * GET /api/admin/settings/judge-ping
 * Reachability probe for the AWS Lambda judge endpoints used by the admin
 * settings page. Any HTTP response (even 4xx/5xx) proves the endpoint is
 * reachable — only network failures (DNS/timeout) mark it down. Grouped by
 * language from LAMBDA_JUDGE_URLS, falling back to LAMBDA_JUDGE_URL.
 */

const PING_TIMEOUT_MS = 8_000;
const KNOWN_LANGS = [
  "python",
  "ruby",
  "javascript",
  "typescript",
  "sql",
  "c",
  "cpp",
  "java",
] as const;

type PingResult = {
  language: string;
  host: string;
  ok: boolean;
  status: number | null;
  ms: number | null;
};

function resolveEndpoints(): { language: string; url: string }[] {
  const endpoints: { language: string; url: string }[] = [];
  const mapRaw = process.env.LAMBDA_JUDGE_URLS;
  if (mapRaw) {
    try {
      const map = JSON.parse(mapRaw) as Record<string, string>;
      for (const lang of KNOWN_LANGS) {
        const url = map[lang] ?? map[lang.toLowerCase()];
        if (url) endpoints.push({ language: lang, url });
      }
    } catch {
      console.error("[judge-ping] LAMBDA_JUDGE_URLS is not valid JSON");
    }
  }
  if (endpoints.length === 0) {
    const single =
      process.env.LAMBDA_JUDGE_URL || process.env.NEXT_PUBLIC_LAMBDA_URL;
    if (single) endpoints.push({ language: "all", url: single });
  }
  return endpoints;
}

async function ping(url: string): Promise<Omit<PingResult, "language">> {
  let host = url;
  try {
    host = new URL(url).host;
  } catch {
    /* keep raw string */
  }
  const started = Date.now();
  try {
    const res = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(PING_TIMEOUT_MS),
      headers: process.env.LAMBDA_JUDGE_TOKEN
        ? { "x-api-token": process.env.LAMBDA_JUDGE_TOKEN }
        : undefined,
    });
    return {
      host,
      ok: true,
      status: res.status,
      ms: Date.now() - started,
    };
  } catch {
    return { host, ok: false, status: null, ms: null };
  }
}

export async function GET() {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  const endpoints = resolveEndpoints();
  if (endpoints.length === 0) {
    return NextResponse.json({ configured: false, results: [] });
  }

  // Several languages share one host — dedupe pings by URL, then fan the
  // shared result back out to every language mapped to that URL.
  const uniqueUrls = [...new Set(endpoints.map((e) => e.url))];
  const urlResults = new Map<string, Omit<PingResult, "language">>();
  await Promise.all(
    uniqueUrls.map(async (url) => {
      urlResults.set(url, await ping(url));
    }),
  );

  const results: PingResult[] = endpoints.map(({ language, url }) => ({
    language,
    ...urlResults.get(url)!,
  }));

  return NextResponse.json({
    configured: true,
    results: results.sort(
      (a, b) =>
        KNOWN_LANGS.indexOf(a.language as (typeof KNOWN_LANGS)[number]) -
        KNOWN_LANGS.indexOf(b.language as (typeof KNOWN_LANGS)[number]),
    ),
  });
}
