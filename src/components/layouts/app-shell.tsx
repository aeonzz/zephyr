import React from "react";
import SiteHeader from "@/app/_components/site-header";

interface AppShellProps extends React.ComponentProps<"div"> {
  someProps?: string;
}

export default function AppShell({ children, ...props }: AppShellProps) {
  return (
    <div {...props}>
      <SiteHeader />
      {children}
    </div>
  );
}
