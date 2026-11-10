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

/** Desktop (Electron) API — authenticates via Bearer tokens per route. */
export const desktopApiPrefix = "/api/desktop";

export const ROLE_HOME: Record<string, string> = {
  admin: "/admin/dashboard",
  staff: "/staff/dashboard",
  user: "/student/dashboard",
};

export function roleHome(role?: string | null): string {
  return ROLE_HOME[role ?? ""] ?? "/login";
}
