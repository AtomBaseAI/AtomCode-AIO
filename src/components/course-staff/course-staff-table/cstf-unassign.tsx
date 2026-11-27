import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { LoaderIcon, UserMinus } from 'lucide-react'
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
import { FormError } from '@/components/auth/form-error'
import { toast } from 'sonner'
import { DeleteCourseStaffSchema } from '@/schemas/staff-schema'
import { deletecoursestaff } from '@/actions/staffcourse'
import { ConfirmDeleteInput, isConfirmText } from '@/components/ui/confirm-delete'

/** The typed phrase that enables the unassign button. */
const CONFIRM_UNASSIGN_PHRASE = "confirm unassign"

/**
 * Row-level "Unassign" action for the course staffs table. Removes the staff
 * member from the course WITHOUT deleting their account — replaces the old
 * Delete button, which was misleading.
 */
const UnassignCourseStaff = ({ cid, uid }: { cid: string, uid: string }) => {
    const form = useForm<z.infer<typeof DeleteCourseStaffSchema>>({
        resolver: zodResolver(DeleteCourseStaffSchema),
        defaultValues: {
            sid: uid,
            cid: cid
        }
    })

    const [isLoading, startTransition] = useTransition()
    const [open, setOpen] = useState(false)
    const [error, setError] = useState<string | undefined>("")
    const [confirmText, setConfirmText] = useState("")
    const handleSubmit = (values: z.infer<typeof DeleteCourseStaffSchema>) => {
        setError("")
        if (!isConfirmText(confirmText, CONFIRM_UNASSIGN_PHRASE)) {
            setError("Type the confirmation phrase to enable unassign")
            return
        }
        startTransition(() => {
            deletecoursestaff(values.sid, values.cid)
                .then((data) => {
                    if (data.success) {
                        form.reset()
                        setOpen(false)
                        toast.success(data.success);
                    } else if (data.error) {
                        setError(data.error)
                    }
                })
                .catch(() => toast.error("Something went wrong!"));
        })
    }
    return (
        <>
            <Dialog open={open} onOpenChange={(o) => { setConfirmText(""); setOpen(o) }} >
                <DialogTrigger asChild>
                    <Button
                        variant='outline'
                        size='sm'
                        aria-label={`Unassign staff ${uid} from this course`}
                        className="h-8 gap-1.5 border-amber-500/60 text-amber-600 hover:bg-amber-500/10 hover:text-amber-700"
                    >
                        <UserMinus className="size-4" />
                        Unassign
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Unassign Staff</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        This will remove the staff member from this course. Their
                        account will NOT be deleted.
                    </DialogDescription>
                    <div className="grid gap-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)}>
                                <div className="grid gap-2">
                                    <div className="grid gap-1">
                                        <FormField
                                            control={form.control}
                                            name="sid"
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
                                            name="cid"
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

                                    <FormError message={error} />
                                    <ConfirmDeleteInput
                                        value={confirmText}
                                        onValueChange={setConfirmText}
                                        phrase={CONFIRM_UNASSIGN_PHRASE}
                                        actionLabel="unassign"
                                    />
                                    <span className='grid w-full grid-cols-2 gap-2'>
                                        <DialogClose asChild>
                                            <Button variant='outline' className='w-full'>
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button disabled={isLoading || !isConfirmText(confirmText, CONFIRM_UNASSIGN_PHRASE)} variant='destructive' className='w-full'>
                                            {isLoading && (
                                                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            Unassign
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

export default UnassignCourseStaff
