"use client"

/**
 * Import / Export menu for the admin group MCQ-questions page
 * (admin/questions-groups/[gid]/mcq-questions).
 *
 *  - Import MCQs (JSON): picks a .json file (a group export or a bare
 *    array of MCQs) and POSTs it to the import API — every valid
 *    MCQ is created as a new copy inside this group.
 *  - Export MCQs (JSON): downloads the re-importable full-fidelity file.
 *  - Download CSV: flat spreadsheet of the group's MCQs (download only).
 */

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
    ArrowUpDown,
    FileJson,
    FileSpreadsheet,
    FileUp,
    LoaderIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface GroupMcqImportExportMenuProps {
    groupId: string
    groupTitle: string
}

interface ImportIssue {
    index: number
    title: string
    error: string
}

export function GroupMcqImportExportMenu({
    groupId,
    groupTitle,
}: GroupMcqImportExportMenuProps) {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isImporting, setIsImporting] = useState(false)

    /** Trigger a same-origin authenticated file download. */
    const download = (format: "json" | "csv") => {
        const url = `/api/question-groups/${groupId}/mcq-questions/export?format=${format}`
        const anchor = document.createElement("a")
        anchor.href = url
        anchor.rel = "noopener"
        document.body.appendChild(anchor)
        anchor.click()
        anchor.remove()
    }

    const handleImportFile = async (file: File) => {
        setIsImporting(true)
        try {
            let payload: unknown
            try {
                payload = JSON.parse(await file.text())
            } catch {
                toast.error("That file is not valid JSON.")
                return
            }

            const res = await fetch(
                `/api/question-groups/${groupId}/mcq-questions/import`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            )
            const data = (await res.json().catch(() => null)) as {
                success?: string
                error?: string
                created?: number
                failed?: number
                errors?: ImportIssue[]
            } | null

            if (!res.ok) {
                toast.error(data?.error ?? "Import failed.")
                return
            }

            toast.success(data?.success ?? "MCQs imported.")
            const firstIssue = data?.errors?.[0]
            if (firstIssue) {
                toast.warning(
                    `Skipped "${firstIssue.title}": ${firstIssue.error}`,
                    { description: "All other MCQs were imported." }
                )
            }
            router.refresh()
        } catch {
            toast.error("Network error — please try again.")
        } finally {
            setIsImporting(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        disabled={isImporting}
                        aria-label={`Import or export MCQs for ${groupTitle}`}
                    >
                        {isImporting ? (
                            <LoaderIcon className="mr-2 size-4 animate-spin" />
                        ) : (
                            <ArrowUpDown className="mr-2 size-4" />
                        )}
                        Import / Export
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                        MCQs in &quot;{groupTitle}&quot;
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isImporting}
                    >
                        <FileUp className="mr-2 size-4" />
                        <div className="flex flex-col">
                            <span>Import MCQs (JSON)</span>
                            <span className="text-[11px] text-muted-foreground">
                                adds each MCQ as a new copy
                            </span>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => download("json")}>
                        <FileJson className="mr-2 size-4" />
                        <div className="flex flex-col">
                            <span>Export MCQs (JSON)</span>
                            <span className="text-[11px] text-muted-foreground">
                                full fidelity, re-importable
                            </span>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => download("csv")}>
                        <FileSpreadsheet className="mr-2 size-4" />
                        <div className="flex flex-col">
                            <span>Download CSV</span>
                            <span className="text-[11px] text-muted-foreground">
                                spreadsheet view (download only)
                            </span>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {/* Kept in the a11y tree (sr-only) so it stays keyboard/screen-reader usable. */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                aria-label="Import MCQs JSON file"
                className="sr-only"
                onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (file) void handleImportFile(file)
                }}
            />
        </>
    )
}

export default GroupMcqImportExportMenu
