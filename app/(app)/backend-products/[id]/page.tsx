import { notFound } from "next/navigation";
import { BackendProductGallery } from "@/components/app/backend-products/BackendProductGallery";
import { BackendProductInfo } from "@/components/app/backend-products/BackendProductInfo";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function fetchBackendProduct(id: string) {
  console.log("BACKEND URL:", process.env.NEXT_PUBLIC_BACKEND_URL);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/singleProduct/${id}`,
    { cache: "no-store" }
  );

  console.log("STATUS:", res.status);

  if (!res.ok) return null;

  const data = await res.json();
  return data?.product ?? null;
}

export default async function BackendProductPage({ params }: PageProps) {
  const { id } = await params; // ✅ REQUIRED
  const product = await fetchBackendProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <BackendProductGallery images={product.images} name={product.name} />
          <BackendProductInfo product={product} />
        </div>
      </div>
    </div>
  );
}
