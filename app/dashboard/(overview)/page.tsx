import { Users, CalendarDays, CalendarCheck, PencilLine } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { TotalUsers } from "@/lib/actions/users";
import { TotalActiveEvents, TotalCompletedEvents } from "@/lib/actions/events";
import { TotalFeedbacks } from "@/lib/actions/feedbacks";
import EventsTable from "@/components/dashboard/events-table";
import UsersTable from "@/components/dashboard/users-table";

export default async function Dashboard() {
  const [totalUsers, totalActiveEvents, totalCompletedEvents, totalFeedbacks] =
    await Promise.all([
      TotalUsers(),
      TotalActiveEvents(),
      TotalCompletedEvents(),
      TotalFeedbacks(),
    ]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            {/* <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p> */}
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActiveEvents}</div>
            {/* <p className="text-xs text-muted-foreground">
              +19% from last month
            </p> */}
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Finished Events
            </CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompletedEvents}</div>
            {/* <p className="text-xs text-muted-foreground">
              +19% from last month
            </p> */}
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total User Feedbacks
            </CardTitle>
            <PencilLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFeedbacks}</div>
            {/* <p className="text-xs text-muted-foreground">
              +19% from last month
            </p> */}
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row gap-8">
        <div className="w-full">
          <EventsTable searchQuery="" page={1} />
        </div>
        <div className="w-full">
          <UsersTable searchQuery="" page={1} />
        </div>
      </div>
    </div>
  );
}
