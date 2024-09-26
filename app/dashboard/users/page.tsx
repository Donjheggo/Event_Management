import UsersTable from "@/components/users/users-table";
import SearchBar from "@/components/search-bar";

export default function Users({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="container max-w-screen-md mx-auto">
      <h1 className="text-center text-2xl">Users</h1>
      <div className="mt-5">
        <SearchBar />
        <div className="mt-2">
          <UsersTable searchQuery={searchQuery} page={page} />
        </div>
      </div>
    </div>
  );
}
