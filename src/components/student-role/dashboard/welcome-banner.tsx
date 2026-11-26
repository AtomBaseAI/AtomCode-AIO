import Link from "next/link";
import { ArrowRight, Flame, BookOpen } from "lucide-react";
import { getISTParts, formatDate } from "@/lib/utils";

/**
 * Welcome strip at the top of the student dashboard — time-of-day greeting,
 * today's date (app timezone) and a "Resume learning" CTA into the first
 * active course. Purely presentational: all data arrives via props.
 */
export function WelcomeBanner({
  name,
  activeCourses,
  streak,
  resumeHref,
}: {
  name: string;
  activeCourses: number;
  streak: number;
  resumeHref: string;
}) {
  const hour = getISTParts(new Date())?.hour ?? 0;
  const greeting =
    hour < 5 ? "Burning the midnight oil" : hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const today = formatDate(new Date());

  const firstName = name?.trim().split(/\s+/)[0] || "Student";

  return (
    <section
      aria-label="Welcome"
      className="relative overflow-hidden rounded-md border bg-card shadow-md"
    >
      {/* Purple wash — subtle, keeps text readable in both themes. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent"
      />
      <div className="relative flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">
            {greeting}, <span className="font-semibold text-foreground">{firstName}</span> · {today}
          </p>
          <h1 className="mt-1 truncate text-2xl font-bold tracking-tight">
            {activeCourses > 0 ? "Ready to keep the streak going?" : "Welcome to AtomCode"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {activeCourses > 0
              ? `You have ${activeCourses} active course${activeCourses > 1 ? "s" : ""} — pick up right where you left off.`
              : "Enroll in a course to start your coding journey."}
          </p>
        </div>

        <div className="flex flex-shrink-0 flex-wrap items-center gap-3">
          {streak > 0 && (
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400"
              title={`Current streak: ${streak} day${streak > 1 ? "s" : ""}`}
            >
              <Flame className="h-4 w-4" aria-hidden />
              {streak}-day streak
            </span>
          )}
          <Link
            href={resumeHref}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow transition-opacity hover:opacity-90"
          >
            <BookOpen className="h-4 w-4" aria-hidden />
            {activeCourses > 0 ? "Resume learning" : "Browse courses"}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
