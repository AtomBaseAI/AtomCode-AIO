import { getModuleById } from '@/data/modules'
import { getCourseById } from '@/data/courses'
import React from 'react'
import BackBtn from '@/components/backbtn'
import { getModuleMCQsByModuleId } from '@/data/mcq'
import { ModuleMCQDataTable } from '@/components/module-questions/module-mcq-table/mmc-data-table'
import { columns } from '@/components/module-questions/module-mcq-table/mmc-columns'
import MExport from '@/export/module-export/module-export-button'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Puzzle, UploadCloud } from 'lucide-react'
import { TopbarBreadcrumb } from "@/components/topbar-title"

async function fetchModule(mid: string) {
    const modulez = await getModuleById(mid)
    return modulez
}
async function fetchModuleMCQs(mid: string) {
    const modulex = await getModuleMCQsByModuleId(mid)
    return modulex
}

const ViewModule = async ({ params }: { params: Promise<{ cid: string; mid: string}> }) => {
    const { cid, mid } = await params
    const modulez = await fetchModule(mid)
    const course = await getCourseById(cid)
    const modulex = await fetchModuleMCQs(mid)

    const mcqData = modulex?.map(mcq => ({
        ...mcq,
        referenceimg: mcq.referenceimg || undefined,
        codesnippet: mcq.codesnippet || undefined,
        topic: mcq.topic || undefined,
        subtopic: mcq.subtopic || undefined
    })) || [];

    return (
        <>
            <TopbarBreadcrumb
                items={[
                    { label: "Courses", href: "/admin/courses" },
                    { label: course?.title ?? "Course", href: `/admin/courses/${cid}/modules` },
                    { label: modulez?.title ?? "Module", href: `/admin/courses/${cid}/modules/${mid}/edit` },
                    { label: "MCQ Questions" },
                ]}
            />
            <div className="flex h-full flex-1 flex-col space-y-2 p-4 md:p-8 w-full">
                <div className="flex flex-wrap items-center justify-between gap-2 space-y-2">
                    <div>
                        <p className="text-muted-foreground">
                            Module MCQs : {modulex?.length}
                        </p>
                    </div>
                    <div className="flex justify-center items-center gap-x-4">
                        <Link href={`/admin/courses/${cid}/modules/${mid}/mcq/add`}>
                            <Button className="bg-green-500 hover:bg-green-700 text-white"> <Puzzle className="mr-2" /> Add MCQ</Button>
                        </Link>
                        <Link href={`/admin/courses/${cid}/modules/${mid}/mcq/import`}>
                            <Button>
                                <UploadCloud className="mr-2" />
                                Bulk Upload
                            </Button>
                        </Link>
                        <MExport data={mcqData} fileName={`${modulez?.title}-MCQ.csv`} />
                        <BackBtn />
                    </div>
                </div>
                <ModuleMCQDataTable data={mcqData} columns={columns} mid={mid} />
            </div>
        </>
    )
}

export default ViewModule
