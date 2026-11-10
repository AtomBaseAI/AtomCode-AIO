import { NextResponse } from "next/server";
import * as z from "zod";

import { db } from "@/lib/db";
import { requireAdminApi } from "@/lib/api-admin-guard";
import { GroupMcqUpdateSchema } from "@/schemas/group-mcq-schema";

type RouteContext = { params: Promise<{ id: string }> };

const AddMcqsSchema = z.object({
    mcqIds: z.array(z.string().min(1)).min(1, {
        message: "Select at least one MCQ",
    }),
});

async function getGroupOr404(id: string) {
    return db.questionGroup.findUnique({ where: { id } });
}

/**
 * POST /api/question-groups/[id]/mcq-questions — move existing MCQs into
 * this group.
 * Body: { mcqIds: string[] }
 * An MCQ can live in only one group, so MCQs already in another group are
 * moved (their previous membership is replaced).
 */
export async function POST(req: Request, ctx: RouteContext) {
    const guard = await requireAdminApi();
    if (!guard.ok) return guard.response;

    const { id } = await ctx.params;
    const group = await getGroupOr404(id);
    if (!group) {
        return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const body = await req.json().catch(() => null);
    const parsed = AddMcqsSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error.issues[0]?.message ?? "Invalid input" },
            { status: 400 }
        );
    }

    // Verify every id is a real MCQ before connecting.
    const uniqueIds = Array.from(new Set(parsed.data.mcqIds));
    const found = await db.mCQQuestion.findMany({
        where: { id: { in: uniqueIds } },
        select: { id: true },
    });
    if (found.length !== uniqueIds.length) {
        return NextResponse.json(
            { error: "One or more selected questions no longer exist." },
            { status: 400 }
        );
    }

    await db.questionGroup.update({
        where: { id },
        data: {
            mcqQuestions: {
                connect: uniqueIds.map((qid) => ({ id: qid })),
            },
        },
    });

    return NextResponse.json({
        success: `${uniqueIds.length} MCQ(s) added to "${group.title}"`,
    });
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
 * DELETE /api/question-groups/[id]/mcq-questions?mcqId=… — remove one MCQ
 * from this group (the MCQ itself is kept, ungrouped).
 * Bulk mode: { mcqIds: string[] } JSON body.
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
        // Verify which of the ids actually belong to this group.
        const connected = await db.mCQQuestion.findMany({
            where: { id: { in: bulkIds }, questionGroupId: id },
            select: { id: true },
        });
        if (connected.length === 0) {
            return NextResponse.json(
                { error: "None of the selected questions belong to this group." },
                { status: 404 }
            );
        }

        await db.questionGroup.update({
            where: { id },
            data: {
                mcqQuestions: {
                    disconnect: connected.map((q) => ({ id: q.id })),
                },
            },
        });

        const detached = bulkIds.length - connected.length;
        return NextResponse.json({
            success: `${connected.length} MCQ(s) removed from the group`,
            count: connected.length,
            ...(detached > 0 ? { skipped: detached } : {}),
        });
    }

    const mcq = await db.mCQQuestion.findFirst({
        where: { id: mcqId!, questionGroupId: id },
        select: { id: true },
    });
    if (!mcq) {
        return NextResponse.json(
            { error: "This MCQ does not belong to the group." },
            { status: 404 }
        );
    }

    await db.questionGroup.update({
        where: { id },
        data: {
            mcqQuestions: { disconnect: { id: mcqId! } },
        },
    });

    return NextResponse.json({ success: "MCQ removed from the group" });
}
