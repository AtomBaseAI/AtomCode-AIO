"use client";

// Root-level error boundary — renders when the layout/shell itself throws.
// Owns <html>/<body>; keeps the same generic, brand-styled card as
// src/app/error.tsx and never leaks the raw error message.
import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html lang="en">
            <body
                style={{
                    margin: 0,
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#faf7ff",
                    fontFamily:
                        "ui-sans-serif, system-ui, -apple-system, sans-serif",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: 420,
                        padding: 32,
                        textAlign: "center",
                        backgroundColor: "#ffffff",
                        border: "1px solid #e9d5ff",
                        borderRadius: 12,
                        boxShadow: "0 4px 12px rgba(147, 51, 234, 0.08)",
                    }}
                >
                    <div
                        style={{
                            margin: "0 auto 16px",
                            width: 48,
                            height: 48,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "9999px",
                            backgroundColor: "#f3e8ff",
                            color: "#9333ea",
                            fontSize: 24,
                        }}
                    >
                        <AlertTriangle style={{ width: 24, height: 24 }} />
                    </div>
                    <h1
                        style={{
                            fontSize: 18,
                            fontWeight: 600,
                            color: "#7e22ce",
                            margin: 0,
                        }}
                    >
                        Something went wrong
                    </h1>
                    <p
                        style={{
                            marginTop: 8,
                            fontSize: 14,
                            color: "#6b7280",
                        }}
                    >
                        An unexpected error occurred. Please try again — if it
                        keeps happening, contact your administrator.
                    </p>
                    <button
                        onClick={reset}
                        style={{
                            marginTop: 24,
                            width: "100%",
                            padding: "10px 16px",
                            borderRadius: 8,
                            border: "none",
                            backgroundColor: "#9333ea",
                            color: "#ffffff",
                            fontWeight: 600,
                            fontSize: 14,
                            cursor: "pointer",
                        }}
                    >
                        <RotateCcw
                            style={{
                                width: 14,
                                height: 14,
                                marginRight: 8,
                                verticalAlign: "-2px",
                            }}
                        />
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
