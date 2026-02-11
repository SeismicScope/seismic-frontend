import Map from "@/features/map/components/map";
import MapStats from "@/features/map/components/map-stats";

function MapPage() {
  return (
    <div className="relative h-[calc(100vh-8rem)] w-full">
      <MapStats />
      <Map />
    </div>
  );
}

export default MapPage;
