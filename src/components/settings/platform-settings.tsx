"use client";

// Platform toggles (maintenance mode + self-registration switches).
// Each Switch is optimistic: it flips immediately, reverts on failure.
//
// Student/staff self-registration is additionally gated by an admin-
// generated access code: enabling requires an active code, disabling
// deletes it (accounts created with it remain untouched).

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  Copy,
  KeyRound,
  LoaderIcon,
  RefreshCw,
} from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  updatePlatformSetting,
  generateRegistrationCode,
} from "@/actions/settings";
import type { PlatformSettings, RegisterRole } from "@/lib/platform-settings";

const ROWS: {
  key: keyof PlatformSettings;
  settingKey: string;
  role?: RegisterRole;
  title: string;
  description: string;
}[] = [
  {
    key: "maintenanceMode",
    settingKey: "platform.maintenance",
    title: "Maintenance mode",
    description:
      "Show a maintenance notice on the login page instead of the sign-in form. Admins can still sign in.",
  },
  {
    key: "allowStudentRegister",
    settingKey: "platform.allowStudentRegister",
    role: "student",
    title: "Student self-registration",
    description:
      "Allow new students to create their own accounts from the register page — requires an access code.",
  },
  {
    key: "allowStaffRegister",
    settingKey: "platform.allowStaffRegister",
    role: "staff",
    title: "Staff self-registration",
    description:
      "Allow new staff members to create their own accounts from the register page — requires an access code.",
  },
];

export function PlatformSettings({
  initial,
  initialCodes,
}: {
  initial: PlatformSettings;
  initialCodes: { student: string | null; staff: string | null };
}) {
  const [values, setValues] = useState<PlatformSettings>(initial);
  const [codes, setCodes] = useState(initialCodes);
  const [pending, startTransition] = useTransition();
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [generatingRole, setGeneratingRole] = useState<RegisterRole | null>(null);

  const toggle = (row: (typeof ROWS)[number], next: boolean) => {
    const prev = values[row.key];
    setValues((v) => ({ ...v, [row.key]: next }));
    setSavingKey(row.settingKey);
    startTransition(async () => {
      try {
        const res = await updatePlatformSetting({
          key: row.settingKey as "platform.maintenance",
          value: next,
        });
        if (res.error) {
          setValues((v) => ({ ...v, [row.key]: prev }));
          toast.error(res.error);
        } else {
          toast.success(`${row.title} ${next ? "enabled" : "disabled"}`);
          if (!next && row.role) {
            // Server deleted the access code when registration closed.
            setCodes((c) => ({ ...c, [row.role!]: null }));
          }
        }
      } catch {
        setValues((v) => ({ ...v, [row.key]: prev }));
        toast.error("Something went wrong!");
      } finally {
        setSavingKey(null);
      }
    });
  };

  const generate = (role: RegisterRole) => {
    setGeneratingRole(role);
    startTransition(async () => {
      try {
        const res = await generateRegistrationCode(role);
        if ("error" in res && res.error) {
          toast.error(res.error);
        } else if ("code" in res && res.code) {
          setCodes((c) => ({ ...c, [role]: res.code }));
          toast.success(
            role === "student"
              ? "Student access code generated"
              : "Staff access code generated"
          );
        }
      } catch {
        toast.error("Something went wrong!");
      } finally {
        setGeneratingRole(null);
      }
    });
  };

  const copyCode = async (role: RegisterRole) => {
    const code = codes[role];
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Access code copied to clipboard");
    } catch {
      toast.error("Could not copy the code");
    }
  };

  return (
    <div className="space-y-1">
      {ROWS.map((row, i) => {
        const code = row.role ? codes[row.role] : null;
        const isEnabled = values[row.key];
        return (
          <div key={row.settingKey}>
            {i > 0 && <Separator className="my-4" />}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <Label
                  htmlFor={row.settingKey}
                  className="text-sm font-medium leading-none"
                >
                  {row.title}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {row.description}
                </p>

                {/* Access-code management (student/staff rows only) */}
                {row.role && (
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {code ? (
                      <>
                        <span
                          className="inline-flex items-center gap-2 rounded-md border bg-muted/50 px-2.5 py-1 font-mono text-sm tracking-[0.25em] text-foreground"
                          aria-label={`${row.role} access code`}
                        >
                          <KeyRound
                            className="h-3.5 w-3.5 tracking-normal text-purple-600"
                            aria-hidden
                          />
                          {code}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 gap-1 px-2 text-xs"
                          onClick={() => copyCode(row.role!)}
                        >
                          <Copy className="h-3 w-3" aria-hidden />
                          Copy
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 gap-1 px-2 text-xs"
                          disabled={generatingRole === row.role}
                          onClick={() => generate(row.role!)}
                        >
                          {generatingRole === row.role ? (
                            <LoaderIcon
                              className="h-3 w-3 animate-spin"
                              aria-hidden
                            />
                          ) : (
                            <RefreshCw className="h-3 w-3" aria-hidden />
                          )}
                          Regenerate
                        </Button>
                      </>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1.5 text-xs"
                        disabled={generatingRole === row.role}
                        onClick={() => generate(row.role!)}
                      >
                        {generatingRole === row.role ? (
                          <LoaderIcon
                            className="h-3 w-3 animate-spin"
                            aria-hidden
                          />
                        ) : (
                          <KeyRound className="h-3 w-3" aria-hidden />
                        )}
                        Generate access code
                      </Button>
                    )}
                    {row.role && isEnabled && code && (
                      <span className="text-xs text-muted-foreground">
                        {row.role === "student" ? "Students" : "Staff"} must
                        enter this code on the register page before their
                        details.
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-shrink-0 items-center gap-2 pt-1">
                {savingKey === row.settingKey && (
                  <LoaderIcon className="h-4 w-4 animate-spin text-muted-foreground" />
                )}
                <Switch
                  id={row.settingKey}
                  checked={values[row.key]}
                  disabled={pending && savingKey === row.settingKey}
                  onCheckedChange={(checked) => toggle(row, checked)}
                  aria-label={row.title}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
