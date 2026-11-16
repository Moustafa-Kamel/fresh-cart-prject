"use client";

import { useState } from "react";
import { CatalogImage } from "@/components/shared/CatalogImage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  return (
    <div className="min-w-0 rounded-xl border bg-card p-4 shadow-card">
      <div className="relative aspect-2/3 overflow-hidden rounded-md bg-background">
        <CatalogImage
          src={images[active]}
          alt={`${title}, image ${active + 1}`}
          fill
          preload
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain"
        />
      </div>
      {images.length > 1 && (
        <fieldset className="mt-3 flex flex-wrap justify-center gap-3">
          <legend className="sr-only">Choose product image</legend>
          {images.map((image, i) => (
            <Button
              unstyled
              key={image}
              type="button"
              aria-label={`Show image ${i + 1} of ${title}`}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
              className={cn(
                "relative size-16 overflow-hidden rounded-md border-2 bg-background transition-colors hover:border-primary",
                active === i ? "border-primary" : "border-border",
              )}
            >
              <CatalogImage
                src={image}
                alt=""
                fill
                sizes="64px"
                className="object-contain p-1"
              />
            </Button>
          ))}
        </fieldset>
      )}
    </div>
  );
}
