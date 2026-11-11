import { Button } from '@/components/ui/button'
import { Hexagon, ShipWheel, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
const CStaffs = ({ cid, count }: { cid: string; count?: number }) => {
    const router = useRouter()
    return (
        <>

            <TooltipProvider>
                <Tooltip >
                    <TooltipTrigger asChild>
                        <Button variant='outline' size='icon' className="relative border-blue-500 bg-transparent hover:bg-blue-700/10" onClick={() => { router.push(`/admin/courses/${cid}/staffs`) }}>
                            <ShipWheel className="size-5 bg-transparent text-blue-500" />
                            {typeof count === "number" && (
                                <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-500 px-1 text-[10px] font-semibold leading-none text-white">
                                    {count}
                                </span>
                            )}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side='top' className='bg-blue-500'>
                        <p className='z-50'>Staffs</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

        </>
    )
}

export default CStaffs