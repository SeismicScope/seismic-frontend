"use client";

import { useReportWebVitals } from "next/web-vitals";

import { reportWebVital } from "@/shared/lib/web-vitals";

/**
 * Captures Core Web Vitals (LCP, FID, CLS, FCP, TTFB, INP)
 * using Next.js built-in `useReportWebVitals` hook.
 *
 * Mount once in the root layout — renders nothing to the DOM.
 */
export function WebVitals() {
  useReportWebVitals(reportWebVital);

  return null;
}
