"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type User } from "@/db/schema";
import { admin } from "@/lib/auth/client";
import { deleteUserSchema, type DeleteUserSchema } from "@/lib/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Row } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, useFormState } from "react-hook-form";
import { toast } from "sonner";

const VERIFICATION = "delete";

interface DeleteUserDialogProps
  extends React.ComponentPropsWithRef<typeof AlertDialog> {
  users: Row<User>["original"][];
  onSuccess: () => void;
}

export default function DeleteUserDialog({
  users,
  onSuccess,
  ...props
}: DeleteUserDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<DeleteUserSchema>({
    resolver: zodResolver(deleteUserSchema),
    defaultValues: {
      verify: "",
    },
  });

  const dirtyFields = useFormState({ control: form.control });
  const isFieldsDirty = Object.keys(dirtyFields).length > 0;

  async function onSubmit(values: DeleteUserSchema) {
    const { verify } = values;
    if (verify !== VERIFICATION) return;
    try {
      for (const user of users) {
        await admin.removeUser({
          userId: user.id,
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
              onSuccess();
              props.onOpenChange?.(false);
              toast.success("User deleted successfully");
            },
          },
        });
      }
      return;
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      return toast.error("Something went wrong. Please try again later.");
    }
  }
  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm User Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this user? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            autoFocus
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="verify"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    To confirm, type &quot;delete&quot; in the box below
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      autoComplete="off"
                      autoFocus
                      className="border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50"
                      {...field}
                    />
                  </FormControl>
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
              <Button
                type="submit"
                variant="destructive"
                disabled={
                  isLoading ||
                  form.watch("verify") !== VERIFICATION ||
                  !isFieldsDirty
                }
              >
                {isLoading && <Loader2 className="animate-spin" />}
                Continue
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
