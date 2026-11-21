/**
 * Central route registry (unified app).
 * Original apps had unprefixed paths that collided when merged;
 * every role area now lives under its own prefix.
 *
 * Consumed by src/proxy.ts (edge guard) and the login/logout actions.
 */

/** Routes reachable without a session; logged-in visitors are sent home. */
export const publicRoutes = ["/"];

/** Sign-in surface: logged-in visitors are redirected to their role home. */
export const authRoutes = ["/login", "/register", "/forgot-password"];

/** Auth.js's own endpoints — the proxy never touches them. */
export const apiAuthPrefix = "/api/auth";

/**
 * Public API endpoints reachable without a session (read-only).
 * Currently: batch/department lookups for the pre-login register page.
 */
export const publicApiPrefixes = ["/api/lookups"];

/** Desktop (Electron) API — authenticates via Bearer tokens per route. */
export const desktopApiPrefix = "/api/desktop";

export const ROLE_HOME: Record<string, string> = {
  admin: "/admin/dashboard",
  staff: "/staff/dashboard",
  user: "/student/dashboard",
  superadmin: "/superadmin/dashboard",
};

export function roleHome(role?: string | null): string {
  return ROLE_HOME[role ?? ""] ?? "/login";
}

/**
 * Super-admin-only areas — regular admins, staff and students are bounced
 * to their own dashboards by the proxy. URL separation is symmetric:
 *   - /admin/*        → admins only
 *   - /superadmin/*   → superadmin only
 * A superadmin session hitting /admin/* is canonicalized by the proxy to the
 * mirrored /superadmin/* URL; pages that exist only under /admin/* are then
 * rendered in place through the next.config fallback rewrite, so the super
 * admin browses exclusively under /superadmin/* (native superadmin pages:
 * dashboard, admins, revenue, settings — real files, never rewritten).
 */
export const superAdminOnlyPrefixes = ["/superadmin"];
