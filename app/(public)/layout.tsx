import Header from "@/components/Header";
import { createClient } from "@/lib/supabase/server";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Header user={user} />
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </>
  );
}