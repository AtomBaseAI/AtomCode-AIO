import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

import { db } from "@/lib/db";
import { requireAdminApi } from "@/lib/api-admin-guard";
import { BulkImportStudentsSchema, ImportStudentSchema } from "@/schemas/student-schema";
import { genSaltSync, hashSync } from "bcrypt-ts";

/** Per-batch sanity cap so one import cannot flood the platform. */
const MAX_STUDENTS_PER_IMPORT = 500;
/** Crude DoS guard: reject oversized uploads before parsing the body. */
const MAX_BODY_BYTES = 25 * 1024 * 1024; // 25 MB

interface ImportIssue {
    index: number;
    email: string;
    error: string;
}

/** One-time password handed back per imported row (admin distributes it). */
interface ImportedPassword {
    index: number;
    email: string;
    name: string;
    password: string;
}

/** "Atom-x7Kp2q" — 4 random bytes, URL-safe. */
function generateOneTimePassword(): string {
    return `Atom-${randomBytes(4).toString("base64url")}`;
}

/**
 * POST /api/students/import
 *
 * Body: the JSON produced by the students export (envelope with `students`)
 * or a bare array of student objects. Every valid record is created as a NEW
 * student with a per-row RANDOM one-time password (returned in the
 * `passwords` field so the admin can distribute it); invalid or
 * duplicate-email records are skipped and reported.
 */
export async function POST(req: Request) {
    const guard = await requireAdminApi("student data");
    if (!guard.ok) return guard.response;

    const contentLength = Number(req.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
        return NextResponse.json(
            { error: "File too large (max 25 MB)." },
            { status: 413 }
        );
    }

    const body = await req.json().catch(() => null);
    const raw = Array.isArray(body)
        ? body
        : Array.isArray((body as { students?: unknown } | null)?.students)
          ? (body as { students: unknown[] }).students
          : null;

    if (!raw || raw.length === 0) {
        return NextResponse.json(
            { error: "No students found in the file." },
            { status: 400 }
        );
    }
    if (raw.length > MAX_STUDENTS_PER_IMPORT) {
        return NextResponse.json(
            {
                error: `Too many students in one import (max ${MAX_STUDENTS_PER_IMPORT}). Split the file.`,
            },
            { status: 400 }
        );
    }

    const salt = genSaltSync(10);

    // Duplicate emails inside the file itself would silently collide.
    const seenEmails = new Set<string>();
    const errors: ImportIssue[] = [];
    const passwords: ImportedPassword[] = [];
    let created = 0;

    for (let i = 0; i < raw.length; i++) {
        const item = raw[i];
        const email =
            typeof (item as { email?: unknown })?.email === "string"
                ? (item as { email: string }).email
                : `#${i + 1}`;

        const parsed = ImportStudentSchema.safeParse(item);
        if (!parsed.success) {
            errors.push({
                index: i + 1,
                email,
                error: parsed.error.issues[0]?.message ?? "Invalid student",
            });
            continue;
        }

        const student = parsed.data;
        const normalizedEmail = student.email.trim().toLowerCase();

        if (seenEmails.has(normalizedEmail)) {
            errors.push({
                index: i + 1,
                email: student.email,
                error: "Duplicate email within the file",
            });
            continue;
        }
        seenEmails.add(normalizedEmail);

        // Unique one-time password per imported student — never a shared
        // default (audit finding).
        const oneTimePassword = generateOneTimePassword();

        try {
            await db.user.create({
                data: {
                    name: student.name,
                    email: student.email,
                    rollnumber: student.rollnumber,
                    department: student.department,
                    batch: student.batch,
                    section: student.section,
                    phone: student.phone ?? null,
                    github: student.github ?? null,
                    linkedin: student.linkedin ?? null,
                    password: hashSync(oneTimePassword, salt),
                    isTwoFactorEnabled: false,
                },
            });
            created++;
            passwords.push({
                index: i + 1,
                email: student.email,
                name: student.name,
                password: oneTimePassword,
            });
        } catch (err) {
            // Unique constraint on email → friendlier copy than a raw Prisma error.
            const isUniqueViolation =
                err instanceof Object &&
                "code" in err &&
                (err as { code?: string }).code === "P2002";
            if (!isUniqueViolation) {
                console.error("[students/import] create failed:", err);
            }
            errors.push({
                index: i + 1,
                email: student.email,
                error: isUniqueViolation
                    ? "Email already exists"
                    : "Database error while creating the student",
            });
        }
    }

    if (created === 0) {
        return NextResponse.json(
            {
                error: "No students could be imported from this file.",
                created,
                failed: errors.length,
                errors: errors.slice(0, 10),
                passwords,
            },
            { status: 400 }
        );
    }

    return NextResponse.json({
        success: `${created} student(s) imported${
            errors.length ? `, ${errors.length} skipped` : ""
        }`,
        created,
        failed: errors.length,
        errors: errors.slice(0, 10),
        passwords,
    });
}
