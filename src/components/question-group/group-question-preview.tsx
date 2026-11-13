"use client"

import * as React from "react"
import {
    Braces,
    CheckCircle2,
    Eye,
    FileWarning,
    Hash,
    LoaderIcon,
    ShieldAlert,
    ShieldCheck,
    Sparkles,
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
import CodeEditor from "@/components/ide/codeeditor"
import {
    difficulties,
    languages,
} from "@/components/question/question-table/q-config-data"

/** Full question payload returned by GET /api/questions/[qid]. */
type FullQuestion = {
    id: string
    title: string
    description: string
    sampleinput1: string
    sampleinput2: string
    sampleoutput1: string
    sampleoutput2: string
    input1: string
    input2: string
    input3: string
    output1: string
    output2: string
    output3: string
    sourcecode: string
    referenceimg?: string
    maxscore: number
    difficulty: string
    lang: string
    topic?: string
    subtopic?: string
    inputconstrains?: string
    blacklist?: string
    whitelist?: string
    questionGroupId: string | null
    questionGroupTitle: string | null
}

const DIFFICULTY_STYLES: Record<string, string> = {
    easy: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    medium: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    hard: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30",
}

const notAvailable = (v?: string | null) =>
    !v || v.trim() === "" ? "Not available" : v

/** Small labelled info card used across the preview body. */
const InfoCard = ({
    label,
    children,
    className = "",
}: {
    label: string
    children: React.ReactNode
    className?: string
}) => (
    <section
        className={`rounded-xl border bg-card shadow-sm overflow-hidden ${className}`}
    >
        <div className="border-b bg-muted/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {label}
        </div>
        <div className="px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words">
            {children}
        </div>
    </section>
)

/** Mono I/O block used for sample & hidden test cases. */
const IOBlock = ({
    label,
    value,
    tone = "neutral",
}: {
    label: string
    value: string
    tone?: "neutral" | "input" | "output"
}) => (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {tone === "input" && (
                <ArrowIn className="size-3.5 text-sky-600 dark:text-sky-400" />
            )}
            {tone === "output" && (
                <ArrowOut className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            )}
            {label}
        </span>
        <pre className="min-h-[42px] overflow-auto rounded-lg border bg-muted/50 px-3 py-2 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words">
            {value && value.trim() !== "" ? value : "—"}
        </pre>
    </div>
)

/* Arrow icons (local, keeps imports tidy) */
const ArrowIn = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
    </svg>
)
const ArrowOut = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 21V9" />
        <path d="m7 14 5-5 5 5" />
        <path d="M5 3h14" />
    </svg>
)

/**
 * Full-screen preview for a code question in
 * /admin/questions-groups/[gid]/code-questions. The group table only
 * carries a slim row, so the complete question is fetched from
 * GET /api/questions/[qid] when the dialog opens.
 */
const GroupQuestionPreview = ({ qid }: { qid: string }) => {
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const [question, setQuestion] = React.useState<FullQuestion | null>(null)

    const handleOpenChange = async (next: boolean) => {
        setOpen(next)
        if (!next) return
        setLoading(true)
        setError(null)
        setQuestion(null)
        try {
            const res = await fetch(`/api/questions/${qid}`)
            if (!res.ok) throw new Error("failed")
            const data = await res.json()
            setQuestion(data.question as FullQuestion)
        } catch {
            setError("Could not load the question. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const difficulty = question
        ? difficulties.find((d) => d.value === question.difficulty)
        : undefined
    const language = question
        ? languages.find((l) => l.value === question.lang?.toLowerCase())
        : undefined

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="border-primary bg-transparent hover:bg-purple-700/10"
                    aria-label="Preview question"
                >
                    <Eye className="size-5 text-primary" />
                </Button>
            </DialogTrigger>
            <DialogContent
                aria-describedby={undefined}
                showCloseButton={!loading}
                className="flex h-screen max-h-screen w-screen max-w-none sm:max-w-none flex-col gap-0 overflow-hidden rounded-none border-0 p-0"
            >
                {loading && (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                        <LoaderIcon className="size-10 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground">
                            Loading question…
                        </p>
                    </div>
                )}

                {!loading && error && (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                        <FileWarning className="size-12 text-destructive" />
                        <p className="text-sm text-muted-foreground">{error}</p>
                        <Button
                            variant="outline"
                            onClick={() => handleOpenChange(true)}
                        >
                            Retry
                        </Button>
                    </div>
                )}

                {!loading && !error && question && (
                    <>
                        {/* Sticky header */}
                        <DialogHeader className="shrink-0 border-b bg-gradient-to-r from-primary/15 via-primary/5 to-transparent px-6 py-4 pr-16 text-left">
                            <div className="flex flex-wrap items-center gap-2">
                                <DialogTitle className="text-xl font-bold leading-snug">
                                    {question.title}
                                </DialogTitle>
                                {difficulty && (
                                    <Badge
                                        variant="outline"
                                        className={`border capitalize ${
                                            DIFFICULTY_STYLES[
                                                question.difficulty
                                            ] ?? ""
                                        }`}
                                    >
                                        {difficulty.label}
                                    </Badge>
                                )}
                                {language && (
                                    <Badge
                                        variant="outline"
                                        className="gap-1.5 border-primary/30 bg-primary/10 text-primary"
                                    >
                                        <Braces className="size-3.5" />
                                        {language.label}
                                    </Badge>
                                )}
                                <Badge
                                    variant="outline"
                                    className="gap-1.5 border-primary/30 bg-primary/10 text-primary"
                                >
                                    <Hash className="size-3.5" />
                                    Max score: {question.maxscore}
                                </Badge>
                                {question.questionGroupTitle && (
                                    <Badge
                                        variant="outline"
                                        className="gap-1.5 border-primary/30 bg-primary/10 text-primary"
                                    >
                                        <Sparkles className="size-3.5" />
                                        {question.questionGroupTitle}
                                    </Badge>
                                )}
                            </div>
                            <DialogDescription className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                {question.topic && (
                                    <span>
                                        Topic:{" "}
                                        <span className="font-medium text-foreground">
                                            {question.topic}
                                        </span>
                                    </span>
                                )}
                                {question.subtopic && (
                                    <span>
                                        Sub topic:{" "}
                                        <span className="font-medium text-foreground">
                                            {question.subtopic}
                                        </span>
                                    </span>
                                )}
                            </DialogDescription>
                        </DialogHeader>

                        {/* Scrollable body */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6">
                                {/* Top: description + starter code */}
                                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                                    <div className="flex flex-col gap-4">
                                        <InfoCard label="Description">
                                            <div className="max-h-64 overflow-y-auto">
                                                {notAvailable(
                                                    question.description
                                                )}
                                            </div>
                                        </InfoCard>

                                        <InfoCard label="Input Constraints">
                                            {notAvailable(
                                                question.inputconstrains
                                            )}
                                        </InfoCard>

                                        {(question.whitelist ||
                                            question.blacklist) && (
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                <InfoCard label="Whitelist">
                                                    <span className="flex items-start gap-2">
                                                        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                                        <span className="font-mono text-xs">
                                                            {notAvailable(
                                                                question.whitelist
                                                            )}
                                                        </span>
                                                    </span>
                                                </InfoCard>
                                                <InfoCard label="Blacklist">
                                                    <span className="flex items-start gap-2">
                                                        <ShieldAlert className="mt-0.5 size-4 shrink-0 text-red-600 dark:text-red-400" />
                                                        <span className="font-mono text-xs">
                                                            {notAvailable(
                                                                question.blacklist
                                                            )}
                                                        </span>
                                                    </span>
                                                </InfoCard>
                                            </div>
                                        )}
                                    </div>

                                    <InfoCard
                                        label="Starter Code"
                                        className="flex min-h-[320px] flex-col"
                                    >
                                        <div className="flex h-full min-h-[280px] flex-col">
                                            {question.sourcecode &&
                                            question.sourcecode.trim() !==
                                                "" ? (
                                                <div className="h-full flex-1 overflow-hidden rounded-lg border">
                                                    <CodeEditor
                                                        Code={
                                                            question.sourcecode
                                                        }
                                                        readonly={true}
                                                        lang={question.lang?.toLowerCase()}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                                                    No starter code provided
                                                </div>
                                            )}
                                        </div>
                                    </InfoCard>
                                </div>

                                {/* Sample cases */}
                                <section className="flex flex-col gap-3">
                                    <h3 className="flex items-center gap-2 text-sm font-semibold">
                                        <CheckCircle2 className="size-4 text-primary" />
                                        Sample Cases
                                    </h3>
                                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                        <div className="rounded-xl border bg-card p-4 shadow-sm">
                                            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                                Sample 1
                                            </p>
                                            <div className="flex flex-col gap-3 sm:flex-row">
                                                <IOBlock
                                                    label="Input"
                                                    tone="input"
                                                    value={
                                                        question.sampleinput1
                                                    }
                                                />
                                                <IOBlock
                                                    label="Output"
                                                    tone="output"
                                                    value={
                                                        question.sampleoutput1
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="rounded-xl border bg-card p-4 shadow-sm">
                                            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                                Sample 2
                                            </p>
                                            <div className="flex flex-col gap-3 sm:flex-row">
                                                <IOBlock
                                                    label="Input"
                                                    tone="input"
                                                    value={
                                                        question.sampleinput2
                                                    }
                                                />
                                                <IOBlock
                                                    label="Output"
                                                    tone="output"
                                                    value={
                                                        question.sampleoutput2
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Hidden test cases */}
                                <section className="flex flex-col gap-3">
                                    <h3 className="flex items-center gap-2 text-sm font-semibold">
                                        <XCircle className="size-4 text-primary" />
                                        Hidden Test Cases
                                    </h3>
                                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                                        {[
                                            {
                                                n: 1,
                                                input: question.input1,
                                                output: question.output1,
                                            },
                                            {
                                                n: 2,
                                                input: question.input2,
                                                output: question.output2,
                                            },
                                            {
                                                n: 3,
                                                input: question.input3,
                                                output: question.output3,
                                            },
                                        ].map((tc) => (
                                            <div
                                                key={tc.n}
                                                className="rounded-xl border bg-card p-4 shadow-sm"
                                            >
                                                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                                    Test case {tc.n}
                                                </p>
                                                <div className="flex flex-col gap-3">
                                                    <IOBlock
                                                        label="Input"
                                                        tone="input"
                                                        value={tc.input}
                                                    />
                                                    <IOBlock
                                                        label="Expected output"
                                                        tone="output"
                                                        value={tc.output}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Reference image */}
                                {question.referenceimg &&
                                    question.referenceimg.trim() !== "" && (
                                        <InfoCard label="Reference Image">
                                            <img
                                                src={question.referenceimg}
                                                alt={`Reference image for ${question.title}`}
                                                className="max-h-72 rounded-lg border object-contain"
                                            />
                                        </InfoCard>
                                    )}
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default GroupQuestionPreview
