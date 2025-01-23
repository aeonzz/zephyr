import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

import * as z from "zod";

import { getFiltersStateParser, getSortingStateParser } from "@/lib/parsers";
import { type User } from "@/db/schema";

export const userSearchParamsCache = createSearchParamsCache({
  flags: parseAsArrayOf(z.enum(["advancedTable", "floatingBar"])).withDefault(
    []
  ),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<User>().withDefault([
    { id: "createdAt", desc: true },
  ]),
  name: parseAsString.withDefault(""),
  email: parseAsString.withDefault(""),
  emailVerified: parseAsString.withDefault(""),
  role: parseAsString.withDefault(""),
  banned: parseAsString.withDefault(""),
  banReason: parseAsString.withDefault(""),
  banExpires: parseAsString.withDefault(""),
  from: parseAsString.withDefault(""),
  to: parseAsString.withDefault(""),
  // advanced filter
  filters: getFiltersStateParser().withDefault([]),
  joinOperator: parseAsStringEnum(["and", "or"]).withDefault("and"),
});

// export const createTaskSchema = z.object({
//     title: z.string(),
//     label: z.enum(tasks.label.enumValues),
//     status: z.enum(tasks.status.enumValues),
//     priority: z.enum(tasks.priority.enumValues),
//   })

//   export const updateTaskSchema = z.object({
//     title: z.string().optional(),
//     label: z.enum(tasks.label.enumValues).optional(),
//     status: z.enum(tasks.status.enumValues).optional(),
//     priority: z.enum(tasks.priority.enumValues).optional(),
//   })

export type GetUsersSchema = Awaited<
  ReturnType<typeof userSearchParamsCache.parse>
>;
// export type CreateTaskSchema = z.infer<typeof createTaskSchema>
// export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>
