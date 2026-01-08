import { useMutation, useQueryClient } from "@tanstack/react-query";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/* =====================================================
   ADD ITEM TO CART
   POST /api/v1/cart/items
===================================================== */

export function useAddToCartMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      item,
      quantity,
    }: {
      item: {
        productId: string;
        name: string;
        price: number;
      };
      quantity: number;
    }) => {
      const res = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item, quantity }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to add item");
      }
    },

    onSettled: () => {
      // server is source of truth
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

/* =====================================================
   UPDATE ITEM QUANTITY
   PATCH /api/v1/cart/items/:productId
===================================================== */

export function useUpdateCartItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      const res = await fetch(
        `${BASE_URL}/cart/items/${productId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to update quantity");
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

/* =====================================================
   REMOVE ITEM FROM CART
   DELETE /api/v1/cart/items/:productId
===================================================== */

export function useRemoveFromCartMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const res = await fetch(
        `${BASE_URL}/cart/items/${productId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to remove item");
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

/* =====================================================
   CLEAR CART
   DELETE /api/v1/cart
===================================================== */

export function useClearCartMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`${BASE_URL}/cart`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to clear cart");
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
