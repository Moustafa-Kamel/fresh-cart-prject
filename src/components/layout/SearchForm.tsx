"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SearchForm({ className }: { className?: string }) {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const term = String(formData.get("search") ?? "").trim();

    event.currentTarget.reset();

    router.push(
      term ? `/products?search=${encodeURIComponent(term)}` : "/products",
    );
  }

  return (
    <search className={cn("min-w-0", className)}>
      <form
        action="/products"
        onSubmit={handleSubmit}
        className="relative flex w-full min-w-0 items-center "
      >
        <Input
          name="search"
          type="search"
          aria-label="Search products"
          placeholder="Search for products, brands and more..."
          className="w-full px-5 py-3 pr-12 rounded-full border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
        />
        <Button
          type="submit"
          size="icon"
          aria-label="Search"
          className="absolute right-1 size-9 rounded-full hover:bg-primary-hover"
        >
          <Search aria-hidden="true" />
        </Button>
      </form>
    </search>
  );
}
