import * as z from "zod";

import { db } from "@/lib/db";
import { AddQuestionBaseSchema } from "@/schemas/question-schema";
import { GroupMcqSchema } from "@/schemas/group-mcq-schema";
import { TopicImportItemSchema, type TopicImportItem } from "@/schemas/topic-schema";
import { TRANSFER_LANG_IDS } from "@/lib/question-transfer";
import { createTopicWithGeneral, ensureGeneralTopic } from "@/lib/topics";

/**
 * Shared question-group import engine — used by:
 *   - POST /api/question-groups/import            (JSON mode + NDJSON stream mode)
 *   - POST /api/question-groups/import/validate   (dry-run pre-check)
 *   - POST /api/question-groups/[id]/questions/import + mcq import (normalizers)
 *
 * Single source of truth for envelope parsing, tolerant normalization and
 * the validate → create → chunked-insert pipeline, so every import surface
 * behaves identically.
 */

/** Rows are inserted in concurrent chunks so huge files stay fast. */
export const GROUP_IMPORT_CHUNK_SIZE = 20;

// ─── Envelope parsing ────────────────────────────────────────────────────────

export interface ParsedGroupEnvelope {
    ok: true;
    rawTopics: unknown[];
    rawQuestions: unknown[];
    rawMcqs: unknown[];
    exportedTitle: string;
}

/**
 * Accepts the full group export (kind: "question-group"), the per-part
 * envelopes (topics / questions / mcqs) and bare arrays — the same shapes
 * POST /api/question-groups/import always accepted.
 */
export function parseGroupImportEnvelope(body: unknown): ParsedGroupEnvelope | { ok: false; error: string } {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return { ok: false, error: "Invalid file — expected a question-group export." };
    }
    const envelope = body as Record<string, unknown>;

    // Only accept files this app produced (keeps accidental uploads safe).
    if (envelope.atomcodeExport !== true) {
        return {
            ok: false,
            error:
                "This file is not an AtomCode export. Export a group first, then import that JSON file.",
        };
    }

    const rawTopics = Array.isArray(envelope.topics)
        ? envelope.topics
        : Array.isArray((envelope.group as { topics?: unknown })?.topics)
          ? ((envelope.group as { topics: unknown[] }).topics as unknown[])
          : [];
    const rawQuestions = Array.isArray(envelope.questions)
        ? envelope.questions
        : Array.isArray((envelope.group as { questions?: unknown })?.questions)
          ? ((envelope.group as { questions: unknown[] }).questions as unknown[])
          : [];
    const rawMcqs = Array.isArray(envelope.mcqQuestions)
        ? envelope.mcqQuestions
        : Array.isArray((envelope as { mcqs?: unknown }).mcqs)
          ? ((envelope as { mcqs: unknown[] }).mcqs)
          : Array.isArray((envelope.group as { mcqQuestions?: unknown })?.mcqQuestions)
            ? ((envelope.group as { mcqQuestions: unknown[] }).mcqQuestions as unknown[])
            : [];

    const exportedTitle =
        typeof (envelope.group as { title?: unknown })?.title === "string"
            ? (envelope.group as { title: string }).title
            : typeof envelope.title === "string"
              ? envelope.title
              : "";

    return { ok: true, rawTopics, rawQuestions, rawMcqs, exportedTitle };
}

// ─── Tolerant normalization ──────────────────────────────────────────────────

/**
 * Optional string columns on CodeQuestion. JSON exports emit `null` for
 * every missing value (toTransferRow maps undefined → null) and the zod
 * schemas use `.optional()` (which rejects null) — so every null is turned
 * back into undefined before validation. Includes the classification
 * fields (company/frequency/headerCode/tags) and nullable sourcecode.
 */
const CODE_NULLABLE_STRING_FIELDS = [
    "topic",
    "subtopic",
    "inputconstrains",
    "blacklist",
    "whitelist",
    "referenceimg",
    "sourcecode",
    "company",
    "frequency",
    "headerCode",
    "tags",
] as const;

/**
 * Tolerate hand-edited and DB-shaped files for CODE questions: numeric
 * strings for maxscore/acceptanceRate, language + difficulty in any
 * casing, null optionals → undefined, empty strings → undefined.
 */
export function normalizeCodeImportRow(item: unknown): unknown {
    if (!item || typeof item !== "object") return item;
    const obj = { ...(item as Record<string, unknown>) };

    if (
        typeof obj.maxscore === "string" &&
        obj.maxscore.trim() !== "" &&
        !Number.isNaN(Number(obj.maxscore))
    ) {
        obj.maxscore = Number(obj.maxscore);
    }
    if (obj.acceptanceRate === "") obj.acceptanceRate = undefined;
    if (
        typeof obj.acceptanceRate === "string" &&
        obj.acceptanceRate.trim() !== "" &&
        !Number.isNaN(Number(obj.acceptanceRate))
    ) {
        obj.acceptanceRate = Number(obj.acceptanceRate);
    }

    // Language ids are lowercase ("python", "cpp", …) — tolerate "Python"/"C++".
    if (typeof obj.lang === "string") {
        obj.lang = obj.lang.trim().toLowerCase();
    }
    // Difficulty values are lowercase ("easy"/"medium"/"hard").
    if (typeof obj.difficulty === "string") {
        obj.difficulty = obj.difficulty.trim().toLowerCase();
    } else if (obj.difficulty === null) {
        obj.difficulty = undefined;
    }
    if (obj.questionType === null) obj.questionType = undefined;
    if (typeof obj.questionType === "string") {
        const value = obj.questionType.trim().toLowerCase();
        obj.questionType = value === "lab" || value === "practice" ? value : undefined;
    }

    for (const field of CODE_NULLABLE_STRING_FIELDS) {
        if (obj[field] === null || obj[field] === "") obj[field] = undefined;
    }

    return obj;
}

/**
 * Tolerate hand-edited MCQ files: booleans as "true"/"false"/1/0,
 * CorrectOption as a numeric string, difficulty in any casing, empty
 * optional strings → null, and a missing iscodesnippet inferred from the
 * presence of a snippet.
 */
export function normalizeMcqImportRow(item: unknown): unknown {
    if (!item || typeof item !== "object") return item;
    const obj = { ...(item as Record<string, unknown>) };

    if (typeof obj.iscodesnippet === "string") {
        const flag = obj.iscodesnippet.trim().toLowerCase();
        if (flag === "true" || flag === "1" || flag === "yes") obj.iscodesnippet = true;
        else if (flag === "false" || flag === "0" || flag === "no") obj.iscodesnippet = false;
    } else if (typeof obj.iscodesnippet === "number") {
        if (obj.iscodesnippet === 1) obj.iscodesnippet = true;
        else if (obj.iscodesnippet === 0) obj.iscodesnippet = false;
    }
    // Hand-edited files often drop the flag entirely — treat a missing
    // iscodesnippet as "no snippet" instead of failing the whole MCQ.
    if (obj.iscodesnippet === undefined || obj.iscodesnippet === null) {
        obj.iscodesnippet = false;
        if (obj.codesnippet) {
            obj.iscodesnippet = true;
            obj.snippetLang ??= "text";
        }
    }

    if (
        typeof obj.CorrectOption === "string" &&
        obj.CorrectOption.trim() !== "" &&
        !Number.isNaN(Number(obj.CorrectOption))
    ) {
        obj.CorrectOption = Number(obj.CorrectOption);
    }

    if (typeof obj.difficulty === "string") {
        const value = obj.difficulty.trim().toLowerCase();
        obj.difficulty =
            value === "medium" || value === "hard" || value === "easy"
                ? value
                : undefined;
    } else if (obj.difficulty === null) {
        obj.difficulty = undefined;
    }

    for (const field of [
        "snippetLang",
        "codesnippet",
        "referenceimg",
        "topic",
        "subtopic",
        "tags",
    ] as const) {
        if (obj[field] === "" || obj[field] === undefined) obj[field] = null;
    }

    return obj;
}

// ─── Import schemas ──────────────────────────────────────────────────────────

/**
 * Code-question import schema: the interactive add-question shape minus
 * questionGroupId (assigned after parsing) — with sourcecode relaxed to
 * nullable (the DB column is nullable; questions without server code are
 * valid). Built from the BASE schema because zod v4 forbids omit/extend on
 * schemas carrying refinements; the lab-question requirements are re-applied
 * here alongside the language allow-list via superRefine.
 */
export const GroupImportQuestionSchema = AddQuestionBaseSchema.omit({
    questionGroupId: true,
}).extend({
    sourcecode: z.string().min(1).nullish(),
}).superRefine((value, ctx) => {
    if (!(TRANSFER_LANG_IDS as readonly string[]).includes(value.lang)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["lang"],
            message: `Unsupported language "${value.lang}"`,
        });
    }
    // Lab questions must carry company + frequency + acceptance rate
    // (mirrors AddQuestionSchema's refinement).
    if (value.questionType === "lab") {
        if (!value.company || !value.company.trim()) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["company"],
                message: "Company name is required for lab questions",
            });
        }
        if (!value.frequency || !value.frequency.trim()) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["frequency"],
                message: "Frequency is required for lab questions",
            });
        }
        if (value.acceptanceRate === undefined || value.acceptanceRate === null) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["acceptanceRate"],
                message: "Acceptance rate is required for lab questions",
            });
        }
    }
});

export type GroupImportQuestionData = z.infer<typeof GroupImportQuestionSchema>;
export type GroupImportMcqData = z.infer<typeof GroupMcqSchema>;

export interface GroupImportIssue {
    kind: "topic" | "code" | "mcq";
    index: number;
    name: string;
    error: string;
}

export interface ValidatedGroupItems {
    validTopics: { index: number; name: string; data: TopicImportItem }[];
    validCode: { index: number; name: string; data: GroupImportQuestionData }[];
    validMcq: { index: number; name: string; data: GroupImportMcqData }[];
    issues: GroupImportIssue[];
    counts: { topics: number; subtopics: number; codeQuestions: number; mcqQuestions: number };
    importable: boolean;
}

/**
 * Pure (no DB writes) validation of every row in the envelope — shared by
 * the dry-run validate endpoint and the actual import.
 */
export function validateGroupImportItems(parsed: ParsedGroupEnvelope): ValidatedGroupItems {
    const issues: GroupImportIssue[] = [];

    const validTopics: ValidatedGroupItems["validTopics"] = [];
    for (let i = 0; i < parsed.rawTopics.length; i++) {
        const parsedTopic = TopicImportItemSchema.safeParse(parsed.rawTopics[i]);
        const name =
            typeof (parsed.rawTopics[i] as { name?: unknown })?.name === "string"
                ? ((parsed.rawTopics[i] as { name: string }).name.trim() || `#${i + 1}`)
                : `#${i + 1}`;
        if (!parsedTopic.success) {
            issues.push({
                kind: "topic",
                index: i + 1,
                name,
                error: parsedTopic.error.issues[0]?.message ?? "Invalid topic",
            });
            continue;
        }
        validTopics.push({ index: i + 1, name, data: parsedTopic.data });
    }

    const validCode: ValidatedGroupItems["validCode"] = [];
    for (let i = 0; i < parsed.rawQuestions.length; i++) {
        const item = normalizeCodeImportRow(parsed.rawQuestions[i]);
        const qTitle =
            typeof (item as { title?: unknown })?.title === "string" &&
            (item as { title: string }).title.trim() !== ""
                ? (item as { title: string }).title
                : `#${i + 1}`;
        const parsedQuestion = GroupImportQuestionSchema.safeParse(item);
        if (!parsedQuestion.success) {
            issues.push({
                kind: "code",
                index: i + 1,
                name: qTitle,
                error: parsedQuestion.error.issues[0]?.message ?? "Invalid code question",
            });
            continue;
        }
        validCode.push({ index: i + 1, name: qTitle, data: parsedQuestion.data });
    }

    const validMcq: ValidatedGroupItems["validMcq"] = [];
    for (let i = 0; i < parsed.rawMcqs.length; i++) {
        const item = normalizeMcqImportRow(parsed.rawMcqs[i]);
        const mTitle =
            typeof (item as { title?: unknown })?.title === "string" &&
            (item as { title: string }).title.trim() !== ""
                ? (item as { title: string }).title
                : `#${i + 1}`;
        const parsedMcq = GroupMcqSchema.safeParse(item);
        if (!parsedMcq.success) {
            issues.push({
                kind: "mcq",
                index: i + 1,
                name: mTitle,
                error: parsedMcq.error.issues[0]?.message ?? "Invalid MCQ",
            });
            continue;
        }
        validMcq.push({ index: i + 1, name: mTitle, data: parsedMcq.data });
    }

    const subtopicCount = parsed.rawTopics.reduce<number>((sum, t) => {
        const subs = (t as { subtopics?: unknown })?.subtopics;
        return sum + (Array.isArray(subs) ? subs.length : 0);
    }, 0);

    return {
        validTopics,
        validCode,
        validMcq,
        issues,
        counts: {
            topics: parsed.rawTopics.length,
            subtopics: subtopicCount,
            codeQuestions: parsed.rawQuestions.length,
            mcqQuestions: parsed.rawMcqs.length,
        },
        importable:
            validTopics.length + validCode.length + validMcq.length > 0,
    };
}

// ─── Title dedupe ────────────────────────────────────────────────────────────

/**
 * Pick a fresh group title: keep the exported title when free, otherwise
 * append " (imported)" / " (imported 2)" / … so re-importing never collides.
 */
export async function uniqueGroupTitle(rawTitle: string) {
    const base = rawTitle.trim() || "Imported Group";
    const existing = await db.questionGroup.findMany({
        select: { title: true },
    });
    const taken = new Set(existing.map((g) => g.title.trim().toLowerCase()));
    if (!taken.has(base.toLowerCase())) return base;

    for (let n = 1; n < 100; n++) {
        const candidate =
            n === 1 ? `${base} (imported)` : `${base} (imported ${n})`;
        if (!taken.has(candidate.toLowerCase())) return candidate;
    }
    return `${base} (imported ${Date.now()})`;
}

// ─── Import execution (event-sourced for streaming) ──────────────────────────

export interface GroupImportResult {
    success?: string;
    error?: string;
    groupId?: string;
    groupTitle?: string;
    createdTopics?: number;
    createdSubtopics?: number;
    createdQuestions?: number;
    createdMcqs?: number;
    failed?: number;
    errors?: GroupImportIssue[];
}

export type GroupImportEvent =
    | { t: "start"; counts: ValidatedGroupItems["counts"]; validCounts: { topics: number; codeQuestions: number; mcqQuestions: number } }
    | { t: "title"; title: string; renamed: boolean }
    | { t: "group"; groupId: string }
    | { t: "phase"; phase: "topics" | "code" | "mcq"; total: number }
    | {
          t: "progress";
          phase: "topics" | "code" | "mcq";
          done: number;
          total: number;
          inserted: number;
          failed: number;
      }
    | { t: "done"; status: 201 | 400; result: GroupImportResult };

/** Merge one imported topic (and its subtopics) into the group by name. */
async function importTopic(groupId: string, item: TopicImportItem) {
    const { topic, created } = await createTopicWithGeneral(groupId, item.name);
    let subtopics = 0;

    const seen = new Set<string>();
    for (const sub of item.subtopics ?? []) {
        const subName = sub.name.trim();
        if (!subName || seen.has(subName.toLowerCase())) continue;
        seen.add(subName.toLowerCase());

        const exists = await db.subTopic.findFirst({
            where: {
                topicId: topic.id,
                name: { equals: subName, mode: "insensitive" },
            },
        });
        if (!exists) {
            await db.subTopic.create({
                data: { topicId: topic.id, name: subName },
            });
            subtopics++;
        }
    }

    return { topics: created ? 1 : 0, subtopics };
}

/**
 * Run the full import as an async generator of progress events so the API
 * route can either stream them (NDJSON) or fold them into one JSON response.
 *
 * Guarantees:
 *   - nothing is written when the envelope is invalid or every row is
 *     invalid (no orphan empty groups);
 *   - the group is created only when at least one item validates;
 *   - rows insert in concurrent chunks; per-row failures are reported,
 *     never fatal.
 */
export async function* runGroupImport(
    body: unknown,
    chunkSize: number = GROUP_IMPORT_CHUNK_SIZE
): AsyncGenerator<GroupImportEvent> {
    // ── Parse ────────────────────────────────────────────────────────────────
    const parsed = parseGroupImportEnvelope(body);
    if (!parsed.ok) {
        yield { t: "done", status: 400, result: { error: parsed.error } };
        return;
    }

    // ── Validate (pure) ─────────────────────────────────────────────────────
    const validation = validateGroupImportItems(parsed);
    yield {
        t: "start",
        counts: validation.counts,
        validCounts: {
            topics: validation.validTopics.length,
            codeQuestions: validation.validCode.length,
            mcqQuestions: validation.validMcq.length,
        },
    };

    if (!validation.importable) {
        yield {
            t: "done",
            status: 400,
            result: {
                error:
                    validation.issues.length > 0
                        ? "Nothing to import — every item in the file failed validation. Nothing was created."
                        : "Nothing to import — the file has no topics, code questions or MCQs.",
                failed: validation.issues.length,
                errors: validation.issues.slice(0, 10),
            },
        };
        return;
    }

    // ── Title + group shell ─────────────────────────────────────────────────
    const title = await uniqueGroupTitle(parsed.exportedTitle);
    yield { t: "title", title, renamed: title !== parsed.exportedTitle.trim() };

    const group = await db.questionGroup.create({ data: { title } });
    await ensureGeneralTopic(group.id);
    yield { t: "group", groupId: group.id };

    // Validation-rejected rows count as failures too (same as the historical
    // behavior): they are skipped during the import and reported in the
    // final result's failed count + errors list.
    const errors: GroupImportIssue[] = [...validation.issues];
    let createdTopics = 0;
    let createdSubtopics = 0;
    let createdQuestions = 0;
    let createdMcqs = 0;
    let skippedTopics = 0;

    // ── Topics + sub topics (merge by name) ─────────────────────────────────
    yield { t: "phase", phase: "topics", total: validation.validTopics.length };
    {
        let done = 0;
        for (const item of validation.validTopics) {
            try {
                const r = await importTopic(group.id, item.data);
                createdTopics += r.topics;
                createdSubtopics += r.subtopics;
                if (r.topics === 0) skippedTopics++;
            } catch (err) {
                errors.push({
                    kind: "topic",
                    index: item.index,
                    name: item.name,
                    error:
                        err instanceof Error
                            ? err.message
                            : "Database error while creating the topic",
                });
            }
            done++;
            yield {
                t: "progress",
                phase: "topics",
                done,
                total: validation.validTopics.length,
                inserted: createdTopics,
                failed: done - createdTopics,
            };
        }
    }

    // ── Code questions (chunked inserts) ────────────────────────────────────
    yield { t: "phase", phase: "code", total: validation.validCode.length };
    {
        let done = 0;
        for (let c = 0; c < validation.validCode.length; c += chunkSize) {
            const chunk = validation.validCode.slice(c, c + chunkSize);
            const results = await Promise.allSettled(
                chunk.map((q) =>
                    db.codeQuestion.create({
                        data: { ...q.data, questionGroupId: group.id },
                    })
                )
            );
            results.forEach((r, j) => {
                const q = chunk[j];
                if (r.status === "fulfilled") {
                    createdQuestions++;
                } else {
                    errors.push({
                        kind: "code",
                        index: q.index,
                        name: q.name,
                        error:
                            r.reason instanceof Error
                                ? r.reason.message
                                : "Database error while creating the code question",
                    });
                }
            });
            done += chunk.length;
            yield {
                t: "progress",
                phase: "code",
                done,
                total: validation.validCode.length,
                inserted: createdQuestions,
                failed: done - createdQuestions,
            };
        }
    }

    // ── MCQ questions (chunked inserts) ─────────────────────────────────────
    yield { t: "phase", phase: "mcq", total: validation.validMcq.length };
    {
        let done = 0;
        for (let c = 0; c < validation.validMcq.length; c += chunkSize) {
            const chunk = validation.validMcq.slice(c, c + chunkSize);
            const results = await Promise.allSettled(
                chunk.map((m) =>
                    db.mCQQuestion.create({
                        data: { ...m.data, questionGroupId: group.id },
                    })
                )
            );
            results.forEach((r, j) => {
                const m = chunk[j];
                if (r.status === "fulfilled") {
                    createdMcqs++;
                } else {
                    errors.push({
                        kind: "mcq",
                        index: m.index,
                        name: m.name,
                        error:
                            r.reason instanceof Error
                                ? r.reason.message
                                : "Database error while creating the MCQ",
                    });
                }
            });
            done += chunk.length;
            yield {
                t: "progress",
                phase: "mcq",
                done,
                total: validation.validMcq.length,
                inserted: createdMcqs,
                failed: done - createdMcqs,
            };
        }
    }

    // ── Result (same shape as the historical JSON response) ─────────────────
    const totalCreated =
        createdTopics + createdSubtopics + createdQuestions + createdMcqs;
    if (totalCreated === 0) {
        yield {
            t: "done",
            status: 400,
            result: {
                error: `Group "${title}" was created but nothing could be imported into it.`,
                groupId: group.id,
                failed: errors.length,
                errors: errors.slice(0, 10),
            },
        };
        return;
    }

    const parts: string[] = [];
    if (createdTopics || skippedTopics) {
        parts.push(
            `${createdTopics} topic(s)${skippedTopics ? ` (${skippedTopics} merged)` : ""}`
        );
    }
    if (createdSubtopics) parts.push(`${createdSubtopics} sub topic(s)`);
    if (createdQuestions) parts.push(`${createdQuestions} code question(s)`);
    if (createdMcqs) parts.push(`${createdMcqs} MCQ(s)`);

    yield {
        t: "done",
        status: 201,
        result: {
            success: `Imported into "${title}": ${parts.join(", ")}${
                errors.length ? `, ${errors.length} item(s) skipped` : ""
            }`,
            groupId: group.id,
            groupTitle: title,
            createdTopics,
            createdSubtopics,
            createdQuestions,
            createdMcqs,
            failed: errors.length,
            errors: errors.slice(0, 10),
        },
    };
}

/** JSON-mode helper: fold the generator into one {status, result}. */
export async function runGroupImportToJson(
    body: unknown,
    chunkSize?: number
): Promise<{ status: 201 | 400; result: GroupImportResult }> {
    let final: { status: 201 | 400; result: GroupImportResult } = {
        status: 400,
        result: { error: "Import produced no result." },
    };
    for await (const event of runGroupImport(body, chunkSize)) {
        if (event.t === "done") final = { status: event.status, result: event.result };
    }
    return final;
}
