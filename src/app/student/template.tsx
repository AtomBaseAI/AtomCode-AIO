"use client";

import { MotionConfig, motion } from "framer-motion";

/**
 * Per-navigation transition layer for every /student/* route.
 *
 * Next.js remounts template.tsx (unlike layout.tsx) on each navigation, so
 * the motion.div below re-runs its enter animation whenever the student
 * moves between student pages — a light 250ms fade+lift that makes the
 * panel feel responsive without blocking content.
 *
 * MotionConfig(reducedMotion="user") honours the OS "reduce motion"
 * accessibility setting: users who opted out get instant, non-animated
 * transitions instead.
 */
export default function StudentTemplate({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {/* w-full is required: this div is a flex item of the shell's
          flex-col items-center container, so without an explicit width it
          shrink-wraps to fit-content and every w-full / percentage width
          inside the page resolves against that squeezed box (the "all
          content stuck in the middle" bug). */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
