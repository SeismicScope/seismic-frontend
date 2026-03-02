import { MapStyles } from "@/features/map/components/map-styles";

export default function TilesMapLayout({
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
