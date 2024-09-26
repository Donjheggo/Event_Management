"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { UpdateEvent } from "@/lib/actions/events";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tables } from "@/database.types";

export default function UpdateEventForm({ item }: { item: EventT }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!formData.get("name") || !formData.get("schedule")) {
      toast.error("Please fill in all the required fields correctly.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await UpdateEvent(formData);
      if (error) {
        toast.error(error.toString());
      }
      router.push("/dashboard/events");
    } catch (error) {
      toast.error("There was an unexpected error creating the event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 mt-5 container max-w-screen-sm mx-auto">
        <div className="grid gap-2">
          <Label htmlFor="name">Event name</Label>
          <input
            name="id"
            id="id"
            type="text"
            placeholder="Event name"
            required
            defaultValue={item.id}
            hidden
          />
          <Input
            name="name"
            id="name"
            type="text"
            placeholder="Event name"
            required
            defaultValue={item.name}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="schedule">Schedule</Label>
          <Input
            name="schedule"
            id="schedule"
            type="datetime-local"
            placeholder=""
            defaultValue={new Date(item.schedule).toISOString().slice(0, 16)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="schedule">Status</Label>
          <Select name="status" defaultValue={item.status}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
}

export type EventT = Tables<"events">;
