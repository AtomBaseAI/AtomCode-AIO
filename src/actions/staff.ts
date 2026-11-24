"use server"
import { randomBytes } from "crypto"
import { db } from "@/lib/db"
import { auth } from "@/auth"
// import bcrypt from 'bcryptjs'
import * as z from 'zod'
import { revalidatePath } from "next/cache"
import { AddStaffSchema, DeleteStaffSchema, StaffPasswordResetSchema, StaffUpdateSchema } from "@/schemas/staff-schema"
import { compareSync, genSaltSync, hashSync } from 'bcrypt-ts';
import { requireAdmin } from "@/lib/action-guards";
import { bumpTokenVersion } from "@/lib/auth-validate";

/**
 * One-time reset password: "Atom-" + 6 base64url chars. Returned ONCE in
 * the success message and hashed at rest — no shared default passwords.
 */
const generateOneTimePassword = () =>
    `Atom-${randomBytes(4).toString("base64url")}`;

export const addstaff = async (values: z.infer<typeof AddStaffSchema>) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can add staff members." };

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

/**
 * Deletes a staff member and every course assignment that references them
 * inside one transaction. StaffCourse rows do not cascade in the schema,
 * so a bare staff.delete would fail while the staff member is still
 * assigned to any course.
 */
export const deletestaff = async (
    values: z.infer<typeof DeleteStaffSchema>
) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can delete staff members." };

    const uid = values.id;
    const staff = await db.staff.findUnique({ where: { id: uid }, select: { id: true } });
    if (!staff) return { error: "Staff not found." };

    await db.$transaction(async (tx) => {
        // Remove course assignments first, then the account itself.
        await tx.staffCourse.deleteMany({ where: { staffId: uid } });
        await tx.staff.delete({
            where: {
                id: uid
            }
        })
    });
    revalidatePath("/admin/staffs")
    return { success: "Staff Deleted !" }
}


export const updatestaff = async (
    values: z.infer<typeof StaffUpdateSchema>
) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can update staff members." };

    // Strip the id from the written data — it is only the where-key.
    const { id: uid, ...data } = values;
    await db.staff.update({
        where: {
            id: uid
        },
        data,
    })

    revalidatePath("/admin/staffs")
    // revalidatePath("student")
    return { success: "Staff Updated !" }
}


/**
 * Admin-side reset — issues a RANDOM one-time password instead of a shared
 * default. No current password needed (the admin is acting on someone
 * else's account), but the caller must be an authenticated admin. The OTP
 * is returned once in the success message and old sessions are revoked.
 */
export const resetpasswordstaff = async (
    values: z.infer<typeof StaffPasswordResetSchema>
) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can reset staff passwords." };

    const uid = values.id;
    const staff = await db.staff.findUnique({
        where: { id: uid },
        select: { id: true },
    });
    if (!staff) return { error: "Staff not found." };

    const oneTimePassword = generateOneTimePassword();
    // const hashedPassword = await bcrypt.hash(password, 10)

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(oneTimePassword, salt);
    await db.staff.update({
        where: {
            id: uid
        },
        data: {
            password: hashedPassword
        }
    })
    // Old sessions (JWT jv frozen at sign-in) must not survive a reset.
    await bumpTokenVersion("staff", uid);

    return {
        success: `One-time password: ${oneTimePassword} — share it with the staff member now; it is not shown again.`,
    }
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

    const result = await db.$transaction(async (tx) => {
        // Remove course assignments first, then the accounts themselves.
        await tx.staffCourse.deleteMany({ where: { staffId: { in: validIds } } });
        return tx.staff.deleteMany({
            where: { id: { in: validIds } },
        });
    });
    revalidatePath("/admin/staffs");
    return { success: `${result.count} staff member(s) deleted.` };
}


