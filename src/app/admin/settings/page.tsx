import { auth } from "@/auth";
import Image from "next/image";
import {
  BadgeCheck,
  Bot,
  Building2,
  CircleOff,
  Layers,
  ShieldAlert,
  Zap,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminPassword from "@/components/settings/admin-password";
import { AdminProfileForm } from "@/components/settings/admin-profile-form";
import { ClientDetailsForm } from "@/components/settings/client-details-form";
import { PlatformSettings } from "@/components/settings/platform-settings";
import { JudgeStatus } from "@/components/settings/judge-status";
import { LookupManager } from "@/components/settings/lookup-manager";
import { getPlatformSettings, getRegistrationCode } from "@/lib/platform-settings";
import { getBrandingSettings } from "@/lib/branding-settings";
import { getLookups } from "@/lib/lookup";

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

  const [platformSettings, branding, studentCode, staffCode, lookups] = await Promise.all([
    getPlatformSettings(),
    getBrandingSettings(),
    getRegistrationCode("student"),
    getRegistrationCode("staff"),
    getLookups(),
  ]);

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

  return (
    <div className="flex w-full flex-1 flex-col gap-6 pb-8">
      <header className="w-full">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account, platform configuration and integrations
        </p>
      </header>

      {/* ---------------- Profile — full width ---------------- */}
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

      {/* ---------------- Settings categories (tabs) ---------------- */}
      <Tabs defaultValue="platform" className="w-full">
        <TabsList className="h-auto w-full flex-wrap justify-start gap-1 sm:w-auto sm:rounded-lg">
          <TabsTrigger value="platform" className="gap-1.5">
            <ShieldAlert className="h-4 w-4" aria-hidden />
            Platform
          </TabsTrigger>
          <TabsTrigger value="client" className="gap-1.5">
            <Building2 className="h-4 w-4" aria-hidden />
            Client Details
          </TabsTrigger>
          <TabsTrigger value="judge" className="gap-1.5">
            <Zap className="h-4 w-4" aria-hidden />
            Code Judge
          </TabsTrigger>
          <TabsTrigger value="system" className="gap-1.5">
            <Layers className="h-4 w-4" aria-hidden />
            System
          </TabsTrigger>
        </TabsList>

        {/* Platform */}
        <TabsContent value="platform" className="mt-4">
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
              <PlatformSettings
                initial={platformSettings}
                initialCodes={{ student: studentCode, staff: staffCode }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Client details (branding) */}
        <TabsContent value="client" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-purple-600" aria-hidden />
                Client Details
              </CardTitle>
              <CardDescription>
                White-label identity shown on the login and register pages —
                changes apply instantly after saving
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ClientDetailsForm initial={branding} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Code judge */}
        <TabsContent value="judge" className="mt-4">
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
        </TabsContent>

        {/* AI + Lookups */}
        <TabsContent value="system" className="mt-4">
          <div className="grid gap-6 lg:grid-cols-2">
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
                  Batches &amp; Departments
                </CardTitle>
                <CardDescription>
                  Dynamic lookup lists used across registration forms, student/staff forms and table filters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LookupManager
                  initialBatches={lookups.batches}
                  initialDepartments={lookups.departments}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
