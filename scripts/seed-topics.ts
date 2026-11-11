/**
 * One-time backfill: every question group gets the default "general"
 * topic + subtopic, and existing free-text question topics/subtopics are
 * promoted into real Topic/SubTopic rows so they appear in dropdowns.
 *
 * Run: bun scripts/seed-topics.ts
 */
import { PrismaClient } from "@prisma/client";
import { config as dotenvConfig } from "dotenv";

// A stale system-level DATABASE_URL exists in this sandbox; force the
// project's .env to win.
dotenvConfig({ override: true });

const db = new PrismaClient();

const DEFAULT_TOPIC_NAME = "general";

async function ensureGeneralTopic(groupId: string) {
    const topic = await db.topic.upsert({
        where: { groupId_name: { groupId, name: DEFAULT_TOPIC_NAME } },
        update: {},
        create: { groupId, name: DEFAULT_TOPIC_NAME },
    });
    await db.subTopic.upsert({
        where: { topicId_name: { topicId: topic.id, name: DEFAULT_TOPIC_NAME } },
        update: {},
        create: { topicId: topic.id, name: DEFAULT_TOPIC_NAME },
    });
    return topic;
}

async function main() {
    const groups = await db.questionGroup.findMany({ select: { id: true, title: true } });
    console.log(`Backfilling topics for ${groups.length} group(s)...`);

    for (const group of groups) {
        const before = await db.topic.count({ where: { groupId: group.id } });
        await ensureGeneralTopic(group.id);
        let createdTopics = before === 0 ? 1 : 0;
        let createdSubtopics = 0;

        const [codeQuestions, mcqQuestions] = await Promise.all([
            db.codeQuestion.findMany({
                where: { questionGroupId: group.id },
                select: { topic: true, subtopic: true },
            }),
            db.mCQQuestion.findMany({
                where: { questionGroupId: group.id },
                select: { topic: true, subtopic: true },
            }),
        ]);

        const seenTopics = new Set<string>();
        for (const q of [...codeQuestions, ...mcqQuestions]) {
            const topicName = (q.topic ?? "").trim();
            if (!topicName || seenTopics.has(topicName.toLowerCase())) continue;
            seenTopics.add(topicName.toLowerCase());

            let topic = await db.topic.findFirst({
                where: {
                    groupId: group.id,
                    name: { equals: topicName, mode: "insensitive" },
                },
            });
            if (!topic) {
                topic = await db.topic.create({
                    data: { groupId: group.id, name: topicName },
                });
                createdTopics++;
                await db.subTopic.create({
                    data: { topicId: topic.id, name: DEFAULT_TOPIC_NAME },
                });
            }

            const subName = (q.subtopic ?? "").trim();
            if (!subName) continue;
            const subExists = await db.subTopic.findFirst({
                where: {
                    topicId: topic.id,
                    name: { equals: subName, mode: "insensitive" },
                },
            });
            if (!subExists) {
                await db.subTopic.create({
                    data: { topicId: topic.id, name: subName },
                });
                createdSubtopics++;
            }
        }

        console.log(
            `  "${group.title}": ${createdTopics} new topic(s), ${createdSubtopics} new sub topic(s)`
        );
    }

    console.log("Done.");
}

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(() => db.$disconnect());
