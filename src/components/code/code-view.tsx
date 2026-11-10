"use client"
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader, Minimize, Maximize, LogOut, FileQuestion } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ThemeToggle } from "@/components/theme-toggle";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeQuestion from '@/components/code/code-question';
import { useEffect, useState, useTransition } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { eclipse } from '@uiw/codemirror-theme-eclipse';
import { Check, LoaderIcon, Play, X, AlertTriangle, CircleCheck, CircleX } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import { autocompletion } from "@codemirror/autocomplete";
import type { Extension } from "@codemirror/state";
import { enterFullscreen, exitFullscreen, fullscreenCheck } from '@/hooks/fullscreen'
import {
    getCustomCompletionSource,
    isCodeMirrorLanguage,
    loadLanguageExtension,
    type CodeLanguage,
} from '@/components/code/code-mirror-language';
import { LanguageVersionSelect } from '@/components/code/language-version-select';
import {
    getInitialVersionProfileId,
    setStoredVersionForLang,
} from '@/lib/runtime-registry';
import { judgeRunSingle, judgeRunTestCases } from '@/lib/judge';

interface CodeQuestion {
    id: string;
    title: string;
    description: string;
    moduleId: string | null;
    sampleinput1: string;
    sampleinput2: string;
    sampleoutput1: string;
    sampleoutput2: string;
    input1: string;
    input2: string;
    input3: string;
    output1: string;
    output2: string;
    output3: string;
    sourcecode: string | null;
    referenceimg: string | null;
    maxscore: number;
    difficulty: string;
    lang: string;
    topic: string | null;
    subtopic: string | null;
    inputconstrains: string | null;
    blacklist: string | null;
    whitelist: string | null;
}


const CodeView = ({ questions, mid, cid, }: { questions: CodeQuestion[], mid: string, cid: string }) => {
    const { theme } = useTheme();
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
        setTestcase1Status("");
        setTestcase2Status("");
        setTestcase3Status("");
        setCompileCount(0);
        setErrorCount(0);
        setError(false);
        setErrorTitle("Compilation Error");
        setExecuting(false);
        setExecutingTestcases(false);
        setScore(0)
        setScore1(0)
        setScore2(0)
        setScore3(0)
    };
    const currentQuestion = questionData[currentQuestionIndex];

    const [showModal, setShowModal] = useState(false)
    const [executing, setExecuting] = useState(false)
    const [executingTestcases, setExecutingTestcases] = useState(false)
    const [RunTestModel, setRunTestModel] = useState(false)
    const [error, setError] = useState(false)
    const [errorTitle, setErrorTitle] = useState<string>("Compilation Error")
    const [exitConfirmOpen, setExitConfirmOpen] = useState(false)
    const [samplesuccess, setSamplesuccess] = useState(false)
    const [outputData, setOutputData] = useState<string | null>(null)
    const [userCode, setUserCode] = useState(`// code here ! \n\n`)
    const [showSubmit, setShowSubmit] = useState(false)
    const [isSubmitted, setisSubmitted] = useState(false)
    const [testcase1Status, setTestcase1Status] = useState<string>("")
    const [testcase2Status, setTestcase2Status] = useState<string>("")
    const [testcase3Status, setTestcase3Status] = useState<string>("")
    const [compileCount, setCompileCount] = useState<number>(0)
    const [errorCount, setErrorCount] = useState<number>(0)
    const [routeBtnLoading, setRouteBtnLoading] = useState<boolean>(false)
    const [score, setScore] = useState<number>(0);
    const [score1, setScore1] = useState<number>(0);
    const [score2, setScore2] = useState<number>(0);
    const [score3, setScore3] = useState<number>(0);
    const [versionProfileId, setVersionProfileId] = useState<string | undefined>(undefined);
    const router = useRouter()

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
        localStorage.setItem(currentQuestion.id, userCode);

        try {
            setShowModal(true);
            setExecuting(true);
            // Judge execution — Lambda judge, server toolchain fallback for C/C++/Java.
            const res = await judgeRunSingle({
                lang: currentQuestion.lang,
                versionProfileId,
                code: userCode,
                input: currentQuestion.sampleinput1,
                expectedOutput: currentQuestion.sampleoutput1,
            });
            if (res.compileMessage === "Success") {
                toast.success("Sample Testcase Passed");
                setOutputData(res.output);
                setSamplesuccess(true);
                if (score === 0) {
                    setScore(score + 1);
                }
            } else if (res.compileMessage === "Failed") {
                toast.error("Sample Testcase Failed!");
                setSamplesuccess(false);
                setErrorCount(errorCount + 1);
                setOutputData(res.output);
                setShowSubmit(false)
            } else {
                toast.error(res.timedOut ? "Execution timed out!" : "Compilation Error!");
                setError(true);
                setErrorTitle(res.timedOut ? "Execution Timed Out" : "Compilation Error");
                setOutputData(res.output || res.stderr);
                setErrorCount(errorCount + 1);
                setShowSubmit(false)
            }

            setExecuting(false);
        } catch (error) {
            toast.warning("Something went wrong!");
            setShowModal(false);
            setExecuting(false);
        }
    };

    const RunTestCases = async () => {
        setExecutingTestcases(true);
        setTestcase1Status("")
        setTestcase2Status("")
        setTestcase3Status("")
        setRunTestModel(true);
        try {
            // Judge execution — Lambda judge, server toolchain fallback for C/C++/Java.
            const outcomes = await judgeRunTestCases({
                lang: currentQuestion.lang,
                versionProfileId,
                code: userCode,
                cases: [
                    { input: currentQuestion.input1, expectedOutput: currentQuestion.output1 },
                    { input: currentQuestion.input2, expectedOutput: currentQuestion.output2 },
                    { input: currentQuestion.input3, expectedOutput: currentQuestion.output3 },
                ],
            });
            const [case1, case2, case3] = outcomes;

            setTestcase1Status(case1.status === "Success" ? "pass" : "fail");
            setTestcase2Status(case2.status === "Success" ? "pass" : "fail");
            setTestcase3Status(case3.status === "Success" ? "pass" : "fail");

            if (case1.status === "Success") {
                if (score1 === 0) {
                    setScore1(score1 + 3);
                }
            }
            else if (case1.status === "Error") {
                setErrorCount(errorCount + 1);
            }
            if (case2.status === "Success") {
                if (score2 === 0) {
                    setScore2(score2 + 3);
                }
            }
            else if (case2.status === "Error") {
                setErrorCount(errorCount + 1);
            }
            if (case3.status === "Success") {
                if (score3 === 0) {
                    setScore3(score3 + 3);
                }
            }
            else if (case3.status === "Error") {
                setErrorCount(errorCount + 1);
            }
            setExecutingTestcases(false);
            setShowSubmit(true);
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
        setErrorTitle("Compilation Error")
        setOutputData(null)
    }


    const submitCode = () => {
        setRouteBtnLoading(true)

    }


    const [languageExtension, setLanguageExtension] = useState<{
        extension: unknown;
        completion: ReturnType<typeof getCustomCompletionSource>;
    } | null>(null);

    useEffect(() => {
        if (
            currentQuestion?.lang &&
            isCodeMirrorLanguage(currentQuestion.lang)
        ) {
            const lang = currentQuestion.lang;
            loadLanguageExtension(lang).then((extension) => {
                setLanguageExtension({
                    extension,
                    completion: getCustomCompletionSource(lang),
                });
            });
        }
        // Reset the runtime-version selection for the question's language:
        // remembered choice if valid, otherwise the language default.
        setVersionProfileId(
            currentQuestion?.lang ? getInitialVersionProfileId(currentQuestion.lang) : undefined
        );
    }, [currentQuestion]);
    const [fullscreen, setFullscreen] = useState(fullscreenCheck())

    useEffect(() => {
        const handleFullscreenChange = () => setFullscreen(fullscreenCheck())

        document.addEventListener('fullscreenchange', handleFullscreenChange)
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
        document.addEventListener('mozfullscreenchange', handleFullscreenChange)
        document.addEventListener('MSFullscreenChange', handleFullscreenChange)

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange)
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
        }
    }, [])

    const toggleFullscreen = () => {
        if (fullscreen) {
            exitFullscreen()
        } else {
            const element = document.documentElement
            enterFullscreen(element)
        }
    }
    const handleRoute = () => {
        setRouteBtnLoading(true)
        router.push('/staff/workspace')
    }
    if (!currentQuestion) {
        return (
            <main className="flex min-h-screen w-full flex-col items-center justify-center gap-4 px-4">
                <FileQuestion className="h-14 w-14 text-muted-foreground" />
                <h1 className="text-lg font-semibold text-center">No questions in this module yet</h1>
                <p className="text-sm text-muted-foreground text-center max-w-sm">
                    Questions have not been added to this module, so there is nothing to work on here.
                </p>
                <Button onClick={handleRoute} disabled={routeBtnLoading} className="gap-2">
                    {routeBtnLoading && <Loader className="animate-spin p-1" />}
                    Back to Workspace
                </Button>
            </main>
        )
    }
    return (
        // Full-viewport IDE takeover (sm+): fixed inset-0 detaches the IDE from
        // the document flow, so the page itself never scrolls — the question
        // rail stays pinned (h-full of the viewport) and the exit button can
        // never slide under the status bar. Mobile keeps normal flow so the
        // topbar/nav stay reachable (the rail is hidden below sm anyway).
        <main className="flex min-h-svh w-full flex-row sm:fixed sm:inset-0 sm:z-40 sm:w-auto sm:min-h-0 sm:bg-background sm:overflow-hidden">
            <aside className="hidden sm:flex sm:flex-col w-20 shrink-0 h-full border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
                <div className="flex-grow flex flex-col justify-between">
                    {/* question queue */}
                    <nav className="flex flex-col my-4 space-y-4 overflow-y-auto flex-1 min-h-0">
                        {questionData.map((question: CodeQuestion, index: number) => (
                            <Button
                                key={index}
                                className={`inline-flex items-center justify-center mx-4 transition-colors border bg-transparent text-primary hover:bg-primary/10 ${currentQuestionIndex === index ? 'bg-primary text-white dark:text-white' : ''}`}
                                onClick={() => handleQuestionClick(index)}
                            >
                                <span className='h-6 w-6 p-0.5 font-bold'>
                                    {index + 1}
                                </span>
                            </Button>
                        ))}
                    </nav>

                    {/* Auto height (was fixed h-30): 120px clipped the 3-button
                        cluster so the exit button poked out over the status bar */}
                    <div className="inline-flex flex-col items-center justify-center w-20 shrink-0 pb-3">
                        <Button
                            className="hover:text-primary bg-transparent hover:bg-transparent border-0 shadow-none text-black dark:text-white  cursor-pointer"
                            size="icon"
                            onClick={toggleFullscreen}>
                            {fullscreen ? (
                                <Minimize className='h-6 w-6 text-primary' />
                            ) : (
                                <Maximize className='h-6 w-6' />
                            )}
                            <span className="sr-only">Toggle fullscreen</span>
                        </Button>
                        <ThemeToggle className="my-4" />
                        <Button
                            className="bg-transparent hover:bg-destructive/10 shadow-none border-0 text-black dark:text-white hover:text-destructive cursor-pointer"
                            size="icon"
                            onClick={() => setExitConfirmOpen(true)}
                            disabled={routeBtnLoading}
                        >
                            {routeBtnLoading ? <Loader className="h-6 w-6 animate-spin" /> : <LogOut className="h-6 w-6" />}
                            <span className="sr-only">Exit to workspace</span>
                        </Button>
                    </div>
                </div>
            </aside>
            <div className="w-full h-full flex flex-col items-center justify-center flex-grow">
                <div className="h-full w-full flex flex-col mx-4 items-center ">
                    <ResizablePanelGroup
                        direction="horizontal"
                        className="max-w-full w-full sm:h-full rounded-lg border">

                        <ResizablePanel defaultSize={50} minSize={20}>
                            <div className="flex h-screen sm:h-full items-center justify-center">
                                <CodeQuestion Question={currentQuestion} />
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={50} minSize={40}>
                            <div className="flex h-screen sm:h-full items-center justify-center">
                                {isSubmitted ? (
                                    <div className='h-screen sm:h-full w-full overflow-y-auto dark:bg-[#1e1e1e] flex justify-center items-center '>
                                        Code Submitted !
                                    </div>
                                ) : (
                                    <div className='flex h-screen sm:h-full items-center justify-center w-full flex-col'
                                    >
                                        <div className='h-[95%] w-full overflow-y-auto dark:bg-[#1e1e1e] '>
                                            <CodeMirror
                                                value={userCode}
                                                theme={theme === "dark" ? vscodeDark : eclipse}
                                                extensions={[
                                                    languageExtension?.extension,
                                                    languageExtension?.completion &&
                                                    autocompletion({ override: [languageExtension.completion] }),
                                                ].filter(Boolean) as Extension[]}
                                                style={{ fontSize: 16, minHeight: "95%" }}
                                                onChange={setUserCode}
                                            />
                                        </div>
                                        <div className='h-[5%] w-full border flex items-center justify-center'>
                                            <div className='flex flex-row w-full items-center justify-start mx-1 p-1 gap-x-2'>
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
                                                {currentQuestion?.lang && (
                                                    <LanguageVersionSelect
                                                        lang={currentQuestion.lang}
                                                        value={versionProfileId}
                                                        onChange={(profileId) => {
                                                            setVersionProfileId(profileId);
                                                            setStoredVersionForLang(currentQuestion.lang, profileId);
                                                        }}
                                                        className="w-[240px] ml-auto"
                                                        disabled={executing || executingTestcases}
                                                    />
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
                <AlertDialogContent aria-describedby={undefined} className="sm:max-w-xl">
                    {executing ? (
                        // Running — neutral progress state, no output panes yet
                        <div className='flex flex-col items-center justify-center gap-4 py-10'>
                            <LoaderIcon className='h-8 w-8 animate-spin text-muted-foreground' />
                            <p className='text-sm font-medium text-muted-foreground'>Compiling &amp; running your code…</p>
                        </div>
                    ) : error ? (
                        // Compile / runtime failure — dedicated error view,
                        // deliberately WITHOUT the Expected/Program Output panes
                        <>
                            <AlertDialogHeader>
                                <AlertDialogTitle className='flex items-center gap-2 text-destructive'>
                                    <AlertTriangle className='h-5 w-5 shrink-0' />
                                    {errorTitle}
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <div className='max-h-[300px] overflow-y-auto rounded-md border border-destructive/30 bg-destructive/10 p-3'>
                                <pre className='whitespace-pre-wrap break-words font-mono text-sm leading-relaxed text-destructive'>
                                    {outputData}
                                </pre>
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel className='w-full sm:w-auto' onClick={closeRunModel}>Close</AlertDialogCancel>
                            </AlertDialogFooter>
                        </>
                    ) : (
                        // Program ran — expected vs actual output comparison
                        <>
                            <AlertDialogHeader>
                                <AlertDialogTitle className='flex items-center gap-2'>
                                    {samplesuccess ? (
                                        <>
                                            <CircleCheck className='h-5 w-5 shrink-0 text-green-500' />
                                            Sample Testcase Passed
                                        </>
                                    ) : (
                                        <>
                                            <CircleX className='h-5 w-5 shrink-0 text-red-500' />
                                            Sample Testcase Failed
                                        </>
                                    )}
                                </AlertDialogTitle>
                                <div className='grid w-full grid-cols-2 gap-3 pt-1'>
                                    <div className='space-y-1.5'>
                                        <p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Expected Output</p>
                                        <div className='h-[140px] overflow-y-auto overflow-x-hidden rounded-md border bg-muted/40 p-2.5'>
                                            <pre className='whitespace-pre-wrap break-words font-mono text-sm'>
                                                {currentQuestion.sampleoutput1}
                                            </pre>
                                        </div>
                                    </div>
                                    <div className='space-y-1.5'>
                                        <p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Program Output</p>
                                        <div className='h-[140px] overflow-y-auto overflow-x-hidden rounded-md border bg-muted/40 p-2.5'>
                                            <pre className='whitespace-pre-wrap break-words font-mono text-sm'>
                                                {outputData}
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className='w-full sm:w-auto' onClick={closeRunModel}>Close</AlertDialogCancel>
                            </AlertDialogFooter>
                        </>
                    )}
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={RunTestModel}>
                <AlertDialogContent aria-describedby={undefined}>
                    <AlertDialogHeader>
                        <div className='flex flex-grow flex-col justify-around items-center w-full py-2 gap-2'>
                            <div className='w-full h-1/3 flex flex-row flex-grow justify-center items-center p-2 border border-gray-200 rounded-md'>
                                <div className='w-1/2 flex justify-center items-center'>
                                    Test Case 1
                                </div>

                                <div className='w-1/2 flex justify-center items-center'>
                                    {testcase1Status === "" ? (
                                        <LoaderIcon className="h-6 w-6 animate-spin" />
                                    ) : testcase1Status === "pass" ? (
                                        <>
                                            <Check className='h-6 w-6 mr-2 bg-green-400 rounded-full' /> Passed
                                        </>
                                    ) : (
                                        <>
                                            <X className='h-6 w-6 mr-2 bg-red-500 rounded-full' /> Failed
                                        </>
                                    )
                                    }
                                </div>
                            </div>
                            <div className='w-full h-1/3 flex flex-row flex-grow justify-center items-center p-2 border border-gray-200 rounded-md'>
                                <div className='w-1/2 flex justify-center items-center'>
                                    Test Case 2
                                </div>

                                <div className='w-1/2 flex justify-center items-center'>
                                    {testcase2Status === "" ? (
                                        <LoaderIcon className="h-6 w-6 animate-spin" />
                                    ) : testcase2Status === "pass" ? (
                                        <>
                                            <Check className='h-6 w-6 mr-2 bg-green-400 rounded-full' /> Passed
                                        </>
                                    ) : (
                                        <>
                                            <X className='h-6 w-6 mr-2 bg-red-500 rounded-full' /> Failed
                                        </>
                                    )
                                    }
                                </div>
                            </div>
                            <div className='w-full h-1/3 flex flex-row flex-grow justify-center items-center p-2 border border-gray-200 rounded-md'>
                                <div className='w-1/2 flex justify-center items-center'>
                                    Test Case 3
                                </div>
                                <div className='w-1/2 flex justify-center items-center'>
                                    {testcase3Status === "" ? (
                                        <LoaderIcon className="h-6 w-6 animate-spin" />
                                    ) : testcase3Status === "pass" ? (
                                        <>
                                            <Check className='h-6 w-6 mr-2 bg-green-400 rounded-full' /> Passed
                                        </>
                                    ) : (
                                        <>
                                            <X className='h-6 w-6 mr-2 bg-red-500 rounded-full' /> Failed
                                        </>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </AlertDialogHeader>
                    {!executingTestcases && (
                        <AlertDialogFooter>
                            <AlertDialogCancel className='bg-primary hover:bg-primary/80 text-white w-full' onClick={closeTestCaseModel}>Close</AlertDialogCancel>
                        </AlertDialogFooter>
                    )}
                </AlertDialogContent>
            </AlertDialog>

            {/* Staff exit guard — confirm before leaving the IDE so a stray
                click on the rail's exit button can't lose unsaved code */}
            <AlertDialog open={exitConfirmOpen} onOpenChange={setExitConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Exit to workspace?</AlertDialogTitle>
                        <AlertDialogDescription>
                            You are about to leave the code editor. Any code you haven&apos;t run yet will not be saved.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={routeBtnLoading}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className='bg-primary hover:bg-primary/80 text-white'
                            onClick={handleRoute}
                            disabled={routeBtnLoading}
                        >
                            {routeBtnLoading ? <Loader className='animate-spin' /> : 'Yes, exit'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </main>
    );
};

export default CodeView;