import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

const promotions = [
  {
    badge: "Deal of the Day",
    emoji: "🔥",
    title: "Fresh Organic Fruits",
    description: "Get up to 40% off on selected organic fruits",
    discount: "40% OFF",
    code: "ORGANIC40",
    linkText: "Shop Now",
    background: "from-promo-fruit-start to-promo-fruit-end",
    linkColor: "text-deal-green",
  },
  {
    badge: "New Arrivals",
    emoji: "✨",
    title: "Exotic Vegetables",
    description: "Discover our latest collection of premium vegetables",
    discount: "25% OFF",
    code: "FRESH25",
    linkText: "Explore Now",
    background: "from-promo-vegetable-start to-promo-vegetable-end",
    linkColor: "text-promo-vegetable-link",
  },
];

export function PromoCards() {
  return (
    <section
      aria-label="Fresh produce offers"
      className="grid gap-6 md:grid-cols-2 md:gap-5"
    >
      {promotions.map((promotion, index) => (
        <Reveal
          key={promotion.code}
          direction={index === 0 ? "left" : "right"}
          className={cn(
            "relative isolate overflow-hidden rounded-2xl bg-linear-to-br p-8 text-primary-foreground lg:p-7",
            promotion.background,
          )}
        >
          <article>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 right-0 -z-10 size-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground/10"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 -z-10 size-32 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary-foreground/10"
            />
            <p className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/20 px-3 py-1 text-sm font-medium">
              <span aria-hidden="true">{promotion.emoji}</span>
              {promotion.badge}
            </p>
            <h2 className="mt-4 text-2xl leading-tight font-bold">
              {promotion.title}
            </h2>
            <p className="mt-3 text-base leading-6 text-primary-foreground/80">
              {promotion.description}
            </p>
            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-3xl font-bold lg:text-4xl">
                {promotion.discount}
              </span>
              <span className="text-sm text-primary-foreground/70">
                Use code:{" "}
                <strong className="font-bold text-primary-foreground">
                  {promotion.code}
                </strong>
              </span>
            </p>
            <Link
              href="/products"
              className={cn(
                "mt-7 inline-flex items-center gap-3 rounded-full bg-background px-6 py-3 text-base font-semibold transition-colors hover:bg-background/90 focus-visible:outline-primary-foreground",
                promotion.linkColor,
              )}
            >
              {promotion.linkText}
              <ArrowRight aria-hidden="true" className="size-5" />
            </Link>
          </article>
        </Reveal>
      ))}
    </section>
  );
}
