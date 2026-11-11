import { db } from "@/lib/db";

export const getAllQuestionsByLang = (lang: string) => {
    try {
        const langquestions = db.codeQuestion.findMany({ where: { lang } })
        return langquestions
    }
    catch {
        return null
    }
}
export const getQuestionsCount = () => {
    try {
        const qcount = db.codeQuestion.count()
        return qcount
    }
    catch {
        return null
    }
}
