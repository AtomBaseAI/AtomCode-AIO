"use server"
import { db } from "@/lib/db"
import { auth } from "@/auth"
// import bcrypt from 'bcryptjs'
import * as z from 'zod'
import { revalidatePath } from "next/cache"
import { AddStaffSchema, DeleteStaffSchema, StaffPasswordResetSchema, StaffUpdateSchema } from "@/schemas/staff-schema"
import { compareSync, genSaltSync, hashSync } from 'bcrypt-ts';
import { requireAdmin } from "@/lib/action-guards";

export const addstaff = async (values: z.infer<typeof AddStaffSchema>) => {
    const validatedFields = AddStaffSchema.safeParse(values)
    if (!validatedFields.success) {
        return { error: "Invalid email/password" }
    }
    const { email, password, name, department, staffnumber, phone } = validatedFields.data;
    // const hashedPassword = await bcrypt.hash(password, 10)
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    const existingUser = await db.staff.findUnique({
        where: {
            email
        }
    })
    if (existingUser) {
        return { error: "Email already exists !" }
    }

    await db.staff.create({
        data: {
            name,
            email,
            department,
            staffnumber,
            phone,
            password: hashedPassword
        }
    })
    revalidatePath("/admin/staffs")
    return { success: "Staff Added !" }

}

export const deletestaff = async (
    values: z.infer<typeof DeleteStaffSchema>
) => {
    const uid = values.id;
    await db.staff.delete({
        where: {
            id: uid
        }
    })
    revalidatePath("/admin/staffs")
    return { success: "Staff Deleted !" }
}


export const updatestaff = async (
    values: z.infer<typeof StaffUpdateSchema>
) => {
    const uid = values.id;
    await db.staff.update({
        where: {
            id: uid
        },
        data: {
            ...values,
        }
    })

    revalidatePath("/admin/staffs")
    // revalidatePath("student")
    return { success: "Staff Updated !" }
}


/**
 * Admin-side reset — sets a staff account back to the default password.
 * No current password needed (the admin is acting on someone else's
 * account), but the caller must be an authenticated admin.
 */
export const resetpasswordstaff = async (
    values: z.infer<typeof StaffPasswordResetSchema>
) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can reset staff passwords." };

    const uid = values.id;
    const password = "Staff@Atom"
    // const hashedPassword = await bcrypt.hash(password, 10)

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    await db.staff.update({
        where: {
            id: uid
        },
        data: {
            password: hashedPassword
        }
    })
    return { success: "Default Password Updated !" }
}

/** Schema shape for the staff self-service password change (see component). */
export type StaffOwnPasswordResetInput = {
    id: string;
    currentpassword: string;
    password: string;
    confirmpassword: string;
};

/**
 * Self-service password change for the signed-in staff member.
 * - Requires a session with the staff role and uses the session id —
 *   never the client-supplied one — so this cannot be aimed at other staff.
 * - The current password must match before the new password is written.
 */
export const resetOwnPasswordStaff = async (
    values: StaffOwnPasswordResetInput
) => {
    const session = await auth();
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (!session?.user || role !== "staff") {
        return { error: "Unauthorized" };
    }

    const staff = await db.staff.findUnique({
        where: { id: session.user.id }
    });
    if (!staff?.password) {
        return { error: "Account not found" };
    }

    if (!compareSync(values.currentpassword, staff.password)) {
        return { error: "Current password is incorrect" };
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(values.password, salt);
    await db.staff.update({
        where: { id: staff.id },
        data: { password: hashedPassword },
    });
    return { success: "Password Updated !" };
}

export const deletestaffsbulk = async (ids: string[]) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can delete staff members." };

    const validIds = (ids ?? []).filter(
        (id) => typeof id === "string" && id.trim().length > 0
    );
    if (validIds.length === 0) return { error: "No staff members selected." };

    const result = await db.staff.deleteMany({
        where: { id: { in: validIds } },
    });
    revalidatePath("/admin/staffs");
    return { success: `${result.count} staff member(s) deleted.` };
}


