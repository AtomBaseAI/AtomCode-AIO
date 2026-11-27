import * as z from "zod";

import { db } from "@/lib/db";
import { completionOrderSchema } from "@/schemas/course-schema";

/**
 * Shared course import engine — used by:
 *   - POST /api/courses/import            (JSON mode + NDJSON stream mode)
 *   - POST /api/courses/import/validate   (dry-run pre-check)
 *
 * Single source of truth for envelope parsing, tolerant normalization,
 * question-reference resolution against the question groups of this system
 * and the validate → create → attach pipeline, so the import wizard and the
 * plain JSON endpoint behave identically.
 */

/** Per-batch sanity caps so one import cannot flood the database. */
export const MAX_MODULES_PER_IMPORT = 200;
export const MAX_REFERENCES_PER_MODULE = 100;
export const MAX_QUESTIONS_PER_MODULE = 500;
/** Concurrent question attachments per chunk. */
export const COURSE_ATTACH_CHUNK_SIZE = 20;
/** Crude DoS guard: reject oversized uploads before parsing the body. */
export const MAX_COURSE_BODY_BYTES = 25 * 1024 * 1024; // 25 MB

// ─── Envelope parsing ────────────────────────────────────────────────────────

export interface ParsedCourseEnvelope {
    ok: true;
    rawCourse: Record<string, unknown>;
    rawModules: unknown[];
    exportedTitle: string;
}

/**
 * Accepts the full course export (kind: "course", envelope version 1 or 2).
 * Version 1 files simply have no `questions` blocks on their modules.
 */
export function parseCourseEnvelope(body: unknown): ParsedCourseEnvelope | { ok: false; error: string } {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return { ok: false, error: "Invalid file — expected a course export." };
    }
    const envelope = body as Record<string, unknown>;

    // Only accept files this app produced (keeps accidental uploads safe).
    if (envelope.atomcodeExport !== true) {
        return {
            ok: false,
            error:
                "This file is not an AtomCode export. Export a course first, then import that JSON file.",
        };
    }
    if (envelope.kind !== "course") {
        return {
            ok: false,
            error: `This is a "${String(
                envelope.kind ?? "unknown"
            )}" export, not a course export. Use the Import button on the matching page.`,
        };
    }

    const rawCourse =
        envelope.course && typeof envelope.course === "object" && !Array.isArray(envelope.course)
            ? (envelope.course as Record<string, unknown>)
            : {};
    const rawModules = Array.isArray(envelope.modules) ? envelope.modules : [];

    const exportedTitle =
        typeof rawCourse.title === "string"
            ? rawCourse.title
            : typeof envelope.title === "string"
              ? envelope.title
              : "";

    return { ok: true, rawCourse, rawModules, exportedTitle };
}

// ─── Tolerant normalization ──────────────────────────────────────────────────

/**
 * Tolerate hand-edited files: numeric strings for maxscore, "inactive"
 * spelled as the UI label, empty concept URLs.
 */
export function normalizeModuleImportRow(item: unknown): unknown {
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
            status === "inactive"
                ? "disabled"
                : status === "active" || status === "disabled"
                  ? status
                  : obj.modulestatus;
    }

    if (obj.concepturl === "") obj.concepturl = null;

    return obj;
}

// ─── Import schemas ──────────────────────────────────────────────────────────

// JSON has no Date type — dates arrive as ISO strings (or epoch numbers).
// Validate the raw value first so hand-edited files get a clear message.
const dateValue = z
    .union([z.string(), z.number()])
    .refine((v) => !Number.isNaN(new Date(v).getTime()), {
        message:
            "Invalid date — expected an ISO date string (e.g. 2026-01-31T00:00:00.000Z)",
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
    // question groups of THIS system during import.
    questions: ModuleQuestionsImportSchema.optional(),
});

export type ModuleImportData = z.infer<typeof ModuleImportSchema>;

// ─── Import options ──────────────────────────────────────────────────────────

export interface CourseImportOptions {
    /** Resolve + attach question references to the imported modules. */
    attachQuestions: boolean;
    /** Import the modules' reference material entries. */
    includeReferences: boolean;
}

export const DEFAULT_IMPORT_OPTIONS: CourseImportOptions = {
    attachQuestions: true,
    includeReferences: true,
};

/**
 * Tolerant read of the import options the wizard sent (body.options).
 * Historical `onExistingQuestion` payloads are silently ignored —
 * questions are many-to-many now, so "already assigned" no longer blocks
 * an attach.
 */
export function readImportOptions(body: unknown): CourseImportOptions {
    const options = (body as { options?: unknown } | null)?.options;
    if (!options || typeof options !== "object" || Array.isArray(options)) {
        return { ...DEFAULT_IMPORT_OPTIONS };
    }
    const o = options as Record<string, unknown>;
    return {
        attachQuestions:
            typeof o.attachQuestions === "boolean" ? o.attachQuestions : true,
        includeReferences:
            typeof o.includeReferences === "boolean" ? o.includeReferences : true,
    };
}

// ─── Pure validation ─────────────────────────────────────────────────────────

export interface CourseImportIssue {
    kind: "course" | "module";
    index: number;
    name: string;
    error: string;
}

export interface QuestionRefIssue {
    module: string;
    moduleIndex: number;
    type: "code" | "mcq";
    title: string;
    reason: string;
}

export interface ValidatedCourseItems {
    /** Discriminant for the union with the shell-error branch ({ok: false}). */
    ok: true;
    validCourse: z.infer<typeof CourseImportSchema>;
    validModules: { index: number; name: string; data: ModuleImportData }[];
    issues: CourseImportIssue[];
    /** Totals read straight from the file (before validation). */
    counts: {
        modules: number;
        references: number;
        codeQuestions: number;
        mcqQuestions: number;
    };
    /** Totals of the rows that passed validation (references capped per module). */
    validCounts: {
        modules: number;
        references: number;
        codeQuestions: number;
        mcqQuestions: number;
    };
    importable: boolean;
}

/** Pure (no DB) validation of the course shell and every module row. */
export function validateCourseImportItems(
    parsed: ParsedCourseEnvelope
): ValidatedCourseItems | { ok: false; error: string } {
    const parsedCourse = CourseImportSchema.safeParse(parsed.rawCourse);
    if (!parsedCourse.success) {
        const issue = parsedCourse.error.issues[0];
        return {
            ok: false,
            error: `Invalid course data in file${
                issue?.path?.length ? ` ("${issue.path.join(".")}")` : ""
            }: ${issue?.message ?? "validation failed"}.`,
        };
    }

    const issues: CourseImportIssue[] = [];
    const validModules: ValidatedCourseItems["validModules"] = [];

    for (let i = 0; i < parsed.rawModules.length; i++) {
        const item = normalizeModuleImportRow(parsed.rawModules[i]);
        const mTitle =
            typeof (item as { title?: unknown })?.title === "string" &&
            (item as { title: string }).title.trim() !== ""
                ? (item as { title: string }).title
                : `#${i + 1}`;

        const parsedModule = ModuleImportSchema.safeParse(item);
        if (!parsedModule.success) {
            issues.push({
                kind: "module",
                index: i + 1,
                name: mTitle,
                error:
                    parsedModule.error.issues[0]?.message ?? "Invalid module data",
            });
            continue;
        }
        validModules.push({ index: i + 1, name: mTitle, data: parsedModule.data });
    }

    const counts = parsed.rawModules.reduce<{
        references: number;
        codeQuestions: number;
        mcqQuestions: number;
    }>(
        (acc, m) => {
            const mod = m as {
                references?: unknown;
                questions?: { code?: unknown; mcq?: unknown };
            };
            acc.references += Array.isArray(mod.references) ? mod.references.length : 0;
            const q = (mod.questions ?? {}) as { code?: unknown[]; mcq?: unknown[] };
            acc.codeQuestions += Array.isArray(q.code) ? q.code.length : 0;
            acc.mcqQuestions += Array.isArray(q.mcq) ? q.mcq.length : 0;
            return acc;
        },
        { references: 0, codeQuestions: 0, mcqQuestions: 0 }
    );

    const validReferences = validModules.reduce(
        (sum, m) => sum + (m.data.references?.length ?? 0),
        0
    );
    const validCodeRefs = validModules.reduce(
        (sum, m) => sum + (m.data.questions?.code?.length ?? 0),
        0
    );
    const validMcqRefs = validModules.reduce(
        (sum, m) => sum + (m.data.questions?.mcq?.length ?? 0),
        0
    );

    return {
        ok: true,
        validCourse: parsedCourse.data,
        validModules,
        issues,
        counts: {
            modules: parsed.rawModules.length,
            references: counts.references,
            codeQuestions: counts.codeQuestions,
            mcqQuestions: counts.mcqQuestions,
        },
        // The counts the import would actually process — validated rows only.
        validCounts: {
            modules: validModules.length,
            references: validReferences,
            codeQuestions: validCodeRefs,
            mcqQuestions: validMcqRefs,
        },
        importable: validModules.length > 0,
    };
}

// ─── Title dedupe ────────────────────────────────────────────────────────────

/**
 * Pick a fresh course title: keep the exported title when free, otherwise
 * append " (imported)" / " (imported 2)" / … so re-importing never collides.
 */
export async function uniqueCourseTitle(rawTitle: string) {
    const base = rawTitle.trim() || "Imported Course";
    const existing = await db.course.findMany({ select: { title: true } });
    const taken = new Set(existing.map((c) => c.title.trim().toLowerCase()));
    if (!taken.has(base.toLowerCase())) return { title: base, renamed: false };

    for (let n = 1; n < 100; n++) {
        const candidate =
            n === 1 ? `${base} (imported)` : `${base} (imported ${n})`;
        if (!taken.has(candidate.toLowerCase())) {
            return { title: candidate, renamed: true };
        }
    }
    return { title: `${base} (imported ${Date.now()})`, renamed: true };
}

// ─── Question reference resolution (read-only, shared) ───────────────────────

export type RefStatus = "attachable" | "missing" | "ambiguous";

export interface ResolvedRef {
    moduleIndex: number;
    moduleName: string;
    type: "code" | "mcq";
    title: string;
    status: RefStatus;
    questionId?: string;
    reason?: string;
}

export interface RefResolution {
    items: ResolvedRef[];
    attachable: { code: number; mcq: number };
    missing: { code: number; mcq: number };
    ambiguous: { code: number; mcq: number };
}

/** Normalize a matching key: trim, lowercase, collapse inner whitespace. */
function normKey(value: string | null | undefined): string {
    return (value ?? "").trim().toLowerCase().replace(/\s+/g, " ");
}

interface CodeRow {
    id: string;
    title: string;
    lang: string;
    /** Ids of every module this question is currently attached to. */
    moduleIds: string[];
    questionGroupId: string;
}

interface McqRow {
    id: string;
    title: string;
    /** Ids of every module this MCQ is currently attached to. */
    moduleIds: string[];
    questionGroupId: string;
}

function pushIndexed<T>(map: Map<string, T[]>, key: string, row: T) {
    const bucket = map.get(key);
    if (bucket) bucket.push(row);
    else map.set(key, [row]);
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
 * Resolve + disambiguate every question reference of the validated modules
 * against the question groups of this system. READ-ONLY — the dry-run
 * validate endpoint and the actual import both call it, so the report and
 * the upload always agree.
 *
 * Resolution order for one reference:
 *   1. Group-scoped: questions inside every group whose title matches the
 *      reference's groupTitle (case-insensitive) — title must match, and
 *      language too for code questions when the reference carries a lang.
 *   2. Global fallback: same title (+ language) match across ALL groups —
 *      used when the group name is missing, renamed, or doesn't hold the
 *      question in this system.
 *   3. Disambiguation: code questions prefer a candidate whose language
 *      equals the module's language; several equally good candidates →
 *      ambiguous → skipped.
 *
 * Questions are MANY-TO-MANY with modules: a question that is already
 * assigned to other modules (possibly other courses) is still attachable —
 * attaching only adds another join row, never moves anything.
 */
export async function resolveQuestionRefs(
    validModules: ValidatedCourseItems["validModules"],
    options: CourseImportOptions
): Promise<RefResolution> {
    void options; // kept for signature stability (resolution is option-free now)
    const resolution: RefResolution = {
        items: [],
        attachable: { code: 0, mcq: 0 },
        missing: { code: 0, mcq: 0 },
        ambiguous: { code: 0, mcq: 0 },
    };

    const pendingRefs: {
        moduleIndex: number;
        moduleName: string;
        moduleLanguage: string;
        type: "code" | "mcq";
        ref: z.infer<typeof QuestionRefImportSchema>;
    }[] = [];

    for (let i = 0; i < validModules.length; i++) {
        const qRefs = validModules[i].data.questions;
        if (!qRefs) continue;
        // moduleIndex is the 1-based FILE index (validModules[i].index) —
        // the import maps it through the same index it stored the created
        // module ids under.
        for (const ref of qRefs.code ?? []) {
            pendingRefs.push({
                moduleIndex: validModules[i].index,
                moduleName: validModules[i].name,
                moduleLanguage: validModules[i].data.language,
                type: "code",
                ref,
            });
        }
        for (const ref of qRefs.mcq ?? []) {
            pendingRefs.push({
                moduleIndex: validModules[i].index,
                moduleName: validModules[i].name,
                moduleLanguage: validModules[i].data.language,
                type: "mcq",
                ref,
            });
        }
    }
    if (pendingRefs.length === 0) return resolution;

    const [groupRows, codeRows, mcqRows] = await Promise.all([
        db.questionGroup.findMany({ select: { id: true, title: true } }),
        db.codeQuestion.findMany({
            select: {
                id: true,
                title: true,
                lang: true,
                modules: { select: { id: true } },
                questionGroupId: true,
            },
        }),
        db.mCQQuestion.findMany({
            select: {
                id: true,
                title: true,
                modules: { select: { id: true } },
                questionGroupId: true,
            },
        }),
    ]);

    const codeRowData: CodeRow[] = codeRows.map((q) => ({
        id: q.id,
        title: q.title,
        lang: q.lang,
        moduleIds: q.modules.map((m) => m.id),
        questionGroupId: q.questionGroupId,
    }));
    const mcqRowData: McqRow[] = mcqRows.map((q) => ({
        id: q.id,
        title: q.title,
        moduleIds: q.modules.map((m) => m.id),
        questionGroupId: q.questionGroupId,
    }));

    // Normalized group title → ids (group titles are not unique).
    const groupsByTitle = new Map<string, string[]>();
    for (const g of groupRows) {
        const key = normKey(g.title);
        if (!key) continue;
        const ids = groupsByTitle.get(key);
        if (ids) ids.push(g.id);
        else groupsByTitle.set(key, [g.id]);
    }

    const codeIdx = indexCodeRows(codeRowData);
    const mcqIdx = indexMcqRows(mcqRowData);

    for (const { moduleIndex, moduleName, moduleLanguage, type, ref } of pendingRefs) {
        const refTitle = normKey(ref.title);
        const refLang = normKey(ref.lang);
        const groupKey = normKey(ref.groupTitle);

        let questionId: string | null = null;
        let status: RefStatus = "missing";
        let reason = "";

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

            if (candidates.length === 0) {
                status = "missing";
                reason = refLang
                    ? `Not found in the question groups (looked for "${ref.title}" [${ref.lang}])`
                    : `Not found in the question groups (looked for "${ref.title}")`;
            } else {
                // Disambiguation: without a reference language, prefer the
                // candidate matching the module's language.
                let pool = candidates;
                if (!refLang && pool.length > 1) {
                    const mLang = normKey(moduleLanguage);
                    const narrowed = pool.filter((row) => normKey(row.lang) === mLang);
                    if (narrowed.length === 1) pool = narrowed;
                }
                if (pool.length === 1) {
                    questionId = pool[0].id;
                    status = "attachable";
                } else {
                    status = "ambiguous";
                    reason =
                        "Ambiguous match — multiple questions share this title in the question groups";
                }
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

            if (candidates.length === 0) {
                status = "missing";
                reason = `Not found in the question groups (looked for "${ref.title}")`;
            } else if (candidates.length === 1) {
                questionId = candidates[0].id;
                status = "attachable";
            } else {
                status = "ambiguous";
                reason =
                    "Ambiguous match — multiple questions share this title in the question groups";
            }
        }

        if (status === "attachable" && questionId) resolution.attachable[type]++;
        else if (status === "missing") resolution.missing[type]++;
        else if (status === "ambiguous") resolution.ambiguous[type]++;

        resolution.items.push({
            moduleIndex,
            moduleName,
            type,
            title: ref.title,
            status,
            questionId: questionId ?? undefined,
            reason: reason || undefined,
        });
    }

    return resolution;
}

export function resolutionToIssues(resolution: RefResolution): QuestionRefIssue[] {
    return resolution.items
        .filter((item) => item.status !== "attachable")
        .map((item) => ({
            module: item.moduleName,
            moduleIndex: item.moduleIndex,
            type: item.type,
            title: item.title,
            reason:
                item.status === "ambiguous"
                    ? item.reason ??
                      "Ambiguous match — multiple questions share this title in the question groups"
                    : item.reason ?? "Not found in the question groups",
        }));
}

// ─── Import execution (event-sourced for streaming) ──────────────────────────

export interface CourseImportResult {
    success?: string;
    error?: string;
    courseId?: string;
    courseTitle?: string;
    createdModules?: number;
    createdReferences?: number;
    attachedCodeQuestions?: number;
    attachedMcqQuestions?: number;
    /** Question references that could not be attached (missing/ambiguous). */
    missingQuestions?: number;
    questionIssues?: QuestionRefIssue[];
    failed?: number;
    errors?: CourseImportIssue[];
}

export type CoursePhase = "modules" | "references" | "code" | "mcq";

export type CourseImportEvent =
    | {
          t: "start";
          counts: ValidatedCourseItems["counts"];
          validCounts: {
              modules: number;
              references: number;
              attachableCode: number;
              attachableMcq: number;
          };
      }
    | { t: "title"; title: string; renamed: boolean }
    | { t: "course"; courseId: string }
    | { t: "phase"; phase: CoursePhase; total: number }
    | {
          t: "progress";
          phase: CoursePhase;
          done: number;
          total: number;
          inserted: number;
          failed: number;
      }
    | { t: "done"; status: 201 | 400; result: CourseImportResult };

/**
 * Run the full import as an async generator of progress events so the API
 * route can either stream them (NDJSON) or fold them into one JSON response.
 *
 * Guarantees:
 *   - nothing is written when the envelope is invalid, the course shell
 *     fails validation or EVERY module fails validation (no orphan courses);
 *   - the course is created only when at least one module validates;
 *   - modules are created in file order (queue sequence preserved);
 *   - per-row failures are reported, never fatal.
 *
 * Phases (in order): modules → references → code → mcq. The references and
 * question-attach phases are skipped (total 0) when the corresponding
 * option is off or the file carries none.
 */
export async function* runCourseImport(
    body: unknown,
    chunkSize: number = COURSE_ATTACH_CHUNK_SIZE
): AsyncGenerator<CourseImportEvent> {
    // ── Parse ────────────────────────────────────────────────────────────────
    const parsed = parseCourseEnvelope(body);
    if (!parsed.ok) {
        yield { t: "done", status: 400, result: { error: parsed.error } };
        return;
    }

    // ── Validate (pure) — nothing is created before at least one module ─────
    const validation = validateCourseImportItems(parsed);
    if (!validation.ok) {
        yield { t: "done", status: 400, result: { error: validation.error } };
        return;
    }

    const options = readImportOptions(body);

    // ── Resolve question references (read-only) ─────────────────────────────
    const resolution = await resolveQuestionRefs(validation.validModules, options);

    yield {
        t: "start",
        counts: validation.counts,
        validCounts: {
            modules: validation.validModules.length,
            references: options.includeReferences
                ? validation.validModules.reduce(
                      (sum, m) => sum + (m.data.references?.length ?? 0),
                      0
                  )
                : 0,
            attachableCode: options.attachQuestions ? resolution.attachable.code : 0,
            attachableMcq: options.attachQuestions ? resolution.attachable.mcq : 0,
        },
    };

    if (!validation.importable) {
        yield {
            t: "done",
            status: 400,
            result: {
                error:
                    validation.issues.length > 0
                        ? "Nothing to import — every module in the file failed validation. Nothing was created."
                        : "Nothing to import — the file has no modules.",
                failed: validation.issues.length,
                errors: validation.issues.slice(0, 10),
            },
        };
        return;
    }

    // ── Title + course shell ────────────────────────────────────────────────
    const { title, renamed } = await uniqueCourseTitle(validation.validCourse.title);
    yield { t: "title", title, renamed };

    const course = await db.course.create({
        data: {
            title,
            startdate: validation.validCourse.startdate,
            enddate: validation.validCourse.enddate,
            language: validation.validCourse.language,
            completionOrder: validation.validCourse.completionOrder,
            courseType: validation.validCourse.courseType ?? "code-mcq",
            anyLanguage: validation.validCourse.anyLanguage ?? false,
        },
    });
    yield { t: "course", courseId: course.id };

    const errors: CourseImportIssue[] = [...validation.issues];
    const questionIssues: QuestionRefIssue[] = options.attachQuestions
        ? resolutionToIssues(resolution)
        : [];
    let createdModules = 0;
    let createdReferences = 0;

    // Module DB ids keyed by file-order index — filled during phase 1 and
    // reused by the references and question-attach phases.
    const moduleIdByIndex = new Map<number, string>();

    // ── Phase 1: modules (file order → queue sequence preserved) ────────────
    yield { t: "phase", phase: "modules", total: validation.validModules.length };
    {
        let done = 0;
        for (const item of validation.validModules) {
            try {
                const createdModule = await db.module.create({
                    data: {
                        title: item.data.title,
                        courseId: course.id,
                        moduledate: item.data.moduledate,
                        modulestatus: item.data.modulestatus,
                        language: item.data.language,
                        maxscore: item.data.maxscore,
                        concepturl: item.data.concepturl ?? null,
                    },
                });
                createdModules++;
                moduleIdByIndex.set(item.index, createdModule.id);
            } catch (err) {
                // Never surface raw driver/prisma text to the client — log it.
                console.error("[courses/import] module create failed:", err);
                errors.push({
                    kind: "module",
                    index: item.index,
                    name: item.name,
                    error: "Import failed. Check the file format and try again.",
                });
            }
            done++;
            yield {
                t: "progress",
                phase: "modules",
                done,
                total: validation.validModules.length,
                inserted: createdModules,
                failed: done - createdModules,
            };
        }
    }

    // ── Phase 2: reference material (per module, nested create) ─────────────
    {
        const modulesWithRefs = validation.validModules.filter(
            (m) => (m.data.references?.length ?? 0) > 0
        );
        const totalRefs = options.includeReferences
            ? modulesWithRefs.reduce((sum, m) => sum + (m.data.references?.length ?? 0), 0)
            : 0;
        yield { t: "phase", phase: "references", total: totalRefs };

        let done = 0;
        if (options.includeReferences && totalRefs > 0) {
            for (const item of modulesWithRefs) {
                const moduleId = moduleIdByIndex.get(item.index);
                const refs = item.data.references ?? [];
                if (!moduleId) {
                    // Module with the same refs failed validation/creation.
                    done += refs.length;
                    yield {
                        t: "progress",
                        phase: "references",
                        done,
                        total: totalRefs,
                        inserted: createdReferences,
                        failed: done - createdReferences,
                    };
                    continue;
                }
                try {
                    // Dedupe references by title+link within the module.
                    const seen = new Set<string>();
                    const rows: { title: string; link: string; type: string }[] = [];
                    for (const ref of refs) {
                        const key = `${ref.title.trim().toLowerCase()}|${ref.link.trim()}`;
                        if (seen.has(key)) continue;
                        seen.add(key);
                        rows.push({
                            title: ref.title.trim(),
                            link: ref.link.trim(),
                            type: ref.type.trim(),
                        });
                    }
                    if (rows.length > 0) {
                        await db.moduleReferences.createMany({
                            data: rows.map((r) => ({ ...r, moduleId })),
                        });
                        createdReferences += rows.length;
                    }
                } catch (err) {
                    console.error("[courses/import] reference create failed:", err);
                    errors.push({
                        kind: "module",
                        index: item.index,
                        name: item.name,
                        error: "Reference material could not be imported.",
                    });
                }
                done += refs.length;
                yield {
                    t: "progress",
                    phase: "references",
                    done,
                    total: totalRefs,
                    inserted: createdReferences,
                    failed: done - createdReferences,
                };
            }
        }
    }

    // ── Phase 3 + 4: attach questions (chunked concurrent updates) ──────────
    let attachedCode = 0;
    let attachedMcq = 0;

    if (options.attachQuestions) {
        const attachableItems = resolution.items.filter(
            (item) =>
                item.status === "attachable" && typeof item.questionId === "string"
        );

        const codeUpdates: { id: string; moduleId: string }[] = [];
        const mcqUpdates: { id: string; moduleId: string }[] = [];
        for (const item of attachableItems) {
            const moduleId = moduleIdByIndex.get(item.moduleIndex);
            if (!moduleId) continue;
            if (item.type === "code") {
                codeUpdates.push({ id: item.questionId!, moduleId });
            } else {
                mcqUpdates.push({ id: item.questionId!, moduleId });
            }
        }

        yield { t: "phase", phase: "code", total: codeUpdates.length };
        {
            let done = 0;
            for (let i = 0; i < codeUpdates.length; i += chunkSize) {
                const slice = codeUpdates.slice(i, i + chunkSize);
                const results = await Promise.allSettled(
                    slice.map((u) =>
                        db.codeQuestion.update({
                            where: { id: u.id },
                            // Many-to-many attach: adds a join row — the
                            // question keeps its other module assignments.
                            data: { modules: { connect: { id: u.moduleId } } },
                        })
                    )
                );
                results.forEach((r) => {
                    if (r.status === "fulfilled") attachedCode++;
                });
                done += slice.length;
                yield {
                    t: "progress",
                    phase: "code",
                    done,
                    total: codeUpdates.length,
                    inserted: attachedCode,
                    failed: done - attachedCode,
                };
            }
        }

        yield { t: "phase", phase: "mcq", total: mcqUpdates.length };
        {
            let done = 0;
            for (let i = 0; i < mcqUpdates.length; i += chunkSize) {
                const slice = mcqUpdates.slice(i, i + chunkSize);
                const results = await Promise.allSettled(
                    slice.map((u) =>
                        db.mCQQuestion.update({
                            where: { id: u.id },
                            // Many-to-many attach: adds a join row — the
                            // MCQ keeps its other module assignments.
                            data: { modules: { connect: { id: u.moduleId } } },
                        })
                    )
                );
                results.forEach((r) => {
                    if (r.status === "fulfilled") attachedMcq++;
                });
                done += slice.length;
                yield {
                    t: "progress",
                    phase: "mcq",
                    done,
                    total: mcqUpdates.length,
                    inserted: attachedMcq,
                    failed: done - attachedMcq,
                };
            }
        }
    } else {
        // Option off — emit the phases with total 0 so the wizard renders them.
        yield { t: "phase", phase: "code", total: 0 };
        yield { t: "phase", phase: "mcq", total: 0 };
    }

    // ── Result ──────────────────────────────────────────────────────────────
    if (validation.validModules.length > 0 && createdModules === 0) {
        yield {
            t: "done",
            status: 400,
            result: {
                error: `Course "${title}" was created but no module could be imported.`,
                courseId: course.id,
                createdModules: 0,
                failed: errors.length,
                errors: errors.slice(0, 10),
            },
        };
        return;
    }

    const parts: string[] = [`${createdModules} module(s)`];
    if (createdReferences) parts.push(`${createdReferences} reference(s)`);
    if (attachedCode) parts.push(`${attachedCode} code question(s) attached`);
    if (attachedMcq) parts.push(`${attachedMcq} MCQ(s) attached`);
    if (questionIssues.length)
        parts.push(`${questionIssues.length} question reference(s) unmatched`);
    if (validation.validModules.length === 0) parts.push("(no modules in file)");

    yield {
        t: "done",
        status: 201,
        result: {
            success: `Imported course "${title}": ${parts.join(", ")}${
                errors.length ? `, ${errors.length} module(s) skipped` : ""
            }`,
            courseId: course.id,
            courseTitle: title,
            createdModules,
            createdReferences,
            attachedCodeQuestions: attachedCode,
            attachedMcqQuestions: attachedMcq,
            missingQuestions: questionIssues.length,
            questionIssues: questionIssues.slice(0, 10),
            failed: errors.length,
            errors: errors.slice(0, 10),
        },
    };
}

/** JSON-mode helper: fold the generator into one {status, result}. */
export async function runCourseImportToJson(
    body: unknown,
    chunkSize?: number
): Promise<{ status: 201 | 400; result: CourseImportResult }> {
    let final: { status: 201 | 400; result: CourseImportResult } = {
        status: 400,
        result: { error: "Import produced no result." },
    };
    for await (const event of runCourseImport(body, chunkSize)) {
        if (event.t === "done") final = { status: event.status, result: event.result };
    }
    return final;
}
