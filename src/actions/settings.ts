"use server";

// AtomCode — admin settings actions. Every mutation is admin-guarded;
// profile updates are additionally scoped to the caller's own Admin row.

import * as z from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/action-guards";
import { setPlatformSetting } from "@/lib/platform-settings";
import { unstable_update } from "@/auth";
import {
  AdminProfileSchema,
  PlatformSettingSchema,
} from "@/schemas/settings-schema";

/** Update the signed-in admin's own name/email (email must stay unique). */
export const updateAdminProfile = async (
  values: z.infer<typeof AdminProfileSchema>
) => {
  const session = await requireAdmin();
  if (!session) return { error: "Unauthorized" };

  const validated = AdminProfileSchema.safeParse(values);
  if (!validated.success) return { error: "Invalid details" };

  const { id, name, email } = validated.data;
  // Profile edits are restricted to the caller's own account.
  if (id !== session.user.id) return { error: "Unauthorized" };

  const normalizedEmail = email.toLowerCase().trim();
  try {
    const clash = await db.admin.findFirst({
      where: { email: normalizedEmail, NOT: { id } },
    });
    if (clash) return { error: "Email already in use by another admin" };

    await db.admin.update({
      where: { id },
      data: { name: name.trim(), email: normalizedEmail },
    });
    // Re-sign the JWT with the fresh profile so every server component
    // reading auth() (topbar, this page) shows the new values immediately.
    await unstable_update({ name: name.trim(), email: normalizedEmail });
    return { success: "Profile updated!" };
  } catch {
    return { error: "Something went wrong!" };
  }
};

/** Toggle a whitelisted platform setting (maintenance, registrations). */
export const updatePlatformSetting = async (
  values: z.infer<typeof PlatformSettingSchema>
) => {
  const session = await requireAdmin();
  if (!session) return { error: "Unauthorized" };

  const validated = PlatformSettingSchema.safeParse(values);
  if (!validated.success) return { error: "Invalid setting" };

  try {
    await setPlatformSetting(validated.data.key, String(validated.data.value));
    return { success: "Setting saved!" };
  } catch {
    return { error: "Something went wrong!" };
  }
};
