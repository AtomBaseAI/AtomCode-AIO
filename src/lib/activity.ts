import { db } from "@/lib/db";
import { getISTParts } from "@/lib/utils";

/**
 * Daily activity tracking for the student dashboard (streaks / heatmap /
 * activity chart). One UserActivityDay row per user per app-timezone day;
 * `count` increments on every submission event.
 *
 * Never throws — activity logging is a best-effort side effect and must
 * never break a submission. All call sites invoke the `Safe` wrapper as a
 * fire-and-forget promise (no await in the critical path).
 */

export async function recordUserActivity(userId: string): Promise<void> {
  const dayKey = getISTParts(new Date())?.dayKey;
  if (!dayKey) return;

  await db.userActivityDay.upsert({
    where: { userId_dayKey: { userId, dayKey } },
    update: { count: { increment: 1 } },
    create: { userId, dayKey, count: 1 },
  });
}

/** Fire-and-forget wrapper — logs failures, never rejects. */
export function recordUserActivitySafe(userId: string): void {
  recordUserActivity(userId).catch((error) => {
    console.error("[activity] failed to record user activity:", error);
  });
}
