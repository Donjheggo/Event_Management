import { LayoutDashboard, UsersRound, CalendarDays } from "lucide-react";

export const dashboardLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    name: "Events",
    href: "/dashboard/events",
    icon: <UsersRound size={18} />,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: <CalendarDays size={18} />,
  },
];
