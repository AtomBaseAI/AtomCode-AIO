/**
 * Question transfer helpers — shared by the group questions export/import
 * API routes (admin/questions-groups/[id]/code-questions page).
 *
 * The JSON export is the portable, re-importable format: a versioned
 * envelope with the full content of every question (statement, server code,
 * all sample/hidden test cases and metadata). Relations that only make
 * sense inside this instance (module, assessment, author) are intentionally
 * NOT transferred — an import always creates fresh copies.
 */

import { unparse } from "papaparse";

/** Languages the judge supports — keep in sync with runtime-registry. */
export const TRANSFER_LANG_IDS = [
    "c",
    "cpp",
    "java",
    "python",
    "sql",
    "javascript",
    "typescript",
    "ruby",
] as const;

/** Portable per-question fields carried by exports and accepted by imports. */
export const QUESTION_TRANSFER_FIELDS = [
    "title",
    "description",
    "lang",
    "difficulty",
    "maxscore",
    "topic",
    "subtopic",
    "inputconstrains",
    "blacklist",
    "whitelist",
    "referenceimg",
    "sourcecode",
    "sampleinput1",
    "sampleoutput1",
    "sampleinput2",
    "sampleoutput2",
    "input1",
    "output1",
    "input2",
    "output2",
    "input3",
    "output3",
] as const;

export type QuestionTransferField = (typeof QUESTION_TRANSFER_FIELDS)[number];

export type QuestionTransferRow = Record<QuestionTransferField, unknown>;

/** Pick only the portable fields off a full CodeQuestion row. */
export function toTransferRow(question: Record<string, unknown>): QuestionTransferRow {
    const row = {} as QuestionTransferRow;
    for (const field of QUESTION_TRANSFER_FIELDS) {
        row[field] = question[field] ?? null;
    }
    return row;
}

/** "test group!" → "test-group" for download filenames. */
export function slugifyFilename(name: string): string {
    const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    return slug || "questions";
}

/** questions-test-group-2025-01-31.csv */
export function buildExportFilename(groupTitle: string, ext: "json" | "csv"): string {
    const date = new Date().toISOString().slice(0, 10);
    return `questions-${slugifyFilename(groupTitle)}-${date}.${ext}`;
}

/** CSV column headers, in the same order as buildQuestionsCsv rows. */
const CSV_HEADERS: Record<QuestionTransferField, string> = {
    title: "Title",
    description: "Description",
    lang: "Language",
    difficulty: "Difficulty",
    maxscore: "Max Score",
    topic: "Topic",
    subtopic: "Sub Topic",
    inputconstrains: "Input Constraints",
    blacklist: "Blacklist",
    whitelist: "Whitelist",
    referenceimg: "Reference Image",
    sourcecode: "Server Code",
    sampleinput1: "Sample 1 Input",
    sampleoutput1: "Sample 1 Expected Output",
    sampleinput2: "Sample 2 Input",
    sampleoutput2: "Sample 2 Expected Output",
    input1: "Test Case 1 Input",
    output1: "Test Case 1 Expected Output",
    input2: "Test Case 2 Input",
    output2: "Test Case 2 Expected Output",
    input3: "Test Case 3 Input",
    output3: "Test Case 3 Expected Output",
};

/**
 * Build the CSV download for a set of questions (RFC-4180 quoting via
 * papaparse — multi-line server code and test cases are quoted correctly).
 */
export function buildQuestionsCsv(questions: QuestionTransferRow[]): string {
    const rows = questions.map((q) => {
        const row: Record<string, unknown> = {};
        for (const field of QUESTION_TRANSFER_FIELDS) {
            row[CSV_HEADERS[field]] = q[field] ?? "";
        }
        return row;
    });
    return unparse({
        fields: QUESTION_TRANSFER_FIELDS.map((f) => CSV_HEADERS[f]),
        data: rows,
    });
}
