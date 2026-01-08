"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import { useAuthStore } from "@/lib/store/auth-store";

export function useAuthSession() {
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const query = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const { data } = await api.get("/auth/me");
      return data.user;
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // ✅ Side-effects handled here (v5 correct pattern)
  useEffect(() => {
    if (query.isSuccess) {
      setUser(query.data);
    }

    if (query.isError) {
      clearAuth();
    }
  }, [query.isSuccess, query.isError, query.data, setUser, clearAuth]);

  return query;
}
