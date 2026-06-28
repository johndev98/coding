// app/(auth)/admin-login/page.tsx

"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    // Đăng nhập
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Sai email hoặc mật khẩu");
      setLoading(false);
      return;
    }

    // Kiểm tra quyền
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profileError || profile?.role !== "admin") {
      await supabase.auth.signOut();

      setError("Bạn không có quyền truy cập trang quản trị");
      setLoading(false);
      return;
    }

    router.replace("/admin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-4 rounded-xl border p-6"
      >
        <h1 className="text-xl font-bold">Admin Login</h1>

        <input
          className="w-full border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button disabled={loading} className="w-full bg-black p-2 text-white">
          {loading ? "Đang đăng nhập..." : "Đăng nhập admin"}
        </button>
      </form>
    </div>
  );
}
