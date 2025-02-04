import { db } from "@/db";
import { product } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await db.select().from(product);

    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
