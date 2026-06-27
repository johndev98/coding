"use client";

import { createClient } from "@/lib/supabase/client";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function LoginModal({ open, onClose }: Props) {
  if (!open) return null;

  const handleLogin = async () => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-2 text-2xl font-bold">
          Đăng nhập
        </h2>

        <p className="mb-6 text-gray-500">
          Chào mừng bạn quay trở lại.
        </p>

        <button
          onClick={handleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-lg border px-4 py-3 transition hover:bg-gray-100"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-5 w-5"
          />

          Đăng nhập với Google
        </button>
      </div>
    </div>
  );
}