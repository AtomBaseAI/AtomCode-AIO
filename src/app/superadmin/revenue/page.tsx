import { Banknote, CircleAlert, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { TopbarTitle } from "@/components/topbar-title";
import { Card, CardContent } from "@/components/ui/card";
import {
  computeRevenueStats,
  currentBillingYear,
  getBatchSetupRows,
  getBillingLedger,
} from "@/data/revenue";
import { formatINR } from "@/lib/format-inr";
import {
  PlanMixCard,
  RevenueByBatchCard,
  RevenueByYearCard,
} from "@/components/revenue/revenue-charts";
import {
  BatchBillingSetupTable,
  BillingLedgerTable,
} from "@/components/revenue/batch-billing-table";

function KpiCard({
  icon: Icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  tone: string;
}) {
  return (
    <div className="flex h-full items-center gap-4 rounded-md border bg-card p-5 shadow-md">
      <div className={`inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md ${tone}`}>
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <div className="min-w-0">
        <span className="block text-2xl font-bold leading-tight">{value}</span>
        <span className="block truncate text-sm text-gray-500 dark:text-gray-400">{label}</span>
        {sub && <span className="block text-xs text-gray-400 dark:text-gray-500">{sub}</span>}
      </div>
    </div>
  );
}

/**
 * Super-admin-only revenue dashboard — annual billing, batch wise.
 * Two plans only (Free / Premium); the super admin enables billing per
 * batch with a per-student INR amount, the institution collects the cash
 * and no individual student ever gets a billing status. This page is the
 * single surface where any of it is visible — never rendered for
 * admin/staff/user roles (routes + actions are both guarded).
 */
export default async function RevenuePage() {
  const [setup, ledger] = await Promise.all([getBatchSetupRows(), getBillingLedger()]);
  const stats = computeRevenueStats(ledger, setup);
  const year = currentBillingYear();

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-6 p-4 pb-8 md:p-8">
      <TopbarTitle>Revenue</TopbarTitle>

      <div className="flex flex-wrap items-center gap-2">
        <p className="text-xl font-semibold tracking-tight text-muted-foreground">
          Annual billing — batch wise ({year})
        </p>
        <span className="inline-flex items-center gap-1 rounded-full border border-purple-600/30 bg-purple-500/10 px-2.5 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400">
          <ShieldCheck className="h-3 w-3" aria-hidden />
          Super admin only
        </span>
      </div>

      <p className="max-w-3xl text-sm text-muted-foreground">
        Two plans only — Free and Premium. Enable Premium on a batch with a
        per-student yearly amount in ₹; the institution collects the cash, so
        students are never billed individually inside the platform.
      </p>

      {/* ---------------- KPI row ---------------- */}
      <section aria-label="Revenue KPIs" className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          icon={Banknote}
          label="Total collected (all time)"
          value={formatINR(stats.totalCollected)}
          sub={`cash · ${stats.collectedBatches} batch year(s)`}
          tone="bg-green-100 text-green-600 dark:bg-green-950/20 dark:text-green-400"
        />
        <KpiCard
          icon={TrendingUp}
          label={`Collected in ${year}`}
          value={formatINR(stats.thisYearCollected)}
          sub={`${stats.collectionRate}% of billed money in`}
          tone="bg-purple-100 text-purple-600 dark:bg-purple-950/20 dark:text-purple-400"
        />
        <KpiCard
          icon={CircleAlert}
          label="Expected (pending)"
          value={formatINR(stats.expected)}
          sub={`${stats.pendingBatches} batch(es) to collect`}
          tone="bg-amber-100 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400"
        />
        <KpiCard
          icon={Users}
          label="Premium students"
          value={String(stats.premiumStudents)}
          sub={`${stats.premiumBatches} premium batch(es) · ${stats.freeBatches} free`}
          tone="bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-950/20 dark:text-fuchsia-400"
        />
      </section>

      {/* ---------------- Charts ---------------- */}
      <section aria-label="Revenue charts" className="grid w-full gap-6 xl:grid-cols-3">
        <RevenueByYearCard stats={stats} />
        <PlanMixCard stats={stats} />
        <RevenueByBatchCard stats={stats} />
      </section>

      {/* ---------------- Batch billing setup ---------------- */}
      <section aria-label="Batch billing setup" className="w-full">
        <Card>
          <CardContent className="pt-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Batch billing — {year}</h2>
              <p className="text-sm text-muted-foreground">
                Enable Premium billing per batch (never per student) and set
                the yearly INR amount. Mark a batch collected once the
                institution hands over the cash.
              </p>
            </div>
            <BatchBillingSetupTable rows={setup} />
          </CardContent>
        </Card>
      </section>

      {/* ---------------- Collection ledger ---------------- */}
      <section aria-label="Collection ledger" className="w-full">
        <Card>
          <CardContent className="pt-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Collection ledger</h2>
              <p className="text-sm text-muted-foreground">
                Every batch × year collection record — the revenue history of
                the platform.
              </p>
            </div>
            <BillingLedgerTable rows={ledger} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
