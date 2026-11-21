import { NextResponse } from "next/server";

import { requireSuperAdminApi } from "@/lib/api-admin-guard";
import {
    runGroupImport,
    runGroupImportToJson,
    GROUP_IMPORT_CHUNK_SIZE,
    type GroupImportEvent,
} from "@/lib/question-group-import";

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

    const body = await req.json().catch(() => null);

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
                send({
                    t: "done",
                    status: 500,
                    result: {
                        error:
                            err instanceof Error
                                ? `Import failed unexpectedly: ${err.message}`
                                : "Import failed unexpectedly.",
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
