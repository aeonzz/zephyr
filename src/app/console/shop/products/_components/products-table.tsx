"use client";

import * as React from "react";
import { type Product } from "@/db/schema";
import type {
  DataTableAdvancedFilterField,
  DataTableFilterField,
} from "@/types";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableAdvancedToolbar } from "@/components/data-table/data-table-advanced-toolbar";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import type { getProducts } from "../_lib/queries";
import { getColumns } from "./products-table-columns";
import { ProductsTableFloatingBar } from "./products-table-floating-bar";
import { ProductsTableToolbarActions } from "./products-table-toolbar-actions";
import { useFeatureFlags } from "@/components/providers/feature-flags-provider";
import { type ProductsTableRowAction } from "../_lib/utils";
import UpdateProductSheet from "./update-product-sheet";

interface ProductsTableProps {
  promises: Promise<[Awaited<ReturnType<typeof getProducts>>]>;
}

export function ProductsTable({ promises }: ProductsTableProps) {
  const { featureFlags } = useFeatureFlags();

  const [{ data, pageCount }] = React.use(promises);

  const [rowAction, setRowAction] =
    React.useState<ProductsTableRowAction<Product> | null>(null);

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
  const filterFields: DataTableFilterField<Product>[] = [
    {
      id: "name",
      label: "Name",
      placeholder: "Filter names...",
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
  const advancedFilterFields: DataTableAdvancedFilterField<Product>[] = [
    {
      id: "name",
      label: "Name",
      type: "text",
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
        floatingBar={<ProductsTableFloatingBar table={table} />}
      >
        {enableAdvancedTable ? (
          <DataTableAdvancedToolbar
            table={table}
            filterFields={advancedFilterFields}
            shallow={false}
          >
            <ProductsTableToolbarActions table={table} />
          </DataTableAdvancedToolbar>
        ) : (
          <DataTableToolbar table={table} filterFields={filterFields}>
            <ProductsTableToolbarActions table={table} />
          </DataTableToolbar>
        )}
      </DataTable>
      <UpdateProductSheet
        product={rowAction?.row.original ?? null}
        open={rowAction?.type === "update"}
        onOpenChange={() => setRowAction(null)}
      />
    </>
  );
}
