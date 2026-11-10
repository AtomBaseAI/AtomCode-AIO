import { isMaintenanceMode } from "@/lib/platform-settings";
import { getBrandingSettings } from "@/lib/branding-settings";
import Image from "next/image";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LoginForm } from "@/components/auth/login-form";
import { BorderBeam } from "@/components/magicui/border-beam";
import { HexagonPattern } from "@/components/magicui/hexagon-pattern";
import { Card } from "@/components/ui/card";

export default async function Login() {
  // Maintenance switch: admin DB setting wins, env fallback keeps the
  // original NEXT_PUBLIC_APP_STATUS behavior when the DB is unreachable.
  const maintenance = await isMaintenanceMode();

  // Client details (white-label branding) — DB overrides, env defaults.
  const {
    clientBanner,
    clientName,
    poweredbyName,
    poweredbyStatus,
    poweredbyUrl,
    vendorLogo,
    vendorName,
  } = await getBrandingSettings();

  return (
    <div className="relative flex min-h-svh flex-col bg-muted/40 p-4 dark:bg-background md:p-6 lg:p-8">
      {/* Magic UI hexagon pattern — page background, fades from top-left toward bottom-right */}
      <HexagonPattern
        radius={40}
        x={-1}
        y={-1}
        className="[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
      />

      {/* Page header — brand logo left, theme toggle right */}
      <header className="z-30 flex items-center justify-between">
        <div className="flex items-center gap-2 text-lg font-medium">
          <Image
            src={vendorLogo}
            alt={`${vendorName} logo`}
            height={20}
            width={20}
          />
          {vendorName}
        </div>
        <ThemeToggle />
      </header>

      {/* Login card — 50% banner | 50% form, Magic UI border beam */}
      <main className="flex flex-1 items-center justify-center py-6">
        <Card className="relative w-full max-w-4xl overflow-hidden rounded-2xl py-0 shadow-xl">
          <BorderBeam
            size={96}
            thickness={6}
            duration={20}
            colorFrom="#8b5cf6"
            colorTo="#d946ef"
          />
          <BorderBeam
            size={96}
            thickness={6}
            duration={20}
            delay={10}
            anchor={270}
            colorFrom="#d946ef"
            colorTo="#8b5cf6"
          />

          <div className="grid lg:grid-cols-2">
            {/* Left — banner panel (50%) */}
            <div className="relative hidden flex-col justify-between overflow-hidden border-r bg-muted p-8 lg:flex dark:border-border dark:bg-zinc-900">
              <div className="relative flex w-full flex-1 items-center justify-center py-6">
                <Image
                  src={clientBanner}
                  width={1280}
                  height={800}
                  priority
                  alt="Authentication"
                  className="h-auto w-full rounded-2xl shadow-lg dark:shadow-none"
                />
              </div>
            </div>

            {/* Right — form (50%) */}
            <div className="flex items-center justify-center p-6 md:p-10">
              <div className="mx-auto flex w-full max-w-[350px] flex-col justify-center space-y-6">
                <div className="flex flex-col space-y-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    {clientName}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Enter your email &amp; password below to login your account
                  </p>
                </div>

                {!maintenance ? (
                  <LoginForm />
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-center text-yellow-600">
                        The application is currently under Maintenance !{" "}
                      </p>
                      <br />
                      <p className="text-center">Please try again later.</p>
                    </div>
                    {/* Admin bypass — students see the notice only; the
                        collapsible sign-in keeps the admin from being
                        locked out while maintenance is enabled. */}
                    <details className="group rounded-lg border border-dashed px-4 py-3">
                      <summary className="cursor-pointer list-none text-center text-sm text-muted-foreground hover:text-foreground">
                        Administrator? Sign in
                      </summary>
                      <div className="mt-4">
                        <LoginForm />
                      </div>
                    </details>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </main>

      {/* Bottom bar — "Powered by" bottom-left, register button bottom-right
          (exactly opposite the theme toggle in the top-right header).
          The register entry point is hidden while maintenance mode is on —
          self-registration is blocked server-side too. */}
      <div className="relative z-30 flex items-center justify-between">
        {poweredbyStatus ? (
          <footer className="text-lg">
            Powered by{" "}
            <a
              href={poweredbyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-600 hover:underline dark:text-blue-400"
            >
              {poweredbyName}
            </a>
          </footer>
        ) : (
          <span aria-hidden />
        )}

        {!maintenance && (
          <Link
            href="/register"
            aria-label="Create an account"
            title="Create an account"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent text-black shadow-none transition-colors hover:bg-transparent hover:text-primary dark:text-white"
          >
            <UserPlus className="h-5 w-5" aria-hidden />
            <span className="sr-only">Register</span>
          </Link>
        )}
      </div>
    </div>
  );
}
