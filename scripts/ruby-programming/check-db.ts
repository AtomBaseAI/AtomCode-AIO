import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  const groups = await db.questionGroup.findMany();
  console.log("Existing groups:", groups.map(g => `${g.title} (${g.id})`));
  const code = await db.codeQuestion.count();
  const mcq = await db.mCQQuestion.count();
  const adminCount = await db.admin.count();
  console.log(`Code: ${code} / MCQ: ${mcq} / Admins: ${adminCount}`);
}
main().then(() => db.$disconnect()).catch(async e => { console.error(e); await db.$disconnect(); process.exit(1); });
