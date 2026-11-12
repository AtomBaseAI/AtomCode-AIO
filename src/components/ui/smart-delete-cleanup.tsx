"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CheckCircle2, Database, LoaderIcon, RefreshCcw } from "lucide-react"

/**
 * Reusable "intelligent delete" cleanup list, shared by every destructive
 * delete dialog.
 *
 * Renders one row per related-data section (label + live record count +
 * Remove button). Each section can be wiped independently before the final
 * entity delete; the final delete action also cascades anything left, so
 * removing sections first is an optional, explicit way to see what is about
 * to go.
 *
 * Usage:
 *   <SmartDeleteCleanup entity="course" id={cid} />
 *   <SmartDeleteCleanup entity="course-student" id={uid} cid={cid} />
 *
 * Backed by GET/DELETE /api/cleanup/[entity]/[id] (see that route for the
 * supported entities and their sections).
 */

export type CleanupSection = {
    key: string
    label: string
    subtitle: string
    count: number
}

type SectionStatus = "idle" | "removing" | "removed"

type SectionState = CleanupSection & { status: SectionStatus }

export function SmartDeleteCleanup({
    entity,
    id,
    cid,
    className,
}: {
    entity: string
    id: string
    /** Second id for compound entities (e.g. course-student). */
    cid?: string
    className?: string
}) {
    const [loading, setLoading] = React.useState(true)
    const [loadFailed, setLoadFailed] = React.useState(false)
    const [sections, setSections] = React.useState<SectionState[]>([])

    const base = React.useMemo(
        () => `/api/cleanup/${entity}/${encodeURIComponent(id)}`,
        [entity, id],
    )

    /** Builds the cleanup URL with optional query params (cid, section). */
    const buildUrl = React.useCallback(
        (extra?: Record<string, string>) => {
            const params = new URLSearchParams()
            if (cid) params.set("cid", cid)
            if (extra) {
                for (const [k, v] of Object.entries(extra)) params.set(k, v)
            }
            const qs = params.toString()
            return qs ? `${base}?${qs}` : base
        },
        [base, cid],
    )

    const endpoint = buildUrl()

    /** Fetches the section counts; safe to call from deferred callbacks. */
    const load = React.useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch(endpoint, { cache: "no-store" })
            if (!res.ok) {
                setSections([])
                setLoadFailed(true)
                return
            }
            const payload = (await res.json()) as { sections?: CleanupSection[] }
            const rows = (payload.sections ?? []).map((s) => ({ ...s, status: "idle" as const }))
            setSections(rows)
            setLoadFailed(false)
        } catch {
            setSections([])
            setLoadFailed(true)
        } finally {
            setLoading(false)
        }
    }, [endpoint])

    React.useEffect(() => {
        // Deferred out of the effect body so state updates run in a callback.
        const timer = setTimeout(load, 0)
        return () => clearTimeout(timer)
    }, [load])

    const removeSection = async (key: string) => {
        setSections((prev) =>
            prev.map((s) => (s.key === key ? { ...s, status: "removing" as const } : s)),
        )
        try {
            const res = await fetch(buildUrl({ section: key }), {
                method: "DELETE",
            })
            const payload = await res.json().catch(() => null)
            if (!res.ok) {
                setSections((prev) =>
                    prev.map((s) => (s.key === key ? { ...s, status: "idle" as const } : s)),
                )
                toast.error(payload?.error ?? "Failed to remove records")
                return
            }
            setSections((prev) =>
                prev.map((s) => (s.key === key ? { ...s, status: "removed" as const } : s)),
            )
            toast.success(
                payload?.removed === 0
                    ? "Nothing left to remove"
                    : `Removed ${payload?.removed ?? 0} record(s)`,
            )
        } catch {
            setSections((prev) =>
                prev.map((s) => (s.key === key ? { ...s, status: "idle" as const } : s)),
            )
            toast.error("Failed to remove records")
        }
    }

    if (loading) {
        return (
            <div className={className}>
                <div className="grid gap-2 rounded-lg border p-3">
                    <div className="text-muted-foreground flex items-center gap-2 text-xs">
                        <LoaderIcon className="size-3.5 animate-spin" />
                        Checking related records…
                    </div>
                </div>
            </div>
        )
    }

    if (loadFailed) {
        return (
            <div className={className}>
                <div className="grid gap-2 rounded-lg border p-3">
                    <div className="text-muted-foreground text-xs">
                        Related-record summary unavailable — delete will still clear everything.
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={className}>
            <div className="grid gap-2 rounded-lg border p-3">
                {sections.map((section) => (
                    <CleanupRow
                        key={section.key}
                        section={section}
                        onRemove={() => removeSection(section.key)}
                    />
                ))}
            </div>
        </div>
    )
}

/** One cleanup row: label + record count + Remove button with live status. */
function CleanupRow({
    section,
    onRemove,
}: {
    section: SectionState
    onRemove: () => void
}) {
    const countLabel =
        section.count === 1 ? "1 record found" : `${section.count} records found`

    const summary =
        section.status === "removed" ? (
            <span className="flex items-center gap-1 font-medium text-emerald-600">
                <CheckCircle2 className="size-3.5" />
                Removed
            </span>
        ) : (
            countLabel
        )

    return (
        <div className="flex min-w-0 items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-start gap-2.5">
                <span className="mt-0.5 shrink-0">
                    <Database className="text-primary size-4" />
                </span>
                <div className="min-w-0">
                    <p className="text-sm leading-tight font-medium">{section.label}</p>
                    <p className="text-muted-foreground truncate text-xs">{section.subtitle}</p>
                </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
                {section.status !== "removing" && (
                    <span
                        className={
                            section.status === "removed"
                                ? "text-xs font-medium text-emerald-600"
                                : "text-muted-foreground text-xs"
                        }
                    >
                        {summary}
                    </span>
                )}
                {section.status === "idle" && section.count > 0 && (
                    <Button type="button" variant="outline" size="sm" className="h-8" onClick={onRemove}>
                        <RefreshCcw className="size-3.5" />
                        Remove
                    </Button>
                )}
                {section.status === "idle" && section.count === 0 && (
                    <span className="text-muted-foreground text-xs">Nothing to remove</span>
                )}
                {section.status === "removing" && (
                    <Button type="button" variant="outline" size="sm" className="h-8" disabled>
                        <LoaderIcon className="mr-1.5 size-3.5 animate-spin" />
                        Removing…
                    </Button>
                )}
                {section.status === "removed" && (
                    <Badge variant="outline" className="border-emerald-500/50 text-emerald-600">
                        Done
                    </Badge>
                )}
            </div>
        </div>
    )
}

export default SmartDeleteCleanup
