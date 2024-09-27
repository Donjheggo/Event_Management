import Image from "next/image";
import placeholder from "@/app/auth.png";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data) {
    redirect("/");
  }

  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center py-12">{children}</div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={placeholder}
          alt="Image"
          width="1920"
          height="1080"
          className="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
