import { readFileSync } from "fs";
import { PrismaClient } from "@prisma/client";
// Load DATABASE_URL from .env, stripping surrounding quotes (Next-style).
const line = readFileSync(".env", "utf8").split("\n").find(l => l.startsWith("DATABASE_URL="));
process.env.DATABASE_URL = line.slice("DATABASE_URL=".length).trim().replace(/^"|"$/g, "");
const db = new PrismaClient();
try {
  const groups = await db.questionGroup.count();
  const q = await db.codeQuestion.count();
  const t = await db.topic.count();
  const st = await db.subTopic.count();
  console.log(JSON.stringify({ groups, codeQuestions: q, topics: t, subTopics: st }));
} catch (e) {
  console.error("ERR", e.message.slice(0, 200));
} finally {
  await db.$disconnect();
}
