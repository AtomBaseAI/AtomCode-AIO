"use client"

/**
 * Import / Export menu for the admin staffs page (admin/staffs).
 *
 *  - Import staffs (JSON): picks a .json file (a staffs export or a bare
 *    array of staff records) and POSTs it to the import API — every valid
 *    staff member is created with the default password (Staff@Atom);
 *    invalid or duplicate records are skipped and reported.
 *  - Export staffs (JSON): downloads the re-importable file (no passwords).
 *  - Download CSV: flat spreadsheet of all staff members (download only).
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

interface ImportIssue {
    index: number
    email: string
    error: string
}

export function StaffImportExportMenu() {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isImporting, setIsImporting] = useState(false)

    /** Trigger a same-origin authenticated file download. */
    const download = (format: "json" | "csv") => {
        const url = `/api/staffs/export?format=${format}`
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

            const res = await fetch("/api/staffs/import", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })
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

            toast.success(data?.success ?? "Staff members imported.")
            const firstIssue = data?.errors?.[0]
            if (firstIssue) {
                toast.warning(
                    `Skipped "${firstIssue.email}": ${firstIssue.error}`,
                    { description: "All other staff members were imported." }
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
                        aria-label="Import or export staff members"
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
                        Staffs
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isImporting}
                    >
                        <FileUp className="mr-2 size-4" />
                        <div className="flex flex-col">
                            <span>Import staffs (JSON)</span>
                            <span className="text-[11px] text-muted-foreground">
                                adds each staff member with the default password
                            </span>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => download("json")}>
                        <FileJson className="mr-2 size-4" />
                        <div className="flex flex-col">
                            <span>Export staffs (JSON)</span>
                            <span className="text-[11px] text-muted-foreground">
                                no passwords, re-importable
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
                aria-label="Import staffs JSON file"
                className="sr-only"
                onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (file) void handleImportFile(file)
                }}
            />
        </>
    )
}

export default StaffImportExportMenu
