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
  productId: string;
  name: string;
  price: number;
  image?: string;
  stock: number;
  className?: string;
}

export function AddToCartButton({
  productId,
  name,
  price,
  image,
  stock,
  className,
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

  function handleAdd() {
    if (quantity < stock) {
      addItem({ productId, name, price, image }, 1);
      toast.success(`${name} added to cart`);
    }
  }

  function handleRemove() {
    updateQuantity(productId, quantity - 1);
  }

  // Out of stock
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

  // Not yet in cart
  if (quantity === 0) {
    return (
      <Button
        onClick={handleAdd}
        className={cn("h-11 w-full", className)}
      >
        <ShoppingBag className="mr-2 h-4 w-4" />
        Add to cart
      </Button>
    );
  }

  // Already in cart
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
        disabled={isMaxReached}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
