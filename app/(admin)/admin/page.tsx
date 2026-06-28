// app/(admin)/admin/page.tsx

import LogoutButton from "../ui/LogoutButton";
import { requireAdmin } from "../requireAdmin";

export default async function AdminPage() {
  console.log("PAGE: before requireAdmin");
  const admin = await requireAdmin();
  console.log("PAGE: after requireAdmin", admin);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="rounded-xl border p-6 flex items-center gap-4">
        <img
          src={admin?.avatar_url ?? "https://www.gravatar.com/avatar/?d=mp"}
          className="h-16 w-16 rounded-full"
        />
        <div>
          <p className="text-sm text-gray-500">Role: {admin?.role}</p>

          <p className="text-sm text-gray-500">{admin?.email}</p>
        </div>
      </div>
      <LogoutButton />
    </div>
  );
}
