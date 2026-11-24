import { auth } from "@/auth";
import UserEdit from "@/components/student-role/settings/user-edit";
import UserPassword from "@/components/student-role/settings/user-password";
import { getUserById } from "@/data/student/user";
import { GraduationCap, ImagePlus, Link2, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TopbarTitle } from "@/components/topbar-title";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const getSessionUserID = async () => {
  const session = await auth();
  return session?.user?.id
}

const Settings = async () => {
  const uid = await getSessionUserID();
  if (uid === undefined) {
    return null;
  }
  const student = await getUserById(uid)
  const studentx = {
    id: uid,
    name: student?.name as string,
    department: student?.department as string,
    batch: student?.batch as string,
    phone: student?.phone as string,
    rollnumber: student?.rollnumber as string,
    github: student?.github as string,
    linkedin: student?.linkedin as string,
    email: student?.email as string,
    section: student?.section as string
  };

  const detailRows = [
    { label: "Roll Number", value: studentx.rollnumber || "—" },
    { label: "Batch", value: studentx.batch || "—" },
    { label: "Department", value: studentx.department ? studentx.department.toUpperCase() : "—" },
    { label: "Section", value: studentx.section ? studentx.section.toUpperCase() : "—" },
    { label: "Phone", value: studentx.phone || "—", icon: <Phone className="h-4 w-4" /> },
    { label: "Email", value: studentx.email || "—", icon: <Mail className="h-4 w-4" /> },
  ]

  return (
    // Same content-span spacing rule as /admin/settings: p-4 (mobile) /
    // md:p-8 (desktop) padding from the top bar and sidebar, full-width
    // column of cards with a consistent gap.
    <div className="flex h-full w-full flex-1 flex-col gap-6 p-4 pb-8 md:p-8">
      <TopbarTitle>Settings</TopbarTitle>

      {/* ---------------- Profile — full-width card (admin pattern) -------- */}
      <Card>
        <div className="h-20 w-full rounded-t-lg bg-gradient-to-r from-purple-500 to-fuchsia-600" />
        <CardContent className="pb-6">
          <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end">
            <Image
              src="https://ik.imagekit.io/atominc/academy-mini-bg-z-grad.webp"
              alt={`${studentx.name ?? "Student"} avatar`}
              width={80}
              height={80}
              className="h-20 w-20 rounded-full border-4 border-white bg-slate-200/90 object-cover shadow-lg dark:border-card dark:bg-slate-600/90"
            />
            <div className="flex-1 sm:pb-1">
              <h2 className="text-xl font-bold">{studentx.name}</h2>
              <p className="text-sm text-muted-foreground">
                {studentx.rollnumber || studentx.email}
                {studentx.batch && studentx.department
                  ? ` · ${studentx.batch} ${studentx.department.toUpperCase()}${studentx.section ? ` ${studentx.section.toUpperCase()}` : ""}`
                  : ""}
              </p>
            </div>
            <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:flex-shrink-0">
              <span
                aria-hidden
                className="inline-flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-md border bg-muted text-muted-foreground"
                title="Profile picture upload coming soon"
              >
                <ImagePlus className="h-5 w-5" />
              </span>
              <UserEdit student={studentx} />
              <UserPassword uid={studentx.id} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ---------------- Student details --------------------------------- */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-purple-600" aria-hidden />
            Student Details
          </CardTitle>
          <CardDescription>
            Academic and contact information on your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid w-full gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {detailRows.map((row) => (
              <div
                key={row.label}
                className="flex min-w-0 flex-col gap-1 rounded-md border bg-muted/40 px-4 py-3"
              >
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {row.label}
                </dt>
                <dd className="flex min-w-0 items-center gap-2 truncate text-sm font-medium">
                  {row.icon}
                  <span className="truncate">{row.value}</span>
                </dd>
              </div>
            ))}
            {(studentx.github || studentx.linkedin) && (
              <div className="flex min-w-0 flex-col gap-1 rounded-md border bg-muted/40 px-4 py-3 sm:col-span-2 lg:col-span-1">
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Profiles
                </dt>
                <dd className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium">
                  {studentx.github && (
                    <Link
                      href={studentx.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 truncate text-primary hover:underline"
                    >
                      <Link2 className="h-4 w-4 flex-shrink-0" /> GitHub
                    </Link>
                  )}
                  {studentx.linkedin && (
                    <Link
                      href={studentx.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 truncate text-primary hover:underline"
                    >
                      <Link2 className="h-4 w-4 flex-shrink-0" /> LinkedIn
                    </Link>
                  )}
                </dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}

export default Settings
