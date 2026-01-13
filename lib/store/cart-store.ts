import { createStore } from "zustand/vanilla";
import api from "@/lib/api/axios";

/* =====================
   Types
===================== */

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string; // UI-only
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  /* ---------- cart actions (BACKEND-SOURCED) ---------- */
  addItem: (
    item: Omit<CartItem, "quantity">,
    quantity?: number
  ) => Promise<void>;

  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;

  /* ---------- UI ---------- */
  toggleCart: () => void;
}

/* =====================
   Store
===================== */

export const createCartStore = () =>
  createStore<CartStore>((set) => ({
    items: [],
    isOpen: false,

    /* ---------- cart actions ---------- */

    addItem: async (item, quantity = 1) => {
      // 1️⃣ Write to backend (authoritative)
      await api.post("/cart/items", {
        item,
        quantity,
      });

      // 2️⃣ Optimistically update Zustand (NO refetch)
      set((state) => {
        const existing = state.items.find(
          (i) => i.productId === item.productId
        );

        if (existing) {
          return {
            items: state.items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          };
        }

        return {
          items: [...state.items, { ...item, quantity }],
        };
      });
    },

    updateQuantity: async (productId, quantity) => {
      await api.patch(`/cart/items/${productId}`, { quantity });

      set((state) => ({
        items:
          quantity <= 0
            ? state.items.filter(
                (i) => i.productId !== productId
              )
            : state.items.map((i) =>
                i.productId === productId
                  ? { ...i, quantity }
                  : i
              ),
      }));
    },

    removeItem: async (productId) => {
      await api.delete(`/cart/items/${productId}`);

      set((state) => ({
        items: state.items.filter(
          (i) => i.productId !== productId
        ),
      }));
    },

    clearCart: async () => {
      await api.delete("/cart");
      set({ items: [] });
    },

    /* ---------- UI ---------- */

    toggleCart: () =>
      set((state) => ({ isOpen: !state.isOpen })),
  }));
