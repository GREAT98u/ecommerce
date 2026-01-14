"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import api from "@/lib/api/axios";

export function AuthSessionHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, clearAuth, markInitialized, authInitialized } =
    useAuthStore();

  /* ===============================
     1️⃣ AUTH BOOTSTRAP (RUNS ONCE)
  =============================== */
  useEffect(() => {
    if (authInitialized) return;

    let mounted = true;

    async function bootstrapAuth() {
      try {
        const { data } = await api.get("/auth/me");
        console.log(data)
        if (mounted) setUser(data.user);
      } catch {
        if (mounted) clearAuth();
      } finally {
        if (mounted) markInitialized();
      }
    }

    bootstrapAuth();

    return () => {
      mounted = false;
    };
  }, [authInitialized, setUser, clearAuth, markInitialized]);

  /* ===============================
     2️⃣ GLOBAL 401 LISTENER
  =============================== */
  useEffect(() => {
    const handler = () => clearAuth();

    window.addEventListener("auth:unauthorized", handler);

    return () => {
      window.removeEventListener("auth:unauthorized", handler);
    };
  }, [clearAuth]);

  return <>{children}</>;
}
