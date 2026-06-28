import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin-login");

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || !profile || profile.role !== "admin") {
    redirect("/admin-login");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-gray-50 p-4">
        <h2 className="mb-6 text-lg font-bold">Admin</h2>
        <nav className="space-y-2">
          <Link
            href="/admin"
            className="block rounded-md px-3 py-2 hover:bg-gray-200"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/users"
            className="block rounded-md px-3 py-2 hover:bg-gray-200"
          >
            Users
          </Link>
          <Link
            href="/admin/courses"
            className="block rounded-md px-3 py-2 hover:bg-gray-200"
          >
            Courses
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
