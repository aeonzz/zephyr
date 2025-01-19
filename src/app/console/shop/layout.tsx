import ConsoleShell from "@/components/layouts/console-shell";
import { cookies } from "next/headers";

export default async function ConsoleShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <ConsoleShell defaultOpen={defaultOpen} route="shop">
      {children}
    </ConsoleShell>
  );
}
