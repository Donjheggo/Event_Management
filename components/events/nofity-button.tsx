"use client";

import { sendEmail } from "@/lib/actions/email";
import { Bell, Loader } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { useState } from "react";

export default function NotifyButton({ event_name }: { event_name: string }) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleNotify = async () => {
    try {
      setLoading(true);
      const { success, error } = await sendEmail(
        `New Event Posted: ${event_name}`
      );
      if (error) {
        toast.error(`${error}`);
      }
      toast.success(`${success}`);
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      variant="default"
      onClick={handleNotify}
      type="submit"
      className="flex items-center"
    >
      {loading ? (
        <Loader className="animate-spin" />
      ) : (
        <>
          <Bell className="mr-2" size={20} />
          <h1 className="text-base">Notify</h1>
        </>
      )}
    </Button>
  );
}
