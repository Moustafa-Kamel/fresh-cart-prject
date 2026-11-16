import {
  ArrowDown,
  ArrowUp,
  Banknote,
  Box,
  CalendarDays,
  MapPin,
  Package,
  ShoppingBag,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserOrders } from "@/lib/api/orders";
import { getStoreToken } from "@/lib/auth/storeToken";

import { RefreshOrdersButton } from "./_components/RefreshOrdersButton";

export const metadata: Metadata = {
  title: "My Orders",
  description: "View your orders, payment status and delivery details.",
};
const money = (value: number) => `${value.toLocaleString("en-EG")} EGP`;

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login?callbackUrl=/orders");
  const orders = await getUserOrders(await getStoreToken(session.user.email));
  orders.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  return (
    <section className="container space-y-6 px-4 py-10 lg:px-8">
      <header className="space-y-6 md:hidden">
        <nav aria-label="Breadcrumb" className="text-sm">
          <ol className="flex items-center gap-3">
            <li>
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-border">
              /
            </li>
            <li aria-current="page">My Orders</li>
          </ol>
        </nav>
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <ShoppingBag aria-hidden="true" className="size-6 fill-current" />
            </span>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight">My Orders</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Track and manage your {orders.length} orders
              </p>
            </div>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-sm px-4 text-sm text-primary hover:underline focus-visible:outline-ring"
          >
            <ShoppingBag aria-hidden="true" className="size-3.5 fill-current" />
            Continue Shopping
          </Link>
        </div>
      </header>
      <header className="hidden space-y-3 md:block">
        <h1 className="flex items-center gap-3 text-display-mobile sm:text-display">
          <Package aria-hidden="true" className="text-primary" />
          My Orders
        </h1>
        <p className="text-muted-foreground">
          Track your purchases and view order details. Payment status is
          confirmed by the store; it may take a moment to update after online
          payment.
        </p>
        <RefreshOrdersButton />
      </header>
      {orders.length === 0 ? (
        <section className="rounded-2xl border bg-card p-8 text-center">
          <h2 className="text-xl font-semibold">No orders yet</h2>
          <p className="my-4 text-muted-foreground">
            Your completed orders will appear here.
          </p>
          <Link href="/products" className="text-primary underline">
            Start shopping
          </Link>
        </section>
      ) : (
        orders.map((order) => (
          <section
            key={order._id}
            className="overflow-hidden rounded-2xl border bg-card shadow-card"
          >
            <div className="flex flex-wrap items-center gap-4 p-5">
              {order.cartItems[0]?.product && (
                <Image
                  src={order.cartItems[0].product.imageCover}
                  alt={order.cartItems[0].product.title}
                  width={80}
                  height={80}
                  sizes="80px"
                  className="size-20 rounded-xl object-contain"
                />
              )}
              <div className="min-w-0 flex-1 space-y-2">
                <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">
                  {order.isDelivered ? "Delivered" : "Processing"}
                </span>
                <h2 className="font-bold">Order #{order.id}</h2>
                <p className="text-sm text-gray-500 mb-4">
                  <CalendarDays
                    aria-hidden="true"
                    className="mr-1 inline-block size-4 align-text-bottom"
                  />
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    timeZone: "Africa/Cairo",
                  })}{" "}
                  ·{" "}
                  <Box
                    aria-hidden="true"
                    className="mr-1 inline-block size-4 align-text-bottom"
                  />
                  {order.cartItems.reduce(
                    (total, item) => total + item.count,
                    0,
                  )}{" "}
                  items ·{" "}
                  <MapPin
                    aria-hidden="true"
                    className="mr-1 inline-block size-4 align-text-bottom"
                  />
                  {order.shippingAddress?.city}
                </p>
                <p className="font-bold">{money(order.totalOrderPrice)}</p>
              </div>
              <div className="self-stretch space-y-3 pb-12 text-sm">
                <span className="flex justify-end">
                  <Banknote
                    aria-label={`${order.paymentMethodType === "cash" ? "Cash on delivery" : "Online payment"} · ${order.isPaid ? "Paid" : "Unpaid"}`}
                    role="img"
                    className="size-5 text-muted-foreground"
                  />
                </span>
              </div>
            </div>
            <details className="group">
              <summary className="relative -mt-14 mr-5 mb-5 ml-auto flex w-fit cursor-pointer list-none items-center gap-2 rounded-xl bg-muted px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-all focus-visible:outline-ring group-open:bg-primary group-open:bg-primary-600 group-open:text-white group-open:shadow-lg group-open:shadow-primary/25 group-open:shadow-primary-600/25 [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">Details</span>
                <ArrowDown
                  aria-hidden="true"
                  className="size-4 group-open:hidden"
                />
                <span className="hidden group-open:inline">Hide</span>
                <ArrowUp
                  aria-hidden="true"
                  className="hidden size-4 group-open:block"
                />
              </summary>
              <div className="space-y-5 border-t bg-muted/30 p-5">
                <h3 className="font-semibold">Order items</h3>
                <ul className="space-y-3">
                  {order.cartItems.map((item) => (
                    <li
                      key={item._id}
                      className="flex items-center gap-3 rounded-xl border bg-card p-3"
                    >
                      {item.product ? (
                        <>
                          <Image
                            src={item.product.imageCover}
                            alt={item.product.title}
                            width={56}
                            height={56}
                            sizes="56px"
                            className="size-14 rounded-lg object-contain"
                          />
                          <div className="min-w-0 flex-1">
                            <Link
                              href={`/products/${item.product._id}`}
                              className="font-medium hover:text-primary"
                            >
                              {item.product.title}
                            </Link>
                            <p className="text-sm text-muted-foreground">
                              {item.count} × {money(item.price)}
                            </p>
                          </div>
                        </>
                      ) : (
                        <span className="flex-1">
                          Product no longer available · {item.count} items
                        </span>
                      )}
                      <span className="text-sm font-semibold">
                        {money(item.count * item.price)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="grid gap-4 md:grid-cols-2">
                  <section className="space-y-2 rounded-xl border bg-card p-4">
                    <h3 className="font-semibold">Delivery address</h3>
                    <p>{order.shippingAddress?.city}</p>
                    <p className="wrap-break-word text-sm text-muted-foreground">
                      {order.shippingAddress?.details}
                    </p>
                    <p className="text-sm">{order.shippingAddress?.phone}</p>
                  </section>
                  <section className="rounded-xl border bg-accent p-4">
                    <h3 className="mb-3 font-semibold">Order summary</h3>
                    <dl className="space-y-2 text-sm">
                      {[
                        [
                          "Items",
                          order.cartItems.reduce(
                            (sum, item) => sum + item.price * item.count,
                            0,
                          ),
                        ],
                        ["Shipping", order.shippingPrice],
                        ["Tax", order.taxPrice],
                        ["Total", order.totalOrderPrice],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between gap-3">
                          <dt>{label}</dt>
                          <dd>{money(Number(value))}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                </div>
              </div>
            </details>
          </section>
        ))
      )}
    </section>
  );
}
