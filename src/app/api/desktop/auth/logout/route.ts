import { json, preflight, authGuard } from "@/lib/desktop-auth";

/**
 * POST /api/desktop/auth/logout
 *
 * Bearer tokens are STATELESS: the server keeps no token store, so there is
 * nothing to delete here. Logout = the client discards the token locally.
 * This endpoint exists so the client can confirm the token is still valid
 * and keep the flow symmetrical.
 *
 * Server-side revocation is handled by the tokenVersion mechanism instead:
 * a password change (or any forced-logout flow) calls bumpTokenVersion(),
 * and requireDesktopStudent then rejects every token whose jv no longer
 * matches the row on the very next request — no waiting for the 24h TTL.
 */
export async function POST(req: Request) {
  const { ctx, response } = await authGuard(req);
  if (!ctx) return response;
  return json({
    success: true,
    message: "Logged out — discard the token on the client",
  });
}

export async function OPTIONS() {
  return preflight();
}
