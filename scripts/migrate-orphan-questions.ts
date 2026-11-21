/**
 * AtomCode — orphaned-question migration.
 * Run: bun scripts/migrate-orphan-questions.ts
 *
 * The question-group FK used to be optional (onDelete: SetNull), so deleting
 * a group orphaned its questions (questionGroupId = null) — the user-visible
 * "400 code questions floating outside any group" bug. The schema now makes
 * questionGroupId REQUIRED with onDelete: Cascade.
 *
 * This one-time script must run BEFORE `prisma db push`:
 *   1. Creates (or reuses) the "Migrated Questions" group.
 *   2. Re-attaches EVERY orphaned CodeQuestion / MCQQuestion to it, so no
 *      question exists outside a group and the required FK can be applied.
 *      (Nothing is deleted — admins can review and delete the group with
 *      cascade from the dashboard.)
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const MIGRATED_GROUP_TITLE = "Migrated Questions";

async function main() {
  const group = await db.questionGroup.upsert({
    where: { id: "" }, // no natural unique — find manually below
    update: {},
    create: { title: MIGRATED_GROUP_TITLE },
  }).catch(async () => {
    const existing = await db.questionGroup.findFirst({
      where: { title: MIGRATED_GROUP_TITLE },
    });
    return (
      existing ??
      db.questionGroup.create({ data: { title: MIGRATED_GROUP_TITLE } })
    );
  });

  const orphanCode = await db.codeQuestion.updateMany({
    where: { questionGroupId: null },
    data: { questionGroupId: group.id },
  });
  const orphanMcq = await db.mCQQuestion.updateMany({
    where: { questionGroupId: null },
    data: { questionGroupId: group.id },
  });

  console.log(`Migrated group: ${group.id} (${MIGRATED_GROUP_TITLE})`);
  console.log(`Code questions re-attached: ${orphanCode.count}`);
  console.log(`MCQ questions re-attached:  ${orphanMcq.count}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
