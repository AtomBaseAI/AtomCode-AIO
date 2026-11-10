import { NextResponse } from "next/server";
import { json, preflight, CORS_HEADERS } from "@/lib/desktop-auth";
import { getBrandingSettings } from "@/lib/branding-settings";

/**
 * GET /api/desktop/config — public client configuration.
 * Tells the desktop app which optional backend services are configured
 * without leaking any secrets or URLs (execution is proxied server-side).
 */
export async function GET() {
  // Branding follows the admin-configured client details (DB → env defaults).
  const branding = await getBrandingSettings();
  return json({
    appName: "AtomCode Student Desktop",
    clientName: branding.clientName,
    vendorName: branding.vendorName,
    codeExecution: {
      sampleRun: Boolean(process.env.NEXT_PUBLIC_LAMBDA_URL),
      testCasesRun: Boolean(process.env.NEXT_PUBLIC_LAMBDA_MULTI_URL),
    },
    aiTutorEnabled: Boolean(process.env.OPENAI_API_KEY),
  });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}
