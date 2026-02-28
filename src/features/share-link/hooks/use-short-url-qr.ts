import { useQuery } from "@tanstack/react-query";

import { getShortLinkQRCode } from "../api";

export function useShortUrlQR(code: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["short-url-qr", code],
    queryFn: () => getShortLinkQRCode(code),
    enabled: options?.enabled ?? !!code,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
