"use server";

import {
  StaffRegisterSchema,
  StudentRegisterSchema,
} from "@/schemas/auth-schema";
import { db } from "@/lib/db";
import {
  findRoleByCode,
  getPlatformSettings,
  getRegistrationCode,
  isMaintenanceMode,
  type RegisterRole,
} from "@/lib/platform-settings";
import * as z from "zod";
import { genSaltSync, hashSync } from "bcrypt-ts";

const hash = (password: string) => hashSync(password, genSaltSync(10));

const AccessCodeSchema = z.object({
  code: z.string().min(1, "Access code is required"),
});

const MAINTENANCE_REGISTER_ERROR =
  "Registration is temporarily unavailable — the application is under maintenance";

/**
 * Verify a registration access code BEFORE the user fills in their details.
 * Public (unauthenticated). There is no role picker on the register page —
 * the code itself determines the role (student or staff), which is returned
 * here so the form can display it as read-only. Never leaks the code.
 * Admins cannot self-register, so no admin codes exist.
 */
export const verifyRegisterCode = async (
  values: z.infer<typeof AccessCodeSchema>
) => {
  // Maintenance blocks everything first — never leak whether codes exist.
  if (await isMaintenanceMode()) {
    return { error: MAINTENANCE_REGISTER_ERROR };
  }

  const validated = AccessCodeSchema.safeParse(values);
  if (!validated.success) return { error: "Enter the access code" };

  const code = validated.data.code.trim().toUpperCase();

  const role = await findRoleByCode(code);
  if (!role) {
    return { error: "Invalid access code" };
  }

  // The code exists — registration for that role must also be open.
  const settings = await getPlatformSettings();
  const allowed =
    role === "student" ? settings.allowStudentRegister : settings.allowStaffRegister;
  if (!allowed) {
    return {
      error: `${role === "student" ? "Student" : "Staff"} registration is currently disabled by the administrator`,
    };
  }

  return {
    success: "Access code verified — you can register now",
    role,
  };
};

/** Shared gate: no maintenance, registration open AND the code must match. */
async function assertRegisterCode(role: RegisterRole, accessCode?: string) {
  if (await isMaintenanceMode()) {
    return MAINTENANCE_REGISTER_ERROR;
  }

  const settings = await getPlatformSettings();
  const allowed =
    role === "student" ? settings.allowStudentRegister : settings.allowStaffRegister;
  if (!allowed) {
    return `${role === "student" ? "Student" : "Staff"} registration is currently disabled by the administrator`;
  }
  const code = accessCode?.trim().toUpperCase() ?? "";
  const stored = await getRegistrationCode(role);
  if (!stored || stored !== code) {
    return "A valid access code is required to register";
  }
  return null;
}

/** Staff self-registration (original staff app behavior). */
export const registerStaff = async (
  values: z.infer<typeof StaffRegisterSchema>,
  accessCode?: string
) => {
  // Registration must be open and the admin-generated access code must match.
  const codeError = await assertRegisterCode("staff", accessCode);
  if (codeError) return { error: codeError };

  const validatedFields = StaffRegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid details" };
  }
  const { email, password, name, staffnumber, department, phone } =
    validatedFields.data;

  const existing = await db.staff.findUnique({ where: { email } });
  if (existing) return { error: "Email already exists !" };

  await db.staff.create({
    data: { name, email, staffnumber, department, phone, password: hash(password) },
  });

  return { success: "Registeration Completed !" };
};

/** Student self-registration (original student app behavior). */
export const registerStudent = async (
  values: z.infer<typeof StudentRegisterSchema>,
  accessCode?: string
) => {
  // Registration must be open and the admin-generated access code must match.
  const codeError = await assertRegisterCode("student", accessCode);
  if (codeError) return { error: codeError };

  const validatedFields = StudentRegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid details" };
  }
  const { email, password, name, rollnumber, batch, department, section } =
    validatedFields.data;

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) return { error: "Email already exists !" };

  await db.user.create({
    data: {
      name,
      email,
      department,
      rollnumber,
      batch,
      section,
      password: hash(password),
    },
  });

  return { success: "Registeration Completed !" };
};
