"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { type User } from "@/db/schema";
import { admin } from "@/lib/auth/client";
import { banSchema, BanSchema } from "@/lib/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { E } from "node_modules/better-auth/dist/index-DwXoFQKD";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Duration = {
  label: string;
  value: number;
};

const durationItems: Duration[] = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 7,
    label: "7",
  },
] as const;

interface BanUserDialogProps
  extends React.ComponentPropsWithRef<typeof AlertDialog> {
  user: User | null;
}

export default function BanUserDialog({ user, ...props }: BanUserDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<BanSchema>({
    resolver: zodResolver(banSchema),
    defaultValues: {
      banReason: "",
      duration: undefined,
    },
  });

  console.log(form.formState.errors);
  async function onSubmit(values: BanSchema) {
    if (!user) return null;
    const { banReason, duration } = values;
    try {
      const ban = durationItems.find((v) => v.label === duration);
      const value = ban?.value ?? 1;
      await admin.banUser({
        userId: user.id,
        banReason: banReason,
        banExpiresIn: 60 * 60 * 24 * value,
        fetchOptions: {
          onRequest: () => {
            setIsLoading(true);
          },
          onError: (ctx) => {
            setIsLoading(false);
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            router.refresh();
            toast.success("User banned successfully");
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
    <AlertDialog {...props}>
      <AlertDialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Ban User</AlertDialogTitle>
          <AlertDialogDescription>
            Are you really sure to ban this user?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="banReason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Ban Reason <span className="text-destructive">*</span>{" "}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="name"
                      className="resize-none"
                      placeholder="Your reason for banning the user"
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
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Ban Duration <span className="text-destructive">*</span>{" "}
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a ban duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent onCloseAutoFocus={(e) => e.preventDefault()}>
                      {durationItems.map((d, index) => (
                        <SelectItem key={index} value={d.label}>
                          {d.label} {index === 0 ? "Day" : "Days"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  props.onOpenChange?.(false);
                }}
                variant="outline"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" variant="destructive" disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin" />}
                Ban
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
