import EventCard from "@/components/events/event-card";
import { GetEvents } from "@/lib/actions/events";

export default async function Events() {
  const events = await GetEvents("", 1, 10);

  return (
    <div className="container max-w-[600px] mx-auto">
      <div className="flex flex-col gap-4 mt-4">
        {events.map((item, index) => (
          <EventCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
}
