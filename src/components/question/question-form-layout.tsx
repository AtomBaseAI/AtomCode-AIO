"use client"

/**
 * Shared layout primitives for the admin Create/Edit Question dialogs.
 *
 * Gives the previously messy 3-column row-span grid a clean structure:
 *  - full-height dialog with a scrollable body and a sticky footer action bar
 *  - icon-led sections (Details / Code & Tests / Categorization)
 *  - compact test-case cards with a small status dot instead of huge
 *    floating status blocks
 */

import type { ReactNode } from "react"
import { Check, CircleHelp, LoaderIcon, X } from "lucide-react"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface QuestionDialogShellProps {
    title: string
    children: ReactNode
    /** Rendered inside the sticky bottom action bar. */
    footer: ReactNode
}

export function QuestionDialogShell({ title, children, footer }: QuestionDialogShellProps) {
    return (
        <DialogContent
            aria-describedby={undefined}
            className="flex h-[100vh] w-[100vw] max-w-[100vw] flex-col gap-0 overflow-hidden p-0 sm:max-w-[100vw]"
        >
            <DialogHeader className="shrink-0 border-b px-4 py-4 sm:px-6">
                <DialogTitle className="text-base font-semibold sm:text-lg">{title}</DialogTitle>
            </DialogHeader>

            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-5 sm:px-6">
                <div className="mx-auto w-full max-w-[1500px] space-y-8 pb-2">{children}</div>
            </div>

            <div className="shrink-0 border-t bg-background px-4 py-3 sm:px-6">
                <div className="mx-auto flex w-full max-w-[1500px] flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                    {footer}
                </div>
            </div>
        </DialogContent>
    )
}

interface QuestionFormSectionProps {
    icon: ReactNode
    title: string
    description?: string
    children: ReactNode
    className?: string
}

export function QuestionFormSection({ icon, title, description, children, className }: QuestionFormSectionProps) {
    return (
        <section className={cn("space-y-4", className)}>
            <div className="flex items-start gap-3 border-b pb-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {icon}
                </span>
                <div className="min-w-0">
                    <h3 className="text-sm font-semibold leading-tight">{title}</h3>
                    {description ? (
                        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
                    ) : null}
                </div>
            </div>
            {children}
        </section>
    )
}

interface TestCaseCardProps {
    label: string
    /** Optional trailing element in the header row (e.g. status dot). */
    badge?: ReactNode
    /** Dashed/bordered-down style for sample (non-graded) cases. */
    muted?: boolean
    children: ReactNode
}

export function TestCaseCard({ label, badge, muted = false, children }: TestCaseCardProps) {
    return (
        <div className={cn("rounded-xl border p-3", muted ? "border-dashed bg-muted/30" : "bg-card")}>
            <div className="mb-2 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {label}
                </span>
                {badge}
            </div>
            {children}
        </div>
    )
}

const STATUS_META: Record<string, { dot: string; text: string }> = {
    idle: { dot: "bg-orange-400", text: "Not run" },
    processing: { dot: "bg-cyan-400", text: "Running" },
    success: { dot: "bg-green-500", text: "Passed" },
    failed: { dot: "bg-red-400", text: "Failed" },
}

export function StatusDot({ status }: { status: string }) {
    const meta = STATUS_META[status] ?? STATUS_META.idle
    return (
        <span className="inline-flex items-center gap-1.5" title={meta.text}>
            <span
                className={cn(
                    "inline-flex size-5 shrink-0 items-center justify-center rounded-full text-white",
                    meta.dot
                )}
            >
                {status === "processing" ? (
                    <LoaderIcon className="size-3 animate-spin" />
                ) : status === "success" ? (
                    <Check className="size-3" />
                ) : status === "failed" ? (
                    <X className="size-3" />
                ) : (
                    <CircleHelp className="size-3" />
                )}
            </span>
            <span className="hidden text-[11px] text-muted-foreground lg:inline">{meta.text}</span>
        </span>
    )
}
