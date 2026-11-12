import { NextResponse } from "next/server";
import * as z from "zod";

import { db } from "@/lib/db";
import { requireAdminApi } from "@/lib/api-admin-guard";
import { SubTopicCreateSchema, SubTopicRenameSchema } from "@/schemas/topic-schema";
import { DEFAULT_TOPIC_NAME } from "@/lib/topics";

type RouteContext = { params: Promise<{ id: string; topicId: string }> };

async function getTopicOr404(groupId: string, topicId: string) {
    return db.topic.findFirst({
        where: { id: topicId, groupId },
        include: { subtopics: true },
    });
}

/**
 * POST /api/question-groups/[id]/topics/[topicId]/subtopics — create a
 * subtopic inside a topic. Body: { name }. Duplicate (case-insensitive)
 * names within the topic are rejected.
 */
export async function POST(req: Request, ctx: RouteContext) {
    const guard = await requireAdminApi();
    if (!guard.ok) return guard.response;

    const { id, topicId } = await ctx.params;
    const topic = await getTopicOr404(id, topicId);
    if (!topic) {
        return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    const body = await req.json().catch(() => null);
    const parsed = SubTopicCreateSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error.issues[0]?.message ?? "Invalid input" },
            { status: 400 }
        );
    }

    const duplicate = topic.subtopics.find(
        (s) => s.name.toLowerCase() === parsed.data.name.toLowerCase()
    );
    if (duplicate) {
        return NextResponse.json(
            {
                error: `"${topic.name}" already has a subtopic named "${duplicate.name}".`,
            },
            { status: 409 }
        );
    }

    const subtopic = await db.subTopic.create({
        data: { topicId: topic.id, name: parsed.data.name },
    });

    return NextResponse.json(
        {
            success: `Sub topic "${subtopic.name}" added to "${topic.name}"`,
            subtopic: { id: subtopic.id, name: subtopic.name },
        },
        { status: 201 }
    );
}

/**
 * PUT /api/question-groups/[id]/topics/[topicId]/subtopics — rename a
 * subtopic. Body: { subTopicId, name }. Questions tagged with the old name
 * (inside this group + topic) are retagged. The default "general" subtopic
 * cannot be renamed.
 */
export async function PUT(req: Request, ctx: RouteContext) {
    const guard = await requireAdminApi();
    if (!guard.ok) return guard.response;

    const { id, topicId } = await ctx.params;
    const topic = await getTopicOr404(id, topicId);
    if (!topic) {
        return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    const body = await req.json().catch(() => null);
    const parsed = SubTopicRenameSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error.issues[0]?.message ?? "Invalid input" },
            { status: 400 }
        );
    }

    const subtopic = topic.subtopics.find((s) => s.id === parsed.data.subTopicId);
    if (!subtopic) {
        return NextResponse.json(
            { error: "Sub topic not found" },
            { status: 404 }
        );
    }
    if (subtopic.name.toLowerCase() === DEFAULT_TOPIC_NAME) {
        return NextResponse.json(
            {
                error: `The default "${DEFAULT_TOPIC_NAME}" sub topic cannot be renamed.`,
            },
            { status: 400 }
        );
    }

    const duplicate = topic.subtopics.find(
        (s) =>
            s.id !== subtopic.id &&
            s.name.toLowerCase() === parsed.data.name.toLowerCase()
    );
    if (duplicate) {
        return NextResponse.json(
            {
                error: `"${topic.name}" already has a subtopic named "${duplicate.name}".`,
            },
            { status: 409 }
        );
    }

    await db.$transaction([
        db.subTopic.update({
            where: { id: subtopic.id },
            data: { name: parsed.data.name },
        }),
        db.codeQuestion.updateMany({
            where: {
                questionGroupId: id,
                topic: { equals: topic.name, mode: "insensitive" },
                subtopic: { equals: subtopic.name, mode: "insensitive" },
            },
            data: { subtopic: parsed.data.name },
        }),
        db.mCQQuestion.updateMany({
            where: {
                questionGroupId: id,
                topic: { equals: topic.name, mode: "insensitive" },
                subtopic: { equals: subtopic.name, mode: "insensitive" },
            },
            data: { subtopic: parsed.data.name },
        }),
    ]);

    return NextResponse.json({
        success: `Sub topic renamed to "${parsed.data.name}"`,
        retagged: true,
    });
}

const SubTopicDeleteSchema = z.object({
    subTopicId: z.string().min(1, { message: "Sub topic is required" }),
});

/**
 * DELETE /api/question-groups/[id]/topics/[topicId]/subtopics — permanently
 * delete a subtopic. Questions tagged with it fall back to "general".
 * The default "general" subtopic cannot be deleted.
 * Body / query: subTopicId.
 */
export async function DELETE(req: Request, ctx: RouteContext) {
    const guard = await requireAdminApi();
    if (!guard.ok) return guard.response;

    const { id, topicId } = await ctx.params;
    const topic = await getTopicOr404(id, topicId);
    if (!topic) {
        return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    const bodySubTopicId = (
        (await req.json().catch(() => null)) as { subTopicId?: unknown } | null
    )?.subTopicId;
    const subTopicIdRaw =
        typeof bodySubTopicId === "string" && bodySubTopicId.trim()
            ? bodySubTopicId
            : new URL(req.url).searchParams.get("subTopicId");
    const parsed = SubTopicDeleteSchema.safeParse({ subTopicId: subTopicIdRaw });
    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error.issues[0]?.message ?? "Invalid input" },
            { status: 400 }
        );
    }

    const subtopic = topic.subtopics.find((s) => s.id === parsed.data.subTopicId);
    if (!subtopic) {
        return NextResponse.json(
            { error: "Sub topic not found" },
            { status: 404 }
        );
    }
    if (subtopic.name.toLowerCase() === DEFAULT_TOPIC_NAME) {
        return NextResponse.json(
            {
                error: `The default "${DEFAULT_TOPIC_NAME}" sub topic cannot be deleted.`,
            },
            { status: 400 }
        );
    }

    await db.codeQuestion.updateMany({
        where: {
            questionGroupId: id,
            topic: { equals: topic.name, mode: "insensitive" },
            subtopic: { equals: subtopic.name, mode: "insensitive" },
        },
        data: { subtopic: DEFAULT_TOPIC_NAME },
    });
    await db.mCQQuestion.updateMany({
        where: {
            questionGroupId: id,
            topic: { equals: topic.name, mode: "insensitive" },
            subtopic: { equals: subtopic.name, mode: "insensitive" },
        },
        data: { subtopic: DEFAULT_TOPIC_NAME },
    });

    await db.subTopic.delete({ where: { id: subtopic.id } });

    return NextResponse.json({
        success: `Sub topic "${subtopic.name}" deleted from "${topic.name}".`,
    });
}
