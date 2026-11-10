import * as z from "zod";

/** Admin profile update (own account only — id is filled by the action). */
export const AdminProfileSchema = z.object({
  id: z.string().min(1),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name is too long"),
  email: z.string().email("Enter a valid email"),
});

/** Whitelisted platform-setting keys with their boolean value. */
export const PlatformSettingSchema = z.object({
  key: z.enum([
    "platform.maintenance",
    "platform.allowStudentRegister",
    "platform.allowStaffRegister",
  ]),
  value: z.boolean(),
});

/** http(s) URL, "#" (anchor/no-op) or empty (reset to default). */
const httpUrl = (label: string) =>
  z
    .string()
    .trim()
    .refine((v) => v === "" || v === "#" || /^https?:\/\/\S+$/.test(v), {
      message: `Enter a valid ${label} (https://…)`,
    });

/** Client-details (branding) form — empty strings mean "reset to default". */
export const BrandingSettingsSchema = z.object({
  clientName: z
    .string()
    .trim()
    .min(2, "Client name must be at least 2 characters")
    .max(60, "Client name is too long"),
  clientBanner: httpUrl("banner URL"),
  vendorName: z
    .string()
    .trim()
    .min(2, "Vendor name must be at least 2 characters")
    .max(60, "Vendor name is too long"),
  vendorLogo: httpUrl("logo URL"),
  poweredbyStatus: z.boolean(),
  poweredbyName: z.string().trim().max(60, "Name is too long"),
  poweredbyUrl: httpUrl("URL"),
});

export type AdminProfileValues = z.infer<typeof AdminProfileSchema>;
export type PlatformSettingValues = z.infer<typeof PlatformSettingSchema>;
export type BrandingSettingsValues = z.infer<typeof BrandingSettingsSchema>;
