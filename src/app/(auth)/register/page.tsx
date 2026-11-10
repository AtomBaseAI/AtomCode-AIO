import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { RegisterFormStaff } from "@/components/auth/register-form-staff";
import { RegisterFormStudent } from "@/components/auth/register-form-student";
import { RegisterGate } from "@/components/auth/register-gate";
import { getBrandingSettings } from "@/lib/branding-settings";
import { isMaintenanceMode } from "@/lib/platform-settings";
import { Wrench } from "lucide-react";

// The register page has no role picker: the visitor enters the admin-
// generated access code, the role (student/staff) is resolved from the
// code and shown read-only above the matching form. Admins cannot
// self-register — admin accounts are provisioned internally only.
// While maintenance mode is on, registration is unavailable: the form is
// replaced by a notice and the register actions reject every attempt.
export default async function Register() {
  const [{ clientName }, maintenance] = await Promise.all([
    getBrandingSettings(),
    isMaintenanceMode(),
  ]);

  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:px-0">
        <div className="absolute right-4 top-4 md:right-8 md:top-8">
          <ThemeToggle />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            {maintenance ? (
              <>
                <div className="flex flex-col space-y-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Registration unavailable
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {clientName} is currently under maintenance. Please try
                    again later.
                  </p>
                </div>
                <div
                  role="alert"
                  className="flex flex-col items-center gap-3 rounded-lg border border-dashed px-6 py-8 text-center"
                >
                  <Wrench className="h-8 w-8 text-muted-foreground" aria-hidden />
                  <p className="text-sm text-muted-foreground">
                    New account registrations are temporarily disabled while
                    the application is under maintenance.
                  </p>
                </div>
                <p className="px-8 text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Login
                  </Link>
                </p>
              </>
            ) : (
              <>
                <div className="flex flex-col space-y-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Create an account
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Register on {clientName} — enter your access code to
                    continue
                  </p>
                </div>

                <RegisterGate
                  studentForm={<RegisterFormStudent />}
                  staffForm={<RegisterFormStaff />}
                />

                <p className="px-8 text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Login
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
