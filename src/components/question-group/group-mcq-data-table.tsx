"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Code2, LoaderIcon, Trash } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import * as React from "react"
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

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    ConfirmDeleteInput,
    isConfirmDeleteText,
} from "@/components/ui/confirm-delete"
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
import { languages } from "@/components/question/question-table/q-config-data"
import { difficulties } from "@/components/question/question-table/q-config-data"
import { GroupMcqEditForm } from "@/components/question-group/group-mcq-edit-form"
import type { GroupMcqRow } from "@/schemas/group-mcq-schema"

const SNIPPET_FILTER_OPTIONS = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
]

const DIFFICULTY_FILTER_OPTIONS = difficulties.map((d) => ({
    label: d.label,
    value: d.value,
}))

/** Permanent-delete action with phrase confirmation, styled like the shared table actions. */
const DeleteMcqButton = ({
    groupId,
    mcqId,
    title,
}: {
    groupId: string
    mcqId: string
    title: string
}) => {
    const router = useRouter()
    const [open, setOpen] = React.useState(false)
    const [confirmText, setConfirmText] = React.useState("")
    const [isDeleting, setIsDeleting] = React.useState(false)

    const handleDelete = () => {
        if (!isConfirmDeleteText(confirmText)) return
        setIsDeleting(true)
        fetch(
            `/api/question-groups/${groupId}/mcq-questions?mcqId=${mcqId}`,
            { method: "DELETE" }
        )
            .then(async (res) => {
                const data = await res.json().catch(() => null)
                if (!res.ok) {
                    toast.error(data?.error ?? "Something went wrong!")
                    return
                }
                toast.success(`"${title}" permanently deleted`)
                setOpen(false)
                router.refresh()
            })
            .catch(() => toast.error("Network error — please try again."))
            .finally(() => setIsDeleting(false))
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(o) => {
                setConfirmText("")
                setOpen(o)
            }}
        >
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="border-destructive bg-transparent hover:bg-red-400/20"
                    aria-label={`Delete MCQ ${title}`}
                >
                    <Trash className="size-5 bg-transparent text-destructive" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete MCQ</DialogTitle>
                    <DialogDescription>
                        This permanently deletes &quot;{title}&quot;. This
                        action is irreversible — are you sure?
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-3">
                    <ConfirmDeleteInput
                        value={confirmText}
                        onValueChange={setConfirmText}
                    />
                    <span className="grid w-full grid-cols-2 gap-2">
                        <DialogClose asChild>
                            <Button className="w-full">Cancel</Button>
                        </DialogClose>
                        <Button
                            variant="destructive"
                            className="w-full"
                            disabled={isDeleting || !isConfirmDeleteText(confirmText)}
                            onClick={handleDelete}
                        >
                            {isDeleting && (
                                <LoaderIcon className="mr-2 size-4 animate-spin" />
                            )}
                            Delete
                        </Button>
                    </span>
                </div>
            </DialogContent>
        </Dialog>
    )
}

/** Columns for the MCQs that live inside a question group. */
export const getGroupMcqColumns = (
    groupId: string
): ColumnDef<GroupMcqRow>[] => [
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
        accessorKey: "difficulty",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} name="Difficulty" />
        ),
        cell: ({ row }) => {
            const difficulty = difficulties.find(
                (difficulty) => difficulty.value === row.getValue("difficulty")
            )

            if (!difficulty) {
                return <span className="text-muted-foreground">—</span>
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
        id: "iscodesnippet",
        accessorFn: (row) => (row.iscodesnippet ? "yes" : "no"),
        header: ({ column }) => (
            <DataTableColumnHeader column={column} name="Code Snippet" />
        ),
        cell: ({ row }) => {
            const mcq = row.original
            if (!mcq.iscodesnippet) {
                return <span className="text-muted-foreground">—</span>
            }
            const langLabel = mcq.snippetLang
                ? (languages.find((l) => l.value === mcq.snippetLang)?.label ??
                  mcq.snippetLang)
                : "Snippet"
            return (
                <Badge variant="outline" className="gap-1.5">
                    <Code2 className="size-3.5" />
                    {langLabel}
                </Badge>
            )
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
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
            const mcq = row.original
            if (!mcq.id) {
                return null
            }

            return (
                <div className="flex items-center">
                    <span className="flex gap-2">
                        <GroupMcqEditForm groupId={groupId} mcq={mcq} />
                        <DeleteMcqButton
                            groupId={groupId}
                            mcqId={mcq.id}
                            title={mcq.title}
                        />
                    </span>
                </div>
            )
        },
        enableSorting: false,
    },
]

interface GroupMcqDataTableProps {
    groupId: string
    data: GroupMcqRow[]
}

/**
 * MCQs that live inside a question group, on
 * /admin/questions-groups/[gid]/mcq-questions. Follows the shared data-table
 * pattern used across the admin app (faceted filters, view options,
 * sortable headers, pagination).
 */
export function GroupMcqDataTable({ groupId, data }: GroupMcqDataTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = React.useState({})

    const columns = React.useMemo(
        () => getGroupMcqColumns(groupId),
        [groupId]
    )

    const allColumns = React.useMemo<ColumnDef<GroupMcqRow>[]>(
        () => [makeSelectColumn<GroupMcqRow>(), ...columns],
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
                        placeholder="Filter MCQs"
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
                    {table.getColumn("iscodesnippet") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("iscodesnippet")}
                            title="Snippet"
                            options={SNIPPET_FILTER_OPTIONS}
                        />
                    )}
                    <TopicSubtopicFilters table={table} />
                    {table.getColumn("difficulty") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("difficulty")}
                            title="Difficulty"
                            options={DIFFICULTY_FILTER_OPTIONS}
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
                    action={async (ids) => {
                        const res = await fetch(
                            `/api/question-groups/${groupId}/mcq-questions`,
                            {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ mcqIds: ids }),
                            }
                        )
                        const data = await res.json().catch(() => ({}))
                        if (!res.ok)
                            return {
                                error:
                                    (data as { error?: string }).error ??
                                    "Failed to delete MCQs.",
                            }
                        return {
                            success:
                                (data as { success?: string }).success ??
                                "MCQ(s) permanently deleted.",
                            skipped: (data as { skipped?: number }).skipped,
                        }
                    }}
                    label="Delete MCQs"
                    dialogTitle="Delete selected MCQs"
                    dialogDescription="This permanently deletes the selected MCQs, including all their options and metadata. This action cannot be undone."
                    requirePhrase
                />
            </BulkActionBar>
        </div>
    )
}

export default GroupMcqDataTable
