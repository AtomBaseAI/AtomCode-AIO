"use client"
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Pencil, Code2, FileText, LoaderIcon, Tags } from "lucide-react"
import { useEffect, useMemo, useState, useTransition } from "react"
import type { ReactNode } from "react"
import {
    TopicCombobox,
    useGroupTopics,
} from "@/components/question/topic-select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormError } from "@/components/auth/form-error"
import { FormSuccess } from "@/components/auth/form-success"
import { QuestionUpdateSchema } from "@/schemas/question-schema"
import { Textarea } from "@/components/ui/textarea"
import { updatequestion } from "@/actions/question"
import CodeEditorField from "@/components/code/code-editor-field"
import {
    QuestionDialogShell,
    QuestionFormSection,
    TestCaseCard,
} from "@/components/question/question-form-layout"
import { toast } from "sonner"

interface EditQuestionFormProps {
    question: z.infer<typeof QuestionUpdateSchema>
    groups?: { id: string; title: string }[]
    /** Custom trigger element (defaults to the pencil "Edit" button). */
    trigger?: ReactNode
    /** Controlled open state — when provided the dialog is fully
     *  controlled and no internal trigger is rendered. */
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

const LANG_LABELS: Record<string, string> = {
    c: "C",
    cpp: "C++",
    java: "Java",
    python: "Python",
    sql: "SQL (SQLite)",
    javascript: "JavaScript",
    typescript: "TypeScript",
    ruby: "Ruby",
}

const EditQuestionForm = ({
    question,
    groups = [],
    trigger,
    open: controlledOpen,
    onOpenChange,
}: EditQuestionFormProps) => {

    const form = useForm<z.infer<typeof QuestionUpdateSchema>>({
        resolver: zodResolver(QuestionUpdateSchema),
        defaultValues: {
            id: question.id,
            title: question.title,
            description: question.description,
            sampleinput1: question.sampleinput1,
            sampleinput2: question.sampleinput2,
            sampleoutput1: question.sampleoutput1,
            sampleoutput2: question.sampleoutput2,
            input1: question.input1,
            input2: question.input2,
            input3: question.input3,
            output1: question.output1,
            output2: question.output2,
            output3: question.output3,
            sourcecode: question.sourcecode,
            referenceimg: question.referenceimg || undefined,
            maxscore: question.maxscore,
            difficulty: question.difficulty,
            lang: question.lang,
            topic: question.topic,
            subtopic: question.subtopic,
            inputconstrains: question.inputconstrains,
            blacklist: question.blacklist,
            whitelist: question.whitelist,
            questionGroupId: question.questionGroupId || 'none'
        }
    })
    const { reset } = form;
    const selectedLang = form.watch("lang");

    // Topic / sub topic options come from the question's group topic
    // registry (default "general" is always offered). Ungrouped questions
    // fall back to ["general"] + their current values.
    const { topics: groupTopics, loading: topicsLoading } = useGroupTopics(
        question.questionGroupId
    );
    const watchedTopic = form.watch("topic");
    const watchedSubtopic = form.watch("subtopic");

    const topicOptions = useMemo(() => {
        const names = groupTopics.map((t) => t.name);
        const current = (watchedTopic ?? "").trim();
        if (current && !names.some((n) => n.toLowerCase() === current.toLowerCase())) {
            names.push(current);
        }
        return names.length > 0 ? names : ["general"];
    }, [groupTopics, watchedTopic]);

    const subTopicOptions = useMemo(() => {
        const parent = groupTopics.find(
            (t) => t.name.toLowerCase() === (watchedTopic ?? "").toLowerCase()
        );
        const names = parent
            ? parent.subtopics.map((s) => s.name)
            : ["general"];
        const current = (watchedSubtopic ?? "").trim();
        if (current && !names.some((n) => n.toLowerCase() === current.toLowerCase())) {
            names.push(current);
        }
        return names.length > 0 ? names : ["general"];
    }, [groupTopics, watchedTopic, watchedSubtopic]);

    const handleTopicChange = (name: string) => {
        form.setValue("topic", name);
        // Keep the pair consistent — fall back to the default sub topic.
        const parent = groupTopics.find(
            (t) => t.name.toLowerCase() === name.toLowerCase()
        );
        const subs = parent
            ? parent.subtopics.map((s) => s.name)
            : ["general"];
        const current = form.getValues("subtopic");
        if (!current || !subs.includes(current)) {
            form.setValue("subtopic", "general");
        }
    };

    // Update form values when `question` prop changes
    useEffect(() => {
        reset({
            id: question.id,
            title: question.title,
            description: question.description,
            sampleinput1: question.sampleinput1,
            sampleinput2: question.sampleinput2,
            sampleoutput1: question.sampleoutput1,
            sampleoutput2: question.sampleoutput2,
            input1: question.input1,
            input2: question.input2,
            input3: question.input3,
            output1: question.output1,
            output2: question.output2,
            output3: question.output3,
            sourcecode: question.sourcecode,
            referenceimg: question.referenceimg || undefined,
            maxscore: question.maxscore,
            difficulty: question.difficulty,
            lang: question.lang,
            topic: question.topic,
            subtopic: question.subtopic,
            inputconstrains: question.inputconstrains,
            blacklist: question.blacklist,
            whitelist: question.whitelist,
            questionGroupId: question.questionGroupId || 'none'
        });
    }, [question, reset]);
    const [internalOpen, setInternalOpen] = useState(false)
    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : internalOpen
    const setOpen = (next: boolean) => {
        if (isControlled) {
            onOpenChange?.(next)
        } else {
            setInternalOpen(next)
        }
    }
    const [isLoading, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const handleSubmit = (values: z.infer<typeof QuestionUpdateSchema>) => {
        setError("")
        setSuccess("")
        // The Select uses the "none" sentinel for ungrouped — map it to null
        // so removing a group actually clears the relation.
        const payload = {
            ...values,
            questionGroupId:
                values.questionGroupId && values.questionGroupId !== 'none'
                    ? values.questionGroupId
                    : null,
        }
        startTransition(() => {
            updatequestion(payload)
                .then((data) => {
                    // setError(data.error)
                    // setSuccess(data.success)
                    if (data.success) {
                        form.reset()
                        setOpen(false)
                        toast.success(data.success);
                    }
                })
                .catch(() => toast.error("Something went wrong!"));
        })
    }

    /** Compact input/output pair inside a test-case card (edit form has no judge run). */
    const testCaseRow = (
        inputName: "input1" | "input2" | "input3" | "sampleinput1" | "sampleinput2",
        outputName: "output1" | "output2" | "output3" | "sampleoutput1" | "sampleoutput2",
        label: string,
        muted = false,
    ) => (
        <TestCaseCard label={label} muted={muted}>
            <div className="grid gap-2 sm:grid-cols-2">
                <FormField
                    control={form.control}
                    name={inputName}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[11px] font-medium text-muted-foreground">Input</FormLabel>
                            <FormControl>
                                <Textarea
                                    disabled={isLoading}
                                    placeholder="stdin passed to the program"
                                    className="min-h-[64px] resize-y"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={outputName}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[11px] font-medium text-muted-foreground">Expected output</FormLabel>
                            <FormControl>
                                <Textarea
                                    disabled={isLoading}
                                    placeholder="exact stdout to match"
                                    className="min-h-[64px] resize-y"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </TestCaseCard>
    )

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                {isControlled ? null : (
                    <DialogTrigger asChild>
                        {trigger ?? (
                            <Button variant='outline' size='icon' className="border-primary bg-transparent hover:bg-purple-700/10 flex w-auto p-1 gap-1 text-primary justify-center items-center pr-3">
                                <Pencil className="size-5 bg-transparent text-primary" /> Edit
                            </Button>
                        )}
                    </DialogTrigger>
                )}
                <QuestionDialogShell
                    title="Edit Question"
                    footer={
                        <>
                            <div className="flex min-w-0 flex-wrap items-center gap-2">
                                <FormError message={error} />
                                <FormSuccess message={success} />
                            </div>
                            <div className="flex flex-wrap items-center justify-end gap-2">
                                <Button type="button" disabled={isLoading} onClick={form.handleSubmit(handleSubmit)}>
                                    {isLoading && (
                                        <LoaderIcon className="mr-2 size-4 animate-spin" />
                                    )}
                                    Update Question
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
                                                        autoComplete='false'
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
                                                        disabled={isLoading}
                                                        placeholder="Question Description"
                                                        className="min-h-[90px] resize-y"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        <FormField
                                            control={form.control}
                                            name="difficulty"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Difficulty</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select Difficulty" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="easy">Easy</SelectItem>
                                                            <SelectItem value="medium">Medium</SelectItem>
                                                            <SelectItem value="hard">Hard</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="lang"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Language</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select Language" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="java">Java</SelectItem>
                                                            <SelectItem value="cpp">C++</SelectItem>
                                                            <SelectItem value="c">C</SelectItem>
                                                            <SelectItem value="python">Python</SelectItem>
                                                            <SelectItem value="sql">SQL (SQLite)</SelectItem>
                                                            <SelectItem value="javascript">JavaScript</SelectItem>
                                                            <SelectItem value="typescript">TypeScript</SelectItem>
                                                            <SelectItem value="ruby">Ruby</SelectItem>
                                                        </SelectContent>
                                                    </Select>
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
                                                            disabled={isLoading}
                                                            placeholder="(optional)"
                                                            type="text"
                                                            autoComplete='false'
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </QuestionFormSection>

                            {/* ── Section 2: Solution & test cases ────────────────────── */}
                            <QuestionFormSection
                                icon={<Code2 className="size-4" />}
                                title="Solution & test cases"
                                description="Server code runs against every test case and sample."
                            >
                                <div className="grid items-stretch gap-4 lg:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="sourcecode"
                                        render={({ field }) => (
                                            <FormItem className="flex h-full flex-col">
                                                <div className="flex items-center justify-between gap-2">
                                                    <FormLabel>Server Code</FormLabel>
                                                    {selectedLang ? (
                                                        <span className="rounded-full border bg-muted px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                                                            {LANG_LABELS[selectedLang] ?? selectedLang}
                                                        </span>
                                                    ) : (
                                                        <span className="text-[11px] text-muted-foreground">
                                                            pick a language to enable highlighting
                                                        </span>
                                                    )}
                                                </div>
                                                <FormControl>
                                                    <CodeEditorField
                                                        value={field.value ?? ""}
                                                        onChange={field.onChange}
                                                        lang={selectedLang}
                                                        disabled={isLoading}
                                                        placeholder={selectedLang
                                                            ? `< ${selectedLang} server code >`
                                                            : "< Code > — select a Language above for syntax highlighting"}
                                                        className="min-h-[520px] flex-1"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="space-y-3">
                                        {testCaseRow("input1", "output1", "Test Case 1")}
                                        {testCaseRow("input2", "output2", "Test Case 2")}
                                        {testCaseRow("input3", "output3", "Test Case 3")}
                                        <div className="flex items-center gap-2 pt-1">
                                            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                                                Samples
                                            </span>
                                            <span className="text-[11px] text-muted-foreground">
                                                visible to students as examples
                                            </span>
                                        </div>
                                        {testCaseRow("sampleinput1", "sampleoutput1", "Sample 1", true)}
                                        {testCaseRow("sampleinput2", "sampleoutput2", "Sample 2", true)}
                                    </div>
                                </div>
                            </QuestionFormSection>

                            {/* ── Section 3: Categorization & constraints ─────────────── */}
                            <QuestionFormSection
                                icon={<Tags className="size-4" />}
                                title="Categorization & constraints"
                                description="Optional metadata for filtering and safe code execution."
                            >
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    <FormField
                                        control={form.control}
                                        name="questionGroupId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Question Group</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value ?? 'none'}
                                                    disabled={isLoading || groups.length === 0}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder={groups.length ? "Select a group (optional)" : "No groups created yet"} />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="none">No group</SelectItem>
                                                        {groups.map((g) => (
                                                            <SelectItem key={g.id} value={g.id}>
                                                                {g.title}
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
                                    <FormField
                                        control={form.control}
                                        name="maxscore"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Maximum Score</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={true}
                                                        placeholder="10"
                                                        type="text"
                                                        autoComplete='false'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-4 lg:grid-cols-3">
                                    <FormField
                                        control={form.control}
                                        name="inputconstrains"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Input Constraints</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        disabled={isLoading}
                                                        placeholder="(optional)"
                                                        className="min-h-[64px] resize-y"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="blacklist"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Blacklist</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isLoading}
                                                        placeholder="use ',' between keywords (optional)"
                                                        type="text"
                                                        autoComplete='false'
                                                        className="bg-red-600/10"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="whitelist"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Whitelist</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isLoading}
                                                        placeholder="use ',' between keywords (optional)"
                                                        type="text"
                                                        autoComplete='false'
                                                        className="bg-green-600/10"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </QuestionFormSection>
                        </form>
                    </Form>
                </QuestionDialogShell>
            </Dialog>
        </>
    )
}

export default EditQuestionForm
