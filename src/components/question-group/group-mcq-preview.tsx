"use client"

import * as React from "react"
import {
    CheckCircle2,
    Circle,
    Code2,
    Eye,
    Hash,
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
import type { GroupMcqRow } from "@/schemas/group-mcq-schema"

const DIFFICULTY_STYLES: Record<string, string> = {
    easy: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    medium: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    hard: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30",
}

const OPTION_LETTERS = ["A", "B", "C", "D"] as const

const notAvailable = (v?: string | null) =>
    !v || v.trim() === "" ? "Not available" : v

/**
 * Full-screen preview for an MCQ in
 * /admin/questions-groups/[gid]/mcq-questions. The row already carries
 * every field (options, correct answer, snippet, metadata) so the
 * preview renders entirely client-side.
 */
const GroupMcqPreview = ({ mcq }: { mcq: GroupMcqRow }) => {
    const difficulty = difficulties.find((d) => d.value === mcq.difficulty)
    const snippetLangLabel = mcq.snippetLang
        ? (languages.find((l) => l.value === mcq.snippetLang)?.label ??
          mcq.snippetLang)
        : "Snippet"

    const options = [
        { n: 1, text: mcq.Option1 },
        { n: 2, text: mcq.Option2 },
        { n: 3, text: mcq.Option3 },
        { n: 4, text: mcq.Option4 },
    ]

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="border-primary bg-transparent hover:bg-purple-700/10"
                    aria-label={`Preview MCQ ${mcq.title}`}
                >
                    <Eye className="size-5 text-primary" />
                </Button>
            </DialogTrigger>
            <DialogContent
                aria-describedby={undefined}
                className="flex h-[85vh] max-h-[85vh] w-[80vw] max-w-[80vw] sm:max-w-[80vw] flex-col gap-0 overflow-hidden rounded-xl p-0"
            >
                {/* Sticky header */}
                <DialogHeader className="shrink-0 border-b bg-gradient-to-r from-primary/15 via-primary/5 to-transparent px-6 py-4 pr-16 text-left">
                    <div className="flex flex-wrap items-center gap-2">
                        <DialogTitle className="text-xl font-bold leading-snug">
                            {mcq.title}
                        </DialogTitle>
                        {difficulty && (
                            <Badge
                                variant="outline"
                                className={`border capitalize ${
                                    DIFFICULTY_STYLES[mcq.difficulty] ?? ""
                                }`}
                            >
                                {difficulty.label}
                            </Badge>
                        )}
                        {mcq.iscodesnippet && (
                            <Badge
                                variant="outline"
                                className="gap-1.5 border-primary/30 bg-primary/10 text-primary"
                            >
                                <Code2 className="size-3.5" />
                                {snippetLangLabel} snippet
                            </Badge>
                        )}
                        {mcq.groupTitle && (
                            <Badge
                                variant="outline"
                                className="gap-1.5 border-primary/30 bg-primary/10 text-primary"
                            >
                                <Sparkles className="size-3.5" />
                                {mcq.groupTitle}
                            </Badge>
                        )}
                    </div>
                    <DialogDescription className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        {mcq.topic && (
                            <span>
                                Topic:{" "}
                                <span className="font-medium text-foreground">
                                    {mcq.topic}
                                </span>
                            </span>
                        )}
                        {mcq.subtopic && (
                            <span>
                                Sub topic:{" "}
                                <span className="font-medium text-foreground">
                                    {mcq.subtopic}
                                </span>
                            </span>
                        )}
                        <span>
                            Correct option:{" "}
                            <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                {OPTION_LETTERS[mcq.CorrectOption - 1]} (
                                {mcq.CorrectOption})
                            </span>
                        </span>
                    </DialogDescription>
                </DialogHeader>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto">
                    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6">
                        {/* Description */}
                        <section className="rounded-xl border bg-card shadow-sm">
                            <div className="border-b bg-muted/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Question Description
                            </div>
                            <div className="max-h-52 overflow-y-auto px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words">
                                {notAvailable(mcq.description)}
                            </div>
                        </section>

                        {/* Code snippet */}
                        {mcq.iscodesnippet && mcq.codesnippet && (
                            <section className="flex flex-col gap-2">
                                <h3 className="flex items-center gap-2 text-sm font-semibold">
                                    <Code2 className="size-4 text-primary" />
                                    Code Snippet
                                </h3>
                                <div className="h-[280px] overflow-hidden rounded-xl border shadow-sm">
                                    <CodeEditor
                                        Code={mcq.codesnippet}
                                        readonly={true}
                                        lang={
                                            mcq.snippetLang?.toLowerCase() ??
                                            "javascript"
                                        }
                                    />
                                </div>
                            </section>
                        )}

                        {/* Options */}
                        <section className="flex flex-col gap-3">
                            <h3 className="flex items-center gap-2 text-sm font-semibold">
                                <Hash className="size-4 text-primary" />
                                Answer Options
                            </h3>
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                {options.map((opt) => {
                                    const correct =
                                        mcq.CorrectOption === opt.n
                                    return (
                                        <div
                                            key={opt.n}
                                            className={`flex items-start gap-3 rounded-xl border p-4 shadow-sm transition-colors ${
                                                correct
                                                    ? "border-emerald-500/50 bg-emerald-500/10"
                                                    : "border bg-card"
                                            }`}
                                        >
                                            <span
                                                className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                                                    correct
                                                        ? "bg-emerald-500 text-white"
                                                        : "bg-muted text-muted-foreground"
                                                }`}
                                            >
                                                {OPTION_LETTERS[opt.n - 1]}
                                            </span>
                                            <div className="flex min-w-0 flex-1 flex-col gap-1">
                                                <span
                                                    className={`text-[11px] font-semibold uppercase tracking-wide ${
                                                        correct
                                                            ? "text-emerald-600 dark:text-emerald-400"
                                                            : "text-muted-foreground"
                                                    }`}
                                                >
                                                    Option {opt.n}
                                                    {correct && " — Correct"}
                                                </span>
                                                <pre className="overflow-auto font-sans text-sm leading-relaxed whitespace-pre-wrap break-words">
                                                    {notAvailable(opt.text)}
                                                </pre>
                                            </div>
                                            {correct ? (
                                                <CheckCircle2 className="mt-1 size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                            ) : (
                                                <span className="mt-1 flex items-center gap-1 text-muted-foreground/60">
                                                    <Circle className="size-4" />
                                                    <XCircle className="size-4" />
                                                </span>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </section>

                        {/* Reference image */}
                        {mcq.referenceimg && mcq.referenceimg.trim() !== "" && (
                            <section className="rounded-xl border bg-card shadow-sm">
                                <div className="border-b bg-muted/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    Reference Image
                                </div>
                                <div className="flex justify-center px-4 py-3">
                                    <img
                                        src={mcq.referenceimg}
                                        alt={`Reference image for ${mcq.title}`}
                                        className="max-h-72 rounded-lg border object-contain"
                                    />
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default GroupMcqPreview
