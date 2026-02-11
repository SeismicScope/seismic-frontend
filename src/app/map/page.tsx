import Map from "@/features/map/components/map";
import MapStats from "@/features/map/components/map-stats";
import { ErrorBoundary } from "@/shared/boundaries/error-boundary";

function MapPage() {
  return (
    <div className="relative h-[calc(100vh-8rem)] w-full">
      <MapStats />
      <ErrorBoundary
        fallback={
          <div className="text-muted-foreground flex h-[300px] items-center justify-center text-sm">
            Failed to render map
          </div>
        }
      >
        <Map />
      </ErrorBoundary>
    </div>
  );
}

export default MapPage;
