import { CalendarDays, Code2, ListChecks } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { StaffModuleScheduleItem } from "@/data/staff/dashboard";
import { formatDate } from "@/lib/utils";

/**
 * What to conduct next: the staff member's modules dated today or later,
 * soonest first, with the question load of each module.
 */
const ModuleTimeline = ({
    modules,
}: {
    modules: StaffModuleScheduleItem[];
}) => {
    return (
        <Card className="border-border/60">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                    <span>Upcoming modules</span>
                    <Badge variant="secondary">{modules.length}</Badge>
                </CardTitle>
                <CardDescription>
                    Scheduled from today onwards, soonest first
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                {modules.length === 0 ? (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                        No modules scheduled ahead — all caught up.
                    </p>
                ) : (
                    <ol className="max-h-96 space-y-2 overflow-y-auto pr-1">
                        {modules.map((m) => (
                            <li
                                key={m.id}
                                className="flex items-center gap-3 rounded-lg border p-2.5 transition-colors hover:bg-muted/40"
                            >
                                <span className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300">
                                    <CalendarDays className="h-4 w-4" />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold">
                                        {m.title}
                                    </p>
                                    <p className="truncate text-xs text-muted-foreground">
                                        {m.courseTitle} ·{" "}
                                        {formatDate(m.moduledate)}
                                    </p>
                                </div>
                                <div className="flex shrink-0 items-center gap-1.5">
                                    <Badge
                                        variant="secondary"
                                        className="gap-1 font-normal"
                                    >
                                        <ListChecks className="h-3 w-3" />
                                        {m.mcqCount} MCQ
                                    </Badge>
                                    <Badge
                                        variant="secondary"
                                        className="gap-1 font-normal"
                                    >
                                        <Code2 className="h-3 w-3" />
                                        {m.codeCount} Code
                                    </Badge>
                                </div>
                            </li>
                        ))}
                    </ol>
                )}
            </CardContent>
        </Card>
    );
};

export default ModuleTimeline;
