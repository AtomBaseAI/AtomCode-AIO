import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  BadgeCheck,
  Bot,
  Building2,
  CircleOff,
  KeyRound,
  Layers,
  ShieldAlert,
  ShieldCheck,
  UserCog,
  Zap,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminProfileForm } from "@/components/settings/admin-profile-form";
import AdminPassword from "@/components/settings/admin-password";
import { ClientDetailsForm } from "@/components/settings/client-details-form";
import { PlatformSettings } from "@/components/settings/platform-settings";
import { JudgeStatus } from "@/components/settings/judge-status";
import { LookupManager } from "@/components/settings/lookup-manager";
import { AuthCodeForm } from "@/components/admin-manage/authcode-form";
import {
  getPlatformSettings,
  getRegistrationCode,
} from "@/lib/platform-settings";
import { getSuperAdminAuthCode } from "@/lib/superadmin-settings";
import { getBrandingSettings } from "@/lib/branding-settings";
import { getLookups } from "@/lib/lookup";
import { TopbarTitle } from "@/components/topbar-title";

/**
 * Super admin settings — the super admin's OWN settings surface.
 *
 * With /admin/* being admins-only (URL separation), every platform-wide
 * control lives here now: Platform (maintenance + self-registration
 * toggles with their access codes), Client Details (branding), Code
 * Judge status, System (ATOM AI + lookups), Security (auth code) and a
 * shortcut to Admin management. Route is proxy-guarded to role
 * "superadmin"; the layout re-checks too.
 */
export default async function SuperAdminSettingsPage() {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user || role !== "superadmin") {
    redirect("/login");
  }

  const admin = {
    id: session.user.id,
    name: session.user.name ?? "Super Admin",
    email: session.user.email ?? "",
  };

  const [platformSettings, branding, studentCode, staffCode, lookups, authCode] =
    await Promise.all([
      getPlatformSettings(),
      getBrandingSettings(),
      getRegistrationCode("student"),
      getRegistrationCode("staff"),
      getLookups(),
      getSuperAdminAuthCode(),
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
    <div className="flex h-full w-full flex-1 flex-col gap-6 p-4 pb-8 md:p-8">
      <TopbarTitle>Super Admin Settings</TopbarTitle>

      {/* ---------------- Profile — full width ---------------- */}
      <Card>
        <div className="h-20 w-full rounded-t-lg bg-gradient-to-r from-purple-600 via-fuchsia-600 to-rose-600" />
        <CardContent className="pb-6">
          <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-purple-600 text-white shadow-lg dark:border-card">
              <ShieldCheck className="h-9 w-9" aria-hidden />
            </div>
            <div className="flex-1 sm:pb-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{admin.name}</h2>
                <span className="inline-flex items-center rounded-full border border-purple-600/30 bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400">
                  Super Admin
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{admin.email}</p>
            </div>
            <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:flex-shrink-0">
              <AdminProfileForm id={admin.id} name={admin.name} email={admin.email} />
              <AdminPassword uid={admin.id} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ---------------- Settings tabs ---------------- */}
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
          <TabsTrigger value="security" className="gap-1.5">
            <KeyRound className="h-4 w-4" aria-hidden />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Platform — maintenance mode + self-registration switches */}
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

        {/* Security — super admin auth code + admin management shortcut */}
        <TabsContent value="security" className="mt-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <AuthCodeForm currentCode={authCode} />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCog className="h-5 w-5 text-purple-600" aria-hidden />
                  Admin account management
                </CardTitle>
                <CardDescription>
                  Create, edit, reset or remove admin accounts from the
                  dedicated management page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href="/superadmin/admins"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:underline dark:text-purple-400"
                >
                  <UserCog className="h-4 w-4" aria-hidden />
                  Open Admins management
                </a>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
