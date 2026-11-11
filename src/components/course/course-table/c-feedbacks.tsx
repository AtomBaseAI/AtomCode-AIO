import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
const CFeedbacks = ({ cid, count }: { cid: string; count?: number }) => {
    const router = useRouter()
    return (
        <>
            <TooltipProvider>
                <Tooltip >
                    <TooltipTrigger asChild>
                        <Button variant='outline' size='icon' className="relative border-lime-500/70 bg-transparent hover:bg-lime-700/10"
                            onClick={() => { router.push(`/admin/courses/${cid}/feedbacks`) }}>
                            <Star className="size-5 bg-transparent text-lime-500/70" />
                            {typeof count === "number" && (
                                <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-lime-600 px-1 text-[10px] font-semibold leading-none text-white">
                                    {count}
                                </span>
                            )}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side='top' className='bg-lime-500'>
                        <p className='z-50'>Feedbacks</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    )
}

export default CFeedbacks