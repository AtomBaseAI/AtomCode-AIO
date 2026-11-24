import { NextResponse } from "next/server";
import { compare, hashSync } from "bcrypt-ts";
import { db } from "@/lib/db";
import {
  createDesktopToken,
  json,
  fail,
  CORS_HEADERS,
} from "@/lib/desktop-auth";
import { safeProfile } from "@/lib/desktop-helpers";
import {
  gateAttempt,
  registerFailure,
  clearFailures,
  gateIp,
  registerIpFailure,
  clearIpFailures,
  ipFromRequest,
} from "@/lib/login-rate-limit";

/**
 * POST /api/desktop/auth/login
 * Student-only login for the Electron desktop client.
 * Returns a signed Bearer token + safe profile.
 *
 * Hardening:
 *  - per-account AND per-IP rate limits, checked BEFORE any DB/bcrypt work;
 *  - uniform failure body: wrong password, unknown email and staff/admin-role
 *    rejection ALL answer 401 { error: "Invalid email or password" } — the
 *    old admin/staff probe (403 "student accounts only") was an account-
 *    enumeration oracle, and the desktop client is student-only anyway;
 *  - timing parity for unknown emails via a one-time dummy bcrypt compare
 *    (same defense as authorize() in src/auth.ts);
 *  - the minted token carries the row's tokenVersion (jv) so requireDesktop
 *    Student can revoke it on password change / deactivation.
 */

// Computed ONCE at module load (random plaintext, never matches) — burns the
// same bcrypt work as a real compare so unknown-email responses are not
// measurably faster than wrong-password ones.
const DUMMY_HASH = hashSync("atomcode-desktop-dummy-" + Math.random(), 10);

export async function POST(req: Request) {
  try {
    // Per-IP throttle FIRST — before body parsing, DB or bcrypt. 30 failures
    // inside 15 minutes locks the source for 15 minutes.
    const ip = ipFromRequest(req);
    const ipGate = gateIp(ip);
    if (!ipGate.allowed) {
      return fail(429, "Too many failed login attempts. Try again later.", {
        retryAfterSec: ipGate.retryAfterSec,
      });
    }

    const body = await req.json().catch(() => null);
    const email = String(body?.email ?? "").trim().toLowerCase();
    const password = String(body?.password ?? "");

    if (!email || !password) {
      return fail(400, "Email and password are required");
    }

    // Per-account lockout gate — still before any DB/bcrypt work.
    const gate = gateAttempt(email);
    if (!gate.allowed) {
      return fail(429, "Too many failed login attempts. Try again later.", {
        retryAfterSec: gate.retryAfterSec,
      });
    }

    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      registerFailure(email);
      registerIpFailure(ip);
      // Timing parity with the wrong-password path (see DUMMY_HASH).
      await compare(password, DUMMY_HASH);
      return fail(401, "Invalid email or password");
    }

    const match = await compare(password, user.password);
    if (!match) {
      registerFailure(email);
      registerIpFailure(ip);
      return fail(401, "Invalid email or password");
    }

    // Checked AFTER the password matches: an unauthenticated caller must not
    // be able to distinguish "deactivated account" from "no account" — that
    // would re-open the enumeration oracle this route just removed.
    if (!user.isActive) {
      return fail(403, "Your account has been deactivated. Contact your admin.");
    }

    // Success — reset both failure budgets.
    clearFailures(email);
    clearIpFailures(ip);

    const token = createDesktopToken({
      sub: user.id,
      email: user.email,
      name: user.name,
      // Revocation seed: requireDesktopStudent compares this against the row
      // on EVERY request, so a password change (tokenVersion bump) kills the
      // token immediately.
      jv: user.tokenVersion ?? 0,
    });

    return json({ token, user: safeProfile(user) });
  } catch (e) {
    console.error("[desktop/login]", e);
    return fail(500, "Login failed — unexpected server error");
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}
