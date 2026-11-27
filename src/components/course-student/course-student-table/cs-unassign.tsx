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
import { DeleteCourseStudentSchema } from '@/schemas/student-schema'
import { deletecoursestudent } from '@/actions/usercourse'
import { toast } from 'sonner'
import { ConfirmDeleteInput, isConfirmText } from '@/components/ui/confirm-delete'
import SmartDeleteCleanup from '@/components/ui/smart-delete-cleanup'

/** The typed phrase that enables the unassign button. */
const CONFIRM_UNASSIGN_PHRASE = "confirm unassign"

/**
 * Row-level "Unassign" action for the course students table. Removes the
 * student from the course (and wipes their progress in it) WITHOUT deleting
 * their account — replaces the old Delete button, which was misleading.
 */
const UnassignCourseStudent = ({ cid, uid }: { cid: string, uid: string }) => {
    const form = useForm<z.infer<typeof DeleteCourseStudentSchema>>({
        resolver: zodResolver(DeleteCourseStudentSchema),
        defaultValues: {
            uid: uid,
            cid: cid
        }
    })

    const [isLoading, startTransition] = useTransition()
    const [open, setOpen] = useState(false)
    const [error, setError] = useState<string | undefined>("")
    const [confirmText, setConfirmText] = useState("")
    const handleSubmit = (values: z.infer<typeof DeleteCourseStudentSchema>) => {
        setError("")
        if (!isConfirmText(confirmText, CONFIRM_UNASSIGN_PHRASE)) {
            setError("Type the confirmation phrase to enable unassign")
            return
        }
        startTransition(() => {
            deletecoursestudent(values.uid, values.cid)
                .then((data) => {
                    if (data.success) {
                        form.reset()
                        setOpen(false)
                        toast.success(data.success);
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
                        aria-label={`Unassign student ${uid} from this course`}
                        className="h-8 gap-1.5 border-amber-500/60 text-amber-600 hover:bg-amber-500/10 hover:text-amber-700"
                    >
                        <UserMinus className="size-4" />
                        Unassign
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Unassign Student</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        This will remove the student from this course and clear their
                        progress in it. The student&apos;s account will NOT be deleted.
                    </DialogDescription>
                    <div className="grid gap-6">
                        {/* Cleanup sections — run before the unassign */}
                        <SmartDeleteCleanup entity="course-student" id={uid} cid={cid} />

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)}>
                                <div className="grid gap-2">
                                    <div className="grid gap-1">
                                        <FormField
                                            control={form.control}
                                            name="uid"
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
                                    <p className="text-muted-foreground text-xs">
                                        Tip: unassigning also clears any records left behind automatically.
                                    </p>
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

export default UnassignCourseStudent
