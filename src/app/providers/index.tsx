"use client";
import * as Sentry from "@sentry/nextjs";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { type JSX, Suspense, useState } from "react";
import { toast, Toaster } from "sonner";

import { FiltersSync } from "@/features/filters/components/filters-sync";
import { WebVitals } from "@/shared/components/web-vitals";
import type { Locale } from "@/shared/constants";
import { getApiErrorMessage } from "@/shared/lib/get-api-error-message";
import GoogleAnalytics from "@/shared/lib/google-analytics";
import { ThemeSync } from "@/widgets/theme/theme-sync";

import { ColorThemeProvider } from "./theme-provider";

const CookieBanner = dynamic(
  () => import("@/shared/components/cookie-banner"),
  {
    ssr: false,
  },
);

export function Providers({
  children,
  messages,
  locale,
}: {
  children: React.ReactNode;
  messages: Record<string, string>;
  locale: Locale;
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

            const message = getApiErrorMessage(error);
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
          // eslint-disable-next-line custom/no-many-params
          onError: (error, _variables, _context, mutation) => {
            if (mutation.meta?.skipGlobalErrorHandler) {
              return;
            }

            const message = getApiErrorMessage(error);
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
            <NextIntlClientProvider
              messages={messages}
              locale={locale}
              timeZone="UTC"
            >
              {children}
              <CookieBanner />
            </NextIntlClientProvider>
          </QueryClientProvider>
          <Toaster richColors position="top-right" />
          <WebVitals />
          <GoogleAnalytics />

          <Suspense>
            <ThemeSync />
            <FiltersSync />
          </Suspense>
        </ColorThemeProvider>
      </ThemeProvider>
    </NuqsAdapter>
  );
}
