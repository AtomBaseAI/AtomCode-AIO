
import React from 'react'
import { useParams } from 'next/navigation'
import UnassignCourseStaff from '@/components/course-staff/course-staff-table/cstf-unassign';

interface Params {
    [key: string]: string;
    cid: string;
}

const StaffUnassignHelper = ({ uid }: { uid: string }) => {
    const { cid } = useParams<Params>();
    return (
        <>
            <UnassignCourseStaff uid={uid} cid={cid} />
        </>
    )
}

export default StaffUnassignHelper
