import { PrismaClient } from "@prisma/client";

// One-shot smoke test of the exact Prisma operations used by the
// batch-billing server actions (save → collect → pending → disable).
const db = new PrismaClient();
const BATCH = "zz-test-batch";
const year = new Date().getFullYear();

try {
  // saveBatchBilling: batch upsert + billing upsert in a transaction
  await db.$transaction([
    db.batch.upsert({
      where: { value: BATCH },
      update: { billingEnabled: true, plan: "PREMIUM", annualAmount: 999 },
      create: { value: BATCH, billingEnabled: true, plan: "PREMIUM", annualAmount: 999 },
    }),
    db.batchBilling.upsert({
      where: { batchValue_year: { batchValue: BATCH, year } },
      update: { plan: "PREMIUM", amountPerStudent: 999, studentCount: 3, totalAmount: 2997 },
      create: {
        batchValue: BATCH,
        year,
        plan: "PREMIUM",
        amountPerStudent: 999,
        studentCount: 3,
        totalAmount: 2997,
        status: "PENDING",
      },
    }),
  ]);
  const rec = await db.batchBilling.findUnique({
    where: { batchValue_year: { batchValue: BATCH, year } },
  });
  console.log("save ✓", rec?.status, rec?.totalAmount);

  // markBatchCollected
  await db.batchBilling.update({
    where: { id: rec!.id },
    data: {
      status: "COLLECTED",
      method: "cash",
      collectedAt: new Date(),
      studentCount: 3,
      totalAmount: 2997,
    },
  });
  const rec2 = await db.batchBilling.findUnique({ where: { id: rec!.id } });
  console.log("collect ✓", rec2?.status, rec2?.method, rec2?.collectedAt !== null);

  // markBatchPending
  await db.batchBilling.update({
    where: { id: rec!.id },
    data: { status: "PENDING", method: null, collectedAt: null },
  });
  const rec3 = await db.batchBilling.findUnique({ where: { id: rec!.id } });
  console.log("pending ✓", rec3?.status, rec3?.collectedAt);

  // disableBatchBilling: config reset + deleteMany pending
  await db.$transaction([
    db.batch.update({
      where: { value: BATCH },
      data: { billingEnabled: false, plan: "FREE", annualAmount: null },
    }),
    db.batchBilling.deleteMany({ where: { batchValue: BATCH, year, status: "PENDING" } }),
  ]);
  const after = await db.batchBilling.findUnique({
    where: { batchValue_year: { batchValue: BATCH, year } },
  });
  const batchAfter = await db.batch.findUnique({ where: { value: BATCH } });
  console.log("disable ✓ recordLeft=", after === null, "plan=", batchAfter?.plan);

  console.log("ALL ACTION OPS OK");
} catch (e) {
  console.error("FAILED", e);
  process.exitCode = 1;
} finally {
  // cleanup scratch data
  await db.batchBilling.deleteMany({ where: { batchValue: BATCH } });
  await db.batch.deleteMany({ where: { value: BATCH } });
  await db.$disconnect();
}
