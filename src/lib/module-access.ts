import { db } from "@/lib/db";
import { getISTParts, istWallClock } from "@/lib/utils";

/**
 * Module access control for the three course completion orders.
 *
 *  - "daywise"  : a module stays locked until its moduledate; from that date
 *                 (00:00 in the app timezone, Asia/Kolkata) onward it is open.
 *  - "queue"    : modules unlock strictly in sequence (Module.createdAt order).
 *                 A module opens only once EVERY previous module is completed
 *                 by the student (UserModuleData.modulestatus submitted — a
 *                 module in 'retake' still counts as completed once).
 *                 moduledate is informational only in this mode.
 *  - "openflow" : everything open, any order, any date. moduledate ignored.
 */

export type CompletionOrder = "daywise" | "queue" | "openflow";

export const COMPLETION_ORDERS: CompletionOrder[] = ["daywise", "queue", "openflow"];

export const COMPLETION_ORDER_LABELS: Record<CompletionOrder, string> = {
    daywise: "Daywise",
    queue: "Queue",
    openflow: "Openflow",
};

export const COMPLETION_ORDER_DESCRIPTIONS: Record<CompletionOrder, string> = {
    daywise:
        "Each module unlocks on its configured module date — locked before the date, open on and after it.",
    queue:
        "Modules unlock in sequence — students must complete the previous module before starting the next one. Dates are ignored.",
    openflow:
        "All modules are open to everyone — any module, any order, any time. Dates are informational only.",
};

export function normalizeCompletionOrder(value?: string | null): CompletionOrder {
    return COMPLETION_ORDERS.includes(value as CompletionOrder)
        ? (value as CompletionOrder)
        : "openflow";
}

/**
 * A module counts as "completed" for queue unlocking when it has been
 * submitted at least once. 'retake' implies a previous submission, so it
 * still unlocks the next module.
 */
export function isModuleCompleted(moduleStatus?: string | null): boolean {
    return moduleStatus === "submitted" || moduleStatus === "retake";
}

export type ModuleLockReason = "date" | "prerequisite" | null;

export interface ModuleLockState {
    locked: boolean;
    reason: ModuleLockReason;
    /** daywise only — the instant the module becomes available. */
    unlockDate?: Date;
    /** queue only — title of the earliest uncompleted previous module. */
    prerequisiteTitle?: string;
}

export interface SequencedModule {
    id: string;
    title: string;
    moduledate: Date | string;
}

export const unlockedState = (): ModuleLockState => ({ locked: false, reason: null });

/**
 * Compute lock states for a whole course's modules in one pass.
 *
 * @param completionOrder  the course's completion order
 * @param modules          the course's modules IN SEQUENCE ORDER (createdAt asc)
 * @param completedByModuleId  map of moduleId -> student completed it
 * @param now              current instant
 */
export function getModuleLockStates(
    completionOrder: CompletionOrder,
    modules: SequencedModule[],
    completedByModuleId: Record<string, boolean>,
    now: Date = new Date(),
): Record<string, ModuleLockState> {
    const states: Record<string, ModuleLockState> = {};

    if (completionOrder === "openflow") {
        for (const m of modules) states[m.id] = unlockedState();
        return states;
    }

    if (completionOrder === "daywise") {
        for (const m of modules) {
            const unlockAt = istDayStart(m.moduledate);
            const locked = unlockAt !== null && now < unlockAt;
            states[m.id] = {
                locked,
                reason: locked ? "date" : null,
                unlockDate: unlockAt ?? new Date(m.moduledate),
            };
        }
        return states;
    }

    // queue — walk the sequence in order. A module is locked if ANY previous
    // module is not completed yet (spec: "2nd module locked until 1st
    // completed"). The first uncompleted module itself stays open — it is
    // the one the student must complete to unlock the rest.
    let prerequisite: string | undefined;
    for (const m of modules) {
        if (prerequisite !== undefined) {
            states[m.id] = {
                locked: true,
                reason: "prerequisite",
                prerequisiteTitle: prerequisite,
            };
            continue;
        }
        states[m.id] = unlockedState();
        if (!completedByModuleId[m.id]) {
            prerequisite = m.title;
        }
    }
    return states;
}

/**
 * Instant of 00:00 in the app timezone (Asia/Kolkata) for the calendar day
 * of the given date — "accessible on that date" means from IST midnight.
 */
export function istDayStart(value: Date | string): Date | null {
    const parts = getISTParts(value);
    if (!parts) return null;
    return istWallClock(parts.year, parts.month, parts.day, 0, 0, 0);
}

/* ------------------------------------------------------------------ */
/* Server-side helpers (db-backed)                                     */
/* ------------------------------------------------------------------ */

export interface ModuleLockResult extends ModuleLockState {
    /** false when the module id does not exist. */
    found: boolean;
    completionOrder: CompletionOrder;
}

/**
 * Resolve one module's lock state for a student directly from the DB.
 * Used by server pages and server actions as the enforcement point —
 * the UI lock badges are only cosmetic; this is the real gate.
 */
export async function getStudentModuleLock(
    uid: string,
    mid: string,
    now: Date = new Date(),
): Promise<ModuleLockResult> {
    const moduleRow = await db.module.findUnique({
        where: { id: mid },
        select: {
            id: true,
            title: true,
            moduledate: true,
            courseId: true,
            course: { select: { completionOrder: true } },
        },
    });
    if (!moduleRow) {
        return { found: false, locked: false, reason: null, completionOrder: "openflow" };
    }

    const completionOrder = normalizeCompletionOrder(moduleRow.course.completionOrder);
    if (completionOrder === "openflow") {
        return { found: true, locked: false, reason: null, completionOrder };
    }

    if (completionOrder === "daywise") {
        const unlockAt = istDayStart(moduleRow.moduledate);
        const locked = unlockAt !== null && now < unlockAt;
        return {
            found: true,
            locked,
            reason: locked ? "date" : null,
            unlockDate: unlockAt ?? moduleRow.moduledate,
            completionOrder,
        };
    }

    // queue — previous modules in sequence order; the earliest one the
    // student has not completed becomes the prerequisite.
    const courseModules = await db.module.findMany({
        where: { courseId: moduleRow.courseId, modulestatus: "active" },
        orderBy: [{ createdAt: "asc" }, { title: "asc" }],
        select: { id: true, title: true },
    });
    const index = courseModules.findIndex((m) => m.id === moduleRow.id);
    const previous = index > 0 ? courseModules.slice(0, index) : [];
    let prerequisiteTitle: string | undefined;
    if (previous.length > 0) {
        const completions = await db.userModuleData.findMany({
            where: {
                userId: uid,
                moduleId: { in: previous.map((m) => m.id) },
            },
            select: { moduleId: true, modulestatus: true },
        });
        const completedIds = new Set(
            completions.filter((c) => isModuleCompleted(c.modulestatus)).map((c) => c.moduleId),
        );
        const missing = previous.find((m) => !completedIds.has(m.id));
        if (missing) prerequisiteTitle = missing.title;
    }

    return prerequisiteTitle
        ? { found: true, locked: true, reason: "prerequisite", prerequisiteTitle, completionOrder }
        : { found: true, locked: false, reason: null, completionOrder };
}
