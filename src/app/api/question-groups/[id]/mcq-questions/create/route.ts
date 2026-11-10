import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { requireAdminApi } from "@/lib/api-admin-guard";
import { GroupMcqSchema } from "@/schemas/group-mcq-schema";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * Tolerate form payloads that send CorrectOption as a numeric string
 * (the Create MCQ form always produces a number, but be tolerant).
 */
function normalizeCreateItem(item: unknown): unknown {
    if (!item || typeof item !== "object") return item;
    const obj = { ...(item as Record<string, unknown>) };
    if (
        typeof obj.CorrectOption === "string" &&
        obj.CorrectOption.trim() !== "" &&
        !Number.isNaN(Number(obj.CorrectOption))
    ) {
        obj.CorrectOption = Number(obj.CorrectOption);
    }
    return obj;
}

/**
 * POST /api/question-groups/[id]/mcq-questions/create — create a NEW MCQ
 * directly inside this group.
 * Body: GroupMcqSchema.
 */
export async function POST(req: Request, ctx: RouteContext) {
    const guard = await requireAdminApi();
    if (!guard.ok) return guard.response;

    const { id } = await ctx.params;
    const group = await db.questionGroup.findUnique({ where: { id } });
    if (!group) {
        return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const body = await req.json().catch(() => null);
    const parsed = GroupMcqSchema.safeParse(normalizeCreateItem(body));
    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error.issues[0]?.message ?? "Invalid input" },
            { status: 400 }
        );
    }

    // zod strips unknown keys, so only MCQ content fields reach the create.
    const created = await db.mCQQuestion.create({
        data: { ...parsed.data, questionGroupId: id },
    });

    return NextResponse.json({
        success: `"${parsed.data.title}" created in "${group.title}"`,
        id: created.id,
    });
}
