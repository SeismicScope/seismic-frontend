import { api } from "@/shared/lib/axios";

import type { LinkQRCode, ShortURL } from "../types";

export async function generateShortURL(url: string): Promise<ShortURL> {
  const { data } = await api.post<ShortURL>("/shortener/generate", {
    url,
  });

  return data;
}

export async function getShortLinkQRCode(code: string): Promise<LinkQRCode> {
  const { data } = await api.get<LinkQRCode>(`/shortener/${code}/qr`);

  return data;
}
