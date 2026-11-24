"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { EmptyState } from "@/components/shared/empty-state";
import type { ActivityPoint } from "@/data/student/dashboard";

const activityConfig = {
  count: { label: "Submissions", color: "hsl(271 76% 53%)" },
} satisfies ChartConfig;

/**
 * Practice activity over the last 30 days — one bar per app-timezone day.
 * Data comes pre-aggregated from getStudentDashboardData (dayKey series,
 * zero-filled), so the chart itself stays a pure presentational component.
 */
export function ActivityChart({ data }: { data: ActivityPoint[] }) {
  const total = data.reduce((sum, d) => sum + d.count, 0);
  const activeDays = data.filter((d) => d.count > 0).length;

  return (
    // min-w-0 + overflow-hidden: grid items default to min-width:auto, so a
    // fixed-width recharts SVG inside would push the card past the viewport
    // on mobile (11px horizontal scroll) — clip it to the track instead.
    <Card className="w-full min-w-0 overflow-hidden">
      <CardHeader>
        <CardTitle>Practice Activity</CardTitle>
        <CardDescription>
          Submissions over the last 30 days · {total} total · {activeDays} active day
          {activeDays === 1 ? "" : "s"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {total === 0 ? (
          <EmptyState compact title="No practice activity yet — solve a question to light it up" />
        ) : (
          <ChartContainer config={activityConfig} className="aspect-auto h-[240px] w-full">
            <BarChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={28}
              />
              <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} maxBarSize={18} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
