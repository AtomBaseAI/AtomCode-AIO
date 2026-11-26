"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

/**
 * Client-side runner for the Lambda judge verifier (POST /api/questions/test).
 *
 * Tracks which questions are currently being judged (blinking purple dots)
 * and locally overrides the testcase verdicts as soon as a run completes so
 * the dots update instantly, while router.refresh() re-syncs the server rows.
 *
 * `runTests(ids)` judges one or many questions — the server runs them in
 * parallel (bounded pool, one Lambda multi-testcase call per question).
 */

export interface TestOverride {
    status: "passed" | "failed"
    results: boolean[]
    testedAt: string
}

export function useQuestionTestRunner() {
    const router = useRouter()
    const [runningIds, setRunningIds] = React.useState<Set<string>>(new Set())
    const [overrides, setOverrides] = React.useState<
        Record<string, TestOverride>
    >({})

    const applyResult = React.useCallback(
        (result: {
            id: string
            status: "passed" | "failed"
            results: boolean[]
            testedAt: string
        }) => {
            setOverrides((prev) => ({
                ...prev,
                [result.id]: {
                    status: result.status,
                    results: result.results,
                    testedAt: result.testedAt,
                },
            }))
        },
        []
    )

    const runTests = React.useCallback(
        async (ids: string[]): Promise<boolean> => {
            const uniqueIds = Array.from(new Set(ids.filter(Boolean)))
            if (uniqueIds.length === 0) return false

            setRunningIds((prev) => {
                const next = new Set(prev)
                uniqueIds.forEach((id) => next.add(id))
                return next
            })

            if (uniqueIds.length > 1) {
                toast.info(
                    `Judging ${uniqueIds.length} question${uniqueIds.length === 1 ? "" : "s"} in parallel…`
                )
            }

            try {
                const res = await fetch("/api/questions/test", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ids: uniqueIds }),
                })
                const data = await res.json().catch(() => null)

                if (!res.ok) {
                    toast.error(
                        (data as { error?: string } | null)?.error ??
                            "Test run failed — please try again."
                    )
                    return false
                }

                const results = (
                    data as {
                        results: {
                            id: string
                            status: "passed" | "failed"
                            results: boolean[]
                            testedAt: string
                            error?: string
                        }[]
                        summary: { total: number; passed: number; failed: number }
                    }
                ).results

                results.forEach(applyResult)

                const summary = (
                    data as {
                        summary: { total: number; passed: number; failed: number }
                    }
                ).summary

                const judged = results.filter((r) => !r.error)
                const judgeErrors = results.filter((r) => r.error)

                if (judged.length > 0) {
                    if (summary.passed === summary.total) {
                        toast.success(
                            `All ${summary.total} question${summary.total === 1 ? "" : "s"} passed the judge.`
                        )
                    } else {
                        toast.warning(
                            `${summary.passed} passed · ${summary.failed} failed.`
                        )
                    }
                }
                if (judgeErrors.length > 0) {
                    toast.error(
                        `${judgeErrors.length} question${judgeErrors.length === 1 ? "" : "s"} could not be judged: ${judgeErrors[0].error ?? "judge unavailable."}`
                    )
                }

                // Re-sync server data (persisted testStatus/testResults).
                router.refresh()
                return true
            } catch {
                toast.error("Network error — please try again.")
                return false
            } finally {
                setRunningIds((prev) => {
                    const next = new Set(prev)
                    uniqueIds.forEach((id) => next.delete(id))
                    return next
                })
            }
        },
        [applyResult, router]
    )

    /** Effective per-row state, merging server rows with local overrides. */
    const getRowTestState = React.useCallback(
        (
            row: {
                id: string
                testStatus: string | null
                testResults: string | null
            }
        ): { status: "passed" | "failed" | "untested"; results: boolean[] | null } => {
            const override = overrides[row.id]
            if (override) {
                return { status: override.status, results: override.results }
            }
            if (row.testStatus === "passed" || row.testStatus === "failed") {
                let results: boolean[] | null = null
                try {
                    const parsed = JSON.parse(row.testResults ?? "null")
                    if (Array.isArray(parsed)) {
                        results = parsed.map((v) => v === true)
                    }
                } catch {
                    results = null
                }
                return { status: row.testStatus, results }
            }
            // Imported / never-tested questions start all red.
            return { status: "untested", results: null }
        },
        [overrides]
    )

    return {
        runTests,
        runningIds,
        overrides,
        getRowTestState,
    }
}

export default useQuestionTestRunner
