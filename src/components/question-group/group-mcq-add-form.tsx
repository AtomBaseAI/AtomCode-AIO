"use client"

/**
 * "Create MCQ" dialog for the admin group MCQ-questions page
 * (admin/questions-groups/[gid]/mcq-questions).
 *
 * Creates a brand-new MCQ directly inside the locked question group via
 * POST /api/question-groups/[id]/mcq-questions/create.
 */

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Code2, FileText, LoaderIcon, Puzzle } from "lucide-react"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FormError } from "@/components/auth/form-error"
import { FormSuccess } from "@/components/auth/form-success"
import {
    QuestionDialogShell,
    QuestionFormSection,
} from "@/components/question/question-form-layout"
import CodeEditorField from "@/components/code/code-editor-field"
import { languages } from "@/components/question/question-table/q-config-data"
import { GroupMcqSchema } from "@/schemas/group-mcq-schema"
import {
    TopicCombobox,
    useGroupTopics,
} from "@/components/question/topic-select"

interface GroupMcqAddFormProps {
    /** The group this dialog creates MCQs inside (locked — not selectable). */
    lockedGroup: { id: string; title: string }
    triggerLabel?: string
}

export const GroupMcqAddForm = ({
    lockedGroup,
    triggerLabel,
}: GroupMcqAddFormProps) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const label = triggerLabel ?? "Create MCQ"

    const form = useForm<z.infer<typeof GroupMcqSchema>>({
        resolver: zodResolver(GroupMcqSchema),
        defaultValues: {
            title: "",
            description: "",
            Option1: "",
            Option2: "",
            Option3: "",
            Option4: "",
            CorrectOption: 1,
            referenceimg: "",
            codesnippet: "",
            iscodesnippet: false,
            snippetLang: "python",
            topic: "general",
            subtopic: "general",
        },
    })

    const isCodeSnippet = form.watch("iscodesnippet")
    const snippetLang = form.watch("snippetLang")

    // Topic / sub topic options come from the group's topic registry
    // (default "general" is always offered).
    const { topics: groupTopics, loading: topicsLoading } = useGroupTopics(
        lockedGroup.id
    )
    const watchedTopic = form.watch("topic")
    const watchedSubtopic = form.watch("subtopic")

    const topicOptions = useMemo(() => {
        const names = groupTopics.map((t) => t.name)
        if (watchedTopic && !names.includes(watchedTopic)) names.push(watchedTopic)
        return names.length > 0 ? names : ["general"]
    }, [groupTopics, watchedTopic])

    const subTopicOptions = useMemo(() => {
        const parent = groupTopics.find(
            (t) => t.name.toLowerCase() === (watchedTopic ?? "").toLowerCase()
        )
        const names = parent
            ? parent.subtopics.map((s) => s.name)
            : ["general"]
        if (watchedSubtopic && !names.includes(watchedSubtopic)) {
            names.push(watchedSubtopic)
        }
        return names.length > 0 ? names : ["general"]
    }, [groupTopics, watchedTopic, watchedSubtopic])

    const handleTopicChange = (name: string) => {
        form.setValue("topic", name)
        // Keep the pair consistent — fall back to the default sub topic.
        const parent = groupTopics.find(
            (t) => t.name.toLowerCase() === name.toLowerCase()
        )
        const subs = parent
            ? parent.subtopics.map((s) => s.name)
            : ["general"]
        const current = form.getValues("subtopic")
        if (!current || !subs.includes(current)) {
            form.setValue("subtopic", "general")
        }
    }

    const handleModalClose = () => {
        form.reset()
        setError("")
        setSuccess("")
    }

    const handleSubmit = async (values: z.infer<typeof GroupMcqSchema>) => {
        setError("")
        setSuccess("")
        setIsLoading(true)
        try {
            const res = await fetch(
                `/api/question-groups/${lockedGroup.id}/mcq-questions/create`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                }
            )
            const data = await res.json().catch(() => null)
            if (!res.ok) {
                setError(data?.error ?? "Failed to create MCQ.")
                toast.error(data?.error ?? "Failed to create MCQ.")
                return
            }
            toast.success(data?.success ?? "MCQ created.")
            form.reset()
            setOpen(false)
            router.refresh()
        } catch {
            setError("Network error — please try again.")
            toast.error("Network error — please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Dialog
                open={open}
                onOpenChange={(isOpen) => {
                    if (!isOpen) handleModalClose()
                    setOpen(isOpen)
                }}
            >
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="bg-green-500 text-white hover:bg-green-700 hover:text-white"
                    >
                        <Puzzle className="mr-2" />
                        {label}
                    </Button>
                </DialogTrigger>
                <QuestionDialogShell
                    title={label}
                    footer={
                        <>
                            <div className="flex min-w-0 flex-wrap items-center gap-2">
                                <FormError message={error} />
                                <FormSuccess message={success} />
                            </div>
                            <div className="flex flex-wrap items-center justify-end gap-2">
                                <Button
                                    type="button"
                                    disabled={isLoading}
                                    onClick={form.handleSubmit(handleSubmit)}
                                >
                                    {isLoading && (
                                        <LoaderIcon className="mr-2 size-4 animate-spin" />
                                    )}
                                    Create MCQ
                                </Button>
                            </div>
                        </>
                    }
                >
                    <Form {...form}>
                        <form onSubmit={(e) => e.preventDefault()}>
                            {/* ── Section 1: Question details ─────────────────────────── */}
                            <QuestionFormSection
                                icon={<FileText className="size-4" />}
                                title="Question details"
                                description="What the student will see."
                            >
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Question Title</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isLoading}
                                                        placeholder="Question"
                                                        type="text"
                                                        autoComplete="false"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        disabled={isLoading}
                                                        placeholder="Question Description"
                                                        className="min-h-[90px] resize-y"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="referenceimg"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Reference Image URL</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        value={field.value ?? ""}
                                                        disabled={isLoading}
                                                        placeholder="(optional)"
                                                        type="text"
                                                        autoComplete="false"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <FormField
                                            control={form.control}
                                            name="topic"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Topic</FormLabel>
                                                    <FormControl>
                                                        <TopicCombobox
                                                            options={topicOptions}
                                                            value={field.value ?? ""}
                                                            onChange={handleTopicChange}
                                                            disabled={isLoading}
                                                            placeholder="Select topic"
                                                            searchPlaceholder="Search topic…"
                                                            emptyText="No topic found."
                                                            loading={topicsLoading}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="subtopic"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Sub Topic</FormLabel>
                                                    <FormControl>
                                                        <TopicCombobox
                                                            options={subTopicOptions}
                                                            value={field.value ?? ""}
                                                            onChange={(name) => form.setValue("subtopic", name)}
                                                            disabled={isLoading}
                                                            placeholder="Select sub topic"
                                                            searchPlaceholder="Search sub topic…"
                                                            emptyText="No sub topic found."
                                                            loading={topicsLoading}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </QuestionFormSection>

                            {/* ── Section 2: Options & answer ─────────────────────────── */}
                            <QuestionFormSection
                                icon={<Puzzle className="size-4" />}
                                title="Options & answer"
                            >
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="Option1"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Option 1</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isLoading}
                                                        placeholder="Option 1"
                                                        type="text"
                                                        autoComplete="false"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="Option2"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Option 2</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isLoading}
                                                        placeholder="Option 2"
                                                        type="text"
                                                        autoComplete="false"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="Option3"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Option 3</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isLoading}
                                                        placeholder="Option 3"
                                                        type="text"
                                                        autoComplete="false"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="Option4"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Option 4</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isLoading}
                                                        placeholder="Option 4"
                                                        type="text"
                                                        autoComplete="false"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="CorrectOption"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Correct Option</FormLabel>
                                                <Select
                                                    onValueChange={(value) =>
                                                        form.setValue(
                                                            "CorrectOption",
                                                            parseInt(value, 10)
                                                        )
                                                    }
                                                    value={String(field.value)}
                                                    disabled={isLoading}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select Correct Option" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="1">Option 1</SelectItem>
                                                        <SelectItem value="2">Option 2</SelectItem>
                                                        <SelectItem value="3">Option 3</SelectItem>
                                                        <SelectItem value="4">Option 4</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </QuestionFormSection>

                            {/* ── Section 3: Code snippet (optional) ──────────────────── */}
                            <QuestionFormSection
                                icon={<Code2 className="size-4" />}
                                title="Code snippet (optional)"
                            >
                                <FormField
                                    control={form.control}
                                    name="iscodesnippet"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Is Code Snippet?</FormLabel>
                                            <Select
                                                onValueChange={(value) =>
                                                    form.setValue(
                                                        "iscodesnippet",
                                                        value === "true"
                                                    )
                                                }
                                                value={field.value ? "true" : "false"}
                                                disabled={isLoading}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-[220px]">
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="true">Yes</SelectItem>
                                                    <SelectItem value="false">No</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {isCodeSnippet ? (
                                    <div className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="snippetLang"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Snippet Language</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        value={field.value ?? ""}
                                                        disabled={isLoading}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="w-[220px]">
                                                                <SelectValue placeholder="Select Language" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {languages.map((language) => (
                                                                <SelectItem
                                                                    key={language.value}
                                                                    value={language.value}
                                                                >
                                                                    {language.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="codesnippet"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Code Snippet</FormLabel>
                                                    <FormControl>
                                                        <CodeEditorField
                                                            value={field.value ?? ""}
                                                            onChange={field.onChange}
                                                            lang={snippetLang ?? undefined}
                                                            disabled={isLoading}
                                                            placeholder="< code snippet >"
                                                            className="min-h-[220px]"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        Enable to attach a highlighted code snippet to this MCQ.
                                    </p>
                                )}
                            </QuestionFormSection>
                        </form>
                    </Form>
                </QuestionDialogShell>
            </Dialog>
        </>
    )
}

export default GroupMcqAddForm
