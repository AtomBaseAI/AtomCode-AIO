import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { assertSessionValid } from "@/lib/auth-validate";

/**
 * Admin guard for admin-only API routes (question groups, students …).
 * Returns a 401/403 response when the caller is not an authenticated admin.
 * The super admin role also passes — it has every admin capability
 * (judge endpoint tests, question testing, imports, exports …).
 * `subject` only customizes the error copy.
 *
 * On top of the role check the guard re-validates the session against the
 * DB (assertSessionValid): the JWT stays signed for 30 days even after the
 * account row is deleted/revoked, so the DB is the source of truth.
 * A revoked session is answered with the same 401 an anonymous caller gets
 * (identical response shapes — callers only branch on `ok`).
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
    // Revocation re-check (jv vs live row) — revoked session ⇒ 401.
    const valid = await assertSessionValid(
        role as string,
        session.user.id,
        (session.user as { jv?: number }).jv
    );
    if (!valid) {
        return {
            ok: false as const,
            response: NextResponse.json(
                { error: `You must be signed in to manage ${subject}.` },
                { status: 401 }
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
    // Revocation re-check (jv vs live row) — revoked session ⇒ 401.
    const valid = await assertSessionValid(
        "superadmin",
        session.user.id,
        (session.user as { jv?: number }).jv
    );
    if (!valid) {
        return {
            ok: false as const,
            response: NextResponse.json(
                { error: `You must be signed in to use ${subject}.` },
                { status: 401 }
            ),
        };
    }
    return { ok: true as const };
}
