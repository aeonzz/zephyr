"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/password-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema, resetPasswordSchema } from "@/lib/schema/auth";
import { resetPassword } from "@/lib/auth/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader, Loader2 } from "lucide-react";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: ResetPasswordSchema) {
    const { password } = values;
    try {
      await resetPassword({
        newPassword: password,
        fetchOptions: {
          onRequest: () => {
            setIsLoading(true);
          },
          onResponse: () => {
            setIsLoading(false);
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            toast.success("Password reset successfully");
            router.push("/login");
          },
        },
      });
      return;
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      return toast.error("Something went wrong. Please try again later.");
    }
  }

  return (
    <div
      className={cn("flex w-full max-w-xs flex-col gap-6", className)}
      {...props}
    >
      <Card className="overflow-hidden border-none shadow-none md:shadow">
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="px-1">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Reset Your Password</h1>
                  <p className="text-balance text-muted-foreground">
                    Enter your new password for your Acme Inc account
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput id="password" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          id="confirm-password"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="mt-2 w-full"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="animate-spin" />}
                  Reset Password
                </Button>
                <div className="text-center text-sm">
                  Remember your password?{" "}
                  <Link
                    href="/login"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
