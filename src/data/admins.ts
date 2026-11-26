import { db } from "@/lib/db";

/** All admin accounts (super admin management table — no password hashes). */
export const getAllAdmins = async () => {
    try {
        return await db.admin.findMany({
            select: { id: true, name: true, email: true },
            orderBy: { email: "asc" },
        });
    } catch {
        return [];
    }
};
