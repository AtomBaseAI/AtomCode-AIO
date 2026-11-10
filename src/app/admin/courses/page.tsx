import { z } from "zod"
import { CourseTableSchema } from "@/schemas/course-schema"
import { getAllCourses } from "@/data/courses"
import { CourseDataTable } from "@/components/course/course-table/c-data-table"
import { columns } from "@/components/course/course-table/c-columns"
import AddCourse from "@/components/course/course-add-form"
import { TopbarTitle } from "@/components/topbar-title"

async function fetchCourses() {
  const courses = await getAllCourses()
  return z.array(CourseTableSchema).parse(courses)
}

export default async function CoursesData() {
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
            <AddCourse />
          </div>
        </div>
        <CourseDataTable data={courses} columns={columns} />
      </div>
    </>
  )
}