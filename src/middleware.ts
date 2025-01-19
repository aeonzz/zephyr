import { Session } from "@/lib/auth/auth-type";
import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";

export default async function authMiddleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  const protectedRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/verification",
    "/console",
  ];

  if (session && protectedRoutes.includes(request.nextUrl.pathname)) {
    if (
      session.user.role === "admin" &&
      request.nextUrl.pathname === "/console"
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    session?.user.role !== "admin" &&
    request.nextUrl.pathname === "/console"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/console",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/verfication",
  ],
};
