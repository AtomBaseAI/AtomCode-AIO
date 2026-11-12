import { NextResponse } from "next/server";
import * as z from "zod";

import { db } from "@/lib/db";
import { requireAdminApi } from "@/lib/api-admin-guard";
import { GroupMcqUpdateSchema } from "@/schemas/group-mcq-schema";

type RouteContext = { params: Promise<{ id: string }> };

async function getGroupOr404(id: string) {
    return db.questionGroup.findUnique({ where: { id } });
}

/**
 * PUT /api/question-groups/[id]/mcq-questions — update one MCQ that belongs
 * to this group.
 * Body: GroupMcqUpdateSchema (full MCQ payload + id).
 */
export async function PUT(req: Request, ctx: RouteContext) {
    const guard = await requireAdminApi();
    if (!guard.ok) return guard.response;

    const { id } = await ctx.params;
    const group = await getGroupOr404(id);
    if (!group) {
        return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const body = await req.json().catch(() => null);
    const parsed = GroupMcqUpdateSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error.issues[0]?.message ?? "Invalid input" },
            { status: 400 }
        );
    }

    // The MCQ must be a member of this group.
    const { id: mcqId, ...mcqData } = parsed.data;
    const existing = await db.mCQQuestion.findFirst({
        where: { id: mcqId, questionGroupId: id },
        select: { id: true },
    });
    if (!existing) {
        return NextResponse.json(
            { error: "This MCQ does not belong to the group." },
            { status: 404 }
        );
    }

    // zod strips unknown keys, so only MCQ content fields reach the update;
    // omitted optional fields stay untouched, explicit nulls clear them.
    await db.mCQQuestion.update({
        where: { id: mcqId },
        data: mcqData,
    });

    return NextResponse.json({ success: "MCQ updated" });
}

/**
 * DELETE /api/question-groups/[id]/mcq-questions?mcqId=… — permanently delete
 * one MCQ shown under this group (MCQs are managed exclusively inside
 * question groups; there is no global bank to detach back to).
 * Bulk mode: { mcqIds: string[] } JSON body.
 *
 * Deleted by id (NOT scoped to the group): the smart-delete cleanup lets the
 * admin detach the MCQ from the group before the final delete, and the final
 * delete must still succeed for anything left behind.
 */
export async function DELETE(req: Request, ctx: RouteContext) {
    const guard = await requireAdminApi();
    if (!guard.ok) return guard.response;

    const { id } = await ctx.params;
    const group = await getGroupOr404(id);
    if (!group) {
        return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    // Bulk mode: { mcqIds: string[] } JSON body.
    const body = await req.json().catch(() => null);
    const rawIds = (body as { mcqIds?: unknown } | null)?.mcqIds;
    const bulkIds = Array.isArray(rawIds)
        ? Array.from(
              new Set(
                  rawIds.filter(
                      (v): v is string =>
                          typeof v === "string" && v.trim().length > 0
                  )
              )
          )
        : [];

    // Single mode (backwards compatible): ?mcqId=…
    const mcqId =
        bulkIds.length === 0
            ? new URL(req.url).searchParams.get("mcqId")
            : null;
    if (bulkIds.length === 0 && !mcqId) {
        return NextResponse.json(
            { error: "'mcqId' query parameter or 'mcqIds' body is required" },
            { status: 400 }
        );
    }

    if (bulkIds.length > 0) {
        // By id only — see docblock. One atomic statement.
        const result = await db.mCQQuestion.deleteMany({
            where: { id: { in: bulkIds } },
        });
        if (result.count === 0) {
            return NextResponse.json(
                { error: "None of the selected questions exist." },
                { status: 404 }
            );
        }

        const skipped = bulkIds.length - result.count;
        return NextResponse.json({
            success: `${result.count} MCQ(s) permanently deleted`,
            count: result.count,
            ...(skipped > 0 ? { skipped } : {}),
        });
    }

    const result = await db.mCQQuestion.deleteMany({
        where: { id: mcqId! },
    });
    if (result.count === 0) {
        return NextResponse.json(
            { error: "MCQ not found." },
            { status: 404 }
        );
    }

    return NextResponse.json({ success: "MCQ permanently deleted" });
}
