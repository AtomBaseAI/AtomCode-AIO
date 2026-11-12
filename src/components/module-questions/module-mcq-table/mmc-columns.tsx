"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-tables/data-table-column-header"
import { textFilterFn } from "@/components/data-tables/topic-subtopic-filters"
import { MCQTableType } from "@/schemas/mcq-schema"
import RemoveModuleMCQ from "@/components/module-questions/module-mcq-table/mmc-remove"
import EditMCQForm from "@/components/mcq/mcq-edit-form"
import MCPreview from "@/components/mcq/mcq-table/preview/mc-preview"

/**
 * Columns for the module MCQ questions table (admin module → MCQ page).
 *
 * Row actions are Preview / Edit / Remove — "Remove" only detaches the MCQ
 * from this module; it never deletes the MCQ from the question bank.
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
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} name="Actions" />
    ),
    cell: ({ row }) => {
      const qid: string = row.getValue("id")
      const data: any = row.original
      if (!qid) {
        return null
      }

      return (
        <div className="flex items-center">
          <span className="flex gap-2">
            <MCPreview question={data} />
            <EditMCQForm mcq={data} />
            <RemoveModuleMCQ mcqId={qid} mid={data?.moduleId ?? ""} />
          </span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
]
