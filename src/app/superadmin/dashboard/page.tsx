import { AdminDashboard } from "@/components/dashboard/admin-dashboard";

/**
 * Super admin home — the complete admin dashboard (same stats and charts)
 * because the super admin role contains all current admin panel options.
 */
export default function SuperAdminDashboardPage() {
  return <AdminDashboard />;
}
