"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { type ReactNode, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function SuggestedProducts({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function scroll(direction: number) {
    const element = track.current;
    if (!element) return;
    element.scrollBy({
      left:
        direction *
        (element.clientWidth +
          Number.parseFloat(getComputedStyle(element).columnGap)),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <section className="mt-12" aria-labelledby="suggested-products-heading">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2
          id="suggested-products-heading"
          className="flex items-center gap-3 text-xl font-bold tracking-tight before:h-8 before:w-1 before:shrink-0 before:rounded-full before:bg-primary sm:text-2xl"
        >
          <span>
            You May Also <span className="text-primary">Like</span>
          </span>
        </h2>
        <div className="flex shrink-0 gap-2">
          <Button
            unstyled
            type="button"
            aria-label="Previous suggested products"
            aria-controls="suggested-products-track"
            disabled={atStart}
            onClick={() => scroll(-1)}
            className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-primary focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
          </Button>
          <Button
            unstyled
            type="button"
            aria-label="Next suggested products"
            aria-controls="suggested-products-track"
            disabled={atEnd}
            onClick={() => scroll(1)}
            className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-primary focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </Button>
        </div>
      </div>
      <div
        id="suggested-products-track"
        ref={(element) => {
          track.current = element;
          if (!element) return;
          const observer = new ResizeObserver(() => {
            setAtStart(element.scrollLeft <= 1);
            setAtEnd(
              element.scrollLeft + element.clientWidth >=
                element.scrollWidth - 1,
            );
          });
          observer.observe(element);
          return () => observer.disconnect();
        }}
        onScroll={(event) => {
          const element = event.currentTarget;
          setAtStart(element.scrollLeft <= 1);
          setAtEnd(
            element.scrollLeft + element.clientWidth >= element.scrollWidth - 1,
          );
        }}
        className="grid auto-cols-[calc((100%-1rem)/2)] grid-flow-col snap-x snap-mandatory gap-4 overflow-x-auto py-2 max-sm:[&>div>article]:p-2 max-sm:[&>div>article>a]:h-40 max-sm:[&>div>article>div:last-child>div:last-child]:flex-wrap focus-visible:outline-2 focus-visible:outline-ring md:auto-cols-[calc((100%-2rem)/3)] xl:auto-cols-[calc((100%-4rem)/5)]"
      >
        {children}
      </div>
    </section>
  );
}
