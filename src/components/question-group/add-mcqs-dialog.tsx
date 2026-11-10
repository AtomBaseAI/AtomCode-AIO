"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Code2, FolderPlus, LoaderIcon, Search, SearchX } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { languages } from "@/components/question/question-table/q-config-data"
import type { GroupMcqRow } from "@/schemas/group-mcq-schema"

interface AddMcqsDialogProps {
    groupId: string
    groupTitle: string
    /** MCQs that can be moved into this group (not already in it). */
    available: GroupMcqRow[]
}

/**
 * Multi-select picker that moves existing MCQs into the group.
 * MCQs already belonging to another group show a badge and are moved.
 */
export function AddMcqsDialog({
    groupId,
    groupTitle,
    available,
}: AddMcqsDialogProps) {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [selected, setSelected] = useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | undefined>("")

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return available
        return available.filter(
            (mcq) =>
                mcq.title.toLowerCase().includes(q) ||
                (mcq.topic?.toLowerCase().includes(q) ?? false) ||
                (mcq.snippetLang?.toLowerCase().includes(q) ?? false)
        )
    }, [available, query])

    const openChangeHandler = (next: boolean) => {
        setOpen(next)
        if (next) {
            setQuery("")
            setSelected([])
            setError("")
        }
    }

    const toggle = (mcqId: string, checked: boolean) => {
        setSelected((prev) =>
            checked ? [...prev, mcqId] : prev.filter((id) => id !== mcqId)
        )
    }

    const handleSubmit = async () => {
        if (selected.length === 0) return
        setError("")
        setIsSubmitting(true)
        try {
            const res = await fetch(
                `/api/question-groups/${groupId}/mcq-questions`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ mcqIds: selected }),
                }
            )
            const data = await res.json().catch(() => null)
            if (!res.ok) {
                setError(data?.error ?? "Something went wrong!")
                return
            }
            toast.success(data?.success ?? "MCQs added to the group")
            setOpen(false)
            router.refresh()
        } catch {
            setError("Network error — please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={openChangeHandler}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <FolderPlus className="size-4" /> Add MCQs
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[620px]">
                <DialogHeader>
                    <DialogTitle>
                        Add MCQs to &quot;{groupTitle}&quot;
                    </DialogTitle>
                    <DialogDescription className="text-left text-muted-foreground">
                        Pick one or more MCQs. An MCQ can live in only one
                        group — moving it here removes it from its previous
                        group.
                    </DialogDescription>
                </DialogHeader>

                <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by title, topic or language"
                        aria-label="Search MCQs to add"
                        className="h-9 pl-8"
                    />
                </div>

                <ScrollArea className="max-h-96 rounded-md border">
                    {filtered.length ? (
                        <ul className="divide-y">
                            {filtered.map((mcq) => {
                                const checked = selected.includes(mcq.id)
                                return (
                                    <li key={mcq.id}>
                                        <label
                                            htmlFor={`pick-mcq-${mcq.id}`}
                                            className="flex cursor-pointer items-center gap-3 px-3 py-2.5 hover:bg-muted/50"
                                        >
                                            <Checkbox
                                                id={`pick-mcq-${mcq.id}`}
                                                checked={checked}
                                                onCheckedChange={(v) =>
                                                    toggle(mcq.id, v === true)
                                                }
                                                aria-label={`Select ${mcq.title}`}
                                            />
                                            <span className="min-w-0 flex-1">
                                                <span className="block truncate font-medium">
                                                    {mcq.title}
                                                </span>
                                            </span>
                                            {mcq.iscodesnippet && (
                                                <Badge
                                                    variant="outline"
                                                    className="shrink-0 gap-1.5"
                                                >
                                                    <Code2 className="size-3.5" />
                                                    {mcq.snippetLang
                                                        ? (languages.find(
                                                              (l) =>
                                                                  l.value ===
                                                                  mcq.snippetLang
                                                          )?.label ??
                                                          mcq.snippetLang)
                                                        : "Snippet"}
                                                </Badge>
                                            )}
                                            {mcq.groupTitle && (
                                                <Badge
                                                    variant="outline"
                                                    className="shrink-0 text-muted-foreground"
                                                >
                                                    from {mcq.groupTitle}
                                                </Badge>
                                            )}
                                        </label>
                                    </li>
                                )
                            })}
                        </ul>
                    ) : (
                        <div className="flex h-40 flex-col items-center justify-center gap-2 text-muted-foreground">
                            <SearchX className="size-8" />
                            <span className="text-sm">
                                No matching MCQs found.
                            </span>
                        </div>
                    )}
                </ScrollArea>

                {error && (
                    <p className="text-sm text-destructive" role="alert">
                        {error}
                    </p>
                )}

                <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-muted-foreground">
                        {selected.length} selected
                    </span>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting || selected.length === 0}
                            className="gap-2"
                        >
                            {isSubmitting && (
                                <LoaderIcon className="size-4 animate-spin" />
                            )}
                            Add {selected.length || ""} MCQ
                            {selected.length === 1 ? "" : "s"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddMcqsDialog
