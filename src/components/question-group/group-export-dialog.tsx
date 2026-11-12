"use client"

/**
 * Row action dialog for exporting a question group
 * (admin/questions-groups).
 *
 * Clicking the export icon opens a confirmation modal that shows the group's
 * details (title, created date and content counts); confirming downloads the
 * full-fidelity, re-importable JSON export via
 * GET /api/question-groups/[id]/export?format=json — topics with subtopics,
 * every code question and every MCQ.
 */

import { useState } from "react"
import { toast } from "sonner"
import { Download, LoaderIcon } from "lucide-react"

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

export interface GroupExportDetails {
    id: string
    title: string
    createdAt: string
    /** Code questions (CodeQuestion) inside the group. */
    questionCount: number
    /** MCQ questions (MCQQuestion) inside the group. */
    mcqCount: number
    /** Topics (Topic) inside the group. */
    topicCount: number
}

interface GroupExportDialogProps {
    group: GroupExportDetails
}

export function GroupExportDialog({ group }: GroupExportDialogProps) {
    const [open, setOpen] = useState(false)
    const [isExporting, setIsExporting] = useState(false)

    const handleExport = () => {
        setIsExporting(true)
        try {
            const url = `/api/question-groups/${group.id}/export?format=json`
            const anchor = document.createElement("a")
            anchor.href = url
            anchor.rel = "noopener"
            document.body.appendChild(anchor)
            anchor.click()
            anchor.remove()
            toast.success(`Exporting "${group.title}" as JSON`)
            setOpen(false)
        } catch {
            toast.error("Could not start the download — please try again.")
        } finally {
            setIsExporting(false)
        }
    }

    const created = new Date(group.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })

    const stats = [
        {
            label: "Code Questions",
            value: group.questionCount,
        },
        {
            label: "MCQ Questions",
            value: group.mcqCount,
        },
        {
            label: "Topics",
            value: group.topicCount,
        },
    ]

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="border-primary bg-transparent hover:bg-purple-700/10"
                    aria-label={`Export group ${group.title}`}
                    title={`Export group ${group.title}`}
                >
                    <Download className="size-5 text-primary" />
                </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className="sm:max-w-[460px]">
                <DialogHeader>
                    <DialogTitle>Export &quot;{group.title}&quot;?</DialogTitle>
                    <DialogDescription className="text-left text-muted-foreground">
                        The group is exported as a single JSON file containing
                        its topics with sub topics, every code question (with
                        test cases and server code) and every MCQ. The file can
                        be re-imported from the Import button on this page.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="rounded-lg border bg-muted/40 p-4">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            Group details
                        </p>
                        <div className="mt-2 grid gap-1.5 text-sm">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-muted-foreground">Title</span>
                                <span className="max-w-[240px] truncate font-semibold">
                                    {group.title}
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-muted-foreground">Created</span>
                                <span className="font-semibold">{created}</span>
                            </div>
                            <Separator className="my-1" />
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="flex items-center justify-between gap-4"
                                >
                                    <span className="text-muted-foreground">
                                        {stat.label}
                                    </span>
                                    <span className="font-semibold">
                                        {stat.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isExporting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handleExport}
                            disabled={isExporting}
                            className="gap-2"
                        >
                            {isExporting && (
                                <LoaderIcon className="size-4 animate-spin" />
                            )}
                            <Download className="size-4" />
                            Export as JSON
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default GroupExportDialog
