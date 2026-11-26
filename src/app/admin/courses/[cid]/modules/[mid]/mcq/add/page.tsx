import { Button } from '@/components/ui/button'
import { getModuleById } from '@/data/modules'
import { getCourseById } from '@/data/courses'
import { getModuleMCQsByModuleId, getAllBankMcqs } from '@/data/mcq'
import Link from 'next/link'
import React from 'react'
import { MCQAddDataTable } from "@/components/module-questions/module-mcq-add-table/mca-data-table"
import { columns } from "@/components/module-questions/module-mcq-add-table/mca-columns"
import BackBtn from "@/components/backbtn"
import { TopbarBreadcrumb } from "@/components/topbar-title"
import { MCQTableSchema } from "@/schemas/mcq-schema"

async function fetchModule(mid: string) {
    const modulez = await getModuleById(mid)
    return modulez
}

const AddModuleMCQs = async ({ params }: { params: Promise<{ cid: string; mid: string }> }) => {
    const { cid, mid } = await params
    const modulez = await fetchModule(mid)
    const course = await getCourseById(cid)

    // Pool = the FULL question bank. MCQs are many-to-many now — the same
    // MCQ may already serve other modules/courses and can still be added
    // here without moving it away from them.
    const bankMcqs = await getAllBankMcqs()

    // Defensive filter (mirrors the code-questions add page): hide MCQs that
    // are already part of this module.
    const moduleMcqs = await getModuleMCQsByModuleId(mid)
    const filteredMcqs = bankMcqs.filter(
        (mcq) => !moduleMcqs?.some((moduleMcq) => moduleMcq.id === mcq.id)
    )

    // Parse through the table schema so rows match the column definitions.
    const parsedMcqs = filteredMcqs
        .map((mcq) =>
            MCQTableSchema.safeParse({
                ...mcq,
                referenceimg: mcq.referenceimg || undefined,
                codesnippet: mcq.codesnippet || undefined,
                topic: mcq.topic || undefined,
                subtopic: mcq.subtopic || undefined,
            })
        )
        .filter((result) => result.success)
        .map((result) => result.data)

    return (
        <>
            <TopbarBreadcrumb
                items={[
                    { label: "Courses", href: "/admin/courses" },
                    { label: course?.title ?? "Course", href: `/admin/courses/${cid}/modules` },
                    { label: modulez?.title ?? "Module", href: `/admin/courses/${cid}/modules/${mid}/edit` },
                    { label: "MCQ Questions", href: `/admin/courses/${cid}/modules/${mid}/mcq` },
                    { label: "Add" },
                ]}
            />
            <div className="flex h-full flex-1 flex-col space-y-2 p-4 md:p-8 w-full">
                <div className="flex flex-wrap items-center justify-between gap-2 space-y-2">
                    <div>
                        <p className="text-muted-foreground flex items-center justify-center">
                            Add MCQs to module — {parsedMcqs.length} bank MCQ(s) not already in this module
                        </p>
                    </div>
                    <div className="flex justify-center items-center gap-x-4">
                        <BackBtn />
                    </div>
                </div>

                {parsedMcqs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-3 rounded-md border border-dashed p-10 text-center">
                        <p className="text-sm font-medium">No bank MCQs available to add.</p>
                        <p className="text-sm text-muted-foreground">
                            Every MCQ in the question bank is already attached to a module.
                            Use Bulk Upload on the module MCQ page to import new ones.
                        </p>
                        <Link href={`/admin/courses/${cid}/modules/${mid}/mcq`}>
                            <Button variant="outline">Back to Module MCQs</Button>
                        </Link>
                    </div>
                ) : (
                    <MCQAddDataTable data={parsedMcqs} columns={columns} mid={mid} />
                )}
            </div>
        </>
    )
}

export default AddModuleMCQs
