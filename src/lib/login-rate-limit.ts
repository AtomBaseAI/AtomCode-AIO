/**
 * Login rate limiting — brute-force protection for credentials sign-in.
 *
 * Design: fixed-window failure counters held in process memory (Map), keyed
 * two ways off the SAME store:
 *   - per-account: lowercased email (gateAttempt/registerFailure/clearFailures)
 *   - per-source : "ip:<ip>" (gateIp/registerIpFailure/clearIpFailures)
 *
 * One choke point inside the Credentials authorize() callback and the
 * desktop login route covers BOTH entry paths, and crucially short-circuits
 * BEFORE any DB lookup or bcrypt compare, so a lockout costs ~0 CPU.
 *
 * Deliberately in-memory: no external store, survives per server instance,
 * clears on restart (acceptable — the goal is slowing online brute force,
 * not forensic accounting). Sweeps itself lazily on write; no timers.
 */

const MAX_FAILURES = 5; // per-account attempts before lockout
const IP_MAX_FAILURES = 30; // per-IP failures before the IP is locked
const WINDOW_MS = 15 * 60 * 1000; // failure window (15 min)
const LOCKOUT_MS = 15 * 60 * 1000; // lockout duration once locked
const SWEEP_THRESHOLD = 512; // lazy sweep trigger (Map size)
const IP_KEY_PREFIX = "ip:"; // namespaces IP keys inside the shared store

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

function ipKeyOf(ip: string): string {
  return IP_KEY_PREFIX + ip;
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
  return gateKey(keyOf(email));
}

/**
 * Per-IP gate — mirrors gateAttempt for source addresses. Use BEFORE any
 * DB/bcrypt work so a distributed attack pays (almost) nothing per attempt.
 * The lockout is 15 minutes after 30 failures inside a 15-minute window.
 */
export function gateIp(ip: string): AttemptGate {
  return gateKey(ipKeyOf(ip));
}

function gateKey(key: string): AttemptGate {
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
  recordKeyFailure(keyOf(email), MAX_FAILURES);
}

/**
 * Record a failed authentication for a source IP. Locks the IP when
 * IP_MAX_FAILURES failures accumulate within WINDOW_MS.
 */
export function registerIpFailure(ip: string): void {
  recordKeyFailure(ipKeyOf(ip), IP_MAX_FAILURES);
}

function recordKeyFailure(key: string, maxFailures: number): void {
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
  if (entry.failures >= maxFailures) {
    entry.lockedUntil = now + LOCKOUT_MS;
  }
}

/** Clear all failures for the email — called on successful sign-in. */
export function clearFailures(email: string): void {
  store.delete(keyOf(email));
}

/** Clear the failure budget for a source IP — called on successful sign-in. */
export function clearIpFailures(ip: string): void {
  store.delete(ipKeyOf(ip));
}

/**
 * Best-effort client IP from proxy headers — first value of
 * x-forwarded-for (the originating client, per de-facto proxy convention),
 * or "unknown" when the header is absent. Multi-hop chains ("client, proxy1,
 * proxy2") deliberately use the FIRST entry; without a trusted-proxy stack
 * this is spoofable, so treat it as a throttle key, not an identity.
 */
export function ipFromRequest(
  req?: Request | { headers?: Headers } | null
): string {
  const forwarded = req?.headers?.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || "unknown";
}

/** Max failures that trigger a lockout — exported for message copy. */
export const LOGIN_MAX_FAILURES = MAX_FAILURES;
/** Lockout duration in minutes — exported for message copy. */
export const LOGIN_LOCKOUT_MINUTES = LOCKOUT_MS / 60_000;
