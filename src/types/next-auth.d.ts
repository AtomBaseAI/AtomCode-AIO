import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "admin" | "staff" | "user" | "superadmin";
      /**
       * Token version frozen into the JWT at sign-in (0 = legacy session).
       * Guards pass it to assertSessionValid() to detect revoked sessions.
       */
      jv?: number;
    } & DefaultSession["user"];
  }

  interface User {
    role?: "admin" | "staff" | "user" | "superadmin";
    /**
     * authorize() returns the Prisma row's tokenVersion so the jwt callback
     * can stamp it as `jv` in the token.
     */
    tokenVersion?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "admin" | "staff" | "user" | "superadmin";
    /** Token version captured at sign-in (0 = pre-revocation legacy). */
    jv?: number;
  }
}
