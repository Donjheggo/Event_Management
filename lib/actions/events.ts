"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export async function CreateEvent(form: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("events").insert([
      {
        name: form.get("name"),
        schedule: form.get("schedule"),
        status: "ACTIVE",
      },
    ]);

    if (error) {
      return { error: error.message };
    }
    revalidatePath("/events");
    revalidatePath("/dashboard/events");
    return { error: "" };
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}

export async function GetEvents(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("events")
      .select("*")
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

export async function TotalEvents() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("events")
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

export async function TotalActiveEvents() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq('status', 'ACTIVE')

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

export async function TotalCompletedEvents() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq('status', 'COMPLETED')

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


export async function DeleteEvent(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("events").delete().eq("id", id);

    if (error) {
      return { error: error };
    }
    revalidatePath("/events");
    revalidatePath("/dashboard/events");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetEventById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return false;
    }
    revalidatePath("/events");
    revalidatePath("/dashboard/events");
    return data;
  } catch (error) {
    return false;
  }
}

export async function UpdateEvent(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("events")
      .update({
        name: formData.get("name"),
        schedule: formData.get("schedule"),
        status: formData.get("status")
      })
      .eq("id", formData.get("id"))
      .select();

    if (error) {
      return { error: error };
    }
    revalidatePath("/events");
    revalidatePath("/dashboard/events");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}
