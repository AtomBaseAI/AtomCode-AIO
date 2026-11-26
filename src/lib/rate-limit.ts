/**
 * Generic in-memory quota / rate limiting — execution + AI budgets.
 *
 * Contract (shared by /api/execute/*, /api/desktop/* and lib/question-judge):
 *
 *   consumeQuota(bucket, id, { perMinute?, perDay? }) → { allowed, retryAfterSec }
 *
 * Design (mirrors login-rate-limit.ts style):
 *   - fixed-window counters held in process memory, keyed `${bucket}:${id}`
 *     (id = userId) with a window index / UTC date suffix per dimension;
 *   - allowed only when within BOTH the perMinute and the perDay budget;
 *   - counters are consumed (incremented) ONLY when the call is allowed —
 *     a denied call does not burn budget;
 *   - lazy self-sweep on write when the store grows past a threshold;
 *     no timers, no external store, resets on restart (acceptable — the
 *     goal is bounding server load, not forensic accounting).
 */

const MINUTE_MS = 60_000;
const SWEEP_THRESHOLD = 1024; // lazy sweep trigger (Map size)

export interface QuotaOpts {
  /** Max allowed calls per rolling fixed minute window. */
  perMinute?: number;
  /** Max allowed calls per UTC calendar day. */
  perDay?: number;
}

export interface QuotaResult {
  /** false → the caller must back off; response should be HTTP 429. */
  allowed: boolean;
  /** Seconds until the binding window resets (only meaningful when !allowed). */
  retryAfterSec: number;
}

interface WindowEntry {
  count: number;
  /** ms epoch when this window expires and may be discarded. */
  expiresAt: number;
}

const store = new Map<string, WindowEntry>();

function sweep(now: number) {
  for (const [key, entry] of store) {
    if (entry.expiresAt <= now) store.delete(key);
  }
}

/** Current count within the window that contains `now` (0 when expired). */
function peek(key: string, now: number): number {
  const entry = store.get(key);
  if (!entry || entry.expiresAt <= now) return 0;
  return entry.count;
}

/** Increment the window counter, (re)starting the window when expired. */
function bump(key: string, now: number, expiresAt: number): void {
  const entry = store.get(key);
  if (!entry || entry.expiresAt <= now) {
    store.set(key, { count: 1, expiresAt });
    return;
  }
  entry.count += 1;
}

/** UTC calendar day key, e.g. "2025-01-31". */
function utcDayKey(now: number): string {
  return new Date(now).toISOString().slice(0, 10);
}

/** ms epoch of the next UTC midnight (end of the current UTC day window). */
function nextUtcMidnight(now: number): number {
  const day = utcDayKey(now);
  return Date.parse(`${day}T00:00:00.000Z`) + 24 * 60 * 60 * 1000;
}

/**
 * Consume one unit from both the per-minute and per-day budget for
 * `${bucket}:${id}`. Returns { allowed: true } (and increments the
 * counters) only when both budgets still have headroom.
 */
export function consumeQuota(
  bucket: string,
  id: string,
  opts: QuotaOpts
): QuotaResult {
  const now = Date.now();
  if (store.size >= SWEEP_THRESHOLD) sweep(now);

  const perMinute = opts.perMinute;
  const perDay = opts.perDay;

  // Minute window: fixed window keyed by the minute index.
  const minuteIndex = Math.floor(now / MINUTE_MS);
  const minuteKey = `${bucket}:${id}:m:${minuteIndex}`;
  const minuteResetSec = Math.max(
    1,
    Math.ceil(((minuteIndex + 1) * MINUTE_MS - now) / 1000)
  );

  // Day window: fixed window keyed by the UTC calendar date.
  const dayKey = `${bucket}:${id}:d:${utcDayKey(now)}`;
  const dayResetSec = Math.max(
    1,
    Math.ceil((nextUtcMidnight(now) - now) / 1000)
  );

  // Check BOTH budgets first — a denial consumes nothing.
  let denied = false;
  let retryAfterSec = 0;

  if (perMinute !== undefined && perMinute > 0 && peek(minuteKey, now) >= perMinute) {
    denied = true;
    retryAfterSec = minuteResetSec;
  }
  if (perDay !== undefined && perDay > 0 && peek(dayKey, now) >= perDay) {
    denied = true;
    retryAfterSec = Math.max(retryAfterSec, dayResetSec);
  }
  if (denied) {
    return { allowed: false, retryAfterSec };
  }

  if (perMinute !== undefined && perMinute > 0) {
    bump(minuteKey, now, (minuteIndex + 1) * MINUTE_MS);
  }
  if (perDay !== undefined && perDay > 0) {
    bump(dayKey, now, nextUtcMidnight(now));
  }

  return { allowed: true, retryAfterSec: 0 };
}
