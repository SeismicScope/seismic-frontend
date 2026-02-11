import { Skeleton } from "@/shared/ui/skeleton";

function EarthquakesStatsSkeleton() {
  return (
    <div className="grid w-full grid-cols-2 gap-4 py-4">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}

export default EarthquakesStatsSkeleton;
