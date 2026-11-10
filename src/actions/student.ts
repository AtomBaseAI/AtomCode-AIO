"use server"
import { db } from "@/lib/db"
// import bcrypt from 'bcryptjs'
import * as z from 'zod'
import { revalidatePath } from "next/cache"
import { AddStudentSchema, DeleteStudentSchema, StudentPasswordResetSchema, StudentUpdateSchema } from "@/schemas/student-schema"
import { genSaltSync, hashSync } from 'bcrypt-ts';
import { requireAdmin } from "@/lib/action-guards";

export const addstudent = async (values: z.infer<typeof AddStudentSchema>) => {
    const validatedFields = AddStudentSchema.safeParse(values)
    if (!validatedFields.success) {
        return { error: "Invalid email/password" }
    }
    const { email, password, name, department, rollnumber, batch, section } = validatedFields.data;
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    // const hashedPassword = await bcrypt.hash(password, 10)
    const existingUser = await db.user.findUnique({
        where: {
            email
        }
    })
    if (existingUser) {
        return { error: "Email already exists !" }
    }

    await db.user.create({
        data: {
            name,
            email,
            department,
            rollnumber,
            batch,
            section,
            isTwoFactorEnabled: false,
            password: hashedPassword
        }
    })
    revalidatePath("/admin/students")
    return { success: "Student Added !" }

}

export const deletestudent = async (
    values: z.infer<typeof DeleteStudentSchema>
) => {
    const uid = values.id;
    await db.user.delete({
        where: {
            id: uid
        }
    })
    revalidatePath("/admin/students")
    return { success: "Student Deleted !" }
}


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

    revalidatePath("/admin/students")
    // revalidatePath("student")
    return { success: "Student Updated !" }
}


/**
 * Admin-side reset — sets a student account back to the default password.
 * No current password needed (the admin is acting on someone else's
 * account), but the caller must be an authenticated admin.
 */
export const resetpasswordstudent = async (
    values: z.infer<typeof StudentPasswordResetSchema>
) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can reset student passwords." };

    const uid = values.id;
    const password = "User@Atom"
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    // const hashedPassword = await bcrypt.hash(password, 10)
    await db.user.update({
        where: {
            id: uid
        },
        data: {
            password: hashedPassword
        }
    })
    return { success: "Default Password Updated !" }
}



export const deletestudentsbulk = async (ids: string[]) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can delete students." };

    const validIds = (ids ?? []).filter(
        (id) => typeof id === "string" && id.trim().length > 0
    );
    if (validIds.length === 0) return { error: "No students selected." };

    const result = await db.user.deleteMany({
        where: { id: { in: validIds } },
    });
    revalidatePath("/admin/students");
    return { success: `${result.count} student(s) deleted.` };
}