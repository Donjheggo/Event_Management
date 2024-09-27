import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetEvents, TotalEvents } from "@/lib/actions/events";
import { TablePagination } from "./pagination";
import { FormatDateTime } from "@/lib/utils";
import { Badge } from "../ui/badge";
import UpdateButton from "./update-button";
import DeleteButton from "./delete-button";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import AttendeesList from "./event-attendees-list";
import NotifyButton from "./nofity-button";

export default async function EventsTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [totalEvents, events] = await Promise.all([
    TotalEvents(),
    GetEvents(searchQuery, page, items_per_page),
  ]);

  const totalPages = Math.ceil(totalEvents / items_per_page);
  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <CardTitle>Events</CardTitle>
        <CardDescription>Manage events.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="table-cell">Name & Schedule</TableHead>
              <TableHead className="table-cell">Attendees</TableHead>
              <TableHead className="table-cell">Status</TableHead>
              <TableHead className="table-cell">Notify</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p>{FormatDateTime(new Date(item.schedule))}</p>
                </TableCell>
                <TableCell className="font-normal">
                  <AttendeesList event_id={item.id} />
                </TableCell>
                <TableCell className="font-normal">
                  <Badge variant="outline">{item.status}</Badge>
                </TableCell>
                <TableCell className="font-normal">
                  <NotifyButton event_name={item.name} />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <UpdateButton id={item.id} />
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <DeleteButton id={item.id} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>{(page - 1) * items_per_page + 1}</strong>-
          <strong>{Math.min(page * items_per_page, totalEvents)}</strong> of{" "}
          <strong>{totalEvents}</strong> events
        </div>
        <div className="ml-auto">
          <TablePagination totalPages={totalPages} />
        </div>
      </CardFooter>
    </Card>
  );
}
