export default function Loading() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-4">
      <div className="flex gap-1">
        <div className="bg-primary h-8 w-2 animate-bounce rounded" />
        <div className="bg-primary h-12 w-2 animate-bounce rounded [animation-delay:0.1s]" />
        <div className="bg-primary h-16 w-2 animate-bounce rounded [animation-delay:0.2s]" />
        <div className="bg-primary h-12 w-2 animate-bounce rounded [animation-delay:0.3s]" />
        <div className="bg-primary h-8 w-2 animate-bounce rounded [animation-delay:0.4s]" />
      </div>
    </div>
  );
}
