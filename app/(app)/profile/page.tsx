"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";
import api from "@/lib/api/axios";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, authInitialized } = useAuthStore();

  /* ===============================
     Client-side auth guard
  =============================== */
useEffect(() => {
  if (!authInitialized) return;

  if (!isAuthenticated) {
    router.replace("/login");
  }
}, [isAuthenticated, authInitialized, router]);

 if (!authInitialized) {
  return null;
}

if (!isAuthenticated || !user) {
  return null;
}


  const handleLogout = async () => {
    try {
      await api.get("/auth/logout");
      router.replace("/");
    } catch {
      // ignore
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">My Profile</h1>

      <div className="rounded-lg border bg-background p-6 shadow-sm">
        {/* User Info */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Name</p>
          <p className="text-base font-medium">{user.name}</p>

          <p className="mt-4 text-sm text-muted-foreground">Email</p>
          <p className="text-base font-medium">{user.email}</p>

          <p className="mt-4 text-sm text-muted-foreground">Role</p>
          <p className="text-base font-medium">{user.role ?? "User"}</p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <Button variant="destructive" onClick={handleLogout}>
            Sign out
          </Button>

          <Button variant="outline" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
