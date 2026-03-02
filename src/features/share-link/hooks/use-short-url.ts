import { useQuery } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";

import { generateShortURL } from "../api";
import { SHARE_LINK_KEYS } from "../constants";

export function useShortUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const url = `${pathname}${searchParams.toString() ? `?${searchParams}` : ""}`;

  return useQuery({
    queryKey: SHARE_LINK_KEYS.url(url),
    queryFn: () => generateShortURL(url),
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
