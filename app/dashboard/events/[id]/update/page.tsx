// import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import UpdateEventForm from "@/components/events/update-form";
import { GetEventById } from "@/lib/actions/events";

export default async function UpdateEvent({
  params,
}: {
  params: { id: string };
}) {
  const event = await GetEventById(params.id);

  return (
    <div>
      <Link href="/dashboard/events" className="flex gap-2 hover:underline">
        <ArrowLeft />
        Back
      </Link>
      <h1 className="text-center text-2xl">Update Event</h1>
      <div className="mt-5">
        <UpdateEventForm item={event} />
      </div>
    </div>
  );
}
