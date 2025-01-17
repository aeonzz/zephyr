import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

export default function Verification({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex w-full max-w-xs flex-col gap-6", className)}
      {...props}
    >
      <Card className="overflow-hidden border-none shadow-none md:shadow">
        <CardContent className="p-0 px-1">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Email Verification Sent</h1>
              <p className="text-balance text-muted-foreground">
                Please check your email to verify your account and proceed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
