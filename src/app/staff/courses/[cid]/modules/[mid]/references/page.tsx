import { z } from "zod"
import BackBtn from "@/components/backbtn"
import { TopbarBreadcrumb } from "@/components/topbar-title"
import { getAllReferencesByModuleId } from "@/data/references"
import { ModuleReferenceTableSchema } from "@/schemas/references-schema"
import AddModuleReference from "@/components/module-reference/reference-add-form"
import { getModuleById } from "@/data/modules"
import { getCourseById } from "@/data/courses"
import { ModuleReferenceDataTable } from "@/components/module-reference/module-reference-table/r-data-table"
import { columns } from "@/components/module-reference/module-reference-table/r-columns"

async function fetchReferences(mid: string) {
    const references = await getAllReferencesByModuleId(mid)
    return z.array(ModuleReferenceTableSchema).parse(references)
}
export default async function ModuleReference({ params }: { params: Promise<{ cid, mid }> }) {
    const { cid, mid } = await params
    // const moduleId = parseInt(mid, 10);
    const references = await fetchReferences(mid)
    const modulez = await getModuleById(mid)
    const course = await getCourseById(cid)

    // console.log(references)
    return (
        <>
            <TopbarBreadcrumb
                items={[
                    { label: "Courses", href: "/staff/courses" },
                    { label: course?.title ?? "Course", href: `/staff/courses/${cid}` },
                    { label: modulez?.title ?? "Module" },
                    { label: "References" },
                ]}
            />
            <div className="flex h-full flex-1 flex-col space-y-2 p-4 md:p-8 w-full">
                <div className="flex flex-wrap items-center justify-between gap-2 space-y-2">
                    <div>
                        <p className="text-muted-foreground">
                            All References : {references.length}
                        </p>
                    </div>
                    <div className="flex justify-center items-center gap-x-4">
                        <AddModuleReference mid={mid} />
                        <BackBtn />
                    </div>
                </div>
                {/* <FeedbackDataTable data={feedbacks} columns={columns} /> */}
                <ModuleReferenceDataTable data={references} columns={columns}/>
            </div>
        </>
    )
}