import { db } from "@/lib/db";

export const DEFAULT_TOPIC_NAME = "general";

/**
 * Ensure a group has the default "general" topic (with its "general"
 * subtopic). Idempotent — safe to call on every group creation / import.
 */
export async function ensureGeneralTopic(groupId: string) {
    const topic = await db.topic.upsert({
        where: {
            groupId_name: { groupId, name: DEFAULT_TOPIC_NAME },
        },
        update: {},
        create: { groupId, name: DEFAULT_TOPIC_NAME },
    });
    await db.subTopic.upsert({
        where: {
            topicId_name: { topicId: topic.id, name: DEFAULT_TOPIC_NAME },
        },
        update: {},
        create: { topicId: topic.id, name: DEFAULT_TOPIC_NAME },
    });
    return topic;
}

/**
 * Create a topic with its default "general" subtopic. Case-insensitive
 * duplicate-safe: returns the existing topic when the name already exists.
 */
export async function createTopicWithGeneral(groupId: string, rawName: string) {
    const name = rawName.trim();
    const existing = await db.topic.findFirst({
        where: { groupId, name: { equals: name, mode: "insensitive" } },
        include: { subtopics: true },
    });
    if (existing) return { topic: existing, created: false };

    const topic = await db.topic.create({
        data: { groupId, name },
    });
    await db.subTopic.create({
        data: { topicId: topic.id, name: DEFAULT_TOPIC_NAME },
    });
    return { topic, created: true };
}

/**
 * One-time backfill: every question group gets the default "general"
 * topic/subtopic, and existing free-text question topics/subtopics are
 * promoted into real Topic/SubTopic rows so they show up in dropdowns.
 */
export async function seedTopicsForAllGroups() {
    const groups = await db.questionGroup.findMany({ select: { id: true } });
    let createdTopics = 0;
    let createdSubtopics = 0;

    for (const group of groups) {
        const before = await db.topic.count({ where: { groupId: group.id } });
        await ensureGeneralTopic(group.id);
        if (before === 0) createdTopics++;

        // Promote distinct existing question topics into Topic rows.
        const [codeTopics, mcqTopics] = await Promise.all([
            db.codeQuestion.findMany({
                where: { questionGroupId: group.id, topic: { not: null } },
                select: { topic: true, subtopic: true },
            }),
            db.mCQQuestion.findMany({
                where: { questionGroupId: group.id, topic: { not: null } },
                select: { topic: true, subtopic: true },
            }),
        ]);

        const seenTopicNames = new Set<string>();
        for (const q of [...codeTopics, ...mcqTopics]) {
            const topicName = (q.topic ?? "").trim();
            if (!topicName || seenTopicNames.has(topicName.toLowerCase())) {
                continue;
            }
            seenTopicNames.add(topicName.toLowerCase());

            const { topic, created } = await createTopicWithGeneral(
                group.id,
                topicName
            );
            if (created) createdTopics++;

            const subName = (q.subtopic ?? "").trim();
            if (!subName) continue;
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
                createdSubtopics++;
            }
        }
    }

    return { groups: groups.length, createdTopics, createdSubtopics };
}
