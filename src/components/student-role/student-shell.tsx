"use client"

import { usePathname } from "next/navigation"
import Sidebar from "@/components/student-role/sidebar"
import Topbar from "@/components/topbar"

interface StudentShellProps {
    name: string
    email: string
    image: string | null
    children: React.ReactNode
}

/**
 * Route prefixes that run "immersive" — the practice and assessment
 * environments render full-screen without the shared sidebar / user top
 * bar. Both environments already enforce their own fullscreen proctoring
 * gate, so chrome around them would break the locked-down workspace.
 */
const IMMERSIVE_PREFIXES = ["/student/practice", "/student/assessment"]

const isImmersivePath = (pathname: string) =>
    IMMERSIVE_PREFIXES.some(
        (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    )

export default function StudentShell({ name, email, image, children }: StudentShellProps) {
    const pathname = usePathname() || ""

    if (isImmersivePath(pathname)) {
        // Full-screen workspace — the practice/assessment layouts own the
        // whole viewport (their own headers, rails and fullscreen gates).
        return <div className="min-h-svh w-full overflow-hidden">{children}</div>
    }

    return (
        // w-full instead of min-w-screen: 100vw includes the vertical scrollbar's
        // width, so min-w-screen forced a permanent ~8px horizontal overflow
        // (horizontal scrollbar + clipped sidebar) as soon as any page scrolled.
        <main className="flex min-h-svh w-full flex-row">
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar name={name} email={email} image={image} />
                {/* flex-1 (not h-full): fills exactly the leftover height under the
                    topbar so short pages never force a vertical scrollbar */}
                <div className="flex w-full flex-1 flex-col items-center p-4">
                    {children}
                </div>
            </div>
        </main>
    )
}
