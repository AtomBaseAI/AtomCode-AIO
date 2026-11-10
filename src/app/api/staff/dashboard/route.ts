import { NextResponse } from "next/server";

import { getStaffDashboardData } from "@/data/staff/dashboard";
import { requireStaffApi } from "@/lib/api-staff-guard";

/**
 * GET /api/staff/dashboard — every aggregate on the staff dashboard, scoped
 * to the courses the signed-in staff member teaches. Mirrors the server-side
 * data helper used by /staff/dashboard so clients (or the Electron shell) can
 * refresh the same numbers without a page reload.
 */
export async function GET() {
    const guard = await requireStaffApi("the staff dashboard");
    if (!guard.ok) return guard.response;

    const data = await getStaffDashboardData(guard.session.user.id);
    return NextResponse.json(data);
}
