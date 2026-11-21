import * as z from "zod"


/**
 * Base code-question shape WITHOUT the lab-question refinement. The import
 * pipeline (lib/question-group-import.ts) needs to .omit()/.extend() this
 * raw object — zod v4 forbids omit/extend on schemas that already carry
 * refinements, so the refined form is derived below.
 */
export const AddQuestionBaseSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    description: z.string().min(1, {
        message: "Description  is required"
    }),
    sampleinput1: z.string().min(1, {
        message: "Sample Testcase input 1  is required"
    }),
    sampleinput2: z.string().min(1, {
        message: "Sample Testcase input 2  is required"
    }),
    sampleoutput1: z.string().min(1, {
        message: "Sample Testcase output 1  is required"
    }),
    sampleoutput2: z.string().min(1, {
        message: "Sample Testcase output 2  is required"
    }),
    input1: z.string().min(1, {
        message: "Input 1  is required"
    }),
    input2: z.string().min(1, {
        message: "Input 2  is required"
    }),
    input3: z.string().min(1, {
        message: "Input 3  is required"
    }),
    output1: z.string().min(1, {
        message: "Output 1  is required"
    }),
    output2: z.string().min(1, {
        message: "Output 2  is required"
    }),
    output3: z.string().min(1, {
        message: "Output 3  is required"
    }),
    sourcecode: z.string().min(1, {
        message: "Sourcecode is required"
    }),

    referenceimg: z.string().optional(),

    maxscore: z.number().min(1, {
        message: "maxscore is required"
    }),
    difficulty: z.string().min(1, {
        message: "Difficulty is required"
    }),
    lang: z.string().min(1, {
        message: "Languague is required"
    }),
    topic: z.string().optional(),
    subtopic: z.string().optional(),
    inputconstrains: z.string().optional(),
    blacklist: z.string().optional(),
    whitelist: z.string().optional(),
    // Every question lives in exactly one question-group bank — required.
    questionGroupId: z.string().min(1, {
        message: "Question group is required"
    }),
    // "practice" | "lab" — lab questions carry interview metadata.
    questionType: z.enum(["practice", "lab"]).default("practice"),
    company: z.string().optional(),
    frequency: z.string().optional(),
    acceptanceRate: z.coerce.number().min(0).max(100).nullable().optional(),
    // Optional SQL setup code (CREATE TABLE ...). Executed BEFORE the user's
    // code at judge time (header first, user code next).
    headerCode: z.string().optional(),
    // Comma-separated topic tags.
    tags: z.string().optional()
})

/** Lab questions must carry company + frequency + acceptance rate. */
const labRequirementsRefinement = (data: z.infer<typeof AddQuestionBaseSchema>, ctx: z.RefinementCtx) => {
    if (data.questionType === "lab") {
        if (!data.company || !data.company.trim()) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["company"],
                message: "Company name is required for lab questions"
            });
        }
        if (!data.frequency || !data.frequency.trim()) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["frequency"],
                message: "Frequency is required for lab questions"
            });
        }
        if (data.acceptanceRate === undefined || data.acceptanceRate === null) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["acceptanceRate"],
                message: "Acceptance rate is required for lab questions"
            });
        }
    }
};

export const AddQuestionSchema = AddQuestionBaseSchema.superRefine(labRequirementsRefinement);

export const DeleteQuestionSchema = z.object({
    id: z.string()
})

export const QuestionTableSchema = z.object({
    id: z.string(),
    title: z.string(),
    maxscore: z.number(),
    difficulty: z.string(),
    lang: z.string(),
    topic: z.string().nullable(),
    subtopic: z.string().nullable(),
    groupTitle: z.string().nullable().optional()
    // inputconstrains: z.string().nullable(),
    // blacklist: z.string().nullable(),
    // whitelist: z.string().nullable()

})


export const QuestionUpdateSchema = z.object({
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
    sourcecode: z.string(),
    referenceimg: z.string().optional(),
    maxscore: z.number(),
    difficulty: z.string(),
    lang: z.string(),
    topic: z.string().optional(),
    subtopic: z.string().optional(),
    inputconstrains: z.string().optional(),
    blacklist: z.string().optional(),
    whitelist: z.string().optional(),
    questionGroupId: z.string().min(1, {
        message: "Question group is required"
    }),
    questionType: z.enum(["practice", "lab"]).default("practice"),
    company: z.string().nullable().optional(),
    frequency: z.string().nullable().optional(),
    acceptanceRate: z.coerce.number().min(0).max(100).nullable().optional(),
    headerCode: z.string().nullable().optional(),
    tags: z.string().nullable().optional(),
    /**
     * Edit-panel override — when true the update re-marks the question as
     * fully tested (all 5 dots green) instead of resetting the verdict.
     */
    markTested: z.boolean().optional()
})




export type QuestionTableType = z.infer<typeof QuestionTableSchema>

