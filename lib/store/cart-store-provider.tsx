"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { useStore } from "zustand";
import { createCartStore, CartStore } from "./cart-store";
import { useCartQuery } from "@/lib/queries/useCartQuery";
import { useAuthStore } from "@/lib/store/auth-store";

type CartStoreApi = ReturnType<typeof createCartStore>;

const CartStoreContext = createContext<CartStoreApi | null>(null);

export function CartStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<CartStoreApi | null>(null);
  const { isAuthenticated } = useAuthStore();

  if (!storeRef.current) {
    storeRef.current = createCartStore();
  }

  /* ===============================
     Fetch cart (JWT-based)
  =============================== */

  const { data, isSuccess, isError } = useCartQuery(isAuthenticated);

  useEffect(() => {
    const store = storeRef.current!;
    const state = store.getState();

    // Logged out → clear cart
    if (!isAuthenticated) {
      if (state.items.length > 0) {
        state.clearCart();
      }
      return;
    }

    // Logged in → hydrate cart
    if (isSuccess && data?.items) {
      store.setState({
        items: data.items,
      });
    }
  }, [isAuthenticated, isSuccess, isError, data]);

  return (
    <CartStoreContext.Provider value={storeRef.current}>
      {children}
    </CartStoreContext.Provider>
  );
}

/* ===============================
   Hooks
================================ */

export function useCartStore<T>(selector: (s: CartStore) => T): T {
  const store = useContext(CartStoreContext);
  if (!store) {
    throw new Error("useCartStore must be used within CartStoreProvider");
  }
  return useStore(store, selector);
}

export const useCartItems = () => useCartStore((s) => s.items);
export const useCartIsOpen = () => useCartStore((s) => s.isOpen);
export const useAddItem = () => useCartStore((s) => s.addItem);
export const useRemoveItem = () => useCartStore((s) => s.removeItem);
export const useUpdateQuantity = () => useCartStore((s) => s.updateQuantity);
export const useClearCart = () => useCartStore((s) => s.clearCart);
export const useToggleCart = () => useCartStore((s) => s.toggleCart);
