/**
 * Login rate limiting — brute-force protection for credentials sign-in.
 *
 * Design: fixed-window failure counter keyed by lowercased email, held in
 * process memory (Map). One choke point inside the Credentials authorize()
 * callback covers BOTH entry paths — the login server action and direct
 * POSTs to /api/auth/callback/credentials — and, crucially, short-circuits
 * BEFORE any DB lookup or bcrypt compare, so a lockout costs ~0 CPU.
 *
 * Deliberately in-memory: no external store, survives per server instance,
 * clears on restart (acceptable — the goal is slowing online brute force,
 * not forensic accounting). Sweeps itself lazily on write; no timers.
 */

const MAX_FAILURES = 5; // attempts before lockout
const WINDOW_MS = 15 * 60 * 1000; // failure window (15 min)
const LOCKOUT_MS = 15 * 60 * 1000; // lockout duration once locked
const SWEEP_THRESHOLD = 512; // lazy sweep trigger (Map size)

interface Entry {
  failures: number;
  windowStart: number; // ms epoch of current failure window
  lockedUntil: number; // ms epoch; 0 = not locked
}

const store = new Map<string, Entry>();

function sweep(now: number) {
  for (const [key, entry] of store) {
    if (
      entry.lockedUntil < now &&
      now - entry.windowStart > WINDOW_MS
    ) {
      store.delete(key);
    }
  }
}

function keyOf(email: string): string {
  return email.trim().toLowerCase();
}

export interface AttemptGate {
  /** false → the attempt is rejected before authentication runs. */
  allowed: boolean;
  /** Seconds until the lockout lifts (only meaningful when !allowed). */
  retryAfterSec: number;
}

/**
 * Call BEFORE authenticating. Returns { allowed: false } while the email is
 * locked out from prior failures.
 */
export function gateAttempt(email: string): AttemptGate {
  const key = keyOf(email);
  const entry = store.get(key);
  if (!entry) return { allowed: true, retryAfterSec: 0 };

  const now = Date.now();
  if (entry.lockedUntil > now) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((entry.lockedUntil - now) / 1000)),
    };
  }
  return { allowed: true, retryAfterSec: 0 };
}

/**
 * Record a failed authentication. Locks the email when the failure budget
 * (MAX_FAILURES within WINDOW_MS) is exhausted.
 */
export function registerFailure(email: string): void {
  const key = keyOf(email);
  const now = Date.now();

  if (store.size >= SWEEP_THRESHOLD) sweep(now);

  const entry = store.get(key);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    // new window — this failure restarts the budget
    store.set(key, {
      failures: 1,
      windowStart: now,
      lockedUntil: 0,
    });
    return;
  }

  entry.failures += 1;
  if (entry.failures >= MAX_FAILURES) {
    entry.lockedUntil = now + LOCKOUT_MS;
  }
}

/** Clear all failures for the email — called on successful sign-in. */
export function clearFailures(email: string): void {
  store.delete(keyOf(email));
}

/** Max failures that trigger a lockout — exported for message copy. */
export const LOGIN_MAX_FAILURES = MAX_FAILURES;
/** Lockout duration in minutes — exported for message copy. */
export const LOGIN_LOCKOUT_MINUTES = LOCKOUT_MS / 60_000;
