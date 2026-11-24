import * as z from "zod"

/**
 * Profile links are rendered as <a href> — only http(s) URLs are accepted
 * (audit finding: XSS chain via github/linkedin). Empty string / undefined
 * mean "not set" and stay allowed.
 */
const httpUrlRegex = /^https?:\/\/\S+$/i;
const optionalHttpUrl = z
    .string()
    .regex(httpUrlRegex, {
        message: "Must be a http(s) URL"
    })
    .or(z.literal(""))
    .optional();

export const StudentUpdateSchema = z.object({
    id: z.string(),
    rollnumber: z.string(),
    name: z.string(),
    phone: z.string().optional(),
    department: z.string(),
    section: z.string(),
    batch: z.string(),
    github: optionalHttpUrl,
    linkedin: optionalHttpUrl,
})

// export const StudentPasswordResetSchema = z.object({
//     id: z.string(),
//     password: z.string().min(6, {
//         message: "Minimum 6 characters required"
//     }),
//     confirmpassword: z.string().min(6, {
//         message: "Minimum 6 characters required"
//     })
// })


export const StudentPasswordResetSchema = z.object({
    id: z.string(),
    currentpassword: z.string().min(1, {
        message: "Current password is required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required"
    }),
    confirmpassword: z.string().min(6, {
        message: "Minimum 6 characters required"
    })
}).refine((data) => data.password === data.confirmpassword, {
    path: ['confirmpassword'],
    message: "Passwords do not match"
});