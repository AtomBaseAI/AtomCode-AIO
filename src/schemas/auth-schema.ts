import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  /**
   * Super-admin second factor (static 4-digit auth code). Optional so the
   * regular login form and first step stay unchanged — authorize() in
   * src/auth.ts REQUIRES it when the email belongs to a SuperAdmin.
   */
  code: z
    .string()
    .regex(/^\d{4}$/, { message: "Enter the 4-digit auth code" })
    .optional(),
});

/** Second-step payload: credentials + auth code together (super admin). */
export const SuperAdminVerifySchema = LoginSchema.extend({
  code: z.string().regex(/^\d{4}$/, { message: "Enter the 4-digit auth code" }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export const StaffRegisterSchema = RegisterSchema.extend({
  staffnumber: z.string().min(1, {
    message: "Staffnumber is required",
  }),
  department: z.string().min(1, {
    message: "Department is required",
  }),
  phone: z.string().min(1, {
    message: "Phone is required",
  }),
});

export const StudentRegisterSchema = RegisterSchema.extend({
  rollnumber: z.string().min(1, {
    message: "Rollnumber is required",
  }),
  batch: z.string().min(1, {
    message: "Batch is required",
  }),
  department: z.string().min(1, {
    message: "Department is required",
  }),
  section: z.string().min(1, {
    message: "Section is required",
  }),
});
