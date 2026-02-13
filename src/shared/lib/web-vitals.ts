import type { Metric } from "web-vitals";

const VITALS_DEBUG = process.env.NODE_ENV === "development";

/**
 * Reports Core Web Vitals and additional metrics.
 *
 * In development: logs metrics to the console for local profiling.
 * In production:  forwards metrics to Sentry via `performance.measure`
 *                 which Sentry's `browserTracingIntegration` picks up
 *                 automatically, and optionally to a custom analytics
 *                 endpoint (e.g. /api/vitals) if configured.
 */
export function reportWebVital(metric: Metric) {
  if (VITALS_DEBUG) {
    const color =
      metric.rating === "good"
        ? "\x1b[32m"
        : metric.rating === "needs-improvement"
          ? "\x1b[33m"
          : "\x1b[31m";

    console.log(
      `${color}[Web Vital] ${metric.name}: ${Math.round(metric.value)}ms (${metric.rating})\x1b[0m`,
    );
  }

  // Forward to Sentry as a custom performance measurement.
  // Sentry's browserTracingIntegration already auto-captures LCP, FCP, CLS, FID
  // but this gives us explicit visibility in the Sentry Web Vitals dashboard.
  if (typeof window !== "undefined" && window.performance?.mark) {
    const entryName = `web-vital-${metric.name}`;

    window.performance.mark(entryName, {
      detail: {
        value: metric.value,
        rating: metric.rating,
        id: metric.id,
      },
    });
  }

  // Optional: send to a custom analytics endpoint
  if (process.env.NEXT_PUBLIC_VITALS_ENDPOINT) {
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
      navigationType: metric.navigationType,
      delta: metric.delta,
    });

    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(process.env.NEXT_PUBLIC_VITALS_ENDPOINT, body);
    }
  }
}
