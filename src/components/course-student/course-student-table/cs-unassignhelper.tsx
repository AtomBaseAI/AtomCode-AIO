
import React from 'react'
import { useParams } from 'next/navigation'
import UnassignCourseStudent from '@/components/course-student/course-student-table/cs-unassign';

interface Params {
    [key: string]: string;
    cid: string;
}

const StudentUnassignHelper = ({ uid }: { uid: string }) => {
    const { cid } = useParams<Params>();
    return (
        <>
            <UnassignCourseStudent uid={uid} cid={cid} />
        </>
    )
}

export default StudentUnassignHelper
