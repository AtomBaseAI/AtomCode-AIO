"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Cross2Icon } from "@radix-ui/react-icons"

import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DataTableColumnHeader } from "@/components/data-tables/data-table-column-header"
import { DataTablePagination } from "@/components/data-tables/data-table-pagination"
import { DataTableViewOptions } from "@/components/data-tables/data-table-view-options"
import { DataTableFacetedFilter } from "@/components/data-tables/data-table-faceted-filter"
import {
    TopicSubtopicFilters,
    textFilterFn,
} from "@/components/data-tables/topic-subtopic-filters"
import { makeSelectColumn } from "@/components/data-tables/select-column"
import { BulkActionBar } from "@/components/data-tables/bulk-action-bar"
import { BulkActionButton } from "@/components/data-tables/bulk-action-button"
import { difficulties, languages } from "@/components/question/question-table/q-config-data"
import QEdit from "@/components/question/question-table/q-edit"
import DeleteQuestion from "@/components/question/question-table/q-delete"
import { deletequestionsbulk } from "@/actions/question"
import type { GroupQuestionRow } from "@/schemas/question-group-schema"

/** Columns for the questions that live inside a question group. */
export const getGroupQuestionColumns = (): ColumnDef<GroupQuestionRow>[] => [
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} name="Question" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[350px] truncate font-medium ">
                        {row.getValue("title")}
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: "lang",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} name="Language" />
        ),
        cell: ({ row }) => {
            const language = languages.find(
                (language) => language.value === row.getValue("lang")
            )

            if (!language) {
                return null
            }

            return (
                <div className="flex items-center">
                    {language.icon && (
                        <language.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{language.label}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
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
        accessorKey: "difficulty",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} name="Difficulty" />
        ),
        cell: ({ row }) => {
            const difficulty = difficulties.find(
                (difficulty) => difficulty.value === row.getValue("difficulty")
            )

            if (!difficulty) {
                return null
            }

            return (
                <div className="flex w-[130px] items-center">
                    {difficulty.icon && (
                        <difficulty.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{difficulty.label}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} name="Actions" />
        ),
        cell: ({ row }) => {
            const qst = row.original
            if (!qst.id) {
                return null
            }

            return (
                <div className="flex items-center">
                    <span className="flex gap-2">
                        <QEdit qid={qst.id} />
                        <DeleteQuestion qid={qst.id} />
                    </span>
                </div>
            )
        },
        enableSorting: false,
    },
]

interface GroupQuestionsDataTableProps {
    data: GroupQuestionRow[]
}

/**
 * Questions that live inside a question group, on
 * /admin/questions-groups/[gid]/code-questions. Follows the shared data-table
 * pattern used across the admin app (faceted filters, view options,
 * sortable headers, pagination).
 */
export function GroupQuestionsDataTable({
    data,
}: GroupQuestionsDataTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = React.useState({})

    const columns = React.useMemo(
        () => getGroupQuestionColumns(),
        []
    )

    const allColumns = React.useMemo<ColumnDef<GroupQuestionRow>[]>(
        () => [makeSelectColumn<GroupQuestionRow>(), ...columns],
        [columns]
    )

    const table = useReactTable({
        data,
        columns: allColumns,
        state: {
            sorting,
            columnVisibility,
            columnFilters,
            rowSelection,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getRowId: (row) => String((row as { id?: string }).id ?? ""),
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-1 flex-wrap items-center gap-2">
                    <Input
                        placeholder="Filter Questions"
                        value={
                            (table.getColumn("title")?.getFilterValue() as string) ??
                            ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn("title")
                                ?.setFilterValue(event.target.value)
                        }
                        className="h-8 w-[150px] lg:w-[250px]"
                    />
                    {table.getColumn("lang") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("lang")}
                            title="Languages"
                            options={languages}
                        />
                    )}
                    <TopicSubtopicFilters table={table} />
                    {table.getColumn("difficulty") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("difficulty")}
                            title="Difficulty"
                            options={difficulties}
                        />
                    )}
                    {isFiltered && (
                        <Button
                            variant="ghost"
                            onClick={() => table.resetColumnFilters()}
                            className="h-8 px-2 lg:px-3"
                        >
                            Reset
                            <Cross2Icon className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
                <DataTableViewOptions table={table} />
            </div>
            <div className="rounded-md border overflow-x-auto">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={table.getVisibleLeafColumns().length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
            <BulkActionBar table={table}>
                <BulkActionButton
                    table={table}
                    action={deletequestionsbulk}
                    label="Delete questions"
                    dialogTitle="Delete selected questions"
                    dialogDescription="This permanently deletes the selected questions from the question bank, including their submission data. This action cannot be undone."
                    requirePhrase
                />
            </BulkActionBar>
        </div>
    )
}

export default GroupQuestionsDataTable
