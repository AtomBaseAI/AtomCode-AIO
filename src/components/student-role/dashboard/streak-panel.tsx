import { Flame, CalendarCheck, Trophy } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getISTParts } from "@/lib/utils";
import type { StreakInfo } from "@/data/student/dashboard";

/**
 * Streak panel — headline streak numbers + a GitHub-style activity heatmap
 * (15 weeks, columns = weeks Sun→Sat). Server component: the heatmap is a
 * static CSS grid, day cells carry a `title` for the native tooltip.
 *
 * All day math uses UTC-midnight anchors of app-timezone dayKeys (same
 * convention as the dashboard calendar), so the grid lines up with the
 * calendar for every viewer regardless of device timezone.
 */

const UTC_MS = 86400000;
const keyToUtc = (dayKey: string) => new Date(`${dayKey}T00:00:00Z`);
const shiftKey = (dayKey: string, days: number) => {
  const d = keyToUtc(dayKey);
  return new Date(d.getTime() + days * UTC_MS).toISOString().slice(0, 10);
};

const WEEKS = 15;

/** Intensity buckets — purple scale, avoids blue/indigo per project rules. */
function heatClass(count: number | undefined): string {
  if (!count) return "bg-muted";
  if (count <= 2) return "bg-purple-500/25";
  if (count <= 4) return "bg-purple-500/50";
  if (count <= 7) return "bg-purple-500/70";
  return "bg-purple-500";
}

export function StreakPanel({
  streak,
  activityMap,
}: {
  streak: StreakInfo;
  activityMap: Record<string, number>;
}) {
  const todayKey = getISTParts(new Date())?.dayKey ?? "";
  if (!todayKey) return null;

  // The week column containing today, then (WEEKS-1) columns before it.
  const todayDow = keyToUtc(todayKey).getUTCDay(); // 0 = Sunday
  const weekStart = shiftKey(todayKey, -todayDow);

  const columns: { dayKey: string; count: number; future: boolean }[][] = [];
  for (let w = WEEKS - 1; w >= 0; w--) {
    const colStart = shiftKey(weekStart, -w * 7);
    const col: { dayKey: string; count: number; future: boolean }[] = [];
    for (let d = 0; d < 7; d++) {
      const dayKey = shiftKey(colStart, d);
      col.push({
        dayKey,
        count: activityMap[dayKey] ?? 0,
        future: dayKey > todayKey,
      });
    }
    columns.push(col);
  }

  const monthLabels = columns.map((col, i) => {
    const first = col.find((c) => !c.future) ?? col[0];
    const date = keyToUtc(first.dayKey);
    const label = date.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" });
    const prev = columns[i - 1];
    const prevLabel = prev
      ? keyToUtc((prev.find((c) => !c.future) ?? prev[0]).dayKey).toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" })
      : null;
    return { label, show: i === 0 || label !== prevLabel };
  });

  return (
    <Card className="flex h-full w-full min-w-0 flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-amber-500" aria-hidden />
          Streak
        </CardTitle>
        <CardDescription>Practice consistency over the last 15 weeks</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5">
        {/* Headline numbers */}
        <div className="grid w-full grid-cols-2 gap-3">
          <div className="flex items-center gap-3 rounded-md border bg-muted/40 p-3">
            <Flame className="h-7 w-7 flex-shrink-0 text-amber-500" aria-hidden />
            <div className="min-w-0">
              <span className="flex items-center gap-2 text-2xl font-bold leading-tight tabular-nums">
                {streak.current}
                {/* today-status dot avoids a long suffix that would truncate */}
                <span
                  className={`h-2 w-2 rounded-full ${streak.activeToday ? "bg-green-500" : "bg-amber-400 animate-pulse"}`}
                  title={streak.activeToday ? "Practised today" : "Practice today to keep the streak"}
                  aria-label={streak.activeToday ? "Practised today" : "Practice pending today"}
                />
              </span>
              <span className="block text-xs font-medium leading-tight text-muted-foreground">
                Day streak
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-md border bg-muted/40 p-3">
            <Trophy className="h-7 w-7 flex-shrink-0 text-purple-500" aria-hidden />
            <div className="min-w-0">
              <span className="block text-2xl font-bold leading-tight tabular-nums">
                {streak.longest}
              </span>
              <span className="block text-xs font-medium leading-tight text-muted-foreground">
                Longest streak
              </span>
            </div>
          </div>
        </div>

        {/* Heatmap — horizontally scrollable on narrow screens */}
        <div className="w-full overflow-x-auto pb-1">
          <div className="flex min-w-max flex-col gap-1.5">
            <div className="flex gap-[3px]">
              {monthLabels.map((m, i) => (
                <span
                  key={`m-${i}`}
                  className="w-3.5 text-[10px] font-medium text-muted-foreground"
                  aria-hidden
                >
                  {m.show ? m.label : ""}
                </span>
              ))}
            </div>
            <div className="flex gap-[3px]" role="img" aria-label="Practice activity heatmap">
              {columns.map((col, ci) => (
                <div key={`w-${ci}`} className="flex flex-col gap-[3px]">
                  {col.map((cell) =>
                    cell.future ? (
                      <span key={cell.dayKey} className="h-3.5 w-3.5 rounded-[3px] bg-transparent" />
                    ) : (
                      <span
                        key={cell.dayKey}
                        title={`${cell.dayKey} · ${cell.count} submission${cell.count === 1 ? "" : "s"}`}
                        className={`h-3.5 w-3.5 rounded-[3px] ${heatClass(cell.count)}`}
                      />
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend + total */}
        <div className="mt-auto flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarCheck className="h-3.5 w-3.5" aria-hidden />
            {streak.totalActiveDays} active day{streak.totalActiveDays === 1 ? "" : "s"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            Less
            <span className="h-3 w-3 rounded-[3px] bg-muted" aria-hidden />
            <span className="h-3 w-3 rounded-[3px] bg-purple-500/25" aria-hidden />
            <span className="h-3 w-3 rounded-[3px] bg-purple-500/50" aria-hidden />
            <span className="h-3 w-3 rounded-[3px] bg-purple-500/70" aria-hidden />
            <span className="h-3 w-3 rounded-[3px] bg-purple-500" aria-hidden />
            More
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
