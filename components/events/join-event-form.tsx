"use client";

import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { useUser } from "@/context/user-context";
import { JoinEvent } from "@/lib/actions/events";
import { CheckUserJoinStatus } from "@/lib/actions/events";
import { createClient } from "@/lib/supabase/client";

export default function JoinEventForm({ event_id }: { event_id: string }) {
  const { user } = useUser();
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [joinStatus, setJoinStatus] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setLoading(true);
    try {
      const { error } = await JoinEvent(formData);
      if (error) {
        toast.error(`${error}`);
        return;
      }
      setJoinStatus(true)
    } catch (error) {
      toast.error("There was unexpected error sending feedback.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStatus = async () => {
    if (user?.id) {
      const response = await CheckUserJoinStatus(event_id, user.id);
      if (response) setJoinStatus(response);
    }
  };

  useEffect(() => {
    fetchUserStatus();

    const subscription = supabase
      .channel("public:event_attendees")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "event_attendees" },
        fetchUserStatus
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user?.id, event_id]);

  return (
    <div className={`${joinStatus ? "hidden" : ""} mt-4`}>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input name="user_id" defaultValue={user?.id} hidden />
        <input name="event_id" defaultValue={event_id} hidden />
        <Button disabled={loading} type="submit" size="icon" className="w-full">
          {loading ? <Loader className="animate-spin h-4 w-4" /> : "Join Event"}
        </Button>
      </form>
    </div>
  );
}
