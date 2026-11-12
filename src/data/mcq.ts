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
 * Question-bank MCQs not assigned to any module (moduleId = null) — the
 * pickable pool for the module "Add MCQ" page. An MCQQuestion belongs to at
 * most one module (nullable moduleId FK), so unassigned rows are exactly the
 * ones that can be added to a module without moving them away from another.
 */
export const getUnassignedMCQs = async () => {
    try {
        return await db.mCQQuestion.findMany({
            where: { moduleId: null },
            orderBy: { title: "asc" },
        });
    } catch (error) {
        console.error("Error fetching unassigned MCQs:", error);
        return [];
    }
};