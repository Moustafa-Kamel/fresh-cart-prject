"use client";

import {
  CircleUserRound,
  ContactRound,
  Heart,
  LogOut,
  Package,
  Settings,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

const accountLinks = [
  { label: "My Profile", href: "/account", icon: UserRound },
  { label: "My Orders", href: "/orders", icon: Package },
  { label: "My Wishlist", href: "/wishlist", icon: Heart },
  { label: "Addresses", href: "/account/addresses", icon: ContactRound },
  { label: "Settings", href: "/account", icon: Settings },
];

export function AccountMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Skeleton className="hidden size-10 rounded-full lg:block" />;
  }

  if (!session) {
    return (
      <Link
        href="/login"
        className="hidden h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover lg:inline-flex"
      >
        <UserRound className="size-4" aria-hidden="true" />
        Sign In
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label="Account menu"
            className="rounded-full hidden lg:block cursor-pointer text-footer-subtle hover:bg-accent hover:text-primary"
          />
        }
      >
        <CircleUserRound aria-hidden="true" className="size-5.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="w-64 max-w-[calc(100vw-2rem)] rounded-2xl border p-0 text-muted-foreground shadow-lg"
      >
        <div className="flex items-center gap-3 px-4 py-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
            <CircleUserRound aria-hidden="true" className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {session.user?.name}
            </p>
            <p className="truncate text-xs text-subtle-foreground">
              {session.user?.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator className="mx-0 my-0" />
        <div className="py-2">
          {accountLinks.map(({ label, href, icon: Icon }) => (
            <DropdownMenuItem
              key={label}
              render={<Link href={href} />}
              className="gap-3 cursor-pointer  rounded-none px-4 py-3"
            >
              <Icon
                aria-hidden="true"
                className="size-4 text-subtle-foreground"
              />
              {label}
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator className="mx-0 my-0" />
        <DropdownMenuItem
          variant="destructive"
          onClick={() =>
            void signOut({ callbackUrl: "/login", redirect: true })
          }
          className="gap-3 rounded-none cursor-pointer px-4 py-4"
        >
          <LogOut aria-hidden="true" className="size-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
