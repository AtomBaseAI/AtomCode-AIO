/**
 * AtomCode — super admin + revenue seed.
 * Run: bun scripts/seed-superadmin.ts
 *
 * Creates:
 *   1. The SuperAdmin account  (superadmin@atomcode.dev / Mr@1811321)
 *   2. The static auth code    (Setting "superadmin.authcode" = "1997")
 *   3. Demo students (if missing) so the revenue dashboard has data
 *   4. Batch-wise ANNUAL billing rows — two premium batches (2024 + 2025
 *      collected, current year pending) and one free batch. INR, cash
 *      collected by the institution; never per-student bills.
 *
 * Idempotent: upserts by unique keys, skips existing records.
 */
import { PrismaClient } from "@prisma/client";
import { genSaltSync, hashSync } from "bcrypt-ts";

const db = new PrismaClient();

const SUPERADMIN_EMAIL = "superadmin@atomcode.dev";
const SUPERADMIN_PASSWORD = "Mr@1811321";
const AUTHCODE = "1997";

type DemoUser = {
  name: string;
  email: string;
  department: string;
  section: string;
  batch: string;
  rollnumber: string;
};

const DEMO_USERS: DemoUser[] = [
  { name: "Arjun Kumar",    email: "arjun@atom.com",    department: "cse",  section: "a", batch: "2023-2027", rollnumber: "21CS014" },
  { name: "Priya Sharma",   email: "priya@atom.com",    department: "ece",  section: "b", batch: "2023-2027", rollnumber: "21EC008" },
  { name: "Rahul Verma",    email: "rahul@atom.com",    department: "mech", section: "a", batch: "2022-2026", rollnumber: "20ME021" },
  { name: "Sneha Iyer",     email: "sneha@atom.com",    department: "it",   section: "c", batch: "2024-2028", rollnumber: "22IT003" },
  { name: "Karthik Reddy",  email: "karthik@atom.com",  department: "cse",  section: "b", batch: "2022-2026", rollnumber: "20CS041" },
];

/** Billing plan per demo batch — only FREE and PREMIUM exist. */
const BATCH_PLANS: { batch: string; premium: boolean; amountPerStudent: number }[] = [
  { batch: "2023-2027", premium: true,  amountPerStudent: 1500 },
  { batch: "2022-2026", premium: true,  amountPerStudent: 1200 },
  { batch: "2024-2028", premium: false, amountPerStudent: 0 },
];

async function main() {
  const hash = (pw: string) => hashSync(pw, genSaltSync(10));

  // 1. Super admin account
  const sa = await db.superAdmin.upsert({
    where: { email: SUPERADMIN_EMAIL },
    update: {},
    create: {
      name: "Atom Super Admin",
      email: SUPERADMIN_EMAIL,
      password: hash(SUPERADMIN_PASSWORD),
    },
  });
  console.log("superadmin →", `${sa.email} / ${SUPERADMIN_PASSWORD}`);

  // 2. Auth code
  await db.setting.upsert({
    where: { key: "superadmin.authcode" },
    update: { value: AUTHCODE },
    create: { key: "superadmin.authcode", value: AUTHCODE },
  });
  console.log("authcode  →", AUTHCODE);

  // 3. Demo students (upsert — safe to re-run)
  const password = hash("User@Atom");
  for (const u of DEMO_USERS) {
    await db.user.upsert({
      where: { email: u.email },
      update: {},
      create: { ...u, password },
    });
  }
  console.log(`users     → ensured ${DEMO_USERS.length} demo student(s)`);

  // 4. Batch rows + billing config
  for (const plan of BATCH_PLANS) {
    await db.batch.upsert({
      where: { value: plan.batch },
      update: {
        billingEnabled: plan.premium,
        plan: plan.premium ? "PREMIUM" : "FREE",
        annualAmount: plan.premium ? plan.amountPerStudent : null,
      },
      create: {
        value: plan.batch,
        billingEnabled: plan.premium,
        plan: plan.premium ? "PREMIUM" : "FREE",
        annualAmount: plan.premium ? plan.amountPerStudent : null,
      },
    });
  }
  console.log(`batches   → ensured ${BATCH_PLANS.length} batch(es) with billing config`);

  // 5. Annual collection records per premium batch: past years collected
  //    (cash), current year pending — valued at the live student count.
  const nowYear = new Date().getFullYear();
  let created = 0;
  for (const plan of BATCH_PLANS) {
    if (!plan.premium) continue;
    const students = await db.user.count({
      where: { batch: plan.batch, isActive: true },
    });
    const total = plan.amountPerStudent * students;

    for (const year of [nowYear - 2, nowYear - 1, nowYear]) {
      const collected = year < nowYear;
      await db.batchBilling.upsert({
        where: { batchValue_year: { batchValue: plan.batch, year } },
        update: {
          plan: "PREMIUM",
          amountPerStudent: plan.amountPerStudent,
          studentCount: students,
          totalAmount: total,
        },
        create: {
          batchValue: plan.batch,
          year,
          plan: "PREMIUM",
          amountPerStudent: plan.amountPerStudent,
          studentCount: students,
          totalAmount: total,
          status: collected ? "COLLECTED" : "PENDING",
          method: collected ? "cash" : null,
          collectedAt: collected
            ? new Date(year, 3, 15, 12, 0, 0) // mid-April of the billing year
            : null,
        },
      });
      created += 1;
    }
  }
  console.log(`billing   → ensured ${created} batch-year collection record(s) (INR, cash)`);
  console.log("done ✓");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
