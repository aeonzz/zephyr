import { categoryValues, Product } from "@/db/schema";
import { getFiltersStateParser, getSortingStateParser } from "@/lib/parsers";
import { min } from "drizzle-orm";
import { col } from "motion/react-client";
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

import { z } from "zod";

export const productSearchParamsCache = createSearchParamsCache({
  flags: parseAsArrayOf(z.enum(["advancedTable", "floatingBar"])).withDefault(
    []
  ),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<Product>().withDefault([
    { id: "createdAt", desc: true },
  ]),
  name: parseAsString.withDefault(""),
  from: parseAsString.withDefault(""),
  to: parseAsString.withDefault(""),
  // advanced filter
  filters: getFiltersStateParser().withDefault([]),
  joinOperator: parseAsStringEnum(["and", "or"]).withDefault("and"),
});

export const addProductSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name must be at least 1 character long")
    .max(255, "Name must be at most 255 characters long"),
  category: z.enum(categoryValues),
  price: z.string().min(0, "Price must be at least 1"),
  color: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one color.",
  }),
  description: z.string().optional(),
});

export const addProductSchemaWithPath = addProductSchema.extend({
  path: z.string(),
});

export const updateProductSchema = addProductSchema.partial();

export const updateProductSchemaWithPath = updateProductSchema.extend({
  id: z.string(),
  path: z.string(),
});

export type GetProductsSchema = Awaited<
  ReturnType<typeof productSearchParamsCache.parse>
>;

export type AddProductSchema = z.infer<typeof addProductSchema>;
export type AddProductSchemaWithPath = z.infer<typeof addProductSchemaWithPath>;
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
export type UpdateProductSchemaWithPath = z.infer<
  typeof updateProductSchemaWithPath
>;
