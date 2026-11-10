import { Book } from 'lucide-react';
import { getStaffDashboardData } from '@/data/staff/dashboard';
import { auth } from '@/auth';
import { TopbarTitle } from '@/components/topbar-title';

import AssessmentMonitor from '@/components/staff/dashboard/assessment-monitor';
import AtRiskStudents from '@/components/staff/dashboard/at-risk-students';
import CourseProgress from '@/components/staff/dashboard/course-progress';
import ModuleTimeline from '@/components/staff/dashboard/module-timeline';
import StatCards from '@/components/staff/dashboard/stat-cards';

const getSession = async () => {
  const session = await auth();
  return session;
}

const Dashboard = async () => {
  const staffsession = await getSession();
  if (staffsession?.user?.id === undefined) {
    return null;
  }
  const staffID = staffsession?.user.id;
  // Single aggregate call — every panel below reads from this one snapshot.
  const { stats, courses, assessments, atRisk, upcomingModules } =
    await getStaffDashboardData(staffID);

  if (courses.length === 0) {
    return (
      <div className="w-full h-[75vh] flex flex-col gap-2 justify-center items-center">
        <TopbarTitle>Dashboard</TopbarTitle>
        <div className=" shadow-lg rounded-md overflow-hidden w-[20rem] order-first lg:order-none border hover:border-primary" >
          <div className="py-5 px-6 sm:px-8 flex flex-col justify-center items-center gap-5">
            <Book className="h-10 w-10 text-yellow-400" />
            No Courses Enrolled !
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <TopbarTitle>Dashboard</TopbarTitle>
      {/* Full width like /staff/courses (no max-w cap) */}
      <div className="flex w-full flex-col space-y-4 p-4 md:p-8">
        {/* Headline numbers — each card links to where the number is actionable */}
        <StatCards stats={stats} />

        <div className="grid w-full gap-4 lg:grid-cols-2">
          <CourseProgress courses={courses} />
          <AssessmentMonitor assessments={assessments} />
          <AtRiskStudents students={atRisk} />
          <ModuleTimeline modules={upcomingModules} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
