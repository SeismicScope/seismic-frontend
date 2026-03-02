import { MapStyles } from "@/features/map/components/map-styles";

export default function EarthquakeDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MapStyles />
      {children}
    </>
  );
}
