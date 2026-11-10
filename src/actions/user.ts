"use server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
// import bcrypt from 'bcryptjs'
import * as z from 'zod'
import { revalidatePath } from "next/cache"
import { StudentPasswordResetSchema, StudentUpdateSchema } from "@/schemas/student/user-schema"
import { compareSync, genSaltSync, hashSync } from 'bcrypt-ts';
export const updatestudent = async (
    values: z.infer<typeof StudentUpdateSchema>
) => {
    const uid = values.id;
    await db.user.update({
        where: {
            id: uid
        },
        data: {
            ...values,
        }
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
