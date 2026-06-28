// app/(admin)/requireAdmin.ts

import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const requireAdmin = cache(async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role,email,avatar_url")
    .eq("id", user.id)
    .single();

  return {
    id: user.id,
    email: profile?.email,
    avatar_url: profile?.avatar_url,
    role: profile?.role,
  };
});
