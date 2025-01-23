"use server";

import { revalidateTag } from "next/cache";

export async function revalidate<T extends string>(tags: T[]) {
  for (const tag of tags) {
    revalidateTag(tag);
  }
  return;
}
