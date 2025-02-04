"use server";

import { updateProductSchemaWithPath } from "@/app/console/shop/products/_lib/validations";
import { db } from "@/db";
import { categoryValues, product } from "@/db/schema";
import { actionClient } from "@/lib/safe-actions";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export const createProduct = actionClient
  .metadata({ actionName: "createProduct" })
  .schema(
    z.object({
      name: z.string(),
      category: z.enum(categoryValues),
      price: z.string(),
      color: z.array(z.string()),
      description: z.string().optional(),
      imageUrl: z.array(z.string()),
      path: z.string(),
    })
  )
  .action(async ({ parsedInput: { path, imageUrl, ...rest } }) => {
    try {
      await db.insert(product).values({
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        image_url: imageUrl[0],
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
