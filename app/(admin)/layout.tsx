import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ❌ chưa login → qua trang login admin
  if (!user) {
    redirect("/admin-login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  // ❌ không phải admin → thoát khỏi /admin
  if (profile?.role !== "admin") {
    redirect("/admin-login"); // hoặc redirect("/")
  }

  return (
    <div>
      <div className="border-b p-4 font-bold">
        Admin Dashboard
      </div>

      {children}
    </div>
  );
}