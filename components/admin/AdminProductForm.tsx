"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

/* =====================================================
   REUSABLE ADMIN PRODUCT FORM
   - Used for CREATE and UPDATE
   - Fully aligned with backend routes
   - No auth logic duplicated
===================================================== */

export type AdminProductFormValues = {
  name: string;
  description: string;
  price: string;     // ⬅️ string
  category: string;
  stock: string;     // ⬅️ string
};


interface AdminProductFormProps {
  mode: "create" | "edit";
  initialValues?: Partial<AdminProductFormValues>;
  productId?: string;
  onSuccess?: () => void;
}

export default function AdminProductForm({
  mode,
  initialValues,
  productId,
  onSuccess,
}: AdminProductFormProps) {
  const queryClient = useQueryClient();

const [form, setForm] = useState<AdminProductFormValues>({
  name: "",
  description: "",
  price: "",
  category: "",
  stock: "",
});


  useEffect(() => {
    if (initialValues) {
      setForm((prev) => ({ ...prev, ...initialValues }));
    }
  }, [initialValues]);

const mutation = useMutation({
  mutationFn: async () => {
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    if (mode === "create") {
      return api.post("/product/admin/create", payload);
    }

    return api.put(`/product/admin/update/${productId}`, payload);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    onSuccess?.();
  },
});


function handleChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  const { name, value } = e.target;
  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
}


  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate();
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">
          {mode === "create" ? "Create Product" : "Edit Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label>Name</Label>
            <Input name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="space-y-1">
            <Label>Description</Label>
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Price</Label>
              <Input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1">
              <Label>Stock</Label>
              <Input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label>Category</Label>
            <Input
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending
              ? "Saving..."
              : mode === "create"
              ? "Create Product"
              : "Update Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
