import { MapStyles } from "@/features/map/components/map-styles";

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MapStyles />
      {children}
    </>
  );
}
