"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import { QueryClient } from "@tanstack/react-query";

export function useAuthEvents(queryClient: QueryClient) {
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    const handler = () => {
      clearAuth();
      queryClient.clear();
    };

    window.addEventListener("auth:logout", handler);
    return () => window.removeEventListener("auth:logout", handler);
  }, [clearAuth, queryClient]);
}
