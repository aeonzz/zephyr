import React from "react";
import HomeNavbar from "@/app/_components/home-navbar";

export default function AppShell({
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div {...props}>
      <HomeNavbar />
      {children}
    </div>
  );
}
