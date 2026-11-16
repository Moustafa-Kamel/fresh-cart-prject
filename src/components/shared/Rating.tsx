import { Star } from "lucide-react";

export function Rating({ value, count }: { value: number; count: number }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-1 text-xs">
      <span className="sr-only">
        {value} out of 5 stars, {count} ratings
      </span>
      <span aria-hidden="true" className="flex text-rating">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={`star-${i + 1}`}
            className={`size-3.5 ${i < Math.round(value) ? "fill-current" : ""}`}
          />
        ))}
      </span>
      <span aria-hidden="true" className="text-muted-foreground">
        {value} ({count})
      </span>
    </span>
  );
}
