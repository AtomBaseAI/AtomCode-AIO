import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { requireAdminApi } from "@/lib/api-admin-guard";
import { slugifyFilename, toTransferRow } from "@/lib/question-transfer";
import { toMcqTransferRow } from "@/lib/mcq-transfer";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * GET /api/question-groups/[id]/export?format=json
 *
 * Downloads the FULL question group as one re-importable JSON file:
 *   - group metadata + content counts
 *   - every topic with its sub topics
 *   - every code question (full fidelity — server code, all sample/hidden
 *     test cases, constraints)
 *   - every MCQ (options, correct answer, code snippet, difficulty)
 *
 * The file is exactly what POST /api/question-groups/import consumes, so a
 * group can be exported here and restored on this or another instance.
 */
export async function GET(_req: Request, ctx: RouteContext) {
    const guard = await requireAdminApi();
    if (!guard.ok) return guard.response;

    const { id } = await ctx.params;
    const group = await db.questionGroup.findUnique({
        where: { id },
        include: {
            topics: {
                orderBy: { name: "asc" },
                include: { subtopics: { orderBy: { name: "asc" } } },
            },
            questions: { orderBy: { title: "asc" } },
            mcqQuestions: { orderBy: { title: "asc" } },
        },
    });
    if (!group) {
        return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const subtopicCount = group.topics.reduce(
        (sum, t) => sum + t.subtopics.length,
        0
    );

    const payload = {
        atomcodeExport: true,
        version: 1,
        exportedAt: new Date().toISOString(),
        kind: "question-group" as const,
        group: {
            title: group.title,
            createdAt: group.createdAt.toISOString(),
        },
        counts: {
            topics: group.topics.length,
            subtopics: subtopicCount,
            codeQuestions: group.questions.length,
            mcqQuestions: group.mcqQuestions.length,
        },
        topics: group.topics.map((t) => ({
            name: t.name,
            subtopics: t.subtopics.map((s) => ({ name: s.name })),
        })),
        questions: group.questions.map((q) =>
            toTransferRow(q as unknown as Record<string, unknown>)
        ),
        mcqQuestions: group.mcqQuestions.map((m) =>
            toMcqTransferRow(m as unknown as Record<string, unknown>)
        ),
    };

    const date = new Date().toISOString().slice(0, 10);
    const filename = `question-group-${slugifyFilename(group.title)}-${date}.json`;

    return new Response(JSON.stringify(payload, null, 2), {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Content-Disposition": `attachment; filename="${filename}"`,
            "Cache-Control": "no-store",
        },
    });
}
