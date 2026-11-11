import Link from "next/link";
import { ArrowRight, UserRound, UserRoundX } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { StaffAtRiskStudent } from "@/data/staff/dashboard";

/**
 * Follow-up list: enrolled students below 50% completion, worst first, so
 * staff can nudge them before they fall too far behind.
 */
const AtRiskStudents = ({ students }: { students: StaffAtRiskStudent[] }) => {
    return (
        <Card className="border-border/60">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                    <span>Students needing attention</span>
                    <span className="text-xs font-normal text-muted-foreground">
                        below 50% completion
                    </span>
                </CardTitle>
                <CardDescription>
                    Reach out before these students fall behind
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                {students.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 py-8 text-center">
                        <UserRound className="h-8 w-8 text-green-600 dark:text-green-400" />
                        <p className="text-sm text-muted-foreground">
                            Every enrolled student is at or above 50% completion.
                        </p>
                    </div>
                ) : (
                    <ul className="max-h-96 space-y-2 overflow-y-auto pr-1">
                        {students.map((s) => (
                            <li
                                key={`${s.courseId}-${s.userId}`}
                                className="flex items-center gap-3 rounded-lg border p-2.5 transition-colors hover:bg-muted/40"
                            >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400">
                                    <UserRoundX className="h-4.5 w-4.5" />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold">
                                        {s.name}
                                        {s.rollnumber ? (
                                            <span className="ml-1.5 font-normal text-muted-foreground">
                                                #{s.rollnumber}
                                            </span>
                                        ) : null}
                                    </p>
                                    <p className="truncate text-xs text-muted-foreground">
                                        {s.courseTitle}
                                    </p>
                                </div>
                                <span className="shrink-0 text-sm font-bold tabular-nums text-red-600 dark:text-red-400">
                                    {s.completion}%
                                </span>
                                <Button
                                    asChild
                                    variant="ghost"
                                    size="sm"
                                    className="shrink-0"
                                >
                                    <Link href={`/staff/courses/${s.courseId}/students`}>
                                        View
                                    </Link>
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
};

export default AtRiskStudents;
