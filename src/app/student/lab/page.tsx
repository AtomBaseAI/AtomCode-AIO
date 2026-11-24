import { Laptop } from "lucide-react"
import { TopbarTitle } from "@/components/topbar-title"

const Lab = () => {
  return (
    // Same content-span spacing rule as the admin panel: p-4 / md:p-8 from
    // the top bar and sidebar, full-width column.
    <div className="flex h-full w-full flex-1 flex-col gap-6 p-4 pb-8 md:p-8">
      <TopbarTitle>Labs</TopbarTitle>
      <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-10 text-center">
        <Laptop className="size-8 text-muted-foreground" />
        <p className="text-muted-foreground">No labs enrolled.</p>
      </div>
    </div>
  )
}

export default Lab
