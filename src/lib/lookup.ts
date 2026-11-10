// AtomCode — Batch & Department lookup lists (DB-backed, admin-managed).
//
// Admin → Settings → System manages these lists; every form and table filter
// in the app renders them dynamically instead of hard-coded arrays.
//
// Fault tolerance:
// - Fresh database → seeded with the historical defaults on first read.
// - DB unreachable → static fallbacks so no page ever breaks.

import { db } from "@/lib/db";

export type LookupType = "batch" | "department";

export type BatchOption = { value: string };
export type DepartmentOption = { value: string; label: string };

/** Historical defaults — also used as static fallbacks when the DB is down. */
export const DEFAULT_BATCHES: BatchOption[] = [
  { value: "2021-2025" },
  { value: "2022-2026" },
  { value: "2023-2027" },
  { value: "2024-2028" },
  { value: "2025-2029" },
  { value: "2026-2030" },
];

export const DEFAULT_DEPARTMENTS: DepartmentOption[] = [
  { value: "cse", label: "CSE" },
  { value: "it", label: "IT" },
  { value: "iot", label: "IOT" },
  { value: "cys", label: "Cyber Security" },
  { value: "aids", label: "AI & DS" },
  { value: "aiml", label: "AI & ML" },
  { value: "mech", label: "Mechanical" },
  { value: "civil", label: "Civil" },
  { value: "eee", label: "EEE" },
  { value: "ece", label: "ECE" },
];

let seedChecked = false;

/** Seed the historical defaults once on a fresh (empty) database. */
async function ensureSeeded() {
  if (seedChecked) return;
  seedChecked = true;
  try {
    const [batchCount, deptCount] = await Promise.all([
      db.batch.count(),
      db.department.count(),
    ]);
    if (batchCount === 0) {
      await db.batch.createMany({
        data: DEFAULT_BATCHES,
        skipDuplicates: true,
      });
    }
    if (deptCount === 0) {
      await db.department.createMany({
        data: DEFAULT_DEPARTMENTS,
        skipDuplicates: true,
      });
    }
  } catch {
    // DB unreachable — leave unchecked so the next request retries.
    seedChecked = false;
  }
}

/** Read both lookup lists (seeds defaults on first call). */
export async function getLookups(): Promise<{
  batches: (BatchOption & { id: string })[];
  departments: (DepartmentOption & { id: string })[];
}> {
  try {
    await ensureSeeded();
    const [batches, departments] = await Promise.all([
      db.batch.findMany({ orderBy: { value: "asc" } }),
      db.department.findMany({ orderBy: { label: "asc" } }),
    ]);
    return {
      batches: batches.map((b) => ({ id: b.id, value: b.value })),
      departments: departments.map((d) => ({
        id: d.id,
        value: d.value,
        label: d.label,
      })),
    };
  } catch {
    // Fault-tolerant fallback — static defaults (no ids → rows not deletable).
    return {
      batches: DEFAULT_BATCHES.map((b, i) => ({ ...b, id: `default-batch-${i}` })),
      departments: DEFAULT_DEPARTMENTS.map((d, i) => ({
        ...d,
        id: `default-department-${i}`,
      })),
    };
  }
}

/** Derive the stored value from an admin-entered department name. */
function slugifyDepartment(label: string): string {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 24);
}

/** Add a batch (value = display string) or department (auto value slug). */
export async function addLookup(
  type: LookupType,
  label: string
): Promise<{ error?: string; item?: (BatchOption & { id: string }) & Partial<DepartmentOption> }> {
  const clean = label.trim().replace(/\s+/g, " ");
  if (!clean) return { error: "Name is required" };
  if (clean.length > 40) return { error: "Name is too long (max 40 characters)" };

  if (type === "batch") {
    const value = clean;
    const existing = await db.batch.findUnique({ where: { value } });
    if (existing) return { error: `Batch "${value}" already exists` };
    const created = await db.batch.create({ data: { value } });
    return { item: { id: created.id, value: created.value } };
  }

  const labelOut = clean;
  const value = slugifyDepartment(clean);
  if (!value) return { error: "Enter a department name with letters or numbers" };
  const existing = await db.department.findUnique({ where: { value } });
  if (existing) return { error: `Department "${labelOut}" already exists` };
  const created = await db.department.create({ data: { value, label: labelOut } });
  return { item: { id: created.id, value: created.value, label: created.label } };
}

/** Remove a lookup entry. Existing User/Staff rows keep their stored strings. */
export async function deleteLookup(
  type: LookupType,
  id: string
): Promise<{ error?: string }> {
  if (type === "batch") {
    await db.batch.delete({ where: { id } });
  } else {
    await db.department.delete({ where: { id } });
  }
  return {};
}
