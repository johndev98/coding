"use client";

import Link from "next/link";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { createClient } from "@/lib/supabase/client";

export default function Header({ user, profile }: { user: any; profile: any }) {
  const [open, setOpen] = useState(false);
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <>
      <header className="border-b">
        <nav className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/" className="text-xl font-bold">
            MyLogo
          </Link>

          <div className="flex items-center gap-8">
            <Link href="/">Trang chủ</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/courses">Khóa học</Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 rounded-full border px-3 py-1">
                  <img
                    src={
                      profile?.avatar_url ??
                      "https://www.gravatar.com/avatar/?d=mp"
                    }
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-sm">{profile?.email}</span>
                </button>

                <div className="absolute right-0 mt-2 hidden w-40 rounded-lg border bg-white shadow-md group-hover:block">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                    Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setOpen(true)}
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Đăng nhập
              </button>
            )}
          </div>
        </nav>
      </header>

      <LoginModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
