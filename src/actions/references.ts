"use server"
import { db } from "@/lib/db"
import * as z from 'zod'
import { revalidatePath } from "next/cache"
import { AddModuleReferenceSchema, UpdateModuleReferenceSchema } from "@/schemas/references-schema"
import { requireAdmin, requireAdminOrCourseStaff } from "@/lib/action-guards"

/**
 * Course a reference belongs to (reference → module → course). References
 * with a null moduleId are unattached and therefore admin-only surfaces.
 */
async function referenceCourseId(moduleId: string | null | undefined) {
    if (!moduleId) return null;
    const module_ = await db.module.findUnique({
        where: { id: moduleId },
        select: { courseId: true },
    });
    return module_?.courseId ?? null;
}

/** Shared gate: admins always pass; staff only when assigned to the course. */
async function assertCanManageReferenceCourse(
    courseId: string | null
): Promise<boolean> {
    if (!courseId) return Boolean(await requireAdmin());
    return Boolean(await requireAdminOrCourseStaff(courseId));
}

export const addmodulereference = async (values: z.infer<typeof AddModuleReferenceSchema>) => {
    const courseId = await referenceCourseId(values.moduleId);
    const allowed = await assertCanManageReferenceCourse(courseId);
    if (!allowed) {
        return { error: "You are not allowed to manage references for this course." };
    }

    await db.moduleReferences.create({
        data: {
            ...values,
        }
    })

    revalidatePath(`/admin/courses`)
    revalidatePath(`/staff/courses`)
    return { success: "Reference Added !" }
}

export const updatemodulereference = async (
    values: z.infer<typeof UpdateModuleReferenceSchema>
) => {
    const reference = await db.moduleReferences.findUnique({
        where: { id: values.id },
        select: { moduleId: true },
    });
    if (!reference) return { error: "Reference not found." };

    const courseId = await referenceCourseId(reference.moduleId);
    const allowed = await assertCanManageReferenceCourse(courseId);
    if (!allowed) {
        return { error: "You are not allowed to manage references for this course." };
    }

    // Strip the id from the written data — it is only the where-key.
    const { id: rid, ...data } = values;
    await db.moduleReferences.update({
        where: {
            id: rid
        },
        data,
    })
    revalidatePath("/admin/courses")
    revalidatePath("/staff/courses")
    return { success: "Reference Updated !" }
}

export const deletemodulereference = async (
    rid: string
) => {
    const reference = await db.moduleReferences.findUnique({
        where: { id: rid },
        select: { moduleId: true },
    });
    if (!reference) return { error: "Reference not found." };

    const courseId = await referenceCourseId(reference.moduleId);
    const allowed = await assertCanManageReferenceCourse(courseId);
    if (!allowed) {
        return { error: "You are not allowed to manage references for this course." };
    }

    await db.moduleReferences.delete({
        where: {
            id: rid
        }
    })
    revalidatePath("/admin/courses")
    revalidatePath("/staff/courses")
    return { success: "Reference Deleted !" }
}

/**
 * Bulk-delete module references. Same policy as the row-level delete:
 * every touched reference is checked through requireAdminOrCourseStaff —
 * admins pass for any course, staff only for courses they are assigned to
 * (the deleteMany is filtered accordingly; the rest are skipped). The
 * superadmin asymmetry of the row-level actions is preserved: the helper
 * deliberately does not pass superadmin.
 */
export const deletereferencesbulk = async (ids: string[]) => {
    const validIds = (ids ?? []).filter(
        (id) => typeof id === "string" && id.trim().length > 0
    );
    if (validIds.length === 0) return { error: "No references selected." };

    // Resolve each reference's course and keep only the ones the caller is
    // allowed to manage (requireAdminOrCourseStaff scopes it).
    const targets = await db.moduleReferences.findMany({
        where: { id: { in: validIds } },
        select: { id: true, Module: { select: { courseId: true } } },
    });
    const checkedCourses = new Map<string, boolean>();
    const deletableIds: string[] = [];
    for (const target of targets) {
        const courseId = target.Module?.courseId ?? null;
        if (!courseId) continue;
        let allowed = checkedCourses.get(courseId);
        if (allowed === undefined) {
            allowed = Boolean(await requireAdminOrCourseStaff(courseId));
            checkedCourses.set(courseId, allowed);
        }
        if (allowed) deletableIds.push(target.id);
    }

    if (deletableIds.length === 0) {
        return { error: "You are not allowed to delete the selected references." };
    }

    const result = await db.moduleReferences.deleteMany({
        where: { id: { in: deletableIds } },
    });
    revalidatePath("/admin/courses");
    revalidatePath("/staff/courses");
    return { success: `${result.count} reference(s) deleted.` };
}
