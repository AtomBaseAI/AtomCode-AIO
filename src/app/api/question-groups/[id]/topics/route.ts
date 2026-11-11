import { NextResponse } from "next/server";
import * as z from "zod";

import { db } from "@/lib/db";
import { requireAdminApi } from "@/lib/api-admin-guard";
import { TopicRenameSchema } from "@/schemas/topic-schema";
import { DEFAULT_TOPIC_NAME } from "@/lib/topics";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * Topics carry the default row first, everything else alphabetical.
 */
export function sortedTopics<
    T extends { name: string; subtopics?: { name: string }[] },
>(topics: T[]) {
    return [...topics].sort((a, b) => {
        if (a.name.toLowerCase() === DEFAULT_TOPIC_NAME) return -1;
        if (b.name.toLowerCase() === DEFAULT_TOPIC_NAME) return 1;
        return a.name.localeCompare(b.name);
    });
}

/**
 * GET /api/question-groups/[id]/topics — list the group's topics with their
 * subtopics (default "general" topic first).
 */
export async function GET(_req: Request, ctx: RouteContext) {
    const guard = await requireAdminApi();
    if (!guard.ok) return guard.response;

    const { id } = await ctx.params;
    const group = await db.questionGroup.findUnique({ where: { id } });
    if (!group) {
        return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const topics = await db.topic.findMany({
        where: { groupId: id },
        include: { subtopics: true },
    });

    const payload = sortedTopics(topics).map((t) => ({
        id: t.id,
        name: t.name,
        isDefault: t.name.toLowerCase() === DEFAULT_TOPIC_NAME,
        subtopics: sortedTopics(t.subtopics).map((s) => ({
            id: s.id,
            name: s.name,
            isDefault: s.name.toLowerCase() === DEFAULT_TOPIC_NAME,
        })),
    }));

    return NextResponse.json({ topics: payload });
}

/**
 * PUT /api/question-groups/[id]/topics — rename a topic.
 * Body: { topicId, name }. Questions inside this group tagged with the old
 * topic name are retagged to the new name. The default "general" topic
 * cannot be renamed.
 */
export async function PUT(req: Request, ctx: RouteContext) {
    const guard = await requireAdminApi();
    if (!guard.ok) return guard.response;

    const { id } = await ctx.params;
    const group = await db.questionGroup.findUnique({ where: { id } });
    if (!group) {
        return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const body = await req.json().catch(() => null);
    const parsed = TopicRenameSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error.issues[0]?.message ?? "Invalid input" },
            { status: 400 }
        );
    }

    const topic = await db.topic.findFirst({
        where: { id: parsed.data.topicId, groupId: id },
    });
    if (!topic) {
        return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }
    if (topic.name.toLowerCase() === DEFAULT_TOPIC_NAME) {
        return NextResponse.json(
            {
                error: `The default "${DEFAULT_TOPIC_NAME}" topic cannot be renamed.`,
            },
            { status: 400 }
        );
    }

    const newName = parsed.data.name;
    const duplicate = await db.topic.findFirst({
        where: {
            groupId: id,
            id: { not: topic.id },
            name: { equals: newName, mode: "insensitive" },
        },
    });
    if (duplicate) {
        return NextResponse.json(
            { error: `A topic named "${duplicate.name}" already exists.` },
            { status: 409 }
        );
    }

    await db.$transaction([
        db.topic.update({ where: { id: topic.id }, data: { name: newName } }),
        // Retag every question in this group that used the old topic name.
        db.codeQuestion.updateMany({
            where: {
                questionGroupId: id,
                topic: { equals: topic.name, mode: "insensitive" },
            },
            data: { topic: newName },
        }),
        db.mCQQuestion.updateMany({
            where: {
                questionGroupId: id,
                topic: { equals: topic.name, mode: "insensitive" },
            },
            data: { topic: newName },
        }),
    ]);

    return NextResponse.json({
        success: `Topic renamed to "${newName}"`,
        retagged: true,
    });
}

const TopicDeleteSchema = z.object({
    topicId: z.string().min(1, { message: "Topic is required" }),
});

/**
 * DELETE /api/question-groups/[id]/topics — permanently delete a topic and
 * its subtopics. Questions inside this group tagged with it fall back to the
 * default "general" topic/subtopic. The default "general" topic cannot be
 * deleted.
 * Body / query: topicId.
 */
export async function DELETE(req: Request, ctx: RouteContext) {
    const guard = await requireAdminApi();
    if (!guard.ok) return guard.response;

    const { id } = await ctx.params;
    const group = await db.questionGroup.findUnique({ where: { id } });
    if (!group) {
        return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const bodyTopicId = (
        (await req.json().catch(() => null)) as { topicId?: unknown } | null
    )?.topicId;
    const topicIdRaw =
        typeof bodyTopicId === "string" && bodyTopicId.trim()
            ? bodyTopicId
            : new URL(req.url).searchParams.get("topicId");
    const parsed = TopicDeleteSchema.safeParse({ topicId: topicIdRaw });
    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error.issues[0]?.message ?? "Invalid input" },
            { status: 400 }
        );
    }

    const topic = await db.topic.findFirst({
        where: { id: parsed.data.topicId, groupId: id },
        include: { subtopics: true },
    });
    if (!topic) {
        return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }
    if (topic.name.toLowerCase() === DEFAULT_TOPIC_NAME) {
        return NextResponse.json(
            {
                error: `The default "${DEFAULT_TOPIC_NAME}" topic cannot be deleted.`,
            },
            { status: 400 }
        );
    }

    // Questions tagged with this topic (any of its subtopics) fall back to
    // the defaults.
    await db.codeQuestion.updateMany({
        where: {
            questionGroupId: id,
            topic: { equals: topic.name, mode: "insensitive" },
        },
        data: { topic: DEFAULT_TOPIC_NAME, subtopic: DEFAULT_TOPIC_NAME },
    });
    await db.mCQQuestion.updateMany({
        where: {
            questionGroupId: id,
            topic: { equals: topic.name, mode: "insensitive" },
        },
        data: { topic: DEFAULT_TOPIC_NAME, subtopic: DEFAULT_TOPIC_NAME },
    });

    await db.topic.delete({ where: { id: topic.id } });

    return NextResponse.json({
        success: `Topic "${topic.name}" deleted. Its questions now use "${DEFAULT_TOPIC_NAME}".`,
    });
}
