import * as z from "zod"

export const AdminPasswordResetSchema = z.object({
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