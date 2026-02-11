import { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ApiErrorResponse } from "@/types/main";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(number: number): string {
  return new Intl.NumberFormat("de-DE").format(number);
}

export function getErrorMessage(error: unknown): string {
  if (typeof error === "string") {
    return error;
  }

  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    return (
      axiosError.response?.data?.message ??
      axiosError.message ??
      "Something went wrong"
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
}
