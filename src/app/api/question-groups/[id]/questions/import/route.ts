import { NextResponse } from "next/server";
import * as z from "zod";

import { db } from "@/lib/db";
import { requireAdminApi } from "@/lib/api-admin-guard";
import { AddQuestionSchema } from "@/schemas/question-schema";
import { TRANSFER_LANG_IDS } from "@/lib/question-transfer";

type RouteContext = { params: Promise<{ id: string }> };

/** Per-batch sanity cap so one import cannot flood the question bank. */
const MAX_QUESTIONS_PER_IMPORT = 200;

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
    title: string;
    error: string;
}

/**
 * Tolerate hand-edited files: numeric strings for maxscore are accepted
 * (the Create Question form always produces a number, exports too).
 */
function normalizeImportItem(item: unknown): unknown {
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
 * POST /api/question-groups/[id]/questions/import
 *
 * Body: the JSON produced by the group export (envelope with `questions`)
 * or a bare array of question objects. Every valid question is created as a
 * NEW copy inside this group; invalid ones are skipped and reported.
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
            { error: "No questions found in the file." },
            { status: 400 }
        );
    }
    if (raw.length > MAX_QUESTIONS_PER_IMPORT) {
        return NextResponse.json(
            {
                error: `Too many questions in one import (max ${MAX_QUESTIONS_PER_IMPORT}). Split the file.`,
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

        const parsed = ImportQuestionSchema.safeParse(item);
        if (!parsed.success) {
            errors.push({
                index: i + 1,
                title,
                error: parsed.error.issues[0]?.message ?? "Invalid question",
            });
            continue;
        }

        try {
            // zod strips unknown keys (id, moduleId, assessmentsId, …), so
            // only portable content fields reach the create call.
            await db.codeQuestion.create({
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
                        : "Database error while creating the question",
            });
        }
    }

    if (created === 0) {
        return NextResponse.json(
            {
                error: "No questions could be imported from this file.",
                created,
                failed: errors.length,
                errors: errors.slice(0, 10),
            },
            { status: 400 }
        );
    }

    return NextResponse.json({
        success: `${created} question(s) imported into "${group.title}"${
            errors.length ? `, ${errors.length} skipped` : ""
        }`,
        created,
        failed: errors.length,
        errors: errors.slice(0, 10),
    });
}
