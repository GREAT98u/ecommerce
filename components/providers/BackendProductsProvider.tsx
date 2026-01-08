"use client";

import { useQuery } from "@tanstack/react-query";
import { mapBackendProduct } from "@/lib/mappers/backendProductToSanityShape";

async function fetchBackendProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch backend products");
  }

  const data = await res.json();

  if (!data?.success) return [];

  return data.products.map(mapBackendProduct);
}

export function useBackendProducts() {
  return useQuery({
    queryKey: ["backend-products"],
    queryFn: fetchBackendProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
