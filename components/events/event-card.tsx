import type { EventT } from "./create-dialog";
import { FormatDateTime } from "@/lib/utils";
import { GetEventAttendees } from "@/lib/actions/attendees";
import { CalendarClock, UsersRound } from "lucide-react";
import { GetFeedbacksByEventId } from "@/lib/actions/feedbacks";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import CreateFeedbackForm from "../feedbacks/create-feedback-form";
import JoinEventForm from "./join-event-form";

export default async function EventCard({ item }: { item: EventT }) {
  const [attendees, feedbacks] = await Promise.all([
    GetEventAttendees(item?.id || ""),
    GetFeedbacksByEventId(item?.id || ""),
  ]);

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-primary">{item.name}</h1>
      </div>
      <div className="flex items-center mt-4">
        <div className="flex items-center">
          <CalendarClock size={18} className="mr-2" />
          <h1>{FormatDateTime(new Date(item.schedule))}</h1>
        </div>
        <Badge variant="outline" className="ml-auto">
          {item.status}
        </Badge>
      </div>
      <p className="flex items-center">
        <UsersRound size={18} className="mr-2" />
        <span>Attendees: {attendees?.length}</span>
      </p>
      <div className="space-y-4 mt-5 border-t pt-4">
        {feedbacks?.reverse().map((item, index) => (
          <div key={index} className="flex space-x-2">
            <Avatar>
              <AvatarImage src={item.user_id.image} alt="user" />
              <AvatarFallback>O</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold">{item.user_id.name}</p>
              <p>{item.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <CreateFeedbackForm event_id={item?.id || ""} />
      </div>
      <div className="mt-4 w-full">
        <JoinEventForm event_id={item?.id || ""}/>
      </div>
    </div>
  );
}
