import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

/**
 * Admin guard for admin-only API routes (question groups, students …).
 * Returns a 401/403 response when the caller is not an authenticated admin.
 * The super admin role also passes — it has every admin capability
 * (judge endpoint tests, question testing, imports, exports …).
 * `subject` only customizes the error copy.
 */
export async function requireAdminApi(subject = "question groups") {
    const session = await auth();
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (!session?.user) {
        return {
            ok: false as const,
            response: NextResponse.json(
                { error: `You must be signed in to manage ${subject}.` },
                { status: 401 }
            ),
        };
    }
    if (role !== "admin" && role !== "superadmin") {
        return {
            ok: false as const,
            response: NextResponse.json(
                { error: `Only admins can manage ${subject}.` },
                { status: 403 }
            ),
        };
    }
    return { ok: true as const };
}

/**
 * Super-admin-only guard for the question-group and course import/export
 * endpoints. Import / export was removed from the admin panel — only the
 * super admin keeps it (same UI, role-gated), so the API must match.
 * Returns a 401/403 response when the caller is not the super admin.
 * `subject` only customizes the error copy.
 */
export async function requireSuperAdminApi(subject = "import / export") {
    const session = await auth();
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (!session?.user) {
        return {
            ok: false as const,
            response: NextResponse.json(
                { error: `You must be signed in to use ${subject}.` },
                { status: 401 }
            ),
        };
    }
    if (role !== "superadmin") {
        return {
            ok: false as const,
            response: NextResponse.json(
                { error: `Only the super admin can use ${subject}.` },
                { status: 403 }
            ),
        };
    }
    return { ok: true as const };
}
