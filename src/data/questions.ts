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
// All code questions regardless of language — used by any-language courses,
// where questions from every language may be attached to modules/assessments.
export const getAllQuestions = () => {
    try {
        const questions = db.codeQuestion.findMany()
        return questions
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
