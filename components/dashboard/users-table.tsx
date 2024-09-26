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
import { GetUsers } from "@/lib/actions/users";
import { Badge } from "../ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { MoveUpRight } from "lucide-react";

export default async function UsersTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [users] = await Promise.all([
    GetUsers(searchQuery, page, items_per_page),
  ]);

  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Users</CardTitle>
          <Link href="/dashboard/users">
            <Button variant="outline" className="flex items-center">
              View More
              <MoveUpRight size={18} className="ml-1"/>
            </Button>
          </Link>
        </div>
        <CardDescription>Manage users role.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead className="table-cell">Name</TableHead>
              <TableHead className="table-cell">Email</TableHead>
              <TableHead className="table-cell">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-full object-cover"
                    height="64"
                    src={item.image}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-semibold">{item.name}</TableCell>
                <TableCell className="font-normal">{item.email}</TableCell>
                <TableCell className="font-normal">
                  <Badge>{item.role} </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
