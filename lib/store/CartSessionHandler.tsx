"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

/**
 * CartSessionHandler
 *
 * - Does NOT clear carts
 * - Does NOT touch localStorage
 * - Cart lifecycle is fully controlled by CartStoreProvider
 */
export function CartSessionHandler() {
  const { isSignedIn } = useUser();

  useEffect(() => {
    // Intentionally empty:
    // CartStoreProvider recreates the store when userId changes
    // This guarantees correct cart per user
  }, [isSignedIn]);

  return null;
}
