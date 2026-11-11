import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getQuestionGroupById } from "@/data/question-groups"
import { GroupQuestionsDataTable } from "@/components/question-group/group-questions-data-table"
import { QuestionImportExportMenu } from "@/components/question-group/question-import-export-menu"
import AddQuestion from "@/components/question/question-add-form"
import BackBtn from "@/components/backbtn"
import { TopbarBreadcrumb } from "@/components/topbar-title"

const GroupQuestionsPage = async ({
    params,
}: {
    params: Promise<{ gid: string }>
}) => {
    const { gid } = await params
    const group = await getQuestionGroupById(gid)

    if (!group) {
        return (
            <div className="flex h-full flex-1 flex-col items-center justify-center gap-4 p-4 md:p-8 w-full">
                <h2 className="text-2xl font-bold tracking-tight">
                    Group not found
                </h2>
                <p className="text-muted-foreground">
                    This question group may have been deleted.
                </p>
                <Button variant="outline" className="gap-2" asChild>
                    <Link href="/admin/questions-groups">
                        <ArrowLeft className="size-4" /> Back to Question Groups
                    </Link>
                </Button>
            </div>
        )
    }

    const inGroup = group.questions.map((q) => ({
        id: q.id,
        title: q.title,
        lang: q.lang,
        difficulty: q.difficulty,
        maxscore: q.maxscore,
        topic: q.topic,
        subtopic: q.subtopic,
        groupTitle: group.title,
    }))

    return (
        <div className="flex h-full flex-1 flex-col space-y-2 p-4 md:p-8 w-full">
            <TopbarBreadcrumb
                items={[
                    { label: "Question Groups", href: "/admin/questions-groups" },
                    { label: group?.title ?? "Group" },
                ]}
            />
            <div className="flex flex-wrap items-center justify-between gap-2 space-y-2">
                <div>
                    <p className="text-muted-foreground">
                        {inGroup.length} question
                        {inGroup.length === 1 ? "" : "s"} in this group
                    </p>
                </div>
                <div className="flex justify-center items-center gap-x-4">
                    <AddQuestion
                        lockedGroup={{ id: group.id, title: group.title }}
                        triggerLabel="Create Question"
                    />
                    <QuestionImportExportMenu
                        groupId={group.id}
                        groupTitle={group.title}
                    />
                    <BackBtn />
                </div>
            </div>
            <GroupQuestionsDataTable data={inGroup} />
        </div>
    )
}

export default GroupQuestionsPage
