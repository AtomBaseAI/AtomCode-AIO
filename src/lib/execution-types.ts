/**
 * Shared execution protocol between the UI (lib/judge.ts) and the
 * execution transports (Lambda judge, server toolchains).
 *
 * Protocol rules:
 * - Compilation errors go to a structured error response (stage "compile").
 * - Runtime output goes to stdout; runtime diagnostics go to stderr.
 * - Stdin is explicit — browser prompt() is never used.
 */

import type { LanguageId } from "./runtime-registry";

export interface SqlQueryPayload {
  columns: string[];
  rows: (string | null)[][];
  changes?: number;
}

export interface RunResult {
  type: "result";
  executionId: string;
  stdout: string;
  stderr: string;
  compileTimeMs?: number;
  executionTimeMs?: number;
  exitCode?: number;
  /** SQLite only: structured query result for grid rendering. */
  sql?: SqlQueryPayload;
}

export interface RunError {
  type: "error";
  executionId: string;
  message: string;
  stage: "loading" | "compile" | "execute";
}

export type WorkerResponse = RunResult | RunError;
