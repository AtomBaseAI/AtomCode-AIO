import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { requireSuperAdminApi } from "@/lib/api-admin-guard";
import {
    GroupImportQuestionSchema,
    normalizeCodeImportRow,
    type GroupImportQuestionData,
    GROUP_IMPORT_CHUNK_SIZE,
} from "@/lib/question-group-import";

type RouteContext = { params: Promise<{ id: string }> };

interface ImportIssue {
    index: number;
    title: string;
    error: string;
}

/**
 * POST /api/question-groups/[id]/questions/import
 *
 * Body: the JSON produced by the group export (envelope with `questions`)
 * or a bare array of question objects. Every valid question is created as a
 * NEW copy inside this group; invalid ones are skipped and reported.
 */
export async function POST(req: Request, ctx: RouteContext) {
    const guard = await requireSuperAdminApi();
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

    const errors: ImportIssue[] = [];
    let created = 0;

    // Validate every item first (pure CPU), then insert in parallel chunks.
    const validItems: {
        index: number;
        title: string;
        data: GroupImportQuestionData;
    }[] = [];
    for (let i = 0; i < raw.length; i++) {
        const item = normalizeCodeImportRow(raw[i]);
        const title =
            typeof (item as { title?: unknown })?.title === "string" &&
            (item as { title: string }).title.trim() !== ""
                ? (item as { title: string }).title
                : `#${i + 1}`;

        const parsed = GroupImportQuestionSchema.safeParse(item);
        if (!parsed.success) {
            errors.push({
                index: i + 1,
                title,
                error: parsed.error.issues[0]?.message ?? "Invalid question",
            });
            continue;
        }
        validItems.push({ index: i + 1, title, data: parsed.data });
    }

    // zod strips unknown keys (id, moduleId, assessmentsId, …), so only
    // portable content fields reach the create call.
    for (let c = 0; c < validItems.length; c += GROUP_IMPORT_CHUNK_SIZE) {
        const chunk = validItems.slice(c, c + GROUP_IMPORT_CHUNK_SIZE);
        const results = await Promise.allSettled(
            chunk.map((q) =>
                db.codeQuestion.create({
                    data: { ...q.data, questionGroupId: id },
                })
            )
        );
        results.forEach((r, j) => {
            const q = chunk[j];
            if (r.status === "fulfilled") {
                created++;
            } else {
                errors.push({
                    index: q.index,
                    title: q.title,
                    error:
                        r.reason instanceof Error
                            ? r.reason.message
                            : "Database error while creating the question",
                });
            }
        });
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
