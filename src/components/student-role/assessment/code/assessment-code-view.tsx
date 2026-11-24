"use client"
import { Button } from '@/components/ui/button';
import { Code, Loader } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useMemo, useState, useTransition } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { eclipse } from '@uiw/codemirror-theme-eclipse';
import { Check, LoaderIcon, Play, X } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from "sonner"
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { usePageEnter } from '@/hooks/MouseEnter';
import { useRouter } from 'next/navigation';
import { autocompletion } from "@codemirror/autocomplete";
import type { Extension } from "@codemirror/state";
import {
    getCustomCompletionSource,
    isCodeMirrorLanguage,
    loadLanguageExtension,
} from '@/components/code/code-mirror-language';
import { LanguageVersionSelect } from '@/components/code/language-version-select';
import {
    getInitialVersionProfileId,
    setStoredVersionForLang,
    LANGUAGES,
} from '@/lib/runtime-registry';
// Judge execution is server-side: /api/execute/testcases judges the
// attempt's cases (uaid-scoped) and never returns expected outputs.
import { runQuestionTestcases, runErrorMessage, type TestCaseResult, type RunTestcasesSuccess } from '@/components/student-role/execute-api';
import { submitassessmentallquestions, submitassessmentquestion } from '@/actions/assessment';
import AssessmentCodeQuestion from './assessment-code-question';


interface CodeQuestion {
    id: string;
    title: string;
    description: string;
    sampleinput1: string;
    sampleinput2: string;
    sampleoutput1: string;
    sampleoutput2: string;
    referenceimg: string | null;
    maxscore: number;
    difficulty: string;
    lang: string;
    topic: string | null;
    subtopic: string | null;
    inputconstrains: string | null;
    blacklist: string | null;
    whitelist: string | null;
    headerCode: string | null;
    questionstatus: boolean
}

const AssessmentCodeView = ({ questions, aid, uid, uaid, status, anyLanguage = false, defaultLanguage }: { questions: CodeQuestion[], aid: string, uid: string, uaid: string, status: string, anyLanguage?: boolean, defaultLanguage?: string }) => {
    const { setTheme, theme } = useTheme();
    const [questionData, setQuestionData] = useState<CodeQuestion[]>(questions);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleQuestionClick = (index: number) => {
        resetEditorState();
        setCurrentQuestionIndex(index);
    };

    const resetEditorState = () => {
        setUserCode(`// code here ! `);
        setVersionProfileId(undefined);
        // setOutput('');
        setOutputData(null);
        setSamplesuccess(false);
        setShowSubmit(false);
        setisSubmitted(false);
        setTestResults(null);
        setServerScore(null);
        setCompileCount(0);
        setErrorCount(0);
        setExecuting(false);
        setExecutingTestcases(false);
        setTestDuration(0);
        setScore(0)
        setScore1(0)
        setScore2(0)
        setScore3(0)
        setTestStartTime(Date.now());
    };
    const currentQuestion = questionData[currentQuestionIndex];

    const [showModal, setShowModal] = useState(false)
    const [executing, setExecuting] = useState(false)
    const [executingTestcases, setExecutingTestcases] = useState(false)
    const [RunTestModel, setRunTestModel] = useState(false)
    const [SubmitTestModel, setSubmitTestModel] = useState(false)
    const [error, setError] = useState(false)
    const [samplesuccess, setSamplesuccess] = useState(false)
    const [outputData, setOutputData] = useState<string | null>(null)
    const [userCode, setUserCode] = useState(`// code here ! \n\n`)
    const [showSubmit, setShowSubmit] = useState(false)
    const [isSubmitted, setisSubmitted] = useState(false)
    // Server-judged results for the current question (Test 1..N). Each entry
    // exposes pass + actual output only — the endpoint NEVER returns the
    // expected outputs, so nothing here can leak them to the student.
    const [testResults, setTestResults] = useState<TestCaseResult[] | null>(null)
    // Score computed server-side for the last judged run. Null until the
    // endpoint answers; the legacy client-side mirror below is used as the
    // submit-time fallback ONLY when judging failed.
    const [serverScore, setServerScore] = useState<number | null>(null)
    const [compileCount, setCompileCount] = useState<number>(0)
    const [errorCount, setErrorCount] = useState<number>(0)
    const [testDuration, setTestDuration] = useState<number>(0);
    const [testStartTime, setTestStartTime] = useState<number | null>(null);
    const [isLoading, startTransition] = useTransition()
    const [EndTestModel, setEndTestModel] = useState<boolean>(false)
    const [routeBtnLoading, setRouteBtnLoading] = useState<boolean>(false)
    const [score, setScore] = useState<number>(0);
    const [score1, setScore1] = useState<number>(0);
    const [score2, setScore2] = useState<number>(0);
    const [score3, setScore3] = useState<number>(0);
    const [versionProfileId, setVersionProfileId] = useState<string | undefined>(undefined);
    const [codeStatus, setCodeStatus] = useState(status)
    // Any-language assessments let the student pick the solution language in
    // the code panel; otherwise the question's own language is fixed.
    const [activeLang, setActiveLang] = useState<string>(questions[0]?.lang ?? defaultLanguage ?? 'python');
    const RunCode = async () => {
        const blacklist = currentQuestion.blacklist
            ?.split(",")
            .map(item => item.trim())
            .filter(item => item !== "") || [];

        const whitelist = currentQuestion.whitelist
            ?.split(",")
            .map(item => item.trim())
            .filter(item => item !== "") || [];

        // Check for blacklist
        const blacklistFound = blacklist.some((keyword) => userCode.includes(keyword));
        if (blacklistFound) {
            toast.error("Blacklist keyword(s) found in the code!");
            return;
        }
        // Check for whitelist
        const whitelistMissing = whitelist.some((keyword) => !userCode.includes(keyword));
        if (whitelistMissing) {
            toast.error("Whitelist keyword(s) missing in the code!");
            return;
        }
        setCompileCount(compileCount + 1);
        localStorage.setItem(`${uaid}_${currentQuestion.id}`, userCode);

        try {
            setShowModal(true);
            setExecuting(true);
            // ONE server-judged call — the endpoint runs the attempt's test
            // cases (uaid-scoped) and returns pass/actual only.
            const outcome = await runQuestionTestcases({
                questionId: currentQuestion.id,
                code: userCode,
                language: activeLang,
                uaid,
            });
            if (!outcome.ok) {
                toast.error(runErrorMessage(outcome));
                setShowModal(false);
                setExecuting(false);
                return;
            }
            const first = outcome.results[0];
            applyJudgeOutcome(outcome);
            if (first?.error) {
                toast.error("Compilation / runtime error!");
                setError(true);
                setErrorCount((c) => c + 1);
                setOutputData(first.error);
                setShowSubmit(false)
            } else if (first?.pass) {
                toast.success("Sample Testcase Passed");
                setOutputData(first.actual);
                setSamplesuccess(true);
            } else {
                toast.error("Sample Testcase Failed!");
                setSamplesuccess(false);
                setErrorCount((c) => c + 1);
                setOutputData(first?.actual ?? "");
                setShowSubmit(false)
            }

            setExecuting(false);
        } catch (error) {
            toast.warning("Something went wrong!");
            setShowModal(false);
            setExecuting(false);
        }
    };

    /** Store a successful judge outcome: server score first; the legacy
     *  per-case mirror (1 pt sample + 3 pts/case) only feeds the submit-time
     *  fallback used when the endpoint was unavailable. */
    const applyJudgeOutcome = (outcome: RunTestcasesSuccess) => {
        setTestResults(outcome.results);
        setServerScore(outcome.score);
        setScore(outcome.results[0]?.pass ? 1 : 0);
        setScore1(outcome.results[0]?.pass ? 3 : 0);
        setScore2(outcome.results[1]?.pass ? 3 : 0);
        setScore3(outcome.results[2]?.pass ? 3 : 0);
    };

    const RunTestCases = async () => {
        setExecutingTestcases(true);
        setTestResults(null);
        setRunTestModel(true);
        try {
            // ONE server-judged call — replaces the old client loop that
            // shipped hidden test inputs/expected outputs to the judge.
            const outcome = await runQuestionTestcases({
                questionId: currentQuestion.id,
                code: userCode,
                language: activeLang,
                uaid,
            });
            if (!outcome.ok) {
                toast.error(runErrorMessage(outcome));
                setExecutingTestcases(false);
                setRunTestModel(false);
                return;
            }
            applyJudgeOutcome(outcome);
            for (const r of outcome.results) {
                if (r.error) setErrorCount((c) => c + 1);
            }
            setExecutingTestcases(false);
            setShowSubmit(true);
            if (testStartTime) {
                const endTime = Date.now();
                const duration = (endTime - testStartTime) / 1000;
                const roundedDuration = Math.floor(duration);
                setTestDuration(roundedDuration);
            }
        } catch (error) {
            toast.warning("Something went wrong!");
            setExecutingTestcases(false);
            setRunTestModel(false);
        }
    };

    const closeTestCaseModel = () => {
        setShowModal(false);
        setOutputData(null);
        setExecutingTestcases(false);
        setRunTestModel(false);
    };

    const closeRunModel = () => {
        setShowModal(false);
        setError(false)
        setOutputData(null)
    }


    useEffect(() => {
        const savedCode = localStorage.getItem(`${uaid}_${currentQuestion.id}`);
        if (!currentQuestion.questionstatus) {
            if (savedCode) {
                setUserCode(savedCode);
            }
        }
        setTestStartTime(Date.now());
        // Language resets to the question's own language on every question
        // switch (any-language assessments may then override via the selector).
        // Deferred (microtask) so we do not call setState synchronously in the
        // effect body — same pattern as the assessment home tab-switch count.
        queueMicrotask(() => {
            setActiveLang(currentQuestion.lang ?? defaultLanguage ?? 'python');
        });
    }, [currentQuestion.id]);

    const setStaticText = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const staticText = 'Failed to copy text.';
        if (e.type === 'copy') {
            navigator.clipboard.writeText(staticText)
                .then(() => {
                    toast.warning('Failed to copy text.');
                })
                .catch(err => {
                    toast.warning('Failed to copy text.');
                });
        }
    };
    const submitQuestion = () => {
        const testcaseStatus = (index: number) =>
            testResults?.[index] ? (testResults[index].pass ? "pass" : "fail") : "";
        const submitData = {
            "userId": uid,
            "questionId": currentQuestion.id,
            "assessmentId": aid,
            // Trust the server-computed score when judging succeeded; the
            // legacy client mirror is only a fallback for endpoint failures.
            "score": serverScore ?? (score + score1 + score2 + score3),
            "compiles": compileCount,
            "errors": errorCount,
            "submissiontype": "usersubmit",
            "tabswitches": 0,
            "status": "submitted",
            "usercode": userCode,
            "duration": testDuration.toString(),
            "testcase1status": testcaseStatus(0),
            "testcase2status": testcaseStatus(1),
            "testcase3status": testcaseStatus(2),
        }
        // console.log(submitData)
        startTransition(() => {
            submitassessmentquestion(submitData)
                .then((data) => {
                    if (data.success) {
                        setisSubmitted(true)
                        localStorage.removeItem(`${uaid}_${currentQuestion.id}`);
                        setQuestionData((prevQuestions) =>
                            prevQuestions.map((question) =>
                                question.id === currentQuestion.id
                                    ? { ...question, questionstatus: true }
                                    : question
                            )
                        );
                        setSubmitTestModel(false)
                        toast.success(data.success)
                    } else if (data.error) {
                        toast.error(data.error)
                        setSubmitTestModel(false)
                    }
                    else {
                        toast.error("something went wrong , try again")
                        setSubmitTestModel(false)
                    }
                })
        })
    }

    const submitCode = () => {

        const submitData = {
            userId: uid,
            assessmentId: aid,
            id: uaid,
        }
        setRouteBtnLoading(true)
        startTransition(() => {
            submitassessmentallquestions(submitData)
                .then((data) => {
                    if (data.success) {
                        toast.success(data.success)
                        setEndTestModel(false)
                        // setTimeout(() => {
                        //     router.back();
                        // }, 2000)
                        setCodeStatus("submitted")
                        setTimeout(() => {
                            setRouteBtnLoading(false)
                        }, 20000)

                    }
                    else {
                        // toast.error(data.error)
                        setEndTestModel(false)
                    }
                })
        })
    }
    // Clipboard clear is best-effort proctoring — swallow the rejection so an
    // unpermitted environment (or unfocused document) never logs an unhandled error.
    usePageEnter(() => navigator.clipboard.writeText('').catch(() => {}));


    const [languageExtension, setLanguageExtension] = useState<{
        extension: unknown;
        completion: ReturnType<typeof getCustomCompletionSource>;
    } | null>(null);

    // Stable per-language extension array — rebuilding the array (and the
    // autocompletion() extension) on every render recreated CodeMirror's
    // internal state each render (the audit's memory leak).
    const codeMirrorExtensions = useMemo<Extension[]>(() => {
        const exts: Extension[] = [];
        if (languageExtension?.extension) {
            exts.push(languageExtension.extension as Extension);
        }
        if (languageExtension?.completion) {
            exts.push(autocompletion({ override: [languageExtension.completion] }));
        }
        return exts;
    }, [languageExtension]);

    useEffect(() => {
        if (
            activeLang &&
            isCodeMirrorLanguage(activeLang)
        ) {
            const lang = activeLang;
            loadLanguageExtension(lang).then((extension) => {
                setLanguageExtension({
                    extension,
                    completion: getCustomCompletionSource(lang),
                });
            });
        }
        // Reset the runtime-version selection for the active language:
        // remembered choice if valid, otherwise the language default.
        setVersionProfileId(
            activeLang ? getInitialVersionProfileId(activeLang) : undefined
        );
    }, [activeLang, currentQuestion.id]);
    useEffect(() => {
        const preventDefaultShortcuts = (e: KeyboardEvent) => {
            // Check for copy/paste shortcuts across different platforms
            const isCopyPasteShortcut =
                // Windows/Linux shortcuts
                (e.ctrlKey &&
                    (e.key === "c" || e.key === "v" || e.key === "x")) ||
                // Mac shortcuts
                (e.metaKey &&
                    (e.key === "c" || e.key === "v" || e.key === "x")) ||
                // Windows clipboard history
                (e.ctrlKey && e.key === "v") ||
                // Mac paste without formatting
                (e.metaKey && e.shiftKey && e.key === "v") ||
                // Windows clipboard history (Win + V)
                (e.key === "v" && (e as any).windowKey) ||
                // Prevent select all
                ((e.ctrlKey || e.metaKey) && e.key === "a");

            if (isCopyPasteShortcut) {
                e.preventDefault();
                e.stopPropagation();
                toast.warning('Action not allowed.');
            }
        };

        // Add event listener for keyboard shortcuts
        document.addEventListener("keydown", preventDefaultShortcuts);

        const preventContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            toast.warning('Action not allowed.');
        };
        document.addEventListener("contextmenu", preventContextMenu);

        return () => {
            document.removeEventListener("keydown", preventDefaultShortcuts);
            document.removeEventListener("contextmenu", preventContextMenu);
        };
    }, [toast]);

    return (
        <main className="flex min-h-[94vh] min-w-screen flex-row">
            {
                codeStatus && codeStatus === 'submitted' ? (
                    <div className="w-full h-[94vh] flex flex-col gap-2 justify-center items-center">
                        <div className=" shadow-lg rounded-md overflow-hidden w-[20rem] order-first lg:order-none border border-green-400 hover:border-primary" >
                            <div className="py-5 font-bold px-6 sm:px-8 flex flex-col justify-center items-center gap-5 text-green-400">
                                <Code className="h-10 w-10 " />
                                Code Submitted !
                            </div>
                        </div>
                    </div>
                ) : (

                    <>
                        <aside className="sticky top-0 left-0 z-50 hidden sm:flex sm:flex-col w-20 h-[94vh] border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
                            <div className="flex-grow flex flex-col justify-between">
                                <nav className="flex flex-col my-4 space-y-4 overflow-y-auto max-h-[calc(100vh-10rem)]">
                                    {questionData.map((question: CodeQuestion, index: number) => (
                                        <Button
                                            key={index}
                                            className={`inline-flex items-center justify-center mx-4 transition-colors border ${currentQuestionIndex === index
                                                ? 'bg-primary text-white dark:bg-primary dark:text-white'
                                                : 'bg-transparent text-primary hover:bg-primary/10'
                                                } ${question.questionstatus
                                                    ? 'bg-green-500 text-white cursor-not-allowed'
                                                    : ''
                                                }`}
                                            onClick={() => handleQuestionClick(index)}
                                            disabled={question.questionstatus}
                                        >
                                            <span className="h-6 w-6 p-0.5 font-bold">
                                                {index + 1}
                                            </span>
                                        </Button>
                                    ))}
                                </nav>
                                <div className="inline-flex flex-col items-center justify-center h-30 w-20 ">
                                    <Button className={`inline-flex items-center justify-center p-3 mx-4 my-1 transition-colors bg-primary`} onClick={() => setEndTestModel(true)} disabled={routeBtnLoading}>
                                        <span className='h-6 w-6'>
                                            {
                                                routeBtnLoading ? <Loader className="animate-spin p-1" /> : <Check fill='none' />
                                            }
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </aside>
                        <div className="w-full h-full flex flex-col items-center justify-center flex-grow">
                            <div className="h-full w-full flex flex-col mx-4 items-center ">
                                <ResizablePanelGroup
                                    direction="horizontal"
                                    className="max-w-full max-h-[94vh] rounded-lg border">

                                    <ResizablePanel defaultSize={50} minSize={20}>
                                        <div className="flex h-[94vh] items-center justify-center">
                                            <AssessmentCodeQuestion Question={currentQuestion} />
                                        </div>
                                    </ResizablePanel>
                                    <ResizableHandle withHandle />
                                    <ResizablePanel defaultSize={50} minSize={40}>
                                        <div className="flex h-[94vh] items-center justify-center">
                                            {currentQuestion.questionstatus ? (
                                                <div className='h-[94vh] w-full overflow-y-auto dark:bg-[#1e1e1e] flex justify-center items-center flex-col'>
                                                    <p className='font-bold text-2xl mb-5'>
                                                        Code Submitted !
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className='flex h-[94vh] items-center justify-center w-full flex-col'
                                                    onCopy={setStaticText}
                                                    onPaste={setStaticText}
                                                >
                                                    <div className='h-[95%] w-full overflow-y-auto dark:bg-[#1e1e1e] codex'>
                                                        <CodeMirror
                                                            value={userCode}
                                                            theme={theme === "dark" ? vscodeDark : eclipse}
                                                            extensions={codeMirrorExtensions}
                                                            style={{ fontSize: 16, minHeight: "95%", }}
                                                            onChange={setUserCode}
                                                        />
                                                    </div>
                                                    <div className='h-[5%] w-full border flex items-center justify-center'>
                                                        <div className='flex flex-row w-[70%] items-center justify-start mx-1 p-1 gap-x-2'>
                                                            <Button className='bg-green-500 hover:bg-green-400' onClick={RunCode}>
                                                                {executing ? (
                                                                    <LoaderIcon className="h-6 w-6 animate-spin" />
                                                                ) : (
                                                                    <>
                                                                        <Play className='h-6 w-6 mr-2' /> Run
                                                                    </>
                                                                )}
                                                            </Button>
                                                            {samplesuccess &&
                                                                <Button className='bg-green-500 hover:bg-green-400' onClick={RunTestCases}>
                                                                    {executingTestcases ? (
                                                                        <LoaderIcon className="h-6 w-6 animate-spin" />
                                                                    ) : (
                                                                        <>
                                                                            <Play className='h-6 w-6 mr-2' /> Run Test Cases
                                                                        </>
                                                                    )}
                                                                </Button>
                                                            }
                                                            {anyLanguage && (
                                                                <Select
                                                                    value={activeLang}
                                                                    onValueChange={(v) => {
                                                                        setActiveLang(v);
                                                                        setVersionProfileId(getInitialVersionProfileId(v));
                                                                    }}
                                                                    disabled={executing || executingTestcases}
                                                                >
                                                                    <SelectTrigger className="w-[180px]" aria-label="Solution language">
                                                                        <SelectValue placeholder="Language" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {LANGUAGES.map((l) => (
                                                                            <SelectItem key={l.id} value={l.id}>
                                                                                {l.label}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            )}
                                                            {activeLang && (
                                                                <LanguageVersionSelect
                                                                    lang={activeLang}
                                                                    value={versionProfileId}
                                                                    onChange={(profileId) => {
                                                                        setVersionProfileId(profileId);
                                                                        setStoredVersionForLang(activeLang, profileId);
                                                                    }}
                                                                    className="w-[220px] ml-auto"
                                                                    disabled={executing || executingTestcases}
                                                                />
                                                            )}
                                                        </div>
                                                        <div className='flex flex-row w-[30%] items-center justify-end mx-1 p-1'>
                                                            {showSubmit && (
                                                                <>
                                                                    <Button onClick={() => { setSubmitTestModel(true) }}>
                                                                        <Check className='h-6 w-6 mr-2' /> Submit Question
                                                                    </Button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            }
                                        </div>
                                    </ResizablePanel>
                                </ResizablePanelGroup>
                            </div>
                        </div>
                        <AlertDialog open={showModal}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        <div className='flex flex-row justify-center items-center h-full'>

                                            <h2 className='w-1/2 px-2'>Expected Output</h2>
                                            <h2 className='w-1/2 px-2'>Program Output</h2>
                                        </div>
                                    </AlertDialogTitle>
                                    {error ?
                                        (
                                            <div className='bg-gray-700/30 w-full h-[150px] rounded-md p-2 font-bold overflow-y-auto overflow-x-hidden'>
                                                <pre className='whitespace-pre-wrap break-words overflow-x-auto max-w-full'>
                                                    {outputData}
                                                </pre>
                                            </div>
                                        )
                                        : (
                                            <div className='flex flex-grow flex-row justify-around items-center w-full py-2'>
                                                <div className='bg-gray-700/30 w-[48%] h-[150px] rounded-md p-2 font-bold overflow-y-auto overflow-x-hidden'>
                                                    <pre className='whitespace-pre-wrap break-words overflow-x-auto max-w-full'>
                                                        {currentQuestion.sampleoutput1}
                                                    </pre>
                                                </div>
                                                <Separator orientation='vertical' className='mx-2' />
                                                <div className='bg-gray-700/30 w-[48%] h-[150px] rounded-md p-2 font-bold overflow-y-auto overflow-x-hidden'>
                                                    {executing ? (
                                                        <span className='h-full w-full flex items-center justify-center'>
                                                            <LoaderIcon className="h-6 w-6 animate-spin" />
                                                        </span>
                                                    ) : (

                                                        <pre>
                                                            {outputData}
                                                        </pre>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                </AlertDialogHeader>
                                {!executing && (
                                    <AlertDialogFooter className="flex flex-row gap-2">
                                        <AlertDialogCancel className='bg-primary hover:bg-primary/80 text-white hover:text-white flex-1 ' onClick={closeRunModel}>Close</AlertDialogCancel>
                                    </AlertDialogFooter>
                                )}
                            </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog open={RunTestModel}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <div className='flex flex-grow flex-col justify-around items-center w-full py-2 gap-2'>
                                        {testResults === null ? (
                                            <div className='w-full flex justify-center items-center p-6'>
                                                <LoaderIcon className="h-6 w-6 animate-spin" />
                                            </div>
                                        ) : (
                                            testResults.map((result, index) => (
                                                <div key={index} className='w-full flex flex-row flex-grow justify-center items-center gap-2 p-2 border border-gray-200 rounded-md'>
                                                    <div className='w-1/4 flex justify-center items-center font-semibold'>
                                                        Test {index + 1}
                                                    </div>
                                                    <div className='w-1/4 flex justify-center items-center'>
                                                        {result.pass ? (
                                                            <>
                                                                <Check className='h-6 w-6 mr-2 bg-green-400 rounded-full' /> Passed
                                                            </>
                                                        ) : (
                                                            <>
                                                                <X className='h-6 w-6 mr-2 bg-red-500 rounded-full' /> Failed
                                                            </>
                                                        )}
                                                    </div>
                                                    {/* Actual program output only — expected outputs never leave the server. */}
                                                    <pre className='w-1/2 max-h-24 overflow-auto whitespace-pre-wrap break-words bg-gray-700/30 rounded-md p-2 text-xs font-bold'>
                                                        {result.error ? result.error : result.actual}
                                                    </pre>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </AlertDialogHeader>
                                {!executingTestcases && (
                                    <AlertDialogFooter className="flex flex-row gap-2">
                                        <AlertDialogCancel className='bg-primary hover:bg-primary/80 text-white hover:text-white flex-1' onClick={closeTestCaseModel}>Close</AlertDialogCancel>
                                    </AlertDialogFooter>
                                )}
                            </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog open={SubmitTestModel}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Submit Question </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure want to submit question ?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex flex-row gap-2">
                                    <AlertDialogCancel onClick={() => setSubmitTestModel(false)} className='bg-red-500 text-white flex-1 hover:bg-red-400 hover:text-white'>Close</AlertDialogCancel>
                                    <AlertDialogAction onClick={submitQuestion} className='flex-1' disabled={isLoading}>
                                        {isLoading && (
                                            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Submit
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog open={EndTestModel}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Submit Codes ?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure want to submit Codes ?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex flex-row gap-2">
                                    <AlertDialogCancel onClick={() => setEndTestModel(false)} className='bg-red-500 text-white flex-1 hover:bg-red-400 hover:text-white'>Close</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={submitCode}
                                        className='flex-1' disabled={isLoading}>
                                        {routeBtnLoading && (
                                            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Submit
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                )
            }
        </main>
    );
};

export default AssessmentCodeView;