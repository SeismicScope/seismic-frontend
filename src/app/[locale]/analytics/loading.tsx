export default function Loading() {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center">
      <div className="flex gap-1">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="bg-primary h-10 w-1 animate-[pulse_1.2s_ease-in-out_infinite] rounded"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
}
