
import { z } from "zod"

// import { columns } from "@/components/student/student-table/s-columns"
import AddStaff from "@/components/staff/staff-add-form"
import { StaffImportExportMenu } from "@/components/staff/staff-import-export-menu"
import { getAllStaffs } from "@/data/staffs"
import { StaffTableSchema } from "@/schemas/staff-schema"
import { StaffDataTable } from "@/components/staff/staff-table/stf-data-table"
import { columns } from "@/components/staff/staff-table/stf-columns"
import { TopbarTitle } from "@/components/topbar-title"

async function fetchStaffs() {
  const staffs = await getAllStaffs()
  return z.array(StaffTableSchema).parse(staffs)
}

export default async function StaffsData() {
  const staffs = await fetchStaffs()

  return (
    <>
      <TopbarTitle>Staffs</TopbarTitle>
      <div className="flex h-full flex-1 flex-col space-y-2 p-4 md:p-8 w-full">
        <div className="flex flex-wrap items-center justify-between gap-2 space-y-2">
          <div>
            <p className="text-xl font-semibold tracking-tight text-muted-foreground">
              All Staffs
            </p>
          </div>
          <div className="flex justify-center items-center gap-x-4">
            <StaffImportExportMenu />
            <AddStaff />
          </div>
        </div>
        <StaffDataTable data={staffs} columns={columns} />
      </div>
    </>
  )
}