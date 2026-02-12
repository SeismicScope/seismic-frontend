export default function Loading() {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center">
      <div className="flex items-end gap-2">
        <div className="bg-primary h-6 w-2 animate-[pulse_1s_ease-in-out_infinite] rounded" />
        <div className="bg-primary h-10 w-2 animate-[pulse_1s_ease-in-out_0.15s_infinite] rounded" />
        <div className="bg-primary h-14 w-2 animate-[pulse_1s_ease-in-out_0.3s_infinite] rounded" />
        <div className="bg-primary h-10 w-2 animate-[pulse_1s_ease-in-out_0.45s_infinite] rounded" />
        <div className="bg-primary h-6 w-2 animate-[pulse_1s_ease-in-out_0.6s_infinite] rounded" />
      </div>
    </div>
  );
}
