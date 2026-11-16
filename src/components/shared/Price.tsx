export function Price({
  price,
  originalPrice,
}: {
  price: number;
  originalPrice?: number;
}) {
  return (
    <span className="inline-flex flex-wrap items-baseline gap-2">
      <span className={originalPrice ? "font-bold text-primary" : "font-bold"}>
        {new Intl.NumberFormat("en-EG", { maximumFractionDigits: 2 }).format(
          price,
        )}{" "}
        EGP
      </span>
      {originalPrice && originalPrice > price ? (
        <del className="text-xs font-normal text-muted-foreground">
          {new Intl.NumberFormat("en-EG").format(originalPrice)} EGP
        </del>
      ) : null}
    </span>
  );
}
