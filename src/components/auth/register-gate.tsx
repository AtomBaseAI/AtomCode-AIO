"use client";

// Registration access-code gate — the register page has NO role picker.
// Visitors enter the admin-generated access code first; the server resolves
// which role (student/staff) the code belongs to and the matching form is
// revealed with the role shown as a read-only field.
//
// The verified code + role are shared through React context: the form reads
// them with useVerifiedRegisterCode(). The final signup request still
// re-validates the code server-side.
//
// Admins cannot self-register — no admin codes exist and no admin form here.

import {
  createContext,
  useContext,
  useState,
  useTransition,
} from "react";
import {
  KeyRound,
  LoaderIcon,
  ShieldCheck,
  UserCog,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { verifyRegisterCode } from "@/actions/register";

type RegisterRole = "student" | "staff";

type VerifiedRegistration = { code: string; role: RegisterRole };

const RegisterCodeContext = createContext<VerifiedRegistration | null>(null);

/** Verified access code + role from the surrounding RegisterGate (null until verified). */
export function useVerifiedRegisterCode(): VerifiedRegistration | null {
  return useContext(RegisterCodeContext);
}

export function RegisterGate({
  studentForm,
  staffForm,
}: {
  /** Student registration form — rendered when the code resolves to "student". */
  studentForm: React.ReactNode;
  /** Staff registration form — rendered when the code resolves to "staff". */
  staffForm: React.ReactNode;
}) {
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState<VerifiedRegistration | null>(null);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isVerifying, startTransition] = useTransition();

  const handleVerify = () => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      try {
        const res = await verifyRegisterCode({ code });
        if (res.error) {
          setError(res.error);
        } else if (res.success && res.role) {
          setSuccess(res.success);
          setVerified({ code: code.trim().toUpperCase(), role: res.role });
        }
      } catch {
        setError("Something went wrong!");
      }
    });
  };

  if (verified) {
    return (
      <RegisterCodeContext.Provider value={verified}>
        <div className="grid gap-4">
          {/* Role resolved from the access code — view only, cannot be edited */}
          <div className="grid gap-1.5" aria-label="Registration role (read only)">
            <Label className="text-sm font-medium">Role</Label>
            <div className="relative">
              <Input
                value={verified.role === "student" ? "Student" : "Staff"}
                readOnly
                disabled
                aria-readonly
                className="pr-10 font-medium"
              />
              {verified.role === "student" ? (
                <UserRound
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-600 dark:text-purple-400"
                  aria-hidden
                />
              ) : (
                <UserCog
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-600 dark:text-purple-400"
                  aria-hidden
                />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Detected from your access code — this cannot be changed.
            </p>
          </div>
          {verified.role === "student" ? studentForm : staffForm}
        </div>
      </RegisterCodeContext.Provider>
    );
  }

  return (
    <div className="grid gap-4" aria-label="Access code verification">
      <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed bg-muted/40 p-4 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-950">
          <KeyRound
            className="h-5 w-5 text-purple-600 dark:text-purple-400"
            aria-hidden
          />
        </div>
        <div>
          <p className="text-sm font-semibold">Access code required</p>
          <p className="text-xs text-muted-foreground">
            Enter the registration access code provided by your administrator.
            Your role is detected automatically from the code.
          </p>
        </div>
      </div>

      <div className="grid gap-2">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleVerify();
            }
          }}
          placeholder="XXXXXXXX"
          aria-label="Registration access code"
          className="text-center font-mono text-lg tracking-[0.35em] uppercase"
          maxLength={12}
          disabled={isVerifying}
          autoFocus
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          onClick={handleVerify}
          disabled={isVerifying || code.trim() === ""}
        >
          {isVerifying ? (
            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <ShieldCheck className="mr-2 h-4 w-4" aria-hidden />
          )}
          Verify code
        </Button>
      </div>
    </div>
  );
}
