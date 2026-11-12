import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
const q = await db.codeQuestion.findFirst({ where: { title: "Sum of Two" }, select: { id: true, title: true, _count: { select: { modules: true } } } });
console.log("Sum of Two in bank:", JSON.stringify(q));
await db.$disconnect();
