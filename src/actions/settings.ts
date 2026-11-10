"use server";

// AtomCode — admin settings actions. Every mutation is admin-guarded;
// profile updates are additionally scoped to the caller's own Admin row.

import * as z from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/action-guards";
import {
  deleteRegistrationCode,
  generateAccessCode,
  getRegistrationCode,
  setPlatformSetting,
  setRegistrationCode,
  type RegisterRole,
} from "@/lib/platform-settings";
import {
  resetBrandingRows,
  setBrandingSettings,
} from "@/lib/branding-settings";
import { unstable_update } from "@/auth";
import {
  AdminProfileSchema,
  BrandingSettingsSchema,
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
    await unstable_update({ user: { name: name.trim(), email: normalizedEmail } });
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

  const { key, value } = validated.data;

  // Registration switches are gated by an access code:
  // - enabling requires an active code (generated from this page)
  // - disabling deletes the code; already-registered users are untouched.
  if (value && (key === "platform.allowStudentRegister" || key === "platform.allowStaffRegister")) {
    const role: RegisterRole =
      key === "platform.allowStudentRegister" ? "student" : "staff";
    const code = await getRegistrationCode(role);
    if (!code) {
      return {
        error: `Generate an access code first — ${role}s can only register with it`,
      };
    }
  }

  try {
    await setPlatformSetting(key, String(value));
    if (
      !value &&
      (key === "platform.allowStudentRegister" || key === "platform.allowStaffRegister")
    ) {
      // Registration closed → invalidate the access code immediately.
      await deleteRegistrationCode(
        key === "platform.allowStudentRegister" ? "student" : "staff"
      );
    }
    return { success: "Setting saved!" };
  } catch {
    return { error: "Something went wrong!" };
  }
};

/** Generate (or regenerate) the registration access code for a role. */
export const generateRegistrationCode = async (role: RegisterRole) => {
  const session = await requireAdmin();
  if (!session) return { error: "Unauthorized" } as { error: string };

  if (role !== "student" && role !== "staff") {
    return { error: "Invalid role" } as { error: string };
  }

  try {
    // Codes double as role identifiers on the register page, so a code must
    // never be active for both roles — regenerate until it is unique.
    let code = generateAccessCode();
    for (let i = 0; i < 5; i++) {
      const other = await getRegistrationCode(
        role === "student" ? "staff" : "student"
      );
      if (code !== other) break;
      code = generateAccessCode();
    }
    await setRegistrationCode(role, code);
    return { success: "Access code generated!", code };
  } catch {
    return { error: "Something went wrong!" } as { error: string };
  }
};

/** Update client details (branding) shown on the login/register pages. */
export const updateBrandingSettings = async (
  values: z.infer<typeof BrandingSettingsSchema>
) => {
  const session = await requireAdmin();
  if (!session) return { error: "Unauthorized" };

  const validated = BrandingSettingsSchema.safeParse(values);
  if (!validated.success) return { error: "Invalid details" };

  try {
    await setBrandingSettings({
      clientName: validated.data.clientName,
      clientBanner: validated.data.clientBanner,
      vendorName: validated.data.vendorName,
      vendorLogo: validated.data.vendorLogo,
      poweredbyStatus: validated.data.poweredbyStatus,
      poweredbyName: validated.data.poweredbyName,
      poweredbyUrl: validated.data.poweredbyUrl,
    });
    return { success: "Client details saved!" };
  } catch {
    return { error: "Something went wrong!" };
  }
};

/** Clear every client-details override → back to the env defaults. */
export const resetBrandingSettings = async () => {
  const session = await requireAdmin();
  if (!session) return { error: "Unauthorized" };

  try {
    await resetBrandingRows();
    return { success: "Client details reset to defaults!" };
  } catch {
    return { error: "Something went wrong!" };
  }
};
