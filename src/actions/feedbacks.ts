"use server"
import { db } from "@/lib/db"
import * as z from 'zod'
import { revalidatePath } from "next/cache"
import { AddFeedbackSchema, UpdateFeedbackSchema } from "@/schemas/feedback-schema"
import { requireAdminOrCourseStaff } from "@/lib/action-guards"

export const addfeedback = async (values: z.infer<typeof AddFeedbackSchema>) => {
    // Feedback lives on a course — admins always pass, staff only when
    // assigned to that course (requireAdminOrCourseStaff scopes it).
    const session = await requireAdminOrCourseStaff(values.courseId);
    if (!session) {
        return { error: "You are not allowed to manage feedback for this course." };
    }

    const cid = values.courseId;
    await db.feedbacks.create({
        data: {
            ...values,
        }
    })

    revalidatePath(`/admin/courses`)
    revalidatePath(`/staff/courses`)
    return { success: "Feedback Added !" }
}

export const updatefeedback = async (
    values: z.infer<typeof UpdateFeedbackSchema>
) => {
    const feedback = await db.feedbacks.findUnique({
        where: { id: values.id },
        select: { courseId: true },
    });
    if (!feedback) return { error: "Feedback not found." };

    const session = await requireAdminOrCourseStaff(feedback.courseId);
    if (!session) {
        return { error: "You are not allowed to manage feedback for this course." };
    }

    // Strip the id from the written data — it is only the where-key.
    const { id: fid, ...data } = values;
    await db.feedbacks.update({
        where: {
            id: fid
        },
        data,
    })
    revalidatePath("/admin/courses")
    revalidatePath("/staff/courses")
    return { success: "Feedback Updated !" }
}

export const deletefeedback = async (
    fid: string
) => {
    const feedback = await db.feedbacks.findUnique({
        where: { id: fid },
        select: { courseId: true },
    });
    if (!feedback) return { error: "Feedback not found." };

    const session = await requireAdminOrCourseStaff(feedback.courseId);
    if (!session) {
        return { error: "You are not allowed to manage feedback for this course." };
    }

    await db.feedbacks.delete({
        where: {
            id: fid
        }
    })
    revalidatePath("/admin/courses")
    revalidatePath("/staff/courses")
    return { success: "Feedback Deleted !" }
}

/**
 * Bulk-delete feedbacks. Same policy as the row-level delete: every touched
 * feedback is checked through requireAdminOrCourseStaff — admins pass for
 * any course, staff only for courses they are assigned to (the deleteMany
 * is filtered accordingly; the rest are skipped). The superadmin asymmetry
 * of the row-level actions is preserved: the helper deliberately does not
 * pass superadmin.
 */
export const deletefeedbacksbulk = async (ids: string[]) => {
    const validIds = (ids ?? []).filter(
        (id) => typeof id === "string" && id.trim().length > 0
    );
    if (validIds.length === 0) return { error: "No feedbacks selected." };

    // Resolve each feedback's course and keep only the ones the caller is
    // allowed to manage (requireAdminOrCourseStaff scopes it).
    const targets = await db.feedbacks.findMany({
        where: { id: { in: validIds } },
        select: { id: true, courseId: true },
    });
    const checkedCourses = new Map<string, boolean>();
    const deletableIds: string[] = [];
    for (const target of targets) {
        let allowed = checkedCourses.get(target.courseId);
        if (allowed === undefined) {
            allowed = Boolean(await requireAdminOrCourseStaff(target.courseId));
            checkedCourses.set(target.courseId, allowed);
        }
        if (allowed) deletableIds.push(target.id);
    }

    if (deletableIds.length === 0) {
        return { error: "You are not allowed to delete the selected feedbacks." };
    }

    const result = await db.feedbacks.deleteMany({
        where: { id: { in: deletableIds } },
    });
    revalidatePath("/admin/courses");
    revalidatePath("/staff/courses");
    return { success: `${result.count} feedback(s) deleted.` };
}
