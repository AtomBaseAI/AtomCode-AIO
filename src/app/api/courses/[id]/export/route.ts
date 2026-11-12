import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { requireAdminApi } from "@/lib/api-admin-guard";
import { slugifyFilename } from "@/lib/question-transfer";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * GET /api/courses/[id]/export?format=json
 *
 * Downloads the course STRUCTURE as one re-importable JSON file:
 *   - course metadata (title, dates, language, completion order)
 *   - every module (title, date, status, language, max score, concept URL)
 *     in its deterministic sequence (createdAt asc — the order queue-type
 *     courses unlock in), each with its reference material entries
 *
 * Deliberately NOT included (per the course import/export scope):
 * questions, students, staffs, assessments and feedbacks — only the
 * module structure and its data. The file is exactly what
 * POST /api/courses/import consumes, so a course can be exported here
 * and restored on this or another instance.
 */
export async function GET(_req: Request, ctx: RouteContext) {
    const guard = await requireAdminApi("courses");
    if (!guard.ok) return guard.response;

    const { id } = await ctx.params;
    const course = await db.course.findUnique({
        where: { id },
        include: {
            modules: {
                orderBy: { createdAt: "asc" },
                include: { reference: true },
            },
        },
    });
    if (!course) {
        return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const referenceCount = course.modules.reduce(
        (sum, m) => sum + m.reference.length,
        0
    );

    const payload = {
        atomcodeExport: true,
        version: 1,
        exportedAt: new Date().toISOString(),
        kind: "course" as const,
        course: {
            title: course.title,
            startdate: course.startdate.toISOString(),
            enddate: course.enddate.toISOString(),
            language: course.language,
            completionOrder: course.completionOrder,
        },
        counts: {
            modules: course.modules.length,
            references: referenceCount,
        },
        modules: course.modules.map((m) => ({
            title: m.title,
            moduledate: m.moduledate.toISOString(),
            modulestatus: m.modulestatus,
            language: m.language,
            maxscore: m.maxscore,
            concepturl: m.concepturl,
            references: m.reference.map((r) => ({
                title: r.title,
                link: r.link,
                type: r.type,
            })),
        })),
    };

    const date = new Date().toISOString().slice(0, 10);
    const filename = `course-${slugifyFilename(course.title)}-${date}.json`;

    return new Response(JSON.stringify(payload, null, 2), {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Content-Disposition": `attachment; filename="${filename}"`,
            "Cache-Control": "no-store",
        },
    });
}
