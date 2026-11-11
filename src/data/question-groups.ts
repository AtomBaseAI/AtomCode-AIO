import { db } from "@/lib/db";

export const getAllQuestionGroups = () => {
    try {
        const groups = db.questionGroup.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                _count: {
                    select: { questions: true, mcqQuestions: true, topics: true }
                }
            }
        })
        return groups
    }
    catch {
        return null
    }
}

export const getQuestionGroupById = async (id: string) => {
    try {
        const group = await db.questionGroup.findUnique({
            where: { id },
            include: {
                questions: {
                    orderBy: { title: "asc" }
                },
                _count: {
                    select: { questions: true }
                }
            }
        })
        return group
    }
    catch {
        return null
    }
}

export const getQuestionGroupsCount = () => {
    try {
        const count = db.questionGroup.count()
        return count
    }
    catch {
        return null
    }
}

/**
 * MCQ questions currently inside the given group.
 */
export const getMcqQuestionsForGroup = async (gid: string) => {
    try {
        const mcqs = await db.mCQQuestion.findMany({
            where: { questionGroupId: gid },
            orderBy: { title: "asc" },
            select: {
                id: true,
                title: true,
                description: true,
                topic: true,
                subtopic: true,
                Option1: true,
                Option2: true,
                Option3: true,
                Option4: true,
                CorrectOption: true,
                referenceimg: true,
                codesnippet: true,
                snippetLang: true,
                iscodesnippet: true,
                questionGroup: { select: { title: true } },
            },
        })
        return mcqs
    }
    catch {
        return null
    }
}

/**
 * Topics of a question group with their subtopics. Used by the topics page.
 * Ordered alphabetically — the UI promotes the default "general" topic.
 */
export const getTopicsForGroup = async (gid: string) => {
    try {
        const topics = await db.topic.findMany({
            where: { groupId: gid },
            orderBy: { name: "asc" },
            include: { subtopics: { orderBy: { name: "asc" } } },
        })
        return topics
    }
    catch {
        return null
    }
}


