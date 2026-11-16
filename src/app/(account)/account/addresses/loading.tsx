import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="space-y-6" aria-label="Loading addresses">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-48 rounded-2xl" />
    </section>
  );
}
