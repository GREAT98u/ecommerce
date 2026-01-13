"use client";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import { useAuthStore } from "@/lib/store/auth-store";

export function useLoginMutation() {
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: async (payload: {
      email: string;
      password: string;
    }) => {
      const { data } = await api.post("/auth/login", payload);
      return data;
    },
    onSuccess: (data) => {
      // 🔑 DIRECTLY hydrate auth state
      setUser(data.user);
    },
  });
}

export function useRegisterMutation() {
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: async (payload: {
      name: string;
      email: string;
      password: string;
    }) => {
      const { data } = await api.post("/auth/register", payload);
      return data;
    },
    onSuccess: (data) => {
      // 🔑 DIRECTLY hydrate auth state
      setUser(data.user);
    },
  });
}
