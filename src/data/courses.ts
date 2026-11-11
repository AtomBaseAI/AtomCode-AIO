import { db } from "@/lib/db";

interface CourseWithCounts {
    modulescount: number;
    assessmentscount: number;
    studentscount: number;
    staffscount: number;
    feedbackscount: number;
}

export const getAllCourses = async (): Promise<CourseWithCounts[]> => {
    try {
        const courses = await db.course.findMany({
            select: {
                id: true,
                title: true,
                startdate: true,
                enddate: true,
                language: true,
                completionOrder: true,
                _count: {
                    select: {
                        modules: true,
                        assessments: true,
                        userCourses: true,
                        staffCourses: true,
                        feedbacks: true,
                    },
                },
            },
        });

        const coursesWithCounts: CourseWithCounts[] = courses.map((course) => {
            return {
                ...course,
                modulescount: course._count.modules,
                assessmentscount: course._count.assessments,
                studentscount: course._count.userCourses,
                staffscount: course._count.staffCourses,
                feedbackscount: course._count.feedbacks,
            };
        });

        return coursesWithCounts;
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
};

export const getCourseById = async (id: string) => {
    try {
        const course = await db.course.findUnique({ where: { id } })
        return course
    }
    catch {
        return null
    }
}

export const getCoursesCount = () => {
    try {
        const ccount = db.course.count()
        return ccount
    }
    catch {
        return null
    }
}