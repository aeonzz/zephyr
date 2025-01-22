import { Row } from "@tanstack/react-table";

export interface UserTableRowAction<TData> {
  row: Row<TData>;
  type: "update" | "delete" | "ban";
}
