"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Banknote,
  Building2,
  Check,
  CreditCard,
  House,
  Info,
  MapPin,
  Phone,
  ReceiptText,
  RotateCcw,
  ShieldHalf,
  ShoppingBag,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { placeOrder } from "@/actions/orders";
import { useStore } from "@/components/providers/StoreProvider";
import { Button } from "@/components/ui/button";
import { checkoutSchema } from "@/lib/validations/checkout";
import type { Product } from "@/types/cart";
import type { Daum } from "@/types/user";
import { AddAddressForm } from "../../account/_components/AddAddressForm";

const money = (value: number) =>
  value.toLocaleString("en-EG", { maximumFractionDigits: 2 });
const fieldClass =
  "w-full rounded-xl border bg-background py-4 pl-12 pr-4 text-sm outline-none placeholder:text-subtle-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/20 aria-invalid:border-destructive";
const panelClass = "overflow-hidden rounded-2xl border bg-card shadow-card";
const headingClass =
  "bg-linear-to-r from-primary to-primary-hover px-6 py-5 text-primary-foreground";

export function CheckoutForm({
  items,
  subtotal,
  addresses,
}: {
  addresses: Daum[];
  items: Product[];
  subtotal: number;
}) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const router = useRouter();
  const store = useStore();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { city: "", details: "", phone: "", payment: "cash" },
    mode: "onTouched",
  });
  const payment = watch("payment");
  const count = items.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="container px-4 py-8 lg:px-8 lg:py-10">
      <header className="mb-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm">
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
            <li>
              <Link
                href="/cart"
                className="text-muted-foreground hover:text-primary"
              >
                Cart
              </Link>
            </li>
            <li aria-hidden="true" className="text-border">
              /
            </li>
            <li aria-current="page">Checkout</li>
          </ol>
        </nav>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary-hover text-primary-foreground shadow-card">
                <ReceiptText aria-hidden="true" className="size-7" />
              </span>
              <h1 className="text-display-mobile sm:text-display">
                Complete Your Order
              </h1>
            </div>
            <p className="mt-3 text-muted-foreground">
              Review your items and complete your purchase
            </p>
          </div>
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-hover"
          >
            <ArrowLeft aria-hidden="true" className="size-5" />
            Back to Cart
          </Link>
        </div>
      </header>
      {items.length > 0 && (
        <div className="mb-6">
          <AddAddressForm />
        </div>
      )}
      {items.length === 0 ? (
        <section className={`${panelClass} p-8 text-center`}>
          <ShoppingBag
            aria-hidden="true"
            className="mx-auto mb-4 size-10 text-primary"
          />
          <h2 className="text-xl font-bold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">
            Add products to your cart before checking out.
          </p>
          <Link
            href="/products"
            className="mt-5 inline-block text-primary underline"
          >
            Continue Shopping
          </Link>
        </section>
      ) : (
        <form
          noValidate
          onSubmit={handleSubmit((values) =>
            startTransition(async () => {
              setMessage("");
              const result = await placeOrder(values);
              if (!result.ok) {
                setMessage(result.message);
                toast.error(result.message);
                return;
              }
              if (result.payment === "online") {
                window.location.assign(result.url);
                return;
              }
              await store.retry();
              toast.success("Order placed successfully.");
              router.push(result.url);
              router.refresh();
            }),
          )}
          className="grid items-start gap-6 lg:grid-cols-3 lg:gap-8"
        >
          <fieldset
            disabled={pending}
            className="min-w-0 space-y-6 lg:col-span-2"
          >
            <section aria-labelledby="shipping-heading" className={panelClass}>
              <div className={headingClass}>
                <h2
                  id="shipping-heading"
                  className="flex items-center gap-3 text-lg font-bold"
                >
                  <House aria-hidden="true" className="size-5" />
                  Shipping Address
                </h2>
                <p className="mt-1 text-sm text-primary-foreground/90">
                  Where should we deliver your order?
                </p>
              </div>
              <div className="space-y-6 p-5 sm:p-6">
                <div className="space-y-3">
                  <label
                    htmlFor="saved-address"
                    className="block font-semibold"
                  >
                    Saved addresses
                  </label>
                  <select
                    id="saved-address"
                    defaultValue=""
                    className="w-full rounded-xl border bg-background p-3"
                    onChange={(event) => {
                      const address = addresses.find(
                        (item) => item._id === event.target.value,
                      );
                      for (const key of ["city", "details", "phone"] as const)
                        setValue(key, address?.[key] ?? "", {
                          shouldValidate: true,
                        });
                    }}
                  >
                    <option value="">Use a different address</option>
                    {addresses.map((address) => (
                      <option key={address._id} value={address._id}>
                        {address.name} — {address.city}
                      </option>
                    ))}
                  </select>
                  <Link
                    href="/account/addresses"
                    className="inline-block text-sm text-primary underline"
                  >
                    Manage saved addresses
                  </Link>
                </div>

                <div className="flex gap-3 rounded-xl border border-primary/10 bg-accent/60 p-4 text-sm">
                  <Info
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0 text-info"
                  />
                  <div>
                    <h3 className="font-medium text-info">
                      Delivery Information
                    </h3>
                    <p className="mt-1 text-info">
                      Please ensure your address is accurate for smooth
                      delivery.
                    </p>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="checkout-city"
                    className="mb-2 block text-sm font-semibold"
                  >
                    City <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Building2
                      aria-hidden="true"
                      className="absolute top-4 left-4 size-5 text-subtle-foreground"
                    />
                    <input
                      id="checkout-city"
                      autoComplete="address-level2"
                      required
                      placeholder="e.g. Cairo, Alexandria, Giza"
                      className={fieldClass}
                      aria-invalid={!!errors.city}
                      aria-describedby={errors.city ? "city-error" : undefined}
                      {...register("city")}
                    />
                  </div>
                  {errors.city && (
                    <p
                      id="city-error"
                      className="mt-2 text-sm text-destructive"
                    >
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="checkout-address"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Street Address <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <MapPin
                      aria-hidden="true"
                      className="absolute top-4 left-4 size-5 text-subtle-foreground"
                    />
                    <textarea
                      id="checkout-address"
                      autoComplete="street-address"
                      required
                      rows={4}
                      placeholder="Street name, building number, floor, apartment..."
                      className={`${fieldClass} resize-y`}
                      aria-invalid={!!errors.details}
                      aria-describedby={
                        errors.details ? "address-error" : undefined
                      }
                      {...register("details")}
                    />
                  </div>
                  {errors.details && (
                    <p
                      id="address-error"
                      className="mt-2 text-sm text-destructive"
                    >
                      {errors.details.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="checkout-phone"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Phone Number <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Phone
                      aria-hidden="true"
                      className="absolute top-4 left-4 size-5 text-subtle-foreground"
                    />
                    <input
                      id="checkout-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      required
                      placeholder="01xxxxxxxxx"
                      className={fieldClass}
                      aria-invalid={!!errors.phone}
                      aria-describedby="phone-help phone-error"
                      {...register("phone")}
                    />
                  </div>
                  <p
                    id="phone-help"
                    className="mt-2 text-xs text-subtle-foreground"
                  >
                    Egyptian numbers only
                  </p>
                  <p id="phone-error" className="mt-2 text-sm text-destructive">
                    {errors.phone?.message}
                  </p>
                </div>
              </div>
            </section>
            <section className={panelClass} aria-labelledby="payment-heading">
              <div className={headingClass}>
                <h2
                  id="payment-heading"
                  className="flex items-center gap-3 text-lg font-bold"
                >
                  <CreditCard aria-hidden="true" className="size-5" />
                  Payment Method
                </h2>
                <p className="mt-1 text-sm text-primary-foreground/90">
                  Choose how you’d like to pay
                </p>
              </div>
              <fieldset className="space-y-4 p-5 sm:p-6">
                <legend className="sr-only">Choose your payment method</legend>
                {(
                  [
                    {
                      value: "cash",
                      title: "Cash on Delivery",
                      description:
                        "Pay when your order arrives at your doorstep",
                      Icon: Banknote,
                    },
                    {
                      value: "online",
                      title: "Pay Online",
                      description:
                        "Secure payment with Credit/Debit Card via Stripe",
                      Icon: CreditCard,
                    },
                  ] as const
                ).map(({ value, title, description, Icon }) => (
                  <label
                    key={value}
                    className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-5 focus-within:ring-2 focus-within:ring-ring ${payment === value ? "border-primary bg-linear-to-r from-accent/60 to-muted" : "border-border bg-card"}`}
                  >
                    <span
                      className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${payment === value ? "bg-primary text-primary-foreground shadow-card" : "bg-muted text-subtle-foreground"}`}
                    >
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block font-bold ${payment === value ? "text-accent-foreground" : ""}`}
                      >
                        {title}
                      </span>
                      <span className="mt-1 block text-sm text-muted-foreground">
                        {description}
                      </span>
                    </span>
                    <input
                      type="radio"
                      value={value}
                      className="sr-only"
                      {...register("payment")}
                    />
                    <span
                      aria-hidden="true"
                      className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 ${payment === value ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}
                    >
                      {payment === value && <Check className="size-4" />}
                    </span>
                  </label>
                ))}
                <div className="flex items-center gap-3 rounded-xl border border-primary/10 bg-linear-to-r from-accent/60 to-muted p-4 text-primary">
                  <ShieldHalf aria-hidden="true" className="size-6 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Secure Checkout</p>
                    <p className="mt-1 text-xs">
                      Choose your preferred payment method above.
                    </p>
                  </div>
                </div>
              </fieldset>
            </section>
          </fieldset>
          <aside
            className={`${panelClass} lg:sticky lg:top-6`}
            aria-labelledby="summary-heading"
          >
            <div className={headingClass}>
              <h2
                id="summary-heading"
                className="flex items-center gap-3 text-lg font-bold"
              >
                <ShoppingBag aria-hidden="true" className="size-5" />
                Order Summary
              </h2>
              <p className="mt-1 text-sm">
                {count} {count === 1 ? "item" : "items"}
              </p>
            </div>
            <div className="p-5 sm:p-6">
              <ul className="max-h-72 space-y-3 overflow-y-auto pb-5">
                {items.map(({ product, count: quantity, price }) => (
                  <li
                    key={product._id}
                    className="flex items-center gap-3 rounded-xl bg-muted p-3"
                  >
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-background">
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        fill
                        sizes="56px"
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{product.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {quantity} × {money(price)} EGP
                      </p>
                    </div>
                    <span className="text-sm font-bold">
                      {money(price * quantity)}
                      <span className="sr-only"> EGP</span>
                    </span>
                  </li>
                ))}
              </ul>
              <dl className="space-y-4 border-t pt-5 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd>{money(subtotal)} EGP</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <Truck aria-hidden="true" className="size-4" />
                    Shipping
                  </dt>
                  <dd className="text-muted-foreground">To be confirmed</dd>
                </div>
                <div className="flex items-center justify-between gap-3 border-t pt-4">
                  <dt className="text-lg font-bold">Cart subtotal</dt>
                  <dd>
                    <strong className="text-2xl text-primary">
                      {money(subtotal)}
                    </strong>
                    <span className="ml-1 text-xs text-muted-foreground">
                      EGP
                    </span>
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-muted-foreground">
                Shipping and tax are calculated by the store when placing your
                order. Final charges may exceed this subtotal.
              </p>
              <Button
                disabled={pending}
                type="submit"
                className="mt-6 h-auto w-full gap-2 rounded-xl bg-linear-to-r from-primary to-primary-hover py-4 font-bold shadow-card"
              >
                <ShieldHalf aria-hidden="true" className="size-5" />
                {pending
                  ? "Please wait…"
                  : payment === "cash"
                    ? "Place Order"
                    : "Proceed to Payment"}
              </Button>
              {message && (
                <p role="alert" className="mt-4 text-sm text-destructive">
                  {message}
                </p>
              )}
              <div className="mt-6 flex flex-wrap justify-center gap-3 border-t pt-4 text-xs text-subtle-foreground">
                <span className="flex items-center gap-1">
                  <ShieldHalf
                    aria-hidden="true"
                    className="size-3 text-primary"
                  />
                  Secure
                </span>
                <span className="flex items-center gap-1">
                  <Truck aria-hidden="true" className="size-3 text-info" />
                  Fast Delivery
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw
                    aria-hidden="true"
                    className="size-3 text-return"
                  />
                  Easy Returns
                </span>
              </div>
            </div>
          </aside>
        </form>
      )}
    </div>
  );
}
