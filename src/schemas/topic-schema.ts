import * as z from "zod";

export const TopicCreateSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { message: "Topic name is required" })
        .max(100, { message: "Topic name is too long (max 100)" }),
});

export const TopicRenameSchema = z.object({
    topicId: z.string().min(1, { message: "Topic is required" }),
    name: z
        .string()
        .trim()
        .min(1, { message: "Topic name is required" })
        .max(100, { message: "Topic name is too long (max 100)" }),
});

export const SubTopicCreateSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { message: "Sub topic name is required" })
        .max(100, { message: "Sub topic name is too long (max 100)" }),
});

export const SubTopicRenameSchema = z.object({
    subTopicId: z.string().min(1, { message: "Sub topic is required" }),
    name: z
        .string()
        .trim()
        .min(1, { message: "Sub topic name is required" })
        .max(100, { message: "Sub topic name is too long (max 100)" }),
});

/** Shape used by the topics import (JSON export envelope / bare array). */
export const TopicImportItemSchema = z.object({
    name: z.string().trim().min(1),
    subtopics: z
        .array(
            z.object({
                name: z.string().trim().min(1).max(100),
            })
        )
        .optional()
        .default([]),
});

export type TopicImportItem = z.infer<typeof TopicImportItemSchema>;
