import {
  BarChart2,
  Home,
  Info,
  LayoutDashboard,
  Map,
  MapPin,
} from "lucide-react";

export const PAGES = [
  { label: "Home", path: "/", icon: Home },
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Analytics", path: "/analytics", icon: BarChart2 },
  { label: "Map", path: "/map", icon: Map },
  { label: "Tiles Map", path: "/tiles-map", icon: MapPin },
  { label: "About", path: "/about", icon: Info },
];

export const FILTERS = [
  { label: "Filter by magnitude 5+", action: () => ({ minMag: 5 }) },
  { label: "Filter by magnitude 7+", action: () => ({ minMag: 7 }) },
  { label: "Filter depth < 50km", action: () => ({ maxDepth: 50 }) },
  { label: "Filter depth > 50km", action: () => ({ minDepth: 50 }) },
  { label: "Reset all filters", action: () => null },
];
