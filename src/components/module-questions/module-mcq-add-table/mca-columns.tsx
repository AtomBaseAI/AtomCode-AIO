"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-tables/data-table-column-header"
import { textFilterFn } from "@/components/data-tables/topic-subtopic-filters"
import { MCQTableType } from "@/schemas/mcq-schema"

/**
 * Columns for the module "Add MCQ" picker table — lists unassigned MCQs
 * from the question bank. Selection + the toolbar's Add button handle the
 * actual attach, so no row actions here.
 */
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
      <DataTableColumnHeader column={column} name="CorrectOption" />
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
    accessorKey: "difficulty",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} name="Difficulty" />
    ),
    cell: ({ row }) => {
      const difficulty: string | null = row.getValue("difficulty")
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium capitalize ">
            {difficulty ? difficulty : "Not Available"}
          </span>
        </div>
      )
    },
    filterFn: textFilterFn,
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
]
