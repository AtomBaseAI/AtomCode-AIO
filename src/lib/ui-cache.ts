// AtomCode — tiny server-side TTL cache helper.
//
// Used by hot KV reads (branding/platform settings) that are queried on
// nearly every public request (login, register, layouts) but change rarely.
// Keep-it-simple semantics: cache value + timestamp; a read younger than
// the TTL returns the cached value, otherwise the fetcher runs and the
// result is stored. Failed fetches are NEVER cached, so a transient DB
// error cannot pin stale/empty data for a whole TTL window.
//
// Process-local only (per server instance / per hot-reload module graph) —
// there is no cross-instance coordination, which is fine for a 30s TTL.

export interface TtlCache<T> {
  /** Cached value if fresh, otherwise runs the fetcher and stores it. */
  get: () => Promise<T>;
  /** Drop the cached entry immediately (call after any write). */
  invalidate: () => void;
  /** Reads the raw entry without fetching (for tests/debugging). */
  peek: () => { value: T; at: number } | undefined;
}

export function createServerTtlCache<T>(
  fetcher: () => Promise<T>,
  ttlMs = 30_000
): TtlCache<T> {
  let entry: { value: T; at: number } | undefined;

  return {
    async get(): Promise<T> {
      const now = Date.now();
      if (entry && now - entry.at < ttlMs) {
        return entry.value;
      }
      const value = await fetcher();
      entry = { value, at: Date.now() };
      return value;
    },
    invalidate(): void {
      entry = undefined;
    },
    peek(): { value: T; at: number } | undefined {
      return entry;
    },
  };
}
