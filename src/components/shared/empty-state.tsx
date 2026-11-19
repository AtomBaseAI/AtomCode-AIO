// AtomCode — shared empty state used across admin / staff / super admin
// analytics surfaces (results pages, dashboard & revenue charts, data tables).
// Renders the undraw "no data" illustration (public/no-data.svg) with an
// optional title + description. Purely presentational: safe in both server
// and client components.

import { cn } from "@/lib/utils";

type EmptyStateProps = {
  /** Short headline, e.g. "No Courses Available !" */
  title: string;
  /** Optional supporting line shown under the title. */
  description?: string;
  /** Compact variant fits inside chart cards (240px) and table cells. */
  compact?: boolean;
  /** Extra classes for the outer wrapper (later classes win via twMerge). */
  className?: string;
  /** Override the illustration height, e.g. "h-16" inside table cells. */
  imageClassName?: string;
};

export function EmptyState({
  title,
  description,
  compact = false,
  className,
  imageClassName,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center justify-center gap-1 text-center",
        compact ? "h-[240px] gap-2" : "min-h-[400px] py-10 gap-3",
        className,
      )}
    >
      <img
        src="/no-data.svg"
        alt=""
        aria-hidden
        draggable={false}
        className={cn(
          "w-auto select-none",
          compact ? "h-28" : "h-44 md:h-52",
          imageClassName,
        )}
      />
      <p
        className={cn(
          "font-medium",
          compact ? "text-sm" : "text-base md:text-lg",
        )}
      >
        {title}
      </p>
      {description ? (
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

export default EmptyState;
