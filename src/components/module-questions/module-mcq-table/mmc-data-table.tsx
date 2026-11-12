"use client"

import * as React from "react"
import {
  ColumnDef,
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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "@/components/data-tables/data-table-pagination"
import { MCQDataTableToolbar } from "@/components/mcq/mcq-table/mc-data-table-toolbar"
import { makeSelectColumn } from "@/components/data-tables/select-column"
import { BulkActionBar } from "@/components/data-tables/bulk-action-bar"
import { BulkActionButton } from "@/components/data-tables/bulk-action-button"
import { ExportSelectedCsvButton } from "@/components/data-tables/export-selected-csv"
import { removemodulemcqsbulk } from "@/actions/module"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  mid: string
}

/**
 * Data table for the MCQs attached to a module (admin module → MCQ page).
 *
 * Bulk action is "Remove from module": it only detaches the selected MCQs
 * (clears moduleId) — the MCQs stay in the question bank. This is NOT the
 * destructive `deletemcqbulk` used by the question-bank tables.
 */
export function ModuleMCQDataTable<TData, TValue>({
  columns,
  data,
  mid
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const allColumns = React.useMemo(
    () =>
      [
        makeSelectColumn<TData>() as ColumnDef<TData, TValue>,
        ...columns,
      ] as ColumnDef<TData, TValue>[],
    [columns]
  )

  const table = useReactTable({
    data,
    columns: allColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
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

  return (
    <div className="space-y-4">
      <MCQDataTableToolbar table={table} />
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
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
                  data-state={row.getIsSelected() && "selected"}
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
          action={(ids) => removemodulemcqsbulk(mid, ids)}
          label="Remove from module"
          dialogTitle="Remove selected MCQs from the module"
          dialogDescription="The MCQs stay in the question bank; they are only detached from this module and can be added back later."
        />
        <ExportSelectedCsvButton
          table={table}
          filename="module-mcqs"
          columns={[
            { key: "id", label: "ID" },
            { key: "title", label: "Question" },
            { key: "description", label: "Description" },
            { key: "difficulty", label: "Difficulty" },
            { key: "topic", label: "Topic" },
            { key: "subtopic", label: "Subtopic" },
            { key: "Option1", label: "Option 1" },
            { key: "Option2", label: "Option 2" },
            { key: "Option3", label: "Option 3" },
            { key: "Option4", label: "Option 4" },
            { key: "CorrectOption", label: "Correct Option" },
          ]}
        />
      </BulkActionBar>
    </div>
  )
}
