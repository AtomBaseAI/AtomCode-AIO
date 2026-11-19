"use client"

import * as React from "react"

import { CourseDataTable } from "@/components/course/course-table/c-data-table"
import { getCourseColumns } from "@/components/course/course-table/c-columns"
import type { CourseTableType } from "@/schemas/course-schema"

interface AdminCourseTableProps {
  data: CourseTableType[]
  /**
   * Super-admin-only: true renders the per-row course export dialog.
   * The columns are built client-side because a server page cannot call
   * a factory exported from a "use client" module directly.
   */
  canExport: boolean
}

/**
 * Client wrapper around CourseDataTable for the admin /admin/courses page.
 * Builds the course columns from the canExport flag (super admin only)
 * before handing them to the shared table component.
 */
export function AdminCourseTable({ data, canExport }: AdminCourseTableProps) {
  const columns = React.useMemo(() => getCourseColumns(canExport), [canExport])
  return <CourseDataTable data={data} columns={columns} />
}

export default AdminCourseTable
