"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { LoaderIcon, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    ConfirmDeleteInput,
    isConfirmDeleteText,
} from "@/components/ui/confirm-delete"
import SmartDeleteCleanup from "@/components/ui/smart-delete-cleanup"

interface GroupDeleteDialogProps {
    groupId: string
    groupTitle: string
    /** Kept for call-site compatibility — live counts now come from the cleanup API. */
    questionCount?: number
    /** When set, navigate here after the group is deleted (used on detail page). */
    redirectTo?: string
    /** "icon" renders a compact trash button (table rows), "button" a labelled one. */
    variant?: "icon" | "button"
}

/**
 * Typed-confirmation delete dialog for a question group, with the shared
 * smart-delete cleanup list: topics go with the group automatically, while
 * attached questions are only deleted when explicitly removed above —
 * otherwise they become ungrouped.
 */
export function GroupDeleteDialog({
    groupId,
    groupTitle,
    redirectTo,
    variant = "icon",
}: GroupDeleteDialogProps) {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [confirmText, setConfirmText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState<string | undefined>("")

    const openChangeHandler = (next: boolean) => {
        setOpen(next)
        if (next) {
            setConfirmText("")
            setError("")
        }
    }

    const handleDelete = () => {
        setError("")
        setIsDeleting(true)
        fetch(`/api/question-groups/${groupId}`, { method: "DELETE" })
            .then(async (res) => {
                const data = await res.json().catch(() => null)
                if (!res.ok) {
                    setError(data?.error ?? "Something went wrong!")
                    return
                }
                toast.success(`Group "${groupTitle}" deleted`)
                setOpen(false)
                if (redirectTo) {
                    router.push(redirectTo)
                } else {
                    router.refresh()
                }
            })
            .catch(() => setError("Network error — please try again."))
            .finally(() => setIsDeleting(false))
    }

    return (
        <Dialog open={open} onOpenChange={openChangeHandler}>
            <DialogTrigger asChild>
                {variant === "icon" ? (
                    <Button
                        variant="outline"
                        size="icon"
                        className="border-destructive/50 bg-transparent hover:bg-red-700/10"
                        aria-label={`Delete group ${groupTitle}`}
                    >
                        <Trash2 className="size-5 text-destructive" />
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        className="border-destructive/50 bg-transparent hover:bg-red-700/10 gap-2 text-destructive"
                    >
                        <Trash2 className="size-4" /> Delete Group
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className="sm:max-w-[460px]">
                <DialogHeader>
                    <DialogTitle>Delete &quot;{groupTitle}&quot;?</DialogTitle>
                    <DialogDescription className="text-left text-muted-foreground">
                        This deletes the group and its topic tree. Questions can
                        be removed permanently below — any you skip are kept
                        and simply become ungrouped. This action cannot be
                        undone.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    {/* Cleanup sections — run before the final delete */}
                    <SmartDeleteCleanup
                        entity="question-group"
                        id={groupId}
                    />
                    <ConfirmDeleteInput
                        value={confirmText}
                        onValueChange={setConfirmText}
                    />
                    {error && (
                        <p className="text-sm text-destructive" role="alert">
                            {error}
                        </p>
                    )}
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isDeleting || !isConfirmDeleteText(confirmText)}
                            className="gap-2"
                        >
                            {isDeleting && (
                                <LoaderIcon className="size-4 animate-spin" />
                            )}
                            Delete Group
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default GroupDeleteDialog
