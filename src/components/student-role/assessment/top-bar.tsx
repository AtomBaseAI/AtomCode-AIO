"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Timer } from "@/components/student-role/assessment/timer"
import { AlertCircle, Check, LoaderIcon } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import dynamic from 'next/dynamic';
const OnlineStatus = dynamic(() => import("@/hooks/NetworkDector"), { ssr: false });
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from "sonner";
import { Input } from "@/components/ui/input"
import { finalizeassessment } from "@/actions/assessment"

interface TopBarProps {
  onQuestionTypeChange: (type: string) => void
  tabSwitchCount: number
  initialTime: number
  onTimeExpired: () => void
  maxTabSwitches: number
  /** Parent-course type — "mcq-only" courses hide the Code toggle. */
  courseType?: string
  /** Attempt identifiers used by the overall Submit Test action. */
  uaid: string
  uid: string
  aid: string
}

export function TopBar({ onQuestionTypeChange, tabSwitchCount, initialTime, onTimeExpired, maxTabSwitches, courseType, uaid, uid, aid }: TopBarProps) {
  const [questionType, setQuestionType] = useState<string>("MCQ")
  const [isLoading, startTransition] = useTransition()
  const [SubmitTestModel, setSubmitTestModel] = useState(false)
  const handleQuestionTypeChange = (value: string) => {
    setQuestionType(value)
    onQuestionTypeChange(value)
  }


  const [inputValue, setInputValue] = useState("")
  const isSubmitEnabled = inputValue === "END TEST"

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const router = useRouter()

  const handleSubmit = () => {
    if (!isSubmitEnabled || isLoading) return
    startTransition(() => {
      finalizeassessment({ id: uaid, userId: uid, assessmentId: aid })
        .then((res) => {
          setSubmitTestModel(false)
          if (res.success) {
            localStorage.removeItem("testInProgress")
            localStorage.removeItem("tabSwitchCount")
            localStorage.removeItem("testStartTime")
            toast.success(res.success)
            router.push("/student/assessments")
          } else if (res.error) {
            toast.error(res.error)
          } else {
            toast.error("Something went wrong, try again")
          }
        })
        .catch(() => {
          setSubmitTestModel(false)
          toast.error("Something went wrong, try again")
        })
    })
  }

  return (
    <>
      <header className="sticky top-0 z-10 w-screen border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-2 flex h-[5vh] items-center justify-between">
          <div className="flex items-center flex-row gap-2">
            <Select value={questionType} onValueChange={handleQuestionTypeChange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Question Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MCQ">MCQ</SelectItem>
                {/* mcq-only courses have no code section to switch to */}
                {courseType !== "mcq-only" && (
                  <SelectItem value="Code">Code</SelectItem>
                )}
              </SelectContent>
            </Select>
            <ThemeToggle className="my-4 border shadow-sm cursor-pointer [&_svg]:h-5 [&_svg]:w-5" />
          </div>

          <div className="flex items-center justify-end gap-4 w-2/3 h-full">
            <div className="border shadow-sm h-9 w-[1/4] p-2 px-3 rounded-sm flex justify-center items-center">
              <OnlineStatus />
            </div>
            <div className="h-9 w-[1/4] flex items-center gap-1.5 text-sm font-medium border shadow-sm p-2 px-3 rounded-sm">
              <AlertCircle className={`h-4 w-4 ${tabSwitchCount > 3 ? "text-red-500" : "text-amber-500"}`} />
              <span className={`${tabSwitchCount > 3 ? "text-red-500" : ""}`}>
                Tab Switches: {tabSwitchCount}/{maxTabSwitches}
              </span>
            </div>
            <div className="border shadow-sm h-9 w-[1/4] p-2 px-3 rounded-sm">
              <Timer initialTime={initialTime} onTimeExpired={onTimeExpired} />
            </div>
            <Button onClick={() => setSubmitTestModel(true)} className="h-9 w-[1/4]">
              <Check className="h-5 w-5 mr-2" />
              Submit Test
            </Button>
          </div>
        </div>
      </header>
      <AlertDialog open={SubmitTestModel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Assessment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure want to submit Assessment ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2">
            <Input
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type END TEST to confirm"
              className="w-full"
              autoFocus
            />
          </div>
          <AlertDialogFooter className="flex flex-row gap-2">
            <AlertDialogCancel onClick={() => setSubmitTestModel(false)} className='bg-red-500 text-white flex-1 hover:bg-red-400 hover:text-white'>Close</AlertDialogCancel>
            <AlertDialogAction className='flex-1' disabled={!isSubmitEnabled || isLoading} onClick={handleSubmit}>
              {isLoading && (
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
