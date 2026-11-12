"use client"

/**
 * "Import Group" dialog for admin/questions-groups.
 *
 * Picks a JSON file exported via the group export (kind: "question-group"
 * envelope) — or any AtomCode topics/questions export — and POSTs it to
 * POST /api/question-groups/import. A NEW group is created (title deduped)
 * with every topic, sub topic, code question and MCQ from the file.
 */

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { FileJson, FileUp, LoaderIcon, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

interface ParsedEnvelope {
    groupTitle: string
    topics: number
    codeQuestions: number
    mcqQuestions: number
}

interface ImportIssue {
    index: number
    name: string
    error: string
}

interface ImportResponse {
    success?: string
    error?: string
    groupTitle?: string
    createdTopics?: number
    createdSubtopics?: number
    createdQuestions?: number
    createdMcqs?: number
    failed?: number
    errors?: ImportIssue[]
}

/** Read the counts out of any AtomCode export envelope (tolerant). */
function parseEnvelope(json: unknown): ParsedEnvelope | null {
    if (!json || typeof json !== "object" || Array.isArray(json)) return null
    const env = json as Record<string, unknown>
    if (env.atomcodeExport !== true) return null

    const group = (env.group ?? {}) as Record<string, unknown>
    const topics = Array.isArray(env.topics) ? env.topics.length : 0
    const codeQuestions = Array.isArray(env.questions)
        ? env.questions.length
        : 0
    const mcqQuestions = Array.isArray(env.mcqQuestions)
        ? env.mcqQuestions.length
        : Array.isArray(env.mcqs)
          ? (env.mcqs as unknown[]).length
          : 0

    return {
        groupTitle:
            typeof group.title === "string" && group.title.trim() !== ""
                ? group.title
                : typeof env.title === "string"
                  ? env.title
                  : "Untitled group",
        topics,
        codeQuestions,
        mcqQuestions,
    }
}

export function GroupImportDialog() {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [open, setOpen] = useState(false)
    const [isImporting, setIsImporting] = useState(false)
    const [parsed, setParsed] = useState<ParsedEnvelope | null>(null)
    const [pending, setPending] = useState<unknown>(null)
    const [error, setError] = useState("")

    const resetDialog = () => {
        setParsed(null)
        setPending(null)
        setError("")
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleOpenChange = (next: boolean) => {
        setOpen(next)
        if (next) resetDialog()
    }

    const handleFile = async (file: File) => {
        setError("")
        setParsed(null)
        setPending(null)

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

        setPending(json)
        setParsed(envelope)
    }

    const handleImport = async () => {
        if (!pending) return
        setIsImporting(true)
        setError("")
        try {
            const res = await fetch("/api/question-groups/import", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pending),
            })
            const data = (await res.json().catch(() => null)) as ImportResponse | null

            if (!res.ok) {
                setError(data?.error ?? "Import failed.")
                return
            }

            toast.success(data?.success ?? "Question group imported.")
            const firstIssue = data?.errors?.[0]
            if (firstIssue) {
                toast.warning(`Skipped "${firstIssue.name}": ${firstIssue.error}`, {
                    description: "Everything else was imported.",
                })
            }
            setOpen(false)
            router.refresh()
        } catch {
            setError("Network error — please try again.")
        } finally {
            setIsImporting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Upload className="size-4" />
                    Import Group
                </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle>Import Question Group</DialogTitle>
                    <DialogDescription className="text-left text-muted-foreground">
                        Upload a group export (JSON) — a new group is created
                        with all of its topics, sub topics, code questions and
                        MCQs. If a group with the same name exists, the import
                        lands in a deduplicated copy (e.g. &quot;… (imported)&quot;).
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isImporting}
                        className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-center transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                        aria-label="Choose a question group JSON file"
                    >
                        <FileUp className="size-6 text-muted-foreground" />
                        <span className="text-sm font-medium">
                            Click to choose a .json file
                        </span>
                        <span className="text-xs text-muted-foreground">
                            Exports from the table row export button are supported
                        </span>
                    </button>

                    {parsed && (
                        <div className="rounded-lg border bg-muted/40 p-4">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                File contents
                            </p>
                            <div className="mt-2 grid gap-1.5 text-sm">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-muted-foreground">
                                        Group
                                    </span>
                                    <span className="flex min-w-0 items-center gap-2 font-semibold">
                                        <FileJson className="size-4 shrink-0 text-primary" />
                                        <span className="max-w-[240px] truncate">
                                            {parsed.groupTitle}
                                        </span>
                                    </span>
                                </div>
                                <Separator className="my-1" />
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-muted-foreground">
                                        Topics
                                    </span>
                                    <span className="font-semibold">
                                        {parsed.topics}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-muted-foreground">
                                        Code Questions
                                    </span>
                                    <span className="font-semibold">
                                        {parsed.codeQuestions}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-muted-foreground">
                                        MCQ Questions
                                    </span>
                                    <span className="font-semibold">
                                        {parsed.mcqQuestions}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {error && (
                        <p className="text-sm text-destructive" role="alert">
                            {error}
                        </p>
                    )}

                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isImporting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handleImport}
                            disabled={!pending || isImporting}
                            className="gap-2"
                        >
                            {isImporting && (
                                <LoaderIcon className="size-4 animate-spin" />
                            )}
                            Import Group
                        </Button>
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

export default GroupImportDialog
