"use server"
import { db } from "@/lib/db"
import { type Prisma } from "@prisma/client"
import * as z from 'zod'
import { revalidatePath } from "next/cache"
import { requireAdmin } from "@/lib/action-guards"
import { AddModuleSchema, DeleteModuleSchema, ModuleUpdateSchema } from "@/schemas/module-schema"

export const addmodule = async (values: z.infer<typeof AddModuleSchema>) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can add modules." };

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
/**
 * Shared-aware question cleanup for module/course deletion. Questions are
 * now many-to-many — a question attached to modules of ANOTHER course must
 * survive; only questions whose ENTIRE module assignment falls inside the
 * deleting set are removed from the bank. Detaching the rest happens via
 * cascade when the module rows go.
 */
async function deleteOrphanedQuestions(
    tx: Prisma.TransactionClient,
    moduleIds: string[]
): Promise<number> {
    if (moduleIds.length === 0) return 0;
    const [code, mcq] = await Promise.all([
        tx.codeQuestion.findMany({
            where: {
                modules: { some: { id: { in: moduleIds } } },
                AND: [{ modules: { none: { id: { notIn: moduleIds } } } }],
            },
            select: { id: true },
        }),
        tx.mCQQuestion.findMany({
            where: {
                modules: { some: { id: { in: moduleIds } } },
                AND: [{ modules: { none: { id: { notIn: moduleIds } } } }],
            },
            select: { id: true },
        }),
    ]);
    const [codeIds, mcqIds] = [code.map((q) => q.id), mcq.map((q) => q.id)];
    const [a, b] = await Promise.all([
        codeIds.length
            ? tx.codeQuestion.deleteMany({ where: { id: { in: codeIds } } })
            : Promise.resolve({ count: 0 }),
        mcqIds.length
            ? tx.mCQQuestion.deleteMany({ where: { id: { in: mcqIds } } })
            : Promise.resolve({ count: 0 }),
    ]);
    return a.count + b.count;
}

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
        // Questions only used by this module go with it; questions shared
        // with other modules/courses are just detached (join-row cascade).
        await deleteOrphanedQuestions(tx, [mid]);
        await tx.moduleReferences.deleteMany({ where: { moduleId: mid } });
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
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can update modules." };

    // Strip the id from the written data — it is only the where-key.
    const { id: mid, ...data } = values;
    await db.module.update({
        where: {
            id: mid
        },
        data,
    })
    revalidatePath(`/admin/courses`)
    return { success: "Module Updated !" }
}

export const addmodulequestions = async (
    moduleId: string,
    questionIds: string[]
) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can manage module questions." };

    const validIds = (questionIds ?? []).filter(
        (id) => typeof id === "string" && id.trim().length > 0
    );
    if (validIds.length === 0) return { error: "No questions selected." };

    await db.module.update({
        where: {
            id: moduleId
        },
        data: {
            codeQuestions: {
                connect: validIds.map(id => ({ id }))
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
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can manage module questions." };

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
        // Questions only used by these modules go with them; shared ones are
        // just detached (join-row cascade on module delete).
        await deleteOrphanedQuestions(tx, existingIds);
        await tx.moduleReferences.deleteMany({ where: { moduleId: { in: existingIds } } });
        // The module rows themselves.
        await tx.module.deleteMany({ where: { id: { in: existingIds } } });
    });

    revalidatePath("/admin/courses");
    revalidatePath("/staff/courses");

    return { success: `${existingIds.length} module(s) deleted.` };
}

/**
 * Add existing MCQs to a module. MCQs are many-to-many — the same MCQ may
 * serve modules of different courses, so any bank MCQ that is not ALREADY
 * part of this module can be added without moving it away from another.
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
        select: { id: true, mcqQuestions: { select: { id: true } } },
    });
    if (!module_) return { error: "Module not found." };

    // Exclude MCQs already attached to THIS module (idempotent re-adds are
    // pointless); attachment to OTHER modules no longer blocks.
    const alreadyHere = new Set(module_.mcqQuestions.map((m) => m.id));
    const addableIds = validIds.filter((id) => !alreadyHere.has(id));
    if (addableIds.length === 0) {
        return { error: "Selected MCQs are already part of this module." };
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
 * Remove a single MCQ from a module — detaches the many-to-many relation
 * only. The MCQ itself stays in the question bank and can be re-added, and
 * remains attached to any other modules it serves.
 */
export const removemodulemcq = async (mcqId: string, mid: string) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can manage module MCQs." };

    const module_ = await db.module.findUnique({
        where: { id: mid },
        select: { mcqQuestions: { select: { id: true } } },
    });
    if (!module_) return { error: "Module not found." };
    if (!module_.mcqQuestions.some((m) => m.id === mcqId)) {
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