import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    getQuestionGroupById,
    getMcqQuestionsForGroup,
} from "@/data/question-groups"
import { GroupMcqDataTable } from "@/components/question-group/group-mcq-data-table"
import { GroupMcqAddForm } from "@/components/question-group/group-mcq-add-form"
import { GroupMcqImportExportMenu } from "@/components/question-group/group-mcq-import-export-menu"
import BackBtn from "@/components/backbtn"
import { TopbarBreadcrumb } from "@/components/topbar-title"
import type { GroupMcqRow } from "@/schemas/group-mcq-schema"

const GroupMcqQuestionsPage = async ({
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

    const toGroupMcqRow = (q: {
        id: string
        title: string
        description: string
        topic: string | null
        subtopic: string | null
        Option1: string
        Option2: string
        Option3: string
        Option4: string
        CorrectOption: number
        referenceimg: string | null
        codesnippet: string | null
        snippetLang: string | null
        iscodesnippet: boolean
        questionGroup: { title: string } | null
    }): GroupMcqRow => ({
        id: q.id,
        title: q.title,
        description: q.description,
        topic: q.topic,
        subtopic: q.subtopic,
        Option1: q.Option1,
        Option2: q.Option2,
        Option3: q.Option3,
        Option4: q.Option4,
        CorrectOption: q.CorrectOption,
        referenceimg: q.referenceimg,
        codesnippet: q.codesnippet,
        snippetLang: q.snippetLang,
        iscodesnippet: q.iscodesnippet,
        groupTitle: q.questionGroup?.title ?? null,
    })

    const inGroupRaw = await getMcqQuestionsForGroup(gid)
    const inGroup = (inGroupRaw ?? []).map(toGroupMcqRow)

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
                        {inGroup.length} MCQ question
                        {inGroup.length === 1 ? "" : "s"} in this group
                    </p>
                </div>
                <div className="flex justify-center items-center gap-x-4">
                    <GroupMcqAddForm
                        lockedGroup={{ id: group.id, title: group.title }}
                        triggerLabel="Create MCQ"
                    />
                    <GroupMcqImportExportMenu
                        groupId={group.id}
                        groupTitle={group.title}
                    />
                    <BackBtn />
                </div>
            </div>
            <GroupMcqDataTable groupId={group.id} data={inGroup} />
        </div>
    )
}

export default GroupMcqQuestionsPage
