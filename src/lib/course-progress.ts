import { db } from "@/lib/db";

/**
 * Recalculates and persists UserCourse.completionPercentage for one
 * enrollment — the share of the course's modules the student has fully
 * submitted (UserModuleData.modulestatus === "submitted"), rounded to a
 * whole percent.
 *
 * The student-facing screens compute this live, but the admin & staff
 * dashboards aggregate the STORED UserCourse.completionPercentage column.
 * Without persisting it after each module submission the dashboards would
 * forever show 0% for everyone. Called from every path that marks a module
 * submitted (web endModule action + desktop practice API).
 *
 * Uses updateMany because UserCourse has no unique constraint on
 * (userId, courseId) — this stays safe even if duplicate enrollment rows
 * ever exist, and simply matches nothing when the student has no row.
 */
export async function recalcCourseCompletion(userId: string, courseId: string) {
    try {
        const [totalModules, submittedModules] = await Promise.all([
            db.module.count({ where: { courseId } }),
            db.userModuleData.count({
                where: { courseId, userId, modulestatus: "submitted" },
            }),
        ]);

        const percentage =
            totalModules === 0
                ? 0
                : Math.round((submittedModules / totalModules) * 100);

        await db.userCourse.updateMany({
            where: { userId, courseId },
            data: { completionPercentage: percentage },
        });

        return percentage;
    } catch (error) {
        // Progress persistence is best-effort — never break the submit flow.
        console.error("[recalcCourseCompletion]", error);
        return null;
    }
}
