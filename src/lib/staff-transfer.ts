import { unparse } from "papaparse";

/**
 * Shared shapes + helpers for admin staff JSON import/export and the CSV
 * download (mirrors the student-transfer pattern).
 *
 * Transfer rows are intentionally password-free and id-free: imported
 * staff members always get the platform default password and fresh ids,
 * and only portable profile fields travel between installs.
 */

export const STAFF_TRANSFER_FIELDS = [
    "name",
    "email",
    "staffnumber",
    "department",
    "phone",
] as const;

export type StaffTransferField = (typeof STAFF_TRANSFER_FIELDS)[number];

export type StaffTransferRow = Record<StaffTransferField, string> & {
    [key: string]: unknown;
};

/** CSV column headers, in the same order as STAFF_TRANSFER_FIELDS rows. */
const CSV_HEADERS: Record<StaffTransferField, string> = {
    name: "Name",
    email: "Email",
    staffnumber: "Staff ID",
    department: "Department",
    phone: "Phone",
};

export function buildStaffsCsv(rows: StaffTransferRow[]): string {
    return unparse({
        fields: STAFF_TRANSFER_FIELDS.map((f) => CSV_HEADERS[f]),
        data: rows.map((row) => STAFF_TRANSFER_FIELDS.map((f) => row[f] ?? "")),
    });
}

export function buildStaffExportFilename(ext: "json" | "csv"): string {
    const date = new Date().toISOString().slice(0, 10);
    return `staffs-${date}.${ext}`;
}
