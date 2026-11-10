// AtomCode — Staff dashboard data layer.
// Every aggregate is scoped to the courses the signed-in staff member teaches
// (via StaffCourse) and every query is fault-tolerant (returns [] / 0 on DB
// failure) so the dashboard always renders instead of crashing — consistent
// with src/data/dashboard.ts.

import { db } from "@/lib/db";

export interface StaffDashboardStats {
    students: number;
    modules: number;
    mcqQuestions: number;
    codeQuestions: number;
    assessments: number;
    activeAssessments: number;
    feedbacks: number;
    moduleCompletions: number;
}

export interface StaffCourseProgress {
    id: string;
    title: string;
    language: string;
    startdate: Date;
    enddate: Date;
    students: number;
    /** Average UserCourse.completionPercentage across enrollments (0–100). */
    avgCompletion: number;
    modulesCount: number;
    activeAssessments: number;
}

export interface StaffAssessmentItem {
    id: string;
    title: string;
    courseId: string;
    courseTitle: string;
    date: Date;
    accesskey: number;
    active: boolean;
    maxscore: number;
    /** Students with a UserAssessmentData row for this assessment. */
    participants: number;
    enrolled: number;
}

export interface StaffAtRiskStudent {
    userId: string;
    name: string;
    rollnumber: string | null;
    courseId: string;
    courseTitle: string;
    /** UserCourse.completionPercentage (0–100), worst first. */
    completion: number;
}

export interface StaffModuleScheduleItem {
    id: string;
    title: string;
    courseId: string;
    courseTitle: string;
    moduledate: Date;
    modulestatus: string;
    mcqCount: number;
    codeCount: number;
}

export interface StaffDashboardData {
    stats: StaffDashboardStats;
    courses: StaffCourseProgress[];
    assessments: StaffAssessmentItem[];
    atRisk: StaffAtRiskStudent[];
    upcomingModules: StaffModuleScheduleItem[];
}

const EMPTY_STATS: StaffDashboardStats = {
    students: 0,
    modules: 0,
    mcqQuestions: 0,
    codeQuestions: 0,
    assessments: 0,
    activeAssessments: 0,
    feedbacks: 0,
    moduleCompletions: 0,
};

const EMPTY_DATA: StaffDashboardData = {
    stats: EMPTY_STATS,
    courses: [],
    assessments: [],
    atRisk: [],
    upcomingModules: [],
};

/** Start of today — the cutoff separating upcoming from past modules. */
const startOfToday = () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
};

export const getStaffDashboardData = async (
    staffId: string
): Promise<StaffDashboardData> => {
    // Relation filter shared by every query — "courses this staff teaches".
    const courseScope = {
        staffCourses: {
            some: { staffId },
        },
    };

    try {
        const [
            students,
            moduleCompletions,
            feedbacks,
            moduleRows,
            courseRows,
            completionByCourse,
            assessmentRows,
            atRiskRows,
            upcomingRows,
        ] = await Promise.all([
            // Enrolled students across the staff's courses.
            db.userCourse.count({ where: { course: courseScope } }),

            // Module sections the staff's students have fully submitted.
            db.userModuleData.count({
                where: { modulestatus: "submitted", course: courseScope },
            }),

            // NB: the Feedbacks model declares its relation as `Course`
            // (capital C) — the filter key must match the field name.
            db.feedbacks.count({ where: { Course: courseScope } }),

            // Modules with per-module question tallies (summed in JS).
            db.module.findMany({
                where: { course: courseScope },
                select: {
                    _count: {
                        select: { mcqQuestions: true, codeQuestions: true },
                    },
                },
            }),

            db.course.findMany({
                where: courseScope,
                select: {
                    id: true,
                    title: true,
                    language: true,
                    startdate: true,
                    enddate: true,
                    _count: {
                        select: {
                            userCourses: true,
                            assessments: true,
                            modules: true,
                        },
                    },
                },
            }),

            // Average completion % per course for the progress bars.
            db.userCourse.groupBy({
                by: ["courseId"],
                _avg: { completionPercentage: true },
                where: { course: courseScope },
            }),

            // Assessments to run/monitor, with participation counts.
            db.assessments.findMany({
                where: { course: courseScope },
                orderBy: { date: "desc" },
                take: 20,
                select: {
                    id: true,
                    title: true,
                    courseId: true,
                    date: true,
                    accesskey: true,
                    active: true,
                    maxscore: true,
                    _count: { select: { UserAssessmentData: true } },
                    course: {
                        select: {
                            title: true,
                            _count: { select: { userCourses: true } },
                        },
                    },
                },
            }),

            // Students falling behind (completion < 50%) — worst first.
            db.userCourse.findMany({
                where: {
                    course: courseScope,
                    completionPercentage: { lt: 50 },
                },
                orderBy: { completionPercentage: "asc" },
                take: 8,
                select: {
                    userId: true,
                    completionPercentage: true,
                    user: {
                        select: { name: true, rollnumber: true },
                    },
                    course: {
                        select: { id: true, title: true },
                    },
                },
            }),

            // Next modules to conduct, soonest first.
            db.module.findMany({
                where: { course: courseScope, moduledate: { gte: startOfToday() } },
                orderBy: { moduledate: "asc" },
                take: 6,
                select: {
                    id: true,
                    title: true,
                    moduledate: true,
                    modulestatus: true,
                    courseId: true,
                    course: { select: { title: true } },
                    _count: {
                        select: { mcqQuestions: true, codeQuestions: true },
                    },
                },
            }),
        ]);

        const stats: StaffDashboardStats = {
            students,
            modules: moduleRows.length,
            mcqQuestions: moduleRows.reduce(
                (sum, m) => sum + m._count.mcqQuestions,
                0
            ),
            codeQuestions: moduleRows.reduce(
                (sum, m) => sum + m._count.codeQuestions,
                0
            ),
            assessments: courseRows.reduce(
                (sum, c) => sum + c._count.assessments,
                0
            ),
            // Active count comes from the (capped) assessment list — precise
            // enough for the "N active" subtitle and avoids another round-trip.
            activeAssessments: assessmentRows.filter((a) => a.active).length,
            feedbacks,
            moduleCompletions,
        };

        const avgByCourse = new Map(
            completionByCourse.map((g) => [
                g.courseId,
                Math.round((g._avg.completionPercentage ?? 0) * 10) / 10,
            ])
        );

        const courses: StaffCourseProgress[] = courseRows
            .map((c) => ({
                id: c.id,
                title: c.title,
                language: c.language,
                startdate: c.startdate,
                enddate: c.enddate,
                students: c._count.userCourses,
                avgCompletion: avgByCourse.get(c.id) ?? 0,
                modulesCount: c._count.modules,
                activeAssessments: 0,
            }))
            // Which courses still have live assessments — cheap to compute
            // from the assessment rows we already fetched.
            .map((c) => ({
                ...c,
                activeAssessments: assessmentRows.filter(
                    (a) => a.courseId === c.id && a.active
                ).length,
            }))
            .sort((a, b) => b.students - a.students);

        const assessments: StaffAssessmentItem[] = assessmentRows
            .map((a) => ({
                id: a.id,
                title: a.title,
                courseId: a.courseId,
                courseTitle: a.course.title,
                date: a.date,
                accesskey: a.accesskey,
                active: a.active,
                maxscore: a.maxscore,
                participants: a._count.UserAssessmentData,
                enrolled: a.course._count.userCourses,
            }))
            // Live assessments first, then the most recent ones.
            .sort((a, b) => Number(b.active) - Number(a.active));

        const atRisk: StaffAtRiskStudent[] = atRiskRows.map((row) => ({
            userId: row.userId,
            name: row.user?.name ?? "Unknown student",
            rollnumber: row.user?.rollnumber ?? null,
            courseId: row.course.id,
            courseTitle: row.course.title,
            completion:
                Math.round((row.completionPercentage ?? 0) * 10) / 10,
        }));

        const upcomingModules: StaffModuleScheduleItem[] = upcomingRows.map(
            (m) => ({
                id: m.id,
                title: m.title,
                courseId: m.courseId,
                courseTitle: m.course.title,
                moduledate: m.moduledate,
                modulestatus: m.modulestatus,
                mcqCount: m._count.mcqQuestions,
                codeCount: m._count.codeQuestions,
            })
        );

        return { stats, courses, assessments, atRisk, upcomingModules };
    } catch (error) {
        console.error("Error fetching staff dashboard data:", error);
        return EMPTY_DATA;
    }
};
