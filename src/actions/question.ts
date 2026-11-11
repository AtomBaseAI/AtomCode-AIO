"use server"

import { db } from "@/lib/db"
import * as z from 'zod'
import { revalidatePath } from "next/cache"
import { AddQuestionSchema, DeleteQuestionSchema, QuestionUpdateSchema } from "@/schemas/question-schema"
import { requireAdmin } from "@/lib/action-guards"

/**
 * Questions are managed exclusively inside question groups
 * (/admin/questions-groups/[gid]/code-questions) — the standalone
 * /admin/questions bank page has been removed. All actions therefore
 * revalidate the question-groups section, which covers every group's
 * code-questions / mcq-questions pages via the layout scope.
 */
function revalidateQuestionGroups() {
    revalidatePath("/admin/questions-groups", "layout")
}

export const addquestion = async (
    values: z.infer<typeof AddQuestionSchema>
) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can create questions." };

    await db.codeQuestion.create({
        data: {
            ...values,
        }
    })

    revalidateQuestionGroups()
    return { success: "Question Added !" }
}

export const deletequestion = async (
    values: z.infer<typeof DeleteQuestionSchema>
) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can delete questions." };

    const qid = values.id;
    await db.codeQuestion.delete({
        where: {
            id: qid
        }
    })
    revalidateQuestionGroups()
    return { success: "Question Deleted !" }
}

export const updatequestion = async (
    values: z.infer<typeof QuestionUpdateSchema>
) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can update questions." };

    const qid = values.id;
    await db.codeQuestion.update({
        where: {
            id: qid
        },
        data: {
            ...values,
        }
    })
    revalidateQuestionGroups()
    return { success: "Question Updated !" }
}

export const deletequestionsbulk = async (ids: string[]) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can delete questions." };

    const validIds = (ids ?? []).filter(
        (id) => typeof id === "string" && id.trim().length > 0
    );
    if (validIds.length === 0) return { error: "No questions selected." };

    const result = await db.codeQuestion.deleteMany({
        where: { id: { in: validIds } },
    });
    revalidateQuestionGroups();
    return { success: `${result.count} question(s) deleted.` };
}
