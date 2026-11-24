
import { Book, Flame, Code2, ClipboardCheck } from 'lucide-react'
import CalenderLayout from '@/components/student-role/custom-calender'
import DashboardStatCard from '@/components/student-role/dashboard-stat-card'
import { WelcomeBanner } from '@/components/student-role/dashboard/welcome-banner'
import { ActivityChart } from '@/components/student-role/dashboard/activity-chart'
import { StreakPanel } from '@/components/student-role/dashboard/streak-panel'
import { CourseProgressPanel } from '@/components/student-role/dashboard/course-progress-panel'
import { UpcomingPanel } from '@/components/student-role/dashboard/upcoming-panel'
import { DifficultyDonut } from '@/components/dashboard/dashboard-charts'
import { TopbarTitle } from '@/components/topbar-title'
import { auth } from '@/auth';
import { getAllUserCourses } from '@/data/student/courses';
import { getStudentDashboardData } from '@/data/student/dashboard';

const Dashboard = async () => {
  const session = await auth();
  const uid = session?.user?.id;
  if (!uid) {
    throw new Error('Session Expired, Login again !');
  }

  const [userCourses, data] = await Promise.all([
    getAllUserCourses(uid),
    getStudentDashboardData(uid),
  ]);

  const { stats, streak, activity30, activityMap, difficulty, upcoming } = data;

  // First active course drives the "Resume learning" CTA.
  const firstActive = userCourses.find((c) => c.courseStatus);
  const resumeHref = firstActive
    ? `/student/courses/${firstActive.courseId}/module`
    : '/student/courses';

  return (
    // Same content-span spacing rule as the admin panel (/admin/dashboard):
    // p-4 (mobile) / md:p-8 (desktop) padding from the top bar and sidebar,
    // full-width column with a consistent gap-6 between sections.
    <div className="flex h-full w-full flex-1 flex-col gap-6 p-4 pb-8 md:p-8">
      <TopbarTitle>Dashboard</TopbarTitle>

      <WelcomeBanner
        name={session?.user?.name ?? ''}
        activeCourses={stats.active}
        streak={streak.current}
        resumeHref={resumeHref}
      />

      {/* Key stats — full-width responsive grid, admin dashboard rhythm. */}
      <section
        aria-label="Key statistics"
        className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <DashboardStatCard
          icon={<Flame className="h-6 w-6" />}
          value={streak.current}
          label="Day Streak"
          sub={streak.activeToday ? "Practised today" : "Practice today to keep it"}
          tone="amber"
          href="/student/courses"
        />
        <DashboardStatCard
          icon={<Book className="h-6 w-6" />}
          value={stats.active}
          label="Courses Active"
          sub={`${stats.enrolled} enrolled · ${stats.completed} completed`}
          tone="purple"
          href="/student/courses"
        />
        <DashboardStatCard
          icon={<Code2 className="h-6 w-6" />}
          value={stats.solvedCode}
          label="Code Solved"
          sub={`${stats.solvedMcq} MCQ correct`}
          tone="teal"
          href="/student/courses"
        />
        <DashboardStatCard
          icon={<ClipboardCheck className="h-6 w-6" />}
          value={stats.assessmentsCompleted}
          label="Assessments Done"
          tone="green"
          href="/student/assessments"
        />
      </section>

      {/* Calendar (preserved) + upcoming assessments. */}
      <section aria-label="Course calendar and assessments" className="grid w-full gap-6 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <CalenderLayout Courses={userCourses} />
        </div>
        <UpcomingPanel assessments={upcoming} />
      </section>

      {/* Practice activity + streak heatmap. */}
      <section aria-label="Practice analytics" className="grid w-full gap-6 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <ActivityChart data={activity30} />
        </div>
        <StreakPanel streak={streak} activityMap={activityMap} />
      </section>

      {/* Course progress + solved difficulty mix. */}
      <section aria-label="Courses and difficulty" className="grid w-full gap-6 xl:grid-cols-2">
        <CourseProgressPanel courses={userCourses} />
        <DifficultyDonut data={difficulty} />
      </section>
    </div>
  )
}

export default Dashboard
