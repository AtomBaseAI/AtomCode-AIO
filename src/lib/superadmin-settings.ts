// AtomCode — super admin settings (DB-backed).
//
// The static 4-digit auth code is the second factor every super admin must
// enter after their email+password (login step 2). It lives in the Setting
// KV store so it can be rotated from the super admin settings page without
// a redeploy; a missing row falls back to the built-in default.

import { db } from "@/lib/db";

export const SUPERADMIN_CODE_KEY = "superadmin.authcode";

/** Built-in fallback — "1997" — used until the code is changed in settings. */
export const DEFAULT_SUPERADMIN_CODE = "1997";

/** Current super admin auth code (Setting row, falling back to the default). */
export async function getSuperAdminAuthCode(): Promise<string> {
  try {
    const row = await db.setting.findUnique({
      where: { key: SUPERADMIN_CODE_KEY },
    });
    return row?.value ?? DEFAULT_SUPERADMIN_CODE;
  } catch {
    return DEFAULT_SUPERADMIN_CODE;
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
