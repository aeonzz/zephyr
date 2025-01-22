"use client";

import React from "react";
import { type User } from "@/db/schema";
import { type Table } from "@tanstack/react-table";
import { Download, Loader2 } from "lucide-react";

import { exportTableToCSV } from "@/lib/export";
import { Button } from "@/components/ui/button";

interface UsersTableToolbarActionsProps {
  table: Table<User>;
}

export function UsersTableToolbarActions({
  table,
}: UsersTableToolbarActionsProps) {
  const [isPending, startTransition] = React.useTransition();
  return (
    <div className="flex items-center gap-2">
      {/* {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteTasksDialog
          tasks={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null} */}
      <Button
        variant="outline"
        size="sm"
        disabled={isPending}
        onClick={() => {
          startTransition(() => {
            exportTableToCSV(table, {
              filename: "tasks",
              excludeColumns: ["select", "actions"],
            });
          });
        }}
        className="gap-2"
      >
        {isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Download className="size-4" aria-hidden="true" />
        )}
        Export
      </Button>
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  );
}
