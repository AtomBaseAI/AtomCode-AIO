import * as z from "zod";

/**
 * Guard against javascript:/data: style URLs reaching <a href> / <iframe src>
 * (audit finding: XSS chain via unguarded reference links). Only http(s)
 * URLs without whitespace are accepted.
 */
const httpUrlRegex = /^https?:\/\/\S+$/i;
const httpUrlMessage = "Link must be a http(s) URL";

export const AddModuleReferenceSchema = z.object({
    moduleId: z.string(),
    title: z.string().min(1, {
        message: "Feedback link is required"
    }),
    link: z.string().min(1, {
        message: "Reference link is required"
    }).regex(httpUrlRegex, {
        message: httpUrlMessage
    }),
    type: z.string().min(1, {
        message: "Reference type is required"
    })
});
export const UpdateModuleReferenceSchema = z.object({
    id: z.string(),
    title: z.string(),
    link: z.string().min(1, {
        message: "Reference link is required"
    }).regex(httpUrlRegex, {
        message: httpUrlMessage
    }),
    type: z.string()
})
export const DeleteModuleReferenceSchema = z.object({
    id: z.string()
});

export const ModuleReferenceTableSchema = z.object({
    id: z.string(),
    title: z.string(),
    // moduleId: z.number(),
    link: z.string(),
    type: z.string()
});

export type ModuleReferenceTableType = z.infer<typeof ModuleReferenceTableSchema>;