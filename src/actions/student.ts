"use server"
import { randomBytes } from "crypto"
import { db } from "@/lib/db"
import type { Prisma } from "@prisma/client"
// import bcrypt from 'bcryptjs'
import * as z from 'zod'
import { revalidatePath } from "next/cache"
import { AddStudentSchema, DeleteStudentSchema, StudentPasswordResetSchema, StudentUpdateSchema } from "@/schemas/student-schema"
import { genSaltSync, hashSync } from 'bcrypt-ts';
import { requireAdmin } from "@/lib/action-guards";
import { bumpTokenVersion } from "@/lib/auth-validate";

/**
 * One-time reset password: "Atom-" + 6 base64url chars. Returned ONCE in
 * the success message and hashed at rest — no shared default passwords.
 */
const generateOneTimePassword = () =>
    `Atom-${randomBytes(4).toString("base64url")}`;

export const addstudent = async (values: z.infer<typeof AddStudentSchema>) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can add students." };

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

/**
 * Wipes every row that belongs to the given students (practice records,
 * assessment records, course assignments) inside one transaction.
 * Must be called BEFORE deleting the User rows — none of the relations
 * cascade in the schema, so a bare user.delete would hit FK constraints.
 */
async function deleteStudentRelatedData(tx: Prisma.TransactionClient, ids: string[]) {
    const [moduleData, mcqData, codeQuestionData, assessmentData, assessmentMcqData, assessmentCodeData, userCourses] =
        await Promise.all([
            tx.userModuleData.deleteMany({ where: { userId: { in: ids } } }),
            tx.userMCQData.deleteMany({ where: { userId: { in: ids } } }),
            tx.userCodeQuestionData.deleteMany({ where: { userId: { in: ids } } }),
            tx.userAssessmentData.deleteMany({ where: { userId: { in: ids } } }),
            tx.userAssessmentMCQData.deleteMany({ where: { userId: { in: ids } } }),
            tx.userAssessmentCodeData.deleteMany({ where: { userId: { in: ids } } }),
            tx.userCourse.deleteMany({ where: { userId: { in: ids } } }),
        ]);
    return {
        moduleData: moduleData.count,
        mcqData: mcqData.count,
        codeQuestionData: codeQuestionData.count,
        assessmentData: assessmentData.count,
        assessmentMcqData: assessmentMcqData.count,
        assessmentCodeData: assessmentCodeData.count,
        userCourses: userCourses.count,
    };
}

export const deletestudent = async (
    values: z.infer<typeof DeleteStudentSchema>
) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can delete students." };

    const uid = values.id;
    const student = await db.user.findUnique({ where: { id: uid }, select: { id: true } });
    if (!student) return { error: "Student not found." };

    await db.$transaction(async (tx) => {
        // Remove every related record first (course & assessment data +
        // course assignments), then the account itself.
        await deleteStudentRelatedData(tx, [uid]);
        await tx.user.delete({ where: { id: uid } });
    });
    revalidatePath("/admin/students")
    return { success: "Student Deleted !" }
}


export const updatestudent = async (
    values: z.infer<typeof StudentUpdateSchema>
) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can update students." };

    // Strip the id from the written data — it is only the where-key.
    const { id: uid, ...data } = values;
    await db.user.update({
        where: {
            id: uid
        },
        data,
    })

    // Deactivating a student must revoke their live sessions immediately
    // (the JWT is frozen for 30 days — tokenVersion bump invalidates it).
    if (values.isActive === false) {
        await bumpTokenVersion("user", uid);
    }

    revalidatePath("/admin/students")
    // revalidatePath("student")
    return { success: "Student Updated !" }
}


/**
 * Admin-side reset — issues a RANDOM one-time password instead of a shared
 * default. No current password needed (the admin is acting on someone
 * else's account), but the caller must be an authenticated admin. The OTP
 * is returned once in the success message and old sessions are revoked.
 */
export const resetpasswordstudent = async (
    values: z.infer<typeof StudentPasswordResetSchema>
) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can reset student passwords." };

    const uid = values.id;
    const student = await db.user.findUnique({
        where: { id: uid },
        select: { id: true },
    });
    if (!student) return { error: "Student not found." };

    const oneTimePassword = generateOneTimePassword();
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(oneTimePassword, salt);
    // const hashedPassword = await bcrypt.hash(password, 10)
    await db.user.update({
        where: {
            id: uid
        },
        data: {
            password: hashedPassword
        }
    })
    // Old sessions (JWT jv frozen at sign-in) must not survive a reset.
    await bumpTokenVersion("user", uid);

    return {
        success: `One-time password: ${oneTimePassword} — share it with the student now; it is not shown again.`,
    }
}



export const deletestudentsbulk = async (ids: string[]) => {
    const session = await requireAdmin();
    if (!session) return { error: "Only admins can delete students." };

    const validIds = (ids ?? []).filter(
        (id) => typeof id === "string" && id.trim().length > 0
    );
    if (validIds.length === 0) return { error: "No students selected." };

    // Only delete accounts that actually exist so counts stay honest.
    const existing = await db.user.findMany({
        where: { id: { in: validIds } },
        select: { id: true },
    });
    if (existing.length === 0) return { error: "No students selected." };
    const existingIds = existing.map((s) => s.id);

    await db.$transaction(async (tx) => {
        await deleteStudentRelatedData(tx, existingIds);
        await tx.user.deleteMany({ where: { id: { in: existingIds } } });
    });
    revalidatePath("/admin/students");
    return { success: `${existingIds.length} student(s) deleted.` };
}