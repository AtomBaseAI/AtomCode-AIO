import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import type { UpcomingAssessment } from "@/data/student/dashboard";

/** Badge styling per assessment status (static classes — Tailwind JIT safe). */
const STATUS_BADGES: Record<string, string> = {
  start: "border-green-500/40 bg-green-500/10 text-green-600 dark:text-green-400",
  resume: "border-green-500/40 bg-green-500/10 text-green-600 dark:text-green-400",
  retake: "border-orange-500/40 bg-orange-500/10 text-orange-600 dark:text-orange-400",
  upcoming: "border-purple-500/40 bg-purple-500/10 text-purple-600 dark:text-purple-400",
};

const STATUS_LABELS: Record<string, string> = {
  start: "Starts today",
  resume: "In progress",
  retake: "Retake open",
  upcoming: "Upcoming",
};

/**
 * Upcoming & live assessments — the next actionable tests across the
 * student's active courses. Clickable when the student can enter now.
 */
export function UpcomingPanel({ assessments }: { assessments: UpcomingAssessment[] }) {
  return (
    <Card className="flex h-full w-full min-w-0 flex-col">
      <CardHeader className="flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>Upcoming Assessments</CardTitle>
          <CardDescription>Next tests in your active courses</CardDescription>
        </div>
        <Link
          href="/student/assessments"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          All
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        {assessments.length === 0 ? (
          <EmptyState compact title="No upcoming assessments" />
        ) : (
          assessments.map((a) => {
            const clickable = ["start", "resume", "retake"].includes(a.status);
            const badgeClass = STATUS_BADGES[a.status] ?? STATUS_BADGES.upcoming;
            const badgeLabel = STATUS_LABELS[a.status] ?? "Upcoming";
            const href = `/student/assessment/${a.courseid}/${a.assessmentid}`;

            const row = (
              <>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold">{a.title}</span>
                    <span
                      className={`inline-flex flex-shrink-0 items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${badgeClass}`}
                    >
                      {badgeLabel}
                    </span>
                  </div>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                    {a.coursetitle}
                  </span>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                      {a.assessmentdate}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      {a.starttime} · {a.maxtime}
                    </span>
                  </div>
                </div>
                {clickable && (
                  <ArrowRight
                    className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden
                  />
                )}
              </>
            );

            const shell =
              "group flex w-full items-center gap-3 rounded-md border p-3 transition-colors hover:border-purple-600 hover:bg-muted/40";

            return clickable ? (
              <Link key={a.assessmentid} href={href} className={shell} aria-label={`Open assessment ${a.title}`}>
                {row}
              </Link>
            ) : (
              <div key={a.assessmentid} className={`${shell} cursor-default`}>
                {row}
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
