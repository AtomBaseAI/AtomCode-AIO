"use server";

import { auth, signIn, LOGIN_ERRORS } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { LoginSchema } from "@/schemas/auth-schema";
import * as z from "zod";
import { redirect } from "next/navigation";
import { roleHome } from "@/routes";
import { db } from "@/lib/db";

/**
 * Role-aware credentials login.
 *
 * Flow: validate → signIn("credentials", { redirect:false }) → read the role
 * from the freshly issued JWT session (auth() with the JWT strategy decodes
 * the cookie — zero DB round-trips) → redirect to the role dashboard.
 *
 * All security policy lives in authorize() (src/auth.ts): validation,
 * lockout, password check, isActive. This action only maps its typed error
 * codes to human copy.
 *
 * redirect:false matters: next-auth v5 resolves its own redirects against
 * x-forwarded-host, which proxied environments can poison with an internal
 * gateway host (observed live: ws-feed-*.fcapp.run). We clear that class of
 * bug by navigating ourselves with relative paths only.
 */
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email/password" };
  }
  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", { email, password, redirect: false });
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      return { error: LOGIN_ERRORS[error.code] ?? "Invalid Credentials" };
    }
    // NEXT_REDIRECT and anything unexpected must keep propagating.
    throw error;
  }

  // Success — the session cookie is set on this action's response; auth()
  // reads it back without touching the database. The fallback only fires if
  // the cookie store somehow isn't visible yet (paranoid path, parallel
  // lookup so it stays fast).
  let role = (await auth())?.user?.role;

  if (!role) {
    const [admin, staff, user] = await Promise.all([
      db.admin.findUnique({ where: { email }, select: { email: true } }),
      db.staff.findUnique({ where: { email }, select: { email: true } }),
      db.user.findUnique({ where: { email }, select: { email: true } }),
    ]);
    role = admin ? "admin" : staff ? "staff" : user ? "user" : undefined;
  }

  // Must stay OUTSIDE try/catch: redirect() intentionally throws
  // NEXT_REDIRECT. Relative path — immune to forwarded-host poisoning.
  redirect(roleHome(role));
};

export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};
