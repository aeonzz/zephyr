"use client";

import { oneTap } from "@/lib/auth/client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { buttonVariants } from "./button";

export default function LoginButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    oneTap({
      fetchOptions: {
        onRequest: () => {
          setIsLoading(true);
        },
        onResponse: () => {
          setIsLoading(false);
        },
        onError: (ctx) => {
          console.log(ctx);
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  }, []);
  return (
    <Link
      className={cn(
        buttonVariants({ variant: "default" }),
        "aria-disabled:pointer-events-none aria-disabled:opacity-50"
      )}
      href="/login"
      prefetch
      aria-disabled={isLoading}
    >
      Login
    </Link>
  );
}
