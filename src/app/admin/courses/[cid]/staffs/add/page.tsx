import { z } from "zod"
import React from 'react'
import BackBtn from '@/components/backbtn'
import { getCourseById } from '@/data/courses'

import { getstaffsbycourseid } from "@/actions/staffcourse"
import { getAllStaffs } from "@/data/staffs"
import { StaffTableSchema } from "@/schemas/staff-schema"
import { CourseStaffAddDataTable } from "@/components/course-staff/course-staff-add-table/cstfa-data-table"
import { columns } from "@/components/course-staff/course-staff-add-table/cstfa-columns"
import { TopbarBreadcrumb } from "@/components/topbar-title"

async function fetchStaffs(cid: string) {
    const staffs = await getstaffsbycourseid(cid)
    const sids = staffs?.map(staff => staff.id);
    return sids;
}

async function fetchAllStaffs() {
    const staffs = await getAllStaffs()
    return z.array(StaffTableSchema).parse(staffs)
}
const CourseStaffsAdd = async ({ params }: { params: Promise<{ cid: string}> }) => {
    const { cid } = await params
    const coursestaffs = await fetchStaffs(cid)
    const allstaffs = await fetchAllStaffs()
    const course = await getCourseById(cid)
    if (allstaffs === null) {
        return <p>No Staffs Available.</p>;
    }

    const filterStaffs = allstaffs.filter(staff => !coursestaffs?.includes(staff.id));
    return (
        <>
            <TopbarBreadcrumb
                items={[
                    { label: "Courses", href: "/admin/courses" },
                    { label: course?.title ?? "Course", href: `/admin/courses/${cid}/staffs` },
                    { label: "Staffs", href: `/admin/courses/${cid}/staffs` },
                    { label: "Add" },
                ]}
            />
            <div className="flex h-full flex-1 flex-col space-y-2 p-4 md:p-8 w-full">
                <div className="flex flex-wrap items-center justify-between gap-2 space-y-2">
                    <div>
                        <p className="text-muted-foreground">
                            Assign Staffs
                        </p>
                    </div>
                    <div className="flex justify-center items-center gap-x-4">
                        <BackBtn />
                    </div>
                </div>
                <CourseStaffAddDataTable data={filterStaffs} columns={columns} cid={cid} />
            </div>
        </>
    )
}

export default CourseStaffsAdd