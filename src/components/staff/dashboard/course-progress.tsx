import Link from "next/link";
import { ArrowRight, Layers, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { StaffCourseProgress } from "@/data/staff/dashboard";
import { formatDate } from "@/lib/utils";

/** Completion color ramp — amber while warming up, green when healthy. */
const completionTone = (pct: number) =>
    pct >= 75
        ? "text-green-600 dark:text-green-400"
        : pct >= 40
          ? "text-amber-600 dark:text-amber-400"
          : "text-red-600 dark:text-red-400";

const CourseProgress = ({ courses }: { courses: StaffCourseProgress[] }) => {
    return (
        <Card className="border-border/60">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                    <span>Course progress</span>
                    <Badge variant="secondary">{courses.length}</Badge>
                </CardTitle>
                <CardDescription>
                    Average completion across enrolled students
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                {courses.length === 0 ? (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                        No courses assigned yet.
                    </p>
                ) : (
                    <ul className="max-h-96 space-y-4 overflow-y-auto pr-1">
                        {courses.map((course) => (
                            <li key={course.id}>
                                <Link
                                    href={`/staff/courses/${course.id}`}
                                    className="group block rounded-lg border border-transparent p-3 transition-colors hover:border-border hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="truncate font-semibold group-hover:text-primary">
                                                {course.title}
                                            </p>
                                            <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                                                <span className="inline-flex items-center gap-1">
                                                    <Users className="h-3.5 w-3.5" />
                                                    {course.students} students
                                                </span>
                                                <span className="inline-flex items-center gap-1">
                                                    <Layers className="h-3.5 w-3.5" />
                                                    {course.modulesCount} modules
                                                </span>
                                                {course.activeAssessments > 0 && (
                                                    <span className="font-medium text-green-600 dark:text-green-400">
                                                        {course.activeAssessments} active{" "}
                                                        {course.activeAssessments === 1
                                                            ? "assessment"
                                                            : "assessments"}
                                                    </span>
                                                )}
                                                <span>
                                                    {formatDate(course.startdate)} –{" "}
                                                    {formatDate(course.enddate)}
                                                </span>
                                            </p>
                                        </div>
                                        <span
                                            className={`shrink-0 text-sm font-bold tabular-nums ${completionTone(course.avgCompletion)}`}
                                        >
                                            {course.avgCompletion}%
                                        </span>
                                    </div>
                                    <Progress
                                        value={course.avgCompletion}
                                        className="mt-2 h-2"
                                        aria-label={`${course.title} average completion ${course.avgCompletion}%`}
                                    />
                                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
                                        Manage course
                                        <ArrowRight className="h-3 w-3" />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
};

export default CourseProgress;
