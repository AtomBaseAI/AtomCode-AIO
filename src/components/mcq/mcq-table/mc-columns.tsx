"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-tables/data-table-column-header"
import { textFilterFn } from "@/components/data-tables/topic-subtopic-filters"
import { MCQTableType } from "@/schemas/mcq-schema"
import DeleteMCQ from "@/components/mcq/mcq-table/mc-delete"
import EditMCQForm from "@/components/mcq/mcq-edit-form"
import MCPreview from "./preview/mc-preview"


export const columns: ColumnDef<MCQTableType>[] = [

  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} name="Question" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium ">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "CorrectOption",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} name="Correct Option" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium ">
            {row.getValue("CorrectOption")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "topic",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} name="Topic" />
    ),
    cell: ({ row }) => {
      const topic: string | null = row.getValue("topic")
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium ">
            {topic ? topic : "Not Available"}
          </span>
        </div>
      )
    },
    filterFn: textFilterFn,
  },
  {
    accessorKey: "subtopic",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} name="Sub Topic" />
    ),
    cell: ({ row }) => {
      const subtopic: string | null = row.getValue("subtopic")
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium ">
            {subtopic ? subtopic : "Not Available"}
          </span>
        </div>
      )
    },
    filterFn: textFilterFn,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} name="Actions" />
    ),
    cell: ({ row }) => {
      const qid: string = row.getValue("id")
      const data: any = row.original
      // console.log(data)
      if (!qid) {
        return null
      }

      return (
        <div className="flex items-center">
          <span className="flex gap-2">
            <MCPreview question={data} />
            <EditMCQForm mcq={data} />
            <DeleteMCQ mcqId={qid} />
          </span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <div>{row.getValue("id")}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
]
