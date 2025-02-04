"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  updateProductSchema,
  UpdateProductSchemaWithPath,
  type UpdateProductSchema,
} from "../_lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { categoryEnum, type Product } from "@/db/schema";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
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
import { colors } from "../_lib/config";
import { useMutation } from "@tanstack/react-query";
import { updateProduct } from "@/actions/product";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

interface UpdateProductSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  product: Product | null;
}

export default function UpdateProductSheet({
  product,
  ...props
}: UpdateProductSheetProps) {
  const pathname = usePathname();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProduct,
  });
  const form = useForm<UpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: product?.name,
      category: product?.category,
      price: product?.price,
      color: product?.color,
      description: product?.description ?? "",
    },
  });

  // const dirtyFields = useFormState({ control: form.control });

  async function onSubmit(values: UpdateProductSchema) {
    if (!product?.id) return;
    const payload: UpdateProductSchemaWithPath = {
      ...values,
      id: product?.id,
      path: pathname,
    };
    try {
      await mutateAsync(payload);
      form.reset({
        name: product.name,
        category: product.category,
        price: product.price,
        color: product.color ?? [],
        description: product.description ?? "",
      });

      props.onOpenChange?.(false);
      toast("Product updated successfully!");
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong!");
    }
  }

  React.useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        category: product.category,
        price: product.price,
        color: product.color ?? [],
        description: product.description ?? "",
      });
    }
  }, [product, form]);

  return (
    <Sheet {...props}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Product</SheetTitle>
          <SheetDescription>Enter the product details below.</SheetDescription>
        </SheetHeader>
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
                            <CommandEmpty>No category found.</CommandEmpty>
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
                              className="flex flex-row items-start space-x-3 space-y-0 border p-3 has-[[data-state=checked]]:border-black dark:has-[[data-state=checked]]:border-white"
                            >
                              <FormControl>
                                <Checkbox
                                  id={color.id}
                                  checked={
                                    field.value?.includes(color.id) ?? false
                                  }
                                  onCheckedChange={(checked) => {
                                    const currentValues = field.value ?? [];
                                    return checked
                                      ? field.onChange([
                                          ...currentValues,
                                          color.id,
                                        ])
                                      : field.onChange(
                                          currentValues.filter(
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
            <Button
              variant="outline"
              disabled={isPending}
              onClick={(e) => {
                e.preventDefault();
                props.onOpenChange?.(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!form.formState.isDirty || isPending}
            >
              {isPending && <Loader2 className="animate-spin" />}
              Update
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
