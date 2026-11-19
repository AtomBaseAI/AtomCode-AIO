import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  KeyRound,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminProfileForm } from "@/components/settings/admin-profile-form";
import AdminPassword from "@/components/settings/admin-password";
import { AuthCodeForm } from "@/components/admin-manage/authcode-form";
import { getSuperAdminAuthCode } from "@/lib/superadmin-settings";
import { TopbarTitle } from "@/components/topbar-title";

/**
 * Super admin settings — auth code management, own profile and password.
 * Route is proxy-guarded to role "superadmin"; the layout re-checks too.
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

  const authCode = await getSuperAdminAuthCode();

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-6 p-4 pb-8 md:p-8">
      <TopbarTitle>Super Admin</TopbarTitle>

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
      <Tabs defaultValue="security" className="w-full">
        <TabsList className="h-auto w-full flex-wrap justify-start gap-1 sm:w-auto sm:rounded-lg">
          <TabsTrigger value="security" className="gap-1.5">
            <KeyRound className="h-4 w-4" aria-hidden />
            Security
          </TabsTrigger>
          <TabsTrigger value="admins" className="gap-1.5">
            <UserCog className="h-4 w-4" aria-hidden />
            Admins
          </TabsTrigger>
        </TabsList>

        <TabsContent value="security" className="mt-4">
          <AuthCodeForm currentCode={authCode} />
        </TabsContent>

        <TabsContent value="admins" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">Admin account management</h2>
                <p className="text-sm text-muted-foreground">
                  Create, edit, reset or remove admin accounts from the
                  dedicated page — including their sidebar shortcut below.
                </p>
                <div>
                  <a
                    href="/superadmin/admins"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:underline dark:text-purple-400"
                  >
                    <UserCog className="h-4 w-4" aria-hidden />
                    Open Admins management
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
