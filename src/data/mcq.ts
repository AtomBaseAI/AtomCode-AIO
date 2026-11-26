import { db } from "@/lib/db";
export const getModuleMCQsByModuleId = async (id: string) => {
    try {
        const moduleWithMCQs = await db.module.findUnique({
            where: { id },
            include: { mcqQuestions: true }
        });

        if (moduleWithMCQs) {
            return moduleWithMCQs.mcqQuestions;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching module MCQs:", error);
        return null;
    }
};
export const getAssessmentMCQsByAssessmentId = async (id: string) => {
    try {
        const assessmentWithMCQs = await db.assessments.findUnique({
            where: { id },
            include: { mcqQuestions: true }
        });

        if (assessmentWithMCQs) {
            return assessmentWithMCQs.mcqQuestions;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching assessment MCQs:", error);
        return null;
    }
};
export const getMCQById = async (id: string) => {
    try {
        const question = await db.mCQQuestion.findUnique({ where: { id } })
        return question
    }
    catch {
        return null
    }
}

/**
 * The FULL question-bank MCQ pool for the module "Add MCQ" page. MCQs are
 * many-to-many now — the same MCQ may serve modules of different courses,
 * so every bank MCQ is pickable (the page filters out MCQs that are already
 * part of the target module).
 */
export const getAllBankMcqs = async () => {
    try {
        return await db.mCQQuestion.findMany({
            orderBy: { title: "asc" },
        });
    } catch (error) {
        console.error("Error fetching bank MCQs:", error);
        return [];
    }
};