"use client";

// App-wide route error boundary. Intentionally does NOT render the raw
// error message (it can leak internals to end users); details are logged
// to the browser console for debugging.
import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Server-side digest is included automatically; message stays client-side.
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-[60vh] w-full items-center justify-center p-6">
            <div className="w-full max-w-md rounded-xl border border-purple-200 bg-white p-8 text-center shadow-md dark:border-purple-900 dark:bg-gray-900">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300">
                    <AlertTriangle className="h-6 w-6" />
                </div>
                <h1 className="text-lg font-semibold text-purple-700 dark:text-purple-300">
                    Something went wrong
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    An unexpected error occurred. Please try again — if it keeps
                    happening, contact your administrator.
                </p>
                <Button
                    onClick={reset}
                    className="mt-6 w-full bg-purple-600 text-white hover:bg-purple-500"
                >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Try again
                </Button>
            </div>
        </div>
    );
}
