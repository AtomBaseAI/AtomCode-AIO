"use client";

// Admin → Settings → System — Batch & Department management.
// Two tables with an Add button each; entries are stored in the database and
// served dynamically to every form and table filter via /api/lookups.

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { BookA, CalendarClock, LoaderIcon, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { syncLookups } from "@/hooks/use-lookups";

export type BatchRow = { id: string; value: string };
export type DepartmentRow = { id: string; value: string; label: string };

type LookupItem =
  | { type: "batch"; id: string; value: string; label?: undefined }
  | { type: "department"; id: string; value: string; label: string };

async function mutate(
  method: "POST" | "DELETE",
  body: Record<string, string>
): Promise<{ error?: string; item?: LookupItem }> {
  const res = await fetch("/api/admin/lookups", {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as {
    error?: string;
    item?: { id: string; value: string; label?: string };
  };
  if (!res.ok) return { error: data.error ?? "Something went wrong!" };
  if (data.item) {
    return {
      item: {
        type: body.type as "batch" | "department",
        id: data.item.id,
        value: data.item.value,
        label: data.item.label,
      } as LookupItem,
    };
  }
  return {};
}

function LookupTable({
  title,
  singular,
  icon,
  placeholder,
  rows,
  type,
  emptyHint,
  onAdded,
  onDeleted,
}: {
  title: string;
  singular: string;
  icon: React.ReactNode;
  placeholder: string;
  rows: BatchRow[] | DepartmentRow[];
  type: "batch" | "department";
  emptyHint: string;
  onAdded: (item: LookupItem) => void;
  onDeleted: (type: "batch" | "department", id: string) => void;
}) {
  const [value, setValue] = useState("");
  const [pending, startTransition] = useTransition();
  const [busyId, setBusyId] = useState<string | null>(null);

  const add = () => {
    const label = value.trim();
    if (!label) return;
    startTransition(async () => {
      try {
        const res = await mutate("POST", { type, label });
        if (res.error || !res.item) {
          toast.error(res.error ?? "Something went wrong!");
          return;
        }
        setValue("");
        onAdded(res.item);
        await syncLookups(true);
        toast.success(`${label} added to ${title.toLowerCase()}`);
      } catch {
        toast.error("Something went wrong!");
      }
    });
  };

  const remove = (id: string, display: string) => {
    setBusyId(id);
    startTransition(async () => {
      try {
        const res = await mutate("DELETE", { type, id });
        if (res.error) {
          toast.error(res.error);
          return;
        }
        onDeleted(type, id);
        await syncLookups(true);
        toast.success(`"${display}" removed from ${title.toLowerCase()}`);
      } catch {
        toast.error("Something went wrong!");
      } finally {
        setBusyId(null);
      }
    });
  };

  return (
    <div className="rounded-lg border bg-muted/20 p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold">
          {icon}
          {title}
          <Badge variant="secondary" className="font-mono text-xs">
            {rows.length}
          </Badge>
        </div>
      </div>

      <div className="mb-3 flex gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          aria-label={`New ${singular} name`}
          className="h-9"
          maxLength={40}
          disabled={pending}
        />
        <Button
          type="button"
          size="sm"
          className="h-9 gap-1.5"
          onClick={add}
          disabled={pending || value.trim() === ""}
        >
          {pending ? (
            <LoaderIcon className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <Plus className="h-4 w-4" aria-hidden />
          )}
          Add
        </Button>
      </div>

      {rows.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          {emptyHint}
        </p>
      ) : (
        <ScrollArea className="h-64 rounded-md border bg-background">
          <ul className="divide-y">
            {rows.map((row) => {
              const display =
                type === "department"
                  ? (row as DepartmentRow).label
                  : (row as BatchRow).value;
              const isFallback = row.id.startsWith("default-");
              return (
                <li
                  key={row.id}
                  className="flex items-center justify-between gap-2 px-3 py-2 text-sm"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{display}</p>
                    {type === "department" && (
                      <p className="truncate font-mono text-xs text-muted-foreground">
                        value: {(row as DepartmentRow).value}
                      </p>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0 text-muted-foreground hover:text-destructive"
                    aria-label={`Delete ${display}`}
                    disabled={isFallback || (pending && busyId === row.id)}
                    onClick={() => remove(row.id, display)}
                  >
                    {pending && busyId === row.id ? (
                      <LoaderIcon className="h-4 w-4 animate-spin" aria-hidden />
                    ) : (
                      <Trash2 className="h-4 w-4" aria-hidden />
                    )}
                  </Button>
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      )}
    </div>
  );
}

export function LookupManager({
  initialBatches,
  initialDepartments,
}: {
  initialBatches: BatchRow[];
  initialDepartments: DepartmentRow[];
}) {
  const [batches, setBatches] = useState<BatchRow[]>(initialBatches);
  const [departments, setDepartments] = useState<DepartmentRow[]>(initialDepartments);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <LookupTable
        title="Batches"
        singular="Batch"
        type="batch"
        icon={<CalendarClock className="h-4 w-4 text-purple-600" aria-hidden />}
        placeholder="e.g. 2027-2031"
        rows={batches}
        emptyHint="No batches yet — add one above."
        onAdded={(item) =>
          item.type === "batch" &&
          setBatches((rows) =>
            [...rows, { id: item.id, value: item.value }].sort((a, b) =>
              a.value.localeCompare(b.value)
            )
          )
        }
        onDeleted={(type, id) =>
          type === "batch" &&
          setBatches((rows) => rows.filter((r) => r.id !== id))
        }
      />
      <LookupTable
        title="Departments"
        singular="Department"
        type="department"
        icon={<BookA className="h-4 w-4 text-purple-600" aria-hidden />}
        placeholder="e.g. Robotics"
        rows={departments}
        emptyHint="No departments yet — add one above."
        onAdded={(item) =>
          item.type === "department" &&
          setDepartments((rows) =>
            [
              ...rows,
              { id: item.id, value: item.value, label: item.label },
            ].sort((a, b) => a.label.localeCompare(b.label))
          )
        }
        onDeleted={(type, id) =>
          type === "department" &&
          setDepartments((rows) => rows.filter((r) => r.id !== id))
        }
      />
    </div>
  );
}
