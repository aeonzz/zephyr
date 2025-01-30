"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "@/lib/schema/auth";
import { signIn } from "@/lib/auth/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/alert";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [showVerifyAlert, setShowVerifyAlert] = React.useState(false);
  const router = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginSchema) {
    const { email, password } = values;
    try {
      await signIn.email({
        email: email,
        password: password,
        rememberMe: rememberMe,
        fetchOptions: {
          onRequest: () => {
            setIsLoading(true);
          },
          onError: (ctx) => {
            console.log(ctx);
            setIsLoading(false);

            if (ctx.error.status === 403) {
              return setShowVerifyAlert(true);
            }

            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            router.push("/");
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
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-5",
        className
      )}
      {...props}
    >
      {showVerifyAlert && (
        <Alert
          className="w-fit"
          variant="warning"
          dismiss={setShowVerifyAlert}
          showDismissButton
        >
          <AlertTitle>Account Not Verified</AlertTitle>
          <AlertDescription>
            Your account requires verification before proceeding. A verification
            email has been sent; please check your inbox.
          </AlertDescription>
        </Alert>
      )}
      <Card className="w-full max-w-xs overflow-hidden border-none shadow-none">
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="px-1">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Sign in</h1>
                  <p className="text-balance text-muted-foreground">
                    Choose your preferred sign in method
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="m@example.com"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <Link
                          href="/forgot-password"
                          className="ml-auto text-sm underline-offset-2 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <PasswordInput id="password" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember-me"
                    onClick={() => {
                      setRememberMe(!rememberMe);
                    }}
                  />
                  <Label htmlFor="remember-me">Remember me</Label>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="animate-spin" />}
                  Login
                </Button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={isLoading}
                    onClick={async (e) => {
                      e.preventDefault();
                      await signIn.social({
                        provider: "google",
                        callbackURL: "/",
                        fetchOptions: {
                          onRequest: () => {
                            setIsLoading(true);
                          },
                          onError: (ctx) => {
                            setIsLoading(false);
                            toast.error(ctx.error.message);
                          },
                        },
                      });
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="">Google</span>
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    prefetch
                    href="/signup"
                    className="underline underline-offset-4"
                  >
                    Sign up
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
