/**
 * MCQ transfer helpers — shared by the group MCQ questions export/import
 * API routes (admin/questions-groups/[gid]/mcq-questions page).
 *
 * Mirrors lib/question-transfer.ts for MCQQuestion rows: the JSON export is
 * the portable, re-importable format; module/assessment/author relations are
 * intentionally NOT transferred — an import always creates fresh copies.
 */

import { unparse } from "papaparse";

import { slugifyFilename } from "@/lib/question-transfer";

/** Portable per-question fields carried by exports and accepted by imports. */
export const MCQ_TRANSFER_FIELDS = [
    "title",
    "description",
    "topic",
    "subtopic",
    "Option1",
    "Option2",
    "Option3",
    "Option4",
    "CorrectOption",
    "referenceimg",
    "codesnippet",
    "snippetLang",
    "iscodesnippet",
] as const;

export type McqTransferField = (typeof MCQ_TRANSFER_FIELDS)[number];

export type McqTransferRow = Record<McqTransferField, unknown>;

/** Pick only the portable fields off a full MCQQuestion row. */
export function toMcqTransferRow(mcq: Record<string, unknown>): McqTransferRow {
    const row = {} as McqTransferRow;
    for (const field of MCQ_TRANSFER_FIELDS) {
        row[field] = mcq[field] ?? null;
    }
    return row;
}

/** mcq-questions-test-group-2025-01-31.csv */
export function buildMcqExportFilename(
    groupTitle: string,
    ext: "json" | "csv"
): string {
    const date = new Date().toISOString().slice(0, 10);
    return `mcq-questions-${slugifyFilename(groupTitle)}-${date}.${ext}`;
}

/** CSV column headers, in the same order as buildMcqCsv rows. */
const MCQ_CSV_HEADERS: Record<McqTransferField, string> = {
    title: "Title",
    description: "Description",
    topic: "Topic",
    subtopic: "Sub Topic",
    Option1: "Option 1",
    Option2: "Option 2",
    Option3: "Option 3",
    Option4: "Option 4",
    CorrectOption: "Correct Option (1-4)",
    referenceimg: "Reference Image",
    codesnippet: "Code Snippet",
    snippetLang: "Snippet Language",
    iscodesnippet: "Has Code Snippet",
};

/**
 * Build the CSV download for a set of MCQs (RFC-4180 quoting via papaparse —
 * multi-line descriptions and code snippets are quoted correctly).
 */
export function buildMcqCsv(mcqs: McqTransferRow[]): string {
    const rows = mcqs.map((q) => {
        const row: Record<string, unknown> = {};
        for (const field of MCQ_TRANSFER_FIELDS) {
            row[MCQ_CSV_HEADERS[field]] = q[field] ?? "";
        }
        return row;
    });
    return unparse({
        fields: MCQ_TRANSFER_FIELDS.map((f) => MCQ_CSV_HEADERS[f]),
        data: rows,
    });
}
