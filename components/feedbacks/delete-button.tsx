import { TrashIcon } from "lucide-react";
import { DeleteFeedback } from "@/lib/actions/feedbacks";

export default function DeleteButton({ id }: { id: string }) {
  const deleteEventById = DeleteFeedback.bind(null, id);

  return (
    <form action={deleteEventById} className="cursor-pointer w-full">
      <button type="submit">
        <span className="flex items-center gap-2 text-base text-red-500">
          <TrashIcon width={20} /> Delete
        </span>
      </button>
    </form>
  );
}
