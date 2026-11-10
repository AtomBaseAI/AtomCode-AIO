import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { requireAdminApi } from "@/lib/api-admin-guard";
import {
    buildStaffExportFilename,
    buildStaffsCsv,
    STAFF_TRANSFER_FIELDS,
    type StaffTransferRow,
} from "@/lib/staff-transfer";

/**
 * GET /api/staffs/export?format=json|csv
 *
 * Downloads every staff account.
 *   - json : versioned, re-importable envelope (no passwords, no ids —
 *            imported staff get the default password)
 *   - csv  : flat spreadsheet, one row per staff member (download only)
 */
export async function GET(req: Request) {
    const guard = await requireAdminApi("staff data");
    if (!guard.ok) return guard.response;

    const format = (
        new URL(req.url).searchParams.get("format") ?? "json"
    ).toLowerCase();

    if (format !== "json" && format !== "csv") {
        return NextResponse.json(
            { error: "Unsupported format. Use ?format=json or ?format=csv." },
            { status: 400 }
        );
    }

    const staffs = await db.staff.findMany({
        orderBy: { email: "asc" },
    });

    const rows: StaffTransferRow[] = staffs.map((s) => ({
        name: s.name ?? "",
        email: s.email,
        staffnumber: s.staffnumber ?? "",
        department: s.department ?? "",
        phone: s.phone ?? "",
    }));
    const filename = buildStaffExportFilename(format);

    if (format === "csv") {
        // BOM prefix so Excel opens the UTF-8 file correctly.
        const body = "\uFEFF" + buildStaffsCsv(rows);
        return new Response(body, {
            headers: {
                "Content-Type": "text/csv; charset=utf-8",
                "Content-Disposition": `attachment; filename="${filename}"`,
                "Cache-Control": "no-store",
            },
        });
    }

    const payload = {
        atomcodeExport: true,
        version: 1,
        exportedAt: new Date().toISOString(),
        count: rows.length,
        fields: STAFF_TRANSFER_FIELDS,
        staffs: rows,
    };

    return new Response(JSON.stringify(payload, null, 2), {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Content-Disposition": `attachment; filename="${filename}"`,
            "Cache-Control": "no-store",
        },
    });
}
