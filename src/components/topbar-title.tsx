"use client"

import { useSyncExternalStore } from "react"
import Link from "next/link"
import { createPortal } from "react-dom"
import { ChevronRight } from "lucide-react"

/**
 * Top bar title / breadcrumb slots.
 *
 * The Topbar lives in the shared layouts (admin/staff/student) while page
 * content renders below it, so a portal is the only way for a page to place
 * something in the top bar's row without touching the shared layout. Both
 * components render into the same `#topbar-title-slot` div inside `Topbar`
 * (only one of them per page).
 *
 * Hydration-safe: `useSyncExternalStore` renders the server snapshot (null)
 * during hydration and only portals after mount, so the server HTML and the
 * first client render always match. The Topbar slot is part of the shared
 * layout markup, so the element is guaranteed to exist once mounted — pages
 * that never use these components keep the exact same top bar as before.
 */

const noopSubscribe = () => () => {}

function getTopbarSlot(): HTMLElement | null {
    return document.getElementById("topbar-title-slot")
}

/** useTopbarSlot — null during SSR/hydration, the slot element after mount. */
function useTopbarSlot() {
    return useSyncExternalStore(noopSubscribe, getTopbarSlot, () => null)
}

/**
 * Page title in the top bar (left side, same row as the user menu).
 * The text styling lives here so every page renders it identically.
 *
 * Usage: <TopbarTitle>Courses</TopbarTitle>
 */
export function TopbarTitle({ children }: { children: React.ReactNode }) {
    const slot = useTopbarSlot()
    if (!slot) return null

    return createPortal(
        <span className="truncate text-xl font-semibold tracking-tight">
            {children}
        </span>,
        slot
    )
}

export interface TopbarBreadcrumbItem {
    /** Display label of the crumb. */
    label: string
    /** Link target for ancestor crumbs; omit for the current page. */
    href?: string
}

/**
 * Breadcrumb in the top bar for child/inner pages, e.g.
 * "Question Groups > Test Group" — ancestors are links, the last crumb is
 * the current location (plain text). Long crumbs truncate individually so
 * the top bar never overflows.
 *
 * Usage:
 * <TopbarBreadcrumb
 *     items={[
 *         { label: "Question Groups", href: "/admin/questions-groups" },
 *         { label: group?.title ?? "Group" },
 *     ]}
 * />
 */
export function TopbarBreadcrumb({
    items,
}: {
    items: TopbarBreadcrumbItem[]
}) {
    const slot = useTopbarSlot()
    if (!slot || items.length === 0) return null

    return createPortal(
        <nav
            aria-label="Breadcrumb"
            className="flex min-w-0 items-center gap-1 text-xl font-semibold tracking-tight"
        >
            {items.map((item, index) => {
                const isLast = index === items.length - 1
                return (
                    <span
                        key={`${item.label}-${index}`}
                        className="flex min-w-0 items-center gap-1"
                    >
                        {!isLast && item.href ? (
                            <Link
                                href={item.href}
                                className="truncate text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="truncate">{item.label}</span>
                        )}
                        {!isLast && (
                            <ChevronRight
                                className="size-5 shrink-0 text-muted-foreground"
                                aria-hidden
                            />
                        )}
                    </span>
                )
            })}
        </nav>,
        slot
    )
}
