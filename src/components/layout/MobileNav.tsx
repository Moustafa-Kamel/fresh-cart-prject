"use client";

import {
  Headset,
  Heart,
  LogOut,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigation } from "./navigation";

const rowClass =
  "flex items-center gap-3 rounded-lg px-4 py-3 text-base text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            size="icon-lg"
            aria-label="Open mobile menu"
            className="rounded-full cursor-pointer hover:bg-primary-hover [&_svg]:size-5"
          />
        }
      >
        <Menu aria-hidden="true" />
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full max-w-80 overflow-y-auto bg-background duration-300 ease-in-out data-starting-style:opacity-100 data-ending-style:opacity-100 data-[side=right]:w-full data-[side=right]:data-starting-style:translate-x-full! data-[side=right]:data-ending-style:translate-x-full! motion-reduce:transition-none"
      >
        <SheetHeader className="flex-row items-center justify-between border-b px-4 py-4">
          <SheetTitle>
            <SheetClose nativeButton={false} render={<Link href="/" />}>
              <Image src="/logo.svg" alt="FreshCart" width={166} height={32} />
            </SheetClose>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Search and browse the store, wishlist, cart and account.
          </SheetDescription>
          <SheetClose
            render={
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full cursor-pointer bg-muted text-muted-foreground"
                aria-label="Close mobile menu"
              />
            }
          >
            <X aria-hidden="true" className="size-5" />
          </SheetClose>
        </SheetHeader>
        <search className="border-b p-4">
          <form
            action="/products"
            className="flex items-center gap-2 rounded-xl border bg-muted p-1.5"
            onSubmit={() => setOpen(false)}
          >
            <input
              type="search"
              name="search"
              aria-label="Search products"
              placeholder="Search products..."
              className="h-8 min-w-0 flex-1 bg-transparent pl-2 text-sm outline-none placeholder:text-subtle-foreground"
            />
            <Button
              type="submit"
              size="icon"
              aria-label="Search"
              className="size-8 shrink-0 rounded-lg hover:bg-primary-hover"
            >
              <Search aria-hidden="true" className="size-4 cursor-pointer" />
            </Button>
          </form>
        </search>
        <nav
          aria-label="Mobile navigation"
          className="flex flex-1 flex-col px-4"
        >
          <div className="border-b py-4">
            {navigation.map(({ label, href }) => (
              <SheetClose
                nativeButton={false}
                key={href}
                render={<Link href={href} />}
                className={rowClass}
              >
                {label}
              </SheetClose>
            ))}
          </div>
          <div className="space-y-1 border-b py-4">
            {[
              { label: "Wishlist", href: "/wishlist", icon: Heart },
              { label: "Cart", href: "/cart", icon: ShoppingCart },
            ].map(({ label, href, icon: Icon }) => (
              <SheetClose
                nativeButton={false}
                key={href}
                render={<Link href={href} />}
                className={rowClass}
              >
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full ${href === "/wishlist" ? "bg-destructive/5 text-destructive" : "bg-accent text-primary"}`}
                >
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                {label}
              </SheetClose>
            ))}
          </div>
          <div className="space-y-1 py-4">
            <SheetClose
              nativeButton={false}
              render={<Link href={session ? "/account" : "/login"} />}
              className={rowClass}
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-footer-subtle">
                <UserRound aria-hidden="true" className="size-5" />
              </span>
              <span className="truncate">
                {session?.user?.name || "Sign In"}
              </span>
            </SheetClose>
            {session && (
              <Button
                unstyled
                type="button"
                onClick={() => {
                  setOpen(false);
                  void signOut({ callbackUrl: "/login" });
                }}
                className={`${rowClass} cursor-pointer  w-full text-destructive hover:text-destructive`}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-destructive/5">
                  <LogOut aria-hidden="true" className="size-5" />
                </span>
                Sign Out
              </Button>
            )}
          </div>
          <SheetClose
            nativeButton={false}
            render={<Link href="/contact" />}
            className="mt-auto mb-4 flex items-center gap-3 rounded-xl border bg-muted p-4 transition-colors hover:bg-accent"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
              <Headset aria-hidden="true" className="size-5" />
            </span>
            <span className="text-sm">
              <span className="block font-semibold text-muted-foreground">
                Need Help?
              </span>
              <span className="text-primary">Contact Support</span>
            </span>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
