"use client";

// Client-details editor — white-label branding shown on the login/register
// pages (client name, banner, vendor header, "Powered by" line). Includes a
// live mini-preview of the login card that updates as the fields change.

import { useState, useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Building2,
  ImageOff,
  LoaderIcon,
  RotateCcw,
  Save,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { updateBrandingSettings, resetBrandingSettings } from "@/actions/settings";
import { BrandingSettingsSchema } from "@/schemas/settings-schema";
import type { BrandingSettings } from "@/lib/branding-settings";

/** Small preview image with graceful fallback when the URL is broken. */
function PreviewImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const looksUrl = /^https?:\/\//.test(src);
  if (!looksUrl || failed) {
    return (
      <div
        className={`flex items-center justify-center gap-1.5 rounded-md border border-dashed text-muted-foreground ${className}`}
        aria-label={alt}
      >
        <ImageOff className="h-4 w-4" aria-hidden />
        <span className="text-xs">No image</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

export function ClientDetailsForm({ initial }: { initial: BrandingSettings }) {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();
  const [isResetting, startReset] = useTransition();

  const form = useForm<z.infer<typeof BrandingSettingsSchema>>({
    resolver: zodResolver(BrandingSettingsSchema),
    defaultValues: {
      clientName: initial.clientName,
      clientBanner: initial.clientBanner,
      vendorName: initial.vendorName,
      vendorLogo: initial.vendorLogo,
      poweredbyStatus: initial.poweredbyStatus,
      poweredbyName: initial.poweredbyName,
      poweredbyUrl: initial.poweredbyUrl,
    },
  });

  // Live preview mirrors the current field values (even before saving).
  const watched = form.watch();

  const handleSubmit = (values: z.infer<typeof BrandingSettingsSchema>) => {
    startTransition(async () => {
      try {
        const res = await updateBrandingSettings(values);
        if (res.error) {
          toast.error(res.error);
        } else if (res.success) {
          toast.success(res.success);
          router.refresh();
        }
      } catch {
        toast.error("Something went wrong!");
      }
    });
  };

  const handleReset = () => {
    startReset(async () => {
      try {
        const res = await resetBrandingSettings();
        if (res.error) {
          toast.error(res.error);
        } else if (res.success) {
          toast.success(res.success);
          // Full reload so the form remounts with the server's fresh
          // (default) initial values — router.refresh() alone would keep
          // the stale react-hook-form state.
          window.location.reload();
        }
      } catch {
        toast.error("Something went wrong!");
      }
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      {/* ---------------- Form ---------------- */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          {/* Client identity */}
          <section className="space-y-4">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <Building2 className="h-4 w-4 text-purple-600" aria-hidden />
                Client identity
              </h3>
              <p className="text-xs text-muted-foreground">
                Shown as the heading of the login card and the register page.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Atom Code Campus" />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Login card heading &amp; browser tab title.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clientBanner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client banner URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        inputMode="url"
                        placeholder="https://cdn.example.com/banner.webp"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Left-panel image on the login page. Empty = default.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <Separator />

          {/* Vendor header */}
          <section className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold">Vendor header</h3>
              <p className="text-xs text-muted-foreground">
                Brand badge in the top-left corner of the login page.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="vendorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Atom Code" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vendorLogo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor logo URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        inputMode="url"
                        placeholder="https://cdn.example.com/logo.png"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <Separator />

          {/* Powered by */}
          <section className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold">&quot;Powered by&quot; footer</h3>
              <p className="text-xs text-muted-foreground">
                Attribution line under the login banner.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="poweredbyStatus"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 md:justify-start md:gap-3">
                    <FormLabel className="text-sm">Show powered by</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-label="Show powered by line"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="poweredbyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="AtomLabs" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="poweredbyUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link URL</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" inputMode="url" placeholder="https://…" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button type="submit" disabled={isLoading} className="gap-1.5">
              {isLoading ? (
                <LoaderIcon className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Save className="h-4 w-4" aria-hidden />
              )}
              Save client details
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="gap-1.5"
                  disabled={isResetting}
                >
                  {isResetting ? (
                    <LoaderIcon className="h-4 w-4 animate-spin" aria-hidden />
                  ) : (
                    <RotateCcw className="h-4 w-4" aria-hidden />
                  )}
                  Reset to defaults
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset client details?</AlertDialogTitle>
                  <AlertDialogDescription>
                    All saved overrides will be removed and the login page will
                    use the built-in defaults again.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReset}>
                    Reset
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </Form>

      {/* ---------------- Live preview ---------------- */}
      <aside className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Login page preview
        </p>
        <div className="overflow-hidden rounded-xl border shadow-sm">
          {/* vendor header */}
          <div className="flex items-center gap-2 border-b bg-background px-3 py-2">
            <PreviewImage
              src={watched.vendorLogo}
              alt="Vendor logo preview"
              className="h-5 w-5 rounded object-contain"
            />
            <span className="text-sm font-medium">
              {watched.vendorName || "Vendor"}
            </span>
          </div>
          {/* banner panel */}
          <div className="bg-muted p-3">
            <PreviewImage
              src={watched.clientBanner}
              alt="Client banner preview"
              className="aspect-video w-full rounded-lg object-cover"
            />
            {watched.poweredbyStatus && (
              <p className="mt-2 text-xs text-muted-foreground">
                Powered by{" "}
                <span className="font-semibold text-primary">
                  {watched.poweredbyName || "—"}
                </span>
              </p>
            )}
          </div>
          {/* form panel */}
          <div className="space-y-1.5 px-4 py-4 text-center">
            <p className="text-base font-semibold">
              {watched.clientName || "Client name"}
            </p>
            <p className="text-[11px] text-muted-foreground">
              Enter your email &amp; password below to login your account
            </p>
            <div className="mx-auto mt-2 h-7 w-full rounded-md border bg-muted/60" />
            <div className="mx-auto h-7 w-full rounded-md border bg-muted/60" />
            <div className="mx-auto mt-2 h-7 w-full rounded-md bg-primary/80" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Preview updates live — press <em>Save client details</em> to apply it
          to the real login page.
        </p>
      </aside>
    </div>
  );
}
