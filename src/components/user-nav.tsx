"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { LoaderCircle, LogOut, User } from "lucide-react";
import { signOut } from "@/lib/auth/client";
import type { Session } from "@/lib/auth/auth-type";

interface UserNavProps {
  session: Session;
}

export default function UserNav({ session }: UserNavProps) {
  const [isSignOut, setIsSignOut] = React.useState<boolean>(false);
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar className="size-6 rounded-md">
            <AvatarImage src={session.user.image ?? ""} />
            <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <User />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={async (e) => {
            e.preventDefault();
            setIsSignOut(true);
            await signOut({
              fetchOptions: {
                onSuccess() {
                  router.refresh();
                  setIsSignOut(false);
                },
                onError() {
                  setIsSignOut(false);
                },
              },
            });
          }}
          disabled={isSignOut}
        >
          {isSignOut ? <LoaderCircle /> : <LogOut />}
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
