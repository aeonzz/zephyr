"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function ConsoleHeader() {
  const pathname = usePathname();
  return (
    <header className="z-50 w-full border-b bg-background/95 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <Link href="/">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold text-primary">Zephyr</span>
            </div>
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link
              href="/console/shop"
              className={cn(
                "transition-colors hover:text-foreground",
                pathname.includes("/console/shop")
                  ? "text-foreground"
                  : "text-foreground/80"
              )}
            >
              Shop
            </Link>
            <Link
              href="/console/app"
              className={cn(
                "transition-colors hover:text-foreground",
                pathname.includes("/console/app")
                  ? "text-foreground"
                  : "text-foreground/80"
              )}
            >
              App
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
