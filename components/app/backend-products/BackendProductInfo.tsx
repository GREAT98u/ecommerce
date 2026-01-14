import { AddToCartButton } from "@/components/app/cart/AddToCartButton";
import { StockBadge } from "@/components/app/StockBadge";
import { formatPrice } from "@/lib/utils";

interface BackendProductInfoProps {
  product: any;
}

export function BackendProductInfo({ product }: BackendProductInfoProps) {
  const imageUrl = product.images?.[0]?.url;

  return (
    <div className="flex flex-col">
      <span className="text-sm text-zinc-500">{product.category}</span>

      <h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        {product.name}
      </h1>

      <p className="mt-4 text-2xl font-semibold">
        {formatPrice(product.price)}
      </p>

      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        {product.description}
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <StockBadge productId={product.id} stock={product.stock} />

        <AddToCartButton
          productId={product.id}
          name={product.name}
          price={product.price}
          image={imageUrl}
          stock={product.stock}
        />
      </div>
    </div>
  );
}
