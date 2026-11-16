import {
  CreditCard,
  Headset,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  ShieldHalf,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  { icon: Truck, title: "Free Shipping", detail: "On orders over 500 EGP" },
  { icon: RotateCcw, title: "Easy Returns", detail: "14-day return policy" },
  { icon: ShieldHalf, title: "Secure Payment", detail: "100% secure checkout" },
  { icon: Headset, title: "24/7 Support", detail: "Contact us anytime" },
];

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Categories", href: "/categories" },
      { label: "Brands", href: "/brands" },
      { label: "Electronics", href: "/categories/6439d2d167d9aa4ca970649f" },
      { label: "Men's Fashion", href: "/categories/6439d5b90049ad0b52b90048" },
      {
        label: "Women's Fashion",
        href: "/categories/6439d58a0049ad0b52b9003f",
      },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Account", href: "/account" },
      { label: "Order History", href: "/orders" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Shopping Cart", href: "/cart" },
      { label: "Sign In", href: "/login" },
      { label: "Create Account", href: "/register" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Help Center", href: "/contact" },
      { label: "Shipping Info", href: "/terms-of-service#shipping" },
      { label: "Returns & Refunds", href: "/terms-of-service#returns" },
      { label: "Track Order", href: "/orders" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Cookie Policy", href: "/privacy-policy#cookies" },
    ],
  },
];

export function Footer() {
  return (
    <footer>
      <div className="border-y border-primary/10 bg-accent/60">
        <div className="container grid gap-6 px-4 py-6 md:grid-cols-2 lg:grid-cols-4 lg:px-0">
          {services.map(({ icon: Icon, title, detail }) => (
            <div key={title} className="flex items-center gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-muted-foreground">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-footer text-footer-muted">
        <div className="container grid gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-[2.2fr_repeat(4,1fr)] lg:gap-12 lg:px-0">
          <div className="md:col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label="FreshCart home"
              className="inline-flex shrink-0 items-center gap-2 font-bold tracking-tight text-foreground rounded-md bg-background px-4 py-2 text-[28px]"
            >
              <Image
                src="/logo.svg"
                alt="FreshCart"
                width={166}
                height={32}
                priority
              />
            </Link>
            <p className="mt-8 text-sm leading-[1.65]">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>
            <address className="mt-6 space-y-3 text-sm not-italic">
              <p className="flex items-center gap-3">
                <Phone
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <a
                  href="tel:+18001234567"
                  className="hover:text-footer-foreground"
                >
                  +1 (800) 123-4567
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Mail
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <a
                  href="mailto:support@freshcart.com"
                  className="hover:text-footer-foreground"
                >
                  support@freshcart.com
                </a>
              </p>
              <p className="flex items-start gap-3">
                <MapPin
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span>123 Commerce Street, New York, NY 10001</span>
              </p>
            </address>
            <ul aria-label="Social platforms" className="mt-6 flex gap-3">
              {[
                {
                  name: "Facebook",
                  shape: (
                    <path d="M14 22v-9h3l.5-4H14V7c0-1 .3-2 2-2h2V1.5A24 24 0 0 0 15 1c-3 0-5 2-5 5v3H7v4h3v9z" />
                  ),
                },
                {
                  name: "Twitter",
                  shape: (
                    <path d="M22 5.9a8.2 8.2 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.3 8.3 0 0 1-2.6 1 4.2 4.2 0 0 0-7.2 3.8 11.8 11.8 0 0 1-8.6-4.4 4.2 4.2 0 0 0 1.3 5.6 4.1 4.1 0 0 1-1.9-.5 4.2 4.2 0 0 0 3.4 4.1 4.2 4.2 0 0 1-1.9.1 4.2 4.2 0 0 0 3.9 2.9A8.4 8.4 0 0 1 2 18.6a11.8 11.8 0 0 0 18.2-10c0-.2 0-.4 0-.6A8.5 8.5 0 0 0 22 5.9z" />
                  ),
                },
                {
                  name: "Instagram",
                  shape: (
                    <g fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle
                        cx="17.5"
                        cy="6.5"
                        r="1"
                        fill="currentColor"
                        stroke="none"
                      />
                    </g>
                  ),
                },
                {
                  name: "YouTube",
                  shape: (
                    <path
                      fillRule="evenodd"
                      d="M21.6 6.2c-.3-1-1-1.7-2-2C17.8 3.7 12 3.7 12 3.7s-5.8 0-7.6.5c-1 .3-1.7 1-2 2C2 8 2 12 2 12s0 4 .4 5.8c.3 1 1 1.7 2 2 1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5c1-.3 1.7-1 2-2C22 16 22 12 22 12s0-4-.4-5.8ZM10 16V8l6 4-6 4Z"
                      clipRule="evenodd"
                    />
                  ),
                },
              ].map(({ name, shape }) => (
                <li
                  key={name}
                  className="flex size-10 items-center justify-center rounded-full bg-footer-card"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4"
                  >
                    {shape}
                  </svg>
                  <span className="sr-only">{name}</span>
                </li>
              ))}
            </ul>
          </div>
          {columns.map(({ title, links }) => (
            <div key={title}>
              <h2 className="text-base font-semibold text-footer-foreground">
                {title}
              </h2>
              <ul className="mt-6 space-y-4 text-sm">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="transition-colors hover:text-footer-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-footer-border">
          <div className="container flex flex-col items-center justify-between gap-2 px-4 py-6 text-center text-xs text-footer-muted md:flex-row md:text-left lg:px-0">
            <p>© 2026 FreshCart. All rights reserved.</p>
            <ul
              aria-label="Payment methods"
              className="flex flex-wrap justify-center gap-4"
            >
              {["Visa", "Mastercard", "PayPal"].map((name) => (
                <li key={name} className="inline-flex items-center gap-2">
                  <CreditCard className="size-3.5" aria-hidden="true" />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
