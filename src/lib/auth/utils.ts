import { auth } from "./auth";
import { headers } from "next/headers";

export async function getServerSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}

export async function checkAdminServerSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
      throw new Error("Admin session required");
    }

    return session;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong.");
  }
}
