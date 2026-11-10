import { NextResponse } from "next/server";

import { auth } from "@/auth";
import type { Session } from "next-auth";

/**
 * Staff-only guard for API routes scoped to the signed-in staff member
 * (dashboard, course analytics …). Mirrors requireAdminApi in
 * api-admin-guard.ts: returns a 401/403 response when the caller is not an
 * authenticated staff member, otherwise hands back the session so the route
 * can scope every query to `session.user.id`.
 */
export async function requireStaffApi(subject = "this resource"): Promise<{
    ok: true;
    session: Session;
} | {
    ok: false;
    response: NextResponse;
}> {
    const session = await auth();
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (!session?.user) {
        return {
            ok: false as const,
            response: NextResponse.json(
                { error: "You must be signed in to access this resource." },
                { status: 401 }
            ),
        };
    }
    if (role !== "staff") {
        return {
            ok: false as const,
            response: NextResponse.json(
                { error: `Only staff members can access ${subject}.` },
                { status: 403 }
            ),
        };
    }
    return { ok: true as const, session };
}
