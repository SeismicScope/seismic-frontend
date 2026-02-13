function MapLoader() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative h-24 w-24">
        <div className="border-primary/40 absolute inset-0 animate-ping rounded-full border-2" />
        <div className="border-primary/60 absolute inset-4 animate-ping rounded-full border-2" />
        <div className="border-primary absolute inset-8 animate-ping rounded-full border-2" />
        <div className="bg-primary absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full" />
      </div>
    </div>
  );
}

export default MapLoader;
