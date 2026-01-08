"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";

export function useCartQuery(enabled: boolean) {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await api.get("/cart");
      return data;
    },
    enabled,
    staleTime: 60_000,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
