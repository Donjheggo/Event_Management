import SearchBar from "@/components/search-bar";
import FeedbacksTable from "@/components/feedbacks/feedbacks-table";

export default function Feedbacks({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="container max-w-screen-md mx-auto">
      <h1 className="text-center text-2xl">Feedbacks</h1>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <SearchBar />
        </div>
        <div className="mt-2">
          <FeedbacksTable searchQuery={searchQuery} page={page} />
        </div>
      </div>
    </div>
  );
}
