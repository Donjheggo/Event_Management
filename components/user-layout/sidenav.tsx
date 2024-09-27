"use client";

import {
  LogOut,
  LayoutDashboard,
  CalendarDays,
  UsersRound,
  PencilLine,
} from "lucide-react";
import { ThemeToggler } from "../themes/theme-toggler";
import { signout } from "@/lib/actions/auth-action";
import placeholder from "@/app/user.png";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/context/user-context";
import favicon from "@/app/favicon.ico"


export default function Sidenav() {
  const { loading, user } = useUser();
  if (loading) return;

  return (
    <aside className="hidden border-r md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 py-5 lg:h-[60px] lg:px-6 ">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold"
          >
            <Image src={favicon} alt="logo" width={30} height={30}/>
            <span className="text-base">SNSU Event Management</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/"
              className="flex items-center gap-2 hover:bg-muted rounded-md p-2"
            >
              <Image
                src={user?.image || placeholder}
                alt="user-avatar"
                height={35}
                width={35}
                className="rounded-full"
              />
              <h1 className="text-sm">{user?.name}</h1>
            </Link>
            <div className="mt-2">
              <p className="text-sm font-medium text-muted-foreground pb-2 max-w-[248px] truncate">
                Pages
              </p>
              {userLinks.map((item, index) => (
                <Link
                  href={item.href}
                  key={index}
                  className="flex items-center gap-2 hover:bg-muted rounded-md p-2"
                >
                  {item.icon}
                  <h1 className="text-md">{item.name}</h1>
                </Link>
              ))}
            </div>

            {user?.role === "ADMIN" && (
              <div className="mt-2">
                <p className="text-sm font-medium text-muted-foreground pb-2 max-w-[248px] truncate">
                  Admin
                </p>
                {adminLinks.map((item, index) => (
                  <Link
                    href={item.href}
                    key={index}
                    className="flex items-center gap-2 hover:bg-muted rounded-md p-2"
                  >
                    {item.icon}
                    <h1 className="text-md">{item.name}</h1>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-2">
              <p className="text-sm font-medium text-muted-foreground pb-2 max-w-[248px] truncate">
                Settings
              </p>
              <div className="flex items-center gap-2">
                <ThemeToggler>Theme</ThemeToggler>
              </div>
              <form action={signout}>
                <button
                  type="submit"
                  className="text-md flex items-center gap-2 hover:bg-muted rounded-md p-2 w-full"
                >
                  <LogOut />
                  Logout
                </button>
              </form>
            </div>
          </nav>
        </div>
      </div>
    </aside>
  );
}

export const adminLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    name: "Events",
    href: "/dashboard/events",
    icon: <CalendarDays />,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: <UsersRound />,
  },
  {
    name: "Feedbacks",
    href: "/dashboard/feedbacks",
    icon: <PencilLine />,
  },
];

export const userLinks = [
  {
    name: "Events",
    href: "/",
    icon: <CalendarDays />,
  },
];
