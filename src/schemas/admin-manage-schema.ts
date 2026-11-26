import * as z from "zod";

/** Create an Admin account (super admin only). */
export const AddAdminSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
});

/** Edit an Admin account's identity fields. */
export const AdminUpdateSchema = z.object({
    id: z.string(),
    name: z.string().min(1, {
        message: "Name is required",
    }),
    email: z.string().email({
        message: "Email is required",
    }),
});

export const DeleteAdminSchema = z.object({
    id: z.string(),
});

/**
 * Smart delete — the static super-admin auth code is required as a second
 * factor before an admin account can be removed.
 */
export const DeleteAdminSecureSchema = DeleteAdminSchema.extend({
    code: z.string().regex(/^\d{4}$/, {
        message: "Auth code must be exactly 4 digits",
    }),
});

/** Super-admin-side reset — puts an Admin back to the default password. */
export const AdminManagePasswordResetSchema = z.object({
    id: z.string(),
});

/** Row shape for the Admins management table (never exposes the hash). */
export const AdminTableSchema = z.object({
    id: z.string(),
    name: z.string().nullable(),
    email: z.string(),
});

export type AdminTableType = z.infer<typeof AdminTableSchema>;

/** Change the static super-admin 4-digit auth code (super admin only). */
export const AuthCodeSchema = z.object({
    code: z.string().regex(/^\d{4}$/, {
        message: "Auth code must be exactly 4 digits",
    }),
});

/**
 * Enable / update annual billing for a batch (super admin only).
 * Batch wise, NOT per user — the amount is the per-student yearly price
 * in INR collected as cash by the institution.
 */
export const BatchBillingSchema = z.object({
    batchValue: z.string().min(1, { message: "Batch is required" }),
    annualAmount: z
        .number({ message: "Amount is required" })
        .positive({ message: "Amount must be greater than 0" })
        .max(10_000_000, { message: "Amount looks too large" }),
});

/** Turn a batch back to the FREE plan (super admin only). */
export const DisableBatchBillingSchema = z.object({
    batchValue: z.string().min(1, { message: "Batch is required" }),
});

/** Mark a batch's annual collection as collected / back to pending. */
export const BatchBillingActionSchema = z.object({
    id: z.string(),
});
