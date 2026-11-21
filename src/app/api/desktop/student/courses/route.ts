import { db } from "@/lib/db";
import { json, fail, preflight, authGuard } from "@/lib/desktop-auth";
import { getAllUserCourses } from "@/data/student/courses";

/**
 * GET /api/desktop/student/courses — enrolled courses with progress.
 */
export async function GET(req: Request) {
  const { ctx, response } = await authGuard(req);
  if (!ctx) return response;

  try {
    const courses = await getAllUserCourses(ctx.user.id);
    // Additive course-type flags for the desktop renderer: "mcq-only"
    // courses hide the code section, anyLanguage courses show a language
    // selector in the code practice view.
    const courseIds = [...new Set(courses.map((c) => c.courseId))];
    const metas = await db.course.findMany({
      where: { id: { in: courseIds } },
      select: { id: true, courseType: true, anyLanguage: true },
    });
    const metaById = Object.fromEntries(metas.map((m) => [m.id, m]));
    return json({
      courses: courses.map((c) => ({
        ...c,
        courseType: metaById[c.courseId]?.courseType ?? "code-mcq",
        anyLanguage: metaById[c.courseId]?.anyLanguage ?? false,
      })),
    });
  } catch (e) {
    console.error("[desktop/courses]", e);
    return fail(500, "Failed to load courses");
  }
}

export async function OPTIONS() {
  return preflight();
}
