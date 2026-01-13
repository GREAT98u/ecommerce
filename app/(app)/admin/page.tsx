"use client";

import { useState } from "react";
import UsersSection from "@/components/admin/users/UsersSection";
import OrdersSection from "@/components/admin/orders/OrdersSection";
import { Button } from "@/components/ui/button";
import ProductsSection from "@/components/admin/products/ProductsSection";

export default function AdminDashboard() {
  const [tab, setTab] = useState("users");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="flex gap-3">
        <Button onClick={() => setTab("users")}>Users</Button>
        <Button onClick={() => setTab("products")}>Products</Button>
        <Button onClick={() => setTab("orders")}>Orders</Button>
      </div>

      {tab === "users" && <UsersSection />}
      {tab === "products" && <ProductsSection />}
      {tab === "orders" && <OrdersSection />}
    </div>
  );
}
