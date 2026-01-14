"use client";

import { ProductSection } from "@/components/app/products/ProductSection";
import { useBackendProducts } from "@/components/providers/BackendProductsProvider";

type Props = {
  sanityProducts: any[];
  categories: any[];
  searchQuery: string;
};

export function ProductsClientWrapper({
  sanityProducts,
  categories,
  searchQuery,
}: Props) {

    const result = useBackendProducts();
    const backendProducts = result.data ?? [];
    const isLoading = result.isLoading;


  const allProducts = [...sanityProducts, ...backendProducts];

  if (isLoading && sanityProducts.length === 0) {
    return <div>Loading products...</div>;
  }

  return (
    <ProductSection
      categories={categories}
      products={allProducts}
      searchQuery={searchQuery}
    />
  );
}
