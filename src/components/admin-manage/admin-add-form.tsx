"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, LoaderIcon } from "lucide-react"
import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormError } from "@/components/auth/form-error"
import { toast } from "sonner"
import { AddAdminSchema } from "@/schemas/admin-manage-schema"
import { addadmin } from "@/actions/admin-manage"

const AdminAddForm = () => {
    const form = useForm<z.infer<typeof AddAdminSchema>>({
        resolver: zodResolver(AddAdminSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })
    const [open, setOpen] = useState(false)
    const [isLoading, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const handleSubmit = (values: z.infer<typeof AddAdminSchema>) => {
        setError("")
        startTransition(() => {
            addadmin(values)
                .then((data) => {
                    if (data.success) {
                        form.reset()
                        setOpen(false)
                        toast.success(data.success);
                    } else if (data.error) {
                        setError(data.error);
                    }
                })
                .catch(() => toast.error("Something went wrong!"));
        })
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-green-500 text-white hover:bg-green-700 hover:text-white">
                    <Plus className="mr-2" />
                    Add Admin
                </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className="sm:max-w-[425px] max-h-[calc(100vh-2rem)] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add Admin</DialogTitle>
                </DialogHeader>

                <div className="grid gap-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)}>
                            <div className="grid gap-2">
                                <div className="grid gap-1">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isLoading}
                                                        placeholder="atomadmin"
                                                        type="text"
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
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isLoading}
                                                        placeholder="admin@atom.com"
                                                        type="email"
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
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isLoading}
                                                        placeholder="******"
                                                        type="password"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormError message={error} />
                                <Button disabled={isLoading}>
                                    {isLoading && (
                                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Create
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default AdminAddForm
