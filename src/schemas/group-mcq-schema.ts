import * as z from "zod";

/**
 * Group-scoped MCQ questions (admin/questions-groups/[gid]/mcq-questions).
 *
 * MCQQuestion rows are shared with modules/assessments — a question group
 * membership is a soft grouping (questionGroupId) that never touches the
 * module/assessment relations.
 */

export const GroupMcqSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
    description: z.string().min(1, {
        message: "Description is required",
    }),
    Option1: z.string().min(1, {
        message: "Option 1 is required",
    }),
    Option2: z.string().min(1, {
        message: "Option 2 is required",
    }),
    Option3: z.string().min(1, {
        message: "Option 3 is required",
    }),
    Option4: z.string().min(1, {
        message: "Option 4 is required",
    }),
    CorrectOption: z.number().int().min(1).max(4, {
        message: "Correct Option must be between 1 and 4",
    }),
    referenceimg: z.string().optional().nullable(),
    codesnippet: z.string().optional().nullable(),
    iscodesnippet: z.boolean(),
    /** Language of the code snippet (runtime-registry id, e.g. "python"). */
    snippetLang: z.string().optional().nullable(),
    topic: z.string().optional().nullable(),
    subtopic: z.string().optional().nullable(),
});

export const GroupMcqUpdateSchema = GroupMcqSchema.extend({
    id: z.string().min(1, {
        message: "MCQ id is required",
    }),
});

/** Row shape used by the group MCQ questions table. */
export type GroupMcqRow = {
    id: string;
    title: string;
    description: string;
    topic: string | null;
    subtopic: string | null;
    Option1: string;
    Option2: string;
    Option3: string;
    Option4: string;
    CorrectOption: number;
    referenceimg: string | null;
    codesnippet: string | null;
    iscodesnippet: boolean;
    snippetLang: string | null;
    groupTitle: string | null;
};
