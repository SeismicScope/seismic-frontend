export const SHARE_LINK_KEYS = {
  all: ["short"] as const,

  url: (url: string) => [SHARE_LINK_KEYS.all, "url", url] as const,
  qr: (code: string) => [SHARE_LINK_KEYS.all, "url-qr", code] as const,
};
