import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { CredentialsSignin } from "next-auth";
import { compare } from "bcrypt-ts";
import { LoginSchema } from "@/schemas/auth-schema";
import { db } from "@/lib/db";
import { authConfig } from "@/auth.config";
import { getSuperAdminAuthCode } from "@/lib/superadmin-settings";
import {
  gateAttempt,
  registerFailure,
  clearFailures,
  LOGIN_MAX_FAILURES,
  LOGIN_LOCKOUT_MINUTES,
} from "@/lib/login-rate-limit";

/**
 * Auth.js (next-auth v5) node instance — the single sign-in authority.
 *
 * Architecture (see src/auth.config.ts for the split):
 *   ...authConfig  → edge-safe core (session/jwt callbacks, pages, secret)
 *   providers      → Credentials only (Prisma + bcrypt live here, node only)
 *
 * authorize() is the single choke point for EVERY credentials sign-in —
 * the login server action and direct /api/auth/callback POSTs both land
 * here — so validation, lockout, password verification and the isActive
 * policy cannot be bypassed by choosing a different door.
 *
 * Typed sign-in failures: subclasses of CredentialsSignin carry a stable
 * `code` that the login action maps to human copy. They intentionally
 * extend AuthError so existing catch blocks keep working.
 */

class InvalidCredentialsError extends CredentialsSignin {
  code = "invalid-credentials";
}

class AccountDisabledError extends CredentialsSignin {
  code = "account-disabled";
}

class RateLimitedError extends CredentialsSignin {
  code = "rate-limited";
}

/** Super admin signed in with valid credentials but a wrong/missing auth code. */
class InvalidAuthCodeError extends CredentialsSignin {
  code = "invalid-auth-code";
}

export const LOGIN_ERRORS: Record<string, string> = {
  "invalid-credentials": "Invalid Credentials",
  "account-disabled": "This account has been disabled. Contact your administrator.",
  "rate-limited": `Too many failed attempts. Try again in ${LOGIN_LOCKOUT_MINUTES} minutes.`,
  "invalid-auth-code": "Invalid auth code",
};

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: { email: {}, password: {}, code: {} },
      async authorize(credentials) {
        const parsed = LoginSchema.safeParse(credentials);
        if (!parsed.success) throw new InvalidCredentialsError();
        const { email, password, code } = parsed.data;

        // 1. Lockout gate — rejected attempts never touch the DB or bcrypt.
        const gate = gateAttempt(email);
        if (!gate.allowed) throw new RateLimitedError();

        // 2. One parallel round-trip instead of four sequential lookups
        //    (admin → superadmin → staff → student). Precedence decides which
        //    account the email refers to when it exists in more than one table.
        const [admin, superAdmin, staff, user] = await Promise.all([
          db.admin.findUnique({ where: { email } }),
          db.superAdmin.findUnique({ where: { email } }),
          db.staff.findUnique({ where: { email } }),
          db.user.findUnique({ where: { email } }),
        ]);

        const candidate =
          admin ?? superAdmin ?? staff ?? user ?? null;

        if (!candidate) {
          registerFailure(email);
          throw new InvalidCredentialsError();
        }

        // 3. Password verification — the only bcrypt compare per attempt.
        const match = await compare(password, candidate.password);
        if (!match) {
          registerFailure(email);
          throw new InvalidCredentialsError();
        }

        // 4. Super admin second factor — the static 4-digit auth code.
        //    Checked HERE (not just in the login action) so direct POSTs to
        //    /api/auth/callback can never bypass the code step.
        if (superAdmin) {
          const expected = await getSuperAdminAuthCode();
          if (!code || code !== expected) {
            registerFailure(email);
            throw new InvalidAuthCodeError();
          }
        }

        // 5. Student activation policy (Admin/Staff have no isActive flag).
        if ("isActive" in candidate && candidate.isActive === false) {
          registerFailure(email);
          throw new AccountDisabledError();
        }

        // 6. Success — clear the failure budget and issue the session.
        clearFailures(email);

        const role = admin
          ? "admin"
          : superAdmin
            ? "superadmin"
            : staff
              ? "staff"
              : "user";
        return {
          id: candidate.id,
          name: candidate.name,
          email: candidate.email,
          image: candidate.image,
          role,
        };
      },
    }),
  ],
});
