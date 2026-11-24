import React from "react";

/**
 * Tailwind-only skeletons shared by the /student/* route loading.tsx files.
 * shadcn-style Skeleton (animate-pulse, no spinners).
 *
 * SYNC RULE: every composite mirrors its page's real content structure
 * 1:1 (same spacing, same card geometry, same section order) so navigation
 * never shifts the layout when real content arrives. Pages render their
 * title in the TOP BAR via TopbarTitle — the content area has no title
 * heading, so composites contain no in-content title skeleton (the top
 * bar slot is covered by TopbarTitleSkeleton).
 */

import { TopbarTitleSkeleton } from "@/components/student-role/topbar-title-skeleton";

export function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-primary/10 ${className ?? ""}`} />;
}

/** Shared page wrapper matching the student pages' admin-style spacing. */
function PageShell({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="flex h-full w-full flex-1 flex-col gap-6 p-4 pb-8 md:p-8">
      {title ? <TopbarTitleSkeleton /> : null}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dashboard — mirrors the new dashboard page structure                */
/* ------------------------------------------------------------------ */

function CardShell({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div aria-hidden className={`rounded-md border bg-card shadow-md ${className ?? ""}`}>
      {children}
    </div>
  );
}

/** Welcome banner block skeleton. */
function WelcomeSkeleton() {
  return (
    <CardShell className="relative overflow-hidden">
      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-col gap-2.5">
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-7 w-72 max-w-full" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-28 rounded-full" />
          <Skeleton className="h-10 w-44 rounded-md" />
        </div>
      </div>
    </CardShell>
  );
}

/** Stat card — icon tile + value + label (+ sub line). */
function StatCardSkeleton() {
  return (
    <CardShell className="flex items-center gap-5 p-6">
      <Skeleton className="h-14 w-14 rounded-md" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-7 w-10" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </CardShell>
  );
}

/** Chart panel skeleton (shadcn Card with header lines + plot block). */
function PanelSkeleton({ plotClass }: { plotClass: string }) {
  return (
    <div aria-hidden className="flex w-full flex-col gap-6 rounded-xl border bg-card py-6">
      <div className="flex flex-col gap-1.5 px-6">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-3 w-56" />
      </div>
      <div className="px-6">
        <Skeleton className={plotClass} />
      </div>
    </div>
  );
}

/** Calendar block — header + weekday row + day grid (matches the real card). */
export function CalendarSkeleton() {
  return (
    <CardShell className="w-full p-4">
      <div className="flex flex-row items-center gap-2 w-full p-2 pb-4">
        <Skeleton className="h-11 flex-1" />
        <Skeleton className="h-10 w-12" />
        <Skeleton className="h-10 w-12" />
      </div>
      <div className="grid grid-cols-7 gap-1 w-full">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-8" />
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1 w-full">
        {Array.from({ length: 28 }).map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    </CardShell>
  );
}

/** Right-column list rows (upcoming assessments). */
function ListRowSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-md border p-3">
      <div className="min-w-0 flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-3/5" />
        <Skeleton className="h-3 w-2/5" />
        <Skeleton className="mt-1.5 h-3 w-1/2" />
      </div>
    </div>
  );
}

/**
 * Dashboard: welcome banner → 4 stat cards → calendar+list row →
 * chart+streak row → progress+donut row. Mirrors dashboard/page.tsx.
 */
export function DashboardSkeleton() {
  return (
    <PageShell title>
      <WelcomeSkeleton />

      <section aria-hidden className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </section>

      <section aria-hidden className="grid w-full gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <CalendarSkeleton />
        </div>
        <div className="flex w-full flex-col gap-6 rounded-xl border bg-card py-6">
          <div className="flex flex-col gap-1.5 px-6">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-3 w-52" />
          </div>
          <div className="flex flex-col gap-3 px-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <ListRowSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      <section aria-hidden className="grid w-full gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <PanelSkeleton plotClass="h-[240px] w-full" />
        </div>
        <div className="flex w-full flex-col gap-5 rounded-xl border bg-card py-6">
          <div className="flex flex-col gap-1.5 px-6">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-56" />
          </div>
          <div className="grid grid-cols-2 gap-3 px-6">
            <Skeleton className="h-[72px] rounded-md" />
            <Skeleton className="h-[72px] rounded-md" />
          </div>
          <div className="grid grid-cols-15 gap-[3px] px-6">
            {Array.from({ length: 105 }).map((_, i) => (
              <Skeleton key={i} className="h-3.5 w-full rounded-[3px]" />
            ))}
          </div>
        </div>
      </section>

      <section aria-hidden className="grid w-full gap-6 xl:grid-cols-2">
        <PanelSkeleton plotClass="h-[180px] w-full" />
        <PanelSkeleton plotClass="h-[180px] w-full" />
      </section>
    </PageShell>
  );
}

/* ------------------------------------------------------------------ */
/* Courses — mirrors the re-implemented CourseCard                     */
/* ------------------------------------------------------------------ */

/** Course card skeleton — header band, date tiles, progress, CTA footer. */
function CourseCardSkeleton() {
  return (
    <CardShell className="flex h-full flex-col overflow-hidden">
      {/* Header band */}
      <div className="flex flex-row items-center gap-4 border-b p-5">
        <Skeleton className="h-12 w-12 rounded-md" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-3 w-2/5" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      {/* Date tiles */}
      <div className="grid grid-cols-2 divide-x border-b">
        <div className="flex items-center gap-3 px-5 py-4">
          <Skeleton className="h-9 w-9 rounded-md" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <div className="flex items-center gap-3 px-5 py-4">
          <Skeleton className="h-9 w-9 rounded-md" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
      {/* Progress */}
      <div className="flex flex-col gap-2 p-5">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-4 w-10" />
        </div>
        <Skeleton className="h-2 w-full" />
      </div>
      {/* CTA footer */}
      <div className="mt-auto border-t px-5 py-3">
        <Skeleton className="h-4 w-36" />
      </div>
    </CardShell>
  );
}

/** Assessments card skeleton — accent strip, header, stats, chips, pill. */
function AssessmentCardSkeleton() {
  return (
    <CardShell className="flex h-full flex-col overflow-hidden">
      <Skeleton className="h-1 w-full rounded-none" />
      {/* Header */}
      <div className="flex items-center gap-3 border-b p-5">
        <Skeleton className="h-12 w-12 rounded-md" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-3 w-2/5" />
        </div>
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
      {/* Schedule stats — date row + time/duration row */}
      <div className="grid grid-cols-2 gap-3 border-b p-5">
        <div className="col-span-2 flex items-center gap-2.5">
          <Skeleton className="h-8 w-8 rounded-md" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-2.5 w-10" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <Skeleton className="h-8 w-8 rounded-md" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-2.5 w-10" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
      {/* Composition chips */}
      <div className="flex flex-wrap gap-2 p-5">
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-32 rounded-full" />
      </div>
      {/* Status footer */}
      <div className="mt-auto border-t p-5 pt-4">
        <Skeleton className="h-9 w-full rounded-sm" />
      </div>
    </CardShell>
  );
}

/** Courses page: grid of course-card skeletons. */
export function CourseGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <PageShell title>
      <div className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    </PageShell>
  );
}

/** Assessments page: grid of assessment-card skeletons. */
export function AssessmentGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <PageShell title>
      <div className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <AssessmentCardSkeleton key={i} />
        ))}
      </div>
    </PageShell>
  );
}

/** Generic /student fallback — same as courses grid. */
export const CardGridSkeleton = CourseGridSkeleton;

/* ------------------------------------------------------------------ */
/* Settings — profile banner + details card (admin pattern)            */
/* ------------------------------------------------------------------ */

export function ProfileSkeleton() {
  return (
    <PageShell title>
      <div className="overflow-hidden rounded-lg border bg-card">
        <div className="h-20 w-full rounded-t-lg bg-gradient-to-r from-purple-500 to-fuchsia-600" />
        <div className="p-6 pb-6">
          <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end">
            <Skeleton className="h-20 w-20 rounded-full border-4 border-white dark:border-card" />
            <div className="flex flex-1 flex-col gap-2 sm:pb-1">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:flex-shrink-0">
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg border bg-card p-6">
        <Skeleton className="h-5 w-44" />
        <div className="mt-4 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-md" />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
