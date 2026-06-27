
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "../ui/LogoutButton";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name, avatar_url, email")
    .eq("id", user?.id)
    .single();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="rounded-xl border p-6 flex items-center gap-4">
        <img
          src={profile?.avatar_url || "https://www.gravatar.com/avatar/?d=mp"}
          className="h-16 w-16 rounded-full"
        />

        <div>
          <p className="text-lg font-semibold">
            {profile?.full_name || user?.email}
          </p>

          <p className="text-sm text-gray-500">Role: {profile?.role}</p>

          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      <LogoutButton />
    </div>
  );
}
