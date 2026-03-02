import createNextIntlPlugin from "next-intl/plugin";
import withBundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  serverExternalPackages: ["mapbox-gl"],
  experimental: {
    inlineCss: true,
    optimizePackageImports: ["recharts", "lucide-react", "date-fns"],
  },
};

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withSentryConfig(
  withAnalyzer(
    withNextIntl(nextConfig) 
  ),
  {
    org: "oleinikdev",
    project: "javascript-nextjs-m3",
    silent: !process.env.CI,
    widenClientFileUpload: true,
  }
);