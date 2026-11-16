import {
  ChevronDown,
  Gift,
  Headset,
  Heart,
  Mail,
  Phone,
  ShoppingCart,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/lib/api/categories";
import { AccountMenu } from "./AccountMenu";
import { MobileNav } from "./MobileNav";
import { navigation } from "./navigation";
import { SearchForm } from "./SearchForm";
import { StoreBadge } from "./StoreBadge";
import { TopbarAccount } from "./TopbarAccount";

const iconLinkClass =
  "inline-flex size-10 items-center justify-center rounded-full text-footer-subtle transition-colors hover:bg-accent hover:text-primary";

export async function Navbar() {
  const categories = await getAllCategories().catch(() => []);
  const dropdownCategories = [
    { label: "All Categories", href: "/categories" },
    ...categories.map((category) => ({
      label: category.name,
      href: `/categories/${category._id}`,
    })),
  ];
  return (
    <>
      <div className="hidden border-b bg-muted lg:block">
        <div className="container flex h-10 items-center justify-between gap-4 text-xs text-muted-foreground lg:px-8">
          <div className="flex items-center gap-6 font-medium">
            <span className="inline-flex items-center gap-2">
              <Truck
                className="size-4 fill-primary text-primary"
                aria-hidden="true"
              />
              Free Shipping on Orders 500 EGP
            </span>
            <span className="inline-flex items-center gap-2">
              <Gift
                className="size-4 fill-primary text-primary"
                aria-hidden="true"
              />
              New Arrivals Daily
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="tel:+18001234567"
              className="inline-flex items-center gap-2"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              +1 (800) 123-4567
            </a>
            <a
              href="mailto:support@freshcart.com"
              className="inline-flex items-center gap-2"
            >
              <Mail className="size-3.5" aria-hidden="true" />
              support@freshcart.com
            </a>
            <TopbarAccount />
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-15 items-center gap-3 px-4 lg:h-18.5 lg:gap-4 lg:px-8 xl:gap-5">
          <Link
            href="/"
            aria-label="FreshCart home"
            className=" shrink-0 lg:block "
          >
            <Image
              src="/logo.svg"
              alt="FreshCart"
              width={166}
              height={32}
              priority
            />
          </Link>
          <SearchForm className="hidden min-w-0 flex-1 lg:flex [&_input]:h-11 [&_input]:bg-background [&_input]:pl-5" />
          <nav
            aria-label="Main navigation"
            className="hidden shrink-0 items-center gap-4 whitespace-nowrap text-sm font-medium lg:flex xl:gap-5"
          >
            {navigation.map(({ label, href }) =>
              label === "Categories" ? (
                <div key={href} className="group/categories relative">
                  <Link
                    href={href}
                    className="inline-flex cursor-pointer items-center gap-1.5 text-muted-foreground hover:text-primary"
                  >
                    {label}
                    <ChevronDown aria-hidden="true" className="size-3.5" />
                  </Link>
                  <div className="invisible absolute left-0 top-full z-50 w-50 pt-3 opacity-0 group-hover/categories:visible group-hover/categories:opacity-100 group-focus-within/categories:visible group-focus-within/categories:opacity-100">
                    <ul className="max-h-96 overflow-y-auto rounded-lg border border-border-subtle bg-popover py-2 text-base font-normal text-muted-foreground shadow-card-hover">
                      {dropdownCategories.map((category) => (
                        <li key={category.href}>
                          <Link
                            href={category.href}
                            className="block px-4 py-2.5 hover:bg-accent hover:text-primary focus-visible:bg-accent focus-visible:text-primary focus-visible:-outline-offset-2"
                          >
                            {category.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary"
                >
                  {label}
                </Link>
              ),
            )}
          </nav>
          <Link
            href="/contact"
            className="hidden shrink-0 items-center gap-2 whitespace-nowrap border-r pr-4 transition-opacity hover:opacity-80 xl:flex"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-accent text-primary">
              <Headset aria-hidden="true" className="size-5" />
            </span>
            <span className="text-xs">
              <span className="block text-subtle-foreground">Support</span>
              <span className="text-sm font-bold">24/7 Help</span>
            </span>
          </Link>
          <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0 xl:gap-3">
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className={`${iconLinkClass} relative`}
            >
              <Heart className="size-5.5" aria-hidden="true" />
              <StoreBadge kind="wishlist" />
            </Link>
            <Link
              href="/cart"
              aria-label="Shopping cart"
              className={`${iconLinkClass} relative`}
            >
              <ShoppingCart className="size-5.5" aria-hidden="true" />
              <StoreBadge kind="cart" />
            </Link>
            <AccountMenu />
            <div className="lg:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
