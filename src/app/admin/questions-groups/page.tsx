import { auth } from "@/auth"
import { getAllQuestionGroups } from "@/data/question-groups"
import { GroupsDataTable } from "@/components/question-group/groups-data-table"
import { GroupFormDialog } from "@/components/question-group/group-form-dialog"
import { GroupImportDialog } from "@/components/question-group/group-import-dialog"
import { TopbarTitle } from "@/components/topbar-title"

export default async function QuestionGroupsPage() {
    // Import / export is super-admin-only now — regular admins get a panel
    // without it, the super admin keeps the exact same tooling as before.
    const session = await auth()
    const role = (session?.user as { role?: string } | undefined)?.role
    const isSuperAdmin = role === "superadmin"

    const groups = await getAllQuestionGroups()
    const rows = (groups ?? []).map((g) => ({
        id: g.id,
        title: g.title,
        createdAt: g.createdAt.toISOString(),
        questionCount: g._count.questions,
        mcqCount: g._count.mcqQuestions,
        topicCount: g._count.topics,
    }))

    return (
        <div className="flex h-full flex-1 flex-col space-y-2 p-4 md:p-8 w-full">
            <TopbarTitle>Question Groups</TopbarTitle>
            <div className="flex flex-wrap items-center justify-between gap-2 space-y-2">
                <div>
                    <p className="text-xl font-semibold tracking-tight text-muted-foreground">
                        All Question Groups
                    </p>
                </div>
                <div className="flex justify-center items-center gap-x-4">
                    {isSuperAdmin && <GroupImportDialog />}
                    <GroupFormDialog mode="create" />
                </div>
            </div>
            <GroupsDataTable data={rows} canExport={isSuperAdmin} />
        </div>
    )
}
