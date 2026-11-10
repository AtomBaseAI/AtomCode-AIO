import { getCourseModuleTitlesByModuleId, getModuleQuestionsByModuleId } from '@/data/modules';
import { TopbarBreadcrumb } from '@/components/topbar-title';


import CodeView from '@/components/code/code-view';
const CodeMain = async ({ params }: { params: Promise<{ cid, mid }> }) => {
    const { mid, cid } = await params;
    const courseModuleTitles = await getCourseModuleTitlesByModuleId(mid)


    const ModuleQuestions = await getModuleQuestionsByModuleId(mid) || [];

    return (
        <>
            <TopbarBreadcrumb
                items={[
                    { label: "Courses", href: "/staff/courses" },
                    { label: courseModuleTitles?.courseTitle ?? "Course", href: `/staff/courses/${cid}` },
                    { label: courseModuleTitles?.moduleTitle ?? "Module" },
                ]}
            />
            <CodeView questions={ModuleQuestions} mid={mid} cid={cid} />
        </>
    )
}

export default CodeMain