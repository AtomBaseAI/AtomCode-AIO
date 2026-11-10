"use client";

// AtomCode — Admin dashboard charts (recharts + shadcn chart wrapper).
// Pure presentational client components: data arrives via props from the
// server page, every chart degrades to a friendly "No data yet" state.

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { Inbox } from "lucide-react";

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
import type { CourseEnrollment, NameCount } from "@/data/dashboard";

// Palette — intentionally avoids blue/indigo (project accent is purple).
const PURPLE = "hsl(271 76% 53%)";
const GREEN = "hsl(160 84% 39%)";
const AMBER = "hsl(38 92% 50%)";
const RED = "hsl(0 84% 60%)";
const TEAL = "hsl(173 80% 40%)";
const ORANGE = "hsl(25 95% 53%)";
const PINK = "hsl(340 82% 52%)";
const YELLOW = "hsl(47 96% 53%)";
const SLATE = "hsl(215 16% 47%)";

const LANGUAGE_COLORS: Record<string, string> = {
  c: TEAL,
  cpp: ORANGE,
  java: PINK,
  python: GREEN,
  sql: AMBER,
  javascript: YELLOW,
  typescript: PURPLE,
  ruby: RED,
};
const FALLBACK_COLORS = [PURPLE, TEAL, ORANGE, PINK, GREEN, AMBER, RED, YELLOW];
const fallbackColor = (i: number) => FALLBACK_COLORS[i % FALLBACK_COLORS.length];

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: GREEN,
  medium: AMBER,
  hard: RED,
};

const STATUS_COLORS: Record<string, string> = {
  passed: GREEN,
  success: GREEN,
  completed: GREEN,
  failed: RED,
  error: RED,
  partial: AMBER,
  pending: SLATE,
};

const truncate = (s: string, max: number) =>
  s.length > max ? `${s.slice(0, max - 1)}…` : s;

/** Shared empty state shown when a metric has no rows yet. */
function ChartEmpty({ text }: { text: string }) {
  return (
    <div className="flex h-[240px] flex-col items-center justify-center gap-2 text-muted-foreground">
      <Inbox className="h-8 w-8 opacity-50" aria-hidden />
      <span className="text-sm">{text}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Questions by language — vertical bars                               */
/* ------------------------------------------------------------------ */

const languageConfig = {
  count: { label: "Questions", color: PURPLE },
} satisfies ChartConfig;

export function QuestionsLanguageBar({ data }: { data: NameCount[] }) {
  const colored = data.map((d, i) => ({
    ...d,
    fill: LANGUAGE_COLORS[d.name.toLowerCase()] ?? fallbackColor(i),
  }));
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Questions by Language</CardTitle>
        <CardDescription>Code questions across all 8 languages</CardDescription>
      </CardHeader>
      <CardContent>
        {colored.length === 0 ? (
          <ChartEmpty text="No code questions yet" />
        ) : (
          <ChartContainer config={languageConfig} className="aspect-auto h-[240px] w-full">
            <BarChart data={colored} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(v: string) => v.toLowerCase()}
              />
              <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={44}>
                {colored.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Difficulty donut with total in the center                           */
/* ------------------------------------------------------------------ */

export function DifficultyDonut({ data }: { data: NameCount[] }) {
  const colored = data.map((d) => ({
    ...d,
    fill: DIFFICULTY_COLORS[d.name.toLowerCase()] ?? SLATE,
  }));
  const total = colored.reduce((sum, d) => sum + d.count, 0);
  return (
    <Card className="w-full flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle>Difficulty Mix</CardTitle>
        <CardDescription>Code questions per difficulty</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {colored.length === 0 ? (
          <ChartEmpty text="No code questions yet" />
        ) : (
          <ChartContainer
            config={{ count: { label: "Questions" } }}
            className="mx-auto aspect-square max-h-[210px]"
          >
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={colored}
                dataKey="count"
                nameKey="name"
                innerRadius={58}
                strokeWidth={5}
              >
                {colored.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      const { cx, cy } = viewBox as { cx: number; cy: number };
                      return (
                        <text
                          x={cx}
                          y={cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan x={cx} y={cy - 8} className="fill-foreground text-2xl font-bold">
                            {total}
                          </tspan>
                          <tspan x={cx} y={cy + 14} className="fill-muted-foreground text-xs">
                            total
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      {colored.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-4 pb-5 pt-3 text-sm">
          {colored.map((d) => (
            <span key={d.name} className="flex items-center gap-1.5 capitalize">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: d.fill }}
                aria-hidden
              />
              {d.name} · {d.count}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Students by department — horizontal bars                            */
/* ------------------------------------------------------------------ */

export function StudentsDepartmentBar({ data }: { data: NameCount[] }) {
  const colored = data.map((d, i) => ({ ...d, fill: fallbackColor(i + 1) }));
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Students by Department</CardTitle>
        <CardDescription>Enrolled students grouped by department</CardDescription>
      </CardHeader>
      <CardContent>
        {colored.length === 0 ? (
          <ChartEmpty text="No students yet" />
        ) : (
          <ChartContainer
            config={{ count: { label: "Students", color: TEAL } }}
            className="aspect-auto h-[240px] w-full"
          >
            <BarChart
              data={colored}
              layout="vertical"
              margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <XAxis type="number" tickLine={false} axisLine={false} allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="name"
                tickLine={false}
                axisLine={false}
                width={80}
                tickFormatter={(v: string) => truncate(v, 10)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={28}>
                {colored.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Course enrollments — horizontal bars + completion in tooltip        */
/* ------------------------------------------------------------------ */

type EnrollmentTooltipProps = {
  active?: boolean;
  payload?: { payload: CourseEnrollment }[];
};

function EnrollmentTooltip({ active, payload }: EnrollmentTooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-md border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="font-medium">{d.name}</p>
      <p className="text-muted-foreground">Students: {d.students}</p>
      <p className="text-muted-foreground">Avg completion: {d.completion}%</p>
    </div>
  );
}

export function CourseEnrollmentBar({ data }: { data: CourseEnrollment[] }) {
  const rows = data.map((d) => ({ ...d, short: truncate(d.name, 14) }));
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Course Enrollments</CardTitle>
        <CardDescription>Students per course · hover for avg completion</CardDescription>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <ChartEmpty text="No enrollments yet" />
        ) : (
          <ChartContainer
            config={{ students: { label: "Students", color: PURPLE } }}
            className="aspect-auto h-[240px] w-full"
          >
            <BarChart
              data={rows}
              layout="vertical"
              margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <XAxis type="number" tickLine={false} axisLine={false} allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="short"
                tickLine={false}
                axisLine={false}
                width={110}
              />
              <ChartTooltip
                cursor={false}
                content={<EnrollmentTooltip />}
              />
              <Bar dataKey="students" radius={[0, 6, 6, 0]} maxBarSize={28} fill={PURPLE} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Practice submission outcomes — donut                                */
/* ------------------------------------------------------------------ */

export function SubmissionStatusDonut({ data }: { data: NameCount[] }) {
  const colored = data.map((d) => ({
    ...d,
    fill: STATUS_COLORS[d.name.toLowerCase()] ?? SLATE,
  }));
  const total = colored.reduce((sum, d) => sum + d.count, 0);
  return (
    <Card className="w-full flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle>Practice Outcomes</CardTitle>
        <CardDescription>Code submission results</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {colored.length === 0 ? (
          <ChartEmpty text="No practice submissions yet" />
        ) : (
          <ChartContainer
            config={{ count: { label: "Submissions" } }}
            className="mx-auto aspect-square max-h-[210px]"
          >
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={colored}
                dataKey="count"
                nameKey="name"
                innerRadius={58}
                strokeWidth={5}
              >
                {colored.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      const { cx, cy } = viewBox as { cx: number; cy: number };
                      return (
                        <text
                          x={cx}
                          y={cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan x={cx} y={cy - 8} className="fill-foreground text-2xl font-bold">
                            {total}
                          </tspan>
                          <tspan x={cx} y={cy + 14} className="fill-muted-foreground text-xs">
                            total
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      {colored.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-4 pb-5 pt-3 text-sm">
          {colored.map((d) => (
            <span key={d.name} className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: d.fill }}
                aria-hidden
              />
              {d.name} · {d.count}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Assessment participation — horizontal bars                          */
/* ------------------------------------------------------------------ */

export function AssessmentParticipationBar({ data }: { data: NameCount[] }) {
  const rows = data.map((d) => ({ ...d, short: truncate(d.name, 14) }));
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Assessment Participation</CardTitle>
        <CardDescription>Attempts per assessment</CardDescription>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <ChartEmpty text="No assessment attempts yet" />
        ) : (
          <ChartContainer
            config={{ count: { label: "Attempts", color: ORANGE } }}
            className="aspect-auto h-[240px] w-full"
          >
            <BarChart
              data={rows}
              layout="vertical"
              margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <XAxis type="number" tickLine={false} axisLine={false} allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="short"
                tickLine={false}
                axisLine={false}
                width={110}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={28} fill={ORANGE} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
