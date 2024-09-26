"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { SendHorizonal, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { CreateFeedback } from "@/lib/actions/feedbacks";
import { useUser } from "@/context/user-context";
import { useRef } from "react";

export default function CreateFeedbackForm({ event_id }: { event_id: string }) {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const messageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!formData.get("message")) {
      toast.error("You can't send blank comment. Write some message.");
    }
    setLoading(true);
    try {
      const { error } = await CreateFeedback(formData);
      if (error) {
        toast.error("Error: ", error);
        return;
      }
      if (messageInputRef.current) {
        messageInputRef.current.value = ""; 
      }
    } catch (error) {
      toast.error("Error: There was unexpected error sending feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input name="user_id" defaultValue={user?.id} hidden />
        <input name="event_id" defaultValue={event_id} hidden />
        <input name="name" defaultValue={user?.name} hidden />
        <Input
          ref={messageInputRef}
          name="message"
          placeholder="Write a feedback..."
          className="flex-1"
        />
        <Button disabled={loading} type="submit" size="icon">
          {loading ? (
            <Loader className="animate-spin h-4 w-4" />
          ) : (
            <SendHorizonal className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
}
