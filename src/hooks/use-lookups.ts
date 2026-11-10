"use client";

// Dynamic Batch & Department lookups.
//
// The static arrays exported by data-table-config-data.tsx are the shared
// live store: this hook refreshes them IN PLACE from /api/lookups, so every
// consumer sees the admin-managed values —
//   - data-table column cells / filter functions (read the arrays at call time)
//   - toolbars & forms (call useLookups() → re-render when values land)
//
// While loading (or if the request fails) the arrays keep their built-in
// defaults, so the UI behaves exactly like the previous hard-coded lists.

import { useEffect, useState } from "react";
import { CalendarClock, BookA } from "lucide-react";
import { bathces, departments } from "@/components/data-tables/data-table-config-data";

type Option = { value: string; label?: string };

let started = false;
const listeners = new Set<() => void>();

function applyFetched(
  target: { value: string; label?: string; icon?: unknown }[],
  rows: Option[],
  icon: unknown
) {
  target.splice(
    0,
    target.length,
    ...rows.map((r) => ({
      value: r.value,
      // Faceted filters / selects render `label` — batches store their
      // display string in `value`, so derive the label from it.
      label: r.label ?? r.value,
      icon,
    }))
  );
}

/** Fetch lookups once per page load and refresh the shared arrays in place. */
export async function syncLookups(force = false): Promise<void> {
  if (started && !force) return;
  started = true;
  try {
    const res = await fetch("/api/lookups");
    if (!res.ok) throw new Error("lookup fetch failed");
    const data = (await res.json()) as {
      batches: Option[];
      departments: Option[];
    };
    if (Array.isArray(data.batches)) {
      applyFetched(bathces, data.batches, CalendarClock);
    }
    if (Array.isArray(data.departments)) {
      applyFetched(departments, data.departments, BookA);
    }
    listeners.forEach((l) => l());
  } catch {
    // Keep built-in defaults; allow a retry on the next mount.
    started = false;
  }
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/**
 * Returns the live batch & department option arrays (same references as the
 * static config exports — refreshed in place). Components re-render once the
 * fetched values arrive.
 */
export function useLookups() {
  const [, setVersion] = useState(0);

  useEffect(() => {
    let active = true;
    syncLookups();
    const unsubscribe = subscribe(() => {
      if (active) setVersion((v) => v + 1);
    });
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return { batches: bathces, departments };
}
