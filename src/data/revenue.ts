import { db } from "@/lib/db";

// AtomCode — revenue / annual-billing data layer.
//
// Billing is BATCH wise, never per user: the super admin enables the
// PREMIUM plan on a batch with a per-student annual amount in INR, the
// institution collects the cash, and there is no billing status on any
// individual student — only one PENDING/COLLECTED record per batch per
// year. Every consumer of this module is a /superadmin/* page or a
// requireSuperAdmin-guarded action, so billing numbers never leak into
// the admin/staff/student roles.

/** The calendar year bills are tracked against. */
export const currentBillingYear = () => new Date().getFullYear();

export type BatchSetupRow = {
  batchValue: string;
  /** Live count of active students in the batch. */
  students: number;
  billingEnabled: boolean;
  plan: string; // FREE | PREMIUM
  annualAmount: number | null; // INR per student / year
  /** Billing year these columns describe (always the current year). */
  year: number;
  /** This year's collection record, when one exists. */
  record: {
    id: string;
    status: string; // PENDING | COLLECTED
    totalAmount: number;
    collectedAt: Date | null;
  } | null;
};

export type LedgerRow = {
  id: string;
  year: number;
  batchValue: string;
  plan: string;
  amountPerStudent: number;
  studentCount: number;
  totalAmount: number;
  status: string; // PENDING | COLLECTED
  collectedAt: Date | null;
  method: string | null;
};

export type RevenueStats = {
  /** Cash collected across all years, INR. */
  totalCollected: number;
  /** Cash collected for the current billing year, INR. */
  thisYearCollected: number;
  /** Money expected (PENDING records), valued at live student counts. */
  expected: number;
  /** collected / (collected + expected), 0-100. */
  collectionRate: number;
  /** Number of batches whose current-year cash is in. */
  collectedBatches: number;
  /** Number of batches still pending for the current year. */
  pendingBatches: number;
  /** Live premium batches / free batches. */
  premiumBatches: number;
  freeBatches: number;
  /** Students covered by the PREMIUM plan right now. */
  premiumStudents: number;
  totalStudents: number;
  /** Per-year totals across the ledger. */
  byYear: { year: number; collected: number; expected: number }[];
  /** All-time collected per batch (only batches that collected > 0). */
  byBatch: { batch: string; collected: number }[];
  /** Live student split between the two plans. */
  planMix: { plan: string; students: number }[];
};

/** One row per batch — config + live student count + current-year record. */
export async function getBatchSetupRows(): Promise<BatchSetupRow[]> {
  try {
    const year = currentBillingYear();
    const [batches, counts, records] = await Promise.all([
      db.batch.findMany({ orderBy: { value: "asc" } }),
      db.user.groupBy({
        by: ["batch"],
        where: { isActive: true, batch: { not: null } },
        _count: { _all: true },
      }),
      db.batchBilling.findMany({ where: { year } }),
    ]);

    const countMap = new Map(counts.map((c) => [c.batch ?? "", c._count._all]));
    const recMap = new Map(records.map((r) => [r.batchValue, r]));

    return batches.map((b) => {
      const rec = recMap.get(b.value) ?? null;
      return {
        batchValue: b.value,
        students: countMap.get(b.value) ?? 0,
        billingEnabled: b.billingEnabled,
        plan: b.plan,
        annualAmount: b.annualAmount,
        year,
        record: rec
          ? {
              id: rec.id,
              status: rec.status,
              totalAmount: rec.totalAmount,
              collectedAt: rec.collectedAt,
            }
          : null,
      };
    });
  } catch {
    return [];
  }
}

/** The full billing ledger — every batch × year collection record. */
export async function getBillingLedger(): Promise<LedgerRow[]> {
  try {
    const rows = await db.batchBilling.findMany({
      orderBy: [{ year: "desc" }, { batchValue: "asc" }],
    });
    return rows.map((r) => ({
      id: r.id,
      year: r.year,
      batchValue: r.batchValue,
      plan: r.plan,
      amountPerStudent: r.amountPerStudent,
      studentCount: r.studentCount,
      totalAmount: r.totalAmount,
      status: r.status,
      collectedAt: r.collectedAt,
      method: r.method,
    }));
  } catch {
    return [];
  }
}

const round = (n: number) => Math.round(n * 100) / 100;

/**
 * Aggregate revenue stats from the ledger + live batch setup.
 * PENDING money is valued with LIVE student counts (so "expected" stays
 * accurate as students join/leave); COLLECTED money uses the frozen
 * snapshot taken when the cash was received.
 */
export function computeRevenueStats(
  ledger: LedgerRow[],
  setup: BatchSetupRow[]
): RevenueStats {
  const nowYear = currentBillingYear();
  const liveStudents = new Map(setup.map((b) => [b.batchValue, b.students]));

  let totalCollected = 0;
  let thisYearCollected = 0;
  let expected = 0;
  let collectedBatches = 0;
  let pendingBatches = 0;

  const yearMap = new Map<number, { collected: number; expected: number }>();
  const batchMap = new Map<string, number>();

  for (const r of ledger) {
    if (r.status === "COLLECTED") {
      totalCollected += r.totalAmount;
      collectedBatches += 1;
      if (r.year === nowYear) thisYearCollected += r.totalAmount;
      batchMap.set(r.batchValue, (batchMap.get(r.batchValue) ?? 0) + r.totalAmount);
      const yb = yearMap.get(r.year) ?? { collected: 0, expected: 0 };
      yb.collected += r.totalAmount;
      yearMap.set(r.year, yb);
    } else if (r.status === "PENDING") {
      // Value pending money at the live head-count of the batch.
      const students = liveStudents.get(r.batchValue) ?? r.studentCount;
      const pendingTotal = round(r.amountPerStudent * students);
      expected += pendingTotal;
      pendingBatches += 1;
      const yb = yearMap.get(r.year) ?? { collected: 0, expected: 0 };
      yb.expected += pendingTotal;
      yearMap.set(r.year, yb);
    }
  }

  const premiumBatches = setup.filter((b) => b.billingEnabled && b.plan === "PREMIUM");
  const premiumStudents = premiumBatches.reduce((s, b) => s + b.students, 0);
  const totalStudents = setup.reduce((s, b) => s + b.students, 0);

  const active = totalCollected + expected;

  const byYear = [...yearMap.entries()]
    .map(([year, v]) => ({ year, collected: round(v.collected), expected: round(v.expected) }))
    .sort((a, b) => a.year - b.year);

  const byBatch = [...batchMap.entries()]
    .map(([batch, collected]) => ({ batch, collected: round(collected) }))
    .sort((a, b) => b.collected - a.collected);

  return {
    totalCollected: round(totalCollected),
    thisYearCollected: round(thisYearCollected),
    expected: round(expected),
    collectionRate: active === 0 ? 0 : Math.round((totalCollected / active) * 100),
    collectedBatches,
    pendingBatches,
    premiumBatches: premiumBatches.length,
    freeBatches: setup.length - premiumBatches.length,
    premiumStudents,
    totalStudents,
    byYear,
    byBatch,
    planMix: [
      { plan: "Premium", students: premiumStudents },
      { plan: "Free", students: Math.max(totalStudents - premiumStudents, 0) },
    ],
  };
}
