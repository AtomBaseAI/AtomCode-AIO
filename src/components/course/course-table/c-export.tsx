"use client"

/**
 * Row action dialog for exporting a course (admin/courses table).
 *
 * Clicking the export icon opens a modal that shows the course's data
 * (title, language, completion order, dates, module count); confirming
 * downloads the re-importable JSON export via
 * GET /api/courses/[id]/export?format=json — the course shell plus every
 * module (structure + data, including reference material), in queue
 * sequence. Questions, students and staffs are deliberately NOT exported.
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
import { CourseTableType } from "@/schemas/course-schema"
import { formatDate } from "@/lib/utils"

interface CourseExportDialogProps {
    course: Pick<
        CourseTableType,
        "id" | "title" | "startdate" | "enddate" | "language" | "completionOrder" | "modulescount"
    >
}

export function CourseExportDialog({ course }: CourseExportDialogProps) {
    const [open, setOpen] = useState(false)
    const [isExporting, setIsExporting] = useState(false)

    const handleExport = () => {
        setIsExporting(true)
        try {
            const url = `/api/courses/${course.id}/export?format=json`
            const anchor = document.createElement("a")
            anchor.href = url
            anchor.rel = "noopener"
            document.body.appendChild(anchor)
            anchor.click()
            anchor.remove()
            toast.success(`Exporting "${course.title}" as JSON`)
            setOpen(false)
        } catch {
            toast.error("Could not start the download — please try again.")
        } finally {
            setIsExporting(false)
        }
    }

    const stats = [
        { label: "Language", value: course.language.toUpperCase() },
        {
            label: "Completion Order",
            value:
                course.completionOrder === "openflow"
                    ? "Open Flow"
                    : course.completionOrder === "daywise"
                      ? "Daywise"
                      : "Queue",
        },
        { label: "Start Date", value: formatDate(new Date(course.startdate)) },
        { label: "End Date", value: formatDate(new Date(course.enddate)) },
        { label: "Modules", value: course.modulescount },
    ]

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="border-primary bg-transparent hover:bg-purple-700/10"
                    aria-label={`Export course ${course.title}`}
                    title={`Export course ${course.title}`}
                >
                    <Download className="size-5 text-primary" />
                </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className="sm:max-w-[460px]">
                <DialogHeader>
                    <DialogTitle>Export &quot;{course.title}&quot;?</DialogTitle>
                    <DialogDescription className="text-left text-muted-foreground">
                        The course is exported as a single JSON file containing
                        its details and every module (structure and data, with
                        reference material) in queue sequence. Questions,
                        students and staffs are not included. The file can be
                        re-imported from the Import Course button on this page.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="rounded-lg border bg-muted/40 p-4">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            Course details
                        </p>
                        <div className="mt-2 grid gap-1.5 text-sm">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-muted-foreground">Title</span>
                                <span className="max-w-[240px] truncate font-semibold">
                                    {course.title}
                                </span>
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

export default CourseExportDialog
