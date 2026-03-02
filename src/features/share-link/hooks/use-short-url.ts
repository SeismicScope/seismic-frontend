import { useQuery } from "@tanstack/react-query";

import { generateShortURL } from "../api";
import { SHARE_LINK_KEYS } from "../constants";

export function useShortUrl() {
  return useQuery({
    queryKey: SHARE_LINK_KEYS.url(
      typeof window !== "undefined" ? window.location.href : "",
    ),
    queryFn: () => generateShortURL(window.location.href),
    enabled: typeof window !== "undefined",
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
