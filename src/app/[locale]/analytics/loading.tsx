import { generateSkeletonItems } from "@/shared/lib/generate-skeleton-items";

export default function Loading() {
  const bars = generateSkeletonItems(12, "bar");

  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center">
      <div className="flex gap-1">
        {bars.map((key, i) => (
          <div
            key={key}
            className="bg-primary h-10 w-1 animate-[pulse_1.2s_ease-in-out_infinite] rounded"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
}
