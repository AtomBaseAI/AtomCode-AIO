import { PrismaClient } from "@prisma/client";
import { genSaltSync, hashSync } from "bcrypt-ts";
const db = new PrismaClient();
async function main() {
  const salt = genSaltSync(10);
  const password = hashSync("Admin@Atom", salt);
  const admin = await db.admin.upsert({
    where: { email: "admin@atom.com" },
    update: { password },
    create: { email: "admin@atom.com", name: "Atom Admin", password },
  });
  console.log("Admin user ready:", admin.email);
}
main().then(() => db.$disconnect()).catch(async (e) => { console.error(e); await db.$disconnect(); process.exit(1); });
