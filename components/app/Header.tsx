"use client";

import Link from "next/link";
import { Package, ShoppingBag, Sparkles, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  useCartItems,
  useToggleCart,
} from "@/lib/store/cart-store-provider";
import {
  useChatActions,
  useIsChatOpen,
} from "@/lib/store/chat-store-provider";

import { useAuthStore } from "@/lib/store/auth-store";
import api from "@/lib/api/axios";

export function Header() {
  const items = useCartItems();
  const toggleCart = useToggleCart();

  const { openChat } = useChatActions();
  const isChatOpen = useIsChatOpen();

  const { user, isAuthenticated } = useAuthStore();

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout");
    } catch {
      // ignore
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">
            The Furniture Store
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* My Orders */}
          {isAuthenticated && (
            <Button asChild>
              <Link href="/orders" className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                <span className="text-sm font-medium">
                  My Orders
                </span>
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
            onClick={toggleCart}
          >
            <ShoppingBag className="h-5 w-5" />

            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}

            <span className="sr-only">
              Open cart ({totalItems} items)
            </span>
          </Button>

          {/* Auth */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/profile">
                  <User className="h-5 w-5" />
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/login">
                <User className="h-5 w-5" />
                <span className="sr-only">Sign in</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
