import { auth } from "@/auth";
import Image from "next/image";
import {
  BadgeCheck,
  Bot,
  CircleOff,
  KeyRound,
  Layers,
  ShieldAlert,
  Zap,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AdminPassword from "@/components/settings/admin-password";
import { AdminProfileForm } from "@/components/settings/admin-profile-form";
import { PlatformSettings } from "@/components/settings/platform-settings";
import { JudgeStatus } from "@/components/settings/judge-status";
import { getPlatformSettings } from "@/lib/platform-settings";
import pkg from "../../../../package.json";

const Settings = async () => {
  const session = await auth();
  if (session?.user?.id === undefined) {
    return null;
  }
  const admin = {
    id: session.user.id,
    name: session.user.name ?? "Administrator",
    email: session.user.email ?? "",
  };

  const [platformSettings] = await Promise.all([getPlatformSettings()]);

  // Server-side config statuses (env is only readable on the server).
  const judgeUrls = (() => {
    try {
      const map = JSON.parse(process.env.LAMBDA_JUDGE_URLS ?? "") as Record<string, string>;
      return Object.values(map).filter(Boolean);
    } catch {
      return [];
    }
  })();
  const judgeConfigured =
    judgeUrls.length > 0 ||
    Boolean(process.env.LAMBDA_JUDGE_URL || process.env.NEXT_PUBLIC_LAMBDA_URL);
  const aiConfigured = Boolean(process.env.OPENAI_API_KEY);
  const aiModel = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const systemRows: { label: string; value: string }[] = [
    { label: "App version", value: `AtomCODE v${pkg.version}` },
    { label: "Next.js", value: (pkg.dependencies?.next as string) ?? "16" },
    { label: "Node.js", value: process.version },
    { label: "Runtime", value: process.env.NODE_ENV ?? "development" },
    { label: "Database", value: "PostgreSQL (Neon)" },
    {
      label: "Code execution",
      value: judgeConfigured ? "AWS Lambda judge + fallbacks" : "Built-in browser runtimes",
    },
  ];

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-6 pb-8">
      <header className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account, platform configuration and integrations
        </p>
      </header>

      <div className="grid w-full max-w-4xl gap-6">
        {/* ---------------- Profile ---------------- */}
        <Card>
          <div className="h-20 w-full rounded-t-lg bg-gradient-to-r from-purple-500 to-fuchsia-600" />
          <CardContent className="pb-6">
            <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end">
              <Image
                src="https://ik.imagekit.io/atominc/academy-mini-bg-z-grad.webp"
                alt="Administrator avatar"
                width={80}
                height={80}
                className="h-20 w-20 rounded-full border-4 border-white bg-slate-200/90 object-cover shadow-lg dark:border-card dark:bg-slate-600/90"
              />
              <div className="flex-1 sm:pb-1">
                <h2 className="text-xl font-bold">{admin.name}</h2>
                <p className="text-sm text-muted-foreground">{admin.email}</p>
              </div>
              <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:flex-shrink-0">
                <AdminProfileForm id={admin.id} name={admin.name} email={admin.email} />
                <AdminPassword uid={admin.id} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ---------------- Platform ---------------- */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-purple-600" aria-hidden />
              Platform
            </CardTitle>
            <CardDescription>
              Access switches that apply platform-wide, effective immediately
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PlatformSettings initial={platformSettings} />
          </CardContent>
        </Card>

        {/* ---------------- Judge ---------------- */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-600" aria-hidden />
              Code Judge
            </CardTitle>
            <CardDescription>
              AWS Lambda compiler endpoints (C, C++, Java, Python, SQL, JavaScript, TypeScript, Ruby)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <JudgeStatus configured={judgeConfigured} />
          </CardContent>
        </Card>

        {/* ---------------- AI + System ---------------- */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-purple-600" aria-hidden />
                ATOM AI Assistant
              </CardTitle>
              <CardDescription>OpenAI-backed code tutor for students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">API key</span>
                {aiConfigured ? (
                  <Badge
                    variant="outline"
                    className="border-green-600/40 bg-green-500/10 text-green-600 dark:text-green-400"
                  >
                    <BadgeCheck className="mr-1 h-3 w-3" aria-hidden />
                    Configured
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-amber-600/40 bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <CircleOff className="mr-1 h-3 w-3" aria-hidden />
                    Not configured
                  </Badge>
                )}
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">Model</span>
                <span className="font-medium">{aiModel}</span>
              </div>
              <Separator />
              <p className="text-xs text-muted-foreground">
                Keys are managed via server environment variables (OPENAI_API_KEY, OPENAI_MODEL) — never stored in the database.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-purple-600" aria-hidden />
                System
              </CardTitle>
              <CardDescription>Deployment & runtime information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {systemRows.map((row, i) => (
                <div key={row.label}>
                  {i > 0 && <Separator className="mb-3" />}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="text-right font-medium">{row.value}</span>
                  </div>
                </div>
              ))}
              <Separator />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <KeyRound className="h-3.5 w-3.5" aria-hidden />
                Secrets (DB, judge tokens, AI keys) live only in environment variables.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
