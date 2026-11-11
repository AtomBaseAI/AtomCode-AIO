import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { requireAdminApi } from "@/lib/api-admin-guard";
import { TopicCreateSchema } from "@/schemas/topic-schema";
import { createTopicWithGeneral } from "@/lib/topics";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * POST /api/question-groups/[id]/topics/create — create a topic.
 * Body: { name }. Every new topic automatically receives the default
 * "general" subtopic. Duplicate (case-insensitive) names are rejected.
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
    const parsed = TopicCreateSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error.issues[0]?.message ?? "Invalid input" },
            { status: 400 }
        );
    }

    try {
        const { topic, created } = await createTopicWithGeneral(
            id,
            parsed.data.name
        );
        if (!created) {
            return NextResponse.json(
                { error: `A topic named "${topic.name}" already exists.` },
                { status: 409 }
            );
        }

        return NextResponse.json(
            {
                success: `Topic "${topic.name}" created`,
                topic: { id: topic.id, name: topic.name },
            },
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json(
            {
                error:
                    err instanceof Error
                        ? err.message
                        : "Database error while creating the topic",
            },
            { status: 500 }
        );
    }
}
