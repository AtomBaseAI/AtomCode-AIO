import *as z from 'zod'
import { Button } from '@/components/ui/button'
import { Link2Off, LoaderIcon } from 'lucide-react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
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
import { useParams } from 'next/navigation'
import { DeleteModuleQuestionSchema } from '@/schemas/module-schema'
import { removemodulequestion } from '@/actions/module'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

/**
 * Row-level "Remove" action for the module code-questions table.
 *
 * This only detaches the question from the module (many-to-many disconnect):
 * the question itself stays in the question bank and can be re-added later,
 * so it is intentionally NOT styled/worded as a destructive delete.
 */
const RemoveModuleQuestion = ({ qid, mid }: { qid: string, mid: string }) => {

    const form = useForm<z.infer<typeof DeleteModuleQuestionSchema>>({
        resolver: zodResolver(DeleteModuleQuestionSchema),
        defaultValues: {
            id: qid,
            mid: mid
        }
    })

    const router = useRouter()
    const [isLoading, startTransition] = useTransition()
    const [open, setOpen] = useState(false)
    const handleSubmit = (values: z.infer<typeof DeleteModuleQuestionSchema>) => {
        startTransition(() => {
            removemodulequestion(values.id, values.mid)
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
                .catch(() => toast.error("Something went wrong!"));
        })
    }
    return (
        <>

            <Dialog open={open} onOpenChange={(o) => setOpen(o)} >
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
                        <DialogTitle>Remove Question from Module</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        This will detach the question from this module. The question
                        itself stays in the question bank and can be added back at
                        any time.
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
        </>
    )
}

export default RemoveModuleQuestion
