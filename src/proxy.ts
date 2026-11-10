import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";
import {
  authRoutes,
  publicRoutes,
  apiAuthPrefix,
  desktopApiPrefix,
  roleHome,
} from "@/routes";

/**
 * Edge request guard — Next.js 16 `proxy` convention (replaces the
 * deprecated src/middleware.ts).
 *
 * Built from NextAuth(authConfig).auth so the session cookie is verified
 * by the SAME core that issues it (src/auth.config.ts is edge-safe: no
 * Prisma, no bcrypt) — no hand-rolled JWT decoding to drift out of sync.
 *
 * Contract:
 *   /api/auth/**      → untouched (Auth.js handlers)
 *   /api/desktop/**   → untouched (routes self-authenticate via Bearer)
 *   /api/**           → 401 JSON when unauthenticated — never a redirect;
 *                       fetch clients (judge transports, admin tables) read
 *                       the status instead of following HTML redirects.
 *                       Authenticated callers pass through; each route
 *                       still enforces role/ownership itself (defense in
 *                       depth: proxy answers "who are you", routes answer
 *                       "may you do this").
 *   /login /register  → auth pages; signed-in visitors go to their role home
 *   /forgot-password
 *   /                 → public; signed-in visitors go to their role home
 *   /admin|/staff|/student → role areas: unauthenticated → /login,
 *                       wrong role → own dashboard
 *   everything else   → requires a session
 */

const ROLE_AREA: Record<string, string[]> = {
  "/admin": ["admin"],
  "/staff": ["staff"],
  "/student": ["user"],
};

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const role = session?.user?.role;

  // 1. Auth.js internals and the desktop Bearer API — never cookie-guarded.
  if (pathname.startsWith(apiAuthPrefix) || pathname.startsWith(desktopApiPrefix)) {
    return NextResponse.next();
  }

  // 2. App API surface — JSON 401, no redirects.
  if (pathname.startsWith("/api/")) {
    if (session) return NextResponse.next();
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  // 3. Sign-in surface — bounce authenticated users to their dashboard.
  if (authRoutes.includes(pathname)) {
    if (session) return NextResponse.redirect(new URL(roleHome(role), req.url));
    return NextResponse.next();
  }

  // 4. Public landing page.
  if (publicRoutes.includes(pathname)) {
    if (session) return NextResponse.redirect(new URL(roleHome(role), req.url));
    return NextResponse.next();
  }

  // 5. Role areas.
  for (const [prefix, allowed] of Object.entries(ROLE_AREA)) {
    if (pathname === prefix || pathname.startsWith(prefix + "/")) {
      if (!session) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      if (!allowed.includes(role ?? "")) {
        return NextResponse.redirect(new URL(roleHome(role), req.url));
      }
      return NextResponse.next();
    }
  }

  // 6. Everything else requires a session.
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
});

export const config = {
  // Pages + API, skipping Next internals and files with extensions
  // (static assets, images, fonts …).
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
