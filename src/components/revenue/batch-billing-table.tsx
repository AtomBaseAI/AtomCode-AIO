"use client";

// AtomCode — batch-wise annual billing management (super admin only).
// Replaces the old per-user billing table: billing is enabled per batch
// (never per student), amounts are INR per student per year, and cash is
// collected by the institution — so the only statuses are PENDING and
// COLLECTED, one record per batch per year. Actions are inline icon
// buttons (same pattern as the staff table), no dropdown menus.

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  CircleCheck,
  LoaderIcon,
  Pencil,
  RotateCcw,
  PowerOff,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatINR } from "@/lib/format-inr";
import type { BatchSetupRow, LedgerRow } from "@/data/revenue";
import {
  disableBatchBilling,
  markBatchCollected,
  markBatchPending,
  saveBatchBilling,
} from "@/actions/admin-manage";

/* ------------------------------------------------------------------ */
/* Badges                                                              */
/* ------------------------------------------------------------------ */

function PlanBadge({ plan, enabled }: { plan: string; enabled: boolean }) {
  const premium = enabled && plan === "PREMIUM";
  return (
    <Badge
      variant="outline"
      className={
        premium
          ? "border-purple-600/40 bg-purple-500/10 text-purple-600 dark:text-purple-400"
          : "border-zinc-500/40 bg-zinc-500/10 text-zinc-500 dark:text-zinc-400"
      }
    >
      {premium ? "Premium" : "Free"}
    </Badge>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={
        status === "COLLECTED"
          ? "border-green-600/40 bg-green-500/10 text-green-600 dark:text-green-400"
          : "border-amber-600/40 bg-amber-500/10 text-amber-600 dark:text-amber-400"
      }
    >
      {status === "COLLECTED" ? "Collected" : "Pending"}
    </Badge>
  );
}

/* ------------------------------------------------------------------ */
/* Shared action runner                                                */
/* ------------------------------------------------------------------ */

type ActionResult = { success?: string; error?: string };

function useBillingAction() {
  const [loading, startTransition] = useTransition();
  const run = (fn: () => Promise<ActionResult>) => {
    startTransition(() => {
      fn()
        .then((data) => {
          if (data.success) toast.success(data.success);
          else if (data.error) toast.error(data.error);
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };
  return { loading, run };
}

/* ------------------------------------------------------------------ */
/* Enable / configure billing dialog                                   */
/* ------------------------------------------------------------------ */

function ConfigureBillingDialog({
  row,
  trigger,
}: {
  row: BatchSetupRow;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(
    row.annualAmount ? String(row.annualAmount) : ""
  );
  const { loading, run } = useBillingAction();

  const parsed = Number(amount);
  const valid = Number.isFinite(parsed) && parsed > 0;
  const yearTotal = valid ? Math.round(parsed * row.students) : 0;
  const isUpdate = row.billingEnabled && row.plan === "PREMIUM";

  const submit = () => {
    if (!valid) return;
    run(async () => {
      const res = await saveBatchBilling({ batchValue: row.batchValue, annualAmount: parsed });
      if (res.success) setOpen(false);
      return res;
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Update billing" : "Enable billing"} — batch {row.batchValue}
          </DialogTitle>
          <DialogDescription>
            Annual billing is per batch: every student in the batch is billed
            the same INR amount per year, collected as cash by the institution.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <label className="grid gap-1.5">
            <span className="text-sm font-medium">Amount per student / year (₹)</span>
            <Input
              type="number"
              min="1"
              step="1"
              placeholder="e.g. 1000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={loading}
              aria-label="Annual amount per student in rupees"
            />
          </label>
          <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Students in batch</span>
              <span className="font-medium">{row.students}</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-muted-foreground">Expected for {row.year}</span>
              <span className="font-semibold">{formatINR(yearTotal)}</span>
            </div>
          </div>
          {row.record?.status === "COLLECTED" && (
            <p className="text-xs text-amber-600 dark:text-amber-400">
              {row.year} cash was already collected — a changed amount applies
              from the next billing year.
            </p>
          )}
          <Button type="button" onClick={submit} disabled={loading || !valid}>
            {loading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
            {isUpdate ? "Save changes" : "Enable premium billing"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/* Disable billing confirm dialog                                      */
/* ------------------------------------------------------------------ */

function DisableBillingDialog({ row }: { row: BatchSetupRow }) {
  const [open, setOpen] = useState(false);
  const { loading, run } = useBillingAction();

  const submit = () => {
    run(async () => {
      const res = await disableBatchBilling({ batchValue: row.batchValue });
      if (res.success) setOpen(false);
      return res;
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-red-600/50 hover:bg-red-600/10"
          disabled={loading}
          aria-label={`Disable billing for batch ${row.batchValue}`}
        >
          <PowerOff className="size-4 text-red-600" />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Disable billing for batch {row.batchValue}?</DialogTitle>
          <DialogDescription>
            The batch goes back to the Free plan. The pending {row.year}
            collection record is removed; already collected years stay in the
            revenue history.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={submit} disabled={loading}>
            {loading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
            Disable billing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/* Setup table — one row per batch                                     */
/* ------------------------------------------------------------------ */

export function BatchBillingSetupTable({ rows }: { rows: BatchSetupRow[] }) {
  const { loading, run } = useBillingAction();

  if (rows.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
        No batches yet — add them from Admin → Settings → System, they show up
        here for billing.
      </p>
    );
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Batch</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Per student / yr</TableHead>
            <TableHead>This year</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => {
            const premium = row.billingEnabled && row.plan === "PREMIUM";
            const rec = row.record;
            return (
              <TableRow key={row.batchValue}>
                <TableCell className="font-medium">{row.batchValue}</TableCell>
                <TableCell>{row.students}</TableCell>
                <TableCell>
                  <PlanBadge plan={row.plan} enabled={row.billingEnabled} />
                </TableCell>
                <TableCell>
                  {premium && row.annualAmount ? formatINR(row.annualAmount) : "—"}
                </TableCell>
                <TableCell>
                  {!premium ? (
                    <span className="text-sm text-muted-foreground">Not started</span>
                  ) : rec ? (
                    <div className="flex flex-col gap-0.5">
                      <StatusBadge status={rec.status} />
                      <span className="text-sm font-semibold">
                        {rec.status === "COLLECTED"
                          ? formatINR(rec.totalAmount)
                          : formatINR((row.annualAmount ?? 0) * row.students)}
                      </span>
                      {rec.status === "COLLECTED" && rec.collectedAt && (
                        <span className="text-xs text-muted-foreground">
                          cash ·{" "}
                          {rec.collectedAt.toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Not started</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-2">
                    {loading && <LoaderIcon className="h-4 w-4 animate-spin text-muted-foreground" />}
                    <ConfigureBillingDialog
                      row={row}
                      trigger={
                        premium ? (
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-primary bg-transparent hover:bg-purple-700/10"
                            aria-label={`Edit billing for batch ${row.batchValue}`}
                          >
                            <Pencil className="size-4 text-primary" />
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-primary bg-transparent hover:bg-purple-700/10 hover:text-primary"
                            aria-label={`Enable billing for batch ${row.batchValue}`}
                          >
                            <Wallet className="mr-1.5 h-4 w-4 text-primary" />
                            Enable
                          </Button>
                        )
                      }
                    />
                    {rec?.status === "PENDING" && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-green-600/50 hover:bg-green-600/10"
                        disabled={loading}
                        onClick={() => run(() => markBatchCollected({ id: rec.id }))}
                        aria-label={`Mark ${row.batchValue} collected`}
                      >
                        <CircleCheck className="size-4 text-green-600" />
                      </Button>
                    )}
                    {rec?.status === "COLLECTED" && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-amber-600/50 hover:bg-amber-600/10"
                        disabled={loading}
                        onClick={() => run(() => markBatchPending({ id: rec.id }))}
                        aria-label={`Reopen ${row.batchValue} billing`}
                      >
                        <RotateCcw className="size-4 text-amber-600" />
                      </Button>
                    )}
                    {premium && <DisableBillingDialog row={row} />}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ledger table — every batch × year collection record                 */
/* ------------------------------------------------------------------ */

export function BillingLedgerTable({ rows }: { rows: LedgerRow[] }) {
  const { loading, run } = useBillingAction();

  if (rows.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
        No collection records yet — enable billing on a batch and its yearly
        record appears here.
      </p>
    );
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Year</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Per student</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Collected on</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-medium">{r.year}</TableCell>
              <TableCell>{r.batchValue}</TableCell>
              <TableCell>{r.studentCount}</TableCell>
              <TableCell>{formatINR(r.amountPerStudent)}</TableCell>
              <TableCell className="font-semibold">{formatINR(r.totalAmount)}</TableCell>
              <TableCell>
                <StatusBadge status={r.status} />
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {r.collectedAt
                  ? r.collectedAt.toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "—"}
                {r.method ? ` · ${r.method}` : ""}
              </TableCell>
              <TableCell>
                <span className="flex items-center gap-2">
                  {loading && <LoaderIcon className="h-4 w-4 animate-spin text-muted-foreground" />}
                  {r.status === "PENDING" ? (
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-green-600/50 hover:bg-green-600/10"
                      disabled={loading}
                      onClick={() => run(() => markBatchCollected({ id: r.id }))}
                      aria-label={`Mark ${r.batchValue} ${r.year} collected`}
                    >
                      <CircleCheck className="size-4 text-green-600" />
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-amber-600/50 hover:bg-amber-600/10"
                      disabled={loading}
                      onClick={() => run(() => markBatchPending({ id: r.id }))}
                      aria-label={`Reopen ${r.batchValue} ${r.year}`}
                    >
                      <RotateCcw className="size-4 text-amber-600" />
                    </Button>
                  )}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
