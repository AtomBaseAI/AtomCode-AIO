import Link from "next/link";
import {
    ClipboardCheck,
    FileQuestion,
    Hexagon,
    Star,
    Users,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { StaffDashboardStats } from "@/data/staff/dashboard";

/**
 * Headline numbers for every course the staff member teaches. Cards link to
 * the section where that number can be acted on, so the strip doubles as a
 * quick-action row.
 */
const StatCards = ({ stats }: { stats: StaffDashboardStats }) => {
    const items = [
        {
            label: "Students",
            value: stats.students,
            hint: "enrolled across your courses",
            href: "/staff/courses",
            icon: Users,
            accent: "text-orange-600 bg-orange-100 dark:bg-orange-950/20",
        },
        {
            label: "Modules",
            value: stats.modules,
            hint: `${stats.moduleCompletions} student completions`,
            href: "/staff/courses",
            icon: Hexagon,
            accent: "text-cyan-600 bg-cyan-100 dark:bg-cyan-950/20",
        },
        {
            label: "Questions",
            value: stats.mcqQuestions + stats.codeQuestions,
            hint: `${stats.mcqQuestions} MCQ · ${stats.codeQuestions} code`,
            href: "/staff/workspace",
            icon: FileQuestion,
            accent: "text-purple-600 bg-purple-100 dark:bg-purple-950/20",
        },
        {
            label: "Assessments",
            value: stats.assessments,
            hint: `${stats.activeAssessments} active now`,
            href: "/staff/courses",
            icon: ClipboardCheck,
            accent: "text-rose-600 bg-rose-100 dark:bg-rose-950/20",
        },
        {
            label: "Feedbacks",
            value: stats.feedbacks,
            hint: "collected from students",
            href: "/staff/courses",
            icon: Star,
            accent: "text-lime-600 bg-lime-100 dark:bg-lime-950/20",
        },
    ];

    return (
        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
            {items.map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
                    aria-label={`${item.label}: ${item.value}`}
                >
                    <Card className="h-full border-border/60 transition-colors group-hover:border-primary/60 group-hover:shadow-md">
                        <CardContent className="flex items-center gap-3 p-4">
                            <span
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${item.accent}`}
                            >
                                <item.icon className="h-5 w-5" />
                            </span>
                            <span className="min-w-0">
                                <span className="block text-2xl font-bold leading-tight tabular-nums">
                                    {item.value}
                                </span>
                                <span className="block truncate text-sm font-medium text-muted-foreground">
                                    {item.label}
                                </span>
                                <span className="block truncate text-xs text-muted-foreground/80">
                                    {item.hint}
                                </span>
                            </span>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
};

export default StatCards;
