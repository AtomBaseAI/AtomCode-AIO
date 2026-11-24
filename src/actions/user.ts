"use server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
// import bcrypt from 'bcryptjs'
import * as z from 'zod'
import { revalidatePath } from "next/cache"
import { StudentPasswordResetSchema, StudentUpdateSchema } from "@/schemas/student/user-schema"
import { compareSync, genSaltSync, hashSync } from 'bcrypt-ts';
import { requireUser } from "@/lib/action-guards";

/**
 * Student self-profile update (student settings page).
 * Only profile fields (name/phone/github/linkedin) are accepted — identity
 * fields (rollnumber, batch, department, section) and account flags
 * (isActive, email) are admin-managed and ignored from the client here.
 */

export const updatestudent = async (
    values: z.infer<typeof StudentUpdateSchema>
) => {
    const session = await requireUser();
    if (!session) return { error: "Unauthorized" };

    // The row id ALWAYS comes from the session — values.id is ignored so a
    // forged payload cannot touch another student's row.
    const data: { name?: string; phone?: string; github?: string; linkedin?: string } = {};
    if (typeof values.name === "string") data.name = values.name;
    if (typeof values.phone === "string") data.phone = values.phone;
    if (typeof values.github === "string") data.github = values.github;
    if (typeof values.linkedin === "string") data.linkedin = values.linkedin;

    await db.user.update({
        where: {
            id: session.user.id
        },
        data,
    })

    revalidatePath("/")
    return { success: "Student Updated !" }
}
/**
 * Self-service password change for the signed-in student.
 * - Requires a session with the student role and uses the session id —
 *   never the client-supplied one — so this cannot be aimed at other users.
 * - The current password must match before the new password is written.
 */
export const resetpasswordstudent = async (
    values: z.infer<typeof StudentPasswordResetSchema>
) => {
    const session = await auth();
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (!session?.user || role !== "user") {
        return { error: "Unauthorized" };
    }

    const student = await db.user.findUnique({
        where: { id: session.user.id }
    });
    if (!student?.password) {
        return { error: "Account not found" };
    }

    if (!compareSync(values.currentpassword, student.password)) {
        return { error: "Current password is incorrect" };
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(values.password, salt);

    // const hashedPassword = await bcrypt.hash(password, 10)
    await db.user.update({
        where: {
            id: student.id
        },
        data: {
            password: hashedPassword
        }
    })
    return { success: "Password Updated !" }

}
