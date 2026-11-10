
import InsightView from '@/components/results/analysis/analysis-students/insight-view';
import { getPerformanceAnalysisInsights } from '@/data/analysis';
import { TopbarBreadcrumb } from '@/components/topbar-title';

const PerformanceAnalysisInsights = async ({ params }: { params: Promise<{ cid, mid, uid }> }) => {
    const { cid, mid, uid } = await params
    // const moduleId = parseInt(mid, 10);
    // const courseId = parseInt(cid, 10);
    const analysisdata = await getPerformanceAnalysisInsights(cid, mid, uid)
    // console.log(analysisdata)
    // console.log(analysisdata)

    return (
        <>
            <TopbarBreadcrumb
                items={[
                    { label: "Analysis", href: "/staff/results" },
                    { label: analysisdata?.coursetitle ?? "Course", href: `/staff/results/${cid}/analysis` },
                    { label: analysisdata?.moduletitle ?? "Module", href: `/staff/results/${cid}/analysis/${mid}` },
                    { label: analysisdata?.name ?? "Insights" },
                ]}
            />
            <InsightView analysisdata={analysisdata} cid={cid} mid={mid} uid={uid} />
        </>
    )
}

export default PerformanceAnalysisInsights