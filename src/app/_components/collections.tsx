"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { type Product } from "@/db/schema";
import ProductCard from "./product-card";

interface CollectionsProps extends React.ComponentProps<"section"> {
  someProps?: string;
}

export default function Collections({ ...props }: CollectionsProps) {
  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["collections"],
    queryFn: async () => {
      const response = await axios.get("/api/product/get-products");
      return response.data.data;
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No data found</div>;
  }

  return (
    <section {...props} className="flex h-auto w-full justify-center">
      <div className="container border-x py-10">
        <div className="grid grid-cols-4 gap-4">
          {data?.map((item) => <ProductCard key={item.id} product={item} />)}
        </div>
      </div>
    </section>
  );
}
