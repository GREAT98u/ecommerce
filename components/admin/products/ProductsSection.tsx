"use client";

import { useState } from "react";
import { useAdminProducts } from "./useAdminProducts";
import AdminProductForm from "../AdminProductForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ProductsSection() {
  const { data: products = [], isLoading, deleteProduct } =
    useAdminProducts();

  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);

  if (isLoading) return <p>Loading products...</p>;

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Products</h2>
          <Button onClick={() => setIsCreating(true)}>Add Product</Button>
        </div>

        {(isCreating || editingProduct) && (
          <AdminProductForm
            mode={isCreating ? "create" : "edit"}
            productId={editingProduct?.id}
            initialValues={
              editingProduct
                ? {
                    ...editingProduct,
                    price: String(editingProduct.price),
                    stock: String(editingProduct.stock),
                  }
                : undefined
            }
            onSuccess={() => {
              setIsCreating(false);
              setEditingProduct(null);
            }}
          />
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((p: any) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>${p.price}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell className="flex gap-2">
                  <Button size="sm" onClick={() => setEditingProduct(p)}>
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteProduct.mutate(p.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
