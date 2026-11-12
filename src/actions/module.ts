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
/**
 * Intelligent module delete — mirrors the cleanup API's full module wipe
 * (removeModuleSection with every section at once, then the module row).
 * Cascade order inside one transaction:
 *   1. student practice data — module progress, MCQ attempts and code
 *      submissions (they reference the module and its questions)
 *   2. module content — code/MCQ questions and study references
 *   3. the module row itself
 * None of the relations cascade in the schema, so a bare module.delete
 * would hit FK constraints whenever any of these rows exist.
 */
export const deletemodule = async (
    values: z.infer<typeof DeleteModuleSchema>
) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can delete modules." };

    const mid = values.id;
    const module_ = await db.module.findUnique({ where: { id: mid }, select: { id: true } });
    if (!module_) return { error: "Module not found." };

    await db.$transaction(async (tx) => {
        // Student practice data always goes first — it references the
        // module and its questions.
        await Promise.all([
            tx.userModuleData.deleteMany({ where: { moduleId: mid } }),
            tx.userMCQData.deleteMany({ where: { moduleId: mid } }),
            tx.userCodeQuestionData.deleteMany({ where: { moduleId: mid } }),
        ])
        // Questions always go together with their references.
        await Promise.all([
            tx.codeQuestion.deleteMany({ where: { moduleId: mid } }),
            tx.mCQQuestion.deleteMany({ where: { moduleId: mid } }),
            tx.moduleReferences.deleteMany({ where: { moduleId: mid } }),
        ])
        // The module row itself.
        await tx.module.delete({ where: { id: mid } })
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

/**
 * Bulk intelligent module delete — runs the same full cascade as
 * `deletemodule` for every selected module inside ONE transaction, so FK
 * constraints can no longer fail. Modules that don't exist are ignored.
 */
export const deletemodulesbulk = async (ids: string[]) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can delete modules." };

    const validIds = (ids ?? []).filter(
        (id) => typeof id === "string" && id.trim().length > 0
    );
    if (validIds.length === 0) return { error: "No modules selected." };

    // Only delete modules that actually exist so counts stay honest.
    const existing = await db.module.findMany({
        where: { id: { in: validIds } },
        select: { id: true },
    });
    if (existing.length === 0) return { error: "No modules selected." };
    const existingIds = existing.map((m) => m.id);

    await db.$transaction(async (tx) => {
        // Student practice data always goes first — it references the
        // modules and their questions.
        await Promise.all([
            tx.userModuleData.deleteMany({ where: { moduleId: { in: existingIds } } }),
            tx.userMCQData.deleteMany({ where: { moduleId: { in: existingIds } } }),
            tx.userCodeQuestionData.deleteMany({ where: { moduleId: { in: existingIds } } }),
        ]);
        // Questions always go together with their references.
        await Promise.all([
            tx.codeQuestion.deleteMany({ where: { moduleId: { in: existingIds } } }),
            tx.mCQQuestion.deleteMany({ where: { moduleId: { in: existingIds } } }),
            tx.moduleReferences.deleteMany({ where: { moduleId: { in: existingIds } } }),
        ]);
        // The module rows themselves.
        await tx.module.deleteMany({ where: { id: { in: existingIds } } });
    });

    revalidatePath("/admin/courses");
    revalidatePath("/staff/courses");

    return { success: `${existingIds.length} module(s) deleted.` };
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