import { createStore } from "zustand/vanilla";

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
  userId?: string;
  items: CartItem[];
  isOpen: boolean;

  // lifecycle
  hydrateCart: (userId: string, items: CartItem[]) => void;
  logout: () => void;

  // cart actions (optimistic UI only)
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // UI
  toggleCart: () => void;
}

/* =====================
   Store
===================== */

export const createCartStore = () =>
  createStore<CartStore>((set) => ({
    userId: undefined,
    items: [],
    isOpen: false,

    /* ---------- lifecycle ---------- */

    hydrateCart: (userId, items) => {
      set({
        userId,
        items,
      });
    },

    logout: () => {
      set({
        userId: undefined,
        items: [],
        isOpen: false,
      });
    },

    /* ---------- cart actions (optimistic) ---------- */

    addItem: (item, quantity = 1) =>
      set((state) => {
        const existing = state.items.find(
          (i) => i.productId === item.productId
        );

        const items = existing
          ? state.items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + quantity }
                : i
            )
          : [...state.items, { ...item, quantity }];

        return { items };
      }),

    removeItem: (productId) =>
      set((state) => ({
        items: state.items.filter((i) => i.productId !== productId),
      })),

    updateQuantity: (productId, quantity) =>
      set((state) => ({
        items:
          quantity <= 0
            ? state.items.filter((i) => i.productId !== productId)
            : state.items.map((i) =>
                i.productId === productId ? { ...i, quantity } : i
              ),
      })),

    clearCart: () => set({ items: [] }),

    /* ---------- UI ---------- */

    toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
  }));
