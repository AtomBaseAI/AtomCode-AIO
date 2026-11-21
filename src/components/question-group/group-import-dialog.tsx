"use client"

/**
 * "Import Group" wizard for admin/questions-groups — a staged, staging-style
 * step form in an 80vw × 80vh modal:
 *
 *   Step 1 — Select File:  drag & drop / click, parses the envelope
 *            client-side and previews the content counts.
 *   Step 2 — Validate:     POSTs the file to the dry-run validate endpoint
 *            (/api/question-groups/import/validate) and shows the FULL
 *            report before anything is written — final deduplicated group
 *            title, valid/invalid counts per row kind, per-row issues.
 *   Step 3 — Import:       streams the import (NDJSON, ?stream=1) with a
 *            live progress bar, per-phase upload counts (topics → code
 *            questions → MCQs) and a done/error report.
 *
 * Nothing is written to the database until the user presses "Import" on
 * step 2 — validation is a pure read-only dry run.
 */

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
    AlertTriangle,
    Braces,
    Check,
    CheckCircle2,
    ChevronRight,
    FileJson,
    FileUp,
    HelpCircle,
    LoaderIcon,
    ListChecks,
    ShieldAlert,
    ShieldCheck,
    Upload,
    XCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

type Step = "select" | "validate" | "import"
type Phase = "topics" | "code" | "mcq"

interface ParsedEnvelope {
    groupTitle: string
    topics: number
    subtopics: number
    codeQuestions: number
    mcqQuestions: number
}

interface ValidationIssue {
    kind: Phase
    index: number
    name: string
    error: string
}

interface ValidationReport {
    ok: boolean
    baseTitle: string
    finalTitle: string
    titleRenamed: boolean
    counts: { topics: number; subtopics: number; codeQuestions: number; mcqQuestions: number }
    validCounts: { topics: number; codeQuestions: number; mcqQuestions: number }
    invalidCounts: { topics: number; codeQuestions: number; mcqQuestions: number }
    importable: boolean
    issues: ValidationIssue[]
    totalIssues: number
}

interface ImportResult {
    success?: string
    error?: string
    groupTitle?: string
    createdTopics?: number
    createdSubtopics?: number
    createdQuestions?: number
    createdMcqs?: number
    failed?: number
    errors?: ValidationIssue[]
}

type StreamEvent =
    | { t: "start"; counts: Record<string, number>; validCounts: Record<string, number> }
    | { t: "title"; title: string; renamed: boolean }
    | { t: "group"; groupId: string }
    | { t: "phase"; phase: Phase; total: number }
    | { t: "progress"; phase: Phase; done: number; total: number; inserted: number; failed: number }
    | { t: "done"; status: number; result: ImportResult }

interface PhaseState {
    total: number
    done: number
    inserted: number
    failed: number
}

const EMPTY_PHASE: PhaseState = { total: 0, done: 0, inserted: 0, failed: 0 }

const MAX_FILE_BYTES = 50 * 1024 * 1024 // 50 MB soft cap

// ─── Client-side envelope preview (tolerant) ─────────────────────────────────

function parseEnvelope(json: unknown): ParsedEnvelope | null {
    if (!json || typeof json !== "object" || Array.isArray(json)) return null
    const env = json as Record<string, unknown>
    if (env.atomcodeExport !== true) return null

    const group = (env.group ?? {}) as Record<string, unknown>
    const topics = Array.isArray(env.topics) ? env.topics : []
    const questions = Array.isArray(env.questions) ? env.questions : []
    const mcqs = Array.isArray(env.mcqQuestions)
        ? env.mcqQuestions
        : Array.isArray(env.mcqs)
          ? (env.mcqs as unknown[])
          : []
    const subtopics = topics.reduce((sum, t) => {
        const subs = (t as { subtopics?: unknown })?.subtopics
        return sum + (Array.isArray(subs) ? subs.length : 0)
    }, 0)

    return {
        groupTitle:
            typeof group.title === "string" && group.title.trim() !== ""
                ? group.title
                : typeof env.title === "string"
                  ? env.title
                  : "Untitled group",
        topics: topics.length,
        subtopics,
        codeQuestions: questions.length,
        mcqQuestions: mcqs.length,
    }
}

function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatCount(n: number): string {
    return n.toLocaleString()
}

// ─── Component ───────────────────────────────────────────────────────────────

export function GroupImportDialog() {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [open, setOpen] = useState(false)

    // Wizard state
    const [step, setStep] = useState<Step>("select")
    const [parsed, setParsed] = useState<ParsedEnvelope | null>(null)
    const [pending, setPending] = useState<unknown>(null)
    const [fileMeta, setFileMeta] = useState<{ name: string; size: number } | null>(null)
    const [error, setError] = useState("")
    const [dragOver, setDragOver] = useState(false)

    // Validation state
    const [validating, setValidating] = useState(false)
    const [validation, setValidation] = useState<ValidationReport | null>(null)

    // Import state
    const [importing, setImporting] = useState(false)
    const [currentPhase, setCurrentPhase] = useState<Phase | null>(null)
    const [phases, setPhases] = useState<Record<Phase, PhaseState>>({
        topics: { ...EMPTY_PHASE },
        code: { ...EMPTY_PHASE },
        mcq: { ...EMPTY_PHASE },
    })
    const [importTitle, setImportTitle] = useState<string | null>(null)
    const [result, setResult] = useState<{ status: number; data: ImportResult } | null>(null)
    const abortRef = useRef<AbortController | null>(null)

    const resetAll = useCallback(() => {
        setStep("select")
        setParsed(null)
        setPending(null)
        setFileMeta(null)
        setError("")
        setDragOver(false)
        setValidating(false)
        setValidation(null)
        setImporting(false)
        setCurrentPhase(null)
        setPhases({ topics: { ...EMPTY_PHASE }, code: { ...EMPTY_PHASE }, mcq: { ...EMPTY_PHASE } })
        setImportTitle(null)
        setResult(null)
        abortRef.current?.abort()
        abortRef.current = null
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }, [])

    const handleOpenChange = (next: boolean) => {
        // Block accidental close while the import stream is running.
        if (!next && importing && !result) return
        setOpen(next)
        if (next) resetAll()
    }

    // ── File selection (step 1) ────────────────────────────────────────────
    const handleFile = async (file: File) => {
        setError("")
        setParsed(null)
        setPending(null)
        setValidation(null)
        setResult(null)

        if (file.size > MAX_FILE_BYTES) {
            setError(
                `File is too large (${formatBytes(file.size)}) — the limit is ${formatBytes(MAX_FILE_BYTES)}.`
            )
            return
        }

        let json: unknown
        try {
            json = JSON.parse(await file.text())
        } catch {
            setError("That file is not valid JSON.")
            return
        }

        const envelope = parseEnvelope(json)
        if (!envelope) {
            setError(
                "This is not an AtomCode export. Export a question group first, then import that file."
            )
            return
        }
        if (
            envelope.topics === 0 &&
            envelope.codeQuestions === 0 &&
            envelope.mcqQuestions === 0
        ) {
            setError("The file has no topics, code questions or MCQs to import.")
            return
        }

        setFileMeta({ name: file.name, size: file.size })
        setPending(json)
        setParsed(envelope)
    }

    // ── Validation (step 2) ────────────────────────────────────────────────
    const handleValidate = async () => {
        if (!pending) return
        setValidating(true)
        setError("")
        setValidation(null)
        try {
            const res = await fetch("/api/question-groups/import/validate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pending),
            })
            const data = (await res.json().catch(() => null)) as
                | (ValidationReport & { error?: string })
                | null
            if (!res.ok) {
                setError(data?.error ?? "Validation failed — please try again.")
                return
            }
            setValidation(data)
            setStep("validate")
        } catch {
            setError("Network error while validating — please try again.")
        } finally {
            setValidating(false)
        }
    }

    // ── Import (step 3) — NDJSON stream ────────────────────────────────────
    const handleEvent = useCallback((ev: StreamEvent) => {
        if (ev.t === "start") {
            setPhases({
                topics: { ...EMPTY_PHASE, total: ev.validCounts.topics ?? 0 },
                code: { ...EMPTY_PHASE, total: ev.validCounts.codeQuestions ?? 0 },
                mcq: { ...EMPTY_PHASE, total: ev.validCounts.mcqQuestions ?? 0 },
            })
        } else if (ev.t === "title") {
            setImportTitle(ev.title)
        } else if (ev.t === "phase") {
            setCurrentPhase(ev.phase)
            setPhases((prev) => ({ ...prev, [ev.phase]: { ...prev[ev.phase], total: ev.total } }))
        } else if (ev.t === "progress") {
            setPhases((prev) => ({
                ...prev,
                [ev.phase]: {
                    ...prev[ev.phase],
                    done: ev.done,
                    total: ev.total,
                    inserted: ev.inserted,
                    failed: ev.failed,
                },
            }))
        } else if (ev.t === "done") {
            setResult({ status: ev.status, data: ev.result })
            setCurrentPhase(null)
        }
    }, [])

    const handleImport = async () => {
        if (!pending) return
        setImporting(true)
        setResult(null)
        setError("")
        setPhases({ topics: { ...EMPTY_PHASE }, code: { ...EMPTY_PHASE }, mcq: { ...EMPTY_PHASE } })
        setCurrentPhase(null)

        const controller = new AbortController()
        abortRef.current = controller

        try {
            const res = await fetch("/api/question-groups/import?stream=1", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pending),
                signal: controller.signal,
            })

            if (!res.ok || !res.body) {
                const data = (await res.json().catch(() => null)) as ImportResult | null
                setError(data?.error ?? "Import failed — please try again.")
                setResult({ status: res.status, data: data ?? { error: "Import failed." } })
                return
            }

            const reader = res.body.getReader()
            const decoder = new TextDecoder()
            let buffer = ""
            let streamDone = false

            while (!streamDone) {
                const { done, value } = await reader.read()
                if (done) break
                buffer += decoder.decode(value, { stream: true })
                const lines = buffer.split("\n")
                buffer = lines.pop() ?? ""
                for (const line of lines) {
                    if (!line.trim()) continue
                    try {
                        const ev = JSON.parse(line) as StreamEvent
                        handleEvent(ev)
                        if (ev.t === "done") streamDone = true
                    } catch {
                        // Ignore a malformed line — never break the stream.
                    }
                }
            }
            router.refresh()
        } catch (err) {
            if ((err as Error)?.name !== "AbortError") {
                setError("Network error while importing — please try again.")
            }
        } finally {
            setImporting(false)
            abortRef.current = null
        }
    }

    // Guard: Escape / outside click while streaming does nothing.
    useEffect(() => {
        if (!open || !importing || result) return
        // Radix calls onOpenChange(false) on Esc/outside — handled in
        // handleOpenChange by ignoring closes mid-import.
    }, [open, importing, result])

    const overallTotal =
        phases.topics.total + phases.code.total + phases.mcq.total
    const overallDone =
        phases.topics.done + phases.code.done + phases.mcq.done
    const overallPct =
        overallTotal > 0 ? Math.min(100, Math.round((overallDone / overallTotal) * 100)) : 0
    const totalFailed = phases.topics.failed + phases.code.failed + phases.mcq.failed
    const importFinished = result !== null && !importing

    const totalItems = parsed
        ? parsed.topics + parsed.codeQuestions + parsed.mcqQuestions
        : 0
    const importableCount = validation
        ? validation.validCounts.topics +
          validation.validCounts.codeQuestions +
          validation.validCounts.mcqQuestions
        : 0

    const stepIndex = step === "select" ? 0 : step === "validate" ? 1 : 2
    const stepDefs = [
        { label: "Select File" },
        { label: "Validate" },
        { label: "Import" },
    ]

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Upload className="size-4" />
                    Import Group
                </Button>
            </DialogTrigger>
            <DialogContent
                aria-describedby={undefined}
                className="flex h-[80vh] w-[80vw] max-w-none flex-col gap-0 overflow-hidden p-0 sm:h-[80vh] sm:max-w-[80vw]"
            >
                {/* ── Header + step indicator ─────────────────────────────── */}
                <DialogHeader className="shrink-0 border-b px-6 pb-4 pt-6">
                    <DialogTitle>Import Question Group</DialogTitle>
                    <DialogDescription className="text-left text-muted-foreground">
                        Staged import — pick a file, validate it against the
                        live schemas, then upload with a live progress bar.
                        Nothing is written until you start the import.
                    </DialogDescription>
                    <div className="mt-4 flex items-center gap-2" aria-label="Import steps">
                        {stepDefs.map((def, i) => (
                            <div key={def.label} className="flex items-center gap-2">
                                {i > 0 && (
                                    <span
                                        className={cn(
                                            "h-px w-10 sm:w-16",
                                            i <= stepIndex ? "bg-primary" : "bg-border"
                                        )}
                                        aria-hidden
                                    />
                                )}
                                <span
                                    className={cn(
                                        "flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
                                        i < stepIndex && "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                                        i === stepIndex && "border-primary bg-primary/10 text-primary",
                                        i > stepIndex && "border-border text-muted-foreground"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "flex size-5 items-center justify-center rounded-full text-[10px] font-bold",
                                            i < stepIndex && "bg-emerald-500 text-white",
                                            i === stepIndex && "bg-primary text-primary-foreground",
                                            i > stepIndex && "bg-muted-foreground/20 text-muted-foreground"
                                        )}
                                    >
                                        {i < stepIndex ? <Check className="size-3" /> : i + 1}
                                    </span>
                                    {def.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </DialogHeader>

                {/* ── Body ────────────────────────────────────────────────── */}
                <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
                    {/* ═══ STEP 1 — Select file ═══ */}
                    {step === "select" && (
                        <div className="mx-auto grid max-w-2xl gap-5">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={validating}
                                onDragOver={(e) => {
                                    e.preventDefault()
                                    setDragOver(true)
                                }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={(e) => {
                                    e.preventDefault()
                                    setDragOver(false)
                                    const file = e.dataTransfer.files?.[0]
                                    if (file) void handleFile(file)
                                }}
                                className={cn(
                                    "flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-10 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
                                    dragOver
                                        ? "border-primary bg-primary/10"
                                        : "border-border hover:bg-muted/50"
                                )}
                                aria-label="Choose or drop a question group JSON file"
                            >
                                <FileUp className="size-8 text-muted-foreground" />
                                <span className="text-sm font-medium">
                                    Drop a .json file here, or click to browse
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    Full group exports, topics / questions / MCQ
                                    part-exports — up to {formatBytes(MAX_FILE_BYTES)}
                                </span>
                            </button>

                            {fileMeta && (
                                <div className="flex items-center justify-between gap-4 rounded-lg border bg-muted/40 px-4 py-3 text-sm">
                                    <span className="flex min-w-0 items-center gap-2">
                                        <FileJson className="size-4 shrink-0 text-primary" />
                                        <span className="min-w-0 truncate font-medium">
                                            {fileMeta.name}
                                        </span>
                                    </span>
                                    <span className="shrink-0 text-xs text-muted-foreground">
                                        {formatBytes(fileMeta.size)}
                                    </span>
                                </div>
                            )}

                            {parsed && (
                                <div className="rounded-lg border bg-muted/40 p-4">
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                        File contents
                                    </p>
                                    <div className="mt-2 grid gap-1.5 text-sm">
                                        <div className="flex items-center justify-between gap-4">
                                            <span className="text-muted-foreground">Group</span>
                                            <span className="flex min-w-0 items-center gap-2 font-semibold">
                                                <span className="max-w-[280px] truncate">
                                                    {parsed.groupTitle}
                                                </span>
                                            </span>
                                        </div>
                                        <Separator className="my-1" />
                                        <div className="grid grid-cols-2 gap-3">
                                            <CountRow label="Topics" value={parsed.topics} sub={`${parsed.subtopics} sub topics`} />
                                            <CountRow label="Code Questions" value={parsed.codeQuestions} icon="code" />
                                            <CountRow label="MCQ Questions" value={parsed.mcqQuestions} icon="mcq" />
                                            <CountRow label="Total Items" value={totalItems} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <p className="flex items-center gap-2 text-sm text-destructive" role="alert">
                                    <AlertTriangle className="size-4 shrink-0" />
                                    {error}
                                </p>
                            )}
                        </div>
                    )}

                    {/* ═══ STEP 2 — Validation report ═══ */}
                    {step === "validate" && (
                        <div className="mx-auto grid max-w-3xl gap-5">
                            {validating && (
                                <div className="flex items-center justify-center gap-3 py-14 text-sm text-muted-foreground">
                                    <LoaderIcon className="size-5 animate-spin" />
                                    Validating {formatCount(totalItems)} item(s) against
                                    the import schemas…
                                </div>
                            )}

                            {!validating && validation && (
                                <>
                                    {/* Summary */}
                                    <div className="rounded-lg border bg-muted/40 p-4">
                                        <div className="flex items-center justify-between gap-4">
                                            <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                                Validation report
                                            </p>
                                            {validation.importable ? (
                                                <Badge className="gap-1 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" variant="outline">
                                                    <ShieldCheck className="size-3.5" />
                                                    Ready to import
                                                </Badge>
                                            ) : (
                                                <Badge className="gap-1 bg-destructive/10 text-destructive" variant="outline">
                                                    <ShieldAlert className="size-3.5" />
                                                    Nothing importable
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                            <div className="rounded-md border bg-background/60 p-3">
                                                <p className="text-xs text-muted-foreground">Group title</p>
                                                <p className="mt-1 flex min-w-0 items-center gap-2 text-sm font-semibold">
                                                    <span className="min-w-0 truncate">{validation.finalTitle}</span>
                                                    {validation.titleRenamed && (
                                                        <Badge variant="outline" className="shrink-0 text-[10px] uppercase">
                                                            renamed
                                                        </Badge>
                                                    )}
                                                </p>
                                                {validation.titleRenamed && (
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        A group named &quot;{validation.baseTitle}&quot; already
                                                        exists — the import lands in the deduplicated copy above.
                                                    </p>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <MiniStat
                                                    label="Topics"
                                                    valid={validation.validCounts.topics}
                                                    invalid={validation.invalidCounts.topics}
                                                    total={validation.counts.topics}
                                                />
                                                <MiniStat
                                                    label="Code Questions"
                                                    valid={validation.validCounts.codeQuestions}
                                                    invalid={validation.invalidCounts.codeQuestions}
                                                    total={validation.counts.codeQuestions}
                                                />
                                                <MiniStat
                                                    label="MCQs"
                                                    valid={validation.validCounts.mcqQuestions}
                                                    invalid={validation.invalidCounts.mcqQuestions}
                                                    total={validation.counts.mcqQuestions}
                                                />
                                                <MiniStat
                                                    label="Sub Topics"
                                                    valid={validation.counts.subtopics}
                                                    invalid={0}
                                                    total={validation.counts.subtopics}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info banner */}
                                    <div className="flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
                                        <ListChecks className="mt-0.5 size-4 shrink-0 text-primary" />
                                        <p className="text-muted-foreground">
                                            This was a dry run — nothing has been imported yet.
                                            {validation.totalIssues > 0 &&
                                                ` ${formatCount(validation.totalIssues)} item(s) will be skipped during the upload.`}
                                        </p>
                                    </div>

                                    {/* Issues list */}
                                    {validation.totalIssues > 0 && (
                                        <div className="rounded-lg border border-amber-500/40 bg-amber-500/5 p-4">
                                            <p className="flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400">
                                                <AlertTriangle className="size-4 shrink-0" />
                                                {formatCount(validation.totalIssues)} issue(s) found
                                            </p>
                                            <div className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1">
                                                {validation.issues.map((issue, i) => (
                                                    <div
                                                        key={`${issue.kind}-${issue.index}-${i}`}
                                                        className="rounded-md border bg-background/60 p-2.5 text-xs"
                                                    >
                                                        <p className="flex items-center gap-1.5 font-medium">
                                                            <KindBadge kind={issue.kind} />
                                                            <span className="text-muted-foreground">#{issue.index}</span>
                                                            <span className="min-w-0 flex-1 truncate">{issue.name}</span>
                                                        </p>
                                                        <p className="mt-1 pl-1 text-muted-foreground">{issue.error}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            {validation.totalIssues > validation.issues.length && (
                                                <p className="mt-2 text-xs text-muted-foreground">
                                                    Showing the first {validation.issues.length} of{" "}
                                                    {formatCount(validation.totalIssues)}.
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {error && (
                                        <p className="flex items-center gap-2 text-sm text-destructive" role="alert">
                                            <AlertTriangle className="size-4 shrink-0" />
                                            {error}
                                        </p>
                                    )}
                                </>
                            )}

                            {!validating && !validation && error && (
                                <p className="flex items-center gap-2 text-sm text-destructive" role="alert">
                                    <AlertTriangle className="size-4 shrink-0" />
                                    {error}
                                </p>
                            )}
                        </div>
                    )}

                    {/* ═══ STEP 3 — Import with live progress ═══ */}
                    {step === "import" && (
                        <div className="mx-auto grid max-w-3xl gap-6">
                            {/* Live progress */}
                            <div className="rounded-lg border bg-muted/40 p-5">
                                <div className="flex items-center justify-between gap-4">
                                    <p className="text-sm font-semibold">
                                        {importFinished
                                            ? "Import finished"
                                            : importing
                                              ? "Uploading…"
                                              : "Waiting to start"}
                                    </p>
                                    <p className="text-sm font-semibold tabular-nums">
                                        {formatCount(overallDone)} / {formatCount(overallTotal)} items
                                        <span className="ml-2 text-muted-foreground">{overallPct}%</span>
                                    </p>
                                </div>
                                <Progress value={overallPct} className="mt-3 h-3" aria-label="Overall import progress" />
                                {importTitle && !importFinished && (
                                    <p className="mt-2 text-xs text-muted-foreground">
                                        Creating group{" "}
                                        <span className="font-medium text-foreground">{importTitle}</span>
                                    </p>
                                )}
                                {importing && (
                                    <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                        <LoaderIcon className="size-3 animate-spin" />
                                        {currentPhase === "topics" && "Importing topics and sub topics…"}
                                        {currentPhase === "code" && "Inserting code questions…"}
                                        {currentPhase === "mcq" && "Inserting MCQs…"}
                                        {!currentPhase && "Preparing…"}
                                        {totalFailed > 0 && (
                                            <span className="text-amber-600 dark:text-amber-400">
                                                · {formatCount(totalFailed)} failed so far
                                            </span>
                                        )}
                                    </p>
                                )}
                            </div>

                            {/* Per-phase rows */}
                            <div className="grid gap-3">
                                <PhaseRow
                                    label="Topics & Sub Topics"
                                    state={phases.topics}
                                    active={currentPhase === "topics" && importing}
                                    finished={result !== null || (phases.topics.total > 0 && phases.topics.done >= phases.topics.total)}
                                    icon={<ListChecks className="size-4" />}
                                    insertedLabel="topics created"
                                />
                                <PhaseRow
                                    label="Code Questions"
                                    state={phases.code}
                                    active={currentPhase === "code" && importing}
                                    finished={result !== null || (phases.code.total > 0 && phases.code.done >= phases.code.total)}
                                    icon={<Braces className="size-4" />}
                                    insertedLabel="questions inserted"
                                />
                                <PhaseRow
                                    label="MCQ Questions"
                                    state={phases.mcq}
                                    active={currentPhase === "mcq" && importing}
                                    finished={result !== null || (phases.mcq.total > 0 && phases.mcq.done >= phases.mcq.total)}
                                    icon={<HelpCircle className="size-4" />}
                                    insertedLabel="MCQs inserted"
                                />
                            </div>

                            {/* Done / error panel */}
                            {result && (
                                <div className="grid gap-4">
                                    {result.status === 201 && result.data.success ? (
                                        <div className="flex items-start gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/5 p-4 text-sm">
                                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                            <div>
                                                <p className="font-semibold">{result.data.success}</p>
                                                {result.data.failed > 0 && (
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        {formatCount(result.data.failed)} item(s) were skipped —
                                                        see the list below.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm">
                                            <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                                            <div>
                                                <p className="font-semibold text-destructive">
                                                    {result.data.error ?? "Import failed."}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {error && (
                                        <p className="flex items-center gap-2 text-sm text-destructive" role="alert">
                                            <AlertTriangle className="size-4 shrink-0" />
                                            {error}
                                        </p>
                                    )}

                                    {result.data.errors && result.data.errors.length > 0 && (
                                        <div className="rounded-lg border border-amber-500/40 bg-amber-500/5 p-4">
                                            <p className="flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400">
                                                <AlertTriangle className="size-4 shrink-0" />
                                                Skipped items
                                            </p>
                                            <div className="mt-3 max-h-56 space-y-2 overflow-y-auto pr-1">
                                                {result.data.errors.map((issue, i) => (
                                                    <div
                                                        key={`${issue.kind}-${issue.index}-${i}`}
                                                        className="rounded-md border bg-background/60 p-2.5 text-xs"
                                                    >
                                                        <p className="flex items-center gap-1.5 font-medium">
                                                            <KindBadge kind={issue.kind} />
                                                            <span className="text-muted-foreground">#{issue.index}</span>
                                                            <span className="min-w-0 flex-1 truncate">{issue.name}</span>
                                                        </p>
                                                        <p className="mt-1 pl-1 text-muted-foreground">{issue.error}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* ── Footer ──────────────────────────────────────────────── */}
                <div className="flex shrink-0 items-center justify-between gap-3 border-t bg-background px-6 py-4">
                    <p className="min-w-0 truncate text-xs text-muted-foreground">
                        {step === "select" && parsed && fileMeta
                            ? `${fileMeta.name} · ${formatBytes(fileMeta.size)}`
                            : step === "validate" && validation
                              ? validation.importable
                                  ? `${formatCount(importableCount)} valid item(s) · ${formatCount(validation.totalIssues)} issue(s)`
                                  : "No importable items in this file"
                              : step === "import" && importFinished && result?.status === 201
                                ? "Group imported — the list has been refreshed."
                                : ""}
                    </p>
                    <div className="flex shrink-0 justify-end gap-2">
                        {step === "select" && (
                            <>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setOpen(false)}
                                    disabled={validating}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleValidate}
                                    disabled={!pending || validating}
                                    className="gap-2"
                                >
                                    {validating ? (
                                        <LoaderIcon className="size-4 animate-spin" />
                                    ) : (
                                        <ShieldCheck className="size-4" />
                                    )}
                                    Validate
                                    <ChevronRight className="size-4" />
                                </Button>
                            </>
                        )}
                        {step === "validate" && (
                            <>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setStep("select")
                                        setValidation(null)
                                    }}
                                    disabled={importing}
                                >
                                    Back
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setStep("import")
                                        void handleImport()
                                    }}
                                    disabled={!validation?.importable || importing}
                                    className="gap-2"
                                >
                                    <Upload className="size-4" />
                                    Import {formatCount(importableCount)} item(s)
                                </Button>
                            </>
                        )}
                        {step === "import" && (
                            <Button
                                type="button"
                                onClick={() => setOpen(false)}
                                disabled={importing}
                                className="gap-2"
                            >
                                {importFinished ? (
                                    <>
                                        <Check className="size-4" />
                                        Done
                                    </>
                                ) : (
                                    <>
                                        <LoaderIcon className="size-4 animate-spin" />
                                        Importing…
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
            {/* Kept in the a11y tree (sr-only) so it stays keyboard/screen-reader usable. */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                aria-label="Import question group JSON file"
                className="sr-only"
                onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (file) void handleFile(file)
                }}
            />
        </Dialog>
    )
}

// ─── Small presentational helpers ────────────────────────────────────────────

function CountRow({
    label,
    value,
    sub,
    icon,
}: {
    label: string
    value: number
    sub?: string
    icon?: "code" | "mcq"
}) {
    return (
        <div className="flex items-center justify-between gap-3 rounded-md border bg-background/60 px-3 py-2">
            <span className="flex items-center gap-1.5 text-muted-foreground">
                {icon === "code" && <Braces className="size-3.5" />}
                {icon === "mcq" && <HelpCircle className="size-3.5" />}
                {label}
            </span>
            <span className="text-right">
                <span className="font-semibold tabular-nums">{formatCount(value)}</span>
                {sub && <span className="ml-1.5 text-xs text-muted-foreground">({sub})</span>}
            </span>
        </div>
    )
}

function MiniStat({
    label,
    valid,
    invalid,
    total,
}: {
    label: string
    valid: number
    invalid: number
    total: number
}) {
    return (
        <div className="rounded-md border bg-background/60 p-3">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-1 flex items-baseline gap-1.5">
                <span className="text-lg font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                    {formatCount(valid)}
                </span>
                <span className="text-xs text-muted-foreground">valid</span>
                {invalid > 0 && (
                    <span className="ml-auto text-xs font-semibold text-amber-600 dark:text-amber-400">
                        {formatCount(invalid)} invalid
                    </span>
                )}
            </p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">of {formatCount(total)} in file</p>
        </div>
    )
}

function KindBadge({ kind }: { kind: Phase }) {
    return (
        <Badge variant="outline" className="shrink-0 text-[10px] uppercase">
            {kind === "topics" ? "topic" : kind === "code" ? "code" : "mcq"}
        </Badge>
    )
}

function PhaseRow({
    label,
    state,
    active,
    finished,
    icon,
    insertedLabel,
}: {
    label: string
    state: PhaseState
    active: boolean
    finished: boolean
    icon: React.ReactNode
    insertedLabel: string
}) {
    const pct =
        state.total > 0 ? Math.min(100, Math.round((state.done / state.total) * 100)) : 0
    return (
        <div
            className={cn(
                "rounded-lg border p-4 transition-colors",
                active && "border-primary/50 bg-primary/5",
                finished && state.total > 0 && "border-emerald-500/30 bg-emerald-500/5"
            )}
        >
            <div className="flex items-center justify-between gap-3">
                <p className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-primary">{icon}</span>
                    {label}
                    {active && <LoaderIcon className="size-3.5 animate-spin text-primary" />}
                    {finished && state.total > 0 && (
                        <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
                    )}
                </p>
                <p className="text-xs tabular-nums text-muted-foreground">
                    {formatCount(state.done)} / {formatCount(state.total)}
                    {state.inserted > 0 && ` · ${formatCount(state.inserted)} ${insertedLabel}`}
                    {state.failed > 0 && (
                        <span className="ml-1 font-semibold text-amber-600 dark:text-amber-400">
                            · {formatCount(state.failed)} failed
                        </span>
                    )}
                </p>
            </div>
            <Progress value={pct} className="mt-2 h-1.5" aria-label={`${label} progress`} />
        </div>
    )
}

export default GroupImportDialog
