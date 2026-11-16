import { Skeleton } from "@/components/ui/skeleton";

export default function AccountLoading() {
  return (
    <output className="block space-y-6" aria-label="Loading account">
      <Skeleton className="h-12 w-64" />
      <Skeleton className="h-36 w-full rounded-2xl" />
      <Skeleton className="h-36 w-full rounded-2xl" />
    </output>
  );
}
