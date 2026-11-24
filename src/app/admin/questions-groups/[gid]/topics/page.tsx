import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { getQuestionGroupById, getTopicsForGroup, getTopicQuestionCounts } from "@/data/question-groups"
import { TopicsView, type TopicViewData } from "@/components/question-group/topics-view"
import { TopicsImportExportMenu } from "@/components/question-group/topics-import-export-menu"
import BackBtn from "@/components/backbtn"
import { TopbarBreadcrumb } from "@/components/topbar-title"
import { DEFAULT_TOPIC_NAME } from "@/lib/topics"

const GroupTopicsPage = async ({
    params,
}: {
    params: Promise<{ gid: string }>
}) => {
    const { gid } = await params

    // Import / export of topics is super-admin-only now.
    const session = await auth()
    const role = (session?.user as { role?: string } | undefined)?.role
    const isSuperAdmin = role === "superadmin"

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

    const rawTopics = (await getTopicsForGroup(gid)) ?? []

    // Question usage counts per topic and per (topic, sub topic), split by
    // question kind. Questions store topic / subtopic names, so counts are
    // keyed by lowercase names.
    const countRows = (await getTopicQuestionCounts(gid)) ?? []
    const topicCounts = new Map<string, { code: number; mcq: number }>()
    const subCounts = new Map<string, { code: number; mcq: number }>()
    for (const row of countRows) {
        const t = (row.topic ?? "").trim().toLowerCase()
        if (!t) continue
        const tt = topicCounts.get(t) ?? { code: 0, mcq: 0 }
        if (row.kind === "mcq") tt.mcq += 1
        else tt.code += 1
        topicCounts.set(t, tt)
        const s = (row.subtopic ?? "").trim().toLowerCase()
        if (!s) continue
        const key = `${t}|${s}`
        const st = subCounts.get(key) ?? { code: 0, mcq: 0 }
        if (row.kind === "mcq") st.mcq += 1
        else st.code += 1
        subCounts.set(key, st)
    }

    // Default "general" topic first, then alphabetical (API order is
    // alphabetical — promote the default here).
    const sorted = [...rawTopics].sort((a, b) => {
        if (a.name.toLowerCase() === DEFAULT_TOPIC_NAME) return -1
        if (b.name.toLowerCase() === DEFAULT_TOPIC_NAME) return 1
        return a.name.localeCompare(b.name)
    })

    const topics: TopicViewData[] = sorted.map((t) => {
        const counts = topicCounts.get(t.name.toLowerCase()) ?? {
            code: 0,
            mcq: 0,
        }
        return {
            id: t.id,
            name: t.name,
            isDefault: t.name.toLowerCase() === DEFAULT_TOPIC_NAME,
            questionCount: counts.code + counts.mcq,
            codeCount: counts.code,
            mcqCount: counts.mcq,
            subtopics: [...t.subtopics]
                .sort((a, b) => {
                    if (a.name.toLowerCase() === DEFAULT_TOPIC_NAME) return -1
                    if (b.name.toLowerCase() === DEFAULT_TOPIC_NAME) return 1
                    return a.name.localeCompare(b.name)
                })
                .map((s) => {
                    const sub = subCounts.get(
                        `${t.name.toLowerCase()}|${s.name.toLowerCase()}`
                    ) ?? { code: 0, mcq: 0 }
                    return {
                        id: s.id,
                        name: s.name,
                        isDefault: s.name.toLowerCase() === DEFAULT_TOPIC_NAME,
                        questionCount: sub.code + sub.mcq,
                        codeCount: sub.code,
                        mcqCount: sub.mcq,
                    }
                }),
        }
    })

    const totalTopics = topics.length
    const totalSubs = topics.reduce((acc, t) => acc + t.subtopics.length, 0)

    return (
        <div className="flex h-full flex-1 flex-col space-y-2 p-4 md:p-8 w-full">
            <TopbarBreadcrumb
                items={[
                    { label: "Question Groups", href: "/admin/questions-groups" },
                    { label: group?.title ?? "Group" },
                ]}
            />
            <div className="flex flex-wrap items-center justify-between gap-2 space-y-2">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="text-xl font-semibold tracking-tight text-muted-foreground">
                        Topics
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {totalTopics} topic{totalTopics === 1 ? "" : "s"} ·{" "}
                        {totalSubs} sub topic{totalSubs === 1 ? "" : "s"} in
                        this group
                    </p>
                </div>
                <div className="flex justify-center items-center gap-x-4">
                    {isSuperAdmin && (
                        <TopicsImportExportMenu
                            groupId={group.id}
                            groupTitle={group.title}
                        />
                    )}
                    <BackBtn />
                </div>
            </div>
            <TopicsView
                groupId={group.id}
                groupTitle={group.title}
                topics={topics}
            />
        </div>
    )
}

export default GroupTopicsPage
