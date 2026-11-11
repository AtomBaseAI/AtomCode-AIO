import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { requireAdminApi } from "@/lib/api-admin-guard";
import { TopicImportItemSchema, type TopicImportItem } from "@/schemas/topic-schema";
import { createTopicWithGeneral, ensureGeneralTopic } from "@/lib/topics";

type RouteContext = { params: Promise<{ id: string }> };

/** Per-batch sanity cap so one import cannot flood the group. */
const MAX_TOPICS_PER_IMPORT = 200;

interface ImportIssue {
    index: number;
    name: string;
    error: string;
}

/**
 * POST /api/question-groups/[id]/topics/import
 *
 * Body: the JSON produced by the topics export (envelope with `topics`) or a
 * bare array of { name, subtopics: [{ name }] }. Topics are merged by name —
 * existing topics are kept and only their missing subtopics are added, so
 * re-importing an export is always safe.
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
    const raw = Array.isArray(body)
        ? body
        : Array.isArray((body as { topics?: unknown } | null)?.topics)
          ? (body as { topics: unknown[] }).topics
          : null;

    if (!raw || raw.length === 0) {
        return NextResponse.json(
            { error: "No topics found in the file." },
            { status: 400 }
        );
    }
    if (raw.length > MAX_TOPICS_PER_IMPORT) {
        return NextResponse.json(
            {
                error: `Too many topics in one import (max ${MAX_TOPICS_PER_IMPORT}). Split the file.`,
            },
            { status: 400 }
        );
    }

    // The default topic always exists before merging.
    await ensureGeneralTopic(id);

    const errors: ImportIssue[] = [];
    let createdTopics = 0;
    let createdSubtopics = 0;
    let skippedTopics = 0;

    for (let i = 0; i < raw.length; i++) {
        const parsed = TopicImportItemSchema.safeParse(raw[i]);
        const name =
            typeof (raw[i] as { name?: unknown })?.name === "string"
                ? ((raw[i] as { name: string }).name.trim() || `#${i + 1}`)
                : `#${i + 1}`;

        if (!parsed.success) {
            errors.push({
                index: i + 1,
                name,
                error: parsed.error.issues[0]?.message ?? "Invalid topic",
            });
            continue;
        }

        try {
            await importTopic(id, parsed.data).then((r) => {
                createdTopics += r.topics;
                createdSubtopics += r.subtopics;
                if (r.topics === 0) skippedTopics++;
            });
        } catch (err) {
            errors.push({
                index: i + 1,
                name,
                error:
                    err instanceof Error
                        ? err.message
                        : "Database error while creating the topic",
            });
        }
    }

    if (createdTopics === 0 && createdSubtopics === 0) {
        return NextResponse.json(
            {
                error:
                    errors.length > 0
                        ? "No topics could be imported from this file."
                        : `Nothing to import — all ${skippedTopics} topic(s) already exist.`,
                created: 0,
                failed: errors.length,
                errors: errors.slice(0, 10),
            },
            errors.length > 0 ? { status: 400 } : { status: 200 }
        );
    }

    return NextResponse.json({
        success: `${createdTopics} topic(s) and ${createdSubtopics} sub topic(s) imported into "${group.title}"${
            skippedTopics ? `, ${skippedTopics} already existed` : ""
        }${errors.length ? `, ${errors.length} skipped` : ""}`,
        created: createdTopics,
        subtopics: createdSubtopics,
        failed: errors.length,
        errors: errors.slice(0, 10),
    });
}

async function importTopic(groupId: string, item: TopicImportItem) {
    const { topic, created } = await createTopicWithGeneral(groupId, item.name);
    let subtopics = 0;

    const seen = new Set<string>();
    for (const sub of item.subtopics ?? []) {
        const subName = sub.name.trim();
        if (!subName || seen.has(subName.toLowerCase())) continue;
        seen.add(subName.toLowerCase());

        const exists = await db.subTopic.findFirst({
            where: {
                topicId: topic.id,
                name: { equals: subName, mode: "insensitive" },
            },
        });
        if (!exists) {
            await db.subTopic.create({
                data: { topicId: topic.id, name: subName },
            });
            subtopics++;
        }
    }

    return { topics: created ? 1 : 0, subtopics };
}
