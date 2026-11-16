import { Skeleton } from "@/components/ui/skeleton";

export function CatalogLoading({ detail = false }: { detail?: boolean }) {
  return (
    <div aria-busy="true" className="container space-y-6 px-4 py-10 lg:px-8">
      <output className="sr-only">Loading catalog…</output>
      <Skeleton className="h-8 w-56" />
      {detail ? (
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-5">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={`loading-${i + 1}`}
              className="space-y-4 rounded-md border p-4"
            >
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
