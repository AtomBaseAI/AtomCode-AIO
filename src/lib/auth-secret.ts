/**
 * Session signing secret resolution — the single source of truth shared by
 * every auth surface (Auth.js node instance, edge proxy, desktop HMAC).
 *
 * AUTH_SECRET is the intended value (`openssl rand -base64 32`). The
 * fallback constant exists because sandbox/workflow environments can wipe
 * `.env` between sessions while the database URL survives — without it
 * every login 500s (MissingSecret) and every session silently fails to
 * decode (bounce-to-login loop).
 *
 * The fallback is loud in production: a one-time console.warn so a
 * deployment running on the baked-in secret is impossible to miss.
 */
const FALLBACK = "atomcode-sandbox-f5c3a9e1b7d24608a0d1c2e3b4a5f607";

let warned = false;

export function resolveAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (secret && secret.length > 0) return secret;

  if (!warned && process.env.NODE_ENV === "production") {
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
