import type { NextAuthConfig } from "next-auth";
import { resolveAuthSecret } from "@/lib/auth-secret";

/**
 * Edge-safe Auth.js base config — the shared core of the two NextAuth
 * instances:
 *
 *   - src/auth.ts     (node runtime): full instance + Credentials provider
 *                     with Prisma/bcrypt — used by auth(), signIn(), the
 *                     /api/auth/* route handlers and every server component
 *                     or route handler that calls auth().
 *   - src/proxy.ts    (edge runtime): Next 16 proxy guard built from THIS
 *                     file only — it must never import Prisma, bcrypt or
 *                     any Node-only module, or the edge bundle breaks.
 *
 * This file therefore contains only pure callbacks and static options.
 * Session strategy is JWT: no session table, no DB round-trip per request —
 * the cookie IS the session, verified by signature alone.
 */

export type AtomRole = "admin" | "staff" | "user" | "superadmin";

export const authConfig = {
  secret: resolveAuthSecret(),
  trustHost: true,

  // Edge instance verifies sessions only — no providers here. NextAuth
  // maps over this array at init, so it must exist (hence the explicit []).
  providers: [],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    /**
     * Stamp the role and the token version at sign-in time (authorize()
     * returns them on the user object). Both are frozen into the JWT — no
     * DB lookups needed to know a caller's role for the life of the session.
     * `jv` is the row's tokenVersion at sign-in; guards compare it against
     * the live row (assertSessionValid) to revoke deleted/deactivated users
     * and sessions issued before a password change.
     */
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = (user as { role?: AtomRole }).role;
        token.picture = user.image ?? token.picture;
        // Missing tokenVersion (legacy rows) → 0, matching assertSessionValid's
        // legacy-session rule (undefined jv is treated as 0 there too).
        token.jv = (user as { tokenVersion?: number }).tokenVersion ?? 0;
      }
      // Profile self-updates (unstable_update in the settings action) merge
      // the fresh name/email into the JWT so the UI reflects them without
      // forcing a re-login.
      if (trigger === "update" && session) {
        const patch = session as { name?: string; email?: string };
        if (patch.name) token.name = patch.name;
        if (patch.email) token.email = patch.email;
      }
      return token;
    },

    /**
     * Expose id (from token.sub), role and jv (token version) on session.user
     * — the shape every guard in the app consumes (proxy, action-guards,
     * api-admin-guard…). Guards read session.user.jv to re-check revocation.
     */
    async session({ token, session }) {
      if (token.sub && session.user) session.user.id = token.sub;
      if (token.role && session.user) session.user.role = token.role as AtomRole;
      if (session.user) session.user.jv = (token as { jv?: number }).jv ?? 0;
      return session;
    },
  },
} satisfies NextAuthConfig;
