import { createClient } from "../supabase/server";

export async function GetEventAttendees(event_id: string) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("event_attendees")
      .select("*")
      .eq("event_id", event_id);

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
