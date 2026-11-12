"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-tables/data-table-column-header"
import { CourseTableType } from "@/schemas/course-schema"
import { formatDate } from '@/lib/utils';
import CModules from "@/components/staff/course/course-table/c-modules"
import CStudents from "@/components/staff/course/course-table/c-students"
import CFeedbacks from "@/components/staff/course/course-table/c-feedbacks";
export const columns: ColumnDef<CourseTableType>[] = [

  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} name="Course" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate font-medium line-clamp-1">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "startdate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} name="Start Date" />
    ),
    cell: ({ row }) => {
      const startDate = new Date(row.getValue("startdate"))
      const formattedStartDate = formatDate(startDate);
      return (
        <div className="flex space-x-2">
          <span className="max-w-[80px] truncate font-medium ">
            {formattedStartDate}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "enddate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} name="End Date" />
    ),
    cell: ({ row }) => {
      const endDate = new Date(row.getValue("enddate"))
      const formattedEndtDate = formatDate(endDate);
      return (
        <div className="flex space-x-2">
          <span className="max-w-[80px] truncate font-medium ">
            {formattedEndtDate}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "language",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} name="Language" />
    ),
    cell: ({ row }) => {
      const lang: string = row.getValue("language")
      return (
        <div className="flex space-x-2">
          <span className="max-w-[80px] truncate font-medium ">
            {lang.toUpperCase()}
          </span>
        </div>
      )
    },
  },
  // Completion Order badge — same look as the admin courses table. This
  // column must exist because the shared course toolbar offers a faceted
  // filter via table.getColumn("completionOrder"); without it TanStack
  // logs "[Table] Column with id 'completionOrder' does not exist.".
  // daywise=violet · queue=emerald · openflow=orange
  {
    accessorKey: "completionOrder",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} name="Completion Order" />
    ),
    cell: ({ row }) => {
      const config: Record<string, { label: string; className: string }> = {
        daywise: { label: "Daywise", className: "border-violet-500/50 bg-violet-500/10 text-violet-600 dark:text-violet-400" },
        queue: { label: "Queue", className: "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
        openflow: { label: "Open Flow", className: "border-orange-500/50 bg-orange-500/10 text-orange-600 dark:text-orange-400" },
      }
      const value: string = row.getValue("completionOrder")
      const badge = config[value]
      return (
        <div className="flex space-x-2">
          {badge ? (
            <span className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${badge.className}`}>
              {badge.label}
            </span>
          ) : (
            <span className="max-w-[80px] truncate font-medium capitalize">{value}</span>
          )}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "modulescount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} name="Modules" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[50px] truncate font-medium ">
            {row.getValue("modulescount")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} name="Actions" />
    ),
    cell: ({ row }) => {
      const modulecount: number = row.getValue("modulescount")
      const cid: string = row.getValue("id")
      if (!cid) {
        return null
      }

      return (
        <div className="flex items-center">
          <span className="flex gap-2">
            <CModules cid={cid} />
            <CStudents cid={cid} />
            <CFeedbacks cid={cid} />
          </span>
        </div>
      )
    },
    enableSorting: false,
    // enableHiding: false,
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <div>{row.getValue("id")}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
]
