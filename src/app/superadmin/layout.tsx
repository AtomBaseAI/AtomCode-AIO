import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";
import React from "react";

/**
 * Super admin shell — same chrome as the admin panel (the super admin sees
 * every admin option) plus the super-admin-only sidebar entries. The proxy
 * already restricts /superadmin/* to role "superadmin"; this layout
 * re-checks server side as defense in depth.
 */
export default async function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user || role !== "superadmin") {
    redirect("/login");
  }

  return (
    <main className="flex min-h-svh w-full flex-row">
      <Sidebar role={role} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar name={session?.user?.name as string} email={session?.user?.email as string} image={session?.user?.image as string} />
        <div className="flex w-full flex-1 flex-col items-center p-4">
          {children}
        </div>
      </div>
    </main>
  )
}
