"use client";

import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  useAddItem,
  useUpdateQuantity,
  useCartItems,
} from "@/lib/store/cart-store-provider";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  productId?: string; // ✅ optional (Sanity-safe)
  name: string;
  price: number;
  image?: string;
  stock: number;
  className?: string;
  disabled?: boolean; // ✅ FIXED
}

export function AddToCartButton({
  productId,
  name,
  price,
  image,
  stock,
  className,
  disabled = false,
}: AddToCartButtonProps) {
  const addItem = useAddItem();
  const updateQuantity = useUpdateQuantity();
  const cartItems = useCartItems();

  const cartItem = cartItems.find(
    (i) => i.productId === productId
  );

  const quantity = cartItem?.quantity ?? 0;
  const isOutOfStock = stock <= 0;
  const isMaxReached = quantity >= stock;

  const isDisabled =
    disabled || !productId || isOutOfStock;

  async function handleAdd() {
    if (!productId) {
      toast.error("This product cannot be added to cart");
      return;
    }

    if (quantity >= stock) return;

    try {
      await addItem({ productId, name, price, image }, 1);
      toast.success(`${name} added to cart`);
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  }

  async function handleRemove() {
    if (!productId) return;

    try {
      await updateQuantity(productId, quantity - 1);
    } catch {
      toast.error("Unable to update cart");
    }
  }

  // 🚫 Out of stock
  if (isOutOfStock) {
    return (
      <Button
        disabled
        variant="secondary"
        className={cn("h-11 w-full", className)}
      >
        Out of stock
      </Button>
    );
  }

  // ➕ Not yet in cart
  if (quantity === 0) {
    return (
      <Button
        onClick={handleAdd}
        disabled={isDisabled}
        className={cn("h-11 w-full", className)}
      >
        <ShoppingBag className="mr-2 h-4 w-4" />
        Add to cart
      </Button>
    );
  }

  // 🔁 Already in cart
  return (
    <div
      className={cn(
        "flex h-11 w-full items-center rounded-md border",
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handleRemove}
        disabled={disabled}
      >
        <Minus className="h-4 w-4" />
      </Button>

      <span className="flex-1 text-center font-semibold">
        {quantity}
      </span>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleAdd}
        disabled={isMaxReached || disabled}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
