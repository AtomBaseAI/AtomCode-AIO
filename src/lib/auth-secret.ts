/**
 * Session signing secret resolution — the single source of truth shared by
 * every auth surface (Auth.js node instance, edge proxy, desktop HMAC).
 *
 * AUTH_SECRET is the intended value (`openssl rand -base64 32`). The
 * fallback constant exists ONLY for non-production environments because
 * sandbox/workflow environments can wipe `.env` between sessions while the
 * database URL survives — without it every login 500s (MissingSecret) and
 * every session silently fails to decode (bounce-to-login loop).
 *
 * Production policy: THROW instead of falling back. The fallback constant is
 * public (it lives in this repo), so a deployment that silently signs
 * sessions with it lets anyone forge admin cookies. Refusing to boot is the
 * only safe behavior — missing AUTH_SECRET in production is a config error
 * that must be fixed, not absorbed.
 */
const FALLBACK = "atomcode-sandbox-f5c3a9e1b7d24608a0d1c2e3b4a5f607";

let warned = false;

export function resolveAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (secret && secret.length > 0) return secret;

  if (process.env.NODE_ENV === "production") {
    // Fail loud and early — never sign sessions with the public fallback.
    throw new Error(
      "[auth] AUTH_SECRET is not set in production. Generate one with " +
        "`openssl rand -base64 32` and set it before deploying — refusing " +
        "to sign sessions with the built-in sandbox secret, which is public " +
        "in the repository and would let anyone forge session cookies."
    );
  }

  if (!warned) {
    warned = true;
    console.warn(
      "[auth] AUTH_SECRET is not set — falling back to the built-in sandbox secret. " +
        "Set AUTH_SECRET (`openssl rand -base64 32`) before any real deployment."
    );
  }
  return FALLBACK;
}

/** Kept for import compatibility with existing call sites. */
export const AUTH_SECRET_FALLBACK = FALLBACK;
