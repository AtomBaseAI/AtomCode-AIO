import { NextResponse } from "next/server";
import * as z from "zod";

import { db } from "@/lib/db";
import { requireSuperAdminApi } from "@/lib/api-admin-guard";
import { GroupMcqSchema } from "@/schemas/group-mcq-schema";
import {
    normalizeMcqImportRow,
    GROUP_IMPORT_CHUNK_SIZE,
} from "@/lib/question-group-import";

type RouteContext = { params: Promise<{ id: string }> };

/** Per-batch sanity cap so one import cannot flood the database. */
const MAX_ROWS_PER_IMPORT = 1000;
/** Crude DoS guard: reject oversized uploads before parsing the body. */
const MAX_BODY_BYTES = 25 * 1024 * 1024; // 25 MB

interface ImportIssue {
    index: number;
    title: string;
    error: string;
}

/**
 * POST /api/question-groups/[id]/mcq-questions/import
 *
 * Body: the JSON produced by the group MCQ export (envelope with `questions`)
 * or a bare array of MCQ objects. Every valid MCQ is created as a NEW copy
 * inside this group; invalid ones are skipped and reported.
 */
export async function POST(req: Request, ctx: RouteContext) {
    const guard = await requireSuperAdminApi();
    if (!guard.ok) return guard.response;

    const contentLength = Number(req.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
        return NextResponse.json(
            { error: "File too large (max 25 MB)." },
            { status: 413 }
        );
    }

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
    if (raw.length > MAX_ROWS_PER_IMPORT) {
        return NextResponse.json(
            { error: "Too many rows (max 1000)" },
            { status: 400 }
        );
    }

    const errors: ImportIssue[] = [];
    let created = 0;

    // Validate every item first (pure CPU), then insert in parallel chunks.
    const validItems: {
        index: number;
        title: string;
        data: z.infer<typeof GroupMcqSchema>;
    }[] = [];
    for (let i = 0; i < raw.length; i++) {
        const item = normalizeMcqImportRow(raw[i]);
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
        validItems.push({ index: i + 1, title, data: parsed.data });
    }

    // zod strips unknown keys (id, moduleId, assessmentsId, …), so only
    // portable content fields reach the create call.
    for (let c = 0; c < validItems.length; c += GROUP_IMPORT_CHUNK_SIZE) {
        const chunk = validItems.slice(c, c + GROUP_IMPORT_CHUNK_SIZE);
        const results = await Promise.allSettled(
            chunk.map((m) =>
                db.mCQQuestion.create({
                    data: { ...m.data, questionGroupId: id },
                })
            )
        );
        results.forEach((r, j) => {
            const m = chunk[j];
            if (r.status === "fulfilled") {
                created++;
            } else {
                // Never surface raw driver/prisma text to the client.
                console.error(
                    `[question-groups/${id}/mcq-questions/import] create failed:`,
                    r.reason
                );
                errors.push({
                    index: m.index,
                    title: m.title,
                    error: "Import failed. Check the file format and try again.",
                });
            }
        });
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
