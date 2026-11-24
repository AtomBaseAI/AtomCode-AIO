"use server"
import { db } from "@/lib/db"
import * as z from 'zod'
import { revalidatePath } from "next/cache"
import { requireAdmin, requireAdminOrCourseStaff } from "@/lib/action-guards"
export const addcoursestaffs = async (
    courseId: string,
    studentIds: string[]
) => {
    const session = await requireAdmin();
    if (!session) {
        return { error: "Only admins can manage course staff assignments." };
    }

    const validIds = (studentIds ?? []).filter(
        (id) => typeof id === "string" && id.trim().length > 0
    );
    if (validIds.length === 0) return { error: "No staff members selected." };

    try {
        await db.staffCourse.createMany({
            data: validIds.map(staffId => ({
                staffId,
                courseId,
                active: true
            }))
        });
        revalidatePath(`/admin/courses/`);
        return { success: "Staffs added to Course successfully!" };
    } catch (error) {
        console.error("Error adding Staffs to course:", error);
        throw error;
    }
}

/**
 * Removes one staff member from a course (admin only). StaffCourse has no
 * child rows, so the find + delete just run in one transaction for
 * consistency with the other delete actions. Callers only check
 * `.success`, so failures are returned as `{ error }` instead of thrown.
 */
export const deletecoursestaff = async (
    uid: string,
    cid: string
) => {
    const session = await requireAdmin();
    if (!session) {
        return { error: "Only admins can manage course staff assignments." };
    }

    try {
        await db.$transaction(async (tx) => {
            const existingRecord = await tx.staffCourse.findFirst({
                where: {
                    courseId: cid,
                    staffId: uid
                }
            });

            if (!existingRecord) {
                throw new Error("Record to delete does not exist.");
            }

            await tx.staffCourse.delete({
                where: {
                    id: existingRecord.id
                }
            });
        });

        revalidatePath(`/admin/courses`);
        return { success: "Staff deleted from course successfully!" };
    } catch (error) {
        console.error("Error deleting Staff from course:", error);
        return { error: error instanceof Error ? error.message : "Failed to delete staff from course." };
    }
}

export const getstaffsbycourseid = async (courseId: string) => {
    // Admins always pass; staff only when assigned to the course.
    // Unauthorized callers get the same `null` shape as "no data".
    const session = await requireAdminOrCourseStaff(courseId);
    if (!session) {
        return null;
    }

    try {
        // Password hashes NEVER leave the server — explicit safe-field
        // whitelist (the old include leaked bcrypt hashes to the UI).
        const courseStaffs = await db.staffCourse.findMany({
            where: { courseId },
            include: {
                staff: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        image: true,
                        department: true,
                        staffnumber: true,
                    },
                },
            },
        });

        if (!courseStaffs) {
            return null;
        }

        return courseStaffs.map(courseStaff => courseStaff.staff);
    } catch (error) {
        console.error("Error fetching staffs by course ID:", error);
        return null;
    }
};

/**
 * Bulk-remove staff members from a course (admin only).
 */
export const deletecoursestaffsbulk = async (
    sids: string[],
    cid: string
) => {
    const session = await requireAdmin();
    if (!session) {
        return { error: "Only admins can manage course staff assignments." };
    }

    const validIds = (sids ?? []).filter(
        (id) => typeof id === "string" && id.trim().length > 0
    );
    if (validIds.length === 0) return { error: "No staff members selected." };

    const result = await db.staffCourse.deleteMany({
        where: { courseId: cid, staffId: { in: validIds } },
    });

    revalidatePath("/admin/courses");
    revalidatePath("/staff/courses");
    return { success: `${result.count} staff member(s) removed from the course.` };
}
