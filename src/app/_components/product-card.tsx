"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { type Product } from "@/db/schema";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [count, setCount] = React.useState(1);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const total = Number(product?.price) * count;
    setTotal(total);
  }, [count]);

  return (
    <React.Fragment>
      <Dialog>
        <DialogTrigger asChild>
          <Card className="cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="relative h-[262px] w-full overflow-hidden">
                <Image
                  src="/placeholder.svg"
                  objectFit="cover"
                  alt={product.name}
                  fill
                />
              </div>
            </div>
            <CardFooter className="pt-4">
              <div className="py-">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {product.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
                <p className="mt-2">₱ {product.price}</p>
              </div>
            </CardFooter>
          </Card>
        </DialogTrigger>
        <DialogContent className="flex max-w-4xl gap-3">
          <VisuallyHidden>
            <DialogTitle>wtf</DialogTitle>
          </VisuallyHidden>
          <div className="relative h-[60vh] max-h-[780px] flex-1 overflow-hidden">
            <Image
              src="/placeholder.svg"
              objectFit="cover"
              alt={product.name}
              fill
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <h1 className="overflow-clip truncate break-all text-4xl font-medium tracking-tight">
              {product.name}
            </h1>
            <p className="text-base text-muted-foreground">
              {product.description}
            </p>
            <Separator className="my-5" />
            <div className="flex w-full flex-col justify-between">
              <h2 className="inline-flex items-center gap-3 text-2xl font-semibold tracking-tight">
                <span className="text-xs text-muted-foreground">Price:</span>₱{" "}
                {product.price}
              </h2>
              <Separator className="my-5" />
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">Total:</span>
                  <h3 className="text-base tracking-tight">₱ {total}</h3>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={count === 1}
                    onClick={() => setCount(count - 1)}
                  >
                    <Minus />
                  </Button>
                  <div className="grid size-9 place-items-center border-y">
                    {count}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCount(count + 1)}
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <div className="ml-auto flex items-center gap-3">
                  <Button variant="outline">Add to Cart</Button>
                  <Button className="px-10">Buy Now</Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
