"use client";

// AtomCode — Revenue dashboard charts (super admin only).
// Batch-wise annual billing: collected vs expected per year, the live
// Free/Premium student split, and all-time collected per batch.
// Recharts via the shadcn ChartContainer wrapper, same conventions as
// dashboard-charts.tsx: purple project accent, no blue/indigo, and a
// friendly empty state when there is no billing data yet.

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import { EmptyState } from "@/components/shared/empty-state";
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
import { formatINR, formatINRCompact } from "@/lib/format-inr";
import type { RevenueStats } from "@/data/revenue";

// Same palette family as the admin dashboard (purple accent project).
const PURPLE = "hsl(271 76% 53%)";
const GREEN = "hsl(160 84% 39%)";
const AMBER = "hsl(38 92% 50%)";
const PINK = "hsl(340 82% 52%)";
const ZINC = "hsl(215 16% 47%)";

function ChartEmpty({ text }: { text: string }) {
  return <EmptyState compact title={text} />;
}

/* ------------------------------------------------------------------ */
/* Revenue by year — grouped bars (collected vs expected)              */
/* ------------------------------------------------------------------ */

const yearConfig = {
  collected: { label: "Collected", color: GREEN },
  expected: { label: "Expected", color: AMBER },
} satisfies ChartConfig;

export function RevenueByYearCard({ stats }: { stats: RevenueStats }) {
  const hasData = stats.byYear.length > 0;
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Revenue by Year</CardTitle>
        <CardDescription>
          Annual batch billing — cash collected vs expected, all billing years
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <ChartContainer config={yearConfig} className="h-[240px] w-full">
            <BarChart accessibilityLayer data={stats.byYear} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={56}
                tickFormatter={(v: number) => formatINRCompact(v)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar dataKey="collected" fill="var(--color-collected)" radius={4} />
              <Bar dataKey="expected" fill="var(--color-expected)" radius={4} />
            </BarChart>
          </ChartContainer>
        ) : (
          <ChartEmpty text="No billing data yet — enable billing on a batch below" />
        )}
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Plan mix — live student split between Premium and Free              */
/* ------------------------------------------------------------------ */

const PLAN_COLORS: Record<string, string> = {
  Premium: PURPLE,
  Free: ZINC,
};

export function PlanMixCard({ stats }: { stats: RevenueStats }) {
  const hasStudents = stats.totalStudents > 0;
  const data = stats.planMix
    .filter((p) => p.students > 0)
    .map((p) => ({ ...p, fill: PLAN_COLORS[p.plan] ?? PURPLE }));
  const premiumShare =
    stats.totalStudents === 0
      ? 0
      : Math.round((stats.premiumStudents / stats.totalStudents) * 100);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Plan Mix</CardTitle>
        <CardDescription>Students on Premium vs Free, live</CardDescription>
      </CardHeader>
      <CardContent>
        {hasStudents && data.length > 0 ? (
          <>
            <ChartContainer config={{}} className="mx-auto aspect-square h-[240px] w-full max-w-[300px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={data}
                  dataKey="students"
                  nameKey="plan"
                  innerRadius={60}
                  strokeWidth={4}
                >
                  {data.map((entry) => (
                    <Cell key={entry.plan} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {data.map((d) => (
                <span key={d.plan} className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: d.fill }} aria-hidden />
                  {d.plan} — {d.students} student(s)
                </span>
              ))}
              <span className="font-medium text-foreground">{premiumShare}% premium</span>
            </div>
          </>
        ) : (
          <ChartEmpty text="No students registered yet" />
        )}
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Revenue by batch — horizontal bars, all-time collected              */
/* ------------------------------------------------------------------ */

const BATCH_COLORS = [PURPLE, GREEN, PINK, AMBER];

export function RevenueByBatchCard({ stats }: { stats: RevenueStats }) {
  const hasData = stats.byBatch.length > 0;
  const data = stats.byBatch.map((b, i) => ({
    ...b,
    fill: BATCH_COLORS[i % BATCH_COLORS.length],
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Revenue by Batch</CardTitle>
        <CardDescription>All-time cash collected per batch</CardDescription>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <ChartContainer config={{}} className="h-[240px] w-full">
            <BarChart
              accessibilityLayer
              data={data}
              layout="vertical"
              margin={{ left: 24, right: 24 }}
            >
              <CartesianGrid horizontal={false} />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: number) => formatINRCompact(v)}
              />
              <YAxis
                dataKey="batch"
                type="category"
                tickLine={false}
                axisLine={false}
                width={80}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
                formatter={(value) => [formatINR(Number(value)), "Collected"]}
              />
              <Bar dataKey="collected" radius={4}>
                {data.map((entry) => (
                  <Cell key={entry.batch} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        ) : (
          <ChartEmpty text="No cash collected yet — mark a batch as collected below" />
        )}
      </CardContent>
    </Card>
  );
}
