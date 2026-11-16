import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div aria-busy="true" className="container space-y-6 px-4 py-8 lg:px-8">
      <output className="sr-only">Loading products…</output>
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-11 w-full max-w-xl" />
      <div className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <Skeleton className="h-96 w-full" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => `product-${index}`).map(
            (id) => (
              <div key={id} className="space-y-4 rounded-lg border p-4">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
