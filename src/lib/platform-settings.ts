// AtomCode — platform settings (DB-backed key-value store).
// Admin-editable from /admin/settings; consumed by the login page
// (maintenance mode) and the register actions (self-registration toggles).
// A missing row falls back to its default, so fresh databases work as-is.

import { db } from "@/lib/db";

export const SETTING_KEYS = {
  maintenanceMode: "platform.maintenance",
  allowStudentRegister: "platform.allowStudentRegister",
  allowStaffRegister: "platform.allowStaffRegister",
} as const;

export type PlatformSettings = {
  /** "true" → login page shows a maintenance notice instead of the form. */
  maintenanceMode: boolean;
  /** "true" → students can self-register from /register. */
  allowStudentRegister: boolean;
  /** "true" → staff can self-register from /register. */
  allowStaffRegister: boolean;
};

const DEFAULTS: PlatformSettings = {
  maintenanceMode: false,
  allowStudentRegister: true,
  allowStaffRegister: true,
};

const toBool = (v: string | undefined | null) => v === "true";

/** Read all platform settings in one query (fault-tolerant → defaults). */
export async function getPlatformSettings(): Promise<PlatformSettings> {
  try {
    const rows = await db.setting.findMany({
      where: { key: { in: Object.values(SETTING_KEYS) } },
    });
    const map = new Map(rows.map((r) => [r.key, r.value]));
    return {
      maintenanceMode: toBool(map.get(SETTING_KEYS.maintenanceMode)),
      allowStudentRegister: toBool(
        map.get(SETTING_KEYS.allowStudentRegister) ?? "true"
      ),
      allowStaffRegister: toBool(map.get(SETTING_KEYS.allowStaffRegister) ?? "true"),
    };
  } catch {
    return DEFAULTS;
  }
}

/** Upsert a single setting key. Returns the row. */
export async function setPlatformSetting(key: string, value: string) {
  return db.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}
