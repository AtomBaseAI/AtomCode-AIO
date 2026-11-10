import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { requireAdminApi } from "@/lib/api-admin-guard";
import {
    buildExportFilename,
    buildQuestionsCsv,
    toTransferRow,
} from "@/lib/question-transfer";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * GET /api/question-groups/[id]/questions/export?format=json|csv
 *
 * Downloads every question in the group.
 *   - json : versioned, re-importable envelope (full fidelity — includes
 *            server code and every sample/hidden test case)
 *   - csv  : flat spreadsheet, one row per question (download only)
 */
export async function GET(req: Request, ctx: RouteContext) {
    const guard = await requireAdminApi();
    if (!guard.ok) return guard.response;

    const { id } = await ctx.params;
    const group = await db.questionGroup.findUnique({
        where: { id },
        include: { questions: { orderBy: { title: "asc" } } },
    });
    if (!group) {
        return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const format = (
        new URL(req.url).searchParams.get("format") ?? "json"
    ).toLowerCase();

    if (format !== "json" && format !== "csv") {
        return NextResponse.json(
            { error: "Unsupported format. Use ?format=json or ?format=csv." },
            { status: 400 }
        );
    }

    const rows = group.questions.map((q) =>
        toTransferRow(q as unknown as Record<string, unknown>)
    );
    const filename = buildExportFilename(group.title, format);

    if (format === "csv") {
        // BOM prefix so Excel opens the UTF-8 file correctly.
        const body = "\uFEFF" + buildQuestionsCsv(rows);
        return new Response(body, {
            headers: {
                "Content-Type": "text/csv; charset=utf-8",
                "Content-Disposition": `attachment; filename="${filename}"`,
                "Cache-Control": "no-store",
            },
        });
    }

    const payload = {
        atomcodeExport: true,
        version: 1,
        exportedAt: new Date().toISOString(),
        group: { id: group.id, title: group.title },
        count: rows.length,
        questions: rows,
    };

    return new Response(JSON.stringify(payload, null, 2), {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Content-Disposition": `attachment; filename="${filename}"`,
            "Cache-Control": "no-store",
        },
    });
}
