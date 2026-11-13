/**
 * insert-group.mjs — creates the "OOPS using CPP" question group with all
 * 20 topics and subtopics (idempotent — safe to re-run).
 */
import { db } from "../src/lib/db";
import { GROUP_TITLE, TOPICS } from "./topics.mjs";

async function main() {
  let group = await db.questionGroup.findFirst({
    where: { title: GROUP_TITLE },
  });
  if (!group) {
    group = await db.questionGroup.create({ data: { title: GROUP_TITLE } });
    console.log("Created group", group.id);
  } else {
    console.log("Group exists", group.id);
  }

  const existing = await db.topic.findMany({
    where: { groupId: group.id },
    include: { subtopics: true },
  });

  for (const t of TOPICS) {
    let topic = existing.find((e) => e.name === t.name);
    if (!topic) {
      topic = await db.topic.create({
        data: { name: t.name, groupId: group.id },
      });
      topic.subtopics = [];
      console.log("  + topic:", t.name);
      await new Promise((r) => setTimeout(r, 30)); // preserve day order
    } else {
      console.log("  = topic:", t.name);
    }
    for (const s of t.subtopics) {
      const has = topic.subtopics.some((x) => x.name === s);
      if (!has) {
        await db.subTopic.create({ data: { name: s, topicId: topic.id } });
        console.log("      + sub:", s);
      }
    }
  }
  console.log("Done.");
  await db.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
