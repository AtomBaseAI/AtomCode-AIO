import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Link2Off, LoaderIcon } from 'lucide-react'
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
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"

import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { RemoveModuleMCQSchema } from '@/schemas/module-schema'
import { removemodulemcq } from '@/actions/module'
import { toast } from 'sonner'

/**
 * Row-level "Remove" action for the module MCQ table.
 *
 * Detaches the MCQ from the module (clears the moduleId FK) — the MCQ itself
 * stays in the question bank and can be re-added later, so it is
 * intentionally NOT styled/worded as a destructive delete.
 */
const RemoveModuleMCQ = ({ mcqId, mid }: { mcqId: string, mid: string }) => {

    const form = useForm<z.infer<typeof RemoveModuleMCQSchema>>({
        resolver: zodResolver(RemoveModuleMCQSchema),
        defaultValues: {
            id: mcqId,
            mid: mid
        }
    })

    const router = useRouter()
    const [isLoading, startTransition] = useTransition()
    const [open, setOpen] = useState(false)

    const handleSubmit = (values: z.infer<typeof RemoveModuleMCQSchema>) => {
        startTransition(() => {
            removemodulemcq(values.id, values.mid)
                .then((data) => {
                    if (data.error) {
                        toast.error(data.error)
                    }
                    if (data.success) {
                        form.reset()
                        setOpen(false)
                        toast.success(data.success)
                        router.refresh()
                    }
                })
                .catch(() => toast.error("Something went wrong!"))
        })
    }

    return (
        <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
            <DialogTrigger asChild>
                <Button
                    variant='outline'
                    size='icon'
                    title="Remove from module"
                    className="border-amber-500/70 bg-transparent hover:bg-amber-500/15"
                >
                    <Link2Off className="size-5 bg-transparent text-amber-500" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Remove MCQ from Module</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    This will detach the MCQ from this module. The MCQ itself
                    stays in the question bank and can be added back at any time.
                </DialogDescription>
                <div className="grid gap-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)}>
                            <div className="grid gap-2">
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="hidden"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="mid"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="hidden"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <span className='grid w-full grid-cols-2 gap-2'>
                                    <DialogClose asChild>
                                        <Button variant='outline' className='w-full'>
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button disabled={isLoading} className='w-full'>
                                        {isLoading && (
                                            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Remove
                                    </Button>
                                </span>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RemoveModuleMCQ
