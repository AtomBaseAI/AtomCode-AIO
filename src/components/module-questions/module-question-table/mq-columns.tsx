"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/data-tables/data-table-column-header"
import { textFilterFn } from "@/components/data-tables/topic-subtopic-filters"
import { ModuleQuestionTableQuestionType } from "@/schemas/module-schema"
import QuestionDeleteHelper from "@/components/module-questions/module-question-table/mq-deletehelper"
import MQPreview from "./preview/mq-preview"


export const columns: ColumnDef<ModuleQuestionTableQuestionType>[] = [

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
    accessorKey: "maxscore",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} name="Maximum Marks" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium ">
            {row.getValue("maxscore")}
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
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium ">
            {row.getValue("difficulty")}
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
      if (!qid) {
        return null
      }
      const question = row.original
      return (
        <div className="flex items-center">
          <span className="flex gap-2">
            <MQPreview question={question}/>
            <QuestionDeleteHelper qid={qid} />
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
