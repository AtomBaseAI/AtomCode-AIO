import { auth } from "@/auth";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import AdminPassword from "@/components/settings/admin-password";
import { AdminProfileForm } from "@/components/settings/admin-profile-form";
import { TopbarTitle } from "@/components/topbar-title";

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

  return (
    // Same content-span spacing rule as /admin/questions-groups:
    // p-4 (mobile) / md:p-8 (desktop) top + left padding, full-width column.
    <div className="flex h-full w-full flex-1 flex-col gap-6 p-4 pb-8 md:p-8">
      <TopbarTitle>Settings</TopbarTitle>

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
    </div>
  );
};

export default Settings;
