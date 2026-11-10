"use client";

// Admin profile editor — updates the signed-in admin's name/email.
// Session refresh is handled by router.refresh() so the topbar re-renders.

import { useState, useTransition } from "react";
import * as z from "zod";
import { toast } from "sonner";
import { LoaderIcon, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateAdminProfile } from "@/actions/settings";
import { AdminProfileSchema } from "@/schemas/settings-schema";

export function AdminProfileForm({
  id,
  name,
  email,
}: {
  id: string;
  name: string;
  email: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AdminProfileSchema>>({
    resolver: zodResolver(AdminProfileSchema),
    defaultValues: { id, name, email },
  });

  const handleSubmit = (values: z.infer<typeof AdminProfileSchema>) => {
    startTransition(async () => {
      try {
        const res = await updateAdminProfile(values);
        if (res.error) {
          toast.error(res.error);
        } else if (res.success) {
          toast.success(res.success);
          setOpen(false);
          router.refresh();
        }
      } catch {
        toast.error("Something went wrong!");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Pencil className="h-3.5 w-3.5" aria-hidden />
          Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Update your admin name and email address.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="hidden" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your name" />
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
                    <Input {...field} type="email" placeholder="admin@example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading && (
                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save changes
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
