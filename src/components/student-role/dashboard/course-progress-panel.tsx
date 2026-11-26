import Link from "next/link";
import { ArrowRight, CircleCheck } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import CourseLanguageIcon from "@/components/student-role/course-language-icon";
import { EmptyState } from "@/components/shared/empty-state";
import type { StudentDashboardData } from "@/data/student/dashboard";

/**
 * "My Courses" panel — progress bars for every enrolled course with a
 * direct continue link into the module player. Mirrors the admin chart
 * card rhythm (shadcn Card + CardHeader/Content).
 */
export function CourseProgressPanel({
  courses,
}: {
  courses: StudentDashboardData["courses"];
}) {
  return (
    <Card className="w-full min-w-0">
      <CardHeader className="flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>My Courses</CardTitle>
          <CardDescription>Progress across your enrolled courses</CardDescription>
        </div>
        <Link
          href="/student/courses"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {courses.length === 0 ? (
          <EmptyState compact title="No courses enrolled yet" />
        ) : (
          courses.map((course) => {
            const done = course.courseProgres >= 100;
            return (
              <Link
                key={course.courseId}
                href={course.courseStatus ? `/student/courses/${course.courseId}/module` : "/student/courses"}
                className="group flex w-full items-center gap-4 rounded-md border p-3 transition-colors hover:border-purple-600 hover:bg-muted/40"
                aria-label={`Open course ${course.courseName} — ${course.courseProgres}% complete`}
              >
                <CourseLanguageIcon language={course.courseLanguage} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold">{course.courseName}</span>
                    {done ? (
                      <span className="inline-flex flex-shrink-0 items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400">
                        <CircleCheck className="h-3.5 w-3.5" aria-hidden />
                        Completed
                      </span>
                    ) : (
                      <span className="flex-shrink-0 text-sm font-bold tabular-nums text-primary">
                        {course.courseProgres}%
                      </span>
                    )}
                  </div>
                  <Progress value={course.courseProgres} className="mt-2 h-2" />
                </div>
                <ArrowRight
                  className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden
                />
              </Link>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
