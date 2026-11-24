'use client'
import React from 'react'
import Link from 'next/link'
import { z } from 'zod'
import {
    AlarmClock, CalendarCheck, Clock,
    Code, FlaskConical, Puzzle, ShieldAlert
} from 'lucide-react'
import { AssessmentTableSchema } from '@/schemas/student/assessment-schema'

type AssessmentType = z.infer<typeof AssessmentTableSchema>

/**
 * Per-status accent strip / label / clickability. NOTE: the color classes
 * MUST come from this static map — Tailwind's JIT scanner cannot see
 * dynamically interpolated class names (`bg-${x}` never compiles), so the
 * accent silently disappeared when it was built via template strings.
 */
const STATUS_STYLES: Record<string, { strip: string; label: string; isClickable: boolean }> = {
    start: { strip: 'bg-green-500', label: 'Start', isClickable: true },
    resume: { strip: 'bg-green-500', label: 'Continue', isClickable: true },
    retake: { strip: 'bg-orange-500', label: 'Retake', isClickable: true },
    completed: { strip: 'bg-green-600', label: 'Completed', isClickable: false },
    expired: { strip: 'bg-red-500', label: 'Expired', isClickable: false },
    upcoming: { strip: 'bg-purple-500', label: 'Upcoming', isClickable: false },
}

const PILL_STYLES: Record<string, string> = {
    expired: 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400',
    retake: 'bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400',
    start: 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400',
    resume: 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400',
    completed: 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400',
    upcoming: 'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
}

/** Small labelled stat cell (icon tile + caption + value), left aligned. */
function StatCell({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string | number; tone: string }) {
    return (
        <div className='flex min-w-0 items-center gap-2.5'>
            <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md ${tone}`}>
                {icon}
            </span>
            <div className='min-w-0'>
                <span className='block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground'>{label}</span>
                <span className='block truncate text-sm font-bold leading-tight tabular-nums'>{value}</span>
            </div>
        </div>
    )
}

const AssessmentCard = ({ data }: { data: AssessmentType }) => {
    const { strip, label, isClickable } =
        STATUS_STYLES[data.status] ?? STATUS_STYLES.upcoming
    const pillClass = PILL_STYLES[data.status] ?? PILL_STYLES.upcoming

    // next/link (not router.push on click): prefetches the target route on
    // viewport entry so clicking feels instant, and keeps the markup
    // semantic/crawlable for student→student navigation.
    const href = `/student/assessment/${data.courseid}/${data.assessmentid}`
    // w-full: the card fills its grid cell — the page's responsive grid
    // controls sizing (a fixed fraction like w-1/4 broke at wide screens).
    const shellClass = `flex h-full w-full flex-col overflow-hidden rounded-md border bg-card shadow-md transition-all ${isClickable ? 'cursor-pointer hover:border-purple-600 hover:shadow-lg' : 'cursor-not-allowed'}`

    const body = (
        <>
            {/* Status accent strip */}
            <span className={`block h-1 w-full ${strip}`} aria-hidden />

            {/* Header — flask tile + title + course */}
            <div className='flex items-center gap-3 border-b bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent p-5'>
                <span className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md border bg-card shadow-sm'>
                    <FlaskConical className='h-6 w-6 text-primary' />
                </span>
                <div className='min-w-0 flex-1'>
                    <h2 className="line-clamp-1 text-left text-lg font-semibold leading-tight text-primary">{data.title}</h2>
                    <p className='line-clamp-1 text-left text-xs font-medium text-muted-foreground'>{data.coursetitle}</p>
                </div>
                <span className='inline-flex flex-shrink-0 items-center rounded-full border border-purple-500/40 bg-purple-500/10 px-2.5 py-1 text-xs font-semibold text-purple-600 dark:text-purple-400' title='Maximum score'>
                    {data.maxscore} pts
                </span>
            </div>

            {/* Schedule stats — date on its own row (long value), time +
                duration share the second row so nothing truncates. */}
            <div className='grid w-full grid-cols-2 gap-3 border-b p-5'>
                <div className='col-span-2'>
                    <StatCell
                        icon={<CalendarCheck className='h-4 w-4 text-primary' />}
                        label='Date'
                        value={data.assessmentdate}
                        tone='bg-purple-100 dark:bg-purple-500/10'
                    />
                </div>
                <StatCell
                    icon={<AlarmClock className='h-4 w-4 text-primary' />}
                    label='Time'
                    value={data.starttime}
                    tone='bg-purple-100 dark:bg-purple-500/10'
                />
                <StatCell
                    icon={<Clock className='h-4 w-4 text-primary' />}
                    label='Duration'
                    value={data.maxtime}
                    tone='bg-purple-100 dark:bg-purple-500/10'
                />
            </div>

            {/* Composition chips */}
            <div className='flex flex-wrap items-center gap-2 p-5'>
                <span className='inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold' title='Code questions'>
                    <Code className='h-3.5 w-3.5 text-primary' />
                    {data.codecount} Code
                </span>
                <span className='inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold' title='MCQ questions'>
                    <Puzzle className='h-3.5 w-3.5 text-primary' />
                    {data.mcqcount} MCQ
                </span>
                <span className='inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold' title='Allowed tab switches'>
                    <ShieldAlert className='h-3.5 w-3.5 text-primary' />
                    {data.tabswitches} Tab Switch{data.tabswitches === 1 ? '' : 'es'}
                </span>
            </div>

            {/* Status footer */}
            <div className='mt-auto w-full border-t p-5 pt-4'>
                <span className={`block w-full text-center text-sm font-semibold px-3 py-2 rounded-sm ${pillClass}`}>
                    {label}
                </span>
            </div>
        </>
    )

    return isClickable ? (
        <Link href={href} className={shellClass} aria-label={`${label} assessment ${data.title}`}>{body}</Link>
    ) : (
        <div className={shellClass}>{body}</div>
    )
}

export default AssessmentCard
