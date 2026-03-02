"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { generateShortURL } from "../api";
import { SHARE_LINK_KEYS } from "../constants";

export function useShortUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const absoluteUrl = useMemo(() => {
    if (typeof window === "undefined") return "";

    const query = searchParams.toString();
    const pathWithQuery = query ? `${pathname}?${query}` : pathname;

    return `${window.location.origin}${pathWithQuery}`;
  }, [pathname, searchParams]);

  return useQuery({
    queryKey: SHARE_LINK_KEYS.url(absoluteUrl),
    queryFn: () => generateShortURL(absoluteUrl),
    enabled: !!absoluteUrl,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
