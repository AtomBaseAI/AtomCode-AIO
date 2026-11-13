/**
 * Shared AWS Lambda judge runner for the OOPS using CPP question bank.
 * Speaks the app's RunRequest/RunResult protocol directly to the cpp Lambda.
 */
import { readFileSync } from "node:fs";

function loadEnv() {
  try {
    const raw = readFileSync(new URL("../.env", import.meta.url), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z_0-9]+)\s*=\s*'?\"?([^'\"\n]*)'?\"?\s*$/);
      if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
    }
  } catch { /* .env may already be in process.env */ }
}
loadEnv();

export const CPP_URL =
  process.env.CPP_LAMBDA_URL ||
  JSON.parse(process.env.LAMBDA_JUDGE_URLS || "{}")["cpp"] ||
  "https://k3vo2ahf7pgosox6wqjny54l5u0rxsvx.lambda-url.ap-south-1.on.aws/";

/** Mirrors src/lib/judge.ts normalizeOutput */
export function normalizeOutput(value) {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n")
    .replace(/\n+$/g, "")
    .trim();
}

let chain = Promise.resolve();
let inflight = 0;
const MAX_CONCURRENCY = 4;

/** Simple worker-pool runner to keep Lambda warm without hammering it. */
export async function pool(jobs, concurrency = MAX_CONCURRENCY) {
  const results = new Array(jobs.length);
  let next = 0;
  async function worker() {
    while (next < jobs.length) {
      const i = next++;
      results[i] = await jobs[i]().catch((e) => ({ __error: e }));
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, jobs.length) }, worker)
  );
  return results;
}

export async function runOnLambda(code, stdin, timeoutMs = 30000) {
  const body = JSON.stringify({
    type: "run",
    language: "cpp",
    versionProfileId: "cpp-cpp17",
    code,
    stdin: stdin ?? "",
    timeoutMs,
  });
  let lastStatus = 0;
  for (let attempt = 0; attempt < 8; attempt++) {
    const res = await fetch(CPP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    if (res.status === 429 || res.status === 502 || res.status === 503) {
      lastStatus = res.status;
      // exponential backoff with jitter
      const wait = Math.min(1500 * 2 ** attempt, 15000) + Math.random() * 400;
      await sleep(wait);
      continue;
    }
    if (!res.ok) throw new Error(`Lambda HTTP ${res.status}`);
    return res.json();
  }
  throw new Error(`Lambda rate-limited after retries (HTTP ${lastStatus})`);
}

/**
 * Run and return { ok, stdout(normalized), raw } — throws on transport errors.
 * A program is "ok" when it reaches the execute stage with exitCode 0.
 */
export async function execCpp(code, stdin, timeoutMs = 30000) {
  const r = await runOnLambda(code, stdin, timeoutMs);
  if (r.type !== "result") {
    return {
      ok: false,
      stdout: "",
      stderr: r.message || "lambda error",
      stage: r.stage || "unknown",
      exitCode: -1,
    };
  }
  const ok = r.exitCode === 0 && (!r.stage || r.stage === "execute");
  return {
    ok,
    stdout: normalizeOutput(r.stdout),
    stderr: normalizeOutput(r.stderr),
    stage: r.stage,
    exitCode: r.exitCode,
  };
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
