import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { requireAdminApi } from "@/lib/api-admin-guard";

type RouteContext = { params: Promise<{ id: string }> };

/** CSV cell escaping: quotes doubled, wrapped when needed. */
function csvCell(value: string) {
    if (/[",\n\r]/.test(value)) {
        return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
}

/**
 * GET /api/question-groups/[id]/topics/export?format=json|csv
 *
 * Downloads every topic in the group with its subtopics.
 *   - json : versioned, re-importable envelope
 *   - csv  : flat spreadsheet, one row per (topic, subtopic) pair
 */
export async function GET(req: Request, ctx: RouteContext) {
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
        },
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

    const filename = `topics-${group.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 40)}-${new Date().toISOString().slice(0, 10)}.${format}`;

    if (format === "csv") {
        const lines: string[] = ["Topic,Sub Topic"];
        for (const topic of group.topics) {
            if (topic.subtopics.length === 0) {
                lines.push(csvCell(topic.name), "");
                continue;
            }
            for (const sub of topic.subtopics) {
                lines.push(`${csvCell(topic.name)},${csvCell(sub.name)}`);
            }
        }
        // BOM prefix so Excel opens the UTF-8 file correctly.
        const body = "\uFEFF" + lines.join("\n");
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
        kind: "topics",
        group: { id: group.id, title: group.title },
        count: group.topics.length,
        topics: group.topics.map((t) => ({
            name: t.name,
            subtopics: t.subtopics.map((s) => ({ name: s.name })),
        })),
    };

    return new Response(JSON.stringify(payload, null, 2), {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Content-Disposition": `attachment; filename="${filename}"`,
            "Cache-Control": "no-store",
        },
    });
}
