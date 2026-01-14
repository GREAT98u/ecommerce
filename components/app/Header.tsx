"use client";

import Link from "next/link";
import { Package, ShoppingBag, Sparkles, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useCartItems,
  useToggleCart,
} from "@/lib/store/cart-store-provider";
import {
  useChatActions,
  useIsChatOpen,
} from "@/lib/store/chat-store-provider";
import { AdminSidebarSheet } from "@/components/admin/AdminSidebarSheet";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import api from "@/lib/api/axios";

export function Header() {
  // 🔒 ALL HOOKS MUST RUN FIRST (NO RETURNS ABOVE THIS)
  const { authInitialized, user, isAuthenticated, clearAuth } =
    useAuthStore();

  const items = useCartItems();
  const toggleCart = useToggleCart();
  const [adminOpen, setAdminOpen] = useState(false);
  const { openChat } = useChatActions();
  const isChatOpen = useIsChatOpen();

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout");
    } finally {
      clearAuth();
      window.location.href = "/";
    }
  };

  // 🔒 NOW we can guard rendering
  if (!authInitialized) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">The Furniture Store</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* My Orders */}
          {isAuthenticated && (
            <Button asChild>
              <Link href="/orders" className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                <span className="text-sm font-medium">My Orders</span>
              </Link>
            </Button>
          )}

          {/* AI Assistant */}
          {!isChatOpen && (
            <Button
              onClick={openChat}
              className="gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white"
            >
              <Sparkles className="h-4 w-4" />
              Ask AI
            </Button>
          )}

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => {
                if (user?.role === "Admin") {
                  setAdminOpen(true);
                } else {
                  toggleCart();
                }
              }}

          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Button>

          {/* Auth */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col">
                  <span className="text-sm font-medium">
                    {user?.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          )}

            {user?.role === "Admin" && (
              <AdminSidebarSheet
                open={adminOpen}
                onOpenChange={setAdminOpen}
              />
            )}

        </div>
      </div>
    </header>
  );
}
