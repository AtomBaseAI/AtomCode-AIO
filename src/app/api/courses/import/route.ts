import { NextResponse } from "next/server";
import * as z from "zod";

import { db } from "@/lib/db";
import { requireSuperAdminApi } from "@/lib/api-admin-guard";
import { completionOrderSchema } from "@/schemas/course-schema";

/** Per-batch sanity caps so one import cannot flood the database. */
const MAX_MODULES_PER_IMPORT = 200;
const MAX_REFERENCES_PER_MODULE = 100;
const MAX_QUESTIONS_PER_MODULE = 500;
/** Concurrent question attachments per chunk. */
const ATTACH_CHUNK_SIZE = 20;
/** Crude DoS guard: reject oversized uploads before parsing the body. */
const MAX_BODY_BYTES = 25 * 1024 * 1024; // 25 MB

interface ImportIssue {
    index: number;
    name: string;
    error: string;
}

interface QuestionIssue {
    module: string;
    type: "code" | "mcq";
    title: string;
    reason: string;
}

/** "full stack java!" → "full-stack-java" — kept local to avoid client-code imports. */
function slugify(name: string): string {
    return (
        name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "") || "course"
    );
}

/**
 * Pick a fresh course title: keep the exported title when free, otherwise
 * append " (imported)" / " (imported 2)" / … so re-importing never collides.
 */
async function uniqueCourseTitle(rawTitle: string) {
    const base = rawTitle.trim() || "Imported Course";
    const existing = await db.course.findMany({ select: { title: true } });
    const taken = new Set(existing.map((c) => c.title.trim().toLowerCase()));
    if (!taken.has(base.toLowerCase())) return base;

    for (let n = 1; n < 100; n++) {
        const candidate =
            n === 1 ? `${base} (imported)` : `${base} (imported ${n})`;
        if (!taken.has(candidate.toLowerCase())) return candidate;
    }
    return `${base} (imported ${Date.now()})`;
}

/** Portable course fields (validated by CourseImportSchema below). */
// JSON has no Date type — dates arrive as ISO strings (or epoch numbers).
// Validate the raw value first so hand-edited files get a clear message.
const dateValue = z
    .union([z.string(), z.number()])
    .refine((v) => !Number.isNaN(new Date(v).getTime()), {
        message: "Invalid date — expected an ISO date string (e.g. 2026-01-31T00:00:00.000Z)",
    })
    .transform((v) => new Date(v));

const CourseImportSchema = z.object({
    title: z.string().min(1),
    startdate: dateValue,
    enddate: dateValue,
    language: z.string().min(1),
    completionOrder: completionOrderSchema,
    // Added in envelope version 2 — absent in v1 files, defaults preserved.
    courseType: z.enum(["code-mcq", "mcq-only"]).optional(),
    anyLanguage: z.boolean().optional(),
});

const ReferenceImportSchema = z.object({
    title: z.string().min(1),
    link: z.string().min(1),
    type: z.string().min(1),
});

/**
 * One question REFERENCE inside an exported module. Questions live in
 * question groups, so the reference carries portable matching keys —
 * group title + question title (+ language for code questions) — rather
 * than raw ids. Everything except `title` is optional/lenient: extra or
 * malformed informational fields never fail an import.
 */
const QuestionRefImportSchema = z.object({
    groupTitle: z.string().nullish(),
    title: z.string().min(1),
    lang: z.string().nullish(),
    difficulty: z.string().nullish(),
    questionType: z.string().nullish(),
    tags: z.string().nullish(),
    sourceId: z.string().nullish(),
    sourceGroupId: z.string().nullish(),
});

const ModuleQuestionsImportSchema = z.object({
    code: z.array(QuestionRefImportSchema).max(MAX_QUESTIONS_PER_MODULE).optional(),
    mcq: z.array(QuestionRefImportSchema).max(MAX_QUESTIONS_PER_MODULE).optional(),
});

const ModuleImportSchema = z.object({
    title: z.string().min(1),
    moduledate: dateValue,
    modulestatus: z.enum(["active", "disabled"]),
    language: z.string().min(1),
    maxscore: z.coerce.number().int().min(0),
    concepturl: z.string().nullable().optional(),
    references: z.array(ReferenceImportSchema).optional(),
    // Question references (envelope version 2). Resolved against the
    // question groups of THIS system during import — see attachQuestions.
    questions: ModuleQuestionsImportSchema.optional(),
});

/**
 * Tolerate hand-edited files: numeric strings for maxscore, "inactive"
 * spelled as the UI label, empty concept URLs, booleans-ish statuses.
 */
function normalizeModule(item: unknown): unknown {
    if (!item || typeof item !== "object") return item;
    const obj = { ...(item as Record<string, unknown>) };

    if (
        typeof obj.maxscore === "string" &&
        obj.maxscore.trim() !== "" &&
        !Number.isNaN(Number(obj.maxscore))
    ) {
        obj.maxscore = Number(obj.maxscore);
    }

    if (typeof obj.modulestatus === "string") {
        const status = obj.modulestatus.trim().toLowerCase();
        obj.modulestatus =
            status === "inactive" ? "disabled" : status === "active" || status === "disabled" ? status : obj.modulestatus;
    }

    if (obj.concepturl === "") obj.concepturl = null;

    return obj;
}

/**
 * POST /api/courses/import
 *
 * Body: the JSON produced by GET /api/courses/[id]/export
 * (kind: "course" envelope, version 1 or 2).
 *
 * Creates a NEW course (title deduped automatically) and fills it with
 * every module (created in file order, preserving the queue sequence)
 * including each module's reference material.
 *
 * Question references (version 2 envelopes): for every code question /
 * MCQ reference the import looks up the question inside the question
 * groups of this system — first scoped to the group named in the file,
 * then falling back to a global search by question title (+ language for
 * code questions). A question is attached to the imported module ONLY
 * when it is currently unassigned (moduleId null) — a question already
 * belonging to another module is never moved. Unresolvable or already
 * assigned references are skipped and reported, never fatal.
 *
 * Deliberately NOT imported: question bodies (questions live in groups
 * and are imported through the question-group import), students, staffs,
 * assessments and feedbacks.
 */
export async function POST(req: Request) {
    const guard = await requireSuperAdminApi("courses");
    if (!guard.ok) return guard.response;

    const contentLength = Number(req.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
        return NextResponse.json(
            { error: "File too large (max 25 MB)." },
            { status: 413 }
        );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return NextResponse.json(
            { error: "Invalid file — expected a course export." },
            { status: 400 }
        );
    }

    const envelope = body as Record<string, unknown>;

    // Only accept files this app produced (keeps accidental uploads safe).
    if (envelope.atomcodeExport !== true) {
        return NextResponse.json(
            {
                error:
                    "This file is not an AtomCode export. Export a course first, then import that JSON file.",
            },
            { status: 400 }
        );
    }
    if (envelope.kind !== "course") {
        return NextResponse.json(
            {
                error: `This is a "${String(envelope.kind ?? "unknown")}" export, not a course export. Use the Import button on the matching page.`,
            },
            { status: 400 }
        );
    }

    const rawModules = Array.isArray(envelope.modules) ? envelope.modules : [];
    if (rawModules.length > MAX_MODULES_PER_IMPORT) {
        return NextResponse.json(
            {
                error: `Too many modules in one import (max ${MAX_MODULES_PER_IMPORT}). Split the file.`,
            },
            { status: 400 }
        );
    }

    // ── Resolve the new course title ─────────────────────────────────────────
    const exportedCourse = (envelope.course ?? {}) as Record<string, unknown>;
    const exportedTitle =
        typeof exportedCourse.title === "string"
            ? exportedCourse.title
            : typeof envelope.title === "string"
              ? envelope.title
              : "";
    const title = await uniqueCourseTitle(exportedTitle);

    // ── Validate the course shell ────────────────────────────────────────────
    const parsedCourse = CourseImportSchema.safeParse(exportedCourse);
    if (!parsedCourse.success) {
        const issue = parsedCourse.error.issues[0];
        return NextResponse.json(
            {
                error: `Invalid course data in file${issue?.path?.length ? ` ("${issue.path.join(".")}")` : ""}: ${issue?.message ?? "validation failed"}.`,
            },
            { status: 400 }
        );
    }

    // ── Create the course shell ──────────────────────────────────────────────
    const course = await db.course.create({
        data: {
            title,
            startdate: parsedCourse.data.startdate,
            enddate: parsedCourse.data.enddate,
            language: parsedCourse.data.language,
            completionOrder: parsedCourse.data.completionOrder,
            courseType: parsedCourse.data.courseType ?? "code-mcq",
            anyLanguage: parsedCourse.data.anyLanguage ?? false,
        },
    });

    const errors: ImportIssue[] = [];
    const questionIssues: QuestionIssue[] = [];
    let createdModules = 0;
    let createdReferences = 0;

    // Question references collected from successfully created modules —
    // {moduleDbId, moduleTitle, moduleLanguage, type, ref} tuples.
    const pendingRefs: {
        moduleDbId: string;
        moduleTitle: string;
        moduleLanguage: string;
        type: "code" | "mcq";
        ref: z.infer<typeof QuestionRefImportSchema>;
    }[] = [];

    // ── Modules (created in file order → queue sequence preserved) ──────────
    for (let i = 0; i < rawModules.length; i++) {
        const item = normalizeModule(rawModules[i]);
        const mTitle =
            typeof (item as { title?: unknown })?.title === "string" &&
            (item as { title: string }).title.trim() !== ""
                ? (item as { title: string }).title
                : `#${i + 1}`;

        const parsed = ModuleImportSchema.safeParse(item);
        if (!parsed.success) {
            errors.push({
                index: i + 1,
                name: mTitle,
                error:
                    parsed.error.issues[0]?.message ?? "Invalid module data",
            });
            continue;
        }

        try {
            // Dedupe references by title+link within the module.
            const seen = new Set<string>();
            const refs: { title: string; link: string; type: string }[] = [];
            for (const ref of parsed.data.references ?? []) {
                const key = `${ref.title.trim().toLowerCase()}|${ref.link.trim()}`;
                if (seen.has(key)) continue;
                seen.add(key);
                refs.push({ title: ref.title.trim(), link: ref.link.trim(), type: ref.type.trim() });
            }
            if (refs.length > MAX_REFERENCES_PER_MODULE) {
                errors.push({
                    index: i + 1,
                    name: mTitle,
                    error: `Too many references (max ${MAX_REFERENCES_PER_MODULE})`,
                });
                continue;
            }

            const created = await db.module.create({
                data: {
                    title: parsed.data.title,
                    courseId: course.id,
                    moduledate: parsed.data.moduledate,
                    modulestatus: parsed.data.modulestatus,
                    language: parsed.data.language,
                    maxscore: parsed.data.maxscore,
                    concepturl: parsed.data.concepturl ?? null,
                    reference: { create: refs },
                },
            });
            createdModules++;
            createdReferences += refs.length;

            // Queue question references for the attachment phase.
            const qRefs = parsed.data.questions;
            if (qRefs) {
                for (const ref of qRefs.code ?? []) {
                    pendingRefs.push({
                        moduleDbId: created.id,
                        moduleTitle: parsed.data.title,
                        moduleLanguage: parsed.data.language,
                        type: "code",
                        ref,
                    });
                }
                for (const ref of qRefs.mcq ?? []) {
                    pendingRefs.push({
                        moduleDbId: created.id,
                        moduleTitle: parsed.data.title,
                        moduleLanguage: parsed.data.language,
                        type: "mcq",
                        ref,
                    });
                }
            }
        } catch (err) {
            // Never surface raw driver/prisma text to the client (audit
            // finding: error-message leaks) — log server-side instead.
            console.error("[courses/import] module create failed:", err);
            errors.push({
                index: i + 1,
                name: mTitle,
                error: "Import failed. Check the file format and try again.",
            });
        }
    }

    // ── Question attachment phase ─────────────────────────────────────────────
    // Resolve every reference against the question groups of this system
    // and attach the matching (unassigned) questions to the new modules.
    const attached = await attachQuestions(pendingRefs, questionIssues);

    if (rawModules.length > 0 && createdModules === 0) {
        return NextResponse.json(
            {
                error: `Course "${title}" was created but no module could be imported.`,
                courseId: course.id,
                created: 0,
                failed: errors.length,
                errors: errors.slice(0, 10),
            },
            { status: 400 }
        );
    }

    const parts: string[] = [`${createdModules} module(s)`];
    if (createdReferences) parts.push(`${createdReferences} reference(s)`);
    if (attached.code) parts.push(`${attached.code} code question(s) attached`);
    if (attached.mcq) parts.push(`${attached.mcq} MCQ question(s) attached`);
    if (questionIssues.length)
        parts.push(`${questionIssues.length} question reference(s) unmatched`);
    if (rawModules.length === 0) parts.push("(no modules in file)");

    return NextResponse.json(
        {
            success: `Imported course "${title}": ${parts.join(", ")}${
                errors.length ? `, ${errors.length} module(s) skipped` : ""
            }`,
            courseId: course.id,
            courseTitle: title,
            createdModules,
            createdReferences,
            attachedCodeQuestions: attached.code,
            attachedMcqQuestions: attached.mcq,
            missingQuestions: questionIssues.length,
            questionIssues: questionIssues.slice(0, 10),
            failed: errors.length,
            errors: errors.slice(0, 10),
        },
        { status: 201 }
    );
}

// ─── Question reference resolution ────────────────────────────────────────────

/** Normalize a matching key: trim, lowercase, collapse inner whitespace. */
function normKey(value: string | null | undefined): string {
    return (value ?? "").trim().toLowerCase().replace(/\s+/g, " ");
}

interface CodeRow {
    id: string;
    title: string;
    lang: string;
    moduleId: string | null;
    questionGroupId: string;
}

interface McqRow {
    id: string;
    title: string;
    moduleId: string | null;
    questionGroupId: string;
}

interface CodeIndexes {
    /** "groupId|title|lang" → rows (group-scoped, language-exact). */
    byGroupTitleLang: Map<string, CodeRow[]>;
    /** "groupId|title" → rows (group-scoped, any language). */
    byGroupTitle: Map<string, CodeRow[]>;
    /** "title|lang" → rows (global fallback). */
    byTitleLang: Map<string, CodeRow[]>;
    /** "title" → rows (global fallback, any language). */
    byTitle: Map<string, CodeRow[]>;
}

interface McqIndexes {
    /** "groupId|title" → rows (group-scoped). */
    byGroupTitle: Map<string, McqRow[]>;
    /** "title" → rows (global fallback). */
    byTitle: Map<string, McqRow[]>;
}

function pushIndexed<T>(map: Map<string, T[]>, key: string, row: T) {
    const bucket = map.get(key);
    if (bucket) bucket.push(row);
    else map.set(key, [row]);
}

function indexCodeRows(rows: CodeRow[]): CodeIndexes {
    const byGroupTitleLang = new Map<string, CodeRow[]>();
    const byGroupTitle = new Map<string, CodeRow[]>();
    const byTitleLang = new Map<string, CodeRow[]>();
    const byTitle = new Map<string, CodeRow[]>();
    for (const row of rows) {
        const t = normKey(row.title);
        const l = normKey(row.lang);
        pushIndexed(byGroupTitleLang, `${row.questionGroupId}|${t}|${l}`, row);
        pushIndexed(byGroupTitle, `${row.questionGroupId}|${t}`, row);
        pushIndexed(byTitleLang, `${t}|${l}`, row);
        pushIndexed(byTitle, t, row);
    }
    return { byGroupTitleLang, byGroupTitle, byTitleLang, byTitle };
}

function indexMcqRows(rows: McqRow[]): McqIndexes {
    const byGroupTitle = new Map<string, McqRow[]>();
    const byTitle = new Map<string, McqRow[]>();
    for (const row of rows) {
        const t = normKey(row.title);
        pushIndexed(byGroupTitle, `${row.questionGroupId}|${t}`, row);
        pushIndexed(byTitle, t, row);
    }
    return { byGroupTitle, byTitle };
}

/**
 * Resolve + attach question references.
 *
 * Resolution order for one reference:
 *   1. Group-scoped: questions inside every group whose title matches the
 *      reference's groupTitle (case-insensitive) — title must match, and
 *      language too for code questions when the reference carries a lang.
 *   2. Global fallback: same title (+ language) match across ALL groups —
 *      used when the group name is missing, renamed, or doesn't hold the
 *      question in this system.
 *   3. Disambiguation: when several unassigned questions match (e.g. the
 *      reference has no language), code questions prefer a candidate whose
 *      language equals the module's language; still ambiguous → skipped.
 *
 * A matched question is attached ONLY when it is currently unassigned
 * (moduleId null) — questions already belonging to another module are
 * never moved. `claimed` guards against attaching the same question to
 * two modules within one import file.
 */
async function attachQuestions(
    pendingRefs: {
        moduleDbId: string;
        moduleTitle: string;
        moduleLanguage: string;
        type: "code" | "mcq";
        ref: z.infer<typeof QuestionRefImportSchema>;
    }[],
    questionIssues: QuestionIssue[]
): Promise<{ code: number; mcq: number }> {
    if (pendingRefs.length === 0) return { code: 0, mcq: 0 };

    const [groupRows, codeRows, mcqRows] = await Promise.all([
        db.questionGroup.findMany({ select: { id: true, title: true } }),
        db.codeQuestion.findMany({
            select: { id: true, title: true, lang: true, moduleId: true, questionGroupId: true },
        }),
        db.mCQQuestion.findMany({
            select: { id: true, title: true, moduleId: true, questionGroupId: true },
        }),
    ]);

    // Normalized group title → ids (group titles are not unique).
    const groupsByTitle = new Map<string, string[]>();
    for (const g of groupRows) {
        const key = normKey(g.title);
        if (!key) continue;
        const ids = groupsByTitle.get(key);
        if (ids) ids.push(g.id);
        else groupsByTitle.set(key, [g.id]);
    }

    const codeIdx = indexCodeRows(codeRows);
    const mcqIdx = indexMcqRows(mcqRows);

    const claimed = new Set<string>();
    const codeUpdates: { id: string; moduleDbId: string; moduleTitle: string; refTitle: string }[] = [];
    const mcqUpdates: { id: string; moduleDbId: string; moduleTitle: string; refTitle: string }[] = [];

    const pickFree = <T extends { id: string; moduleId: string | null }>(
        candidates: T[],
        claimed: Set<string>
    ): T[] => candidates.filter((c) => c.moduleId === null && !claimed.has(c.id));

    for (const { moduleDbId, moduleTitle, moduleLanguage, type, ref } of pendingRefs) {
        const refTitle = normKey(ref.title);
        const refLang = normKey(ref.lang);
        const groupKey = normKey(ref.groupTitle);

        let matchedId: string | null = null;

        if (type === "code") {
            let candidates: CodeRow[] = [];

            // 1. Group-scoped lookup
            const groupIds = groupKey ? groupsByTitle.get(groupKey) : undefined;
            if (groupIds) {
                for (const gid of groupIds) {
                    if (refLang) {
                        candidates.push(
                            ...(codeIdx.byGroupTitleLang.get(`${gid}|${refTitle}|${refLang}`) ?? [])
                        );
                    } else {
                        candidates.push(...(codeIdx.byGroupTitle.get(`${gid}|${refTitle}`) ?? []));
                    }
                }
            }

            // 2. Global fallback (title + language exact)
            if (candidates.length === 0) {
                candidates = refLang
                    ? (codeIdx.byTitleLang.get(`${refTitle}|${refLang}`) ?? [])
                    : (codeIdx.byTitle.get(refTitle) ?? []);
            }

            const free = pickFree(candidates, claimed);

            if (free.length === 1) {
                matchedId = free[0].id;
            } else if (free.length > 1) {
                if (!refLang) {
                    // No language in the reference — prefer the module's language.
                    const mLang = normKey(moduleLanguage);
                    const preferred = free.filter((c) => normKey(c.lang) === mLang);
                    if (preferred.length === 1) matchedId = preferred[0].id;
                }
                if (!matchedId) {
                    questionIssues.push({
                        module: moduleTitle,
                        type,
                        title: ref.title,
                        reason: "Ambiguous match — multiple unassigned questions share this title in the question groups",
                    });
                }
            } else if (candidates.length > 0) {
                questionIssues.push({
                    module: moduleTitle,
                    type,
                    title: ref.title,
                    reason: "Question exists in the question groups but is already assigned to another module",
                });
            } else {
                questionIssues.push({
                    module: moduleTitle,
                    type,
                    title: ref.title,
                    reason: refLang
                        ? `Not found in the question groups (looked for "${ref.title}" [${ref.lang}])`
                        : `Not found in the question groups (looked for "${ref.title}")`,
                });
            }

            if (matchedId) {
                claimed.add(matchedId);
                codeUpdates.push({ id: matchedId, moduleDbId, moduleTitle, refTitle: ref.title });
            }
        } else {
            let candidates: McqRow[] = [];

            const groupIds = groupKey ? groupsByTitle.get(groupKey) : undefined;
            if (groupIds) {
                for (const gid of groupIds) {
                    candidates.push(...(mcqIdx.byGroupTitle.get(`${gid}|${refTitle}`) ?? []));
                }
            }
            if (candidates.length === 0) {
                candidates = mcqIdx.byTitle.get(refTitle) ?? [];
            }

            const free = pickFree(candidates, claimed);

            if (free.length === 1) {
                matchedId = free[0].id;
            } else if (free.length > 1) {
                questionIssues.push({
                    module: moduleTitle,
                    type,
                    title: ref.title,
                    reason: "Ambiguous match — multiple unassigned questions share this title in the question groups",
                });
            } else if (candidates.length > 0) {
                questionIssues.push({
                    module: moduleTitle,
                    type,
                    title: ref.title,
                    reason: "Question exists in the question groups but is already assigned to another module",
                });
            } else {
                questionIssues.push({
                    module: moduleTitle,
                    type,
                    title: ref.title,
                    reason: `Not found in the question groups (looked for "${ref.title}")`,
                });
            }

            if (matchedId) {
                claimed.add(matchedId);
                mcqUpdates.push({ id: matchedId, moduleDbId, moduleTitle, refTitle: ref.title });
            }
        }
    }

    // ── Attach: chunked concurrent updates, per-row failures reported ────────
    let attachedCode = 0;
    let attachedMcq = 0;

    for (let i = 0; i < codeUpdates.length; i += ATTACH_CHUNK_SIZE) {
        const slice = codeUpdates.slice(i, i + ATTACH_CHUNK_SIZE);
        const results = await Promise.allSettled(
            slice.map((u) =>
                db.codeQuestion.update({ where: { id: u.id }, data: { moduleId: u.moduleDbId } })
            )
        );
        results.forEach((r, j) => {
            if (r.status === "fulfilled") {
                attachedCode++;
            } else {
                const u = slice[j];
                questionIssues.push({
                    module: u.moduleTitle,
                    type: "code",
                    title: u.refTitle,
                    reason: "Database error while attaching the question",
                });
            }
        });
    }

    for (let i = 0; i < mcqUpdates.length; i += ATTACH_CHUNK_SIZE) {
        const slice = mcqUpdates.slice(i, i + ATTACH_CHUNK_SIZE);
        const results = await Promise.allSettled(
            slice.map((u) =>
                db.mCQQuestion.update({ where: { id: u.id }, data: { moduleId: u.moduleDbId } })
            )
        );
        results.forEach((r, j) => {
            if (r.status === "fulfilled") {
                attachedMcq++;
            } else {
                const u = slice[j];
                questionIssues.push({
                    module: u.moduleTitle,
                    type: "mcq",
                    title: u.refTitle,
                    reason: "Database error while attaching the question",
                });
            }
        });
    }

    return { code: attachedCode, mcq: attachedMcq };
}
