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

export type AdminProfileValues = z.infer<typeof AdminProfileSchema>;
export type PlatformSettingValues = z.infer<typeof PlatformSettingSchema>;
