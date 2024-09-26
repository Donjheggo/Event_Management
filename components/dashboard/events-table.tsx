import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetEvents } from "@/lib/actions/events";
import { FormatDateTime } from "@/lib/utils";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";
import { MoveUpRight } from "lucide-react";

export default async function EventsTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [services] = await Promise.all([
    GetEvents(searchQuery, page, items_per_page),
  ]);

  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Events</CardTitle>
          <Link href="/dashboard/events">
            <Button variant="outline" className="flex items-center">
              View More
              <MoveUpRight size={18} className="ml-1" />
            </Button>
          </Link>
        </div>
        <CardDescription>Manage events.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="table-cell">Name</TableHead>
              <TableHead className="table-cell">Schedule</TableHead>
              <TableHead className="table-cell">Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-semibold">{item.name}</TableCell>
                <TableCell className="font-normal">
                  <p>{FormatDateTime(new Date(item.schedule))}</p>
                </TableCell>
                <TableCell className="font-normal">
                  <Badge>{item.status} </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
