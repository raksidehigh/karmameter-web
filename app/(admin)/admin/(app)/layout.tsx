import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { AdminShell } from "./_components/AdminShell";

export default async function AdminShellLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session?.totpVerified) redirect("/admin/login");

  return <AdminShell email={session.email}>{children}</AdminShell>;
}
