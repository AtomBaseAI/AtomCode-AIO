import Link from "next/link";
import { ArrowRight, KeyRound, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { StaffAssessmentItem } from "@/data/staff/dashboard";
import { formatDate } from "@/lib/utils";

/**
 * Live monitor for the assessments the staff member can run: access key to
 * share with the class, participation ratio, and the active/expired state.
 */
const AssessmentMonitor = ({
    assessments,
}: {
    assessments: StaffAssessmentItem[];
}) => {
    return (
        <Card className="border-border/60">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                    <span>Assessments</span>
                    <Badge variant="secondary">{assessments.length}</Badge>
                </CardTitle>
                <CardDescription>
                    Access keys and participation at a glance
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                {assessments.length === 0 ? (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                        No assessments scheduled yet.
                    </p>
                ) : (
                    <ul className="max-h-96 space-y-3 overflow-y-auto pr-1">
                        {assessments.map((a) => (
                            <li
                                key={a.id}
                                className="rounded-lg border p-3 transition-colors hover:border-border hover:bg-muted/40"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <p className="truncate font-semibold">
                                            {a.title}
                                        </p>
                                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                                            {a.courseTitle} · {formatDate(a.date)} ·{" "}
                                            max {a.maxscore}
                                        </p>
                                    </div>
                                    <Badge
                                        variant="secondary"
                                        className={
                                            a.active
                                                ? "shrink-0 bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                                                : "shrink-0"
                                        }
                                    >
                                        {a.active ? "Active" : "Ended"}
                                    </Badge>
                                </div>
                                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                                    <span
                                        className="inline-flex items-center gap-1.5 rounded-md border bg-muted/60 px-2 py-0.5 font-mono text-xs font-semibold tracking-wider"
                                        title="Share this access key with students to start the assessment"
                                    >
                                        <KeyRound className="h-3.5 w-3.5" />
                                        {a.accesskey}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <Users className="h-3.5 w-3.5" />
                                        {a.participants}/{a.enrolled} attempted
                                    </span>
                                    <Link
                                        href={`/staff/courses/${a.courseId}`}
                                        className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        Open
                                        <ArrowRight className="h-3 w-3" />
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
};

export default AssessmentMonitor;
