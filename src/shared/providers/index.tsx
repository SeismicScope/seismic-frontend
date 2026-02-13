"use client";
import * as Sentry from "@sentry/nextjs";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { type JSX, useState } from "react";
import { toast, Toaster } from "sonner";

import { WebVitals } from "../components/web-vitals";
import GoogleAnalytics from "../lib/google-analytics";
import { getErrorMessage } from "../lib/utils";
import { ColorThemeProvider } from "./theme-provider";

const CookieBanner = dynamic(() => import("../components/cookie-banner"), {
  ssr: false,
});

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
            if (query.meta?.skipGlobalErrorHandler) {
              return;
            }

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
            if (mutation.meta?.skipGlobalErrorHandler) {
              return;
            }

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
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ColorThemeProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
          <Toaster richColors position="top-right" />
          <WebVitals />
          <GoogleAnalytics />
          <CookieBanner />
        </ColorThemeProvider>
      </ThemeProvider>
    </NuqsAdapter>
  );
}
