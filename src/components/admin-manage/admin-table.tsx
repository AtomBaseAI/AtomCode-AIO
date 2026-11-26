"use client"

import * as React from "react"
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState,
  flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
  getSortedRowModel, useReactTable } from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTablePagination } from "@/components/data-tables/data-table-pagination"
import { DataTableColumnHeader } from "@/components/data-tables/data-table-column-header"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Database, LoaderIcon, ShieldCheck, KeyRound, Trash2, Pencil, Search } from "lucide-react"
import { toast } from "sonner"
import { useState, useTransition } from "react"
import { AdminTableType, AdminUpdateSchema } from "@/schemas/admin-manage-schema"
import { deleteadmin, resetpasswordadminmanage, updateadmin } from "@/actions/admin-manage"
import { FormError } from "@/components/auth/form-error"

/* ------------------------------------------------------------------ */
/* Row action dialogs                                                  */
/* ------------------------------------------------------------------ */

function AdminEditDialog({
  admin,
  open,
  onOpenChange,
}: {
  admin: AdminTableType;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const form = useForm<z.infer<typeof AdminUpdateSchema>>({
    resolver: zodResolver(AdminUpdateSchema),
    values: { id: admin.id, name: admin.name ?? "", email: admin.email },
  })
  const [isLoading, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")

  const handleSubmit = (values: z.infer<typeof AdminUpdateSchema>) => {
    setError("")
    startTransition(() => {
      updateadmin(values)
        .then((data) => {
          if (data.success) {
            onOpenChange(false)
            toast.success(data.success)
          } else if (data.error) {
            setError(data.error)
          }
        })
        .catch(() => toast.error("Something went wrong!"))
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Admin</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} placeholder="atomadmin" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} type="email" placeholder="admin@atom.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <Button type="submit" disabled={isLoading}>
              {isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
              Save changes
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

function AdminDeleteDialog({
  admin,
  open,
  onOpenChange,
}: {
  admin: AdminTableType;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [code, setCode] = useState("")
  const [isLoading, startTransition] = useTransition()

  const handleDelete = () => {
    if (!/^\d{4}$/.test(code)) return
    startTransition(() => {
      deleteadmin({ id: admin.id, code })
        .then((data) => {
          if (data.success) {
            onOpenChange(false)
            toast.success(data.success)
          } else if (data.error) {
            toast.error(data.error)
          }
        })
        .catch(() => toast.error("Something went wrong!"))
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) setCode("")
        onOpenChange(o)
      }}
    >
      <DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-purple-600" aria-hidden />
            Smart delete admin
          </DialogTitle>
          <DialogDescription>
            Review what will be removed, then confirm with your 4-digit auth
            code. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          {/* Smart-delete impact summary */}
          <div className="grid gap-2 rounded-lg border p-3">
            <div className="flex min-w-0 items-start gap-2.5">
              <Database className="text-primary mt-0.5 size-4 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm leading-tight font-medium">Admin account</p>
                <p className="text-muted-foreground truncate text-xs">
                  {admin.email}
                  {admin.name ? ` (${admin.name})` : ""}
                </p>
              </div>
            </div>
            <div className="flex min-w-0 items-start gap-2.5">
              <KeyRound className="text-primary mt-0.5 size-4 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm leading-tight font-medium">Panel access</p>
                <p className="text-muted-foreground text-xs">
                  Revoked immediately — every admin session stops working
                </p>
              </div>
            </div>
            <div className="flex min-w-0 items-start gap-2.5">
              <Database className="text-primary mt-0.5 size-4 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm leading-tight font-medium">Related records</p>
                <p className="text-muted-foreground text-xs">
                  Admin accounts hold no linked data — nothing else to clean up
                </p>
              </div>
            </div>
          </div>

          {/* Second factor: the static super-admin auth code */}
          <div className="space-y-2">
            <span className="text-sm font-medium">
              Enter your 4-digit auth code to enable delete
            </span>
            <InputOTP
              maxLength={4}
              value={code}
              onChange={setCode}
              disabled={isLoading}
              aria-label="4-digit auth code to confirm deletion"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <span className="grid w-full grid-cols-2 gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="w-full" disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleDelete}
              disabled={isLoading || code.length !== 4}
            >
              {isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
              Delete admin
            </Button>
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function AdminResetDialog({
  admin,
  open,
  onOpenChange,
}: {
  admin: AdminTableType;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [isLoading, startReset] = useTransition()

  const handleReset = () => {
    startReset(() => {
      resetpasswordadminmanage({ id: admin.id })
        .then((data) => {
          if (data.success) {
            onOpenChange(false)
            toast.success(data.success)
          } else if (data.error) {
            toast.error(data.error)
          }
        })
        .catch(() => toast.error("Something went wrong!"))
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset admin password?</AlertDialogTitle>
          <AlertDialogDescription>
            The password for <span className="font-medium">{admin.email}</span> will be
            reset to the platform default <span className="font-mono">Admin@Atom</span>.
            Share it securely and ask the admin to change it after signing in.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleReset()
            }}
            disabled={isLoading}
          >
            {isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
            Reset password
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function AdminRowActions({ admin }: { admin: AdminTableType }) {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [resetOpen, setResetOpen] = useState(false)

  return (
    <>
      {/* Direct icon actions — same pattern as the staff table */}
      <div className="flex items-center">
        <span className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="border-primary bg-transparent hover:bg-purple-700/10"
            aria-label={`Edit admin ${admin.email}`}
            onClick={() => setEditOpen(true)}
          >
            <Pencil className="size-5 text-primary" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-amber-500/50 bg-transparent hover:bg-amber-500/10"
            aria-label={`Reset password for ${admin.email}`}
            onClick={() => setResetOpen(true)}
          >
            <KeyRound className="size-5 text-amber-600" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-destructive bg-transparent hover:bg-red-400/20"
            aria-label={`Delete admin ${admin.email}`}
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="size-5 text-destructive" />
          </Button>
        </span>
      </div>

      <AdminEditDialog admin={admin} open={editOpen} onOpenChange={setEditOpen} />
      <AdminResetDialog admin={admin} open={resetOpen} onOpenChange={setResetOpen} />
      <AdminDeleteDialog admin={admin} open={deleteOpen} onOpenChange={setDeleteOpen} />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Table                                                               */
/* ------------------------------------------------------------------ */

export const adminColumns: ColumnDef<AdminTableType>[] = [
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="max-w-[260px] truncate font-medium">{row.getValue("email")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="max-w-[220px] truncate">{row.getValue("name") || "—"}</span>
    ),
  },
  {
    id: "role",
    header: "Role",
    enableSorting: false,
    cell: () => (
      <span className="inline-flex items-center rounded-md border border-purple-600/30 bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400">
        Admin
      </span>
    ),
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} name="Actions" />
    ),
    enableSorting: false,
    cell: ({ row }) => <AdminRowActions admin={row.original} />,
  },
]

export function AdminDataTable({ data }: { data: AdminTableType[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = React.useState("")

  const table = useReactTable({
    data,
    columns: adminColumns,
    state: { sorting, columnFilters, columnVisibility, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => row.id,
  })

  return (
    <div className="space-y-4">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Input
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search admins by name or email..."
          className="pl-8"
          aria-label="Search admins"
        />
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getVisibleLeafColumns().length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
