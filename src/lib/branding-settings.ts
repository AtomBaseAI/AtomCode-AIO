// AtomCode — DB-backed client/branding settings ("Client details").
// Admin-editable from /admin/settings → Client Details tab; consumed by the
// login page, register page, root metadata and the desktop config endpoint.
// DB rows override the env-based defaults in src/config/branding.ts; a
// missing row falls back to that default, so fresh databases work as-is.

import { db } from "@/lib/db";
import {
  CLIENT_BANNER,
  CLIENT_NAME,
  POWEREDBY_NAME,
  POWEREDBY_STATUS,
  POWEREDBY_URL,
  VENDOR_LOGO,
  VENDOR_NAME,
} from "@/config/branding";

export const BRANDING_KEYS = {
  clientName: "branding.clientName",
  clientBanner: "branding.clientBanner",
  vendorName: "branding.vendorName",
  vendorLogo: "branding.vendorLogo",
  poweredbyStatus: "branding.poweredbyStatus",
  poweredbyName: "branding.poweredbyName",
  poweredbyUrl: "branding.poweredbyUrl",
} as const;

export type BrandingSettings = {
  /** Heading on the login card, register page and browser tab title. */
  clientName: string;
  /** Banner image on the login page's left (50%) panel. */
  clientBanner: string;
  /** Vendor brand name in the login/register page header. */
  vendorName: string;
  /** Vendor logo shown next to the vendor name. */
  vendorLogo: string;
  /** Show the "Powered by …" line on the login banner. */
  poweredbyStatus: boolean;
  poweredbyName: string;
  poweredbyUrl: string;
};

/** env/default values from src/config/branding.ts. */
export function getBrandingDefaults(): BrandingSettings {
  return {
    clientName: CLIENT_NAME,
    clientBanner: CLIENT_BANNER,
    vendorName: VENDOR_NAME,
    vendorLogo: VENDOR_LOGO,
    poweredbyStatus: POWEREDBY_STATUS,
    poweredbyName: POWEREDBY_NAME,
    poweredbyUrl: POWEREDBY_URL,
  };
}

const pick = (map: Map<string, string>, key: string, fallback: string) => {
  const v = map.get(key);
  return v && v.trim() !== "" ? v : fallback;
};

/** Read branding from the DB (fault-tolerant → env defaults). */
export async function getBrandingSettings(): Promise<BrandingSettings> {
  const defaults = getBrandingDefaults();
  try {
    const rows = await db.setting.findMany({
      where: { key: { in: Object.values(BRANDING_KEYS) } },
    });
    const map = new Map(rows.map((r) => [r.key, r.value]));
    return {
      clientName: pick(map, BRANDING_KEYS.clientName, defaults.clientName),
      clientBanner: pick(map, BRANDING_KEYS.clientBanner, defaults.clientBanner),
      vendorName: pick(map, BRANDING_KEYS.vendorName, defaults.vendorName),
      vendorLogo: pick(map, BRANDING_KEYS.vendorLogo, defaults.vendorLogo),
      poweredbyStatus: map.has(BRANDING_KEYS.poweredbyStatus)
        ? map.get(BRANDING_KEYS.poweredbyStatus) === "true"
        : defaults.poweredbyStatus,
      poweredbyName: pick(map, BRANDING_KEYS.poweredbyName, defaults.poweredbyName),
      poweredbyUrl: pick(map, BRANDING_KEYS.poweredbyUrl, defaults.poweredbyUrl),
    };
  } catch {
    return defaults;
  }
}

/**
 * Persist branding settings. Empty/undefined strings delete the DB row so
 * the value falls back to the default; provided values are upserted.
 */
export async function setBrandingSettings(
  values: Partial<Record<keyof BrandingSettings, string | boolean | null>>
) {
  const ops: Promise<unknown>[] = [];
  for (const [field, value] of Object.entries(values)) {
    const key = BRANDING_KEYS[field as keyof typeof BRANDING_KEYS];
    if (!key) continue;
    if (value === "" || value === undefined || value === null) {
      ops.push(db.setting.deleteMany({ where: { key } }));
    } else {
      const str = String(value);
      ops.push(
        db.setting.upsert({
          where: { key },
          update: { value: str },
          create: { key, value: str },
        })
      );
    }
  }
  await Promise.all(ops);
}

/** Clear every branding override → back to the env defaults. */
export async function resetBrandingRows() {
  await db.setting.deleteMany({
    where: { key: { in: Object.values(BRANDING_KEYS) } },
  });
}
