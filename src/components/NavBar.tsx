"use client";

import logo from "@/assets/pixel-pycb.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, PlusCircle, UserRound } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <span className="flex h-16 w-full items-center justify-between">
      <Link
        className="flex flex-row items-center space-x-2"
        href="/"
        data-umami-event="NavBar - Home"
      >
        <Image src={logo} alt="logo" width={50} height={50} />
        <h1 className="text-4xl font-black tracking-wide text-primary">
          pyclashbot.app
        </h1>
      </Link>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              {session?.user?.image ? (
                <AvatarImage
                  src={session.user.image}
                  alt={session.user.name ?? "User Image"}
                />
              ) : (
                <AvatarFallback className="select-none">
                  {session?.user?.name?.[0]?.toUpperCase() ?? (
                    <UserRound className="h-5 w-5" />
                  )}
                </AvatarFallback>
              )}
            </Avatar>
          </DropdownMenuTrigger>
          <NavBarDropdownContent />
        </DropdownMenu>
      ) : (
        <Button asChild variant={"outline"}>
          <Link data-umami-event="NavBar - Plans" href="/plans">
            View Upgrades
          </Link>
        </Button>
      )}
    </span>
  );
}

function NavBarDropdownContent() {
  return (
    <DropdownMenuContent>
      <DropdownMenuItem data-umami-event="NavBar - Plans" asChild>
        <Link href="/plans">
          <PlusCircle className="mr-2 h-4 w-4" />
          <span>Upgrades</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={() => signOut({ callbackUrl: "/" })}
        data-umami-event="NavBar - Sign Out"
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
