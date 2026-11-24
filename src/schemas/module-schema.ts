import * as z from "zod"
import { QuestionTableSchema } from './question-schema';

/**
 * Concept URLs render inside <iframe src> — only http(s) URLs without
 * whitespace are accepted (audit finding: XSS chain via concepturl).
 * Empty string / undefined are still allowed ("no concept URL").
 */
const httpUrlRegex = /^https?:\/\/\S+$/i;
const optionalHttpUrl = z
    .string()
    .regex(httpUrlRegex, {
        message: "Concept URL must be a http(s) URL"
    })
    .or(z.literal(""))
    .optional();

export const AddModuleSchema = z.object({
    courseId: z.string(),
    title: z.string().min(1, {
        message: "Module Name is required"
    }),
    moduledate: z.date(),
    modulestatus: z.string().min(1, {
        message: "Module Status is required"
    }),
    maxscore: z.coerce.number(),
    language: z.string(),
    concepturl: optionalHttpUrl
});

export const DeleteModuleSchema = z.object({
    id: z.string()
})

export const ModuleTableSchema = z.object({
    id: z.string(),
    courseId: z.string(),
    title: z.string(),
    moduledate: z.date(),
    modulestatus: z.string(),
    questionscount: z.number(),
    mcqcount: z.number(),
    maxscore: z.number(),
    concepturl: z.string().nullable().optional(),
    // Parent course's completion order — used by the edit form to show the
    // right helper text under the Module Date field.
    courseCompletionOrder: z.string().optional(),
})

export const ModuleQuestionTableSchema = z.object({
    id: z.string(),
    title: z.string(),
    moduledate: z.date(),
    modulestatus: z.string(),
    language: z.string(),
    questions: z.array(QuestionTableSchema)
})

export const ModuleQuestionTableQuestionSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    sampleinput1: z.string(),
    sampleinput2: z.string(),
    sampleoutput1: z.string(),
    sampleoutput2: z.string(),
    input1: z.string(),
    input2: z.string(),
    input3: z.string(),
    output1: z.string(),
    output2: z.string(),
    output3: z.string(),
    maxscore: z.number(),
    difficulty: z.string(),
    lang: z.string(),
    topic: z.string().optional(),
    subtopic: z.string().optional(),
    inputconstrains: z.string().optional(),
    referenceimg: z.string().nullable().optional(),
    sourcecode: z.string().nullable().optional(),
    whitelist: z.string().nullable().optional(),
    blacklist: z.string().nullable().optional(),
})


export const ModuleUpdateSchema = z.object({
    id: z.string(),
    courseId: z.string(),
    title: z.string(),
    moduledate: z.date(),
    modulestatus: z.string(),
    maxscore: z.coerce.number(),
    concepturl: optionalHttpUrl
})

export const DeleteModuleQuestionSchema = z.object({
    id: z.string(),
    mid: z.string()
})

/** Detach an MCQ from a module (the MCQ row itself is never deleted). */
export const RemoveModuleMCQSchema = z.object({
    id: z.string(),
    mid: z.string()
})

export type ModuleTableType = z.infer<typeof ModuleTableSchema>
export type ModuleQuestionTableType = z.infer<typeof ModuleQuestionTableSchema>
export type ModuleQuestionTableQuestionType = z.infer<typeof ModuleQuestionTableQuestionSchema>

