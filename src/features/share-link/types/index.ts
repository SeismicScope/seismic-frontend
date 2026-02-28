export type ShortURL = {
  id: number;
  code: string;
  url: string;
  clicks: number;
  expiresAt: string;
  createdAt: string;
};

export type LinkQRCode = {
  qr: string;
};
