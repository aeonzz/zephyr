"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm, useFormState } from "react-hook-form";
import {
  addProductSchema,
  AddProductSchemaWithPath,
  type AddProductSchema,
} from "../_lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { categoryEnum } from "@/db/schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { createProduct } from "@/actions/product";
import { useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { colors } from "../_lib/config";

export default function AddProductDialog() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createProduct,
  });
  const form = useForm<AddProductSchema>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      category: undefined,
      price: "1",
      color: [],
    },
  });

  const dirtyFields = useFormState({ control: form.control });
  const isFieldsDirty = Object.keys(dirtyFields).length > 0;

  async function onSubmit(values: AddProductSchema) {
    const payload: AddProductSchemaWithPath = {
      ...values,
      path: pathname,
    };
    try {
      await mutateAsync(payload);
      setOpen(false);
      form.reset({
        name: "",
        category: undefined,
        price: "1",
        color: [],
      });
      toast("Product created successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Add Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add product</DialogTitle>
          <DialogDescription>
            Enter the product details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      autoComplete="off"
                      placeholder="Hoodie 1"
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-grow items-center gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Category</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? categoryEnum.enumValues.find(
                                  (language) => language === field.value
                                )
                              : "Select category"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search category..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {categoryEnum.enumValues.map(
                                (category, index) => (
                                  <CommandItem
                                    value={category}
                                    key={index}
                                    onSelect={() => {
                                      form.setValue("category", category);
                                    }}
                                  >
                                    {category}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        category === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                )
                              )}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>
                      Price{" "}
                      <span className="text-xs text-muted-foreground">
                        (Pesos)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        autoComplete="off"
                        min={1}
                        inputMode="numeric"
                        placeholder="$1000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="color"
              render={() => (
                <FormItem>
                  <FormLabel className="text-base">Color</FormLabel>
                  <div className="grid grid-cols-2 gap-4">
                    {colors.map((color) => (
                      <FormField
                        key={color.id}
                        control={form.control}
                        name="color"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={color.id}
                              className="flex flex-row items-start space-x-3 space-y-0 border p-3 has-[[data-state=checked]]:border-white"
                            >
                              <FormControl>
                                <Checkbox
                                  id={color.id}
                                  checked={field.value?.includes(color.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          color.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== color.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel
                                htmlFor={color.id}
                                className="text-sm font-normal"
                              >
                                {color.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description{" "}
                    <span className="text-xs text-muted-foreground">
                      (Optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your product description"
                      autoComplete="off"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending || !isFieldsDirty}>
                {isPending && <Loader2 className="animate-spin" />}
                Create
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
