"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Users, Package, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import UsersSection from "./users/UsersSection";
import ProductsSection from "./products/ProductsSection";
import OrdersSection from "./orders/OrdersSection";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function AdminSidebarSheet({ open, onOpenChange }: Props) {
  const [tab, setTab] = useState<"users" | "products" | "orders">("users");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
  side="right"
  className="!w-[80vw] !max-w-[1000px] p-0"
>


        <SheetHeader className="border-b p-4">
          <SheetTitle>Admin Panel</SheetTitle>
        </SheetHeader>

        <div className="flex h-full">
          {/* Sidebar */}
          <aside className="w-40 border-r p-3 space-y-2">
            <Button
              variant={tab === "users" ? "default" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setTab("users")}
            >
              <Users className="h-4 w-4" />
              Users
            </Button>

            <Button
              variant={tab === "products" ? "default" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setTab("products")}
            >
              <Package className="h-4 w-4" />
              Products
            </Button>

            <Button
              variant={tab === "orders" ? "default" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setTab("orders")}
            >
              <ClipboardList className="h-4 w-4" />
              Orders
            </Button>
          </aside>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-4">
            {tab === "users" && <UsersSection />}
            {tab === "products" && <ProductsSection />}
            {tab === "orders" && <OrdersSection />}
          </main>
        </div>
      </SheetContent>
    </Sheet>
  );
}
