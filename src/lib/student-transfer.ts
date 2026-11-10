import { unparse } from "papaparse";

import { slugifyFilename } from "@/lib/question-transfer";

/**
 * Shared shapes + helpers for admin student JSON import/export and the CSV
 * download (mirrors the question-transfer pattern).
 *
 * Transfer rows are intentionally password-free and id-free: imported
 * students always get the platform default password and fresh ids, and only
 * portable profile fields travel between installs.
 */

export const STUDENT_TRANSFER_FIELDS = [
    "name",
    "email",
    "rollnumber",
    "department",
    "batch",
    "section",
    "phone",
    "github",
    "linkedin",
    "isActive",
] as const;

export type StudentTransferField = (typeof STUDENT_TRANSFER_FIELDS)[number];

export type StudentTransferRow = Record<StudentTransferField, string> & {
    [key: string]: unknown;
};

/** CSV column headers, in the same order as STUDENT_TRANSFER_FIELDS rows. */
const CSV_HEADERS: Record<StudentTransferField, string> = {
    name: "Name",
    email: "Email",
    rollnumber: "Rollnumber",
    department: "Department",
    batch: "Batch",
    section: "Section",
    phone: "Phone",
    github: "GitHub",
    linkedin: "LinkedIn",
    isActive: "Active",
};

export function buildStudentsCsv(rows: StudentTransferRow[]): string {
    return unparse({
        fields: STUDENT_TRANSFER_FIELDS.map((f) => CSV_HEADERS[f]),
        data: rows.map((row) => STUDENT_TRANSFER_FIELDS.map((f) => row[f] ?? "")),
    });
}

export function buildStudentExportFilename(ext: "json" | "csv"): string {
    const date = new Date().toISOString().slice(0, 10);
    return `students-${date}.${ext}`;
}
