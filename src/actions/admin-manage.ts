"use server";

// AtomCode — super-admin-only server actions:
//   1. Admin account management (add / edit / delete / reset password)
//   2. Super admin auth code rotation
//   3. Batch-wise annual billing (INR, cash collected by the institution)
//
// Every action verifies the caller's session role === "superadmin" server
// side (requireSuperAdmin), so admins/staff/students can neither manage
// admins nor ever touch billing data — even by calling the action directly.

import * as z from "zod";
import { randomBytes } from "crypto";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";
import { requireSuperAdmin } from "@/lib/action-guards";
import { bumpTokenVersion } from "@/lib/auth-validate";
import { unstable_update } from "@/auth";
import { getSuperAdminAuthCode, setSuperAdminAuthCode } from "@/lib/superadmin-settings";
import {
    AddAdminSchema,
    AdminUpdateSchema,
    AuthCodeSchema,
    BatchBillingActionSchema,
    BatchBillingSchema,
    DeleteAdminSchema,
    DeleteAdminSecureSchema,
    DisableBatchBillingSchema,
} from "@/schemas/admin-manage-schema";

/* ------------------------------------------------------------------ */
/* Admin account management                                            */
/* ------------------------------------------------------------------ */

export const addadmin = async (values: z.infer<typeof AddAdminSchema>) => {
    const session = await requireSuperAdmin();
    if (!session) return { error: "Only the super admin can manage admin accounts." };

    const validatedFields = AddAdminSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid details" };
    }
    const { email, password, name } = validatedFields.data;

    const existing = await db.admin.findUnique({ where: { email } });
    if (existing) return { error: "Email already exists !" };

    // Also keep super-admin/superadmin email spaces distinct.
    const superClash = await db.superAdmin.findUnique({ where: { email } });
    if (superClash) return { error: "Email already exists !" };

    const hashedPassword = hashSync(password, genSaltSync(10));
    await db.admin.create({
        data: { name, email, password: hashedPassword },
    });

    revalidatePath("/superadmin/admins");
    return { success: "Admin Added !" };
};

export const updateadmin = async (values: z.infer<typeof AdminUpdateSchema>) => {
    const session = await requireSuperAdmin();
    if (!session) return { error: "Only the super admin can manage admin accounts." };

    const validatedFields = AdminUpdateSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid details" };
    }
    const { id, name, email } = validatedFields.data;

    const admin = await db.admin.findUnique({ where: { id }, select: { id: true } });
    if (!admin) return { error: "Admin not found." };

    const clash = await db.admin.findFirst({
        where: { email, NOT: { id } },
    });
    if (clash) return { error: "Email already in use by another admin" };

    await db.admin.update({ where: { id }, data: { name, email } });

    revalidatePath("/superadmin/admins");
    return { success: "Admin Updated !" };
};

export const deleteadmin = async (values: z.infer<typeof DeleteAdminSecureSchema>) => {
    const session = await requireSuperAdmin();
    if (!session) return { error: "Only the super admin can manage admin accounts." };

    const validatedFields = DeleteAdminSecureSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid details" };

    // Second factor: the static super-admin auth code must match — same
    // code enforced at sign-in, verified server-side on every delete.
    const expectedCode = await getSuperAdminAuthCode();
    if (validatedFields.data.code !== expectedCode) {
        return { error: "Invalid auth code." };
    }

    const id = validatedFields.data.id;
    const admin = await db.admin.findUnique({ where: { id }, select: { id: true } });
    if (!admin) return { error: "Admin not found." };

    // Safety: never leave the platform without any admin.
    const remaining = await db.admin.count({ where: { NOT: { id } } });
    if (remaining === 0) {
        return { error: "Cannot delete the last admin account." };
    }

    await db.admin.delete({ where: { id } });

    revalidatePath("/superadmin/admins");
    return { success: "Admin Deleted !" };
};

/**
 * Reset an admin's password — issues a RANDOM one-time password (returned
 * once in the success message) instead of the old fixed "Admin@Atom"
 * default, and revokes every session the admin still holds.
 */
export const resetpasswordadminmanage = async (
    values: z.infer<typeof DeleteAdminSchema>
) => {
    const session = await requireSuperAdmin();
    if (!session) return { error: "Only the super admin can manage admin accounts." };

    const validatedFields = DeleteAdminSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid details" };

    const id = validatedFields.data.id;
    const admin = await db.admin.findUnique({ where: { id }, select: { id: true } });
    if (!admin) return { error: "Admin not found." };

    const oneTimePassword = `Atom-${randomBytes(4).toString("base64url")}`;
    const hashedPassword = hashSync(oneTimePassword, genSaltSync(10));
    await db.admin.update({ where: { id }, data: { password: hashedPassword } });

    // Old admin sessions (JWT jv frozen at sign-in) must not survive a reset.
    await bumpTokenVersion("admin", id);

    return {
        success: `One-time password: ${oneTimePassword} — share it with the admin now; it is not shown again.`,
    };
};

/* ------------------------------------------------------------------ */
/* Super admin auth code                                               */
/* ------------------------------------------------------------------ */

export const updateAuthCode = async (values: z.infer<typeof AuthCodeSchema>) => {
    const session = await requireSuperAdmin();
    if (!session) return { error: "Only the super admin can change the auth code." };

    const validatedFields = AuthCodeSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Auth code must be exactly 4 digits" };

    await setSuperAdminAuthCode(validatedFields.data.code);
    revalidatePath("/superadmin/settings");
    return { success: "Auth code updated !" };
};

/* ------------------------------------------------------------------ */
/* Super admin self profile / password                                 */
/* ------------------------------------------------------------------ */

export const updateSuperAdminProfile = async (
    values: { id: string; name: string; email: string }
) => {
    const session = await requireSuperAdmin();
    if (!session) return { error: "Unauthorized" };
    if (values.id !== session.user.id) return { error: "Unauthorized" };

    const name = values.name.trim();
    const email = values.email.toLowerCase().trim();
    if (!name || !email) return { error: "Invalid details" };

    try {
        const clash = await db.superAdmin.findFirst({
            where: { email, NOT: { id: values.id } },
        });
        if (clash) return { error: "Email already in use" };

        // Keep Admin table distinct — an admin must never collide with the
        // super admin email either.
        const adminClash = await db.admin.findUnique({ where: { email } });
        if (adminClash) return { error: "Email already in use by an admin" };

        await db.superAdmin.update({
            where: { id: values.id },
            data: { name, email },
        });
        await unstable_update({ user: { name, email } });
        return { success: "Profile updated!" };
    } catch {
        return { error: "Something went wrong!" };
    }
};

export const updateSuperAdminPassword = async (
    values: { id: string; currentpassword: string; password: string; confirmpassword: string }
) => {
    const session = await requireSuperAdmin();
    if (!session) return { error: "Unauthorized" };
    if (values.id !== session.user.id) return { error: "Unauthorized" };
    if (values.password !== values.confirmpassword) {
        return { error: "Passwords do not match" };
    }
    if (values.password.length < 6) {
        return { error: "Minimum 6 characters required" };
    }

    const me = await db.superAdmin.findUnique({ where: { id: values.id } });
    if (!me?.password) return { error: "Account not found" };

    if (!compareSync(values.currentpassword, me.password)) {
        return { error: "Current password is incorrect" };
    }

    const hashedPassword = hashSync(values.password, genSaltSync(10));
    await db.superAdmin.update({
        where: { id: me.id },
        data: { password: hashedPassword },
    });
    return { success: "Password Updated !" };
};

/* ------------------------------------------------------------------ */
/* Batch-wise annual billing (super admin only, never exposed to       */
/* admin/staff/user roles)                                             */
/*                                                                     */
/* Two plans only: FREE (no billing) and PREMIUM. Billing is enabled   */
/* per batch with a per-student annual amount in INR; the institution  */
/* collects the cash, so there is NO per-student bill and no billing   */
/* status on individual students — just one PENDING/COLLECTED record   */
/* per batch per year.                                                 */
/* ------------------------------------------------------------------ */

/** Current billing (calendar) year. */
const billingYear = () => new Date().getFullYear();

/** Live count of active students belonging to a batch. */
async function countBatchStudents(batchValue: string) {
    return db.user.count({ where: { batch: batchValue, isActive: true } });
}

/** Round money to 2 decimals so Float drift never reaches the UI. */
const money = (n: number) => Math.round(n * 100) / 100;

/**
 * Enable (or update) PREMIUM annual billing for a batch.
 * Creates / refreshes the current year's PENDING collection record with
 * the live student count; already COLLECTED records are history and are
 * left untouched (the new amount applies from the next billing year).
 */
export const saveBatchBilling = async (
    values: z.infer<typeof BatchBillingSchema>
) => {
    const session = await requireSuperAdmin();
    if (!session) return { error: "Only the super admin can manage billing." };

    const validatedFields = BatchBillingSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: validatedFields.error.issues[0]?.message ?? "Invalid details" };
    }
    const { batchValue, annualAmount } = validatedFields.data;

    const batch = await db.batch.findUnique({ where: { value: batchValue } });
    if (!batch) return { error: "Batch not found." };

    const year = billingYear();
    const students = await countBatchStudents(batchValue);
    const total = money(annualAmount * students);

    const existing = await db.batchBilling.findUnique({
        where: { batchValue_year: { batchValue, year } },
    });

    await db.$transaction([
        db.batch.update({
            where: { value: batchValue },
            data: { billingEnabled: true, plan: "PREMIUM", annualAmount },
        }),
        // Pending record mirrors the live config; a collected record is
        // frozen history and only the batch config moves forward.
        db.batchBilling.upsert({
            where: { batchValue_year: { batchValue, year } },
            update:
                existing?.status === "COLLECTED"
                    ? { plan: "PREMIUM" }
                    : {
                          plan: "PREMIUM",
                          amountPerStudent: annualAmount,
                          studentCount: students,
                          totalAmount: total,
                      },
            create: {
                batchValue,
                year,
                plan: "PREMIUM",
                amountPerStudent: annualAmount,
                studentCount: students,
                totalAmount: total,
                status: "PENDING",
            },
        }),
    ]);

    revalidatePath("/superadmin/revenue");
    const note =
        existing?.status === "COLLECTED"
            ? ` ${year} was already collected — the new amount applies from the next billing year.`
            : "";
    return {
        success: `Premium billing enabled for batch ${batchValue} — ₹${annualAmount}/student/year (${students} students, ₹${total.toLocaleString("en-IN")} this year).${note}`,
    };
};

/**
 * Turn a batch back to the FREE plan. Any PENDING record for the current
 * year is removed (nothing is expected anymore); COLLECTED records are
 * kept as revenue history.
 */
export const disableBatchBilling = async (
    values: z.infer<typeof DisableBatchBillingSchema>
) => {
    const session = await requireSuperAdmin();
    if (!session) return { error: "Only the super admin can manage billing." };

    const validatedFields = DisableBatchBillingSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: validatedFields.error.issues[0]?.message ?? "Invalid details" };
    }
    const { batchValue } = validatedFields.data;

    const batch = await db.batch.findUnique({ where: { value: batchValue } });
    if (!batch) return { error: "Batch not found." };

    const year = billingYear();
    await db.$transaction([
        db.batch.update({
            where: { value: batchValue },
            data: { billingEnabled: false, plan: "FREE", annualAmount: null },
        }),
        db.batchBilling.deleteMany({
            where: { batchValue, year, status: "PENDING" },
        }),
    ]);

    revalidatePath("/superadmin/revenue");
    return { success: `Billing disabled — batch ${batchValue} is back on the FREE plan.` };
};

/** Mark a batch's annual collection as received (cash, at institution). */
export const markBatchCollected = async (
    values: z.infer<typeof BatchBillingActionSchema>
) => {
    const session = await requireSuperAdmin();
    if (!session) return { error: "Only the super admin can manage billing." };

    const validatedFields = BatchBillingActionSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid details" };

    const { id } = validatedFields.data;
    const record = await db.batchBilling.findUnique({ where: { id } });
    if (!record) return { error: "Billing record not found." };

    // Freeze the live student count into the record at collection time —
    // later additions to the batch do not change past revenue.
    const students = await countBatchStudents(record.batchValue);
    await db.batchBilling.update({
        where: { id },
        data: {
            status: "COLLECTED",
            method: "cash",
            collectedAt: new Date(),
            studentCount: students,
            totalAmount: money(record.amountPerStudent * students),
        },
    });

    revalidatePath("/superadmin/revenue");
    return { success: `Marked as collected for batch ${record.batchValue} (${record.year}).` };
};

/** Re-open a collected batch record back to pending (correction case). */
export const markBatchPending = async (
    values: z.infer<typeof BatchBillingActionSchema>
) => {
    const session = await requireSuperAdmin();
    if (!session) return { error: "Only the super admin can manage billing." };

    const validatedFields = BatchBillingActionSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid details" };

    const { id } = validatedFields.data;
    const record = await db.batchBilling.findUnique({ where: { id } });
    if (!record) return { error: "Billing record not found." };

    const students = await countBatchStudents(record.batchValue);
    await db.batchBilling.update({
        where: { id },
        data: {
            status: "PENDING",
            method: null,
            collectedAt: null,
            studentCount: students,
            totalAmount: money(record.amountPerStudent * students),
        },
    });

    revalidatePath("/superadmin/revenue");
    return { success: `Batch ${record.batchValue} (${record.year}) moved back to pending.` };
};
