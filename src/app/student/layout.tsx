import { auth } from "@/auth";
import StudentShell from "@/components/student-role/student-shell";

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <StudentShell
      name={session?.user?.name as string}
      email={session?.user?.email as string}
      image={session?.user?.image as string}
    >
      {children}
    </StudentShell>
  )
}
