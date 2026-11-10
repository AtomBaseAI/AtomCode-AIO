// Public lookup lists — consumed by client forms and table filters
// (register page, student/staff forms, data-table toolbars).

import { NextResponse } from "next/server";
import { getLookups } from "@/lib/lookup";

export async function GET() {
  const lookups = await getLookups();
  return NextResponse.json(lookups);
}
