import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { dateAdapter } from "@/shared/adapters/date.adapter";

import { COOKIE_CONSENT_KEY } from "../constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(number: number): string {
  return new Intl.NumberFormat("de-DE").format(number);
}

export function formatDate(date: Date): string {
  return dateAdapter.format(date, "LLL dd, y");
}

export function formatDateWithTime(date: Date): string {
  return dateAdapter.format(date, "LLL dd, y HH:mm:ss");
}

export function getConsent(): string | null {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(COOKIE_CONSENT_KEY);
}
