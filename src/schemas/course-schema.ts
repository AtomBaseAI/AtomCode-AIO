import * as z from "zod"

/** Course completion order — how students progress through modules. */
export const completionOrderSchema = z.enum(["daywise", "queue", "openflow"], {
    message: "Completion order is required",
})

export const courseTypeSchema = z.enum(["code-mcq", "mcq-only"], {
    message: "Course type is required",
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
    // "code-mcq" (classic) | "mcq-only" — mcq-only courses never mandate
    // code questions for module/assessment completion.
    courseType: courseTypeSchema.default("code-mcq"),
    // Students may solve code questions in any supported language (the user
    // code panel shows a language selector); `language` stays the default.
    anyLanguage: z.boolean().default(false),
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
    // "code-mcq" | "mcq-only" — defaults keep legacy rows (and the staff
    // course fetcher, which predates these fields) parsing cleanly.
    courseType: z.string().default("code-mcq"),
    anyLanguage: z.boolean().default(false),
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
    courseType: courseTypeSchema.default("code-mcq"),
    anyLanguage: z.boolean().default(false),
    completionOrder: completionOrderSchema,
})




export type CourseTableType = z.infer<typeof CourseTableSchema>

