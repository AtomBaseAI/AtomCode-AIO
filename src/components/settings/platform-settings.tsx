"use client";

// Platform toggles (maintenance mode + self-registration switches).
// Each Switch is optimistic: it flips immediately, reverts on failure.

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { updatePlatformSetting } from "@/actions/settings";
import type { PlatformSettings } from "@/lib/platform-settings";

const ROWS: {
  key: keyof PlatformSettings;
  settingKey: string;
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
    title: "Student self-registration",
    description:
      "Allow new students to create their own accounts from the register page.",
  },
  {
    key: "allowStaffRegister",
    settingKey: "platform.allowStaffRegister",
    title: "Staff self-registration",
    description:
      "Allow new staff members to create their own accounts from the register page.",
  },
];

export function PlatformSettings({ initial }: { initial: PlatformSettings }) {
  const [values, setValues] = useState<PlatformSettings>(initial);
  const [pending, startTransition] = useTransition();
  const [savingKey, setSavingKey] = useState<string | null>(null);

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
          toast.success(
            `${row.title} ${next ? "enabled" : "disabled"}`
          );
        }
      } catch {
        setValues((v) => ({ ...v, [row.key]: prev }));
        toast.error("Something went wrong!");
      } finally {
        setSavingKey(null);
      }
    });
  };

  return (
    <div className="space-y-1">
      {ROWS.map((row, i) => (
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
              <p className="text-sm text-muted-foreground">{row.description}</p>
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
      ))}
    </div>
  );
}
