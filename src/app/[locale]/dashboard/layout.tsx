import { MapStyles } from "@/features/map/components/map-styles";

export default function DashboardLayout({
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
