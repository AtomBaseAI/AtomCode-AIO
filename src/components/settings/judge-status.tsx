"use client";

// Judge endpoint health tester — pings the AWS Lambda judge endpoints
// through the admin-only API and shows per-language reachability + latency.

import { useState } from "react";
import { toast } from "sonner";
import { Activity, LoaderIcon, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type PingResult = {
  language: string;
  host: string;
  ok: boolean;
  status: number | null;
  ms: number | null;
};

export function JudgeStatus({ configured }: { configured: boolean }) {
  const [results, setResults] = useState<PingResult[] | null>(null);
  const [loading, setLoading] = useState(false);

  const runPing = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings/judge-ping");
      if (!res.ok) {
        toast.error(
          res.status === 403
            ? "Only admins can test the judge endpoints."
            : "Failed to run the health check."
        );
        return;
      }
      const data: { configured: boolean; results: PingResult[] } =
        await res.json();
      if (!data.configured) {
        toast.error("No judge endpoints configured on this server.");
        setResults([]);
        return;
      }
      setResults(data.results);
      const down = data.results.filter((r) => !r.ok).length;
      toast.success(
        down === 0
          ? `All ${data.results.length} endpoints reachable`
          : `${data.results.length - down}/${data.results.length} reachable`
      );
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (!configured) {
    return (
      <p className="text-sm text-muted-foreground">
        No Lambda judge endpoints are configured on this server
        (set <code className="rounded bg-muted px-1">LAMBDA_JUDGE_URLS</code>).
        Code execution falls back to the built-in browser runtimes.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Run a reachability check against the deployed AWS Lambda compilers.
        </p>
        <Button onClick={runPing} disabled={loading} size="sm" className="gap-1.5">
          {loading ? (
            <LoaderIcon className="h-3.5 w-3.5 animate-spin" aria-hidden />
          ) : (
            <RefreshCw className="h-3.5 w-3.5" aria-hidden />
          )}
          {results ? "Re-test" : "Test endpoints"}
        </Button>
      </div>

      {results && (
        <div className="max-h-72 overflow-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Language</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Latency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((r) => (
                <TableRow key={r.language}>
                  <TableCell className="font-medium capitalize">
                    {r.language}
                  </TableCell>
                  <TableCell className="max-w-[220px] truncate text-muted-foreground">
                    {r.host}
                  </TableCell>
                  <TableCell>
                    {r.ok ? (
                      <Badge
                        variant="outline"
                        className="border-green-600/40 bg-green-500/10 text-green-600 dark:text-green-400"
                      >
                        {r.status ? `HTTP ${r.status}` : "reachable"}
                      </Badge>
                    ) : (
                      <Badge variant="destructive">unreachable</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {r.ms != null ? `${r.ms} ms` : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {!results && (
        <div className="flex items-center gap-2 rounded-md border border-dashed p-3 text-sm text-muted-foreground">
          <Activity className="h-4 w-4" aria-hidden />
          No health check has been run yet.
        </div>
      )}
    </div>
  );
}
