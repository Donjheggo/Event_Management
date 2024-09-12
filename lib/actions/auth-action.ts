"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const url_callback =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/auth/callback"
    : "https://event-management-khaki-omega.vercel.app/auth/callback";

export async function signinWithGoogle() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: url_callback,
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
