"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Reveal } from "@/components/shared/Reveal";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  {
    title: "Fresh Products Delivered",
    secondLine: "to your Door",
    description: "Get 20% off your first order",
    primary: "Shop Now",
    secondary: "View Deals",
  },
  {
    title: "Premium Quality",
    secondLine: "Guaranteed",
    description: "Fresh from farm to your table",
    primary: "Shop Now",
    secondary: "Learn More",
  },
  {
    title: "Fast & Free Delivery",
    secondLine: "",
    description: "Same day delivery available",
    primary: "Order Now",
    secondary: "Delivery Info",
  },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const touchStart = useRef<number | null>(null);
  const slide = slides[active];
  const move = (direction: number) =>
    setActive(
      (current) => (current + direction + slides.length) % slides.length,
    );

  return (
    <section
      aria-label="FreshCart highlights"
      aria-roledescription="carousel"
      className="relative isolate h-100 overflow-hidden bg-primary text-primary-foreground"
      onTouchStart={(event) => {
        touchStart.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = touchStart.current - event.changedTouches[0].clientX;
        if (Math.abs(distance) > 50) move(distance > 0 ? 1 : -1);
        touchStart.current = null;
      }}
    >
      <div aria-live="polite" aria-atomic="true" className="h-full">
        <section
          aria-roledescription="slide"
          aria-label={`${active + 1} of ${slides.length}: ${slide.title}`}
          className="h-full relative"
        >
          <Image
            src="/hero/hero-produce.webp"
            alt=""
            fill
            preload
            sizes="100vw"
            className="-z-10 object-cover object-center"
          />
          <div className="mx-auto flex h-full max-w-screen-2xl items-center px-8 md:px-24">
            <Reveal
              key={active}
              direction="up"
              once={false}
              className="max-w-xl"
            >
              <h1 className="text-display-mobile md:text-display">
                {slide.title}
                {slide.secondLine && (
                  <>
                    <br className="hidden md:block" />{" "}
                    <span>{slide.secondLine}</span>
                  </>
                )}
              </h1>
              <p className="mt-3 text-base text-primary-foreground/90">
                {slide.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-3 md:mt-6">
                <Link
                  href="/products"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                    "h-11 rounded-md bg-background px-6 text-base font-semibold text-primary hover:bg-background/90",
                  )}
                >
                  {slide.primary}
                </Link>
                <Link
                  href="/products"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-11 rounded-md border border-primary-foreground bg-transparent px-6 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground",
                  )}
                >
                  {slide.secondary}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
      {[-1, 1].map((direction) => (
        <Button
          unstyled
          key={direction}
          type="button"
          aria-label={direction === -1 ? "Previous slide" : "Next slide"}
          onClick={() => move(direction)}
          className={cn(
            "absolute top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background text-primary shadow-floating hover:bg-muted md:flex",
            direction === -1 ? "left-5" : "right-5",
          )}
        >
          {direction === -1 ? (
            <ChevronLeft aria-hidden="true" />
          ) : (
            <ChevronRight aria-hidden="true" />
          )}
        </Button>
      ))}
      <div className="absolute inset-x-0 bottom-2 flex h-11 items-center justify-center gap-1.5">
        {slides.map((item, index) => (
          <Button
            unstyled
            key={item.title}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => setActive(index)}
            className="flex h-11 items-center justify-center"
          >
            <span
              className={cn(
                "h-2 rounded-full md:h-1.5",
                index === active
                  ? "w-8 bg-primary-foreground md:w-5"
                  : "w-3 bg-primary-foreground/60 md:w-1.5",
              )}
            />
          </Button>
        ))}
      </div>
    </section>
  );
}
