import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section
      className="container space-y-6 px-4 py-10"
      aria-label="Loading orders"
    >
      <Skeleton className="h-12 w-64" />
      {[1, 2, 3].map((id) => (
        <Skeleton key={id} className="h-40 rounded-2xl" />
      ))}
    </section>
  );
}
