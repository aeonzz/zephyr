import { Row } from "@tanstack/react-table";

export interface UserTableRowAction<TData> {
  row: Row<TData>;
  type: "update" | "delete" | "ban";
}

export const userTableTags = [
  "users",
  "user-banned-counts",
  "user-verified-counts",
] as const;

export type UserTableTags = typeof userTableTags[number];
