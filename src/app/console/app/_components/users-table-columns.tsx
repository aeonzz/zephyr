"use client";

import * as React from "react";
import { type User } from "@/db/schema";
import { type ColumnDef } from "@tanstack/react-table";
import { Ban, CircleCheck, CircleX, Ellipsis, Trash } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { type UserTableRowAction } from "../_lib/utils";

interface GetColumnsProps {
  setRowAction: React.Dispatch<
    React.SetStateAction<UserTableRowAction<User> | null>
  >;
}

export function getColumns({
  setRowAction,
}: GetColumnsProps): ColumnDef<User>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <Avatar className="size-6">
              <AvatarImage src={row.original.image ?? ""} />
              <AvatarFallback>{row.original.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("email")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            {/* <Badge variant="outline">{row.original.role}</Badge> */}
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("name")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "emailVerified",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email Verified" />
      ),
      cell: ({ row }) => {
        const value = row.original.emailVerified;
        const Icon = value ? CircleCheck : CircleX;
        return (
          <div className="flex w-[6.25rem] items-center">
            <Icon
              className={cn(
                "mr-2 size-4 text-muted-foreground",
                value ? "text-green-500" : "text-destructive"
              )}
              aria-hidden="true"
            />
            <span className="capitalize">
              {value ? "Verified" : "Unverified"}
            </span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "banned",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Banned" />
      ),
      cell: ({ row }) => {
        return (
          <Badge variant="outline">{row.original.banned ? "Yes" : "No"}</Badge>
        );
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "banReason",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ban Reason" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("banReason") ?? (
                <span className="text-muted-foreground">---</span>
              )}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "banExpires",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ban Expires" />
      ),
      cell: ({ cell }) => {
        const date = cell.getValue()
          ? format(cell.getValue() as Date, "PP p")
          : undefined;
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {date ?? <span className="text-muted-foreground">---</span>}
            </span>
          </div>
        );
      },
    },
    // {
    //   accessorKey: "priority",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Priority" />
    //   ),
    //   cell: ({ row }) => {
    //     const priority = tasks.priority.enumValues.find(
    //       (priority) => priority === row.original.priority
    //     );

    //     if (!priority) return null;

    //     const Icon = getPriorityIcon(priority);

    //     return (
    //       <div className="flex items-center">
    //         <Icon
    //           className="mr-2 size-4 text-muted-foreground"
    //           aria-hidden="true"
    //         />
    //         <span className="capitalize">{priority}</span>
    //       </div>
    //     );
    //   },
    //   filterFn: (row, id, value) => {
    //     return Array.isArray(value) && value.includes(row.getValue(id));
    //   },
    // },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ cell }) => format(cell.getValue() as Date, "PP"),
    },
    {
      id: "actions",
      cell: function Cell({ row }) {

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex size-8 p-0 data-[state=open]:bg-muted"
              >
                <Ellipsis className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40"
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              {/* <DropdownMenuItem
                onSelect={() => setRowAction({ row, type: "update" })}
              >
                <Pencil />
                Edit
              </DropdownMenuItem> */}
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, type: "ban" })}
                disabled={row.original.banned === true}
              >
                <Ban />
                Ban
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, type: "delete" })}
                className="focus:bg-destructive"
              >
                <Trash />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 40,
    },
  ];
}
