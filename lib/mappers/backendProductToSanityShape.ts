function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function mapBackendProduct(product: any) {
  const name = product?.name ?? "Unnamed Product";

  return {
    // Unique ID to avoid collision with Sanity _id
    _id: `backend-${product?.id ?? crypto.randomUUID()}`,

    name,

    slug: slugify(name),

    price: Number(product?.price ?? 0),
    stock: Number(product?.stock ?? 0),

    images: Array.isArray(product?.images)
      ? product.images.map((img: any, index: number) => ({
          _key: `${product?.id ?? "img"}-${index}`,
          asset: {
            url: img?.url ?? "",
          },
        }))
      : [],

    category: product?.category
      ? {
          title: product.category,
          slug: slugify(product.category),
        }
      : undefined,

    // Optional attributes (Sanity-compatible)
    color: null,
    material: null,
  };
}
