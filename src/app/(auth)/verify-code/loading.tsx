import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <output
      className="block mx-auto max-w-md space-y-6 px-4 py-12"
      aria-label="Loading password recovery"
    >
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-11 w-full" />
      <Skeleton className="h-11 w-full" />
    </output>
  );
}
