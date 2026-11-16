"use client";

import { ChevronRight, MapPin, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function AccountNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="My Account"
      className="self-start overflow-hidden rounded-2xl border bg-card shadow-card"
    >
      <h2 className="border-b px-4 py-4 font-semibold">My Account</h2>
      <div className="space-y-1 p-2">
        {[
          {
            label: "My Addresses",
            href: "/account/addresses",
            icon: MapPin,
            active: pathname === "/account/addresses",
          },
          {
            label: "Settings",
            href: "/account/settings",
            icon: Settings,
            active: pathname === "/account/settings" || pathname === "/account",
          },
        ].map(({ label, href, icon: Icon, active }) => (
          <Button
            key={href}
            variant="ghost"
            render={<Link href={href} />}
            aria-current={active ? "page" : undefined}
            className={`h-auto w-full justify-start gap-3 rounded-xl p-3 text-sm ${active ? "bg-accent text-primary hover:bg-accent hover:text-primary" : "text-muted-foreground"}`}
          >
            <span
              className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              <Icon aria-hidden="true" className="size-4" />
            </span>
            {label}
            <ChevronRight aria-hidden="true" className="ml-auto size-4" />
          </Button>
        ))}
      </div>
    </nav>
  );
}
