export type TimeInterval = "day" | "week" | "month" | "year";

export type ApiErrorResponse = { message?: string };

export type Earthquake = {
  id: number;
  externalId: string | null;
  occurredAt: string;
  magnitude: number;
  depth: number;
  latitude: number;
  longitude: number;
  location: string | null;
  createdAt: string;
};
