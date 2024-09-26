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
import { GetFeedbacks, TotalFeedbacks } from "@/lib/actions/feedbacks";
import { TablePagination } from "./pagination";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import DeleteButton from "./delete-button";
import Image from "next/image";

export default async function FeedbacksTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [totalFeedbacks, feedbacks] = await Promise.all([
    TotalFeedbacks(),
    GetFeedbacks(searchQuery, page, items_per_page),
  ]);

  const totalPages = Math.ceil(totalFeedbacks / items_per_page);
  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <CardTitle>Feedbacks</CardTitle>
        <CardDescription>Manage users feedbacks.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead className="table-cell">Name</TableHead>
              <TableHead className="table-cell">Event</TableHead>
              <TableHead className="table-cell">Message</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedbacks?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-semibold">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-full object-cover"
                    height="64"
                    src={item.user_id.image}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-semibold">
                  {item.user_id.name} <br />
                  <span className="font-normal">{item.user_id.email}</span>
                </TableCell>
                <TableCell className="font-semibold">
                  {item.event_id.name}
                </TableCell>
                <TableCell className="font-normal">{item.message}</TableCell>
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
          <strong>{Math.min(page * items_per_page, totalFeedbacks)}</strong> of{" "}
          <strong>{totalFeedbacks}</strong> events
        </div>
        <div className="ml-auto">
          <TablePagination totalPages={totalPages} />
        </div>
      </CardFooter>
    </Card>
  );
}
