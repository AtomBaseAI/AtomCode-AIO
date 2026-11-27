import { NextResponse } from "next/server";

import { requireSuperAdminApi } from "@/lib/api-admin-guard";
import {
    parseCourseEnvelope,
    validateCourseImportItems,
    resolveQuestionRefs,
    uniqueCourseTitle,
    readImportOptions,
    MAX_COURSE_BODY_BYTES,
} from "@/lib/course-import";

/** Crude DoS guard: reject oversized uploads before parsing the body. */
const MAX_BODY_BYTES = MAX_COURSE_BODY_BYTES; // 25 MB

/**
 * POST /api/courses/import/validate
 *
 * Dry-run pre-check for the course import wizard — validates the uploaded
 * envelope WITHOUT writing anything:
 *   - envelope shape (AtomCode export, kind: "course")
 *   - the course shell through the exact schema the real import uses
 *   - every module row through the same schemas (tolerant normalizers)
 *   - the final deduplicated course title the import would use
 *   - every question reference resolved against the question groups of
 *     this system (attachable / already-assigned / missing / ambiguous)
 *
 * Returns valid/invalid counts plus per-row issues, so the wizard can show
 * a full validation report — and the import options — before the user
 * commits to the upload.
 */
export async function POST(req: Request) {
    const guard = await requireSuperAdminApi("courses");
    if (!guard.ok) return guard.response;

    const contentLength = Number(req.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
        return NextResponse.json(
            { error: "File too large (max 25 MB)." },
            { status: 413 }
        );
    }

    const body = await req.json().catch(() => null);
    const parsed = parseCourseEnvelope(body);
    if (!parsed.ok) {
        return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const validation = validateCourseImportItems(parsed);
    if (!validation.ok) {
        return NextResponse.json(
            {
                error: validation.error,
                /** The wizard surfaces shell errors like row issues. */
                ok: false,
                importable: false,
                issues: [
                    { kind: "course", index: 0, name: "Course", error: validation.error },
                ],
                totalIssues: 1,
            },
            { status: 200 }
        );
    }

    // Read-only resolution of every question reference against the live DB.
    const options = readImportOptions(body);
    const resolution = await resolveQuestionRefs(validation.validModules, options);
    const { title: finalTitle, renamed } = await uniqueCourseTitle(
        validation.validCourse.title
    );
    const baseTitle = validation.validCourse.title;

    const invalidModules = validation.issues.filter((i) => i.kind === "module").length;

    return NextResponse.json({
        ok: true,
        baseTitle,
        finalTitle,
        titleRenamed: renamed,
        course: {
            language: validation.validCourse.language,
            completionOrder: validation.validCourse.completionOrder,
            courseType: validation.validCourse.courseType ?? "code-mcq",
            anyLanguage: validation.validCourse.anyLanguage ?? false,
        },
        counts: validation.counts,
        validCounts: validation.validCounts,
        invalidCounts: { modules: invalidModules },
        importable: validation.importable,
        /** First 50 module issues — the wizard shows these in the report list. */
        issues: validation.issues.slice(0, 50),
        totalIssues: validation.issues.length,
        /** Question-reference resolution report (read-only dry run). */
        questions: {
            total:
                resolution.attachable.code +
                resolution.attachable.mcq +
                resolution.missing.code +
                resolution.missing.mcq +
                resolution.ambiguous.code +
                resolution.ambiguous.mcq,
            attachable: resolution.attachable,
            missing: resolution.missing,
            ambiguous: resolution.ambiguous,
            /** First 50 non-attachable references for the report list. */
            issues: resolution.items
                .filter((i) => i.status !== "attachable")
                .slice(0, 50)
                .map((i) => ({
                    module: i.moduleName,
                    moduleIndex: i.moduleIndex,
                    type: i.type,
                    title: i.title,
                    status: i.status,
                    reason:
                        i.reason ??
                        (i.status === "ambiguous"
                            ? "Ambiguous match — multiple questions share this title in the question groups"
                            : "Not found in the question groups"),
                })),
            totalIssues: resolution.items.filter((i) => i.status !== "attachable")
                .length,
        },
    });
}
