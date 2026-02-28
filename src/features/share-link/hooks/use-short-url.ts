import { useQuery } from "@tanstack/react-query";

import { generateShortURL } from "../api";

export function useShortUrl() {
  return useQuery({
    queryKey: [
      "short-url",
      typeof window !== "undefined" ? window.location.href : "",
    ],
    queryFn: () => generateShortURL(window.location.href),
    enabled: typeof window !== "undefined",
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
