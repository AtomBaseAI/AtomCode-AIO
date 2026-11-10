import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

/**
 * Admin guard for admin-only API routes (question groups, students …).
 * Returns a 401/403 response when the caller is not an authenticated admin.
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
    if (role !== "admin") {
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
