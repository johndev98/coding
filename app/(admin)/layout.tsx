// app/(admin)/layout.tsx

import { redirect } from "next/navigation";
import Link from "next/link";
import { requireAdmin } from "./requireAdmin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();
  if (!admin) {
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
