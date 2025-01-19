import React from "react";
import { SidebarProvider } from "../ui/sidebar";
import ConsoleSidebar from "@/app/console/_components/console-sidebar";
import ConsoleHeader from "@/app/console/_components/console-header";

interface ConsoleShellProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  route: "shop" | "app";
}

export default function ConsoleShell({
  children,
  defaultOpen,
  route,
}: ConsoleShellProps) {
  return (
    <div>
      <ConsoleHeader />
      <SidebarProvider
        defaultOpen={defaultOpen}
        className="min-h-[calc(100svh_-_45px)]"
      >
        <ConsoleSidebar route={route} />
        <main className="w-full">
          <div className="container py-3">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
