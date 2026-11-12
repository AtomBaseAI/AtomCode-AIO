"use client"

/**
 * Topics management view for /admin/questions-groups/[gid]/topics.
 *
 * - Search box filters topics and sub topics by name.
 * - "Create Topic" / "Create Sub Topic" dialogs on the toolbar.
 * - Topics render as cards; opening a card's accordion reveals its sub
 *   topics with rename / delete actions (the default "general" topic and
 *   the "general" sub topics are protected).
 * - Import / Export / Download CSV via TopicsImportExportMenu.
 */

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
    ChevronDown,
    FolderTree,
    LoaderIcon,
    ListTree,
    Pencil,
    Plus,
    Search,
    SearchX,
    Trash,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    ConfirmDeleteInput,
    isConfirmDeleteText,
} from "@/components/ui/confirm-delete"
import { TopicCombobox } from "@/components/question/topic-select"

export interface SubTopicViewData {
    id: string
    name: string
    isDefault: boolean
}

export interface TopicViewData {
    id: string
    name: string
    isDefault: boolean
    subtopics: SubTopicViewData[]
}

interface TopicsViewProps {
    groupId: string
    groupTitle: string
    topics: TopicViewData[]
}

/** Delete dialog with the shared phrase confirmation. */
function PhraseConfirmDialog({
    open,
    onOpenChange,
    title,
    description,
    confirmLabel,
    onConfirm,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description: string
    confirmLabel: string
    onConfirm: () => void
}) {
    const [confirmText, setConfirmText] = useState("")
    const [busy, setBusy] = useState(false)

    const close = (next: boolean) => {
        setConfirmText("")
        onOpenChange(next)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(next) => {
                if (!busy) close(next)
            }}
        >
            <DialogContent className="sm:max-w-[440px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-3">
                    <ConfirmDeleteInput
                        value={confirmText}
                        onValueChange={setConfirmText}
                    />
                    <DialogFooter className="grid w-full grid-cols-2 gap-2 sm:justify-end">
                        <DialogClose asChild>
                            <Button className="w-full">Cancel</Button>
                        </DialogClose>
                        <Button
                            variant="destructive"
                            className="w-full"
                            disabled={busy || !isConfirmDeleteText(confirmText)}
                            onClick={() => {
                                setBusy(true)
                                onConfirm()
                                setBusy(false)
                                close(false)
                            }}
                        >
                            {busy && (
                                <LoaderIcon className="mr-2 size-4 animate-spin" />
                            )}
                            {confirmLabel}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export function TopicsView({ groupId, groupTitle, topics }: TopicsViewProps) {
    const router = useRouter()
    const [search, setSearch] = useState("")

    // ── Create topic ────────────────────────────────────────────────────
    const [createTopicOpen, setCreateTopicOpen] = useState(false)
    const [newTopicName, setNewTopicName] = useState("")
    const [creatingTopic, setCreatingTopic] = useState(false)
    const [createTopicError, setCreateTopicError] = useState("")

    const submitCreateTopic = async () => {
        const name = newTopicName.trim()
        if (!name) {
            setCreateTopicError("Topic name is required")
            return
        }
        setCreatingTopic(true)
        setCreateTopicError("")
        try {
            const res = await fetch(
                `/api/question-groups/${groupId}/topics/create`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name }),
                }
            )
            const data = await res.json().catch(() => null)
            if (!res.ok) {
                setCreateTopicError(data?.error ?? "Failed to create topic.")
                return
            }
            toast.success(data?.success ?? "Topic created.")
            setCreateTopicOpen(false)
            setNewTopicName("")
            router.refresh()
        } catch {
            setCreateTopicError("Network error — please try again.")
        } finally {
            setCreatingTopic(false)
        }
    }

    // ── Create sub topic ────────────────────────────────────────────────
    const [createSubOpen, setCreateSubOpen] = useState(false)
    const [subTopicParent, setSubTopicParent] = useState("general")
    const [newSubName, setNewSubName] = useState("")
    const [creatingSub, setCreatingSub] = useState(false)
    const [createSubError, setCreateSubError] = useState("")

    const submitCreateSubTopic = async () => {
        const name = newSubName.trim()
        if (!name) {
            setCreateSubError("Sub topic name is required")
            return
        }
        const parent = topics.find(
            (t) => t.name.toLowerCase() === subTopicParent.toLowerCase()
        )
        if (!parent) {
            setCreateSubError("Select a topic first.")
            return
        }
        setCreatingSub(true)
        setCreateSubError("")
        try {
            const res = await fetch(
                `/api/question-groups/${groupId}/topics/${parent.id}/subtopics`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name }),
                }
            )
            const data = await res.json().catch(() => null)
            if (!res.ok) {
                setCreateSubError(data?.error ?? "Failed to create sub topic.")
                return
            }
            toast.success(data?.success ?? "Sub topic created.")
            setCreateSubOpen(false)
            setNewSubName("")
            setSubTopicParent("general")
            router.refresh()
        } catch {
            setCreateSubError("Network error — please try again.")
        } finally {
            setCreatingSub(false)
        }
    }

    // ── Rename / delete topic ───────────────────────────────────────────
    const [renameTopic, setRenameTopic] = useState<TopicViewData | null>(null)
    const [renameTopicName, setRenameTopicName] = useState("")
    const [renamingTopic, setRenamingTopic] = useState(false)
    const [renameTopicError, setRenameTopicError] = useState("")

    const submitRenameTopic = async () => {
        if (!renameTopic) return
        const name = renameTopicName.trim()
        if (!name) {
            setRenameTopicError("Topic name is required")
            return
        }
        setRenamingTopic(true)
        setRenameTopicError("")
        try {
            const res = await fetch(`/api/question-groups/${groupId}/topics`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topicId: renameTopic.id, name }),
            })
            const data = await res.json().catch(() => null)
            if (!res.ok) {
                setRenameTopicError(data?.error ?? "Failed to rename topic.")
                return
            }
            toast.success(data?.success ?? "Topic renamed.")
            setRenameTopic(null)
            router.refresh()
        } catch {
            setRenameTopicError("Network error — please try again.")
        } finally {
            setRenamingTopic(false)
        }
    }

    const [deleteTopic, setDeleteTopic] = useState<TopicViewData | null>(null)

    const confirmDeleteTopic = async () => {
        if (!deleteTopic) return
        try {
            const res = await fetch(`/api/question-groups/${groupId}/topics`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topicId: deleteTopic.id }),
            })
            const data = await res.json().catch(() => null)
            if (!res.ok) {
                toast.error(data?.error ?? "Failed to delete topic.")
                return
            }
            toast.success(data?.success ?? "Topic deleted.")
            router.refresh()
        } catch {
            toast.error("Network error — please try again.")
        }
    }

    // ── Rename / delete sub topic ───────────────────────────────────────
    const [renameSub, setRenameSub] = useState<{
        topic: TopicViewData
        sub: SubTopicViewData
    } | null>(null)
    const [renameSubName, setRenameSubName] = useState("")
    const [renamingSub, setRenamingSub] = useState(false)
    const [renameSubError, setRenameSubError] = useState("")

    const submitRenameSub = async () => {
        if (!renameSub) return
        const name = renameSubName.trim()
        if (!name) {
            setRenameSubError("Sub topic name is required")
            return
        }
        setRenamingSub(true)
        setRenameSubError("")
        try {
            const res = await fetch(
                `/api/question-groups/${groupId}/topics/${renameSub.topic.id}/subtopics`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ subTopicId: renameSub.sub.id, name }),
                }
            )
            const data = await res.json().catch(() => null)
            if (!res.ok) {
                setRenameSubError(data?.error ?? "Failed to rename sub topic.")
                return
            }
            toast.success(data?.success ?? "Sub topic renamed.")
            setRenameSub(null)
            router.refresh()
        } catch {
            setRenameSubError("Network error — please try again.")
        } finally {
            setRenamingSub(false)
        }
    }

    const [deleteSub, setDeleteSub] = useState<{
        topic: TopicViewData
        sub: SubTopicViewData
    } | null>(null)

    const confirmDeleteSub = async () => {
        if (!deleteSub) return
        try {
            const res = await fetch(
                `/api/question-groups/${groupId}/topics/${deleteSub.topic.id}/subtopics`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ subTopicId: deleteSub.sub.id }),
                }
            )
            const data = await res.json().catch(() => null)
            if (!res.ok) {
                toast.error(data?.error ?? "Failed to delete sub topic.")
                return
            }
            toast.success(data?.success ?? "Sub topic deleted.")
            router.refresh()
        } catch {
            toast.error("Network error — please try again.")
        }
    }

    // ── Search filter ───────────────────────────────────────────────────
    const filteredTopics = useMemo(() => {
        const q = search.trim().toLowerCase()
        if (!q) return topics
        return topics.flatMap((t) => {
            const topicMatches = t.name.toLowerCase().includes(q)
            const matchingSubs = t.subtopics.filter((s) =>
                s.name.toLowerCase().includes(q)
            )
            if (topicMatches) return [t]
            if (matchingSubs.length > 0) {
                return [{ ...t, subtopics: matchingSubs }]
            }
            return []
        })
    }, [topics, search])

    return (
        <>
            {/* Toolbar — search + create actions on one row */}
            <div className="flex flex-wrap items-center gap-2">
                <div className="relative w-full max-w-sm min-w-[220px] flex-1">
                    <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search topics or sub topics…"
                        className="pl-8"
                        aria-label="Search topics"
                    />
                </div>
                {search && (
                    <Button
                        variant="ghost"
                        className="h-8 px-2 lg:px-3"
                        onClick={() => setSearch("")}
                    >
                        Reset
                    </Button>
                )}
                <div className="ml-auto flex flex-wrap items-center gap-2">
                    <Button
                        className="gap-2 bg-orange-500 text-white hover:bg-orange-600"
                        onClick={() => {
                            setSubTopicParent("general")
                            setNewSubName("")
                            setCreateSubOpen(true)
                        }}
                    >
                        <ListTree className="size-4" />
                        Create Sub Topic
                    </Button>
                    <Button
                        className="gap-2 bg-green-600 text-white hover:bg-green-700"
                        onClick={() => {
                            setNewTopicName("")
                            setCreateTopicOpen(true)
                        }}
                    >
                        <Plus className="size-4" />
                        Create Topic
                    </Button>
                </div>
            </div>

            {/* Topic cards — accordion reveals the sub topics */}
            {filteredTopics.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-10 text-center">
                    {search ? (
                        <SearchX className="size-8 text-muted-foreground" />
                    ) : (
                        <FolderTree className="size-8 text-muted-foreground" />
                    )}
                    <p className="text-muted-foreground">
                        {search
                            ? `No topics match "${search}".`
                            : "No topics yet — create one to get started."}
                    </p>
                </div>
            ) : (
                <Accordion
                    type="multiple"
                    className="grid items-start gap-4 xl:grid-cols-2"
                >
                    {filteredTopics.map((topic) => (
                        <AccordionItem
                            key={topic.id}
                            value={topic.id}
                            className="group/item overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm last:border-b"
                        >
                            <div className="flex w-full items-center">
                                <div className="flex min-w-0 flex-1">
                                    <AccordionTrigger className="w-full min-w-0 items-center px-4 py-3.5 hover:no-underline [&>svg]:hidden">
                                        <span className="flex min-w-0 items-center gap-2.5 text-left">
                                            <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]/item:rotate-180" />
                                            <FolderTree className="size-4 shrink-0 text-primary" />
                                            <span className="truncate font-semibold">
                                                {topic.name}
                                            </span>
                                            {topic.isDefault && (
                                                <Badge
                                                    variant="outline"
                                                    className="shrink-0"
                                                >
                                                    default
                                                </Badge>
                                            )}
                                        </span>
                                        <span className="ml-3 shrink-0 text-xs font-medium tabular-nums text-muted-foreground">
                                            {topic.subtopics.length}{" "}
                                            sub
                                            {topic.subtopics.length === 1
                                                ? ""
                                                : "s"}
                                        </span>
                                    </AccordionTrigger>
                                </div>
                                <span className="flex shrink-0 items-center gap-1 pr-3">
                                    {!topic.isDefault && (
                                        <>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="size-8 hover:bg-purple-700/10"
                                                aria-label={`Rename topic ${topic.name}`}
                                                onClick={() => {
                                                    setRenameTopic(topic)
                                                    setRenameTopicName(topic.name)
                                                    setRenameTopicError("")
                                                }}
                                            >
                                                <Pencil className="size-4 text-primary" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="size-8 text-destructive hover:bg-red-400/20"
                                                aria-label={`Delete topic ${topic.name}`}
                                                onClick={() =>
                                                    setDeleteTopic(topic)
                                                }
                                            >
                                                <Trash className="size-4" />
                                            </Button>
                                        </>
                                    )}
                                </span>
                            </div>
                            <AccordionContent className="border-t bg-muted/40 px-4 pb-4 pt-3">
                                {topic.subtopics.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">
                                        No sub topics yet — use &ldquo;Create
                                        Sub Topic&rdquo; to add one.
                                    </p>
                                ) : (
                                    <ul className="grid gap-2">
                                        {topic.subtopics.map((sub) => (
                                            <li
                                                key={sub.id}
                                                className="flex items-center justify-between gap-2 rounded-lg border bg-background px-3 py-2"
                                            >
                                                <span className="flex min-w-0 items-center gap-2">
                                                    <ListTree className="size-3.5 shrink-0 text-muted-foreground" />
                                                    <span className="truncate text-sm">
                                                        {sub.name}
                                                    </span>
                                                    {sub.isDefault && (
                                                        <Badge
                                                            variant="outline"
                                                            className="shrink-0 text-[10px]"
                                                        >
                                                            default
                                                        </Badge>
                                                    )}
                                                </span>
                                                {!sub.isDefault && (
                                                    <span className="flex shrink-0 items-center gap-0.5">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="size-7 hover:bg-purple-700/10"
                                                            aria-label={`Rename sub topic ${sub.name}`}
                                                            onClick={() => {
                                                                setRenameSub({
                                                                    topic,
                                                                    sub,
                                                                })
                                                                setRenameSubName(
                                                                    sub.name
                                                                )
                                                                setRenameSubError(
                                                                    ""
                                                                )
                                                            }}
                                                        >
                                                            <Pencil className="size-3.5 text-primary" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="size-7 text-destructive hover:bg-red-400/20"
                                                            aria-label={`Delete sub topic ${sub.name}`}
                                                            onClick={() =>
                                                                setDeleteSub({
                                                                    topic,
                                                                    sub,
                                                                })
                                                            }
                                                        >
                                                            <Trash className="size-3.5" />
                                                        </Button>
                                                    </span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}

            {/* ── Create topic dialog ─────────────────────────────────── */}
            <Dialog
                open={createTopicOpen}
                onOpenChange={(next) => {
                    if (!creatingTopic) {
                        setCreateTopicOpen(next)
                        setCreateTopicError("")
                    }
                }}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Topic</DialogTitle>
                        <DialogDescription>
                            A new topic starts with the default
                            &quot;general&quot; sub topic.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3">
                        <Input
                            value={newTopicName}
                            onChange={(e) => setNewTopicName(e.target.value)}
                            placeholder="Topic name (e.g. DSA Basics)"
                            aria-label="Topic name"
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !creatingTopic) {
                                    void submitCreateTopic()
                                }
                            }}
                        />
                        {createTopicError && (
                            <p className="text-sm text-destructive">
                                {createTopicError}
                            </p>
                        )}
                        <DialogFooter className="grid w-full grid-cols-2 gap-2 sm:justify-end">
                            <DialogClose asChild>
                                <Button className="w-full">Cancel</Button>
                            </DialogClose>
                            <Button
                                className="w-full"
                                disabled={creatingTopic}
                                onClick={() => void submitCreateTopic()}
                            >
                                {creatingTopic && (
                                    <LoaderIcon className="mr-2 size-4 animate-spin" />
                                )}
                                Create
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>

            {/* ── Create sub topic dialog ─────────────────────────────── */}
            <Dialog
                open={createSubOpen}
                onOpenChange={(next) => {
                    if (!creatingSub) {
                        setCreateSubOpen(next)
                        setCreateSubError("")
                    }
                }}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Sub Topic</DialogTitle>
                        <DialogDescription>
                            Select the parent topic, then name the sub topic.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3">
                        <div className="grid gap-1.5">
                            <span className="text-sm font-medium">Topic</span>
                            <TopicCombobox
                                options={
                                    topics.length > 0
                                        ? topics.map((t) => t.name)
                                        : ["general"]
                                }
                                value={subTopicParent}
                                onChange={setSubTopicParent}
                                placeholder="Select topic"
                                searchPlaceholder="Search topic…"
                                emptyText="No topic found."
                            />
                        </div>
                        <div className="grid gap-1.5">
                            <span className="text-sm font-medium">
                                Sub topic name
                            </span>
                            <Input
                                value={newSubName}
                                onChange={(e) => setNewSubName(e.target.value)}
                                placeholder="Sub topic name (e.g. Loops)"
                                aria-label="Sub topic name"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !creatingSub) {
                                        void submitCreateSubTopic()
                                    }
                                }}
                            />
                        </div>
                        {createSubError && (
                            <p className="text-sm text-destructive">
                                {createSubError}
                            </p>
                        )}
                        <DialogFooter className="grid w-full grid-cols-2 gap-2 sm:justify-end">
                            <DialogClose asChild>
                                <Button className="w-full">Cancel</Button>
                            </DialogClose>
                            <Button
                                className="w-full"
                                disabled={creatingSub}
                                onClick={() => void submitCreateSubTopic()}
                            >
                                {creatingSub && (
                                    <LoaderIcon className="mr-2 size-4 animate-spin" />
                                )}
                                Create
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>

            {/* ── Rename topic dialog ─────────────────────────────────── */}
            <Dialog
                open={renameTopic !== null}
                onOpenChange={(next) => {
                    if (!next && !renamingTopic) setRenameTopic(null)
                }}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Rename Topic</DialogTitle>
                        <DialogDescription>
                            Questions in this group tagged with the old name
                            are retagged automatically.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3">
                        <Input
                            value={renameTopicName}
                            onChange={(e) => setRenameTopicName(e.target.value)}
                            placeholder="Topic name"
                            aria-label="New topic name"
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !renamingTopic) {
                                    void submitRenameTopic()
                                }
                            }}
                        />
                        {renameTopicError && (
                            <p className="text-sm text-destructive">
                                {renameTopicError}
                            </p>
                        )}
                        <DialogFooter className="grid w-full grid-cols-2 gap-2 sm:justify-end">
                            <DialogClose asChild>
                                <Button className="w-full">Cancel</Button>
                            </DialogClose>
                            <Button
                                className="w-full"
                                disabled={renamingTopic}
                                onClick={() => void submitRenameTopic()}
                            >
                                {renamingTopic && (
                                    <LoaderIcon className="mr-2 size-4 animate-spin" />
                                )}
                                Save
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>

            {/* ── Rename sub topic dialog ─────────────────────────────── */}
            <Dialog
                open={renameSub !== null}
                onOpenChange={(next) => {
                    if (!next && !renamingSub) setRenameSub(null)
                }}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            Rename Sub Topic{renameSub ? ` in "${renameSub.topic.name}"` : ""}
                        </DialogTitle>
                        <DialogDescription>
                            Questions tagged with the old name are retagged
                            automatically.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3">
                        <Input
                            value={renameSubName}
                            onChange={(e) => setRenameSubName(e.target.value)}
                            placeholder="Sub topic name"
                            aria-label="New sub topic name"
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !renamingSub) {
                                    void submitRenameSub()
                                }
                            }}
                        />
                        {renameSubError && (
                            <p className="text-sm text-destructive">
                                {renameSubError}
                            </p>
                        )}
                        <DialogFooter className="grid w-full grid-cols-2 gap-2 sm:justify-end">
                            <DialogClose asChild>
                                <Button className="w-full">Cancel</Button>
                            </DialogClose>
                            <Button
                                className="w-full"
                                disabled={renamingSub}
                                onClick={() => void submitRenameSub()}
                            >
                                {renamingSub && (
                                    <LoaderIcon className="mr-2 size-4 animate-spin" />
                                )}
                                Save
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>

            {/* ── Delete topic confirm ────────────────────────────────── */}
            <PhraseConfirmDialog
                open={deleteTopic !== null}
                onOpenChange={(next) => {
                    if (!next) setDeleteTopic(null)
                }}
                title="Delete Topic"
                description={
                    deleteTopic
                        ? `This permanently deletes "${deleteTopic.name}" and its sub topics. Questions using them fall back to "general". This action cannot be undone.`
                        : ""
                }
                confirmLabel="Delete"
                onConfirm={() => void confirmDeleteTopic()}
            />

            {/* ── Delete sub topic confirm ────────────────────────────── */}
            <PhraseConfirmDialog
                open={deleteSub !== null}
                onOpenChange={(next) => {
                    if (!next) setDeleteSub(null)
                }}
                title="Delete Sub Topic"
                description={
                    deleteSub
                        ? `This permanently deletes "${deleteSub.sub.name}" from "${deleteSub.topic.name}". Questions using it fall back to "general". This action cannot be undone.`
                        : ""
                }
                confirmLabel="Delete"
                onConfirm={() => void confirmDeleteSub()}
            />
        </>
    )
}

export default TopicsView
