import createNextIntlPlugin from "next-intl/plugin";
import withBundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
    optimizePackageImports: ["recharts", "lucide-react", "date-fns"],
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /mapbox-gl\.js$/,
      type: "javascript/auto",
    });

    config.module.rules.push({
      test: /mapbox-gl\/dist\/mapbox-gl\.js$/,
      type: "javascript/auto",
    });

    return config;
  },
};

export default withSentryConfig(
  withAnalyzer(withNextIntl(nextConfig)),
  {
    org: "oleinikdev",
    project: "javascript-nextjs-m3",
    silent: !process.env.CI,
    widenClientFileUpload: true,
    autoInstrumentMiddleware: false,
  }
);