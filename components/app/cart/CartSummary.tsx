"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import {
  useCartItems,
  useToggleCart,
} from "@/lib/store/cart-store-provider";

interface CartSummaryProps {
  hasStockIssues?: boolean;
}

export function CartSummary({ hasStockIssues = false }: CartSummaryProps) {
  const items = useCartItems();
  const toggleCart = useToggleCart();

  // derive values locally
  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = items.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);

  if (totalItems === 0) return null;

  return (
    <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
      <div className="flex justify-between text-base font-medium">
        <span>Subtotal</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>

      <p className="mt-1 text-sm text-zinc-500">
        Shipping calculated at checkout
      </p>

      <div className="mt-4">
        {hasStockIssues ? (
          <Button disabled className="w-full">
            Resolve stock issues to checkout
          </Button>
        ) : (
          <Button asChild className="w-full">
            <Link href="/checkout" onClick={toggleCart}>
              Checkout
            </Link>
          </Button>
        )}
      </div>

      <div className="mt-3 text-center">
        <Link
          href="/"
          className="text-sm text-zinc-500 hover:text-zinc-700"
        >
          Continue Shopping →
        </Link>
      </div>
    </div>
  );
}
