"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, AlignLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggler } from "../themes/theme-toggler";
import { Button } from "../ui/button";
import { adminLinks, userLinks } from "./sidenav";
import { signout } from "@/lib/actions/auth-action";
import placeholder from "@/app/user.png";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/context/user-context";

export default function Header() {
  const { loading, user } = useUser();
  if (loading) return;

  return (
    <header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <AlignLeft className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col item-start w-[250px]"
        >
          <nav className="grid items-start text-sm font-medium">
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
              <h1 className="text-md">{user?.name}</h1>
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
        </SheetContent>
      </Sheet>

      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hover:cursor-pointer">
            <Button variant="outline" size="icon" className="rounded-full">
              <Image
                src={user?.image || placeholder}
                alt="user-avatar"
                height={40}
                width={40}
                className="rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="hover:cursor-pointer" asChild>
              <ThemeToggler>
                <span className="font-normal opacity-95 dark:opacity-100">
                  Theme
                </span>
              </ThemeToggler>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <form action={signout}>
              <button type="submit" className="w-full">
                <DropdownMenuItem className="hover:cursor-pointer flex gap-2">
                  <LogOut />
                  Logout
                </DropdownMenuItem>
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
