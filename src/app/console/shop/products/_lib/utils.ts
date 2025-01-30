import { type Row } from "@tanstack/react-table";

export interface ProductsTableRowAction<TData> {
  row: Row<TData>;
  type: "update" | "delete";
}
