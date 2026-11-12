"use client"

/**
 * "Import Course" dialog for admin/courses.
 *
 * Picks a JSON file exported via the course row export (kind: "course"
 * envelope) and POSTs it to POST /api/courses/import. A NEW course is
 * created (title deduped) with every module from the file — structure and
 * data (dates, status, language, max score, concept URL, references) — in
 * file order so queue-course sequences survive. Questions, students and
 * staffs are not part of the import, matching the export scope.
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
    courseTitle: string
    language: string
    completionOrder: string
    modules: number
    references: number
}

interface ImportIssue {
    index: number
    name: string
    error: string
}

interface ImportResponse {
    success?: string
    error?: string
    courseTitle?: string
    createdModules?: number
    createdReferences?: number
    failed?: number
    errors?: ImportIssue[]
}

/** Read the counts out of a course export envelope (tolerant). */
function parseEnvelope(json: unknown): ParsedEnvelope | null {
    if (!json || typeof json !== "object" || Array.isArray(json)) return null
    const env = json as Record<string, unknown>
    if (env.atomcodeExport !== true || env.kind !== "course") return null

    const course = (env.course ?? {}) as Record<string, unknown>
    const modules = Array.isArray(env.modules) ? env.modules : []
    const references = modules.reduce((sum, m) => {
        const refs = (m as { references?: unknown })?.references
        return sum + (Array.isArray(refs) ? refs.length : 0)
    }, 0)

    return {
        courseTitle:
            typeof course.title === "string" && course.title.trim() !== ""
                ? course.title
                : typeof env.title === "string"
                  ? env.title
                  : "Untitled course",
        language:
            typeof course.language === "string" ? course.language : "—",
        completionOrder:
            typeof course.completionOrder === "string"
                ? course.completionOrder
                : "—",
        modules: modules.length,
        references,
    }
}

export function ImportCourse() {
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
                "This is not a course export. Export a course first (download icon in a table row), then import that file."
            )
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
            const res = await fetch("/api/courses/import", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pending),
            })
            const data = (await res.json().catch(() => null)) as ImportResponse | null

            if (!res.ok) {
                setError(data?.error ?? "Import failed.")
                return
            }

            toast.success(data?.success ?? "Course imported.")
            const firstIssue = data?.errors?.[0]
            if (firstIssue) {
                toast.warning(`Skipped module "${firstIssue.name}": ${firstIssue.error}`, {
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
                    Import Course
                </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle>Import Course</DialogTitle>
                    <DialogDescription className="text-left text-muted-foreground">
                        Upload a course export (JSON) — a new course is created
                        with all of its modules (structure and data, including
                        reference material). If a course with the same name
                        exists, the import lands in a deduplicated copy
                        (e.g. &quot;… (imported)&quot;).
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isImporting}
                        className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-center transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                        aria-label="Choose a course JSON file"
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
                                        Course
                                    </span>
                                    <span className="flex min-w-0 items-center gap-2 font-semibold">
                                        <FileJson className="size-4 shrink-0 text-primary" />
                                        <span className="max-w-[240px] truncate">
                                            {parsed.courseTitle}
                                        </span>
                                    </span>
                                </div>
                                <Separator className="my-1" />
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-muted-foreground">
                                        Language
                                    </span>
                                    <span className="font-semibold uppercase">
                                        {parsed.language}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-muted-foreground">
                                        Completion Order
                                    </span>
                                    <span className="font-semibold capitalize">
                                        {parsed.completionOrder}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-muted-foreground">
                                        Modules
                                    </span>
                                    <span className="font-semibold">
                                        {parsed.modules}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-muted-foreground">
                                        References
                                    </span>
                                    <span className="font-semibold">
                                        {parsed.references}
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
                            Import Course
                        </Button>
                    </div>
                </div>
            </DialogContent>
            {/* Kept in the a11y tree (sr-only) so it stays keyboard/screen-reader usable. */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                aria-label="Import course JSON file"
                className="sr-only"
                onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (file) void handleFile(file)
                }}
            />
        </Dialog>
    )
}

export default ImportCourse
