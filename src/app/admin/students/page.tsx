
import { z } from "zod"

import { columns } from "@/components/student/student-table/s-columns"
import { StudentDataTable } from "@/components/student/student-table/s-data-table"

import { getAllStudents } from "@/data/students"
import AddStudent from "@/components/student/student-add-form"
import { StudentImportExportMenu } from "@/components/student/student-import-export-menu"
import { StudentTableSchema } from "@/schemas/student-schema"
import { TopbarTitle } from "@/components/topbar-title"

async function fetchStudents() {
  const students = await getAllStudents()
  return z.array(StudentTableSchema).parse(students)
}

export default async function StudentsData() {
  const students = await fetchStudents()

  return (
    <>
      <TopbarTitle>Students</TopbarTitle>
      <div className="flex h-full flex-1 flex-col space-y-2 p-4 md:p-8 w-full">
        <div className="flex flex-wrap items-center justify-between gap-2 space-y-2">
          <div>
            <p className="text-xl font-semibold tracking-tight text-muted-foreground">
              All Students
            </p>
          </div>
          <div className="flex justify-center items-center gap-x-4">
            <StudentImportExportMenu />
            <AddStudent />
          </div>
        </div>
        <StudentDataTable data={students} columns={columns} />
      </div>
    </>
  )
}
