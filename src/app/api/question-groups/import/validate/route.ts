import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { requireSuperAdminApi } from "@/lib/api-admin-guard";
import {
    parseGroupImportEnvelope,
    validateGroupImportItems,
    uniqueGroupTitle,
} from "@/lib/question-group-import";

/** Crude DoS guard: reject oversized uploads before parsing the body. */
const MAX_BODY_BYTES = 25 * 1024 * 1024; // 25 MB

/**
 * POST /api/question-groups/import/validate
 *
 * Dry-run pre-check for the import wizard — validates the uploaded
 * envelope WITHOUT writing anything:
 *   - envelope shape (AtomCode export, per-part exports, bare arrays)
 *   - every topic / code question / MCQ row through the exact schemas the
 *     real import uses (same tolerant normalizers, same language
 *     allow-list, same lab-question requirements)
 *   - the final deduplicated group title the import would use
 *
 * Returns per-row issues (kind, index, name, error) plus valid/invalid
 * counts, so the wizard can show a full validation report before the user
 * commits to the upload.
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
    const parsed = parseGroupImportEnvelope(body);
    if (!parsed.ok) {
        return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const validation = validateGroupImportItems(parsed);
    const base = parsed.exportedTitle.trim() || "Imported Group";
    const finalTitle = await uniqueGroupTitle(parsed.exportedTitle);

    const invalidCounts = {
        topics: validation.issues.filter((i) => i.kind === "topic").length,
        codeQuestions: validation.issues.filter((i) => i.kind === "code").length,
        mcqQuestions: validation.issues.filter((i) => i.kind === "mcq").length,
    };

    return NextResponse.json({
        ok: true,
        baseTitle: base,
        finalTitle,
        titleRenamed: finalTitle !== base,
        counts: validation.counts,
        validCounts: {
            topics: validation.validTopics.length,
            codeQuestions: validation.validCode.length,
            mcqQuestions: validation.validMcq.length,
        },
        invalidCounts,
        importable: validation.importable,
        /** First 50 issues — the wizard shows these in the report list. */
        issues: validation.issues.slice(0, 50),
        totalIssues: validation.issues.length,
    });
}
