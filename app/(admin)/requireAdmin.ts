// app/(admin)/requireAdmin.ts

import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const requireAdmin = cache(async () => {
  console.log(">>> ENTER requireAdmin");

  const supabase = await createClient();

  console.log(">>> BEFORE auth.getUser");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(">>> AFTER auth.getUser", !!user);

  if (!user) {
    console.log(">>> RETURN NULL");
    return null;
  }

  console.log(">>> BEFORE profiles");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role,email,avatar_url")
    .eq("id", user.id)
    .single();

  console.log(">>> AFTER profiles");

  return {
    id: user.id,
    email: profile?.email,
    avatar_url: profile?.avatar_url,
    role: profile?.role,
  };
});
