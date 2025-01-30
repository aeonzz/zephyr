"use client";

import { QueryClient, QueryClientProvider as Qcp } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

interface QueryClientProviderProps {
  children: React.ReactNode;
}

export default function QueryClientProvider({
  children,
}: QueryClientProviderProps) {
  return <Qcp client={queryClient}>{children}</Qcp>;
}
