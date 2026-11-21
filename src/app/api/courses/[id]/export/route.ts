import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { requireSuperAdminApi } from "@/lib/api-admin-guard";
import { slugifyFilename } from "@/lib/question-transfer";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * GET /api/courses/[id]/export?format=json
 *
 * Downloads the course as one re-importable JSON file (envelope version 2):
 *   - course metadata (title, dates, language, completion order, course
 *     type, any-language flag)
 *   - every module (title, date, status, language, max score, concept URL)
 *     in its deterministic sequence (createdAt asc — the order queue-type
 *     courses unlock in), each with:
 *       - its reference material entries
 *       - QUESTION REFERENCES for both types: every code question and MCQ
 *         currently attached to the module, described by PORTABLE KEYS
 *         (question-group title + question title + language) instead of
 *         raw ids, so the import can re-resolve them against the question
 *         groups that exist in the target system. `sourceId` /
 *         `sourceGroupId` are informational provenance only.
 *
 * Still deliberately NOT included: students, staffs, assessments,
 * feedbacks — and the question BODIES themselves. Questions live in
 * question groups; the import attaches the matching group questions to
 * the imported modules (see POST /api/courses/import).
 */
export async function GET(_req: Request, ctx: RouteContext) {
    const guard = await requireSuperAdminApi("courses");
    if (!guard.ok) return guard.response;

    const { id } = await ctx.params;
    const course = await db.course.findUnique({
        where: { id },
        include: {
            modules: {
                orderBy: { createdAt: "asc" },
                include: {
                    reference: true,
                    codeQuestions: {
                        select: {
                            id: true,
                            title: true,
                            lang: true,
                            difficulty: true,
                            maxscore: true,
                            questionType: true,
                            tags: true,
                            questionGroupId: true,
                            questionGroup: { select: { title: true } },
                        },
                    },
                    mcqQuestions: {
                        select: {
                            id: true,
                            title: true,
                            difficulty: true,
                            tags: true,
                            questionGroupId: true,
                            questionGroup: { select: { title: true } },
                        },
                    },
                },
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
    const codeQuestionCount = course.modules.reduce(
        (sum, m) => sum + m.codeQuestions.length,
        0
    );
    const mcqQuestionCount = course.modules.reduce(
        (sum, m) => sum + m.mcqQuestions.length,
        0
    );

    const payload = {
        atomcodeExport: true,
        version: 2,
        exportedAt: new Date().toISOString(),
        kind: "course" as const,
        course: {
            title: course.title,
            startdate: course.startdate.toISOString(),
            enddate: course.enddate.toISOString(),
            language: course.language,
            courseType: course.courseType,
            anyLanguage: course.anyLanguage,
            completionOrder: course.completionOrder,
        },
        counts: {
            modules: course.modules.length,
            references: referenceCount,
            codeQuestions: codeQuestionCount,
            mcqQuestions: mcqQuestionCount,
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
            questions: {
                code: m.codeQuestions.map((q) => ({
                    groupTitle: q.questionGroup?.title ?? "",
                    title: q.title,
                    lang: q.lang,
                    difficulty: q.difficulty,
                    maxscore: q.maxscore,
                    questionType: q.questionType,
                    tags: q.tags,
                    sourceId: q.id,
                    sourceGroupId: q.questionGroupId,
                })),
                mcq: m.mcqQuestions.map((q) => ({
                    groupTitle: q.questionGroup?.title ?? "",
                    title: q.title,
                    difficulty: q.difficulty,
                    tags: q.tags,
                    sourceId: q.id,
                    sourceGroupId: q.questionGroupId,
                })),
            },
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
