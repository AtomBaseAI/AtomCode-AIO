import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { requireAdminApi } from "@/lib/api-admin-guard";
import { GroupMcqSchema } from "@/schemas/group-mcq-schema";

type RouteContext = { params: Promise<{ id: string }> };

/** Per-batch sanity cap so one import cannot flood the question bank. */
const MAX_MCQS_PER_IMPORT = 200;

interface ImportIssue {
    index: number;
    title: string;
    error: string;
}

/**
 * Tolerate hand-edited files: booleans as "true"/"false"/1/0, CorrectOption
 * as a numeric string, and empty strings for optional fields are accepted
 * (the Create MCQ form always produces clean values, exports too).
 */
function normalizeImportItem(item: unknown): unknown {
    if (!item || typeof item !== "object") return item;
    const obj = { ...(item as Record<string, unknown>) };

    // iscodesnippet: boolean, "true"/"false" (case-insensitive) or 1/0.
    if (typeof obj.iscodesnippet === "string") {
        const flag = obj.iscodesnippet.trim().toLowerCase();
        if (flag === "true" || flag === "1") obj.iscodesnippet = true;
        else if (flag === "false" || flag === "0") obj.iscodesnippet = false;
    } else if (typeof obj.iscodesnippet === "number") {
        if (obj.iscodesnippet === 1) obj.iscodesnippet = true;
        else if (obj.iscodesnippet === 0) obj.iscodesnippet = false;
    }

    // CorrectOption: numeric string → number.
    if (
        typeof obj.CorrectOption === "string" &&
        obj.CorrectOption.trim() !== "" &&
        !Number.isNaN(Number(obj.CorrectOption))
    ) {
        obj.CorrectOption = Number(obj.CorrectOption);
    }

    // Empty strings for optional fields → null.
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

/**
 * POST /api/question-groups/[id]/mcq-questions/import
 *
 * Body: the JSON produced by the group MCQ export (envelope with `questions`)
 * or a bare array of MCQ objects. Every valid MCQ is created as a NEW copy
 * inside this group; invalid ones are skipped and reported.
 */
export async function POST(req: Request, ctx: RouteContext) {
    const guard = await requireAdminApi();
    if (!guard.ok) return guard.response;

    const { id } = await ctx.params;
    const group = await db.questionGroup.findUnique({ where: { id } });
    if (!group) {
        return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const body = await req.json().catch(() => null);
    const raw = Array.isArray(body)
        ? body
        : Array.isArray((body as { questions?: unknown } | null)?.questions)
          ? (body as { questions: unknown[] }).questions
          : null;

    if (!raw || raw.length === 0) {
        return NextResponse.json(
            { error: "No MCQs found in the file." },
            { status: 400 }
        );
    }
    if (raw.length > MAX_MCQS_PER_IMPORT) {
        return NextResponse.json(
            {
                error: `Too many MCQs in one import (max ${MAX_MCQS_PER_IMPORT}). Split the file.`,
            },
            { status: 400 }
        );
    }

    const errors: ImportIssue[] = [];
    let created = 0;

    for (let i = 0; i < raw.length; i++) {
        const item = normalizeImportItem(raw[i]);
        const title =
            typeof (item as { title?: unknown })?.title === "string" &&
            (item as { title: string }).title.trim() !== ""
                ? (item as { title: string }).title
                : `#${i + 1}`;

        const parsed = GroupMcqSchema.safeParse(item);
        if (!parsed.success) {
            errors.push({
                index: i + 1,
                title,
                error: parsed.error.issues[0]?.message ?? "Invalid MCQ",
            });
            continue;
        }

        try {
            // zod strips unknown keys (id, moduleId, assessmentsId, …), so
            // only portable content fields reach the create call.
            await db.mCQQuestion.create({
                data: { ...parsed.data, questionGroupId: id },
            });
            created++;
        } catch (err) {
            errors.push({
                index: i + 1,
                title,
                error:
                    err instanceof Error
                        ? err.message
                        : "Database error while creating the MCQ",
            });
        }
    }

    if (created === 0) {
        return NextResponse.json(
            {
                error: "No MCQs could be imported from this file.",
                created,
                failed: errors.length,
                errors: errors.slice(0, 10),
            },
            { status: 400 }
        );
    }

    return NextResponse.json({
        success: `${created} MCQ(s) imported into "${group.title}"${
            errors.length ? `, ${errors.length} skipped` : ""
        }`,
        created,
        failed: errors.length,
        errors: errors.slice(0, 10),
    });
}
