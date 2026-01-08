"use client";

import dynamic from "next/dynamic";
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LoadingSpinner from "@/components/loaders/LoadingSpinner";
import { useAuthSession } from "@/lib/queries/useAuthSession";
import { useAuthEvents } from "@/lib/hooks/useAuthEvents";

const SanityAppProvider = dynamic(
  () => import("@/components/providers/SanityAppProvider"),
  {
    ssr: false,
    loading: () => (
      <LoadingSpinner
        text="Loading Sanity App SDK..."
        isFullScreen
        size="lg"
      />
    ),
  }
);

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthBootstrap queryClient={queryClient}>
        <SanityAppProvider>{children}</SanityAppProvider>
      </AuthBootstrap>
    </QueryClientProvider>
  );
}

/* ===============================
   Auth bootstrap (NO UI)
================================ */
function AuthBootstrap({
  children,
  queryClient,
}: {
  children: ReactNode;
  queryClient: QueryClient;
}) {
  useAuthSession();
  useAuthEvents(queryClient);
  return <>{children}</>;
}
