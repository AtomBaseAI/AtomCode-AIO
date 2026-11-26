// AtomCode — super admin settings (DB-backed).
//
// The static 4-digit auth code is the second factor every super admin must
// enter after their email+password (login step 2). It lives in the Setting
// KV store so it can be rotated from the super admin settings page without
// a redeploy; a missing row falls back to the built-in default.

import { db } from "@/lib/db";

export const SUPERADMIN_CODE_KEY = "superadmin.authcode";

/**
 * Built-in fallback — "1997". ⚠️ SECURITY NOTE: this value is PUBLIC in the
 * repository and MUST be rotated before any real deployment (set it in the
 * super-admin settings UI, or deploy with SUPERADMIN_AUTHCODE so the default
 * below is overridden). It is kept as-is only for dev-environment
 * compatibility with existing seeds/docs.
 */
export const DEFAULT_SUPERADMIN_CODE = "1997";

/**
 * Default-code resolution order:
 *   1. process.env.SUPERADMIN_AUTHCODE  (deployment override — rotate here)
 *   2. "1997"                            (public repo default, dev compat)
 */
export function resolveDefaultSuperAdminCode(): string {
  const fromEnv = process.env.SUPERADMIN_AUTHCODE?.trim();
  return fromEnv ? fromEnv : DEFAULT_SUPERADMIN_CODE;
}

/**
 * Current super admin auth code: the Setting row wins (rotatable at runtime
 * from the settings UI), then the env-overridden default, then "1997".
 */
export async function getSuperAdminAuthCode(): Promise<string> {
  try {
    const row = await db.setting.findUnique({
      where: { key: SUPERADMIN_CODE_KEY },
    });
    return row?.value ?? resolveDefaultSuperAdminCode();
  } catch {
    return resolveDefaultSuperAdminCode();
  }
}

/** Persist a new 4-digit auth code (caller must be a super admin). */
export async function setSuperAdminAuthCode(code: string) {
  return db.setting.upsert({
    where: { key: SUPERADMIN_CODE_KEY },
    update: { value: code },
    create: { key: SUPERADMIN_CODE_KEY, value: code },
  });
}
