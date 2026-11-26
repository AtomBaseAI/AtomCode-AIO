import { db } from "@/lib/db";

export const getAllMCQByModuleId = async (moduleId: string) => {
    try {
        // Many-to-many: MCQs assigned to this module via the join relation
        // (the same MCQ may also belong to modules of other courses).
        const mcqs = await db.mCQQuestion.findMany({
            where: { modules: { some: { id: moduleId } } }
        });

        return mcqs;
    } catch (error) {
        console.error("Error fetching MCQs by module ID:", error);
        return [];
    }
};

export const getMCQCountByModuleId = async (moduleId: string) => {
    try {
        const count = await db.mCQQuestion.count({
            where: { modules: { some: { id: moduleId } } }
        });

        return count;
    } catch (error) {
        console.error("Error counting MCQs by module ID:", error);
        return 0;
    }
};
