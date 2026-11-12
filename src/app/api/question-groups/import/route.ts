import { NextResponse } from "next/server";
import * as z from "zod";

import { db } from "@/lib/db";
import { requireAdminApi } from "@/lib/api-admin-guard";
import { AddQuestionSchema } from "@/schemas/question-schema";
import { GroupMcqSchema } from "@/schemas/group-mcq-schema";
import { TopicImportItemSchema, type TopicImportItem } from "@/schemas/topic-schema";
import { TRANSFER_LANG_IDS } from "@/lib/question-transfer";
import { createTopicWithGeneral, ensureGeneralTopic } from "@/lib/topics";

/** Per-batch sanity caps so one import cannot flood the database. */
const MAX_TOPICS_PER_IMPORT = 200;
const MAX_QUESTIONS_PER_IMPORT = 200;
const MAX_MCQS_PER_IMPORT = 200;

/** Extended language check — AddQuestionSchema only requires a non-empty string. */
const ImportQuestionSchema = AddQuestionSchema.superRefine((value, ctx) => {
    if (!(TRANSFER_LANG_IDS as readonly string[]).includes(value.lang)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["lang"],
            message: `Unsupported language "${value.lang}"`,
        });
    }
});

interface ImportIssue {
    index: number;
    name: string;
    error: string;
}

/** "test group!" → "test-group" — kept local to avoid client-code imports. */
function slugify(name: string): string {
    return (
        name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "") || "group"
    );
}

/**
 * Pick a fresh group title: keep the exported title when free, otherwise
 * append " (imported)" / " (imported 2)" / … so re-importing never collides.
 */
async function uniqueGroupTitle(rawTitle: string) {
    const base = rawTitle.trim() || "Imported Group";
    const existing = await db.questionGroup.findMany({
        select: { title: true },
    });
    const taken = new Set(
        existing.map((g) => g.title.trim().toLowerCase())
    );
    if (!taken.has(base.toLowerCase())) return base;

    for (let n = 1; n < 100; n++) {
        const candidate =
            n === 1 ? `${base} (imported)` : `${base} (imported ${n})`;
        if (!taken.has(candidate.toLowerCase())) return candidate;
    }
    return `${base} (imported ${Date.now()})`;
}

/** Tolerate hand-edited files: numeric strings for maxscore are accepted. */
function normalizeCodeQuestion(item: unknown): unknown {
    if (!item || typeof item !== "object") return item;
    const obj = { ...(item as Record<string, unknown>) };
    if (
        typeof obj.maxscore === "string" &&
        obj.maxscore.trim() !== "" &&
        !Number.isNaN(Number(obj.maxscore))
    ) {
        obj.maxscore = Number(obj.maxscore);
    }
    return obj;
}

/**
 * Tolerate hand-edited MCQ files: booleans as "true"/"false"/1/0,
 * CorrectOption as a numeric string, empty optional strings → null, and
 * difficulty in any casing (unknown → omitted so the DB default applies).
 */
function normalizeMcq(item: unknown): unknown {
    if (!item || typeof item !== "object") return item;
    const obj = { ...(item as Record<string, unknown>) };

    if (typeof obj.iscodesnippet === "string") {
        const flag = obj.iscodesnippet.trim().toLowerCase();
        if (flag === "true" || flag === "1") obj.iscodesnippet = true;
        else if (flag === "false" || flag === "0") obj.iscodesnippet = false;
    } else if (typeof obj.iscodesnippet === "number") {
        if (obj.iscodesnippet === 1) obj.iscodesnippet = true;
        else if (obj.iscodesnippet === 0) obj.iscodesnippet = false;
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
    ] as const) {
        if (obj[field] === "") obj[field] = null;
    }

    return obj;
}

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
 * POST /api/question-groups/import
 *
 * Body: the JSON produced by GET /api/question-groups/[id]/export
 * (kind: "question-group" envelope) — also accepts the per-part exports
 * (envelopes with `topics` / `questions` / mcq `questions`) or bare arrays.
 *
 * Creates a NEW question group (title deduped automatically) and fills it
 * with:
 *   - every topic + sub topic (merged by name, "general" always present)
 *   - every code question (validated, language-checked)
 *   - every MCQ (validated, difficulty normalized to easy/medium/hard)
 * Invalid items are skipped and reported; the group is still created when
 * at least one item imports.
 */
export async function POST(req: Request) {
    const guard = await requireAdminApi();
    if (!guard.ok) return guard.response;

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return NextResponse.json(
            { error: "Invalid file — expected a question-group export." },
            { status: 400 }
        );
    }

    const envelope = body as Record<string, unknown>;

    // Only accept files this app produced (keeps accidental uploads safe).
    if (envelope.atomcodeExport !== true) {
        return NextResponse.json(
            {
                error:
                    "This file is not an AtomCode export. Export a group first, then import that JSON file.",
            },
            { status: 400 }
        );
    }

    const rawTopics = Array.isArray(envelope.topics)
        ? envelope.topics
        : Array.isArray((envelope.group as { topics?: unknown })?.topics)
          ? ((envelope.group as { topics: unknown[] }).topics as unknown[])
          : [];
    const rawQuestions = Array.isArray(envelope.questions)
        ? envelope.questions
        : [];
    const rawMcqs = Array.isArray(envelope.mcqQuestions)
        ? envelope.mcqQuestions
        : Array.isArray((envelope as { mcqs?: unknown }).mcqs)
          ? ((envelope as { mcqs: unknown[] }).mcqs)
          : [];

    if (
        rawTopics.length === 0 &&
        rawQuestions.length === 0 &&
        rawMcqs.length === 0
    ) {
        return NextResponse.json(
            {
                error:
                    "Nothing to import — the file has no topics, code questions or MCQs.",
            },
            { status: 400 }
        );
    }
    if (
        rawTopics.length > MAX_TOPICS_PER_IMPORT ||
        rawQuestions.length > MAX_QUESTIONS_PER_IMPORT ||
        rawMcqs.length > MAX_MCQS_PER_IMPORT
    ) {
        return NextResponse.json(
            {
                error: `Too many items in one import (max ${MAX_TOPICS_PER_IMPORT} topics / ${MAX_QUESTIONS_PER_IMPORT} code questions / ${MAX_MCQS_PER_IMPORT} MCQs). Split the file.`,
            },
            { status: 400 }
        );
    }

    // ── Resolve the new group title ─────────────────────────────────────────
    const exportedTitle =
        typeof (envelope.group as { title?: unknown })?.title === "string"
            ? (envelope.group as { title: string }).title
            : typeof envelope.title === "string"
              ? envelope.title
              : "";
    const title = await uniqueGroupTitle(exportedTitle);

    // ── Create the group shell ──────────────────────────────────────────────
    const group = await db.questionGroup.create({ data: { title } });
    await ensureGeneralTopic(group.id);

    const errors: ImportIssue[] = [];
    let createdTopics = 0;
    let createdSubtopics = 0;
    let createdQuestions = 0;
    let createdMcqs = 0;
    let skippedTopics = 0;

    // ── Topics + sub topics (merge by name) ─────────────────────────────────
    for (let i = 0; i < rawTopics.length; i++) {
        const parsed = TopicImportItemSchema.safeParse(rawTopics[i]);
        const name =
            typeof (rawTopics[i] as { name?: unknown })?.name === "string"
                ? ((rawTopics[i] as { name: string }).name.trim() || `#${i + 1}`)
                : `#${i + 1}`;

        if (!parsed.success) {
            errors.push({
                index: i + 1,
                name,
                error: parsed.error.issues[0]?.message ?? "Invalid topic",
            });
            continue;
        }

        try {
            const r = await importTopic(group.id, parsed.data);
            createdTopics += r.topics;
            createdSubtopics += r.subtopics;
            if (r.topics === 0) skippedTopics++;
        } catch (err) {
            errors.push({
                index: i + 1,
                name,
                error:
                    err instanceof Error
                        ? err.message
                        : "Database error while creating the topic",
            });
        }
    }

    // ── Code questions ──────────────────────────────────────────────────────
    for (let i = 0; i < rawQuestions.length; i++) {
        const item = normalizeCodeQuestion(rawQuestions[i]);
        const qTitle =
            typeof (item as { title?: unknown })?.title === "string" &&
            (item as { title: string }).title.trim() !== ""
                ? (item as { title: string }).title
                : `#${i + 1}`;

        const parsed = ImportQuestionSchema.safeParse(item);
        if (!parsed.success) {
            errors.push({
                index: i + 1,
                name: qTitle,
                error: parsed.error.issues[0]?.message ?? "Invalid code question",
            });
            continue;
        }

        try {
            // zod strips unknown keys (id, moduleId, assessmentsId, …), so
            // only portable content fields reach the create call.
            await db.codeQuestion.create({
                data: { ...parsed.data, questionGroupId: group.id },
            });
            createdQuestions++;
        } catch (err) {
            errors.push({
                index: i + 1,
                name: qTitle,
                error:
                    err instanceof Error
                        ? err.message
                        : "Database error while creating the code question",
            });
        }
    }

    // ── MCQ questions ───────────────────────────────────────────────────────
    for (let i = 0; i < rawMcqs.length; i++) {
        const item = normalizeMcq(rawMcqs[i]);
        const mTitle =
            typeof (item as { title?: unknown })?.title === "string" &&
            (item as { title: string }).title.trim() !== ""
                ? (item as { title: string }).title
                : `#${i + 1}`;

        const parsed = GroupMcqSchema.safeParse(item);
        if (!parsed.success) {
            errors.push({
                index: i + 1,
                name: mTitle,
                error: parsed.error.issues[0]?.message ?? "Invalid MCQ",
            });
            continue;
        }

        try {
            await db.mCQQuestion.create({
                data: { ...parsed.data, questionGroupId: group.id },
            });
            createdMcqs++;
        } catch (err) {
            errors.push({
                index: i + 1,
                name: mTitle,
                error:
                    err instanceof Error
                        ? err.message
                        : "Database error while creating the MCQ",
            });
        }
    }

    const totalCreated =
        createdTopics + createdSubtopics + createdQuestions + createdMcqs;
    if (totalCreated === 0) {
        return NextResponse.json(
            {
                error:
                    errors.length > 0
                        ? `Group "${title}" was created but nothing could be imported into it.`
                        : `Nothing to import — every item already exists in "${title}".`,
                groupId: group.id,
                created: 0,
                failed: errors.length,
                errors: errors.slice(0, 10),
            },
            { status: 400 }
        );
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

    return NextResponse.json(
        {
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
        { status: 201 }
    );
}
