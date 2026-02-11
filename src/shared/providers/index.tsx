"use client";

import * as Sentry from "@sentry/nextjs";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { type JSX, useState } from "react";
import { toast, Toaster } from "sonner";

import { getErrorMessage } from "../lib/utils";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },

        queryCache: new QueryCache({
          onError: (error, query) => {
            const message = getErrorMessage(error);
            toast.error(message);
            Sentry.captureException(error, {
              tags: {
                type: "query",
                queryKey: JSON.stringify(query.queryKey),
              },
            });
          },
        }),

        mutationCache: new MutationCache({
          onError: (error, _variables, _context, mutation) => {
            const message = getErrorMessage(error);
            toast.error(message);
            Sentry.captureException(error, {
              tags: {
                type: "mutation",
                mutationKey: JSON.stringify(mutation.options.mutationKey),
              },
            });
          },
        }),
      }),
  );

  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <Toaster richColors position="top-right" />
    </NuqsAdapter>
  );
}
