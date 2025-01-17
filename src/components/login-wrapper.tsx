import React from "react";
import { headers } from "next/headers";
import UserNav from "./user-nav";
import LoginButton from "./ui/login-button";
import { getServerSession } from "@/lib/auth/utils";

export async function LoginWrapper() {
  const session = await getServerSession();

  return (
    <React.Fragment>
      {session?.session ? <UserNav session={session} /> : <LoginButton />}
    </React.Fragment>
  );
}

function checkOptimisticSession(headers: Headers) {
  const guessIsSignIn =
    headers.get("cookie")?.includes("better-auth.session") ||
    headers.get("cookie")?.includes("__Secure-better-auth.session-token");
  return !!guessIsSignIn;
}

export async function LoginFallback() {
  //to avoid flash of unauthenticated state
  const guessIsSignIn = checkOptimisticSession(await headers());
  return (
    <React.Fragment>{guessIsSignIn ? null : <LoginButton />}</React.Fragment>
  );
}
