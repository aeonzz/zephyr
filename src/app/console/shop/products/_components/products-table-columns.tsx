"use client";

import * as React from "react";
import { type Product } from "@/db/schema";
import { type ColumnDef } from "@tanstack/react-table";
import {
  Ellipsis,
  Pencil,
  Trash,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { type ProductsTableRowAction } from "../_lib/utils";

interface GetColumnsProps {
  setRowAction: React.Dispatch<
    React.SetStateAction<ProductsTableRowAction<Product> | null>
  >;
}

export function getColumns({
  setRowAction,
}: GetColumnsProps): ColumnDef<Product>[] {
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
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            {/* <Badge variant="outline">{row.original.role}</Badge> */}
            <span className="max-w-[31.25rem] truncate">
              {row.getValue("name")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate">
              {row.getValue("category")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "color",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Colors" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-wrap gap-2">
            {row.original.color.map((color, index) => (
              <Badge key={index} variant="outline">
                {color}
              </Badge>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate">
              ₱ {row.original.price}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate">
              {row.getValue("description") ? (
                row.getValue("description")
              ) : (
                <span className="text-muted-foreground">---</span>
              )}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ cell }) => format(cell.getValue() as Date, "PP p"),
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        // const [isUpdatePending, startUpdateTransition] = React.useTransition();

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
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, type: "update" })}
              >
                <Pencil />
                Edit
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
