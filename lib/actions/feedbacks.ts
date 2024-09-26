"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export async function GetFeedbacks(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("feedbacks")
      .select(`*, event_id (name), user_id (email, name, image)`)
      .order("created_at", { ascending: false })
      .range((page - 1) * items_per_page, page * items_per_page - 1);

    const { data, error } = searchQuery
      ? await query.ilike("name", `%${searchQuery}%`)
      : await query;

    if (error) {
      console.error(error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function TotalFeedbacks() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("feedbacks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return 0;
    }

    return data.length || 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

export async function DeleteFeedback(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("feedbacks").delete().eq("id", id);

    if (error) {
      return { error: error };
    }
    revalidatePath("/feedbacks");
    revalidatePath("/dashboard/feedbacks");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}
