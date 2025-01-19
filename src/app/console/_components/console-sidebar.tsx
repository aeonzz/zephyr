"use client";

import React from "react";

import {
  ShoppingCart,
  Package,
  Users,
  Tag,
  BarChart2,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const shopItems = [
  {
    title: "Dashboard",
    url: "/console/shop",
    icon: BarChart2,
  },
  {
    title: "Orders",
    url: "/console/shop/orders",
    icon: ShoppingCart,
  },
  {
    title: "Products",
    url: "/console/shop/products",
    icon: Package,
  },
  {
    title: "Customers",
    url: "/console/shop/customers",
    icon: Users,
  },
  {
    title: "Categories",
    url: "/console/shop/categories",
    icon: Tag,
  },
  {
    title: "Settings",
    url: "/console/shop/settings",
    icon: Settings,
  },
];

const appItems = [
  {
    title: "Users",
    url: "/console/app",
    icon: Users,
  },
];

interface ConsoleSidebar {
  route: "shop" | "app";
}

export default function ConsoleSidebar({ route }: ConsoleSidebar) {
  const pathname = usePathname();
  const items = route === "shop" ? shopItems : appItems;

  return (
    <Sidebar
      collapsible="none"
      className="min-h-[calc(100svh_-_45px)] border-r"
    >
      <SidebarContent>
        <SidebarGroup className="px-6">
          <SidebarGroupLabel>Shop Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url} prefetch>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
