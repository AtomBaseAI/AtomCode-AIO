import AssessmentCard from "@/components/student-role/assessment/client/assessmentcard"
import { FlaskConical } from "lucide-react"
import { auth } from '@/auth'
import { z } from "zod"
import { AssessmentTableSchema } from "@/schemas/student/assessment-schema"
import { getAssessmentsByUserId } from "@/data/student/assessments"
import { TopbarTitle } from "@/components/topbar-title"

async function fetchAssessments(uid: string) {
  const assessments = await getAssessmentsByUserId(uid)
  return z.array(AssessmentTableSchema).parse(assessments)
}

const getSessionUserID = async () => {
  const session = await auth();
  return session?.user?.id
}

const Assesments = async () => {
  const uid = await getSessionUserID()
  if (uid === null || uid === undefined) {
    return (
      <div className="flex h-full w-full flex-1 flex-col gap-6 p-4 pb-8 md:p-8">
        <TopbarTitle>Assessments</TopbarTitle>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-10 text-center">
          <FlaskConical className="size-8 text-muted-foreground" />
          <p className="text-muted-foreground">Not logged in.</p>
        </div>
      </div>
    )
  }
  const assessmentData = await fetchAssessments(uid)
  return (
    // Same content-span spacing rule as the admin panel: p-4 / md:p-8 from
    // the top bar and sidebar, full-width column, consistent section gap.
    <div className="flex h-full w-full flex-1 flex-col gap-6 p-4 pb-8 md:p-8">
      <TopbarTitle>Assessments</TopbarTitle>
      {assessmentData.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-10 text-center">
          <FlaskConical className="size-8 text-muted-foreground" />
          <p className="text-muted-foreground">No assessments enrolled.</p>
        </div>
      ) : (
        // Full-width responsive card grid (mirrors the admin dashboard's
        // stat-card grid) — cards stretch to fill their cells, no centering.
        <div className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {assessmentData.map((assessment, index) => (
            <AssessmentCard key={index} data={assessment} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Assesments
