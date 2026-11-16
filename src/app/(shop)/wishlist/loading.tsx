import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section
      className="container space-y-6 px-4 py-8"
      aria-label="Loading saved items"
    >
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-80 w-full rounded-2xl" />
    </section>
  );
}
