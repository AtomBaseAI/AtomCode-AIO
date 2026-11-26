import { readFileSync } from "fs";
import { PrismaClient } from "@prisma/client";
const line = readFileSync(".env", "utf8").split("\n").find(l => l.startsWith("DATABASE_URL="));
process.env.DATABASE_URL = line.slice("DATABASE_URL=".length).trim().replace(/^"|"$/g, "");
const db = new PrismaClient();
try {
  const del = await db.codeQuestion.deleteMany({ where: { title: { startsWith: "Bulk Q" } } });
  console.log("deleted test questions:", del.count);
  const q = await db.codeQuestion.count();
  console.log("remaining code questions:", q);
} catch (e) {
  console.error("ERR", e.message.slice(0, 200));
} finally {
  await db.$disconnect();
}
