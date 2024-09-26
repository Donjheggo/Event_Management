import { GetEventAttendees } from "@/lib/actions/attendees";

export default async function AttendeesList({
  event_id,
}: {
  event_id: string;
}) {
  const attendees = await GetEventAttendees(event_id);

  return (
    <div>
      {attendees.map((item, index) => (
        <p key={index}>{item.user_id.name}</p>
      ))}
    </div>
  );
}
