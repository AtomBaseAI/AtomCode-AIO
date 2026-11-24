"use client"

import { useSyncExternalStore } from "react"
import { createPortal } from "react-dom"

/**
 * Loading-state twin of TopbarTitle. Pages render their title INSIDE THE
 * TOP BAR (via portal) — the page content itself has no title heading, so
 * loading.tsx skeletons must NOT render a title bar inside the content
 * (that mismatched the real UI). This component portals a small skeleton
 * bar into the same `#topbar-title-slot` the real title uses, so the
 * skeleton state mirrors the loaded state exactly.
 *
 * Hydration-safe: useSyncExternalStore renders the server snapshot (null)
 * during hydration and only portals after mount — same mechanism as
 * TopbarTitle.
 */

const noopSubscribe = () => () => {}

function getTopbarSlot(): HTMLElement | null {
    return document.getElementById("topbar-title-slot")
}

function useTopbarSlot() {
    return useSyncExternalStore(noopSubscribe, getTopbarSlot, () => null)
}

export function TopbarTitleSkeleton() {
    const slot = useTopbarSlot()
    if (!slot) return null

    return createPortal(
        <span
            aria-hidden
            className="block h-6 w-40 animate-pulse rounded-md bg-primary/10"
        />,
        slot
    )
}
