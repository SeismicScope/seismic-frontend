import { AxiosError } from "axios";

export function getApiErrorMessage(error: unknown): string {
  if (!error) return "Unknown error";

  if (typeof error === "string") return error;

  if (error instanceof AxiosError) {
    return (
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      error.message ||
      "Request failed"
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected error";
}
