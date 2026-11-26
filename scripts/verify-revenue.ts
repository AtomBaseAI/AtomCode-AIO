import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const nowYear = new Date().getFullYear();

const ledger = await db.batchBilling.findMany();
const batches = await db.batch.findMany();
const counts = await db.user.groupBy({
  by: ["batch"],
  where: { isActive: true, batch: { not: null } },
  _count: { _all: true },
});
const countMap = new Map(counts.map((c) => [c.batch ?? "", c._count._all]));

console.log(
  "batches:",
  batches.map(
    (b) =>
      `${b.value} enabled=${b.billingEnabled} plan=${b.plan} amt=${b.annualAmount} students=${countMap.get(b.value) ?? 0}`
  )
);

let collected = 0;
let expected = 0;
let thisYear = 0;
for (const r of ledger) {
  const live = countMap.get(r.batchValue) ?? 0;
  if (r.status === "COLLECTED") {
    collected += r.totalAmount;
    if (r.year === nowYear) thisYear += r.totalAmount;
  } else if (r.status === "PENDING") {
    expected += r.amountPerStudent * live;
  }
}
const premium = batches.filter((b) => b.billingEnabled && b.plan === "PREMIUM");
console.log(
  "ledger:",
  ledger.map((r) => `${r.batchValue} ${r.year} ${r.status} total=${r.totalAmount}`)
);
console.log({
  collected,
  expected,
  thisYear,
  premiumStudents: premium.reduce((s, b) => s + (countMap.get(b.value) ?? 0), 0),
});
await db.$disconnect();
