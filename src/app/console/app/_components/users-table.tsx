"use client";

import * as React from "react";
import { type User } from "@/db/schema";
import type {
  DataTableAdvancedFilterField,
  DataTableFilterField,
} from "@/types";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableAdvancedToolbar } from "@/components/data-table/data-table-advanced-toolbar";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import type {
  getUserBannedCounts,
  getUsers,
  getUserVerifiedCounts,
} from "../_lib/queries";
import { getColumns } from "./users-table-columns";
import { UsersTableFloatingBar } from "./users-table-floating-bar";
import { UsersTableToolbarActions } from "./users-table-toolbar-actions";
import { useFeatureFlags } from "@/components/providers/feature-flags-provider";
import { type UserTableRowAction } from "../_lib/utils";
import BanUserDialog from "./ban-user-dialog";

interface UsersTableProps {
  promises: Promise<
    [
      Awaited<ReturnType<typeof getUsers>>,
      Awaited<ReturnType<typeof getUserBannedCounts>>,
      Awaited<ReturnType<typeof getUserVerifiedCounts>>,
    ]
  >;
}

export function UsersTable({ promises }: UsersTableProps) {
  const { featureFlags } = useFeatureFlags();

  const [{ data, pageCount }, getUserBannedCounts, getUserVerifiedCounts] =
    React.use(promises);

  const [rowAction, setRowAction] =
    React.useState<UserTableRowAction<User> | null>(null);

  const columns = React.useMemo(
    () => getColumns({ setRowAction }),
    [setRowAction]
  );

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  const filterFields: DataTableFilterField<User>[] = [
    {
      id: "name",
      label: "Name",
      placeholder: "Filter names...",
    },
    {
      id: "banned",
      label: "Banned",
      options: [
        {
          label: "Yes",
          value: "true",
          count: getUserBannedCounts["true"],
        },
        {
          label: "No",
          value: "false",
          count: getUserBannedCounts["false"],
        },
      ],
    },
    {
      id: "emailVerified",
      label: "Verified",
      options: [
        {
          label: "Verified",
          value: "true",
          count: getUserVerifiedCounts["true"],
        },
        {
          label: "Unverified",
          value: "false",
          count: getUserVerifiedCounts["false"],
        },
      ],
    },
  ];

  /**
   * Advanced filter fields for the data table.
   * These fields provide more complex filtering options compared to the regular filterFields.
   *
   * Key differences from regular filterFields:
   * 1. More field types: Includes 'text', 'multi-select', 'date', and 'boolean'.
   * 2. Enhanced flexibility: Allows for more precise and varied filtering options.
   * 3. Used with DataTableAdvancedToolbar: Enables a more sophisticated filtering UI.
   * 4. Date and boolean types: Adds support for filtering by date ranges and boolean values.
   */
  const advancedFilterFields: DataTableAdvancedFilterField<User>[] = [
    {
      id: "email",
      label: "Email",
      type: "text",
    },
    {
      id: "name",
      label: "Name",
      type: "text",
    },
    {
      id: "emailVerified",
      label: "Email verified",
      type: "boolean",
    },
    {
      id: "banned",
      label: "Banned",
      type: "boolean",
    },
    {
      id: "banReason",
      label: "Ban reason",
      type: "text",
    },
    {
      id: "banExpires",
      label: "Ban expires",
      type: "date",
    },
    {
      id: "createdAt",
      label: "Created at",
      type: "date",
    },
  ];

  const enableAdvancedTable = featureFlags.includes("advancedTable");

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
    enableAdvancedFilter: enableAdvancedTable,
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <>
      <DataTable
        table={table}
        floatingBar={<UsersTableFloatingBar table={table} />}
      >
        {enableAdvancedTable ? (
          <DataTableAdvancedToolbar
            table={table}
            filterFields={advancedFilterFields}
            shallow={false}
          >
            <UsersTableToolbarActions table={table} />
          </DataTableAdvancedToolbar>
        ) : (
          <DataTableToolbar table={table} filterFields={filterFields}>
            <UsersTableToolbarActions table={table} />
          </DataTableToolbar>
        )}
      </DataTable>
      <BanUserDialog
        open={rowAction?.type === "ban"}
        onOpenChange={() => setRowAction(null)}
        user={rowAction?.row.original ?? null}
      />
    </>
  );
}
