import Link from "next/link";
import { CalendarClock, Link2Off, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import type { ModuleLockState } from "@/lib/module-access";

/**
 * Server-rendered "module locked" screen. Rendered by the student practice /
 * MCQ / code pages when the course's completion order gates the module —
 * the server-side enforcement point behind the (cosmetic) UI lock badges.
 */
const ModuleLockedScreen = ({
    lock,
    backHref,
}: {
    lock: ModuleLockState;
    backHref: string;
}) => {
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center gap-y-6 p-4">
            <div className="shadow-lg rounded-md overflow-hidden w-[24rem] border hover:border-yellow-500">
                <div className="py-8 px-6 sm:px-8 flex flex-col justify-center items-center gap-4">
                    <div className="p-2 bg-yellow-500 rounded-full text-white">
                        <Lock className="h-7 w-7" />
                    </div>
                    <h1 className="text-lg font-bold">Module Locked !</h1>
                    {lock.reason === "date" && (
                        <p className="text-sm text-muted-foreground flex flex-col items-center gap-1">
                            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                                <CalendarClock className="h-4 w-4 text-yellow-600" />
                                Daywise course — date gated
                            </span>
                            Unlocks on{" "}
                            <span className="text-green-600 font-bold">
                                {lock.unlockDate ? formatDate(lock.unlockDate) : "the scheduled date"}
                            </span>
                        </p>
                    )}
                    {lock.reason === "prerequisite" && (
                        <p className="text-sm text-muted-foreground flex flex-col items-center gap-1 text-center">
                            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                                <Link2Off className="h-4 w-4 text-yellow-600" />
                                Queue course — sequence gated
                            </span>
                            Complete{" "}
                            <span className="text-green-600 font-bold">
                                &quot;{lock.prerequisiteTitle ?? "the previous module"}&quot;
                            </span>{" "}
                            first to unlock this module.
                        </p>
                    )}
                    {!lock.reason && (
                        <p className="text-sm text-muted-foreground">
                            This module is not accessible right now.
                        </p>
                    )}
                </div>
            </div>
            <Link href={backHref} className="w-[24rem]">
                <Button variant="outline" className="bg-primary text-white hover:bg-primary/80 hover:text-white w-full">
                    Back to Modules
                </Button>
            </Link>
        </main>
    );
};

export default ModuleLockedScreen;
