import * as z from "zod";

export const AddQuestionGroupSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }).max(120, {
        message: "Title is too long"
    })
});

export const UpdateQuestionGroupSchema = z.object({
    id: z.string().min(1, {
        message: "Group id is required"
    }),
    title: z.string().min(1, {
        message: "Title is required"
    }).max(120, {
        message: "Title is too long"
    })
});

/** Row shape used by the groups table on /admin/questions-groups. */
export type QuestionGroupRow = {
    id: string;
    title: string;
    createdAt: string;
    /** Code questions (CodeQuestion) inside the group. */
    questionCount: number;
    /** MCQ questions (MCQQuestion) inside the group. */
    mcqCount: number;
    /** Topics (Topic) inside the group. */
    topicCount: number;
};

/** Slim question shape used inside group pickers / group question tables. */
export type GroupQuestionRow = {
    id: string;
    title: string;
    lang: string;
    difficulty: string;
    maxscore: number;
    topic: string | null;
    subtopic: string | null;
    groupTitle: string | null;
};
