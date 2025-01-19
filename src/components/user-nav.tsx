"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import React from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, User, UserCog } from "lucide-react";
import { signOut } from "@/lib/auth/client";
import type { Session } from "@/lib/auth/auth-type";
import { toast } from "sonner";
import Link from "next/link";

interface UserNavProps {
  session: Session;
}

export default function UserNav({ session }: UserNavProps) {
  const [isSignOut, setIsSignOut] = React.useState<boolean>(false);
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-9 cursor-pointer">
          <AvatarImage src={session.user.image ?? ""} />
          <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[200px]">
        <DropdownMenuLabel className="flex flex-col">
          {session.user.name}
          <span className="text-xs text-muted-foreground">
            {session.user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User />
          Profile
        </DropdownMenuItem>
        <Link href="/console/shop" prefetch>
          <DropdownMenuItem>
            <UserCog />
            Console
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={async (e) => {
            e.preventDefault();
            setIsSignOut(true);
            await signOut({
              fetchOptions: {
                onSuccess() {
                  router.refresh();
                },
                onError(ctx) {
                  setIsSignOut(false);
                  toast.error(ctx.error.message);
                },
              },
            });
          }}
          disabled={isSignOut}
        >
          {isSignOut ? <Loader2 className="animate-spin" /> : <LogOut />}
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
