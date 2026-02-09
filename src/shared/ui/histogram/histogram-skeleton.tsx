import { Skeleton } from "@/shared/ui/skeleton";

const BAR_COUNT = 12;
const heights = [45, 60, 35, 80, 100, 70, 50, 30, 20, 15, 10, 5];

function HistogramSkeleton() {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex h-24 w-full items-stretch gap-0.5">
        {heights.slice(0, BAR_COUNT).map((h, i) => (
          <Skeleton
            key={i}
            className="flex-1 self-end rounded-t-sm rounded-b-none"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>

      <Skeleton className="mt-[-12px] h-1.5 w-full rounded-full" />

      <div className="flex justify-between">
        <Skeleton className="h-9 w-20 rounded-md" />
        <Skeleton className="h-9 w-20 rounded-md" />
      </div>
    </div>
  );
}

export default HistogramSkeleton;
