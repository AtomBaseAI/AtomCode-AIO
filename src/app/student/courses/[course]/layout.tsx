
import { Book, CalendarCheck, CalendarX, Star } from 'lucide-react'
import { getCourseById, getCourseProgress } from '@/data/student/courses'
import { getFeedbackCountByCourseId } from '@/data/feedbacks'
import { Progress } from '@/components/ui/progress'
import { TopbarBreadcrumb } from '@/components/topbar-title'
import { auth } from '@/auth'

interface coursecomponentprops {
    children: React.ReactNode,
    params: Promise<{ course: string }>
}
const fetchSessionUserID = async () => {
    const session = await auth();
    return session?.user?.id
}
const fetchProgress = async (courseId: string, userId: string) => {
    const progress = getCourseProgress(courseId, userId)
    return progress
}

const CourseLayout = async ({ children, params }: coursecomponentprops) => {
    const { course: courseId } = await params
    const coursedata = await getCourseById(courseId)
    const uid = await fetchSessionUserID()
    if (!uid) {
        return (
            <div>Error: User not logged in</div>
        )
    }
    const CourseProgress: number = await fetchProgress(courseId, uid)
    const feedbackCount = await getFeedbackCountByCourseId(courseId)
    return (
        <div className="w-full flex flex-col gap-2">
            <TopbarBreadcrumb
                items={[
                    { label: "Courses", href: "/student/courses" },
                    { label: coursedata?.title ?? "Course" },
                ]}
            />
            <div className="py-10 sm:py-8 mx-8 border-2 rounded-md">
                {/* Full card width (no max-w cap); 0.6fr/2.4fr split keeps the
                    completion bar compact (~40% shorter than the old 1/3 col).
                    Wide column gap gives the bar→stats seam the same breathing
                    room as the gaps between the stat cards themselves. */}
                <div className="grid gap-x-20 gap-y-10 px-6 sm:px-8 xl:grid-cols-[minmax(0,0.6fr)_minmax(0,2.4fr)]">
                    <div className="flex flex-col h-full items-start justify-center">
                        <div className="w-full">
                            {/* Label on top so the bare bar reads as a completion meter */}
                            <div className="mb-2 flex w-full items-center justify-between">
                                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                                    Course Completion
                                </p>
                                <span className="text-sm font-bold text-primary">
                                    {CourseProgress}%
                                </span>
                            </div>
                            <Progress value={CourseProgress} />
                        </div>
                    </div>
                    <ul role="list" className="grid gap-x-10 gap-y-12 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-4 items-center justify-center">
                        <li>
                            <div className="flex items-center gap-x-4">
                                <div className='h-14 w-14 text-purple-600 bg-purple-100 dark:bg-purple-500/10 rounded-md inline-flex flex-shrink-0 items-center justify-center'>
                                    <Book className='h-8 w-8' />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-700 dark:text-gray-200">{coursedata?.modelules}</h3>
                                    <p className="text-sm font-semibold leading-6 text-primary">Total Modules</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center gap-x-4">
                                <div className='h-14 w-14 text-yellow-600 bg-yellow-100 dark:bg-yellow-500/10 rounded-md inline-flex flex-shrink-0 items-center justify-center'>
                                    <Star className='h-8 w-8' />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-700 dark:text-gray-200">{feedbackCount}</h3>
                                    <p className="text-sm font-semibold leading-6 text-yellow-600">Total Feedbacks</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center gap-x-4">
                                <div className='h-14 w-14 text-green-600 bg-green-100 dark:bg-green-500/10 rounded-md inline-flex flex-shrink-0 items-center justify-center'>
                                    <CalendarCheck className='h-8 w-8' />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-700 dark:text-gray-200">{coursedata?.starDate}</h3>
                                    <p className="text-sm font-semibold leading-6 text-green-600">Start Date</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center gap-x-4">
                                <div className='h-14 w-14 text-red-600 bg-red-100 dark:bg-red-500/10 rounded-md inline-flex flex-shrink-0 items-center justify-center'>
                                    <CalendarX className='h-8 w-8' />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-700 dark:text-gray-200">{coursedata?.endDate}</h3>
                                    <p className="text-sm font-semibold leading-6 text-red-600">End Date</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {children}
        </div>
    )
}

export default CourseLayout