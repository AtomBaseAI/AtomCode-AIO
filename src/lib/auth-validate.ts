import { db } from "@/lib/db";

/**
 * Session revocation — server-side validation of the claims frozen in the
 * JWT (role, id, jv = tokenVersion at sign-in).
 *
 * The web session is a signed cookie with a 30-day maxAge; the role and the
 * token version are stamped at sign-in and never refreshed. That means a
 * deleted user, a deactivated student, or a session issued before a password
 * change keeps working unless something re-checks the DB row. That re-check
 * lives here and is wired into every server-side guard
 * (action-guards.ts, api-admin-guard.ts, api-staff-guard.ts) plus the
 * desktop Bearer path (requireDesktopStudent).
 *
 * Contract (imported by src/actions/** on password change):
 *   assertSessionValid(role, id, jv?)  → true while the session may proceed
 *   bumpTokenVersion(role, id)         → invalidates every session issued
 *                                        before the call (jv mismatch)
 *
 * Legacy sessions: a JWT without `jv` is treated as jv = 0, which stays
 * valid while the row's tokenVersion is still 0 (all pre-revocation rows).
 * The first bump therefore revokes them too.
 *
 * FAILURE POLICY (deliberate): on a DB infrastructure error this function
 * FAILS OPEN (returns true) and logs loudly. Availability-first choice — a
 * transient database outage must not lock every signed-in user out of the
 * app; the guard re-check runs on every privileged action, so a real
 * revocation is enforced as soon as the DB recovers. If you need strict
 * fail-closed semantics for a specific surface, catch around the call and
 * treat errors yourself.
 */

/** Minimal projection of any role row needed for the revocation check. */
interface RevocationRow {
  tokenVersion: number;
  isActive?: boolean;
}

export async function assertSessionValid(
  role: string,
  id: string,
  jv?: number
): Promise<boolean> {
  try {
    let row: RevocationRow | null = null;
    switch (role) {
      case "user":
        row = await db.user.findUnique({
          where: { id },
          select: { tokenVersion: true, isActive: true },
        });
        break;
      case "staff":
        row = await db.staff.findUnique({
          where: { id },
          select: { tokenVersion: true },
        });
        break;
      case "admin":
        row = await db.admin.findUnique({
          where: { id },
          select: { tokenVersion: true },
        });
        break;
      case "superadmin":
        row = await db.superAdmin.findUnique({
          where: { id },
          select: { tokenVersion: true },
        });
        break;
      default:
        // Unknown role → never trust the session.
        return false;
    }

    // Row gone (deleted account) → revoked.
    if (!row) return false;

    // Deactivation policy (only User carries isActive).
    if (role === "user" && row.isActive === false) return false;

    // Token-version check: undefined jv (legacy JWT) is treated as 0, so
    // sessions minted before this field existed stay valid only while the
    // row's tokenVersion is still 0 — the first bump revokes them too.
    const expected = typeof jv === "number" ? jv : 0;
    if ((row.tokenVersion ?? 0) !== expected) return false;

    return true;
  } catch (error) {
    // FAIL-OPEN on infrastructure errors (see FAILURE POLICY above) — the
    // opposite (fail-closed) would make a DB blip a full-application outage.
    console.error(
      `[auth-validate] assertSessionValid DB error for role=${role} — failing OPEN (availability-first):`,
      error
    );
    return true;
  }
}

/**
 * Invalidate every existing session for the account: increments the row's
 * tokenVersion so all JWTs carrying the old `jv` fail assertSessionValid.
 * Call on password change, account disable/delete flows, forced logout.
 * Throws on an unknown role (callers pass only the four real roles).
 */
export async function bumpTokenVersion(
  role: string,
  id: string
): Promise<void> {
  switch (role) {
    case "user":
      await db.user.update({
        where: { id },
        data: { tokenVersion: { increment: 1 } },
      });
      return;
    case "staff":
      await db.staff.update({
        where: { id },
        data: { tokenVersion: { increment: 1 } },
      });
      return;
    case "admin":
      await db.admin.update({
        where: { id },
        data: { tokenVersion: { increment: 1 } },
      });
      return;
    case "superadmin":
      await db.superAdmin.update({
        where: { id },
        data: { tokenVersion: { increment: 1 } },
      });
      return;
    default:
      // Silent skip would leave old sessions valid after a password change —
      // a security bug. Fail loudly instead.
      throw new Error(`bumpTokenVersion: unknown role "${role}"`);
  }
}
