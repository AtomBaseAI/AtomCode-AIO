import { db } from "@/lib/db";
import { json, fail, preflight, authGuard } from "@/lib/desktop-auth";
import { getAssessmentsByUserId } from "@/data/student/assessments";

/**
 * GET /api/desktop/student/assessments — assessments across the student's
 * active courses with dynamic status (start / resume / retake / upcoming / expired).
 */
export async function GET(req: Request) {
  const { ctx, response } = await authGuard(req);
  if (!ctx) return response;

  try {
    const assessments = await getAssessmentsByUserId(ctx.user.id);
    // Additive course-type flags for the desktop renderer: assessments of
    // "mcq-only" courses hide the coding section in the attempt view.
    const courseIds = [...new Set(assessments.map((a) => a.courseid))];
    const metas = await db.course.findMany({
      where: { id: { in: courseIds } },
      select: { id: true, courseType: true, anyLanguage: true },
    });
    const metaById = Object.fromEntries(metas.map((m) => [m.id, m]));
    return json({
      assessments: assessments.map((a) => ({
        ...a,
        courseType: metaById[a.courseid]?.courseType ?? "code-mcq",
        anyLanguage: metaById[a.courseid]?.anyLanguage ?? false,
      })),
    });
  } catch (e) {
    console.error("[desktop/assessments]", e);
    return fail(500, "Failed to load assessments");
  }
}

export async function OPTIONS() {
  return preflight();
}
