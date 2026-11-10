import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { requireAdminApi } from "@/lib/api-admin-guard";
import { BulkImportStaffSchema, ImportStaffSchema } from "@/schemas/staff-schema";
import { genSaltSync, hashSync } from "bcrypt-ts";

/** Per-batch sanity cap so one import cannot flood the platform. */
const MAX_STAFF_PER_IMPORT = 500;

interface ImportIssue {
    index: number;
    email: string;
    error: string;
}

/**
 * POST /api/staffs/import
 *
 * Body: the JSON produced by the staffs export (envelope with `staffs`)
 * or a bare array of staff objects. Every valid record is created as a NEW
 * staff member with the default password (Staff@Atom); invalid or
 * duplicate-email records are skipped and reported.
 */
export async function POST(req: Request) {
    const guard = await requireAdminApi("staff data");
    if (!guard.ok) return guard.response;

    const body = await req.json().catch(() => null);
    const raw = Array.isArray(body)
        ? body
        : Array.isArray((body as { staffs?: unknown } | null)?.staffs)
          ? (body as { staffs: unknown[] }).staffs
          : null;

    if (!raw || raw.length === 0) {
        return NextResponse.json(
            { error: "No staff members found in the file." },
            { status: 400 }
        );
    }
    if (raw.length > MAX_STAFF_PER_IMPORT) {
        return NextResponse.json(
            {
                error: `Too many staff members in one import (max ${MAX_STAFF_PER_IMPORT}). Split the file.`,
            },
            { status: 400 }
        );
    }

    const salt = genSaltSync(10);
    const defaultPassword = hashSync("Staff@Atom", salt);

    // Duplicate emails inside the file itself would silently collide.
    const seenEmails = new Set<string>();
    const errors: ImportIssue[] = [];
    let created = 0;

    for (let i = 0; i < raw.length; i++) {
        const item = raw[i];
        const email =
            typeof (item as { email?: unknown })?.email === "string"
                ? (item as { email: string }).email
                : `#${i + 1}`;

        const parsed = ImportStaffSchema.safeParse(item);
        if (!parsed.success) {
            errors.push({
                index: i + 1,
                email,
                error: parsed.error.issues[0]?.message ?? "Invalid staff record",
            });
            continue;
        }

        const staff = parsed.data;
        const normalizedEmail = staff.email.trim().toLowerCase();

        if (seenEmails.has(normalizedEmail)) {
            errors.push({
                index: i + 1,
                email: staff.email,
                error: "Duplicate email within the file",
            });
            continue;
        }
        seenEmails.add(normalizedEmail);

        try {
            await db.staff.create({
                data: {
                    name: staff.name,
                    email: staff.email,
                    staffnumber: staff.staffnumber,
                    department: staff.department,
                    phone: staff.phone ?? null,
                    password: defaultPassword,
                },
            });
            created++;
        } catch (err) {
            // Unique constraint on email → friendlier copy than a raw Prisma error.
            const isUniqueViolation =
                err instanceof Object &&
                "code" in err &&
                (err as { code?: string }).code === "P2002";
            errors.push({
                index: i + 1,
                email: staff.email,
                error: isUniqueViolation
                    ? "Email already exists"
                    : err instanceof Error
                      ? err.message
                      : "Database error while creating the staff member",
            });
        }
    }

    if (created === 0) {
        return NextResponse.json(
            {
                error: "No staff members could be imported from this file.",
                created,
                failed: errors.length,
                errors: errors.slice(0, 10),
            },
            { status: 400 }
        );
    }

    return NextResponse.json({
        success: `${created} staff member(s) imported${
            errors.length ? `, ${errors.length} skipped` : ""
        }`,
        created,
        failed: errors.length,
        errors: errors.slice(0, 10),
    });
}
