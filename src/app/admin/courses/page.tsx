import { z } from "zod"
import { auth } from "@/auth"
import { CourseTableSchema } from "@/schemas/course-schema"
import { getAllCourses } from "@/data/courses"
import { AdminCourseTable } from "@/components/course/course-table/admin-course-table"
import AddCourse from "@/components/course/course-add-form"
import { ImportCourse } from "@/components/course/course-import"
import { TopbarTitle } from "@/components/topbar-title"

async function fetchCourses() {
  const courses = await getAllCourses()
  return z.array(CourseTableSchema).parse(courses)
}

export default async function CoursesData() {
  // Course import / export is super-admin-only now — regular admins get a
  // panel without it, the super admin keeps the exact same tooling.
  const session = await auth()
  const role = (session?.user as { role?: string } | undefined)?.role
  const isSuperAdmin = role === "superadmin"

  const courses = await fetchCourses()

  return (
    <>
      {/* Page title lives in the top bar (left side, same row as the user menu). */}
      <TopbarTitle>Courses</TopbarTitle>
      <div className="flex h-full flex-1 flex-col space-y-2 p-4 md:p-8 w-full">
        <div className="flex flex-wrap items-center justify-between gap-2 space-y-2">
          <p className="text-xl font-semibold tracking-tight text-muted-foreground">
            All Courses : {courses.length}
          </p>
          <div className="flex justify-center items-center gap-x-4">
            {/* Import Course sits next to Add Course (row export files land here).
                Super-admin-only: hidden for regular admins. */}
            {isSuperAdmin && <ImportCourse />}
            <AddCourse />
          </div>
        </div>
        <AdminCourseTable data={courses} canExport={isSuperAdmin} />
      </div>
    </>
  )
}