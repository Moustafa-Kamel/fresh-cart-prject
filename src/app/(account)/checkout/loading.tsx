import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section
      className="container space-y-8 px-4 py-10"
      aria-label="Loading checkout"
    >
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-12 w-80 max-w-full" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Skeleton className="h-96 rounded-2xl" />
          <Skeleton className="h-72 rounded-2xl" />
        </div>
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    </section>
  );
}
