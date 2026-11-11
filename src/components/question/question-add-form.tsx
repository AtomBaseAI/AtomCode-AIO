"use client"
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Code2, FileText, LoaderIcon, Play, Plus, Tags } from "lucide-react"
import { useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
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
import { AddQuestionSchema } from "@/schemas/question-schema"
import { Textarea } from "@/components/ui/textarea"
import { addquestion } from "@/actions/question"
import { toast } from "sonner"
import { LanguageVersionSelect } from "@/components/code/language-version-select";
import CodeEditorField from "@/components/code/code-editor-field";
import {
    QuestionDialogShell,
    QuestionFormSection,
    StatusDot,
    TestCaseCard,
} from "@/components/question/question-form-layout";
import {
    getInitialVersionProfileId,
    setStoredVersionForLang,
} from "@/lib/runtime-registry";
import { judgeRunTestCases } from "@/lib/judge";
import {
    TopicCombobox,
    useGroupTopics,
} from "@/components/question/topic-select";
interface AddQuestionProps {
    groups?: { id: string; title: string }[]
    /** When set, the question is created inside this group and the group select is locked. */
    lockedGroup?: { id: string; title: string }
    triggerLabel?: string
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

const AddQuestion = ({ groups = [], lockedGroup, triggerLabel = "Add Question" }: AddQuestionProps) => {
    const router = useRouter()
    const form = useForm<z.infer<typeof AddQuestionSchema>>({
        resolver: zodResolver(AddQuestionSchema),
        defaultValues: {
            title: '',
            description: '',
            sampleinput1: '',
            sampleinput2: '',
            sampleoutput1: '',
            sampleoutput2: '',
            input1: '',
            input2: '',
            input3: '',
            output1: '',
            output2: '',
            output3: '',
            sourcecode: '',
            referenceimg: '',
            maxscore: 10,
            difficulty: '',
            lang: '',
            topic: 'general',
            subtopic: 'general',
            inputconstrains: '',
            blacklist: '',
            whitelist: '',
            questionGroupId: lockedGroup?.id ?? 'none'
        }
    })
    const [testCaseStatus, setTestCaseStatus] = useState({
        sample1: "",
        sample2: "",
        input1: "",
        input2: "",
        input3: ""
    });
    const [open, setOpen] = useState(false)
    const [isLoading, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [hidesubmit, setHideSubmit] = useState(true)
    const [testProcess, setTestProcess] = useState(false)
    const [runVersionProfileId, setRunVersionProfileId] = useState<string | undefined>(undefined)
    const selectedLang = form.watch("lang")

    // Topic / sub topic options come from the group's topic registry
    // (default "general" is always offered).
    const groupId = lockedGroup?.id ?? null
    const { topics: groupTopics, loading: topicsLoading } = useGroupTopics(groupId)
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
    const handleSubmit = (values: z.infer<typeof AddQuestionSchema>) => {
        setError("")
        setSuccess("")
        // The Select uses the "none" sentinel for ungrouped — map it to null.
        // Inside a group page the group is locked and always sent.
        const payload = {
            ...values,
            questionGroupId: lockedGroup
                ? lockedGroup.id
                : values.questionGroupId && values.questionGroupId !== 'none'
                    ? values.questionGroupId
                    : null,
        }
        startTransition(() => {
            addquestion(payload)
                .then((data) => {

                    // setError(data.error)
                    // setSuccess(data.success)
                    if (data.success) {
                        form.reset()
                        setOpen(false)
                        toast.success(data.success);
                        router.refresh()
                        setTestCaseStatus({
                            sample1: "",
                            sample2: "",
                            input1: "",
                            input2: "",
                            input3: "",
                        });
                        setHideSubmit(true)
                    }
                })
                .catch(() => toast.error("Something went wrong!"));
        })
    }
    const RunCode = async () => {
        setTestProcess(true);
        const lang = form.getValues("lang");
        if (!lang) {
            console.error("Select a language before running test cases");
            setTestProcess(false);
            return;
        }

        const testCases = [
            { input: form.getValues("input1"), expectedOutput: form.getValues("output1"), tcid: "input1" as keyof typeof testCaseStatus },
            { input: form.getValues("input2"), expectedOutput: form.getValues("output2"), tcid: "input2" as keyof typeof testCaseStatus },
            { input: form.getValues("input3"), expectedOutput: form.getValues("output3"), tcid: "input3" as keyof typeof testCaseStatus },
            { input: form.getValues("sampleinput1"), expectedOutput: form.getValues("sampleoutput1"), tcid: "sample1" as keyof typeof testCaseStatus },
            { input: form.getValues("sampleinput2"), expectedOutput: form.getValues("sampleoutput2"), tcid: "sample2" as keyof typeof testCaseStatus },
        ];

        let newTestCaseStatus = { ...testCaseStatus };

        try {
            // Mark all cases as processing, then verify through the judge.
            for (const { tcid } of testCases) {
                newTestCaseStatus[tcid] = "processing";
            }
            setTestCaseStatus({ ...newTestCaseStatus });

            // Judge execution — Lambda judge, server toolchain fallback for C/C++/Java.
            const outcomes = await judgeRunTestCases({
                lang,
                versionProfileId: runVersionProfileId,
                code: form.getValues("sourcecode") ?? "",
                cases: testCases.map(({ input, expectedOutput }) => ({ input, expectedOutput })),
            });

            testCases.forEach(({ tcid }, index) => {
                newTestCaseStatus[tcid] =
                    outcomes[index]?.status === "Success" ? "success" : "failed";
            });
        } catch (error) {
            console.error("Something went wrong!", error);
            // Cases that never finished are surfaced as failed instead of stuck "running".
            (Object.keys(newTestCaseStatus) as (keyof typeof newTestCaseStatus)[]).forEach((tcid) => {
                if (newTestCaseStatus[tcid] === "processing") {
                    newTestCaseStatus[tcid] = "failed";
                }
            });
        }

        setTestCaseStatus(newTestCaseStatus);
        setTestProcess(false);

        const allSuccessful = Object.values(newTestCaseStatus).every(
            (status) => status === "success"
        );

        setHideSubmit(!allSuccessful);
    };

    const handleModalClose = () => {
        form.reset();  // Reset the form
        setTestCaseStatus({
            sample1: "",
            sample2: "",
            input1: "",
            input2: "",
            input3: ""
        });
        setHideSubmit(true);
        setError("");
        setSuccess("");
    };

    /** Compact input/output pair inside a test-case card. */
    const testCaseRow = (
        inputName: "input1" | "input2" | "input3" | "sampleinput1" | "sampleinput2",
        outputName: "output1" | "output2" | "output3" | "sampleoutput1" | "sampleoutput2",
        statusKey: keyof typeof testCaseStatus,
        label: string,
        muted = false,
    ) => (
        <TestCaseCard
            label={label}
            muted={muted}
            badge={<StatusDot status={testCaseStatus[statusKey] || "idle"} />}
        >
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
            <Dialog open={open} onOpenChange={(isOpen) => {
                if (!isOpen) handleModalClose();
                setOpen(isOpen);
            }}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="bg-green-500 text-white  hover:bg-green-700 hover:text-white">
                        <Plus className="mr-2" />
                        {triggerLabel}
                    </Button>
                </DialogTrigger>
                <QuestionDialogShell
                    title={triggerLabel}
                    footer={
                        <>
                            <div className="flex min-w-0 flex-wrap items-center gap-2">
                                <FormError message={error} />
                                <FormSuccess message={success} />
                                {hidesubmit && (
                                    <p className="hidden text-xs text-muted-foreground md:block">
                                        All test cases must pass before the question can be created.
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-wrap items-center justify-end gap-2">
                                {selectedLang && (
                                    <LanguageVersionSelect
                                        lang={selectedLang}
                                        value={runVersionProfileId ?? getInitialVersionProfileId(selectedLang)}
                                        onChange={(profileId) => {
                                            setRunVersionProfileId(profileId);
                                            setStoredVersionForLang(selectedLang, profileId);
                                        }}
                                        className="w-[220px]"
                                        disabled={testProcess}
                                    />
                                )}
                                <Button
                                    type="button"
                                    variant={hidesubmit ? "default" : "outline"}
                                    disabled={testProcess || !selectedLang}
                                    className={hidesubmit ? "bg-orange-500 text-white hover:bg-orange-600" : ""}
                                    onClick={RunCode}
                                >
                                    {testProcess ? (
                                        <LoaderIcon className="mr-2 size-4 animate-spin" />
                                    ) : (
                                        <Play className="mr-2 size-4" />
                                    )}
                                    Run Test Cases
                                </Button>
                                {!hidesubmit && (
                                    <Button type="button" disabled={isLoading} onClick={form.handleSubmit(handleSubmit)}>
                                        {isLoading && (
                                            <LoaderIcon className="mr-2 size-4 animate-spin" />
                                        )}
                                        Create Question
                                    </Button>
                                )}
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
                                                            <SelectItem value="c">C</SelectItem>
                                                            <SelectItem value="cpp">C++</SelectItem>
                                                            <SelectItem value="java">Java</SelectItem>
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
                                        {testCaseRow("input1", "output1", "input1", "Test Case 1")}
                                        {testCaseRow("input2", "output2", "input2", "Test Case 2")}
                                        {testCaseRow("input3", "output3", "input3", "Test Case 3")}
                                        <div className="flex items-center gap-2 pt-1">
                                            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                                                Samples
                                            </span>
                                            <span className="text-[11px] text-muted-foreground">
                                                visible to students as examples
                                            </span>
                                        </div>
                                        {testCaseRow("sampleinput1", "sampleoutput1", "sample1", "Sample 1", true)}
                                        {testCaseRow("sampleinput2", "sampleoutput2", "sample2", "Sample 2", true)}
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
                                                    value={lockedGroup ? lockedGroup.id : (field.value ?? 'none')}
                                                    disabled={isLoading || !!lockedGroup || (!lockedGroup && groups.length === 0)}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder={lockedGroup ? lockedGroup.title : groups.length ? "Select a group (optional)" : "No groups created yet"} />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {lockedGroup ? (
                                                            <SelectItem value={lockedGroup.id}>
                                                                {lockedGroup.title}
                                                            </SelectItem>
                                                        ) : (
                                                            <>
                                                                <SelectItem value="none">No group</SelectItem>
                                                                {groups.map((g) => (
                                                                    <SelectItem key={g.id} value={g.id}>
                                                                        {g.title}
                                                                    </SelectItem>
                                                                ))}
                                                            </>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                {lockedGroup && (
                                                    <p className="text-xs text-muted-foreground">
                                                        Questions are created inside this group.
                                                    </p>
                                                )}
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
                                                        placeholder="use ',' between keywords. (optional)"
                                                        type="text"
                                                        autoComplete='false'
                                                        className="bg-red-600/5"
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
                                                        placeholder="use ',' between keywords. (optional)"
                                                        type="text"
                                                        autoComplete='false'
                                                        className="bg-green-600/5"
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
            </Dialog >
        </>
    )
}

export default AddQuestion
