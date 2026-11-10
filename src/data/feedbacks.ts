import { db } from "@/lib/db";

export const getAllFeedbacksByCourseId = async (id: string) => {
    try {
        const feedbacksdata = await db.feedbacks.findMany({
            where: { courseId: id }
        })
        return feedbacksdata
    }
    catch {
        return null
    }
}

// Lightweight count for stat displays — avoids loading full rows
export const getFeedbackCountByCourseId = async (id: string) => {
    try {
        return await db.feedbacks.count({
            where: { courseId: id }
        })
    }
    catch {
        return 0
    }
}