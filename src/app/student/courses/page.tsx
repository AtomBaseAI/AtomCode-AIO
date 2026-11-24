import { Book, CalendarCheck, CalendarX, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { getAllUserCourses } from '@/data/student/courses'
import { TopbarTitle } from '@/components/topbar-title'
import { auth } from '@/auth'
import { Progress } from '@/components/ui/progress'
import CourseLanguageIcon from '@/components/student-role/course-language-icon'

const getSessionUserID = async () => {
  const session = await auth();
  return session?.user?.id
}

interface CourseCardProps {
  name: string
  language: string | null
  startDate: string
  endDate: string
  progress: number | null
  href?: string
}

/**
 * Course card — the classic rich course-card layout, re-implemented on the
 * admin card rhythm (rounded-md border bg-card shadow-md): tinted header
 * band with the language logo + status badge, start/end date tiles, and a
 * progress footer. Fills its grid cell (w-full) so the responsive grid
 * controls sizing; inactive courses render without a link.
 */
function CourseCard({ name, language, startDate, endDate, progress, href }: CourseCardProps) {
  const isActive = progress !== null
  const done = progress !== null && progress >= 100

  const inner = (
    <>
      {/* Header band — language logo + title + status badge */}
      <div className='flex flex-row items-center gap-4 border-b bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent p-5'>
        <CourseLanguageIcon
          language={language}
          tileClass='border bg-card shadow-sm'
        />
        <div className='min-w-0 flex-1'>
          <h2 className="truncate text-lg font-semibold leading-tight">{name}</h2>
          <span className='mt-0.5 block text-xs font-medium capitalize text-muted-foreground'>
            {language ?? 'course'} · {done ? 'Completed' : isActive ? 'Active' : 'Archived'}
          </span>
        </div>
        <span
          className={`inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
            done
              ? 'border-green-500/40 bg-green-500/10 text-green-600 dark:text-green-400'
              : isActive
                ? 'border-green-500/40 bg-green-500/10 text-green-600 dark:text-green-400'
                : 'border-muted bg-muted text-muted-foreground'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${done || isActive ? 'bg-green-500' : 'bg-muted-foreground/60'}`} aria-hidden />
          {done ? 'Done' : isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      {/* Date tiles */}
      <div className='grid w-full grid-cols-2 divide-x border-b'>
        <div className='flex items-center gap-3 px-5 py-4'>
          <span className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-green-100 dark:bg-green-500/10'>
            <CalendarCheck className='h-4 w-4 text-green-600 dark:text-green-400' />
          </span>
          <div className='min-w-0'>
            <span className='block text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Start</span>
            <span className="block truncate text-sm font-bold leading-tight tabular-nums">{startDate}</span>
          </div>
        </div>
        <div className='flex items-center gap-3 px-5 py-4'>
          <span className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-red-100 dark:bg-red-500/10'>
            <CalendarX className='h-4 w-4 text-red-600 dark:text-red-400' />
          </span>
          <div className='min-w-0'>
            <span className='block text-xs font-semibold uppercase tracking-wide text-muted-foreground'>End</span>
            <span className="block truncate text-sm font-bold leading-tight tabular-nums">{endDate}</span>
          </div>
        </div>
      </div>

      {/* Progress footer */}
      {progress !== null ? (
        <div className='flex flex-col gap-2 p-5'>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Course Progress</span>
            <span className='text-sm font-bold tabular-nums text-primary'>{progress}%</span>
          </div>
          <Progress value={progress} className='h-2' />
        </div>
      ) : (
        <div className='flex items-center justify-between p-5 text-sm text-muted-foreground'>
          <span>Not available</span>
        </div>
      )}

      {/* CTA affordance for active courses */}
      {isActive && (
        <div className='mt-auto flex items-center gap-1.5 border-t px-5 py-3 text-sm font-semibold text-primary transition-colors'>
          {done ? 'Review course' : 'Continue learning'}
          <ChevronRight className='h-4 w-4' aria-hidden />
        </div>
      )}
    </>
  )

  const shell = 'flex h-full w-full flex-col overflow-hidden rounded-md border bg-card shadow-md transition-all hover:border-purple-600 hover:shadow-lg'
  return href ? (
    <Link href={href} className={shell} aria-label={`Open course ${name}`}>{inner}</Link>
  ) : (
    <div className={shell}>{inner}</div>
  )
}

const Courses = async () => {
  const uid = await getSessionUserID()
  if (uid === null || uid === undefined) {
    return (
      <div className="flex h-full w-full flex-1 flex-col gap-6 p-4 pb-8 md:p-8">
        <TopbarTitle>Courses</TopbarTitle>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-10 text-center">
          <Book className="size-8 text-muted-foreground" />
          <p className="text-muted-foreground">Not logged in.</p>
        </div>
      </div>
    )
  }
  const coursesData = await getAllUserCourses(uid);
  return (
    // Same content-span spacing rule as the admin panel: p-4 / md:p-8 from
    // the top bar and sidebar, full-width column, consistent section gap.
    <div className="flex h-full w-full flex-1 flex-col gap-6 p-4 pb-8 md:p-8">
      <TopbarTitle>Courses</TopbarTitle>
      {coursesData.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-10 text-center">
          <Book className="size-8 text-muted-foreground" />
          <p className="text-muted-foreground">No courses enrolled.</p>
        </div>
      ) : (
        // Full-width responsive card grid (mirrors the admin dashboard's
        // stat-card grid) — cards stretch to fill their cells, left-aligned.
        <div className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {coursesData.map((course, index) => (
            <React.Fragment key={index}>
              {course.courseStatus ? (
                <CourseCard
                  name={course.courseName}
                  language={course.courseLanguage}
                  startDate={course.courseStartDate}
                  endDate={course.courseEndDate}
                  progress={course.courseProgres}
                  href={`/student/courses/${course.courseId}/module`}
                />
              ) : (
                <CourseCard
                  name={course.courseName}
                  language={course.courseLanguage}
                  startDate={course.courseStartDate}
                  endDate={course.courseEndDate}
                  progress={null}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  )
}

export default Courses
