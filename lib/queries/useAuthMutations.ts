"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/axios";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await api.post("/auth/login", payload);
      return data;
    },
    onSuccess: async () => {
      // 🔑 Force session refresh
      await queryClient.invalidateQueries({
        queryKey: ["auth", "me"],
      });
    },
  });
}

export function useRegisterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await api.post("/auth/register", payload);
      return data;
    },
    onSuccess: async () => {
      // 🔑 Force session refresh
      await queryClient.invalidateQueries({
        queryKey: ["auth", "me"],
      });
    },
  });
}
