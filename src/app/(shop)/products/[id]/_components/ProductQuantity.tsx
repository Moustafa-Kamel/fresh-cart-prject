"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Price } from "@/components/shared/Price";
import { Button } from "@/components/ui/button";

export function ProductQuantity({
  available,
  price,
}: {
  available: number;
  price: number;
}) {
  const [quantity, setQuantity] = useState(available > 0 ? 1 : 0);

  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        <p id="quantity-label" className="text-sm text-muted-foreground">
          Quantity
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <fieldset
            aria-labelledby="quantity-label"
            className="inline-flex h-12 items-center rounded-md border bg-background"
          >
            <Button
              unstyled
              type="button"
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              className="flex size-12 items-center justify-center text-subtle-foreground focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Minus aria-hidden="true" className="size-4" />
            </Button>
            <output aria-live="polite" className="px-4 text-sm">
              {quantity}
            </output>
            <Button
              unstyled
              type="button"
              disabled={quantity >= available}
              aria-label="Increase quantity"
              onClick={() =>
                setQuantity((value) => Math.min(available, value + 1))
              }
              className="flex size-12 items-center justify-center text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus aria-hidden="true" className="size-4" />
            </Button>
          </fieldset>
          <span className="text-sm text-footer-subtle">
            {available} available
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-muted p-4">
        <span className="text-sm text-muted-foreground">Total Price:</span>
        <div className="text-xl text-primary [&>span>span]:text-primary">
          <Price price={price * quantity} />
        </div>
      </div>
    </>
  );
}
