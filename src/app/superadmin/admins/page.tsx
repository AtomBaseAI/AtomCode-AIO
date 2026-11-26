import { z } from "zod"
import { AdminTableSchema } from "@/schemas/admin-manage-schema"
import { getAllAdmins } from "@/data/admins"
import { AdminDataTable } from "@/components/admin-manage/admin-table"
import AdminAddForm from "@/components/admin-manage/admin-add-form"
import { TopbarTitle } from "@/components/topbar-title"

async function fetchAdmins() {
  const admins = await getAllAdmins()
  return z.array(AdminTableSchema).parse(admins)
}

/**
 * Super-admin-only Admins management — same surface pattern as the Staffs
 * page: add button, searchable table, per-row edit / reset / delete.
 */
export default async function AdminsData() {
  const admins = await fetchAdmins()

  return (
    <>
      <TopbarTitle>Admins</TopbarTitle>
      <div className="flex h-full flex-1 flex-col space-y-2 p-4 md:p-8 w-full">
        <div className="flex flex-wrap items-center justify-between gap-2 space-y-2">
          <div>
            <p className="text-xl font-semibold tracking-tight text-muted-foreground">
              All Admins
            </p>
            <p className="text-sm text-muted-foreground">
              Admin accounts can sign in to the full admin panel. Only the super
              admin can create, edit or remove them.
            </p>
          </div>
          <div className="flex justify-center items-center gap-x-4">
            <AdminAddForm />
          </div>
        </div>
        <AdminDataTable data={admins} />
      </div>
    </>
  )
}
