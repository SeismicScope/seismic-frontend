"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

import { Button } from "@/shared/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(
    function logGlobalError() {
      Sentry.captureException(error, {
        tags: { boundary: "route" },
        extra: { digest: error.digest },
      });
    },
    [error],
  );

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>

        <p className="text-muted-foreground mt-2 text-sm">
          An unexpected error occurred.
        </p>

        {process.env.NODE_ENV === "development" && (
          <pre className="text-error mt-4 text-xs">{error.message}</pre>
        )}

        <Button onClick={reset} className="mt-6">
          Try again
        </Button>
      </div>
    </div>
  );
}
