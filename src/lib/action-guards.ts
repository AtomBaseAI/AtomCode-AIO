import { auth } from "@/auth";
import { db } from "@/lib/db";
import { assertSessionValid } from "@/lib/auth-validate";
import type { Session } from "next-auth";
/**
 * Role guards for bulk server actions. Existing row-level actions rely on
 * route-level protection (middleware); the new bulk actions additionally
 * verify the caller's role/ownership server-side.
 *
 * Every guard here ALSO re-validates the session against the DB
 * (assertSessionValid): the JWT is signed and frozen for 30 days, so a
 * deleted row, a deactivated student or a pre-password-change session must
 * be rejected even though its cookie still verifies. Invalid sessions are
 * treated exactly like unauthenticated ones (same return shapes).
 */

/**
 * Returns the session when the caller is an authenticated admin, else null.
 * The super admin inherits every admin panel capability (that is the point
 * of the role), so "superadmin" passes too — super-admin-only surfaces use
 * requireSuperAdmin() instead.
 */
export async function requireAdmin(): Promise<Session | null> {
    const session = await auth();
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (!session?.user || (role !== "admin" && role !== "superadmin")) return null;
    // Revocation re-check (jv vs live row). False → treat as unauthenticated.
    const valid = await assertSessionValid(
        role as string,
        session.user.id,
        (session.user as { jv?: number }).jv
    );
    if (!valid) return null;
    return session;
}

/**
 * Returns the session when the caller is the super admin, else null.
 * Guards the super-admin-only surfaces: admin account management, the
 * revenue/billing dashboard and the auth-code settings.
 */
export async function requireSuperAdmin(): Promise<Session | null> {
    const session = await auth();
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (!session?.user || role !== "superadmin") return null;
    // Revocation re-check (jv vs live row). False → treat as unauthenticated.
    const valid = await assertSessionValid(
        "superadmin",
        session.user.id,
        (session.user as { jv?: number }).jv
    );
    if (!valid) return null;
    return session;
}

/**
 * Returns the session when the caller is an authenticated student ("user"
 * role), else null. Guards every student self-service path (practice,
 * assessments, submissions, profile, AI tutor).
 */
export async function requireUser(): Promise<Session | null> {
    const session = await auth();
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (!session?.user || role !== "user") return null;
    // Revocation re-check (jv vs live row). False → treat as unauthenticated.
    const valid = await assertSessionValid(
        "user",
        session.user.id,
        (session.user as { jv?: number }).jv
    );
    if (!valid) return null;
    return session;
}

/**
 * Returns the session when the caller is an admin OR a staff member assigned
 * to the given course (StaffCourse record), else null.
 */
export async function requireAdminOrCourseStaff(
    courseId: string
): Promise<Session | null> {
    const session = await auth();
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (!session?.user) return null;
    if (role === "admin") {
        // Revocation re-check (jv vs live row). False → treat as unauthenticated.
        const valid = await assertSessionValid(
            "admin",
            session.user.id,
            (session.user as { jv?: number }).jv
        );
        if (valid) return session;
        return null;
    }
    if (role === "staff") {
        // Revocation re-check before the StaffCourse assignment lookup.
        const valid = await assertSessionValid(
            "staff",
            session.user.id,
            (session.user as { jv?: number }).jv
        );
        if (!valid) return null;
        const assignment = await db.staffCourse.findFirst({
            where: { staffId: session.user.id, courseId },
        });
        if (assignment) return session;
    }
    return null;
}
