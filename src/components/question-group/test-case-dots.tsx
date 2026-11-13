"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Per-question testcase verdict — 5 dots in the fixed judge order:
 *   [sample 1, sample 2] · [hidden 1, hidden 2, hidden 3]
 * (2 sample dots, a small gap, then 3 hidden dots.)
 */
export type TestCaseDotsState = {
    /** Per-case pass booleans; null ⇒ never tested (all red). */
    results: boolean[] | null
    status: "passed" | "failed" | "untested"
    /** Question is currently being judged (blinking purple sequence). */
    running?: boolean
}

const DOT_ORDER = [
    "Sample 1",
    "Sample 2",
    "Hidden 1",
    "Hidden 2",
    "Hidden 3",
] as const

/**
 * Five compact dot indicators. Colors:
 *  - green  — case passed
 *  - red    — case failed OR never tested (imported questions default)
 *  - purple — blinking sequence while the Lambda judge run is in flight
 */
export function TestCaseDots({ state }: { state: TestCaseDotsState }) {
    const { results, status, running } = state

    return (
        <div
            className="flex items-center"
            role="status"
            aria-label={`Testcases ${
                running
                    ? "running"
                    : status === "passed"
                      ? "all passed"
                      : status === "failed"
                        ? "failed"
                        : "not tested"
            }`}
        >
            {DOT_ORDER.map((label, index) => {
                const passed = results?.[index] === true
                return (
                    <span
                        key={label}
                        title={
                            running
                                ? `${label} — testing…`
                                : `${label} — ${
                                      passed
                                          ? "Passed"
                                          : status === "untested"
                                            ? "Not tested"
                                            : "Failed"
                                  }`
                        }
                        className={cn(
                            "tc-dot",
                            // Visual gap between the 2 sample dots and the
                            // 3 hidden dots.
                            index === 2 && "ml-2",
                            running
                                ? "tc-dot-running"
                                : passed
                                  ? "tc-dot-pass"
                                  : "tc-dot-fail"
                        )}
                        style={
                            running
                                ? { animationDelay: `${index * 140}ms` }
                                : undefined
                        }
                    />
                )
            })}
        </div>
    )
}

export default TestCaseDots
