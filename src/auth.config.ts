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

export type AtomRole = "admin" | "staff" | "user";

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
     * Stamp the role at sign-in time (authorize() returns it on the user
     * object). The role is frozen into the JWT — no DB lookups needed to
     * know a caller's role for the life of the session.
     */
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: AtomRole }).role;
        token.picture = user.image ?? token.picture;
      }
      return token;
    },

    /**
     * Expose id (from token.sub) and role on session.user — the shape every
     * guard in the app consumes (proxy, action-guards, api-admin-guard…).
     */
    async session({ token, session }) {
      if (token.sub && session.user) session.user.id = token.sub;
      if (token.role && session.user) session.user.role = token.role as AtomRole;
      return session;
    },
  },
} satisfies NextAuthConfig;
