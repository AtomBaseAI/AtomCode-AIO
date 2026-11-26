import { NextResponse } from "next/server";

import { requireSuperAdminApi } from "@/lib/api-admin-guard";
import {
    runCourseImport,
    runCourseImportToJson,
    parseCourseEnvelope,
    COURSE_ATTACH_CHUNK_SIZE,
    MAX_COURSE_BODY_BYTES,
    MAX_MODULES_PER_IMPORT,
    type CourseImportEvent,
} from "@/lib/course-import";

/**
 * POST /api/courses/import
 *
 * Body: the JSON produced by GET /api/courses/[id]/export
 * (kind: "course" envelope, version 1 or 2) — optionally with an
 * `options` key the import wizard adds:
 *   options: {
 *     attachQuestions:   boolean  (default true) — resolve + attach the
 *                                modules' question references against the
 *                                question groups of this system
 *     includeReferences: boolean  (default true) — import the modules'
 *                                reference material entries
 *     onExistingQuestion: "skip" | "reassign" (default "skip") — what to do
 *                                when a matched question is already assigned
 *                                to another module
 *   }
 *
 * Creates a NEW course (title deduped automatically) and fills it with
 * every module (created in file order, preserving the queue sequence).
 *
 * Nothing is written when the envelope is invalid, the course shell fails
 * validation or EVERY module fails validation (no orphan empty courses);
 * when at least one module is valid the course is created and failing rows
 * are skipped and reported.
 *
 * Response modes:
 *   - default  → one JSON response (201 created / 400 rejected), exactly
 *     the historical shape.
 *   - ?stream=1 (or X-Atomcode-Stream: 1 header) → newline-delimited JSON
 *     progress events (start/title/course/phase/progress/done) so the
 *     import wizard can show live progress bars per phase (modules →
 *     references → code questions → MCQs). The final `done` event carries
 *     the same result payload.
 */
export async function POST(req: Request) {
    const guard = await requireSuperAdminApi("courses");
    if (!guard.ok) return guard.response;

    const contentLength = Number(req.headers.get("content-length") ?? 0);
    if (contentLength > MAX_COURSE_BODY_BYTES) {
        return NextResponse.json(
            { error: "File too large (max 25 MB)." },
            { status: 413 }
        );
    }

    const body = await req.json().catch(() => null);

    // Module-count cap. If the envelope itself is invalid, skip the count
    // and let the import report the original parse error unchanged.
    const parsedForCount = parseCourseEnvelope(body);
    if (parsedForCount.ok && parsedForCount.rawModules.length > MAX_MODULES_PER_IMPORT) {
        return NextResponse.json(
            {
                error: "Too many modules in one import (max 200). Split the file.",
            },
            { status: 400 }
        );
    }

    const url = new URL(req.url);
    const wantsStream =
        url.searchParams.get("stream") === "1" ||
        req.headers.get("x-atomcode-stream") === "1";

    if (!wantsStream) {
        const { status, result } = await runCourseImportToJson(
            body,
            COURSE_ATTACH_CHUNK_SIZE
        );
        return NextResponse.json(result, { status });
    }

    // ── NDJSON stream mode ──────────────────────────────────────────────────
    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
        async start(controller) {
            const send = (event: CourseImportEvent) => {
                controller.enqueue(
                    encoder.encode(JSON.stringify(event) + "\n")
                );
            };
            try {
                for await (const event of runCourseImport(
                    body,
                    COURSE_ATTACH_CHUNK_SIZE
                )) {
                    send(event);
                }
            } catch (err) {
                // Never leak raw error text through the stream (audit
                // finding) — log server-side, send a generic message.
                console.error("[courses/import] stream failed:", err);
                send({
                    t: "done",
                    status: 400,
                    result: {
                        error:
                            "Import failed. Check the file format and try again.",
                    },
                });
            } finally {
                controller.close();
            }
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "application/x-ndjson; charset=utf-8",
            "Cache-Control": "no-store",
            "X-Accel-Buffering": "no",
        },
    });
}
