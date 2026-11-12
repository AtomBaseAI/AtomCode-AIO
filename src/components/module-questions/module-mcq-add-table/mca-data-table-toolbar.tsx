"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/data-tables/data-table-view-options"
import { TopicSubtopicFilters } from "@/components/data-tables/topic-subtopic-filters"
import { addmodulemcqs } from "@/actions/module"
import { useState } from "react"
import { LoaderIcon } from "lucide-react"
import { toast } from "sonner"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  mid: string
}

/**
 * Toolbar for the module "Add MCQ" picker — filters the pool of unassigned
 * MCQs and attaches every selected row to the module via addmodulemcqs.
 */
export function MCADataTableToolbar<TData>({
  table,
  mid
}: DataTableToolbarProps<TData>) {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const isFiltered = table.getState().columnFilters.length > 0;
  const selectedRowCount = table.getSelectedRowModel().rows.length;

  const addSelectedMcqs = async () => {
    setLoading(true);
    try {
      const idfielddata = table.getGroupedSelectedRowModel().rowsById;
      const mcqIds = Object.values(idfielddata).map(item => (item.original as { id: string }).id);
      const result = await addmodulemcqs(mid, mcqIds);
      if (result.error) {
        toast.error(result.error)
      }
      if (result.success) {
        table.resetRowSelection();
        toast.success(result.success)
        if (typeof result.skipped === "number" && result.skipped > 0) {
          toast.info(
            `${result.skipped} MCQ(s) skipped — they are already assigned to another module.`
          )
        }
        // Refresh the server component so the just-added MCQs leave the pool.
        router.refresh()
      }
    } catch (error) {
      console.error("Error adding MCQs to module:", error);
      toast.error(`Error ${error}`)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Filter MCQs"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <TopicSubtopicFilters table={table} />
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
        <Button
          className="bg-green-500 hover:bg-green-600"
          onClick={addSelectedMcqs}
          disabled={loading || selectedRowCount === 0}
        >
          {loading ? (
            <LoaderIcon className="h-4 w-4 animate-spin" />
          ) : (
            "Add"
          )}
        </Button>

      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
