import React, { Suspense } from 'react';
import {
  Layers,
  Users,
  ShipWheel,
  Package,
  BookOpen,
  FileQuestion,
  ClipboardCheck,
  Send,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { TopbarTitle } from '@/components/topbar-title';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  AssessmentParticipationBar,
  CourseEnrollmentBar,
  DifficultyDonut,
  QuestionsLanguageBar,
  StudentsDepartmentBar,
  SubmissionStatusDonut,
} from '@/components/dashboard/dashboard-charts';
import {
  getAssessmentParticipation,
  getCourseEnrollments,
  getDashboardCounts,
  getPracticeSubmissionStatus,
  getQuestionsByDifficulty,
  getQuestionsByLanguage,
  getStudentsByDepartment,
  type DashboardCounts,
} from '@/data/dashboard';

/* ------------------------------------------------------------------ */
/* Stat cards                                                          */
/* ------------------------------------------------------------------ */

function StatCard({
  href,
  icon: Icon,
  label,
  value,
  sub,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  value: number;
  sub?: string;
}) {
  return (
    <Link href={href} className="group block h-full" aria-label={`${label}: ${value}`}>
      <div className="flex h-full items-center gap-5 rounded-md border bg-card p-6 shadow-md transition-all group-hover:border-purple-600 group-hover:shadow-lg">
        <div className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-md bg-purple-100 text-purple-600 dark:bg-purple-950/20">
          <Icon className="h-6 w-6" aria-hidden />
        </div>
        <div className="min-w-0">
          <span className="block text-3xl font-bold leading-tight">{value}</span>
          <span className="block truncate text-sm text-gray-500 dark:text-gray-400">
            {label}
          </span>
          {sub && (
            <span className="block text-xs text-gray-400 dark:text-gray-500">{sub}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Streaming chart panels (async server components)                    */
/* ------------------------------------------------------------------ */

function PanelSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="h-5 w-40 animate-pulse rounded bg-muted" />
        <div className="h-3 w-56 animate-pulse rounded bg-muted" />
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full animate-pulse rounded-md bg-muted" />
      </CardContent>
    </Card>
  );
}

async function LanguagePanel() {
  const data = await getQuestionsByLanguage();
  return <QuestionsLanguageBar data={data} />;
}

async function DifficultyPanel() {
  const data = await getQuestionsByDifficulty();
  return <DifficultyDonut data={data} />;
}

async function DepartmentPanel() {
  const data = await getStudentsByDepartment();
  return <StudentsDepartmentBar data={data} />;
}

async function EnrollmentPanel() {
  const data = await getCourseEnrollments();
  return <CourseEnrollmentBar data={data} />;
}

async function SubmissionPanel() {
  const data = await getPracticeSubmissionStatus();
  return <SubmissionStatusDonut data={data} />;
}

async function AssessmentPanel() {
  const data = await getAssessmentParticipation();
  return <AssessmentParticipationBar data={data} />;
}

/* ------------------------------------------------------------------ */
/* Dashboard                                                           */
/* ------------------------------------------------------------------ */

const Dashboard = async () => {
  const counts: DashboardCounts = await getDashboardCounts();
  const totalSubmissions =
    counts.practiceSubmissions + counts.mcqSubmissions + counts.assessmentAttempts;

  const cards: {
    href: string;
    icon: LucideIcon;
    label: string;
    value: number;
    sub?: string;
  }[] = [
    { href: '/admin/courses', icon: Layers, label: 'Total Courses', value: counts.courses },
    { href: '/admin/courses', icon: BookOpen, label: 'Total Modules', value: counts.modules },
    { href: '/admin/students', icon: Users, label: 'Total Students', value: counts.students },
    { href: '/admin/staffs', icon: ShipWheel, label: 'Total Staffs', value: counts.staffs },
    {
      href: '/admin/questions',
      icon: Package,
      label: 'Code Questions',
      value: counts.codeQuestions,
    },
    {
      href: '/admin/questions',
      icon: FileQuestion,
      label: 'MCQ Questions',
      value: counts.mcqQuestions,
    },
    {
      href: '/admin/courses',
      icon: ClipboardCheck,
      label: 'Assessments',
      value: counts.assessments,
    },
    {
      href: '/admin/results',
      icon: Send,
      label: 'Total Submissions',
      value: totalSubmissions,
      sub: 'practice · mcq · assessments',
    },
  ];

  return (
    // Same content-span spacing rule as /admin/questions-groups:
    // p-4 (mobile) / md:p-8 (desktop) top + left padding, full-width column.
    <div className="flex h-full w-full flex-1 flex-col gap-6 p-4 pb-8 md:p-8">
      <TopbarTitle>Dashboard</TopbarTitle>

      <section
        aria-label="Key statistics"
        className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {cards.map((c) => (
          <StatCard key={c.label} {...c} />
        ))}
      </section>

      <section aria-label="Analytics charts" className="grid w-full gap-6 xl:grid-cols-3">
        <Suspense fallback={<PanelSkeleton />}>
          <LanguagePanel />
        </Suspense>
        <Suspense fallback={<PanelSkeleton />}>
          <DifficultyPanel />
        </Suspense>
        <Suspense fallback={<PanelSkeleton />}>
          <DepartmentPanel />
        </Suspense>
        <Suspense fallback={<PanelSkeleton />}>
          <EnrollmentPanel />
        </Suspense>
        <Suspense fallback={<PanelSkeleton />}>
          <SubmissionPanel />
        </Suspense>
        <Suspense fallback={<PanelSkeleton />}>
          <AssessmentPanel />
        </Suspense>
      </section>
    </div>
  );
};

export default Dashboard;
