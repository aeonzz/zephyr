"use server";

import {
  addProductSchemaWithPath,
  updateProductSchemaWithPath,
} from "@/app/console/shop/products/_lib/validations";
import { db } from "@/db";
import { product } from "@/db/schema";
import { actionClient } from "@/lib/safe-actions";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

export const createProduct = actionClient
  .metadata({ actionName: "createProduct" })
  .schema(addProductSchemaWithPath)
  .action(async ({ parsedInput: { path, ...rest } }) => {
    try {
      await db.insert(product).values({
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...rest,
      });

      return revalidatePath(path);
    } catch (error) {
      console.log(error);
      throw new Error("Something Went Wrong!");
    }
  });

export const updateProduct = actionClient
  .metadata({ actionName: "updateProduct" })
  .schema(updateProductSchemaWithPath)
  .action(async ({ parsedInput: { path, ...rest } }) => {
    try {
      await db
        .update(product)
        .set({
          updatedAt: new Date(),
          ...rest,
        })
        .where(eq(product.id, rest.id));

      return revalidatePath(path);
    } catch (error) {
      console.log(error);
      throw new Error("Something Went Wrong!");
    }
  });
