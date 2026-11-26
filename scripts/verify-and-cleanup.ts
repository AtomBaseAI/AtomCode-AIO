import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const gid = "4db42e41-8e2d-4789-95ee-40407145d221";
const g = await db.questionGroup.findUnique({
  where: { id: gid },
  include: { _count: { select: { questions: true, mcqQuestions: true, topics: true } } },
});
console.log("Imported group:", JSON.stringify(g?._count), "title:", g?.title);

// Spot-check a code question with referenceimg
const q = await db.codeQuestion.findFirst({
  where: { questionGroupId: gid },
  select: { title: true, lang: true, referenceimg: true, topic: true, subtopic: true, maxscore: true, questionGroupId: true },
});
console.log("Sample code question:", JSON.stringify(q, null, 2));

// Cleanup: delete the test-imported group (keeps user's original state)
await db.questionGroup.delete({ where: { id: gid } });
const remaining = await db.questionGroup.findMany({ select: { title: true, _count: { select: { questions: true, mcqQuestions: true } } } });
console.log("Remaining groups after cleanup:", JSON.stringify(remaining, null, 2));
await db.$disconnect();
