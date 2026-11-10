// Admin-managed lookup lists (batches & departments).
// POST adds an entry, DELETE removes it. Admin-guarded; mutations invalidate
// the client-side lookup cache so forms/filters pick up changes immediately.

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { addLookup, deleteLookup, type LookupType } from "@/lib/lookup";
import { revalidatePath } from "next/cache";

async function guard() {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  return session?.user && role === "admin";
}

const isType = (v: unknown): v is LookupType =>
  v === "batch" || v === "department";

export async function POST(req: NextRequest) {
  if (!(await guard())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as { type?: string; label?: string };
    if (!isType(body.type) || typeof body.label !== "string") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const res = await addLookup(body.type, body.label);
    if (res.error) {
      return NextResponse.json({ error: res.error }, { status: 400 });
    }
    revalidatePath("/admin/settings");
    return NextResponse.json({ item: res.item });
  } catch {
    return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await guard())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as { type?: string; id?: string };
    if (!isType(body.type) || typeof body.id !== "string" || !body.id) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    if (body.id.startsWith("default-")) {
      return NextResponse.json(
        { error: "This entry is a built-in fallback and cannot be deleted" },
        { status: 400 }
      );
    }
    await deleteLookup(body.type, body.id);
    revalidatePath("/admin/settings");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
  }
}
