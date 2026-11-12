"use server"
import { db } from "@/lib/db"
import * as z from 'zod'
import { revalidatePath } from "next/cache"
import { requireAdmin } from "@/lib/action-guards"
import { AddModuleSchema, DeleteModuleSchema, ModuleUpdateSchema } from "@/schemas/module-schema"

export const addmodule = async (values: z.infer<typeof AddModuleSchema>) => {
    const cid = values.courseId;
    await db.module.create({
        data: {
            ...values,
        }
    })

    revalidatePath(`/admin/courses`)
    return { success: "Module Added !" }
}
export const deletemodule = async (
    values: z.infer<typeof DeleteModuleSchema>
) => {
    const mid = values.id;
    await db.module.delete({
        where: {
            id: mid
        }
    })
    revalidatePath("/admin/courses")
    return { success: "Module Deleted !" }
}



//change model before update
export const updatemodule = async (
    values: z.infer<typeof ModuleUpdateSchema>
) => {
    const mid = values.id;
    await db.module.update({
        where: {
            id: mid
        },
        data: {
            ...values,
        }
    })
    revalidatePath(`/admin/courses`)
    return { success: "Module Updated !" }
}

export const addmodulequestions = async (
    moduleId: string,
    questionIds: string[]
) => {
    await db.module.update({
        where: {
            id: moduleId
        },
        data: {
            codeQuestions: {
                connect: questionIds.map(id => ({ id }))
            }
        }
    });

    revalidatePath(`/admin/courses`)
    return { success: "Questions added to module successfully!" };
}

/**
 * Remove a code question from a module — detaches the many-to-many relation
 * only. The question itself stays in the question bank and can be re-added.
 */
export const removemodulequestion = async (
    id: string,
    mid: string
) => {
    const module_ = await db.module.findUnique({
        where: { id: mid },
        select: { codeQuestions: { select: { id: true } } },
    });
    if (!module_) return { error: "Module not found." };
    if (!module_.codeQuestions.some((q) => q.id === id)) {
        return { error: "Question is not part of this module." };
    }

    await db.module.update({
        where: {
            id: mid
        },
        data: {
            codeQuestions: {
                disconnect: { id: id }
            }
        }
    });

    revalidatePath(`/admin/courses`)
    return { success: "Question removed from module. It is still available in the question bank!" };
}

export const deletemodulesbulk = async (ids: string[]) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can delete modules." };

    const validIds = (ids ?? []).filter(
        (id) => typeof id === "string" && id.trim().length > 0
    );
    if (validIds.length === 0) return { error: "No modules selected." };

    // Modules referenced by questions/attempts cannot be deleted (FK
    // restrict) — delete what we can and report the rest as skipped.
    let deleted = 0;
    let skipped = 0;
    for (const id of validIds) {
        try {
            await db.module.delete({ where: { id } });
            deleted++;
        } catch {
            skipped++;
        }
    }

    revalidatePath("/admin/courses");
    revalidatePath("/staff/courses");

    if (deleted === 0) {
        return {
            error:
                "None of the selected modules could be deleted — they still contain questions or student attempts.",
        };
    }
    return { success: `${deleted} module(s) deleted.`, skipped: skipped > 0 ? skipped : undefined };
}

/**
 * Add existing MCQs to a module. An MCQQuestion belongs to at most one
 * module (nullable moduleId FK), so only unassigned MCQs (moduleId = null)
 * are addable — connecting an assigned one would silently move it.
 */
export const addmodulemcqs = async (moduleId: string, mcqIds: string[]) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can manage module MCQs." };

    const validIds = (mcqIds ?? []).filter(
        (id) => typeof id === "string" && id.trim().length > 0
    );
    if (validIds.length === 0) return { error: "No MCQs selected." };

    const module_ = await db.module.findUnique({
        where: { id: moduleId },
        select: { id: true },
    });
    if (!module_) return { error: "Module not found." };

    const mcqs = await db.mCQQuestion.findMany({
        where: { id: { in: validIds } },
        select: { id: true, moduleId: true },
    });
    const addableIds = mcqs
        .filter((m) => m.moduleId === null)
        .map((m) => m.id);
    if (addableIds.length === 0) {
        return { error: "Selected MCQs are already assigned to a module." };
    }

    await db.module.update({
        where: { id: moduleId },
        data: {
            mcqQuestions: {
                connect: addableIds.map((id) => ({ id })),
            },
        },
    });

    revalidatePath("/admin/courses");
    const skipped = validIds.length - addableIds.length;
    return {
        success: `${addableIds.length} MCQ(s) added to the module.`,
        skipped: skipped > 0 ? skipped : undefined,
    };
}

/**
 * Remove a single MCQ from a module — clears the moduleId FK only. The MCQ
 * itself stays in the question bank and can be re-added later.
 */
export const removemodulemcq = async (mcqId: string, mid: string) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can manage module MCQs." };

    const mcq = await db.mCQQuestion.findUnique({
        where: { id: mcqId },
        select: { moduleId: true },
    });
    if (!mcq) return { error: "MCQ not found." };
    if (mcq.moduleId !== mid) {
        return { error: "MCQ is not part of this module." };
    }

    await db.module.update({
        where: { id: mid },
        data: {
            mcqQuestions: {
                disconnect: { id: mcqId },
            },
        },
    });

    revalidatePath("/admin/courses");
    return { success: "MCQ removed from module. It is still available in the question bank!" };
}

/**
 * Bulk-remove MCQs from a module (the MCQs themselves stay in the question
 * bank — mirrors the row-level disconnect behaviour).
 */
export const removemodulemcqsbulk = async (mid: string, mcqIds: string[]) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can manage module MCQs." };

    const validIds = (mcqIds ?? []).filter(
        (id) => typeof id === "string" && id.trim().length > 0
    );
    if (validIds.length === 0) return { error: "No MCQs selected." };

    const module_ = await db.module.findUnique({
        where: { id: mid },
        select: { mcqQuestions: { select: { id: true } } },
    });
    if (!module_) return { error: "Module not found." };

    const connectedIds = module_.mcqQuestions
        .map((m) => m.id)
        .filter((id) => validIds.includes(id));
    if (connectedIds.length === 0) {
        return { error: "Selected MCQs are not part of this module." };
    }

    await db.module.update({
        where: { id: mid },
        data: {
            mcqQuestions: {
                disconnect: connectedIds.map((id) => ({ id })),
            },
        },
    });

    revalidatePath("/admin/courses");
    return { success: `${connectedIds.length} MCQ(s) removed from the module.` };
}

/**
 * Bulk-remove code questions from a module (the questions themselves stay
 * in the question bank — mirrors the row-level disconnect behaviour).
 */
export const deletemodulequestionsbulk = async (mid: string, qids: string[]) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can manage module questions." };

    const validIds = (qids ?? []).filter(
        (id) => typeof id === "string" && id.trim().length > 0
    );
    if (validIds.length === 0) return { error: "No questions selected." };

    const module_ = await db.module.findUnique({
        where: { id: mid },
        select: { codeQuestions: { select: { id: true } } },
    });
    if (!module_) return { error: "Module not found." };

    const connectedIds = module_.codeQuestions
        .map((q) => q.id)
        .filter((id) => validIds.includes(id));
    if (connectedIds.length === 0) {
        return { error: "Selected questions are not part of this module." };
    }

    await db.module.update({
        where: { id: mid },
        data: {
            codeQuestions: {
                disconnect: connectedIds.map((id) => ({ id })),
            },
        },
    });

    revalidatePath("/admin/courses");
    return { success: `${connectedIds.length} question(s) removed from the module.` };
}