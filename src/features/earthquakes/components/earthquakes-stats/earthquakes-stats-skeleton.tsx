"use client";

import { Skeleton } from "@/shared/ui/skeleton";

const EarthquakesStatsSkeleton = () => {
  return (
    <div className="flex w-full items-center gap-4 py-4">
      <Skeleton className="h-[90px] w-full" />
      <Skeleton className="h-[90px] w-full" />
      <Skeleton className="h-[90px] w-full" />
      <Skeleton className="h-[90px] w-full" />
    </div>
  );
};

export default EarthquakesStatsSkeleton;
