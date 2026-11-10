import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { requireAdminApi } from "@/lib/api-admin-guard";
import {
    buildStudentExportFilename,
    buildStudentsCsv,
    STUDENT_TRANSFER_FIELDS,
    type StudentTransferRow,
} from "@/lib/student-transfer";

/**
 * GET /api/students/export?format=json|csv
 *
 * Downloads every student account.
 *   - json : versioned, re-importable envelope (no passwords, no ids —
 *            imported students get the default password)
 *   - csv  : flat spreadsheet, one row per student (download only)
 */
export async function GET(req: Request) {
    const guard = await requireAdminApi("student data");
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

    const students = await db.user.findMany({
        orderBy: { email: "asc" },
    });

    const rows: StudentTransferRow[] = students.map((s) => ({
        name: s.name ?? "",
        email: s.email,
        rollnumber: s.rollnumber ?? "",
        department: s.department ?? "",
        batch: s.batch ?? "",
        section: s.section ?? "",
        phone: s.phone ?? "",
        github: s.github ?? "",
        linkedin: s.linkedin ?? "",
        isActive: String(s.isActive),
    }));
    const filename = buildStudentExportFilename(format);

    if (format === "csv") {
        // BOM prefix so Excel opens the UTF-8 file correctly.
        const body = "\uFEFF" + buildStudentsCsv(rows);
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
        fields: STUDENT_TRANSFER_FIELDS,
        students: rows,
    };

    return new Response(JSON.stringify(payload, null, 2), {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Content-Disposition": `attachment; filename="${filename}"`,
            "Cache-Control": "no-store",
        },
    });
}
