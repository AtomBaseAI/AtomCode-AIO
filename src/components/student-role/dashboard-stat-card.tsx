"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

interface StatCardProps {
  /** Pre-rendered icon element (ReactNode) — component FUNCTIONS cannot
   * cross the server-to-client RSC boundary, elements can. */
  icon: ReactNode;
  value: string | number;
  label: string;
  /** Small secondary line under the label (e.g. "Practised today"). */
  sub?: string;
  /** Tailwind text/bg utility colors for the icon tile. */
  tone?: "purple" | "green" | "amber" | "teal";
  /** Optional link — the whole card becomes clickable. */
  href?: string;
}

/**
 * Dashboard stat card — mirrors the admin dashboard StatCard markup
 * (rounded-md border bg-card p-6, 14×14 icon tile, gap-5) so the student
 * panel uses the same spacing rhythm as the rest of the app. Keeps the
 * light hover lift (whileHover y:-2); MotionConfig reduced-motion
 * preference is honoured panel-wide.
 */
const DashboardStatCard = ({ icon, value, label, sub, tone = "purple", href }: StatCardProps) => {
  const toneClasses =
    tone === "green"
      ? "bg-green-100 text-green-600 dark:bg-green-600/10"
      : tone === "amber"
        ? "bg-amber-100 text-amber-600 dark:bg-amber-500/10"
        : tone === "teal"
          ? "bg-teal-100 text-teal-600 dark:bg-teal-500/10"
          : "bg-purple-100 text-purple-600 dark:bg-purple-500/10";

  const hoverBorder =
    tone === "green"
      ? "hover:border-green-600"
      : tone === "amber"
        ? "hover:border-amber-500"
        : tone === "teal"
          ? "hover:border-teal-500"
          : "hover:border-purple-600";

  const inner = (
    <>
      <div
        className={`inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-md [&>svg]:h-6 [&>svg]:w-6 ${toneClasses}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <span className="block text-3xl font-bold leading-tight tabular-nums">{value}</span>
        <span className="block truncate text-sm text-gray-500 dark:text-gray-400">
          {label}
        </span>
        {sub && (
          <span className="block truncate text-xs text-gray-400 dark:text-gray-500">{sub}</span>
        )}
      </div>
    </>
  );

  const shell = `flex h-full items-center gap-5 rounded-md border bg-card p-6 shadow-md transition-colors ${hoverBorder}`;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="h-full"
    >
      {href ? (
        <Link href={href} className={`${shell} block`} aria-label={`${label}: ${value}`}>
          {inner}
        </Link>
      ) : (
        <div className={shell}>{inner}</div>
      )}
    </motion.div>
  );
};

export default DashboardStatCard;
