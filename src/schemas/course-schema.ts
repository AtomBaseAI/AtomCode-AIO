import * as z from "zod"

/** Course completion order — how students progress through modules. */
export const completionOrderSchema = z.enum(["daywise", "queue", "openflow"], {
    message: "Completion order is required",
})

export const AddCourseSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    startdate: z.date(),
    enddate: z.date(),
    language: z.string().min(1, {
        message: "Language is required"
    }),
    completionOrder: completionOrderSchema,
});

export const DeleteCourseSchema = z.object({
    id: z.string()
})

export const CourseTableSchema = z.object({
    id: z.string(),
    title: z.string(),
    startdate: z.date(),
    enddate: z.date(),
    language: z.string(),
    completionOrder: z.string(),
    modulescount: z.number(),
    assessmentscount: z.number(),
    studentscount: z.number().optional(),
    staffscount: z.number().optional(),
    feedbackscount: z.number().optional()
})



export const CourseUpdateSchema = z.object({
    id: z.string(),
    title: z.string(),
    startdate: z.date(),
    enddate: z.date(),
    language: z.string(),
    completionOrder: completionOrderSchema,
})




export type CourseTableType = z.infer<typeof CourseTableSchema>

