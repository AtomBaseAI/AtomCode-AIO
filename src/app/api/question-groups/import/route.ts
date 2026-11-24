import { NextResponse } from "next/server";

import { requireSuperAdminApi } from "@/lib/api-admin-guard";
import {
    runGroupImport,
    runGroupImportToJson,
    parseGroupImportEnvelope,
    GROUP_IMPORT_CHUNK_SIZE,
    type GroupImportEvent,
} from "@/lib/question-group-import";

/** Total-record cap across topics + questions + MCQs in one import. */
const MAX_RECORDS_PER_IMPORT = 5000;
/** Crude DoS guard: reject oversized uploads before parsing the body. */
const MAX_BODY_BYTES = 25 * 1024 * 1024; // 25 MB

/**
 * POST /api/question-groups/import
 *
 * Body: the JSON produced by GET /api/question-groups/[id]/export
 * (kind: "question-group" envelope) — also accepts the per-part exports
 * (envelopes with `topics` / `questions` / `mcqQuestions` / `mcqs`) or
 * bare arrays.
 *
 * Creates a NEW question group (title deduped automatically) and fills it
 * with:
 *   - every topic + sub topic (merged by name, "general" always present)
 *   - every code question (validated, language-checked, full fidelity —
 *     server code, SQL header code, classification metadata, tags, all
 *     sample/hidden test cases)
 *   - every MCQ (validated, difficulty normalized to easy/medium/hard)
 *
 * Nothing is written when the envelope is invalid or EVERY row fails
 * validation (no orphan empty groups); when at least one row is valid the
 * group is created and invalid rows are skipped and reported.
 *
 * Response modes:
 *   - default  → one JSON response (201 created / 400 rejected), exactly
 *     the historical shape.
 *   - ?stream=1 (or X-Atomcode-Stream: 1 header) → newline-delimited JSON
 *     progress events (start/title/group/phase/progress/done) so the
 *     import wizard can show a live progress bar with per-phase upload
 *     counts. The final `done` event carries the same result payload.
 */
export async function POST(req: Request) {
    const guard = await requireSuperAdminApi();
    if (!guard.ok) return guard.response;

    const contentLength = Number(req.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
        return NextResponse.json(
            { error: "File too large (max 25 MB)." },
            { status: 413 }
        );
    }

    const body = await req.json().catch(() => null);

    // Record-count cap (topics + code questions + MCQs). If the envelope
    // itself is invalid, skip the count and let the import report the
    // original parse error unchanged.
    const parsedForCount = parseGroupImportEnvelope(body);
    if (parsedForCount.ok) {
        const totalRecords =
            parsedForCount.rawTopics.length +
            parsedForCount.rawQuestions.length +
            parsedForCount.rawMcqs.length;
        if (totalRecords > MAX_RECORDS_PER_IMPORT) {
            return NextResponse.json(
                { error: "Too many rows (max 5000)" },
                { status: 400 }
            );
        }
    }

    const url = new URL(req.url);
    const wantsStream =
        url.searchParams.get("stream") === "1" ||
        req.headers.get("x-atomcode-stream") === "1";

    if (!wantsStream) {
        const { status, result } = await runGroupImportToJson(
            body,
            GROUP_IMPORT_CHUNK_SIZE
        );
        return NextResponse.json(result, { status });
    }

    // ── NDJSON stream mode ──────────────────────────────────────────────────
    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
        async start(controller) {
            const send = (event: GroupImportEvent) => {
                controller.enqueue(
                    encoder.encode(JSON.stringify(event) + "\n")
                );
            };
            try {
                for await (const event of runGroupImport(
                    body,
                    GROUP_IMPORT_CHUNK_SIZE
                )) {
                    send(event);
                }
            } catch (err) {
                // Never leak raw error text through the stream (audit
                // finding) — log server-side, send a generic message.
                // Status 400 matches the done-event contract (201 | 400);
                // the wizard only distinguishes 201 (success) from failure.
                console.error("[question-groups/import] stream failed:", err);
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
