import { useQuery } from "@tanstack/react-query";

import { getShortLinkQRCode } from "../api";
import { SHARE_LINK_KEYS } from "../constants";

export function useShortUrlQR(code: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: SHARE_LINK_KEYS.qr(code),
    queryFn: () => getShortLinkQRCode(code),
    enabled: options?.enabled ?? !!code,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
