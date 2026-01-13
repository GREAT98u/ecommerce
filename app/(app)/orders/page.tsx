import Link from "next/link";
import { cookies } from "next/headers";
import { Package, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { sanityFetch } from "@/sanity/lib/live";
import { ORDERS_BY_USER_QUERY } from "@/lib/sanity/queries/orders";
import { getOrderStatus } from "@/lib/constants/orderStatus";
import { formatPrice, formatDate, formatOrderNumber } from "@/lib/utils";
import { StackedProductImages } from "@/components/app/StackedProductImages";

interface Order {
  _id: string;
  orderNumber: number;
  total: number;
  status: string;
  createdAt: string;
  itemCount: number;
  itemNames?: string[];
  itemImages?: (string | null)[];
}


export const metadata = {
  title: "Your Orders | Furniture Shop",
  description: "View your order history",
};

export default async function OrdersPage() {
  /* ===============================
     1️⃣ Read JWT cookie
  =============================== */
  const cookieStore = await cookies();
const token = cookieStore.get("token")?.value;


  if (!token) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          icon={Package}
          title="Please login"
          description="You must be logged in to view your orders."
          action={{ label: "Login", href: "/login" }}
          size="lg"
        />
      </div>
    );
  }

  /* ===============================
     2️⃣ Fetch authenticated user
  =============================== */
  const userRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
    {
      headers: {
        Cookie: `token=${token}`,
      },
      cache: "no-store",
    }
  );

  if (!userRes.ok) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          icon={Package}
          title="Session expired"
          description="Please login again to view your orders."
          action={{ label: "Login", href: "/login" }}
          size="lg"
        />
      </div>
    );
  }

  const { user } = await userRes.json();

  /* ===============================
     3️⃣ Fetch orders using YOUR user ID
  =============================== */
const { data } = await sanityFetch({
  query: ORDERS_BY_USER_QUERY,
  params: {
    userId: user.id,
  },
});

const orders = data as Order[];


  if (!orders || orders.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          icon={Package}
          title="No orders yet"
          description="When you place an order, it will appear here."
          action={{ label: "Start Shopping", href: "/" }}
          size="lg"
        />
      </div>
    );
  }

  /* ===============================
     4️⃣ Render orders (UI unchanged)
  =============================== */
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Your Orders
        </h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Track and manage your orders
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const status = getOrderStatus(order.status);
          const StatusIcon = status.icon;
          const images = (order.itemImages ?? []).filter(
            (url): url is string => url !== null
          );

          return (
            <Link
              key={order._id}
              href={`/orders/${order._id}`}
              className="group block rounded-xl border border-zinc-200 bg-white transition-all hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
            >
              <div className="flex gap-5 p-5">
                <StackedProductImages
                  images={images}
                  totalCount={order.itemCount ?? 0}
                  size="lg"
                />

                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold">
                        Order #{formatOrderNumber(String(order.orderNumber))}

                      </p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <Badge className={`${status.color} shrink-0 flex items-center gap-1`}>
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </Badge>
                  </div>

                  <div className="mt-2 flex items-end justify-between">
                    <p className="text-sm text-muted-foreground">
                      {order.itemCount}{" "}
                      {order.itemCount === 1 ? "item" : "items"}
                    </p>
                    <p className="text-lg font-semibold">
                      {formatPrice(order.total)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t px-5 py-3">
                <p className="truncate text-sm text-muted-foreground">
                  {order.itemNames?.slice(0, 2).filter(Boolean).join(", ")}
                  {(order.itemNames?.length ?? 0) > 2 && "..."}
                </p>
                <span className="flex items-center gap-1 text-sm font-medium">
                  View order
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
