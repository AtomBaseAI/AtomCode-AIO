"use server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
// import bcrypt from 'bcryptjs'
import * as z from 'zod'
import { AdminPasswordResetSchema } from "@/schemas/admin-schema"
import { compareSync, genSaltSync, hashSync } from 'bcrypt-ts';

/**
 * Self-service password change for the signed-in admin.
 * - Requires the caller's session (admins only) and uses the session id —
 *   never the client-supplied one — so this cannot be aimed at other admins.
 * - The current password must match before the new password is written.
 */
export const resetpasswordadmin = async (
    values: z.infer<typeof AdminPasswordResetSchema>
) => {
    const session = await auth();
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (!session?.user || role !== "admin") {
        return { error: "Unauthorized" };
    }

    const admin = await db.admin.findUnique({
        where: { id: session.user.id }
    });
    if (!admin?.password) {
        return { error: "Account not found" };
    }

    if (!compareSync(values.currentpassword, admin.password)) {
        return { error: "Current password is incorrect" };
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(values.password, salt);

    await db.admin.update({
        where: {
            id: admin.id
        },
        data: {
            password: hashedPassword
        }
    })
    return { success: "Password Updated !" }
}
