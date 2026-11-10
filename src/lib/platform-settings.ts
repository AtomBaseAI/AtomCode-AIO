// AtomCode — platform settings (DB-backed key-value store).
// Admin-editable from /admin/settings; consumed by the login page
// (maintenance mode) and the register actions (self-registration toggles).
// A missing row falls back to its default, so fresh databases work as-is.

import { db } from "@/lib/db";
import { APP_STATUS } from "@/config/branding";

export const SETTING_KEYS = {
  maintenanceMode: "platform.maintenance",
  allowStudentRegister: "platform.allowStudentRegister",
  allowStaffRegister: "platform.allowStaffRegister",
  studentRegisterCode: "platform.studentRegisterCode",
  staffRegisterCode: "platform.staffRegisterCode",
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

/**
 * Maintenance switch shared by the login page, the register page and the
 * register actions: the admin DB setting wins; the env fallback keeps the
 * original NEXT_PUBLIC_APP_STATUS behavior when the DB is unreachable.
 * When true, registration is fully blocked (UI hidden + server-side denial).
 */
export async function isMaintenanceMode(): Promise<boolean> {
  let maintenance = APP_STATUS !== "true";
  try {
    const settings = await getPlatformSettings();
    maintenance = settings.maintenanceMode || maintenance;
  } catch {
    // fall back to env-only behavior
  }
  return maintenance;
}

/* ------------------------------------------------------------------ */
/* Registration access codes                                           */
/*                                                                     */
/* Self-registration for students/staff can be gated by an access      */
/* code the admin generates from /admin/settings. The code lives in    */
/* the Setting KV store; closing registration deletes the code, while  */
/* accounts created with it remain untouched.                          */
/* ------------------------------------------------------------------ */

export type RegisterRole = "student" | "staff";

const CODE_KEYS: Record<RegisterRole, string> = {
  student: SETTING_KEYS.studentRegisterCode,
  staff: SETTING_KEYS.staffRegisterCode,
};

/** Current access code for a role, or null when none is active. */
export async function getRegistrationCode(
  role: RegisterRole
): Promise<string | null> {
  try {
    const row = await db.setting.findUnique({ where: { key: CODE_KEYS[role] } });
    return row?.value ?? null;
  } catch {
    return null;
  }
}

/** Store (or replace) the access code for a role. */
export async function setRegistrationCode(role: RegisterRole, code: string) {
  return db.setting.upsert({
    where: { key: CODE_KEYS[role] },
    update: { value: code },
    create: { key: CODE_KEYS[role], value: code },
  });
}

/**
 * Resolve which role an access code belongs to — the register page has no
 * role picker, so the code itself decides whether the visitor registers
 * as a student or staff member. Returns null when the code matches no
 * active code. (Codes are guaranteed unique across roles at generation.)
 */
export async function findRoleByCode(
  code: string
): Promise<RegisterRole | null> {
  try {
    const rows = await db.setting.findMany({
      where: { key: { in: Object.values(CODE_KEYS) } },
    });
    const normalized = code.trim().toUpperCase();
    for (const [role, key] of Object.entries(CODE_KEYS) as [
      RegisterRole,
      string,
    ][]) {
      if (rows.some((r) => r.key === key && r.value === normalized)) {
        return role;
      }
    }
    return null;
  } catch {
    return null;
  }
}

/** Invalidate the access code for a role (used when registration closes). */
export async function deleteRegistrationCode(role: RegisterRole) {
  return db.setting.deleteMany({ where: { key: CODE_KEYS[role] } });
}

/**
 * Generate a random 8-character access code from an unambiguous alphabet
 * (no I/L/O/0/1) so codes are easy to read aloud and type correctly.
 */
export function generateAccessCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let code = "";
  for (const b of bytes) code += alphabet[b % alphabet.length];
  return code;
}
